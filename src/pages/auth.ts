const authCSS = `
  body { background: radial-gradient(ellipse 80% 80% at 50% -20%, rgba(37,211,102,0.12) 0%, transparent 60%), #060d1a; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; }
  .auth-card { background: #0f1c2e; border: 1px solid #1e3350; border-radius: 20px; padding: 40px; width: 100%; max-width: 440px; }
  .auth-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 30px; justify-content: center; }
  .auth-logo-icon { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #25D366, #075E54); display: flex; align-items: center; justify-content: center; font-size: 22px; color: white; }
  .auth-logo-name { font-size: 22px; font-weight: 800; color: white; }
  .auth-title { font-size: 22px; font-weight: 800; color: white; text-align: center; margin-bottom: 6px; }
  .auth-sub { font-size: 13px; color: #64748b; text-align: center; margin-bottom: 28px; }
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 12px; font-weight: 600; color: #94a3b8; margin-bottom: 7px; text-transform: uppercase; letter-spacing: 0.5px; }
  .form-input {
    width: 100%; padding: 11px 14px; background: #060d1a; border: 1px solid #1e3350;
    border-radius: 10px; color: #e2e8f0; font-size: 14px; outline: none; font-family: inherit;
    transition: border-color 0.2s;
  }
  .form-input:focus { border-color: #25D366; }
  .input-group { position: relative; }
  .input-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #64748b; }
  .input-with-icon { padding-left: 38px; }
  .input-password-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #64748b; cursor: pointer; background: none; border: none; font-size: 14px; }
  .btn-auth { width: 100%; padding: 13px; background: linear-gradient(135deg, #25D366, #075E54); color: white; border: none; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 8px; }
  .btn-auth:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(37,211,102,0.4); }
  .auth-divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
  .auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: #1e3350; }
  .auth-divider span { font-size: 12px; color: #64748b; }
  .auth-link { text-align: center; font-size: 13px; color: #64748b; margin-top: 20px; }
  .auth-link a { color: #25D366; text-decoration: none; font-weight: 600; }
  .plan-select { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 18px; }
  .plan-opt { background: #060d1a; border: 2px solid #1e3350; border-radius: 10px; padding: 12px 8px; text-align: center; cursor: pointer; transition: all 0.2s; }
  .plan-opt:hover { border-color: #25D366; }
  .plan-opt.selected { border-color: #25D366; background: rgba(37,211,102,0.08); }
  .plan-opt-name { font-size: 13px; font-weight: 700; color: white; }
  .plan-opt-price { font-size: 11px; color: #64748b; margin-top: 2px; }
  .trust-badges { display: flex; gap: 16px; justify-content: center; margin-top: 24px; flex-wrap: wrap; }
  .trust-badge { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #64748b; }
  .trust-badge i { color: #25D366; }
`

export const loginHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login | WapiSend</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>${authCSS}</style>
</head>
<body>
  <div style="position:fixed;top:20px;left:20px;"><a href="/landing" style="color:#64748b;text-decoration:none;font-size:13px;font-family:Inter,sans-serif;"><i class="fas fa-arrow-left" style="margin-right:6px"></i>Back to Home</a></div>
  <div class="auth-card">
    <div class="auth-logo">
      <div class="auth-logo-icon"><i class="fab fa-whatsapp"></i></div>
      <span class="auth-logo-name">WapiSend</span>
    </div>
    <h1 class="auth-title">Welcome Back 👋</h1>
    <p class="auth-sub">Sign in to your WapiSend dashboard</p>

    <form onsubmit="handleLogin(event)">
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <div class="input-group">
          <i class="fas fa-envelope input-icon" style="font-size:13px"></i>
          <input type="email" class="form-input input-with-icon" placeholder="you@company.com" required>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" style="display:flex;justify-content:space-between">
          Password <a href="#" style="color:#25D366;font-weight:500;text-transform:none;font-size:12px">Forgot password?</a>
        </label>
        <div class="input-group">
          <i class="fas fa-lock input-icon" style="font-size:13px"></i>
          <input type="password" id="pwdInput" class="form-input input-with-icon" placeholder="••••••••" required style="padding-right:42px">
          <button type="button" class="input-password-toggle" onclick="togglePwd()">
            <i class="fas fa-eye" id="eyeIcon"></i>
          </button>
        </div>
      </div>
      <button type="submit" class="btn-auth">
        <i class="fab fa-whatsapp"></i> Sign In to Dashboard
      </button>
    </form>

    <div class="auth-divider"><span>or continue with</span></div>
    <button onclick="window.location='/dashboard'" style="width:100%;padding:11px;background:rgba(255,255,255,0.05);border:1px solid #1e3350;border-radius:10px;color:#e2e8f0;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px">
      <i class="fab fa-google" style="color:#ea4335"></i> Continue with Google
    </button>

    <div class="auth-link">Don't have an account? <a href="/register">Start Free Trial</a></div>
  </div>
  <div class="trust-badges">
    <div class="trust-badge"><i class="fas fa-shield-alt"></i> SSL Secured</div>
    <div class="trust-badge"><i class="fas fa-check-circle"></i> Official Meta Partner</div>
    <div class="trust-badge"><i class="fas fa-lock"></i> GDPR Compliant</div>
  </div>
