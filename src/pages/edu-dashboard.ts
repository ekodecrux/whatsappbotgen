import { pageShell } from './layout'

export const eduDashboardHTML = () => pageShell(`
<!-- Header -->
<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:24px">
  <div style="display:flex;align-items:center;gap:14px">
    <div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,var(--wa-green),var(--wa-teal));display:flex;align-items:center;justify-content:center;font-size:22px;color:white"><i class="fas fa-graduation-cap"></i></div>
    <div>
      <h1 style="font-size:18px;font-weight:800;color:white">Education Suite</h1>
      <p style="font-size:12px;color:var(--text-muted)">Delhi Public School, Noida — Session 2024-25</p>
    </div>
    <span class="badge badge-success" style="font-size:10px"><i class="fas fa-circle" style="font-size:7px"></i> ERP Connected</span>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap">
    <button class="btn btn-outline btn-sm" onclick="openModal('importStudentsModal')"><i class="fas fa-upload"></i> Import from ERP</button>
    <button class="btn btn-success" onclick="openModal('sendNotifModal')"><i class="fab fa-whatsapp"></i> Send Notification</button>
  </div>
</div>

<!-- Stats -->
<div class="stats-grid" style="margin-bottom:24px">
  ${[
    ['Total Recipients','5,842','Students + Parents','var(--wa-green)','users','green'],
    ['Sent Today','4,800','Exam Schedule batch','var(--primary)','paper-plane','purple'],
    ['Delivery Rate','99.2%','Last 30 days avg','var(--success)','check-double','green'],
    ['Pending Queue','1,200','PTM invites — 2 PM','var(--warning)','clock','orange'],
    ['Opt-Out Rate','0.3%','Well within Meta limit','var(--accent)','user-times','blue'],
    ['Credits Used','48,200','This month','#fdcb6e','coins','orange'],
  ].map(([l,v,m,c,ic,theme])=>`
  <div class="stat-card ${theme}">
    <div class="stat-label">${l}</div>
    <div class="stat-value" style="font-size:22px">${v}</div>
    <div class="stat-meta">${m}</div>
    <i class="fas fa-${ic} stat-icon" style="color:${c}"></i>
  </div>`).join('')}
</div>

<!-- Main Grid -->
<div class="grid-2" style="margin-bottom:24px">

  <!-- Notification Categories -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-bell" style="color:var(--wa-green)"></i> Notification Categories</div>
      <a href="/notification-hub" class="btn btn-sm btn-outline">All Notifs</a>
    </div>
    <div class="card-body" style="padding:12px 16px">
      ${[
        {type:'Fee Reminder',icon:'fa-rupee-sign',color:'var(--warning)',count:380,auto:true,last:'2 hrs ago',status:'active'},
        {type:'Exam Schedule',icon:'fa-calendar-alt',color:'var(--primary)',count:4800,auto:false,last:'Today 10 AM',status:'sending'},
        {type:'Attendance Alert',icon:'fa-user-check',color:'var(--danger)',count:42,auto:true,last:'8:30 AM',status:'active'},
        {type:'PTM Invite',icon:'fa-users',color:'var(--accent)',count:1200,auto:false,last:'Scheduled 2 PM',status:'queued'},
        {type:'Result / Report Card',icon:'fa-award',color:'var(--success)',count:0,auto:false,last:'Not scheduled',status:'idle'},
        {type:'General Notice',icon:'fa-bullhorn',color:'var(--info)',count:0,auto:false,last:'Yesterday',status:'idle'},
      ].map(n=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px;border-radius:10px;margin-bottom:4px;cursor:pointer;transition:all 0.2s" onmouseover="this.style.background='rgba(255,255,255,0.04)'" onmouseout="this.style.background='transparent'" onclick="openModal('sendNotifModal')">
        <div style="width:36px;height:36px;border-radius:10px;background:${n.color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas ${n.icon}" style="color:${n.color};font-size:14px"></i></div>
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:7px">
            <span style="font-size:13px;font-weight:600;color:white">${n.type}</span>
            ${n.auto?'<span class="badge badge-wa" style="font-size:9px">AUTO</span>':''}
          </div>
          <div style="font-size:11px;color:var(--text-muted)">${n.last}</div>
        </div>
        ${n.count>0?`<span style="font-size:13px;font-weight:800;color:${n.color}">${n.count.toLocaleString()}</span>`:''}
        <span class="badge ${n.status==='active'?'badge-success':n.status==='sending'?'badge-info':n.status==='queued'?'badge-warning':'badge-danger'}" style="font-size:9px">${n.status}</span>
      </div>`).join('')}
    </div>
  </div>

  <!-- Department / Class Groups -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-sitemap" style="color:var(--primary)"></i> Class & Group Management</div>
      <button class="btn btn-sm btn-outline" onclick="showToast('Syncing from ERP...','info')"><i class="fas fa-sync"></i> Sync ERP</button>
    </div>
    <div class="card-body" style="padding:0">
      <table class="data-table">
        <thead>
          <tr><th>Class / Group</th><th>Students</th><th>Parents</th><th>Teacher</th><th>Send</th></tr>
        </thead>
        <tbody>
          ${[
            ['Class X - A','38','72','Mrs. Sharma'],
            ['Class X - B','40','74','Mr. Verma'],
            ['Class XI - Science','42','80','Dr. Rao'],
            ['Class XII - Commerce','36','68','Mrs. Gupta'],
            ['Staff Group','124','—','Principal'],
            ['All Parents','—','2,840','Admin'],
          ].map(([cls,stu,par,teacher])=>`
          <tr>
            <td style="font-size:13px;font-weight:600;color:white">${cls}</td>
            <td style="font-size:12px;color:var(--wa-green)">${stu}</td>
            <td style="font-size:12px;color:var(--primary)">${par}</td>
            <td style="font-size:12px;color:var(--text-muted)">${teacher}</td>
            <td><button class="btn btn-xs btn-success" onclick="openModal('sendNotifModal')"><i class="fab fa-whatsapp"></i> Send</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Recent Notifications -->
<div class="card" style="margin-bottom:24px">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-history" style="color:var(--accent)"></i> Recent Notifications</div>
    <a href="/notification-hub" class="btn btn-sm btn-outline">View All</a>
  </div>
  <table class="data-table" id="eduNotifTable">
    <thead>
      <tr><th>Type</th><th>Message Preview</th><th>Recipients</th><th>Delivery</th><th>Sent At</th><th>Source</th><th>Status</th></tr>
    </thead>
    <tbody>
      ${[
        {type:'Attendance Alert',icon:'fa-user-check',col:'var(--danger)',msg:'Dear Parent, Your ward Rahul was absent on 17-Oct-2024. Please contact...','recv':42,del:'100%',time:'8:30 AM',src:'Auto - ERP',status:'delivered'},
        {type:'Fee Reminder',icon:'fa-rupee-sign',col:'var(--warning)',msg:'Dear Parent, Fee of ₹12,500 for Class X is due on 20-Oct-2024. Pay at...','recv':380,del:'99.2%',time:'9:00 AM',src:'Auto - ERP',status:'delivered'},
        {type:'Exam Schedule',icon:'fa-calendar-alt',col:'var(--primary)',msg:'Dear Student, Half-Yearly Exam schedule: Physics 21-Oct, Chemistry 22-Oct...','recv':4800,del:'72%',time:'10:15 AM',src:'Manual',status:'sending'},
        {type:'PTM Invite',icon:'fa-users',col:'var(--accent)',msg:'Dear Parent, Parent-Teacher Meeting is scheduled on 25-Oct-2024 at 10 AM...','recv':1200,del:'—',time:'2:00 PM',src:'Manual',status:'queued'},
      ].map(n=>`
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:7px">
            <div style="width:26px;height:26px;border-radius:7px;background:${n.col}22;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas ${n.icon}" style="color:${n.col};font-size:10px"></i></div>
            <span style="font-size:12px;font-weight:600;color:white;white-space:nowrap">${n.type}</span>
          </div>
        </td>
        <td style="max-width:240px"><div style="font-size:11px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n.msg}</div></td>
        <td style="font-size:13px;font-weight:700;color:${n.col}">${n.recv.toLocaleString()}</td>
        <td style="font-size:12px;color:var(--wa-green);font-weight:700">${n.del}</td>
        <td style="font-size:12px;color:var(--text-muted);white-space:nowrap">${n.time}</td>
        <td><span class="badge ${n.src.startsWith('Auto')?'badge-wa':'badge-info'}" style="font-size:9px">${n.src}</span></td>
        <td><span class="badge ${n.status==='delivered'?'badge-success':n.status==='sending'?'badge-info':'badge-warning'}">${n.status}</span></td>
      </tr>`).join('')}
    </tbody>
  </table>
</div>

<!-- ERP Connection Status -->
<div class="card">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-database" style="color:var(--primary)"></i> ERP Integration Status</div>
    <a href="/erp-integrations" class="btn btn-sm btn-outline"><i class="fas fa-plug"></i> Manage ERP</a>
  </div>
  <div class="card-body">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px">
      ${[
        {name:'Fedena School ERP',type:'Education ERP',status:'connected',events:'Fee, Attendance, Exam, Result',lastSync:'2 min ago',color:'var(--wa-green)'},
        {name:'Tally Prime',type:'Accounts',status:'connected',events:'Fee payment confirmation, receipts',lastSync:'15 min ago',color:'var(--success)'},
        {name:'Custom REST API',type:'Webhook',status:'connected',events:'Any event via POST webhook',lastSync:'Live',color:'var(--accent)'},
      ].map(e=>`
      <div style="background:rgba(255,255,255,0.03);border:1px solid ${e.color}33;border-radius:12px;padding:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div style="font-size:13px;font-weight:700;color:white">${e.name}</div>
          <span class="badge badge-success" style="font-size:9px">● ${e.status}</span>
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px"><i class="fas fa-bolt" style="color:${e.color};margin-right:4px"></i>${e.events}</div>
        <div style="font-size:10px;color:var(--text-muted)"><i class="fas fa-sync" style="margin-right:4px"></i>Last sync: ${e.lastSync}</div>
      </div>`).join('')}
      <div style="border:2px dashed var(--border);border-radius:12px;padding:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;cursor:pointer;min-height:100px" onclick="window.location='/erp-integrations'">
        <i class="fas fa-plus-circle" style="font-size:22px;color:var(--primary);opacity:0.5"></i>
        <div style="font-size:12px;color:var(--text-muted);text-align:center">Add ERP Connection</div>
      </div>
    </div>
  </div>
</div>

<!-- Send Notification Modal -->
<div id="sendNotifModal" class="modal-overlay">
  <div class="modal" style="max-width:560px">
    <div class="modal-header">
      <span class="modal-title"><i class="fab fa-whatsapp" style="color:var(--wa-green);margin-right:8px"></i>Send School Notification</span>
      <button class="modal-close" onclick="closeModal('sendNotifModal')">×</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Notification Type</label>
        <select class="form-control" id="notifType" onchange="updateTemplate(this.value)">
          <option value="">Select type...</option>
          <option value="fee">💰 Fee Reminder</option>
          <option value="exam">📅 Exam Schedule</option>
          <option value="attendance">✅ Attendance Alert</option>
          <option value="ptm">👨‍👩‍👧 PTM Invite</option>
          <option value="result">🏆 Result / Report Card</option>
          <option value="holiday">🎉 Holiday / Notice</option>
          <option value="custom">✏️ Custom Message</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Send To</label>
        <select class="form-control">
          <option>All Students & Parents (5,842)</option>
          <option>All Parents only (2,840)</option>
          <option>Class X (380)</option>
          <option>Class XI Science (42)</option>
          <option>Staff (124)</option>
          <option>Custom Selection</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Message (WhatsApp Template)</label>
        <textarea class="form-control" rows="4" id="notifMsg" placeholder="Select notification type to load template..."></textarea>
        <div style="font-size:11px;color:var(--text-muted);margin-top:5px">Variables: {{student_name}}, {{class}}, {{fee_amount}}, {{due_date}}, {{date}}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group">
          <label class="form-label">Schedule</label>
          <select class="form-control">
            <option>Send Now</option>
            <option>Schedule Later</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Language</label>
          <select class="form-control"><option>English</option><option>Hindi</option><option>Both</option></select>
        </div>
      </div>
      <div style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:12px;font-size:12px;color:#94a3b8;display:flex;gap:8px">
        <i class="fas fa-shield-alt" style="color:var(--wa-green);margin-top:2px;flex-shrink:0"></i>
        <span>Messages will be batched (50/batch with 2s delay) to maintain Meta quality score. Estimated delivery: ~4 min for 5,842 recipients.</span>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('sendNotifModal')">Cancel</button>
      <button class="btn btn-success" onclick="closeModal('sendNotifModal');showToast('Notification queued! Delivering in batches...','success')">
        <i class="fas fa-paper-plane"></i> Send Notification
      </button>
    </div>
  </div>
</div>

<!-- Import Students Modal -->
<div id="importStudentsModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-database" style="color:var(--primary);margin-right:8px"></i>Import from ERP</span>
      <button class="modal-close" onclick="closeModal('importStudentsModal')">×</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
        ${['Fedena ERP','Tally Prime','Zoho School','Classin','MyClassCampus','Custom CSV'].map(e=>`
        <div style="border:1px solid var(--border);border-radius:10px;padding:12px;display:flex;align-items:center;gap:10px;cursor:pointer;transition:all 0.2s" onmouseover="this.style.borderColor='var(--wa-green)'" onmouseout="this.style.borderColor='var(--border)'" onclick="showToast('Syncing from ${e}...','info')">
          <i class="fas fa-database" style="color:var(--wa-green);font-size:16px"></i>
          <span style="font-size:12px;font-weight:600;color:white">${e}</span>
        </div>`).join('')}
      </div>
      <div style="background:rgba(255,255,255,0.04);border:1px dashed var(--border);border-radius:10px;padding:24px;text-align:center">
        <i class="fas fa-file-csv" style="font-size:28px;color:var(--accent);margin-bottom:8px;display:block"></i>
        <div style="font-size:13px;font-weight:600;color:white;margin-bottom:4px">Or Upload CSV</div>
        <div style="font-size:11px;color:var(--text-muted)">Name, Phone, Class, Section, Parent Phone</div>
        <button class="btn btn-outline btn-sm" style="margin-top:10px" onclick="showToast('Select CSV file','info')"><i class="fas fa-upload"></i> Choose File</button>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('importStudentsModal')">Cancel</button>
      <button class="btn btn-success" onclick="closeModal('importStudentsModal');showToast('5,842 records synced from ERP!','success')"><i class="fas fa-sync"></i> Sync Now</button>
    </div>
  </div>
</div>

`, 'edu', 'Education Suite', 'School & College WhatsApp notification management', '', `
const templates = {
  fee: 'Dear Parent,\\n\\nThis is a reminder that the school fee of ₹{{fee_amount}} for {{student_name}} ({{class}}) is due on {{due_date}}.\\n\\nPay online: https://school.edu/pay\\n\\nIgnore if already paid.\\n\\nRegards,\\nDPS Accounts Dept.',
  exam: 'Dear {{student_name}},\\n\\n📅 *Half-Yearly Exam Schedule*\\n\\nPhysics: 21-Oct | 9 AM\\nChemistry: 22-Oct | 9 AM\\nMaths: 23-Oct | 9 AM\\n\\nAdmit card: https://school.edu/admit\\n\\nBest of luck! 🎓',
  attendance: 'Dear Parent,\\n\\n⚠️ Your ward *{{student_name}}* ({{class}}) was *absent* on {{date}}.\\n\\nIf this is incorrect, please contact the class teacher.\\n\\nDPS Attendance System',
  ptm: 'Dear Parent,\\n\\n📅 *Parent-Teacher Meeting*\\n\\nDate: 25-Oct-2024\\nTime: 10 AM - 1 PM\\nVenue: School Auditorium\\n\\nKindly confirm attendance:\\n✅ Reply *YES* to confirm\\n❌ Reply *NO* if unable',
  result: 'Dear {{student_name}},\\n\\n🏆 *Half-Yearly Results Declared*\\n\\nYour result card is ready.\\nDownload: https://school.edu/results\\n\\nCongratulations! Keep it up! 🎉',
  holiday: 'Dear Parents & Students,\\n\\n🎉 *Holiday Notice*\\n\\nSchool will remain *closed* on {{date}} on account of *{{occasion}}*.\\n\\nRegular classes resume from {{resumeDate}}.\\n\\nPrincipal, DPS Noida',
};
function updateTemplate(val) {
  const ta = document.getElementById('notifMsg');
  if (templates[val]) ta.value = templates[val];
  else ta.placeholder = 'Type your custom message here...';
}
`)
