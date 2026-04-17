import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())
app.use('/static/*', serveStatic({ root: './' }))

// ─── Page Routes ──────────────────────────────────────────────────────────────
app.get('/', (c) => c.redirect('/landing'))
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
app.get('/dashboard', async (c) => {
  const { dashboardHTML } = await import('./pages/dashboard')
  return c.html(dashboardHTML())
})
app.get('/chatbot-builder', async (c) => {
  const { chatbotBuilderHTML } = await import('./pages/chatbot-builder')
  return c.html(chatbotBuilderHTML())
})
app.get('/campaigns', async (c) => {
  const { campaignsHTML } = await import('./pages/campaigns')
  return c.html(campaignsHTML())
})
app.get('/contacts', async (c) => {
  const { contactsHTML } = await import('./pages/contacts')
  return c.html(contactsHTML())
})
app.get('/leads', async (c) => {
  const { leadsHTML } = await import('./pages/leads')
  return c.html(leadsHTML())
})
app.get('/wallet', async (c) => {
  const { walletHTML } = await import('./pages/wallet')
  return c.html(walletHTML())
})
app.get('/integrations', async (c) => {
  const { integrationsHTML } = await import('./pages/integrations')
  return c.html(integrationsHTML())
})
app.get('/templates', async (c) => {
  const { templatesHTML } = await import('./pages/templates')
  return c.html(templatesHTML())
})
app.get('/analytics', async (c) => {
  const { analyticsHTML } = await import('./pages/analytics')
  return c.html(analyticsHTML())
})

// ─── Vertical & New Pages ─────────────────────────────────────────────────────
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
app.get('/whitelabel-admin', async (c) => {
  const { whitelabelAdminHTML } = await import('./pages/whitelabel-admin')
  return c.html(whitelabelAdminHTML())
})
app.get('/mini', async (c) => {
  const { miniInterfaceHTML } = await import('./pages/mini-interface')
  return c.html(miniInterfaceHTML())
})
app.get('/recharge', async (c) => {
  const { waRechargeHTML } = await import('./pages/wa-recharge')
  return c.html(waRechargeHTML())
})
app.get('/erp-integrations', async (c) => {
  const { erpIntegrationsHTML } = await import('./pages/erp-integrations')
  return c.html(erpIntegrationsHTML())
})
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
app.get('/verticals', async (c) => {
  const { verticalsHTML } = await import('./pages/verticals')
  return c.html(verticalsHTML())
})

// ─── Mock API Routes ───────────────────────────────────────────────────────────
app.get('/api/stats', (c) => c.json({
  totalContacts: 12847,
  messagesSent: 284912,
  campaignsActive: 7,
  leadsGenerated: 1293,
  walletBalance: 4250,
  deliveryRate: 98.4,
  openRate: 73.2,
  replyRate: 41.8
}))

app.get('/api/campaigns', (c) => c.json([
  { id: 1, name: 'Diwali Sale 2024', status: 'active', sent: 8420, delivered: 8321, opened: 6100, replies: 3400, created: '2024-10-20' },
  { id: 2, name: 'New Product Launch', status: 'scheduled', sent: 0, delivered: 0, opened: 0, replies: 0, created: '2024-10-25' },
  { id: 3, name: 'Customer Re-engagement', status: 'completed', sent: 12000, delivered: 11880, opened: 8900, replies: 4200, created: '2024-10-10' },
  { id: 4, name: 'Flash Sale - Weekend', status: 'paused', sent: 4500, delivered: 4450, opened: 3100, replies: 1800, created: '2024-10-18' },
]))

