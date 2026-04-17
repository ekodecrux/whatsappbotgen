import { pageShell } from './layout'

export const leadsHTML = () => pageShell(`
<!-- CRM Header -->
<div class="flex-between mb-6">
  <div>
    <h2 style="font-size:16px;font-weight:700;color:white">Lead Management & CRM Pipeline</h2>
    <p style="font-size:12px;color:var(--text-muted)">Track every lead from first click to final closure</p>
  </div>
  <div style="display:flex;gap:8px">
    <button class="btn btn-outline btn-sm"><i class="fas fa-filter"></i> Filter</button>
    <button class="btn btn-outline btn-sm"><i class="fas fa-download"></i> Export</button>
    <button class="btn btn-success" onclick="openModal('addLeadModal')"><i class="fas fa-plus"></i> Add Lead</button>
  </div>
</div>

<!-- Pipeline Stats -->
<div class="stats-grid" style="grid-template-columns:repeat(auto-fill,minmax(140px,1fr));margin-bottom:24px">
  ${[
    ['Total Leads','1,293','var(--primary)','fa-users'],
    ['Hot Leads','87','var(--danger)','fa-fire'],
    ['Warm Leads','342','var(--warning)','fa-thermometer-half'],
    ['Proposals Sent','156','var(--info)','fa-file-invoice'],
    ['Closed Won','89','var(--success)','fa-trophy'],
    ['Pipeline Value','₹18.4L','var(--wa-green)','fa-rupee-sign'],
  ].map(([l,v,c,ic])=>`
  <div class="stat-card" style="--c:${c}">
    <div class="stat-label">${l}</div>
    <div class="stat-value" style="font-size:20px;color:${c}">${v}</div>
    <i class="fas ${ic} stat-icon" style="color:${c}"></i>
  </div>`).join('')}
</div>

<!-- Kanban Pipeline -->
<div style="overflow-x:auto;padding-bottom:8px;margin-bottom:24px">
  <div style="display:flex;gap:16px;min-width:800px">
    ${[
      ['New','23','var(--info)','fa-user-plus'],
      ['Contacted','45','var(--primary)','fa-phone'],
      ['Demo','18','var(--warning)','fa-desktop'],
      ['Proposal','12','var(--accent)','fa-file-alt'],
      ['Negotiation','8','var(--wa-green)','fa-handshake'],
      ['Closed Won','6','var(--success)','fa-trophy'],
    ].map(([stage, count, color, ic], si)=>`
    <div style="flex:1;min-width:180px">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;margin-bottom:10px;border-bottom:2px solid ${color}">
        <div style="display:flex;align-items:center;gap:7px;font-size:12px;font-weight:700;color:white">
          <i class="fas ${ic}" style="color:${color}"></i> ${stage}
        </div>
        <span style="background:${color}22;color:${color};border-radius:20px;padding:2px 9px;font-size:11px;font-weight:700">${count}</span>
      </div>
      ${si < 3 ? [
        ['Rahul Sharma', '+91 98765', 'Diwali Poster', '₹15K', 'hot'],
        ['Priya Mehta', '+91 87654', 'Website', '₹8.5K', 'warm'],
      ].slice(0, si < 2 ? 2 : 1).map(([n,p,src,val,heat])=>`
      <div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:8px;cursor:pointer;transition:all 0.2s" onmouseover="this.style.borderColor='${color}'" onmouseout="this.style.borderColor='var(--border)'" onclick="openModal('leadDetailModal')">
        <div style="font-size:12px;font-weight:700;color:white;margin-bottom:4px">${n}</div>
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:8px">${p} • ${src}</div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:11px;font-weight:700;color:var(--wa-green)">${val}</span>
          <span class="badge ${heat==='hot'?'badge-danger':'badge-warning'}" style="font-size:9px">${heat}</span>
        </div>
      </div>`).join('') : `<div style="border:1px dashed var(--border);border-radius:10px;padding:20px;text-align:center;color:var(--text-muted);font-size:11px;cursor:pointer" onclick="showToast('Click to view all ${count} leads in this stage','info')">View ${count} leads</div>`}
      <button onclick="openModal('addLeadModal')" style="width:100%;padding:8px;background:transparent;border:1px dashed var(--border);border-radius:8px;color:var(--text-muted);font-size:11px;cursor:pointer;font-family:inherit;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:5px" onmouseover="this.style.borderColor='${color}';this.style.color='${color}'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-muted)'">
        <i class="fas fa-plus"></i> Add Lead
      </button>
    </div>`).join('')}
  </div>
</div>

<!-- Lead Table -->
<div class="card">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-table" style="color:var(--primary)"></i> All Leads</div>
    <div style="display:flex;gap:8px;align-items:center">
      <div style="background:var(--dark);border:1px solid var(--border);border-radius:8px;padding:6px 12px;display:flex;align-items:center;gap:8px">
        <i class="fas fa-search" style="color:var(--text-muted);font-size:12px"></i>
        <input placeholder="Search leads..." style="background:none;border:none;outline:none;color:var(--text);font-size:12px;width:160px">
      </div>
      <select class="form-control" style="width:120px;padding:6px 10px;font-size:12px">
        <option>All Leads</option>
        <option>🔥 Hot</option>
        <option>🌡️ Warm</option>
        <option>🧊 Cold</option>
      </select>
    </div>
  </div>
  <table class="data-table">
    <thead>
      <tr>
        <th><input type="checkbox" style="accent-color:var(--primary)"></th>
        <th>Lead</th>
        <th>Source</th>
        <th>Status</th>
        <th>Stage</th>
        <th>Value</th>
        <th>Last Contact</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="leadsBody">
      <tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-muted)"><i class="fas fa-spinner fa-spin"></i></td></tr>
    </tbody>
  </table>
</div>

<!-- Lead Detail Modal -->
<div id="leadDetailModal" class="modal-overlay">
  <div class="modal" style="max-width:640px">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-user" style="color:var(--primary);margin-right:8px"></i>Lead Details — Rahul Sharma</span>
      <button class="modal-close" onclick="closeModal('leadDetailModal')">×</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
        <div style="background:var(--dark);border:1px solid var(--border);border-radius:12px;padding:16px">
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:12px;text-transform:uppercase;font-weight:700">Contact Info</div>
          ${[['Name','Rahul Sharma'],['Phone','+91 98765 43210'],['Email','rahul@example.com'],['City','Mumbai']].map(([k,v])=>`
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:12px">
            <span style="color:var(--text-muted)">${k}</span>
            <span style="color:white;font-weight:600">${v}</span>
          </div>`).join('')}
        </div>
        <div style="background:var(--dark);border:1px solid var(--border);border-radius:12px;padding:16px">
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:12px;text-transform:uppercase;font-weight:700">Lead Info</div>
          ${[['Source','Diwali Poster'],['Status','🔥 Hot'],['Stage','Demo'],['Value','₹15,000']].map(([k,v])=>`
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:12px">
            <span style="color:var(--text-muted)">${k}</span>
            <span style="color:white;font-weight:600">${v}</span>
          </div>`).join('')}
        </div>
      </div>

      <div style="margin-bottom:16px">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;font-weight:700">Move Stage</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${['New','Contacted','Demo','Proposal','Negotiation','Closed Won','Closed Lost'].map((s,i)=>`
          <button class="btn btn-xs ${i===2?'btn-primary':'btn-outline'}" onclick="showToast('Stage updated to ${s}','success')">${s}</button>`).join('')}
        </div>
      </div>

      <div style="margin-bottom:16px">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;font-weight:700">Activity Timeline</div>
        ${[
          ['2 hrs ago','fas fa-comment','WhatsApp','Asked about product pricing','var(--wa-green)'],
          ['1 day ago','fas fa-phone','Call','Interested in demo, scheduled for tomorrow','var(--info)'],
          ['2 days ago','fas fa-image','Poster Click','Clicked Diwali Sale poster','var(--warning)'],
        ].map(([t,ic,type,note,c])=>`
        <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid rgba(45,63,90,0.4)">
          <div style="width:30px;height:30px;border-radius:50%;background:${c}22;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="${ic}" style="color:${c};font-size:12px"></i></div>
          <div>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
              <span style="font-size:11px;font-weight:700;color:white">${type}</span>
              <span style="font-size:10px;color:var(--text-muted)">${t}</span>
            </div>
            <div style="font-size:12px;color:var(--text-muted)">${note}</div>
          </div>
        </div>`).join('')}
      </div>

      <div class="form-group">
        <label class="form-label">Add Note / Next Action</label>
        <textarea class="form-control" rows="2" placeholder="Add notes or next action..."></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-success" onclick="closeModal('leadDetailModal');showToast('Opening WhatsApp chat','success')"><i class="fab fa-whatsapp"></i> Send WhatsApp</button>
      <button class="btn btn-primary" onclick="closeModal('leadDetailModal');showToast('Note saved!','success')"><i class="fas fa-save"></i> Save & Close</button>
    </div>
  </div>
</div>

<!-- Add Lead Modal -->
<div id="addLeadModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-user-plus" style="color:var(--wa-green);margin-right:8px"></i>Add New Lead</span>
      <button class="modal-close" onclick="closeModal('addLeadModal')">×</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group"><label class="form-label">Full Name</label><input class="form-control" placeholder="John Doe"></div>
        <div class="form-group"><label class="form-label">Phone (WhatsApp)</label><input class="form-control" placeholder="+91 98765 43210"></div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-control" placeholder="john@email.com"></div>
        <div class="form-group"><label class="form-label">City</label><input class="form-control" placeholder="Mumbai"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group"><label class="form-label">Lead Source</label><select class="form-control"><option>Manual Entry</option><option>Poster Click</option><option>Website Chat</option><option>Campaign</option></select></div>
        <div class="form-group"><label class="form-label">Status</label><select class="form-control"><option>Hot 🔥</option><option>Warm 🌡️</option><option>Cold 🧊</option></select></div>
        <div class="form-group"><label class="form-label">Estimated Value (₹)</label><input class="form-control" placeholder="10000"></div>
        <div class="form-group"><label class="form-label">Assign To</label><select class="form-control"><option>Me</option><option>Sales Team A</option><option>Sales Team B</option></select></div>
      </div>
      <div class="form-group"><label class="form-label">Notes</label><textarea class="form-control" rows="2" placeholder="Initial notes about this lead..."></textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('addLeadModal')">Cancel</button>
      <button class="btn btn-success" onclick="closeModal('addLeadModal');showToast('Lead added and notification sent via WhatsApp!','success')"><i class="fas fa-plus"></i> Add Lead</button>
    </div>
  </div>
</div>

`, 'leads', 'Leads & CRM', 'Full sales pipeline tracking from click to closure', '', `
fetch('/api/leads').then(r=>r.json()).then(data=>{
  const sc={hot:'badge-danger',warm:'badge-warning',cold:'badge-info'};
  const stageColors={new:'var(--info)',contacted:'var(--primary)',demo:'var(--warning)',proposal:'var(--accent)',negotiation:'var(--wa-green)',closed:'var(--success)'};
  document.getElementById('leadsBody').innerHTML = data.map(l=>\`
    <tr style="cursor:pointer" onclick="openModal('leadDetailModal')">
      <td><input type="checkbox" style="accent-color:var(--primary)" onclick="event.stopPropagation()"></td>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;flex-shrink:0">\${l.name.split(' ').map(w=>w[0]).join('')}</div>
          <div>
            <div style="font-size:13px;font-weight:700;color:white">\${l.name}</div>
            <div style="font-size:11px;color:var(--text-muted)">\${l.phone}</div>
          </div>
        </div>
      </td>
      <td><span style="font-size:12px;color:var(--text-muted)">\${l.source}</span></td>
      <td><span class="badge \${sc[l.status]}">\${l.status==='hot'?'🔥':l.status==='warm'?'🌡️':'🧊'} \${l.status}</span></td>
      <td><span class="badge badge-purple" style="text-transform:capitalize">\${l.stage}</span></td>
      <td style="font-size:13px;font-weight:700;color:var(--wa-green)">₹\${l.value.toLocaleString()}</td>
      <td style="font-size:12px;color:var(--text-muted)">\${l.lastContact}</td>
      <td onclick="event.stopPropagation()">
        <div style="display:flex;gap:5px">
          <button class="btn btn-xs btn-success" onclick="showToast('Opening WhatsApp chat...','success')"><i class="fab fa-whatsapp"></i></button>
          <button class="btn btn-xs btn-outline" onclick="openModal('leadDetailModal')"><i class="fas fa-eye"></i></button>
          <button class="btn btn-xs btn-outline" onclick="showToast('Calling...','info')"><i class="fas fa-phone"></i></button>
        </div>
      </td>
    </tr>\`).join('');
});
`)
