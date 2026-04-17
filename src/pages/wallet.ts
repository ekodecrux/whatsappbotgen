import { pageShell } from './layout'

export const walletHTML = () => pageShell(`
<!-- Header -->
<div class="flex-between mb-6">
  <div>
    <h2 style="font-size:16px;font-weight:700;color:white">Wallet & Subscription</h2>
    <p style="font-size:12px;color:var(--text-muted)">Manage credits, recharge and subscription plans</p>
  </div>
  <button class="btn btn-success" onclick="openModal('rechargeModal')"><i class="fas fa-plus"></i> Recharge Credits</button>
</div>

<!-- Balance Cards -->
<div class="grid-3" style="margin-bottom:24px">
  <div class="card" style="background:linear-gradient(135deg,rgba(37,211,102,0.15),rgba(18,140,126,0.08));border-color:rgba(37,211,102,0.3)">
    <div class="card-body" style="padding:24px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,var(--wa-green),var(--wa-teal));display:flex;align-items:center;justify-content:center;font-size:22px;color:white">
          <i class="fas fa-coins"></i>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px">Credit Balance</div>
          <div style="font-size:32px;font-weight:900;color:white">42,500</div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-bottom:10px">
        <span>≈ ₹4,250 value</span>
        <span style="color:var(--wa-green)">1 credit = ₹0.10</span>
      </div>
      <div class="progress"><div class="progress-bar green" style="width:42%"></div></div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:6px">42% of 1,00,000 monthly allocation used</div>
    </div>
  </div>

  <div class="card">
    <div class="card-body" style="padding:24px">
      <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px">Current Plan</div>
      <div style="font-size:20px;font-weight:800;color:white;margin-bottom:4px">Pro Plan <i class="fas fa-crown" style="color:#fdcb6e;font-size:16px"></i></div>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:16px">₹9,999/month • Renews Nov 1</div>
      ${[
        ['WhatsApp Numbers','3 of 3'],
        ['Team Members','Unlimited'],
        ['Monthly Credits','1,00,000'],
        ['Bot Flows','Unlimited'],
      ].map(([k,v])=>`
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(45,63,90,0.4);font-size:12px">
        <span style="color:var(--text-muted)">${k}</span>
        <span style="color:white;font-weight:600">${v}</span>
      </div>`).join('')}
      <button class="btn btn-outline w-full" style="justify-content:center;margin-top:14px">Manage Plan</button>
    </div>
  </div>

  <div class="card">
    <div class="card-body" style="padding:24px">
      <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:16px">This Month Usage</div>
      ${[
        ['Messages Sent','42,250','var(--wa-green)'],
        ['Templates Used','8','var(--primary)'],
        ['Campaigns Run','4','var(--accent)'],
        ['Bot Conversations','12,840','var(--warning)'],
      ].map(([k,v,c])=>`
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(45,63,90,0.4)">
        <span style="font-size:12px;color:var(--text-muted)">${k}</span>
        <span style="font-size:14px;font-weight:800;color:${c}">${v}</span>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- Recharge Packs -->
<div class="card" style="margin-bottom:24px">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-bolt" style="color:#fdcb6e"></i> Quick Recharge Packs</div>
    <span style="font-size:12px;color:var(--text-muted)">Credits never expire</span>
  </div>
  <div class="card-body">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px">
      ${[
        ['5,000','₹500','10 paise/msg','',''],
        ['15,000','₹1,400','9.3 paise/msg','Save ₹100','var(--info)'],
        ['30,000','₹2,700','9 paise/msg','Save ₹300','var(--success)'],
        ['60,000','₹5,000','8.3 paise/msg','Best Value','var(--wa-green)'],
        ['1,50,000','₹11,000','7.3 paise/msg','Enterprise','var(--primary)'],
        ['Custom','Contact Us','Bulk pricing','Volume','#fdcb6e'],
      ].map(([credits,price,rate,label,color])=>`
      <div style="border:2px solid var(--border);border-radius:14px;padding:16px;text-align:center;cursor:pointer;transition:all 0.2s;position:relative;overflow:hidden" onmouseover="this.style.borderColor='var(--wa-green)';this.style.background='rgba(37,211,102,0.05)'" onmouseout="this.style.borderColor='var(--border)';this.style.background='transparent'" onclick="selectPack(this,'${credits}','${price}')">
        ${label?`<div style="position:absolute;top:0;right:0;background:${color};color:white;font-size:9px;font-weight:700;padding:3px 8px;border-radius:0 12px 0 8px">${label}</div>`:''}
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">Credits</div>
        <div style="font-size:20px;font-weight:900;color:white;margin-bottom:4px">${credits}</div>
        <div style="font-size:18px;font-weight:800;color:var(--wa-green);margin-bottom:4px">${price}</div>
        <div style="font-size:10px;color:var(--text-muted)">${rate}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- Transactions -->
<div class="card">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-history" style="color:var(--primary)"></i> Transaction History</div>
    <button class="btn btn-sm btn-outline"><i class="fas fa-download"></i> Download</button>
  </div>
  <table class="data-table" id="txTable">
    <thead>
      <tr>
        <th>Date</th>
        <th>Type</th>
        <th>Description</th>
        <th>Credits</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Invoice</th>
      </tr>
    </thead>
    <tbody id="txBody">
      <tr><td colspan="7" style="text-align:center;padding:30px;color:var(--text-muted)"><i class="fas fa-spinner fa-spin"></i></td></tr>
    </tbody>
  </table>
</div>

<!-- Recharge Modal -->
<div id="rechargeModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-wallet" style="color:var(--wa-green);margin-right:8px"></i>Recharge Credits</span>
      <button class="modal-close" onclick="closeModal('rechargeModal')">×</button>
    </div>
    <div class="modal-body">
      <div style="background:var(--dark);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between">
        <div>
          <div style="font-size:11px;color:var(--text-muted)">Current Balance</div>
          <div style="font-size:20px;font-weight:800;color:var(--wa-green)">42,500 credits</div>
        </div>
        <i class="fas fa-coins" style="font-size:28px;color:var(--wa-green);opacity:0.3"></i>
      </div>
      <div class="form-group">
        <label class="form-label">Select Pack or Enter Amount</label>
        <select class="form-control" id="packSelect" onchange="updatePreview(this.value)">
          <option value="">Choose a pack</option>
          <option value="500">₹500 → 5,000 credits (10p/msg)</option>
          <option value="1400">₹1,400 → 15,000 credits (9.3p/msg)</option>
          <option value="2700">₹2,700 → 30,000 credits (9p/msg)</option>
          <option value="5000">₹5,000 → 60,000 credits (8.3p/msg) ⭐</option>
          <option value="11000">₹11,000 → 1,50,000 credits (7.3p/msg)</option>
        </select>
      </div>
      <div id="rechargePreview" style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:14px;margin-bottom:16px;display:none">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px">
          <span style="color:var(--text-muted)">Credits to Add</span>
          <span style="color:var(--wa-green);font-weight:700" id="previewCredits">—</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px">
          <span style="color:var(--text-muted)">Amount (incl. 18% GST)</span>
          <span style="color:white;font-weight:700" id="previewAmount">—</span>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Payment Method</label>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
          ${[
            ['fa-credit-card','Card',''],
            ['fa-university','UPI','selected'],
            ['fa-building','Net Banking',''],
          ].map(([ic,l,sel])=>`
          <div style="border:2px solid ${sel?'var(--wa-green)':'var(--border)'};background:${sel?'rgba(37,211,102,0.08)':'transparent'};border-radius:10px;padding:12px;text-align:center;cursor:pointer;font-size:12px;font-weight:600;color:${sel?'var(--wa-green)':'var(--text-muted)'}">
            <i class="fas ${ic}" style="display:block;font-size:20px;margin-bottom:6px"></i>${l}
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('rechargeModal')">Cancel</button>
      <button class="btn btn-success" onclick="processRecharge()"><i class="fas fa-lock"></i> Pay Securely</button>
    </div>
  </div>
</div>

`, 'wallet', 'Wallet & Plans', 'Credits, transactions and subscription management', '', `
const packs = {'500':'5,000 credits','1400':'15,000 credits','2700':'30,000 credits','5000':'60,000 credits','11000':'1,50,000 credits'};
function updatePreview(val) {
  const p = document.getElementById('rechargePreview');
  if (!val) { p.style.display='none'; return; }
  p.style.display='block';
  document.getElementById('previewCredits').textContent = packs[val] || '—';
  document.getElementById('previewAmount').textContent = '₹' + (parseInt(val)*1.18).toFixed(0);
}
function selectPack(el, credits, price) { openModal('rechargeModal'); }
function processRecharge() {
  closeModal('rechargeModal');
  setTimeout(()=>showToast('Payment successful! Credits added.','success'), 500);
}
fetch('/api/transactions').then(r=>r.json()).then(data=>{
  document.getElementById('txBody').innerHTML = data.map(t=>\`
    <tr>
      <td style="font-size:12px;color:var(--text-muted)">\${t.date}</td>
      <td><span class="badge \${t.type==='recharge'?'badge-success':'badge-warning'}">\${t.type==='recharge'?'↑ Recharge':'↓ Debit'}</span></td>
      <td style="font-size:12px;color:var(--text)">
        \${t.type==='recharge'?'Credit Recharge':('Campaign: '+t.campaign)}
      </td>
      <td style="font-size:13px;font-weight:700;color:\${t.type==='recharge'?'var(--wa-green)':'var(--danger)'}">\${t.type==='recharge'?'+':''}\${t.credits.toLocaleString()}</td>
      <td style="font-size:13px;font-weight:700;color:\${t.type==='recharge'?'var(--success)':'var(--danger)'}">\${t.amount>0?'₹'+t.amount:'₹'+Math.abs(t.amount)}</td>
      <td><span class="badge badge-success">Success</span></td>
      <td><button class="btn btn-xs btn-outline" onclick="showToast('Invoice downloaded!','success')"><i class="fas fa-download"></i></button></td>
    </tr>\`).join('');
});
`)
