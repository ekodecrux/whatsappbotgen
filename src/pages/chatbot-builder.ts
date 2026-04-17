export const chatbotBuilderHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bot Flow Builder | WapiSend</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    :root {
      --wa-green:#25D366;--wa-teal:#128C7E;--primary:#6C5CE7;--accent:#00CEC9;
      --dark:#0f172a;--card:#1e293b;--card2:#263348;--border:#2d3f5a;
      --text:#e2e8f0;--muted:#8899a6;
    }
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Inter',sans-serif;background:var(--dark);color:var(--text);height:100vh;display:flex;flex-direction:column;overflow:hidden;}
    
    /* Top Toolbar */
    .builder-toolbar{
      height:56px;background:rgba(15,23,42,0.98);border-bottom:1px solid var(--border);
      display:flex;align-items:center;padding:0 16px;gap:12px;flex-shrink:0;
    }
    .toolbar-brand{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:white;text-decoration:none;}
    .toolbar-brand i{color:var(--wa-green);}
    .toolbar-divider{width:1px;height:24px;background:var(--border);margin:0 4px;}
    .toolbar-flow-name{font-size:14px;font-weight:600;color:white;background:none;border:none;outline:none;cursor:text;}
    .toolbar-right{margin-left:auto;display:flex;align-items:center;gap:8px;}
    .btn-t{display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;font-size:12px;font-weight:600;border:none;cursor:pointer;font-family:inherit;transition:all 0.2s;}
    .btn-t-outline{background:transparent;border:1px solid var(--border);color:var(--text);}
    .btn-t-outline:hover{background:var(--card2);}
    .btn-t-primary{background:var(--primary);color:white;}
    .btn-t-success{background:var(--wa-green);color:white;}
    
    /* Builder Layout */
    .builder-layout{flex:1;display:flex;overflow:hidden;}
    
    /* Left Panel: Node Library */
    .node-library{
      width:220px;min-width:220px;background:rgba(15,23,42,0.98);
      border-right:1px solid var(--border);overflow-y:auto;padding:12px;
      display:flex;flex-direction:column;gap:6px;
    }
    .lib-section{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:1.2px;padding:8px 8px 4px;}
    .lib-node{
      display:flex;align-items:center;gap:8px;padding:9px 10px;
      border-radius:9px;border:1px solid var(--border);
      background:var(--card);cursor:grab;font-size:12px;font-weight:600;color:var(--text);
      transition:all 0.2s;user-select:none;
    }
    .lib-node:hover{border-color:var(--primary);background:rgba(108,92,231,0.1);transform:translateX(3px);}
    .lib-node i{width:16px;text-align:center;}
    .lib-node:active{cursor:grabbing;}
    
    /* Canvas */
    .canvas-area{
      flex:1;overflow:auto;position:relative;
      background:#0a1628;
      background-image:radial-gradient(circle,rgba(45,63,90,0.5) 1px,transparent 1px);
      background-size:24px 24px;
    }
    .canvas{width:3000px;height:3000px;position:relative;transform-origin:top left;}
    
    /* Nodes */
    .flow-node{
      position:absolute;min-width:200px;max-width:240px;
      background:var(--card);border:2px solid var(--border);
      border-radius:14px;cursor:move;user-select:none;
      box-shadow:0 4px 20px rgba(0,0,0,0.4);
      transition:box-shadow 0.2s;
    }
    .flow-node:hover{box-shadow:0 8px 30px rgba(0,0,0,0.6);}
    .flow-node.selected{border-color:var(--primary);box-shadow:0 0 0 3px rgba(108,92,231,0.3);}
    .node-header{
      padding:10px 12px;border-radius:12px 12px 0 0;
      display:flex;align-items:center;gap:8px;
      font-size:12px;font-weight:700;color:white;
    }
    .node-header i{font-size:13px;}
    .node-actions{margin-left:auto;display:flex;gap:4px;}
    .node-btn{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:10px;transition:all 0.2s;}
    .node-body{padding:10px 12px 12px;}
    .node-msg{font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:8px;}
    .node-btns-list{display:flex;flex-direction:column;gap:4px;}
    .node-btn-item{
      background:rgba(255,255,255,0.06);border:1px solid var(--border);
      border-radius:7px;padding:5px 10px;font-size:11px;color:var(--text);
      display:flex;align-items:center;gap:6px;
    }
    .node-connector{
      width:12px;height:12px;border-radius:50%;background:var(--primary);
      border:2px solid var(--dark);cursor:crosshair;position:absolute;
      transition:transform 0.2s;
    }
    .node-connector:hover{transform:scale(1.5);}
    .connector-out{bottom:-6px;left:50%;transform:translateX(-50%);}
    .connector-out-right{right:-6px;top:50%;transform:translateY(-50%);}
    .connector-in{top:-6px;left:50%;transform:translateX(-50%);background:var(--accent);}

    /* SVG Connections */
    .connections-svg{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:visible;}
    
    /* Right Panel: Properties */
    .props-panel{
      width:260px;min-width:260px;background:rgba(15,23,42,0.98);
      border-left:1px solid var(--border);overflow-y:auto;display:flex;flex-direction:column;
    }
    .props-header{padding:14px 16px;border-bottom:1px solid var(--border);font-size:13px;font-weight:700;color:white;}
    .props-body{padding:14px 16px;flex:1;}
    .prop-group{margin-bottom:16px;}
    .prop-label{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:7px;display:block;}
    .prop-input{
      width:100%;padding:8px 10px;background:var(--dark);border:1px solid var(--border);
      border-radius:8px;color:var(--text);font-size:12px;outline:none;font-family:inherit;
    }
    .prop-input:focus{border-color:var(--primary);}
    textarea.prop-input{resize:vertical;min-height:80px;}
    .btn-add-option{
      width:100%;padding:7px;border:1px dashed var(--border);border-radius:8px;
      background:transparent;color:var(--muted);font-size:12px;cursor:pointer;
      font-family:inherit;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:6px;
    }
    .btn-add-option:hover{border-color:var(--primary);color:var(--primary);}

    /* Zoom Controls */
    .zoom-controls{
      position:fixed;bottom:20px;right:284px;z-index:100;
      display:flex;flex-direction:column;gap:6px;
    }
    .zoom-btn{
      width:36px;height:36px;background:var(--card);border:1px solid var(--border);
      border-radius:8px;display:flex;align-items:center;justify-content:center;
      color:var(--text);cursor:pointer;font-size:14px;transition:all 0.2s;
    }
    .zoom-btn:hover{background:var(--card2);}

    /* Mini Map */
    .mini-map{
      position:fixed;bottom:20px;left:232px;z-index:100;
      width:160px;height:100px;background:rgba(15,23,42,0.9);
      border:1px solid var(--border);border-radius:10px;overflow:hidden;
    }

    /* Toast */
    .toast-c{position:fixed;top:68px;right:16px;z-index:999;display:flex;flex-direction:column;gap:6px;}
    .toast-n{background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:10px 14px;font-size:12px;color:white;display:flex;align-items:center;gap:8px;animation:fadeIn 0.2s;}
    @keyframes fadeIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}

    /* Scrollbar */
    ::-webkit-scrollbar{width:4px;height:4px}
    ::-webkit-scrollbar-track{background:var(--card)}
    ::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}

    @media(max-width:900px){.node-library{display:none}.props-panel{display:none}}
  </style>
