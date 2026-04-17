import { pageShell } from './layout'

export const campaignsHTML = () => pageShell(`
<!-- Tabs -->
<div class="tabs">
  <button class="tab-btn active" data-tab-btn="main" onclick="switchTab('tabCampaigns','main')">
    <i class="fas fa-bullhorn"></i> Campaigns
  </button>
  <button class="tab-btn" data-tab-btn="main" onclick="switchTab('tabPosters','main')">
    <i class="fas fa-image"></i> Smart Posters
  </button>
  <button class="tab-btn" data-tab-btn="main" onclick="switchTab('tabSchedule','main')">
    <i class="fas fa-calendar-alt"></i> Scheduler
  </button>
</div>

<!-- Campaigns Tab -->
<div id="tabCampaigns" class="tab-panel active" data-tab-group="main">
  <div class="flex-between mb-6">
    <div>
      <h2 style="font-size:16px;font-weight:700;color:white">Bulk Campaigns</h2>
      <p style="font-size:12px;color:var(--text-muted)">Send personalized messages to thousands at once</p>
    </div>
    <button class="btn btn-success" onclick="openModal('newCampaignModal')">
      <i class="fas fa-plus"></i> New Campaign
    </button>
  </div>

  <!-- Campaign Stats -->
  <div class="stats-grid" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr));margin-bottom:24px">
    <div class="stat-card green">
      <div class="stat-label">Total Sent</div>
      <div class="stat-value" style="font-size:22px">284.9K</div>
      <div class="stat-meta">All time</div>
      <i class="fas fa-paper-plane stat-icon"></i>
    </div>
    <div class="stat-card blue">
      <div class="stat-label">Delivery Rate</div>
      <div class="stat-value" style="font-size:22px">98.4%</div>
      <div class="stat-meta">Excellent</div>
      <i class="fas fa-check-double stat-icon"></i>
    </div>
    <div class="stat-card purple">
      <div class="stat-label">Open Rate</div>
      <div class="stat-value" style="font-size:22px">73.2%</div>
      <div class="stat-meta">Industry avg: 22%</div>
      <i class="fas fa-eye stat-icon"></i>
    </div>
    <div class="stat-card orange">
      <div class="stat-label">Reply Rate</div>
      <div class="stat-value" style="font-size:22px">41.8%</div>
      <div class="stat-meta">Very high</div>
      <i class="fas fa-reply stat-icon"></i>
    </div>
  </div>

  <!-- Campaign Table -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-list" style="color:var(--primary)"></i> All Campaigns</div>
      <div style="display:flex;gap:8px">
        <select class="form-control" style="width:140px;padding:6px 10px;font-size:12px">
          <option>All Status</option>
          <option>Active</option>
          <option>Scheduled</option>
          <option>Completed</option>
          <option>Paused</option>
        </select>
        <button class="btn btn-sm btn-outline"><i class="fas fa-download"></i> Export</button>
      </div>
    </div>
    <div>
      <table class="data-table" id="campaignTable">
        <thead>
          <tr>
            <th><input type="checkbox" style="accent-color:var(--primary)"></th>
            <th>Campaign Name</th>
            <th>Status</th>
            <th>Sent</th>
            <th>Delivered</th>
            <th>Opened</th>
            <th>Replied</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="campBody">
          <tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text-muted)"><i class="fas fa-spinner fa-spin" style="margin-right:8px"></i>Loading...</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Smart Posters Tab -->
<div id="tabPosters" class="tab-panel" data-tab-group="main">
  <div class="flex-between mb-6">
    <div>
      <h2 style="font-size:16px;font-weight:700;color:white">Smart WhatsApp Posters</h2>
      <p style="font-size:12px;color:var(--text-muted)">Clickable marketing posters that capture leads directly into your CRM</p>
    </div>
    <button class="btn btn-primary" onclick="openModal('newPosterModal')">
      <i class="fas fa-plus"></i> Create Poster
    </button>
  </div>

  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px">
    ${[
      {name:'Diwali Mega Sale 2024', clicks:'8,421', leads:'342', conv:'4.1%', color:'#e17055', img:'🎆'},
      {name:'New Collection Launch', clicks:'3,210', leads:'189', conv:'5.9%', color:'#6C5CE7', img:'👗'},
      {name:'Flat 50% Off Weekend', clicks:'5,840', leads:'421', conv:'7.2%', color:'#00b894', img:'🏷️'},
      {name:'Free Demo Registration', clicks:'2,190', leads:'890', conv:'40.6%', color:'#0984e3', img:'🎯'},
    ].map(p=>`
    <div class="card" style="overflow:visible">
      <div style="height:160px;background:linear-gradient(135deg,${p.color}22,${p.color}44);border-radius:14px 14px 0 0;display:flex;flex-direction:column;align-items:center;justify-content:center;border-bottom:1px solid var(--border)">
        <div style="font-size:48px;margin-bottom:8px">${p.img}</div>
        <div style="font-size:11px;color:var(--text-muted);background:rgba(0,0,0,0.3);padding:3px 10px;border-radius:20px">WhatsApp Poster</div>
      </div>
      <div class="card-body" style="padding:16px">
        <div style="font-size:13px;font-weight:700;color:white;margin-bottom:12px">${p.name}</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">
          <div style="text-align:center">
            <div style="font-size:16px;font-weight:800;color:white">${p.clicks}</div>
            <div style="font-size:10px;color:var(--text-muted)">Clicks</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:16px;font-weight:800;color:${p.color}">${p.leads}</div>
            <div style="font-size:10px;color:var(--text-muted)">Leads</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:16px;font-weight:800;color:var(--wa-green)">${p.conv}</div>
            <div style="font-size:10px;color:var(--text-muted)">Conv.</div>
          </div>
        </div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-sm btn-outline" style="flex:1;justify-content:center" onclick="showToast('Poster link copied!','success')"><i class="fas fa-share"></i> Share</button>
          <button class="btn btn-sm btn-outline" style="flex:1;justify-content:center" onclick="showToast('Opening editor...','info')"><i class="fas fa-edit"></i> Edit</button>
          <button class="btn btn-sm btn-outline" onclick="showToast('QR generated!','success')"><i class="fas fa-qrcode"></i></button>
        </div>
      </div>
    </div>`).join('')}

    <!-- Add New Card -->
    <div class="card" style="border:2px dashed var(--border);background:transparent;cursor:pointer;min-height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px" onclick="openModal('newPosterModal')">
      <div style="width:52px;height:52px;border-radius:50%;background:rgba(108,92,231,0.15);border:2px dashed var(--primary);display:flex;align-items:center;justify-content:center;font-size:22px;color:var(--primary)">
        <i class="fas fa-plus"></i>
      </div>
      <div style="font-size:13px;font-weight:600;color:var(--text-muted)">Create New Poster</div>
      <div style="font-size:11px;color:var(--text-muted);text-align:center;max-width:180px">Design a clickable WhatsApp marketing poster in minutes</div>
    </div>
  </div>
</div>

<!-- Scheduler Tab -->
<div id="tabSchedule" class="tab-panel" data-tab-group="main">
  <div class="flex-between mb-6">
    <h2 style="font-size:16px;font-weight:700;color:white">Campaign Scheduler</h2>
    <button class="btn btn-success" onclick="openModal('newCampaignModal')"><i class="fas fa-calendar-plus"></i> Schedule Campaign</button>
  </div>
  <div class="card">
    <div class="card-body">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;margin-bottom:8px">
        ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>`<div style="text-align:center;font-size:11px;font-weight:700;color:var(--text-muted);padding:8px">${d}</div>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">
        ${Array.from({length:35},(_, i)=>{
          const day = i - 2;
          const has = [3,7,14,21,28].includes(day);
          const today = day === 17;
          return `<div style="min-height:72px;background:${today?'rgba(108,92,231,0.2)':'rgba(255,255,255,0.03)'};border:1px solid ${today?'var(--primary)':'var(--border)'};border-radius:8px;padding:6px;cursor:pointer;transition:all 0.2s" onclick="showToast('Click to schedule a campaign on this day','info')">
            ${day>0&&day<=31?`<div style="font-size:12px;font-weight:${today?'800':'600'};color:${today?'var(--primary)':'var(--text-muted)'};margin-bottom:4px">${day}</div>`:''}
            ${has&&day>0?`<div style="background:var(--wa-green);border-radius:4px;padding:2px 5px;font-size:9px;color:white;font-weight:700;margin-bottom:2px">Campaign</div>`:''}
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>
</div>

<!-- New Campaign Modal -->
<div id="newCampaignModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-bullhorn" style="color:var(--wa-green);margin-right:8px"></i>Create New Campaign</span>
      <button class="modal-close" onclick="closeModal('newCampaignModal')">×</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Campaign Name</label>
        <input type="text" class="form-control" placeholder="e.g., Diwali Sale 2024">
      </div>
      <div class="form-group">
        <label class="form-label">Target Audience</label>
        <select class="form-control">
          <option>All Contacts (12,847)</option>
          <option>Hot Leads (342)</option>
          <option>Customers - Last 30 days (2,100)</option>
          <option>Inactive 90 days (3,400)</option>
          <option>Custom Segment</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">WhatsApp Template</label>
        <select class="form-control">
          <option>Flash Sale Offer</option>
          <option>Welcome Message</option>
          <option>Order Confirmation</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Schedule</label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <input type="date" class="form-control">
          <input type="time" class="form-control" value="10:00">
        </div>
      </div>
      <div style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:12px;font-size:12px;color:#94a3b8;display:flex;gap:8px;align-items:flex-start">
        <i class="fas fa-info-circle" style="color:var(--wa-green);margin-top:2px"></i>
        Estimated cost: <strong style="color:var(--wa-green)">~1,285 credits</strong> for 12,847 contacts
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('newCampaignModal')">Cancel</button>
      <button class="btn btn-success" onclick="closeModal('newCampaignModal');showToast('Campaign created and queued!','success')">
        <i class="fas fa-rocket"></i> Launch Campaign
      </button>
    </div>
  </div>
</div>

<!-- New Poster Modal -->
<div id="newPosterModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-image" style="color:var(--primary);margin-right:8px"></i>Create Smart Poster</span>
      <button class="modal-close" onclick="closeModal('newPosterModal')">×</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Poster Name</label>
        <input type="text" class="form-control" placeholder="e.g., Diwali Mega Sale">
      </div>
      <div class="form-group">
        <label class="form-label">WhatsApp Number for Leads</label>
        <select class="form-control">
          <option>+91 98765 43210 (Business)</option>
          <option>+91 87654 32109 (Store)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Pre-filled WhatsApp Message</label>
        <input type="text" class="form-control" placeholder="Hi! I saw your Diwali offer, interested to know more">
      </div>
      <div class="form-group">
        <label class="form-label">Lead Capture Fields</label>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          ${['Name','Phone','Email','City','Budget','Product Interest'].map(f=>`
          <label style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--text-muted);cursor:pointer">
            <input type="checkbox" style="accent-color:var(--primary)" ${['Name','Phone'].includes(f)?'checked':''}>
            ${f}
          </label>`).join('')}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">UTM Source Tag</label>
        <input type="text" class="form-control" placeholder="instagram_diwali_oct24">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('newPosterModal')">Cancel</button>
      <button class="btn btn-primary" onclick="closeModal('newPosterModal');showToast('Poster created! Share link copied.','success')">
        <i class="fas fa-link"></i> Generate Poster Link
      </button>
    </div>
  </div>
</div>

`, 'campaigns', 'Campaigns & Posters', 'Bulk messaging, smart posters, and scheduled campaigns', '', `
fetch('/api/campaigns').then(r=>r.json()).then(data=>{
  const sc = {active:'badge-success',scheduled:'badge-info',completed:'badge-wa',paused:'badge-warning'};
  document.getElementById('campBody').innerHTML = data.map(c=>\`
    <tr>
      <td><input type="checkbox" style="accent-color:var(--primary)"></td>
      <td>
        <div style="font-size:13px;font-weight:700;color:white">\${c.name}</div>
        <div style="font-size:11px;color:var(--text-muted)">\${c.created}</div>
      </td>
      <td><span class="badge \${sc[c.status]}">\${c.status}</span></td>
      <td style="font-size:13px;color:white">\${c.sent.toLocaleString()}</td>
      <td>
        <div style="font-size:13px;color:var(--wa-green)">\${c.delivered.toLocaleString()}</div>
        \${c.sent>0?'<div style="font-size:10px;color:var(--text-muted)">'+Math.round(c.delivered/(c.sent||1)*100)+'%</div>':''}
      </td>
      <td>
        <div style="font-size:13px;color:var(--primary)">\${c.opened.toLocaleString()}</div>
        \${c.sent>0?'<div style="font-size:10px;color:var(--text-muted)">'+Math.round(c.opened/(c.sent||1)*100)+'%</div>':''}
      </td>
      <td>
        <div style="font-size:13px;color:var(--accent)">\${c.replies.toLocaleString()}</div>
        \${c.sent>0?'<div style="font-size:10px;color:var(--text-muted)">'+Math.round(c.replies/(c.sent||1)*100)+'%</div>':''}
      </td>
      <td style="font-size:12px;color:var(--text-muted)">\${c.created}</td>
      <td>
        <div style="display:flex;gap:5px">
          <button class="btn btn-xs btn-outline" onclick="showToast('Opening campaign...','info')"><i class="fas fa-eye"></i></button>
          \${c.status==='active'?'<button class="btn btn-xs btn-outline" onclick="showToast(\'Campaign paused\',\'info\')"><i class="fas fa-pause"></i></button>':''}
          \${c.status==='paused'?'<button class="btn btn-xs btn-success" onclick="showToast(\'Campaign resumed\',\'success\')"><i class="fas fa-play"></i></button>':''}
          <button class="btn btn-xs" style="background:rgba(231,76,60,0.15);color:#e74c3c;border:1px solid rgba(231,76,60,0.2)" onclick="showToast(\'Campaign deleted\',\'error\')"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>\`).join('');
});
`)
