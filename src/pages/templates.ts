import { pageShell } from './layout'

export const templatesHTML = () => pageShell(`
<div class="flex-between mb-6">
  <div>
    <h2 style="font-size:16px;font-weight:700;color:white">Message Templates</h2>
    <p style="font-size:12px;color:var(--text-muted)">Create and manage Meta-approved WhatsApp message templates</p>
  </div>
  <button class="btn btn-success" onclick="openModal('newTemplateModal')"><i class="fas fa-plus"></i> Create Template</button>
</div>

<div class="grid-2" style="margin-bottom:24px">
  <!-- Template List -->
  <div class="card" style="grid-column:1 / -1">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-file-alt" style="color:var(--primary)"></i> My Templates</div>
      <div style="display:flex;gap:8px">
        <select class="form-control" style="width:150px;padding:6px 10px;font-size:12px">
          <option>All Categories</option>
          <option>Marketing</option>
          <option>Utility</option>
          <option>Authentication</option>
          <option>Transactional</option>
        </select>
      </div>
    </div>
    <table class="data-table" id="tmplTable">
      <thead>
        <tr>
          <th>Template Name</th>
          <th>Category</th>
          <th>Language</th>
          <th>Status</th>
          <th>Used</th>
          <th>Preview</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="tmplBody">
        <tr><td colspan="7" style="text-align:center;padding:30px;color:var(--text-muted)"><i class="fas fa-spinner fa-spin"></i></td></tr>
      </tbody>
    </table>
  </div>
</div>

<!-- Template Examples -->
<div>
  <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:16px"><i class="fas fa-magic" style="color:#fdcb6e;margin-right:8px"></i>Template Library — Ready to Use</h3>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">
    ${[
      {
        name:'Welcome New Customer',cat:'UTILITY',msg:"Hello {{1}}! 👋 Welcome to {{2}}. We're thrilled to have you! Here's what you can do:",
        btns:['Browse Products →','Get Support →'],
        color:'var(--wa-green)'
      },
      {
        name:'Flash Sale Alert',cat:'MARKETING',msg:"🔥 *FLASH SALE* — {{1}}% OFF! Only {{2}} hours left!\n\n{{3}}\n\nUse code: *{{4}}*",
        btns:['Shop Now →','Share with Friends →'],
        color:'var(--danger)'
      },
      {
        name:'Order Confirmation',cat:'TRANSACTIONAL',msg:"✅ Order #{{1}} confirmed!\n\nHi {{2}}, your order of {{3}} will be delivered by {{4}}.\n\nTrack your order:",
        btns:['Track Order →'],
        color:'var(--success)'
      },
      {
        name:'Appointment Reminder',cat:'UTILITY',msg:"📅 Reminder: You have an appointment at *{{1}}* on {{2}} at {{3}}.\n\nReply *CONFIRM* or *CANCEL*",
        btns:['Confirm ✓','Cancel ✗','Reschedule →'],
        color:'var(--info)'
      },
    ].map(t=>`
    <div class="card">
      <div class="card-header">
        <div style="flex:1">
          <div style="font-size:13px;font-weight:700;color:white">${t.name}</div>
          <span class="badge badge-purple" style="font-size:9px;margin-top:4px">${t.cat}</span>
        </div>
        <button class="btn btn-xs btn-success" onclick="showToast('Template cloned to your library!','success')"><i class="fas fa-plus"></i> Use</button>
      </div>
      <div class="card-body" style="padding:12px">
        <!-- WhatsApp preview -->
        <div style="background:#0b1120;border-radius:10px;padding:12px;margin-bottom:12px">
          <div style="display:flex;justify-content:flex-end">
            <div style="background:#005c4b;border-radius:10px 10px 0 10px;padding:10px 14px;max-width:240px">
              <div style="font-size:12px;color:rgba(255,255,255,0.9);line-height:1.5;white-space:pre-line">${t.msg.replace(/{{(\d+)}}/g,'<span style="color:var(--wa-green);font-weight:700">{{$1}}</span>')}</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.4);text-align:right;margin-top:4px">✓✓ 10:30</div>
            </div>
          </div>
          ${t.btns.map(b=>`<div style="background:rgba(255,255,255,0.08);border-radius:8px;padding:7px 12px;margin-top:6px;text-align:center;font-size:12px;color:var(--accent);font-weight:600">${b}</div>`).join('')}
        </div>
      </div>
    </div>`).join('')}
  </div>
</div>

<!-- New Template Modal -->
<div id="newTemplateModal" class="modal-overlay">
  <div class="modal" style="max-width:640px">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-file-alt" style="color:var(--primary);margin-right:8px"></i>Create Message Template</span>
      <button class="modal-close" onclick="closeModal('newTemplateModal')">×</button>
    </div>
    <div class="modal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group">
          <label class="form-label">Template Name</label>
          <input class="form-control" placeholder="my_template_name (lowercase, underscore)">
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="form-control">
            <option>MARKETING</option>
            <option>UTILITY</option>
            <option>AUTHENTICATION</option>
            <option>TRANSACTIONAL</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Header (Optional)</label>
        <select class="form-control" style="margin-bottom:8px">
          <option>None</option>
          <option>Text</option>
          <option>Image</option>
          <option>Video</option>
          <option>Document</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Message Body</label>
        <textarea class="form-control" rows="4" placeholder="Use {{1}}, {{2}} for variables. E.g. Hello {{1}}, your order {{2}} is ready!"></textarea>
        <div style="font-size:11px;color:var(--text-muted);margin-top:5px">Variables: Use {{1}}, {{2}} format. Bold: *text* Italic: _text_</div>
      </div>
      <div class="form-group">
        <label class="form-label">Footer (Optional)</label>
        <input class="form-control" placeholder="e.g., Reply STOP to unsubscribe">
      </div>
      <div class="form-group">
        <label class="form-label">Buttons (max 3)</label>
        <div id="btnList" style="display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;gap:8px">
            <select class="form-control" style="width:140px;font-size:12px"><option>Quick Reply</option><option>Call to Action</option><option>Phone</option></select>
            <input class="form-control" placeholder="Button text" style="flex:1">
          </div>
        </div>
        <button class="btn-add-option" onclick="addBtn()" style="margin-top:8px"><i class="fas fa-plus"></i> Add Button</button>
      </div>
      <div style="background:rgba(243,156,18,0.1);border:1px solid rgba(243,156,18,0.2);border-radius:10px;padding:12px;font-size:12px;color:#94a3b8">
        <i class="fas fa-clock" style="color:var(--warning);margin-right:6px"></i>
        Templates are submitted to Meta for approval. Usually approved within 24-48 hours.
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('newTemplateModal')">Cancel</button>
      <button class="btn btn-primary" onclick="closeModal('newTemplateModal');showToast('Template submitted for Meta approval!','success')"><i class="fas fa-paper-plane"></i> Submit for Approval</button>
    </div>
  </div>
</div>

`, 'templates', 'Templates', 'Create and manage Meta-approved message templates', '', `
fetch('/api/templates').then(r=>r.json()).then(data=>{
  const catColors={UTILITY:'badge-info',TRANSACTIONAL:'badge-wa',MARKETING:'badge-warning',AUTHENTICATION:'badge-purple'};
  document.getElementById('tmplBody').innerHTML = data.map(t=>\`
    <tr>
      <td style="font-size:13px;font-weight:700;color:white">\${t.name}</td>
      <td><span class="badge \${catColors[t.category]||'badge-purple'}" style="font-size:10px">\${t.category}</span></td>
      <td style="font-size:12px;color:var(--text-muted)">\${t.language.toUpperCase()}</td>
      <td><span class="badge \${t.status==='approved'?'badge-success':'badge-warning'}">\${t.status==='approved'?'✓ Approved':'⏳ Pending'}</span></td>
      <td style="font-size:13px;color:var(--wa-green);font-weight:700">\${t.usageCount.toLocaleString()}</td>
      <td>
        <div style="background:#005c4b;border-radius:8px;padding:6px 10px;font-size:11px;color:rgba(255,255,255,0.8);max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
          WhatsApp message preview...
        </div>
      </td>
      <td>
        <div style="display:flex;gap:4px">
          <button class="btn btn-xs btn-outline" onclick="showToast('Editing template...','info')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-xs btn-success" onclick="showToast('Template used in campaign','success')"><i class="fas fa-paper-plane"></i></button>
          <button class="btn btn-xs" style="background:rgba(231,76,60,0.15);color:#e74c3c;border:1px solid rgba(231,76,60,0.2)" onclick="showToast('Template deleted','error')"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>\`).join('');
});
function addBtn() {
  const list = document.getElementById('btnList');
  if (list.children.length >= 3) { alert('Max 3 buttons allowed'); return; }
  const div = document.createElement('div');
  div.style.cssText = 'display:flex;gap:8px';
  div.innerHTML = '<select class="form-control" style="width:140px;font-size:12px"><option>Quick Reply</option><option>Call to Action</option><option>Phone</option></select><input class="form-control" placeholder="Button text" style="flex:1"><button onclick="this.parentElement.remove()" style="background:rgba(231,76,60,0.15);border:1px solid rgba(231,76,60,0.2);color:#e74c3c;border-radius:7px;padding:4px 9px;cursor:pointer">×</button>';
  list.appendChild(div);
}
`)
