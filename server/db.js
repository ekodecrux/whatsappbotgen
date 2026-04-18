/**
 * WapiSend – Real SQLite Database Layer
 * Uses better-sqlite3 for synchronous, fast local DB
 * Schema mirrors Cloudflare D1 for easy production migration
 */
import Database from 'better-sqlite3'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '../data')
mkdirSync(DATA_DIR, { recursive: true })

const db = new Database(join(DATA_DIR, 'wapisend.db'))
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

// ─── Schema ──────────────────────────────────────────────────────────────────

db.exec(`
-- Tenants (organizations / white-label clients)
CREATE TABLE IF NOT EXISTS tenants (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  type        TEXT    NOT NULL DEFAULT 'SMB',   -- Education | Corporate | SMB | Healthcare
  plan        TEXT    NOT NULL DEFAULT 'Starter',
  subdomain   TEXT    UNIQUE,
  brand_color TEXT    DEFAULT '#25D366',
  logo_url    TEXT,
  credits     INTEGER NOT NULL DEFAULT 0,
  mrr         INTEGER NOT NULL DEFAULT 0,
  status      TEXT    NOT NULL DEFAULT 'active',
  wa_phone_id TEXT,
  wa_token    TEXT,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id   INTEGER NOT NULL DEFAULT 1,
  name        TEXT    NOT NULL,
  email       TEXT    NOT NULL UNIQUE,
  password    TEXT    NOT NULL,
  role        TEXT    NOT NULL DEFAULT 'user',  -- superadmin | admin | user
  status      TEXT    NOT NULL DEFAULT 'active',
  last_login  DATETIME,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- WhatsApp Numbers
CREATE TABLE IF NOT EXISTS wa_numbers (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id   INTEGER NOT NULL,
  phone       TEXT    NOT NULL,
  display_name TEXT,
  phone_number_id TEXT,
  quality     TEXT    DEFAULT 'HIGH',
  status      TEXT    DEFAULT 'connected',
  daily_limit INTEGER DEFAULT 1000,
  messages_today INTEGER DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Contacts
CREATE TABLE IF NOT EXISTS contacts (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id   INTEGER NOT NULL,
  name        TEXT    NOT NULL,
  phone       TEXT    NOT NULL,
  email       TEXT,
  tags        TEXT    DEFAULT '[]',
  opt_in      INTEGER DEFAULT 1,
  opt_out     INTEGER DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tenant_id, phone),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id   INTEGER NOT NULL,
  name        TEXT    NOT NULL,
  phone       TEXT    NOT NULL,
  email       TEXT,
  source      TEXT,
  status      TEXT    DEFAULT 'cold',   -- hot | warm | cold
  stage       TEXT    DEFAULT 'new',    -- new | contacted | demo | proposal | negotiation | closed
  value       REAL    DEFAULT 0,
  notes       TEXT,
  last_contact DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Templates
CREATE TABLE IF NOT EXISTS templates (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id   INTEGER NOT NULL,
  name        TEXT    NOT NULL,
  category    TEXT    DEFAULT 'UTILITY',
  language    TEXT    DEFAULT 'en',
  body        TEXT    NOT NULL,
  header_type TEXT,
  header_value TEXT,
  footer_text TEXT,
  status      TEXT    DEFAULT 'pending',  -- pending | approved | rejected
  wa_template_id TEXT,
  usage_count INTEGER DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Campaigns
CREATE TABLE IF NOT EXISTS campaigns (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id   INTEGER NOT NULL,
  name        TEXT    NOT NULL,
  template_id INTEGER,
  status      TEXT    DEFAULT 'draft',  -- draft | scheduled | active | paused | completed
  type        TEXT    DEFAULT 'bulk',
  scheduled_at DATETIME,
  total_recipients INTEGER DEFAULT 0,
  sent        INTEGER DEFAULT 0,
  delivered   INTEGER DEFAULT 0,
  opened      INTEGER DEFAULT 0,
  replies     INTEGER DEFAULT 0,
  failed      INTEGER DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id),
  FOREIGN KEY (template_id) REFERENCES templates(id)
);

-- Messages (individual message records)
CREATE TABLE IF NOT EXISTS messages (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id   INTEGER NOT NULL,
  campaign_id INTEGER,
  contact_id  INTEGER,
  phone       TEXT    NOT NULL,
  message     TEXT    NOT NULL,
  type        TEXT    DEFAULT 'outbound',  -- outbound | inbound
  status      TEXT    DEFAULT 'queued',   -- queued | sent | delivered | read | failed
  wa_message_id TEXT,
  error_code  TEXT,
  credits_used INTEGER DEFAULT 1,
  sent_at     DATETIME,
  delivered_at DATETIME,
  read_at     DATETIME,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id),
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
);

-- Wallet Transactions
CREATE TABLE IF NOT EXISTS transactions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id   INTEGER NOT NULL,
  type        TEXT    NOT NULL,  -- recharge | debit | refund | bonus
  credits     INTEGER NOT NULL,
  amount      REAL    DEFAULT 0,
  currency    TEXT    DEFAULT 'INR',
  description TEXT,
  payment_method TEXT,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  status      TEXT    DEFAULT 'pending',  -- pending | success | failed
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Bots
CREATE TABLE IF NOT EXISTS bots (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id   INTEGER NOT NULL,
  name        TEXT    NOT NULL,
  description TEXT,
  flow        TEXT    DEFAULT '{}',  -- JSON flow definition
  status      TEXT    DEFAULT 'active',  -- active | paused | draft
  trigger_keyword TEXT,
  conversations INTEGER DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- ERP Integrations
CREATE TABLE IF NOT EXISTS erp_integrations (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id   INTEGER NOT NULL,
  name        TEXT    NOT NULL,
  type        TEXT    NOT NULL,  -- SAP | Tally | Salesforce | Oracle | Custom | Zoho
  webhook_url TEXT,
  api_key     TEXT,
  api_secret  TEXT,
  endpoint    TEXT,
  status      TEXT    DEFAULT 'pending',  -- connected | disconnected | pending | error
  events_today INTEGER DEFAULT 0,
  last_sync   DATETIME,
  config      TEXT    DEFAULT '{}',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Notification Types
CREATE TABLE IF NOT EXISTS notification_types (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id   INTEGER NOT NULL,
  name        TEXT    NOT NULL,
  category    TEXT    NOT NULL,  -- education | corporate | smb | healthcare
  template_id INTEGER,
  trigger_type TEXT   DEFAULT 'manual',  -- manual | auto | scheduled | erp
  is_active   INTEGER DEFAULT 1,
  send_count  INTEGER DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Resellers
CREATE TABLE IF NOT EXISTS resellers (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  email       TEXT    UNIQUE,
  phone       TEXT,
  tier        TEXT    DEFAULT 'Bronze',  -- Bronze | Silver | Gold | Platinum
  commission  REAL    DEFAULT 10.0,
  total_tenants INTEGER DEFAULT 0,
  monthly_revenue REAL DEFAULT 0,
  status      TEXT    DEFAULT 'active',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sessions (JWT blacklist / refresh tokens)
CREATE TABLE IF NOT EXISTS sessions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL,
  token_hash  TEXT    NOT NULL,
  expires_at  DATETIME NOT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Delivery Queue
CREATE TABLE IF NOT EXISTS delivery_queue (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id   INTEGER NOT NULL,
  campaign_id INTEGER,
  phone       TEXT    NOT NULL,
  message     TEXT    NOT NULL,
  template_id INTEGER,
  status      TEXT    DEFAULT 'queued',  -- queued | processing | sent | delivered | failed
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  scheduled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  processed_at DATETIME,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Webhooks Log
CREATE TABLE IF NOT EXISTS webhook_logs (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id   INTEGER,
  source      TEXT,  -- whatsapp | razorpay | erp
  event_type  TEXT,
  payload     TEXT,
  status      TEXT    DEFAULT 'received',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_messages_tenant ON messages(tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_campaign ON messages(campaign_id);
CREATE INDEX IF NOT EXISTS idx_contacts_tenant ON contacts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_tenant ON campaigns(tenant_id);
CREATE INDEX IF NOT EXISTS idx_transactions_tenant ON transactions(tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_leads_tenant ON leads(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_delivery_queue_status ON delivery_queue(status, scheduled_at);
`)

