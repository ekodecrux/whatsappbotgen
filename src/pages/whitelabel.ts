import { pageShell } from './layout'

export const whitelabelHTML = () => pageShell(`

<!-- White-label Header Banner -->
<div style="background:linear-gradient(135deg,#6C5CE7,#00CEC9);border-radius:16px;padding:24px 28px;margin-bottom:24px;position:relative;overflow:hidden">
  <div style="position:absolute;right:-20px;top:-20px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,0.07)"></div>
  <div style="position:absolute;right:60px;bottom:-40px;width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,0.05)"></div>
  <div style="position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
    <div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <div style="width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:22px;color:white"><i class="fas fa-building"></i></div>
        <div>
          <div style="font-size:20px;font-weight:800;color:white">White-label Admin Panel</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.75)">Give every organization their own branded WhatsApp suite</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <span style="background:rgba(255,255,255,0.2);color:white;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600"><i class="fas fa-school"></i> Schools & Colleges</span>
        <span style="background:rgba(255,255,255,0.2);color:white;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600"><i class="fas fa-building"></i> Corporates</span>
        <span style="background:rgba(255,255,255,0.2);color:white;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600"><i class="fas fa-store"></i> Small Business</span>
      </div>
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn" style="background:white;color:#6C5CE7;font-weight:700" onclick="openModal('newTenantModal')"><i class="fas fa-plus"></i> Add Organization</button>
      <button class="btn btn-outline" style="border-color:rgba(255,255,255,0.4);color:white" onclick="openModal('brandingModal')"><i class="fas fa-palette"></i> Branding</button>
    </div>
  </div>
</div>

<!-- Stats Row -->
<div class="stats-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr));margin-bottom:24px">
  <div class="stat-card green">
    <div class="stat-label">Active Tenants</div>
    <div class="stat-value">48</div>
    <div class="stat-meta"><span class="stat-change up"><i class="fas fa-arrow-up"></i> 6</span> this month</div>
    <i class="fas fa-sitemap stat-icon" style="color:var(--wa-green)"></i>
  </div>
  <div class="stat-card purple">
    <div class="stat-label">Messages Today</div>
    <div class="stat-value">84.2K</div>
    <div class="stat-meta">Across all orgs</div>
    <i class="fas fa-paper-plane stat-icon" style="color:var(--primary)"></i>
  </div>
  <div class="stat-card blue">
    <div class="stat-label">Total Revenue</div>
    <div class="stat-value">₹2.4L</div>
    <div class="stat-meta">This month</div>
    <i class="fas fa-rupee-sign stat-icon" style="color:var(--info)"></i>
  </div>
  <div class="stat-card orange">
    <div class="stat-label">Credits Issued</div>
    <div class="stat-value">2.4M</div>
    <div class="stat-meta">Total lifetime</div>
    <i class="fas fa-coins stat-icon" style="color:#e17055"></i>
  </div>
  <div class="stat-card teal">
    <div class="stat-label">White-label Brands</div>
    <div class="stat-value">12</div>
    <div class="stat-meta">Custom domains</div>
    <i class="fas fa-palette stat-icon" style="color:var(--accent)"></i>
  </div>
</div>

<!-- Main Grid -->
<div style="display:grid;grid-template-columns:1fr 360px;gap:20px;margin-bottom:24px">

  <!-- Tenant List -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-building" style="color:var(--primary)"></i> Organizations / Tenants</div>
      <div style="display:flex;gap:8px">
        <input type="text" class="form-control" placeholder="Search org..." style="width:180px;padding:6px 12px;font-size:12px">
        <select class="form-control" style="width:120px;padding:6px 10px;font-size:12px">
          <option>All Types</option>
          <option>Education</option>
          <option>Corporate</option>
          <option>SMB</option>
        </select>
      </div>
    </div>
    <div style="overflow-x:auto">
      <table class="data-table" id="tenantTable">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Type</th>
            <th>Plan</th>
            <th>Credits</th>
            <th>Messages</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="tenantBody">
          ${[
            ['Delhi Public School','DPS','Education','Enterprise','450,000','124,320','active','#e74c3c'],
            ['IIT Delhi Alumni Assoc','IITD','Education','Pro','120,000','48,920','active','#6C5CE7'],
            ['Infosys Ltd - HR Dept','INF','Corporate','Enterprise','800,000','324,100','active','#0984e3'],
            ['TCS Regional Office','TCS','Corporate','Pro','250,000','98,430','active','#00b894'],
            ['Green Valley Pharmacy','GVP','SMB','Starter','15,000','8,200','active','#f39c12'],
            ['Sunrise Hospital','SRH','Healthcare','Pro','180,000','72,400','active','#e17055'],
            ['Rajasthan University','RU','Education','Enterprise','600,000','198,000','active','#a29bfe'],
            ['Mehta & Sons Traders','MST','SMB','Starter','8,000','3,100','trial','#fdcb6e'],
          ].map(([name, code, type, plan, credits, msgs, status, color]) => `
          <tr>
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:36px;height:36px;border-radius:9px;background:${color}22;border:1px solid ${color}44;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:${color}">${code}</div>
                <div>
                  <div style="font-size:13px;font-weight:600;color:white">${name}</div>
                  <div style="font-size:10px;color:var(--text-muted)">tenant-${code.toLowerCase()}.wapi.app</div>
                </div>
              </div>
            </td>
            <td><span class="badge ${type==='Education'?'badge-info':type==='Corporate'?'badge-purple':type==='Healthcare'?'badge-danger':'badge-warning'}" style="font-size:10px">${type}</span></td>
            <td><span style="font-size:12px;color:var(--text-muted)">${plan}</span></td>
            <td><span style="font-size:12px;color:var(--wa-green);font-weight:700">${credits}</span></td>
            <td><span style="font-size:12px;color:var(--text-muted)">${msgs}</span></td>
            <td><span class="badge ${status==='active'?'badge-success':'badge-warning'}" style="font-size:10px">${status}</span></td>
            <td>
              <div style="display:flex;gap:4px">
                <button class="btn btn-xs btn-outline" onclick="openTenantPanel('${name}')"><i class="fas fa-cog"></i></button>
                <button class="btn btn-xs" style="background:rgba(37,211,102,0.15);color:var(--wa-green);border:none;border-radius:6px;padding:4px 9px;font-size:11px;cursor:pointer" onclick="addCredits('${name}')"><i class="fas fa-plus"></i> Credits</button>
                <button class="btn btn-xs btn-outline" onclick="viewTenantDash('${name}')"><i class="fas fa-eye"></i></button>
              </div>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Right Panel -->
  <div style="display:flex;flex-direction:column;gap:16px">

    <!-- Quick Credit Top-up -->
    <div class="card" style="background:linear-gradient(135deg,rgba(37,211,102,0.08),rgba(18,140,126,0.04));border-color:rgba(37,211,102,0.2)">
      <div class="card-header" style="border-color:rgba(37,211,102,0.15)">
        <div class="card-title"><i class="fas fa-coins" style="color:var(--wa-green)"></i> Issue Credits</div>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label class="form-label">Select Organization</label>
          <select class="form-control" id="creditOrg">
            <option>Delhi Public School</option>
            <option>Infosys Ltd - HR Dept</option>
            <option>TCS Regional Office</option>
            <option>Rajasthan University</option>
            <option>Sunrise Hospital</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Credit Pack</label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            ${[['10K','₹1,000'],['50K','₹4,500'],['1L','₹8,500'],['5L','₹37,500']].map(([c,p],i)=>`
            <div class="credit-pack ${i===1?'selected':''}" onclick="selectPack(this,'${c}')" style="border:2px solid ${i===1?'var(--wa-green)':'var(--border)'};border-radius:10px;padding:10px;cursor:pointer;text-align:center;transition:all 0.2s;background:${i===1?'rgba(37,211,102,0.1)':'transparent'}">
              <div style="font-size:14px;font-weight:800;color:${i===1?'var(--wa-green)':'white'}">${c}</div>
              <div style="font-size:11px;color:var(--text-muted)">${p}</div>
            </div>`).join('')}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Or Custom Amount</label>
          <input type="number" class="form-control" placeholder="Enter credits" id="customCredits">
        </div>
        <button class="btn btn-success w-full" style="justify-content:center" onclick="issueCredits()">
          <i class="fas fa-paper-plane"></i> Issue Credits Now
        </button>
      </div>
    </div>

    <!-- Plan Breakdown -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-layer-group" style="color:var(--primary)"></i> Plan Distribution</div>
      </div>
      <div class="card-body">
        ${[
          ['Enterprise','12 orgs','var(--primary)',75],
          ['Pro','22 orgs','var(--wa-green)',60],
          ['Starter','10 orgs','var(--warning)',35],
          ['Trial','4 orgs','var(--text-muted)',20],
        ].map(([plan,count,color,pct])=>`
        <div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:12px;font-weight:600;color:white">${plan}</span>
            <span style="font-size:12px;color:${color};font-weight:700">${count}</span>
          </div>
          <div class="progress"><div class="progress-bar" style="width:${pct}%;background:${color}"></div></div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-history" style="color:var(--accent)"></i> Recent Activity</div>
      </div>
      <div style="padding:8px 16px">
        ${[
          ['DPS recharged 5L credits','2m ago','coins','var(--wa-green)'],
          ['New tenant: Mehta & Sons','15m ago','plus-circle','var(--primary)'],
          ['Infosys sent 12K messages','1h ago','paper-plane','var(--info)'],
          ['RU bot flow updated','2h ago','project-diagram','var(--accent)'],
          ['TCS plan upgraded → Enterprise','3h ago','arrow-up','var(--warning)'],
        ].map(([msg,time,ic,col])=>`
        <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(45,63,90,0.4)">
          <div style="width:30px;height:30px;border-radius:8px;background:${col}22;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="fas fa-${ic}" style="color:${col};font-size:13px"></i>
          </div>
          <div style="flex:1">
            <div style="font-size:12px;color:white">${msg}</div>
            <div style="font-size:10px;color:var(--text-muted)">${time}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- White-label Branding & Features -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">

  <!-- Branding Panel -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-palette" style="color:#fd79a8"></i> White-label Branding Control</div>
      <button class="btn btn-sm btn-outline" onclick="openModal('brandingModal')"><i class="fas fa-edit"></i> Customize</button>
    </div>
    <div class="card-body">
      <div style="background:var(--dark);border-radius:12px;padding:16px;margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#e74c3c,#c0392b);display:flex;align-items:center;justify-content:center;font-size:18px;color:white"><i class="fas fa-school"></i></div>
          <div>
            <div style="font-size:14px;font-weight:700;color:white">DPS Connect</div>
            <div style="font-size:11px;color:var(--text-muted)">dps.wapi.app • Custom Domain</div>
          </div>
          <span class="badge badge-success" style="margin-left:auto">Live</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11px">
          ${[
            ['Primary Color','#e74c3c','🎨'],
            ['Logo','Custom Uploaded','🖼️'],
            ['Domain','dps.wapi.app','🌐'],
            ['App Name','DPS Connect','📱'],
            ['Support Email','help@dps.edu','📧'],
            ['SMS Sender ID','DPSCHL','📤'],
          ].map(([k,v,icon])=>`
          <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:8px">
            <div style="color:var(--text-muted);margin-bottom:2px">${icon} ${k}</div>
            <div style="color:white;font-weight:600">${v}</div>
          </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-sm btn-outline w-full" style="justify-content:center" onclick="showToast('Preview opened in new tab','info')"><i class="fas fa-eye"></i> Preview Brand</button>
        <button class="btn btn-sm btn-success w-full" style="justify-content:center" onclick="showToast('Changes published!','success')"><i class="fas fa-check"></i> Publish</button>
      </div>
    </div>
  </div>

  <!-- Feature Toggles per Tenant -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-toggle-on" style="color:var(--wa-green)"></i> Feature Access Control</div>
      <select class="form-control" style="width:160px;padding:6px 10px;font-size:12px">
        <option>Delhi Public School</option>
        <option>Infosys Ltd</option>
        <option>TCS Regional</option>
      </select>
    </div>
    <div class="card-body">
      <div style="display:flex;flex-direction:column;gap:10px" id="featureToggles">
        ${[
          ['Bulk Messaging','Send to 1000+ contacts at once',true,'paper-plane'],
          ['Bot Flow Builder','Visual chatbot creator',true,'project-diagram'],
          ['ERP Integration','Connect SAP/Oracle/Tally',true,'database'],
          ['Smart Posters','Clickable marketing posters',false,'image'],
          ['Lead CRM','Full pipeline management',true,'funnel-dollar'],
          ['Analytics Dashboard','Deep message analytics',true,'chart-line'],
          ['API Access','REST API for custom integrations',false,'code'],
          ['Multi-Agent Login','Multiple admin sub-users',true,'users'],
          ['WhatsApp Recharge','Self-serve credit top-up',true,'coins'],
          ['Custom Templates','Create own message templates',true,'file-alt'],
        ].map(([name,desc,on,ic])=>`
        <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(45,63,90,0.3)">
          <div style="width:32px;height:32px;border-radius:8px;background:rgba(108,92,231,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="fas fa-${ic}" style="color:var(--primary);font-size:13px"></i>
          </div>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:600;color:white">${name}</div>
            <div style="font-size:10px;color:var(--text-muted)">${desc}</div>
          </div>
          <div class="toggle-switch ${on?'on':''}" onclick="toggleFeature(this,'${name}')" style="width:40px;height:22px;border-radius:11px;background:${on?'var(--wa-green)':'var(--border)'};cursor:pointer;position:relative;transition:all 0.3s;flex-shrink:0">
            <div style="width:18px;height:18px;border-radius:50%;background:white;position:absolute;top:2px;${on?'right:2px':'left:2px'};transition:all 0.3s;box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- Per-org Usage & Billing -->
<div class="card" style="margin-bottom:24px">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-chart-bar" style="color:var(--accent)"></i> Organization Usage & Billing This Month</div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-sm btn-outline" onclick="showToast('Exporting billing report...','info')"><i class="fas fa-download"></i> Export</button>
      <button class="btn btn-sm btn-success" onclick="showToast('Invoices sent to all orgs!','success')"><i class="fas fa-envelope"></i> Send Invoices</button>
    </div>
  </div>
  <div style="overflow-x:auto">
    <table class="data-table">
      <thead>
        <tr>
          <th>Organization</th>
          <th>Messages Sent</th>
          <th>Credits Used</th>
          <th>Credits Remaining</th>
          <th>Cost</th>
          <th>Invoice</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['Delhi Public School','124,320','124,320','325,680','₹12,432','Generated','success'],
          ['Infosys Ltd - HR','324,100','324,100','475,900','₹32,410','Generated','success'],
          ['TCS Regional','98,430','98,430','151,570','₹9,843','Pending','warning'],
          ['Rajasthan University','198,000','198,000','402,000','₹19,800','Generated','success'],
          ['Sunrise Hospital','72,400','72,400','107,600','₹7,240','Generated','success'],
          ['Green Valley Pharmacy','8,200','8,200','6,800','₹820','Pending','warning'],
        ].map(([name,msgs,used,rem,cost,inv,invStatus])=>`
        <tr>
          <td style="font-size:13px;font-weight:600;color:white">${name}</td>
          <td style="font-size:13px;color:var(--text-muted)">${msgs}</td>
          <td>
            <span style="color:var(--danger);font-weight:600;font-size:13px">${used}</span>
          </td>
          <td>
            <span style="color:var(--wa-green);font-weight:600;font-size:13px">${rem}</span>
          </td>
          <td style="font-size:13px;font-weight:700;color:white">${cost}</td>
          <td><span class="badge badge-${invStatus}">${inv}</span></td>
          <td>
            <div style="display:flex;gap:4px">
              <button class="btn btn-xs btn-outline" onclick="showToast('Invoice downloaded','success')"><i class="fas fa-download"></i></button>
              <button class="btn btn-xs btn-outline" onclick="showToast('Reminder sent!','info')"><i class="fas fa-bell"></i></button>
            </div>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>

<!-- Modals -->
<div class="modal-overlay" id="newTenantModal">
  <div class="modal" style="max-width:600px">
    <div class="modal-header">
      <div class="modal-title"><i class="fas fa-plus-circle" style="color:var(--wa-green)"></i> Add New Organization</div>
      <button class="modal-close" onclick="closeModal('newTenantModal')"><i class="fas fa-times"></i></button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="form-group">
          <label class="form-label">Organization Name</label>
          <input type="text" class="form-control" placeholder="e.g. Delhi Public School">
        </div>
        <div class="form-group">
          <label class="form-label">Organization Type</label>
          <select class="form-control">
            <option>Education - School</option>
            <option>Education - College/University</option>
            <option>Corporate - Enterprise</option>
            <option>Corporate - SME</option>
            <option>Healthcare</option>
            <option>Retail / SMB</option>
            <option>Other</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Admin Name</label>
          <input type="text" class="form-control" placeholder="Primary admin name">
        </div>
        <div class="form-group">
          <label class="form-label">Admin Email</label>
          <input type="email" class="form-control" placeholder="admin@organization.com">
        </div>
        <div class="form-group">
          <label class="form-label">Admin Phone</label>
          <input type="text" class="form-control" placeholder="+91 98765 43210">
        </div>
        <div class="form-group">
          <label class="form-label">WhatsApp Number</label>
          <input type="text" class="form-control" placeholder="Business WhatsApp number">
        </div>
        <div class="form-group">
          <label class="form-label">Subscription Plan</label>
          <select class="form-control">
            <option>Trial (14 days free)</option>
            <option>Starter - ₹999/mo</option>
            <option>Pro - ₹2,999/mo</option>
            <option>Enterprise - ₹7,999/mo</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Initial Credits</label>
          <input type="number" class="form-control" placeholder="e.g. 10000" value="10000">
        </div>
        <div class="form-group" style="grid-column:span 2">
          <label class="form-label">Sub-domain / White-label URL</label>
          <div style="display:flex;gap:8px">
            <input type="text" class="form-control" placeholder="dps" style="flex:1">
            <div style="padding:10px 14px;background:var(--card2);border:1px solid var(--border);border-radius:10px;font-size:13px;color:var(--text-muted);white-space:nowrap">.wapi.app</div>
          </div>
        </div>
        <div class="form-group" style="grid-column:span 2">
          <label class="form-label">App / Brand Name (shown to org users)</label>
          <input type="text" class="form-control" placeholder="e.g. DPS Connect, InfoAlert, etc.">
        </div>
      </div>
      <div style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:14px;margin-top:8px">
        <div style="font-size:12px;color:var(--wa-green);font-weight:600;margin-bottom:4px"><i class="fas fa-info-circle"></i> What happens next</div>
        <div style="font-size:12px;color:var(--text-muted)">• Login credentials will be emailed to the admin<br>• WhatsApp onboarding guide sent automatically<br>• Sub-domain activated within 5 minutes<br>• Initial credits loaded immediately</div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('newTenantModal')">Cancel</button>
      <button class="btn btn-success" onclick="createTenant()"><i class="fas fa-rocket"></i> Create & Activate</button>
    </div>
  </div>
</div>

<div class="modal-overlay" id="brandingModal">
  <div class="modal" style="max-width:500px">
    <div class="modal-header">
      <div class="modal-title"><i class="fas fa-palette" style="color:#fd79a8"></i> White-label Branding</div>
      <button class="modal-close" onclick="closeModal('brandingModal')"><i class="fas fa-times"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">App / Brand Name</label>
        <input type="text" class="form-control" value="DPS Connect" placeholder="Your app name">
      </div>
      <div class="form-group">
        <label class="form-label">Primary Brand Color</label>
        <div style="display:flex;gap:10px;align-items:center">
          <input type="color" value="#e74c3c" style="width:50px;height:38px;border:1px solid var(--border);border-radius:8px;cursor:pointer;background:none">
          <input type="text" class="form-control" value="#e74c3c" placeholder="#hexcode">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Upload Logo</label>
        <div style="border:2px dashed var(--border);border-radius:10px;padding:20px;text-align:center;cursor:pointer" onclick="showToast('File picker opening...','info')">
          <i class="fas fa-cloud-upload-alt" style="font-size:24px;color:var(--text-muted);margin-bottom:8px;display:block"></i>
          <div style="font-size:12px;color:var(--text-muted)">Click to upload logo (PNG/SVG, max 2MB)</div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Custom Domain</label>
        <input type="text" class="form-control" value="dps.wapi.app" placeholder="custom.yourdomain.com">
      </div>
      <div class="form-group">
        <label class="form-label">Support Contact</label>
        <input type="text" class="form-control" placeholder="support@yourschool.edu">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('brandingModal')">Cancel</button>
      <button class="btn btn-primary" onclick="saveBranding()"><i class="fas fa-save"></i> Save & Apply</button>
    </div>
  </div>
</div>

`, 'whitelabel', 'White-label Admin', 'Manage all organizations, brands & credit allocation', `
.w-full { width: 100%; }
`, `
function openTenantPanel(name) {
  showToast('Opening panel for: ' + name, 'info');
}
function addCredits(name) {
  showToast('Credit top-up for: ' + name, 'success');
}
function viewTenantDash(name) {
  showToast('Loading dashboard for: ' + name, 'info');
}
function selectPack(el, credits) {
  document.querySelectorAll('.credit-pack').forEach(p => {
    p.style.borderColor = 'var(--border)';
    p.style.background = 'transparent';
    p.querySelector('div').style.color = 'white';
  });
  el.style.borderColor = 'var(--wa-green)';
  el.style.background = 'rgba(37,211,102,0.1)';
  el.querySelector('div').style.color = 'var(--wa-green)';
}
function issueCredits() {
  const org = document.getElementById('creditOrg').value;
  showToast('Credits issued to ' + org + '!', 'success');
}
function toggleFeature(el, name) {
  const isOn = el.classList.contains('on');
  el.classList.toggle('on');
  el.style.background = isOn ? 'var(--border)' : 'var(--wa-green)';
  const dot = el.querySelector('div');
  dot.style.left = isOn ? '2px' : '';
  dot.style.right = isOn ? '' : '2px';
  showToast(name + (isOn ? ' disabled' : ' enabled'), isOn ? 'error' : 'success');
}
function createTenant() {
  closeModal('newTenantModal');
  showToast('Organization created! Credentials sent.', 'success');
}
function saveBranding() {
  closeModal('brandingModal');
  showToast('Branding saved & applied!', 'success');
}
`)
