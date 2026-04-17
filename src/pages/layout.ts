export const sidebarNav = (active: string) => `
<aside id="sidebar" class="sidebar">
  <div class="sidebar-header">
    <div class="brand">
      <div class="brand-icon"><i class="fab fa-whatsapp"></i></div>
      <div class="brand-text">
        <span class="brand-name">WapiSend</span>
        <span class="brand-tag">Business Suite</span>
      </div>
    </div>
    <button class="sidebar-close" onclick="toggleSidebar()"><i class="fas fa-times"></i></button>
  </div>

  <div class="sidebar-profile">
    <div class="profile-avatar">RS</div>
    <div class="profile-info">
      <span class="profile-name">Rahul Store</span>
      <span class="profile-plan"><i class="fas fa-crown"></i> Pro Plan</span>
    </div>
    <div class="wa-status online"></div>
  </div>

  <nav class="sidebar-nav">
    <div class="nav-section">OVERVIEW</div>
    <a href="/dashboard" class="nav-item ${active==='dashboard'?'active':''}">
      <i class="fas fa-th-large"></i><span>Dashboard</span>
    </a>
    <a href="/analytics" class="nav-item ${active==='analytics'?'active':''}">
      <i class="fas fa-chart-line"></i><span>Analytics</span>
      <span class="nav-badge">Live</span>
    </a>

    <div class="nav-section">MESSAGING</div>
    <a href="/campaigns" class="nav-item ${active==='campaigns'?'active':''}">
      <i class="fas fa-bullhorn"></i><span>Campaigns</span>
    </a>
    <a href="/templates" class="nav-item ${active==='templates'?'active':''}">
      <i class="fas fa-file-alt"></i><span>Templates</span>
    </a>
    <a href="/chatbot-builder" class="nav-item ${active==='chatbot'?'active':''}">
      <i class="fas fa-project-diagram"></i><span>Bot Builder</span>
      <span class="nav-badge new">New</span>
    </a>

    <div class="nav-section">CRM & LEADS</div>
    <a href="/contacts" class="nav-item ${active==='contacts'?'active':''}">
      <i class="fas fa-address-book"></i><span>Contacts</span>
    </a>
    <a href="/leads" class="nav-item ${active==='leads'?'active':''}">
      <i class="fas fa-funnel-dollar"></i><span>Leads & CRM</span>
      <span class="nav-count">5</span>
    </a>

    <div class="nav-section">MARKETING</div>
    <a href="/campaigns#posters" class="nav-item ${active==='posters'?'active':''}">
      <i class="fas fa-image"></i><span>Smart Posters</span>
    </a>
    <a href="/integrations" class="nav-item ${active==='integrations'?'active':''}">
      <i class="fas fa-plug"></i><span>Integrations</span>
    </a>

    <div class="nav-section">VERTICALS</div>
    <a href="/smb-dashboard" class="nav-item ${active==='smb'?'active':''}">
      <i class="fas fa-store"></i><span>Small Business</span>
      <span class="nav-badge new">New</span>
    </a>
    <a href="/edu-dashboard" class="nav-item ${active==='edu'?'active':''}">
      <i class="fas fa-graduation-cap"></i><span>Education Suite</span>
    </a>
    <a href="/corp-dashboard" class="nav-item ${active==='corp'?'active':''}">
      <i class="fas fa-building"></i><span>Corporate Suite</span>
    </a>

    <div class="nav-section">ENTERPRISE</div>
    <a href="/whitelabel-admin" class="nav-item ${active==='whitelabel'?'active':''}">
      <i class="fas fa-layer-group"></i><span>White-Label Console</span>
      <span class="nav-badge" style="background:var(--accent)">WL</span>
    </a>
    <a href="/erp-integrations" class="nav-item ${active==='erp'?'active':''}">
      <i class="fas fa-database"></i><span>ERP Connect</span>
    </a>
    <a href="/delivery-engine" class="nav-item ${active==='delivery'?'active':''}">
      <i class="fas fa-rocket"></i><span>Delivery Engine</span>
    </a>
    <a href="/notification-hub" class="nav-item ${active==='notifhub'?'active':''}">
      <i class="fas fa-bell"></i><span>Notification Hub</span>
    </a>
    <a href="/compliance" class="nav-item ${active==='compliance'?'active':''}">
      <i class="fas fa-shield-alt"></i><span>Compliance</span>
    </a>

    <div class="nav-section">ACCOUNT</div>
    <a href="/mini" class="nav-item ${active==='mini'?'active':''}">
      <i class="fas fa-mobile-alt"></i><span>Mini Interface</span>
    </a>
    <a href="/recharge" class="nav-item ${active==='recharge'?'active':''}">
      <i class="fas fa-coins"></i><span>Recharge Credits</span>
    </a>
    <a href="/wallet" class="nav-item ${active==='wallet'?'active':''}">
      <i class="fas fa-wallet"></i><span>Wallet & Plans</span>
    </a>
    <a href="/landing" class="nav-item">
      <i class="fas fa-sign-out-alt"></i><span>Logout</span>
    </a>
  </nav>

  <div class="sidebar-footer">
    <div class="credit-display">
      <i class="fas fa-coins"></i>
      <div>
        <span class="credit-label">Credits</span>
        <span class="credit-value">42,500</span>
      </div>
      <a href="/wallet" class="btn-topup">Top Up</a>
    </div>
  </div>
</aside>
`

