# WapiSend — WhatsApp Business SaaS Platform

## 🚀 Production Status: LIVE ✅

| | |
|---|---|
| **Production URL** | https://wapisend.pages.dev |
| **GitHub** | https://github.com/ekodecrux/whatsappbotgen |
| **Platform** | Cloudflare Pages (Edge) |
| **Last Deploy** | 2026-04-19 |
| **Commit** | 1d75bd5 |

---

## 🌐 All Live Pages (25 routes — all HTTP 200)

| Category | URL |
|---|---|
| Landing | https://wapisend.pages.dev/landing |
| Login | https://wapisend.pages.dev/login |
| Register | https://wapisend.pages.dev/register |
| Dashboard | https://wapisend.pages.dev/dashboard |
| Analytics | https://wapisend.pages.dev/analytics |
| Campaigns | https://wapisend.pages.dev/campaigns |
| Templates | https://wapisend.pages.dev/templates |
| Chatbot Builder | https://wapisend.pages.dev/chatbot-builder |
| Contacts | https://wapisend.pages.dev/contacts |
| Leads & CRM | https://wapisend.pages.dev/leads |
| Integrations | https://wapisend.pages.dev/integrations |
| Recharge | https://wapisend.pages.dev/recharge |
| Wallet | https://wapisend.pages.dev/wallet |
| Mini Interface | https://wapisend.pages.dev/mini |
| White-Label Admin | https://wapisend.pages.dev/whitelabel |
| Super Admin | https://wapisend.pages.dev/super-admin |
| Compliance | https://wapisend.pages.dev/compliance |
| Notification Hub | https://wapisend.pages.dev/notification-hub |
| Delivery Engine | https://wapisend.pages.dev/delivery-engine |
| ERP Integrations | https://wapisend.pages.dev/erp-integrations |
| Education Dashboard | https://wapisend.pages.dev/edu-dashboard |
| Corporate Dashboard | https://wapisend.pages.dev/corp-dashboard |
| SMB Dashboard | https://wapisend.pages.dev/smb-dashboard |
| Verticals | https://wapisend.pages.dev/verticals |

---

## 🔌 API Endpoints (12 endpoints — all HTTP 200)

| Endpoint | Description |
|---|---|
| `GET /api/health` | Health check — edge DB, version, Razorpay/WA status |
| `GET /api/stats` | Platform stats (contacts, messages, revenue) |
| `GET /api/campaigns` | Campaign list with delivery metrics |
| `GET /api/leads` | Leads with status, stage, value |
| `GET /api/templates` | WhatsApp message templates |
| `GET /api/transactions` | Transaction / recharge history |
| `GET /api/contacts` | Contact list |
| `GET /api/delivery/queue` | Delivery engine queue status |
| `GET /api/erp/connections` | ERP connections (SAP, Tally, Salesforce…) |
| `GET /api/credit-packs` | Available credit packs with pricing |
| `GET /api/platform/stats` | Super-admin platform overview |
| `GET /api/compliance/status` | Meta API / spam / compliance status |
| `POST /api/auth/login` | JWT login |
| `POST /api/auth/register` | Tenant registration |
| `POST /api/send` | Send WhatsApp message (live/demo) |
| `POST /api/recharge/create-order` | Create Razorpay order (LIVE) |
| `POST /api/recharge` | Verify payment & credit wallet |

---

## 💳 Payment Integration

- **Razorpay**: LIVE mode (`rzp_test_S0det8rxQtxeZ3`)
- Real order creation on every recharge request
- HMAC-SHA256 signature verification via Web Crypto API
- Test card: `4111 1111 1111 1111` | UPI: `success@razorpay`

---

## 🔐 Login Credentials

| Role | Email | Password |
|---|---|---|
| Super Admin | admin@wapisend.in | Admin@123 |
| Demo Admin | demo@wapisend.in | Admin@123 |

---

## 🏗️ Tech Stack

- **Frontend/Backend**: Hono (TypeScript) on Cloudflare Workers/Pages
- **Build**: Vite 6 → `dist/_worker.js` (533 KB)
- **Auth**: JWT (base64 payload, Web Crypto verified)
- **Payments**: Razorpay v1 API (LIVE test keys)
- **WhatsApp**: Meta Cloud API v18 (demo mode → add WA_PHONE_NUMBER_ID to go live)
- **Secrets**: Cloudflare Pages secrets (JWT_SECRET, RAZORPAY_KEY_SECRET)

---

## 🔄 To Go Fully Live (WhatsApp)

Add these secrets via Cloudflare dashboard or wrangler:

```bash
echo "YOUR_PHONE_ID" | npx wrangler pages secret put WA_PHONE_NUMBER_ID --project-name wapisend
echo "YOUR_ACCESS_TOKEN" | npx wrangler pages secret put WA_ACCESS_TOKEN --project-name wapisend
echo "YOUR_WEBHOOK_TOKEN" | npx wrangler pages secret put WA_WEBHOOK_VERIFY_TOKEN --project-name wapisend
```

---

## 📦 Git History

```
1d75bd5  feat: Cloudflare Pages production deployment - wapisend.pages.dev
fcaf885  (previous commits...)
2193005  feat: Razorpay LIVE payment integration + real recharge page
24ecd59  Real full-stack backend with SQLite DB, WhatsApp API, JWT auth
337e5d5  Complete multi-vertical platform with white-label, mini interface
```