app.get('/api/leads', (c) => c.json([
  { id: 1, name: 'Rahul Sharma', phone: '+91 98765 43210', source: 'Poster - Diwali', status: 'hot', stage: 'demo', value: 15000, lastContact: '2 hrs ago' },
  { id: 2, name: 'Priya Mehta', phone: '+91 87654 32109', source: 'Website Chat', status: 'warm', stage: 'proposal', value: 8500, lastContact: '1 day ago' },
  { id: 3, name: 'Amit Patel', phone: '+91 76543 21098', source: 'Bulk Campaign', status: 'cold', stage: 'contacted', value: 3200, lastContact: '3 days ago' },
  { id: 4, name: 'Sunita Rao', phone: '+91 65432 10987', source: 'QR Code', status: 'hot', stage: 'closed', value: 22000, lastContact: 'Just now' },
  { id: 5, name: 'Vikram Singh', phone: '+91 54321 09876', source: 'Poster - Sale', status: 'warm', stage: 'negotiation', value: 11000, lastContact: '5 hrs ago' },
]))

app.get('/api/transactions', (c) => c.json([
  { id: 1, type: 'recharge', amount: 5000, credits: 50000, date: '2024-10-20', status: 'success' },
  { id: 2, type: 'debit', amount: -120, credits: -1200, date: '2024-10-21', status: 'success', campaign: 'Diwali Sale' },
  { id: 3, type: 'debit', amount: -84, credits: -840, date: '2024-10-22', status: 'success', campaign: 'Flash Sale' },
  { id: 4, type: 'recharge', amount: 2000, credits: 20000, date: '2024-10-23', status: 'success' },
]))

app.get('/api/templates', (c) => c.json([
  { id: 1, name: 'Welcome Message', category: 'UTILITY', status: 'approved', language: 'en', usageCount: 1240 },
  { id: 2, name: 'Order Confirmation', category: 'TRANSACTIONAL', status: 'approved', language: 'en', usageCount: 8920 },
  { id: 3, name: 'Flash Sale Offer', category: 'MARKETING', status: 'approved', language: 'en', usageCount: 3410 },
  { id: 4, name: 'Abandoned Cart', category: 'MARKETING', status: 'pending', language: 'en', usageCount: 0 },
  { id: 5, name: 'OTP Verification', category: 'AUTHENTICATION', status: 'approved', language: 'en', usageCount: 15200 },
]))

// ─── Delivery Engine API ───────────────────────────────────────────────────────
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
    { id: 'B005', name: 'HR Payslip - August', total: 850, sent: 0, delivered: 0, failed: 0, status: 'queued', time: '03:30 PM' },
  ]
}))

app.get('/api/erp/connections', (c) => c.json([
  { id: 1, name: 'SAP S/4HANA', type: 'ERP', status: 'connected', lastSync: '2 min ago', eventsToday: 1240, icon: 'building' },
  { id: 2, name: 'Tally Prime', type: 'Accounts', status: 'connected', lastSync: '15 min ago', eventsToday: 340, icon: 'calculator' },
  { id: 3, name: 'Salesforce CRM', type: 'CRM', status: 'connected', lastSync: '1 min ago', eventsToday: 892, icon: 'cloud' },
  { id: 4, name: 'Custom ERP (REST)', type: 'Custom', status: 'connected', lastSync: '5 min ago', eventsToday: 2100, icon: 'code' },
  { id: 5, name: 'Oracle HCM', type: 'HR', status: 'pending', lastSync: 'Never', eventsToday: 0, icon: 'users' },
  { id: 6, name: 'Zoho School', type: 'Education', status: 'connected', lastSync: '30 min ago', eventsToday: 580, icon: 'graduation-cap' },
]))

// ─── SMB API ───────────────────────────────────────────────────────────────────
app.get('/api/smb/stats', (c) => c.json({
  messagesSent: 8421,
  customersReached: 1240,
  waRevenue: 84000,
  botConversations: 3120,
  deliveryRate: 98.2,
  leadsThisMonth: 47,
  creditsLeft: 42500
}))

