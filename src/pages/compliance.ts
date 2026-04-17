import { pageShell } from './layout'

export const complianceHTML = () => pageShell(`

<!-- Compliance Header -->
<div style="background:linear-gradient(135deg,#27ae60,#2ecc71);border-radius:16px;padding:24px 28px;margin-bottom:24px;position:relative;overflow:hidden">
  <div style="position:absolute;right:-30px;top:-30px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,0.06)"></div>
  <div style="position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
    <div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <div style="width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:22px;color:white"><i class="fas fa-shield-alt"></i></div>
        <div>
          <div style="font-size:20px;font-weight:800;color:white">Compliance & Anti-Spam</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.8)">Official Meta API compliance, spam protection & quality management</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">
        <span style="background:rgba(255,255,255,0.2);color:white;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600">✅ Meta Business Verified</span>
        <span style="background:rgba(255,255,255,0.2);color:white;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600">🛡️ Anti-Spam Active</span>
        <span style="background:rgba(255,255,255,0.2);color:white;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600">📊 Quality Score: 96/100</span>
        <span style="background:rgba(255,255,255,0.2);color:white;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600">🔒 GDPR + IT Act</span>
      </div>
    </div>
    <div style="text-align:right">
      <div style="font-size:36px;font-weight:900;color:white">A+</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.7)">Compliance Grade</div>
    </div>
  </div>
</div>

<!-- Quality Score Cards -->
<div class="stats-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr));margin-bottom:24px">
  ${[
    ['WhatsApp Quality','HIGH','Meta Rating','shield-alt','green'],
    ['Spam Risk Score','0.4%','Very Low','exclamation-triangle','teal'],
    ['Opt-in Rate','98.6%','Consented contacts','user-check','blue'],
    ['Opt-out Rate','0.2%','Unsubscribes','user-times','orange'],
    ['Template Approval','94%','Meta approved','file-check','purple'],
    ['Block Rate','0.06%','Contacts blocked','ban','red'],
  ].map(([label,val,meta,ic,color])=>`
  <div class="stat-card ${color}">
    <div class="stat-label">${label}</div>
    <div class="stat-value">${val}</div>
    <div class="stat-meta">${meta}</div>
    <i class="fas fa-${ic} stat-icon"></i>
  </div>`).join('')}
</div>

<!-- Main Grid -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">

  <!-- Anti-Spam Engine -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-robot" style="color:var(--wa-green)"></i> Anti-Spam Engine</div>
      <span class="badge badge-success"><i class="fas fa-circle" style="font-size:7px"></i> Active</span>
    </div>
    <div class="card-body">
      <div style="background:rgba(37,211,102,0.06);border:1px solid rgba(37,211,102,0.15);border-radius:12px;padding:14px;margin-bottom:16px">
        <div style="font-size:13px;font-weight:700;color:white;margin-bottom:8px"><i class="fas fa-brain" style="color:var(--wa-green)"></i> How It Works</div>
        <div style="font-size:12px;color:var(--text-muted);line-height:1.8">
          Every message passes through our 8-layer compliance engine before delivery. AI checks content, rate limits batching, verifies opt-ins, and continuously monitors account health.
        </div>
      </div>
      ${[
        ['Opt-in Verification','Check every contact has valid opt-in before sending','active','check-circle'],
        ['Content Screening','AI scan for spam keywords, prohibited content','active','search'],
        ['Rate Limiting','Smart throttle: max 1,000/min, 50K/day per number','active','tachometer-alt'],
        ['Batch Spacing','5-15 second random delay between messages','active','clock'],
        ['Opt-out Respect','Auto-remove contacts who reply STOP/UNSUBSCRIBE','active','user-times'],
        ['Number Quality Monitor','Real-time Meta quality score tracking','active','heartbeat'],
        ['Template Pre-approval','All templates approved by Meta before use','active','file-check'],
        ['24hr Cooldown','No repeat messages to same contact within 24hrs','active','ban'],
      ].map(([name,desc,status,ic])=>`
      <div style="display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid rgba(45,63,90,0.3)">
        <div style="width:30px;height:30px;border-radius:8px;background:rgba(37,211,102,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px">
          <i class="fas fa-${ic}" style="color:var(--wa-green);font-size:12px"></i>
        </div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:600;color:white">${name}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${desc}</div>
        </div>
        <i class="fas fa-check-circle" style="color:var(--success);font-size:14px;margin-top:4px"></i>
      </div>`).join('')}
    </div>
  </div>

  <!-- WhatsApp Number Health -->
  <div style="display:flex;flex-direction:column;gap:16px">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fab fa-whatsapp" style="color:var(--wa-green)"></i> Number Health Monitor</div>
        <button class="btn btn-sm btn-outline" onclick="showToast('Running health check...','info')"><i class="fas fa-sync-alt"></i> Refresh</button>
      </div>
      <div class="card-body">
        ${[
          ['+91 98765 43210','Business Store','HIGH','Connected','99.8%','12,400/day','var(--success)'],
          ['+91 87654 32109','Rahul Store 2','MEDIUM','Connected','98.2%','5,200/day','var(--warning)'],
          ['+91 76543 21098','Corp Account','HIGH','Connected','99.9%','24,000/day','var(--success)'],
        ].map(([num,name,quality,status,delivery,limit,qcolor])=>`
        <div style="border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:10px;background:rgba(255,255,255,0.02)">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="width:36px;height:36px;border-radius:50%;background:rgba(37,211,102,0.15);display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--wa-green);flex-shrink:0"><i class="fab fa-whatsapp"></i></div>
            <div>
              <div style="font-size:13px;font-weight:700;color:white">${num}</div>
              <div style="font-size:10px;color:var(--text-muted)">${name}</div>
            </div>
            <span class="badge ${quality==='HIGH'?'badge-success':'badge-warning'}" style="margin-left:auto;font-size:10px">${quality}</span>
          </div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;font-size:11px;text-align:center">
            ${[['Status',status,'var(--wa-green)'],['Delivery',delivery,'var(--primary)'],['Daily Limit',limit,'var(--accent)']].map(([l,v,c])=>`
            <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:6px">
              <div style="color:var(--text-muted);font-size:10px">${l}</div>
              <div style="font-weight:700;color:${c}">${v}</div>
            </div>`).join('')}
            <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:6px">
              <div style="color:var(--text-muted);font-size:10px">Quality</div>
              <div style="font-weight:700;color:${qcolor}">${quality}</div>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Opt-in management -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-user-check" style="color:var(--info)"></i> Opt-in / Opt-out Control</div>
      </div>
      <div class="card-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
          ${[['Total Opted In','12,420','var(--wa-green)'],['Opted Out','28','var(--danger)'],['Pending Consent','142','var(--warning)'],['Blocked','8','var(--danger)']].map(([l,v,c])=>`
          <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px;text-align:center">
            <div style="font-size:22px;font-weight:800;color:${c}">${v}</div>
            <div style="font-size:11px;color:var(--text-muted)">${l}</div>
          </div>`).join('')}
        </div>
        <div style="background:rgba(9,132,227,0.08);border:1px solid rgba(9,132,227,0.2);border-radius:10px;padding:12px;font-size:12px;color:var(--text-muted);margin-bottom:12px">
          <i class="fas fa-info-circle" style="color:var(--info)"></i>
          Opt-out contacts are permanently blacklisted and can never be messaged again — fully compliant with TRAI and Meta policies.
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-sm btn-outline w-full" style="justify-content:center" onclick="showToast('Exporting opt-in list...','info')"><i class="fas fa-download"></i> Export List</button>
          <button class="btn btn-sm btn-primary w-full" style="justify-content:center" onclick="showToast('Consent campaign launched!','success')"><i class="fas fa-paper-plane"></i> Send Consent</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Rate Limiting & Throughput Controls -->
<div class="card" style="margin-bottom:24px">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-tachometer-alt" style="color:var(--warning)"></i> Rate Limiting & Throughput Control</div>
    <button class="btn btn-sm btn-outline" onclick="saveThrottle()"><i class="fas fa-save"></i> Save Settings</button>
  </div>
  <div class="card-body">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:20px">
      ${[
        ['Messages Per Minute','1,000','Recommended: 800-1200','tachometer-alt','var(--wa-green)'],
        ['Messages Per Hour','50,000','Max per number: 80K','clock','var(--primary)'],
        ['Messages Per Day','500,000','Platform limit: 1M','calendar-day','var(--accent)'],
        ['Batch Delay (seconds)','5-15','Random, anti-pattern','random','var(--warning)'],
      ].map(([label,val,hint,ic,color])=>`
      <div style="border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center">
        <i class="fas fa-${ic}" style="color:${color};font-size:20px;margin-bottom:8px;display:block"></i>
        <input type="text" class="form-control" value="${val}" style="text-align:center;font-size:18px;font-weight:800;color:white;margin-bottom:6px">
        <div style="font-size:11px;color:var(--text-muted)">${label}</div>
        <div style="font-size:10px;color:${color};margin-top:4px">${hint}</div>
      </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
      ${[
        ['Smart Throttle','Automatically adjust speed based on Meta quality score',true,'tachometer-alt'],
        ['Peak Hour Boost','Send more during 10AM-12PM & 4PM-7PM windows',true,'chart-line'],
        ['Weekend Reduce','Reduce rate by 40% on weekends to protect quality',false,'calendar-week'],
        ['Error Auto-Pause','Pause queue if error rate exceeds 2%',true,'pause-circle'],
        ['Quality Drop Alert','WhatsApp alert if quality drops below HIGH',true,'bell'],
        ['Retry Failed','Auto-retry failed messages after 30 minutes (max 3x)',true,'sync-alt'],
      ].map(([name,desc,on,ic])=>`
      <div style="border:1px solid var(--border);border-radius:12px;padding:14px;display:flex;align-items:flex-start;gap:10px">
        <div style="width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px">
          <i class="fas fa-${ic}" style="color:var(--primary);font-size:13px"></i>
        </div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:600;color:white;margin-bottom:3px">${name}</div>
          <div style="font-size:11px;color:var(--text-muted);line-height:1.4">${desc}</div>
        </div>
        <div class="toggle-switch ${on?'on':''}" onclick="toggleCompliance(this,'${name}')" style="width:38px;height:20px;border-radius:10px;background:${on?'var(--wa-green)':'var(--border)'};cursor:pointer;position:relative;transition:all 0.3s;flex-shrink:0;margin-top:2px">
          <div style="width:16px;height:16px;border-radius:50%;background:white;position:absolute;top:2px;${on?'right:2px':'left:2px'};transition:all 0.3s;box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- Policy & Guidelines -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-gavel" style="color:var(--primary)"></i> Regulatory Compliance</div>
    </div>
    <div class="card-body">
      ${[
        ['Meta Business API Policy','All messages via official Meta Cloud API. No unofficial or grey-market routes.','fab fa-whatsapp','var(--wa-green)',true],
        ['TRAI DLT Registration','All sender IDs and templates registered on DLT (Distributed Ledger Technology) portal.','fas fa-id-card','var(--info)',true],
        ['GDPR Compliance','User data stored in India. Right to erasure supported. Privacy policy enforced.','fas fa-lock','var(--primary)',true],
        ['IT Act 2000','Fully compliant with Indian IT Act data protection requirements.','fas fa-balance-scale','var(--accent)',true],
        ['WhatsApp Commerce Policy','No prohibited product categories. All merchants verified.','fas fa-store','var(--warning)',true],
        ['PDPB (India)','Aligned with India Personal Data Protection Bill requirements.','fas fa-shield-alt','#27ae60',true],
      ].map(([name,desc,ic,color,status])=>`
      <div style="display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid rgba(45,63,90,0.3)">
        <div style="width:32px;height:32px;border-radius:8px;background:${color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px">
          <i class="${ic}" style="color:${color};font-size:13px"></i>
        </div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:600;color:white">${name}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${desc}</div>
        </div>
        <i class="fas fa-check-circle" style="color:var(--success);font-size:16px;margin-top:4px"></i>
      </div>`).join('')}
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-chart-bar" style="color:var(--accent)"></i> Compliance Audit Log</div>
      <button class="btn btn-sm btn-outline" onclick="showToast('Downloading audit log...','info')"><i class="fas fa-download"></i> Export</button>
    </div>
    <div style="padding:8px 16px">
      ${[
        ['Template Approved by Meta','Flash Sale Nov 2024','2h ago','check-circle','var(--success)'],
        ['Opt-out Processed','Contact: +91 76543...','3h ago','user-times','var(--warning)'],
        ['Quality Alert Resolved','Number +91 97xxx — recovered to HIGH','5h ago','shield-alt','var(--wa-green)'],
        ['Bulk Send Throttled','Rate limit hit — auto adjusted to 800/min','6h ago','tachometer-alt','var(--info)'],
        ['DLT Template Registered','Payslip November template','1d ago','id-card','var(--primary)'],
        ['Blocked Contact Added','STOP request from +91 65xxx','1d ago','ban','var(--danger)'],
        ['Consent Campaign Sent','342 contacts re-consent requested','2d ago','paper-plane','var(--accent)'],
        ['API Key Rotated','Security rotation completed','3d ago','key','var(--warning)'],
      ].map(([action,detail,time,ic,color])=>`
      <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(45,63,90,0.3)">
        <div style="width:28px;height:28px;border-radius:7px;background:${color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <i class="fas fa-${ic}" style="color:${color};font-size:11px"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${action}</div>
          <div style="font-size:10px;color:var(--text-muted)">${detail}</div>
        </div>
        <span style="font-size:10px;color:var(--text-muted);white-space:nowrap">${time}</span>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- Big number delivery safety callout -->
<div style="background:linear-gradient(135deg,rgba(37,211,102,0.08),rgba(18,140,126,0.04));border:1px solid rgba(37,211,102,0.2);border-radius:16px;padding:24px;text-align:center">
  <div style="font-size:18px;font-weight:800;color:white;margin-bottom:8px">🚀 Deliver 1,000+ Messages — Without Spam Risk</div>
  <div style="font-size:13px;color:var(--text-muted);max-width:600px;margin:0 auto 16px;line-height:1.7">
    Our smart delivery engine intelligently batches, throttles, and spaces messages using random delays, warm-up schedules, and multiple number pools — protecting your WhatsApp quality score while delivering at scale.
  </div>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
    ${[
      ['1K messages','< 2 minutes','var(--wa-green)'],
      ['10K messages','~15 minutes','var(--primary)'],
      ['50K messages','~1 hour','var(--accent)'],
      ['1L messages','~2 hours','var(--warning)'],
      ['5L messages','~10 hours','var(--info)'],
    ].map(([vol,time,color])=>`
    <div style="background:rgba(255,255,255,0.05);border:1px solid ${color}33;border-radius:10px;padding:10px 16px;text-align:center">
      <div style="font-size:14px;font-weight:800;color:${color}">${vol}</div>
      <div style="font-size:11px;color:var(--text-muted)">${time}</div>
    </div>`).join('')}
  </div>
  <div style="margin-top:16px;font-size:11px;color:var(--text-muted)">
    *Delivery times depend on number pool size and Meta API rate limits. Enterprise plan supports multiple number pools for faster delivery.
  </div>
</div>

`, 'compliance', 'Compliance & Anti-Spam', 'Meta API compliance, spam protection & quality management', `.w-full{width:100%}`, `
function toggleCompliance(el, name) {
  const isOn = el.classList.contains('on');
  el.classList.toggle('on');
  el.style.background = isOn ? 'var(--border)' : 'var(--wa-green)';
  const dot = el.querySelector('div');
  if (isOn) { dot.style.left = '2px'; dot.style.right = ''; } else { dot.style.right = '2px'; dot.style.left = ''; }
  showToast(name + (isOn ? ' disabled' : ' enabled'), isOn ? 'error' : 'success');
}
function saveThrottle() {
  showToast('Rate limit settings saved!', 'success');
}
`)
