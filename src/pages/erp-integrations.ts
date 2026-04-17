import { pageShell } from './layout'

export const erpIntegrationsHTML = () => pageShell(`
<!-- Header -->
<div class="flex-between mb-6">
  <div>
    <h2 style="font-size:16px;font-weight:700;color:white">ERP Integration Hub</h2>
    <p style="font-size:12px;color:var(--text-muted)">Connect any ERP, HRMS, SIS, or custom system to WhatsApp notifications</p>
  </div>
  <div style="display:flex;gap:8px">
    <button class="btn btn-outline btn-sm" onclick="openModal('webhookModal')"><i class="fas fa-code"></i> Webhook Tester</button>
    <button class="btn btn-primary" onclick="openModal('addErpModal')"><i class="fas fa-plus"></i> Add Integration</button>
  </div>
</div>

<!-- Tabs -->
<div class="tabs">
  <button class="tab-btn active" data-tab-btn="erp" onclick="switchTab('tabConnectors','erp')"><i class="fas fa-plug"></i> Connectors</button>
  <button class="tab-btn" data-tab-btn="erp" onclick="switchTab('tabWebhook','erp')"><i class="fas fa-code"></i> Webhook API</button>
  <button class="tab-btn" data-tab-btn="erp" onclick="switchTab('tabEventLog','erp')"><i class="fas fa-history"></i> Event Log</button>
  <button class="tab-btn" data-tab-btn="erp" onclick="switchTab('tabFieldMap','erp')"><i class="fas fa-map"></i> Field Mapping</button>
</div>

<!-- Connectors Tab -->
<div id="tabConnectors" class="tab-panel active" data-tab-group="erp">
  <h3 style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:16px">Education ERP Systems</h3>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-bottom:24px">
    ${[
      {name:'Fedena',type:'School ERP',desc:'Complete school management — fee, attendance, exam, result, TC',status:'available',icon:'fa-graduation-cap',color:'#25D366',events:['fee_due','attendance_absent','exam_schedule','result_publish','ptm_invite']},
      {name:'Classin',type:'School ERP',desc:'Smart classroom platform with parent communication module',status:'available',icon:'fa-chalkboard-teacher',color:'#6C5CE7',events:['class_reminder','homework','attendance','fees']},
      {name:'Campus 365',type:'College ERP',desc:'Higher education ERP — admissions, exams, hostel, library',status:'available',icon:'fa-university',color:'#0984e3',events:['admission','exam','hostel','library_due','fees']},
      {name:'Zoho School',type:'Education Suite',desc:'Zoho for schools — CRM, fees, communication built-in',status:'connected',icon:'fa-building',color:'#e17055',events:['fee_reminder','event_invite','result']},
      {name:'Edunext',type:'University ERP',desc:'University management system with academic automation',status:'available',icon:'fa-book',color:'#a29bfe',events:['enrollment','grades','fees','events']},
      {name:'Custom SIS',type:'Custom REST',desc:'Any Student Information System via REST API or Webhook',status:'available',icon:'fa-code',color:'#00CEC9',events:['custom_trigger']},
    ].map(e=>erp_card(e)).join('')}
  </div>

  <h3 style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:16px">Corporate ERP & HRMS</h3>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-bottom:24px">
    ${[
      {name:'SAP S/4HANA',type:'Enterprise ERP',desc:'SAP payroll, HR, finance, logistics — full event streaming',status:'connected',icon:'fa-building',color:'#0070d2',events:['payroll_run','leave_change','new_employee','po_approval','invoice']},
      {name:'Tally Prime',type:'Accounts',desc:'Tally accounting — invoice, payment, salary, GST notifications',status:'connected',icon:'fa-calculator',color:'#fdcb6e',events:['invoice_created','payment_received','salary_processed','gst_due']},
      {name:'Salesforce',type:'CRM',desc:'SF CRM — opportunity won, lead assign, case update',status:'available',icon:'fa-cloud',color:'#00a1e0',events:['opportunity_won','lead_assigned','case_closed','renewal_due']},
      {name:'Oracle HCM',type:'HR Suite',desc:'Oracle HR — payslips, appraisals, training, offboarding',status:'available',icon:'fa-database',color:'#e74c3c',events:['payslip','appraisal','offboarding','training']},
      {name:'Zoho HRMS',type:'HR System',desc:'Zoho People — leave, attendance, payroll, onboarding',status:'available',icon:'fa-users-cog',color:'#e17055',events:['leave','attendance','payroll','onboarding']},
      {name:'Greytip / Keka',type:'Payroll',desc:'Indian payroll systems — salary slip, reimbursement, PF',status:'available',icon:'fa-rupee-sign',color:'#00b894',events:['salary_slip','reimbursement_status','pf_challan']},
      {name:'Jira / ServiceNow',type:'ITSM',desc:'IT ticket alerts — incident, change, SLA breach notifications',status:'available',icon:'fa-headset',color:'#0052cc',events:['incident_created','sla_breach','change_approved','ticket_resolved']},
      {name:'Custom REST/Webhook',type:'Universal',desc:'Any system — POST to our webhook endpoint. Instant delivery.',status:'connected',icon:'fa-plug',color:'#6C5CE7',events:['any_custom_event']},
    ].map(e=>erp_card(e)).join('')}
  </div>
</div>

<!-- Webhook API Tab -->
<div id="tabWebhook" class="tab-panel" data-tab-group="erp">
  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-code" style="color:var(--accent)"></i> Webhook Endpoint</div>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label class="form-label">Your Webhook URL</label>
          <div style="display:flex;gap:8px">
            <input type="text" class="form-control" value="https://api.wapisend.com/webhook/org_abc123" readonly style="flex:1;font-size:12px">
            <button class="btn btn-outline btn-sm" onclick="copyText('https://api.wapisend.com/webhook/org_abc123')"><i class="fas fa-copy"></i></button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Secret Key (HMAC verification)</label>
          <div style="display:flex;gap:8px">
            <input type="password" class="form-control" value="whsec_abc123xyz789..." readonly style="flex:1">
            <button class="btn btn-outline btn-sm" onclick="showToast('Secret copied!','success')"><i class="fas fa-copy"></i></button>
          </div>
        </div>

        <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.8px">Request Format (POST)</div>
        <div style="background:var(--dark);border:1px solid var(--border);border-radius:10px;padding:16px;font-size:11px;color:var(--wa-green);line-height:2;position:relative">
<pre style="overflow:auto;white-space:pre-wrap;margin:0">{
  <span style="color:#a29bfe">"event"</span>: <span style="color:#fd79a8">"fee_due"</span>,
  <span style="color:#a29bfe">"template"</span>: <span style="color:#fd79a8">"fee_reminder_v2"</span>,
  <span style="color:#a29bfe">"recipients"</span>: [
    {
      <span style="color:#a29bfe">"phone"</span>: <span style="color:#fd79a8">"+919876543210"</span>,
      <span style="color:#a29bfe">"variables"</span>: {
        <span style="color:#a29bfe">"student_name"</span>: <span style="color:#fd79a8">"Rahul Sharma"</span>,
        <span style="color:#a29bfe">"fee_amount"</span>: <span style="color:#fd79a8">"12500"</span>,
        <span style="color:#a29bfe">"due_date"</span>: <span style="color:#fd79a8">"20-Oct-2024"</span>,
        <span style="color:#a29bfe">"class"</span>: <span style="color:#fd79a8">"Class X-A"</span>
      }
    }
  ],
  <span style="color:#a29bfe">"batch_config"</span>: {
    <span style="color:#a29bfe">"size"</span>: 50,
    <span style="color:#a29bfe">"delay_ms"</span>: 2000
  }
}</pre>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin:14px 0 8px;text-transform:uppercase;letter-spacing:0.8px">Response</div>
        <div style="background:var(--dark);border:1px solid var(--border);border-radius:10px;padding:12px;font-size:11px;color:var(--wa-green)">
<pre style="margin:0">{
  <span style="color:#a29bfe">"status"</span>: <span style="color:#fd79a8">"queued"</span>,
  <span style="color:#a29bfe">"batch_id"</span>: <span style="color:#fd79a8">"B_20241017_abc"</span>,
  <span style="color:#a29bfe">"total"</span>: 380,
  <span style="color:#a29bfe">"batches"</span>: 8,
  <span style="color:#a29bfe">"estimated_completion"</span>: <span style="color:#fd79a8">"~32 seconds"</span>
}</pre>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-flask" style="color:#fdcb6e"></i> Webhook Tester</div>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label class="form-label">Event Type</label>
          <select class="form-control" id="testEvent">
            <option value="fee_due">fee_due — Fee Reminder</option>
            <option value="exam_schedule">exam_schedule — Exam Timetable</option>
            <option value="attendance_absent">attendance_absent — Absent Alert</option>
            <option value="payslip_ready">payslip_ready — Payslip</option>
            <option value="leave_approved">leave_approved — Leave Update</option>
            <option value="custom">custom — Custom Event</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Test Phone Number</label>
          <input class="form-control" id="testPhone" placeholder="+91 98765 43210">
        </div>
        <div class="form-group">
          <label class="form-label">Sample Payload (editable)</label>
          <textarea class="form-control" id="testPayload" rows="8" style="font-size:11px;font-family:monospace">{
  "event": "fee_due",
  "template": "fee_reminder_v2",
  "recipients": [{
    "phone": "+919876543210",
    "variables": {
      "student_name": "Test Student",
      "fee_amount": "12500",
      "due_date": "20-Oct-2024"
    }
  }]
}</textarea>
        </div>
        <button class="btn btn-success w-full" style="justify-content:center" onclick="testWebhook()">
          <i class="fas fa-play"></i> Send Test Webhook
        </button>
        <div id="testResult" style="display:none;margin-top:12px;background:var(--dark);border:1px solid var(--border);border-radius:8px;padding:12px;font-size:11px;color:var(--wa-green);font-family:monospace"></div>
      </div>
    </div>
  </div>
</div>

<!-- Event Log Tab -->
<div id="tabEventLog" class="tab-panel" data-tab-group="erp">
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-history" style="color:var(--primary)"></i> ERP Event Log</div>
      <div style="display:flex;gap:8px">
        <select class="form-control" style="width:160px;padding:6px 10px;font-size:12px"><option>All Sources</option><option>SAP</option><option>Tally</option><option>Webhook</option></select>
        <button class="btn btn-sm btn-outline"><i class="fas fa-download"></i> Export</button>
      </div>
    </div>
    <table class="data-table">
      <thead><tr><th>Time</th><th>Source</th><th>Event</th><th>Recipients</th><th>Template</th><th>Status</th><th>Latency</th></tr></thead>
      <tbody>
        ${[
          ['11:32:04','HR Portal','leave_approved','1','leave_approval_v1','delivered','320ms'],
          ['10:15:22','Manual','exam_schedule','4,800','exam_timetable_v2','sending','—'],
          ['09:00:01','SAP S/4HANA','payroll_run','850','payslip_notification_v2','queued','—'],
          ['08:31:17','Fedena ERP','attendance_absent','42','attendance_alert_v1','delivered','218ms'],
          ['09:02:44','Tally Prime','fee_receipt','18','fee_receipt_v1','delivered','290ms'],
          ['08:00:00','ITSM','it_maintenance','1,200','it_maintenance_v1','delivered','180ms'],
          ['07:30:00','Fedena ERP','morning_assembly','2,400','notice_general_v1','delivered','340ms'],
        ].map(([time,src,event,recv,tmpl,status,lat])=>`
        <tr>
          <td style="font-size:11px;color:var(--text-muted);white-space:nowrap;font-family:monospace">${time}</td>
          <td><span class="badge badge-purple" style="font-size:9px">${src}</span></td>
          <td style="font-size:12px;color:white;font-weight:600">${event}</td>
          <td style="font-size:13px;color:var(--wa-green);font-weight:700">${recv}</td>
          <td style="font-size:11px;color:var(--text-muted);font-family:monospace">${tmpl}</td>
          <td><span class="badge ${status==='delivered'?'badge-success':status==='sending'?'badge-info':'badge-warning'}">${status}</span></td>
          <td style="font-size:11px;color:var(--accent)">${lat}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>

<!-- Field Mapping Tab -->
<div id="tabFieldMap" class="tab-panel" data-tab-group="erp">
  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-map" style="color:var(--accent)"></i> Field Mapping — Fee Reminder</div>
        <select class="form-control" style="width:180px;padding:6px 10px;font-size:12px">
          <option>fee_due</option><option>attendance_absent</option><option>payslip_ready</option>
        </select>
      </div>
      <div class="card-body">
        <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:12px;padding:0 4px">
          <span>ERP Field</span>
          <span><i class="fas fa-arrow-right"></i></span>
          <span>Template Variable</span>
        </div>
        ${[
          ['student.first_name + last_name','student_name'],
          ['guardian.mobile_number','phone (recipient)'],
          ['fee.outstanding_amount','fee_amount'],
          ['fee.due_date (DD-MMM-YYYY)','due_date'],
          ['student.class_name + section','class'],
          ['school.payment_url','pay_link'],
        ].map(([erp,tmpl])=>`
        <div style="display:flex;align-items:center;gap:10px;padding:10px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;margin-bottom:6px">
          <code style="flex:1;font-size:11px;color:var(--wa-green);background:rgba(37,211,102,0.08);padding:4px 8px;border-radius:5px">${erp}</code>
          <i class="fas fa-long-arrow-alt-right" style="color:var(--primary);flex-shrink:0"></i>
          <code style="flex:1;font-size:11px;color:#a29bfe;background:rgba(162,155,254,0.1);padding:4px 8px;border-radius:5px">{{${tmpl}}}</code>
        </div>`).join('')}
        <button class="btn btn-outline btn-sm w-full" style="justify-content:center;margin-top:10px" onclick="showToast('Field mapping saved!','success')"><i class="fas fa-save"></i> Save Mapping</button>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="fas fa-eye" style="color:var(--primary)"></i> Live Preview</div></div>
      <div class="card-body">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:12px">How the message looks after variable substitution:</div>
        <div style="background:#0b1120;border-radius:12px;padding:14px">
          <div style="display:flex;justify-content:flex-end;margin-bottom:8px">
            <div style="background:#005c4b;border-radius:10px 10px 0 10px;padding:12px 14px;max-width:280px">
              <div style="font-size:12px;color:rgba(255,255,255,0.9);line-height:1.7">Dear Parent,<br><br>This is a reminder that the school fee of <strong style="color:var(--wa-green)">₹12,500</strong> for <strong style="color:white">Rahul Sharma</strong> (Class X-A) is due on <strong style="color:#fdcb6e">20-Oct-2024</strong>.<br><br>Pay online: <span style="color:var(--accent)">school.edu/pay</span><br><br>Ignore if already paid.</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.4);text-align:right;margin-top:6px">✓✓ 09:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Add ERP Modal -->
