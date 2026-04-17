import { pageShell } from './layout'

export const notificationHubHTML = () => pageShell(`

<!-- Notification Hub Header -->
<div style="background:linear-gradient(135deg,#0f172a,#1a0a3c,#0a1f2a);border:1px solid rgba(108,92,231,0.25);border-radius:20px;padding:28px 32px;margin-bottom:24px;position:relative;overflow:hidden">
  <div style="position:absolute;right:-30px;top:-30px;width:180px;height:180px;background:radial-gradient(circle,rgba(108,92,231,0.15),transparent);border-radius:50%"></div>
  <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px">
    <div style="width:50px;height:50px;border-radius:14px;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:22px;color:white">
      <i class="fas fa-bell"></i>
    </div>
    <div>
      <div style="font-size:20px;font-weight:900;color:white">Notification <span style="color:var(--accent)">Hub</span></div>
      <div style="font-size:12px;color:var(--text-muted)">Centralized notification management for all verticals and organizations</div>
    </div>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:16px">
    ${[
      ['fas fa-paper-plane','284,912','Sent Today','var(--wa-green)'],
      ['fas fa-check-double','98.4%','Delivery Rate','var(--accent)'],
      ['fas fa-clock','1,240','Queued','var(--warning)'],
      ['fas fa-building','14','Organizations','var(--primary)'],
    ].map(([ic,val,lbl,col])=>`
    <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 18px">
      <div style="font-size:11px;color:${col};text-transform:uppercase;letter-spacing:1px;margin-bottom:3px"><i class="${ic}"></i> ${lbl}</div>
      <div style="font-size:20px;font-weight:800;color:white">${val}</div>
    </div>`).join('')}
  </div>
</div>

<!-- Notification Feed -->
<div class="grid-2">
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-stream" style="color:var(--primary)"></i> Live Notification Feed</div>
      <span class="badge badge-success"><i class="fas fa-circle" style="font-size:7px"></i> Live</span>
    </div>
    <div id="notifFeed" style="padding:0">
      ${[
        {type:'fee_reminder',title:'Fee Due Reminder',org:'St. Mary\'s School',recipients:380,status:'delivered',time:'09:00 AM',vertical:'education',color:'var(--info)'},
        {type:'exam_schedule',title:'Exam Timetable – All Classes',org:'City Commerce College',recipients:4800,status:'sending',time:'10:15 AM',vertical:'education',color:'var(--wa-green)'},
        {type:'payslip',title:'Payslip August 2024',org:'Tech Solutions Pvt.',recipients:850,status:'queued',time:'03:30 PM',vertical:'corporate',color:'var(--primary)'},
        {type:'leave_approval',title:'Leave Approved – Rajesh K.',org:'Global Pharma Corp',recipients:1,status:'delivered',time:'11:30 AM',vertical:'corporate',color:'var(--success)'},
        {type:'assembly',title:'Special Assembly Notice',org:'St. Mary\'s School',recipients:2400,status:'delivered',time:'07:30 AM',vertical:'education',color:'var(--accent)'},
        {type:'offer',title:'Weekend Sale – 30% Off!',org:'Sunrise Bakery',recipients:1240,status:'delivered',time:'08:00 AM',vertical:'smb',color:'#fdcb6e'},
        {type:'it_alert',title:'Planned Maintenance Window',org:'Metro Hospitals',recipients:1200,status:'delivered',time:'06:00 AM',vertical:'corporate',color:'var(--danger)'},
      ].map(n=>`
      <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid rgba(45,63,90,0.4)">
        <div style="width:36px;height:36px;border-radius:10px;background:${n.color}18;display:flex;align-items:center;justify-content:center;color:${n.color};font-size:14px;flex-shrink:0">
          <i class="fas fa-${n.type==='fee_reminder'?'rupee-sign':n.type==='exam_schedule'?'book':n.type==='payslip'?'file-invoice':n.type==='leave_approval'?'user-check':n.type==='assembly'?'users':n.type==='offer'?'tag':'exclamation-triangle'}"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n.title}</div>
          <div style="font-size:11px;color:var(--text-muted)">${n.org} • ${n.recipients.toLocaleString()} recipients</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:11px;color:var(--text-muted)">${n.time}</div>
          <span class="badge ${n.status==='delivered'?'badge-success':n.status==='sending'?'badge-wa':'badge-warning'}" style="font-size:10px">${n.status}</span>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- Schedule Notification -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-plus-circle" style="color:var(--wa-green)"></i> Schedule Notification</div>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label class="form-label">Organization</label>
        <select class="form-control">
          <option>St. Mary's Higher Secondary School</option>
          <option>Tech Solutions Pvt. Ltd.</option>
          <option>City Commerce College</option>
          <option>All Organizations (Broadcast)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Notification Type</label>
        <select class="form-control">
          <option>📚 Academic / Exam</option>
          <option>💰 Fee Reminder</option>
          <option>📅 Event / Meeting</option>
          <option>📝 HR / Payslip</option>
          <option>🚨 Alert / Emergency</option>
          <option>🎉 Promotional</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Recipient Group</label>
        <select class="form-control">
          <option>All Students (4,800)</option>
          <option>Class X Students (380)</option>
          <option>All Parents (4,200)</option>
          <option>Staff (120)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Message</label>
        <textarea class="form-control" rows="3" placeholder="Notification message...">Dear Parent, the Parent-Teacher Meeting is scheduled for Saturday, Nov 2nd at 10:00 AM. Please confirm attendance.</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Schedule (optional)</label>
        <input class="form-control" type="datetime-local" value="2024-11-01T09:00">
      </div>
      <button class="btn btn-success w-full" style="justify-content:center" onclick="showToast('Notification scheduled successfully!','success')">
        <i class="fas fa-paper-plane"></i> Schedule Notification
      </button>
    </div>
  </div>
