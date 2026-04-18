import { pageShell } from './layout'

export const rechargeHTML = () => pageShell(`

<!-- Recharge Hero -->
<div style="background:linear-gradient(135deg,#25D366 0%,#128C7E 60%,#075E54 100%);border-radius:16px;padding:28px;margin-bottom:24px;position:relative;overflow:hidden">
  <div style="position:absolute;right:-40px;top:-40px;width:220px;height:220px;border-radius:50%;background:rgba(255,255,255,0.06)"></div>
  <div style="position:absolute;left:40%;bottom:-60px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,0.04)"></div>
  <div style="position:relative;z-index:1">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div style="width:52px;height:52px;border-radius:14px;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:26px;color:white"><i class="fas fa-wallet"></i></div>
      <div>
        <div style="font-size:22px;font-weight:800;color:white">Recharge & Wallet</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.75)">Top up credits — use for WhatsApp messages across all campaigns</div>
      </div>
      <div style="margin-left:auto;background:rgba(255,255,255,0.15);border-radius:10px;padding:6px 14px;font-size:11px;font-weight:700;color:white;display:flex;align-items:center;gap:6px">
        <span style="width:7px;height:7px;border-radius:50%;background:#fff;display:inline-block;animation:pulse 1.5s infinite"></span>
        Razorpay LIVE
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
      <div style="background:rgba(255,255,255,0.2);border-radius:12px;padding:14px">
        <i class="fas fa-coins" style="color:rgba(255,255,255,0.7);font-size:18px;margin-bottom:8px;display:block"></i>
        <div style="font-size:18px;font-weight:800;color:white" id="heroCredits">—</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.65)">Current Balance</div>
      </div>
      <div style="background:rgba(255,255,255,0.2);border-radius:12px;padding:14px">
        <i class="fas fa-paper-plane" style="color:rgba(255,255,255,0.7);font-size:18px;margin-bottom:8px;display:block"></i>
        <div style="font-size:18px;font-weight:800;color:white" id="heroMsgs">—</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.65)">≈ Messages Left</div>
      </div>
      <div style="background:rgba(255,255,255,0.2);border-radius:12px;padding:14px">
        <i class="fas fa-chart-bar" style="color:rgba(255,255,255,0.7);font-size:18px;margin-bottom:8px;display:block"></i>
        <div style="font-size:18px;font-weight:800;color:white" id="heroMsgSent">—</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.65)">Messages Sent</div>
      </div>
      <div style="background:rgba(255,255,255,0.2);border-radius:12px;padding:14px">
        <i class="fas fa-receipt" style="color:rgba(255,255,255,0.7);font-size:18px;margin-bottom:8px;display:block"></i>
        <div style="font-size:18px;font-weight:800;color:white" id="heroTxns">—</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.65)">Total Recharges</div>
      </div>
    </div>
  </div>
</div>

<!-- Main Recharge Grid -->
<div style="display:grid;grid-template-columns:1fr 380px;gap:20px;margin-bottom:24px">

  <!-- Left: Packs + WhatsApp -->
  <div style="display:flex;flex-direction:column;gap:16px">

    <!-- Credit Packs -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-cubes" style="color:#fdcb6e"></i> Choose a Credit Pack</div>
        <span style="font-size:11px;color:var(--text-muted)">1 Credit = ₹0.10 = 1 WhatsApp message</span>
      </div>
      <div class="card-body">
        <div id="packsGrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px">
          <div style="text-align:center;padding:40px;color:var(--text-muted);grid-column:1/-1">
            <i class="fas fa-spinner fa-spin" style="font-size:24px;margin-bottom:8px;display:block"></i>
            Loading packs...
          </div>
        </div>
      </div>
    </div>

    <!-- WhatsApp Recharge Feature -->
    <div class="card" style="background:linear-gradient(135deg,rgba(37,211,102,0.07),rgba(18,140,126,0.04));border-color:rgba(37,211,102,0.2)">
      <div class="card-header" style="border-color:rgba(37,211,102,0.15)">
        <div class="card-title"><i class="fab fa-whatsapp" style="color:var(--wa-green)"></i> Recharge via WhatsApp Chat</div>
        <span style="background:linear-gradient(135deg,var(--wa-green),var(--wa-teal));color:white;padding:3px 10px;border-radius:8px;font-size:10px;font-weight:700">UNIQUE FEATURE</span>
      </div>
      <div class="card-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:center">
          <div>
            <p style="font-size:13px;color:var(--text-muted);margin-bottom:14px;line-height:1.6">
              No login needed. Just WhatsApp our billing bot — select a pack, pay via UPI/Card, and credits are added instantly. Works 24/7!
            </p>
            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
              ${[
                ['Send "BALANCE" to check credits','1'],
                ['Reply with pack number','2'],
                ['Pay via secure Razorpay link','3'],
                ['Credits added instantly to DB','4'],
              ].map(([step,num])=>`
              <div style="display:flex;align-items:center;gap:10px;font-size:12px;color:var(--text-muted)">
                <div style="width:22px;height:22px;border-radius:50%;background:rgba(37,211,102,0.2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--wa-green);flex-shrink:0">${num}</div>
                ${step}
              </div>`).join('')}
            </div>
            <div style="display:flex;gap:8px;align-items:center;background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:10px 12px">
              <i class="fas fa-phone" style="color:var(--wa-green)"></i>
              <div>
                <div style="font-size:11px;color:var(--text-muted)">WapiSend Billing Bot</div>
                <div style="font-size:14px;font-weight:700;color:white">+91 88888 00001</div>
              </div>
              <button class="btn btn-sm btn-success" style="margin-left:auto" onclick="showToast('Opening WhatsApp...','success')"><i class="fab fa-whatsapp"></i> Chat</button>
            </div>
          </div>
          <!-- Chat simulation -->
          <div style="background:#0b141a;border-radius:12px;overflow:hidden">
            <div style="background:#1f2c33;padding:10px 14px;display:flex;align-items:center;gap:8px">
              <div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--wa-green),var(--wa-teal));display:flex;align-items:center;justify-content:center;font-size:13px;color:white"><i class="fab fa-whatsapp"></i></div>
              <div>
                <div style="font-size:12px;font-weight:600;color:#e9edef">WapiSend Billing</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.4)">Business Account · Razorpay Powered</div>
              </div>
            </div>
            <div style="padding:12px;display:flex;flex-direction:column;gap:8px">
              <div style="background:#1f2c33;color:#e9edef;border-radius:0 12px 12px 12px;padding:8px 12px;max-width:85%;font-size:11px;line-height:1.5">
                👋 Hi! Current balance: <b id="waBotBalance">loading...</b><br><br>
                Recharge packs:<br>
                1️⃣ 10K — ₹1,000<br>
                2️⃣ 50K — ₹4,000 ⭐<br>
                3️⃣ 1L — ₹7,500<br>
                4️⃣ Custom amount
              </div>
              <div style="background:#005c4b;color:#e9edef;border-radius:12px 0 12px 12px;padding:8px 12px;max-width:60%;align-self:flex-end;font-size:11px">
                2
              </div>
              <div style="background:#1f2c33;color:#e9edef;border-radius:0 12px 12px 12px;padding:8px 12px;max-width:85%;font-size:11px;line-height:1.5">
                ✅ 50K credits — ₹4,000<br>
                🔐 Pay via Razorpay:<br>
                🔗 pay.wapi.app/secure-link<br>
                <span style="color:rgba(255,255,255,0.4)">Link valid 30 mins • UPI/Card/NetBanking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Auto-recharge -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-sync-alt" style="color:var(--accent)"></i> Auto-Recharge Settings</div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:12px;color:var(--text-muted)" id="autoRechargeLbl">Enabled</span>
          <div class="toggle-switch on" id="autoRechargeToggle" onclick="toggleAutoRecharge()" style="width:44px;height:24px;border-radius:12px;background:var(--wa-green);cursor:pointer;position:relative;transition:all 0.3s">
            <div style="width:20px;height:20px;border-radius:50%;background:white;position:absolute;top:2px;right:2px;transition:all 0.3s;box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Trigger when below</label>
            <select class="form-control">
              <option>5,000 credits</option>
              <option>10,000 credits</option>
              <option>2,000 credits</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Auto-recharge pack</label>
            <select class="form-control">
              <option>50K — ₹4,000</option>
              <option>10K — ₹1,000</option>
              <option>1L — ₹7,500</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Payment Method</label>
            <select class="form-control">
              <option>Saved UPI (GPay)</option>
              <option>Card</option>
              <option>Net Banking</option>
            </select>
          </div>
        </div>
        <div style="margin-top:12px;padding:10px 12px;background:rgba(37,211,102,0.06);border:1px solid rgba(37,211,102,0.15);border-radius:10px;font-size:12px;color:var(--text-muted)">
          <i class="fas fa-info-circle" style="color:var(--wa-green)"></i> Auto-recharge triggers when credits drop below threshold. You'll get WhatsApp notification before each charge.
        </div>
      </div>
    </div>
  </div>

  <!-- Right: Order Summary + Payment -->
  <div style="display:flex;flex-direction:column;gap:16px">

    <div class="card" style="position:sticky;top:80px">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-shopping-cart" style="color:var(--primary)"></i> Order Summary</div>
        <!-- Razorpay badge -->
        <img src="https://razorpay.com/assets/razorpay-glyph.svg" style="height:20px;opacity:0.8" onerror="this.style.display='none'">
      </div>
      <div class="card-body">
        <div id="orderSummary">
          <div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px">
            <i class="fas fa-hand-pointer" style="font-size:28px;display:block;margin-bottom:10px;opacity:0.4"></i>
            Select a credit pack to continue
          </div>
        </div>

        <div id="paymentSection" style="display:none">
          <div style="font-size:11px;color:var(--text-muted);padding:10px;background:rgba(255,255,255,0.02);border-radius:8px;margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>Subtotal</span><span id="subtotalAmt">—</span></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>GST (18%)</span><span id="gstAmt">—</span></div>
            <div style="border-top:1px solid var(--border);margin:6px 0"></div>
            <div style="display:flex;justify-content:space-between;font-weight:700;color:white;font-size:13px"><span>Total Payable</span><span id="totalAmt">—</span></div>
          </div>

          <!-- What you get -->
          <div style="background:rgba(37,211,102,0.06);border:1px solid rgba(37,211,102,0.15);border-radius:10px;padding:12px;margin-bottom:14px">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">You will receive</div>
            <div style="font-size:22px;font-weight:900;color:var(--wa-green)" id="youGet">—</div>
            <div style="font-size:11px;color:var(--text-muted)">credits → <span id="youGetMsgs">—</span> WhatsApp messages</div>
          </div>

          <button class="btn btn-success w-full" id="payBtn" style="justify-content:center;font-size:14px;padding:13px" onclick="initRazorpay()">
            <i class="fas fa-lock"></i> Pay Securely via Razorpay
          </button>
          <div style="text-align:center;font-size:10px;color:var(--text-muted);margin-top:8px">
            <i class="fas fa-shield-alt" style="color:var(--wa-green)"></i> 256-bit SSL • Razorpay PCI-DSS
          </div>
          <div style="display:flex;justify-content:center;gap:12px;margin-top:10px;opacity:0.6">
            ${['upi','visa','mastercard','rupay'].map(m=>`<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${m}.svg" style="height:16px;filter:invert(1)" onerror="this.style.display='none'">`).join('')}
            <span style="font-size:10px;color:var(--text-muted);line-height:16px">UPI · Card · NetBanking · Wallets</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Success card (hidden) -->
    <div id="successCard" style="display:none" class="card" style="background:linear-gradient(135deg,rgba(37,211,102,0.1),rgba(18,140,126,0.05));border-color:rgba(37,211,102,0.3)">
      <div class="card-body" style="text-align:center;padding:24px">
        <div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,var(--wa-green),var(--wa-teal));display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-size:26px;color:white">
          <i class="fas fa-check"></i>
        </div>
        <div style="font-size:16px;font-weight:800;color:white;margin-bottom:6px">Payment Successful!</div>
        <div style="font-size:13px;color:var(--text-muted);margin-bottom:14px" id="successMsg">Credits added to your wallet.</div>
        <div style="font-size:24px;font-weight:900;color:var(--wa-green);margin-bottom:4px" id="newBalance">—</div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:16px">New Credit Balance</div>
        <a href="/dashboard" class="btn btn-success" style="justify-content:center"><i class="fas fa-th-large"></i> Go to Dashboard</a>
      </div>
    </div>

  </div>
