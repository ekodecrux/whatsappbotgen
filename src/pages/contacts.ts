import { pageShell } from './layout'

export const contactsHTML = () => pageShell(`
<div class="flex-between mb-6">
  <div>
    <h2 style="font-size:16px;font-weight:700;color:white">Contact Management</h2>
    <p style="font-size:12px;color:var(--text-muted)">Import, segment and manage your WhatsApp contact lists</p>
  </div>
  <div style="display:flex;gap:8px">
    <button class="btn btn-outline btn-sm" onclick="openModal('importModal')"><i class="fas fa-upload"></i> Import CSV</button>
    <button class="btn btn-success" onclick="openModal('addContactModal')"><i class="fas fa-plus"></i> Add Contact</button>
  </div>
</div>

<!-- Stats -->
<div class="stats-grid" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr));margin-bottom:24px">
  ${[
    ['Total Contacts','12,847','var(--wa-green)','fa-users'],
    ['Subscribed','11,203','var(--success)','fa-check-circle'],
    ['Opted Out','342','var(--danger)','fa-times-circle'],
    ['Segments','8','var(--primary)','fa-layer-group'],
    ['Custom Fields','12','var(--accent)','fa-tags'],
  ].map(([l,v,c,ic])=>`
  <div class="stat-card">
    <div class="stat-label">${l}</div>
    <div class="stat-value" style="font-size:22px;color:${c}">${v}</div>
    <i class="fas ${ic} stat-icon" style="color:${c}"></i>
  </div>`).join('')}
</div>

<div class="grid-2" style="margin-bottom:24px">
  <!-- Segments -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-layer-group" style="color:var(--primary)"></i> Segments</div>
      <button class="btn btn-sm btn-outline" onclick="showToast('Creating new segment...','info')"><i class="fas fa-plus"></i> New</button>
    </div>
    <div class="card-body" style="padding:12px">
      ${[
        ['All Contacts','12,847','var(--wa-green)','users'],
        ['Hot Buyers','342','var(--danger)','fire'],
        ['New this month','1,203','var(--info)','user-plus'],
        ['VIP Customers','89','#fdcb6e','crown'],
        ['Inactive 90d','3,400','var(--text-muted)','moon'],
        ['Product A Interest','2,100','var(--primary)','tag'],
        ['Website Visitors','4,210','var(--accent)','globe'],
        ['Event Attendees','650','var(--warning)','calendar'],
      ].map(([n,c,col,ic])=>`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-radius:9px;cursor:pointer;transition:all 0.2s;margin-bottom:2px" onmouseover="this.style.background='rgba(255,255,255,0.04)'" onmouseout="this.style.background='transparent'" onclick="showToast('Segment selected: ${n}','info')">
        <div style="display:flex;align-items:center;gap:9px">
          <div style="width:28px;height:28px;border-radius:8px;background:${col}22;display:flex;align-items:center;justify-content:center">
            <i class="fas fa-${ic}" style="color:${col};font-size:12px"></i>
          </div>
          <span style="font-size:13px;font-weight:500;color:white">${n}</span>
        </div>
        <span style="font-size:12px;font-weight:700;color:${col}">${c}</span>
      </div>`).join('')}
    </div>
  </div>

  <!-- Contact Upload Zone -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-upload" style="color:var(--accent)"></i> Import Contacts</div>
    </div>
    <div class="card-body">
      <div style="border:2px dashed var(--border);border-radius:12px;padding:32px;text-align:center;margin-bottom:16px;cursor:pointer;transition:all 0.2s" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'" onclick="openModal('importModal')">
        <i class="fas fa-cloud-upload-alt" style="font-size:36px;color:var(--primary);opacity:0.5;margin-bottom:12px;display:block"></i>
        <div style="font-size:14px;font-weight:600;color:white;margin-bottom:4px">Drop CSV file here</div>
        <div style="font-size:12px;color:var(--text-muted)">or click to browse • Supports CSV, XLSX</div>
      </div>
      <div style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:12px;margin-bottom:12px">
        <div style="font-size:12px;font-weight:700;color:var(--wa-green);margin-bottom:8px"><i class="fas fa-file-csv"></i> Required CSV Format</div>
        <code style="font-size:11px;color:var(--text-muted);display:block;line-height:1.8">Name, Phone, Email, City, Tag, Custom1</code>
        <code style="font-size:11px;color:var(--text-muted);display:block">Rahul S., +91 98765, r@x.com, Mumbai, VIP, ...</code>
      </div>
      <button class="btn btn-outline w-full" style="justify-content:center" onclick="showToast('Sample CSV downloaded!','success')"><i class="fas fa-download"></i> Download Sample CSV</button>
    </div>
  </div>
</div>

<!-- Contacts Table -->
<div class="card">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-address-book" style="color:var(--wa-green)"></i> Contact List</div>
    <div style="display:flex;gap:8px;align-items:center">
      <div style="background:var(--dark);border:1px solid var(--border);border-radius:8px;padding:6px 12px;display:flex;align-items:center;gap:8px">
        <i class="fas fa-search" style="color:var(--text-muted);font-size:12px"></i>
        <input placeholder="Search contacts..." style="background:none;border:none;outline:none;color:var(--text);font-size:12px;width:180px">
      </div>
      <select class="form-control" style="width:140px;padding:6px 10px;font-size:12px">
        <option>All Segments</option>
        <option>Hot Buyers</option>
        <option>VIP Customers</option>
      </select>
    </div>
  </div>
  <table class="data-table">
    <thead>
      <tr>
        <th><input type="checkbox" style="accent-color:var(--primary)"></th>
        <th>Contact</th>
        <th>Phone</th>
        <th>City</th>
        <th>Tags</th>
        <th>Subscribed</th>
        <th>Last Message</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${[
        ['Rahul Sharma','+91 98765 43210','Mumbai','VIP, Buyer',true,'2 hrs ago'],
        ['Priya Mehta','+91 87654 32109','Delhi','New Lead',true,'1 day ago'],
        ['Amit Patel','+91 76543 21098','Ahmedabad','Inactive',false,'30 days ago'],
        ['Sunita Rao','+91 65432 10987','Bengaluru','VIP, Closed',true,'Just now'],
        ['Vikram Singh','+91 54321 09876','Chennai','Hot Buyer',true,'5 hrs ago'],
        ['Meera Joshi','+91 43210 98765','Pune','New',true,'3 days ago'],
        ['Arjun Nair','+91 32109 87654','Hyderabad','Event',true,'1 week ago'],
        ['Deepa Kumar','+91 21098 76543','Kolkata','Product A',false,'2 weeks ago'],
      ].map(([n,p,city,tags,sub,last])=>`
      <tr>
        <td><input type="checkbox" style="accent-color:var(--primary)"></td>
        <td>
          <div style="display:flex;align-items:center;gap:9px">
            <div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:white;flex-shrink:0">${n.split(' ').map(w=>w[0]).join('')}</div>
            <span style="font-size:13px;font-weight:600;color:white">${n}</span>
          </div>
        </td>
        <td style="font-size:12px;color:var(--text-muted)">${p}</td>
        <td style="font-size:12px;color:var(--text-muted)">${city}</td>
        <td>${tags.split(', ').map(t=>`<span class="badge badge-purple" style="font-size:9px;margin-right:3px">${t}</span>`).join('')}</td>
        <td><span class="badge ${sub?'badge-success':'badge-danger'}" style="font-size:10px">${sub?'✓ Yes':'✗ No'}</span></td>
        <td style="font-size:12px;color:var(--text-muted)">${last}</td>
        <td>
          <div style="display:flex;gap:5px">
            <button class="btn btn-xs btn-success" onclick="showToast('Opening chat...','success')"><i class="fab fa-whatsapp"></i></button>
            <button class="btn btn-xs btn-outline" onclick="showToast('Editing contact...','info')"><i class="fas fa-edit"></i></button>
            <button class="btn btn-xs" style="background:rgba(231,76,60,0.15);color:#e74c3c;border:1px solid rgba(231,76,60,0.2)" onclick="showToast('Contact deleted','error')"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>`).join('')}
    </tbody>
  </table>
</div>

<!-- Import Modal -->
<div id="importModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-upload" style="color:var(--accent);margin-right:8px"></i>Import Contacts</span>
      <button class="modal-close" onclick="closeModal('importModal')">×</button>
    </div>
    <div class="modal-body">
      <div style="border:2px dashed var(--border);border-radius:12px;padding:40px;text-align:center;margin-bottom:18px">
        <i class="fas fa-file-csv" style="font-size:40px;color:var(--wa-green);margin-bottom:12px;display:block"></i>
        <div style="font-size:14px;font-weight:600;color:white;margin-bottom:6px">Drop your CSV file here</div>
        <input type="file" accept=".csv,.xlsx" style="display:none" id="csvInput" onchange="handleFile(this)">
        <button class="btn btn-outline btn-sm" onclick="document.getElementById('csvInput').click()"><i class="fas fa-folder-open"></i> Browse File</button>
      </div>
      <div class="form-group">
        <label class="form-label">Assign to Segment</label>
        <select class="form-control"><option>Create New Segment</option><option>Hot Buyers</option><option>Newsletter</option></select>
      </div>
      <div style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:8px;padding:10px 14px;font-size:12px;color:#94a3b8">
        <i class="fas fa-shield-check" style="color:var(--wa-green);margin-right:6px"></i>
        All imported numbers will be validated. Invalid or opted-out contacts are automatically filtered.
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('importModal')">Cancel</button>
      <button class="btn btn-success" onclick="closeModal('importModal');showToast('Contacts imported successfully! 12,847 added.','success')"><i class="fas fa-upload"></i> Import</button>
    </div>
  </div>
</div>

<!-- Add Contact Modal -->
<div id="addContactModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-user-plus" style="color:var(--wa-green);margin-right:8px"></i>Add Contact</span>
      <button class="modal-close" onclick="closeModal('addContactModal')">×</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group"><label class="form-label">Name</label><input class="form-control" placeholder="Full name"></div>
        <div class="form-group"><label class="form-label">Phone</label><input class="form-control" placeholder="+91 98765 43210"></div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-control" placeholder="email@example.com"></div>
        <div class="form-group"><label class="form-label">City</label><input class="form-control" placeholder="City"></div>
      </div>
      <div class="form-group"><label class="form-label">Tags</label><input class="form-control" placeholder="VIP, Buyer, Product A (comma separated)"></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('addContactModal')">Cancel</button>
      <button class="btn btn-success" onclick="closeModal('addContactModal');showToast('Contact added!','success')"><i class="fas fa-save"></i> Save Contact</button>
    </div>
  </div>
</div>

`, 'contacts', 'Contacts', 'Manage your WhatsApp contact lists and segments', '', `function handleFile(inp){if(inp.files[0])showToast('File selected: '+inp.files[0].name,'info');}`)
