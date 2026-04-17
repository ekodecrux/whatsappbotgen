import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())
app.use('/static/*', serveStatic({ root: './' }))

// ─── Redirect root ────────────────────────────────────────────────────────────
app.get('/', (c) => c.redirect('/landing'))

// ─── Public Pages ─────────────────────────────────────────────────────────────
app.get('/landing', async (c) => {
  const { landingHTML } = await import('./pages/landing')
  return c.html(landingHTML())
})
app.get('/login', async (c) => {
  const { loginHTML } = await import('./pages/auth')
  return c.html(loginHTML())
})
app.get('/register', async (c) => {
  const { registerHTML } = await import('./pages/auth')
  return c.html(registerHTML())
})

// ─── Core Dashboard Pages ──────────────────────────────────────────────────────
app.get('/dashboard', async (c) => {
  const { dashboardHTML } = await import('./pages/dashboard')
  return c.html(dashboardHTML())
})
app.get('/analytics', async (c) => {
  const { analyticsHTML } = await import('./pages/analytics')
  return c.html(analyticsHTML())
})

// ─── Messaging Pages ──────────────────────────────────────────────────────────
app.get('/campaigns', async (c) => {
  const { campaignsHTML } = await import('./pages/campaigns')
  return c.html(campaignsHTML())
})
app.get('/templates', async (c) => {
  const { templatesHTML } = await import('./pages/templates')
  return c.html(templatesHTML())
})
app.get('/chatbot-builder', async (c) => {
  const { chatbotBuilderHTML } = await import('./pages/chatbot-builder')
  return c.html(chatbotBuilderHTML())
})

// ─── CRM & Leads ──────────────────────────────────────────────────────────────
app.get('/contacts', async (c) => {
  const { contactsHTML } = await import('./pages/contacts')
  return c.html(contactsHTML())
})
app.get('/leads', async (c) => {
  const { leadsHTML } = await import('./pages/leads')
  return c.html(leadsHTML())
})

// ─── Integrations ─────────────────────────────────────────────────────────────
app.get('/integrations', async (c) => {
  const { integrationsHTML } = await import('./pages/integrations')
  return c.html(integrationsHTML())
})
app.get('/erp-integrations', async (c) => {
  const { erpIntegrationsHTML } = await import('./pages/erp-integrations')
  return c.html(erpIntegrationsHTML())
})

// ─── Vertical Industry Dashboards ─────────────────────────────────────────────
app.get('/edu-dashboard', async (c) => {
  const { eduDashboardHTML } = await import('./pages/edu-dashboard')
  return c.html(eduDashboardHTML())
})
app.get('/corp-dashboard', async (c) => {
  const { corpDashboardHTML } = await import('./pages/corp-dashboard')
  return c.html(corpDashboardHTML())
})
app.get('/smb-dashboard', async (c) => {
  const { smbDashboardHTML } = await import('./pages/smb-dashboard')
  return c.html(smbDashboardHTML())
})
app.get('/verticals', async (c) => {
  const { verticalsHTML } = await import('./pages/verticals')
  return c.html(verticalsHTML())
})

// ─── Enterprise Operations ─────────────────────────────────────────────────────
app.get('/delivery-engine', async (c) => {
  const { deliveryEngineHTML } = await import('./pages/delivery-engine')
  return c.html(deliveryEngineHTML())
})
app.get('/notification-hub', async (c) => {
  const { notificationHubHTML } = await import('./pages/notification-hub')
  return c.html(notificationHubHTML())
})
app.get('/compliance', async (c) => {
  const { complianceHTML } = await import('./pages/compliance')
  return c.html(complianceHTML())
})

// ─── White-label & Admin ───────────────────────────────────────────────────────
app.get('/whitelabel', async (c) => {
  const { whitelabelHTML } = await import('./pages/whitelabel')
  return c.html(whitelabelHTML())
})
app.get('/super-admin', async (c) => {
  const { superAdminHTML } = await import('./pages/super-admin')
  return c.html(superAdminHTML())
})

