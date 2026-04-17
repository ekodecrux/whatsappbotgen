import { pageShell } from './layout'

export const integrationsHTML = () => pageShell(`
<div class="flex-between mb-6">
  <div>
    <h2 style="font-size:16px;font-weight:700;color:white">Integrations & API</h2>
    <p style="font-size:12px;color:var(--text-muted)">Connect your tools, embed on websites, and access developer API</p>
  </div>
</div>

<!-- Tabs -->
<div class="tabs">
  <button class="tab-btn active" data-tab-btn="int" onclick="switchTab('tabWhatsapp','int')"><i class="fab fa-whatsapp"></i> WhatsApp Setup</button>
  <button class="tab-btn" data-tab-btn="int" onclick="switchTab('tabWidget','int')"><i class="fas fa-code"></i> Website Widget</button>
  <button class="tab-btn" data-tab-btn="int" onclick="switchTab('tabAPI','int')"><i class="fas fa-plug"></i> REST API</button>
  <button class="tab-btn" data-tab-btn="int" onclick="switchTab('tabZap','int')"><i class="fas fa-bolt"></i> Automation</button>
</div>

<!-- WhatsApp Setup -->
<div id="tabWhatsapp" class="tab-panel active" data-tab-group="int">
  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fab fa-whatsapp" style="color:var(--wa-green)"></i> Connected Numbers</div>
        <button class="btn btn-sm btn-success" onclick="openModal('addNumModal')"><i class="fas fa-plus"></i> Add Number</button>
      </div>
      <div class="card-body">
        ${[
          {num:'+91 98765 43210',name:'Business Account',waba:'WABA_123456',status:'verified',quality:'high',limit:'1000/day'},
          {num:'+91 87654 32109',name:'Store Account',waba:'WABA_789012',status:'verified',quality:'medium',limit:'250/day'},
        ].map(n=>`
        <div style="border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <div style="display:flex;align-items:center;gap:10px">
              <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--wa-green),var(--wa-teal));display:flex;align-items:center;justify-content:center;font-size:18px;color:white"><i class="fab fa-whatsapp"></i></div>
              <div>
                <div style="font-size:13px;font-weight:700;color:white">${n.num}</div>
                <div style="font-size:11px;color:var(--text-muted)">${n.name}</div>
              </div>
            </div>
            <span class="badge badge-success">Verified ✓</span>
          </div>
          ${[['WABA ID',n.waba],['Quality',n.quality.charAt(0).toUpperCase()+n.quality.slice(1)],['Daily Limit',n.limit]].map(([k,v])=>`
          <div style="display:flex;justify-content:space-between;font-size:12px;padding:5px 0;border-bottom:1px solid rgba(45,63,90,0.4)">
            <span style="color:var(--text-muted)">${k}</span>
            <span style="color:white;font-weight:600">${v}</span>
          </div>`).join('')}
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn-xs btn-outline" onclick="showToast('Number settings...','info')"><i class="fas fa-cog"></i> Settings</button>
            <button class="btn btn-xs btn-outline" onclick="showToast('Testing webhook...','info')"><i class="fas fa-plug"></i> Test Webhook</button>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-key" style="color:#fdcb6e"></i> API Credentials</div>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label class="form-label">Access Token</label>
          <div style="display:flex;gap:8px">
            <input type="password" class="form-control" value="EAABx4...LONG_TOKEN_HERE..." readonly style="flex:1">
            <button class="btn btn-outline btn-sm" onclick="showToast('Token copied!','success')"><i class="fas fa-copy"></i></button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Webhook Verify Token</label>
          <div style="display:flex;gap:8px">
            <input type="text" class="form-control" value="wapi_webhook_secret_2024" readonly style="flex:1">
            <button class="btn btn-outline btn-sm" onclick="showToast('Copied!','success')"><i class="fas fa-copy"></i></button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Webhook URL (configure in Meta)</label>
          <div style="display:flex;gap:8px">
            <input type="text" class="form-control" value="https://api.wapisend.com/webhook/your-id" readonly style="flex:1">
            <button class="btn btn-outline btn-sm" onclick="copyText('https://api.wapisend.com/webhook/your-id')"><i class="fas fa-copy"></i></button>
          </div>
        </div>
        <div style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:12px;font-size:12px;color:var(--text-muted)">
          <i class="fas fa-info-circle" style="color:var(--wa-green);margin-right:6px"></i>
          Configure this webhook URL in Meta Business Manager → WhatsApp → Configuration
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Website Widget -->
<div id="tabWidget" class="tab-panel" data-tab-group="int">
  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-code" style="color:var(--primary)"></i> Embed Widget</div>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label class="form-label">WhatsApp Number</label>
          <select class="form-control"><option>+91 98765 43210</option><option>+91 87654 32109</option></select>
        </div>
        <div class="form-group">
          <label class="form-label">Pre-filled Message</label>
          <input class="form-control" value="Hi! I need help with..." placeholder="Default message">
        </div>
        <div class="form-group">
          <label class="form-label">Button Text</label>
          <input class="form-control" value="Chat on WhatsApp">
        </div>
        <div class="form-group">
          <label class="form-label">Position</label>
          <select class="form-control"><option>Bottom Right</option><option>Bottom Left</option></select>
        </div>
        <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.8px">Embed Code</div>
        <div style="background:var(--dark);border:1px solid var(--border);border-radius:10px;padding:14px;position:relative">
          <pre style="font-size:11px;color:var(--wa-green);overflow:auto;white-space:pre-wrap"><code id="embedCode">&lt;script&gt;
  window.WapiSendConfig = {
    number: '+919876543210',
    message: 'Hi! I need help...',
    buttonText: 'Chat on WhatsApp',
    position: 'bottom-right'
  };