export const topbar = (title: string, subtitle: string) => `
<header class="topbar">
  <div class="topbar-left">
    <button class="sidebar-toggle" onclick="toggleSidebar()">
      <i class="fas fa-bars"></i>
    </button>
    <div class="page-title">
      <h1>${title}</h1>
      <span>${subtitle}</span>
    </div>
  </div>
  <div class="topbar-right">
    <div class="search-bar">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search anything...">
    </div>
    <button class="icon-btn" title="Notifications">
      <i class="fas fa-bell"></i>
      <span class="notif-dot"></span>
    </button>
    <button class="icon-btn" title="Help">
      <i class="fas fa-question-circle"></i>
    </button>
    <div class="topbar-avatar">RS</div>
  </div>
</header>
`

export const globalCSS = () => `
:root {
  --wa-green: #25D366;
  --wa-dark: #075E54;
  --wa-teal: #128C7E;
  --wa-light: #DCF8C6;
  --primary: #6C5CE7;
  --primary-dark: #5a4dcf;
  --accent: #00CEC9;
  --danger: #e74c3c;
  --warning: #f39c12;
  --success: #00b894;
  --info: #0984e3;
  --dark: #0f172a;
  --card: #1e293b;
  --card2: #263348;
  --border: #2d3f5a;
  --text: #e2e8f0;
  --text-muted: #8899a6;
  --sidebar-w: 260px;
  --topbar-h: 64px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; font-family: 'Inter', -apple-system, sans-serif; background: var(--dark); color: var(--text); }

/* Scrollbar */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: var(--card); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

/* Layout */
.app-layout { display: flex; height: 100vh; overflow: hidden; }

/* Sidebar */
.sidebar {
  width: var(--sidebar-w); min-width: var(--sidebar-w);
  background: linear-gradient(180deg, #0a1628 0%, #0d1f3c 100%);
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column;
  overflow-y: auto; overflow-x: hidden;
  transition: transform 0.3s ease; z-index: 100;
  position: relative;
}
.sidebar-header { padding: 20px 16px 14px; display: flex; align-items: center; justify-content: space-between; }
.brand { display: flex; align-items: center; gap: 10px; }
.brand-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, var(--wa-green), var(--wa-teal));
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: white;
}
.brand-name { display: block; font-weight: 700; font-size: 15px; color: white; }
.brand-tag { display: block; font-size: 10px; color: var(--wa-green); text-transform: uppercase; letter-spacing: 1px; }
.sidebar-close { display: none; background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 16px; }

.sidebar-profile {
  margin: 0 12px 16px; padding: 12px;
  background: rgba(255,255,255,0.04); border-radius: 12px;
  display: flex; align-items: center; gap: 10px; position: relative;
}
.profile-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: white; flex-shrink: 0;
}
.profile-name { display: block; font-size: 13px; font-weight: 600; color: white; }
.profile-plan { display: flex; align-items: center; gap: 4px; font-size: 10px; color: #f39c12; }
.wa-status { width: 9px; height: 9px; border-radius: 50%; margin-left: auto; }
.wa-status.online { background: var(--wa-green); box-shadow: 0 0 6px var(--wa-green); }

.sidebar-nav { flex: 1; padding: 4px 12px; }
.nav-section {
  font-size: 10px; font-weight: 700; color: var(--text-muted);
  text-transform: uppercase; letter-spacing: 1.2px;
  padding: 14px 8px 6px; margin-top: 4px;
}
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: 9px; margin-bottom: 2px;
  color: #94a3b8; text-decoration: none; font-size: 13px; font-weight: 500;
  transition: all 0.2s; cursor: pointer; position: relative;
}
.nav-item:hover { background: rgba(255,255,255,0.07); color: white; }
.nav-item.active {
  background: linear-gradient(135deg, rgba(108,92,231,0.3), rgba(0,206,201,0.15));
  color: white; border-left: 3px solid var(--primary);
}
.nav-item i { width: 18px; text-align: center; font-size: 14px; flex-shrink: 0; }
.nav-item span { flex: 1; }
.nav-badge {
  font-size: 9px; padding: 2px 6px; border-radius: 20px;
  background: var(--wa-green); color: white; font-weight: 700; text-transform: uppercase;
}
.nav-badge.new { background: var(--primary); }
.nav-count {
  font-size: 10px; min-width: 18px; height: 18px; border-radius: 9px;
  background: var(--danger); color: white; font-weight: 700;
  display: flex; align-items: center; justify-content: center; padding: 0 5px;
}

.sidebar-footer { padding: 12px; border-top: 1px solid var(--border); }
.credit-display {
  display: flex; align-items: center; gap: 10px; padding: 10px 12px;
  background: rgba(37,211,102,0.1); border: 1px solid rgba(37,211,102,0.2);
  border-radius: 10px; font-size: 12px;
}
.credit-display i { color: var(--wa-green); font-size: 16px; }
.credit-label { display: block; color: var(--text-muted); font-size: 10px; }
.credit-value { display: block; color: var(--wa-green); font-weight: 700; font-size: 14px; }
.btn-topup {
  margin-left: auto; background: var(--wa-green); color: white;
  border: none; border-radius: 6px; padding: 4px 10px; font-size: 11px;
  font-weight: 600; cursor: pointer; text-decoration: none; white-space: nowrap;
}

/* Main Content */
.main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

/* Topbar */
.topbar {
  height: var(--topbar-h); min-height: var(--topbar-h);
  background: rgba(15,23,42,0.95); backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px; gap: 16px; position: sticky; top: 0; z-index: 50;
}
.topbar-left { display: flex; align-items: center; gap: 14px; }
.sidebar-toggle { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 18px; display: none; }
.page-title h1 { font-size: 17px; font-weight: 700; color: white; }
.page-title span { font-size: 12px; color: var(--text-muted); }
.topbar-right { display: flex; align-items: center; gap: 12px; }
.search-bar {
  display: flex; align-items: center; gap: 8px;
  background: var(--card); border: 1px solid var(--border);
  border-radius: 10px; padding: 8px 14px; width: 240px;
}
.search-bar i { color: var(--text-muted); font-size: 13px; }
.search-bar input { background: none; border: none; outline: none; color: var(--text); font-size: 13px; flex: 1; }
.search-bar input::placeholder { color: var(--text-muted); }
.icon-btn {
  width: 38px; height: 38px; border-radius: 10px;
  background: var(--card); border: 1px solid var(--border);
  color: var(--text-muted); cursor: pointer; font-size: 15px;
  display: flex; align-items: center; justify-content: center;
  position: relative; transition: all 0.2s;
}
.icon-btn:hover { background: var(--card2); color: white; }
.notif-dot {
  width: 8px; height: 8px; border-radius: 50%; background: var(--danger);
  position: absolute; top: 6px; right: 6px;
}
.topbar-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: white; cursor: pointer;
}

/* Page Content */
.page-content { flex: 1; overflow-y: auto; padding: 24px; }

/* Cards */
.card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 16px; overflow: hidden;
}
.card-header {
  padding: 18px 20px; border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.card-title { font-size: 14px; font-weight: 700; color: white; display: flex; align-items: center; gap: 8px; }
.card-body { padding: 20px; }

/* Stat Cards */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
.stat-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 16px; padding: 20px; position: relative; overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.3); }
.stat-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
}
.stat-card.green::before { background: linear-gradient(90deg, var(--wa-green), var(--accent)); }
.stat-card.purple::before { background: linear-gradient(90deg, var(--primary), #a29bfe); }
.stat-card.orange::before { background: linear-gradient(90deg, #e17055, #fdcb6e); }
.stat-card.blue::before { background: linear-gradient(90deg, var(--info), var(--accent)); }
.stat-card.red::before { background: linear-gradient(90deg, var(--danger), #fd79a8); }
.stat-card.teal::before { background: linear-gradient(90deg, var(--wa-teal), var(--wa-green)); }
.stat-label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; }
.stat-value { font-size: 28px; font-weight: 800; color: white; margin-bottom: 6px; }
.stat-meta { font-size: 11px; color: var(--text-muted); }
.stat-icon {
  position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
  font-size: 32px; opacity: 0.1;
}
.stat-change { display: inline-flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 600; }
.stat-change.up { color: var(--success); }
.stat-change.down { color: var(--danger); }

/* Buttons */
.btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 9px 18px; border-radius: 10px; font-size: 13px; font-weight: 600;
  border: none; cursor: pointer; text-decoration: none; transition: all 0.2s;
  white-space: nowrap;
}
.btn-primary { background: var(--primary); color: white; }
.btn-primary:hover { background: var(--primary-dark); transform: translateY(-1px); }
.btn-success { background: var(--wa-green); color: white; }
.btn-success:hover { background: var(--wa-teal); }
.btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text); }
.btn-outline:hover { background: var(--card2); }
.btn-danger { background: var(--danger); color: white; }
.btn-sm { padding: 6px 12px; font-size: 12px; border-radius: 8px; }
.btn-xs { padding: 4px 9px; font-size: 11px; border-radius: 6px; }

/* Badges */
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600;
}
.badge-success { background: rgba(0,184,148,0.15); color: var(--success); }
.badge-warning { background: rgba(243,156,18,0.15); color: var(--warning); }
.badge-danger { background: rgba(231,76,60,0.15); color: var(--danger); }
.badge-info { background: rgba(9,132,227,0.15); color: var(--info); }
.badge-purple { background: rgba(108,92,231,0.15); color: var(--primary); }
.badge-wa { background: rgba(37,211,102,0.15); color: var(--wa-green); }

/* Tables */
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th {
  padding: 12px 16px; text-align: left;
  color: var(--text-muted); font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.8px;
  border-bottom: 1px solid var(--border); white-space: nowrap;
}
.data-table td { padding: 14px 16px; border-bottom: 1px solid rgba(45,63,90,0.5); vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td { background: rgba(255,255,255,0.02); }

/* Progress Bars */
.progress { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
.progress-bar { height: 100%; border-radius: 3px; transition: width 1s ease; }
.progress-bar.green { background: linear-gradient(90deg, var(--wa-green), var(--accent)); }
.progress-bar.purple { background: linear-gradient(90deg, var(--primary), #a29bfe); }
.progress-bar.orange { background: linear-gradient(90deg, #e17055, #fdcb6e); }

/* Grid layouts */
.grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; }
.grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }

/* Flex utils */
.flex { display: flex; }
.flex-center { display: flex; align-items: center; }
.flex-between { display: flex; align-items: center; justify-content: space-between; }
.gap-2 { gap: 8px; } .gap-3 { gap: 12px; } .gap-4 { gap: 16px; }
.mt-4 { margin-top: 16px; } .mt-6 { margin-top: 24px; } .mt-8 { margin-top: 32px; }
.mb-4 { margin-bottom: 16px; } .mb-6 { margin-bottom: 24px; }
.w-full { width: 100%; }

/* Modals */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
  opacity: 0; pointer-events: none; transition: opacity 0.2s;
}
.modal-overlay.show { opacity: 1; pointer-events: all; }
.modal {
  background: var(--card); border: 1px solid var(--border); border-radius: 20px;
  width: 90%; max-width: 560px; max-height: 90vh; overflow-y: auto;
  transform: scale(0.95); transition: transform 0.2s;
}
.modal-overlay.show .modal { transform: scale(1); }
.modal-header {
  padding: 20px 24px; border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.modal-title { font-size: 16px; font-weight: 700; color: white; }
.modal-close { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 18px; }
.modal-body { padding: 24px; }
.modal-footer { padding: 16px 24px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 10px; }

/* Forms */
.form-group { margin-bottom: 18px; }
.form-label { display: block; font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
.form-control {
  width: 100%; padding: 10px 14px; background: var(--dark);
  border: 1px solid var(--border); border-radius: 10px;
  color: var(--text); font-size: 13px; outline: none;
  transition: border-color 0.2s;
}
.form-control:focus { border-color: var(--primary); }
select.form-control { appearance: none; cursor: pointer; }

/* Tabs */
.tabs { display: flex; gap: 4px; background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 4px; margin-bottom: 20px; }
.tab-btn {
  flex: 1; padding: 8px 16px; border-radius: 9px; border: none; cursor: pointer;
  font-size: 13px; font-weight: 600; transition: all 0.2s;
  background: transparent; color: var(--text-muted);
}
.tab-btn.active { background: var(--primary); color: white; }
.tab-panel { display: none; }
.tab-panel.active { display: block; }

/* Toast */
.toast-container { position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
.toast {
  background: var(--card2); border: 1px solid var(--border); border-radius: 12px;
  padding: 12px 18px; display: flex; align-items: center; gap: 10px;
  font-size: 13px; color: white; min-width: 280px;
  animation: slideIn 0.3s ease;
}
.toast i { font-size: 16px; }
.toast.success i { color: var(--success); }
.toast.error i { color: var(--danger); }
.toast.info i { color: var(--info); }
@keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

/* Responsive */
@media (max-width: 1024px) {
  .sidebar { position: fixed; left: 0; top: 0; height: 100%; transform: translateX(-100%); }
  .sidebar.open { transform: translateX(0); }
  .sidebar-close { display: flex; }
  .sidebar-toggle { display: flex !important; }
  .search-bar { display: none; }
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 640px) {
  .stats-grid { grid-template-columns: 1fr; }
  .page-content { padding: 16px; }
  .topbar { padding: 0 16px; }
}

/* Sidebar overlay */
.sidebar-overlay {
  display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  z-index: 99; backdrop-filter: blur(2px);
}
.sidebar-overlay.show { display: block; }

/* WhatsApp message bubble */
.wa-bubble {
  background: var(--wa-light); color: #333; border-radius: 12px 12px 0 12px;
  padding: 10px 14px; max-width: 280px; font-size: 13px; position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.wa-bubble::after {
  content: ''; position: absolute; right: -8px; bottom: 0;
  border: 8px solid transparent; border-bottom-color: var(--wa-light); border-right: none;
}
`