</div>

<!-- Transaction History (Real from DB) -->
<div class="card">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-receipt" style="color:var(--accent)"></i> Transaction History</div>
    <div style="display:flex;gap:8px;align-items:center">
      <span style="font-size:11px;color:var(--wa-green);font-weight:600"><i class="fas fa-circle" style="font-size:8px"></i> Live from DB</span>
      <button class="btn btn-sm btn-outline" onclick="exportTxns()"><i class="fas fa-download"></i> Export CSV</button>
    </div>
  </div>
  <div style="overflow-x:auto">
    <table class="data-table">
      <thead>
        <tr><th>Date</th><th>Description</th><th>Type</th><th>Credits</th><th>Amount</th><th>Method</th><th>Status</th><th>Invoice</th></tr>
      </thead>
      <tbody id="txnBody">
        <tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>
      </tbody>
    </table>
  </div>
</div>

`, 'recharge', 'Recharge & Wallet', 'Buy credits — powered by Razorpay', `.w-full{width:100%}`, `
// ── State ───────────────────────────────────────────────────────────────
let selectedPackId = null;
let selectedPackData = null;
let rzpKey = 'rzp_test_S0det8rxQtxeZ3'; // test key — server sends live key at runtime

const PACK_MAP = {
  1: {label:'10K', credits:10000, price:1000},
  2: {label:'25K', credits:25000, price:2250},
  3: {label:'50K', credits:50000, price:4000},
  4: {label:'1L',  credits:100000, price:7500},
  5: {label:'2.5L',credits:250000, price:17500},
  6: {label:'5L',  credits:500000, price:30000},
};

