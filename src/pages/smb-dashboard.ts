import { pageShell } from './layout'

export const smbDashboardHTML = () => pageShell(`

<!-- SMB Hero Banner -->
<div style="background:linear-gradient(135deg,#0a1f0e 0%,#0d2b1a 60%,#0a1f2a 100%);border:1px solid rgba(37,211,102,0.25);border-radius:20px;padding:28px 32px;margin-bottom:24px;position:relative;overflow:hidden">
  <div style="position:absolute;right:-20px;bottom:-20px;width:180px;height:180px;background:radial-gradient(circle,rgba(37,211,102,0.12),transparent);border-radius:50%"></div>
  <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:16px">
    <div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <div style="background:linear-gradient(135deg,var(--wa-green),var(--wa-teal));border-radius:12px;width:42px;height:42px;display:flex;align-items:center;justify-content:center;font-size:20px;color:white"><i class="fas fa-store"></i></div>
        <div>
          <div style="font-size:20px;font-weight:900;color:white">Small Business <span style="color:var(--wa-green)">Suite</span></div>
          <div style="font-size:12px;color:var(--text-muted)">WhatsApp marketing made simple for shops, salons, restaurants & freelancers</div>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:12px">
        <span style="background:rgba(37,211,102,0.12);border:1px solid rgba(37,211,102,0.25);border-radius:20px;padding:4px 12px;font-size:11px;color:var(--wa-green)"><i class="fas fa-check-circle"></i> Zero Technical Knowledge Needed</span>
        <span style="background:rgba(108,92,231,0.12);border:1px solid rgba(108,92,231,0.25);border-radius:20px;padding:4px 12px;font-size:11px;color:var(--primary)"><i class="fas fa-rupee-sign"></i> Start from ₹999/month</span>
        <span style="background:rgba(9,132,227,0.12);border:1px solid rgba(9,132,227,0.25);border-radius:20px;padding:4px 12px;font-size:11px;color:var(--info)"><i class="fas fa-mobile-alt"></i> Works on Mobile</span>
      </div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <a href="/mini" class="btn btn-success btn-sm"><i class="fas fa-mobile-alt"></i> Mini View</a>
      <button class="btn btn-primary btn-sm" onclick="openModal('quickCampaignModal')"><i class="fas fa-bolt"></i> Quick Campaign</button>
    </div>
  </div>
</div>

<!-- Business Type Pills -->
<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px" id="bizTypePills">
  <button class="btn btn-success btn-sm" onclick="setBizType('retail',this)"><i class="fas fa-shopping-bag"></i> Retail Shop</button>
  <button class="btn btn-outline btn-sm" onclick="setBizType('restaurant',this)"><i class="fas fa-utensils"></i> Restaurant / Cafe</button>
  <button class="btn btn-outline btn-sm" onclick="setBizType('salon',this)"><i class="fas fa-cut"></i> Salon / Spa</button>
  <button class="btn btn-outline btn-sm" onclick="setBizType('clinic',this)"><i class="fas fa-clinic-medical"></i> Clinic</button>
  <button class="btn btn-outline btn-sm" onclick="setBizType('coaching',this)"><i class="fas fa-chalkboard-teacher"></i> Coaching</button>
  <button class="btn btn-outline btn-sm" onclick="setBizType('ecom',this)"><i class="fas fa-cart-plus"></i> E-Commerce</button>
</div>

<!-- Stats -->
<div class="stats-grid" style="margin-bottom:24px">
  <div class="stat-card green">
    <div class="stat-label">Messages This Month</div>
    <div class="stat-value">8,421</div>
    <div class="stat-meta"><span class="stat-change up"><i class="fas fa-arrow-up"></i> 18%</span> vs last month</div>
    <i class="fas fa-paper-plane stat-icon" style="color:var(--wa-green)"></i>
  </div>
  <div class="stat-card purple">
    <div class="stat-label">Customers Reached</div>
    <div class="stat-value">1,240</div>
    <div class="stat-meta">Unique customers</div>
    <i class="fas fa-users stat-icon" style="color:var(--primary)"></i>
  </div>
  <div class="stat-card orange">
    <div class="stat-label">Orders from WA</div>
    <div class="stat-value">₹84,000</div>
    <div class="stat-meta">Revenue this month</div>
    <i class="fas fa-rupee-sign stat-icon" style="color:#fdcb6e"></i>
  </div>
  <div class="stat-card blue">
    <div class="stat-label">Bot Conversations</div>
    <div class="stat-value">3,120</div>
    <div class="stat-meta">Handled automatically</div>
    <i class="fas fa-robot stat-icon" style="color:var(--info)"></i>
  </div>
</div>

<!-- Main Grid -->
<div class="grid-2" style="margin-bottom:24px">

  <!-- Quick Send Panel -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fab fa-whatsapp" style="color:var(--wa-green)"></i> Quick Send</div>
      <span class="badge badge-success">1 click</span>
    </div>
    <div class="card-body">
      <!-- One-click templates -->
      <div style="margin-bottom:16px">
        <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">One-Click Send</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${[
            {label:'Today\'s Offer / Menu',icon:'tag',msg:'🎉 Today\'s Special! [OFFER] Limited time only. Reply YES to order!',color:'#e17055'},
            {label:'Appointment Reminder',icon:'calendar-check',msg:'📅 Reminder: Your appointment is tomorrow at [TIME]. Reply to confirm or reschedule.',color:'var(--info)'},
            {label:'Order Ready / Dispatch',icon:'box',msg:'📦 Your order #[ID] is ready! [Details] Thank you for choosing us!',color:'var(--wa-green)'},
            {label:'Festival Greetings',icon:'gift',msg:'🎊 Wishing you and your family a joyful [FESTIVAL]! Special discounts this week!',color:'var(--primary)'},
          ].map(t=>`
          <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;padding:10px 12px;cursor:pointer;transition:all 0.2s" onclick="quickSendTemplate(this,'${t.msg.replace(/'/g,'&#39;')}')" onmouseenter="this.style.borderColor='var(--wa-green)'" onmouseleave="this.style.borderColor='var(--border)'">
            <div style="width:32px;height:32px;border-radius:8px;background:${t.color}22;display:flex;align-items:center;justify-content:center;color:${t.color};flex-shrink:0"><i class="fas fa-${t.icon}"></i></div>
            <span style="flex:1;font-size:12px;font-weight:600;color:white">${t.label}</span>
            <button class="btn btn-xs btn-success" style="pointer-events:none"><i class="fas fa-paper-plane"></i> Send</button>
          </div>`).join('')}
        </div>
      </div>
      <!-- Custom message -->
      <div style="border-top:1px solid var(--border);padding-top:14px">
        <textarea id="smbMsgText" placeholder="Type a custom message..." style="width:100%;padding:10px 14px;background:var(--dark);border:1px solid var(--border);border-radius:10px;color:var(--text);font-size:12px;resize:vertical;min-height:60px;outline:none;margin-bottom:8px;font-family:'Inter',sans-serif"></textarea>
        <div style="display:flex;gap:8px">
          <select style="flex:1;padding:8px 12px;background:var(--dark);border:1px solid var(--border);border-radius:9px;color:var(--text);font-size:12px;outline:none">
            <option>All Customers (1,240)</option>
            <option>Regular Customers (480)</option>
            <option>New This Month (320)</option>
          </select>
          <button class="btn btn-success btn-sm" onclick="showToast('Campaign queued for 1,240 recipients!','success')"><i class="fas fa-paper-plane"></i> Send</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Business Bot -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-robot" style="color:var(--primary)"></i> Your Business Bot</div>
      <div style="display:flex;gap:6px">
        <span class="badge badge-success"><i class="fas fa-circle" style="font-size:7px"></i> Online</span>
        <a href="/chatbot-builder" class="btn btn-sm btn-outline">Edit</a>
      </div>
    </div>
    <div class="card-body">
      <!-- Bot Conversation Preview -->
      <div style="background:#0a1628;border-radius:12px;padding:14px;margin-bottom:14px;max-height:200px;overflow-y:auto">
        ${[
          {from:'customer',text:'Hello! Do you have today\'s menu?'},
          {from:'bot',text:'Hi! 👋 Welcome to Sunrise Restaurant!\n\n📋 Reply with:\n1️⃣ Today\'s Menu\n2️⃣ Book a Table\n3️⃣ Home Delivery\n4️⃣ Offers'},
          {from:'customer',text:'1'},
          {from:'bot',text:'🍽 Today\'s Special Menu:\n\n🥘 Dal Tadka + Rice – ₹120\n🍗 Chicken Biryani – ₹180\n🫔 Veg Thali – ₹90\n\nReply ORDER to place order!'},
        ].map(m=>`
        <div style="display:flex;${m.from==='bot'?'':'justify-content:flex-end'};margin-bottom:8px">
          <div style="background:${m.from==='bot'?'rgba(37,211,102,0.08)':'var(--card)'};border:1px solid ${m.from==='bot'?'rgba(37,211,102,0.2)':'var(--border)'};border-radius:${m.from==='bot'?'4px 12px 12px 12px':'12px 4px 12px 12px'};padding:8px 12px;max-width:80%;font-size:11px;color:var(--text);white-space:pre-line">
            ${m.text}
          </div>
        </div>`).join('')}
      </div>
      <!-- Bot Stats -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[['3,120','Chats Today'],['94%','Auto-Resolve'],['12s','Avg Response']].map(([v,l])=>`
        <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:16px;font-weight:800;color:white">${v}</div>
          <div style="font-size:10px;color:var(--text-muted)">${l}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- Customer Pipeline & Recent Leads -->
