import { pageShell } from './layout'

export const dashboardHTML = () => pageShell(`
<!-- Stats Grid -->
<div class="stats-grid">
  <div class="stat-card green">
    <div class="stat-label">Messages Sent</div>
    <div class="stat-value" id="statMsg">—</div>
    <div class="stat-meta"><span class="stat-change up"><i class="fas fa-arrow-up"></i> 12.4%</span> vs last week</div>
    <i class="fas fa-paper-plane stat-icon" style="color:var(--wa-green)"></i>
  </div>
  <div class="stat-card purple">
    <div class="stat-label">Active Campaigns</div>
    <div class="stat-value" id="statCamp">—</div>
    <div class="stat-meta">7 running now</div>
    <i class="fas fa-bullhorn stat-icon" style="color:var(--primary)"></i>
  </div>
  <div class="stat-card orange">
    <div class="stat-label">Leads Generated</div>
    <div class="stat-value" id="statLeads">—</div>
    <div class="stat-meta"><span class="stat-change up"><i class="fas fa-arrow-up"></i> 23</span> today</div>
    <i class="fas fa-user-plus stat-icon" style="color:#e17055"></i>
  </div>
  <div class="stat-card blue">
    <div class="stat-label">Total Contacts</div>
    <div class="stat-value" id="statContacts">—</div>
    <div class="stat-meta">Across all lists</div>
    <i class="fas fa-users stat-icon" style="color:var(--info)"></i>
  </div>
  <div class="stat-card teal">
    <div class="stat-label">Delivery Rate</div>
    <div class="stat-value" id="statDel">—</div>
    <div class="stat-meta">Excellent quality</div>
    <i class="fas fa-check-double stat-icon" style="color:var(--wa-green)"></i>
  </div>
  <div class="stat-card red">
    <div class="stat-label">Wallet Balance</div>
    <div class="stat-value" id="statWallet">—</div>
    <div class="stat-meta"><a href="/wallet" style="color:var(--wa-green);font-size:11px">Top Up →</a></div>
    <i class="fas fa-coins stat-icon" style="color:#fdcb6e"></i>
  </div>
</div>

<!-- Quick Actions -->
<div class="card mb-6" style="margin-bottom:24px">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-bolt" style="color:#fdcb6e"></i> Quick Actions</div>
  </div>
  <div class="card-body" style="padding:16px 20px">
    <div style="display:flex;flex-wrap:wrap;gap:10px">
      <a href="/campaigns" class="btn btn-success"><i class="fas fa-bullhorn"></i> New Campaign</a>
      <a href="/chatbot-builder" class="btn btn-primary"><i class="fas fa-project-diagram"></i> Build Bot Flow</a>
      <a href="/contacts" class="btn btn-outline"><i class="fas fa-upload"></i> Import Contacts</a>
      <a href="/campaigns#posters" class="btn btn-outline"><i class="fas fa-image"></i> Create Poster</a>
      <a href="/templates" class="btn btn-outline"><i class="fas fa-file-alt"></i> New Template</a>
      <a href="/wallet" class="btn btn-outline" style="border-color:var(--wa-green);color:var(--wa-green)"><i class="fas fa-wallet"></i> Recharge</a>
    </div>
  </div>
</div>

<!-- Main Grid -->
<div class="grid-2" style="margin-bottom:24px">

  <!-- Recent Campaigns -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-bullhorn" style="color:var(--primary)"></i> Active Campaigns</div>
      <a href="/campaigns" class="btn btn-sm btn-outline">View All</a>
    </div>
    <div style="padding:0">
      <table class="data-table" id="campaignTable">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Status</th>
            <th>Delivery</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="campaignBody">
          <tr><td colspan="4" style="text-align:center;padding:30px;color:var(--text-muted)">Loading...</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Message Analytics -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-chart-bar" style="color:var(--accent)"></i> Message Analytics</div>
      <span class="badge badge-success"><i class="fas fa-circle" style="font-size:8px"></i> Live</span>
    </div>
    <div class="card-body">
      <div style="margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:12px;color:var(--text-muted)">Delivery Rate</span>
          <span style="font-size:12px;color:var(--wa-green);font-weight:700">98.4%</span>
        </div>
        <div class="progress"><div class="progress-bar green" style="width:98.4%"></div></div>
      </div>
      <div style="margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:12px;color:var(--text-muted)">Open Rate</span>
          <span style="font-size:12px;color:var(--primary);font-weight:700">73.2%</span>
        </div>
        <div class="progress"><div class="progress-bar purple" style="width:73.2%"></div></div>
      </div>
      <div style="margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:12px;color:var(--text-muted)">Reply Rate</span>
          <span style="font-size:12px;color:#e17055;font-weight:700">41.8%</span>
        </div>
        <div class="progress"><div class="progress-bar orange" style="width:41.8%"></div></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:20px">
        ${[
          ['Sent','284,912','var(--wa-green)','paper-plane'],
          ['Delivered','280,434','var(--accent)','check'],
          ['Opened','208,416','var(--primary)','eye'],
          ['Replied','119,132','#fdcb6e','reply'],
        ].map(([l,v,c,ic])=>`
        <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px;text-align:center">
          <i class="fas fa-${ic}" style="color:${c};font-size:16px;margin-bottom:6px;display:block"></i>
          <div style="font-size:16px;font-weight:800;color:white">${v}</div>
          <div style="font-size:11px;color:var(--text-muted)">${l}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- Bottom Grid -->
<div class="grid-2">

  <!-- Recent Leads -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-fire" style="color:#e17055"></i> Hot Leads</div>
      <a href="/leads" class="btn btn-sm btn-outline">Full CRM</a>
    </div>
    <div style="padding:0">
      <table class="data-table" id="leadsTable">
        <thead>
          <tr><th>Contact</th><th>Source</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody id="leadsBody">
          <tr><td colspan="4" style="text-align:center;padding:30px;color:var(--text-muted)">Loading...</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Bot Status & Wallet -->
  <div style="display:flex;flex-direction:column;gap:20px">
    <!-- Active Bots -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-robot" style="color:var(--primary)"></i> Active Bots</div>
        <a href="/chatbot-builder" class="btn btn-sm btn-outline">Builder</a>
      </div>
      <div class="card-body" style="padding:16px 20px">
        ${[
          ['Welcome Bot','Online','8,421 chats','var(--wa-green)'],
          ['Product Enquiry','Online','2,130 chats','var(--wa-green)'],
          ['Support Bot','Paused','—','var(--warning)'],
          ['Lead Capture','Online','4,892 chats','var(--wa-green)'],
        ].map(([n,s,c,col])=>`
        <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(45,63,90,0.4)">
          <div style="width:8px;height:8px;border-radius:50%;background:${col};box-shadow:0 0 6px ${col}"></div>
          <span style="flex:1;font-size:13px;color:white">${n}</span>
          <span style="font-size:11px;color:var(--text-muted)">${c}</span>
          <span class="badge ${s==='Online'?'badge-success':'badge-warning'}" style="font-size:10px">${s}</span>
        </div>`).join('')}
      </div>
    </div>

    <!-- Wallet Summary -->
    <div class="card" style="background:linear-gradient(135deg,rgba(37,211,102,0.1),rgba(18,140,126,0.05));border-color:rgba(37,211,102,0.2)">
      <div class="card-body" style="padding:20px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--wa-green),var(--wa-teal));display:flex;align-items:center;justify-content:center;font-size:20px;color:white">
            <i class="fas fa-wallet"></i>
          </div>
          <div>
            <div style="font-size:12px;color:var(--text-muted)">Credit Balance</div>
            <div style="font-size:24px;font-weight:800;color:white">42,500</div>
          </div>
        </div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:12px">≈ ₹4,250 value • ~42,500 messages</div>
        <div class="progress" style="margin-bottom:16px"><div class="progress-bar green" style="width:42%"></div></div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:16px">42% of monthly allocation used</div>
        <a href="/wallet" class="btn btn-success w-full" style="justify-content:center"><i class="fas fa-plus"></i> Recharge Credits</a>
      </div>
    </div>
  </div>
</div>

<!-- WhatsApp Number Status -->
<div class="card mt-6" style="margin-top:24px">
  <div class="card-header">
    <div class="card-title"><i class="fab fa-whatsapp" style="color:var(--wa-green)"></i> Connected WhatsApp Numbers</div>
    <button class="btn btn-sm btn-outline" onclick="showToast('Connect number via Integrations page','info')"><i class="fas fa-plus"></i> Add Number</button>
  </div>
  <div class="card-body" style="padding:16px 20px">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px">
      ${[
        ['+91 98765 43210','Business Name','Verified','High','12.4K/day'],
        ['+91 87654 32109','Store Account','Verified','Medium','5.2K/day'],
      ].map(([num,biz,ver,qual,vol])=>`
      <div style="background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:12px;padding:14px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--wa-green),var(--wa-teal));display:flex;align-items:center;justify-content:center;font-size:16px;color:white;flex-shrink:0"><i class="fab fa-whatsapp"></i></div>
          <div>
            <div style="font-size:13px;font-weight:700;color:white">${num}</div>
            <div style="font-size:11px;color:var(--text-muted)">${biz}</div>
          </div>
          <span class="badge badge-success" style="margin-left:auto">${ver}</span>
        </div>
        <div style="display:flex;gap:12px;font-size:11px;color:var(--text-muted)">
          <span><i class="fas fa-tachometer-alt" style="color:${qual==='High'?'var(--success)':'var(--warning)'}"></i> ${qual} Quality</span>
          <span><i class="fas fa-paper-plane" style="color:var(--primary)"></i> ${vol}</span>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

`, 'dashboard', 'Dashboard', 'Your WhatsApp Business Command Center', '', `
fetch('/api/stats').then(r=>r.json()).then(d=>{
  document.getElementById('statMsg').textContent = formatNum(d.messagesSent);
  document.getElementById('statCamp').textContent = d.campaignsActive;
  document.getElementById('statLeads').textContent = formatNum(d.leadsGenerated);
  document.getElementById('statContacts').textContent = formatNum(d.totalContacts);
  document.getElementById('statDel').textContent = d.deliveryRate + '%';
  document.getElementById('statWallet').textContent = '₹' + formatNum(d.walletBalance);
});
fetch('/api/campaigns').then(r=>r.json()).then(data=>{
  const colors = {active:'badge-success',scheduled:'badge-info',completed:'badge-wa',paused:'badge-warning'};
  document.getElementById('campaignBody').innerHTML = data.slice(0,4).map(c=>\`
    <tr>
      <td style="font-size:13px;font-weight:600;color:white">\${c.name}</td>
      <td><span class="badge \${colors[c.status]}">\${c.status}</span></td>
      <td>
        <div style="font-size:11px;color:var(--text-muted)">\${c.delivered.toLocaleString()} / \${c.sent.toLocaleString()}</div>
        \${c.sent>0?'<div class="progress" style="margin-top:4px;width:80px"><div class="progress-bar green" style="width:'+Math.round(c.delivered/c.sent*100)+'%"></div></div>':''}
      </td>
      <td><a href="/campaigns" class="btn btn-xs btn-outline">View</a></td>
    </tr>\`).join('');
});
fetch('/api/leads').then(r=>r.json()).then(data=>{
  const sc = {hot:'badge-danger',warm:'badge-warning',cold:'badge-info'};
  document.getElementById('leadsBody').innerHTML = data.slice(0,4).map(l=>\`
    <tr>
      <td>
        <div style="font-size:13px;font-weight:600;color:white">\${l.name}</div>
        <div style="font-size:11px;color:var(--text-muted)">\${l.phone}</div>
      </td>
      <td style="font-size:11px;color:var(--text-muted)">\${l.source}</td>
      <td><span class="badge \${sc[l.status]}">\${l.status}</span></td>
      <td><button class="btn btn-xs btn-success" onclick="showToast('Opening chat...','info')"><i class="fab fa-whatsapp"></i></button></td>
    </tr>\`).join('');
});
`)