export const globalJS = () => `
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show');
}
function showToast(msg, type='success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const icons = { success: 'check-circle', error: 'times-circle', info: 'info-circle', warning: 'exclamation-triangle' };
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = '<i class="fas fa-' + (icons[type]||'info-circle') + '"></i><span>' + msg + '</span>';
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
function switchTab(tabId, groupId) {
  document.querySelectorAll('[data-tab-group="' + (groupId||'main') + '"]').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('[data-tab-btn="' + (groupId||'main') + '"]').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById(tabId);
  if (panel) panel.classList.add('active');
  event.currentTarget.classList.add('active');
}
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('show');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('show');
}
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!', 'success'));
}
function formatNum(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n/1000).toFixed(1) + 'K';
  return n.toString();
}
`

export const pageShell = (content: string, active: string, title: string, subtitle: string, extraCSS = '', extraJS = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | WapiSend</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    ${globalCSS()}
    ${extraCSS}
  </style>
</head>
<body>
<div class="app-layout">
  ${sidebarNav(active)}
  <div id="sidebarOverlay" class="sidebar-overlay" onclick="toggleSidebar()"></div>
  <main class="main-content">
    ${topbar(title, subtitle)}
    <div class="page-content">
      ${content}
    </div>
  </main>
</div>
<div class="toast-container" id="toastContainer"></div>
<script>
  ${globalJS()}
  ${extraJS}
</script>
</body>
</html>
`
