// Mini Interface - Simple mobile-first UI for quick WhatsApp messaging
// Standalone page, no sidebar - perfect for simple users

export const miniHTML = () => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>WapiSend Mini</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    :root {
      --wa: #25D366; --wa-dark: #075E54; --wa-teal: #128C7E;
      --bg: #0f172a; --card: #1e293b; --border: #2d3f5a;
      --text: #e2e8f0; --muted: #64748b;
      --primary: #6C5CE7; --danger: #e74c3c; --warning: #f39c12;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); }
    
    /* Mobile phone frame */
    .mini-wrap {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      max-width: 430px;
      margin: 0 auto;
      background: var(--bg);
      position: relative;
    }

    /* Top header */
    .mini-header {
      background: linear-gradient(135deg, var(--wa-dark), var(--wa-teal));
      padding: 16px 20px 20px;
      position: sticky; top: 0; z-index: 100;
    }
    .mini-header-top {
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;
    }
    .mini-logo { display: flex; align-items: center; gap: 8px; }
    .mini-logo-icon { width: 34px; height: 34px; border-radius: 9px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 16px; color: white; }
    .mini-logo span { font-size: 16px; font-weight: 800; color: white; }
    .mini-user { display: flex; align-items: center; gap: 8px; }
    .mini-avatar { width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: white; }

    /* Credit balance bar */
    .credit-bar {
      background: rgba(0,0,0,0.25);
      border-radius: 12px;
      padding: 12px 14px;
      display: flex; align-items: center; gap: 12px;
    }
    .credit-info { flex: 1; }
    .credit-label { font-size: 10px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.8px; }
    .credit-value { font-size: 20px; font-weight: 800; color: white; }
    .credit-sub { font-size: 10px; color: rgba(255,255,255,0.6); }
    .recharge-btn { background: white; color: var(--wa-dark); border: none; border-radius: 9px; padding: 8px 14px; font-size: 12px; font-weight: 700; cursor: pointer; white-space: nowrap; }

    /* Quick nav tabs */
    .mini-tabs {
      display: flex; background: var(--card); border-bottom: 1px solid var(--border);
      position: sticky; top: 106px; z-index: 90;
    }
    .mini-tab {
      flex: 1; padding: 12px 8px; text-align: center; font-size: 11px; font-weight: 600;
      color: var(--muted); border: none; background: none; cursor: pointer;
      border-bottom: 2px solid transparent; transition: all 0.2s;
    }
    .mini-tab.active { color: var(--wa); border-bottom-color: var(--wa); }
    .mini-tab i { display: block; font-size: 16px; margin-bottom: 3px; }

    /* Panels */
    .mini-panel { display: none; padding: 16px; flex: 1; }
    .mini-panel.active { display: block; }

    /* Cards */
    .m-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; margin-bottom: 14px; overflow: hidden; }
    .m-card-header { padding: 14px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
    .m-card-title { font-size: 13px; font-weight: 700; color: white; display: flex; align-items: center; gap: 7px; }
    .m-card-body { padding: 14px 16px; }

    /* Send message form */
    .send-form { display: flex; flex-direction: column; gap: 12px; }
    .form-label { font-size: 11px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; display: block; }
    .form-input {
      width: 100%; padding: 11px 14px;
      background: var(--bg); border: 1px solid var(--border);
      border-radius: 10px; color: var(--text); font-size: 13px;
      outline: none; transition: border-color 0.2s; font-family: inherit;
    }
    .form-input:focus { border-color: var(--wa); }
    textarea.form-input { resize: none; min-height: 100px; }

    /* Templates quick-pick */
    .template-chips { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
    .template-chip {
      flex-shrink: 0; background: rgba(37,211,102,0.1); border: 1px solid rgba(37,211,102,0.2);
      color: var(--wa); border-radius: 20px; padding: 5px 12px; font-size: 11px; font-weight: 600;
      cursor: pointer; white-space: nowrap; transition: all 0.2s;
    }
    .template-chip:hover { background: rgba(37,211,102,0.2); }

    /* Send button */
    .send-btn {
      width: 100%; padding: 14px; background: linear-gradient(135deg, var(--wa), var(--wa-teal));
      border: none; border-radius: 12px; color: white; font-size: 14px; font-weight: 700;
      cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .send-btn:active { transform: scale(0.98); }

    /* Contact input with type selector */
    .contact-type-row { display: flex; gap: 8px; }
    .contact-type-row .form-input { flex: 1; }
    .type-select { width: 110px; padding: 11px 10px; background: var(--bg); border: 1px solid var(--border); border-radius: 10px; color: var(--text); font-size: 12px; outline: none; }

    /* Stats row */
    .mini-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin-bottom: 14px; }
    .mini-stat { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 14px; text-align: center; }
    .mini-stat-value { font-size: 22px; font-weight: 800; color: white; }
    .mini-stat-label { font-size: 10px; color: var(--muted); margin-top: 3px; text-transform: uppercase; letter-spacing: 0.5px; }

    /* Message history list */
    .msg-list { display: flex; flex-direction: column; gap: 8px; }
    .msg-item {
      background: var(--card); border: 1px solid var(--border); border-radius: 12px;
      padding: 12px 14px; display: flex; align-items: center; gap: 10px;
    }
    .msg-icon { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
    .msg-icon.sent { background: rgba(37,211,102,0.15); color: var(--wa); }
    .msg-icon.bulk { background: rgba(108,92,231,0.15); color: var(--primary); }
    .msg-icon.bot { background: rgba(0,206,201,0.15); color: #00CEC9; }
    .msg-details { flex: 1; min-width: 0; }
    .msg-title { font-size: 12px; font-weight: 600; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .msg-sub { font-size: 10px; color: var(--muted); margin-top: 2px; }
    .msg-status { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 8px; white-space: nowrap; }
    .msg-status.ok { background: rgba(37,211,102,0.15); color: var(--wa); }
    .msg-status.pending { background: rgba(243,156,18,0.15); color: var(--warning); }
    .msg-status.fail { background: rgba(231,76,60,0.15); color: var(--danger); }

    /* Recharge panel */
    .recharge-packs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
    .r-pack {
      border: 2px solid var(--border); border-radius: 12px; padding: 14px; text-align: center;
      cursor: pointer; transition: all 0.2s; position: relative;
    }
    .r-pack.popular { border-color: var(--wa); background: rgba(37,211,102,0.05); }
    .r-pack-badge { position: absolute; top: -8px; left: 50%; transform: translateX(-50%); background: var(--wa); color: white; font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 8px; white-space: nowrap; }
    .r-pack-credits { font-size: 20px; font-weight: 800; color: white; }
    .r-pack-price { font-size: 16px; font-weight: 700; color: var(--wa); margin: 4px 0; }
    .r-pack-per { font-size: 10px; color: var(--muted); }

    /* Payment methods */
    .pay-methods { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
    .pay-method {
      display: flex; align-items: center; gap: 12px;
      border: 2px solid var(--border); border-radius: 12px; padding: 12px 14px;
      cursor: pointer; transition: border-color 0.2s;
    }
    .pay-method.selected { border-color: var(--wa); }
    .pay-method-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
    .pay-method-name { font-size: 13px; font-weight: 600; color: white; }
    .pay-method-sub { font-size: 11px; color: var(--muted); }
    .pay-radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--border); margin-left: auto; display: flex; align-items: center; justify-content: center; }
    .pay-method.selected .pay-radio { border-color: var(--wa); background: var(--wa); }
    .pay-method.selected .pay-radio::after { content: ''; width: 8px; height: 8px; border-radius: 50%; background: white; }

    /* WhatsApp recharge chat bubble UI */
    .wa-chat-demo {
      background: #0b141a;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 14px;
    }
    .wa-chat-header {
      background: #1f2c33;
      padding: 10px 14px;
      display: flex; align-items: center; gap: 10px;
    }
    .wa-chat-body { padding: 14px; display: flex; flex-direction: column; gap: 8px; }
    .wa-msg { max-width: 75%; padding: 8px 12px; border-radius: 12px; font-size: 12px; line-height: 1.5; }
    .wa-msg.recv { background: #1f2c33; color: #e9edef; align-self: flex-start; border-radius: 0 12px 12px 12px; }
    .wa-msg.sent { background: #005c4b; color: #e9edef; align-self: flex-end; border-radius: 12px 0 12px 12px; }
    .wa-msg-time { font-size: 10px; color: rgba(255,255,255,0.4); text-align: right; margin-top: 3px; }

    /* Bot flows */
    .bot-list { display: flex; flex-direction: column; gap: 10px; }
    .bot-item { display: flex; align-items: center; gap: 12px; background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 12px 14px; }
    .bot-status-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
    .bot-status-dot.on { background: var(--wa); box-shadow: 0 0 6px var(--wa); }
    .bot-status-dot.off { background: var(--muted); }
    .bot-name { font-size: 13px; font-weight: 600; color: white; flex: 1; }
    .bot-count { font-size: 11px; color: var(--muted); }
    .bot-toggle { padding: 5px 12px; border-radius: 8px; border: none; font-size: 11px; font-weight: 600; cursor: pointer; }
    .bot-toggle.on { background: rgba(37,211,102,0.15); color: var(--wa); }
    .bot-toggle.off { background: rgba(100,116,139,0.15); color: var(--muted); }

    /* Bottom nav */
    .mini-bottom-nav {
      position: sticky; bottom: 0;
      background: var(--card); border-top: 1px solid var(--border);
      display: flex;
    }
    .bottom-nav-item {
      flex: 1; padding: 10px 8px; text-align: center;
      font-size: 10px; font-weight: 600; color: var(--muted);
      border: none; background: none; cursor: pointer; transition: color 0.2s;
    }
    .bottom-nav-item.active { color: var(--wa); }
    .bottom-nav-item i { display: block; font-size: 18px; margin-bottom: 3px; }

    /* Toast */
    .toast-container { position: fixed; bottom: 70px; left: 50%; transform: translateX(-50%); z-index: 9999; width: 90%; max-width: 380px; }
    .toast { background: #1f2c33; border: 1px solid var(--border); border-radius: 12px; padding: 12px 16px; display: flex; align-items: center; gap: 10px; font-size: 12px; color: white; margin-bottom: 8px; animation: toastIn 0.3s ease; }
    @keyframes toastIn { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
    .toast.success i { color: var(--wa); }
    .toast.error i { color: var(--danger); }
    .toast.info i { color: #0984e3; }
  </style>
</head>
<body>
<div class="mini-wrap">

  <!-- Header -->
  <div class="mini-header">
    <div class="mini-header-top">
      <div class="mini-logo">
        <div class="mini-logo-icon"><i class="fab fa-whatsapp"></i></div>
        <span id="appName">WapiSend</span>
      </div>
      <div class="mini-user">
        <div style="text-align:right;margin-right:4px">
          <div style="font-size:12px;font-weight:600;color:white">Ravi Kumar</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.6)">Green Valley Pharmacy</div>
        </div>
        <div class="mini-avatar">RK</div>
      </div>
    </div>
    <div class="credit-bar">
      <div style="width:38px;height:38px;background:rgba(255,255,255,0.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;color:white;flex-shrink:0"><i class="fas fa-coins"></i></div>
      <div class="credit-info">
        <div class="credit-label">Available Credits</div>
        <div class="credit-value" id="miniCredits">6,800</div>
        <div class="credit-sub">≈ ₹680 • 6,800 messages left</div>
      </div>
      <button class="recharge-btn" onclick="switchPanel('recharge')"><i class="fas fa-plus"></i> Recharge</button>
    </div>
  </div>

  <!-- Tabs -->
  <div class="mini-tabs">
    <button class="mini-tab active" id="tab-send" onclick="switchPanel('send')">
      <i class="fas fa-paper-plane"></i>Send
    </button>
    <button class="mini-tab" id="tab-bulk" onclick="switchPanel('bulk')">
      <i class="fas fa-users"></i>Bulk
    </button>
    <button class="mini-tab" id="tab-bots" onclick="switchPanel('bots')">
      <i class="fas fa-robot"></i>Bots
    </button>
    <button class="mini-tab" id="tab-history" onclick="switchPanel('history')">
      <i class="fas fa-history"></i>History
    </button>
    <button class="mini-tab" id="tab-recharge" onclick="switchPanel('recharge')">
      <i class="fas fa-wallet"></i>Wallet
    </button>
  </div>

  <!-- ── SEND PANEL ── -->
  <div class="mini-panel active" id="panel-send">
    <div class="m-card">
      <div class="m-card-header">
        <div class="m-card-title"><i class="fab fa-whatsapp" style="color:var(--wa)"></i> Send WhatsApp Message</div>
      </div>
      <div class="m-card-body">
        <div class="send-form">
          <div>
            <label class="form-label">To (Phone Number)</label>
            <div class="contact-type-row">
              <input type="tel" class="form-input" placeholder="+91 98765 43210" id="sendPhone">
              <select class="type-select" id="sendType">
                <option>Single</option>
                <option>Group</option>
              </select>
            </div>
          </div>
          <div>
            <label class="form-label">Quick Templates</label>
            <div class="template-chips">
              <div class="template-chip" onclick="setTemplate('order')">📦 Order Ready</div>
              <div class="template-chip" onclick="setTemplate('appt')">📅 Appointment</div>
              <div class="template-chip" onclick="setTemplate('promo')">🎉 Offer</div>
              <div class="template-chip" onclick="setTemplate('remind')">⏰ Reminder</div>
              <div class="template-chip" onclick="setTemplate('custom')">✍️ Custom</div>
            </div>
          </div>
          <div>
            <label class="form-label">Message</label>
            <textarea class="form-input" id="sendMsg" placeholder="Type your WhatsApp message here...">Hi! Your order is ready for pickup. Please visit our store between 10 AM – 6 PM. Thank you for choosing us! 🙏</textarea>
            <div style="display:flex;justify-content:space-between;margin-top:5px">
              <span style="font-size:10px;color:var(--muted)">Cost: <span style="color:var(--wa);font-weight:700">1 credit</span></span>
              <span style="font-size:10px;color:var(--muted)" id="charCount">160 / 4096 chars</span>
            </div>
          </div>
          <div>
            <label class="form-label">Attach (Optional)</label>
            <div style="display:flex;gap:8px">
              ${[['image','Image','📷'],['pdf','PDF','📄'],['video','Video','🎥']].map(([t,l,e])=>`
              <button class="btn" style="flex:1;justify-content:center;background:rgba(255,255,255,0.04);border:1px solid var(--border);color:var(--muted);border-radius:10px;padding:10px;font-size:12px;cursor:pointer" onclick="showToast('${l} picker opening...','info')">
                ${e}<span style="margin-left:4px">${l}</span>
              </button>`).join('')}
            </div>
          </div>
          <button class="send-btn" onclick="sendMessage()">
            <i class="fab fa-whatsapp"></i> Send via WhatsApp
          </button>
        </div>
      </div>
    </div>

    <!-- Recent activity on send panel -->
    <div class="m-card">
      <div class="m-card-header">
        <div class="m-card-title"><i class="fas fa-clock" style="color:var(--muted)"></i> Today's Activity</div>
        <span style="font-size:11px;color:var(--wa);font-weight:600">24 sent</span>
      </div>
      <div class="m-card-body" style="padding:10px 14px">
        ${[
          ['+91 98765 43210','Order ready','2m ago','ok'],
          ['+91 87654 32109','Appointment reminder','15m ago','ok'],
          ['+91 76543 21098','Promo offer','1h ago','ok'],
          ['+91 65432 10987','Custom message','2h ago','fail'],
        ].map(([ph,msg,time,st])=>`
        <div class="msg-item" style="margin-bottom:8px">
          <div class="msg-icon sent"><i class="fas fa-paper-plane"></i></div>
          <div class="msg-details">
            <div class="msg-title">${ph}</div>
            <div class="msg-sub">${msg} • ${time}</div>
          </div>
          <span class="msg-status ${st}">${st==='ok'?'✓ Sent':'✗ Failed'}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- ── BULK PANEL ── -->
  <div class="mini-panel" id="panel-bulk">
    <div class="mini-stats">
      <div class="mini-stat">
        <div class="mini-stat-value" style="color:var(--wa)">8,200</div>
        <div class="mini-stat-label">Sent This Month</div>
      </div>
      <div class="mini-stat">
        <div class="mini-stat-value" style="color:#a29bfe">96%</div>
        <div class="mini-stat-label">Delivery Rate</div>
      </div>
    </div>

    <div class="m-card">
      <div class="m-card-header">
        <div class="m-card-title"><i class="fas fa-users" style="color:var(--primary)"></i> Bulk Campaign</div>
      </div>
      <div class="m-card-body">
        <div class="send-form">
          <div>
            <label class="form-label">Campaign Name</label>
            <input type="text" class="form-input" placeholder="e.g. Weekend Sale Offer">
          </div>
          <div>
            <label class="form-label">Select Contact Group</label>
            <select class="form-input">
              <option>All Customers (342 contacts)</option>
              <option>Premium Customers (89 contacts)</option>
              <option>New Customers (124 contacts)</option>
              <option>Inactive 30 days (76 contacts)</option>
            </select>
          </div>
          <div>
            <label class="form-label">Message Template</label>
            <select class="form-input" id="bulkTemplate" onchange="updateBulkPreview()">
              <option value="promo">🎉 Promotional Offer</option>
              <option value="reminder">⏰ Appointment Reminder</option>
              <option value="announce">📢 Announcement</option>
              <option value="feedback">⭐ Feedback Request</option>
            </select>
          </div>
          <div>
            <label class="form-label">Preview</label>
            <div style="background:#0b141a;border-radius:10px;padding:12px">
              <div class="wa-msg recv" id="bulkPreview">Hi {{name}}! 🎉 Special weekend offer just for you — 20% off on all items! Visit us today. Reply STOP to unsubscribe.</div>
            </div>
          </div>
          <div>
            <label class="form-label">Schedule (Optional)</label>
            <input type="datetime-local" class="form-input">
          </div>
          <div style="background:rgba(37,211,102,0.05);border:1px solid rgba(37,211,102,0.15);border-radius:10px;padding:12px">
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px">
              <span style="color:var(--muted)">Recipients</span>
              <span style="color:white;font-weight:600">342 contacts</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px">
              <span style="color:var(--muted)">Credits Required</span>
              <span style="color:var(--warning);font-weight:600">342 credits</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:12px">
              <span style="color:var(--muted)">Est. Cost</span>
              <span style="color:var(--wa);font-weight:700">₹34.20</span>
            </div>
          </div>
          <button class="send-btn" onclick="launchBulk()">
            <i class="fas fa-rocket"></i> Launch Campaign
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ── BOTS PANEL ── -->
  <div class="mini-panel" id="panel-bots">
    <div class="m-card" style="margin-bottom:14px">
      <div class="m-card-header">
        <div class="m-card-title"><i class="fas fa-robot" style="color:var(--primary)"></i> My Chat Bots</div>
        <button style="background:var(--primary);color:white;border:none;border-radius:8px;padding:6px 12px;font-size:11px;font-weight:600;cursor:pointer" onclick="showToast('Opening bot builder...','info')"><i class="fas fa-plus"></i> New</button>
      </div>
      <div class="m-card-body">
        <div class="bot-list">
          ${[
            ['Welcome & Menu Bot','on','Active • 1,240 chats today'],
            ['Order Status Bot','on','Active • 380 queries today'],
            ['Appointment Book Bot','on','Active • 92 bookings today'],
            ['Support & FAQ Bot','off','Paused'],
          ].map(([name,status,info])=>`
          <div class="bot-item">
            <div class="bot-status-dot ${status}"></div>
            <div style="flex:1">
              <div class="bot-name">${name}</div>
              <div class="bot-count">${info}</div>
            </div>
            <button class="bot-toggle ${status}" onclick="toggleBot(this)">${status==='on'?'Pause':'Start'}</button>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Simulated chat preview -->
    <div class="m-card">
      <div class="m-card-header">
        <div class="m-card-title"><i class="fas fa-eye" style="color:var(--accent)"></i> Bot Preview (Welcome Bot)</div>
      </div>
      <div class="wa-chat-demo" style="margin:0">
        <div class="wa-chat-header">
          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--wa),var(--wa-teal));display:flex;align-items:center;justify-content:center;font-size:14px;color:white"><i class="fab fa-whatsapp"></i></div>
          <div style="margin-left:4px">
            <div style="font-size:13px;font-weight:600;color:#e9edef">Green Valley Pharmacy</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.5)">Online • Business Account</div>
          </div>
        </div>
        <div class="wa-chat-body">
          <div class="wa-msg recv">
            👋 Welcome to Green Valley Pharmacy!<br><br>
            Please choose:<br>
            1️⃣ Order Status<br>
            2️⃣ Book Appointment<br>
            3️⃣ Check Availability<br>
            4️⃣ Talk to Pharmacist
            <div class="wa-msg-time">10:30 AM ✓</div>
          </div>
          <div class="wa-msg sent">
            2
            <div class="wa-msg-time">10:31 AM ✓✓</div>
          </div>
          <div class="wa-msg recv">
            📅 *Book Appointment*<br><br>
            Please share your name and preferred date/time.<br><br>
            Example: "Ravi Kumar, Tomorrow 11 AM"
            <div class="wa-msg-time">10:31 AM ✓✓</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── HISTORY PANEL ── -->
  <div class="mini-panel" id="panel-history">
    <div class="mini-stats">
      <div class="mini-stat">
        <div class="mini-stat-value" style="color:var(--wa)">8,200</div>
        <div class="mini-stat-label">Total Sent</div>
      </div>
      <div class="mini-stat">
        <div class="mini-stat-value" style="color:#a29bfe">96%</div>
        <div class="mini-stat-label">Delivered</div>
      </div>
    </div>
    <div class="m-card">
      <div class="m-card-header">
        <div class="m-card-title"><i class="fas fa-history" style="color:var(--accent)"></i> Message History</div>
        <select style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:8px;padding:5px 8px;font-size:11px">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      <div class="m-card-body" style="padding:10px 14px">
        <div class="msg-list">
          ${[
            ['Weekend Sale Campaign','bulk','342 contacts • 342 delivered','2h ago','ok'],
            ['Appointment Reminders','bulk','28 contacts • 27 delivered','Yesterday','ok'],
            ['Order Ready - Ravi','sent','Single message','Yesterday','ok'],
            ['Promo Blast - Diwali','bulk','450 contacts • 441 delivered','3 days ago','ok'],
            ['OTP - Customer Login','bot','Auto-triggered','3 days ago','ok'],
            ['Support Query Reply','bot','Auto-reply','4 days ago','fail'],
          ].map(([title,type,info,time,st])=>`
          <div class="msg-item">
            <div class="msg-icon ${type}">
              <i class="fas fa-${type==='sent'?'paper-plane':type==='bulk'?'users':'robot'}"></i>
            </div>
            <div class="msg-details">
              <div class="msg-title">${title}</div>
              <div class="msg-sub">${info} • ${time}</div>
            </div>
            <span class="msg-status ${st}">${st==='ok'?'✓':'✗'}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <!-- ── RECHARGE / WALLET PANEL ── -->
  <div class="mini-panel" id="panel-recharge">
    <!-- WhatsApp Recharge via Chat Demo -->
    <div class="m-card" style="background:linear-gradient(135deg,rgba(37,211,102,0.06),rgba(18,140,126,0.03));border-color:rgba(37,211,102,0.2)">
      <div class="m-card-header" style="border-color:rgba(37,211,102,0.15)">
        <div class="m-card-title"><i class="fab fa-whatsapp" style="color:var(--wa)"></i> Recharge via WhatsApp</div>
        <span style="font-size:10px;background:rgba(37,211,102,0.15);color:var(--wa);padding:3px 8px;border-radius:8px;font-weight:600">Unique!</span>
      </div>
      <div class="m-card-body">
        <div style="font-size:12px;color:var(--muted);margin-bottom:12px">
          Send a WhatsApp message to recharge — no app or website needed. Just chat!
        </div>
        <div class="wa-chat-demo">
          <div class="wa-chat-header">
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--wa),var(--wa-teal));display:flex;align-items:center;justify-content:center;font-size:14px;color:white"><i class="fab fa-whatsapp"></i></div>
            <div style="margin-left:4px">
              <div style="font-size:12px;font-weight:600;color:#e9edef">WapiSend Billing</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.5)">+91 88888 00001</div>
            </div>
          </div>
          <div class="wa-chat-body">
            <div class="wa-msg recv">
              Hi Ravi! 👋 Your balance: *6,800 credits*<br><br>
              Reply with a pack number to recharge:<br>
              1️⃣ 10K credits — ₹1,000<br>
              2️⃣ 50K credits — ₹4,500 ⭐<br>
              3️⃣ 1L credits — ₹8,500<br>
              4️⃣ Custom amount
              <div class="wa-msg-time">Now ✓</div>
            </div>
            <div class="wa-msg sent">
              2
              <div class="wa-msg-time">Now ✓✓</div>
            </div>
            <div class="wa-msg recv">
              ✅ *50,000 credits — ₹4,500*<br><br>
              Pay via UPI / Card / Net Banking:<br>
              🔗 pay.wapi.app/ravi-kumar<br><br>
              Link expires in 30 minutes
              <div class="wa-msg-time">Now ✓✓</div>
            </div>
          </div>
        </div>
        <button class="send-btn" style="margin-top:8px" onclick="showToast('WhatsApp recharge initiated!','success')">
          <i class="fab fa-whatsapp"></i> Start WhatsApp Recharge
        </button>
      </div>
    </div>

    <!-- Normal recharge packs -->
    <div class="m-card">
      <div class="m-card-header">
        <div class="m-card-title"><i class="fas fa-coins" style="color:#fdcb6e"></i> Recharge Packs</div>
      </div>
      <div class="m-card-body">
        <div class="recharge-packs">
          <div class="r-pack" onclick="selectPack(this)">
            <div class="r-pack-credits">10K</div>
            <div style="font-size:11px;color:var(--muted);margin:2px 0">Credits</div>
            <div class="r-pack-price">₹1,000</div>
            <div class="r-pack-per">₹0.10/msg</div>
          </div>
          <div class="r-pack popular" onclick="selectPack(this)">
            <div class="r-pack-badge">⭐ Best Value</div>
            <div class="r-pack-credits" style="color:var(--wa)">50K</div>
            <div style="font-size:11px;color:var(--muted);margin:2px 0">Credits</div>
            <div class="r-pack-price">₹4,500</div>
            <div class="r-pack-per">₹0.09/msg</div>
          </div>
          <div class="r-pack" onclick="selectPack(this)">
            <div class="r-pack-credits">1L</div>
            <div style="font-size:11px;color:var(--muted);margin:2px 0">Credits</div>
            <div class="r-pack-price">₹8,500</div>
            <div class="r-pack-per">₹0.085/msg</div>
          </div>
          <div class="r-pack" onclick="selectPack(this)">
            <div class="r-pack-credits">5L</div>
            <div style="font-size:11px;color:var(--muted);margin:2px 0">Credits</div>
            <div class="r-pack-price">₹37,500</div>
            <div class="r-pack-per">₹0.075/msg</div>
          </div>
        </div>

        <div style="font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px">Pay With</div>
        <div class="pay-methods">
          <div class="pay-method selected" onclick="selectPay(this)">
            <div class="pay-method-icon" style="background:rgba(37,211,102,0.1);font-size:14px">UPI</div>
            <div>
              <div class="pay-method-name">UPI / QR</div>
              <div class="pay-method-sub">GPay, PhonePe, Paytm</div>
            </div>
            <div class="pay-radio"><div></div></div>
          </div>
          <div class="pay-method" onclick="selectPay(this)">
            <div class="pay-method-icon" style="background:rgba(9,132,227,0.1)">💳</div>
            <div>
              <div class="pay-method-name">Card</div>
              <div class="pay-method-sub">Visa, Mastercard, Rupay</div>
            </div>
            <div class="pay-radio"></div>
          </div>
          <div class="pay-method" onclick="selectPay(this)">
            <div class="pay-method-icon" style="background:rgba(108,92,231,0.1)">🏦</div>
            <div>
              <div class="pay-method-name">Net Banking</div>
              <div class="pay-method-sub">All major banks</div>
            </div>
            <div class="pay-radio"></div>
          </div>
        </div>
        <button class="send-btn" onclick="processRecharge()">
          <i class="fas fa-lock"></i> Pay & Recharge Now
        </button>
      </div>
    </div>

    <!-- Transaction history -->
    <div class="m-card">
      <div class="m-card-header">
        <div class="m-card-title"><i class="fas fa-receipt" style="color:var(--accent)"></i> Recent Transactions</div>
      </div>
      <div class="m-card-body" style="padding:10px 14px">
        ${[
          ['Recharge 50K','Oct 23','+ 50,000','var(--wa)','arrow-down'],
          ['Campaign: Diwali','Oct 22','- 342','var(--danger)','arrow-up'],
          ['Recharge 10K','Oct 20','+ 10,000','var(--wa)','arrow-down'],
          ['Bot Messages','Oct 19','- 124','var(--danger)','arrow-up'],
        ].map(([title,date,amt,col,ic])=>`
        <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(45,63,90,0.3)">
          <div style="width:32px;height:32px;border-radius:8px;background:${col}22;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="fas fa-${ic}" style="color:${col};font-size:13px"></i>
          </div>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:600;color:white">${title}</div>
            <div style="font-size:10px;color:var(--muted)">${date}</div>
          </div>
          <span style="font-size:13px;font-weight:700;color:${col}">${amt}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>

</div><!-- end mini-wrap -->

<!-- Toast container -->
<div class="toast-container" id="toastContainer"></div>

<!-- Bottom bar hint for desktop -->
<div style="position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:var(--card);border-top:1px solid var(--border);z-index:200">
  <div style="display:flex">
    <a href="/dashboard" style="flex:1;padding:8px;text-align:center;font-size:10px;color:var(--muted);text-decoration:none">
      <i class="fas fa-th-large" style="display:block;font-size:16px;margin-bottom:2px"></i>Full Dashboard
    </a>
    <a href="/whitelabel" style="flex:1;padding:8px;text-align:center;font-size:10px;color:var(--muted);text-decoration:none">
      <i class="fas fa-cog" style="display:block;font-size:16px;margin-bottom:2px"></i>Admin Panel
    </a>
    <a href="/super-admin" style="flex:1;padding:8px;text-align:center;font-size:10px;color:var(--muted);text-decoration:none">
      <i class="fas fa-crown" style="display:block;font-size:16px;margin-bottom:2px"></i>Super Admin
    </a>
  </div>
</div>

<script>
function switchPanel(name) {
  document.querySelectorAll('.mini-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.mini-tab').forEach(t => t.classList.remove('active'));
  const panel = document.getElementById('panel-'+name);
  const tab = document.getElementById('tab-'+name);
  if(panel) panel.classList.add('active');
  if(tab) tab.classList.add('active');
}
function showToast(msg, type='success') {
  const c = document.getElementById('toastContainer');
  const icons = {success:'check-circle',error:'times-circle',info:'info-circle'};
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.innerHTML = '<i class="fas fa-' + (icons[type]||'info-circle') + '"></i><span>' + msg + '</span>';
  c.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
const templates = {
  order: "Hi! Your order is ready for pickup. Please visit our store between 10 AM – 6 PM. Thank you! 🙏",
  appt: "Reminder: You have an appointment tomorrow at {{time}}. Reply CONFIRM to confirm or CANCEL to reschedule.",
  promo: "🎉 Special offer for you! Get 20% OFF on all items today only. Visit us or reply BUY to order. Valid till midnight!",
  remind: "⏰ Friendly reminder: {{item}} is due on {{date}}. Please take action. Reply DONE if completed.",
  custom: ""
};
function setTemplate(type) {
  const el = document.getElementById('sendMsg');
  if(el) el.value = templates[type] || '';
  if(type === 'custom') el && el.focus();
}
function sendMessage() {
  const phone = document.getElementById('sendPhone').value;
  const msg = document.getElementById('sendMsg').value;
  if(!phone || !msg) { showToast('Please fill phone and message','error'); return; }
  showToast('Message sent successfully!', 'success');
  document.getElementById('sendPhone').value = '';
}
function launchBulk() {
  showToast('Campaign launched! 342 messages queued.', 'success');
}
function toggleBot(btn) {
  const isOn = btn.classList.contains('on');
  btn.classList.toggle('on');
  btn.classList.toggle('off');
  btn.textContent = isOn ? 'Start' : 'Pause';
  btn.previousElementSibling.className = 'bot-name';
  btn.closest('.bot-item').querySelector('.bot-status-dot').className = 'bot-status-dot ' + (isOn ? 'off' : 'on');
  showToast('Bot ' + (isOn ? 'paused' : 'started'), isOn ? 'error' : 'success');
}
function selectPack(el) {
  document.querySelectorAll('.r-pack').forEach(p => p.classList.remove('popular'));
  el.classList.add('popular');
}
function selectPay(el) {
  document.querySelectorAll('.pay-method').forEach(p => {
    p.classList.remove('selected');
    const r = p.querySelector('.pay-radio');
    r.innerHTML = '';
  });
  el.classList.add('selected');
  el.querySelector('.pay-radio').innerHTML = '<div></div>';
}
function processRecharge() {
  showToast('Redirecting to payment gateway...', 'info');
  setTimeout(() => showToast('Payment successful! 50,000 credits added.', 'success'), 2000);
}
document.getElementById('sendMsg') && document.getElementById('sendMsg').addEventListener('input', function() {
  const el = document.getElementById('charCount');
  if(el) el.textContent = this.value.length + ' / 4096 chars';
});
const bulkPreviews = {
  promo: "Hi {{name}}! 🎉 Special weekend offer — 20% off all items! Visit us today. Reply STOP to unsubscribe.",
  reminder: "Hi {{name}}, this is a reminder for your appointment on {{date}} at {{time}}. Reply CONFIRM or CANCEL.",
  announce: "📢 Important announcement from Green Valley Pharmacy: {{message}}. For queries reply INFO.",
  feedback: "Hi {{name}}! 😊 How was your experience with us? Rate 1-5 and we'll send you a special reward!"
};
function updateBulkPreview() {
  const sel = document.getElementById('bulkTemplate');
  const prev = document.getElementById('bulkPreview');
  if(sel && prev) prev.textContent = bulkPreviews[sel.value] || '';
}
</script>
</body>
</html>`
