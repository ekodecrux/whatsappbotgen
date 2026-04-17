import { pageShell } from './layout'

export const analyticsHTML = () => pageShell(`
<!-- Header -->
<div class="flex-between mb-6">
  <div>
    <h2 style="font-size:16px;font-weight:700;color:white">Analytics & Reports</h2>
    <p style="font-size:12px;color:var(--text-muted)">Real-time insights across all your WhatsApp activities</p>
  </div>
  <div style="display:flex;gap:8px;align-items:center">
    <select class="form-control" style="width:160px;padding:7px 12px;font-size:12px">
      <option>Last 7 Days</option>
      <option>Last 30 Days</option>
      <option>This Month</option>
      <option>Last 3 Months</option>
      <option>Custom Range</option>
    </select>
    <button class="btn btn-outline btn-sm"><i class="fas fa-download"></i> Export PDF</button>
  </div>
</div>

<!-- Key Metrics -->
<div class="stats-grid" style="margin-bottom:24px">
  ${[
    ['Messages Sent','284,912','+12.4%','up','var(--wa-green)','paper-plane','green'],
    ['Delivery Rate','98.4%','+0.2%','up','var(--success)','check-double','green'],
    ['Open Rate','73.2%','+5.1%','up','var(--primary)','eye','purple'],
    ['Reply Rate','41.8%','+8.3%','up','var(--accent)','reply','blue'],
    ['Leads Generated','1,293','+23 today','up','var(--warning)','user-plus','orange'],
    ['Revenue Influenced','₹18.4L','+32% MoM','up','#fdcb6e','rupee-sign','orange'],
  ].map(([l,v,c,dir,col,ic,theme])=>`
  <div class="stat-card ${theme}">
    <div class="stat-label">${l}</div>
    <div class="stat-value">${v}</div>
    <div class="stat-meta"><span class="stat-change up"><i class="fas fa-arrow-up"></i> ${c}</span></div>
    <i class="fas fa-${ic} stat-icon"></i>
  </div>`).join('')}
</div>

<!-- Charts Grid -->
<div class="grid-2" style="margin-bottom:24px">
  <!-- Message Volume Chart -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-chart-bar" style="color:var(--wa-green)"></i> Message Volume — 7 Days</div>
    </div>
    <div class="card-body">
      <div style="display:flex;align-items:flex-end;gap:8px;height:120px;margin-bottom:12px" id="barChart">
        ${[
          ['Mon',65,42312],['Tue',48,31245],['Wed',82,53421],
          ['Thu',71,46231],['Fri',90,58932],['Sat',55,35841],['Sun',100,65234]
        ].map(([day,pct,val])=>`
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px">
          <div style="font-size:11px;color:var(--wa-green);font-weight:700">${(val/1000).toFixed(0)}K</div>
          <div style="width:100%;border-radius:4px 4px 0 0;background:linear-gradient(180deg,var(--wa-green),var(--wa-teal));opacity:${0.5+pct*0.005};height:${pct}%;min-height:4px;transition:all 1s"></div>
          <div style="font-size:10px;color:var(--text-muted)">${day}</div>
        </div>`).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted)">
        <span>Total this week: <strong style="color:var(--wa-green)">333,216</strong></span>
        <span>Avg/day: <strong style="color:white">47,602</strong></span>
      </div>
    </div>
  </div>

  <!-- Funnel -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-filter" style="color:var(--primary)"></i> Campaign Funnel</div>
    </div>
    <div class="card-body">
      ${[
        ['Sent','284,912','100%','var(--primary)'],
        ['Delivered','280,434','98.4%','var(--wa-teal)'],
        ['Opened','208,416','73.2%','var(--wa-green)'],
        ['Clicked','84,128','29.5%','var(--accent)'],
        ['Replied','119,132','41.8%','var(--info)'],
        ['Converted','23,890','8.4%','#fdcb6e'],
      ].map(([label, val, pct, col], i)=>`
      <div style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;margin-bottom:5px;font-size:12px">
          <span style="color:var(--text-muted)">${label}</span>
          <span style="color:white;font-weight:700">${val} <span style="color:${col};">(${pct})</span></span>
        </div>
        <div class="progress" style="height:8px">
          <div class="progress-bar" style="width:${pct};background:${col}"></div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- Performance by Campaign -->
<div class="card" style="margin-bottom:24px">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-bullhorn" style="color:var(--primary)"></i> Campaign Performance</div>
  </div>
  <table class="data-table">
    <thead>
      <tr>
        <th>Campaign</th>
        <th>Sent</th>
        <th>Delivery</th>
        <th>Open Rate</th>
        <th>Reply Rate</th>
        <th>Leads</th>
        <th>Revenue</th>
        <th>ROI</th>
      </tr>
    </thead>
    <tbody>
      ${[
        ['Diwali Sale 2024','8,420','98.8%','76.4%','44.2%','342','₹4.2L','380%'],
        ['New Product Launch','12,000','97.9%','71.2%','38.9%','189','₹2.1L','210%'],
        ['Re-engagement','4,500','99.1%','68.3%','35.1%','89','₹98K','145%'],
        ['Flash Sale Weekend','3,200','98.4%','82.1%','51.3%','156','₹1.8L','320%'],
      ].map(([name,sent,del,open,reply,leads,rev,roi])=>`
      <tr>
        <td style="font-size:13px;font-weight:700;color:white">${name}</td>
        <td style="font-size:13px">${sent}</td>
        <td><span style="color:var(--wa-green);font-weight:700">${del}</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:6px">
            <div class="progress" style="flex:1"><div class="progress-bar green" style="width:${open}"></div></div>
            <span style="font-size:11px;color:var(--primary)">${open}</span>
          </div>
        </td>
        <td>
          <div style="display:flex;align-items:center;gap:6px">
            <div class="progress" style="flex:1"><div class="progress-bar purple" style="width:${reply}"></div></div>
            <span style="font-size:11px;color:var(--accent)">${reply}</span>
          </div>
        </td>
        <td style="font-size:13px;color:var(--warning);font-weight:700">${leads}</td>
        <td style="font-size:13px;color:var(--wa-green);font-weight:700">${rev}</td>
        <td><span class="badge badge-success">${roi}</span></td>
      </tr>`).join('')}
    </tbody>
  </table>
</div>

<!-- Bottom Row -->
<div class="grid-2">
  <!-- Time Analysis -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-clock" style="color:var(--accent)"></i> Best Time to Send</div>
    </div>
    <div class="card-body">
      <div style="display:flex;align-items:flex-end;gap:4px;height:80px;margin-bottom:12px">
        ${[
          [6,15],[7,35],[8,62],[9,78],[10,92],[11,85],[12,70],
          [13,65],[14,60],[15,55],[16,68],[17,75],[18,88],[19,95],
          [20,82],[21,60],[22,40],[23,20]
        ].map(([h,p])=>`
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px" title="${h}:00 - ${p}% engagement">
          <div style="width:100%;border-radius:2px 2px 0 0;background:${p>=80?'var(--wa-green)':p>=60?'var(--primary)':'var(--border)'};height:${p}%;min-height:2px"></div>
          <div style="font-size:8px;color:var(--text-muted)">${h}</div>
        </div>`).join('')}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">
        <div style="background:rgba(37,211,102,0.1);border:1px solid rgba(37,211,102,0.2);border-radius:8px;padding:8px 12px;font-size:12px;color:var(--wa-green);font-weight:700">
          🏆 Best: 7-8 PM (95% eng.)
        </div>
        <div style="background:rgba(108,92,231,0.1);border:1px solid rgba(108,92,231,0.2);border-radius:8px;padding:8px 12px;font-size:12px;color:var(--primary);font-weight:700">
          🥈 Good: 10-11 AM (92%)
        </div>
      </div>
    </div>
  </div>

  <!-- Lead Sources -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-chart-pie" style="color:var(--warning)"></i> Lead Sources</div>
    </div>
    <div class="card-body">
      ${[
        ['Smart Posters','342','26.4%','var(--danger)'],
        ['Bulk Campaigns','289','22.3%','var(--wa-green)'],
        ['Website Widget','198','15.3%','var(--primary)'],
        ['QR Codes','156','12.1%','var(--info)'],
        ['Bot Flows','189','14.6%','var(--accent)'],
        ['Referrals','119','9.2%','#fdcb6e'],
      ].map(([src,count,pct,col])=>`
      <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(45,63,90,0.4)">
        <div style="width:10px;height:10px;border-radius:50%;background:${col};flex-shrink:0"></div>
        <span style="flex:1;font-size:12px;color:var(--text)">${src}</span>
        <span style="font-size:12px;font-weight:700;color:white">${count}</span>
        <div style="width:80px">
          <div class="progress"><div class="progress-bar" style="width:${pct};background:${col}"></div></div>
        </div>
        <span style="font-size:11px;color:var(--text-muted);width:36px;text-align:right">${pct}</span>
      </div>`).join('')}
    </div>
  </div>
</div>

`, 'analytics', 'Analytics', 'Deep insights into your WhatsApp marketing performance')