</head>
<body>

<!-- Toolbar -->
<div class="builder-toolbar">
  <a href="/dashboard" class="toolbar-brand"><i class="fab fa-whatsapp"></i> WapiSend</a>
  <div class="toolbar-divider"></div>
  <input class="toolbar-flow-name" value="Welcome & Lead Capture Bot" id="flowName">
  <span style="font-size:11px;color:var(--muted);margin-left:4px">• Auto-saved</span>
  <div class="toolbar-right">
    <button class="btn-t btn-t-outline" onclick="toggleGrid()"><i class="fas fa-th"></i> Grid</button>
    <button class="btn-t btn-t-outline" onclick="clearCanvas()"><i class="fas fa-trash"></i> Clear</button>
    <button class="btn-t btn-t-outline" onclick="exportFlow()"><i class="fas fa-download"></i> Export</button>
    <div class="toolbar-divider"></div>
    <button class="btn-t btn-t-outline" onclick="testFlow()"><i class="fas fa-play"></i> Test</button>
    <button class="btn-t btn-t-primary" onclick="deployFlow()"><i class="fas fa-rocket"></i> Deploy Bot</button>
    <a href="/dashboard" class="btn-t btn-t-outline" style="text-decoration:none"><i class="fas fa-arrow-left"></i></a>
  </div>