<div id="addErpModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-plug" style="color:var(--primary);margin-right:8px"></i>Add ERP Integration</span>
      <button class="modal-close" onclick="closeModal('addErpModal')">×</button>
    </div>
    <div class="modal-body">
      <div class="form-group"><label class="form-label">ERP System</label>
        <select class="form-control"><option>SAP S/4HANA</option><option>Tally Prime</option><option>Salesforce</option><option>Oracle HCM</option><option>Zoho HRMS</option><option>Fedena</option><option>Custom / Other</option></select></div>
      <div class="form-group"><label class="form-label">Integration Type</label>
        <select class="form-control"><option>REST API (Pull)</option><option>Webhook (Push)</option><option>SFTP File Export</option><option>Database Read (ODBC)</option></select></div>
      <div class="form-group"><label class="form-label">Base URL / Endpoint</label><input class="form-control" placeholder="https://your-erp.com/api/v1"></div>
      <div class="form-group"><label class="form-label">API Key / Auth Token</label><input type="password" class="form-control" placeholder="Bearer token or API key"></div>
      <div class="form-group"><label class="form-label">Test Connection</label>
        <button class="btn btn-outline btn-sm" onclick="showToast('Connection successful! 3 events found.','success')"><i class="fas fa-plug"></i> Test Now</button></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('addErpModal')">Cancel</button>
      <button class="btn btn-success" onclick="closeModal('addErpModal');showToast('ERP connected successfully!','success')"><i class="fas fa-check"></i> Connect</button>
    </div>
  </div>
