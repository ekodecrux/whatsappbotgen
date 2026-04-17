import { pageShell } from './layout'

export const notificationHubHTML = () => pageShell(`

<!-- Header -->
<div style="background:linear-gradient(135deg,#f39c12,#e17055);border-radius:16px;padding:24px 28px;margin-bottom:24px;position:relative;overflow:hidden">
  <div style="position:absolute;right:-30px;top:-30px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,0.07)"></div>
  <div style="position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
    <div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <div style="width:42px;height:42px;border-radius:11px;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:20px;color:white"><i class="fas fa-bell"></i></div>
        <div>
          <div style="font-size:20px;font-weight:800;color:white">Notification Hub</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.8)">Centralized notification management for Education, Corporate & SMB</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">
        <span style="background:rgba(255,255,255,0.2);color:white;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600">📚 Academic Alerts</span>
        <span style="background:rgba(255,255,255,0.2);color:white;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600">🏢 HR Notifications</span>
        <span style="background:rgba(255,255,255,0.2);color:white;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600">💰 Finance Alerts</span>
        <span style="background:rgba(255,255,255,0.2);color:white;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600">🔧 IT / Ops Alerts</span>
      </div>
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn" style="background:white;color:#e17055;font-weight:700" onclick="openModal('newNotifModal')"><i class="fas fa-plus"></i> New Notification</button>
      <button class="btn btn-outline" style="border-color:rgba(255,255,255,0.4);color:white" onclick="openModal('scheduleModal')"><i class="fas fa-clock"></i> Schedule</button>
    </div>
  </div>
</div>

<!-- Quick Stats -->
<div class="stats-grid" style="grid-template-columns:repeat(auto-fill,minmax(175px,1fr));margin-bottom:24px">
  ${[
    ['Sent Today','24,840','messages','paper-plane','green'],
    ['Queued','8,320','pending send','clock','orange'],
    ['Delivery Rate','99.2%','this month','check-double','teal'],
    ['Failed / Retrying','42','auto-retrying','exclamation-triangle','red'],
    ['Notification Types','18','configured','list','purple'],
    ['ERP Triggers','1,240','events today','database','blue'],
  ].map(([label,val,meta,ic,color])=>`
  <div class="stat-card ${color}">
    <div class="stat-label">${label}</div>
    <div class="stat-value">${val}</div>
    <div class="stat-meta">${meta}</div>
    <i class="fas fa-${ic} stat-icon"></i>
  </div>`).join('')}
</div>

<!-- Tabs -->
<div class="tabs">
  <button class="tab-btn active" data-tab-btn="notif" onclick="switchTab('notifAll','notif')">📋 All Notifications</button>
  <button class="tab-btn" data-tab-btn="notif" onclick="switchTab('notifEdu','notif')">🎓 Education</button>
  <button class="tab-btn" data-tab-btn="notif" onclick="switchTab('notifCorp','notif')">🏢 Corporate</button>
  <button class="tab-btn" data-tab-btn="notif" onclick="switchTab('notifSmb','notif')">🏪 SMB</button>
  <button class="tab-btn" data-tab-btn="notif" onclick="switchTab('notifTemplates','notif')">📝 Templates</button>
</div>

<!-- All Notifications Tab -->
<div id="notifAll" class="tab-panel active" data-tab-group="notif">
  <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-stream" style="color:var(--primary)"></i> Live Notification Feed</div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="badge badge-success" style="font-size:10px"><i class="fas fa-circle" style="font-size:7px"></i> Live</span>
          <select class="form-control" style="width:120px;padding:5px 8px;font-size:12px">
            <option>All Types</option>
            <option>Education</option>
            <option>Corporate</option>
            <option>SMB</option>
          </select>
        </div>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table" id="notifTable">
          <thead>
            <tr><th>Notification</th><th>Type</th><th>Recipients</th><th>Source</th><th>Time</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            ${[
              ['Fee Reminder - Nov 2024','fee','Education','380 students','ERP Auto','09:00 AM','delivered'],
              ['Exam Timetable Release','exam','Education','4,800 students','Manual','10:15 AM','delivering'],
              ['Payslip October 2024','payslip','Corporate','850 employees','SAP Trigger','Queued 3PM','queued'],
              ['Leave Approved - Rakesh','leave','Corporate','1 employee','HR System','11:30 AM','delivered'],
              ['Assembly - Special Event','assembly','Education','2,400 parents','ERP Auto','07:30 AM','delivered'],
              ['System Maintenance Alert','it','Corporate','1,200 employees','IT Ops','08:00 AM','delivered'],
              ['Parent Teacher Meeting','ptm','Education','1,200 parents','Manual','Queued 2PM','queued'],
              ['Order Ready - Table 12','order','SMB','1 customer','POS Trigger','12:45 PM','delivered'],
              ['New Stock Alert - Electronics','stock','SMB','342 customers','Manual','11:00 AM','delivered'],
              ['OTP Verification','otp','All','1 customer','API Trigger','Now','delivered'],
            ].map(([title,type,vert,recip,source,time,status])=>`
            <tr>
              <td>
                <div style="font-size:13px;font-weight:600;color:white">${title}</div>
                <div style="font-size:10px;color:var(--text-muted)">${vert}</div>
              </td>
              <td><span class="badge badge-${type==='fee'||type==='payslip'?'warning':type==='exam'||type==='assembly'||type==='ptm'?'info':type==='leave'||type==='it'?'purple':'wa'}" style="font-size:10px">${type}</span></td>
              <td style="font-size:12px;color:var(--text-muted)">${recip}</td>
              <td style="font-size:11px;color:var(--text-muted)">${source}</td>
              <td style="font-size:12px;color:var(--text-muted);white-space:nowrap">${time}</td>
              <td>
                <span class="badge ${status==='delivered'?'badge-success':status==='delivering'?'badge-warning':'badge-info'}" style="font-size:10px">
                  ${status==='delivered'?'✓ Sent':status==='delivering'?'⏳ Sending':'🕐 Queued'}
                </span>
              </td>
              <td><button class="btn btn-xs btn-outline" onclick="showToast('Details for: ${title}','info')"><i class="fas fa-eye"></i></button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div style="display:flex;flex-direction:column;gap:16px">

      <!-- Quick Send -->
      <div class="card">
        <div class="card-header">
          <div class="card-title"><i class="fas fa-bolt" style="color:#fdcb6e"></i> Quick Notify</div>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">Notification Type</label>
            <select class="form-control" onchange="loadNotifTemplate(this.value)">
              <option value="">-- Select Type --</option>
              <optgroup label="Education">
                <option value="fee">Fee Reminder</option>
                <option value="exam">Exam Schedule</option>
                <option value="result">Results Published</option>
                <option value="ptm">PTM / Parent Meeting</option>
                <option value="holiday">Holiday Notice</option>
              </optgroup>
              <optgroup label="Corporate">
                <option value="payslip">Payslip Ready</option>
                <option value="leave">Leave Approval</option>
                <option value="policy">Policy Update</option>
                <option value="emergency">Emergency Alert</option>
              </optgroup>
              <optgroup label="SMB">
                <option value="order">Order Update</option>
                <option value="appt">Appointment</option>
                <option value="promo">Promotion</option>
              </optgroup>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Send To</label>
            <select class="form-control">
              <option>All Students (4,800)</option>
              <option>All Parents (2,400)</option>
              <option>All Employees (850)</option>
              <option>All Customers (342)</option>
              <option>Custom Group</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Message</label>
            <textarea class="form-control" id="quickNotifMsg" rows="4" placeholder="Select notification type to load template..."></textarea>
          </div>
          <button class="btn btn-success w-full" style="justify-content:center" onclick="sendQuickNotif()">
            <i class="fas fa-paper-plane"></i> Send Notification
          </button>
        </div>
      </div>

      <!-- Delivery queue status -->
      <div class="card">
        <div class="card-header">
          <div class="card-title"><i class="fas fa-tasks" style="color:var(--accent)"></i> Queue Status</div>
        </div>
        <div class="card-body">
          ${[
            ['Sending Now','1,200 msgs/min','var(--wa-green)',100],
            ['In Queue','8,320 messages','var(--primary)',65],
            ['Completed Today','24,840 msgs','var(--accent)',80],
            ['Failed (retrying)','42 messages','var(--danger)',5],
          ].map(([label,val,color,pct])=>`
          <div style="margin-bottom:12px">
            <div style="display:flex;justify-content:space-between;margin-bottom:5px">
              <span style="font-size:12px;color:var(--text-muted)">${label}</span>
              <span style="font-size:12px;font-weight:700;color:${color}">${val}</span>
            </div>
            <div class="progress"><div class="progress-bar" style="width:${pct}%;background:${color}"></div></div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Education Tab -->
<div id="notifEdu" class="tab-panel" data-tab-group="notif">
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px">
    ${[
      ['📋','Fee Reminder','Send fee due reminders to parents','380 parents avg','fee-reminder','warning'],
      ['📅','Exam Schedule','Share exam timetables with students','4,800 students','exam-schedule','info'],
      ['🏆','Results Published','Notify students about result availability','4,800 students','results','success'],
      ['👨‍👩‍👧','PTM Invite','Parent-Teacher Meeting invitations','2,400 parents','ptm-invite','purple'],
      ['🏖️','Holiday Notice','School holiday & closure announcements','7,200 contacts','holiday','orange'],
      ['🎓','Admission Update','Admission status and document requests','Variable','admission','blue'],
      ['📢','Assembly Notice','Special assembly or event announcements','All contacts','assembly','teal'],
      ['📝','Assignment Due','Homework and assignment deadline reminders','Per class','assignment','warning'],
      ['🚌','Transport Alert','Bus route changes, delays, driver updates','Bus riders','transport','danger'],
    ].map(([icon,name,desc,recip,id,color])=>`
    <div style="border:1px solid var(--border);border-radius:12px;padding:16px;cursor:pointer;transition:all 0.2s;background:rgba(255,255,255,0.02)" onclick="openNotifSetup('${name}')" onmouseover="this.style.borderColor='var(--info)';this.style.background='rgba(9,132,227,0.04)'" onmouseout="this.style.borderColor='var(--border)';this.style.background='rgba(255,255,255,0.02)'">
      <div style="font-size:26px;margin-bottom:8px">${icon}</div>
      <div style="font-size:13px;font-weight:700;color:white;margin-bottom:4px">${name}</div>
      <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;line-height:1.4">${desc}</div>
      <div style="font-size:10px;color:var(--info);font-weight:600"><i class="fas fa-users"></i> ${recip}</div>
    </div>`).join('')}
  </div>
</div>

<!-- Corporate Tab -->
<div id="notifCorp" class="tab-panel" data-tab-group="notif">
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px">
    ${[
      ['💰','Payslip Ready','Monthly salary slips via WhatsApp','All employees','payslip','green'],
      ['✅','Leave Approval','Instant leave approval/rejection notification','Individual','leave','success'],
      ['📋','Policy Updates','New HR policies and compliance notices','All staff','policy','purple'],
      ['🚨','Emergency Alert','Urgent company-wide announcements','All contacts','emergency','danger'],
      ['🎂','Birthday Wishes','Automated employee birthday greetings','Individual','birthday','pink'],
      ['🏆','Achievement Award','Employee recognition notifications','Individual','award','yellow'],
      ['📊','Review Reminder','Performance review schedule alerts','Managers','review','blue'],
      ['🔧','IT Maintenance','System downtime and IT support alerts','All users','it-alert','orange'],
      ['📍','Event Invite','Company event and meeting invitations','Per invite list','event','teal'],
    ].map(([icon,name,desc,recip,id,color])=>`
    <div style="border:1px solid var(--border);border-radius:12px;padding:16px;cursor:pointer;transition:all 0.2s;background:rgba(255,255,255,0.02)" onclick="openNotifSetup('${name}')" onmouseover="this.style.borderColor='var(--primary)';this.style.background='rgba(108,92,231,0.04)'" onmouseout="this.style.borderColor='var(--border)';this.style.background='rgba(255,255,255,0.02)'">
      <div style="font-size:26px;margin-bottom:8px">${icon}</div>
      <div style="font-size:13px;font-weight:700;color:white;margin-bottom:4px">${name}</div>
      <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;line-height:1.4">${desc}</div>
      <div style="font-size:10px;color:var(--primary);font-weight:600"><i class="fas fa-users"></i> ${recip}</div>
    </div>`).join('')}
  </div>
</div>

<!-- SMB Tab -->
<div id="notifSmb" class="tab-panel" data-tab-group="notif">
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px">
    ${[
      ['📦','Order Ready','Customer order pickup/delivery notification','Per customer','order','green'],
      ['📅','Appointment Reminder','Booking confirmation and reminders','Per booking','appt','blue'],
      ['🎉','Offer / Promo','Marketing offers and promotional messages','Customer list','promo','orange'],
      ['💳','Payment Received','Payment confirmation message','Per transaction','payment','success'],
      ['⭐','Feedback Request','Post-service review request','Per customer','feedback','yellow'],
      ['🔔','Restock Alert','Notify when out-of-stock items are back','Interested customers','restock','teal'],
      ['🏷️','Bill / Invoice','Send digital invoice via WhatsApp','Per transaction','invoice','purple'],
      ['🎂','Birthday Offer','Special birthday discount for customers','Birthday contacts','birthday','pink'],
      ['🔁','Renewal Reminder','Subscription / membership renewal alert','Expiring soon','renewal','warning'],
    ].map(([icon,name,desc,recip,id,color])=>`
    <div style="border:1px solid var(--border);border-radius:12px;padding:16px;cursor:pointer;transition:all 0.2s;background:rgba(255,255,255,0.02)" onclick="openNotifSetup('${name}')" onmouseover="this.style.borderColor='var(--wa-green)';this.style.background='rgba(37,211,102,0.04)'" onmouseout="this.style.borderColor='var(--border)';this.style.background='rgba(255,255,255,0.02)'">
      <div style="font-size:26px;margin-bottom:8px">${icon}</div>
      <div style="font-size:13px;font-weight:700;color:white;margin-bottom:4px">${name}</div>
      <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;line-height:1.4">${desc}</div>
      <div style="font-size:10px;color:var(--wa-green);font-weight:600"><i class="fas fa-users"></i> ${recip}</div>
    </div>`).join('')}
  </div>
</div>

<!-- Templates Tab -->
<div id="notifTemplates" class="tab-panel" data-tab-group="notif">
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-file-alt" style="color:var(--primary)"></i> Notification Templates Library</div>
      <button class="btn btn-sm btn-success" onclick="showToast('Opening template editor...','info')"><i class="fas fa-plus"></i> New Template</button>
    </div>
    <div style="padding:16px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px">
      ${[
        ['Fee Reminder','Education','Hi {{parent_name}}! 💰 Fee of ₹{{amount}} for {{student_name}} ({{class}}) is due on {{date}}. Pay via: {{payment_link}}. Contact accounts: {{contact}}.','Approved','1,240 uses'],
        ['Exam Timetable','Education','📅 *Exam Schedule — {{class}}*\n\n{{subject}} → {{date}} at {{time}}\nVenue: {{hall}}\n\nAll the best! 🎓 — {{school_name}}','Approved','3,890 uses'],
        ['Payslip Notification','Corporate','Hi {{name}}! 💰 Your payslip for {{month}} is ready.\n\nNet Pay: ₹{{amount}}\nAccount: {{bank}}\n\nDownload: {{link}}\n\n— {{company_name}} HR','Approved','2,100 uses'],
        ['Leave Approval','Corporate','✅ Hi {{name}}, your leave from {{from_date}} to {{to_date}} has been *{{status}}*.\n\nReason: {{reason}}\nApproved by: {{manager}}\n\n— HR Team','Approved','4,200 uses'],
        ['Order Ready','SMB','📦 Hi {{name}}! Your order #{{order_id}} is ready.\n\nItems: {{items}}\nPickup by: {{time}}\n\nThank you for choosing {{shop_name}}! 🙏','Approved','6,800 uses'],
        ['Appointment Reminder','SMB','📅 Reminder: You have an appointment at *{{business_name}}* on {{date}} at {{time}}.\n\nAddress: {{address}}\nContact: {{phone}}\n\nReply CONFIRM or CANCEL.','Approved','3,420 uses'],
      ].map(([name,vertical,template,status,usage])=>`
      <div style="border:1px solid var(--border);border-radius:12px;overflow:hidden">
        <div style="padding:12px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:13px;font-weight:700;color:white">${name}</div>
            <div style="font-size:10px;color:var(--text-muted)">${vertical} • ${usage}</div>
          </div>
          <span class="badge badge-success" style="font-size:10px">${status}</span>
        </div>
        <div style="padding:12px 14px;background:rgba(255,255,255,0.02)">
          <div style="font-size:11px;color:var(--text-muted);font-family:monospace;line-height:1.6;white-space:pre-wrap">${template.substring(0,120)}${template.length>120?'...':''}</div>
        </div>
        <div style="padding:10px 14px;border-top:1px solid var(--border);display:flex;gap:8px">
          <button class="btn btn-xs btn-outline" onclick="showToast('Template editor opened','info')"><i class="fas fa-edit"></i> Edit</button>
          <button class="btn btn-xs btn-success" onclick="showToast('Template selected!','success')"><i class="fas fa-paper-plane"></i> Use</button>
          <button class="btn btn-xs btn-outline" onclick="copyText('${template.replace(/'/g,"\\'")}')"><i class="fas fa-copy"></i></button>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- New Notification Modal -->
<div class="modal-overlay" id="newNotifModal">
  <div class="modal" style="max-width:560px">
    <div class="modal-header">
      <div class="modal-title"><i class="fas fa-bell" style="color:var(--warning)"></i> Create Notification</div>
      <button class="modal-close" onclick="closeModal('newNotifModal')"><i class="fas fa-times"></i></button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div class="form-group">
          <label class="form-label">Notification Title</label>
          <input type="text" class="form-control" placeholder="e.g. Fee Reminder November">
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="form-control">
            <option>Education - Fee</option>
            <option>Education - Exam</option>
            <option>Corporate - HR</option>
            <option>Corporate - IT</option>
            <option>SMB - Order</option>
            <option>SMB - Promo</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Recipient Group</label>
          <select class="form-control">
            <option>All Students</option>
            <option>All Parents</option>
            <option>All Employees</option>
            <option>All Customers</option>
            <option>Custom List</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Priority</label>
          <select class="form-control">
            <option>Normal</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
        </div>
        <div class="form-group" style="grid-column:span 2">
          <label class="form-label">Message Content</label>
          <textarea class="form-control" rows="5" placeholder="Type your notification message. Use {{variable}} for personalization."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Send Time</label>
          <select class="form-control">
            <option>Send Immediately</option>
            <option>Schedule for Later</option>
            <option>Recurring</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Attach File (Optional)</label>
          <input type="file" class="form-control" style="padding:8px">
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('newNotifModal')">Cancel</button>
      <button class="btn btn-success" onclick="closeModal('newNotifModal');showToast('Notification queued successfully!','success')"><i class="fas fa-paper-plane"></i> Send Now</button>
    </div>
  </div>
</div>

`, 'notifhub', 'Notification Hub', 'Centralized notifications for Education, Corporate & SMB', `.w-full{width:100%}`, `
const notifTemplates = {
  fee: "Hi {{parent_name}}! 💰 Fee of ₹{{amount}} for {{student_name}} is due on {{date}}. Pay via: {{link}}",
  exam: "📅 Exam timetable for {{class}} is released. Check your student portal or reply TIMETABLE.",
  result: "🏆 Results for {{exam_name}} are published! {{student_name}} — Check portal: {{link}}",
  payslip: "Hi {{name}}! 💰 Your payslip for {{month}} is ready. Net: ₹{{amount}}. Download: {{link}}",
  leave: "✅ Hi {{name}}, your leave from {{from_date}} to {{to_date}} is {{status}}.",
  order: "📦 Hi {{name}}! Your order #{{id}} is ready for pickup. Thank you!",
  appt: "📅 Reminder: Appointment at {{business}} on {{date}} at {{time}}. Reply CONFIRM.",
  promo: "🎉 Hi {{name}}! Special offer: {{offer}}. Valid till {{date}}. Shop now: {{link}}",
};
function loadNotifTemplate(type) {
  const el = document.getElementById('quickNotifMsg');
  if (el && notifTemplates[type]) el.value = notifTemplates[type];
}
function sendQuickNotif() {
  showToast('Notification queued successfully!', 'success');
}
function openNotifSetup(name) {
  openModal('newNotifModal');
}
function copyText(t) {
  navigator.clipboard.writeText(t).then(() => showToast('Copied!', 'success'));
}
`)