</div>

<!-- Builder Layout -->
<div class="builder-layout">

  <!-- Node Library -->
  <div class="node-library">
    <div class="lib-section">Triggers</div>
    <div class="lib-node" draggable="true" data-type="trigger_keyword" onclick="addNode('trigger_keyword')">
      <i class="fas fa-bolt" style="color:#fdcb6e"></i> Keyword Trigger
    </div>
    <div class="lib-node" draggable="true" data-type="trigger_welcome" onclick="addNode('trigger_welcome')">
      <i class="fas fa-hand-wave" style="color:#00b894"></i> Welcome Message
    </div>
    <div class="lib-node" draggable="true" data-type="trigger_campaign" onclick="addNode('trigger_campaign')">
      <i class="fas fa-bullhorn" style="color:#6C5CE7"></i> Campaign Start
    </div>

    <div class="lib-section">Messages</div>
    <div class="lib-node" draggable="true" data-type="msg_text" onclick="addNode('msg_text')">
      <i class="fas fa-comment" style="color:#25D366"></i> Text Message
    </div>
    <div class="lib-node" draggable="true" data-type="msg_buttons" onclick="addNode('msg_buttons')">
      <i class="fas fa-mouse-pointer" style="color:#0984e3"></i> Button Message
    </div>
    <div class="lib-node" draggable="true" data-type="msg_list" onclick="addNode('msg_list')">
      <i class="fas fa-list" style="color:#e17055"></i> List Message
    </div>
    <div class="lib-node" draggable="true" data-type="msg_media" onclick="addNode('msg_media')">
      <i class="fas fa-image" style="color:#a29bfe"></i> Media Message
    </div>
    <div class="lib-node" draggable="true" data-type="msg_template" onclick="addNode('msg_template')">
      <i class="fas fa-file-alt" style="color:#fd79a8"></i> Template
    </div>
    <div class="lib-node" draggable="true" data-type="msg_carousel" onclick="addNode('msg_carousel')">
      <i class="fas fa-images" style="color:#00CEC9"></i> Carousel
    </div>

    <div class="lib-section">Logic</div>
    <div class="lib-node" draggable="true" data-type="logic_condition" onclick="addNode('logic_condition')">
      <i class="fas fa-code-branch" style="color:#fdcb6e"></i> Condition
    </div>
    <div class="lib-node" draggable="true" data-type="logic_delay" onclick="addNode('logic_delay')">
      <i class="fas fa-clock" style="color:#636e72"></i> Delay
    </div>
    <div class="lib-node" draggable="true" data-type="logic_ai" onclick="addNode('logic_ai')">
      <i class="fas fa-brain" style="color:#6C5CE7"></i> AI Response
    </div>

    <div class="lib-section">Data</div>
    <div class="lib-node" draggable="true" data-type="data_input" onclick="addNode('data_input')">
      <i class="fas fa-keyboard" style="color:#00b894"></i> Collect Input
    </div>
    <div class="lib-node" draggable="true" data-type="data_crm" onclick="addNode('data_crm')">
      <i class="fas fa-user-plus" style="color:#0984e3"></i> Save to CRM
    </div>
    <div class="lib-node" draggable="true" data-type="data_webhook" onclick="addNode('data_webhook')">
      <i class="fas fa-code" style="color:#e17055"></i> Webhook
    </div>
    <div class="lib-node" draggable="true" data-type="data_tag" onclick="addNode('data_tag')">
      <i class="fas fa-tag" style="color:#a29bfe"></i> Tag Contact
    </div>

    <div class="lib-section">Actions</div>
    <div class="lib-node" draggable="true" data-type="action_transfer" onclick="addNode('action_transfer')">
      <i class="fas fa-headset" style="color:#fd79a8"></i> Human Handoff
    </div>
    <div class="lib-node" draggable="true" data-type="action_notify" onclick="addNode('action_notify')">
      <i class="fas fa-bell" style="color:#fdcb6e"></i> Send Notification
    </div>
  </div>

  <!-- Canvas -->
  <div class="canvas-area" id="canvasArea">
    <div class="canvas" id="canvas">
      <svg class="connections-svg" id="connectSVG"></svg>
    </div>
  </div>

  <!-- Properties Panel -->
  <div class="props-panel" id="propsPanel">
    <div class="props-header"><i class="fas fa-sliders-h" style="color:var(--primary);margin-right:8px"></i> Node Properties</div>
    <div class="props-body" id="propsBody">
      <div style="text-align:center;padding:40px 0;color:var(--muted)">
        <i class="fas fa-mouse-pointer" style="font-size:32px;margin-bottom:12px;display:block;opacity:0.3"></i>
        <p style="font-size:12px">Click a node to edit its properties</p>
      </div>
    </div>
  </div>
