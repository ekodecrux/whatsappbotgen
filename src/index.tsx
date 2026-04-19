import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'

type Bindings = {
  JWT_SECRET: string
  RAZORPAY_KEY_ID: string
  RAZORPAY_KEY_SECRET: string
  WA_PHONE_NUMBER_ID: string
  WA_ACCESS_TOKEN: string
  APP_VERSION: string
}

const app = new Hono<{ Bindings: Bindings }>()

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

// ─── Mini Interface ────────────────────────────────────────────────────────────
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

// ════════════════════════════════════════════════════════════════════════════════
// ─── FULL API BACKEND (Cloudflare Edge — no Node.js required) ─────────────────
// ════════════════════════════════════════════════════════════════════════════════

// ─── Health ───────────────────────────────────────────────────────────────────
app.get('/api/health', (c) => c.json({
  status: 'ok',
  db: 'cloudflare-edge',
  version: c.env.APP_VERSION || '2.0.0',
  razorpay: c.env.RAZORPAY_KEY_ID ? 'live' : 'demo',
  whatsapp: c.env.WA_PHONE_NUMBER_ID ? 'live' : 'demo',
  timestamp: new Date().toISOString()
}))

// ─── Auth ─────────────────────────────────────────────────────────────────────
app.post('/api/auth/login', async (c) => {
  const { email, password } = await c.req.json().catch(() => ({} as any))
  // Demo credentials — in production this would query D1
  const validUsers: Record<string, any> = {
    'admin@wapisend.in': { id: 1, name: 'Super Admin', role: 'superadmin', tenantId: 1, password: 'Admin@123' },
    'demo@wapisend.in':  { id: 2, name: 'Demo User',   role: 'admin',      tenantId: 1, password: 'Admin@123' },
  }
  const user = validUsers[email]
  if (!user || user.password !== password) {
    return c.json({ error: 'Invalid credentials. Use admin@wapisend.in / Admin@123' }, 401)
  }
  // Simple JWT-like token (base64 encoded payload)
  const payload = { userId: user.id, tenantId: user.tenantId, role: user.role, name: user.name, email, exp: Date.now() + 30*24*3600*1000 }
  const token = btoa(JSON.stringify(payload))
  return c.json({ success: true, token, user: { id: user.id, name: user.name, email, role: user.role, tenantId: user.tenantId } })
})

app.post('/api/auth/register', async (c) => {
  const { name, email, password, orgName, orgType, plan } = await c.req.json().catch(() => ({} as any))
  if (!name || !email || !password) return c.json({ error: 'Name, email and password required' }, 400)
  const payload = { userId: Math.floor(Math.random()*9000)+1000, tenantId: Math.floor(Math.random()*900)+100, role: 'admin', name, email, exp: Date.now() + 30*24*3600*1000 }
  const token = btoa(JSON.stringify(payload))
  return c.json({ success: true, token, user: { id: payload.userId, name, email, role: 'admin', tenantId: payload.tenantId } })
})

app.get('/api/auth/me', (c) => {
  const auth = c.req.header('Authorization')?.replace('Bearer ', '') || ''
  try {
    const user = JSON.parse(atob(auth))
    return c.json({ ...user, tenant: { id: user.tenantId, name: 'WapiSend Demo', type: 'SMB', plan: 'Pro', credits: 92499, subdomain: 'demo', brand_color: '#25D366', status: 'active' } })
  } catch {
    return c.json({ id: 1, name: 'Demo User', email: 'demo@wapisend.in', role: 'admin', tenant: { plan: 'Pro', credits: 92499 } })
  }
})

// ─── Stats (realistic dynamic data) ──────────────────────────────────────────
app.get('/api/stats', (c) => {
  const base = Date.now()
  const seed = Math.floor(base / 60000) // changes every minute
  const rng = (min: number, max: number) => min + ((seed * 1103515245 + 12345) & 0x7fffffff) % (max - min)
  return c.json({
    totalContacts:  12847 + rng(0, 50),
    messagesSent:   284912 + rng(0, 200),
    messagesSentTotal: 284912 + rng(0, 200),
    campaignsActive: 7,
    campaignsTotal: 14,
    leadsGenerated: 1293 + rng(0, 10),
    walletBalance:  9249,
    creditsBalance: 92499,
    deliveryRate:   98.4,
    openRate:       73.2,
    replyRate:      41.8,
    botsActive:     3,
    monthlyRevenue: 184000,
    _source:        'cloudflare-edge',
    _timestamp:     new Date().toISOString()
  })
})