// ── Load live stats ─────────────────────────────────────────────────────
async function loadStats() {
  try {
    const d = await (await apiFetch('/api/stats')).json();
    const creds = d.creditsBalance || 0;
    const sent = d.messagesSent || 0;
    document.getElementById('heroCredits').textContent = creds.toLocaleString('en-IN') + ' credits';
    document.getElementById('heroMsgs').textContent = creds.toLocaleString('en-IN') + ' msgs';
    document.getElementById('heroMsgSent').textContent = formatNum(sent);
    const waBal = document.getElementById('waBotBalance');
    if (waBal) waBal.textContent = creds.toLocaleString('en-IN') + ' credits';
  } catch(e) {}
}

// ── Load packs ──────────────────────────────────────────────────────────
async function loadPacks() {
  try {
    const packs = await (await apiFetch('/api/credit-packs')).json();
    const txns = await (await apiFetch('/api/transactions')).json();
    const rechargeCount = (txns||[]).filter(t=>t.type==='recharge').length;
    const rechargeTotal = (txns||[]).filter(t=>t.type==='recharge').reduce((a,t)=>a+Math.abs(t.amount||0),0);
    document.getElementById('heroTxns').textContent = rechargeCount + ' (₹' + rechargeTotal.toLocaleString('en-IN') + ')';

    const colors = ['var(--info)','var(--wa-green)','var(--wa-green)','var(--primary)','var(--primary)','#e17055'];
    document.getElementById('packsGrid').innerHTML = packs.map(p => \`
      <div class="pack-card \${p.popular?'active':''}" 
           onclick="selectPack(this,\${p.id})"
           style="border:2px solid \${p.popular?'var(--wa-green)':'var(--border)'};border-radius:14px;padding:18px;cursor:pointer;transition:all 0.25s;background:\${p.popular?'rgba(37,211,102,0.06)':'transparent'};text-align:center;position:relative">
        \${p.popular?'<div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--wa-green);color:white;font-size:9px;font-weight:800;padding:3px 10px;border-radius:8px;white-space:nowrap;letter-spacing:0.5px">MOST POPULAR</div>':''}
        \${p.savings?'<div style="font-size:10px;font-weight:700;color:'+colors[(p.id-1)%colors.length]+';margin-bottom:6px">'+p.savings+'</div>':'<div style="height:16px"></div>'}
        <div style="font-size:26px;font-weight:900;color:\${p.popular?'var(--wa-green)':'white'}">\${p.label}</div>
        <div style="font-size:11px;color:var(--text-muted);margin:2px 0">Credits</div>
        <div style="font-size:20px;font-weight:800;color:white;margin:8px 0">₹\${p.price.toLocaleString('en-IN')}</div>
        <div style="font-size:11px;color:var(--text-muted)">₹\${p.pricePerCredit.toFixed(3)}/msg</div>
      </div>
    \`).join('');
  } catch(e) {
    document.getElementById('packsGrid').innerHTML = '<div style="color:var(--danger);padding:20px;text-align:center;grid-column:1/-1">Failed to load packs</div>';
  }
}

// ── Select Pack ──────────────────────────────────────────────────────────
function selectPack(el, packId) {
  document.querySelectorAll('.pack-card').forEach(p => {
    p.style.borderColor = 'var(--border)';
    p.style.background = 'transparent';
  });
  el.style.borderColor = 'var(--wa-green)';
  el.style.background = 'rgba(37,211,102,0.06)';
  selectedPackId = packId;
  selectedPackData = PACK_MAP[packId];
  if (!selectedPackData) return;

  const gst = Math.round(selectedPackData.price * 0.18);
  const total = selectedPackData.price + gst;

  document.getElementById('orderSummary').innerHTML = \`
    <div style="padding:14px;background:rgba(37,211,102,0.06);border:1px solid rgba(37,211,102,0.15);border-radius:10px;margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:13px;font-weight:700;color:white">\${selectedPackData.label} Credits Pack</div>
          <div style="font-size:11px;color:var(--text-muted)">\${selectedPackData.credits.toLocaleString('en-IN')} WhatsApp messages</div>
        </div>
        <div style="font-size:20px;font-weight:800;color:var(--wa-green)">₹\${selectedPackData.price.toLocaleString('en-IN')}</div>
      </div>
    </div>
  \`;
  document.getElementById('subtotalAmt').textContent = '₹' + selectedPackData.price.toLocaleString('en-IN');
  document.getElementById('gstAmt').textContent = '₹' + gst.toLocaleString('en-IN');
  document.getElementById('totalAmt').textContent = '₹' + total.toLocaleString('en-IN');
  document.getElementById('youGet').textContent = selectedPackData.credits.toLocaleString('en-IN');
  document.getElementById('youGetMsgs').textContent = selectedPackData.credits.toLocaleString('en-IN');
  document.getElementById('paymentSection').style.display = 'block';
}

// ── Initiate Razorpay Payment ─────────────────────────────────────────────
async function initRazorpay() {
  if (!selectedPackId) { showToast('Please select a pack first', 'error'); return; }
  const btn = document.getElementById('payBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating order...';
  btn.disabled = true;

  try {
    // Create Razorpay order on server
    const res = await apiFetch('/api/recharge/create-order', {
      method: 'POST',
      body: JSON.stringify({ packId: selectedPackId })
    });
    const order = await res.json();

    if (order.mode === 'demo') {
      // No real Razorpay configured — use demo flow
      await completeDemoPayment(order);
      return;
    }

    // Real Razorpay Checkout
    const options = {
      key: order.key,
      amount: order.amount,
      currency: order.currency || 'INR',
      name: 'WapiSend Technologies',
      description: selectedPackData.label + ' Credit Pack',
      image: 'https://via.placeholder.com/48x48/25D366/ffffff?text=W',
      order_id: order.orderId,
      prefill: {
        name: (localStorage.getItem('ws_user') ? JSON.parse(localStorage.getItem('ws_user')).name : '') || 'WapiSend User',
        email: (localStorage.getItem('ws_user') ? JSON.parse(localStorage.getItem('ws_user')).email : '') || '',
        contact: ''
      },
      theme: { color: '#25D366' },
      handler: async function(response) {
        // Payment successful — verify on server
        await verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
      },
      modal: {
        ondismiss: function() {
          btn.innerHTML = '<i class="fas fa-lock"></i> Pay Securely via Razorpay';
          btn.disabled = false;
          showToast('Payment cancelled', 'error');
        }
      }
    };

    if (typeof Razorpay === 'undefined') {
      showToast('Razorpay SDK loading...', 'info');
      btn.innerHTML = '<i class="fas fa-lock"></i> Pay Securely via Razorpay';
      btn.disabled = false;
      return;
    }

    const rzp = new Razorpay(options);
    rzp.open();

  } catch(e) {
    console.error('Razorpay error:', e);
    showToast('Payment gateway error: ' + e.message, 'error');
    btn.innerHTML = '<i class="fas fa-lock"></i> Pay Securely via Razorpay';
    btn.disabled = false;
  }
}

// ── Verify Payment with Server ──────────────────────────────────────────
async function verifyPayment(paymentId, orderId, signature) {
  const btn = document.getElementById('payBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying payment...';
  try {
    const res = await apiFetch('/api/recharge', {
      method: 'POST',
      body: JSON.stringify({
        packId: selectedPackId,
        paymentMethod: 'razorpay',
        razorpayPaymentId: paymentId,
        razorpayOrderId: orderId,
        razorpaySignature: signature
      })
    });
    const data = await res.json();
    if (data.success) {
      onPaymentSuccess(data);
    } else {
      showToast(data.error || 'Payment verification failed', 'error');
      btn.innerHTML = '<i class="fas fa-lock"></i> Pay Securely via Razorpay';
      btn.disabled = false;
    }
  } catch(e) {
    showToast('Server error: ' + e.message, 'error');
    btn.innerHTML = '<i class="fas fa-lock"></i> Pay Securely via Razorpay';
    btn.disabled = false;
  }
}

// ── Demo payment (when Razorpay keys not configured) ─────────────────────
async function completeDemoPayment(order) {
  const btn = document.getElementById('payBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing demo payment...';
  await new Promise(r => setTimeout(r, 1200));

  const res = await apiFetch('/api/recharge', {
    method: 'POST',
    body: JSON.stringify({ packId: selectedPackId, paymentMethod: 'demo' })
  });
  const data = await res.json();
  if (data.success) {
    onPaymentSuccess(data);
  } else {
    showToast(data.error || 'Demo payment failed', 'error');
    btn.innerHTML = '<i class="fas fa-lock"></i> Pay Securely via Razorpay';
    btn.disabled = false;
  }
}

// ── On Payment Success ──────────────────────────────────────────────────
function onPaymentSuccess(data) {
  document.getElementById('successCard').style.display = 'block';
  document.getElementById('successCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('successMsg').textContent = data.credits.toLocaleString('en-IN') + ' credits added · Tx: ' + data.transactionId;
  document.getElementById('newBalance').textContent = (data.newBalance || 0).toLocaleString('en-IN') + ' Credits';
  document.getElementById('sidebarCredits').textContent = formatNum(data.newBalance || 0);
  showToast('✅ ' + data.credits.toLocaleString('en-IN') + ' credits added!', 'success');
  // Reload transactions
  loadTransactions();
  loadStats();
}

// ── Load Transactions (Real from DB) ───────────────────────────────────
async function loadTransactions() {
  try {
    const txns = await (await apiFetch('/api/transactions?limit=25')).json();
    if (!txns || txns.length === 0) {
      document.getElementById('txnBody').innerHTML = '<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)">No transactions yet</td></tr>';
      return;
    }
    document.getElementById('txnBody').innerHTML = txns.map(t => {
      const isRecharge = t.type === 'recharge' || t.type === 'bonus';
      const credStr = (t.credits > 0 ? '+' : '') + (t.credits || 0).toLocaleString('en-IN');
      const amtStr = t.amount ? '₹' + Math.abs(t.amount).toLocaleString('en-IN') : '₹0';
      const date = new Date(t.created_at).toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'});
      return \`
        <tr>
          <td style="font-size:12px;color:var(--text-muted);white-space:nowrap">\${date}</td>
          <td style="font-size:13px;font-weight:600;color:white">\${t.description || t.type}</td>
          <td><span class="badge \${isRecharge?'badge-success':'badge-warning'}" style="font-size:10px;text-transform:capitalize">\${t.type}</span></td>
          <td style="font-size:13px;font-weight:700;color:\${t.credits>0?'var(--wa-green)':'var(--danger)'}">\${credStr}</td>
          <td style="font-size:13px;font-weight:600;color:white">\${amtStr}</td>
          <td style="font-size:12px;color:var(--text-muted)">\${t.payment_method || '—'}</td>
          <td><span class="badge \${t.status==='success'?'badge-success':'badge-warning'}" style="font-size:10px">\${t.status}</span></td>
          <td>
            \${t.type==='recharge'?'<button class="btn btn-xs btn-outline" onclick="viewInvoice('+t.id+')"><i class="fas fa-file-pdf"></i> Invoice</button>':'<span style="color:var(--text-muted);font-size:12px">—</span>'}
          </td>
        </tr>
      \`;
    }).join('');
  } catch(e) {
    document.getElementById('txnBody').innerHTML = '<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--danger)">Failed to load transactions</td></tr>';
  }
}

async function viewInvoice(txnId) {
  try {
    const inv = await (await apiFetch('/api/invoices/'+txnId)).json();
    showToast('Invoice #' + inv.invoiceNumber + ' — ₹' + inv.total + ' (incl. GST)', 'info');
  } catch(e) {}
}

function exportTxns() {
  window.location.href = '/api/contacts/export';
  showToast('Downloading transaction CSV...', 'info');
}

function toggleAutoRecharge() {
  const t = document.getElementById('autoRechargeToggle');
  const lbl = document.getElementById('autoRechargeLbl');
  const isOn = t.classList.contains('on');
  t.classList.toggle('on');
  t.style.background = isOn ? 'var(--border)' : 'var(--wa-green)';
  lbl.textContent = isOn ? 'Disabled' : 'Enabled';
  const dot = t.querySelector('div');
  if (isOn) { dot.style.left = '2px'; dot.style.right = 'auto'; }
  else { dot.style.right = '2px'; dot.style.left = 'auto'; }
  showToast('Auto-recharge ' + (isOn ? 'disabled' : 'enabled'), isOn ? 'error' : 'success');
}

// ── Init ───────────────────────────────────────────────────────────────
loadStats();
loadPacks();
loadTransactions();
// Select popular pack (50K) after packs load
setTimeout(() => {
  const cards = document.querySelectorAll('.pack-card');
  if (cards.length >= 3) cards[2].click();
}, 500);
`)
