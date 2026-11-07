(function(){
  // Remove old bot if exists
  let oldHost = document.getElementById('ghost-host');
  if(oldHost) oldHost.remove();
  let oldFab = document.getElementById('ghost-fab');
  if(oldFab) oldFab.remove();
  let oldBot = document.getElementById('ghost-bot');
  if(oldBot) oldBot.remove();

  // Create host for Shadow DOM - isolates from Quotex CSS
  let host = document.createElement('div');
  host.id = 'ghost-host';
  host.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483647;';
  document.body.appendChild(host);
  let shadow = host.attachShadow({mode:'open'});

  // All CSS inside Shadow - Quotex cannot override
  let style = document.createElement('style');
  style.textContent = `
    *{box-sizing:border-box;margin:0;padding:0}
    .fab:active{cursor:grabbing} .fab{position:fixed;top:32%;right:10px;bottom:auto;width:54px;height:54px;cursor:grab;pointer-events:auto !important;touch-action:none;z-index:9999;touch-action:none;will-change:transform;transition:box-shadow .2s;}border-radius:50%;background:linear-gradient(135deg,#141830,#080a16);border:1px solid rgba(168,85,247,.6);box-shadow:0 0 16px rgba(168,85,247,.35),0 0 26px rgba(0,240,255,.18);display:flex;align-items:center;justify-content:center;cursor:pointer;pointer-events:auto;z-index:10}
    .fab-dot{position:absolute;top:5px;right:5px;width:7px;height:7px;background:#22c55e;border-radius:50%;border:2px solid #0b0b18;box-shadow:0 0 7px #22c55e;animation:pulse 1.6s infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    .candles{display:flex;align-items:flex-end;gap:4px;height:30px}
    .candle{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:28px;width:7px}
    .candle .wick{width:1.2px;background:currentColor;border-radius:2px}
    .candle .body{width:7px;border-radius:1.5px;box-shadow:0 0 6px currentColor}
    .candle.green{color:#22c55e}
    .candle.red{color:#f43f5e}
    .candle.green .body{background:linear-gradient(180deg,#4ade80,#16a34a);height:14px;animation:pg 1.8s ease-in-out infinite}
    .candle.red .body{background:linear-gradient(180deg,#fb7185,#be123c);height:11px;animation:pr 1.8s ease-in-out infinite .3s}
    .candle .wick.top{height:5px}
    .candle .wick.bottom{height:4px}
    @keyframes pg{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.12)}}
    @keyframes pr{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.1)}}
    .panel{position:fixed;top:32%;right:8px;bottom:auto;width:238px;max-width:calc(100vw - 16px);background:linear-gradient(168deg,#0f1122,#070812);border:1px solid rgba(168,85,247,.35);border-radius:18px;box-shadow:0 0 28px rgba(168,85,247,.22),0 22px 44px rgba(0,0,0,.55);color:#eef2ff;font-family:Inter,'Segoe UI',system-ui,sans-serif;overflow:hidden;pointer-events:auto;display:none}
    .panel.open{display:block;animation:panelIn .32s cubic-bezier(.16,1,.3,1)}
    @keyframes panelIn{from{opacity:0;transform:translateY(10px) scale(.88)}to{opacity:1;transform:translateY(0) scale(1)}}
    .panel::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#a855f7,#22d3ee,transparent);animation:borderFlow 2.4s linear infinite;background-size:200% 100%}
    @keyframes borderFlow{0%{background-position:0% 0}100%{background-position:200% 0}}
    .panel::after{content:'';position:absolute;top:0;left:0;right:0;height:44px;background:linear-gradient(180deg,rgba(0,240,255,.06),transparent);pointer-events:none}
    .head{padding:9px 10px 7px;display:flex;cursor:move;touch-action:none;}align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.07)}
    .head-left{display:flex;align-items:center;gap:8px}
    .logo{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#a855f7,#6d28d9 55%,#0ea5e9);display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .logo .candles{height:16px;gap:2.5px}
    .logo .candle{height:15px;width:4px}
    .logo .candle .body{width:4px}
    .logo .candle.green .body{height:8px}
    .logo .candle.red .body{height:6px}
    .logo .candle .wick.top{height:3px}
    .logo .candle .wick.bottom{height:2px}
    .title b{font-size:10px;letter-spacing:.9px;display:block;color:#fff}
    .title b span{color:#a78bfa}
    .title small{font-size:6.5px;letter-spacing:1.1px;color:#94a3b8;font-weight:700;display:block;margin-top:2px}
    .live{font-size:6px;font-weight:800;letter-spacing:.6px;background:rgba(34,197,94,.14);border:1px solid rgba(34,197,94,.35);color:#4ade80;padding:3px 6px;border-radius:20px;display:flex;align-items:center;gap:4px}
    .live i{width:5px;height:5px;background:#22c55e;border-radius:50%;display:block;box-shadow:0 0 6px #22c55e;animation:pulse 1.4s infinite}
    .actions{display:flex;gap:5px}
    .ibtn{width:26px;height:26px;border-radius:8px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.05);color:#cbd5e1;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative}
    .ibtn:hover{background:rgba(255,255,255,.10);color:#fff}
    .ibtn .lh{width:10px;height:1.6px;background:currentColor;border-radius:2px;position:absolute}
    .ibtn .x1,.ibtn .x2{width:10px;height:1.6px;background:currentColor;position:absolute;border-radius:2px}
    .ibtn .x1{transform:rotate(45deg)} .ibtn .x2{transform:rotate(-45deg)}
    .ibtn .ref{width:12px;height:12px;border:1.8px solid currentColor;border-radius:50%;border-top-color:transparent;position:relative}
    .ibtn .ref::after{content:'';position:absolute;top:-2px;right:-1px;border-left:4px solid transparent;border-right:1px solid transparent;border-bottom:5px solid currentColor;transform:rotate(40deg)}
    .pairwrap{padding:10px 10px 0;display:flex;align-items:center;justify-content:space-between}
    .pair{font-size:11px;font-weight:900;letter-spacing:.5px;color:#fff;line-height:1.2;flex:1}
    .pair small{display:block;font-size:6px;letter-spacing:.8px;color:#67e8f9;font-weight:700;margin-top:2px}
    .time{font-size:6.5px;color:#94a3b8;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);padding:4px 7px;border-radius:20px;white-space:nowrap;margin-left:8px}
    .viz{margin:7px 10px 0;padding:7px 10px 6px;border-radius:10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);position:relative;overflow:hidden;display:flex;align-items:flex-end;justify-content:center;gap:8px;height:46px}
    .viz .candle{height:44px;width:11px}
    .viz .candle .body{width:11px;border-radius:2px}
    .viz .candle.green .body{height:22px}
    .viz .candle.red .body{height:18px}
    .viz .candle .wick.top{height:9px}
    .viz .candle .wick.bottom{height:7px}
    .viz .scan{position:absolute;top:0;bottom:0;width:42px;background:linear-gradient(90deg,transparent,rgba(34,211,238,.22),transparent);animation:scan 1.1s linear infinite}
    @keyframes scan{0%{left:-20%}100%{left:110%}}
    .viz .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:14px 14px}
    .analysis{margin:8px 10px 0;display:none}
    .analysis.on{display:block}
    .analysis-t{font-size:6.5px;letter-spacing:1.1px;color:#a78bfa;font-weight:800;display:flex;justify-content:space-between;margin-bottom:6px}
    .prog{height:3px;background:rgba(255,255,255,.07);border-radius:10px;overflow:hidden}
    .prog-fill{height:100%;width:0%;background:linear-gradient(90deg,#a855f7,#22d3ee);transition:width .3s ease}
    .status{font-size:7px;color:#94a3b8;text-align:center;margin-top:6px}
    .result{margin:8px 10px 0;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.01))}
    .result-h{padding:7px 10px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,.06)}
    .result-h span{font-size:6.5px;letter-spacing:1.1px;color:#94a3b8;font-weight:800}
    .result-h b{font-size:6px;padding:3px 6px;border-radius:20px;background:rgba(34,197,94,.14);color:#4ade80;border:1px solid rgba(34,197,94,.25)}
    .sig{padding:8px 10px 7px;display:flex;align-items:center;gap:10px}
    .sig.call{background:linear-gradient(135deg,rgba(34,197,94,.11),rgba(34,197,94,.02))}
    .sig.put{background:linear-gradient(135deg,rgba(244,63,94,.12),rgba(244,63,94,.02))}
    .sig.wait{background:rgba(255,255,255,.02)}
    .arrow{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .arrow .tri{width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent}
    .arrow.up .tri{border-bottom:14px solid #fff;animation:up .8s ease-in-out infinite}
    .arrow.down .tri{border-top:14px solid #fff;animation:down .8s ease-in-out infinite}
    .arrow.wait .dot{width:10px;height:10px;border-radius:50%;background:#94a3b8}
    @keyframes up{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
    @keyframes down{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}
    .sig.call .arrow{background:linear-gradient(135deg,#22c55e,#15803d);box-shadow:0 0 14px rgba(34,197,94,.45)}
    .sig.put .arrow{background:linear-gradient(135deg,#f43f5e,#be123c);box-shadow:0 0 14px rgba(244,63,94,.45)}
    .sig.wait .arrow{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12)}
    .sigtxt small{font-size:6.5px;letter-spacing:1.3px;color:#94a3b8;font-weight:700;display:block}
    .sigtxt b{font-size:19px;font-weight:900;letter-spacing:.5px;line-height:1.1;display:block;margin-top:1px}
    .sig.call .sigtxt b{color:#4ade80}
    .sig.put .sigtxt b{color:#fb7185}
    .sigtxt p{font-size:6.5px;color:#94a3b8;margin:3px 0 0;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:170px}
    .stats{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.06);border-top:1px solid rgba(255,255,255,.06)}
    .stat{background:rgba(10,12,28,.92);padding:6px 10px}
    .stat label{font-size:6px;letter-spacing:.9px;color:#94a3b8;font-weight:700;display:block}
    .stat b{font-size:10px;color:#fff;display:block;margin-top:2px}
    .stat b.green{color:#4ade80} .stat b.red{color:#fb7185} .stat b.cyan{color:#67e8f9}
    .key{margin:8px 10px 0;padding:9px 10px;border-radius:12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06)}
    .key-t{font-size:6.5px;letter-spacing:1.1px;color:#a78bfa;font-weight:800;margin-bottom:6px;display:flex;align-items:center;gap:6px}
    .key-t .kd{width:6px;height:6px;background:#a855f7;border-radius:50%;box-shadow:0 0 6px #a855f7}
    .key-item{display:flex;gap:7px;align-items:flex-start;padding:3.5px 0;font-size:7.2px;line-height:1.35;color:#cbd5e1}
    .key-item .tick{width:14px;height:14px;border-radius:50%;background:rgba(34,197,94,.14);border:1px solid rgba(34,197,94,.3);display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .key-item .tick::after{content:'';width:6px;height:3px;border-left:1.6px solid #4ade80;border-bottom:1.6px solid #4ade80;transform:rotate(-45deg) translateY(-1px);display:block}
    .controls{padding:10px 10px 12px;display:flex;flex-direction:column;gap:7px}
    .row{display:flex;gap:7px}
    .btn{flex:1;height:32px;border-radius:10px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.05);color:#e2e8f0;font-size:7.5px;font-weight:700;letter-spacing:.3px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px}
    .btn:hover{background:rgba(255,255,255,.09)}
    .btn.primary{background:linear-gradient(135deg,#7c3aed,#06b6d4);border-color:transparent;color:#fff}
    .btn.copy{background:rgba(168,85,247,.12);border-color:rgba(168,85,247,.30);color:#ddd6fe}
    .meta{padding:0 10px 10px;text-align:center;font-size:6px;color:#64748b;letter-spacing:.3px}
    .meta b{color:#a78bfa}
    @media(max-width:360px){.panel{width:calc(100vw - 16px);right:8px;top:28%;bottom:auto}.fab{top:30%;right:8px;bottom:auto}}
  `;
  shadow.appendChild(style);

  // FAB
  let fab = document.createElement('div');
  fab.className = 'fab';
  fab.innerHTML = `<div class="fab-dot"></div><div class="candles"><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle red"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div></div>`;
  shadow.appendChild(fab);

  // Panel
  let panel = document.createElement('div');
  panel.className = 'panel';
  panel.innerHTML = `
    <div class="head">
      <div class="head-left">
        <div class="logo"><div class="candles"><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle red"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div></div></div>
        <div class="title"><b>GHOST <span>AI</span></b><small>SIGNAL ANALYZER</small></div>
        <div class="live"><i></i> LIVE</div>
      </div>
      <div class="actions">
        <button class="ibtn" data-act="refresh"><span class="ref"></span></button>
        <button class="ibtn" data-act="min"><span class="lh"></span></button>
        <button class="ibtn" data-act="close"><span class="x1"></span><span class="x2"></span></button>
      </div>
    </div>
    <div class="pairwrap"><div class="pair" id="p-pair">GBP/USD<small>GHOST QUANTUM X • AI SCAN</small></div><div class="time">1M • <span id="p-sec">--s</span></div></div>
    <div class="viz"><div class="grid"></div><div class="scan"></div><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle red"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div></div>
    <div class="analysis" id="p-analysis"><div class="analysis-t"><span>ANALYZING CHART</span><span id="p-pct">0%</span></div><div class="prog"><div class="prog-fill" id="p-prog"></div></div><div class="status" id="p-status">Scanning chart...</div></div>
    <div class="result">
      <div class="result-h"><span>ANALYSIS RESULT</span><b id="p-status2">READY</b></div>
      <div class="sig wait" id="p-sig"><div class="arrow wait" id="p-arrow"><span class="dot"></span></div><div class="sigtxt"><small>SIGNAL</small><b id="p-txt">WAIT</b><p id="p-reason">Quantum X Analyzing...</p></div></div>
      <div class="stats">
        <div class="stat"><label>CONFIDENCE</label><b class="green" id="p-conf">--%</b></div>
        <div class="stat"><label>TIMEFRAME</label><b>1M</b></div>
        <div class="stat"><label>SUGGESTED EXPIRY</label><b class="cyan">1-2 MIN</b></div>
        <div class="stat"><label>TREND</label><b id="p-trend">--</b></div>
        <div class="stat"><label>MARKET CONDITION</label><b id="p-cond">--</b></div>
        <div class="stat"><label>SIGNAL STRENGTH</label><b id="p-strength">--</b></div>
      </div>
    </div>
    <div class="key"><div class="key-t"><span class="kd"></span> KEY ANALYSIS</div><div id="p-key"></div></div>
    <div class="controls">
      <div class="row"><button class="btn primary" data-act="again">Analyze Again</button><button class="btn copy" data-act="copy">Copy Signal</button></div>
      <div class="row"><button class="btn" data-act="min">Minimize</button><button class="btn" data-act="close">Close</button></div>
    </div>
    <div class="meta"><b>GHOST AI</b> • Real Backend • 1% Risk</div>
  `;
  shadow.appendChild(panel);

  // State
  let currentPair = 'GBP/USD';
  let currentSignal = null;
  let lockedId = '';
  let currentResult = null;
  let isAnalyzing = false;
  const API = 'https://giogram-backend.onrender.com/api/signal';

  function expand(){ panel.classList.add('open'); fab.style.display='none'; }
  // ===== DRAG - Mini FAB movable + Panel movable - POINTER EVENTS (mobile fix) =====
  let fabDragging=false, fabStartX=0, fabStartY=0, fabOrigLeft=0, fabOrigTop=0, fabMoved=false;
  // Use Pointer Events - works on mobile + desktop, no preventDefault blocking tap
  fab.style.touchAction='none';
  fab.addEventListener('pointerdown', (e)=>{
    fabDragging=true; fabMoved=false;
    fabStartX=e.clientX; fabStartY=e.clientY;
    let r = fab.getBoundingClientRect();
    fabOrigLeft=r.left; fabOrigTop=r.top;
    fab.style.right='auto'; fab.style.bottom='auto';
    fab.style.left=fabOrigLeft+'px'; fab.style.top=fabOrigTop+'px';
    try{ fab.setPointerCapture(e.pointerId); }catch(err){}
  });
  fab.addEventListener('pointermove', (e)=>{
    if(!fabDragging) return;
    let dx=e.clientX-fabStartX, dy=e.clientY-fabStartY;
    if(Math.abs(dx)>5 || Math.abs(dy)>5) fabMoved=true;
    if(!fabMoved) return;
    let nx=fabOrigLeft+dx, ny=fabOrigTop+dy;
    nx=Math.max(6, Math.min(window.innerWidth-60, nx));
    ny=Math.max(6, Math.min(window.innerHeight-60, ny));
    fab.style.left=nx+'px'; fab.style.top=ny+'px';
  });
  fab.addEventListener('pointerup', (e)=>{
    if(!fabDragging) return;
    fabDragging=false;
    try{ fab.releasePointerCapture(e.pointerId); }catch(err){}
    if(!fabMoved){
      // Tap - expand
      expand();
    } else {
      // Drag ended - save position
      try{ localStorage.setItem('ghost_fab_pos', JSON.stringify({left:fab.style.left, top:fab.style.top})); }catch(err){}
    }
  });
  fab.addEventListener('pointercancel', ()=>{ fabDragging=false; });
  // Restore FAB position - only if saved, else use top:32%
  try{
    let saved = localStorage.getItem('ghost_fab_pos');
    if(saved){
      let p = JSON.parse(saved);
      if(p.left && p.top){
        let l = parseInt(p.left), t = parseInt(p.top);
        if(l>=0 && l<window.innerWidth-50 && t>=0 && t<window.innerHeight-50){
          fab.style.left=p.left; fab.style.top=p.top; fab.style.right='auto'; fab.style.bottom='auto';
        }
      }
    }
  }catch(err){}
  // Panel drag via header - Pointer Events
  let panelDragging=false, panelSX=0, panelSY=0, panelIL=0, panelIT=0;
  let headEl = panel.querySelector('.head');
  if(headEl){
    headEl.style.touchAction='none';
    headEl.addEventListener('pointerdown', (e)=>{
      if(e.target.closest('[data-act]')) return;
      panelDragging=true;
      panelSX=e.clientX; panelSY=e.clientY;
      let r = panel.getBoundingClientRect();
      panelIL=r.left; panelIT=r.top;
      panel.style.left=panelIL+'px'; panel.style.right='auto'; panel.style.bottom='auto'; panel.style.top=panelIT+'px';
      try{ headEl.setPointerCapture(e.pointerId); }catch(err){}
    });
    headEl.addEventListener('pointermove', (e)=>{
      if(!panelDragging) return;
      let nx=panelIL+e.clientX-panelSX, ny=panelIT+e.clientY-panelSY;
      nx=Math.max(4, Math.min(window.innerWidth-180, nx));
      ny=Math.max(4, Math.min(window.innerHeight-120, ny));
      panel.style.left=nx+'px'; panel.style.top=ny+'px';
    });
    headEl.addEventListener('pointerup', (e)=>{ panelDragging=false; try{ headEl.releasePointerCapture(e.pointerId); }catch(err){} });
    headEl.addEventListener('pointercancel', ()=>{ panelDragging=false; });
  }

  function minimize(){ panel.classList.remove('open'); fab.style.display='flex'; }
  function closeAll(){ host.remove(); }

  // Click handled in pointerup - no separate click needed (prevents double + pass-through)
  panel.addEventListener('click', e=>{
    let btn = e.target.closest('[data-act]');
    if(!btn) return;
    let act = btn.getAttribute('data-act');
    if(act==='min') minimize();
    if(act==='close') closeAll();
    if(act==='refresh' || act==='again'){ startAnalysis(true); }
    if(act==='copy'){
      try{
        let txt = currentResult ? `GHOST AI Signal: ${currentResult.signal} ${currentResult.pair} | Conf: ${currentResult.confidence}% | TF: 1M | Expiry: 1-2 MIN` : `GHOST AI: ${currentPair} - Analyzing...`;
        navigator.clipboard.writeText(txt).then(()=>{ btn.textContent='Copied!'; setTimeout(()=>btn.textContent='Copy Signal',1200); });
      }catch(err){}
    }
  });

  const STEPS = ["Scanning chart","Detecting candlestick structure","Checking trend","Checking support / resistance","Checking momentum","Calculating confidence","Preparing result"];
  function startAnalysis(fetchAfter){
    if(isAnalyzing) return;
    isAnalyzing=true;
    let an = shadow.getElementById('p-analysis');
    let prog = shadow.getElementById('p-prog');
    let pct = shadow.getElementById('p-pct');
    let st = shadow.getElementById('p-status');
    an.classList.add('on');
    let idx=0;
    let timer=setInterval(()=>{
      if(idx < STEPS.length){
        if(st) st.textContent = STEPS[idx]+'...';
        let p=Math.round(((idx+1)/STEPS.length)*100);
        if(prog) prog.style.width=p+'%';
        if(pct) pct.textContent=p+'%';
        idx++;
      } else {
        clearInterval(timer);
        if(st) st.textContent='Analysis complete';
        setTimeout(()=>{ an.classList.remove('on'); isAnalyzing=false; }, 400);
        if(fetchAfter) fetchSignal();
      }
    }, 150);
  }

  function getMarket(){
    try{
      let els = document.querySelectorAll('[class*="asset"], [class*="pair"], [class*="symbol"]');
      for(let el of els){
        let t=(el.innerText||'').trim();
        if(/^[A-Z]{3}\/[A-Z]{3}/.test(t)){
          let m=t.match(/([A-Z]{3}\/[A-Z]{3})/);
          if(m) return m[1].replace('/','');
        }
      }
      // Fallback: look for Quotex selector
      let sel = document.querySelector('.asset__name, .pair__name, [data-asset]');
      if(sel) return (sel.innerText||'').trim().replace('/','').replace(' ','');
    }catch(e){}
    return currentPair.replace('/','');
  }

  function updateUI(j){
    let pairEl = shadow.getElementById('p-pair');
    if(pairEl){
      let mTxt = (j.market||currentPair).replace(/([A-Z]{3})([A-Z]{3})/,'$1/$2');
      pairEl.innerHTML = mTxt + '<small>GHOST QUANTUM X • AI SCAN</small>';
    }
    let sigEl = shadow.getElementById('p-sig');
    let txtEl = shadow.getElementById('p-txt');
    let reasonEl = shadow.getElementById('p-reason');
    let arrowEl = shadow.getElementById('p-arrow');
    let confEl = shadow.getElementById('p-conf');
    let trendEl = shadow.getElementById('p-trend');
    let condEl = shadow.getElementById('p-cond');
    let strengthEl = shadow.getElementById('p-strength');
    let statusEl = shadow.getElementById('p-status2');
    let keyList = shadow.getElementById('p-key');
    let dir = j.signal || j.direction;
    currentResult = { signal: dir, pair: j.pair||currentPair, confidence: j.confidence||0, trend: j.price_action_type||'--', reason: j.reason||'' };
    if(sigEl && txtEl){
      let conf = j.confidence||0;
      let trendTxt = '--', condTxt='--', strengthTxt='--';
      if(j.filter && j.filter.trend && j.filter.trend!=='NA') trendTxt=j.filter.trend;
      else if(j.price_action_type && j.price_action_type!=='NA') trendTxt = j.price_action_type.includes('Bull') ? 'BULLISH' : j.price_action_type.includes('Bear') ? 'BEARISH' : j.price_action_type;
      else if(dir==='CALL') trendTxt='BULLISH'; else if(dir==='PUT') trendTxt='BEARISH';
      if(j.is_trap) condTxt='TRAP / REVERSAL';
      else if(j.price_action_type && j.price_action_type!=='NA') condTxt=j.price_action_type;
      else condTxt='RANGING';
      if(conf>=85) strengthTxt='VERY HIGH'; else if(conf>=75) strengthTxt='HIGH'; else if(conf>=65) strengthTxt='MEDIUM'; else if(conf>=50) strengthTxt='LOW'; else strengthTxt='WAITING';
      if(dir==="CALL"||dir==="UP"){
        sigEl.className="sig call"; txtEl.textContent="CALL";
        if(arrowEl){ arrowEl.className="arrow up"; arrowEl.innerHTML='<span class="tri"></span>'; }
        if(statusEl){ statusEl.textContent='CALL • ACTIVE'; }
        if(reasonEl) reasonEl.textContent=j.reason||j.price_action_type||"";
        if(trendEl){ trendEl.textContent='BULLISH'; trendEl.className='green'; }
      } else if(dir==="PUT"||dir==="DOWN"){
        sigEl.className="sig put"; txtEl.textContent="PUT";
        if(arrowEl){ arrowEl.className="arrow down"; arrowEl.innerHTML='<span class="tri"></span>'; }
        if(statusEl){ statusEl.textContent='PUT • ACTIVE'; }
        if(reasonEl) reasonEl.textContent=j.reason||j.price_action_type||"";
        if(trendEl){ trendEl.textContent='BEARISH'; trendEl.className='red'; }
      } else {
        sigEl.className="sig wait"; txtEl.textContent="WAIT";
        if(arrowEl){ arrowEl.className="arrow wait"; arrowEl.innerHTML='<span class="dot"></span>'; }
        if(reasonEl) reasonEl.textContent=j.reason||"Analyzing...";
        if(statusEl) statusEl.textContent='WAITING';
        if(trendEl) trendEl.textContent='--';
      }
      if(confEl) confEl.textContent=conf+'%';
      if(condEl) condEl.textContent=condTxt;
      if(strengthEl) strengthEl.textContent=strengthTxt;
      if(keyList){
        let items=[];
        let combined = ((j.reason||'') + ' ' + (j.strategies||[]).join(' ')).toLowerCase();
        if(combined.includes('momentum') || dir==='CALL') items.push('Bullish momentum detected');
        if(combined.includes('bear') || dir==='PUT') items.push('Bearish momentum detected');
        if(combined.includes('bos') || combined.includes('structure') || combined.includes('break')) items.push('Price structure confirmation');
        if(combined.includes('support') || combined.includes('resistance') || combined.includes('order block') || combined.includes('fvg') || combined.includes('liquidity')) items.push('Support / Resistance condition');
        if(combined.includes('candle') || combined.includes('wick') || combined.includes('rejection') || combined.includes('engulf')) items.push('Candle confirmation');
        if(items.length===0){ if(conf>=65) items.push('Structure + momentum aligned ('+conf+'%)'); else items.push('Collecting more candle data...'); }
        let seen={}; items=items.filter(t=>{ if(seen[t]) return false; seen[t]=true; return true; });
        keyList.innerHTML = items.map(t=>`<div class="key-item"><div class="tick"></div><div>${t}</div></div>`).join('');
      }
    }
  }

  async function fetchSignal(){
    try{
      currentPair = getMarket();
      let url = API + '?pair=' + encodeURIComponent(currentPair) + '&t=' + Date.now();
      let res = await fetch(url);
      let j = await res.json();
      if(j && j.signal){
        currentSignal = j;
        updateUI(j);
        // update countdown
        let secEl = shadow.getElementById('p-sec');
        if(secEl && j.expiry_timestamp){
          let rem = Math.max(0, Math.ceil((j.expiry_timestamp - Date.now())/1000));
          secEl.textContent = rem + 's';
        }
      }
    }catch(e){ console.log('GHOST fetch error', e); }
  }

  // Countdown
  setInterval(()=>{
    let secEl = shadow.getElementById('p-sec');
    if(secEl){
      if(currentSignal && currentSignal.expiry_timestamp){
        let rem = Math.max(0, Math.ceil((currentSignal.expiry_timestamp - Date.now())/1000));
        secEl.textContent = rem + 's';
        if(rem<=0) currentSignal=null;
      } else {
        let sec=60-new Date().getSeconds(); if(sec===60) sec=0; secEl.textContent=sec+'s';
      }
    }
  }, 500);

  setInterval(fetchSignal, 3000);
  fetchSignal();
  // Start minimized - FAB only
  console.log('GHOST AI Shadow DOM loaded - FAB visible');
})();
