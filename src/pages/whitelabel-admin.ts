import { pageShell } from './layout'

export const whitelabelAdminHTML = () => pageShell(`

<!-- White-label Header Banner -->
<div style="background:linear-gradient(135deg,#0d1f3c 0%,#1a0a3c 50%,#0a2040 100%);border:1px solid rgba(108,92,231,0.3);border-radius:20px;padding:28px 32px;margin-bottom:24px;position:relative;overflow:hidden">
  <div style="position:absolute;right:-40px;top:-40px;width:200px;height:200px;background:radial-gradient(circle,rgba(108,92,231,0.2),transparent);border-radius:50%"></div>
  <div style="position:absolute;right:32px;top:20px;display:flex;gap:12px">
    <button class="btn btn-outline btn-sm" onclick="openModal('brandModal')"><i class="fas fa-palette"></i> Customize Brand</button>
    <button class="btn btn-primary btn-sm" onclick="openModal('inviteOrgModal')"><i class="fas fa-plus"></i> Add Organization</button>
  </div>
  <div style="display:flex;align-items:center;gap:16px;margin-bottom:8px">
    <div style="width:54px;height:54px;border-radius:14px;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:24px;color:white;font-weight:900">W</div>
    <div>
      <div style="font-size:22px;font-weight:900;color:white">WapiSend <span style="color:var(--accent)">White-Label</span> Console</div>
      <div style="font-size:13px;color:var(--text-muted);margin-top:2px">Manage all your subscriber organizations — schools, corporates, SMBs — from one master panel</div>
    </div>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:20px;margin-top:16px">
    ${[
      ['fas fa-building','14','Organizations Active','var(--accent)'],
      ['fas fa-users','8,420','Total Users Across Orgs','var(--wa-green)'],
      ['fas fa-paper-plane','2.4M','Messages This Month','var(--primary)'],
      ['fas fa-rupee-sign','1,84,000','Revenue This Month','#fdcb6e'],
    ].map(([ic,val,lbl,col])=>`
    <div style="background:rgba(255,255,255,0.06);border-radius:12px;padding:14px 20px;min-width:160px">
      <div style="font-size:11px;color:${col};text-transform:uppercase;letter-spacing:1px;margin-bottom:4px"><i class="${ic}"></i> ${lbl}</div>
      <div style="font-size:22px;font-weight:800;color:white">${val}</div>
    </div>`).join('')}
  </div>
</div>

<!-- Tabs -->
<div class="tabs" style="margin-bottom:20px">
  <button class="tab-btn active" data-tab-btn="wl" onclick="switchTab('tabOrgs','wl')"><i class="fas fa-building"></i> Organizations</button>
  <button class="tab-btn" data-tab-btn="wl" onclick="switchTab('tabPlans','wl')"><i class="fas fa-crown"></i> Plans & Billing</button>
  <button class="tab-btn" data-tab-btn="wl" onclick="switchTab('tabBranding','wl')"><i class="fas fa-palette"></i> Branding</button>
  <button class="tab-btn" data-tab-btn="wl" onclick="switchTab('tabApiKeys','wl')"><i class="fas fa-key"></i> API Keys</button>
  <button class="tab-btn" data-tab-btn="wl" onclick="switchTab('tabReseller','wl')"><i class="fas fa-handshake"></i> Reseller</button>
</div>

<!-- TAB: Organizations -->
<div id="tabOrgs" class="tab-panel active" data-tab-group="wl">

  <!-- Org Type Filters -->
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px">
    <button class="btn btn-success btn-sm active-filter" onclick="filterOrgs('all',this)"><i class="fas fa-th"></i> All (14)</button>
    <button class="btn btn-outline btn-sm" onclick="filterOrgs('education',this)"><i class="fas fa-graduation-cap"></i> Education (6)</button>
    <button class="btn btn-outline btn-sm" onclick="filterOrgs('corporate',this)"><i class="fas fa-briefcase"></i> Corporate (5)</button>
    <button class="btn btn-outline btn-sm" onclick="filterOrgs('smb',this)"><i class="fas fa-store"></i> Small Business (3)</button>
    <button class="btn btn-outline btn-sm" style="margin-left:auto" onclick="openModal('inviteOrgModal')"><i class="fas fa-plus"></i> Add New Org</button>
  </div>

  <!-- Org Cards Grid -->
  <div id="orgGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:18px">

    ${[
      {name:'St. Mary\'s Higher Secondary School', short:'SMHSS', type:'education', plan:'Pro', users:320, msgs:'45K/mo', credits:180000, balance:'₹4,200', status:'active', color:'var(--info)', icon:'graduation-cap', admin:'principal@stmarys.edu'},
      {name:'Tech Solutions Pvt. Ltd.', short:'TSPL', type:'corporate', plan:'Business', users:840, msgs:'1.2L/mo', credits:480000, balance:'₹12,400', status:'active', color:'var(--primary)', icon:'building', admin:'hr@techsolutions.com'},
      {name:'City Commerce College', short:'CCC', type:'education', plan:'Starter', users:180, msgs:'18K/mo', credits:72000, balance:'₹1,800', status:'active', color:'#00CEC9', icon:'university', admin:'admin@citycommerce.edu'},
      {name:'Global Pharma Corp', short:'GPC', type:'corporate', plan:'Enterprise', users:2400, msgs:'5L/mo', credits:2000000, balance:'₹48,000', status:'active', color:'var(--wa-green)', icon:'pills', admin:'it@globalpharma.com'},
      {name:'Sunrise Bakery Chain', short:'SBC', type:'smb', plan:'Starter', users:12, msgs:'8K/mo', credits:32000, balance:'₹900', status:'active', color:'#fdcb6e', icon:'store', admin:'owner@sunrisebakery.com'},
      {name:'IIT Alumni Foundation', short:'IITAF', type:'education', plan:'Pro', users:450, msgs:'65K/mo', credits:260000, balance:'₹5,800', status:'low_credit', color:'#e17055', icon:'flask', admin:'info@iitalumni.org'},
      {name:'Metro Hospitals Group', short:'MHG', type:'corporate', plan:'Business', users:1200, msgs:'2.5L/mo', credits:1000000, balance:'₹22,000', status:'active', color:'var(--danger)', icon:'hospital', admin:'admin@metrohospitals.com'},
      {name:'QuickMart Retail', short:'QMR', type:'smb', plan:'Starter', users:8, msgs:'5K/mo', credits:20000, balance:'₹600', status:'paused', color:'#a29bfe', icon:'shopping-cart', admin:'store@quickmart.com'},
    ].map(o => `
    <div class="card org-card" data-type="${o.type}" style="border-top:3px solid ${o.color};transition:transform 0.2s,box-shadow 0.2s" onmouseenter="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 30px rgba(0,0,0,0.3)'" onmouseleave="this.style.transform='';this.style.boxShadow=''">
      <div class="card-header" style="padding:14px 16px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:40px;height:40px;border-radius:10px;background:${o.color}22;border:1px solid ${o.color}44;display:flex;align-items:center;justify-content:center;font-size:18px;color:${o.color}">
            <i class="fas fa-${o.icon}"></i>
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:700;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${o.name}</div>
            <div style="font-size:11px;color:var(--text-muted)">${o.admin}</div>
          </div>
          <span class="badge ${o.status==='active'?'badge-success':o.status==='low_credit'?'badge-warning':'badge-danger'}" style="font-size:10px;flex-shrink:0">
            ${o.status==='active'?'Active':o.status==='low_credit'?'Low Credit':'Paused'}
          </span>
        </div>
      </div>
      <div class="card-body" style="padding:14px 16px">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px;text-align:center">
          <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:8px">
            <div style="font-size:14px;font-weight:800;color:white">${o.users.toLocaleString()}</div>
            <div style="font-size:10px;color:var(--text-muted)">Users</div>
          </div>
          <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:8px">
            <div style="font-size:14px;font-weight:800;color:${o.color}">${o.msgs}</div>
            <div style="font-size:10px;color:var(--text-muted)">Messages</div>
          </div>
          <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:8px">
            <div style="font-size:14px;font-weight:800;color:var(--wa-green)">${o.balance}</div>
            <div style="font-size:10px;color:var(--text-muted)">Balance</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:6px">
            <span class="badge badge-purple" style="font-size:10px"><i class="fas fa-crown" style="font-size:9px"></i> ${o.plan}</span>
            <span style="font-size:11px;color:var(--text-muted)">${o.type==='education'?'Education':o.type==='corporate'?'Corporate':'Small Business'}</span>
          </div>
          <div style="font-size:11px;color:var(--text-muted)">ID: ${o.short}</div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-sm btn-outline" style="flex:1;justify-content:center;font-size:11px" onclick="showToast('Opening ${o.name} admin panel...','info')">
            <i class="fas fa-external-link-alt"></i> Open Panel
          </button>
          <button class="btn btn-sm btn-success" style="justify-content:center" onclick="openModal('rechargeOrgModal')" title="Recharge Credits">
            <i class="fas fa-coins"></i>
          </button>
          <button class="btn btn-sm btn-outline" style="justify-content:center" onclick="showToast('Settings for ${o.name}','info')" title="Settings">
            <i class="fas fa-cog"></i>
          </button>
        </div>
      </div>
    </div>`).join('')}

  </div>
</div>

<!-- TAB: Plans & Billing -->
<div id="tabPlans" class="tab-panel" data-tab-group="wl">
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-bottom:28px">
    ${[
      {name:'Starter',price:'₹999/mo',msgs:'25,000',users:'Up to 25',bots:'2 Bot Flows',support:'Email',color:'var(--text-muted)',popular:false,desc:'Perfect for small businesses & micro-schools'},
      {name:'Pro',price:'₹3,499/mo',msgs:'1,00,000',users:'Up to 500',bots:'10 Bot Flows',support:'Priority Email',color:'var(--primary)',popular:true,desc:'Ideal for colleges & medium enterprises'},
      {name:'Business',price:'₹7,999/mo',msgs:'5,00,000',users:'Up to 2000',bots:'Unlimited',support:'Dedicated Manager',color:'var(--wa-green)',popular:false,desc:'For large schools, hospitals & corporates'},
      {name:'Enterprise',price:'Custom',msgs:'Unlimited',users:'Unlimited',bots:'Unlimited + AI',support:'24/7 SLA',color:'#fdcb6e',popular:false,desc:'Full white-label + custom API + reseller rights'},
    ].map(p=>`
    <div class="card" style="border:2px solid ${p.popular?'var(--primary)':'var(--border)'};position:relative;transition:transform 0.2s" onmouseenter="this.style.transform='translateY(-4px)'" onmouseleave="this.style.transform=''">
      ${p.popular?'<div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--primary);color:white;font-size:11px;font-weight:700;padding:3px 16px;border-radius:20px;white-space:nowrap">⭐ MOST POPULAR</div>':''}
      <div class="card-body" style="padding:24px;text-align:center">
        <div style="font-size:18px;font-weight:800;color:${p.color};margin-bottom:4px">${p.name}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:16px">${p.desc}</div>
        <div style="font-size:30px;font-weight:900;color:white;margin-bottom:20px">${p.price}</div>
        ${[
          ['fas fa-paper-plane',p.msgs+' Messages'],
          ['fas fa-users',p.users+' Users'],
          ['fas fa-robot',p.bots],
          ['fas fa-headset',p.support],
          ['fas fa-palette','White-label Domain'],
          ['fas fa-plug','ERP Integration'],
        ].map(([ic,feat])=>`
        <div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid rgba(45,63,90,0.4);text-align:left;font-size:12px;color:var(--text-muted)">
          <i class="${ic}" style="color:${p.color};width:16px;text-align:center"></i> ${feat}
        </div>`).join('')}
        <button class="btn btn-sm w-full" style="margin-top:18px;justify-content:center;background:${p.popular?'var(--primary)':'transparent'};border:1px solid ${p.color};color:${p.color}" onclick="showToast('Assigning ${p.name} plan to organization...','success')">
          Assign Plan
        </button>
      </div>
    </div>`).join('')}
  </div>

  <!-- Revenue Table -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-rupee-sign" style="color:#fdcb6e"></i> Monthly Revenue Summary</div>
      <button class="btn btn-sm btn-outline"><i class="fas fa-download"></i> Export CSV</button>
    </div>
    <div style="padding:0;overflow-x:auto">
      <table class="data-table">
        <thead><tr><th>Organization</th><th>Plan</th><th>Monthly Fee</th><th>Add-on Credits</th><th>Total Revenue</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          ${[
            ['St. Mary\'s School','Pro','₹3,499','₹1,800','₹5,299','paid'],
            ['Tech Solutions Pvt.','Business','₹7,999','₹6,200','₹14,199','paid'],
            ['City Commerce College','Starter','₹999','₹400','₹1,399','paid'],
            ['Global Pharma Corp','Enterprise','₹25,000','₹18,000','₹43,000','paid'],
            ['Sunrise Bakery','Starter','₹999','₹200','₹1,199','due'],
            ['Metro Hospitals','Business','₹7,999','₹12,000','₹19,999','paid'],
          ].map(([org,plan,fee,addon,total,st])=>`
          <tr>
            <td style="font-size:13px;font-weight:600;color:white">${org}</td>
            <td><span class="badge badge-purple">${plan}</span></td>
            <td style="color:var(--text-muted)">${fee}</td>
            <td style="color:var(--wa-green)">${addon}</td>
            <td style="font-weight:700;color:white">${total}</td>
            <td><span class="badge ${st==='paid'?'badge-success':'badge-warning'}">${st==='paid'?'Paid':'Payment Due'}</span></td>
            <td><button class="btn btn-xs btn-outline" onclick="showToast('Invoice sent','success')">Invoice</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- TAB: Branding -->
<div id="tabBranding" class="tab-panel" data-tab-group="wl">
  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-palette" style="color:var(--primary)"></i> White-Label Branding</div>
        <button class="btn btn-sm btn-primary" onclick="showToast('Brand settings saved!','success')"><i class="fas fa-save"></i> Save</button>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label class="form-label">Platform Name</label>
          <input class="form-control" value="SchoolSend Pro" placeholder="Your brand name">
        </div>
        <div class="form-group">
          <label class="form-label">Custom Domain</label>
          <div style="display:flex;gap:8px">
            <input class="form-control" value="app.schoolsend.in" placeholder="your-domain.com" style="flex:1">
            <button class="btn btn-sm btn-outline" onclick="showToast('Domain verified!','success')"><i class="fas fa-check"></i></button>
          </div>
          <div style="font-size:11px;color:var(--success);margin-top:4px"><i class="fas fa-check-circle"></i> SSL Active • CNAME pointing to wapilabel.io</div>
        </div>
        <div class="form-group">
          <label class="form-label">Primary Color</label>
          <div style="display:flex;gap:8px;align-items:center">
            <input type="color" value="#6C5CE7" style="width:44px;height:40px;border-radius:8px;border:1px solid var(--border);background:none;cursor:pointer">
            <input class="form-control" value="#6C5CE7" style="flex:1">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Accent Color</label>
          <div style="display:flex;gap:8px;align-items:center">
            <input type="color" value="#25D366" style="width:44px;height:40px;border-radius:8px;border:1px solid var(--border);background:none;cursor:pointer">
            <input class="form-control" value="#25D366" style="flex:1">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Logo URL</label>
          <input class="form-control" value="https://schoolsend.in/logo.png" placeholder="https://...">
        </div>
        <div class="form-group">
          <label class="form-label">Favicon URL</label>
          <input class="form-control" value="https://schoolsend.in/favicon.ico" placeholder="https://...">
        </div>
        <div class="form-group">
          <label class="form-label">Footer Text</label>
          <input class="form-control" value="Powered by SchoolSend Pro" placeholder="Powered by ...">
        </div>
        <div class="form-group">
          <label class="form-label">Support Email</label>
          <input class="form-control" value="help@schoolsend.in" placeholder="support@yourdomain.com">
        </div>
      </div>
    </div>
    <div>
      <!-- Live Preview -->
      <div class="card" style="margin-bottom:18px">
        <div class="card-header">
          <div class="card-title"><i class="fas fa-eye" style="color:var(--accent)"></i> Live Preview</div>
          <button class="btn btn-sm btn-outline" onclick="showToast('Preview link copied','success')"><i class="fas fa-external-link-alt"></i> Open</button>
        </div>
        <div class="card-body" style="padding:0;overflow:hidden;border-radius:0 0 16px 16px">
          <div style="background:#6C5CE7;padding:12px 18px;display:flex;align-items:center;gap:10px">
            <div style="width:28px;height:28px;border-radius:8px;background:white;display:flex;align-items:center;justify-content:center;font-size:14px;color:#6C5CE7;font-weight:900">S</div>
            <span style="color:white;font-weight:700;font-size:15px">SchoolSend Pro</span>
            <span style="color:rgba(255,255,255,0.7);font-size:11px;margin-left:auto">app.schoolsend.in</span>
          </div>
          <div style="padding:18px;background:#0f172a">
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px">Dashboard preview</div>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
              ${['Messages Sent','Active Bots','Total Students','Credits Left'].map((l,i)=>`
              <div style="background:#1e293b;border-radius:8px;padding:10px;border-top:2px solid #6C5CE7">
                <div style="font-size:18px;font-weight:800;color:white">${['12.4K','4','2,480','45K'][i]}</div>
                <div style="font-size:10px;color:#8899a6">${l}</div>
              </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
      <!-- Per-Org Branding -->
      <div class="card">
        <div class="card-header">
          <div class="card-title"><i class="fas fa-building" style="color:var(--accent)"></i> Per-Organization Branding</div>
        </div>
        <div class="card-body" style="font-size:13px;color:var(--text-muted)">
          <p style="margin-bottom:12px">Each organization can have its own logo, color scheme, and custom domain while using your infrastructure.</p>
          ${[
            ['St. Mary\'s School','stmarys.schoolsend.in','#1565C0'],
            ['Tech Solutions','techsol.wapibiz.com','#1B5E20'],
            ['City College','citycollege.wapiedu.in','#4A148C'],
          ].map(([n,d,c])=>`
          <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid rgba(45,63,90,0.4)">
            <div style="width:8px;height:8px;border-radius:50%;background:${c}"></div>
            <span style="flex:1;color:white;font-size:12px">${n}</span>
            <span style="font-size:11px;color:var(--accent)">${d}</span>
            <button class="btn btn-xs btn-outline" onclick="showToast('Editing ${n} brand','info')">Edit</button>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- TAB: API Keys -->
<div id="tabApiKeys" class="tab-panel" data-tab-group="wl">
  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-key" style="color:#fdcb6e"></i> Master API Keys</div>
        <button class="btn btn-sm btn-primary" onclick="openModal('genKeyModal')"><i class="fas fa-plus"></i> Generate</button>
      </div>
      <div class="card-body">
        ${[
          {name:'Production Key',key:'wapi_prod_xK9mL2nP4qR8sT6uV0wX3y',scope:'Full Access',created:'Oct 1, 2024',last:'2 min ago'},
          {name:'Read-Only Key',key:'wapi_read_aB5cD7eF9gH1iJ3kL4mN6o',scope:'Read Only',created:'Oct 5, 2024',last:'1 day ago'},
          {name:'Webhook Key',key:'wapi_hook_pQ8rS2tU4vW6xY0zA1bC3d',scope:'Webhooks',created:'Oct 10, 2024',last:'5 min ago'},
        ].map(k=>`
        <div style="background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:12px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:13px;font-weight:700;color:white">${k.name}</span>
            <span class="badge badge-purple" style="font-size:10px">${k.scope}</span>
          </div>
          <div style="background:var(--dark);border-radius:8px;padding:8px 12px;font-family:monospace;font-size:11px;color:var(--text-muted);margin-bottom:8px;word-break:break-all">${k.key.substring(0,24)}••••••••</div>
          <div style="display:flex;align-items:center;justify-content:space-between">
            <span style="font-size:11px;color:var(--text-muted)">Last used: ${k.last}</span>
            <div style="display:flex;gap:6px">
              <button class="btn btn-xs btn-outline" onclick="copyText('${k.key}')"><i class="fas fa-copy"></i></button>
              <button class="btn btn-xs btn-danger" onclick="showToast('Key revoked','error')"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-globe" style="color:var(--accent)"></i> Webhook Endpoints</div>
        <button class="btn btn-sm btn-outline" onclick="showToast('Adding webhook endpoint','info')"><i class="fas fa-plus"></i> Add</button>
      </div>
      <div class="card-body" style="font-size:13px">
        ${[
          {url:'https://yourerp.com/webhook/whatsapp','event':'message.received','status':'active'},
          {url:'https://yourerp.com/webhook/delivery','event':'message.delivered','status':'active'},
          {url:'https://hrms.company.com/wa-notif','event':'campaign.completed','status':'active'},
          {url:'https://lms.college.edu/wa-callback','event':'lead.created','status':'paused'},
        ].map(w=>`
        <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px;margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span class="badge badge-info" style="font-size:10px">${w.event}</span>
            <span class="badge ${w.status==='active'?'badge-success':'badge-warning'}" style="font-size:10px">${w.status}</span>
          </div>
          <div style="font-size:11px;color:var(--text-muted);word-break:break-all">${w.url}</div>
        </div>`).join('')}
        <div style="margin-top:16px;padding:14px;background:rgba(37,211,102,0.05);border:1px solid rgba(37,211,102,0.2);border-radius:10px">
          <div style="font-size:12px;font-weight:600;color:var(--wa-green);margin-bottom:6px"><i class="fas fa-info-circle"></i> Webhook Payload Sample</div>
          <pre style="font-size:10px;color:var(--text-muted);white-space:pre-wrap">{
  "event": "message.delivered",
  "org_id": "SMHSS",
  "timestamp": "2024-10-25T09:00:00Z",
  "data": {
    "message_id": "wamid.xxx",
    "recipient": "+91XXXXXXXXXX",
    "status": "delivered"
  }
}</pre>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- TAB: Reseller -->
<div id="tabReseller" class="tab-panel" data-tab-group="wl">
  <div style="background:linear-gradient(135deg,rgba(108,92,231,0.1),rgba(0,206,201,0.05));border:1px solid rgba(108,92,231,0.2);border-radius:16px;padding:24px;margin-bottom:24px;text-align:center">
    <i class="fas fa-handshake" style="font-size:36px;color:var(--primary);margin-bottom:12px;display:block"></i>
    <div style="font-size:20px;font-weight:800;color:white;margin-bottom:8px">Reseller Program</div>
    <div style="font-size:13px;color:var(--text-muted);max-width:600px;margin:0 auto 20px">Sell WapiSend under your own brand. Earn up to <span style="color:var(--wa-green);font-weight:700">35% margin</span> on every subscription and credit recharge your sub-clients make.</div>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:20px">
      ${[
        ['fas fa-tag','Set Your Own Prices','Mark up plans as you like'],
        ['fas fa-palette','Full White-Label','Your logo, your domain'],
        ['fas fa-percentage','35% Margin','On all subscriptions'],
        ['fas fa-bolt','Instant Provisioning','Orgs go live in minutes'],
      ].map(([ic,h,s])=>`
      <div style="background:rgba(255,255,255,0.06);border-radius:12px;padding:16px 20px;width:180px">
        <i class="${ic}" style="color:var(--primary);font-size:20px;margin-bottom:8px;display:block"></i>
        <div style="font-size:13px;font-weight:700;color:white;margin-bottom:4px">${h}</div>
        <div style="font-size:11px;color:var(--text-muted)">${s}</div>
      </div>`).join('')}
    </div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="fas fa-calculator" style="color:#fdcb6e"></i> Earnings Calculator</div></div>
      <div class="card-body">
        <div class="form-group">
          <label class="form-label">Number of Sub-clients</label>
          <input type="range" min="1" max="100" value="20" class="form-control" style="padding:8px" oninput="calcResell(this.value)" id="resellerSlider">
          <div style="text-align:center;font-size:24px;font-weight:800;color:var(--primary);margin-top:8px" id="resellerCount">20 clients</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:12px">
          <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:14px;text-align:center">
            <div style="font-size:11px;color:var(--text-muted)">Monthly Revenue</div>
            <div style="font-size:20px;font-weight:800;color:var(--wa-green)" id="calcRevenue">₹70,000</div>
          </div>
          <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:14px;text-align:center">
            <div style="font-size:11px;color:var(--text-muted)">Your Margin (35%)</div>
            <div style="font-size:20px;font-weight:800;color:#fdcb6e" id="calcMargin">₹24,500</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="fas fa-users" style="color:var(--accent)"></i> Sub-Resellers</div><button class="btn btn-sm btn-primary" onclick="showToast('Invite link copied!','success')"><i class="fas fa-link"></i> Invite</button></div>
      <div class="card-body">
        ${[
          {name:'EdTech Solutions Pvt.',clients:6,revenue:'₹21,000',margin:'₹7,350'},
          {name:'Corporate Comms Ltd.',clients:4,revenue:'₹32,000',margin:'₹11,200'},
          {name:'School IT Services',clients:8,revenue:'₹16,000',margin:'₹5,600'},
        ].map(r=>`
        <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(45,63,90,0.4)">
          <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;color:white;font-size:12px;font-weight:700">${r.name.substring(0,2).toUpperCase()}</div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:600;color:white">${r.name}</div>
            <div style="font-size:11px;color:var(--text-muted)">${r.clients} clients • ${r.revenue}/mo</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:12px;font-weight:700;color:var(--wa-green)">${r.margin}</div>
            <div style="font-size:10px;color:var(--text-muted)">your share</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- MODALS -->
<!-- Invite Org Modal -->
<div class="modal-overlay" id="inviteOrgModal">
  <div class="modal">
    <div class="modal-header">
      <div class="modal-title"><i class="fas fa-building" style="color:var(--primary)"></i> Add Organization</div>
      <button class="modal-close" onclick="closeModal('inviteOrgModal')"><i class="fas fa-times"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Organization Type</label>
        <select class="form-control">
          <option>🎓 School / College</option>
          <option>🏢 Corporate / Enterprise</option>
          <option>🏪 Small Business</option>
          <option>🏥 Healthcare / Hospital</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Organization Name</label>
        <input class="form-control" placeholder="e.g. St. Xavier's School">
      </div>
      <div class="form-group">
        <label class="form-label">Admin Email</label>
        <input class="form-control" type="email" placeholder="principal@school.edu">
      </div>
      <div class="form-group">
        <label class="form-label">Admin Phone (WhatsApp)</label>
        <input class="form-control" placeholder="+91 XXXXX XXXXX">
      </div>
      <div class="form-group">
        <label class="form-label">Assign Plan</label>
        <select class="form-control">
          <option>Starter – ₹999/mo</option>
          <option>Pro – ₹3,499/mo</option>
          <option>Business – ₹7,999/mo</option>
          <option>Enterprise – Custom</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Initial Credits</label>
        <input class="form-control" type="number" value="10000" placeholder="Number of credits to assign">
      </div>
      <div style="background:rgba(37,211,102,0.07);border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:12px;font-size:12px;color:var(--text-muted)">
        <i class="fas fa-info-circle" style="color:var(--wa-green)"></i> An invitation will be sent via WhatsApp & email. The org admin can customize their own dashboard and branding.
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline btn-sm" onclick="closeModal('inviteOrgModal')">Cancel</button>
      <button class="btn btn-primary btn-sm" onclick="showToast('Organization created! Invite sent via WhatsApp ✓','success');closeModal('inviteOrgModal')"><i class="fas fa-check"></i> Create & Send Invite</button>
    </div>
  </div>
</div>

<!-- Recharge Org Modal -->
<div class="modal-overlay" id="rechargeOrgModal">
  <div class="modal">
    <div class="modal-header">
      <div class="modal-title"><i class="fas fa-coins" style="color:#fdcb6e"></i> Recharge Organization Credits</div>
      <button class="modal-close" onclick="closeModal('rechargeOrgModal')"><i class="fas fa-times"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Select Organization</label>
        <select class="form-control">
          <option>St. Mary's Higher Secondary School</option>
          <option>Tech Solutions Pvt. Ltd.</option>
          <option>City Commerce College</option>
          <option>Global Pharma Corp</option>
        </select>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:16px 0">
        ${[['10K','₹900'],['50K','₹4,000'],['1L','₹7,500'],['5L','₹32,000'],['10L','₹58,000'],['Custom','—']].map(([c,p])=>`
        <div style="border:2px solid var(--border);border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all 0.2s" onclick="selectPack(this)" class="credit-pack">
          <div style="font-size:16px;font-weight:800;color:white">${c}</div>
          <div style="font-size:11px;color:var(--wa-green)">${p}</div>
        </div>`).join('')}
      </div>
      <div class="form-group">
        <label class="form-label">Payment Mode</label>
        <select class="form-control">
          <option>Deduct from reseller wallet</option>
          <option>Razorpay</option>
          <option>Bank Transfer</option>
        </select>
      </div>
      <div style="background:rgba(253,203,110,0.07);border:1px solid rgba(253,203,110,0.2);border-radius:10px;padding:12px;font-size:12px;color:var(--text-muted)">
        <i class="fas fa-coins" style="color:#fdcb6e"></i> Credits will be added instantly. Organization will receive a WhatsApp notification.
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline btn-sm" onclick="closeModal('rechargeOrgModal')">Cancel</button>
      <button class="btn btn-success btn-sm" onclick="showToast('Credits recharged! Notification sent ✓','success');closeModal('rechargeOrgModal')"><i class="fas fa-coins"></i> Recharge Now</button>
    </div>
  </div>
</div>

`, 'whitelabel', 'White-Label Console', 'Manage all organizations · Schools · Corporates · SMBs', `
.org-card { cursor: default; }
.active-filter { border-color: var(--wa-green) !important; }
.credit-pack:hover, .credit-pack.selected { border-color: var(--wa-green) !important; background: rgba(37,211,102,0.08) !important; }
`, `
function filterOrgs(type, btn) {
  document.querySelectorAll('.org-card').forEach(c => {
    c.style.display = (type === 'all' || c.dataset.type === type) ? '' : 'none';
  });
  document.querySelectorAll('.active-filter').forEach(b => b.classList.remove('active-filter','btn-success'));
  btn.classList.add('active-filter','btn-success');
  btn.classList.remove('btn-outline');
}
function calcResell(v) {
  document.getElementById('resellerCount').textContent = v + ' clients';
  const rev = v * 3500;
  const margin = Math.round(rev * 0.35);
  document.getElementById('calcRevenue').textContent = '₹' + rev.toLocaleString();
  document.getElementById('calcMargin').textContent = '₹' + margin.toLocaleString();
}
function selectPack(el) {
  document.querySelectorAll('.credit-pack').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
}
`)
