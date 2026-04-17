import { pageShell } from './layout'

export const complianceHTML = () => pageShell(`

<!-- Compliance Header -->
<div style="background:linear-gradient(135deg,#0a1f0e,#0d2b1a);border:1px solid rgba(0,184,148,0.2);border-radius:20px;padding:28px 32px;margin-bottom:24px">
  <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px">
    <div style="width:50px;height:50px;border-radius:14px;background:linear-gradient(135deg,var(--success),var(--wa-teal));display:flex;align-items:center;justify-content:center;font-size:22px;color:white">
      <i class="fas fa-shield-alt"></i>
    </div>
    <div>
      <div style="font-size:20px;font-weight:900;color:white">Compliance & <span style="color:var(--success)">Anti-Spam</span> Centre</div>
      <div style="font-size:12px;color:var(--text-muted)">Official WhatsApp Business API • Meta verified • TRAI compliant • GDPR ready</div>
    </div>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:8px">
    ${[
      ['fas fa-check-circle','Meta Business API','Verified','var(--wa-green)'],
      ['fas fa-shield-alt','Anti-Spam Score','98/100','var(--success)'],
      ['fas fa-balance-scale','TRAI Compliant','Active','var(--info)'],
      ['fas fa-lock','GDPR Ready','Enabled','var(--primary)'],
    ].map(([ic,lbl,val,col])=>`
    <div style="background:rgba(255,255,255,0.05);border:1px solid ${col}33;border-radius:12px;padding:10px 16px;display:flex;align-items:center;gap:8px">
      <i class="${ic}" style="color:${col}"></i>
      <div>
        <div style="font-size:10px;color:var(--text-muted)">${lbl}</div>
        <div style="font-size:13px;font-weight:700;color:${col}">${val}</div>
      </div>
    </div>`).join('')}
  </div>
</div>

<div class="grid-2">
  <!-- Anti-Spam Rules -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-filter" style="color:var(--success)"></i> Anti-Spam Guardrails</div>
    </div>
    <div class="card-body">
      ${[
        {rule:'Message Rate Limiting',desc:'Max 80 messages/sec per number to avoid flagging',status:'active',icon:'tachometer-alt'},
        {rule:'Opt-out Handling',desc:'STOP keyword auto-removes contact from all lists',status:'active',icon:'hand-paper'},
        {rule:'Template Pre-approval',desc:'All messages use Meta-approved templates only',status:'active',icon:'check-circle'},
        {rule:'Quality Score Monitoring',desc:'Pauses sending if quality score drops below 70',status:'active',icon:'star'},
        {rule:'DND Registry Check',desc:'TRAI DND database checked before every send',status:'active',icon:'ban'},
        {rule:'24-hour Rule',desc:'Customer-initiated window strictly enforced',status:'active',icon:'clock'},
        {rule:'Duplicate Filter',desc:'Prevents sending same message twice in 24 hours',status:'active',icon:'copy'},
        {rule:'Content Moderation',desc:'AI scans for spam keywords before sending',status:'active',icon:'robot'},
      ].map(r=>`
      <div style="display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid rgba(45,63,90,0.4)">
        <div style="width:30px;height:30px;border-radius:8px;background:rgba(0,184,148,0.12);display:flex;align-items:center;justify-content:center;color:var(--success);font-size:12px;flex-shrink:0"><i class="fas fa-${r.icon}"></i></div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:600;color:white">${r.rule}</div>
          <div style="font-size:11px;color:var(--text-muted)">${r.desc}</div>
        </div>
        <span class="badge badge-success" style="font-size:10px;flex-shrink:0">ON</span>
      </div>`).join('')}
    </div>
  </div>

  <!-- Delivery Health -->
  <div>
    <div class="card" style="margin-bottom:18px">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-heartbeat" style="color:var(--danger)"></i> Number Health Monitor</div>
      </div>
      <div class="card-body">
        ${[
          {num:'+91 98765 43210',qual:'High',score:96,msgs:'12.4K/day',status:'Excellent'},
          {num:'+91 87654 32109',qual:'Medium',score:74,msgs:'5.2K/day',status:'Monitor'},
        ].map(n=>`
        <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:14px;margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-size:13px;font-weight:600;color:white">${n.num}</span>
            <span class="badge ${n.qual==='High'?'badge-success':'badge-warning'}">${n.qual} Quality</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:8px">
            <span>Quality Score: <strong style="color:${n.score>80?'var(--success)':'var(--warning)'}">${n.score}/100</strong></span>
            <span>${n.msgs}</span>
          </div>
          <div class="progress"><div class="progress-bar ${n.score>80?'green':'orange'}" style="width:${n.score}%"></div></div>
        </div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="fas fa-list-alt" style="color:var(--info)"></i> Opt-out Log</div></div>
      <div style="padding:0">
        <table class="data-table">
          <thead><tr><th>Contact</th><th>Opted Out</th><th>Method</th></tr></thead>
          <tbody>
            ${[
              ['+91 99988 77766','Oct 23','STOP reply'],
              ['+91 88877 66655','Oct 22','Manual removal'],
              ['+91 77766 55544','Oct 20','STOP reply'],
            ].map(([ph,dt,m])=>`
            <tr>
              <td style="font-size:12px;color:var(--text)">${ph}</td>
              <td style="font-size:11px;color:var(--text-muted)">${dt}</td>
              <td><span class="badge badge-info" style="font-size:10px">${m}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

`, 'compliance', 'Compliance & Anti-Spam', 'Keep your WhatsApp account safe and compliant', '', '')