</div>

<!-- Zoom Controls -->
<div class="zoom-controls">
  <div class="zoom-btn" onclick="zoom(1.1)" title="Zoom In"><i class="fas fa-plus"></i></div>
  <div class="zoom-btn" onclick="zoom(0.9)" title="Zoom Out"><i class="fas fa-minus"></i></div>
  <div class="zoom-btn" onclick="resetZoom()" title="Reset" style="font-size:10px;font-weight:700">1:1</div>
  <div class="zoom-btn" onclick="fitView()" title="Fit View"><i class="fas fa-expand"></i></div>
</div>

<div class="toast-c" id="toastContainer"></div>

<script>
const NODE_TYPES = {
  trigger_keyword: { label:'Keyword Trigger', color:'#fdcb6e', icon:'fa-bolt', bg:'rgba(253,203,110,0.2)', msg:'Triggers when user sends keyword', btns:['Hello','Hi','Start','Menu'] },
  trigger_welcome: { label:'Welcome Message', color:'#00b894', icon:'fa-hand-wave', bg:'rgba(0,184,148,0.2)', msg:'Sent when user first contacts you', btns:[] },
  trigger_campaign: { label:'Campaign Start', color:'#6C5CE7', icon:'fa-bullhorn', bg:'rgba(108,92,231,0.2)', msg:'Entry point for campaign flows', btns:[] },
  msg_text: { label:'Text Message', color:'#25D366', icon:'fa-comment', bg:'rgba(37,211,102,0.2)', msg:'Hello! How can we help you today? 😊', btns:[] },
  msg_buttons: { label:'Button Message', color:'#0984e3', icon:'fa-mouse-pointer', bg:'rgba(9,132,227,0.2)', msg:'Please choose an option below:', btns:['Learn More','Get Quote','Talk to Agent'] },
  msg_list: { label:'List Message', color:'#e17055', icon:'fa-list', bg:'rgba(231,112,85,0.2)', msg:'Select from the menu:', btns:['Our Products','Pricing','Support','About Us'] },
  msg_media: { label:'Media Message', color:'#a29bfe', icon:'fa-image', bg:'rgba(162,155,254,0.2)', msg:'Sends image/video/document', btns:[] },
  msg_template: { label:'Template Message', color:'#fd79a8', icon:'fa-file-alt', bg:'rgba(253,121,168,0.2)', msg:'Uses pre-approved template', btns:[] },
  msg_carousel: { label:'Carousel', color:'#00CEC9', icon:'fa-images', bg:'rgba(0,206,201,0.2)', msg:'Product carousel with buttons', btns:['View','Buy Now'] },
  logic_condition: { label:'Condition (If/Else)', color:'#fdcb6e', icon:'fa-code-branch', bg:'rgba(253,203,110,0.2)', msg:'If reply contains "price" →', btns:['Yes ✓','No ✗'] },
  logic_delay: { label:'Wait / Delay', color:'#636e72', icon:'fa-clock', bg:'rgba(99,110,114,0.2)', msg:'Wait 5 minutes before next step', btns:[] },
  logic_ai: { label:'AI Response', color:'#6C5CE7', icon:'fa-brain', bg:'rgba(108,92,231,0.2)', msg:'GPT-4 powered smart reply', btns:[] },
  data_input: { label:'Collect Input', color:'#00b894', icon:'fa-keyboard', bg:'rgba(0,184,148,0.2)', msg:'Ask: What is your name?', btns:[] },
  data_crm: { label:'Save to CRM', color:'#0984e3', icon:'fa-user-plus', bg:'rgba(9,132,227,0.2)', msg:'Creates lead with collected data', btns:[] },
  data_webhook: { label:'Call Webhook', color:'#e17055', icon:'fa-code', bg:'rgba(231,112,85,0.2)', msg:'POST data to your API endpoint', btns:[] },
  data_tag: { label:'Tag Contact', color:'#a29bfe', icon:'fa-tag', bg:'rgba(162,155,254,0.2)', msg:'Add tag: interested_buyer', btns:[] },
  action_transfer: { label:'Human Handoff', color:'#fd79a8', icon:'fa-headset', bg:'rgba(253,121,168,0.2)', msg:'Transfer to live agent', btns:[] },
  action_notify: { label:'Send Notification', color:'#fdcb6e', icon:'fa-bell', bg:'rgba(253,203,110,0.2)', msg:'Notify team on Slack/Email', btns:[] },
};