<div class="grid-2" style="margin-bottom:24px">

  <!-- Customer Pipeline -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-filter" style="color:#e17055"></i> Customer Pipeline</div>
      <a href="/leads" class="btn btn-sm btn-outline">Full CRM</a>
    </div>
    <div class="card-body">
      ${[
        {stage:'Enquired',count:48,icon:'question-circle',color:'var(--info)'},
        {stage:'Sent Catalogue',count:32,icon:'file-alt',color:'var(--primary)'},
        {stage:'Demo / Visit',count:18,icon:'eye',color:'var(--warning)'},
        {stage:'Order Placed',count:12,icon:'check-circle',color:'var(--wa-green)'},
        {stage:'Repeat Customer',count:8,icon:'redo',color:'#fdcb6e'},
      ].map(s=>`
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div style="width:28px;height:28px;border-radius:8px;background:${s.color}22;display:flex;align-items:center;justify-content:center;color:${s.color};font-size:12px;flex-shrink:0"><i class="fas fa-${s.icon}"></i></div>
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:12px;color:var(--text)">${s.stage}</span>
            <span style="font-size:12px;font-weight:700;color:${s.color}">${s.count}</span>
          </div>
          <div class="progress"><div class="progress-bar ${s.color.includes('green')?'green':s.color.includes('primary')?'purple':'orange'}" style="width:${(s.count/48)*100}%"></div></div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- Smart Poster & Links -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-image" style="color:var(--accent)"></i> Smart Posters & Links</div>
      <button class="btn btn-sm btn-primary" onclick="openModal('posterModal')"><i class="fas fa-plus"></i> Create</button>
    </div>
    <div class="card-body">
      <div style="margin-bottom:14px;font-size:12px;color:var(--text-muted)">Share clickable posters. Customers click → chat opens → you get their info automatically.</div>
      ${[
        {name:'Diwali Sale Poster',clicks:840,leads:142,active:true},
        {name:'New Menu Card',clicks:320,leads:67,active:true},
        {name:'Salon Packages',clicks:210,leads:38,active:false},
      ].map(p=>`
      <div style="background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:8px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <span style="font-size:12px;font-weight:600;color:white">${p.name}</span>
          <span class="badge ${p.active?'badge-success':'badge-warning'}" style="font-size:9px">${p.active?'Live':'Paused'}</span>
        </div>
        <div style="display:flex;gap:16px;font-size:11px;color:var(--text-muted)">
          <span><i class="fas fa-mouse-pointer" style="color:var(--primary)"></i> ${p.clicks} clicks</span>
          <span><i class="fas fa-user-plus" style="color:var(--wa-green)"></i> ${p.leads} leads</span>
          <button class="btn btn-xs btn-outline" style="margin-left:auto" onclick="copyText('https://wa.me/?text=...')"><i class="fas fa-share-alt"></i> Share</button>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- SMB Feature Cards -->
<div style="margin-bottom:24px">
  <div style="font-size:16px;font-weight:700;color:white;margin-bottom:16px">Everything Your Business Needs</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px">
    ${[
      {icon:'robot',title:'Auto-Reply Bot',desc:'Answer customer queries 24/7 without you being online',color:'var(--primary)',href:'/chatbot-builder'},
      {icon:'bullhorn',title:'Bulk Campaigns',desc:'Send offers & updates to all customers at once',color:'var(--wa-green)',href:'/campaigns'},
      {icon:'qrcode',title:'WA QR Code',desc:'Put QR on your shop door — customers scan & chat',color:'var(--accent)',href:'/integrations'},
      {icon:'shopping-cart',title:'Order Catalog',desc:'Send product catalogue via WhatsApp, take orders',color:'#e17055',href:'/templates'},
      {icon:'calendar-alt',title:'Appointment Bot',desc:'Let customers book slots automatically via bot',color:'#fdcb6e',href:'/chatbot-builder'},
      {icon:'star',title:'Review Bot',desc:'Auto-collect Google/WA reviews after each service',color:'var(--warning)',href:'/chatbot-builder'},
      {icon:'truck',title:'Delivery Updates',desc:'Send order & delivery status automatically',color:'var(--info)',href:'/campaigns'},
      {icon:'plug',title:'Website Widget',desc:'Add WhatsApp chat button on your website',color:'#a29bfe',href:'/integrations'},
    ].map(f=>`
    <a href="${f.href}" style="background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px;text-decoration:none;transition:all 0.2s;display:block" onmouseenter="this.style.borderColor='${f.color}';this.style.transform='translateY(-3px)'" onmouseleave="this.style.borderColor='var(--border)';this.style.transform=''">
      <div style="width:40px;height:40px;border-radius:10px;background:${f.color}18;display:flex;align-items:center;justify-content:center;font-size:18px;color:${f.color};margin-bottom:10px"><i class="fas fa-${f.icon}"></i></div>
      <div style="font-size:13px;font-weight:700;color:white;margin-bottom:4px">${f.title}</div>
      <div style="font-size:11px;color:var(--text-muted);line-height:1.5">${f.desc}</div>
    </a>`).join('')}
  </div>
</div>

<!-- Integration with Websites -->
<div class="card" style="margin-bottom:24px">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-code" style="color:var(--accent)"></i> Embed WhatsApp on Your Website</div>
    <button class="btn btn-sm btn-outline" onclick="copyText('<script src=\\'https://wapibiz.io/widget.js\\' data-id=\\'YOUR_ID\\'><\\/script>')" style="font-size:11px"><i class="fas fa-copy"></i> Copy Code</button>
  </div>
  <div class="card-body">
    <div style="display:grid;grid-template-columns:1fr auto;gap:20px;align-items:center">
      <div>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">Add this one line to your website — customers can start chatting on WhatsApp directly from your site. Leads are automatically captured in your dashboard.</p>
        <div style="background:var(--dark);border-radius:10px;padding:12px 14px;font-family:monospace;font-size:12px;color:var(--wa-green);border:1px solid var(--border);margin-bottom:12px">
          &lt;script src="https://wapibiz.io/widget.js" data-id="<span style="color:#fdcb6e">YOUR_BUSI_ID</span>"&gt;&lt;/script&gt;
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-sm btn-success" onclick="showToast('Widget code copied!','success')"><i class="fas fa-copy"></i> Copy Code</button>
          <a href="/integrations" class="btn btn-sm btn-outline"><i class="fas fa-plug"></i> All Integrations</a>
        </div>
      </div>
      <!-- Widget Preview -->
      <div style="position:relative;width:60px;height:60px;flex-shrink:0">
        <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--wa-green),var(--wa-teal));display:flex;align-items:center;justify-content:center;font-size:28px;color:white;box-shadow:0 4px 20px rgba(37,211,102,0.4);cursor:pointer;animation:pulse 2s infinite" onclick="showToast('Widget preview: customers click this button!','info')">
          <i class="fab fa-whatsapp"></i>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Quick Campaign Modal -->