// ─── Mini Interface (mobile-first, standalone) ─────────────────────────────────
app.get('/mini', async (c) => {
  const { miniHTML } = await import('./pages/mini')
  return c.html(miniHTML())
})

// ─── Wallet & Recharge ────────────────────────────────────────────────────────
app.get('/wallet', async (c) => {
  const { walletHTML } = await import('./pages/wallet')
  return c.html(walletHTML())
})
app.get('/recharge', async (c) => {
  const { rechargeHTML } = await import('./pages/recharge')
  return c.html(rechargeHTML())
})

// ═══════════════════════════════════════════════════════════════════════════════
// ─── API Routes ───────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

// Platform Stats
app.get('/api/stats', (c) => c.json({
  totalContacts: 12847,
  messagesSent: 284912,
  campaignsActive: 7,
  leadsGenerated: 1293,
  walletBalance: 4250,
  deliveryRate: 98.4,
  openRate: 73.2,
  replyRate: 41.8,
  creditsBalance: 42500,
  botsActive: 4,
  monthlyRevenue: 1840000,
}))

// Campaigns
app.get('/api/campaigns', (c) => c.json([
  { id: 1, name: 'Diwali Sale 2024', status: 'active', sent: 8420, delivered: 8321, opened: 6100, replies: 3400, created: '2024-10-20' },
  { id: 2, name: 'New Product Launch', status: 'scheduled', sent: 0, delivered: 0, opened: 0, replies: 0, created: '2024-10-25' },
  { id: 3, name: 'Customer Re-engagement', status: 'completed', sent: 12000, delivered: 11880, opened: 8900, replies: 4200, created: '2024-10-10' },
  { id: 4, name: 'Flash Sale - Weekend', status: 'paused', sent: 4500, delivered: 4450, opened: 3100, replies: 1800, created: '2024-10-18' },
  { id: 5, name: 'Fee Reminder - November', status: 'completed', sent: 380, delivered: 376, opened: 340, replies: 120, created: '2024-11-01' },
  { id: 6, name: 'Payslip October', status: 'active', sent: 850, delivered: 848, opened: 820, replies: 0, created: '2024-11-02' },
]))

// Leads
app.get('/api/leads', (c) => c.json([
  { id: 1, name: 'Rahul Sharma', phone: '+91 98765 43210', source: 'Poster - Diwali', status: 'hot', stage: 'demo', value: 15000, lastContact: '2 hrs ago' },
  { id: 2, name: 'Priya Mehta', phone: '+91 87654 32109', source: 'Website Chat', status: 'warm', stage: 'proposal', value: 8500, lastContact: '1 day ago' },
  { id: 3, name: 'Amit Patel', phone: '+91 76543 21098', source: 'Bulk Campaign', status: 'cold', stage: 'contacted', value: 3200, lastContact: '3 days ago' },
  { id: 4, name: 'Sunita Rao', phone: '+91 65432 10987', source: 'QR Code', status: 'hot', stage: 'closed', value: 22000, lastContact: 'Just now' },
  { id: 5, name: 'Vikram Singh', phone: '+91 54321 09876', source: 'Poster - Sale', status: 'warm', stage: 'negotiation', value: 11000, lastContact: '5 hrs ago' },
]))

// Transactions
app.get('/api/transactions', (c) => c.json([
  { id: 1, type: 'recharge', amount: 5000, credits: 50000, date: '2024-10-20', status: 'success', method: 'GPay UPI' },
  { id: 2, type: 'debit', amount: -120, credits: -1200, date: '2024-10-21', status: 'success', campaign: 'Diwali Sale' },
  { id: 3, type: 'debit', amount: -84, credits: -840, date: '2024-10-22', status: 'success', campaign: 'Flash Sale' },
  { id: 4, type: 'recharge', amount: 2000, credits: 20000, date: '2024-10-23', status: 'success', method: 'Card' },
  { id: 5, type: 'recharge', amount: 4000, credits: 50000, date: '2024-11-01', status: 'success', method: 'WhatsApp Recharge' },
]))