// ─── Seed Data (only if empty) ────────────────────────────────────────────────

const tenantCount = db.prepare('SELECT COUNT(*) as c FROM tenants').get()
if (tenantCount.c === 0) {
  console.log('🌱 Seeding initial data...')

  // Default tenants
  const insertTenant = db.prepare(`
    INSERT INTO tenants (name, type, plan, subdomain, brand_color, credits, mrr, status, wa_phone_id, wa_token)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  
  insertTenant.run('WapiSend Demo', 'SMB', 'Pro', 'demo', '#25D366', 42500, 2999, 'active', process.env.WA_PHONE_NUMBER_ID || '', process.env.WA_ACCESS_TOKEN || '')
  insertTenant.run('Delhi Public School', 'Education', 'Enterprise', 'dps', '#1565C0', 450000, 7999, 'active', '', '')
  insertTenant.run('Infosys HR Dept', 'Corporate', 'Enterprise', 'infosys', '#0097A7', 800000, 7999, 'active', '', '')
  insertTenant.run('TCS Regional Office', 'Corporate', 'Pro', 'tcs', '#7B1FA2', 250000, 2999, 'active', '', '')
  insertTenant.run('Rajasthan University', 'Education', 'Enterprise', 'ru', '#2E7D32', 600000, 7999, 'active', '', '')
  insertTenant.run('Green Valley Pharmacy', 'SMB', 'Starter', 'gvp', '#E65100', 15000, 999, 'active', '', '')
  insertTenant.run('Sunrise Hospital', 'Healthcare', 'Pro', 'sunrise', '#C62828', 180000, 2999, 'active', '', '')

  // Default admin user (tenant 1)
  const { createHash } = await import('crypto')
  const bcrypt = await import('bcryptjs')
  const adminHash = await bcrypt.default.hash('Admin@123', 10)
  
  db.prepare(`
    INSERT INTO users (tenant_id, name, email, password, role)
    VALUES (?, ?, ?, ?, ?)
  `).run(1, 'Super Admin', 'admin@wapisend.in', adminHash, 'superadmin')

  db.prepare(`
    INSERT INTO users (tenant_id, name, email, password, role)
    VALUES (?, ?, ?, ?, ?)
  `).run(1, 'Demo User', 'demo@wapisend.in', adminHash, 'admin')

  // WhatsApp numbers
  const insertWA = db.prepare(`INSERT INTO wa_numbers (tenant_id, phone, display_name, phone_number_id, quality, status, daily_limit) VALUES (?,?,?,?,?,?,?)`)
  insertWA.run(1, '+91 98765 43210', 'WapiSend Business', process.env.WA_PHONE_NUMBER_ID || 'demo_phone_id', 'HIGH', 'connected', 100000)
  insertWA.run(1, '+91 87654 32109', 'WapiSend Store', '', 'MEDIUM', 'connected', 50000)

  // Templates
  const insertTpl = db.prepare(`INSERT INTO templates (tenant_id, name, category, body, status, usage_count) VALUES (?,?,?,?,?,?)`)
  insertTpl.run(1, 'Welcome Message', 'UTILITY', 'Hi {{1}}! 👋 Welcome to {{2}}. How can we help you today?', 'approved', 1240)
  insertTpl.run(1, 'Order Confirmation', 'TRANSACTIONAL', 'Hi {{1}}, your order #{{2}} has been confirmed! 🎉 Amount: ₹{{3}}. Track: {{4}}', 'approved', 8920)
  insertTpl.run(1, 'Flash Sale Offer', 'MARKETING', '🔥 FLASH SALE! Up to {{1}}% OFF on all items. Use code {{2}}. Valid till {{3}}. Shop now: {{4}}', 'approved', 3410)
  insertTpl.run(1, 'OTP Verification', 'AUTHENTICATION', 'Your OTP for {{1}} is *{{2}}*. Valid for 10 minutes. Do NOT share with anyone.', 'approved', 15200)
  insertTpl.run(1, 'Fee Reminder', 'UTILITY', 'Dear Parent, Fee of ₹{{1}} for {{2}} is due on {{3}}. Pay at: {{4}}', 'approved', 4820)
  insertTpl.run(1, 'Payslip Ready', 'TRANSACTIONAL', 'Hi {{1}}, your payslip for {{2}} is ready. Download: {{3}}', 'approved', 2100)
  insertTpl.run(1, 'Abandoned Cart', 'MARKETING', 'Hi {{1}}! You left items in your cart 🛒. Complete your order and get {{2}}% off: {{3}}', 'pending', 0)

  // Campaigns
  const insertCamp = db.prepare(`
    INSERT INTO campaigns (tenant_id, name, status, total_recipients, sent, delivered, opened, replies, failed, created_at)
    VALUES (?,?,?,?,?,?,?,?,?,?)
  `)
  insertCamp.run(1, 'Diwali Sale 2024', 'active', 8500, 8420, 8321, 6100, 3400, 99, '2024-10-20')
  insertCamp.run(1, 'New Product Launch', 'scheduled', 5000, 0, 0, 0, 0, 0, '2024-10-25')
  insertCamp.run(1, 'Customer Re-engagement', 'completed', 12000, 12000, 11880, 8900, 4200, 120, '2024-10-10')
  insertCamp.run(1, 'Flash Sale - Weekend', 'paused', 4500, 4500, 4450, 3100, 1800, 50, '2024-10-18')
  insertCamp.run(1, 'Fee Reminder - November', 'completed', 380, 380, 376, 340, 120, 4, '2024-11-01')
  insertCamp.run(1, 'Payslip October', 'active', 850, 850, 848, 820, 0, 2, '2024-11-02')

  // Contacts
  const insertContact = db.prepare(`INSERT INTO contacts (tenant_id, name, phone, email, tags, opt_in) VALUES (?,?,?,?,?,?)`)
  const contactData = [
    [1, 'Rahul Sharma', '+919876543210', 'rahul@example.com', '["customer","vip"]', 1],
    [1, 'Priya Mehta', '+918765432109', 'priya@example.com', '["lead"]', 1],
    [1, 'Amit Patel', '+917654321098', 'amit@example.com', '["customer"]', 1],
    [1, 'Sunita Rao', '+916543210987', 'sunita@example.com', '["vip","customer"]', 1],
    [1, 'Vikram Singh', '+915432109876', 'vikram@example.com', '["prospect"]', 1],
    [1, 'Meena Gupta', '+914321098765', 'meena@example.com', '["customer"]', 1],
    [1, 'Arjun Nair', '+913210987654', 'arjun@example.com', '["lead"]', 1],
    [1, 'Kavitha Reddy', '+912109876543', 'kavitha@example.com', '["customer"]', 1],
  ]
  contactData.forEach(c => insertContact.run(...c))

  // Leads
  const insertLead = db.prepare(`INSERT INTO leads (tenant_id, name, phone, source, status, stage, value, last_contact) VALUES (?,?,?,?,?,?,?,?)`)
  insertLead.run(1, 'Rahul Sharma', '+919876543210', 'Poster - Diwali', 'hot', 'demo', 15000, new Date(Date.now() - 2*3600000).toISOString())
  insertLead.run(1, 'Priya Mehta', '+918765432109', 'Website Chat', 'warm', 'proposal', 8500, new Date(Date.now() - 86400000).toISOString())
  insertLead.run(1, 'Amit Patel', '+917654321098', 'Bulk Campaign', 'cold', 'contacted', 3200, new Date(Date.now() - 3*86400000).toISOString())
  insertLead.run(1, 'Sunita Rao', '+916543210987', 'QR Code', 'hot', 'closed', 22000, new Date().toISOString())
  insertLead.run(1, 'Vikram Singh', '+915432109876', 'Poster - Sale', 'warm', 'negotiation', 11000, new Date(Date.now() - 5*3600000).toISOString())

  // Transactions
  const insertTxn = db.prepare(`INSERT INTO transactions (tenant_id, type, credits, amount, description, payment_method, status, created_at) VALUES (?,?,?,?,?,?,?,?)`)
  insertTxn.run(1, 'recharge', 50000, 4000, 'Credit Recharge - 50K Pack', 'GPay UPI', 'success', '2024-10-20')
  insertTxn.run(1, 'debit', -1200, -120, 'Campaign: Diwali Sale 2024', 'credits', 'success', '2024-10-21')
  insertTxn.run(1, 'debit', -840, -84, 'Campaign: Flash Sale', 'credits', 'success', '2024-10-22')
  insertTxn.run(1, 'recharge', 20000, 2000, 'Credit Recharge - 25K Pack', 'Card', 'success', '2024-10-23')
  insertTxn.run(1, 'recharge', 50000, 4000, 'WhatsApp Bot Recharge - 50K Pack', 'WhatsApp Pay', 'success', '2024-11-01')
  insertTxn.run(1, 'debit', -8960, -896, 'Campaign: Customer Re-engagement', 'credits', 'success', '2024-10-11')

  // Bots
  const insertBot = db.prepare(`INSERT INTO bots (tenant_id, name, description, status, trigger_keyword, conversations) VALUES (?,?,?,?,?,?)`)
  insertBot.run(1, 'Welcome Bot', 'Greets new customers and shows menu', 'active', 'HI,HELLO,START', 8421)
  insertBot.run(1, 'Product Enquiry', 'Handles product questions and pricing', 'active', 'PRICE,PRODUCT,BUY', 2130)
  insertBot.run(1, 'Support Bot', 'Routes support tickets', 'paused', 'HELP,SUPPORT,ISSUE', 0)
  insertBot.run(1, 'Lead Capture', 'Captures lead info from ads', 'active', 'INFO,DEMO,TRIAL', 4892)

  // ERP Integrations
  const insertERP = db.prepare(`INSERT INTO erp_integrations (tenant_id, name, type, status, events_today, last_sync) VALUES (?,?,?,?,?,?)`)
  insertERP.run(1, 'SAP S/4HANA', 'SAP', 'connected', 1240, new Date(Date.now() - 2*60000).toISOString())
  insertERP.run(1, 'Tally Prime', 'Tally', 'connected', 340, new Date(Date.now() - 15*60000).toISOString())
  insertERP.run(1, 'Salesforce CRM', 'Salesforce', 'connected', 892, new Date(Date.now() - 60000).toISOString())
  insertERP.run(1, 'Custom ERP (REST)', 'Custom', 'connected', 2100, new Date(Date.now() - 5*60000).toISOString())
  insertERP.run(1, 'Oracle HCM', 'Oracle', 'pending', 0, null)
  insertERP.run(1, 'Zoho School', 'Zoho', 'connected', 580, new Date(Date.now() - 30*60000).toISOString())

  // Resellers
  const insertReseller = db.prepare(`INSERT INTO resellers (name, email, phone, tier, commission, total_tenants, monthly_revenue, status) VALUES (?,?,?,?,?,?,?,?)`)
  insertReseller.run('TechSolutions Pvt Ltd', 'tech@solutions.in', '+91 9800012345', 'Platinum', 22, 42, 280000, 'active')
  insertReseller.run('Digital India Partners', 'contact@dip.in', '+91 9800023456', 'Gold', 18, 31, 195000, 'active')
  insertReseller.run('EduTech Resellers', 'info@edutech.in', '+91 9800034567', 'Gold', 18, 28, 168000, 'active')
  insertReseller.run('BizConnect India', 'hello@bizconnect.in', '+91 9800045678', 'Silver', 15, 22, 132000, 'active')
  insertReseller.run('StartupHub Services', 'ops@startuphub.in', '+91 9800056789', 'Silver', 15, 18, 95000, 'active')
  insertReseller.run('MegaComm Network', 'sales@megacomm.in', '+91 9800067890', 'Bronze', 10, 15, 78000, 'active')

  // Messages (sample - 50 recent)
  const insertMsg = db.prepare(`INSERT INTO messages (tenant_id, campaign_id, phone, message, type, status, credits_used, sent_at, delivered_at, created_at) VALUES (?,?,?,?,?,?,?,?,?,?)`)
  for (let i = 0; i < 50; i++) {
    const phones = ['+919876543210','+918765432109','+917654321098','+916543210987','+915432109876']
    const phone = phones[i % phones.length]
    const daysAgo = Math.floor(i / 10)
    const sentAt = new Date(Date.now() - daysAgo * 86400000 - (i % 10) * 3600000).toISOString()
    const deliveredAt = new Date(new Date(sentAt).getTime() + 5000).toISOString()
    const campId = (i % 6) + 1
    insertMsg.run(1, campId, phone, `Sample message ${i+1} for campaign`, 'outbound', 'delivered', 1, sentAt, deliveredAt, sentAt)
  }

  // Notification types
  const insertNotif = db.prepare(`INSERT INTO notification_types (tenant_id, name, category, trigger_type, is_active, send_count) VALUES (?,?,?,?,?,?)`)
  const notifTypes = [
    [1, 'Fee Reminder', 'education', 'scheduled', 1, 4820],
    [1, 'Exam Schedule', 'education', 'manual', 1, 3210],
    [1, 'PTM Invite', 'education', 'scheduled', 1, 2100],
    [1, 'Assembly Notice', 'education', 'manual', 1, 1850],
    [1, 'Result Notification', 'education', 'auto', 1, 920],
    [1, 'Admission Update', 'education', 'auto', 1, 640],
    [1, 'Payslip Ready', 'corporate', 'auto', 1, 2100],
    [1, 'Leave Approval', 'corporate', 'auto', 1, 1540],
    [1, 'Meeting Invite', 'corporate', 'manual', 1, 890],
    [1, 'IT Alert', 'corporate', 'auto', 1, 430],
    [1, 'Order Confirmation', 'smb', 'auto', 1, 8920],
    [1, 'Delivery Update', 'smb', 'auto', 1, 6210],
    [1, 'Appointment Reminder', 'healthcare', 'scheduled', 1, 3800],
    [1, 'Prescription Ready', 'healthcare', 'auto', 1, 2100],
  ]
  notifTypes.forEach(n => insertNotif.run(...n))

  console.log('✅ Seed data inserted successfully')
}

export default db