</div>

<!-- Webhook Tester Modal -->
<div id="webhookModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-flask" style="color:#fdcb6e;margin-right:8px"></i>Live Webhook Tester</span>
      <button class="modal-close" onclick="closeModal('webhookModal')">×</button>
    </div>
    <div class="modal-body">
      <div style="background:var(--dark);border:1px solid var(--border);border-radius:10px;padding:14px;font-size:12px;color:var(--wa-green);font-family:monospace">
        POST https://api.wapisend.com/webhook/org_abc123<br>
        Content-Type: application/json<br>
        X-Wapi-Signature: sha256=...
      </div>
      <div class="form-group" style="margin-top:14px">
        <label class="form-label">Try cURL command</label>
        <div style="background:var(--dark);border:1px solid var(--border);border-radius:10px;padding:12px;font-size:11px;color:var(--accent);font-family:monospace;position:relative">
          curl -X POST https://api.wapisend.com/webhook/org_abc123 \\<br>
          &nbsp;&nbsp;-H "Content-Type: application/json" \\<br>
          &nbsp;&nbsp;-H "X-Wapi-Signature: sha256=YOUR_HMAC" \\<br>
          &nbsp;&nbsp;-d '{"event":"test","recipients":[...]}'
          <button onclick="copyText('curl -X POST https://api.wapisend.com/webhook/org_abc123')" style="position:absolute;top:8px;right:8px;background:rgba(255,255,255,0.1);border:1px solid var(--border);border-radius:5px;padding:3px 8px;color:var(--text-muted);font-size:10px;cursor:pointer"><i class="fas fa-copy"></i></button>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('webhookModal')">Close</button>
      <button class="btn btn-success" onclick="closeModal('webhookModal');showToast('Test event sent! Check Event Log.','success')"><i class="fas fa-play"></i> Send Test Event</button>
    </div>
  </div>