// Templates
app.get('/api/templates', (c) => c.json([
  { id: 1, name: 'Welcome Message', category: 'UTILITY', status: 'approved', language: 'en', usageCount: 1240 },
  { id: 2, name: 'Order Confirmation', category: 'TRANSACTIONAL', status: 'approved', language: 'en', usageCount: 8920 },
  { id: 3, name: 'Flash Sale Offer', category: 'MARKETING', status: 'approved', language: 'en', usageCount: 3410 },
  { id: 4, name: 'Abandoned Cart', category: 'MARKETING', status: 'pending', language: 'en', usageCount: 0 },
  { id: 5, name: 'OTP Verification', category: 'AUTHENTICATION', status: 'approved', language: 'en', usageCount: 15200 },
  { id: 6, name: 'Fee Reminder', category: 'UTILITY', status: 'approved', language: 'en', usageCount: 4820 },
  { id: 7, name: 'Payslip Ready', category: 'TRANSACTIONAL', status: 'approved', language: 'en', usageCount: 2100 },
]))

// Delivery Engine Queue
app.get('/api/delivery/queue', (c) => c.json({
  totalQueued: 48320,
  processing: 1200,
  delivered: 45890,
  failed: 42,
  throttleRate: 80,
  batchSize: 50,
  qualityScore: 96,
  spamRisk: 'low',
  batches: [
    { id: 'B001', name: 'Morning Assembly Notice', total: 2400, sent: 2400, delivered: 2389, failed: 11, status: 'completed', time: '07:30 AM' },
    { id: 'B002', name: 'Fee Reminder - Class X', total: 380, sent: 380, delivered: 376, failed: 4, status: 'completed', time: '09:00 AM' },
    { id: 'B003', name: 'Exam Schedule - All Classes', total: 4800, sent: 3200, delivered: 3180, failed: 20, status: 'running', time: '10:15 AM' },
    { id: 'B004', name: 'PTM Invite - Parents', total: 1200, sent: 0, delivered: 0, failed: 0, status: 'queued', time: '02:00 PM' },
    { id: 'B005', name: 'HR Payslip - October', total: 850, sent: 0, delivered: 0, failed: 0, status: 'queued', time: '03:30 PM' },
  ]
}))

// ERP Connections
app.get('/api/erp/connections', (c) => c.json([
  { id: 1, name: 'SAP S/4HANA', type: 'ERP', status: 'connected', lastSync: '2 min ago', eventsToday: 1240, icon: 'building' },
  { id: 2, name: 'Tally Prime', type: 'Accounts', status: 'connected', lastSync: '15 min ago', eventsToday: 340, icon: 'calculator' },
  { id: 3, name: 'Salesforce CRM', type: 'CRM', status: 'connected', lastSync: '1 min ago', eventsToday: 892, icon: 'cloud' },
  { id: 4, name: 'Custom ERP (REST)', type: 'Custom', status: 'connected', lastSync: '5 min ago', eventsToday: 2100, icon: 'code' },
  { id: 5, name: 'Oracle HCM', type: 'HR', status: 'pending', lastSync: 'Never', eventsToday: 0, icon: 'users' },
  { id: 6, name: 'Zoho School', type: 'Education', status: 'connected', lastSync: '30 min ago', eventsToday: 580, icon: 'graduation-cap' },
]))

// Notifications Recent
app.get('/api/notifications/recent', (c) => c.json([
  { id: 1, type: 'fee_reminder', title: 'Fee Due Reminder', recipients: 380, source: 'ERP Auto', sent: '09:00 AM', status: 'delivered', vertical: 'education' },
  { id: 2, type: 'exam_schedule', title: 'Exam Timetable', recipients: 4800, source: 'Manual', sent: '10:15 AM', status: 'sending', vertical: 'education' },
  { id: 3, type: 'payslip', title: 'Payslip October 2024', recipients: 850, source: 'SAP Trigger', sent: 'Queued', status: 'queued', vertical: 'corporate' },
  { id: 4, type: 'leave_approval', title: 'Leave Approved', recipients: 1, source: 'HR System', sent: '11:30 AM', status: 'delivered', vertical: 'corporate' },
  { id: 5, type: 'assembly', title: 'Special Assembly Notice', recipients: 2400, source: 'ERP Auto', sent: '07:30 AM', status: 'delivered', vertical: 'education' },
  { id: 6, type: 'it_alert', title: 'System Maintenance Alert', recipients: 1200, source: 'IT Ticket', sent: '08:00 AM', status: 'delivered', vertical: 'corporate' },
]))