// ─── Campaigns ────────────────────────────────────────────────────────────────
app.get('/api/campaigns', (c) => c.json([
  { id: 1, name: 'Diwali Sale 2024',        status: 'active',    total_recipients: 8500,  sent: 8420,  delivered: 8321,  opened: 6100, replies: 3400, failed: 99,  created_at: '2024-10-20' },
  { id: 2, name: 'New Product Launch',       status: 'scheduled', total_recipients: 5000,  sent: 0,     delivered: 0,     opened: 0,    replies: 0,    failed: 0,   created_at: '2024-10-25' },
  { id: 3, name: 'Customer Re-engagement',   status: 'completed', total_recipients: 12000, sent: 12000, delivered: 11880, opened: 8900, replies: 4200, failed: 120, created_at: '2024-10-10' },
  { id: 4, name: 'Flash Sale - Weekend',     status: 'paused',    total_recipients: 4500,  sent: 4500,  delivered: 4450,  opened: 3100, replies: 1800, failed: 50,  created_at: '2024-10-18' },
  { id: 5, name: 'Fee Reminder - November',  status: 'completed', total_recipients: 380,   sent: 380,   delivered: 376,   opened: 340,  replies: 120,  failed: 4,   created_at: '2024-11-01' },
  { id: 6, name: 'Payslip October',          status: 'active',    total_recipients: 850,   sent: 850,   delivered: 848,   opened: 820,  replies: 0,    failed: 2,   created_at: '2024-11-02' },
]))

app.post('/api/campaigns', async (c) => {
  const body = await c.req.json().catch(() => ({} as any))
  return c.json({ success: true, campaign: { id: Math.floor(Math.random()*1000)+100, ...body, status: 'draft', created_at: new Date().toISOString() } })
})

// ─── Contacts ─────────────────────────────────────────────────────────────────
app.get('/api/contacts', (c) => c.json({
  contacts: [
    { id: 1, name: 'Rahul Sharma',  phone: '+919876543210', email: 'rahul@example.com', tags: '["customer","vip"]', opt_in: 1, created_at: '2024-10-01' },
    { id: 2, name: 'Priya Mehta',   phone: '+918765432109', email: 'priya@example.com', tags: '["lead"]',           opt_in: 1, created_at: '2024-10-02' },
    { id: 3, name: 'Amit Patel',    phone: '+917654321098', email: 'amit@example.com',  tags: '["customer"]',       opt_in: 1, created_at: '2024-10-03' },
    { id: 4, name: 'Sunita Rao',    phone: '+916543210987', email: 'sunita@example.com',tags: '["vip","customer"]', opt_in: 1, created_at: '2024-10-04' },
    { id: 5, name: 'Vikram Singh',  phone: '+915432109876', email: 'vikram@example.com',tags: '["prospect"]',       opt_in: 1, created_at: '2024-10-05' },
    { id: 6, name: 'Meena Gupta',   phone: '+914321098765', email: 'meena@example.com', tags: '["customer"]',       opt_in: 1, created_at: '2024-10-06' },
    { id: 7, name: 'Arjun Nair',    phone: '+913210987654', email: 'arjun@example.com', tags: '["lead"]',           opt_in: 1, created_at: '2024-10-07' },
    { id: 8, name: 'Kavitha Reddy', phone: '+912109876543', email: 'kavitha@example.com',tags:'["customer"]',       opt_in: 1, created_at: '2024-10-08' },
    { id: 9, name: 'New Customer',  phone: '+919999999999', email: 'customer@test.in',  tags: '["new"]',            opt_in: 1, created_at: '2024-11-01' },
  ],
  total: 12847,
  page: 1,
  limit: 50
}))

app.post('/api/contacts', async (c) => {
  const body = await c.req.json().catch(() => ({} as any))
  if (!body.phone) return c.json({ error: 'Phone required' }, 400)
  return c.json({ success: true, id: Math.floor(Math.random()*9000)+1000 })
})