</div>

<!-- Notification Templates by Vertical -->
<div class="card mt-6" style="margin-top:24px">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-file-alt" style="color:var(--accent)"></i> Notification Templates by Vertical</div>
    <button class="btn btn-sm btn-primary" onclick="showToast('Creating new template...','info')"><i class="fas fa-plus"></i> Add Template</button>
  </div>
  <div class="card-body">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px">
      ${[
        {vertical:'Education',icon:'graduation-cap',color:'var(--info)',templates:['Fee Reminder','Exam Schedule','PTM Invite','Holiday Notice','Result Declaration','Attendance Alert']},
        {vertical:'Corporate',icon:'building',color:'var(--primary)',templates:['Payslip Ready','Leave Approval','Meeting Invite','Policy Update','Birthday Wish','Shift Reminder']},
        {vertical:'Small Business',icon:'store',color:'var(--wa-green)',templates:['Daily Offer','Order Confirmed','Delivery Update','Appointment Reminder','Review Request','Festival Greet']},
        {vertical:'Healthcare',icon:'hospital',color:'var(--danger)',templates:['Appointment Reminder','Lab Report Ready','Medicine Due','Doctor Available','Health Camp','Billing Notice']},
      ].map(v=>`
      <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:14px;padding:16px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <div style="width:32px;height:32px;border-radius:8px;background:${v.color}18;display:flex;align-items:center;justify-content:center;color:${v.color}"><i class="fas fa-${v.icon}"></i></div>
          <span style="font-size:13px;font-weight:700;color:white">${v.vertical}</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${v.templates.map(t=>`<span style="background:var(--card2);border:1px solid var(--border);border-radius:20px;padding:3px 10px;font-size:11px;color:var(--text-muted);cursor:pointer" onclick="showToast('Loading ${t} template...','info')">${t}</span>`).join('')}
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

`, 'notifhub', 'Notification Hub', 'Centralized notifications for all organizations & verticals', '', '')
