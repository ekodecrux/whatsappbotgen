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

export default app