app.post('/api/contacts/bulk', async (c) => {
  const { contacts } = await c.req.json().catch(() => ({ contacts: [] }))
  return c.json({ success: true, inserted: contacts?.length || 0, skipped: 0, total: contacts?.length || 0 })
})

// ─── Leads ────────────────────────────────────────────────────────────────────
app.get('/api/leads', (c) => c.json([
  { id: 1, name: 'Rahul Sharma',  phone: '+919876543210', source: 'Poster - Diwali', status: 'hot',  stage: 'demo',        value: 15000, hours_since_contact: 2,  created_at: '2024-10-01' },
  { id: 2, name: 'Priya Mehta',   phone: '+918765432109', source: 'Website Chat',    status: 'warm', stage: 'proposal',    value: 8500,  hours_since_contact: 24, created_at: '2024-10-02' },
  { id: 3, name: 'Amit Patel',    phone: '+917654321098', source: 'Bulk Campaign',   status: 'cold', stage: 'contacted',   value: 3200,  hours_since_contact: 72, created_at: '2024-10-03' },
  { id: 4, name: 'Sunita Rao',    phone: '+916543210987', source: 'QR Code',         status: 'hot',  stage: 'closed',      value: 22000, hours_since_contact: 0,  created_at: '2024-10-04' },
  { id: 5, name: 'Vikram Singh',  phone: '+915432109876', source: 'Poster - Sale',   status: 'warm', stage: 'negotiation', value: 11000, hours_since_contact: 5,  created_at: '2024-10-05' },
]))

app.post('/api/leads', async (c) => {
  const body = await c.req.json().catch(() => ({} as any))
  return c.json({ success: true, id: Math.floor(Math.random()*9000)+1000 })
})

app.patch('/api/leads/:id', async (c) => {
  return c.json({ success: true })
})

// ─── Templates ────────────────────────────────────────────────────────────────
app.get('/api/templates', (c) => c.json([
  { id: 1, name: 'Welcome Message',   category: 'UTILITY',         language: 'en', status: 'approved', usage_count: 1240,  body: 'Hi {{1}}! Welcome to {{2}}.' },
  { id: 2, name: 'Order Confirmation',category: 'TRANSACTIONAL',   language: 'en', status: 'approved', usage_count: 8920,  body: 'Order #{{1}} confirmed! Amount: ₹{{2}}' },
  { id: 3, name: 'Flash Sale Offer',  category: 'MARKETING',       language: 'en', status: 'approved', usage_count: 3410,  body: '🔥 FLASH SALE! {{1}}% OFF. Code: {{2}}' },
  { id: 4, name: 'Abandoned Cart',    category: 'MARKETING',       language: 'en', status: 'pending',  usage_count: 0,     body: 'Hi {{1}}! You left items in your cart.' },
  { id: 5, name: 'OTP Verification',  category: 'AUTHENTICATION',  language: 'en', status: 'approved', usage_count: 15200, body: 'Your OTP is *{{1}}*. Valid 10 mins.' },
  { id: 6, name: 'Fee Reminder',      category: 'UTILITY',         language: 'en', status: 'approved', usage_count: 4820,  body: 'Fee of ₹{{1}} due on {{2}}.' },
  { id: 7, name: 'Payslip Ready',     category: 'TRANSACTIONAL',   language: 'en', status: 'approved', usage_count: 2100,  body: 'Payslip for {{1}} is ready. Download: {{2}}' },
]))

app.post('/api/templates', async (c) => {
  const body = await c.req.json().catch(() => ({} as any))
  return c.json({ success: true, id: Math.floor(Math.random()*9000)+100, status: 'pending', message: 'Template submitted for Meta approval' })
})

// ─── Send Message (Real WhatsApp API) ────────────────────────────────────────
app.post('/api/send', async (c) => {
  const { phone, message, templateId } = await c.req.json().catch(() => ({} as any))
  if (!phone || !message) return c.json({ error: 'Phone and message required' }, 400)

  const phoneId = c.env.WA_PHONE_NUMBER_ID
  const token   = c.env.WA_ACCESS_TOKEN

  if (phoneId && token) {
    try {
      const resp = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messaging_product: 'whatsapp', recipient_type: 'individual',
          to: phone.replace(/[^0-9]/g, ''),
          type: 'text', text: { body: message }
        })
      })
      const data: any = await resp.json()
      const waId = data?.messages?.[0]?.id
      return c.json({ success: true, messageId: waId, phone, status: 'sent', creditsUsed: 1, mode: 'live', timestamp: new Date().toISOString() })
    } catch (e: any) {
      return c.json({ success: false, error: e.message, mode: 'live' }, 500)
    }
  }

  // Demo mode
  return c.json({
    success: true,
    messageId: 'wamid.demo_' + Math.random().toString(36).substring(2, 22),
    phone, status: 'delivered', creditsUsed: 1, creditsRemaining: 92498,
    mode: 'demo', timestamp: new Date().toISOString()
  })
})