let nodes = [], connections = [], selectedNode = null, nodeCounter = 0, scale = 1;
let dragging = null, dragOffset = {x:0,y:0};
let connectingFrom = null;

function createNode(type, x, y) {
  const t = NODE_TYPES[type];
  if (!t) return;
  const id = 'node_' + (++nodeCounter);
  const n = { id, type, x, y, label: t.label, msg: t.msg, btns: [...t.btns], color: t.color, icon: t.icon, bg: t.bg };
  nodes.push(n);
  renderNode(n);
  return n;
}

function renderNode(n) {
  const div = document.createElement('div');
  div.className = 'flow-node';
  div.id = n.id;
  div.style.left = n.x + 'px';
  div.style.top = n.y + 'px';
  div.innerHTML = \`
    <div class="node-header" style="background:\${n.bg}">
      <i class="fas \${n.icon}" style="color:\${n.color}"></i>
      <span>\${n.label}</span>
      <div class="node-actions">
        <button class="node-btn" style="background:rgba(255,255,255,0.1);color:#94a3b8" onclick="duplicateNode('\${n.id}')"><i class="fas fa-copy"></i></button>
        <button class="node-btn" style="background:rgba(231,76,60,0.2);color:#e74c3c" onclick="deleteNode('\${n.id}')"><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <div class="node-body">
      <div class="node-msg">\${n.msg}</div>
      \${n.btns.length ? \`<div class="node-btns-list">\${n.btns.map(b=>\`<div class="node-btn-item"><i class="fas fa-reply" style="color:\${n.color};font-size:9px"></i>\${b}</div>\`).join('')}</div>\` : ''}
    </div>
    <div class="node-connector connector-in" onclick="startConnect('\${n.id}','in',event)" title="Connect input"></div>
    <div class="node-connector connector-out" onclick="startConnect('\${n.id}','out',event)" title="Connect output" style="background:\${n.color}"></div>
  \`;
  div.addEventListener('mousedown', e => { if (e.target.closest('.node-btn') || e.target.closest('.node-connector')) return; startDrag(e, n.id); });
  div.addEventListener('click', e => { if (!e.target.closest('.node-btn') && !e.target.closest('.node-connector')) selectNode(n.id); });
  document.getElementById('canvas').appendChild(div);
}

function startDrag(e, id) {
  e.preventDefault();
  dragging = id;
  const n = nodes.find(x=>x.id===id);
  const rect = document.getElementById(id).getBoundingClientRect();
  dragOffset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  document.getElementById(id).style.zIndex = 999;
}

document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const canvas = document.getElementById('canvasArea');
  const cr = canvas.getBoundingClientRect();
  const n = nodes.find(x=>x.id===dragging);
  if (!n) return;
  n.x = (e.clientX - cr.left - dragOffset.x + canvas.scrollLeft) / scale;
  n.y = (e.clientY - cr.top - dragOffset.y + canvas.scrollTop) / scale;
  const el = document.getElementById(dragging);
  el.style.left = n.x + 'px';
  el.style.top = n.y + 'px';
  renderConnections();
});

document.addEventListener('mouseup', () => {
  if (dragging) { document.getElementById(dragging).style.zIndex = ''; dragging = null; }
});

function selectNode(id) {
  nodes.forEach(n => document.getElementById(n.id)?.classList.remove('selected'));
  selectedNode = id;
  document.getElementById(id)?.classList.add('selected');
  const n = nodes.find(x=>x.id===id);
  if (!n) return;
  const t = NODE_TYPES[n.type];
  document.getElementById('propsBody').innerHTML = \`
    <div class="prop-group">
      <label class="prop-label">Node Label</label>
      <input class="prop-input" value="\${n.label}" onchange="updateProp('\${id}','label',this.value)">
    </div>
    <div class="prop-group">
      <label class="prop-label">Message Text</label>
      <textarea class="prop-input" onchange="updateProp('\${id}','msg',this.value)">\${n.msg}</textarea>
    </div>
    \${n.btns.length ? \`
    <div class="prop-group">
      <label class="prop-label">Button Options (\${n.btns.length}/3)</label>
      \${n.btns.map((b,i)=>\`<input class="prop-input" style="margin-bottom:6px" value="\${b}" onchange="updateBtn('\${id}',\${i},this.value)">\`).join('')}
      <button class="btn-add-option" onclick="addBtn('\${id}')"><i class="fas fa-plus"></i> Add Option</button>
    </div>\` : ''}
    <div class="prop-group">
      <label class="prop-label">Type</label>
      <input class="prop-input" value="\${n.type}" readonly style="opacity:0.5">
    </div>
    <div style="margin-top:16px;display:flex;flex-direction:column;gap:8px">
      <button class="btn-t btn-t-outline" style="width:100%;justify-content:center" onclick="duplicateNode('\${id}')"><i class="fas fa-copy"></i> Duplicate</button>
      <button class="btn-t" style="width:100%;justify-content:center;background:rgba(231,76,60,0.15);border:1px solid var(--danger,#e74c3c);color:#e74c3c" onclick="deleteNode('\${id}')"><i class="fas fa-trash"></i> Delete Node</button>
    </div>
  \`;
}

function updateProp(id, key, val) {
  const n = nodes.find(x=>x.id===id);
  if (n) {
    n[key] = val;
    const el = document.getElementById(id);
    if (key === 'label') el.querySelector('.node-header span').textContent = val;
    if (key === 'msg') el.querySelector('.node-msg').textContent = val;
  }
}
function updateBtn(id, i, val) { const n = nodes.find(x=>x.id===id); if (n) n.btns[i] = val; }
function addBtn(id) {
  const n = nodes.find(x=>x.id===id);
  if (n && n.btns.length < 3) { n.btns.push('New Option'); selectNode(id); renderNode_refresh(n); }
}
function renderNode_refresh(n) {
  const old = document.getElementById(n.id);
  if (old) old.remove();
  renderNode(n);
  if (selectedNode === n.id) selectNode(n.id);
}

function deleteNode(id) {
  nodes = nodes.filter(n=>n.id!==id);
  connections = connections.filter(c=>c.from!==id && c.to!==id);
  document.getElementById(id)?.remove();
  renderConnections();
  if (selectedNode===id) {
    selectedNode = null;
    document.getElementById('propsBody').innerHTML = '<div style="text-align:center;padding:40px 0;color:var(--muted)"><i class="fas fa-mouse-pointer" style="font-size:32px;margin-bottom:12px;display:block;opacity:0.3"></i><p style="font-size:12px">Click a node to edit its properties</p></div>';
  }
  toast('Node deleted');
}
function duplicateNode(id) {
  const n = nodes.find(x=>x.id===id);
  if (n) createNode(n.type, n.x+240, n.y+40);
  toast('Node duplicated');
}

function startConnect(id, dir, e) {
  e.stopPropagation();
  if (dir === 'out') { connectingFrom = id; toast('Click another node\'s input (top dot) to connect'); }
  else if (connectingFrom && connectingFrom !== id) {
    if (!connections.find(c=>c.from===connectingFrom && c.to===id)) {
      connections.push({ from: connectingFrom, to: id });
      renderConnections();
      toast('Connected!', 'success');
    }
    connectingFrom = null;
  }
}

function renderConnections() {
  const svg = document.getElementById('connectSVG');
  svg.innerHTML = '';
  connections.forEach(c => {
    const from = document.getElementById(c.from);
    const to = document.getElementById(c.to);
    if (!from || !to) return;
    const fn = nodes.find(x=>x.id===c.from);
    const tn = nodes.find(x=>x.id===c.to);
    const fw = from.offsetWidth, fh = from.offsetHeight;
    const tw = to.offsetWidth;
    const x1 = fn.x + fw/2, y1 = fn.y + fh;
    const x2 = tn.x + tw/2, y2 = tn.y;
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    const cy = (y1+y2)/2;
    path.setAttribute('d', \`M\${x1},\${y1} C\${x1},\${cy} \${x2},\${cy} \${x2},\${y2}\`);
    path.setAttribute('stroke','rgba(108,92,231,0.7)');
    path.setAttribute('stroke-width','2');
    path.setAttribute('fill','none');
    path.setAttribute('stroke-dasharray','6,4');
    const arrow = document.createElementNS('http://www.w3.org/2000/svg','polygon');
    arrow.setAttribute('points',\`\${x2-5},\${y2-10} \${x2+5},\${y2-10} \${x2},\${y2}\`);
    arrow.setAttribute('fill','rgba(108,92,231,0.8)');
    svg.appendChild(path);
    svg.appendChild(arrow);
    // Delete button
    const delBtn = document.createElementNS('http://www.w3.org/2000/svg','circle');
    const mx = (x1+x2)/2, my = (y1+y2)/2;
    delBtn.setAttribute('cx', mx); delBtn.setAttribute('cy', my);
    delBtn.setAttribute('r','8'); delBtn.setAttribute('fill','rgba(231,76,60,0.8)');
    delBtn.style.cursor = 'pointer';
    delBtn.addEventListener('click', () => {
      connections = connections.filter(x=>!(x.from===c.from && x.to===c.to));
      renderConnections();
    });
    svg.appendChild(delBtn);
    const delX = document.createElementNS('http://www.w3.org/2000/svg','text');
    delX.setAttribute('x', mx); delX.setAttribute('y', my+4);
    delX.setAttribute('text-anchor','middle'); delX.setAttribute('font-size','10');
    delX.setAttribute('fill','white'); delX.textContent = '×';
    delX.style.cursor = 'pointer';
    delX.style.pointerEvents = 'none';
    svg.appendChild(delX);
  });
}

function addNode(type) {
  const area = document.getElementById('canvasArea');
  const x = 200 + Math.random()*200;
  const y = 150 + nodes.length * 160;
  const n = createNode(type, x, y);
  if (n) { setTimeout(()=>selectNode(n.id), 50); toast(NODE_TYPES[type].label + ' added'); }
}

let gridVisible = true;
function toggleGrid() {
  const ca = document.getElementById('canvasArea');
  gridVisible = !gridVisible;
  ca.style.backgroundImage = gridVisible ? 'radial-gradient(circle,rgba(45,63,90,0.5) 1px,transparent 1px)' : 'none';
}

function clearCanvas() {
  if (!confirm('Clear all nodes?')) return;
  nodes=[]; connections=[]; selectedNode=null; nodeCounter=0;
  const canvas = document.getElementById('canvas');
  canvas.querySelectorAll('.flow-node').forEach(e=>e.remove());
  document.getElementById('connectSVG').innerHTML='';
  toast('Canvas cleared');
}

function zoom(f) { scale = Math.min(2, Math.max(0.3, scale*f)); document.getElementById('canvas').style.transform = 'scale('+scale+')'; }
function resetZoom() { scale=1; document.getElementById('canvas').style.transform='scale(1)'; }
function fitView() { resetZoom(); document.getElementById('canvasArea').scrollTo(0,0); }

function exportFlow() {
  const data = { name: document.getElementById('flowName').value, nodes, connections };
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='bot-flow.json'; a.click();
  toast('Flow exported!', 'success');
}
function testFlow() { toast('Opening test simulator...', 'info'); setTimeout(()=>toast('Test mode: Send "Hello" to +91 XXXXX XXXXX', 'info'), 500); }
function deployFlow() {
  toast('Deploying bot...', 'info');
  setTimeout(()=>toast('Bot deployed successfully! Live in 30s', 'success'), 2000);
}

function toast(msg, type='info') {
  const c = document.getElementById('toastContainer');
  const icons = {success:'check-circle',error:'times-circle',info:'info-circle'};
  const colors = {success:'#25D366',error:'#e74c3c',info:'#6C5CE7'};
  const t = document.createElement('div');
  t.className='toast-n';
  t.innerHTML='<i class="fas fa-'+(icons[type]||'info-circle')+'" style="color:'+(colors[type]||'#6C5CE7')+'"></i><span>'+msg+'</span>';
  c.appendChild(t);
  setTimeout(()=>t.remove(), 3000);
}

// Load sample flow
window.onload = () => {
  const welcome = createNode('trigger_welcome', 80, 80);
  const greet = createNode('msg_buttons', 350, 80);
  const product = createNode('msg_list', 620, 80);
  const input = createNode('data_input', 890, 80);
  const saveCrm = createNode('data_crm', 890, 300);
  const handoff = createNode('action_transfer', 1160, 80);

  setTimeout(()=>{
    connections = [
      {from:welcome.id, to:greet.id},
      {from:greet.id, to:product.id},
      {from:product.id, to:input.id},
      {from:input.id, to:saveCrm.id},
      {from:product.id, to:handoff.id},
    ];
    renderConnections();
    toast('Sample flow loaded. Drag nodes to rearrange!', 'success');
  }, 200);
};
</script>
</body>
</html>
`
