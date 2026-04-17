export const landingHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WapiSend - WhatsApp Business Marketing Suite</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    :root {
      --wa: #25D366; --wa-dark: #075E54; --wa-teal: #128C7E;
      --primary: #6C5CE7; --accent: #00CEC9; --dark: #060d1a;
      --card: #0f1c2e; --border: #1e3350; --text: #e2e8f0;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; background: var(--dark); color: var(--text); }

    /* NAV */
    nav {
      position: fixed; top: 0; width: 100%; z-index: 100;
      background: rgba(6,13,26,0.9); backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 5%; height: 68px;
    }
    .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
    .nav-logo {
      width: 40px; height: 40px; border-radius: 11px;
      background: linear-gradient(135deg, var(--wa), var(--wa-teal));
      display: flex; align-items: center; justify-content: center; font-size: 20px; color: white;
    }
    .nav-name { font-size: 18px; font-weight: 800; color: white; }
    .nav-links { display: flex; gap: 28px; list-style: none; }
    .nav-links a { color: #94a3b8; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
    .nav-links a:hover { color: white; }
    .nav-cta { display: flex; gap: 10px; align-items: center; }
    .btn-nav-login { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 8px 20px; border-radius: 9px; font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.2s; }
    .btn-nav-login:hover { background: rgba(255,255,255,0.07); }
    .btn-nav-start {
      background: linear-gradient(135deg, var(--wa), var(--wa-teal)); color: white;
      padding: 8px 22px; border-radius: 9px; font-size: 13px; font-weight: 700;
      text-decoration: none; transition: all 0.2s; display: flex; align-items: center; gap: 7px;
    }
    .btn-nav-start:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(37,211,102,0.4); }

    /* HERO */
    .hero {
      min-height: 100vh; padding: 120px 5% 80px;
      background: radial-gradient(ellipse 80% 60% at 50% -20%, rgba(37,211,102,0.12) 0%, transparent 60%),
                  radial-gradient(ellipse 60% 40% at 80% 60%, rgba(108,92,231,0.08) 0%, transparent 60%),
                  var(--dark);
      display: flex; flex-direction: column; align-items: center; text-align: center;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(37,211,102,0.1); border: 1px solid rgba(37,211,102,0.3);
      color: var(--wa); padding: 6px 16px; border-radius: 20px;
      font-size: 12px; font-weight: 600; margin-bottom: 28px; text-transform: uppercase; letter-spacing: 1px;
    }
    .hero-badge i { animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
    .hero-title {
      font-size: clamp(36px,6vw,72px); font-weight: 900; line-height: 1.1;
      color: white; margin-bottom: 24px; max-width: 900px;
    }
    .hero-title .highlight {
      background: linear-gradient(135deg, var(--wa), var(--accent));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .hero-sub {
      font-size: clamp(15px,2vw,19px); color: #94a3b8; max-width: 620px;
      line-height: 1.7; margin-bottom: 42px;
    }
    .hero-cta { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-bottom: 64px; }
    .btn-hero-primary {
      background: linear-gradient(135deg, var(--wa), var(--wa-teal)); color: white;
      padding: 15px 34px; border-radius: 12px; font-size: 15px; font-weight: 700;
      text-decoration: none; display: flex; align-items: center; gap: 10px;
      box-shadow: 0 8px 40px rgba(37,211,102,0.35); transition: all 0.3s;
    }
    .btn-hero-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 50px rgba(37,211,102,0.5); }
    .btn-hero-secondary {
      background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: white;
      padding: 15px 34px; border-radius: 12px; font-size: 15px; font-weight: 700;
      text-decoration: none; display: flex; align-items: center; gap: 10px; transition: all 0.3s;
    }
    .btn-hero-secondary:hover { background: rgba(255,255,255,0.1); }
    .hero-stats {
      display: flex; gap: 48px; flex-wrap: wrap; justify-content: center; margin-bottom: 56px;
    }
    .hero-stat { text-align: center; }
    .hero-stat-val { font-size: 32px; font-weight: 800; color: white; }
    .hero-stat-val span { color: var(--wa); }
    .hero-stat-label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; }

    /* DASHBOARD PREVIEW */
    .dashboard-preview {
      width: 100%; max-width: 1100px;
      background: var(--card); border: 1px solid var(--border);
      border-radius: 20px; overflow: hidden;
      box-shadow: 0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,211,102,0.1);
    }
    .preview-bar {
      background: #0a1628; padding: 12px 18px;
      display: flex; align-items: center; gap: 10px;
      border-bottom: 1px solid var(--border);
    }
    .preview-dot { width: 12px; height: 12px; border-radius: 50%; }
    .preview-url {
      flex: 1; background: rgba(255,255,255,0.05); border-radius: 6px;
      padding: 5px 12px; font-size: 12px; color: #64748b; text-align: center;
    }
    .preview-inner { padding: 24px; }
    .preview-mini-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 18px; }
    .pms {
      background: rgba(255,255,255,0.04); border: 1px solid var(--border);
      border-radius: 12px; padding: 14px 16px;
    }
    .pms-label { font-size: 10px; color: #64748b; text-transform: uppercase; margin-bottom: 6px; }
    .pms-val { font-size: 22px; font-weight: 800; color: white; }
    .pms-sub { font-size: 10px; margin-top: 3px; }
    .pms-sub.up { color: var(--wa); } .pms-sub.down { color: #e74c3c; }
    .preview-chart-row { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; }
    .preview-chart-box {
      background: rgba(255,255,255,0.04); border: 1px solid var(--border);
      border-radius: 12px; padding: 16px;
    }
    .pch-title { font-size: 12px; color: #94a3b8; margin-bottom: 12px; font-weight: 600; }
    .chart-bars { display: flex; align-items: flex-end; gap: 6px; height: 80px; }
    .chart-bar { flex: 1; border-radius: 4px 4px 0 0; transition: all 0.5s; }
    .funnel-rows { display: flex; flex-direction: column; gap: 8px; }
    .funnel-row { display: flex; align-items: center; gap: 8px; font-size: 11px; }
    .funnel-bar-bg { flex: 1; height: 6px; background: rgba(255,255,255,0.07); border-radius: 3px; overflow: hidden; }
    .funnel-bar { height: 100%; border-radius: 3px; }

    /* FEATURES */
    section { padding: 90px 5%; }
    .section-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(108,92,231,0.1); border: 1px solid rgba(108,92,231,0.3);
      color: var(--primary); padding: 5px 14px; border-radius: 20px;
      font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;
    }
    .section-title { font-size: clamp(26px,4vw,44px); font-weight: 800; color: white; margin-bottom: 16px; }
    .section-sub { font-size: 16px; color: #64748b; max-width: 540px; line-height: 1.7; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 50px; }
    .feature-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 18px; padding: 28px; transition: all 0.3s; position: relative; overflow: hidden;
    }
    .feature-card:hover { transform: translateY(-4px); border-color: rgba(37,211,102,0.3); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
    .feature-icon {
      width: 52px; height: 52px; border-radius: 14px; margin-bottom: 18px;
      display: flex; align-items: center; justify-content: center; font-size: 22px;
    }
    .feature-card h3 { font-size: 16px; font-weight: 700; color: white; margin-bottom: 10px; }
    .feature-card p { font-size: 13px; color: #64748b; line-height: 1.7; }
    .feature-card .feature-tag {
      position: absolute; top: 20px; right: 20px;
      font-size: 10px; padding: 3px 8px; border-radius: 6px;
      font-weight: 700; text-transform: uppercase;
    }

    /* PRICING */
    .pricing-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; margin-top: 50px; }
    .pricing-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 20px; padding: 32px; transition: all 0.3s; position: relative;
    }
    .pricing-card.popular {
      border-color: var(--wa); box-shadow: 0 0 0 1px var(--wa), 0 20px 60px rgba(37,211,102,0.15);
    }
    .popular-badge {
      position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(135deg, var(--wa), var(--wa-teal));
      color: white; font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 20px;
      text-transform: uppercase; letter-spacing: 0.8px;
    }
    .plan-name { font-size: 14px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
    .plan-price { font-size: 42px; font-weight: 900; color: white; }
    .plan-price sup { font-size: 18px; color: #94a3b8; }
    .plan-price sub { font-size: 14px; color: #64748b; font-weight: 400; }
    .plan-desc { font-size: 13px; color: #64748b; margin: 8px 0 24px; }
    .plan-features { list-style: none; margin-bottom: 28px; }
    .plan-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: #94a3b8; padding: 6px 0; }
    .plan-features li i { color: var(--wa); margin-top: 1px; flex-shrink: 0; }
    .btn-plan {
      width: 100%; padding: 13px; border-radius: 12px; font-size: 14px; font-weight: 700;
      border: none; cursor: pointer; text-decoration: none; display: block; text-align: center;
      transition: all 0.2s;
    }
    .btn-plan-wa { background: linear-gradient(135deg, var(--wa), var(--wa-teal)); color: white; }
    .btn-plan-wa:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,211,102,0.4); }
    .btn-plan-outline { background: transparent; border: 1px solid var(--border); color: white; }
    .btn-plan-outline:hover { background: rgba(255,255,255,0.07); }

    /* HOW IT WORKS */
    .steps-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(220px,1fr)); gap: 24px; margin-top: 50px; }
    .step-card { background: var(--card); border: 1px solid var(--border); border-radius: 18px; padding: 28px; text-align: center; position: relative; }
    .step-num {
      width: 48px; height: 48px; border-radius: 50%; margin: 0 auto 16px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; font-weight: 900; color: white;
    }
    .step-card h3 { font-size: 15px; font-weight: 700; color: white; margin-bottom: 8px; }
    .step-card p { font-size: 13px; color: #64748b; line-height: 1.6; }
    .step-arrow {
      position: absolute; right: -12px; top: 50%; transform: translateY(-50%);
      color: var(--border); font-size: 20px; z-index: 1;
    }

    /* FOOTER */
    footer {
      background: #030810; border-top: 1px solid var(--border);
      padding: 60px 5% 30px;
    }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
    .footer-brand p { font-size: 13px; color: #64748b; line-height: 1.7; margin-top: 12px; max-width: 280px; }
    .footer-social { display: flex; gap: 10px; margin-top: 18px; }
    .footer-social a {
      width: 36px; height: 36px; border-radius: 9px;
      background: rgba(255,255,255,0.05); border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      color: #64748b; text-decoration: none; font-size: 15px; transition: all 0.2s;
    }
    .footer-social a:hover { background: var(--wa); color: white; border-color: var(--wa); }
    .footer-col h4 { font-size: 13px; font-weight: 700; color: white; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.8px; }
    .footer-col ul { list-style: none; }
    .footer-col li { margin-bottom: 10px; }
    .footer-col a { font-size: 13px; color: #64748b; text-decoration: none; transition: color 0.2s; }
    .footer-col a:hover { color: var(--wa); }
    .footer-bottom { border-top: 1px solid var(--border); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    .footer-bottom p { font-size: 12px; color: #64748b; }
    .footer-badge { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--wa); }

    /* Mobile nav */
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .preview-mini-stats { grid-template-columns: repeat(2,1fr); }
      .preview-chart-row { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 480px) {
      .footer-grid { grid-template-columns: 1fr; }
      .hero-stats { gap: 24px; }
    }
  </style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="/landing" class="nav-brand">
    <div class="nav-logo"><i class="fab fa-whatsapp"></i></div>
    <span class="nav-name">WapiSend</span>
  </a>
  <ul class="nav-links">
    <li><a href="#features">Features</a></li>
    <li><a href="#how-it-works">How It Works</a></li>
    <li><a href="#pricing">Pricing</a></li>
    <li><a href="#integrations">Integrations</a></li>
  </ul>
  <div class="nav-cta">
    <a href="/login" class="btn-nav-login">Login</a>
    <a href="/register" class="btn-nav-start"><i class="fab fa-whatsapp"></i> Start Free Trial</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-badge"><i class="fas fa-circle"></i> Official WhatsApp Business API Partner</div>
  <h1 class="hero-title">
    The <span class="highlight">Ultimate</span> WhatsApp<br>
    Marketing & Automation Platform
  </h1>
  <p class="hero-sub">
    Multi-tenant SaaS. Build chatbot flows visually, run bulk campaigns, capture leads, track conversions — all powered by official WhatsApp Business API. Zero spam. Maximum reach.
  </p>
  <div class="hero-cta">
    <a href="/register" class="btn-hero-primary">
      <i class="fab fa-whatsapp"></i> Start 14-Day Free Trial
    </a>
    <a href="/dashboard" class="btn-hero-secondary">
      <i class="fas fa-play-circle"></i> View Live Demo
    </a>
  </div>
  <div class="hero-stats">
    <div class="hero-stat"><div class="hero-stat-val">5,000<span>+</span></div><div class="hero-stat-label">Businesses</div></div>
    <div class="hero-stat"><div class="hero-stat-val">500<span>M+</span></div><div class="hero-stat-label">Messages Sent</div></div>
    <div class="hero-stat"><div class="hero-stat-val">98<span>%</span></div><div class="hero-stat-label">Delivery Rate</div></div>
    <div class="hero-stat"><div class="hero-stat-val">73<span>%</span></div><div class="hero-stat-label">Open Rate</div></div>
  </div>

  <!-- Dashboard Preview -->
  <div class="dashboard-preview">
    <div class="preview-bar">
      <div class="preview-dot" style="background:#e74c3c"></div>
      <div class="preview-dot" style="background:#f39c12"></div>
      <div class="preview-dot" style="background:#2ecc71"></div>
      <div class="preview-url">app.wapisend.com/dashboard</div>
    </div>
    <div class="preview-inner">
      <div class="preview-mini-stats">
        <div class="pms"><div class="pms-label">Messages Sent</div><div class="pms-val">284,912</div><div class="pms-sub up">↑ 12.4% this week</div></div>
        <div class="pms"><div class="pms-label">Active Campaigns</div><div class="pms-val">7</div><div class="pms-sub up">↑ 3 new today</div></div>
        <div class="pms"><div class="pms-label">Leads Generated</div><div class="pms-val">1,293</div><div class="pms-sub up">↑ 23 today</div></div>
        <div class="pms"><div class="pms-label">Delivery Rate</div><div class="pms-val">98.4%</div><div class="pms-sub up">↑ Excellent</div></div>
      </div>
      <div class="preview-chart-row">
        <div class="preview-chart-box">
          <div class="pch-title">📊 Message Volume — Last 7 Days</div>
          <div class="chart-bars">
            ${['60%','45%','75%','55%','90%','70%','100%'].map((h,i)=>`<div class="chart-bar" style="height:${h};background:linear-gradient(180deg,#25D366,#128C7E);opacity:${0.5+i*0.07}"></div>`).join('')}
          </div>
        </div>
        <div class="preview-chart-box">
          <div class="pch-title">🎯 Campaign Funnel</div>
          <div class="funnel-rows">
            <div class="funnel-row"><span style="width:60px;color:#94a3b8;font-size:10px">Sent</span><div class="funnel-bar-bg"><div class="funnel-bar" style="width:100%;background:#25D366"></div></div><span style="font-size:10px;color:#25D366">12k</span></div>
            <div class="funnel-row"><span style="width:60px;color:#94a3b8;font-size:10px">Delivered</span><div class="funnel-bar-bg"><div class="funnel-bar" style="width:98%;background:#128C7E"></div></div><span style="font-size:10px;color:#128C7E">11.8k</span></div>
            <div class="funnel-row"><span style="width:60px;color:#94a3b8;font-size:10px">Opened</span><div class="funnel-bar-bg"><div class="funnel-bar" style="width:73%;background:#6C5CE7"></div></div><span style="font-size:10px;color:#6C5CE7">8.7k</span></div>
            <div class="funnel-row"><span style="width:60px;color:#94a3b8;font-size:10px">Replied</span><div class="funnel-bar-bg"><div class="funnel-bar" style="width:42%;background:#00CEC9"></div></div><span style="font-size:10px;color:#00CEC9">5k</span></div>
            <div class="funnel-row"><span style="width:60px;color:#94a3b8;font-size:10px">Converted</span><div class="funnel-bar-bg"><div class="funnel-bar" style="width:18%;background:#fdcb6e"></div></div><span style="font-size:10px;color:#fdcb6e">2.1k</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section id="how-it-works" style="background:radial-gradient(ellipse at center,rgba(108,92,231,0.05) 0%,transparent 70%)">
  <div style="text-align:center">
    <div class="section-badge"><i class="fas fa-map-signs"></i> How It Works</div>
    <h2 class="section-title">Launch in 4 Simple Steps</h2>
    <p class="section-sub" style="margin:0 auto">From signup to your first campaign in under 10 minutes</p>
  </div>
  <div class="steps-grid">
    ${[
      ['1','Connect WhatsApp','Link your WhatsApp Business API number. Official Meta partner. 100% spam-safe.','fa-plug','#25D366'],
      ['2','Import Contacts','Upload CSV, sync from your website, or capture via smart posters & QR codes.','fa-address-book','#6C5CE7'],
      ['3','Build Bot / Campaign','Use our visual flow builder to create chatbots or launch bulk campaigns in minutes.','fa-project-diagram','#00CEC9'],
      ['4','Track & Convert','Real-time analytics, lead scoring, CRM pipeline — close deals faster.','fa-chart-line','#f39c12'],
    ].map(([n,t,d,ic,col], i, arr)=>`
    <div class="step-card">
      <div class="step-num">${n}</div>
      <h3>${t}</h3>
      <p>${d}</p>
      <i class="fas fa-${ic}" style="font-size:28px;color:${col};opacity:0.15;position:absolute;right:20px;bottom:20px"></i>
      ${i < arr.length-1 ? '<i class="fas fa-chevron-right step-arrow"></i>' : ''}
    </div>`).join('')}
  </div>
</section>

<!-- FEATURES -->
<section id="features">
  <div style="text-align:center;margin-bottom:0">
    <div class="section-badge"><i class="fas fa-rocket"></i> Platform Features</div>
    <h2 class="section-title">Everything You Need to Grow</h2>
    <p class="section-sub" style="margin:0 auto">A complete WhatsApp business ecosystem — not just a messaging tool</p>
  </div>
  <div class="features-grid">
    ${[
      ['fa-project-diagram','Visual Bot Builder','Drag-and-drop mindmap-style chatbot flows. If-else logic, buttons, carousels, media, location — build mobile banking-grade bots.','#6C5CE7','NEW','rgba(108,92,231,0.15)'],
      ['fa-bullhorn','Bulk Campaigns','Schedule and send personalized messages to thousands. Template approval built-in. Delivery tracking per contact.','#25D366','','rgba(37,211,102,0.1)'],
      ['fa-image','Smart Posters','Create clickable WhatsApp marketing posters with embedded links. Capture leads directly into your CRM.','#e17055','HOT','rgba(231,112,85,0.15)'],
      ['fa-funnel-dollar','Lead CRM','Full sales pipeline — Hot/Warm/Cold scoring, stage tracking, auto follow-up bots, closure analytics.','#00CEC9','','rgba(0,206,201,0.1)'],
      ['fa-wallet','Credits & Wallet','Prepaid credit system. Recharge anytime. Pay only for what you send. Multi-currency support.','#fdcb6e','','rgba(253,203,110,0.1)'],
      ['fa-plug','Website Integration','Embed WhatsApp chat widget on any website. REST API & webhooks for developers. Zapier integration.','#a29bfe','API','rgba(162,155,254,0.15)'],
      ['fa-shield-alt','Official & Spam-Safe','100% Meta-approved Business API. Green tick support. Quality rating monitoring. Zero spam risk.','#00b894','','rgba(0,184,148,0.1)'],
      ['fa-chart-bar','Advanced Analytics','Real-time dashboards. Message-level tracking. ROI per campaign. AI-powered insights.','#0984e3','','rgba(9,132,227,0.1)'],
      ['fa-users','Multi-Tenant SaaS','White-label ready. Each subscriber gets isolated workspace, separate API keys, individual analytics.','#fd79a8','','rgba(253,121,168,0.1)'],
    ].map(([ic,t,d,col,tag,bg])=>`
    <div class="feature-card">
      <div class="feature-icon" style="background:${bg}"><i class="fas ${ic}" style="color:${col}"></i></div>
      <h3>${t}</h3>
      <p>${d}</p>
      ${tag?`<span class="feature-tag" style="background:${bg};color:${col}">${tag}</span>`:''}
    </div>`).join('')}
  </div>
</section>

<!-- PRICING -->
<section id="pricing" style="background:radial-gradient(ellipse at center,rgba(37,211,102,0.05) 0%,transparent 70%)">
  <div style="text-align:center">
    <div class="section-badge" style="background:rgba(37,211,102,0.1);border-color:rgba(37,211,102,0.3);color:var(--wa)"><i class="fas fa-tag"></i> Pricing</div>
    <h2 class="section-title">Plans for Every Business</h2>
    <p class="section-sub" style="margin:0 auto">All plans include official WhatsApp Business API. No setup fees.</p>
  </div>
  <div class="pricing-grid">
    ${[
      {name:'Starter',price:'₹1,999',desc:'Perfect for small businesses',popular:false,credits:'10,000 credits/mo',features:['1 WhatsApp Number','Bulk Messaging','Basic Bot Builder','Contact Import','Email Support','2 Team Members'],btn:'btn-plan-outline'},
      {name:'Growth',price:'₹4,999',desc:'Most popular for growing brands',popular:true,credits:'30,000 credits/mo',features:['3 WhatsApp Numbers','Unlimited Campaigns','Advanced Bot Flows','Smart Posters','Lead CRM','Website Widget','Priority Support','5 Team Members'],btn:'btn-plan-wa'},
      {name:'Pro',price:'₹9,999',desc:'For serious marketers',popular:false,credits:'1,00,000 credits/mo',features:['Unlimited Numbers','Everything in Growth','AI-Powered Responses','White-label Dashboard','API Access + Webhooks','Custom Integrations','Dedicated Manager','Unlimited Team'],btn:'btn-plan-outline'},
    ].map(p=>`
    <div class="pricing-card ${p.popular?'popular':''}">
      ${p.popular?'<div class="popular-badge">Most Popular</div>':''}
      <div class="plan-name">${p.name}</div>
      <div class="plan-price"><sup>₹</sup>${p.price.replace('₹','')}<sub>/month</sub></div>
      <div class="plan-desc">${p.desc} • ${p.credits}</div>
      <ul class="plan-features">
        ${p.features.map(f=>`<li><i class="fas fa-check-circle"></i>${f}</li>`).join('')}
      </ul>
      <a href="/register" class="btn-plan ${p.btn}">Get Started</a>
    </div>`).join('')}
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <div class="nav-logo"><i class="fab fa-whatsapp"></i></div>
        <span style="font-size:18px;font-weight:800;color:white">WapiSend</span>
      </div>
      <p>The most powerful WhatsApp Business marketing suite for agencies and growing businesses. Official Meta Business Partner.</p>
      <div class="footer-social">
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-linkedin-in"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Product</h4>
      <ul>
        <li><a href="#">Bot Builder</a></li>
        <li><a href="#">Bulk Messaging</a></li>
        <li><a href="#">Smart Posters</a></li>
        <li><a href="#">Lead CRM</a></li>
        <li><a href="#">Analytics</a></li>
        <li><a href="#">Integrations</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Press Kit</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Cookie Policy</a></li>
        <li><a href="#">GDPR</a></li>
        <li><a href="#">Refund Policy</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2024 WapiSend Technologies Pvt. Ltd. All rights reserved.</p>
    <div class="footer-badge"><i class="fas fa-shield-check"></i> Official Meta Business Partner</div>
  </div>
</footer>

</body>
</html>
`