// ─── Transactions ──────────────────────────────────────────────────────────────
app.get('/api/transactions', (c) => c.json([
  { id: 8, type: 'recharge', credits: 50000, amount: 4000, description: 'WhatsApp Bot Recharge - 50K Pack',  payment_method: 'WhatsApp Pay',    status: 'success', created_at: '2024-11-01' },
  { id: 7, type: 'recharge', credits: 50000, amount: 4000, description: 'Credit Recharge - 50K Pack',        payment_method: 'GPay UPI',         status: 'success', created_at: '2024-10-20' },
  { id: 6, type: 'debit',    credits: -8960, amount: -896, description: 'Campaign: Customer Re-engagement',  payment_method: 'credits',          status: 'success', created_at: '2024-10-11' },
  { id: 5, type: 'recharge', credits: 20000, amount: 2000, description: 'Credit Recharge - 25K Pack',        payment_method: 'Card',             status: 'success', created_at: '2024-10-23' },
  { id: 4, type: 'debit',    credits: -840,  amount: -84,  description: 'Campaign: Flash Sale',              payment_method: 'credits',          status: 'success', created_at: '2024-10-22' },
  { id: 3, type: 'debit',    credits: -1200, amount: -120, description: 'Campaign: Diwali Sale 2024',         payment_method: 'credits',          status: 'success', created_at: '2024-10-21' },
  { id: 2, type: 'bonus',    credits: 5000,  amount: 0,    description: 'Welcome Bonus Credits',             payment_method: null,               status: 'success', created_at: '2024-10-01' },
  { id: 1, type: 'recharge', credits: 50000, amount: 4000, description: 'Credit Recharge - 50K Pack',        payment_method: 'HDFC NetBanking',  status: 'success', created_at: '2024-10-01' },
]))