app.get('/api/smb/posters', (c) => c.json([
  { id: 1, name: 'Diwali Sale Poster', clicks: 840, leads: 142, active: true, created: '2024-10-15' },
  { id: 2, name: 'New Menu Card', clicks: 320, leads: 67, active: true, created: '2024-10-18' },
  { id: 3, name: 'Salon Packages', clicks: 210, leads: 38, active: false, created: '2024-10-10' },
]))

// ─── White-Label API ───────────────────────────────────────────────────────────
app.get('/api/wl/organizations', (c) => c.json([
  { id: 'SMHSS', name: "St. Mary's Higher Secondary School", type: 'education', plan: 'Pro', users: 320, msgMonth: '45K', balance: 4200, status: 'active' },
  { id: 'TSPL', name: 'Tech Solutions Pvt. Ltd.', type: 'corporate', plan: 'Business', users: 840, msgMonth: '1.2L', balance: 12400, status: 'active' },
  { id: 'CCC', name: 'City Commerce College', type: 'education', plan: 'Starter', users: 180, msgMonth: '18K', balance: 1800, status: 'active' },
  { id: 'GPC', name: 'Global Pharma Corp', type: 'corporate', plan: 'Enterprise', users: 2400, msgMonth: '5L', balance: 48000, status: 'active' },
  { id: 'SBC', name: 'Sunrise Bakery Chain', type: 'smb', plan: 'Starter', users: 12, msgMonth: '8K', balance: 900, status: 'active' },
  { id: 'IITAF', name: 'IIT Alumni Foundation', type: 'education', plan: 'Pro', users: 450, msgMonth: '65K', balance: 5800, status: 'low_credit' },
]))

app.get('/api/wl/summary', (c) => c.json({
  totalOrgs: 14,
  totalUsers: 8420,
  messagesThisMonth: 2400000,
  revenueThisMonth: 184000,
  activeOrgs: 12,
  lowCreditOrgs: 2
}))

// ─── Recharge API ──────────────────────────────────────────────────────────────
app.get('/api/recharge/transactions', (c) => c.json([
  { id: 1, date: 'Oct 23, 14:32', type: 'recharge', desc: 'Manual Recharge – UPI', credits: 25000, amount: 1999, balance: 67500, status: 'success' },
  { id: 2, date: 'Oct 23, 09:00', type: 'debit', desc: 'Fee Reminder – Class X', credits: -380, amount: -34, balance: 42500, status: 'sent' },
  { id: 3, date: 'Oct 22, 10:15', type: 'debit', desc: 'Exam Schedule – All Students', credits: -4800, amount: -432, balance: 42880, status: 'sent' },
  { id: 4, date: 'Oct 18, 08:00', type: 'auto', desc: 'Auto Recharge – UPI', credits: 25000, amount: 1999, balance: 47800, status: 'success' },
]))

app.get('/api/notifications/recent', (c) => c.json([
  { id: 1, type: 'fee_reminder', title: 'Fee Due Reminder', recipients: 380, source: 'ERP Auto', sent: '09:00 AM', status: 'delivered', vertical: 'education' },
  { id: 2, type: 'exam_schedule', title: 'Exam Timetable', recipients: 4800, source: 'Manual', sent: '10:15 AM', status: 'sending', vertical: 'education' },
  { id: 3, type: 'payslip', title: 'Payslip August 2024', recipients: 850, source: 'SAP Trigger', sent: 'Queued', status: 'queued', vertical: 'corporate' },
  { id: 4, type: 'leave_approval', title: 'Leave Approved', recipients: 1, source: 'HR System', sent: '11:30 AM', status: 'delivered', vertical: 'corporate' },
  { id: 5, type: 'assembly', title: 'Special Assembly Notice', recipients: 2400, source: 'ERP Auto', sent: '07:30 AM', status: 'delivered', vertical: 'education' },
  { id: 6, type: 'it_alert', title: 'System Maintenance Alert', recipients: 1200, source: 'IT Ticket', sent: '08:00 AM', status: 'delivered', vertical: 'corporate' },
]))

export default app