<script>
function togglePwd() {
  const i = document.getElementById('pwdInput');
  const e = document.getElementById('eyeIcon');
  if (i.type === 'password') { i.type = 'text'; e.className = 'fas fa-eye-slash'; }
  else { i.type = 'password'; e.className = 'fas fa-eye'; }
}
function handleLogin(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-auth');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
  setTimeout(() => window.location.href = '/dashboard', 1500);
}
</script>
</body>
</html>
`

export const registerHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Start Free Trial | WapiSend</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>${authCSS}
  .step-indicator { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 28px; }
  .step-dot { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; transition: all 0.3s; }
  .step-dot.done { background: #25D366; color: white; }
  .step-dot.active { background: #6C5CE7; color: white; }
  .step-dot.pending { background: #1e3350; color: #64748b; }
  .step-line { flex: 1; height: 2px; background: #1e3350; max-width: 40px; }
  .step-line.done { background: #25D366; }
  .reg-step { display: none; }
  .reg-step.active { display: block; }
  </style>
</head>
<body>
  <div style="position:fixed;top:20px;left:20px;"><a href="/landing" style="color:#64748b;text-decoration:none;font-size:13px;font-family:Inter,sans-serif;"><i class="fas fa-arrow-left" style="margin-right:6px"></i>Back</a></div>
  <div class="auth-card">
    <div class="auth-logo">
      <div class="auth-logo-icon"><i class="fab fa-whatsapp"></i></div>
      <span class="auth-logo-name">WapiSend</span>
    </div>

    <div class="step-indicator" id="stepIndicator">
      <div class="step-dot active" id="dot1">1</div>
      <div class="step-line" id="line1"></div>
      <div class="step-dot pending" id="dot2">2</div>
      <div class="step-line" id="line2"></div>
      <div class="step-dot pending" id="dot3">3</div>
    </div>

    <!-- Step 1: Account Info -->
    <div class="reg-step active" id="step1">
      <h1 class="auth-title">Create Your Account</h1>
      <p class="auth-sub">Step 1 of 3 — Basic information</p>
      <div class="form-group">
        <label class="form-label">Business / Full Name</label>
        <input type="text" class="form-input" placeholder="Your Business Name" id="bizName">
      </div>
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <input type="email" class="form-input" placeholder="you@company.com" id="regEmail">
      </div>
      <div class="form-group">
        <label class="form-label">Mobile Number (WhatsApp)</label>
        <input type="tel" class="form-input" placeholder="+91 98765 43210" id="regPhone">
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input type="password" class="form-input" placeholder="Min. 8 characters">
      </div>
      <button class="btn-auth" onclick="nextStep(2)">Continue <i class="fas fa-arrow-right"></i></button>
    </div>

    <!-- Step 2: Choose Plan -->
    <div class="reg-step" id="step2">
      <h1 class="auth-title">Choose Your Plan</h1>
      <p class="auth-sub">Step 2 of 3 — All plans include 14-day free trial</p>
      <div class="plan-select">
        <div class="plan-opt" onclick="selectPlan(this,'starter')">
          <div class="plan-opt-name">Starter</div>
          <div class="plan-opt-price">₹1,999/mo</div>
        </div>
        <div class="plan-opt selected" onclick="selectPlan(this,'growth')">
          <div class="plan-opt-name">Growth</div>
          <div class="plan-opt-price">₹4,999/mo</div>
        </div>
        <div class="plan-opt" onclick="selectPlan(this,'pro')">
          <div class="plan-opt-name">Pro</div>
          <div class="plan-opt-price">₹9,999/mo</div>
        </div>
      </div>
      <div style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:12px 14px;font-size:12px;color:#94a3b8;margin-bottom:18px;display:flex;align-items:flex-start;gap:8px">
        <i class="fas fa-gift" style="color:#25D366;margin-top:2px"></i>
        <span><strong style="color:#25D366">14 Days Free Trial</strong> — No credit card required. Cancel anytime. Full access to all features.</span>
      </div>
      <button class="btn-auth" onclick="nextStep(3)">Continue <i class="fas fa-arrow-right"></i></button>
      <div style="text-align:center;margin-top:12px"><button onclick="nextStep(1)" style="background:none;border:none;color:#64748b;font-size:13px;cursor:pointer;font-family:inherit"><i class="fas fa-arrow-left"></i> Back</button></div>
    </div>

    <!-- Step 3: WhatsApp Setup -->
    <div class="reg-step" id="step3">
      <h1 class="auth-title">Connect WhatsApp</h1>
      <p class="auth-sub">Step 3 of 3 — Link your WhatsApp Business number</p>
      <div style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:12px;padding:16px;margin-bottom:18px">
        <div style="font-size:13px;font-weight:700;color:#25D366;margin-bottom:8px"><i class="fab fa-whatsapp"></i> Embedded Signup (Recommended)</div>
        <p style="font-size:12px;color:#94a3b8;line-height:1.6">Connect directly via Meta's official Embedded Signup flow. Takes 2 minutes. Your existing WhatsApp Business account works perfectly.</p>
        <button onclick="handleRegister()" style="margin-top:12px;background:linear-gradient(135deg,#25D366,#075E54);color:white;border:none;border-radius:8px;padding:10px 18px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:7px"><i class="fab fa-whatsapp"></i> Connect via Meta</button>
      </div>
      <div style="background:rgba(255,255,255,0.04);border:1px solid #1e3350;border-radius:12px;padding:16px">
        <div style="font-size:13px;font-weight:700;color:#94a3b8;margin-bottom:8px"><i class="fas fa-key"></i> Manual API Setup</div>
        <div class="form-group" style="margin-bottom:10px">
          <label class="form-label">WhatsApp Business Account ID</label>
          <input type="text" class="form-input" placeholder="Enter WABA ID from Meta Business">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Access Token</label>
          <input type="password" class="form-input" placeholder="Meta API Access Token">
        </div>
      </div>
      <button class="btn-auth" onclick="handleRegister()" style="margin-top:18px">
        <i class="fas fa-rocket"></i> Launch My Dashboard
      </button>
      <div style="text-align:center;margin-top:12px"><button onclick="nextStep(2)" style="background:none;border:none;color:#64748b;font-size:13px;cursor:pointer;font-family:inherit"><i class="fas fa-arrow-left"></i> Back</button></div>
    </div>

    <div class="auth-link">Already have an account? <a href="/login">Sign In</a></div>
  </div>
  <div class="trust-badges">
    <div class="trust-badge"><i class="fas fa-shield-alt"></i> SSL Secured</div>
    <div class="trust-badge"><i class="fas fa-check-circle"></i> Official Meta Partner</div>
    <div class="trust-badge"><i class="fas fa-lock"></i> No Credit Card</div>
  </div>
<script>
let currentStep = 1;
function nextStep(n) {
  document.getElementById('step' + currentStep).classList.remove('active');
  document.getElementById('dot' + currentStep).className = 'step-dot done';
  document.getElementById('dot' + currentStep).innerHTML = '<i class="fas fa-check" style="font-size:10px"></i>';
  if (currentStep < 3 && n > currentStep) {
    document.getElementById('line' + currentStep).classList.add('done');
  }
  currentStep = n;
  document.getElementById('step' + n).classList.add('active');
  document.getElementById('dot' + n).className = 'step-dot active';
  if (n < 3) document.getElementById('dot' + n).textContent = n;
}
function selectPlan(el, plan) {
  document.querySelectorAll('.plan-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}
function handleRegister() {
  setTimeout(() => window.location.href = '/dashboard', 1200);
}
</script>
</body>
</html>
`