&lt;/script&gt;
&lt;script src="https://cdn.wapisend.com/widget.js"&gt;&lt;/script&gt;</code></pre>
          <button onclick="copyText(document.getElementById('embedCode').textContent)" style="position:absolute;top:8px;right:8px;background:rgba(255,255,255,0.1);border:1px solid var(--border);border-radius:6px;padding:4px 10px;color:var(--text-muted);font-size:11px;cursor:pointer"><i class="fas fa-copy"></i> Copy</button>
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-eye" style="color:var(--accent)"></i> Widget Preview</div>
      </div>
      <div class="card-body" style="min-height:300px;position:relative;background:var(--dark);border-radius:8px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);height:200px;border-radius:8px;margin-bottom:16px;display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:12px">Your Website Content Here</div>
        <!-- Widget Preview -->
        <div style="position:absolute;bottom:24px;right:24px">
          <div style="background:linear-gradient(135deg,var(--wa-green),var(--wa-teal));border-radius:50px;padding:12px 20px;display:flex;align-items:center;gap:8px;box-shadow:0 4px 20px rgba(37,211,102,0.4);cursor:pointer;animation:bounce 2s infinite" onclick="showToast('Widget clicked! Opens WhatsApp','success')">
            <i class="fab fa-whatsapp" style="color:white;font-size:20px"></i>
            <span style="color:white;font-weight:700;font-size:13px">Chat on WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- REST API -->