// Tenants API (for whitelabel admin)
app.get('/api/tenants', (c) => c.json([
  { id: 1, name: 'Delhi Public School', type: 'Education', plan: 'Enterprise', credits: 450000, messagesThisMonth: 124320, status: 'active', subdomain: 'dps', mrr: 7999 },
  { id: 2, name: 'Infosys Ltd - HR Dept', type: 'Corporate', plan: 'Enterprise', credits: 800000, messagesThisMonth: 324100, status: 'active', subdomain: 'infosys', mrr: 7999 },
  { id: 3, name: 'TCS Regional Office', type: 'Corporate', plan: 'Pro', credits: 250000, messagesThisMonth: 98430, status: 'active', subdomain: 'tcs', mrr: 2999 },
  { id: 4, name: 'Rajasthan University', type: 'Education', plan: 'Enterprise', credits: 600000, messagesThisMonth: 198000, status: 'active', subdomain: 'ru', mrr: 7999 },
  { id: 5, name: 'Green Valley Pharmacy', type: 'SMB', plan: 'Starter', credits: 15000, messagesThisMonth: 8200, status: 'active', subdomain: 'gvp', mrr: 999 },
  { id: 6, name: 'Sunrise Hospital', type: 'Healthcare', plan: 'Pro', credits: 180000, messagesThisMonth: 72400, status: 'active', subdomain: 'sunrise', mrr: 2999 },
]))

// Credit packs
app.get('/api/credit-packs', (c) => c.json([
  { id: 1, credits: 10000, price: 1000, pricePerCredit: 0.10, popular: false, label: '10K' },
  { id: 2, credits: 25000, price: 2250, pricePerCredit: 0.09, popular: false, label: '25K' },
  { id: 3, credits: 50000, price: 4000, pricePerCredit: 0.08, popular: true, label: '50K' },
  { id: 4, credits: 100000, price: 7500, pricePerCredit: 0.075, popular: false, label: '1L' },
  { id: 5, credits: 250000, price: 17500, pricePerCredit: 0.07, popular: false, label: '2.5L' },
  { id: 6, credits: 500000, price: 30000, pricePerCredit: 0.06, popular: false, label: '5L' },
]))

// Platform super-admin stats
app.get('/api/platform/stats', (c) => c.json({
  totalTenants: 248,
  activeTenants: 240,
  totalResellers: 12,
  platformRevenue: 1840000,
  totalMessages: 1280000,
  deliveryRate: 98.6,
  platformMargin: 38.2,
  churnRate: 2.1,
  creditsIssuedTotal: 42800000,
}))

// Compliance status
app.get('/api/compliance/status', (c) => c.json({
  metaApiStatus: 'connected',
  qualityRating: 'HIGH',
  spamRiskScore: 0.4,
  optInRate: 98.6,
  optOutRate: 0.2,
  templateApprovalRate: 94,
  complianceGrade: 'A+',
  lastAudit: '2024-10-28',
}))

// Mock send message endpoint
app.post('/api/send', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const { phone, message, templateId } = body as any
  if (!phone || !message) {
    return c.json({ success: false, error: 'Phone and message required' }, 400)
  }
  return c.json({
    success: true,
    messageId: 'wamid.' + Math.random().toString(36).substr(2, 20),
    phone,
    status: 'sent',
    credits_used: 1,
    timestamp: new Date().toISOString(),
  })
})

// Mock recharge endpoint
app.post('/api/recharge', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const { packId, paymentMethod } = body as any
  return c.json({
    success: true,
    transactionId: 'TXN' + Date.now(),
    packId,
    paymentMethod,
    status: 'success',
    invoiceUrl: '/invoices/INV-' + Date.now() + '.pdf',
    timestamp: new Date().toISOString(),
  })
})

export default app
