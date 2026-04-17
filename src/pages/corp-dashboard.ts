import { pageShell } from './layout'

export const corpDashboardHTML = () => pageShell(`
<!-- Header -->
<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:24px">
  <div style="display:flex;align-items:center;gap:14px">
    <div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:22px;color:white"><i class="fas fa-building"></i></div>
    <div>
      <h1 style="font-size:18px;font-weight:800;color:white">Corporate Suite</h1>
      <p style="font-size:12px;color:var(--text-muted)">TechCorp India Pvt. Ltd. — 1,240 Employees</p>
    </div>
    <span class="badge badge-purple" style="font-size:10px"><i class="fas fa-circle" style="font-size:7px"></i> SAP Connected</span>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap">
    <a href="/erp-integrations" class="btn btn-outline btn-sm"><i class="fas fa-plug"></i> ERP Settings</a>
    <button class="btn btn-primary" onclick="openModal('corpNotifModal')"><i class="fab fa-whatsapp"></i> Send Notification</button>
  </div>
</div>

<!-- Stats -->
<div class="stats-grid" style="margin-bottom:24px">
  ${[
    ['Total Employees','1,240','Active on WhatsApp','var(--primary)','users','purple'],
    ['Sent This Month','38,420','All departments','var(--wa-green)','paper-plane','green'],
    ['Auto-Triggered','28,200','ERP triggered','var(--accent)','bolt','blue'],
    ['Delivery Rate','99.4%','Verified numbers','var(--success)','check-double','green'],
    ['Departments','14','All connected to ERP','var(--warning)','sitemap','orange'],
    ['Pending Today','850','Payslips queued','#fdcb6e','clock','orange'],
  ].map(([l,v,m,c,ic,theme])=>`
  <div class="stat-card ${theme}">
    <div class="stat-label">${l}</div>
    <div class="stat-value" style="font-size:22px">${v}</div>
    <div class="stat-meta">${m}</div>
    <i class="fas fa-${ic} stat-icon" style="color:${c}"></i>
  </div>`).join('')}
</div>

<!-- Department Activity + HR Workflows -->
<div class="grid-2" style="margin-bottom:24px">

  <!-- Department Notification Status -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-sitemap" style="color:var(--primary)"></i> Department Activity</div>
      <button class="btn btn-sm btn-outline" onclick="showToast('Syncing from ERP...','info')"><i class="fas fa-sync"></i></button>
    </div>
    <div class="card-body" style="padding:0">
      <table class="data-table">
        <thead><tr><th>Department</th><th>Employees</th><th>Sent Today</th><th>Pending</th><th>Action</th></tr></thead>
        <tbody>
          ${[
            ['HR','45','45','0'],
            ['Finance','30','30','0'],
            ['Sales','280','280','0'],
            ['Engineering','420','200','220'],
            ['Operations','310','310','0'],
            ['Marketing','85','85','0'],
            ['Admin','70','50','20'],
          ].map(([dept,emp,sent,pend])=>`
          <tr>
            <td style="font-size:13px;font-weight:600;color:white">${dept}</td>
            <td style="font-size:12px;color:var(--text-muted)">${emp}</td>
            <td style="font-size:12px;color:var(--wa-green);font-weight:700">${sent}</td>
            <td><span class="badge ${parseInt(pend)>0?'badge-warning':'badge-success'}" style="font-size:10px">${parseInt(pend)>0?pend+' pending':'Done ✓'}</span></td>
            <td><button class="btn btn-xs btn-outline" onclick="openModal('corpNotifModal')"><i class="fab fa-whatsapp"></i></button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- HR Automation Workflows -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-cogs" style="color:var(--accent)"></i> HR Automation Workflows</div>
      <button class="btn btn-sm btn-outline" onclick="openModal('addWorkflowModal')"><i class="fas fa-plus"></i> Add</button>
    </div>
    <div class="card-body" style="padding:12px 16px">
      ${[
        {name:'Payslip Distribution',trigger:'SAP: Payroll Run',time:'1st of month, 9 AM',recipients:'All Employees',status:'active',icon:'fa-file-invoice',color:'var(--wa-green)'},
        {name:'Leave Approval',trigger:'HR Portal: Leave Status',time:'Instant on approval',recipients:'Employee',status:'active',icon:'fa-plane-departure',color:'var(--primary)'},
        {name:'Joining Welcome',trigger:'HR: New Joiner Added',time:'Day 0, 8 AM',recipients:'New Employee',status:'active',icon:'fa-handshake',color:'var(--success)'},
        {name:'Birthday Wishes',trigger:'HRMS: Date Match',time:'8 AM on birthday',recipients:'Employee',status:'active',icon:'fa-birthday-cake',color:'#fd79a8'},
        {name:'Shift Roster',trigger:'Ops ERP: Weekly publish',time:'Friday 6 PM',recipients:'Shift Workers',status:'active',icon:'fa-clock',color:'var(--warning)'},
        {name:'Training Reminder',trigger:'LMS: Course Due',time:'2 days before',recipients:'Employee',status:'paused',icon:'fa-graduation-cap',color:'var(--accent)'},
        {name:'IT Maintenance Alert',trigger:'ITSM: Ticket',time:'Instant trigger',recipients:'Affected Users',status:'active',icon:'fa-server',color:'var(--danger)'},
      ].map(w=>`
      <div style="display:flex;align-items:center;gap:10px;padding:9px;border-radius:10px;margin-bottom:3px;cursor:pointer;transition:all 0.2s" onmouseover="this.style.background='rgba(255,255,255,0.04)'" onmouseout="this.style.background='transparent'" onclick="openModal('workflowDetailModal')">
        <div style="width:32px;height:32px;border-radius:8px;background:${w.color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas ${w.icon}" style="color:${w.color};font-size:12px"></i></div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:700;color:white">${w.name}</div>
          <div style="font-size:10px;color:var(--text-muted)">${w.trigger} • ${w.time}</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:10px;color:var(--text-muted)">${w.recipients}</span>
          <label style="position:relative;display:inline-block;width:32px;height:18px;cursor:pointer" onclick="event.stopPropagation()">
            <input type="checkbox" ${w.status==='active'?'checked':''} style="opacity:0;width:0;height:0" onchange="showToast(this.checked?'Workflow activated':'Workflow paused',this.checked?'success':'info')">
            <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:${w.status==='active'?'var(--wa-green)':'var(--border)'};border-radius:9px;transition:0.3s"></span>
            <span style="position:absolute;height:14px;width:14px;left:${w.status==='active'?'16px':'2px'};bottom:2px;background:white;border-radius:50%;transition:0.3s"></span>
          </label>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- Recent Corporate Notifications + Payslip Delivery -->
<div class="grid-2" style="margin-bottom:24px">
  <!-- Recent Notifications -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-history" style="color:var(--wa-green)"></i> Recent Auto-Notifications</div>
    </div>
    <div class="card-body" style="padding:0">
      <table class="data-table">
        <thead><tr><th>Type</th><th>Sent To</th><th>Time</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            ['Leave Approved','Ravi Kumar — Engineering','11:32 AM','delivered','fa-plane-departure','var(--primary)'],
            ['Payslip Aug','Finance Dept (30)','09:00 AM','delivered','fa-file-invoice','var(--wa-green)'],
            ['IT Maintenance','All Engineering (420)','08:00 AM','delivered','fa-server','var(--danger)'],
            ['New Joiner Welcome','Ms. Priya Mehta','08:30 AM','delivered','fa-handshake','var(--success)'],
            ['Shift Roster Week 43','Operations (310)','Fri 6 PM','delivered','fa-clock','var(--warning)'],
            ['Sales Target Alert','Sales Team (280)','07:00 AM','delivered','fa-chart-line','var(--accent)'],
          ].map(([type,to,time,status,ic,col])=>`
          <tr>
            <td><div style="display:flex;align-items:center;gap:7px"><div style="width:24px;height:24px;border-radius:6px;background:${col}22;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas ${ic}" style="color:${col};font-size:9px"></i></div><span style="font-size:12px;font-weight:600;color:white;white-space:nowrap">${type}</span></div></td>
            <td style="font-size:11px;color:var(--text-muted)">${to}</td>
            <td style="font-size:11px;color:var(--text-muted);white-space:nowrap">${time}</td>
            <td><span class="badge badge-success" style="font-size:9px">✓ ${status}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Payslip Bulk Delivery Status -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-file-invoice" style="color:#fdcb6e"></i> Payslip Delivery — Aug 2024</div>
      <span class="badge badge-warning">In Queue</span>
    </div>
    <div class="card-body">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px;background:rgba(253,203,110,0.08);border:1px solid rgba(253,203,110,0.2);border-radius:12px;padding:14px">
        <div style="width:44px;height:44px;border-radius:12px;background:rgba(253,203,110,0.2);display:flex;align-items:center;justify-content:center;font-size:20px"><i class="fas fa-file-invoice" style="color:#fdcb6e"></i></div>
        <div>
          <div style="font-size:13px;font-weight:700;color:white">August 2024 Payslips</div>
          <div style="font-size:12px;color:var(--text-muted)">850 employees • SAP Triggered</div>
        </div>
        <div style="margin-left:auto;text-align:right">
          <div style="font-size:18px;font-weight:800;color:#fdcb6e">0 / 850</div>
          <div style="font-size:10px;color:var(--text-muted)">Scheduled 3:30 PM</div>
        </div>
      </div>

      <!-- Batch Progress -->
      <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.8px">Batch Queue (17 batches × 50)</div>
      ${Array.from({length:6},(_,i)=>`
      <div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid rgba(45,63,90,0.3)">
        <span style="font-size:11px;color:var(--text-muted);width:60px">Batch ${i+1}</span>
        <div style="flex:1;height:6px;background:var(--border);border-radius:3px;overflow:hidden"><div style="height:100%;background:${i<2?'var(--wa-green)':i===2?'linear-gradient(90deg,var(--wa-green) 60%,var(--border) 60%)':'var(--border)'};border-radius:3px;width:${i<2?'100%':i===2?'60%':'0%'}"></div></div>
        <span style="font-size:11px;${i<2?'color:var(--wa-green)':i===2?'color:var(--warning)':'color:var(--text-muted)'};width:70px;text-align:right">${i<2?'50/50 ✓':i===2?'30/50...':'Queued'}</span>
      </div>`).join('')}
      <div style="font-size:11px;color:var(--text-muted);margin-top:10px;text-align:center">+ 11 more batches waiting...</div>
    </div>
  </div>
</div>

<!-- Corporate Send Notification Modal -->
<div id="corpNotifModal" class="modal-overlay">
  <div class="modal" style="max-width:560px">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-building" style="color:var(--primary);margin-right:8px"></i>Send Corporate Notification</span>
      <button class="modal-close" onclick="closeModal('corpNotifModal')">×</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Notification Type</label>
        <select class="form-control" onchange="loadCorpTemplate(this.value)">
          <option>Select type...</option>
          <option value="payslip">💰 Payslip / Salary</option>
          <option value="leave">✈️ Leave Update</option>
          <option value="it">🖥️ IT Alert</option>
          <option value="sales">📈 Sales Target</option>
          <option value="training">📚 Training / L&D</option>
          <option value="general">📢 General Announcement</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Recipients</label>
        <select class="form-control">
          <option>All Employees (1,240)</option>
          <option>By Department</option>
          <option>By Location</option>
          <option>Custom List</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Message</label>
        <textarea class="form-control" id="corpMsg" rows="4" placeholder="Select notification type..."></textarea>
      </div>
      <div style="background:rgba(108,92,231,0.08);border:1px solid rgba(108,92,231,0.2);border-radius:10px;padding:12px;font-size:12px;color:#94a3b8;display:flex;gap:8px">
        <i class="fas fa-shield-alt" style="color:var(--primary);flex-shrink:0"></i>
        <span>Batch delivery: 1,240 msgs → 25 batches of 50 with 3s gap. Estimated: ~3 min. Delivery rate maintained above quality threshold.</span>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('corpNotifModal')">Cancel</button>
      <button class="btn btn-primary" onclick="closeModal('corpNotifModal');showToast('Corporate notification queued!','success')">
        <i class="fas fa-paper-plane"></i> Send Now
      </button>
    </div>
  </div>
</div>

<!-- Add Workflow Modal -->
<div id="addWorkflowModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-plus-circle" style="color:var(--accent);margin-right:8px"></i>Add Automation Workflow</span>
      <button class="modal-close" onclick="closeModal('addWorkflowModal')">×</button>
    </div>
    <div class="modal-body">
      <div class="form-group"><label class="form-label">Workflow Name</label><input class="form-control" placeholder="e.g., Promotion Congratulations"></div>
      <div class="form-group">
        <label class="form-label">ERP Trigger Event</label>
        <select class="form-control">
          <option>SAP: Payroll Run Complete</option>
          <option>SAP: Leave Status Change</option>
          <option>SAP: New Employee Added</option>
          <option>Salesforce: Opportunity Won</option>
          <option>ITSM: Ticket Created</option>
          <option>Custom Webhook Event</option>
        </select>
      </div>
      <div class="form-group"><label class="form-label">WhatsApp Template</label><select class="form-control"><option>payslip_notification</option><option>leave_approved</option><option>welcome_new_joiner</option><option>create_new</option></select></div>
      <div class="form-group"><label class="form-label">Delivery Timing</label><select class="form-control"><option>Instant (on trigger)</option><option>Scheduled: Specific Time</option><option>Delay: X minutes after trigger</option></select></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('addWorkflowModal')">Cancel</button>
      <button class="btn btn-success" onclick="closeModal('addWorkflowModal');showToast('Workflow created and active!','success')"><i class="fas fa-check"></i> Create Workflow</button>
    </div>
  </div>
</div>

<!-- Workflow Detail Modal -->
<div id="workflowDetailModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-file-invoice" style="color:#fdcb6e;margin-right:8px"></i>Payslip Distribution — Details</span>
      <button class="modal-close" onclick="closeModal('workflowDetailModal')">×</button>
    </div>
    <div class="modal-body">
      ${[['ERP Source','SAP S/4HANA — Payroll Module'],['Trigger Event','payroll_run_complete'],['Frequency','Monthly — 1st of each month'],['Recipients','All active employees'],['Template','payslip_notification_v2'],['Last Run','Sep 1 2024 — 1,240 sent, 1,236 delivered'],['Next Run','Nov 1 2024 — 09:00 AM'],['Batch Config','50 msgs/batch, 2s delay']].map(([k,v])=>`
      <div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid rgba(45,63,90,0.4);font-size:12px">
        <span style="color:var(--text-muted)">${k}</span>
        <span style="color:white;font-weight:600">${v}</span>
      </div>`).join('')}
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('workflowDetailModal')">Close</button>
      <button class="btn btn-primary" onclick="closeModal('workflowDetailModal');showToast('Editing workflow...','info')"><i class="fas fa-edit"></i> Edit Workflow</button>
    </div>
  </div>
</div>

`, 'corp', 'Corporate Suite', 'HR, Payroll & Operations WhatsApp automation', '', `
const corpTemplates = {
  payslip: 'Dear {{employee_name}},\\n\\n💰 Your *August 2024 Payslip* is ready.\\n\\nNet Pay: ₹{{net_salary}}\\n\\nView/Download: {{payslip_link}}\\n\\nFor queries: hr@techcorp.com\\n\\nTechCorp HR Team',
  leave: 'Dear {{employee_name}},\\n\\nYour leave request from *{{from_date}}* to *{{to_date}}* has been *{{status}}*.\\n\\n{{reason}}\\n\\nManager: {{manager_name}}\\nHR Portal: https://hr.techcorp.com',
  it: '⚠️ *IT Alert — TechCorp*\\n\\n*Affected:* {{affected_system}}\\n*Status:* {{status}}\\n*Time:* {{time}}\\n\\n{{message}}\\n\\nUpdates: https://status.techcorp.com\\nITSM Ticket: #{{ticket_id}}',
  sales: '📊 *Daily Sales Update — {{date}}*\\n\\nTeam: {{team_name}}\\nTarget: ₹{{target}}\\nAchieved: ₹{{achieved}} ({{percentage}}%)\\n\\n{{message}}\\n\\nKeep pushing! 💪',
  training: '📚 *Training Reminder*\\n\\nDear {{name}},\\n\\n*{{course_name}}* is due on {{due_date}}.\\n\\nStart now: {{lms_link}}\\n\\nHR - L&D Team',
  general: 'Dear Team,\\n\\n📢 *Important Announcement*\\n\\n{{message}}\\n\\nDate: {{date}}\\n\\nRegards,\\nManagement — TechCorp',
};
function loadCorpTemplate(val) {
  const el = document.getElementById('corpMsg');
  if (el && corpTemplates[val]) el.value = corpTemplates[val];
}
`)