<div id="tabAPI" class="tab-panel" data-tab-group="int">
  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-key" style="color:#fdcb6e"></i> API Keys</div>
        <button class="btn btn-sm btn-outline" onclick="showToast('New API key generated!','success')"><i class="fas fa-plus"></i> Generate Key</button>
      </div>
      <div class="card-body">
        ${[
          ['Production Key','sk-live-wapi_prod_...','Active','all'],
          ['Development Key','sk-dev-wapi_test_...','Active','read'],
        ].map(([name,key,status,perm])=>`
        <div style="border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:13px;font-weight:700;color:white">${name}</span>
            <span class="badge badge-success">${status}</span>
          </div>
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
            <input type="password" value="${key}" readonly class="form-control" style="flex:1;font-size:11px">
            <button class="btn btn-xs btn-outline" onclick="showToast('Copied!','success')"><i class="fas fa-copy"></i></button>
          </div>
          <div style="font-size:11px;color:var(--text-muted)">Permissions: ${perm} • Last used: 2 hrs ago</div>
        </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-terminal" style="color:var(--accent)"></i> API Quick Reference</div>
      </div>
      <div class="card-body">
        ${[
          ['POST','Send Message','/api/v1/messages/send','Send WhatsApp message'],
          ['POST','Bulk Send','/api/v1/campaigns/broadcast','Bulk broadcast'],
          ['GET','Get Contacts','/api/v1/contacts','Fetch contact list'],
          ['POST','Add Lead','/api/v1/leads','Create new lead'],
          ['GET','Analytics','/api/v1/stats','Get message stats'],
        ].map(([method,name,path,desc])=>`
        <div style="border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-bottom:8px;cursor:pointer;transition:all 0.2s" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'" onclick="showToast('API docs for ${name}','info')">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
            <span style="background:${method==='GET'?'rgba(9,132,227,0.2)':'rgba(37,211,102,0.2)'};color:${method==='GET'?'var(--info)':'var(--wa-green)'};padding:2px 7px;border-radius:5px;font-size:10px;font-weight:800">${method}</span>
            <span style="font-size:12px;font-weight:700;color:white">${name}</span>
          </div>
          <code style="font-size:11px;color:var(--text-muted)">${path}</code>
        </div>`).join('')}
        <a href="#" class="btn btn-outline w-full" style="justify-content:center;margin-top:8px" onclick="showToast('Opening API docs...','info')"><i class="fas fa-book"></i> Full API Documentation</a>
      </div>
    </div>
  </div>
</div>

<!-- Automation -->
<div id="tabZap" class="tab-panel" data-tab-group="int">
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px">
    ${[
      ['fa-bolt','#fdcb6e','Zapier','Connect with 6,000+ apps via Zapier','Connected','500+ templates'],
      ['fab fa-google','#ea4335','Google Sheets','Sync contacts and leads with Google Sheets','Not Connected',''],
      ['fab fa-shopify','#96bf48','Shopify','Send order updates and cart recovery messages','Not Connected',''],
      ['fas fa-shopping-cart','#0073e6','WooCommerce','WordPress + WooCommerce integration','Not Connected',''],
      ['fas fa-database','#336791','CRM Sync','Sync leads with HubSpot, Salesforce, Zoho','Not Connected',''],
      ['fas fa-envelope','#ff6900','Mailchimp','Sync subscribers between WhatsApp and email','Not Connected',''],
    ].map(([ic,col,name,desc,status,extra])=>`
    <div class="card" style="cursor:pointer;transition:all 0.2s" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'" onclick="showToast('Opening ${name} integration...','info')">
      <div class="card-body" style="padding:20px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <div style="width:44px;height:44px;border-radius:12px;background:${col}22;display:flex;align-items:center;justify-content:center;font-size:20px;color:${col}">
            <i class="${ic.startsWith('fab')?ic:'fas '+ic}"></i>
          </div>
          <span class="badge ${status==='Connected'?'badge-success':'badge-warning'}">${status}</span>
        </div>
        <div style="font-size:14px;font-weight:700;color:white;margin-bottom:6px">${name}</div>
        <div style="font-size:12px;color:var(--text-muted);line-height:1.5;margin-bottom:12px">${desc}</div>
        ${extra?`<div style="font-size:10px;color:${col};font-weight:600">${extra}</div>`:''}
        <button class="btn btn-sm ${status==='Connected'?'btn-outline':'btn-primary'} w-full" style="justify-content:center;margin-top:10px">
          ${status==='Connected'?'Manage':'Connect'}
        </button>
      </div>
    </div>`).join('')}
  </div>
</div>

<!-- Add Number Modal -->
<div id="addNumModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="fab fa-whatsapp" style="color:var(--wa-green);margin-right:8px"></i>Add WhatsApp Number</span>
      <button class="modal-close" onclick="closeModal('addNumModal')">×</button>
    </div>
    <div class="modal-body">
      <div style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:12px;padding:16px;margin-bottom:18px">
        <div style="font-size:13px;font-weight:700;color:var(--wa-green);margin-bottom:8px"><i class="fab fa-facebook"></i> Recommended: Embedded Signup</div>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px;line-height:1.6">Connect directly via Meta. Takes 2 min. No technical knowledge needed.</p>
        <button class="btn btn-success" style="font-size:12px" onclick="closeModal('addNumModal');showToast('Redirecting to Meta Embedded Signup...','info')"><i class="fab fa-facebook"></i> Connect with Meta</button>
      </div>
      <div class="form-group"><label class="form-label">Or Enter Manually — WABA ID</label><input class="form-control" placeholder="Your WhatsApp Business Account ID"></div>
      <div class="form-group"><label class="form-label">Phone Number ID</label><input class="form-control" placeholder="Phone Number ID from Meta"></div>
      <div class="form-group"><label class="form-label">Access Token</label><input type="password" class="form-control" placeholder="Permanent Access Token"></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('addNumModal')">Cancel</button>
      <button class="btn btn-success" onclick="closeModal('addNumModal');showToast('Number connected and verified!','success')"><i class="fas fa-check"></i> Connect Number</button>
    </div>
  </div>
</div>

`, 'integrations', 'Integrations', 'Connect WhatsApp, embed widgets and access REST API', `
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
`)
