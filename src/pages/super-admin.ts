import { pageShell } from './layout'

export const superAdminHTML = () => pageShell(`

<!-- Super Admin Banner -->
<div style="background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);border-radius:16px;padding:26px 28px;margin-bottom:24px;position:relative;overflow:hidden;border:1px solid rgba(108,92,231,0.3)">
  <div style="position:absolute;right:-40px;top:-40px;width:240px;height:240px;border-radius:50%;background:rgba(108,92,231,0.1)"></div>
  <div style="position:absolute;left:50%;bottom:-60px;width:180px;height:180px;border-radius:50%;background:rgba(0,206,201,0.06)"></div>
  <div style="position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
    <div style="display:flex;align-items:center;gap:14px">
      <div style="width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:24px;color:white"><i class="fas fa-crown"></i></div>
      <div>
        <div style="font-size:22px;font-weight:800;color:white">Super Admin Panel</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.6)">Platform owner control — all tenants, billing, infra & resellers</div>
        <div style="display:flex;gap:8px;margin-top:6px">
          <span style="background:rgba(108,92,231,0.3);color:#a29bfe;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700">PLATFORM OWNER</span>
          <span style="background:rgba(37,211,102,0.2);color:var(--wa-green);padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700">FULL ACCESS</span>
        </div>
      </div>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn" style="background:linear-gradient(135deg,var(--primary),var(--accent));color:white" onclick="openModal('addResellerModal')"><i class="fas fa-user-plus"></i> Add Reseller</button>
      <button class="btn btn-outline" onclick="showToast('Generating platform report...','info')"><i class="fas fa-file-alt"></i> Platform Report</button>
    </div>
  </div>
</div>

<!-- Platform Stats -->
<div class="stats-grid" style="grid-template-columns:repeat(auto-fill,minmax(175px,1fr));margin-bottom:24px">
  ${[
    ['Platform Revenue','₹18.4L','This month','rupee-sign','orange'],
    ['Total Tenants','248','Active orgs','building','purple'],
    ['Resellers','12','Active partners','handshake','blue'],
    ['Messages Today','1.28M','Across platform','paper-plane','green'],
    ['Credits Issued','42.8M','Total lifetime','coins','teal'],
    ['Delivery Rate','98.6%','Platform avg','check-double','green'],
    ['Active WhatsApp #','310','Connected numbers','phone','blue'],
    ['Support Tickets','24','Open tickets','headset','red'],
  ].map(([label,val,meta,ic,color])=>`
  <div class="stat-card ${color}">
    <div class="stat-label">${label}</div>
    <div class="stat-value">${val}</div>
    <div class="stat-meta">${meta}</div>
    <i class="fas fa-${ic} stat-icon"></i>
  </div>`).join('')}
</div>

<!-- Tabs -->
<div class="tabs" style="margin-bottom:20px">
  <button class="tab-btn active" data-tab-btn="super" onclick="switchTab('tabOverview','super')">📊 Overview</button>
  <button class="tab-btn" data-tab-btn="super" onclick="switchTab('tabResellers','super')">🤝 Resellers</button>
  <button class="tab-btn" data-tab-btn="super" onclick="switchTab('tabTenants','super')">🏢 All Tenants</button>
  <button class="tab-btn" data-tab-btn="super" onclick="switchTab('tabBilling','super')">💰 Billing</button>
  <button class="tab-btn" data-tab-btn="super" onclick="switchTab('tabInfra','super')">⚙️ Infrastructure</button>
  <button class="tab-btn" data-tab-btn="super" onclick="switchTab('tabAlerts','super')">🔔 Alerts</button>
</div>

<!-- Overview Tab -->
<div id="tabOverview" class="tab-panel active" data-tab-group="super">
  <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:20px">

    <!-- Revenue chart area -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-chart-area" style="color:var(--primary)"></i> Revenue Trend (Last 12 Months)</div>
        <span class="badge badge-success"><i class="fas fa-circle" style="font-size:7px"></i> Live</span>
      </div>
      <div class="card-body">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px">
          ${[
            ['Monthly Revenue','₹18.4L','var(--wa-green)','arrow-up','vs ₹15.2L last month'],
            ['Platform Margin','38.2%','var(--primary)','arrow-up','After infra costs'],
            ['Churn Rate','2.1%','var(--success)','arrow-down','Very low'],
          ].map(([l,v,c,ic,m])=>`
          <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:12px;padding:14px">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">${l}</div>
            <div style="font-size:22px;font-weight:800;color:${c}">${v}</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:4px"><i class="fas fa-${ic}" style="color:${ic==='arrow-up'?'var(--success)':'var(--danger)'}"></i> ${m}</div>
          </div>`).join('')}
        </div>
        <!-- Bar chart visual -->
        <div style="display:flex;align-items:flex-end;gap:8px;height:100px;padding:0 4px">
          ${[45,52,48,60,55,70,65,82,76,88,92,100].map((h,i)=>`
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
            <div style="width:100%;height:${h}%;background:${i===11?'linear-gradient(180deg,var(--wa-green),var(--wa-teal))':'linear-gradient(180deg,rgba(108,92,231,0.6),rgba(108,92,231,0.2))'};border-radius:4px 4px 0 0;transition:height 0.5s"></div>
            <div style="font-size:9px;color:var(--text-muted)">${['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Top Tenants -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-trophy" style="color:#fdcb6e"></i> Top Revenue Tenants</div>
      </div>
      <div style="padding:8px 16px">
        ${[
          ['Infosys Ltd','₹3.24L','Corporate','var(--primary)'],
          ['Rajasthan Univ','₹1.98L','Education','var(--info)'],
          ['TCS Regional','₹1.58L','Corporate','var(--accent)'],
          ['DPS Delhi','₹1.24L','Education','#e74c3c'],
          ['HDFC Bank','₹1.12L','Finance','var(--wa-green)'],
          ['Sunrise Hospital','₹0.89L','Healthcare','#e17055'],
          ['Apollo Group','₹0.72L','Healthcare','#fd79a8'],
        ].map(([name,rev,type,color],i)=>`
        <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(45,63,90,0.3)">
          <div style="width:24px;height:24px;border-radius:50%;background:${color}22;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:${color};flex-shrink:0">${i+1}</div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:600;color:white">${name}</div>
            <div style="font-size:10px;color:var(--text-muted)">${type}</div>
          </div>
          <span style="font-size:13px;font-weight:700;color:${color}">${rev}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- Vertical breakdown -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
    ${[
      ['Education','82 orgs','School, College, Coaching','graduation-cap','var(--info)',33],
      ['Corporate','94 orgs','Enterprise, SME, Startup','building','var(--primary)',38],
      ['Healthcare','34 orgs','Hospital, Clinic, Pharmacy','heartbeat','#e17055',14],
      ['Small Business','38 orgs','Retail, Restaurant, Salon','store','var(--warning)',15],
    ].map(([vert,count,types,ic,color,pct])=>`
    <div class="card" style="border-color:${color}22">
      <div class="card-body" style="padding:18px">
        <div style="width:40px;height:40px;border-radius:10px;background:${color}22;display:flex;align-items:center;justify-content:center;font-size:18px;color:${color};margin-bottom:12px"><i class="fas fa-${ic}"></i></div>
        <div style="font-size:18px;font-weight:800;color:white">${count}</div>
        <div style="font-size:13px;font-weight:600;color:${color};margin:2px 0">${vert}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:10px">${types}</div>
        <div class="progress"><div class="progress-bar" style="width:${pct}%;background:${color}"></div></div>
        <div style="font-size:10px;color:var(--text-muted);margin-top:4px">${pct}% of platform</div>
      </div>
    </div>`).join('')}
  </div>
</div>

<!-- Resellers Tab -->
<div id="tabResellers" class="tab-panel" data-tab-group="super">
  <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-handshake" style="color:var(--accent)"></i> Reseller Partners</div>
        <button class="btn btn-sm btn-success" onclick="openModal('addResellerModal')"><i class="fas fa-plus"></i> Add Reseller</button>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr><th>Reseller</th><th>Region</th><th>Tenants</th><th>Rev Share</th><th>This Month</th><th>Commission</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${[
              ['TechBiz Solutions','North India','42 orgs','18%','₹4.2L','₹75,600','active'],
              ['EduTech Partners','South India','38 orgs','16%','₹3.8L','₹60,800','active'],
              ['CloudCorp Pvt Ltd','West India','28 orgs','15%','₹2.8L','₹42,000','active'],
              ['BizConnect East','East India','21 orgs','14%','₹2.1L','₹29,400','active'],
              ['StartupHub','Pan India','18 orgs','20%','₹1.8L','₹36,000','active'],
              ['SMB Pro Agency','Mumbai','12 orgs','12%','₹1.2L','₹14,400','pending'],
              ['DigitalFirst Co','Bangalore','8 orgs','15%','₹0.8L','₹12,000','active'],
            ].map(([name,region,tenants,rev,thisMonth,commission,status])=>`
            <tr>
              <td>
                <div style="font-size:13px;font-weight:600;color:white">${name}</div>
              </td>
              <td style="font-size:12px;color:var(--text-muted)">${region}</td>
              <td style="font-size:13px;color:white;font-weight:600">${tenants}</td>
              <td style="font-size:13px;color:var(--wa-green);font-weight:700">${rev}</td>
              <td style="font-size:13px;color:white">${thisMonth}</td>
              <td style="font-size:13px;color:#fdcb6e;font-weight:700">${commission}</td>
              <td><span class="badge ${status==='active'?'badge-success':'badge-warning'}">${status}</span></td>
              <td>
                <div style="display:flex;gap:4px">
                  <button class="btn btn-xs btn-outline" onclick="showToast('Opening reseller panel...','info')"><i class="fas fa-cog"></i></button>
                  <button class="btn btn-xs" style="background:rgba(37,211,102,0.15);color:var(--wa-green);border:none;border-radius:6px;padding:4px 9px;font-size:11px;cursor:pointer" onclick="showToast('Commission paid!','success')"><i class="fas fa-money-bill"></i></button>
                </div>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Reseller onboarding -->
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card" style="background:linear-gradient(135deg,rgba(0,206,201,0.08),rgba(0,206,201,0.03));border-color:rgba(0,206,201,0.2)">
        <div class="card-header" style="border-color:rgba(0,206,201,0.15)">
          <div class="card-title"><i class="fas fa-chart-pie" style="color:var(--accent)"></i> Revenue Share Model</div>
        </div>
        <div class="card-body">
          ${[
            ['Bronze','1-10 tenants','10% commission','var(--warning)'],
            ['Silver','11-30 tenants','14% commission','#94a3b8'],
            ['Gold','31-50 tenants','18% commission','#fdcb6e'],
            ['Platinum','50+ tenants','22% commission','var(--primary)'],
          ].map(([tier,range,comm,color])=>`
          <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(45,63,90,0.3)">
            <div style="width:32px;height:32px;border-radius:8px;background:${color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <i class="fas fa-medal" style="color:${color};font-size:13px"></i>
            </div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600;color:white">${tier}</div>
              <div style="font-size:10px;color:var(--text-muted)">${range}</div>
            </div>
            <span style="font-size:12px;font-weight:700;color:${color}">${comm}</span>
          </div>`).join('')}
          <div style="margin-top:12px;font-size:11px;color:var(--text-muted)">
            Commissions paid monthly on the 1st. Minimum payout ₹5,000.
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title"><i class="fas fa-tools" style="color:var(--primary)"></i> Reseller Tools</div>
        </div>
        <div class="card-body">
          ${[
            ['White-label portal access','check-circle','var(--success)'],
            ['Tenant management panel','check-circle','var(--success)'],
            ['Credit issuance control','check-circle','var(--success)'],
            ['Custom branding per tenant','check-circle','var(--success)'],
            ['Commission dashboard','check-circle','var(--success)'],
            ['Sales collateral & demos','check-circle','var(--success)'],
            ['Dedicated support channel','check-circle','var(--success)'],
          ].map(([tool,ic,col])=>`
          <div style="display:flex;align-items:center;gap:8px;padding:7px 0;font-size:12px;color:var(--text-muted)">
            <i class="fas fa-${ic}" style="color:${col}"></i> ${tool}
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- All Tenants Tab -->
<div id="tabTenants" class="tab-panel" data-tab-group="super">
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-building" style="color:var(--primary)"></i> All Platform Tenants (248)</div>
      <div style="display:flex;gap:8px">
        <input type="text" class="form-control" placeholder="Search tenant..." style="width:200px;padding:6px 12px;font-size:12px">
        <select class="form-control" style="width:120px;padding:6px 10px;font-size:12px">
          <option>All Verticals</option>
          <option>Education</option>
          <option>Corporate</option>
          <option>Healthcare</option>
          <option>SMB</option>
        </select>
        <select class="form-control" style="width:110px;padding:6px 10px;font-size:12px">
          <option>All Plans</option>
          <option>Enterprise</option>
          <option>Pro</option>
          <option>Starter</option>
          <option>Trial</option>
        </select>
        <button class="btn btn-sm btn-outline" onclick="showToast('Exporting tenant list...','info')"><i class="fas fa-download"></i></button>
      </div>
    </div>
    <div style="overflow-x:auto">
      <table class="data-table">
        <thead>
          <tr><th>Tenant</th><th>Vertical</th><th>Plan</th><th>Reseller</th><th>Credits</th><th>Msgs/Month</th><th>Last Active</th><th>MRR</th><th>Actions</th></tr>
        </thead>
        <tbody>
          ${[
            ['Infosys Ltd','Corporate','Enterprise','TechBiz','4.75L','324K','5m ago','₹7,999'],
            ['Delhi Public School','Education','Enterprise','EduTech','3.25L','124K','12m ago','₹7,999'],
            ['Rajasthan University','Education','Enterprise','EduTech','4.02L','198K','30m ago','₹7,999'],
            ['TCS Regional','Corporate','Pro','TechBiz','1.52L','98K','1h ago','₹2,999'],
            ['Sunrise Hospital','Healthcare','Pro','CloudCorp','1.08L','72K','2h ago','₹2,999'],
            ['HDFC Branch','Finance','Enterprise','TechBiz','2.1L','156K','20m ago','₹7,999'],
            ['Green Valley Pharmacy','SMB','Starter','Direct','6.8K','8.2K','1d ago','₹999'],
            ['Mehta & Sons','SMB','Trial','Direct','9.5K','3.1K','2d ago','₹0'],
          ].map(([name,vert,plan,reseller,credits,msgs,active,mrr])=>`
          <tr>
            <td style="font-size:13px;font-weight:600;color:white">${name}</td>
            <td><span class="badge ${vert==='Corporate'?'badge-purple':vert==='Education'?'badge-info':vert==='Healthcare'?'badge-danger':'badge-warning'}" style="font-size:10px">${vert}</span></td>
            <td><span class="badge ${plan==='Enterprise'?'badge-wa':plan==='Pro'?'badge-success':'badge-warning'}" style="font-size:10px">${plan}</span></td>
            <td style="font-size:11px;color:var(--text-muted)">${reseller}</td>
            <td style="font-size:12px;color:var(--wa-green);font-weight:600">${credits}</td>
            <td style="font-size:12px;color:var(--text-muted)">${msgs}</td>
            <td style="font-size:11px;color:var(--text-muted)">${active}</td>
            <td style="font-size:13px;font-weight:700;color:white">${mrr}</td>
            <td>
              <div style="display:flex;gap:4px">
                <button class="btn btn-xs btn-outline" onclick="showToast('Tenant details loaded','info')"><i class="fas fa-eye"></i></button>
                <button class="btn btn-xs btn-outline" onclick="showToast('Impersonating tenant...','warning')"><i class="fas fa-user-secret"></i></button>
                <button class="btn btn-xs btn-danger" onclick="showToast('Tenant suspended','error')"><i class="fas fa-ban"></i></button>
              </div>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Billing Tab -->
<div id="tabBilling" class="tab-panel" data-tab-group="super">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-money-bill-wave" style="color:var(--wa-green)"></i> Platform Billing Summary</div>
      </div>
      <div class="card-body">
        ${[
          ['Total MRR (Monthly Recurring Revenue)','₹18,40,450','var(--wa-green)'],
          ['Credits Sold This Month','42.8M credits','var(--primary)'],
          ['Total Invoices Generated','248','var(--accent)'],
          ['Pending Payments','12 invoices • ₹2.4L','var(--warning)'],
          ['Reseller Commissions Due','₹2.7L','#fdcb6e'],
          ['Platform Infra Cost','₹3.2L/mo','var(--danger)'],
          ['Net Profit This Month','₹12.5L','var(--wa-green)'],
        ].map(([label,val,color])=>`
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(45,63,90,0.3)">
          <span style="font-size:13px;color:var(--text-muted)">${label}</span>
          <span style="font-size:14px;font-weight:700;color:${color}">${val}</span>
        </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-tags" style="color:var(--primary)"></i> Pricing Management</div>
        <button class="btn btn-sm btn-outline" onclick="showToast('Saving pricing changes...','success')"><i class="fas fa-save"></i> Save</button>
      </div>
      <div class="card-body">
        <div style="margin-bottom:14px;font-size:11px;color:var(--text-muted)">Set credit prices and plan pricing globally</div>
        ${[
          ['1 Credit Price','₹0.10','per message'],
          ['Starter Plan','₹999','per month'],
          ['Pro Plan','₹2,999','per month'],
          ['Enterprise Plan','₹7,999','per month'],
          ['Reseller Min Payout','₹5,000','per month'],
          ['Trial Period','14','days'],
        ].map(([label,val,unit])=>`
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <label style="font-size:12px;color:var(--text-muted);flex:1">${label}</label>
          <input type="text" class="form-control" value="${val}" style="width:100px;text-align:center;font-weight:700">
          <span style="font-size:11px;color:var(--text-muted);white-space:nowrap">${unit}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- Infrastructure Tab -->
<div id="tabInfra" class="tab-panel" data-tab-group="super">
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px">
    ${[
      ['Message Queue','1,284,320 queued','Cloudflare Workers','94% capacity','orange','queue'],
      ['Delivery Workers','48 active','Auto-scaling','2.8ms avg latency','green','server'],
      ['WhatsApp API Pool','310 numbers','Meta Business API','98.6% quality score','blue','phone'],
      ['Database Cluster','D1 SQLite x4','Cloudflare D1','42ms avg query','purple','database'],
      ['KV Cache','84M ops/day','Cloudflare KV','0.4ms avg read','teal','bolt'],
      ['Webhook Listeners','1,240 active','Cloudflare Pages','99.98% uptime','green','webhook'],
    ].map(([name,stat,platform,metric,color,ic])=>`
    <div class="card stat-card ${color}">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <div style="width:36px;height:36px;border-radius:9px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:16px;color:white;flex-shrink:0"><i class="fas fa-${ic}"></i></div>
        <div>
          <div style="font-size:13px;font-weight:700;color:white">${name}</div>
          <div style="font-size:10px;color:var(--text-muted)">${platform}</div>
        </div>
        <span class="badge badge-success" style="margin-left:auto;font-size:9px">Live</span>
      </div>
      <div style="font-size:18px;font-weight:800;color:white;margin-bottom:4px">${stat}</div>
      <div style="font-size:11px;color:var(--text-muted)">${metric}</div>
    </div>`).join('')}
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-heartbeat" style="color:var(--danger)"></i> System Health Monitor</div>
      <button class="btn btn-sm btn-outline" onclick="refreshHealth()"><i class="fas fa-sync-alt"></i> Refresh</button>
    </div>
    <div class="card-body">
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
        ${[
          ['WhatsApp API Gateway','Operational','var(--success)',99.98],
          ['Message Queue Service','Operational','var(--success)',100],
          ['Database Cluster','Operational','var(--success)',100],
          ['Notification Delivery','Operational','var(--success)',99.94],
          ['Bot Flow Engine','Operational','var(--success)',100],
          ['Payment Gateway','Operational','var(--success)',99.99],
          ['ERP Webhook Listener','Degraded','var(--warning)',94.2],
          ['Analytics Pipeline','Operational','var(--success)',100],
        ].map(([service,status,color,uptime])=>`
        <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:10px">
          <div style="width:10px;height:10px;border-radius:50%;background:${color};box-shadow:0 0 6px ${color};flex-shrink:0"></div>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:600;color:white">${service}</div>
            <div style="font-size:10px;color:var(--text-muted)">${uptime}% uptime</div>
          </div>
          <span style="font-size:11px;font-weight:600;color:${color}">${status}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- Alerts Tab -->
<div id="tabAlerts" class="tab-panel" data-tab-group="super">
  <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-exclamation-triangle" style="color:var(--warning)"></i> Platform Alerts & Issues</div>
        <span class="badge badge-danger">3 Critical</span>
      </div>
      <div style="padding:8px 0">
        ${[
          ['critical','Tenant: TCS Regional — Credit balance < 5,000','Immediate top-up needed','5m ago','Resolve'],
          ['critical','ERP Webhook timeout — Zoho School connector','Connection degraded','12m ago','Fix'],
          ['critical','WhatsApp number +91 97xxx quality dropped to Medium','Account quality alert','1h ago','Review'],
          ['warning','24 support tickets open — 8 older than 24h','SLA risk','2h ago','View'],
          ['warning','Reseller BizConnect East — commission payout pending','₹29,400 due','1d ago','Pay'],
          ['info','Mehta & Sons trial expires in 2 days','Convert to paid plan','2d ago','Notify'],
          ['info','New reseller application received — SMB Pro Agency','Pending approval','3d ago','Review'],
        ].map(([type,title,desc,time,action])=>`
        <div style="display:flex;align-items:flex-start;gap:12px;padding:14px 20px;border-bottom:1px solid rgba(45,63,90,0.3)">
          <div style="width:34px;height:34px;border-radius:9px;background:${type==='critical'?'rgba(231,76,60,0.15)':type==='warning'?'rgba(243,156,18,0.15)':'rgba(9,132,227,0.15)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px">
            <i class="fas fa-${type==='critical'?'times-circle':type==='warning'?'exclamation-triangle':'info-circle'}" style="color:${type==='critical'?'var(--danger)':type==='warning'?'var(--warning)':'var(--info)'};font-size:14px"></i>
          </div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:600;color:white;margin-bottom:3px">${title}</div>
            <div style="font-size:12px;color:var(--text-muted)">${desc} • ${time}</div>
          </div>
          <button class="btn btn-xs btn-outline" onclick="showToast('${action} action triggered','info')" style="white-space:nowrap">${action}</button>
        </div>`).join('')}
      </div>
    </div>

    <!-- Quick actions panel -->
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card">
        <div class="card-header">
          <div class="card-title"><i class="fas fa-bolt" style="color:#fdcb6e"></i> Admin Quick Actions</div>
        </div>
        <div class="card-body">
          <div style="display:flex;flex-direction:column;gap:8px">
            ${[
              ['Broadcast to All Tenants','megaphone','var(--primary)'],
              ['Emergency Pause All Sends','pause-circle','var(--danger)'],
              ['Bulk Issue Credits','coins','var(--wa-green)'],
              ['Export Platform Report','file-excel','var(--info)'],
              ['Flush Message Queue','trash-alt','var(--warning)'],
              ['Trigger System Health Check','stethoscope','var(--accent)'],
              ['Rotate WhatsApp API Keys','key','#fdcb6e'],
              ['Send Maintenance Alert','tools','var(--text-muted)'],
            ].map(([label,ic,col])=>`
            <button style="display:flex;align-items:center;gap:10px;border:1px solid var(--border);border-radius:10px;padding:10px 12px;background:rgba(255,255,255,0.02);cursor:pointer;text-align:left;width:100%;transition:all 0.2s;color:white;font-size:12px;font-weight:600" onclick="showToast('${label}...','info')" onmouseover="this.style.background='rgba(255,255,255,0.06)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
              <i class="fas fa-${ic}" style="color:${col};width:16px;text-align:center"></i> ${label}
            </button>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Add Reseller Modal -->
<div class="modal-overlay" id="addResellerModal">
  <div class="modal" style="max-width:500px">
    <div class="modal-header">
      <div class="modal-title"><i class="fas fa-handshake" style="color:var(--accent)"></i> Add New Reseller</div>
      <button class="modal-close" onclick="closeModal('addResellerModal')"><i class="fas fa-times"></i></button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div class="form-group">
          <label class="form-label">Company Name</label>
          <input type="text" class="form-control" placeholder="Reseller company name">
        </div>
        <div class="form-group">
          <label class="form-label">Contact Person</label>
          <input type="text" class="form-control" placeholder="Primary contact">
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" placeholder="reseller@company.com">
        </div>
        <div class="form-group">
          <label class="form-label">Phone</label>
          <input type="text" class="form-control" placeholder="+91 98765 43210">
        </div>
        <div class="form-group">
          <label class="form-label">Target Region</label>
          <select class="form-control">
            <option>Pan India</option>
            <option>North India</option>
            <option>South India</option>
            <option>East India</option>
            <option>West India</option>
            <option>International</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Initial Commission Tier</label>
          <select class="form-control">
            <option>Bronze (10%)</option>
            <option>Silver (14%)</option>
            <option>Gold (18%)</option>
            <option>Platinum (22%)</option>
          </select>
        </div>
        <div class="form-group" style="grid-column:span 2">
          <label class="form-label">Notes / Agreement</label>
          <textarea class="form-control" rows="3" placeholder="Partnership terms, target sectors, etc."></textarea>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('addResellerModal')">Cancel</button>
      <button class="btn btn-primary" onclick="closeModal('addResellerModal');showToast('Reseller added! Credentials sent via email.','success')"><i class="fas fa-paper-plane"></i> Add & Activate</button>
    </div>
  </div>
</div>

`, 'superadmin', 'Super Admin', 'Platform owner control — tenants, resellers, billing & infrastructure', ``, `
function refreshHealth() {
  showToast('Health check running...', 'info');
  setTimeout(() => showToast('All systems operational!', 'success'), 1500);
}
`)
