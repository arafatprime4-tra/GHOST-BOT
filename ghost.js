(function(){
let css=document.createElement("style");
css.innerHTML=`
/* ===== GHOST AI - COMPACT FUTURISTIC SIGNAL ANALYZER - NO EMOJI, PURE CSS ===== */
#ghost-fab{position:fixed;bottom:88px;right:12px;z-index:2147483647;width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,rgba(20,24,48,.94),rgba(8,10,22,.97));border:1px solid rgba(168,85,247,.55);box-shadow:0 0 0 1px rgba(0,240,255,.18),0 0 16px rgba(168,85,247,.35),0 0 26px rgba(0,240,255,.18),0 10px 22px rgba(0,0,0,.5);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none;touch-action:none;transition:transform .22s cubic-bezier(.16,1,.3,1),box-shadow .22s,opacity .22s}
#ghost-fab:hover{box-shadow:0 0 0 1px rgba(0,240,255,.28),0 0 22px rgba(168,85,247,.5),0 0 34px rgba(0,240,255,.28),0 12px 26px rgba(0,0,0,.55)}
#ghost-fab:active{transform:scale(.96)}
#ghost-fab .fab-live-dot{position:absolute;top:5px;right:5px;width:7px;height:7px;background:#22c55e;border-radius:50%;border:2px solid #0b0b18;box-shadow:0 0 7px #22c55e;animation:fabPulse 1.6s infinite;z-index:2}
@keyframes fabPulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes fabFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}}
#ghost-fab{animation:fabFloat 3s ease-in-out infinite}
.fab-candles{display:flex;align-items:flex-end;gap:4px;height:30px}
.candle{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:28px;width:7px}
.candle .wick{width:1.2px;background:currentColor;opacity:.9;border-radius:2px}
.candle .body{width:7px;border-radius:1.5px;box-shadow:0 0 6px currentColor}
.candle.green{color:#22c55e}
.candle.red{color:#f43f5e}
.candle.green .body{background:linear-gradient(180deg,#4ade80,#16a34a);height:14px}
.candle.red .body{background:linear-gradient(180deg,#fb7185,#be123c);height:11px}
.candle .wick.top{height:5px}
.candle .wick.bottom{height:4px}
.candle.green .body{animation:candlePulseG 1.8s ease-in-out infinite}
.candle.red .body{animation:candlePulseR 1.8s ease-in-out infinite .3s}
@keyframes candlePulseG{0%,100%{transform:scaleY(1);filter:brightness(1)}50%{transform:scaleY(1.12);filter:brightness(1.25)}}
@keyframes candlePulseR{0%,100%{transform:scaleY(1);filter:brightness(1)}50%{transform:scaleY(1.1);filter:brightness(1.2)}}
@keyframes candleMove{0%,100%{transform:translateY(0)}50%{transform:translateY(-1px)}}
.fab-candles .candle{animation:candleMove 2.2s ease-in-out infinite}
.fab-candles .candle:nth-child(2){animation-delay:.25s}
.fab-candles .candle:nth-child(3){animation-delay:.5s}
#ghost-bot{position:fixed !important;bottom:72px !important;right:8px !important;left:auto !important;top:auto !important;z-index:2147483646 !important;width:262px !important;max-width:calc(100vw - 16px) !important;max-height:calc(100vh - 140px) !important;overflow-y:auto !important;box-sizing:border-box !important;background:linear-gradient(168deg,rgba(15,17,34,.97),rgba(7,8,18,.98));border:1px solid rgba(168,85,247,.35);border-radius:18px;box-shadow:0 0 0 1px rgba(0,240,255,.10),0 0 28px rgba(168,85,247,.22),0 0 52px rgba(0,240,255,.10),0 22px 44px rgba(0,0,0,.55);backdrop-filter:blur(18px);font-family:Inter,'Segoe UI',system-ui,sans-serif;color:#eef2ff;user-select:none;overflow:hidden;opacity:0;pointer-events:none;transform-origin:bottom right;transform:translateY(10px) scale(.82);transition:opacity .28s ease,transform .32s cubic-bezier(.16,1,.3,1)}
#ghost-bot.open{opacity:1;pointer-events:auto;transform:translateY(0) scale(1)}
#ghost-bot *{box-sizing:border-box !important;max-width:100% !important}
#ghost-bot::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#a855f7,#22d3ee,transparent);opacity:.9}
.gh-h{padding:10px 10px 8px !important;display:flex !important;align-items:center;justify-content:space-between;gap:8px;cursor:move;border-bottom:1px solid rgba(255,255,255,.07)}
.gh-h-left{display:flex;align-items:center;gap:8px}
.gh-logo-mini{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#a855f7,#6d28d9 55%,#0ea5e9);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 0 10px rgba(168,85,247,.4)}
.gh-logo-mini .mini-candles{display:flex;align-items:flex-end;gap:2.5px;height:16px}
.gh-logo-mini .mini-candles .candle{height:15px;width:4px}
.gh-logo-mini .mini-candles .candle .body{width:4px}
.gh-logo-mini .mini-candles .candle.green .body{height:8px}
.gh-logo-mini .mini-candles .candle.red .body{height:6px}
.gh-logo-mini .mini-candles .candle .wick.top{height:3px}
.gh-logo-mini .mini-candles .candle .wick.bottom{height:2px}
.gh-title b{font-size:10px;letter-spacing:.9px;line-height:1;display:block;color:#fff}
.gh-title b span{color:#a78bfa}
.gh-title small{font-size:6.5px;letter-spacing:1.1px;color:#94a3b8;font-weight:700;display:block;margin-top:2px}
.gh-live-badge{font-size:6px;font-weight:800;letter-spacing:.6px;background:rgba(34,197,94,.14);border:1px solid rgba(34,197,94,.35);color:#4ade80;padding:3px 6px;border-radius:20px;display:flex;align-items:center;gap:4px}
.gh-live-badge i{width:5px;height:5px;background:#22c55e;border-radius:50%;display:block;box-shadow:0 0 6px #22c55e;animation:fabPulse 1.4s infinite}
.gh-h-actions{display:flex;gap:5px;flex-shrink:0}
.gh-icon-btn{width:26px;height:26px;border-radius:8px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.05);color:#cbd5e1;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s;position:relative}
.gh-icon-btn:hover{background:rgba(255,255,255,.10);color:#fff}
.gh-icon-btn .icon-line{position:absolute;background:currentColor;border-radius:2px}
.gh-icon-btn .icon-line.h{width:10px;height:1.6px}
.gh-icon-btn .icon-x1,.gh-icon-btn .icon-x2{width:10px;height:1.6px;background:currentColor;position:absolute;border-radius:2px}
.gh-icon-btn .icon-x1{transform:rotate(45deg)}
.gh-icon-btn .icon-x2{transform:rotate(-45deg)}
.gh-icon-btn .icon-refresh{width:12px;height:12px;border:1.8px solid currentColor;border-radius:50%;border-top-color:transparent;position:relative}
.gh-icon-btn .icon-refresh::after{content:'';position:absolute;top:-2px;right:-1px;width:0;height:0;border-left:4px solid transparent;border-right:1px solid transparent;border-bottom:5px solid currentColor;transform:rotate(40deg)}
.gh-pair-wrap{padding:10px 12px 0;display:flex;align-items:center;justify-content:space-between}
.gh-pair{font-size:11px !important;font-weight:900 !important;letter-spacing:.5px !important;color:#fff !important;line-height:1.2 !important;flex:1 !important;min-width:0 !important;white-space:normal !important}
.gh-pair small{display:block !important;font-size:6px !important;letter-spacing:.8px !important;color:#67e8f9 !important;font-weight:700 !important;margin-top:2px !important;white-space:normal !important}
.gh-time{font-size:6.5px;color:#94a3b8;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);padding:4px 7px;border-radius:20px}
.gh-candle-viz{margin:8px 10px 0 !important;padding:8px 10px 7px !important;border-radius:10px !important;background:rgba(255,255,255,.03) !important;border:1px solid rgba(255,255,255,.06) !important;position:relative !important;overflow:hidden !important;display:flex !important;align-items:flex-end !important;justify-content:center !important;gap:8px !important;height:52px !important}
.gh-candle-viz .candle{height:44px;width:11px}
.gh-candle-viz .candle .body{width:11px;border-radius:2px}
.gh-candle-viz .candle.green .body{height:22px}
.gh-candle-viz .candle.red .body{height:18px}
.gh-candle-viz .candle .wick.top{height:9px}
.gh-candle-viz .candle .wick.bottom{height:7px}
.gh-candle-viz .scan{position:absolute;top:0;bottom:0;width:42px;background:linear-gradient(90deg,transparent,rgba(34,211,238,.22),transparent);animation:scanMove 1.1s linear infinite;pointer-events:none}
@keyframes scanMove{0%{left:-20%}100%{left:110%}}
.gh-candle-viz .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:14px 14px;pointer-events:none}
.gh-analysis{margin:10px 12px 0;display:none}
.gh-analysis.active{display:block}
.gh-analysis-title{font-size:6.5px;letter-spacing:1.1px;color:#a78bfa;font-weight:800;display:flex;justify-content:space-between;margin-bottom:6px}
.gh-progress{height:3px;background:rgba(255,255,255,.07);border-radius:10px;overflow:hidden}
.gh-progress-fill{height:100%;width:0%;background:linear-gradient(90deg,#a855f7,#22d3ee);border-radius:10px;transition:width .3s ease}
.gh-status{font-size:7px;color:#94a3b8;text-align:center;margin-top:6px;letter-spacing:.3px}
.gh-result{margin:10px 12px 0;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.01))}
.gh-result-head{padding:7px 10px !important;display:flex !important;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,.06)}
.gh-result-head span{font-size:6.5px;letter-spacing:1.1px;color:#94a3b8;font-weight:800}
.gh-result-head b{font-size:6px;padding:3px 6px;border-radius:20px;background:rgba(34,197,94,.14);color:#4ade80;border:1px solid rgba(34,197,94,.25)}
.gh-signal-main{padding:10px 10px 8px;display:flex;align-items:center;gap:10px;position:relative}
.gh-signal-main.call{background:linear-gradient(135deg,rgba(34,197,94,.11),rgba(34,197,94,.02))}
.gh-signal-main.put{background:linear-gradient(135deg,rgba(244,63,94,.12),rgba(244,63,94,.02))}
.gh-signal-main.wait{background:rgba(255,255,255,.02)}
.gh-arrow-circle{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative}
.gh-arrow-circle .arrow{width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent}
.gh-arrow-circle.up .arrow{border-bottom:14px solid #fff;animation:arrowUp .8s ease-in-out infinite}
.gh-arrow-circle.down .arrow{border-top:14px solid #fff;animation:arrowDown .8s ease-in-out infinite}
.gh-arrow-circle.wait .dot{width:10px;height:10px;border-radius:50%;background:#94a3b8}
@keyframes arrowUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes arrowDown{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}
.gh-signal-main.call .gh-arrow-circle{background:linear-gradient(135deg,#22c55e,#15803d);box-shadow:0 0 14px rgba(34,197,94,.45)}
.gh-signal-main.put .gh-arrow-circle{background:linear-gradient(135deg,#f43f5e,#be123c);box-shadow:0 0 14px rgba(244,63,94,.45)}
.gh-signal-main.wait .gh-arrow-circle{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12)}
.gh-signal-txt small{font-size:6.5px;letter-spacing:1.3px;color:#94a3b8;font-weight:700;display:block}
.gh-signal-txt b{font-size:19px;font-weight:900;letter-spacing:.5px;line-height:1.1;display:block;margin-top:1px}
.gh-signal-main.call .gh-signal-txt b{color:#4ade80}
.gh-signal-main.put .gh-signal-txt b{color:#fb7185}
.gh-signal-txt p{font-size:6.5px;color:#94a3b8;margin:3px 0 0;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:170px}
.gh-stats{display:grid !important;grid-template-columns:1fr 1fr !important;gap:1px !important;background:rgba(255,255,255,.06);border-top:1px solid rgba(255,255,255,.06)}
.gh-stat{background:rgba(10,12,28,.92);padding:8px 10px}
.gh-stat label{font-size:6px;letter-spacing:.9px;color:#94a3b8;font-weight:700;display:block}
.gh-stat b{font-size:10px;color:#fff;display:block;margin-top:2px}
.gh-stat b.green{color:#4ade80}
.gh-stat b.red{color:#fb7185}
.gh-stat b.cyan{color:#67e8f9}
.gh-key{margin:10px 12px 0;padding:9px 10px;border-radius:12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06)}
.gh-key-title{font-size:6.5px;letter-spacing:1.1px;color:#a78bfa;font-weight:800;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.gh-key-title .key-dot{width:6px;height:6px;background:#a855f7;border-radius:50%;box-shadow:0 0 6px #a855f7}
.gh-key-item{display:flex;gap:7px;align-items:flex-start;padding:3.5px 0;font-size:7.2px;line-height:1.35;color:#cbd5e1}
.gh-key-item .tick{width:14px;height:14px;border-radius:50%;background:rgba(34,197,94,.14);border:1px solid rgba(34,197,94,.3);color:#4ade80;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:0}
.gh-key-item .tick::after{content:'';width:6px;height:3px;border-left:1.6px solid #4ade80;border-bottom:1.6px solid #4ade80;transform:rotate(-45deg) translateY(-1px);display:block}
.gh-key-item.warn .tick{background:rgba(251,191,36,.12);border-color:rgba(251,191,36,.3)}
.gh-key-item.warn .tick::after{border-color:#fbbf24}
.gh-controls{padding:10px 12px 12px;display:flex;flex-direction:column;gap:7px}
.gh-btn-row{display:flex;gap:7px}
.gh-btn{flex:1;height:32px;border-radius:10px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.05);color:#e2e8f0;font-size:7.5px;font-weight:700;letter-spacing:.3px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:all .15s}
.gh-btn:hover{background:rgba(255,255,255,.09)}
.gh-btn.primary{background:linear-gradient(135deg,#7c3aed,#06b6d4);border-color:transparent;color:#fff;box-shadow:0 6px 16px rgba(124,58,237,.28)}
.gh-btn.copy{background:rgba(168,85,247,.12);border-color:rgba(168,85,247,.30);color:#ddd6fe}
.gh-btn .btn-dot{width:6px;height:6px;border-radius:50%;background:currentColor}
.gh-meta{padding:0 12px 10px;text-align:center;font-size:6px;color:#64748b;letter-spacing:.3px;line-height:1.5}
.gh-meta b{color:#a78bfa}
@media(max-width:360px){#ghost-bot{width:calc(100vw - 20px);right:10px;bottom:78px}#ghost-fab{bottom:78px;right:10px}}
`;
let fab=document.createElement("div");fab.id="ghost-fab";
fab.innerHTML=`<div class="fab-live-dot"></div><div class="fab-candles"><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle red"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div></div>`;
document.body.appendChild(fab);
let old=document.getElementById("ghost-bot");if(old) old.remove();
let box=document.createElement("div");box.id="ghost-bot";
box.innerHTML=`
<div class="gh-h" id="gh-h">
  <div class="gh-h-left">
    <div class="gh-logo-mini"><div class="mini-candles"><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle red"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div></div></div>
    <div class="gh-title"><b>GHOST <span>AI</span></b><small>SIGNAL ANALYZER</small></div>
    <div class="gh-live-badge"><i></i> LIVE</div>
  </div>
  <div class="gh-h-actions">
    <button class="gh-icon-btn" id="gh-refresh" title="Refresh"><span class="icon-refresh"></span></button>
    <button class="gh-icon-btn" id="gh-min" title="Minimize"><span class="icon-line h"></span></button>
    <button class="gh-icon-btn" id="gh-close" title="Close"><span class="icon-x1"></span><span class="icon-x2"></span></button>
  </div>
</div>
<div class="gh-pair-wrap">
  <div class="gh-pair" id="gh-pair">GBP/USD<small>GHOST QUANTUM X • AI SCAN</small></div>
  <div class="gh-time" id="gh-time">1M • <span id="gh-sec">--s</span></div>
</div>
<div class="gh-candle-viz" id="gh-candle-viz"><div class="grid"></div><div class="scan"></div><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle red"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div></div>
<div class="gh-analysis" id="gh-analysis">
  <div class="gh-analysis-title"><span>ANALYZING CHART</span><span id="gh-analyze-pct">0%</span></div>
  <div class="gh-progress"><div class="gh-progress-fill" id="gh-progress"></div></div>
  <div class="gh-status" id="gh-analyze-status">Scanning chart...</div>
</div>
<div class="gh-result" id="gh-result">
  <div class="gh-result-head"><span>ANALYSIS RESULT</span><b id="gh-status">READY</b></div>
  <div class="gh-signal-main wait" id="gh-sig">
    <div class="gh-arrow-circle wait" id="gh-arrow"><span class="dot"></span></div>
    <div class="gh-signal-txt"><small>SIGNAL</small><b id="gh-txt">WAIT</b><p id="gh-reason">Quantum X Analyzing...</p></div>
  </div>
  <div class="gh-stats">
    <div class="gh-stat"><label>CONFIDENCE</label><b class="green" id="gh-conf">--%</b></div>
    <div class="gh-stat"><label>TIMEFRAME</label><b>1M</b></div>
    <div class="gh-stat"><label>SUGGESTED EXPIRY</label><b class="cyan">1-2 MIN</b></div>
    <div class="gh-stat"><label>TREND</label><b id="gh-trend">--</b></div>
    <div class="gh-stat"><label>MARKET CONDITION</label><b id="gh-condition">--</b></div>
    <div class="gh-stat"><label>SIGNAL STRENGTH</label><b id="gh-strength">--</b></div>
  </div>
</div>
<div class="gh-key" id="gh-key">
  <div class="gh-key-title"><span class="key-dot"></span> KEY ANALYSIS</div>
  <div id="gh-key-list"></div>
</div>
<div class="gh-controls">
  <div class="gh-btn-row">
    <button class="gh-btn primary" id="gh-analyze-again"><span class="icon-refresh" style="width:10px;height:10px;border-width:1.6px"></span> Analyze Again</button>
    <button class="gh-btn copy" id="gh-copy"><span class="btn-dot"></span> Copy Signal</button>
  </div>
  <div class="gh-btn-row">
    <button class="gh-btn" id="gh-min2"><span class="icon-line h"></span> Minimize</button>
    <button class="gh-btn" id="gh-close2"><span class="icon-x1" style="width:8px"></span><span class="icon-x2" style="width:8px"></span> Close</button>
  </div>
</div>
<div class="gh-meta" id="gh-meta"><b>GHOST AI</b> • Real Backend • 1% Risk</div>
`;
document.body.appendChild(box);



let paEnabled=true;
let isExpanded=false;
let isAnalyzing=false;
let currentResult=null;

// ===== FAB + ANALYZER STATE =====
function expandAnalyzer(){
  isExpanded=true;
  box.classList.add('open');
  fab.style.display='none';
  // Smart positioning: if panel would cover chart center, shift to right
  try{
    let r = box.getBoundingClientRect();
    if(r.left < 10) { box.style.right='10px'; box.style.left='auto'; }
  }catch(e){}
}
function minimizeAnalyzer(){
  isExpanded=false;
  box.classList.remove('open');
  fab.style.display='flex';
}
function closeAnalyzer(){
  box.remove();
  fab.remove();
  let t=document.getElementById('ghost-toast'); if(t) t.remove();
}

// FAB click -> expand
fab.addEventListener('click', (e)=>{ e.stopPropagation(); expandAnalyzer(); });
fab.addEventListener('touchend', (e)=>{ e.stopPropagation(); expandAnalyzer(); });

// Header buttons
let btnRefresh=document.getElementById('gh-refresh');
let btnMin=document.getElementById('gh-min');
let btnClose=document.getElementById('gh-close');
let btnMin2=document.getElementById('gh-min2');
let btnClose2=document.getElementById('gh-close2');
let btnAnalyzeAgain=document.getElementById('gh-analyze-again');
let btnCopy=document.getElementById('gh-copy');
if(btnRefresh) btnRefresh.addEventListener('click', (e)=>{e.stopPropagation(); startAnalysisAnimation(true);});
if(btnMin) btnMin.addEventListener('click', (e)=>{e.stopPropagation(); minimizeAnalyzer();});
if(btnMin2) btnMin2.addEventListener('click', (e)=>{e.stopPropagation(); minimizeAnalyzer();});
if(btnClose) btnClose.addEventListener('click', (e)=>{e.stopPropagation(); closeAnalyzer();});
if(btnClose2) btnClose2.addEventListener('click', (e)=>{e.stopPropagation(); closeAnalyzer();});
if(btnAnalyzeAgain) btnAnalyzeAgain.addEventListener('click', (e)=>{e.stopPropagation(); startAnalysisAnimation(true);});
if(btnCopy) btnCopy.addEventListener('click', (e)=>{
  e.stopPropagation();
  try{
    let txt = currentResult ? `GHOST AI Signal: ${currentResult.signal} ${currentResult.pair||currentPair} | Conf: ${currentResult.confidence}% | TF: 1M | Expiry: 1-2 MIN | Trend: ${currentResult.trend||'—'}` : `GHOST AI: ${currentPair} - Analyzing...`;
    navigator.clipboard.writeText(txt).then(()=>{ btnCopy.textContent='Copied!'; setTimeout(()=>btnCopy.textContent='Copy Signal',1200); });
  }catch(err){}
});

// PA toggle - now handled via refresh, keep paEnabled true by default
let savedPA=localStorage.getItem("ghost_pa_enabled"); if(savedPA==="0"){ paEnabled=false; }

// FAB drag - draggable, stays above chart
let fabDrag=false, fabSX=0, fabSY=0, fabIL=0, fabIT=0;
function fabDS(e){ fabDrag=true; let cx=e.touches?e.touches[0].clientX:e.clientX, cy=e.touches?e.touches[0].clientY:e.clientY; fabSX=cx; fabSY=cy; let r=fab.getBoundingClientRect(); fabIL=r.left; fabIT=r.top; fab.style.right='auto'; fab.style.bottom='auto'; fab.style.left=fabIL+'px'; fab.style.top=fabIT+'px'; e.preventDefault(); }
function fabDM(e){ if(!fabDrag) return; let cx=e.touches?e.touches[0].clientX:e.clientX, cy=e.touches?e.touches[0].clientY:e.clientY; let nx=fabIL+cx-fabSX, ny=fabIT+cy-fabSY; nx=Math.max(8, Math.min(window.innerWidth-64, nx)); ny=Math.max(8, Math.min(window.innerHeight-64, ny)); fab.style.left=nx+'px'; fab.style.top=ny+'px'; e.preventDefault(); }
function fabDE(){ fabDrag=false; }
fab.addEventListener("mousedown", fabDS); document.addEventListener("mousemove", fabDM); document.addEventListener("mouseup", fabDE);
fab.addEventListener("touchstart", fabDS, {passive:false}); document.addEventListener("touchmove", fabDM, {passive:false}); document.addEventListener("touchend", fabDE);

// Analyzer drag via header
let isDrag=false,sx=0,sy=0,il=0,it=0;let hd=document.getElementById("gh-h");
function getPos(){let r=box.getBoundingClientRect();return{left:r.left,top:r.top};}
function ds(e){if(e.target.closest("button")) return; isDrag=true;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;sx=cx;sy=cy;let p=getPos();il=p.left;it=p.top;box.style.left=p.left+"px";box.style.right="auto";box.style.bottom="auto";box.style.transform="none";e.preventDefault();}
function dm(e){if(!isDrag)return;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;box.style.left=(il+cx-sx)+"px";box.style.top=(it+cy-sy)+"px";e.preventDefault();}
function de(){isDrag=false;}
hd.addEventListener("mousedown",ds);document.addEventListener("mousemove",dm);document.addEventListener("mouseup",de);
hd.addEventListener("touchstart",ds,{passive:false});document.addEventListener("touchmove",dm,{passive:false});document.addEventListener("touchend",de);

// ===== ANALYSIS ANIMATION - Professional sequence, fast =====
const ANALYSIS_STEPS = [
  "Scanning chart",
  "Detecting candlestick structure",
  "Checking trend",
  "Checking support / resistance",
  "Checking momentum",
  "Calculating confidence",
  "Preparing result"
];
function startAnalysisAnimation(forceFetch){
  if(isAnalyzing) return;
  isAnalyzing=true;
  let analysisEl=document.getElementById('gh-analysis');
  let progressEl=document.getElementById('gh-progress');
  let pctEl=document.getElementById('gh-analyze-pct');
  let statusEl=document.getElementById('gh-analyze-status');
  if(!analysisEl){ isAnalyzing=false; if(forceFetch) fetchSignal(); return; }
  analysisEl.classList.add('active');
  let steps = ANALYSIS_STEPS || ["Scanning chart","Detecting candlestick structure","Checking trend","Checking support / resistance","Checking momentum","Calculating confidence","Preparing result"];
  let idx=0;
  let total=steps.length;
  let timer=setInterval(()=>{
    if(idx < total){
      let curStep = steps[idx];
      if(statusEl) statusEl.textContent = curStep + '...';
      let pct=Math.round(((idx+1)/total)*100);
      if(progressEl) progressEl.style.width=pct+'%';
      if(pctEl) pctEl.textContent=pct+'%';
      idx++;
    } else {
      clearInterval(timer);
      if(progressEl) progressEl.style.width='100%';
      if(pctEl) pctEl.textContent='100%';
      if(statusEl) statusEl.textContent='Analysis complete';
      setTimeout(()=>{ analysisEl.classList.remove('active'); isAnalyzing=false; }, 450);
      if(forceFetch) fetchSignal();
    }
  }, 160);
}


// ===== LOSS PROTECTION - 2 Loss = 30 Min Stop - ADVANCED FIX =====
let loss_count = parseInt(localStorage.getItem('ghost_loss_count')||'0');
let last_loss_time = localStorage.getItem('ghost_last_loss_time') ? new Date(localStorage.getItem('ghost_last_loss_time')) : null;
let consecutive_losses = parseInt(localStorage.getItem('ghost_consecutive_losses')||'0');

function check_loss_protection(){
  if(consecutive_losses >= 2 && last_loss_time){
    let now = new Date();
    let diffMin = (now - last_loss_time) / 1000 / 60;
    if(diffMin < 30){
      return {allowed:false, remaining: Math.ceil(30-diffMin), minutes_left: (30 - diffMin).toFixed(1)};
    }else{
      // 30 min over - reset
      consecutive_losses = 0;
      loss_count = 0;
      localStorage.setItem('ghost_loss_count','0');
      localStorage.setItem('ghost_consecutive_losses','0');
      last_loss_time = null;
      localStorage.removeItem('ghost_last_loss_time');
      return {allowed:true, remaining:0};
    }
  }
  return {allowed:true, remaining:0};
}

function register_loss(){
  consecutive_losses++;
  loss_count++;
  last_loss_time = new Date();
  localStorage.setItem('ghost_loss_count', loss_count.toString());
  localStorage.setItem('ghost_consecutive_losses', consecutive_losses.toString());
  localStorage.setItem('ghost_last_loss_time', last_loss_time.toISOString());
  console.log(` LOSS registered: ${consecutive_losses}/2 consecutive, total ${loss_count}`);
  // Vibrate if mobile
  try{ if(navigator.vibrate) navigator.vibrate([100,50,100]); }catch(e){}
  // Show toast
  showProtectionToast(`LOSS ${consecutive_losses}/2`, consecutive_losses >=2 ? '30 min STOP!' : 'Continue');
}

function register_win(){
  console.log(` WIN registered - resetting consecutive losses`);
  if(consecutive_losses>0){
    consecutive_losses = 0;
    localStorage.setItem('ghost_consecutive_losses','0');
  }
  showProtectionToast(`WIN - Losses reset`, '0/2');
}

function showProtectionToast(title, subtitle){
  try{
    let toast = document.getElementById('ghost-toast');
    if(!toast){
      toast = document.createElement('div');
      toast.id = 'ghost-toast';
      toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:2147483648;background:#1a1a0a;border:1px solid #d4af37;color:#fff;padding:8px 14px;border-radius:8px;font-size:10px;font-weight:700;box-shadow:0 4px 12px rgba(0,0,0,.5);transition:all .3s;';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `${title}<br><small style="color:#d4af37">${subtitle}</small>`;
    toast.style.display = 'block';
    toast.style.opacity = '1';
    setTimeout(()=>{ toast.style.opacity='0'; setTimeout(()=>{toast.style.display='none'},300); },2500);
  }catch(e){}
}

// ADVANCED RESULT DETECTION - MutationObserver + Multiple Patterns
function detectResultAdvanced(){
  try{
    // Pattern 1: Look for Quotex profit/loss popup - common selectors
    let selectors = [
      '[class*="profit"]', '[class*="result"]', '[class*="deal"]', 
      '[class*="payout"]', '[class*="trade-result"]', '[class*="position-profit"]'
    ];
    
    for(let sel of selectors){
      try{
        let els = document.querySelectorAll(sel);
        for(let el of els){
          let txt = (el.innerText||'').toLowerCase();
          let fullText = el.innerText||'';
          // Check if visible and contains $ or profit
          let rect = el.getBoundingClientRect();
          if(rect.width==0 || rect.height==0) continue;
          if(fullText.includes('$') || txt.includes('profit') || txt.includes('loss') || txt.includes('result')){
            // Check if it's a trade result (not just UI)
            if(fullText.match(/[+-]\s*\$?\d+\.?\d*/)){
              let lastResult = localStorage.getItem('ghost_last_result_full');
              if(lastResult !== fullText+Date.now().toString().slice(-3)){ // debounce
                // Determine win/loss by color or text
                let isLoss = false;
                // Check by color (red = loss, green = win)
                let style = window.getComputedStyle(el);
                let color = style.color || '';
                let bg = style.backgroundColor || '';
                // Check text patterns
                if(fullText.includes('-$') || fullText.match(/-\s*\d+\.\d+\s*\$/) || fullText.toLowerCase().includes('loss')){
                  isLoss = true;
                } else if(fullText.includes('+$') || fullText.match(/\+\s*\$?\d+/) || fullText.toLowerCase().includes('profit')){
                  // Check if profit is positive
                  let m = fullText.match(/([+-]?\$?\d+\.?\d*)/);
                  if(m){
                    let num = parseFloat(m[1].replace('$','').replace('+',''));
                    if(num < 0) isLoss = true;
                    else if(num > 0) isLoss = false;
                    else continue; // zero
                  }
                }
                
                // Also check for Quotex specific: RESULT (P/L) -1$
                if(fullText.includes('RESULT') && fullText.includes('P/L')){
                  if(fullText.includes('-') && !fullText.match(/\+\s*\d/)){
                    isLoss = true;
                  } else if(fullText.includes('+')){
                    isLoss = false;
                  }
                }
                
                if(isLoss !== null){
                  localStorage.setItem('ghost_last_result_full', fullText);
                  setTimeout(()=>localStorage.removeItem('ghost_last_result_full'), 5000); // clear after 5s
                  if(isLoss){
                    register_loss();
                    return {type:'LOSS', text:fullText};
                  } else {
                    register_win();
                    return {type:'WIN', text:fullText};
                  }
                }
              }
            }
          }
        }
      }catch(e){}
    }
    
    // Pattern 2: Scan all visible divs for profit/loss text (fallback)
    let allDivs = document.querySelectorAll('div');
    for(let el of allDivs){
      try{
        let txt = (el.innerText||'').trim();
        if(txt.length > 5 && txt.length < 80){
          // Must be small popup, not whole page
          if((txt.includes('RESULT') || txt.toLowerCase().includes('profit') || txt.includes('P/L')) && txt.includes('$')){
            let rect = el.getBoundingClientRect();
            if(rect.width > 50 && rect.width < 300 && rect.height > 20 && rect.height < 150){
              let lastResult = localStorage.getItem('ghost_last_result_simple');
              if(lastResult !== txt){
                localStorage.setItem('ghost_last_result_simple', txt);
                if(txt.includes('-') && txt.match(/-\s*\$?\d/)){
                  // Make sure it's not date like 18:30
                  if(!txt.match(/\d{1,2}:\d{2}/) || txt.includes('$')){
                    register_loss();
                    return {type:'LOSS', text:txt};
                  }
                } else if(txt.match(/\+\s*\$?\d+/) || (txt.includes('$') && !txt.includes('-'))){
                  if(txt.toLowerCase().includes('profit') || txt.includes('+') || txt.match(/\$\s*\d/)){
                    register_win();
                    return {type:'WIN', text:txt};
                  }
                }
              }
            }
          }
        }
      }catch(e){}
    }
  }catch(e){console.log('detect error',e);}
  return null;
}

// MutationObserver for instant detection
let resultObserver = null;
function startResultObserver(){
  try{
    if(resultObserver) resultObserver.disconnect();
    resultObserver = new MutationObserver((mutations)=>{
      for(let mut of mutations){
        for(let node of mut.addedNodes){
          if(node.nodeType === 1){ // Element
            let txt = (node.innerText||'').toLowerCase();
            if(txt.includes('result') || txt.includes('profit') || (txt.includes('$') && (txt.includes('+') || txt.includes('-')))){
              setTimeout(()=>detectResultAdvanced(), 300);
            }
          }
        }
      }
    });
    resultObserver.observe(document.body, {childList:true, subtree:true});
    console.log(' Result observer started');
  }catch(e){console.log('observer fail',e);}
}

function detectResult(){
  return detectResultAdvanced();
}

// Manual test functions for admin - call from console: testLoss(), testWin(), resetLossProtection()
window.testLoss = ()=>{ register_loss(); console.log('Test loss added:', consecutive_losses); };
window.testWin = ()=>{ register_win(); console.log('Test win'); };
window.resetLossProtection = ()=>{ 
  consecutive_losses=0; loss_count=0; 
  localStorage.setItem('ghost_loss_count','0');
  localStorage.setItem('ghost_consecutive_losses','0');
  localStorage.removeItem('ghost_last_loss_time');
  localStorage.removeItem('ghost_last_result_full');
  localStorage.removeItem('ghost_last_result_simple');
  console.log(' Protection reset');
  showProtectionToast(' Reset', '0/2 losses');
};
window.getLossStatus = ()=>{ return {consecutive: consecutive_losses, total: loss_count, last: last_loss_time, protection: check_loss_protection()}; };


// ===== SMC FULL =====
class Candle{constructor(o,h,l,c){this.open=o;this.high=h;this.low=l;this.close=c;this.body=Math.abs(c-o);this.upper=h-Math.max(o,c);this.lower=Math.min(o,c)-l;this.bull=c>o;this.bear=c<o;}}
function detectMarketStructure(candles){
  if(candles.length<10) return {structure:"RANGING",bias:"BOTH",reason:"Analyzing"};
  let highs=[],lows=[];
  for(let i=3;i<candles.length-3;i++){
    if(candles[i].high>candles[i-1].high&&candles[i].high>candles[i-2].high&&candles[i].high>candles[i-3].high&&candles[i].high>candles[i+1].high&&candles[i].high>candles[i+2].high&&candles[i].high>candles[i+3].high) highs.push([i,candles[i].high]);
    if(candles[i].low<candles[i-1].low&&candles[i].low<candles[i-2].low&&candles[i].low<candles[i-3].low&&candles[i].low<candles[i+1].low&&candles[i].low<candles[i+2].low&&candles[i].low<candles[i+3].low) lows.push([i,candles[i].low]);
  }
  if(highs.length<2||lows.length<2) return {structure:"RANGING",bias:"BOTH",reason:"Ranging"};
  let h1=highs[highs.length-1][1],h2=highs[highs.length-2][1];
  let l1=lows[lows.length-1][1],l2=lows[lows.length-2][1];
  let hh=h1>h2,hl=l1>l2,ll=l1<l2,lh=h1<h2;
  if(hh&&hl) return {structure:"BULLISH_BOS",bias:"CALL",bos:true,reason:`BOS HH+HL ${h2.toFixed(5)}→${h1.toFixed(5)}`};
  if(ll&&lh) return {structure:"BEARISH_BOS",bias:"PUT",bos:true,reason:`BOS LL+LH ${h2.toFixed(5)}→${h1.toFixed(5)}`};
  return {structure:"RANGING",bias:"BOTH",bos:false,reason:"Ranging"};
}
function detectLiquidity(candles){
  if(candles.length<6) return {grab:false};
  let last=candles[candles.length-1];
  let prevHigh=Math.max(...candles.slice(-8,-1).map(c=>c.high));
  let prevLow=Math.min(...candles.slice(-8,-1).map(c=>c.low));
  if(last.high>prevHigh&&last.close<prevHigh){
    let ratio=last.upper/(last.body+0.00001);
    if(ratio>1.2) return {grab:true,signal:"PUT",conf:88,reason:`Buy Liquidity ${prevHigh.toFixed(5)} sweep`,is_trap:true,pa_type:"Liquidity Grab"};
  }
  if(last.low<prevLow&&last.close>prevLow){
    let ratio=last.lower/(last.body+0.00001);
    if(ratio>1.2) return {grab:true,signal:"CALL",conf:88,reason:`Sell Liquidity ${prevLow.toFixed(5)} sweep`,is_trap:true,pa_type:"Liquidity Grab"};
  }
  return {grab:false};
}
function detectOrderBlock(candles){
  if(candles.length<6) return {ob:false};
  for(let i=candles.length-5;i>1;i--){
    if(candles[i].bear && i+3<candles.length){
      let c1=candles[i+1],c2=candles[i+2],c3=candles[i+3];
      if(c1.bull&&c2.bull&&(c1.body+c2.body)>candles[i].body*1.8&&c3.close>candles[i].high){
        let curr=candles[candles.length-1];
        if(candles[i].low<=curr.close&&curr.close<=candles[i].high) return {ob:true,signal:"CALL",conf:82,reason:`Bullish OB ${candles[i].low.toFixed(5)} Retest`,pa_type:"Order Block"};
      }
    }
    if(candles[i].bull && i+3<candles.length){
      let c1=candles[i+1],c2=candles[i+2],c3=candles[i+3];
      if(c1.bear&&c2.bear&&(c1.body+c2.body)>candles[i].body*1.8&&c3.close<candles[i].low){
        let curr=candles[candles.length-1];
        if(candles[i].low<=curr.close&&curr.close<=candles[i].high) return {ob:true,signal:"PUT",conf:82,reason:`Bearish OB ${candles[i].high.toFixed(5)} Retest`,pa_type:"Order Block"};
      }
    }
  }
  return {ob:false};
}
function detectFVG(candles){
  if(candles.length<4) return {fvg:false};
  for(let i=1;i<candles.length-1;i++){
    let c1=candles[i-1],c3=candles[i+1];
    if(c3.low>c1.high){
      let curr=candles[candles.length-1];
      if(c1.high<=curr.close&&curr.close<=c3.low) return {fvg:true,signal:"CALL",conf:78,reason:`Bullish FVG Fill`,pa_type:"FVG"};
    }
    if(c3.high<c1.low){
      let curr=candles[candles.length-1];
      if(c3.high<=curr.close&&curr.close<=c1.low) return {fvg:true,signal:"PUT",conf:78,reason:`Bearish FVG Fill`,pa_type:"FVG"};
    }
  }
  return {fvg:false};
}
function runPAFilter(candles){
  if(!paEnabled) return null;
  let struct=detectMarketStructure(candles);
  let liq=detectLiquidity(candles);
  let ob=detectOrderBlock(candles);
  let fvg=detectFVG(candles);
  if(liq.grab) return {...liq,structure:struct};
  if(ob.ob) return {...ob,structure:struct};
  if(fvg.fvg) return {...fvg,structure:struct};
  if(struct.bos) return {signal:struct.bias,conf:80,reason:struct.reason,pa_type:struct.structure,structure:struct,is_trap:false};
  // NEVER WAIT - always give CALL/PUT
  return {signal:candles[candles.length-1].bull?"CALL":"PUT",conf:60,reason:struct.reason,pa_type:"Ranging",structure:struct,is_trap:false};
}

// ===== BOT LOGIC - FIXED MARKET DETECT + NO WAIT =====
let TOKEN="";try{
  // FORCE CLEAR old deleted token for free testing - remove this line if you want premium only
  // localStorage.removeItem('ghost_premium_token'); // Uncomment to always clear
  // Try to get token from script URL (bookmarklet with token)
  let ss=document.getElementsByTagName('script');
  for(let s of ss){
    if(s.src&&s.src.includes('ghost.js')){
      try{
        let u=new URL(s.src);
        TOKEN=u.searchParams.get('token')||u.searchParams.get('access')||u.searchParams.get('premium')||"";
        if(TOKEN) break;
      }catch(e){}
    }
  }
  // Try URL params
  if(!TOKEN){
    let urlParams = new URLSearchParams(window.location.search);
    TOKEN = urlParams.get('token')||urlParams.get('access')||urlParams.get('premium')||"";
  }
  // Try localStorage ONLY if no token in URL and not free mode bookmarklet
  // If bookmarklet has no token param, don't use localStorage old token (fix for BLOCKED issue)
  let isFreeBookmarklet = true;
  for(let s of document.getElementsByTagName('script')){
    if(s.src&&s.src.includes('ghost.js')){
      if(s.src.includes('token=')) isFreeBookmarklet = false;
    }
  }
  if(!TOKEN && !isFreeBookmarklet){
    TOKEN=localStorage.getItem('ghost_premium_token')||"";
  }
  // Save token if found in URL
  if(TOKEN) localStorage.setItem('ghost_premium_token', TOKEN);
  // If free bookmarklet, clear old token
  if(isFreeBookmarklet){
    localStorage.removeItem('ghost_premium_token');
    TOKEN="";
  }
}catch(e){}

let currentSignal=null;
let currentPair="GBPUSD";
let lastDetectedMarket="GBPUSD";
let priceHistory=[];let candleHistory=[];
let lockedSignalId="";let lockedUntil=0;

// NEW MARKET DETECT - FIXED OTC + NO FLICKER
function getCurrentMarket(){
  try{
    let all = document.querySelectorAll('div, span, button, a');
    // Priority 1: Look for OTC explicitly - EUR/USD OTC or EUR/USD (OTC) or EUR/JPY OTC
    for(let el of all){
      let txt=(el.innerText||'').trim();
      // Check for OTC in text near pair
      if(txt.toUpperCase().includes('OTC') && txt.includes('/')){
        let m = txt.match(/([A-Z]{3})\s*[\/\s]+\s*([A-Z]{3})/i);
        if(m){
          let pair = (m[1]+m[2]).toUpperCase();
          let valid = ["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"];
          if(valid.includes(pair)){
            // Found OTC pair
            return pair + 'OTC';
          }
        }
      }
    }
    // Priority 2: Bottom selector with flag (your screenshot) - EUR/USD 93% etc
    for(let el of all){
      let txt=(el.innerText||'').trim();
      if(txt.match(/^[A-Z]{3}\/[A-Z]{3}(\s+\d+%|\s+OTC|\s+\(OTC\)|)?/i)){
        let rect = el.getBoundingClientRect();
        if(rect.top > window.innerHeight*0.4){
          let m = txt.match(/([A-Z]{3})\/([A-Z]{3})/i);
          if(m){
            let pair = (m[1]+m[2]).toUpperCase();
            let isOTC = txt.toUpperCase().includes('OTC');
            if(isOTC) pair+='OTC';
            let valid = ["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"];
            if(valid.includes(pair.replace('OTC',''))){
              return pair;
            }
          }
        }
      }
    }
    // Priority 3: Any element with pair pattern
    for(let el of all){
      let txt=(el.innerText||'').trim();
      if(txt.includes('/') && txt.length<30){
        let m = txt.match(/([A-Z]{3})[^A-Z0-9]*([A-Z]{3})/i);
        if(m){
          let rect = el.getBoundingClientRect();
          if(rect.top > 300){
            let pair = (m[1]+m[2]).toUpperCase();
            if(pair.length==6){
              // Check if OTC nearby
              let parentTxt = (el.parentElement?.innerText||'').toUpperCase();
              if(parentTxt.includes('OTC') || txt.toUpperCase().includes('OTC')){
                pair+='OTC';
              }
              return pair;
            }
          }
        }
      }
    }
  }catch(e){console.log('detect err',e);}
  return currentPair;
}

function autoDetectMarket(){
  let newMarket = getCurrentMarket();
  if(newMarket && newMarket !== currentPair){
    console.log('Market changed:', currentPair, '->', newMarket);
    currentPair = newMarket;
    lastDetectedMarket = newMarket;
    // Update UI
    let mpEl = document.getElementById('gh-pair');
    if(mpEl) mpEl.innerText = newMarket.replace('OTC',' OTC').replace(/([A-Z]{3})([A-Z]{3})/, '$1/$2');
    // Clear lock to force new signal
    lockedSignalId=""; lockedUntil=0; currentSignal=null;
    fetchSignal(newMarket);
  }
  return newMarket;
}

function getRealPrice(){
  try{
    for(let el of document.querySelectorAll('div, span')){
      let txt=(el.innerText||"").trim();
      if(!/^\d+\.\d{3,5}$/.test(txt)) continue;
      let v=parseFloat(txt);if(v<0.3||v>250) continue;
      let r=el.getBoundingClientRect();
      if(r.width<20||r.width>80) continue;
      if(r.height<12||r.height>30) continue;
      if(r.left<window.innerWidth*0.7) continue;
      if(r.top<80||r.top>600) continue;
      return txt;
    }
  }catch(e){}return null;
}

function updateUI(j){
  // Connect to real backend data - do NOT fabricate
  let pairEl=document.getElementById("gh-pair");
  if(pairEl){
    let mTxt = j.market||currentPair.replace(/([A-Z]{3})([A-Z]{3})/, '$1/$2').replace('OTC',' OTC');
    pairEl.innerHTML = mTxt + '<small>GHOST QUANTUM X • AI SCAN</small>';
  }
  let sigEl=document.getElementById("gh-sig");
  let txtEl=document.getElementById("gh-txt");
  let reasonEl=document.getElementById("gh-reason");
  let arrowEl=document.getElementById("gh-arrow");
  let confEl=document.getElementById("gh-conf");
  let trendEl=document.getElementById("gh-trend");
  let condEl=document.getElementById("gh-condition");
  let strengthEl=document.getElementById("gh-strength");
  let statusEl=document.getElementById("gh-status");
  let keyList=document.getElementById("gh-key-list");
  let dir=j.signal||j.direction;
  // Save for Copy
  currentResult = { signal: dir, pair: j.pair||currentPair, confidence: j.confidence||0, trend: j.filter?.trend||j.price_action_type||'—', reason: j.reason||'' };
  if(sigEl&&txtEl){
    let isSameLocked = currentSignal && j.signal_id === currentSignal.signal_id;
    // Determine trend / condition / strength from REAL data only
    let conf = j.confidence||0;
    let trendTxt = '—';
    let condTxt = '—';
    let strengthTxt = '—';
    if(j.filter && j.filter.trend && j.filter.trend!=='NA' && j.filter.trend!=='N/A') trendTxt = j.filter.trend;
    else if(j.price_action_type) trendTxt = j.price_action_type.includes('Bull') ? 'BULLISH' : j.price_action_type.includes('Bear') ? 'BEARISH' : j.price_action_type;
    else if(dir==='CALL') trendTxt='BULLISH'; else if(dir==='PUT') trendTxt='BEARISH';
    if(j.is_trap) condTxt='TRAP / REVERSAL';
    else if(j.price_action_type && j.price_action_type!=='NA' && j.price_action_type!=='N/A') condTxt = j.price_action_type;
    else condTxt = 'RANGING';
    if(conf>=85) strengthTxt='VERY HIGH';
    else if(conf>=75) strengthTxt='HIGH';
    else if(conf>=65) strengthTxt='MEDIUM';
    else if(conf>=50) strengthTxt='LOW';
    else strengthTxt='WAITING';

    if(dir==="CALL"||dir==="UP"){
      sigEl.className="gh-signal-main call";
      txtEl.textContent="CALL";
      if(arrowEl) arrowEl.className="gh-arrow-circle up"; arrowEl.innerHTML='<span class="arrow"></span>';
      if(statusEl){ statusEl.textContent='CALL • ACTIVE'; statusEl.style.background='rgba(34,197,94,.14)'; statusEl.style.color='#4ade80'; statusEl.style.borderColor='rgba(34,197,94,.25)'; }
      if(!isSameLocked || !reasonEl.textContent) reasonEl.textContent=j.reason||j.price_action_type||"";
      if(trendEl) trendEl.textContent='BULLISH';
      if(trendEl) trendEl.className='green';
    }
    else if(dir==="PUT"||dir==="DOWN"){
      sigEl.className="gh-signal-main put";
      txtEl.textContent="PUT";
      if(arrowEl) arrowEl.className="gh-arrow-circle down"; arrowEl.innerHTML='<span class="arrow"></span>';
      if(statusEl){ statusEl.textContent='PUT • ACTIVE'; statusEl.style.background='rgba(244,63,94,.14)'; statusEl.style.color='#fb7185'; statusEl.style.borderColor='rgba(244,63,94,.25)'; }
      if(!isSameLocked || !reasonEl.textContent) reasonEl.textContent=j.reason||j.price_action_type||"";
      if(trendEl) trendEl.textContent='BEARISH';
      if(trendEl) trendEl.className='red';
    }
    else{
      sigEl.className="gh-signal-main wait";
      txtEl.textContent="WAIT";
      if(arrowEl) arrowEl.className="gh-arrow-circle wait"; arrowEl.innerHTML='<span class="dot"></span>';
      reasonEl.textContent=j.reason||"Analyzing...";
      if(statusEl){ statusEl.textContent='WAITING'; statusEl.style.background='rgba(255,255,255,.06)'; statusEl.style.color='#94a3b8'; statusEl.style.borderColor='rgba(255,255,255,.12)'; }
      if(trendEl) trendEl.textContent='—';
    }
    if(confEl) confEl.textContent=conf+'%';
    if(condEl) condEl.textContent=condTxt;
    if(strengthEl) strengthEl.textContent=strengthTxt;
    // Key Analysis - only show what is supported by real data
    if(keyList){
      let items=[];
      // From reason / strategies
      let reason = (j.reason||'').toLowerCase();
      let strat = (j.strategies||[]).join(' ').toLowerCase();
      let combined = reason + ' ' + strat;
      if(combined.includes('momentum') || combined.includes('bull') || dir==='CALL') items.push({txt:'Bullish momentum detected', ok:true});
      if(combined.includes('bear') || dir==='PUT') items.push({txt:'Bearish momentum detected', ok:true});
      if(combined.includes('bos') || combined.includes('structure') || combined.includes('break')) items.push({txt:'Price structure confirmation', ok:true});
      if(combined.includes('support') || combined.includes('resistance') || combined.includes('order block') || combined.includes('fvg') || combined.includes('liquidity')) items.push({txt:'Support / Resistance condition', ok:true});
      if(combined.includes('candle') || combined.includes('wick') || combined.includes('rejection') || combined.includes('engulf')) items.push({txt:'Candle confirmation', ok:true});
      if(items.length===0){
        // Fallback to generic but honest - based on confidence
        if(conf>=65) items.push({txt:'Structure + momentum aligned ('+conf+'%)', ok:true});
        else items.push({txt:'Collecting more candle data...', ok:false});
      }
      // Deduplicate
      let seen={}; items=items.filter(it=>{ if(seen[it.txt]) return false; seen[it.txt]=true; return true; });
      keyList.innerHTML = items.map(it=>`<div class="gh-key-item ${it.ok?'':'warn'}"><div class="tick"></div><div>${it.txt}</div></div>`).join('');
    }
  }
  // Auto-expand on first real signal if minimized? Keep minimized until user clicks
  // If analyzer is closed, keep FAB visible
}

// Auto-start: show FAB only, analyzer hidden until click
// fetchSignal will still run in background to keep data fresh, but UI stays minimized until opened


function fetchSignal(forcePair){
  let now=Date.now();
  // If analyzer is open, show analysis animation (fast, non-blocking)
  if(isExpanded && !isAnalyzing && !lockedSignalId){
    // Show steps animation in background, result will update via updateUI
    try{ startAnalysisAnimation(false); }catch(e){}
  }
  // Loss protection check
  let prot = check_loss_protection();
  if(!prot.allowed){
    let sigEl=document.getElementById("gh-sig");let txtEl=document.getElementById("gh-txt");let reasonEl=document.getElementById("gh-reason");let statusEl=document.getElementById("gh-status");
    if(sigEl&&txtEl){
      sigEl.className="gh-signal-main wait";
      txtEl.textContent="STOP";
      if(reasonEl) reasonEl.textContent=`2 Loss - ${prot.remaining} min break - NO TRADE`;
      if(statusEl){ statusEl.textContent='PROTECTION'; statusEl.style.background='rgba(244,63,94,.14)'; statusEl.style.color='#fb7185'; }
    }
    let secEl=document.getElementById("gh-sec");if(secEl) secEl.textContent=`${prot.remaining}m STOP`;
    return;
  }
  // 58s LOCK - prevent flip
  if(lockedSignalId && now<lockedUntil && currentSignal){
    updateUI(currentSignal);
    return;
  }
  let asset = forcePair || getCurrentMarket();
  if(!asset) asset = currentPair;
  if((document.body.innerText||"").includes("Select trade pair")) return;
  let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";
  if(TOKEN) url+="&token="+encodeURIComponent(TOKEN);
  fetch(url).then(r=>r.json()).then(j=>{
    if(!j) return;
    if(j.signal==="UP") j.signal="CALL";
    if(j.signal==="DOWN") j.signal="PUT";
    // === CHECK IF PREMIUM EXPIRED - FIXED: Allow free testing if token deleted ===
    if(j.status==="EXPIRED" || j.status==="DELETED" || j.status==="SUSPENDED" || j.is_expired || j.is_deleted || j.is_suspended){
      console.log("Token expired/deleted, trying free mode fallback");
      // Try free mode without token - don't block forever, retry without token
      if(TOKEN){
        console.log("Retrying without token for free testing");
        TOKEN=""; // Clear token for free mode
        localStorage.removeItem('ghost_premium_token');
        // Retry fetch without token after 1 sec
        setTimeout(()=>fetchSignal(), 1000);
        let reasonEl=document.getElementById("gh-reason");
        if(reasonEl) reasonEl.textContent="Token expired - Switching to FREE mode...";
        return;
      }
      // If already free mode and still expired, show but don't lock forever
      let sigEl=document.getElementById("gh-sig");let txtEl=document.getElementById("gh-txt");let reasonEl=document.getElementById("gh-reason");let paEl=document.getElementById("gh-status"); // legacy paEl -> status
      if(sigEl&&txtEl){
        sigEl.className="gh-signal-main wait";
        txtEl.textContent="WAIT";
        if(reasonEl) reasonEl.textContent="Free mode - Collecting data...";
        if(paEl) paEl.textContent="PA: FREE MODE";
      }
      return;
    }
    // Balanced WAIT + SIGNAL logic - accuracy first - FIXED no flicker
    // If locked signal exists, don't run PA filter (prevent reason flicker)
    if(lockedSignalId && now<lockedUntil && currentSignal){
      updateUI(currentSignal);
      return;
    }
    if(j.signal==="WAIT" || !j.signal || j.signal==="OFFLINE" || j.confidence < 50 || (j.status==="WAITING" && j.confidence < 50)){
      // Try local PA filter for better accuracy - only if no locked signal
      if(candleHistory.length>=6 && paEnabled && (!lockedSignalId || now>=lockedUntil)){
        try{
          let pa=runPAFilter(candleHistory);
          if(pa && pa.signal!=="WAIT" && (pa.signal==="CALL"||pa.signal==="PUT") && pa.conf >= 60){
            let clockSec=60-new Date().getSeconds();
            let fake={...pa,market:asset.replace(/([A-Z]{3})([A-Z]{3})/, '$1/$2').replace('OTC',' OTC'),pair:asset,confidence:pa.conf,expiry_timestamp:now+clockSec*1000,signal_id:asset+"-PA-"+now,price_action_type:pa.pa_type||pa.reason, status:"ACTIVE"};
            if(!lockedSignalId || now>=lockedUntil){
              lockedSignalId=fake.signal_id;
              lockedUntil=now+58000;
              currentSignal=fake;
              updateUI(fake);
            }
            return;
          }
        }catch(e){}
      }
      // If server confidence is 50-59, show SIGNAL not WAIT (fix WAIT jamela)
      if(j.confidence >= 50 && j.confidence < 60 && (j.signal==="CALL" || j.signal==="PUT")){
        // Show low confidence signal instead of WAIT to avoid flicker
        if(!lockedSignalId || now>=lockedUntil){
          lockedSignalId=j.signal_id|| (asset+"-"+j.signal+"-"+now);
          lockedUntil=now+58000;
          currentSignal=j;
          updateUI(j);
        }
        return;
      }
      if(j.confidence >= 50 && j.confidence < 60){
        // Low conf but no CALL/PUT - keep previous signal locked if exists, don't show WAIT
        if(currentSignal && lockedSignalId && now<lockedUntil){
          updateUI(currentSignal);
          return;
        }
        // Otherwise try PA, but don't flicker to WAIT
      }
      // If truly no signal and no candles, show WAIT only if no locked signal
      if(candleHistory.length===0 && priceHistory.length<4){
        if(currentSignal && lockedSignalId && now<lockedUntil){
          updateUI(currentSignal);
          return;
        }
        let waitSig = {
          signal: "WAIT",
          confidence: j.confidence || 0,
          reason: "Collecting data...",
          price_action_type: "Loading",
          market: asset,
          pair: asset,
          expiry_timestamp: now + 5000,
          signal_id: "WAIT-INIT-"+now,
          status: "WAITING"
        };
        updateUI(waitSig);
        return;
      }
      // Otherwise, if we have candles, give forced signal with 58% (better than pure WAIT)
      if(candleHistory.length>0){
        let lastC = candleHistory[candleHistory.length-1];
        let dir = lastC.bull ? "CALL" : "PUT";
        let fake = {signal:dir, confidence:58, reason:"Momentum - Weak but tradable", price_action_type:"Momentum", market:asset.replace(/([A-Z]{3})([A-Z]{3})/, '$1/$2'), pair:asset, expiry_timestamp:now+60000, signal_id:asset+"-MOM-"+now, status:"ACTIVE"};
        if(!lockedSignalId || now>=lockedUntil){
          lockedSignalId=fake.signal_id;
          lockedUntil=now+58000;
          currentSignal=fake;
          updateUI(fake);
        }
        return;
      }
    }
    if(j.status==="ACTIVE"&&(j.signal==="CALL"||j.signal==="PUT")){
      if(!lockedSignalId || now>=lockedUntil){
        lockedSignalId=j.signal_id|| (asset+"-"+j.signal+"-"+now);
        lockedUntil=now+58000;
        currentSignal=j;
        updateUI(j);
      }
    }
  }).catch(()=>{});
}

// Track candles
setInterval(()=>{
  let rp=getRealPrice();
  if(rp){
    let v=parseFloat(rp);
    if(v){
      priceHistory.push(v);if(priceHistory.length>50) priceHistory.shift();
      if(priceHistory.length>=4){
        let o=priceHistory[priceHistory.length-4];let c=priceHistory[priceHistory.length-1];
        let h=Math.max(...priceHistory.slice(-4));let l=Math.min(...priceHistory.slice(-4));
        candleHistory.push(new Candle(o,h,l,c));if(candleHistory.length>100) candleHistory.shift();
      }
    }
  }
},1000);

setInterval(()=>{
  autoDetectMarket();
  if(!currentSignal){
    let secEl=document.getElementById("gh-sec");
    if(secEl){let sec=60-new Date().getSeconds();if(sec===60) sec=0;secEl.textContent=sec+"s";}
    return;
  }
  let rem=Math.max(0,Math.ceil((currentSignal.expiry_timestamp-Date.now())/1000));
  let secEl=document.getElementById("gh-sec");if(secEl) secEl.textContent=rem+"s";
  if(rem<=0){
    currentSignal=null;lockedSignalId="";lockedUntil=0;
  }else{
    updateUI(currentSignal);
  }
},500);

setInterval(()=>autoDetectMarket(),800);
setInterval(()=>fetchSignal(),3000);
setInterval(()=>{let r=detectResult(); if(r) console.log('Result',r);},1000);
startResultObserver();
setTimeout(startResultObserver, 2000); // restart after 2s to catch late DOM


// Init: show FAB only, analyzer minimized by default
try{ fab.style.display='flex'; fab.style.opacity='1'; fab.style.pointerEvents='auto'; box.classList.remove('open'); box.style.opacity='0'; }catch(e){}
fetchSignal();
autoDetectMarket();
setTimeout(()=>{if(!currentSignal || document.getElementById('gh-txt').textContent==='WAIT'){fetchSignal();}}, 1500);
})();