<div class="modal-overlay" id="quickCampaignModal">
  <div class="modal">
    <div class="modal-header">
      <div class="modal-title"><i class="fas fa-bolt" style="color:#fdcb6e"></i> Quick Campaign</div>
      <button class="modal-close" onclick="closeModal('quickCampaignModal')"><i class="fas fa-times"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Campaign Type</label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:4px">
          ${[['tag','Promotional Offer'],['calendar','Event Invite'],['box','Order Update'],['star','Ask for Review']].map(([ic,lbl])=>`
          <div style="border:2px solid var(--border);border-radius:10px;padding:10px;text-align:center;cursor:pointer;font-size:12px;color:var(--text-muted);transition:all 0.2s" onclick="this.parentNode.querySelectorAll('div').forEach(d=>d.style.borderColor='var(--border)');this.style.borderColor='var(--wa-green)';this.style.color='var(--wa-green)'">
            <i class="fas fa-${ic}" style="display:block;font-size:18px;margin-bottom:4px"></i>${lbl}
          </div>`).join('')}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Send To</label>
        <select class="form-control">
          <option>All Customers (1,240)</option>
          <option>Regular Buyers (480)</option>
          <option>New This Month (320)</option>
          <option>Inactive (180)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Message</label>
        <textarea class="form-control" rows="4" placeholder="Type your promotional message...">🎉 Special offer just for you! Get 20% off on all orders today. Use code SAVE20. Limited time only! Reply YES to claim.</textarea>
      </div>
      <div style="background:rgba(37,211,102,0.07);border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:10px 14px;font-size:12px;color:var(--text-muted)">
        <i class="fas fa-coins" style="color:#fdcb6e"></i> Estimated cost: <strong style="color:var(--wa-green)">1,240 credits (₹124)</strong> • Balance: 42,500 credits
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline btn-sm" onclick="closeModal('quickCampaignModal')">Cancel</button>
      <button class="btn btn-success btn-sm" onclick="showToast('Campaign sent to 1,240 customers! ✓','success');closeModal('quickCampaignModal')"><i class="fas fa-paper-plane"></i> Send Now</button>
    </div>
  </div>
</div>

`, 'smb', 'Small Business Suite', 'WhatsApp Marketing for Shops, Restaurants & Local Businesses', `
@keyframes pulse {
  0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.4); }
  50% { box-shadow: 0 4px 30px rgba(37,211,102,0.7); }
}
`, `
function setBizType(type, btn) {
  document.querySelectorAll('#bizTypePills .btn').forEach(b => {
    b.classList.remove('btn-success');
    b.classList.add('btn-outline');
  });
  btn.classList.add('btn-success');
  btn.classList.remove('btn-outline');
  showToast('Switched to ' + type + ' mode — templates updated!', 'success');
}
function quickSendTemplate(el, msg) {
  document.getElementById('smbMsgText').value = msg;
  showToast('Template loaded — edit and send!', 'info');
}
`)
