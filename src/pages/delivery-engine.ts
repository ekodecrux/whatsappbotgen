import { pageShell } from './layout'

export const deliveryEngineHTML = () => pageShell(`
<!-- Header -->
<div class="flex-between mb-6">
  <div>
    <h2 style="font-size:16px;font-weight:700;color:white">Smart Delivery Engine</h2>
    <p style="font-size:12px;color:var(--text-muted)">Intelligent batching, rate control and spam protection for 1,000+ msgs/hour</p>
  </div>
  <div style="display:flex;gap:8px;align-items:center">
    <span class="badge badge-success"><i class="fas fa-circle" style="font-size:8px"></i> Engine Running</span>
    <button class="btn btn-outline btn-sm" onclick="openModal('batchConfigModal')"><i class="fas fa-cog"></i> Configure</button>
  </div>
</div>

<!-- Live Metrics -->
<div class="stats-grid" style="margin-bottom:24px">
  ${[
    ['Queue Size','48,320','Messages waiting','var(--warning)','layer-group','orange'],
    ['Processing','1,200','Current batch','var(--primary)','cog fa-spin','purple'],
    ['Delivered','45,890','Last 24 hrs','var(--wa-green)','check-double','green'],
    ['Failed / Retry','42','Auto-retrying','var(--danger)','redo','red'],
    ['Quality Score','96/100','High — No risk','var(--success)','shield-alt','green'],
    ['Throughput','80 msg/s','Current rate','var(--accent)','tachometer-alt','blue'],
  ].map(([l,v,m,c,ic,theme])=>`
  <div class="stat-card ${theme}">
    <div class="stat-label">${l}</div>
    <div class="stat-value" style="font-size:22px">${v}</div>
    <div class="stat-meta">${m}</div>
    <i class="fas fa-${ic} stat-icon" style="color:${c}"></i>
  </div>`).join('')}
</div>

<!-- Rate Governor + Quality Score -->
<div class="grid-2" style="margin-bottom:24px">

  <!-- Rate Governor -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-tachometer-alt" style="color:var(--primary)"></i> Rate Governor</div>
      <span class="badge badge-success">Auto-managed</span>
    </div>
    <div class="card-body">
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-bottom:20px">
        ${[
          ['Batch Size','50 msgs','Configurable 10–100','var(--wa-green)'],
          ['Inter-batch Delay','2,000ms','Configurable 1–30s','var(--primary)'],
          ['Max Concurrent','3 batches','Parallel processing','var(--accent)'],
          ['Daily Limit','10,000 msgs','Per phone number','var(--warning)'],
        ].map(([l,v,sub,c])=>`
        <div style="background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center">
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">${l}</div>
          <div style="font-size:17px;font-weight:800;color:${c}">${v}</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:3px">${sub}</div>
        </div>`).join('')}
      </div>

      <!-- Throughput Visualization -->
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px;font-weight:600">REAL-TIME THROUGHPUT (msgs/sec)</div>
      <div style="display:flex;align-items:flex-end;gap:3px;height:60px;background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:8px;padding:8px">
        ${Array.from({length:30},()=>Math.floor(60+Math.random()*40)).map((h,i)=>`
        <div style="flex:1;border-radius:2px 2px 0 0;background:${i===29?'var(--wa-green)':'rgba(37,211,102,0.4)'};height:${h}%;min-height:2px;transition:height 0.3s" id="bar${i}"></div>`).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-top:4px"><span>30s ago</span><span>Now: 80 msg/s</span></div>
    </div>
  </div>

  <!-- WhatsApp Quality Score Monitor -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-shield-alt" style="color:var(--success)"></i> Quality Score Monitor</div>
      <span class="badge badge-success">🟢 HIGH</span>
    </div>
    <div class="card-body">
      <!-- Score Gauge -->
      <div style="text-align:center;margin-bottom:20px;padding:20px;background:rgba(0,184,148,0.08);border:1px solid rgba(0,184,148,0.2);border-radius:14px">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px">WhatsApp Quality Rating</div>
        <div style="font-size:52px;font-weight:900;color:var(--success);line-height:1">96<span style="font-size:20px;color:var(--text-muted)">/100</span></div>
        <div style="display:flex;justify-content:center;gap:4px;margin:12px 0">
          ${Array.from({length:10},(_,i)=>`<div style="width:20px;height:8px;border-radius:4px;background:${i<9?'var(--success)':'var(--border)'}"></div>`).join('')}
        </div>
        <div style="font-size:12px;color:var(--success);font-weight:700">🟢 HIGH QUALITY — Full sending capacity</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px">
        ${[
          ['Block Rate','0.02%','< 0.5% target','var(--success)','far below limit'],
          ['Report Rate','0.01%','< 0.3% target','var(--success)','excellent'],
          ['Opt-out Rate','0.3%','< 2% target','var(--success)','healthy'],
          ['Template Quality','Approved','All templates OK','var(--success)','compliant'],
        ].map(([m,v,target,c,note])=>`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:rgba(255,255,255,0.03);border-radius:8px">
          <span style="font-size:12px;color:var(--text)">${m}</span>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:12px;font-weight:700;color:${c}">${v}</span>
            <span style="font-size:10px;color:var(--text-muted)">${target}</span>
            <span style="font-size:10px;color:${c};background:${c}15;padding:2px 7px;border-radius:20px">${note}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- Active Batch Queue -->
<div class="card" style="margin-bottom:24px">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-layer-group" style="color:var(--accent)"></i> Live Batch Queue</div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-xs btn-outline" onclick="showToast('Queue paused','info')"><i class="fas fa-pause"></i> Pause All</button>
      <button class="btn btn-xs btn-success" onclick="showToast('Queue resumed','success')"><i class="fas fa-play"></i> Resume</button>
    </div>
  </div>
  <table class="data-table" id="batchTable">
    <thead>
      <tr>
        <th>Batch ID</th>
        <th>Name</th>
        <th>Progress</th>
        <th>Delivered</th>
        <th>Failed</th>
        <th>Status</th>
        <th>Started</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="batchBody">
      <tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)"><i class="fas fa-spinner fa-spin"></i></td></tr>
    </tbody>
  </table>