// ─── Recharge — Create Razorpay Order (LIVE) ──────────────────────────────────
app.post('/api/recharge/create-order', async (c) => {
  const { packId } = await c.req.json().catch(() => ({} as any))
  const packs: Record<number,{credits:number,price:number}> = {
    1:{credits:10000,price:1000}, 2:{credits:25000,price:2250},
    3:{credits:50000,price:4000}, 4:{credits:100000,price:7500},
    5:{credits:250000,price:17500}, 6:{credits:500000,price:30000}
  }
  const pack = packs[packId]
  if (!pack) return c.json({ error: 'Invalid pack' }, 400)

  const keyId     = c.env.RAZORPAY_KEY_ID
  const keySecret = c.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    return c.json({ orderId: 'ORD_DEMO_' + Date.now(), amount: pack.price * 100, currency: 'INR', mode: 'demo', key: 'rzp_demo' })
  }

  try {
    const auth = btoa(`${keyId}:${keySecret}`)
    const resp = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: pack.price * 100, currency: 'INR', notes: { packId } })
    })
    const order: any = await resp.json()
    if (!resp.ok) return c.json({ error: order.error?.description || 'Razorpay error' }, 400)
    return c.json({ orderId: order.id, amount: order.amount, currency: order.currency, key: keyId, mode: 'live' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// ─── Recharge — Verify & Credit ───────────────────────────────────────────────
app.post('/api/recharge', async (c) => {
  const { packId, paymentMethod, razorpayPaymentId, razorpayOrderId, razorpaySignature } = await c.req.json().catch(() => ({} as any))
  const packs: Record<number,{credits:number,price:number}> = {
    1:{credits:10000,price:1000}, 2:{credits:25000,price:2250},
    3:{credits:50000,price:4000}, 4:{credits:100000,price:7500},
    5:{credits:250000,price:17500}, 6:{credits:500000,price:30000}
  }
  const pack = packs[packId]
  if (!pack) return c.json({ error: 'Invalid pack' }, 400)

  let verified = false
  const keySecret = c.env.RAZORPAY_KEY_SECRET

  if (keySecret && razorpayPaymentId && razorpayOrderId && razorpaySignature) {
    // Verify HMAC signature using Web Crypto API (works in Cloudflare Workers)
    const body = `${razorpayOrderId}|${razorpayPaymentId}`
    const key  = await crypto.subtle.importKey('raw', new TextEncoder().encode(keySecret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
    const sig  = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body))
    const hex  = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
    verified   = hex === razorpaySignature
  } else if (paymentMethod === 'demo' || !keySecret) {
    verified = true
  }

  if (!verified) return c.json({ error: 'Payment verification failed' }, 400)

  const txnId = 'TXN' + Date.now()
  return c.json({
    success: true, transactionId: txnId, packId,
    credits: pack.credits, amount: pack.price,
    newBalance: 92499 + pack.credits,
    paymentMethod: paymentMethod || 'razorpay',
    status: 'success',
    mode: keySecret ? 'live' : 'demo',
    invoiceUrl: `/api/invoices/${txnId}`,
    timestamp: new Date().toISOString()
  })
})

// ─── Credit Packs ──────────────────────────────────────────────────────────────
app.get('/api/credit-packs', (c) => c.json([
  { id:1, credits:10000,  price:1000,  pricePerCredit:0.10,  popular:false, label:'10K',  savings:null },
  { id:2, credits:25000,  price:2250,  pricePerCredit:0.09,  popular:false, label:'25K',  savings:'10% off' },
  { id:3, credits:50000,  price:4000,  pricePerCredit:0.08,  popular:true,  label:'50K',  savings:'20% off' },
  { id:4, credits:100000, price:7500,  pricePerCredit:0.075, popular:false, label:'1L',   savings:'25% off' },
  { id:5, credits:250000, price:17500, pricePerCredit:0.07,  popular:false, label:'2.5L', savings:'30% off' },
  { id:6, credits:500000, price:30000, pricePerCredit:0.06,  popular:false, label:'5L',   savings:'40% off' },
]))

// ─── Invoices ─────────────────────────────────────────────────────────────────
app.get('/api/invoices/:id', (c) => {
  const id = c.req.param('id')
  return c.json({
    invoiceNumber: 'INV-' + String(id).padStart(6, '0'),
    date: new Date().toISOString(),
    tenantName: 'WapiSend Demo',
    description: 'Credit Recharge',
    credits: 50000, amount: 4000, currency: 'INR',
    tax: 720, total: 4720, status: 'success'
  })
})

// ─── Delivery Queue ────────────────────────────────────────────────────────────
app.get('/api/delivery/queue', (c) => c.json({
  totalQueued: 48320, processing: 1200, delivered: 45890, failed: 42, pending: 1188,
  throttleRate: 80, batchSize: 50, qualityScore: 96, spamRisk: 'low',
  creditsAvailable: 92499,
  batches: [
    { id: 1, name: 'Morning Assembly Notice',  total: 2400, sent: 2400, delivered: 2389, failed: 11, batchStatus: 'completed', time: '07:30 AM' },
    { id: 2, name: 'Fee Reminder - Class X',   total: 380,  sent: 380,  delivered: 376,  failed: 4,  batchStatus: 'completed', time: '09:00 AM' },
    { id: 3, name: 'Exam Schedule - All',      total: 4800, sent: 3200, delivered: 3180, failed: 20, batchStatus: 'running',   time: '10:15 AM' },
    { id: 4, name: 'PTM Invite - Parents',     total: 1200, sent: 0,    delivered: 0,    failed: 0,  batchStatus: 'queued',    time: '02:00 PM' },
    { id: 5, name: 'HR Payslip - October',     total: 850,  sent: 0,    delivered: 0,    failed: 0,  batchStatus: 'queued',    time: '03:30 PM' },
  ],
  _source: 'cloudflare-edge'
}))

// ─── ERP Connections ───────────────────────────────────────────────────────────
app.get('/api/erp/connections', (c) => c.json([
  { id:1, name:'SAP S/4HANA',       type:'SAP',        status:'connected', events_today:1240, last_sync: new Date(Date.now()-2*60000).toISOString() },
  { id:2, name:'Tally Prime',        type:'Tally',      status:'connected', events_today:340,  last_sync: new Date(Date.now()-15*60000).toISOString() },
  { id:3, name:'Salesforce CRM',     type:'Salesforce', status:'connected', events_today:892,  last_sync: new Date(Date.now()-60000).toISOString() },
  { id:4, name:'Custom ERP (REST)',  type:'Custom',     status:'connected', events_today:2100, last_sync: new Date(Date.now()-5*60000).toISOString() },
  { id:5, name:'Oracle HCM',         type:'Oracle',     status:'pending',   events_today:0,    last_sync: null },
  { id:6, name:'Zoho School',        type:'Zoho',       status:'connected', events_today:580,  last_sync: new Date(Date.now()-30*60000).toISOString() },
]))

app.post('/api/erp/connections', async (c) => {
  const body = await c.req.json().catch(() => ({} as any))
  const newId = Math.floor(Math.random()*900)+100
  return c.json({ success: true, id: newId, webhookUrl: `https://wapisend.pages.dev/api/webhook/erp/${newId}` })
})

app.post('/api/erp/connections/:id/test', (c) => {
  return c.json({ success: true, status: 'connected', message: 'ERP connection test successful' })
})

// ─── Webhooks ─────────────────────────────────────────────────────────────────
app.get('/api/webhook/whatsapp', (c) => {
  const mode      = c.req.query('hub.mode')
  const token     = c.req.query('hub.verify_token')
  const challenge = c.req.query('hub.challenge')
  if (mode === 'subscribe' && token === 'wapisend_webhook_2024') {
    return new Response(challenge, { status: 200 })
  }
  return c.json({ error: 'Invalid verify token' }, 403)
})

app.post('/api/webhook/whatsapp', async (c) => {
  return c.json({ received: true })
})

app.post('/api/webhook/erp/:erpId', async (c) => {
  return c.json({ success: true, message: 'Webhook received' })
})

// ─── Notifications ─────────────────────────────────────────────────────────────
app.get('/api/notifications/recent', (c) => c.json({
  recentMessages: [
    { id:1, phone:'+919876543210', message:'Fee Reminder sent', status:'delivered', source:'ERP Auto',  created_at: new Date(Date.now()-3600000).toISOString() },
    { id:2, phone:'+918765432109', message:'Exam Schedule',     status:'delivered', source:'Manual',    created_at: new Date(Date.now()-7200000).toISOString() },
    { id:3, phone:'+917654321098', message:'Payslip October',   status:'queued',    source:'SAP Auto',  created_at: new Date(Date.now()-1800000).toISOString() },
  ],
  notificationTypes: [
    { id:1, name:'Fee Reminder',    category:'education', trigger_type:'scheduled', is_active:1, send_count:4820 },
    { id:2, name:'Exam Schedule',   category:'education', trigger_type:'manual',    is_active:1, send_count:3210 },
    { id:3, name:'Payslip Ready',   category:'corporate', trigger_type:'auto',      is_active:1, send_count:2100 },
    { id:4, name:'Leave Approval',  category:'corporate', trigger_type:'auto',      is_active:1, send_count:1540 },
    { id:5, name:'Order Update',    category:'smb',       trigger_type:'auto',      is_active:1, send_count:8920 },
    { id:6, name:'Appointment',     category:'healthcare',trigger_type:'scheduled', is_active:1, send_count:3800 },
  ]
}))

app.get('/api/notifications/types', (c) => c.json([
  { id:1, name:'Fee Reminder',     category:'education', trigger_type:'scheduled', is_active:1, send_count:4820 },
  { id:2, name:'Exam Schedule',    category:'education', trigger_type:'manual',    is_active:1, send_count:3210 },
  { id:3, name:'PTM Invite',       category:'education', trigger_type:'scheduled', is_active:1, send_count:2100 },
  { id:4, name:'Payslip Ready',    category:'corporate', trigger_type:'auto',      is_active:1, send_count:2100 },
  { id:5, name:'Leave Approval',   category:'corporate', trigger_type:'auto',      is_active:1, send_count:1540 },
  { id:6, name:'Order Confirmation',category:'smb',      trigger_type:'auto',      is_active:1, send_count:8920 },
  { id:7, name:'Appointment Reminder',category:'healthcare',trigger_type:'scheduled',is_active:1, send_count:3800 },
]))

app.post('/api/notifications/send', async (c) => {
  const { phones } = await c.req.json().catch(() => ({phones:[]}))
  return c.json({ success: true, queued: phones?.length || 0 })
})

// ─── Bots ─────────────────────────────────────────────────────────────────────
app.get('/api/bots', (c) => c.json([
  { id:1, name:'Welcome Bot',     description:'Greets new customers', status:'active', trigger_keyword:'HI,HELLO,START', conversations:8421 },
  { id:2, name:'Product Enquiry', description:'Handles product Qs',   status:'active', trigger_keyword:'PRICE,PRODUCT,BUY', conversations:2130 },
  { id:3, name:'Support Bot',     description:'Routes support tickets',status:'paused', trigger_keyword:'HELP,SUPPORT', conversations:0 },
  { id:4, name:'Lead Capture',    description:'Captures lead info',    status:'active', trigger_keyword:'INFO,DEMO,TRIAL', conversations:4892 },
]))

app.post('/api/bots', async (c) => {
  const body = await c.req.json().catch(() => ({} as any))
  return c.json({ success: true, id: Math.floor(Math.random()*900)+100 })
})

app.patch('/api/bots/:id', async (c) => c.json({ success: true }))

// ─── Tenants ───────────────────────────────────────────────────────────────────
app.get('/api/tenants', (c) => c.json([
  { id:1, name:'WapiSend Demo',       type:'SMB',        plan:'Pro',        credits:92499,  mrr:2999, status:'active', subdomain:'demo',    messagesThisMonth:51,     userCount:2 },
  { id:2, name:'Delhi Public School', type:'Education',  plan:'Enterprise', credits:450000, mrr:7999, status:'active', subdomain:'dps',     messagesThisMonth:124320, userCount:5 },
  { id:3, name:'Infosys HR Dept',     type:'Corporate',  plan:'Enterprise', credits:800000, mrr:7999, status:'active', subdomain:'infosys', messagesThisMonth:324100, userCount:12 },
  { id:4, name:'TCS Regional Office', type:'Corporate',  plan:'Pro',        credits:250000, mrr:2999, status:'active', subdomain:'tcs',     messagesThisMonth:98430,  userCount:8 },
  { id:5, name:'Rajasthan University',type:'Education',  plan:'Enterprise', credits:600000, mrr:7999, status:'active', subdomain:'ru',      messagesThisMonth:198000, userCount:20 },
  { id:6, name:'Green Valley Pharmacy',type:'SMB',       plan:'Starter',    credits:15000,  mrr:999,  status:'active', subdomain:'gvp',     messagesThisMonth:8200,   userCount:2 },
  { id:7, name:'Sunrise Hospital',    type:'Healthcare', plan:'Pro',        credits:180000, mrr:2999, status:'active', subdomain:'sunrise', messagesThisMonth:72400,  userCount:6 },
]))

app.post('/api/tenants', async (c) => {
  const body = await c.req.json().catch(() => ({} as any))
  return c.json({ success: true, id: Math.floor(Math.random()*900)+100, tempPassword: 'Welcome@' + Math.floor(Math.random()*9000+1000) })
})

app.patch('/api/tenants/:id/credits', async (c) => c.json({ success: true }))

// ─── Platform Stats ────────────────────────────────────────────────────────────
app.get('/api/platform/stats', (c) => c.json({
  totalTenants: 248, activeTenants: 240, totalResellers: 12,
  platformRevenue: 1840000, totalMessages: 1280000,
  deliveryRate: 98.6, platformMargin: 38.2, churnRate: 2.1,
  creditsIssuedTotal: 42800000, _source: 'cloudflare-edge'
}))

// ─── Resellers ────────────────────────────────────────────────────────────────
app.get('/api/resellers', (c) => c.json([
  { id:1, name:'TechSolutions Pvt Ltd',  email:'tech@solutions.in',   tier:'Platinum', commission:22, total_tenants:42, monthly_revenue:280000, status:'active' },
  { id:2, name:'Digital India Partners', email:'contact@dip.in',      tier:'Gold',     commission:18, total_tenants:31, monthly_revenue:195000, status:'active' },
  { id:3, name:'EduTech Resellers',      email:'info@edutech.in',     tier:'Gold',     commission:18, total_tenants:28, monthly_revenue:168000, status:'active' },
  { id:4, name:'BizConnect India',       email:'hello@bizconnect.in', tier:'Silver',   commission:15, total_tenants:22, monthly_revenue:132000, status:'active' },
  { id:5, name:'StartupHub Services',    email:'ops@startuphub.in',   tier:'Silver',   commission:15, total_tenants:18, monthly_revenue:95000,  status:'active' },
  { id:6, name:'MegaComm Network',       email:'sales@megacomm.in',   tier:'Bronze',   commission:10, total_tenants:15, monthly_revenue:78000,  status:'active' },
]))

// ─── Compliance ────────────────────────────────────────────────────────────────
app.get('/api/compliance/status', (c) => c.json({
  metaApiStatus: c.env.WA_PHONE_NUMBER_ID ? 'connected' : 'demo',
  qualityRating: 'HIGH', spamRiskScore: 0.4,
  optInRate: 98.6, optOutRate: 0.2,
  templateApprovalRate: 94, complianceGrade: 'A+',
  lastAudit: '2024-10-28',
  mode: c.env.WA_PHONE_NUMBER_ID ? 'live' : 'demo',
  _source: 'cloudflare-edge'
}))

// ─── Analytics ────────────────────────────────────────────────────────────────
app.get('/api/analytics', (c) => {
  const days = 7
  const daily = Array.from({length: days}, (_, i) => {
    const d = new Date(Date.now() - (days-1-i)*86400000)
    return { date: d.toISOString().split('T')[0], sent: 1000+Math.floor(Math.random()*5000), delivered: 980+Math.floor(Math.random()*4900), received: 20+Math.floor(Math.random()*200) }
  })
  return c.json({ period: '7d', days, dailyMessages: daily, totals: { total: 51000, delivered: 50000, inbound: 1000 }, _source: 'cloudflare-edge' })
})

// ─── WA Numbers ────────────────────────────────────────────────────────────────
app.get('/api/wa-numbers', (c) => c.json([
  { id:1, phone:'+91 98765 43210', display_name:'WapiSend Business', phone_number_id: c.env.WA_PHONE_NUMBER_ID || 'demo', quality:'HIGH',   status:'connected', daily_limit:100000, messages_today:1240 },
  { id:2, phone:'+91 87654 32109', display_name:'WapiSend Store',    phone_number_id:'',                                  quality:'MEDIUM', status:'connected', daily_limit:50000,  messages_today:540  },
]))

// ─── Edu / Corp / SMB Stats ────────────────────────────────────────────────────
app.get('/api/edu/stats', (c) => c.json({
  feeReminders:4820, examNotifications:3210, ptmInvites:2100, assemblyNotices:1850,
  totalMessages:11980, deliveryRate:99.1, parentEngagement:87.4, _source:'cloudflare-edge'
}))

app.get('/api/corp/stats', (c) => c.json({
  payslipsSent:2100, leaveApprovals:1540, meetingInvites:890, itAlerts:430,
  totalMessages:4960, employeeEngagement:91.3, hrEfficiency:73.2, _source:'cloudflare-edge'
}))

// ─── Contact Export ────────────────────────────────────────────────────────────
app.get('/api/contacts/export', (c) => {
  const csv = 'Name,Phone,Email,Tags,OptIn,CreatedAt\nRahul Sharma,+919876543210,rahul@example.com,"[customer,vip]",1,2024-10-01\nPriya Mehta,+918765432109,priya@example.com,"[lead]",1,2024-10-02'
  return new Response(csv, { headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="contacts.csv"' } })
})

// ─── WhatsApp Recharge Bot Init ────────────────────────────────────────────────
app.post('/api/wa-recharge/init', async (c) => {
  return c.json({ success: true, message: '👋 Welcome to WapiSend Recharge Bot!\n\n1️⃣ 10K — ₹1,000\n2️⃣ 50K — ₹4,000 ⭐\n3️⃣ 1L — ₹7,500', sessionId: 'RCHRG_' + Date.now(), nextStep: 'select_pack' })
})

export default app
