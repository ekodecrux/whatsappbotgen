import { pageShell } from './layout'

export const verticalsHTML = () => pageShell(`
<!-- Hero Banner -->
<div style="background:linear-gradient(135deg,rgba(108,92,231,0.18) 0%,rgba(0,206,201,0.10) 50%,rgba(37,211,102,0.12) 100%);border:1px solid rgba(108,92,231,0.25);border-radius:20px;padding:36px;margin-bottom:28px;position:relative;overflow:hidden">
  <div style="position:absolute;top:-40px;right:-40px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(37,211,102,0.12),transparent);pointer-events:none"></div>
  <div style="position:absolute;bottom:-30px;left:30%;width:150px;height:150px;border-radius:50%;background:radial-gradient(circle,rgba(108,92,231,0.1),transparent);pointer-events:none"></div>
  <div style="position:relative">
    <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(37,211,102,0.12);border:1px solid rgba(37,211,102,0.3);color:var(--wa-green);padding:5px 14px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px">
      <i class="fas fa-building"></i> Enterprise & Institutional Edition
    </div>
    <h1 style="font-size:clamp(22px,3vw,34px);font-weight:900;color:white;margin-bottom:12px;line-height:1.2">
      WhatsApp Notification Infrastructure<br>
      <span style="background:linear-gradient(135deg,var(--wa-green),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">for Schools, Colleges & Corporates</span>
    </h1>
    <p style="font-size:14px;color:#94a3b8;max-width:600px;line-height:1.7;margin-bottom:24px">
      Send <strong style="color:white">10,000+ messages/day</strong> without spam risk. Plug directly into SAP, Tally, Oracle, Zoho, or any custom ERP. Official Meta API with intelligent batching, rate control, and quality scoring.
    </p>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <a href="/edu-dashboard" class="btn btn-success"><i class="fas fa-graduation-cap"></i> Education Suite</a>
      <a href="/corp-dashboard" class="btn btn-primary"><i class="fas fa-building"></i> Corporate Suite</a>
      <a href="/erp-integrations" class="btn btn-outline"><i class="fas fa-database"></i> ERP Connect</a>
      <a href="/delivery-engine" class="btn btn-outline"><i class="fas fa-rocket"></i> Delivery Engine</a>
    </div>
  </div>
</div>

<!-- Key Differentiators -->
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-bottom:28px">
  ${[
    ['fas fa-layer-group','var(--wa-green)','rgba(37,211,102,0.1)','Intelligent Batching','Auto-splits 10,000+ msgs into safe batches of 50-100 with configurable delay intervals'],
    ['fas fa-tachometer-alt','var(--primary)','rgba(108,92,231,0.1)','Rate Governor','Stays within Meta quality limits. Auto-throttles based on real-time quality score'],
    ['fas fa-shield-alt','var(--success)','rgba(0,184,148,0.1)','Spam Guard','Phone quality scoring, opt-out management, DND list check before every send'],
    ['fas fa-database','var(--accent)','rgba(0,206,201,0.1)','ERP Native','Pre-built connectors for SAP, Tally, Oracle, Zoho + REST webhook for any system'],
    ['fas fa-code-branch','#fdcb6e','rgba(253,203,110,0.1)','Event Triggers','Automatic WhatsApp on fee due, exam publish, payslip, leave approval, IT alert'],
    ['fas fa-users-cog','var(--info)','rgba(9,132,227,0.1)','Role-Based','Super admin → Institute admin → Department → Teacher/HR — full RBAC'],
  ].map(([ic,col,bg,title,desc])=>`
  <div class="card" style="border-color:${col}33">
    <div class="card-body" style="padding:20px">
      <div style="width:44px;height:44px;border-radius:12px;background:${bg};display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:14px">
        <i class="${ic}" style="color:${col}"></i>
      </div>
      <div style="font-size:13px;font-weight:700;color:white;margin-bottom:7px">${title}</div>
      <div style="font-size:12px;color:#64748b;line-height:1.6">${desc}</div>
    </div>
  </div>`).join('')}
</div>

<!-- Two Verticals Side by Side -->
<div class="grid-2" style="margin-bottom:28px">

  <!-- Education Vertical -->
  <div class="card" style="border-color:rgba(37,211,102,0.3);background:linear-gradient(135deg,rgba(37,211,102,0.05),transparent)">
    <div class="card-header" style="border-color:rgba(37,211,102,0.2)">
      <div class="card-title"><i class="fas fa-graduation-cap" style="color:var(--wa-green)"></i> Education Institutions</div>
      <a href="/edu-dashboard" class="btn btn-sm btn-success">Open Suite →</a>
    </div>
    <div class="card-body">
      <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">
        ${['Schools','Colleges','Universities','Coaching Centres','E-Learning Platforms'].map(t=>`<span class="badge badge-wa" style="font-size:10px">${t}</span>`).join('')}
      </div>
      <div style="font-size:12px;color:#64748b;margin-bottom:14px">Pre-built notification workflows for every academic event:</div>
      ${[
        ['fa-rupee-sign','Fee Reminders','Auto-trigger from ERP on due date, 3-day prior, on-day. With payment link.','var(--warning)'],
        ['fa-calendar-check','Exam Schedules','Push timetables to students+parents. Admit card download links.','var(--primary)'],
        ['fa-users','PTM / Events','Parent-Teacher Meeting invites, RSVP tracking, event reminders.','var(--accent)'],
        ['fa-user-check','Attendance Alerts','Daily absent/late SMS-replacement via WhatsApp to parents.','var(--danger)'],
        ['fa-award','Results & Reports','Automated result cards, progress reports via WhatsApp.','var(--success)'],
        ['fa-bell','General Notices','Holiday announcements, sports day, cultural events.','var(--info)'],
      ].map(([ic,t,d,c])=>`
      <div style="display:flex;gap:10px;padding:9px 0;border-bottom:1px solid rgba(45,63,90,0.4)">
        <div style="width:28px;height:28px;border-radius:7px;background:${c}22;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas ${ic}" style="color:${c};font-size:11px"></i></div>
        <div>
          <div style="font-size:12px;font-weight:700;color:white">${t}</div>
          <div style="font-size:11px;color:#64748b;margin-top:2px">${d}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- Corporate Vertical -->
  <div class="card" style="border-color:rgba(108,92,231,0.3);background:linear-gradient(135deg,rgba(108,92,231,0.05),transparent)">
    <div class="card-header" style="border-color:rgba(108,92,231,0.2)">
      <div class="card-title"><i class="fas fa-building" style="color:var(--primary)"></i> Corporate Organizations</div>
      <a href="/corp-dashboard" class="btn btn-sm btn-primary">Open Suite →</a>
    </div>
    <div class="card-body">
      <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">
        ${['SME','Enterprise','Manufacturing','BFSI','IT Companies','Retail Chains'].map(t=>`<span class="badge badge-purple" style="font-size:10px">${t}</span>`).join('')}
      </div>
      <div style="font-size:12px;color:#64748b;margin-bottom:14px">ERP-triggered notifications for every business process:</div>
      ${[
        ['fa-file-invoice','Payslips & CTC','HR system auto-sends payslips via WhatsApp. Secure, instant delivery.','var(--wa-green)'],
        ['fa-plane-departure','Leave Management','Leave apply, approve/reject notifications. Instant HR workflow.','var(--primary)'],
        ['fa-exclamation-triangle','IT Alerts','Server downtime, ticket status, system maintenance notices.','var(--danger)'],
        ['fa-chart-line','Sales Targets','Daily/weekly target vs achievement alerts to sales team.','var(--success)'],
        ['fa-clock','Shift & Roster','Shift change alerts, duty roster updates to field workers.','var(--warning)'],
        ['fa-graduation-cap','Training Reminders','L&D program invites, compliance training deadlines.','var(--accent)'],
      ].map(([ic,t,d,c])=>`
      <div style="display:flex;gap:10px;padding:9px 0;border-bottom:1px solid rgba(45,63,90,0.4)">
        <div style="width:28px;height:28px;border-radius:7px;background:${c}22;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas ${ic}" style="color:${c};font-size:11px"></i></div>
        <div>
          <div style="font-size:12px;font-weight:700;color:white">${t}</div>
          <div style="font-size:11px;color:#64748b;margin-top:2px">${d}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- Volume & Throughput Stats -->
<div class="card" style="background:linear-gradient(135deg,rgba(6,13,26,0.9),rgba(10,22,40,0.9));border-color:var(--border)">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-rocket" style="color:#fdcb6e"></i> Proven at Scale — Enterprise Numbers</div>
  </div>
  <div class="card-body">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:20px">
      ${[
        ['10,000+','msgs/hour','Official API throughput','var(--wa-green)','paper-plane'],
        ['99.2%','delivery','Verified number delivery rate','var(--success)','check-double'],
        ['0%','spam flag','Zero quality violations in 90 days','var(--accent)','shield-alt'],
        ['<2 sec','latency','Average delivery confirmation','var(--primary)','bolt'],
        ['50+','ERP types','Supported via REST + native connectors','var(--info)','database'],
        ['24×7','monitoring','Real-time queue health dashboard','#fdcb6e','heartbeat'],
      ].map(([v,unit,desc,col,ic])=>`
      <div style="text-align:center;padding:16px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid var(--border)">
        <i class="fas fa-${ic}" style="color:${col};font-size:22px;margin-bottom:10px;display:block"></i>
        <div style="font-size:26px;font-weight:900;color:${col}">${v}</div>
        <div style="font-size:12px;font-weight:700;color:white">${unit}</div>
        <div style="font-size:10px;color:#64748b;margin-top:4px">${desc}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

`, 'verticals', 'Enterprise Verticals', 'Education & Corporate WhatsApp notification infrastructure')