</div>

<!-- Spam Protection Rules -->
<div class="card">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-shield-alt" style="color:var(--danger)"></i> Spam Protection Rules</div>
    <a href="/compliance" class="btn btn-sm btn-outline">Full Compliance →</a>
  </div>
  <div class="card-body">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px">
      ${[
        {rule:'DND List Check',desc:'Filter numbers on TRAI DND registry before every send',status:true,icon:'fa-ban',color:'var(--danger)'},
        {rule:'Opt-out Respect',desc:'Auto-block contacts who reply STOP / unsubscribe',status:true,icon:'fa-user-times',color:'var(--warning)'},
        {rule:'Number Validation',desc:'Validate all numbers before queuing. Skip invalid formats',status:true,icon:'fa-phone-slash',color:'var(--primary)'},
        {rule:'Duplicate Filter',desc:'Auto-remove duplicate numbers in the same campaign batch',status:true,icon:'fa-copy',color:'var(--accent)'},
        {rule:'Frequency Cap',desc:'Max 3 messages/day per number across all campaigns',status:true,icon:'fa-clock',color:'var(--success)'},
        {rule:'Content Scanner',desc:'Auto-scan for spam trigger words before template approval',status:true,icon:'fa-search',color:'var(--info)'},
        {rule:'Quality Auto-pause',desc:'Pause sending if quality score drops below 70',status:true,icon:'fa-pause-circle',color:'#fdcb6e'},
        {rule:'Retry Logic',desc:'Failed msgs retry 3× with exponential backoff (5m, 15m, 1hr)',status:true,icon:'fa-redo',color:'var(--success)'},
      ].map(r=>`
      <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center;gap:8px">
            <i class="fas ${r.icon}" style="color:${r.color};font-size:14px"></i>
            <span style="font-size:12px;font-weight:700;color:white">${r.rule}</span>
          </div>
          <label style="position:relative;display:inline-block;width:36px;height:20px;cursor:pointer">
            <input type="checkbox" ${r.status?'checked':''} style="opacity:0;width:0;height:0" onchange="showToast(this.checked?'Rule enabled':'Rule disabled',this.checked?'success':'info')">
            <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:${r.status?'var(--wa-green)':'var(--border)'};border-radius:10px;transition:0.3s"></span>
            <span style="position:absolute;height:16px;width:16px;left:${r.status?'18px':'2px'};bottom:2px;background:white;border-radius:50%;transition:0.3s"></span>
          </label>
        </div>
        <div style="font-size:11px;color:#64748b;line-height:1.5">${r.desc}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- Batch Config Modal -->
<div id="batchConfigModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-cog" style="color:var(--primary);margin-right:8px"></i>Delivery Engine Configuration</span>
      <button class="modal-close" onclick="closeModal('batchConfigModal')">×</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group">
          <label class="form-label">Batch Size (msgs per batch)</label>
          <input type="range" min="10" max="100" value="50" class="form-control" style="padding:8px 0" oninput="document.getElementById('bsVal').textContent=this.value">
          <div style="font-size:12px;color:var(--wa-green);font-weight:700;margin-top:4px">Current: <span id="bsVal">50</span> msgs</div>
        </div>
        <div class="form-group">
          <label class="form-label">Inter-batch Delay (seconds)</label>
          <input type="range" min="1" max="30" value="2" class="form-control" style="padding:8px 0" oninput="document.getElementById('delVal').textContent=this.value">
          <div style="font-size:12px;color:var(--primary);font-weight:700;margin-top:4px">Current: <span id="delVal">2</span>s</div>
        </div>
        <div class="form-group">
          <label class="form-label">Max Concurrent Batches</label>
          <select class="form-control"><option>1</option><option selected>3</option><option>5</option><option>10</option></select>
        </div>
        <div class="form-group">
          <label class="form-label">Daily Message Limit</label>
          <input type="number" class="form-control" value="10000" placeholder="Per phone number">
        </div>
        <div class="form-group">
          <label class="form-label">Quality Score Pause Threshold</label>
          <select class="form-control"><option>60</option><option selected>70</option><option>80</option></select>
        </div>
        <div class="form-group">
          <label class="form-label">Retry Attempts</label>
          <select class="form-control"><option>1</option><option>2</option><option selected>3</option><option>5</option></select>
        </div>
      </div>
      <div style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:12px;font-size:12px;color:#94a3b8;margin-top:4px">
        <i class="fas fa-info-circle" style="color:var(--wa-green);margin-right:6px"></i>
        With these settings: 10,000 msgs will take ~<strong style="color:var(--wa-green)">6.7 minutes</strong>. Quality maintained at HIGH.
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('batchConfigModal')">Cancel</button>
      <button class="btn btn-success" onclick="closeModal('batchConfigModal');showToast('Engine configuration saved!','success')"><i class="fas fa-save"></i> Save Configuration</button>
    </div>
  </div>
</div>

`, 'delivery', 'Smart Delivery Engine', 'Intelligent batching, rate control & spam protection', '', `
fetch('/api/delivery/queue').then(r=>r.json()).then(d=>{
  const sc = {completed:'badge-success',running:'badge-info',queued:'badge-warning',failed:'badge-danger'};
  document.getElementById('batchBody').innerHTML = d.batches.map(b=>\`
    <tr>
      <td style="font-size:11px;font-family:monospace;color:var(--accent)">\${b.id}</td>
      <td style="font-size:13px;font-weight:600;color:white">\${b.name}</td>
      <td style="min-width:140px">
        <div style="display:flex;align-items:center;gap:8px">
          <div class="progress" style="flex:1"><div class="progress-bar green" style="width:\${b.sent?Math.round(b.sent/b.total*100):0}%"></div></div>
          <span style="font-size:11px;color:var(--text-muted);white-space:nowrap">\${b.sent}/\${b.total}</span>
        </div>
      </td>
      <td style="color:var(--wa-green);font-weight:700">\${b.delivered.toLocaleString()}</td>
      <td style="color:\${b.failed>0?'var(--danger)':'var(--text-muted)'}">\${b.failed}</td>
      <td><span class="badge \${sc[b.status]||'badge-info'}">\${b.status}</span></td>
      <td style="font-size:12px;color:var(--text-muted)">\${b.time}</td>
      <td>
        <div style="display:flex;gap:4px">
          \${b.status==='running'?'<button class="btn btn-xs btn-outline" onclick="showToast(\'Batch paused\',\'info\')"><i class="fas fa-pause"></i></button>':''}
          \${b.status==='queued'?'<button class="btn btn-xs btn-danger" onclick="showToast(\'Batch cancelled\',\'error\')"><i class="fas fa-times"></i></button>':''}
          <button class="btn btn-xs btn-outline" onclick="showToast(\'Viewing batch details...\',\'info\')"><i class="fas fa-eye"></i></button>
        </div>
      </td>
    </tr>\`).join('');
});

// Animate bars
setInterval(()=>{
  for(let i=0;i<30;i++){
    const bar = document.getElementById('bar'+i);
    if(bar) bar.style.height = (50+Math.random()*50)+'%';
  }
}, 1000);
`)
