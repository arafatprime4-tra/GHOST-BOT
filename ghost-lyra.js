
(function(){
if(document.getElementById('ghost-lyra')){ document.getElementById('ghost-lyra').style.display='block'; return; }
// ===== GHOST LYRA-STYLE UI - Red Glass + Ghost Orb + 3 Steps =====
// Video er moto: Step 1 Trade Duration, Step 2 Investment Stake, Step 3 Execution Count
// Auto-trade NA - Signal only, user manually Buy/Sell (account safe)
let css=document.createElement("style");
css.innerHTML=`
#ghost-lyra{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:300px;font-family:Inter,sans-serif;user-select:none}
.gh-lyra-orb{width:90px;height:90px;margin:0 auto 8px;border-radius:50%;background:radial-gradient(circle at 35% 35%,rgba(255,60,60,.9),rgba(180,0,0,.7) 45%,rgba(80,0,0,.4) 70%,transparent);display:flex;align-items:center;justify-content:center;font-size:42px;box-shadow:0 0 30px rgba(255,30,30,.6),0 0 60px rgba(255,0,0,.3);animation:ghOrbPulse 2.2s infinite;cursor:move}
@keyframes ghOrbPulse{0%,100%{transform:scale(1);box-shadow:0 0 30px rgba(255,30,30,.6)}50%{transform:scale(1.06);box-shadow:0 0 50px rgba(255,30,30,.9)}}
.gh-lyra-card{background:linear-gradient(145deg,rgba(40,0,0,.92),rgba(15,0,0,.95));backdrop-filter:blur(14px);border:1px solid rgba(255,45,85,.5);border-radius:16px;box-shadow:0 0 30px rgba(255,0,0,.35),0 12px 30px #000c;overflow:hidden}
.gh-lyra-h{padding:10px 12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,45,85,.25);cursor:move}
.gh-lyra-h b{font-size:13px;color:#fff;letter-spacing:1px}
.gh-lyra-h b span{color:#ff2d55}
.gh-lyra-h small{font-size:9px;color:#ff8fa3;background:rgba(255,45,85,.2);padding:2px 6px;border-radius:10px}
.gh-lyra-step{padding:12px}
.gh-lyra-title{font-size:13px;font-weight:900;color:#fff;margin:0 0 2px}
.gh-lyra-sub{font-size:10px;color:#ff8fa3;margin:0 0 10px}
.gh-lyra-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.gh-lyra-btn{background:linear-gradient(145deg,rgba(255,45,85,.25),rgba(120,0,20,.35));border:1px solid rgba(255,45,85,.45);border-radius:10px;padding:10px 6px;text-align:center;cursor:pointer;color:#fff;transition:all .15s}
.gh-lyra-btn:hover{background:linear-gradient(145deg,rgba(255,45,85,.5),rgba(200,0,40,.5));transform:scale(1.03)}
.gh-lyra-btn.sel{background:linear-gradient(145deg,#ff2d55,#c4002e);border-color:#fff;box-shadow:0 0 15px rgba(255,45,85,.6)}
.gh-lyra-btn b{font-size:13px;display:block}
.gh-lyra-btn small{font-size:8px;color:#ffd1dc;letter-spacing:.5px}
.gh-lyra-foot{padding:0 12px 12px;display:flex;gap:8px}
.gh-lyra-next{flex:1;background:linear-gradient(90deg,#ff2d55,#ff5e3a);border:none;border-radius:10px;color:#fff;font-weight:900;padding:11px;cursor:pointer;font-size:12px}
.gh-lyra-back{width:70px;background:#1a0a0a;border:1px solid rgba(255,255,255,.2);border-radius:10px;color:#fff;cursor:pointer}
.gh-lyra-sig{margin:10px 12px 0;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;letter-spacing:1px}
.gh-lyra-sig.up{background:linear-gradient(145deg,#00c853,#009624);color:#fff}
.gh-lyra-sig.down{background:linear-gradient(145deg,#ff1744,#d5002b);color:#fff}
.gh-lyra-sig.wait{background:#141a2a;color:#5a6f8a;border:1px solid #1e2d4a}
.gh-lyra-sig.off{background:#330000;color:#ffb3c2;border:1px solid rgba(255,45,85,.5)}
.gh-lyra-meta{font-size:10px;color:#8a9ab5;text-align:center;margin:8px 0;line-height:1.5}
.gh-lyra-close{margin:0 12px 12px;height:28px;background:#13151e;border:1px solid #1e2d4a;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#8a9ab5;font-size:11px;cursor:pointer}
.gh-lyra-hint{font-size:9px;color:#5a6f8a;text-align:center;padding:0 12px 8px}
`;
document.head.appendChild(css);
let box=document.createElement("div");box.id="ghost-lyra";
box.innerHTML=`
<div class="gh-lyra-orb" id="gh-lyra-orb">👻</div>
<div class="gh-lyra-card">
<div class="gh-lyra-h" id="gh-lyra-h"><b>GHOST <span>AI</span></b><small id="gh-lyra-step-label">Step 1</small></div>
<div id="gh-lyra-body"></div>
<div id="gh-lyra-sig-wrap" style="display:none"><div class="gh-lyra-sig wait" id="gh-lyra-sig">◉ WAIT</div><div class="gh-lyra-meta" id="gh-lyra-meta">Pair: -- • Duration: -- • Stake: -- • Left: --</div></div>
<div class="gh-lyra-hint" id="gh-lyra-hint">Tap Orb to Configure • Drag to Reposition</div>
<div class="gh-lyra-close" id="gh-lyra-close">✕ Close</div>
</div>`;
document.body.appendChild(box);
// State
let state={duration:60,durationLabel:"1 Min",stake:5,stakeLabel:"$5",count:1,step:1};
let saved=JSON.parse(localStorage.getItem('ghost_lyra_config')||'{}');
if(saved.duration) state={...state,...saved};
function save(){ localStorage.setItem('ghost_lyra_config',JSON.stringify(state)); }
function render(){
  let body=document.getElementById('gh-lyra-body');
  let label=document.getElementById('gh-lyra-step-label');
  label.textContent="Step "+state.step+" / 3";
  if(state.step===1){
    body.innerHTML=`<div class="gh-lyra-step"><p class="gh-lyra-title">Trade Duration</p><p class="gh-lyra-sub">Choose candle expiry timeframe</p><div class="gh-lyra-grid">
    <div class="gh-lyra-btn ${state.duration===5?'sel':''}" data-d="5" data-l="5 Sec"><b>5 Sec</b><small>ULTRA FAST</small></div>
    <div class="gh-lyra-btn ${state.duration===30?'sel':''}" data-d="30" data-l="30 Sec"><b>30 Sec</b><small>MOMENTUM</small></div>
    <div class="gh-lyra-btn ${state.duration===60?'sel':''}" data-d="60" data-l="1 Min"><b>1 Min</b><small>STANDARD</small></div>
    <div class="gh-lyra-btn ${state.duration===120?'sel':''}" data-d="120" data-l="2 Min"><b>2 Min</b><small>TREND</small></div>
    <div class="gh-lyra-btn ${state.duration===300?'sel':''}" data-d="300" data-l="5 Min"><b>5 Min</b><small>MACRO</small></div>
    <div class="gh-lyra-btn ${state.duration===600?'sel':''}" data-d="600" data-l="10 Min"><b>10 Min</b><small>EXTENDED</small></div>
    </div></div><div class="gh-lyra-foot"><button class="gh-lyra-next" id="gh-next">Next → Stake</button></div>`;
  }else if(state.step===2){
    body.innerHTML=`<div class="gh-lyra-step"><p class="gh-lyra-title">Investment Stake</p><p class="gh-lyra-sub">Select capital per trade (info only - you set in Quotex)</p><div class="gh-lyra-grid">
    <div class="gh-lyra-btn ${state.stake===1?'sel':''}" data-s="1" data-sl="$1"><b>$1</b><small>STARTER</small></div>
    <div class="gh-lyra-btn ${state.stake===3?'sel':''}" data-s="3" data-sl="$3"><b>$3</b><small>SAFE</small></div>
    <div class="gh-lyra-btn ${state.stake===5?'sel':''}" data-s="5" data-sl="$5"><b>$5</b><small>BALANCED</small></div>
    <div class="gh-lyra-btn ${state.stake===10?'sel':''}" data-s="10" data-sl="$10"><b>$10</b><small>GROWTH</small></div>
    <div class="gh-lyra-btn ${state.stake===50?'sel':''}" data-s="50" data-sl="$50"><b>$50</b><small>PRO</small></div>
    <div class="gh-lyra-btn ${state.stake===100?'sel':''}" data-s="100" data-sl="$100"><b>$100</b><small>MAX</small></div>
    </div></div><div class="gh-lyra-foot"><button class="gh-lyra-back" id="gh-back">← Back</button><button class="gh-lyra-next" id="gh-next">Next → Count</button></div>`;
  }else{
    body.innerHTML=`<div class="gh-lyra-step"><p class="gh-lyra-title">Execution Count</p><p class="gh-lyra-sub">How many signals in this session? (Signal only)</p><div class="gh-lyra-grid">
    <div class="gh-lyra-btn ${state.count===1?'sel':''}" data-c="1"><b>1 Trade</b><small>SINGLE</small></div>
    <div class="gh-lyra-btn ${state.count===2?'sel':''}" data-c="2"><b>2 Trades</b><small>DUO</small></div>
    <div class="gh-lyra-btn ${state.count===3?'sel':''}" data-c="3"><b>3 Trades</b><small>SERIES</small></div>
    <div class="gh-lyra-btn ${state.count===5?'sel':''}" data-c="5"><b>5 Trades</b><small>AUTO</small></div>
    <div class="gh-lyra-btn ${state.count===10?'sel':''}" data-c="10"><b>10 Trades</b><small>SESSION</small></div>
    <div class="gh-lyra-btn ${state.count===20?'sel':''}" data-c="20"><b>20 Trades</b><small>DEEP AUTO</small></div>
    </div></div><div class="gh-lyra-foot"><button class="gh-lyra-back" id="gh-back">← Back</button><button class="gh-lyra-next" id="gh-start">▶ Start Session</button></div>`;
  }
  // Bind
  body.querySelectorAll('[data-d]').forEach(el=>el.addEventListener('click',()=>{ state.duration=+el.dataset.d; state.durationLabel=el.dataset.l; save(); render(); }));
  body.querySelectorAll('[data-s]').forEach(el=>el.addEventListener('click',()=>{ state.stake=+el.dataset.s; state.stakeLabel=el.dataset.sl; save(); render(); }));
  body.querySelectorAll('[data-c]').forEach(el=>el.addEventListener('click',()=>{ state.count=+el.dataset.c; save(); render(); }));
  let nx=document.getElementById('gh-next'); if(nx) nx.addEventListener('click',()=>{ state.step=Math.min(3,state.step+1); save(); render(); });
  let bk=document.getElementById('gh-back'); if(bk) bk.addEventListener('click',()=>{ state.step=Math.max(1,state.step-1); save(); render(); });
  let st=document.getElementById('gh-start'); if(st) st.addEventListener('click',()=>{ startSession(); });
  updateMeta();
}
let session={left:0,active:false};
function startSession(){
  session.left=state.count; session.active=true;
  document.getElementById('gh-lyra-sig-wrap').style.display='block';
  document.getElementById('gh-lyra-body').innerHTML=`<div class="gh-lyra-step"><p class="gh-lyra-title">✅ Session Started</p><p class="gh-lyra-sub">${state.durationLabel} • ${state.stakeLabel} • ${state.count} Trades • Signal Only - Manually Buy/Sell in Quotex</p><div class="gh-lyra-foot"><button class="gh-lyra-back" id="gh-edit">✏️ Edit</button><button class="gh-lyra-next" id="gh-stop">⏹ Stop</button></div></div>`;
  document.getElementById('gh-edit').addEventListener('click',()=>{ state.step=1; render(); });
  document.getElementById('gh-stop').addEventListener('click',()=>{ session.active=false; session.left=0; state.step=1; render(); document.getElementById('gh-lyra-sig-wrap').style.display='none'; });
  updateMeta();
  // Load original GHOST signal logic (fetch from backend) - reuse same /api/signal
  fetchSignalLyra();
}
function updateMeta(){
  let m=document.getElementById('gh-lyra-meta'); if(!m) return;
  m.textContent=`Pair: ${window.__gh_currentPair||'--'} • Duration: ${state.durationLabel} • Stake: ${state.stakeLabel} • Left: ${session.active?session.left+'/'+state.count:'--'}`;
}
function fetchSignalLyra(){
  // Use same backend as GHOST - pair from current Quotex pair button
  let pair="GBPUSD";
  try{
    let all=document.querySelectorAll('div, span, button, a');
    for(let el of all){
      if(el.closest && el.closest('#ghost-lyra')) continue;
      let txt=(el.innerText||'').trim();
      if(!txt||txt.length>40||txt.toUpperCase().includes('GHOST')) continue;
      if(!txt.includes('%')) continue;
      let mm=txt.match(/^([A-Z]{3})\s*\/\s*([A-Z]{3})/);
      if(mm){ pair=mm[1]+mm[2]; if(txt.toUpperCase().includes('OTC')) pair+='OTC'; break; }
    }
  }catch(e){}
  window.__gh_currentPair=pair;
  let token=localStorage.getItem('ghost_premium_token')||'';
  let url="https://giogram-backend.onrender.com/api/signal?pair="+pair+"&mode=SAFE";
  if(token) url+="&token="+encodeURIComponent(token);
  fetch(url).then(r=>r.json()).then(j=>{
    let sigEl=document.getElementById('gh-lyra-sig'); if(!sigEl) return;
    let dir=j.signal||j.direction;
    if(dir==="CALL"||dir==="UP"){ sigEl.className="gh-lyra-sig up"; sigEl.textContent="▲ UP - "+(j.confidence||0)+"%"; }
    else if(dir==="PUT"||dir==="DOWN"){ sigEl.className="gh-lyra-sig down"; sigEl.textContent="▼ DOWN - "+(j.confidence||0)+"%"; }
    else{ sigEl.className="gh-lyra-sig wait"; sigEl.textContent="◉ WAIT - "+(j.reason||"Analyzing..."); }
    updateMeta();
  }).catch(()=>{});
  if(session.active) setTimeout(fetchSignalLyra, 4000);
}
// Drag
let isDrag=false,sx=0,sy=0,il=0,it=0;
function getPos(){let r=box.getBoundingClientRect();return{left:r.left,top:r.top};}
function ds(e){ if(e.target.closest('#gh-lyra-close')) return; isDrag=true; let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY; sx=cx; sy=cy; let p=getPos(); il=p.left; it=p.top; box.style.left=p.left+"px"; box.style.right="auto"; box.style.bottom="auto"; box.style.transform="none"; e.preventDefault(); }
function dm(e){ if(!isDrag) return; let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY; box.style.left=(il+cx-sx)+"px"; box.style.top=(it+cy-sy)+"px"; e.preventDefault(); }
function de(){ isDrag=false; }
let hd=document.getElementById('gh-lyra-h'); let orb=document.getElementById('gh-lyra-orb');
hd.addEventListener('mousedown',ds); document.addEventListener('mousemove',dm); document.addEventListener('mouseup',de);
hd.addEventListener('touchstart',ds,{passive:false}); document.addEventListener('touchmove',dm,{passive:false}); document.addEventListener('touchend',de);
orb.addEventListener('mousedown',ds); orb.addEventListener('touchstart',ds,{passive:false});
orb.addEventListener('click',()=>{ let b=document.getElementById('gh-lyra-body'); b.style.display=b.style.display==='none'?'block':'none'; });
document.getElementById('gh-lyra-close').addEventListener('click',()=>box.remove());
render();
})();