</div>

`, 'erp', 'ERP Integration Hub', 'Connect SAP, Tally, Oracle, Zoho and any custom ERP system', '', `
function erp_card(e) { return ''; } // defined in HTML below
function testWebhook() {
  const result = document.getElementById('testResult');
  result.style.display = 'block';
  result.innerHTML = '<i class="fas fa-spinner fa-spin" style="color:var(--wa-green)"></i> Sending...';
  setTimeout(()=>{
    result.innerHTML = \`{
  "status": "queued",
  "batch_id": "B_test_\${Date.now()}",
  "total": 1,
  "batches": 1,
  "estimated_completion": "~2 seconds"
}\`;
    showToast('Test webhook sent! Message delivered.','success');
  }, 1500);
}
`)

function erp_card(e: {name:string,type:string,desc:string,status:string,icon:string,color:string,events:string[]}) {
  const statusColor = e.status === 'connected' ? 'var(--wa-green)' : 'var(--text-muted)'
  const statusBadge = e.status === 'connected' ? 'badge-success' : 'badge-warning'
  return `
  <div class="card" style="transition:all 0.2s;cursor:pointer" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'" onclick="openModal('addErpModal')">
    <div class="card-body" style="padding:18px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:40px;height:40px;border-radius:11px;background:${e.color}22;display:flex;align-items:center;justify-content:center;font-size:17px"><i class="fas ${e.icon}" style="color:${e.color}"></i></div>
          <div>
            <div style="font-size:13px;font-weight:700;color:white">${e.name}</div>
            <div style="font-size:10px;color:var(--text-muted)">${e.type}</div>
          </div>
        </div>
        <span class="badge ${statusBadge}" style="font-size:9px">${e.status === 'connected' ? '● Connected' : 'Available'}</span>
      </div>
      <div style="font-size:11px;color:#64748b;line-height:1.5;margin-bottom:10px">${e.desc}</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px">
        ${e.events.map(ev=>`<span style="background:${e.color}15;color:${e.color};border-radius:5px;padding:2px 7px;font-size:9px;font-weight:600">${ev}</span>`).join('')}
      </div>
    </div>
  </div>`
}
