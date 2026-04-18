import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'

const app = new Hono()

// Real backend API URL (port 3001)
const API_BASE = 'http://localhost:3001'

app.use('*', cors())
app.use('/static/*', serveStatic({ root: './' }))

// ─── API Proxy: Forward all /api/* to real Node.js backend ──────────────────
app.all('/api/*', async (c) => {
  const url = new URL(c.req.url)
  const targetUrl = API_BASE + url.pathname + url.search

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Forward auth header if present
  const authHeader = c.req.header('Authorization')
  if (authHeader) headers['Authorization'] = authHeader
  const tokenHeader = c.req.header('x-auth-token')
  if (tokenHeader) headers['x-auth-token'] = tokenHeader

  let body: string | undefined = undefined
  const method = c.req.method
  if (method !== 'GET' && method !== 'HEAD') {
    try {
      body = await c.req.text()
    } catch {
      body = undefined
    }
  }

  try {
    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
    })

    const contentType = response.headers.get('Content-Type') || 'application/json'
    const responseText = await response.text()

    return new Response(responseText, {
      status: response.status,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-auth-token',
      },
    })
  } catch (err: any) {
    return c.json({ error: 'API backend unavailable', detail: err?.message }, 503)
  }
})

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

export default app
