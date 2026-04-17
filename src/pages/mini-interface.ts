// Mini Interface — ultra-simple mobile-first app for SMBs, schools, individuals
// No sidebar, no complex nav — just the essentials

export const miniInterfaceHTML = () => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>WapiSend Mini | Quick Send</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    :root {
      --wa: #25D366; --wa-dark: #075E54; --wa-teal: #128C7E;
      --bg: #0f172a; --card: #1e293b; --card2: #263348;
      --border: #2d3f5a; --text: #e2e8f0; --muted: #8899a6;
      --primary: #6C5CE7; --danger: #e74c3c; --warning: #f39c12; --success: #00b894;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; max-width: 480px; margin: 0 auto; }

    /* Top Bar */
    .mini-header {
      background: linear-gradient(135deg, var(--wa-dark), var(--wa-teal));
      padding: 16px 20px; display: flex; align-items: center; justify-content: space-between;
      position: sticky; top: 0; z-index: 100;
    }
    .mini-brand { display: flex; align-items: center; gap: 10px; }
    .mini-brand-icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 18px; color: white; }
    .mini-brand-name { font-size: 16px; font-weight: 800; color: white; }
    .mini-brand-sub { font-size: 10px; color: rgba(255,255,255,0.7); }
    .mini-header-right { display: flex; align-items: center; gap: 10px; }
    .credit-pill { background: rgba(255,255,255,0.15); border-radius: 20px; padding: 5px 12px; display: flex; align-items: center; gap: 6px; font-size: 12px; color: white; font-weight: 600; cursor: pointer; }
    .notif-btn { width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.15); border: none; color: white; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; position: relative; }
    .notif-dot { position: absolute; top: 5px; right: 5px; width: 7px; height: 7px; background: var(--danger); border-radius: 50%; }

    /* Bottom Nav */
    .bottom-nav {
      position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
      width: 100%; max-width: 480px; background: var(--card);
      border-top: 1px solid var(--border); display: flex;
      padding: 8px 0 12px; z-index: 100;
    }
    .nav-tab { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; cursor: pointer; transition: all 0.2s; padding: 6px 0; border: none; background: none; color: var(--muted); font-size: 10px; font-weight: 600; }
    .nav-tab i { font-size: 18px; }
    .nav-tab.active { color: var(--wa); }
    .nav-tab-send { flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; }
    .send-fab { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, var(--wa), var(--wa-teal)); border: 3px solid var(--bg); display: flex; align-items: center; justify-content: center; font-size: 22px; color: white; box-shadow: 0 4px 20px rgba(37,211,102,0.4); margin-top: -18px; transition: transform 0.2s; }
    .send-fab:hover { transform: scale(1.1); }

    /* Main Content Area */
    .mini-content { padding: 16px; padding-bottom: 90px; }

    /* Screen Panels */
    .screen { display: none; }
    .screen.active { display: block; }

    /* Quick Stats */
    .quick-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
    .qs-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 14px; position: relative; overflow: hidden; }
    .qs-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
    .qs-card.g::before { background: linear-gradient(90deg, var(--wa), #00CEC9); }
    .qs-card.p::before { background: linear-gradient(90deg, var(--primary), #a29bfe); }
    .qs-card.o::before { background: linear-gradient(90deg, #e17055, #fdcb6e); }
    .qs-card.b::before { background: linear-gradient(90deg, #0984e3, #00CEC9); }
    .qs-val { font-size: 22px; font-weight: 800; color: white; }
    .qs-lbl { font-size: 10px; color: var(--muted); margin-top: 2px; }

    /* Wallet Banner */
    .wallet-banner {
      background: linear-gradient(135deg, #0d3320, #0a2a1a);
      border: 1px solid rgba(37,211,102,0.25); border-radius: 16px;
      padding: 16px 20px; margin-bottom: 16px; display: flex; align-items: center; gap: 14px;
    }
    .wallet-icon { width: 46px; height: 46px; border-radius: 12px; background: rgba(37,211,102,0.15); display: flex; align-items: center; justify-content: center; font-size: 20px; color: var(--wa); flex-shrink: 0; }
    .wallet-info { flex: 1; }
    .wallet-bal { font-size: 20px; font-weight: 800; color: white; }
    .wallet-sub { font-size: 11px; color: var(--muted); }
    .btn-recharge { background: var(--wa); color: white; border: none; border-radius: 10px; padding: 8px 16px; font-size: 12px; font-weight: 700; cursor: pointer; white-space: nowrap; }

    /* Quick Actions */
    .quick-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px; }
    .qa-btn { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 14px 8px; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; transition: all 0.2s; text-decoration: none; border: 1px solid var(--border); }
    .qa-btn:hover { background: var(--card2); transform: translateY(-2px); }
    .qa-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
    .qa-label { font-size: 10px; color: var(--muted); font-weight: 600; text-align: center; }

    /* Section Headers */
    .sec-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .sec-title { font-size: 14px; font-weight: 700; color: white; }
    .sec-link { font-size: 12px; color: var(--wa); text-decoration: none; font-weight: 600; }

    /* Message Cards */
    .msg-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 14px; margin-bottom: 10px; display: flex; align-items: center; gap: 12px; }
    .msg-avatar { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; color: white; flex-shrink: 0; }
    .msg-name { font-size: 13px; font-weight: 600; color: white; margin-bottom: 2px; }
    .msg-preview { font-size: 11px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px; }
    .msg-meta { text-align: right; flex-shrink: 0; }
    .msg-time { font-size: 10px; color: var(--muted); margin-bottom: 4px; }
    .msg-badge { font-size: 9px; padding: 2px 7px; border-radius: 20px; display: inline-block; font-weight: 700; }

    /* Send Screen */
    .send-form-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; margin-bottom: 16px; }
    .form-label-mini { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; display: block; }
    .form-input { width: 100%; padding: 10px 14px; background: var(--bg); border: 1px solid var(--border); border-radius: 10px; color: var(--text); font-size: 13px; outline: none; margin-bottom: 14px; font-family: 'Inter', sans-serif; }
    .form-input:focus { border-color: var(--wa); }
    textarea.form-input { resize: vertical; min-height: 90px; }
    .char-count { font-size: 10px; color: var(--muted); text-align: right; margin-top: -10px; margin-bottom: 14px; }
    .send-type-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
    .send-type-btn { background: var(--bg); border: 2px solid var(--border); border-radius: 10px; padding: 10px; text-align: center; cursor: pointer; transition: all 0.2s; font-size: 12px; color: var(--muted); }
    .send-type-btn.selected { border-color: var(--wa); background: rgba(37,211,102,0.08); color: var(--wa); }
    .credit-est { background: rgba(37,211,102,0.07); border: 1px solid rgba(37,211,102,0.2); border-radius: 10px; padding: 10px 14px; font-size: 12px; color: var(--muted); display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
    .btn-send-main { width: 100%; background: linear-gradient(135deg, var(--wa), var(--wa-teal)); color: white; border: none; border-radius: 12px; padding: 14px; font-size: 15px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }

    /* Contacts Screen */
    .contact-item { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 12px 14px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; }
    .contact-avatar { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: white; flex-shrink: 0; }
    .contact-name { font-size: 13px; font-weight: 600; color: white; }
    .contact-phone { font-size: 11px; color: var(--muted); }
    .contact-tag { font-size: 9px; padding: 2px 7px; border-radius: 20px; background: rgba(108,92,231,0.15); color: var(--primary); font-weight: 600; }
    .search-mini { width: 100%; padding: 10px 14px 10px 38px; background: var(--card); border: 1px solid var(--border); border-radius: 12px; color: var(--text); font-size: 13px; outline: none; margin-bottom: 14px; }

    /* Recharge Screen */
    .recharge-banner { background: linear-gradient(135deg, var(--wa-dark), var(--wa-teal)); border-radius: 16px; padding: 24px 20px; text-align: center; margin-bottom: 20px; }
    .recharge-balance { font-size: 36px; font-weight: 900; color: white; }
    .pack-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
    .pack-card { background: var(--card); border: 2px solid var(--border); border-radius: 14px; padding: 16px; text-align: center; cursor: pointer; transition: all 0.2s; }
    .pack-card:hover, .pack-card.active { border-color: var(--wa); background: rgba(37,211,102,0.07); }
    .pack-card.popular { border-color: var(--primary); position: relative; }
    .pack-popular-tag { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: var(--primary); color: white; font-size: 9px; font-weight: 700; padding: 2px 10px; border-radius: 20px; white-space: nowrap; }
    .pack-msgs { font-size: 20px; font-weight: 900; color: white; }
    .pack-price { font-size: 14px; font-weight: 700; color: var(--wa); }
    .pack-rate { font-size: 10px; color: var(--muted); }
    .wa-pay-btn { width: 100%; background: linear-gradient(135deg, #25D366, #128C7E); color: white; border: none; border-radius: 14px; padding: 16px; font-size: 15px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 10px; box-shadow: 0 6px 20px rgba(37,211,102,0.3); }
    .other-pay { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .other-pay-btn { background: var(--card2); border: 1px solid var(--border); border-radius: 12px; padding: 12px; text-align: center; cursor: pointer; font-size: 12px; color: var(--muted); font-weight: 600; transition: all 0.2s; }
    .other-pay-btn:hover { border-color: var(--primary); color: var(--primary); }

    /* Settings Screen */
    .settings-group { background: var(--card); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; margin-bottom: 14px; }
    .settings-item { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.2s; }
    .settings-item:last-child { border-bottom: none; }
    .settings-item:hover { background: rgba(255,255,255,0.03); }
    .settings-icon { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
    .settings-name { flex: 1; font-size: 13px; font-weight: 500; color: white; }
    .settings-value { font-size: 12px; color: var(--muted); }
    .toggle { width: 40px; height: 22px; border-radius: 11px; background: var(--wa); cursor: pointer; position: relative; transition: background 0.2s; }
    .toggle::after { content: ''; width: 18px; height: 18px; border-radius: 50%; background: white; position: absolute; top: 2px; right: 2px; transition: right 0.2s; }
    .toggle.off { background: var(--border); }
    .toggle.off::after { right: auto; left: 2px; }

    /* Toast */
    .mini-toast { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background: var(--card2); border: 1px solid var(--border); border-radius: 12px; padding: 10px 20px; font-size: 13px; color: white; z-index: 9999; display: none; white-space: nowrap; }
    .mini-toast.show { display: block; animation: fadeInUp 0.3s ease; }
    @keyframes fadeInUp { from { opacity:0; transform: translateX(-50%) translateY(20px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }

    /* Skeleton loader */
    .skeleton { background: linear-gradient(90deg, var(--card) 25%, var(--card2) 50%, var(--card) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 8px; }
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  </style>
</head>
<body>

<!-- Header -->
<header class="mini-header">
  <div class="mini-brand">
    <div class="mini-brand-icon"><i class="fab fa-whatsapp"></i></div>
    <div>
      <div class="mini-brand-name" id="miniOrgName">WapiSend</div>
      <div class="mini-brand-sub" id="miniOrgType">Mini Dashboard</div>
    </div>
  </div>
  <div class="mini-header-right">
    <div class="credit-pill" onclick="switchScreen('recharge')">
      <i class="fas fa-coins" style="color:#fdcb6e"></i>
      <span id="headerCredits">42.5K</span>
    </div>
    <button class="notif-btn" onclick="showMiniToast('3 new notifications')">
      <i class="fas fa-bell"></i>
      <span class="notif-dot"></span>
    </button>
  </div>
</header>

<!-- Main Content -->
<div class="mini-content">

  <!-- HOME SCREEN -->
  <div id="screenHome" class="screen active">

    <!-- Wallet Banner -->
    <div class="wallet-banner">
      <div class="wallet-icon"><i class="fas fa-wallet"></i></div>
      <div class="wallet-info">
        <div class="wallet-bal">42,500 Credits</div>
        <div class="wallet-sub">≈ ₹4,250 • ~42,500 messages left</div>
      </div>
      <button class="btn-recharge" onclick="switchScreen('recharge')">+ Recharge</button>
    </div>

    <!-- Quick Stats -->
    <div class="quick-stats">
      <div class="qs-card g">
        <div class="qs-val">8,421</div>
        <div class="qs-lbl">Sent Today</div>
      </div>
      <div class="qs-card p">
        <div class="qs-val">98.2%</div>
        <div class="qs-lbl">Delivery Rate</div>
      </div>
      <div class="qs-card o">
        <div class="qs-val">312</div>
        <div class="qs-lbl">Replies</div>
      </div>
      <div class="qs-card b">
        <div class="qs-val">47</div>
        <div class="qs-lbl">New Leads</div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="sec-header"><span class="sec-title">Quick Actions</span></div>
    <div class="quick-actions">
      <div class="qa-btn" onclick="switchScreen('send')">
        <div class="qa-icon" style="background:rgba(37,211,102,0.12);color:var(--wa)"><i class="fas fa-paper-plane"></i></div>
        <span class="qa-label">Send Message</span>
      </div>
      <div class="qa-btn" onclick="switchScreen('contacts')">
        <div class="qa-icon" style="background:rgba(108,92,231,0.12);color:var(--primary)"><i class="fas fa-users"></i></div>
        <span class="qa-label">Contacts</span>
      </div>
      <div class="qa-btn" onclick="switchScreen('recharge')">
        <div class="qa-icon" style="background:rgba(253,203,110,0.12);color:#fdcb6e"><i class="fas fa-coins"></i></div>
        <span class="qa-label">Recharge</span>
      </div>
      <div class="qa-btn" onclick="window.location.href='/campaigns'">
        <div class="qa-icon" style="background:rgba(231,76,60,0.12);color:var(--danger)"><i class="fas fa-bullhorn"></i></div>
        <span class="qa-label">Campaign</span>
      </div>
      <div class="qa-btn" onclick="window.location.href='/chatbot-builder'">
        <div class="qa-icon" style="background:rgba(0,206,201,0.12);color:#00CEC9"><i class="fas fa-robot"></i></div>
        <span class="qa-label">Bot Flow</span>
      </div>
      <div class="qa-btn" onclick="window.location.href='/leads'">
        <div class="qa-icon" style="background:rgba(225,112,85,0.12);color:#e17055"><i class="fas fa-fire"></i></div>
        <span class="qa-label">Leads</span>
      </div>
      <div class="qa-btn" onclick="window.location.href='/templates'">
        <div class="qa-icon" style="background:rgba(9,132,227,0.12);color:#0984e3"><i class="fas fa-file-alt"></i></div>
        <span class="qa-label">Templates</span>
      </div>
      <div class="qa-btn" onclick="switchScreen('settings')">
        <div class="qa-icon" style="background:rgba(136,153,166,0.12);color:var(--muted)"><i class="fas fa-cog"></i></div>
        <span class="qa-label">Settings</span>
      </div>
    </div>

    <!-- Recent Messages -->
    <div class="sec-header">
      <span class="sec-title">Recent Sends</span>
      <a href="/campaigns" class="sec-link">See all →</a>
    </div>
    ${[
      {name:'Fee Reminder – Class X', count:'380', time:'9:00 AM', status:'delivered', color:'#0984e3'},
      {name:'Exam Schedule Notice', count:'4,800', time:'10:15 AM', status:'sending', color:'var(--wa)'},
      {name:'PTM Invite – Parents', count:'1,200', time:'2:00 PM', status:'queued', color:'#fdcb6e'},
      {name:'Payslip August – Staff', count:'850', time:'3:30 PM', status:'queued', color:'var(--primary)'},
    ].map(m=>`
    <div class="msg-card">
      <div class="msg-avatar" style="background:${m.color}22;color:${m.color};font-size:12px;font-weight:700">${m.name.substring(0,2).toUpperCase()}</div>
      <div style="flex:1;min-width:0">
        <div class="msg-name">${m.name}</div>
        <div class="msg-preview">${m.count} recipients</div>
      </div>
      <div class="msg-meta">
        <div class="msg-time">${m.time}</div>
        <span class="msg-badge" style="background:${m.status==='delivered'?'rgba(0,184,148,0.15)':m.status==='sending'?'rgba(37,211,102,0.15)':'rgba(243,156,18,0.15)'};color:${m.status==='delivered'?'var(--success)':m.status==='sending'?'var(--wa)':'var(--warning)'}">
          ${m.status}
        </span>
      </div>
    </div>`).join('')}

  </div>

  <!-- SEND SCREEN -->
  <div id="screenSend" class="screen">
    <div style="margin-bottom:16px">
      <div style="font-size:18px;font-weight:800;color:white;margin-bottom:4px">Quick Send</div>
      <div style="font-size:12px;color:var(--muted)">Send WhatsApp messages to contacts or groups</div>
    </div>

    <!-- Send Type -->
    <div class="send-form-card">
      <label class="form-label-mini">Send Type</label>
      <div class="send-type-grid">
        <div class="send-type-btn selected" onclick="selectSendType(this,'single')">
          <i class="fas fa-user" style="display:block;font-size:18px;margin-bottom:4px"></i>Single Contact
        </div>
        <div class="send-type-btn" onclick="selectSendType(this,'group')">
          <i class="fas fa-users" style="display:block;font-size:18px;margin-bottom:4px"></i>Group / List
        </div>
      </div>

      <div id="singleFields">
        <label class="form-label-mini">Phone Number</label>
        <input class="form-input" type="tel" placeholder="+91 XXXXX XXXXX" id="sendPhone">
      </div>
      <div id="groupFields" style="display:none">
        <label class="form-label-mini">Select Contact List</label>
        <select class="form-input">
          <option>All Students (4,800)</option>
          <option>Class X Parents (380)</option>
          <option>Staff & Teachers (120)</option>
          <option>Management (45)</option>
          <option>Alumni Group (1,200)</option>
        </select>
      </div>

      <label class="form-label-mini">Message Template</label>
      <select class="form-input" onchange="loadTemplate(this.value)">
        <option value="">— Type custom message —</option>
        <option value="fee">Fee Reminder</option>
        <option value="exam">Exam Schedule</option>
        <option value="event">Event Notice</option>
        <option value="offer">Promotional Offer</option>
        <option value="otp">OTP / Verification</option>
      </select>

      <label class="form-label-mini">Message</label>
      <textarea class="form-input" id="msgText" placeholder="Type your message here..." oninput="updateCharCount(this)">Hello! This is a notification from our school. Please check the notice board for updates.</textarea>
      <div class="char-count" id="charCount">88 / 1024 chars • 1 credit/msg</div>

      <div class="credit-est">
        <span><i class="fas fa-coins" style="color:#fdcb6e"></i> Estimated Cost</span>
        <span id="creditEst" style="color:var(--wa);font-weight:700">1 credit</span>
      </div>

      <button class="btn-send-main" onclick="sendMessage()">
        <i class="fab fa-whatsapp"></i> Send via WhatsApp
      </button>
    </div>

    <!-- Scheduled Send -->
    <div class="send-form-card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <label class="form-label-mini" style="margin:0">Schedule for Later</label>
        <div class="toggle" id="scheduleToggle" onclick="toggleSchedule()"></div>
      </div>
      <div id="scheduleFields" style="display:none">
        <input class="form-input" type="datetime-local">
        <div style="font-size:11px;color:var(--muted)"><i class="fas fa-info-circle"></i> Message will be sent automatically at scheduled time. Credits will be deducted when sent.</div>
      </div>
      <div id="scheduleOff" style="font-size:12px;color:var(--muted)"><i class="fas fa-clock"></i> Enable to schedule your message for a specific time</div>
    </div>
  </div>

  <!-- CONTACTS SCREEN -->
  <div id="screenContacts" class="screen">
    <div style="margin-bottom:16px">
      <div style="font-size:18px;font-weight:800;color:white;margin-bottom:4px">Contacts</div>
      <div style="font-size:12px;color:var(--muted)">Manage your WhatsApp contact lists</div>
    </div>

    <!-- Search -->
    <div style="position:relative;margin-bottom:14px">
      <i class="fas fa-search" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:13px"></i>
      <input class="search-mini" placeholder="Search contacts...">
    </div>

    <!-- Groups -->
    <div class="sec-header"><span class="sec-title">Contact Lists</span><button class="sec-link" onclick="showMiniToast('Create new list...')">+ New List</button></div>
    ${[
      {name:'All Students',count:'4,800',icon:'graduation-cap',color:'var(--info)'},
      {name:'Class X Parents',count:'380',icon:'users',color:'var(--wa)'},
      {name:'Staff & Teachers',count:'120',icon:'chalkboard-teacher',color:'var(--primary)'},
      {name:'Alumni',count:'1,200',icon:'user-graduate',color:'#fdcb6e'},
      {name:'Management',count:'45',icon:'briefcase',color:'var(--danger)'},
    ].map(g=>`
    <div class="contact-item">
      <div class="contact-avatar" style="background:${g.color}22;color:${g.color}"><i class="fas fa-${g.icon}"></i></div>
      <div style="flex:1">
        <div class="contact-name">${g.name}</div>
        <div class="contact-phone">${g.count} contacts</div>
      </div>
      <button onclick="showMiniToast('Sending to ${g.name}...')" style="background:var(--wa);border:none;border-radius:8px;padding:6px 10px;color:white;font-size:11px;cursor:pointer"><i class="fas fa-paper-plane"></i></button>
    </div>`).join('')}

    <div class="sec-header" style="margin-top:16px"><span class="sec-title">Recent Contacts</span></div>
    ${[
      {name:'Rahul Sharma',phone:'+91 98765 43210',tag:'Student',color:'#0984e3'},
      {name:'Mrs. Priya Singh',phone:'+91 87654 32109',tag:'Teacher',color:'var(--primary)'},
      {name:'Vikram Patel',phone:'+91 76543 21098',tag:'Parent',color:'var(--wa)'},
      {name:'Anita Rao',phone:'+91 65432 10987',tag:'Staff',color:'#fdcb6e'},
    ].map(c=>`
    <div class="contact-item">
      <div class="contact-avatar" style="background:${c.color}22;color:${c.color}">${c.name.split(' ').map(w=>w[0]).join('').toUpperCase()}</div>
      <div style="flex:1">
        <div class="contact-name">${c.name}</div>
        <div class="contact-phone">${c.phone}</div>
      </div>
      <span class="contact-tag">${c.tag}</span>
    </div>`).join('')}
  </div>

  <!-- RECHARGE SCREEN -->
  <div id="screenRecharge" class="screen">
    <!-- Balance Banner -->
    <div class="recharge-banner">
      <div style="font-size:12px;color:rgba(255,255,255,0.7);margin-bottom:4px"><i class="fas fa-coins" style="color:#fdcb6e"></i> Current Balance</div>
      <div class="recharge-balance">42,500</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.8);margin-bottom:4px">Credits  ≈  ₹4,250</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.6)">1 credit = 1 WhatsApp message = ₹0.10</div>
    </div>

    <div class="sec-header"><span class="sec-title">Choose Pack</span></div>
    <div class="pack-grid">
      ${[
        {msgs:'5,000',price:'₹450',rate:'₹0.09/msg',popular:false},
        {msgs:'10,000',price:'₹850',rate:'₹0.085/msg',popular:false},
        {msgs:'25,000',price:'₹1,999',rate:'₹0.08/msg',popular:true},
        {msgs:'50,000',price:'₹3,750',rate:'₹0.075/msg',popular:false},
        {msgs:'1,00,000',price:'₹6,999',rate:'₹0.07/msg',popular:false},
        {msgs:'Custom','price':'Contact Us',rate:'Best rates',popular:false},
      ].map((p,i)=>`
      <div class="pack-card ${p.popular?'popular':''}" onclick="selectPack(this)">
        ${p.popular?'<div class="pack-popular-tag">⭐ BEST VALUE</div>':''}
        <div class="pack-msgs">${p.msgs}</div>
        <div style="font-size:11px;color:var(--muted);margin:2px 0">messages</div>
        <div class="pack-price">${p.price}</div>
        <div class="pack-rate">${p.rate}</div>
      </div>`).join('')}
    </div>

    <div style="margin-bottom:16px">
      <button class="wa-pay-btn" onclick="rechargeWA()">
        <i class="fab fa-whatsapp" style="font-size:20px"></i> Pay via WhatsApp
      </button>
      <div class="other-pay">
        <div class="other-pay-btn" onclick="showMiniToast('Redirecting to UPI...')"><i class="fas fa-mobile-alt"></i> UPI / GPay</div>
        <div class="other-pay-btn" onclick="showMiniToast('Card payment...')"><i class="fas fa-credit-card"></i> Card</div>
        <div class="other-pay-btn" onclick="showMiniToast('Net banking...')"><i class="fas fa-university"></i> Net Banking</div>
        <div class="other-pay-btn" onclick="showMiniToast('NEFT/IMPS...')"><i class="fas fa-exchange-alt"></i> Bank Transfer</div>
      </div>
    </div>

    <!-- Transaction History -->
    <div class="sec-header"><span class="sec-title">History</span></div>
    ${[
      {type:'recharge',label:'Recharged 25,000 credits',amount:'+₹1,999',time:'Oct 23','color':'var(--wa)'},
      {type:'debit',label:'Fee Reminder Campaign',amount:'-380 credits',time:'Oct 23','color':'var(--muted)'},
      {type:'debit',label:'Exam Notice – All Students',amount:'-4,800 credits',time:'Oct 22','color':'var(--muted)'},
      {type:'recharge',label:'Recharged 10,000 credits',amount:'+₹850',time:'Oct 20','color':'var(--wa)'},
    ].map(t=>`
    <div class="msg-card">
      <div style="width:38px;height:38px;border-radius:10px;background:${t.type==='recharge'?'rgba(37,211,102,0.12)':'rgba(45,63,90,0.4)'};display:flex;align-items:center;justify-content:center;color:${t.color};flex-shrink:0">
        <i class="fas fa-${t.type==='recharge'?'plus-circle':'paper-plane'}"></i>
      </div>
      <div style="flex:1"><div class="msg-name" style="font-size:12px">${t.label}</div><div class="msg-preview">${t.time}</div></div>
      <div style="font-size:13px;font-weight:700;color:${t.color}">${t.amount}</div>
    </div>`).join('')}
  </div>

  <!-- SETTINGS SCREEN -->
  <div id="screenSettings" class="screen">
    <div style="margin-bottom:16px">
      <div style="font-size:18px;font-weight:800;color:white;margin-bottom:4px">Settings</div>
    </div>

    <!-- Profile -->
    <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px;text-align:center;margin-bottom:14px">
      <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--wa),var(--wa-teal));display:flex;align-items:center;justify-content:center;font-size:24px;color:white;font-weight:800;margin:0 auto 12px">SM</div>
      <div style="font-size:15px;font-weight:700;color:white">St. Mary's School</div>
      <div style="font-size:12px;color:var(--muted);margin:4px 0">principal@stmarys.edu</div>
      <span style="background:rgba(37,211,102,0.12);color:var(--wa);font-size:11px;padding:3px 12px;border-radius:20px;font-weight:600">Pro Plan</span>
    </div>

    <div class="settings-group">
      <div class="settings-item" onclick="showMiniToast('Opening WhatsApp settings...')">
        <div class="settings-icon" style="background:rgba(37,211,102,0.12);color:var(--wa)"><i class="fab fa-whatsapp"></i></div>
        <span class="settings-name">WhatsApp Number</span>
        <span class="settings-value">+91 98765...</span>
        <i class="fas fa-chevron-right" style="color:var(--muted);font-size:11px"></i>
      </div>
      <div class="settings-item" onclick="showMiniToast('Opening notification preferences...')">
        <div class="settings-icon" style="background:rgba(253,203,110,0.12);color:#fdcb6e"><i class="fas fa-bell"></i></div>
        <span class="settings-name">Notifications</span>
        <div class="toggle"></div>
      </div>
      <div class="settings-item" onclick="showMiniToast('Low balance alert settings...')">
        <div class="settings-icon" style="background:rgba(231,76,60,0.12);color:var(--danger)"><i class="fas fa-exclamation-triangle"></i></div>
        <span class="settings-name">Low Credit Alert</span>
        <span class="settings-value">at 1,000</span>
        <i class="fas fa-chevron-right" style="color:var(--muted);font-size:11px"></i>
      </div>
      <div class="settings-item" onclick="showMiniToast('Auto-recharge settings...')">
        <div class="settings-icon" style="background:rgba(108,92,231,0.12);color:var(--primary)"><i class="fas fa-sync-alt"></i></div>
        <span class="settings-name">Auto Recharge</span>
        <div class="toggle off"></div>
      </div>
    </div>

    <div class="settings-group">
      <div class="settings-item" onclick="window.location.href='/erp-integrations'">
        <div class="settings-icon" style="background:rgba(0,206,201,0.12);color:#00CEC9"><i class="fas fa-plug"></i></div>
        <span class="settings-name">ERP Integration</span>
        <span class="settings-value" style="color:var(--wa)">2 Connected</span>
        <i class="fas fa-chevron-right" style="color:var(--muted);font-size:11px"></i>
      </div>
      <div class="settings-item" onclick="showMiniToast('Managing API keys...')">
        <div class="settings-icon" style="background:rgba(253,203,110,0.12);color:#fdcb6e"><i class="fas fa-key"></i></div>
        <span class="settings-name">API Keys</span>
        <i class="fas fa-chevron-right" style="color:var(--muted);font-size:11px"></i>
      </div>
      <div class="settings-item" onclick="window.location.href='/dashboard'">
        <div class="settings-icon" style="background:rgba(9,132,227,0.12);color:#0984e3"><i class="fas fa-desktop"></i></div>
        <span class="settings-name">Full Dashboard</span>
        <i class="fas fa-chevron-right" style="color:var(--muted);font-size:11px"></i>
      </div>
    </div>

    <div class="settings-group">
      <div class="settings-item" onclick="showMiniToast('Logging out...')">
        <div class="settings-icon" style="background:rgba(231,76,60,0.12);color:var(--danger)"><i class="fas fa-sign-out-alt"></i></div>
        <span class="settings-name" style="color:var(--danger)">Logout</span>
      </div>
    </div>

    <div style="text-align:center;font-size:10px;color:var(--muted);margin-top:20px">
      WapiSend Mini v2.4 • <a href="/landing" style="color:var(--wa)">wapibiz.io</a>
    </div>
  </div>

</div><!-- end mini-content -->

<!-- Bottom Navigation -->
<nav class="bottom-nav">
  <button class="nav-tab active" id="navHome" onclick="switchScreen('home')">
    <i class="fas fa-home"></i>Home
  </button>
  <button class="nav-tab" id="navContacts" onclick="switchScreen('contacts')">
    <i class="fas fa-users"></i>Contacts
  </button>
  <div class="nav-tab-send" onclick="switchScreen('send')">
    <div class="send-fab"><i class="fas fa-paper-plane"></i></div>
    <span style="font-size:10px;color:var(--muted);font-weight:600;margin-top:4px">Send</span>
  </div>
  <button class="nav-tab" id="navRecharge" onclick="switchScreen('recharge')">
    <i class="fas fa-coins"></i>Recharge
  </button>
  <button class="nav-tab" id="navSettings" onclick="switchScreen('settings')">
    <i class="fas fa-cog"></i>Settings
  </button>
</nav>

<!-- Toast -->
<div class="mini-toast" id="miniToast"></div>

<script>
  const screens = {
    home: 'screenHome', send: 'screenSend',
    contacts: 'screenContacts', recharge: 'screenRecharge', settings: 'screenSettings'
  };
  const navIds = {
    home: 'navHome', contacts: 'navContacts', recharge: 'navRecharge', settings: 'navSettings'
  };

  function switchScreen(name) {
    Object.values(screens).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });
    Object.values(navIds).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });
    const screen = document.getElementById(screens[name]);
    if (screen) screen.classList.add('active');
    const nav = document.getElementById(navIds[name]);
    if (nav) nav.classList.add('active');
  }

  function showMiniToast(msg) {
    const t = document.getElementById('miniToast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  function selectSendType(el, type) {
    document.querySelectorAll('.send-type-btn').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('singleFields').style.display = type === 'single' ? '' : 'none';
    document.getElementById('groupFields').style.display = type === 'group' ? '' : 'none';
    updateCreditEst();
  }

  function updateCharCount(el) {
    const len = el.value.length;
    document.getElementById('charCount').textContent = len + ' / 1024 chars • 1 credit/msg';
  }

  function updateCreditEst() {
    const groupVisible = document.getElementById('groupFields').style.display !== 'none';
    document.getElementById('creditEst').textContent = groupVisible ? '~380 credits' : '1 credit';
  }

  function loadTemplate(val) {
    const templates = {
      fee: 'Dear Parent, fees for your ward are due. Kindly pay by the last date to avoid late charges. Contact school office for queries.',
      exam: 'Dear Student/Parent, the exam schedule has been updated. Please check the school notice board or website for full timetable.',
      event: 'You are invited to attend a special event at our institution. Please confirm your attendance. Details will follow shortly.',
      offer: 'Special Offer! Get exclusive discounts on our products/services. Limited time only. Reply YES to know more!',
      otp: 'Your OTP for login is: 4 8 2 9 . Valid for 5 minutes. Do not share with anyone.'
    };
    if (templates[val]) {
      document.getElementById('msgText').value = templates[val];
      updateCharCount(document.getElementById('msgText'));
    }
  }

  function sendMessage() {
    showMiniToast('✓ Message sent via WhatsApp!');
    switchScreen('home');
  }

  function rechargeWA() {
    showMiniToast('Opening WhatsApp payment...');
  }

  function toggleSchedule() {
    const toggle = document.getElementById('scheduleToggle');
    toggle.classList.toggle('off');
    const isOff = toggle.classList.contains('off');
    document.getElementById('scheduleFields').style.display = isOff ? 'none' : '';
    document.getElementById('scheduleOff').style.display = isOff ? '' : 'none';
  }

  function selectPack(el) {
    document.querySelectorAll('.pack-card').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
  }

  // Pre-select best value pack
  document.querySelector('.pack-card.popular').classList.add('active');
</script>
</body>
</html>
`
