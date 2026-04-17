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
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
      ${[
        ['Current Balance','42,500 credits','coins','rgba(255,255,255,0.2)'],
        ['≈ Messages Left','42,500 msgs','paper-plane','rgba(255,255,255,0.2)'],
        ['Monthly Used','84,320 credits','chart-bar','rgba(255,255,255,0.2)'],
        ['Monthly Recharges','₹12,400','receipt','rgba(255,255,255,0.2)'],
      ].map(([label,val,ic,bg])=>`
      <div style="background:${bg};border-radius:12px;padding:14px">
        <i class="fas fa-${ic}" style="color:rgba(255,255,255,0.7);font-size:18px;margin-bottom:8px;display:block"></i>
        <div style="font-size:18px;font-weight:800;color:white">${val}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.65)">${label}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- Main Recharge Grid -->
<div style="display:grid;grid-template-columns:1fr 380px;gap:20px;margin-bottom:24px">

  <!-- Left: Packs + Custom -->
  <div style="display:flex;flex-direction:column;gap:16px">

    <!-- Credit Packs -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-cubes" style="color:#fdcb6e"></i> Choose a Credit Pack</div>
        <span style="font-size:11px;color:var(--text-muted)">1 Credit = ₹0.10 = 1 WhatsApp message</span>
      </div>
      <div class="card-body">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px">
          ${[
            {credits:'10K',price:'₹1,000',per:'₹0.10/msg',save:'',popular:false,color:'var(--info)'},
            {credits:'25K',price:'₹2,250',per:'₹0.09/msg',save:'Save 10%',popular:false,color:'var(--wa-green)'},
            {credits:'50K',price:'₹4,000',per:'₹0.08/msg',save:'Save 20% ⭐',popular:true,color:'var(--wa-green)'},
            {credits:'1L',price:'₹7,500',per:'₹0.075/msg',save:'Save 25%',popular:false,color:'var(--primary)'},
            {credits:'2.5L',price:'₹17,500',per:'₹0.07/msg',save:'Save 30%',popular:false,color:'var(--primary)'},
            {credits:'5L',price:'₹30,000',per:'₹0.06/msg',save:'Save 40% 🏆',popular:false,color:'#e17055'},
          ].map(pack=>`
          <div class="pack-card ${pack.popular?'active':''}" onclick="selectPack(this,'${pack.credits}','${pack.price}')" style="border:2px solid ${pack.popular?'var(--wa-green)':'var(--border)'};border-radius:14px;padding:18px;cursor:pointer;transition:all 0.25s;background:${pack.popular?'rgba(37,211,102,0.06)':'transparent'};text-align:center;position:relative">
            ${pack.popular?'<div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--wa-green);color:white;font-size:9px;font-weight:800;padding:3px 10px;border-radius:8px;white-space:nowrap;letter-spacing:0.5px">MOST POPULAR</div>':''}
            ${pack.save?`<div style="font-size:10px;font-weight:700;color:${pack.color};margin-bottom:6px">${pack.save}</div>`:' <div style="height:16px"></div>'}
            <div style="font-size:26px;font-weight:900;color:${pack.popular?'var(--wa-green)':'white'}">${pack.credits}</div>
            <div style="font-size:11px;color:var(--text-muted);margin:2px 0">Credits</div>
            <div style="font-size:20px;font-weight:800;color:white;margin:8px 0">${pack.price}</div>
            <div style="font-size:11px;color:var(--text-muted)">${pack.per}</div>
          </div>`).join('')}
        </div>

        <!-- Custom amount -->
        <div style="border:1px solid var(--border);border-radius:12px;padding:16px;background:rgba(255,255,255,0.02)">
          <div style="font-size:13px;font-weight:700;color:white;margin-bottom:12px"><i class="fas fa-sliders-h" style="color:var(--primary)"></i> Custom Amount</div>
          <div style="display:flex;gap:10px;align-items:center">
            <div style="position:relative;flex:1">
              <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:14px">₹</span>
              <input type="number" class="form-control" id="customAmount" placeholder="Enter amount (min ₹500)" style="padding-left:28px" oninput="calcCustomCredits()">
            </div>
            <div style="text-align:center;min-width:100px">
              <div style="font-size:11px;color:var(--text-muted)">You get</div>
              <div style="font-size:18px;font-weight:800;color:var(--wa-green)" id="customCreditsOut">—</div>
              <div style="font-size:10px;color:var(--text-muted)">credits</div>
            </div>
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
                ['Pay via secure link','3'],
                ['Credits added instantly','4'],
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
                <div style="font-size:10px;color:rgba(255,255,255,0.4)">Business Account</div>
              </div>
            </div>
            <div style="padding:12px;display:flex;flex-direction:column;gap:8px">
              <div style="background:#1f2c33;color:#e9edef;border-radius:0 12px 12px 12px;padding:8px 12px;max-width:85%;font-size:11px;line-height:1.5">
                👋 Hi Rahul! Balance: <b>42,500 credits</b><br><br>
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
                Pay securely:<br>
                🔗 pay.wapi.app/rahul-oct<br>
                <span style="color:rgba(255,255,255,0.4)">Link valid 30 mins</span>
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
          <span style="font-size:12px;color:var(--text-muted)">Enabled</span>
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
              <option>Card ending 4242</option>
              <option>Net Banking</option>
            </select>
          </div>
        </div>
        <div style="margin-top:12px;padding:10px 12px;background:rgba(37,211,102,0.06);border:1px solid rgba(37,211,102,0.15);border-radius:10px;font-size:12px;color:var(--text-muted)">
          <i class="fas fa-info-circle" style="color:var(--wa-green)"></i> Auto-recharge will trigger when credits drop below threshold. You'll get WhatsApp notification before each charge.
        </div>
      </div>
    </div>
  </div>

  <!-- Right: Payment + Summary -->
  <div style="display:flex;flex-direction:column;gap:16px">

    <!-- Order Summary -->
    <div class="card" style="position:sticky;top:80px">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-shopping-cart" style="color:var(--primary)"></i> Order Summary</div>
      </div>
      <div class="card-body">
        <div id="orderSummary">
          <div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px">
            <i class="fas fa-hand-pointer" style="font-size:28px;display:block;margin-bottom:10px;opacity:0.4"></i>
            Select a credit pack to continue
          </div>
        </div>

        <!-- Payment Methods -->
        <div id="paymentSection" style="display:none">
          <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px">Payment Method</div>
          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
            ${[
              ['upi','UPI / QR Code','GPay, PhonePe, BHIM, Paytm','fab fa-google-pay','rgba(37,211,102,0.1)','var(--wa-green)',true],
              ['card','Credit / Debit Card','Visa, Mastercard, Rupay','fas fa-credit-card','rgba(9,132,227,0.1)','var(--info)',false],
              ['netbanking','Net Banking','All major Indian banks','fas fa-university','rgba(108,92,231,0.1)','var(--primary)',false],
              ['emi','EMI (No Cost)','Available on 3/6/12 months','fas fa-calendar-alt','rgba(231,76,60,0.1)','var(--danger)',false],
            ].map(([id,name,sub,ic,bg,col,sel])=>`
            <div class="pay-opt ${sel?'selected':''}" onclick="selectPayMethod(this,'${id}')" style="border:2px solid ${sel?col:'var(--border)'};border-radius:10px;padding:10px 12px;cursor:pointer;transition:all 0.2s;background:${sel?bg:'transparent'};display:flex;align-items:center;gap:10px">
              <div style="width:34px;height:34px;border-radius:8px;background:${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0">
                <i class="${ic}" style="color:${col};font-size:14px"></i>
              </div>
              <div style="flex:1">
                <div style="font-size:12px;font-weight:700;color:white">${name}</div>
                <div style="font-size:10px;color:var(--text-muted)">${sub}</div>
              </div>
              <div class="pay-radio-dot" style="width:16px;height:16px;border-radius:50%;border:2px solid ${sel?col:'var(--border)'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
                ${sel?`<div style="width:8px;height:8px;border-radius:50%;background:${col}"></div>`:''}
              </div>
            </div>`).join('')}
          </div>

          <!-- GST info -->
          <div style="font-size:11px;color:var(--text-muted);padding:10px;background:rgba(255,255,255,0.02);border-radius:8px;margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>Subtotal</span><span id="subtotalAmt">₹4,000</span></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>GST (18%)</span><span id="gstAmt">₹720</span></div>
            <div style="border-top:1px solid var(--border);margin:6px 0"></div>
            <div style="display:flex;justify-content:space-between;font-weight:700;color:white;font-size:13px"><span>Total</span><span id="totalAmt">₹4,720</span></div>
          </div>

          <button class="btn btn-success w-full" style="justify-content:center;font-size:14px;padding:13px" onclick="processPayment()">
            <i class="fas fa-lock"></i> Pay Securely & Recharge
          </button>
          <div style="text-align:center;font-size:10px;color:var(--text-muted);margin-top:8px">
            <i class="fas fa-shield-alt" style="color:var(--wa-green)"></i> 256-bit SSL encrypted • PCI-DSS compliant
          </div>
        </div>
      </div>
    </div>

    <!-- Referral bonus -->
    <div class="card" style="background:linear-gradient(135deg,rgba(253,203,110,0.1),rgba(225,112,85,0.06));border-color:rgba(253,203,110,0.2)">
      <div class="card-body">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <div style="font-size:28px">🎁</div>
          <div>
            <div style="font-size:13px;font-weight:700;color:white">Referral Bonus</div>
            <div style="font-size:11px;color:var(--text-muted)">Refer a business, earn 5% of their first recharge</div>
          </div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="text" class="form-control" value="WAPI-RAHUL-24" readonly style="font-size:13px;font-weight:700;letter-spacing:1px">
          <button class="btn btn-sm btn-outline" onclick="copyText('WAPI-RAHUL-24')"><i class="fas fa-copy"></i></button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Transaction History -->
<div class="card">
  <div class="card-header">
    <div class="card-title"><i class="fas fa-receipt" style="color:var(--accent)"></i> Transaction History</div>
    <div style="display:flex;gap:8px">
      <select class="form-control" style="width:130px;padding:6px 10px;font-size:12px">
        <option>All Types</option>
        <option>Recharge</option>
        <option>Debit</option>
      </select>
      <button class="btn btn-sm btn-outline" onclick="showToast('Downloading statement...','info')"><i class="fas fa-download"></i> Export</button>
    </div>
  </div>
  <div style="overflow-x:auto">
    <table class="data-table">
      <thead>
        <tr><th>Date</th><th>Description</th><th>Type</th><th>Credits</th><th>Amount</th><th>Method</th><th>Status</th><th>Invoice</th></tr>
      </thead>
      <tbody>
        ${[
          ['Oct 23, 2024','Recharge Pack 50K','Recharge','+50,000','₹4,720','GPay UPI','success','INV-2024-0089'],
          ['Oct 22, 2024','Diwali Campaign Send','Debit','-342','₹34.20','Auto Debit','success','—'],
          ['Oct 21, 2024','Bot Messages - Welcome','Debit','-892','₹89.20','Auto Debit','success','—'],
          ['Oct 20, 2024','Recharge Pack 10K','Recharge','+10,000','₹1,180','HDFC NetBanking','success','INV-2024-0081'],
          ['Oct 18, 2024','Bulk Campaign - Flash Sale','Debit','-4,500','₹450','Auto Debit','success','—'],
          ['Oct 15, 2024','Recharge Pack 1L','Recharge','+1,00,000','₹8,850','Card 4242','success','INV-2024-0074'],
          ['Oct 12, 2024','Auto-Recharge Triggered','Recharge','+50,000','₹4,720','GPay UPI','success','INV-2024-0068'],
          ['Oct 10, 2024','WhatsApp Recharge 50K','Recharge','+50,000','₹4,000','UPI via Chat','success','INV-2024-0062'],
        ].map(([date,desc,type,credits,amt,method,status,inv])=>`
        <tr>
          <td style="font-size:12px;color:var(--text-muted);white-space:nowrap">${date}</td>
          <td style="font-size:13px;font-weight:600;color:white">${desc}</td>
          <td><span class="badge ${type==='Recharge'?'badge-success':'badge-warning'}" style="font-size:10px">${type}</span></td>
          <td style="font-size:13px;font-weight:700;color:${credits.startsWith('+')?'var(--wa-green)':'var(--danger)'}">${credits}</td>
          <td style="font-size:13px;font-weight:600;color:white">${amt}</td>
          <td style="font-size:12px;color:var(--text-muted)">${method}</td>
          <td><span class="badge badge-success" style="font-size:10px">${status}</span></td>
          <td>
            ${inv!=='—'?`<button class="btn btn-xs btn-outline" onclick="showToast('Downloading ${inv}','success')"><i class="fas fa-file-pdf"></i> ${inv}</button>`:'<span style="color:var(--text-muted);font-size:12px">—</span>'}
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>

`, 'recharge', 'Recharge & Wallet', 'Buy credits to power your WhatsApp messaging', `.w-full{width:100%}`, `
let selectedPack = null;
const packs = {
  '10K': {credits:'10,000',price:'₹1,000',priceNum:1000,gst:180},
  '25K': {credits:'25,000',price:'₹2,250',priceNum:2250,gst:405},
  '50K': {credits:'50,000',price:'₹4,000',priceNum:4000,gst:720},
  '1L': {credits:'1,00,000',price:'₹7,500',priceNum:7500,gst:1350},
  '2.5L': {credits:'2,50,000',price:'₹17,500',priceNum:17500,gst:3150},
  '5L': {credits:'5,00,000',price:'₹30,000',priceNum:30000,gst:5400},
};
function selectPack(el, credits, price) {
  document.querySelectorAll('.pack-card').forEach(p => {
    p.style.borderColor = 'var(--border)';
    p.style.background = 'transparent';
    p.classList.remove('active');
  });
  el.style.borderColor = 'var(--wa-green)';
  el.style.background = 'rgba(37,211,102,0.06)';
  el.classList.add('active');
  selectedPack = packs[credits];
  if (!selectedPack) return;
  const total = selectedPack.priceNum + selectedPack.gst;
  document.getElementById('orderSummary').innerHTML = \`
    <div style="padding:14px;background:rgba(37,211,102,0.06);border:1px solid rgba(37,211,102,0.15);border-radius:10px;margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:13px;font-weight:700;color:white">\${credits} Credits Pack</div>
          <div style="font-size:11px;color:var(--text-muted)">Approx \${credits} WhatsApp messages</div>
        </div>
        <div style="font-size:20px;font-weight:800;color:var(--wa-green)">\${selectedPack.price}</div>
      </div>
    </div>
  \`;
  document.getElementById('subtotalAmt').textContent = selectedPack.price;
  document.getElementById('gstAmt').textContent = '₹' + selectedPack.gst;
  document.getElementById('totalAmt').textContent = '₹' + total.toLocaleString('en-IN');
  document.getElementById('paymentSection').style.display = 'block';
}
function selectPayMethod(el, id) {
  document.querySelectorAll('.pay-opt').forEach(p => {
    p.style.borderColor = 'var(--border)';
    p.style.background = 'transparent';
    p.querySelector('.pay-radio-dot').innerHTML = '';
    p.querySelector('.pay-radio-dot').style.borderColor = 'var(--border)';
  });
  const colors = {upi:'var(--wa-green)',card:'var(--info)',netbanking:'var(--primary)',emi:'var(--danger)'};
  const bgs = {upi:'rgba(37,211,102,0.1)',card:'rgba(9,132,227,0.1)',netbanking:'rgba(108,92,231,0.1)',emi:'rgba(231,76,60,0.1)'};
  const col = colors[id]; const bg = bgs[id];
  el.style.borderColor = col;
  el.style.background = bg;
  el.querySelector('.pay-radio-dot').style.borderColor = col;
  el.querySelector('.pay-radio-dot').innerHTML = \`<div style="width:8px;height:8px;border-radius:50%;background:\${col}"></div>\`;
}
function calcCustomCredits() {
  const amt = parseFloat(document.getElementById('customAmount').value) || 0;
  const credits = Math.floor(amt / 0.10);
  document.getElementById('customCreditsOut').textContent = credits > 0 ? credits.toLocaleString('en-IN') : '—';
}
function processPayment() {
  if (!selectedPack) { showToast('Please select a pack first','error'); return; }
  showToast('Redirecting to payment gateway...', 'info');
  setTimeout(() => showToast('Payment successful! Credits added to your wallet.', 'success'), 2000);
}
function toggleAutoRecharge() {
  const t = document.getElementById('autoRechargeToggle');
  const isOn = t.classList.contains('on');
  t.classList.toggle('on');
  t.style.background = isOn ? 'var(--border)' : 'var(--wa-green)';
  const dot = t.querySelector('div');
  if (isOn) { dot.style.left = '2px'; dot.style.right = ''; } else { dot.style.right = '2px'; dot.style.left = ''; }
  showToast('Auto-recharge ' + (isOn ? 'disabled' : 'enabled'), isOn ? 'error' : 'success');
}
function copyText(t) { navigator.clipboard.writeText(t).then(() => showToast('Copied!', 'success')); }
`)
