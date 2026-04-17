import { pageShell } from './layout'

export const waRechargeHTML = () => pageShell(`

<!-- Recharge Hero -->
<div style="background:linear-gradient(135deg,#0a1f0e,#0d2b1a,#0a1f0a);border:1px solid rgba(37,211,102,0.2);border-radius:20px;padding:32px;margin-bottom:24px;text-align:center;position:relative;overflow:hidden">
  <div style="position:absolute;left:50%;top:0;transform:translateX(-50%);width:300px;height:300px;background:radial-gradient(circle,rgba(37,211,102,0.08),transparent);border-radius:50%;pointer-events:none"></div>
  <div style="width:70px;height:70px;border-radius:20px;background:linear-gradient(135deg,var(--wa-green),var(--wa-teal));display:flex;align-items:center;justify-content:center;font-size:32px;color:white;margin:0 auto 16px;box-shadow:0 8px 30px rgba(37,211,102,0.3)">
    <i class="fas fa-wallet"></i>
  </div>
  <div style="font-size:24px;font-weight:900;color:white;margin-bottom:4px">Recharge Message Credits</div>
  <div style="font-size:13px;color:var(--text-muted);margin-bottom:20px">Official WhatsApp Business API messages. No spam. Fully compliant.</div>
  <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(37,211,102,0.1);border:1px solid rgba(37,211,102,0.25);border-radius:14px;padding:12px 24px">
    <i class="fas fa-coins" style="color:#fdcb6e;font-size:20px"></i>
    <div style="text-align:left">
      <div style="font-size:12px;color:var(--text-muted)">Current Balance</div>
      <div style="font-size:28px;font-weight:900;color:white">42,500 <span style="font-size:14px;color:var(--wa-green)">Credits</span></div>
    </div>
    <div style="width:1px;height:40px;background:var(--border);margin:0 8px"></div>
    <div style="text-align:left">
      <div style="font-size:12px;color:var(--text-muted)">Equivalent Value</div>
      <div style="font-size:22px;font-weight:900;color:#fdcb6e">₹4,250</div>
    </div>
  </div>
</div>

<!-- Tabs: Recharge vs History -->
<div class="tabs">
  <button class="tab-btn active" data-tab-btn="rch" onclick="switchTab('tabRecharge','rch')"><i class="fas fa-plus-circle"></i> Recharge</button>
  <button class="tab-btn" data-tab-btn="rch" onclick="switchTab('tabAutoRecharge','rch')"><i class="fas fa-sync-alt"></i> Auto Recharge</button>
  <button class="tab-btn" data-tab-btn="rch" onclick="switchTab('tabHistory','rch')"><i class="fas fa-history"></i> History</button>
  <button class="tab-btn" data-tab-btn="rch" onclick="switchTab('tabInvoices','rch')"><i class="fas fa-file-invoice"></i> Invoices</button>
</div>

<!-- TAB: Recharge -->
<div id="tabRecharge" class="tab-panel active" data-tab-group="rch">
  <div class="grid-2">

    <!-- Credit Packs -->
    <div>
      <div style="font-size:14px;font-weight:700;color:white;margin-bottom:14px">Select Credit Pack</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px" id="packGrid">
        ${[
          {msgs:'5,000',price:450,rate:'₹0.09/msg',save:'',popular:false,id:'p5k'},
          {msgs:'10,000',price:850,rate:'₹0.085/msg',save:'6% off',popular:false,id:'p10k'},
          {msgs:'25,000',price:1999,rate:'₹0.08/msg',save:'11% off',popular:true,id:'p25k'},
          {msgs:'50,000',price:3750,rate:'₹0.075/msg',save:'17% off',popular:false,id:'p50k'},
          {msgs:'1,00,000',price:6999,rate:'₹0.07/msg',save:'22% off',popular:false,id:'p1l'},
          {msgs:'5,00,000',price:29999,rate:'₹0.06/msg',save:'33% off',popular:false,id:'p5l'},
        ].map(p=>`
        <div class="pack-select ${p.popular?'pack-selected':''}" id="${p.id}" onclick="selectPack('${p.id}','${p.msgs}','${p.price}','${p.rate}')" style="background:var(--card);border:2px solid ${p.popular?'var(--primary)':'var(--border)'};border-radius:14px;padding:16px;text-align:center;cursor:pointer;transition:all 0.2s;position:relative">
          ${p.popular?'<div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--primary);color:white;font-size:9px;font-weight:700;padding:2px 12px;border-radius:20px;white-space:nowrap">⭐ BEST VALUE</div>':''}
          ${p.save?`<div style="position:absolute;top:8px;right:8px;background:rgba(0,184,148,0.15);color:var(--success);font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px">${p.save}</div>`:''}
          <div style="font-size:20px;font-weight:900;color:white">${p.msgs}</div>
          <div style="font-size:11px;color:var(--text-muted);margin:2px 0">messages</div>
          <div style="font-size:18px;font-weight:800;color:var(--wa-green)">₹${p.price.toLocaleString()}</div>
          <div style="font-size:10px;color:var(--text-muted)">${p.rate}</div>
        </div>`).join('')}
      </div>

      <!-- Custom Amount -->
      <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px;margin-bottom:16px">
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px">Custom Amount</div>
        <div style="display:flex;gap:8px;align-items:center">
          <div style="display:flex;align-items:center;gap:6px;background:var(--dark);border:1px solid var(--border);border-radius:10px;padding:8px 12px;flex:1">
            <span style="color:var(--text-muted);font-weight:700">₹</span>
            <input type="number" id="customAmount" placeholder="Enter amount" style="background:none;border:none;outline:none;color:var(--text);font-size:14px;width:100%" oninput="calcCustom(this.value)">
          </div>
          <div style="text-align:center;min-width:80px">
            <div style="font-size:16px;font-weight:700;color:var(--wa-green)" id="customCredits">— credits</div>
            <div style="font-size:10px;color:var(--text-muted)">at ₹0.09/msg</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Panel -->
    <div>
      <!-- Order Summary -->
      <div style="background:linear-gradient(135deg,rgba(37,211,102,0.06),rgba(18,140,126,0.04));border:1px solid rgba(37,211,102,0.2);border-radius:16px;padding:20px;margin-bottom:16px">
        <div style="font-size:13px;font-weight:700;color:var(--wa-green);margin-bottom:14px"><i class="fas fa-receipt"></i> Order Summary</div>
        <div id="orderSummary">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px">
            <span style="color:var(--text-muted)">Pack</span>
            <span id="sumPack" style="color:white;font-weight:600">25,000 Messages</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px">
            <span style="color:var(--text-muted)">Credits</span>
            <span id="sumCredits" style="color:var(--wa-green);font-weight:600">25,000 credits</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px">
            <span style="color:var(--text-muted)">Rate</span>
            <span id="sumRate" style="color:var(--text-muted)">₹0.08/message</span>
          </div>
          <div style="height:1px;background:var(--border);margin:12px 0"></div>
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span style="color:var(--text-muted)">Subtotal</span>
            <span id="sumSub" style="color:white">₹1,999</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:6px">
            <span style="color:var(--text-muted)">GST (18%)</span>
            <span id="sumGst" style="color:var(--text-muted)">₹360</span>
          </div>
          <div style="height:1px;background:var(--border);margin:12px 0"></div>
          <div style="display:flex;justify-content:space-between">
            <span style="font-size:14px;font-weight:700;color:white">Total</span>
            <span id="sumTotal" style="font-size:18px;font-weight:900;color:var(--wa-green)">₹2,359</span>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px;margin-bottom:14px">
        <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:14px">Payment Method</div>
        <div id="payMethods" style="display:flex;flex-direction:column;gap:8px">
          ${[
            {id:'upi',icon:'fab fa-google-pay',label:'UPI / GPay / PhonePe',sub:'Instant • Most popular',color:'var(--info)',selected:true},
            {id:'card',icon:'fas fa-credit-card',label:'Credit / Debit Card',sub:'Visa, Mastercard, RuPay',color:'var(--primary)',selected:false},
            {id:'nb',icon:'fas fa-university',label:'Net Banking',sub:'All major banks',color:'var(--warning)',selected:false},
            {id:'wa',icon:'fab fa-whatsapp',label:'Pay via WhatsApp',sub:'One tap payment',color:'var(--wa-green)',selected:false},
            {id:'neft',icon:'fas fa-exchange-alt',label:'Bank Transfer (NEFT/IMPS)',sub:'2-4 hrs processing',color:'var(--text-muted)',selected:false},
          ].map(m=>`
          <div id="pay_${m.id}" onclick="selectPayMethod('${m.id}')" style="display:flex;align-items:center;gap:12px;background:${m.selected?'rgba(37,211,102,0.07)':'rgba(255,255,255,0.03)'};border:2px solid ${m.selected?'var(--wa-green)':'var(--border)'};border-radius:12px;padding:12px 14px;cursor:pointer;transition:all 0.2s">
            <div style="width:36px;height:36px;border-radius:9px;background:${m.color}22;display:flex;align-items:center;justify-content:center;font-size:16px;color:${m.color};flex-shrink:0">
              <i class="${m.icon}"></i>
            </div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600;color:white">${m.label}</div>
              <div style="font-size:11px;color:var(--text-muted)">${m.sub}</div>
            </div>
            <div id="payRadio_${m.id}" style="width:18px;height:18px;border-radius:50%;border:2px solid ${m.selected?'var(--wa-green)':'var(--border)'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
              ${m.selected?`<div style="width:8px;height:8px;border-radius:50%;background:var(--wa-green)"></div>`:''}
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Pay Button -->
      <button id="payBtn" onclick="processPayment()" style="width:100%;background:linear-gradient(135deg,var(--wa-green),var(--wa-teal));color:white;border:none;border-radius:14px;padding:16px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 6px 20px rgba(37,211,102,0.3);transition:transform 0.2s;margin-bottom:10px" onmouseenter="this.style.transform='translateY(-2px)'" onmouseleave="this.style.transform=''">
        <i class="fas fa-lock" style="font-size:13px;opacity:0.8"></i> Pay <span id="payBtnAmount">₹2,359</span> Securely
      </button>
      <div style="text-align:center;font-size:11px;color:var(--text-muted)"><i class="fas fa-shield-alt" style="color:var(--wa-green)"></i> 256-bit SSL encrypted • Powered by Razorpay</div>
    </div>
  </div>
</div>

<!-- TAB: Auto Recharge -->
<div id="tabAutoRecharge" class="tab-panel" data-tab-group="rch">
  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-sync-alt" style="color:var(--wa-green)"></i> Auto Recharge Settings</div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:12px;color:var(--text-muted)">Enabled</span>
          <div id="autoToggle" style="width:44px;height:24px;border-radius:12px;background:var(--wa-green);cursor:pointer;position:relative;transition:background 0.2s" onclick="toggleAuto()">
            <div style="width:20px;height:20px;border-radius:50%;background:white;position:absolute;top:2px;right:2px;transition:right 0.2s"></div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label class="form-label">Trigger When Balance Falls Below</label>
          <div style="display:flex;gap:8px">
            <select class="form-control" style="flex:1">
              <option>1,000 credits</option>
              <option>2,500 credits</option>
              <option selected>5,000 credits</option>
              <option>10,000 credits</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Auto Top-up Pack</label>
          <select class="form-control">
            <option>10,000 credits (₹850)</option>
            <option selected>25,000 credits (₹1,999)</option>
            <option>50,000 credits (₹3,750)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Payment Method</label>
          <select class="form-control">
            <option>UPI / GPay (default)</option>
            <option>Saved Card ending 4242</option>
            <option>Pre-authorized bank debit</option>
          </select>
        </div>
        <div style="background:rgba(37,211,102,0.07);border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:12px;font-size:12px;color:var(--text-muted)">
          <i class="fas fa-info-circle" style="color:var(--wa-green)"></i> When your balance drops below <strong style="color:white">5,000 credits</strong>, we'll automatically recharge <strong style="color:white">25,000 credits (₹1,999)</strong> from your saved UPI. You'll get a WhatsApp notification.
        </div>
        <button class="btn btn-success w-full" style="margin-top:14px;justify-content:center" onclick="showToast('Auto-recharge settings saved!','success')"><i class="fas fa-save"></i> Save Settings</button>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="fas fa-history" style="color:var(--primary)"></i> Auto Recharge Log</div></div>
      <div style="padding:0">
        <table class="data-table">
          <thead><tr><th>Date</th><th>Trigger</th><th>Credits Added</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            ${[
              ['Oct 23','Balance 4,200','25,000','₹1,999','Success'],
              ['Oct 18','Balance 3,800','25,000','₹1,999','Success'],
              ['Oct 12','Balance 4,500','25,000','₹1,999','Success'],
              ['Oct 5','Balance 3,200','25,000','₹1,999','Success'],
            ].map(([dt,trig,cr,amt,st])=>`
            <tr>
              <td style="font-size:12px;color:var(--text-muted)">${dt}</td>
              <td style="font-size:12px;color:var(--text)">${trig}</td>
              <td style="font-size:12px;color:var(--wa-green);font-weight:600">+${cr}</td>
              <td style="font-size:12px;font-weight:600;color:white">${amt}</td>
              <td><span class="badge badge-success" style="font-size:10px">${st}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- TAB: History -->
<div id="tabHistory" class="tab-panel" data-tab-group="rch">
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-history" style="color:var(--primary)"></i> Transaction History</div>
      <button class="btn btn-sm btn-outline" onclick="showToast('Downloading CSV...','info')"><i class="fas fa-download"></i> Export</button>
    </div>
    <div style="padding:0;overflow-x:auto">
      <table class="data-table">
        <thead>
          <tr><th>Date & Time</th><th>Type</th><th>Description</th><th>Credits</th><th>Amount</th><th>Balance After</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${[
            ['Oct 23, 14:32','recharge','Manual Recharge – UPI','+25,000','₹1,999','67,500','Success'],
            ['Oct 23, 09:00','debit','Fee Reminder – Class X (380 msgs)','-380','₹34','42,500','Sent'],
            ['Oct 22, 10:15','debit','Exam Schedule – All Students (4,800 msgs)','-4,800','₹432','42,880','Sent'],
            ['Oct 21, 16:00','debit','Staff Payslip Notification (120 msgs)','-120','₹10.80','47,680','Sent'],
            ['Oct 18, 08:00','auto','Auto Recharge – UPI','+25,000','₹1,999','47,800','Success'],
            ['Oct 17, 12:00','debit','PTM Invite – Parents (1,200 msgs)','-1,200','₹108','22,800','Sent'],
            ['Oct 12, 09:00','auto','Auto Recharge – UPI','+25,000','₹1,999','24,000','Success'],
          ].map(([dt,type,desc,credits,amt,bal,st])=>`
          <tr>
            <td style="font-size:12px;color:var(--text-muted);white-space:nowrap">${dt}</td>
            <td><span class="badge ${type==='recharge'||type==='auto'?'badge-success':'badge-info'}" style="font-size:10px">${type}</span></td>
            <td style="font-size:12px;color:var(--text)">${desc}</td>
            <td style="font-size:12px;font-weight:700;color:${credits.startsWith('+')?'var(--wa-green)':'var(--text-muted)'}">${credits}</td>
            <td style="font-size:12px;color:white">${amt}</td>
            <td style="font-size:12px;color:var(--text-muted)">${bal}</td>
            <td><span class="badge badge-success" style="font-size:10px">${st}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- TAB: Invoices -->
<div id="tabInvoices" class="tab-panel" data-tab-group="rch">
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-file-invoice" style="color:#fdcb6e"></i> GST Invoices</div>
      <button class="btn btn-sm btn-outline" onclick="showToast('Downloading all invoices...','info')"><i class="fas fa-download"></i> Download All</button>
    </div>
    <div style="padding:0;overflow-x:auto">
      <table class="data-table">
        <thead><tr><th>Invoice No.</th><th>Date</th><th>Description</th><th>Subtotal</th><th>GST (18%)</th><th>Total</th><th>Action</th></tr></thead>
        <tbody>
          ${[
            ['INV-2024-1089','Oct 23, 2024','25,000 Credits – Pro Pack','₹1,999','₹360','₹2,359'],
            ['INV-2024-1042','Oct 18, 2024','Auto Recharge 25,000 Credits','₹1,999','₹360','₹2,359'],
            ['INV-2024-0991','Oct 12, 2024','Auto Recharge 25,000 Credits','₹1,999','₹360','₹2,359'],
            ['INV-2024-0890','Sep 28, 2024','50,000 Credits – Business Pack','₹3,750','₹675','₹4,425'],
          ].map(([inv,dt,desc,sub,gst,total])=>`
          <tr>
            <td style="font-size:12px;color:var(--accent);font-weight:600">${inv}</td>
            <td style="font-size:12px;color:var(--text-muted)">${dt}</td>
            <td style="font-size:12px;color:var(--text)">${desc}</td>
            <td style="font-size:12px;color:var(--text-muted)">${sub}</td>
            <td style="font-size:12px;color:var(--text-muted)">${gst}</td>
            <td style="font-size:13px;font-weight:700;color:white">${total}</td>
            <td>
              <button class="btn btn-xs btn-outline" onclick="showToast('Downloading ${inv}...','info')"><i class="fas fa-download"></i></button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Payment Success Modal -->
<div class="modal-overlay" id="paySuccessModal">
  <div class="modal" style="max-width:420px;text-align:center">
    <div class="modal-body" style="padding:40px 32px">
      <div style="width:70px;height:70px;border-radius:50%;background:rgba(37,211,102,0.12);border:3px solid var(--wa-green);display:flex;align-items:center;justify-content:center;font-size:30px;color:var(--wa-green);margin:0 auto 16px;animation:pop 0.4s ease">
        <i class="fas fa-check"></i>
      </div>
      <div style="font-size:20px;font-weight:800;color:white;margin-bottom:8px">Payment Successful!</div>
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px">25,000 credits added to your account instantly</div>
      <div style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:12px;padding:16px;margin-bottom:20px">
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px">New Balance</div>
        <div style="font-size:28px;font-weight:900;color:var(--wa-green)">67,500 Credits</div>
        <div style="font-size:11px;color:var(--text-muted)">≈ ₹6,750 • ~67,500 messages</div>
      </div>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:20px">Invoice INV-2024-1090 sent to your email & WhatsApp</div>
      <button class="btn btn-success w-full" style="justify-content:center" onclick="closeModal('paySuccessModal')">Continue to Dashboard</button>
    </div>
  </div>
</div>

`, 'wallet', 'Recharge Credits', 'Add message credits to your account', `
.pack-selected { border-color: var(--wa-green) !important; background: rgba(37,211,102,0.07) !important; }
@keyframes pop { 0%{transform:scale(0)} 80%{transform:scale(1.1)} 100%{transform:scale(1)} }
`, `
const packData = {
  p5k: { msgs: '5,000', credits: 5000, price: 450, rate: '₹0.09/msg' },
  p10k: { msgs: '10,000', credits: 10000, price: 850, rate: '₹0.085/msg' },
  p25k: { msgs: '25,000', credits: 25000, price: 1999, rate: '₹0.08/msg' },
  p50k: { msgs: '50,000', credits: 50000, price: 3750, rate: '₹0.075/msg' },
  p1l: { msgs: '1,00,000', credits: 100000, price: 6999, rate: '₹0.07/msg' },
  p5l: { msgs: '5,00,000', credits: 500000, price: 29999, rate: '₹0.06/msg' },
};
let selectedPack = 'p25k';

function selectPack(id, msgs, price, rate) {
  document.querySelectorAll('.pack-select').forEach(p => {
    p.classList.remove('pack-selected');
    p.style.borderColor = 'var(--border)';
  });
  const el = document.getElementById(id);
  if (el) { el.classList.add('pack-selected'); el.style.borderColor = 'var(--wa-green)'; }
  selectedPack = id;
  const d = packData[id];
  if (!d) return;
  const gst = Math.round(d.price * 0.18);
  document.getElementById('sumPack').textContent = d.msgs + ' Messages';
  document.getElementById('sumCredits').textContent = d.credits.toLocaleString() + ' credits';
  document.getElementById('sumRate').textContent = d.rate;
  document.getElementById('sumSub').textContent = '₹' + d.price.toLocaleString();
  document.getElementById('sumGst').textContent = '₹' + gst.toLocaleString();
  document.getElementById('sumTotal').textContent = '₹' + (d.price + gst).toLocaleString();
  document.getElementById('payBtnAmount').textContent = '₹' + (d.price + gst).toLocaleString();
}

function calcCustom(val) {
  const amt = parseInt(val) || 0;
  const credits = Math.floor(amt / 0.09);
  document.getElementById('customCredits').textContent = credits.toLocaleString() + ' credits';
}

function selectPayMethod(id) {
  ['upi','card','nb','wa','neft'].forEach(m => {
    const el = document.getElementById('pay_' + m);
    const radio = document.getElementById('payRadio_' + m);
    if (el) { el.style.borderColor = 'var(--border)'; el.style.background = 'rgba(255,255,255,0.03)'; }
    if (radio) radio.innerHTML = '';
  });
  const sel = document.getElementById('pay_' + id);
  const radio = document.getElementById('payRadio_' + id);
  if (sel) { sel.style.borderColor = 'var(--wa-green)'; sel.style.background = 'rgba(37,211,102,0.07)'; }
  if (radio) radio.innerHTML = '<div style="width:8px;height:8px;border-radius:50%;background:var(--wa-green)"></div>';
}

function processPayment() {
  const btn = document.getElementById('payBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-lock"></i> Pay Securely';
    btn.disabled = false;
    openModal('paySuccessModal');
  }, 2000);
}

function toggleAuto() {
  const t = document.getElementById('autoToggle');
  const isOn = t.style.background === 'rgb(37, 211, 102)' || t.style.background.includes('37, 211, 102');
  t.style.background = isOn ? 'var(--border)' : 'var(--wa-green)';
  const dot = t.firstElementChild;
  dot.style.right = isOn ? 'auto' : '2px';
  dot.style.left = isOn ? '2px' : 'auto';
  showToast(isOn ? 'Auto-recharge disabled' : 'Auto-recharge enabled!', isOn ? 'info' : 'success');
}
`)
