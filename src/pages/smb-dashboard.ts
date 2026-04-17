import { pageShell } from './layout'

export const smbDashboardHTML = () => pageShell(`

<!-- SMB Header -->
<div style="background:linear-gradient(135deg,#e17055,#fdcb6e);border-radius:16px;padding:24px 28px;margin-bottom:24px;position:relative;overflow:hidden">
  <div style="position:absolute;right:-30px;top:-30px;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,0.08)"></div>
  <div style="position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
    <div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <div style="width:42px;height:42px;border-radius:11px;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:20px;color:white"><i class="fas fa-store"></i></div>
        <div>
          <div style="font-size:20px;font-weight:800;color:white">Small Business Suite</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.8)">WhatsApp marketing made simple for shops, clinics & local businesses</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        <span style="background:rgba(255,255,255,0.2);color:white;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600">🏪 Retail Shops</span>
        <span style="background:rgba(255,255,255,0.2);color:white;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600">💊 Clinics & Pharmacy</span>
        <span style="background:rgba(255,255,255,0.2);color:white;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600">🍽️ Restaurants</span>
        <span style="background:rgba(255,255,255,0.2);color:white;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600">🏋️ Gyms & Salons</span>
      </div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn" style="background:white;color:#e17055;font-weight:700" onclick="openModal('quickSendModal')"><i class="fas fa-paper-plane"></i> Quick Send</button>
      <a href="/mini" class="btn btn-outline" style="border-color:rgba(255,255,255,0.4);color:white"><i class="fas fa-mobile-alt"></i> Mini View</a>
    </div>
  </div>
</div>

<!-- Stats -->
<div class="stats-grid" style="margin-bottom:24px">
  <div class="stat-card green">
    <div class="stat-label">Messages This Month</div>
    <div class="stat-value">8,420</div>
    <div class="stat-meta"><span class="stat-change up"><i class="fas fa-arrow-up"></i> 18%</span> vs last month</div>
    <i class="fas fa-paper-plane stat-icon" style="color:var(--wa-green)"></i>
  </div>
  <div class="stat-card orange">
    <div class="stat-label">Customers Reached</div>
    <div class="stat-value">342</div>
    <div class="stat-meta">Active contact list</div>
    <i class="fas fa-users stat-icon" style="color:#e17055"></i>
  </div>
  <div class="stat-card blue">
    <div class="stat-label">Leads from WhatsApp</div>
    <div class="stat-value">87</div>
    <div class="stat-meta"><span class="stat-change up"><i class="fas fa-arrow-up"></i> 12</span> this week</div>
    <i class="fas fa-user-plus stat-icon" style="color:var(--info)"></i>
  </div>
  <div class="stat-card teal">
    <div class="stat-label">Delivery Rate</div>
    <div class="stat-value">96.8%</div>
    <div class="stat-meta">Excellent quality score</div>
    <i class="fas fa-check-double stat-icon" style="color:var(--wa-green)"></i>
  </div>
  <div class="stat-card red">
    <div class="stat-label">Credits Left</div>
    <div class="stat-value">6,800</div>
    <div class="stat-meta"><a href="/recharge" style="color:var(--wa-green);font-size:11px">Recharge →</a></div>
    <i class="fas fa-coins stat-icon" style="color:#fdcb6e"></i>
  </div>
  <div class="stat-card purple">
    <div class="stat-label">Open Rate</div>
    <div class="stat-value">74%</div>
    <div class="stat-meta">vs 18% email avg</div>
    <i class="fas fa-eye stat-icon" style="color:var(--primary)"></i>
  </div>
</div>

<div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:24px">

  <!-- Quick Actions & Use Cases -->
  <div style="display:flex;flex-direction:column;gap:16px">

    <!-- Use Case Quick-start -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-bolt" style="color:#fdcb6e"></i> Quick Start by Business Type</div>
      </div>
      <div class="card-body">
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
          ${[
            ['🏪','Retail Shop','Promotions, stock alerts, festive offers','e17055','/campaigns'],
            ['💊','Clinic / Pharmacy','Appointment reminders, prescription ready, health tips','27ae60','/chatbot-builder'],
            ['🍽️','Restaurant','Menu, reservations, order updates, daily specials','f39c12','/campaigns'],
            ['💇','Salon / Spa','Booking confirmations, packages, reviews','a29bfe','/chatbot-builder'],
            ['🏋️','Gym / Studio','Class reminders, offers, renewals, progress updates','0984e3','/campaigns'],
            ['🏠','Real Estate','Property alerts, site visit scheduling, follow-ups','e74c3c','/leads'],
          ].map(([icon,name,desc,color,link])=>`
          <div style="border:1px solid var(--border);border-radius:12px;padding:14px;cursor:pointer;transition:all 0.2s;background:rgba(255,255,255,0.02)" onclick="window.location.href='${link}'" onmouseover="this.style.borderColor='#${color}44'" onmouseout="this.style.borderColor='var(--border)'">
            <div style="font-size:24px;margin-bottom:6px">${icon}</div>
            <div style="font-size:13px;font-weight:700;color:white;margin-bottom:4px">${name}</div>
            <div style="font-size:11px;color:var(--text-muted);line-height:1.4">${desc}</div>
            <div style="margin-top:8px;font-size:11px;color:#${color};font-weight:600">Set up now →</div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Campaigns -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-bullhorn" style="color:var(--primary)"></i> Recent Campaigns</div>
        <a href="/campaigns" class="btn btn-sm btn-outline">+ New Campaign</a>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr><th>Campaign</th><th>Type</th><th>Sent</th><th>Delivered</th><th>Replies</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${[
              ['Diwali Sale Offer','Promo','342','332','87','completed'],
              ['Weekend Special Menu','Promo','180','176','32','completed'],
              ['Appointment Reminders','Utility','28','27','—','running'],
              ['New Stock Alert','Utility','200','0','—','scheduled'],
            ].map(([name,type,sent,del,rep,status])=>`
            <tr>
              <td style="font-size:13px;font-weight:600;color:white">${name}</td>
              <td><span class="badge ${type==='Promo'?'badge-purple':'badge-info'}" style="font-size:10px">${type}</span></td>
              <td style="color:var(--text-muted);font-size:13px">${sent}</td>
              <td style="color:var(--wa-green);font-size:13px;font-weight:600">${del}</td>
              <td style="color:var(--accent);font-size:13px">${rep}</td>
              <td><span class="badge ${status==='completed'?'badge-success':status==='running'?'badge-warning':'badge-info'}" style="font-size:10px">${status}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Right column -->
  <div style="display:flex;flex-direction:column;gap:16px">

    <!-- One-tap send -->
    <div class="card" style="background:linear-gradient(135deg,rgba(37,211,102,0.08),rgba(18,140,126,0.04));border-color:rgba(37,211,102,0.2)">
      <div class="card-header" style="border-color:rgba(37,211,102,0.15)">
        <div class="card-title"><i class="fab fa-whatsapp" style="color:var(--wa-green)"></i> One-tap Send</div>
      </div>
      <div class="card-body">
        <div style="display:flex;flex-direction:column;gap:8px">
          ${[
            ['📦 Order Ready','Send to customer that order is ready'],
            ['💳 Payment Received','Confirm payment to customer'],
            ['📅 Appointment Confirmed','Booking confirmation message'],
            ['🎉 Festive Greet','Greet all customers for festival'],
            ['📢 New Stock Alert','Inform about new products'],
          ].map(([name,desc])=>`
          <button style="display:flex;align-items:center;gap:10px;border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:10px 12px;background:rgba(37,211,102,0.04);cursor:pointer;text-align:left;width:100%;transition:all 0.2s" onclick="showToast('${name} sent!','success')" onmouseover="this.style.background='rgba(37,211,102,0.08)'" onmouseout="this.style.background='rgba(37,211,102,0.04)'">
            <div style="font-size:20px;flex-shrink:0">${name.split(' ')[0]}</div>
            <div>
              <div style="font-size:12px;font-weight:600;color:white">${name.slice(3)}</div>
              <div style="font-size:10px;color:var(--text-muted)">${desc}</div>
            </div>
            <i class="fas fa-chevron-right" style="color:var(--wa-green);margin-left:auto;font-size:12px"></i>
          </button>`).join('')}
        </div>
      </div>
    </div>

    <!-- My Bot -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-robot" style="color:var(--primary)"></i> My WhatsApp Bot</div>
        <span class="badge badge-success" style="font-size:10px"><i class="fas fa-circle" style="font-size:7px"></i> Active</span>
      </div>
      <div class="card-body">
        <div style="text-align:center;padding:8px 0">
          <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:28px;color:white;margin:0 auto 10px">🤖</div>
          <div style="font-size:14px;font-weight:700;color:white">Welcome & Menu Bot</div>
          <div style="font-size:12px;color:var(--text-muted);margin:4px 0 12px">Handles enquiries 24/7</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;text-align:center;margin-bottom:14px">
            ${[['1,240','Chats Today'],['94%','Resolution Rate'],['8s','Avg Response'],['24/7','Available']].map(([v,l])=>`
            <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:8px">
              <div style="font-size:15px;font-weight:800;color:white">${v}</div>
              <div style="font-size:10px;color:var(--text-muted)">${l}</div>
            </div>`).join('')}
          </div>
          <a href="/chatbot-builder" class="btn btn-primary w-full" style="justify-content:center"><i class="fas fa-edit"></i> Edit Bot Flow</a>
        </div>
      </div>
    </div>

    <!-- Smart Poster -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-image" style="color:#fd79a8"></i> Smart Poster</div>
        <button class="btn btn-sm btn-outline" onclick="showToast('Opening poster creator...','info')"><i class="fas fa-plus"></i> Create</button>
      </div>
      <div class="card-body">
        <div style="background:linear-gradient(135deg,#e17055,#fdcb6e);border-radius:12px;padding:20px;text-align:center;margin-bottom:12px;position:relative">
          <div style="font-size:22px;font-weight:800;color:white">🎉 DIWALI SALE</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.9);margin:4px 0">UP TO 50% OFF!</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.7)">Valid: 20-25 Oct 2024</div>
          <div style="margin-top:12px;background:rgba(0,0,0,0.3);border-radius:8px;padding:6px 10px;font-size:11px;color:white;display:inline-block">👆 Tap to WhatsApp us</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11px;text-align:center">
          <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:8px">
            <div style="font-size:16px;font-weight:800;color:var(--primary)">1,842</div>
            <div style="color:var(--text-muted)">Views</div>
          </div>
          <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:8px">
            <div style="font-size:16px;font-weight:800;color:var(--wa-green)">284</div>
            <div style="color:var(--text-muted)">Leads</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Customer Segments + Loyalty -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-layer-group" style="color:var(--accent)"></i> Customer Segments</div>
      <button class="btn btn-sm btn-outline" onclick="showToast('Creating segment...','info')"><i class="fas fa-plus"></i> New</button>
    </div>
    <div class="card-body">
      ${[
        ['All Customers','342 contacts','var(--wa-green)','users'],
        ['VIP / Regular','89 contacts','#fdcb6e','star'],
        ['New (This Month)','124 contacts','var(--info)','user-plus'],
        ['Inactive 30+ days','76 contacts','var(--warning)','user-clock'],
        ['Birthday This Month','18 contacts','#fd79a8','birthday-cake'],
        ['Pending Payment','23 contacts','var(--danger)','exclamation-circle'],
      ].map(([name,count,color,ic])=>`
      <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(45,63,90,0.3);cursor:pointer" onclick="showToast('Segment selected: ${name}','info')">
        <div style="width:32px;height:32px;border-radius:8px;background:${color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <i class="fas fa-${ic}" style="color:${color};font-size:13px"></i>
        </div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:white">${name}</div>
          <div style="font-size:11px;color:var(--text-muted)">${count}</div>
        </div>
        <button class="btn btn-xs btn-outline" onclick="event.stopPropagation();showToast('Sending to ${name}...','success')"><i class="fab fa-whatsapp"></i> Send</button>
      </div>`).join('')}
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fas fa-chart-line" style="color:var(--primary)"></i> Weekly Performance</div>
    </div>
    <div class="card-body">
      <div style="display:flex;flex-direction:column;gap:14px">
        ${[
          ['Messages Sent','8,420','var(--wa-green)',84],
          ['Delivered','8,150','var(--accent)',81],
          ['Opened','6,230','var(--primary)',63],
          ['Replied','3,480','#fdcb6e',35],
          ['Leads Generated','87','#e17055',20],
          ['Orders from WA','34','#fd79a8',15],
        ].map(([label,val,color,pct])=>`
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:5px">
            <span style="font-size:12px;color:var(--text-muted)">${label}</span>
            <span style="font-size:12px;font-weight:700;color:${color}">${val}</span>
          </div>
          <div class="progress"><div class="progress-bar" style="width:${pct}%;background:${color}"></div></div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- Upgrade CTA -->
<div style="background:linear-gradient(135deg,rgba(108,92,231,0.15),rgba(0,206,201,0.08));border:1px solid rgba(108,92,231,0.2);border-radius:16px;padding:24px;text-align:center">
  <div style="font-size:18px;font-weight:800;color:white;margin-bottom:8px">🚀 Growing fast? Upgrade to Pro</div>
  <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Unlock unlimited contacts, advanced bot flows, ERP integrations, analytics & white-label branding</div>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
    <a href="/wallet" class="btn btn-primary"><i class="fas fa-arrow-up"></i> Upgrade to Pro — ₹2,999/mo</a>
    <a href="/chatbot-builder" class="btn btn-outline"><i class="fas fa-project-diagram"></i> Explore Bot Builder</a>
  </div>
</div>

<!-- Quick Send Modal -->
<div class="modal-overlay" id="quickSendModal">
  <div class="modal">
    <div class="modal-header">
      <div class="modal-title"><i class="fab fa-whatsapp" style="color:var(--wa-green)"></i> Quick Send</div>
      <button class="modal-close" onclick="closeModal('quickSendModal')"><i class="fas fa-times"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Phone Number</label>
        <input type="tel" class="form-control" placeholder="+91 98765 43210">
      </div>
      <div class="form-group">
        <label class="form-label">Template</label>
        <select class="form-control">
          <option>📦 Order Ready</option>
          <option>💳 Payment Confirmed</option>
          <option>📅 Appointment Reminder</option>
          <option>🎉 Custom Offer</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Message</label>
        <textarea class="form-control" rows="4" placeholder="Type message...">Hi! Your order is ready for pickup. Please visit us between 10AM - 6PM. Thank you! 🙏</textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('quickSendModal')">Cancel</button>
      <button class="btn btn-success" onclick="closeModal('quickSendModal');showToast('Message sent!','success')"><i class="fab fa-whatsapp"></i> Send Now</button>
    </div>
  </div>
</div>

`, 'smb', 'Small Business Suite', 'WhatsApp for shops, clinics, restaurants & local businesses', `.w-full{width:100%}`, ``)
