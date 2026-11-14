(function(){
if(window.__GHOST_LOADED__){
  // FIX: 2nd tap e box DELETE na - jodi box ache, show koro. Jodi Close kora thake (box nai), abar banate dao.
  try{
    let o=document.getElementById('ghost-bot');
    if(o){ o.style.display='block'; o.style.visibility='visible'; o.style.opacity='1'; console.log('👻 GHOST already running - showing existing box'); return; }
    // Box nai (Close kora) - abar banate dao
    window.__GHOST_LOADED__ = false;
  }catch(e){ window.__GHOST_LOADED__ = false; }
}
window.__GHOST_LOADED__ = true;
console.log('👻 GHOST BOT LOADING...');
// ===== BOX FIRST - CSS fail korleo Box asbe =====
try{
  let _old = document.getElementById('ghost-bot');
  if(_old) _old.remove();
  let _box = document.createElement('div');
  _box.id = 'ghost-bot';
  _box.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:208px;background:#0a0f23;border:1px solid #00f0ff;border-radius:12px;color:#fff;font-family:sans-serif;text-align:center;padding:5px;box-shadow:0 0 28px rgba(0,240,255,.3)';
  _box.innerHTML = '<div style="font-size:6px;letter-spacing:1px;color:#00f0ff">GHOST AI</div><div style="font-size:9px;font-weight:900;margin:2px 0">LOADING...</div><div style="font-size:8px;color:#00ff88">Bot Ashtese...</div>';
  (document.body || document.documentElement).appendChild(_box);
  console.log('👻 GHOST BOT BOX CREATED - FIRST');
}catch(_e){ console.error('BOX FIRST FAIL', _e); }
try{
let css=document.createElement("style");
css.innerHTML=`
/* ===== GHOST FUTURISTIC HUD - v2 FIXED LOSS ===== */
#ghost-bot{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:208px;background:linear-gradient(165deg,rgba(10,15,35,.96),rgba(5,8,20,.98));border:1px solid rgba(0,240,255,.45);border-radius:10px;box-shadow:0 0 0 1px rgba(0,240,255,.12),0 0 28px rgba(0,240,255,.22),0 0 60px rgba(0,120,255,.18),0 18px 40px #000d;backdrop-filter:blur(14px);font-family:'Segoe UI',Inter,sans-serif;color:#e8f0ff;overflow:hidden;user-select:none}
#ghost-bot::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,#00f0ff,#7b2fff,#00ff88,transparent);animation:ghBorderFlow 2.4s linear infinite;background-size:200% 100%}
@keyframes ghBorderFlow{0%{background-position:0% 0}100%{background-position:200% 0}}
@keyframes ghPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.85)}}
@keyframes ghBlink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes ghArrowUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes ghArrowDown{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
@keyframes ghGlowGreen{0%,100%{box-shadow:0 0 12px rgba(0,255,136,.55),0 0 32px rgba(0,255,136,.30)}50%{box-shadow:0 0 22px rgba(0,255,136,.85),0 0 48px rgba(0,255,136,.45)}}
@keyframes ghGlowRed{0%,100%{box-shadow:0 0 12px rgba(255,45,85,.55),0 0 32px rgba(255,45,85,.30)}50%{box-shadow:0 0 22px rgba(255,45,85,.85),0 0 48px rgba(255,45,85,.45)}}
@keyframes ghScan{0%{top:-10%}100%{top:110%}}
@keyframes ghShine{0%{left:-80%}100%{left:120%}}
.gh-h{padding:2px 5px;background:linear-gradient(90deg,rgba(0,240,255,.14),rgba(123,47,255,.12),transparent);border-bottom:1px solid rgba(0,240,255,.18);display:flex;align-items:center;justify-content:space-between;cursor:move;position:relative}
.gh-h-left{display:flex;align-items:center;gap:6px}
.gh-dot{width:6px;height:6px;background:#00ff88;border-radius:50%;box-shadow:0 0 8px #00ff88,0 0 16px rgba(0,255,136,.6);animation:ghPulse 1.2s infinite}
.gh-h b{font-size:6.5px;color:#fff;letter-spacing:1.2px;font-weight:900}
.gh-h b span{background:linear-gradient(90deg,#00f0ff,#7b2fff,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gh-live{font-size:4.5px;background:#ff2d55;color:#fff;padding:2px 5px;border-radius:20px;font-weight:900;letter-spacing:.6px;animation:ghBlink 1s infinite}
.gh-toggle{font-size:4.5px;background:rgba(0,240,255,.12);border:1px solid rgba(0,240,255,.5);color:#00f0ff;padding:2px 5px;border-radius:20px;cursor:pointer;font-weight:800}
.gh-toggle.off{background:rgba(255,255,255,.05);border-color:#333;color:#666}
.gh-pair{font-size:8px;font-weight:900;color:#fff;text-align:center;margin:2px 0 1px;letter-spacing:1.4px;text-shadow:0 0 10px rgba(0,240,255,.8)}
.gh-pair small{display:block;font-size:4.5px;color:#00f0ff;letter-spacing:2px;margin-top:2px;font-weight:700}
.gh-sig{margin:0 6px;height:30px;border-radius:9px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden}
.gh-sig .gh-arrow{font-size:11px;line-height:1;margin-bottom:1px}
.gh-sig.up .gh-arrow{animation:ghArrowUp .7s ease-in-out infinite}
.gh-sig.down .gh-arrow{animation:ghArrowDown .7s ease-in-out infinite}
.gh-sig b{font-size:11px;font-weight:900;letter-spacing:1.5px;line-height:1;text-shadow:0 0 14px currentColor}
.gh-sig small{font-size:4.5px;color:#c8d0dc;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:210px}
.gh-sig .gh-scan{position:absolute;left:0;right:0;height:18px;background:linear-gradient(180deg,transparent,rgba(255,255,255,.18),transparent);animation:ghScan 1.6s linear infinite}
.gh-sig .gh-shine{position:absolute;top:0;width:40px;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);animation:ghShine 1.8s ease-in-out infinite}
.gh-sig.up{background:linear-gradient(145deg,#00ff88,#00b35e,#006e3a);color:#fff;animation:ghGlowGreen 1.1s ease-in-out infinite;border:1px solid rgba(0,255,136,.7)}
.gh-sig.down{background:linear-gradient(145deg,#ff2d55,#d6002e,#8a0020);color:#fff;animation:ghGlowRed 1.1s ease-in-out infinite;border:1px solid rgba(255,45,85,.7)}
.gh-sig.wait{background:linear-gradient(145deg,#141a2a,#0a0e1a);color:#5a6f8a;border:1px solid rgba(0,240,255,.18)}
.gh-sig.off{background:linear-gradient(145deg,#330000,#1a0000);color:#ffb3c2;border:1px solid rgba(255,45,85,.5)}
.gh-bar{height:2px;margin:2px 6px 0;border-radius:10px;background:rgba(255,255,255,.08);overflow:hidden}
.gh-bar-fill{height:100%;width:0%;border-radius:10px;background:linear-gradient(90deg,#00f0ff,#00ff88);transition:width .5s linear}
.gh-meta{font-size:5.5px;color:#8a9ab5;text-align:center;margin:5px 0 6px;letter-spacing:.4px;font-weight:600;line-height:1.4}
.gh-meta b{color:#00f0ff}
.gh-meta .gh-conf{color:#00ff88}
.gh-loss-row{display:flex;gap:4px;margin:0 6px 2px}
.gh-loss-btn{flex:1;height:18px;border-radius:6px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#e2e8f0;font-size:6px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:3px}
.gh-loss-btn.win{border-color:rgba(0,255,136,.4);color:#00ff88}
.gh-loss-btn.loss{border-color:rgba(255,45,85,.4);color:#ff5a7a}
.gh-loss-btn:active{transform:scale(.96)}
.gh-protect{margin:0 6px 2px;padding:2px 5px;border-radius:6px;background:rgba(255,45,85,.12);border:1px solid rgba(255,45,85,.4);color:#ffb3c2;font-size:6px;font-weight:700;text-align:center;display:none}
.gh-protect.on{display:block;animation:ghBlink 1s infinite}
.gh-close{margin:0 6px 3px;height:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#8a9ab5;font-size:6px;font-weight:700;cursor:pointer}
.gh-close:hover{background:rgba(255,45,85,.15);color:#fff}
.gh-corner{position:absolute;width:7px;height:7px;border:1.5px solid rgba(0,240,255,.6)}
.gh-corner.tl{top:6px;left:6px;border-right:none;border-bottom:none}
.gh-corner.tr{top:6px;right:6px;border-left:none;border-bottom:none}
.gh-corner.bl{bottom:6px;left:6px;border-right:none;border-top:none}
.gh-corner.br{bottom:6px;right:6px;border-left:none;border-top:none}
`;
(document.head || document.getElementsByTagName('head')[0] || document.documentElement).appendChild(css);
let box=document.getElementById("ghost-bot");
if(!box){ box=document.createElement("div"); box.id="ghost-bot"; }
// Reuse first box - remove korbo na, taile LOADING box haray jabe na
box.innerHTML=`
<div class="gh-corner tl"></div><div class="gh-corner tr"></div><div class="gh-corner bl"></div><div class="gh-corner br"></div>
<div class="gh-h" id="gh-h"><div class="gh-h-left"><div class="gh-dot"></div><b>GHOST <span>PREMIUM</span></b><span class="gh-live">● LIVE</span></div><div class="gh-toggle" id="gh-toggle">PA ON</div></div>
<div class="gh-pair" id="gh-pair">GBP/USD<small>GHOST AI</small></div>
<div class="gh-sig wait" id="gh-sig"><div class="gh-scan"></div><div class="gh-shine"></div><div class="gh-arrow" id="gh-arrow">◉</div><b id="gh-txt">WAIT</b><small id="gh-reason">GHOST AI Analyzing...</small></div>
<div class="gh-bar"><div class="gh-bar-fill" id="gh-bar"></div></div>
<div class="gh-meta" id="gh-meta">SAFE 1M • <b><span id="gh-sec">--s</span></b> • 1% RISK • <span id="gh-pa" style="color:#00f0ff;font-size:5.5px">PA: READY</span> • <span class="gh-conf" id="gh-conf">--%</span> • <span id="gh-loss-info" style="color:#ff5a7a">Loss: 0/2</span></div>
<div class="gh-protect" id="gh-protect">🛑 2 LOSS - 30 MIN OFF - NO SIGNAL</div>
<div class="gh-loss-row"><button class="gh-loss-btn win" id="gh-win-btn">✅ WIN</button><button class="gh-loss-btn loss" id="gh-loss-btn">❌ LOSS</button></div><div id="gh-reset" style="text-align:center;font-size:6px;color:#888;cursor:pointer;padding:2px">↺ Reset Loss Count</div>
<div class="gh-close" id="gh-close">✕ Close</div>
`;
if(!box.isConnected){ (document.body || document.documentElement).appendChild(box); }

let paEnabled=true;
let toggleEl=document.getElementById("gh-toggle");
toggleEl.addEventListener("click",e=>{e.stopPropagation();paEnabled=!paEnabled;toggleEl.textContent=paEnabled?"PA ON":"PA OFF";toggleEl.className=paEnabled?"gh-toggle":"gh-toggle off";localStorage.setItem("ghost_pa_enabled", paEnabled?"1":"0");});
let savedPA=localStorage.getItem("ghost_pa_enabled");if(savedPA==="0"){paEnabled=false;toggleEl.textContent="PA OFF";toggleEl.className="gh-toggle off";}
document.getElementById("gh-close").addEventListener("click",e=>{e.stopPropagation();box.remove(); window.__GHOST_LOADED__=false;});
let isDrag=false,sx=0,sy=0,il=0,it=0;let hd=document.getElementById("gh-h");
function getPos(){let r=box.getBoundingClientRect();return{left:r.left,top:r.top};}
function ds(e){if(e.target.closest("#gh-close")||e.target.closest("#gh-toggle")||e.target.closest(".gh-loss-btn")) return; isDrag=true;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;sx=cx;sy=cy;let p=getPos();il=p.left;it=p.top;box.style.left=p.left+"px";box.style.right="auto";box.style.bottom="auto";box.style.transform="none";e.preventDefault();}
function dm(e){if(!isDrag)return;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;box.style.left=(il+cx-sx)+"px";box.style.top=(it+cy-sy)+"px";e.preventDefault();}
function de(){isDrag=false;}
hd.addEventListener("mousedown",ds);document.addEventListener("mousemove",dm);document.addEventListener("mouseup",de);
hd.addEventListener("touchstart",ds,{passive:false});document.addEventListener("touchmove",dm,{passive:false});document.addEventListener("touchend",de);

// ===== LOSS PROTECTION - 2 LOSS = 30 MIN STOP - FIXED =====
// FIX 1: last_loss_time as timestamp (ms), not Date string - Invalid Date bug fixed
// FIX 2: Balance tracking - Quotex popup miss holeo balance diye loss dhora jabe
// FIX 3: Manual WIN/LOSS buttons - auto fail korleo tumi tap kore loss gunate parba
let loss_count = parseInt(localStorage.getItem('ghost_loss_count')||'0')||0;
let consecutive_losses = parseInt(localStorage.getItem('ghost_consecutive_losses')||'0')||0;
let last_loss_ts = parseInt(localStorage.getItem('ghost_last_loss_ts')||'0')||0;
// FIX: Video showed 800/2 -> 3179/2 in 28s = auto-detect false positives, not real trades. 2 is max legit, >10 is corruption -> auto-reset
if(consecutive_losses > 10 || loss_count > 50){
  console.log('👻 GHOST: Corrupted loss count '+consecutive_losses+' detected - auto-resetting to 0');
  consecutive_losses = 0; loss_count = 0; last_loss_ts = 0;
  try{ localStorage.setItem('ghost_loss_count','0'); localStorage.setItem('ghost_consecutive_losses','0'); localStorage.setItem('ghost_last_loss_ts','0'); }catch(e){}
}
let last_balance = null;
let last_result_key = '';
let last_result_ts = 0;

function updateLossUI(){
  let info = document.getElementById('gh-loss-info');
  if(info) info.textContent = 'Loss: '+consecutive_losses+'/2';
  let prot = document.getElementById('gh-protect');
  let chk = check_loss_protection();
  if(prot){
    if(!chk.allowed){ if(prot.classList) prot.classList.add('on'); prot.textContent = '🛑 2 LOSS - '+chk.remaining+' MIN OFF - NO SIGNAL'; }
    else if(prot.classList) prot.classList.remove('on');
  }
}
function check_loss_protection(){
  if(consecutive_losses >= 2 && last_loss_ts > 0){
    let diffMin = (Date.now() - last_loss_ts) / 1000 / 60;
    if(diffMin < 30 && !isNaN(diffMin)){
      return {allowed:false, remaining: Math.ceil(30-diffMin)};
    } else {
      consecutive_losses = 0; loss_count = 0; last_loss_ts = 0;
      localStorage.setItem('ghost_loss_count','0');
      localStorage.setItem('ghost_consecutive_losses','0');
      localStorage.setItem('ghost_last_loss_ts','0');
      updateLossUI();
      return {allowed:true, remaining:0};
    }
  }
  return {allowed:true, remaining:0};
}
function register_loss(src){
  // FIX: Double-fire safety - 800ms er moddhe 2nd call ignore (click+touchend bug er jonno)
  let _now = Date.now();
  if(_now - (window.__last_loss_ts||0) < 800 && src==='MANUAL') return;
  window.__last_loss_ts = _now;
  consecutive_losses++; loss_count++; last_loss_ts = Date.now();
  localStorage.setItem('ghost_loss_count', String(loss_count));
  localStorage.setItem('ghost_consecutive_losses', String(consecutive_losses));
  localStorage.setItem('ghost_last_loss_ts', String(last_loss_ts));
  console.log('❌ LOSS via '+src+': '+consecutive_losses+'/2 total '+loss_count);
  try{ if(navigator.vibrate) navigator.vibrate([100,50,100]); }catch(e){}
  updateLossUI();
  if(consecutive_losses>=2){
    // FIX: 2nd Loss er sathe sathe DIRECT OFF - purano signal clear, fetch bondho
    currentSignal=null; lockedSignalId=""; lockedUntil=0;
    showSTOP();
  }
  showToast('❌ LOSS '+consecutive_losses+'/2', consecutive_losses>=2 ? '30 MIN OFF - NO SIGNAL' : 'Continue');
}
function register_win(src){
  let _nowW = Date.now();
  if(_nowW - (window.__last_win_ts||0) < 800 && src==='MANUAL') return;
  window.__last_win_ts = _nowW;
  console.log('✅ WIN via '+src+' - resetting');
  if(consecutive_losses>0){ consecutive_losses=0; localStorage.setItem('ghost_consecutive_losses','0'); }
  updateLossUI();
  showToast('✅ WIN - Losses reset', '0/2');
}
function showToast(title, subtitle){
  try{
    let toast = document.getElementById('ghost-toast');
    if(!toast){ toast=document.createElement('div'); toast.id='ghost-toast'; toast.style.cssText='position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:2147483648;background:#1a1a0a;border:1px solid #d4af37;color:#fff;padding:8px 14px;border-radius:8px;font-size:10px;font-weight:700;box-shadow:0 4px 12px rgba(0,0,0,.5)'; document.body.appendChild(toast); }
    toast.innerHTML = title+'<br><small style="color:#d4af37">'+subtitle+'</small>';
    toast.style.display='block'; toast.style.opacity='1';
    setTimeout(()=>{ toast.style.opacity='0'; setTimeout(()=>{toast.style.display='none'},300); },2500);
  }catch(e){}
}
// Manual buttons - FIX: 1 Click = 2 Loss bug. Mobile e 1 Tap e touchend + click 2 ta fire hoy, tai shudhu click rakhlam, touchend remove. + 800ms debounce.
let last_manual_ts = 0;
function manualGuard(){ let n=Date.now(); if(n-last_manual_ts<800) return false; last_manual_ts=n; return true; }
document.getElementById('gh-win-btn').addEventListener('click',e=>{e.stopPropagation(); if(!manualGuard()) return; register_win('MANUAL');});
document.getElementById('gh-loss-btn').addEventListener('click',e=>{e.stopPropagation(); if(!manualGuard()) return; register_loss('MANUAL');});
try{ document.getElementById('gh-reset').addEventListener('click',e=>{e.stopPropagation(); if(!manualGuard()) return; window.resetLossProtection();}); }catch(e){}

// ===== BALANCE TRACKING - Quotex balance diye WIN/LOSS dhora (popup miss holeo) =====
function getBalance(){
  try{
    // Quotex top bar e balance thake - "$ 1,234.56" ba "1234.56 $"
    let els = document.querySelectorAll('div, span, button');
    for(let el of els){
      let t = (el.innerText||'').trim();
      // Balance pattern: 1,234.56 $ or $ 1,234.56, short text, top area
      if(t.length < 25 && t.includes('$')){
        let m = t.match(/([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})|\d+\.\d{2})/);
        if(m){
          let r = el.getBoundingClientRect();
          if(r.top < 120 && r.width < 220 && r.height < 40 && el.children.length <= 2){
            let v = parseFloat(m[1].replace(/,/g,''));
            if(v > 1 && v < 1000000) return v;
          }
        }
      }
    }
  }catch(e){}
  return null;
}
function checkBalanceChange(){
  // FIX: DISABLED auto balance loss - Quotex ALWAYS shows Payout/Investment, so it false-triggered 100x/sec. Manual buttons only.
  return;
  let bal = getBalance();
  if(bal === null) return;
  if(last_balance === null){ last_balance = bal; return; }
  let diff = bal - last_balance;
  // Trade close hole balance change hobe: + = WIN, - = LOSS (min 0.5$ change, fee/slippage ignore)
  if(Math.abs(diff) >= 0.5){
    let key = 'bal-'+Math.round(bal*100)+'-'+Math.floor(Date.now()/10000);
    if(key !== last_result_key){
      last_result_key = key;
      if(diff < 0) register_loss('BALANCE');
      else register_win('BALANCE');
    }
    last_balance = bal;
  } else {
    last_balance = bal;
  }
}

// ===== RESULT DETECTION - LENIENT + FIXED =====
function detectResultAdvanced(){
  // FIX: DISABLED auto popup loss - Quotex trade panel ALWAYS contains "Payout" + number, so it counted a LOSS every second even with NO trade. Manual WIN/LOSS buttons only.
  return null;
  try{
    let now = Date.now();
    // Scan all small visible elements for Profit/Loss/Result
    let els = document.querySelectorAll('div, span');
    for(let el of els){
      try{
        let txt = (el.innerText||'').trim();
        if(!txt || txt.length > 120 || txt.length < 4) continue;
        let low = txt.toLowerCase();
        // Lenient: Profit/Loss/Result/Payout + number - +/- na thakleo cholbe
        if(!(low.includes('profit') || low.includes('loss') || low.includes('result') || low.includes('payout') || low.includes('p/l') || low.includes('trade closed'))) continue;
        let r = el.getBoundingClientRect();
        if(r.width===0 || r.height===0 || r.width>400) continue;
        // Must have number with $ or number
        if(!txt.match(/\d+\.\d{2}/) && !txt.match(/\$\s*\d/)) continue;
        // Debounce: same text within 10s ignore
        if(txt === last_result_key && (now - last_result_ts) < 10000) continue;
        last_result_key = txt; last_result_ts = now;
        // Determine WIN/LOSS: red color / "loss" / "-$" / negative = LOSS
        let isLoss = false;
        let hasLossWord = low.includes('loss') || low.includes('lost');
        let hasProfitWord = low.includes('profit') && !hasLossWord;
        // Check color
        let style = window.getComputedStyle(el);
        let col = (style.color||'').toLowerCase();
        let isRed = col.includes('255, 45') || col.includes('244, 63') || col.includes('255, 0') || col.includes('red');
        let isGreen = col.includes('0, 255') || col.includes('34, 197') || col.includes('green');
        if(hasLossWord) isLoss = true;
        else if(isRed) isLoss = true;
        else if(txt.includes('-$') || txt.match(/-\s*\$?\s*\d+\.\d{2}/)) isLoss = true;
        else if(hasProfitWord && !txt.includes('-')) isLoss = false;
        else if(isGreen) isLoss = false;
        else if(txt.match(/\+\s*\$?\s*\d/)) isLoss = false;
        else {
          // Number sign check: -1.00 = loss, +1.00 = win
          let m = txt.match(/([+-])\s*\$?\s*(\d+\.\d{2})/);
          if(m) isLoss = (m[1] === '-');
          else continue; // ambiguous, skip
        }
        if(isLoss) register_loss('POPUP');
        else register_win('POPUP');
        return {type: isLoss?'LOSS':'WIN', text: txt};
      }catch(e){}
    }
  }catch(e){}
  return null;
}
let resultObserver = null;
function startResultObserver(){
  try{
    if(resultObserver) resultObserver.disconnect();
    // FIX: characterData + attributes o watch - Quotex same node er text change kore, new node add kore na
    resultObserver = new MutationObserver(()=>{
      setTimeout(()=>detectResultAdvanced(), 400);
      setTimeout(()=>checkBalanceChange(), 400);
    });
    resultObserver.observe(document.body, {childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:['class','style']});
  }catch(e){}
}
window.testLoss = ()=>{ register_loss('TEST'); };
window.testWin = ()=>{ register_win('TEST'); };
window.resetLossProtection = ()=>{ consecutive_losses=0; loss_count=0; last_loss_ts=0; localStorage.setItem('ghost_loss_count','0'); localStorage.setItem('ghost_consecutive_losses','0'); localStorage.setItem('ghost_last_loss_ts','0'); updateLossUI(); showToast('🔄 Reset','0/2 losses'); };
window.getLossStatus = ()=>{ return {consecutive: consecutive_losses, total: loss_count, protection: check_loss_protection()}; };

// ===== SMC + PA (same as your code, kept) =====
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
  if(h1>h2&&l1>l2) return {structure:"BULLISH_BOS",bias:"CALL",bos:true,reason:'BOS'};
  if(l1<l2&&h1<h2) return {structure:"BEARISH_BOS",bias:"PUT",bos:true,reason:'BOS'};
  return {structure:"RANGING",bias:"BOTH",bos:false,reason:"Ranging"};
}
function detectLiquidity(candles){
  if(candles.length<6) return {grab:false};
  let last=candles[candles.length-1];
  let prevHigh=Math.max(...candles.slice(-8,-1).map(c=>c.high));
  let prevLow=Math.min(...candles.slice(-8,-1).map(c=>c.low));
  if(last.high>prevHigh&&last.close<prevHigh&&last.upper/(last.body+0.00001)>1.2) return {grab:true,signal:"PUT",conf:88,reason:'Buy Liquidity sweep',is_trap:true,pa_type:"Liquidity Grab"};
  if(last.low<prevLow&&last.close>prevLow&&last.lower/(last.body+0.00001)>1.2) return {grab:true,signal:"CALL",conf:88,reason:'Sell Liquidity sweep',is_trap:true,pa_type:"Liquidity Grab"};
  return {grab:false};
}
function detectOrderBlock(candles){
  if(candles.length<6) return {ob:false};
  for(let i=candles.length-5;i>1;i--){
    if(candles[i].bear && i+3<candles.length){
      let c1=candles[i+1],c2=candles[i+2],c3=candles[i+3];
      if(c1.bull&&c2.bull&&(c1.body+c2.body)>candles[i].body*1.8&&c3.close>candles[i].high){
        let curr=candles[candles.length-1];
        if(candles[i].low<=curr.close&&curr.close<=candles[i].high) return {ob:true,signal:"CALL",conf:82,reason:'Bullish OB Retest',pa_type:"Order Block"};
      }
    }
    if(candles[i].bull && i+3<candles.length){
      let c1=candles[i+1],c2=candles[i+2],c3=candles[i+3];
      if(c1.bear&&c2.bear&&(c1.body+c2.body)>candles[i].body*1.8&&c3.close<candles[i].low){
        let curr=candles[candles.length-1];
        if(candles[i].low<=curr.close&&curr.close<=candles[i].high) return {ob:true,signal:"PUT",conf:82,reason:'Bearish OB Retest',pa_type:"Order Block"};
      }
    }
  }
  return {ob:false};
}
function detectFVG(candles){
  if(candles.length<4) return {fvg:false};
  for(let i=1;i<candles.length-1;i++){
    let c1=candles[i-1],c3=candles[i+1];
    if(c3.low>c1.high){ let curr=candles[candles.length-1]; if(c1.high<=curr.close&&curr.close<=c3.low) return {fvg:true,signal:"CALL",conf:78,reason:'Bullish FVG Fill',pa_type:"FVG"}; }
    if(c3.high<c1.low){ let curr=candles[candles.length-1]; if(c3.high<=curr.close&&curr.close<=c1.low) return {fvg:true,signal:"PUT",conf:78,reason:'Bearish FVG Fill',pa_type:"FVG"}; }
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
  return {signal:candles[candles.length-1].bull?"CALL":"PUT",conf:60,reason:struct.reason,pa_type:"Ranging",structure:struct,is_trap:false};
}

// ===== BOT LOGIC =====
let TOKEN="";try{
  // FIX: Token from 4 sources - window.GHOST_TOKEN (fetch+eval loader), script src (old loader), URL, localStorage (persisted)
  if(window.GHOST_TOKEN) TOKEN=window.GHOST_TOKEN;
  if(!TOKEN && window.__GHOST_TOKEN__) TOKEN=window.__GHOST_TOKEN__;
  if(!TOKEN){ let ss=document.getElementsByTagName('script'); for(let s of ss){ if(s.src&&s.src.includes('ghost.js')){ try{ let u=new URL(s.src); TOKEN=u.searchParams.get('token')||u.searchParams.get('access')||""; if(TOKEN) break; }catch(e){} } } }
  if(!TOKEN){ let up=new URLSearchParams(window.location.search); TOKEN=up.get('token')||up.get('access')||""; }
  if(!TOKEN){ try{ TOKEN=localStorage.getItem('ghost_premium_token')||""; }catch(e){} }
  if(TOKEN) localStorage.setItem('ghost_premium_token', TOKEN);
}catch(e){}
let currentSignal=null;let currentPair="GBPUSD";let priceHistory=[];let candleHistory=[];let lockedSignalId="";let lockedUntil=0;
function getCurrentMarket(){
  try{
    // FIX: Pair list khola thakle switch koro na - user list browse kortese
    if((document.body.innerText||"").includes("Select trade pair")) return currentPair;
    let valid=["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"];
    let all=document.querySelectorAll('div, span, button, a');
    // PASS 1: Selected pair button - bottom-left, Pair + % (e.g. GBP/JPY 66%) - eitai REAL selected pair
    // VIDEO 2 FIX: GBP/JPY / CAD/JPY thakleo bot EUR/JPY OTC dekhaito karon:
    // 1) Bottom button er children >4 hole skip hoye jaito (flag+pair+%+arrow = 5+)
    // 2) Sob div scan kore DOM order e lukano EUR/JPY OTC dhore felto
    // Fix: Bottom button er jonno children limit 12 porjonto allow, ar shudhu Pair+% wala element kei score dao
    let best=null; let bestScore=-1;
    for(let el of all){
      try{
        // FIX: Nijer bot er UI skip - nahole bot nijer EUR/JPY OTC kei market vabe lock hoye jay (SELF-LOCK bug)
        if(el.closest && el.closest('#ghost-bot')) continue;
        let txt=(el.innerText||'').trim();
        if(!txt || txt.length>40 || txt.toUpperCase().includes('GHOST')) continue;
        // Container div skip - kintu bottom button er children 12 porjonto allow (flag+pair+%+arrow)
        if(el.children && el.children.length>12) continue;
        let m=txt.match(/^([A-Z]{3})\s*\/\s*([A-Z]{3})/);
        if(!m) continue;
        let pair=(m[1]+m[2]).toUpperCase();
        if(!valid.includes(pair)) continue;
        let rect=el.getBoundingClientRect();
        if(rect.width===0 || rect.height===0 || rect.width>220) continue;
        let isOTC=txt.toUpperCase().includes('OTC');
        let hasPct=txt.includes('%');
        // VIDEO 2 FIX: Pair+% chara kono element kei best hisabe nio na - lukano EUR/JPY OTC er % thake na, tai o jitte parbe na
        // Bottom button e obossoi % thake (GBP/JPY 66%), tai shudhu hasPct wala kei consider koro
        if(!hasPct) continue;
        let score=0;
        // Selected pair button: niche (60-88% height), bam dik, % thake
        if(rect.top>window.innerHeight*0.60 && rect.top<window.innerHeight*0.88) score+=20;
        else if(rect.top>window.innerHeight*0.88) score-=20; // Bottom bar er niche (Buy/Sell button area) - pair na
        if(rect.left<window.innerWidth*0.45) score+=10;
        if(hasPct) score+=15;
        // Pair list er item gulo top e thake / popup e - tader score kom
        if(rect.top<window.innerHeight*0.40) score-=10;
        // Exact pair + % + OTC/Real - sobcheye choto, exact element ke bonus
        if(txt.length<20) score+=5;
        if(score>bestScore){ bestScore=score; best={pair: pair+(isOTC?'OTC':''), score: score}; }
      }catch(e){}
    }
    if(best && bestScore>=20) return best.pair;
    // PASS 2: Fallback - kono visible choto pair element (ghost-bot chara)
    for(let el of all){
      try{
        if(el.closest && el.closest('#ghost-bot')) continue;
        let txt=(el.innerText||'').trim();
        if(!txt || txt.length>20 || txt.toUpperCase().includes('GHOST')) continue;
        if(txt.match(/^[A-Z]{3}\/[A-Z]{3}/) && txt.includes('%')){
          let rect=el.getBoundingClientRect();
          if(rect.width===0 || rect.height===0) continue;
          if(rect.top>window.innerHeight*0.4){
            let m2=txt.match(/([A-Z]{3})\/([A-Z]{3})/);
            if(m2){ let pair=(m2[1]+m2[2]).toUpperCase(); if(!valid.includes(pair)) continue; let isOTC=txt.toUpperCase().includes('OTC'); if(isOTC) pair+='OTC'; return pair; }
          }
        }
      }catch(e){}
    }
  }catch(e){}
  return currentPair;
}
let pendingPair=""; let pendingPairSince=0;
function autoDetectMarket(){
  let newMarket=getCurrentMarket();
  if(!newMarket || newMarket===currentPair){ pendingPair=""; return currentPair; }
  // STABLE FIX: Lock thakle pair switch korbo na - nahole 1 sec por por UP/DOWN flip hoy (video te oita hoise)
  if(lockedSignalId && Date.now()<lockedUntil && currentSignal){ return currentPair; }
  // STABLE FIX: Pair change 2-bar consecutive same ashte hobe (1.6 sec stable) - DOM noise e 1-bar vul pair asle lock clear hobe na
  if(newMarket!==pendingPair){ pendingPair=newMarket; pendingPairSince=Date.now(); return currentPair; }
  if(Date.now()-pendingPairSince<1600) return currentPair;
  // 2-bar stable - ekhon switch
  pendingPair="";
  currentPair=newMarket; let mpEl=document.getElementById('gh-pair'); if(mpEl) mpEl.innerHTML=newMarket.replace('OTC',' OTC').replace(/([A-Z]{3})([A-Z]{3})/,'$1/$2')+'<small>GHOST AI</small>'; lockedSignalId=""; lockedUntil=0; currentSignal=null; fetchSignal(newMarket);
  return newMarket;
}
function getRealPrice(){
  // VIDEO 1 FIX: Age sob price label (1.32350, 1.32340...) er moddhe prothom ta return korto, tai candle flip korto.
  // Ekhon shudhu CURRENT price - blue highlight / bold / right side er sobcheye niche, active price.
  try{
    let best=null; let bestScore=-1;
    for(let el of document.querySelectorAll('div, span')){
      let txt=(el.innerText||"").trim();
      if(!/^\d+\.\d{3,5}$/.test(txt)) continue;
      let v=parseFloat(txt);if(v<0.3||v>250) continue;
      let r=el.getBoundingClientRect();
      if(r.width<20||r.width>100) continue;
      if(r.height<12||r.height>32) continue;
      if(r.left<window.innerWidth*0.65) continue;
      if(r.top<80||r.top>650) continue;
      // Current price er chin: background blue / bold / border, ba onno price er cheye alada style
      let st=getComputedStyle(el);
      let score=0;
      if(st && st.backgroundColor && st.backgroundColor!=='rgba(0, 0, 0, 0)' && st.backgroundColor!=='transparent') score+=20;
      if(st && parseInt(st.fontWeight||'400')>=700) score+=10;
      // Right side er sobcheye kacher (current price bar) - left sobcheye beshi
      score+= (r.left/window.innerWidth)*10;
      if(score>bestScore){ bestScore=score; best=txt; }
    }
    if(best) return best;
    // Fallback: ager logic (jodi current price na pai)
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
function showSTOP(){
  let sigEl=document.getElementById("gh-sig");let txtEl=document.getElementById("gh-txt");let reasonEl=document.getElementById("gh-reason");let arrowEl=document.getElementById("gh-arrow");let barEl=document.getElementById("gh-bar");let confEl=document.getElementById("gh-conf");let secEl=document.getElementById("gh-sec");
  let chk=check_loss_protection();
  if(sigEl&&txtEl){ sigEl.className="gh-sig off"; txtEl.textContent="⛔ OFF"; if(arrowEl) arrowEl.textContent="⛔"; if(reasonEl) reasonEl.textContent='2 Loss - '+chk.remaining+' min OFF - NO SIGNAL'; sigEl.style.background=""; }
  if(barEl) barEl.style.width='0%';
  if(confEl) confEl.textContent='OFF';
  if(secEl) secEl.textContent=chk.remaining+'m OFF';
  updateLossUI();
}
function updateUI(j){
  // FIX: 2 Loss = DIRECT OFF - kono signal na. updateUI teo protection check, nahole purano UP abar chole ashto (video te STOP <-> UP flicker)
  let prot0=check_loss_protection();
  if(!prot0.allowed){ showSTOP(); return; }
  let pairEl=document.getElementById("gh-pair");
  // VIDEO 1 FIX: Ghosting - pair same thakle innerHTML recreate koro na, nahole UP er upor DOWN ghost dekha jay
  if(pairEl){ let mTxt=(j.market||currentPair).replace(/([A-Z]{3})([A-Z]{3})/,'$1/$2').replace('OTC',' OTC'); let newHTML=mTxt+'<small>GHOST AI</small>'; if(pairEl.innerHTML!==newHTML) pairEl.innerHTML=newHTML; }
  let sigEl=document.getElementById("gh-sig");let txtEl=document.getElementById("gh-txt");let reasonEl=document.getElementById("gh-reason");let paEl=document.getElementById("gh-pa");
  let arrowEl=document.getElementById("gh-arrow");let barEl=document.getElementById("gh-bar");let confEl=document.getElementById("gh-conf");
  let dir=j.signal||j.direction;
  if(sigEl&&txtEl){
    // VIDEO 1 FIX: Ghosting - className same thakle re-set koro na, nahole animation restart hoye UP/DOWN ghost hoy
    let wantClass = (dir==="CALL"||dir==="UP") ? "gh-sig up" : (dir==="PUT"||dir==="DOWN") ? "gh-sig down" : "gh-sig wait";
    let wantTxt = (dir==="CALL"||dir==="UP") ? "▲ UP" : (dir==="PUT"||dir==="DOWN") ? "▼ DOWN" : "◉ WAIT";
    let wantArrow = (dir==="CALL"||dir==="UP") ? "▲" : (dir==="PUT"||dir==="DOWN") ? "▼" : "◉";
    if(sigEl.className!==wantClass){ sigEl.style.background=""; sigEl.style.backgroundImage=""; sigEl.style.boxShadow=""; sigEl.className=wantClass; }
    if(txtEl.textContent!==wantTxt) txtEl.textContent=wantTxt;
    if(arrowEl && arrowEl.textContent!==wantArrow) arrowEl.textContent=wantArrow;
    if(reasonEl){ let wantReason = (dir==="CALL"||dir==="UP"||dir==="PUT"||dir==="DOWN") ? (j.reason||"") : (j.reason||"Analyzing..."); if(reasonEl.textContent!==wantReason) reasonEl.textContent=wantReason; }
    if(false){ // old code kept for reference - not executed
    if(dir==="CALL"||dir==="UP"){ sigEl.className="gh-sig up"; txtEl.textContent="▲ UP"; if(arrowEl) arrowEl.textContent="▲"; if(reasonEl) reasonEl.textContent=j.reason||""; }
    else if(dir==="PUT"||dir==="DOWN"){ sigEl.className="gh-sig down"; txtEl.textContent="▼ DOWN"; if(arrowEl) arrowEl.textContent="▼"; if(reasonEl) reasonEl.textContent=j.reason||""; }
    else{ sigEl.className="gh-sig wait"; txtEl.textContent="◉ WAIT"; if(arrowEl) arrowEl.textContent="◉"; if(reasonEl) reasonEl.textContent=j.reason||"Analyzing..."; } }
    if(paEl) paEl.textContent=j.price_action_type||"Momentum";
    if(confEl) confEl.textContent=(j.confidence||0)+"% CONF";
    if(barEl){ let rem=j.expiry_timestamp?Math.max(0,Math.ceil((j.expiry_timestamp-Date.now())/1000)):0; let pct=rem>0?Math.max(4,(rem/60)*100):0; barEl.style.width=pct+'%'; }
  }
  updateLossUI();
}
function fetchSignal(forcePair){
  let now=Date.now();
  let prot=check_loss_protection();
  if(!prot.allowed){
    // FIX: DIRECT OFF - purano signal clear, nahole 500ms interval purano UP abar dekhaito
    currentSignal=null; lockedSignalId=""; lockedUntil=0;
    showSTOP();
    return;
  }
  if(lockedSignalId && now<lockedUntil && currentSignal){ updateUI(currentSignal); return; }
  let asset=forcePair||getCurrentMarket();
  if(!asset) asset=currentPair;
  if((document.body.innerText||"").includes("Select trade pair")) return;
  let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";
  if(TOKEN) url+="&token="+encodeURIComponent(TOKEN);
  fetch(url).then(r=>r.json()).then(j=>{
    if(!j) return;
    if(j.signal==="UP") j.signal="CALL";
    if(j.signal==="DOWN") j.signal="PUT";
    if(j.status==="EXPIRED"||j.status==="DELETED"||j.is_expired){
      if(TOKEN){ TOKEN=""; localStorage.removeItem('ghost_premium_token'); setTimeout(()=>fetchSignal(),1000); return; }
      return;
    }
    if(lockedSignalId && now<lockedUntil && currentSignal){ updateUI(currentSignal); return; }
    if(j.signal==="WAIT"||!j.signal||j.confidence<50){
      if(candleHistory.length>=6 && paEnabled){
        try{
          let pa=runPAFilter(candleHistory);
          if(pa && (pa.signal==="CALL"||pa.signal==="PUT") && pa.conf>=60){
            // STABLE FIX: PA signal er expiry = lock er sathe same (58s), nahole 500ms interval age clear kore flip hoy
            let fake={...pa,market:asset,pair:asset,confidence:pa.conf,expiry_timestamp:now+58000,signal_id:asset+"-PA-"+now,price_action_type:pa.pa_type||pa.reason,status:"ACTIVE"};
            lockedSignalId=fake.signal_id; lockedUntil=now+58000; currentSignal=fake; updateUI(fake); return;
          }
        }catch(e){}
      }
      // VIDEO 1 FIX: Momentum fallback REMOVE - last candle er upor fake UP/DOWN banaito, tai 1 sec por por flip hoto.
      // Server WAIT dile ekhon WAIT dekhabe, fake signal banabe na. PA signal (conf>=60) thakle sudhu ota use hobe.
      // Momentum fallback bondho - nahole candleHistory er vul price theke flip hoy.
      let waitSig={signal:"WAIT",confidence:0,reason:"Collecting data...",price_action_type:"Loading",market:asset,pair:asset,expiry_timestamp:now+5000,signal_id:"WAIT-"+now,status:"WAITING"};
      updateUI(waitSig); return;
    }
    if(j.status==="ACTIVE"&&(j.signal==="CALL"||j.signal==="PUT")){
      lockedSignalId=j.signal_id||(asset+"-"+j.signal+"-"+now); lockedUntil=now+58000; currentSignal=j; updateUI(j);
    }
  }).catch(()=>{});
}
setInterval(()=>{
  let rp=getRealPrice();
  if(rp){ let v=parseFloat(rp); if(v){ priceHistory.push(v); if(priceHistory.length>50) priceHistory.shift(); if(priceHistory.length>=4){ let o=priceHistory[priceHistory.length-4]; let c=priceHistory[priceHistory.length-1]; let h=Math.max(...priceHistory.slice(-4)); let l=Math.min(...priceHistory.slice(-4)); candleHistory.push(new Candle(o,h,l,c)); if(candleHistory.length>100) candleHistory.shift(); } } }
},1000);
setInterval(()=>{
  // FIX: 2 Loss = DIRECT OFF - interval eo protection check, nahole STOP er majhe UP flicker hoto
  let protI=check_loss_protection();
  if(!protI.allowed){ showSTOP(); return; }
  // STABLE FIX: Lock thakle autoDetectMarket call korbo na - lock clear hoye flip hoy
  if(!(lockedSignalId && Date.now()<lockedUntil && currentSignal)) autoDetectMarket();
  if(!currentSignal){ let secEl=document.getElementById("gh-sec"); if(secEl){let sec=60-new Date().getSeconds();if(sec===60) sec=0;secEl.textContent=sec+"s";} return; }
  let rem=Math.max(0,Math.ceil((currentSignal.expiry_timestamp-Date.now())/1000));
  let secEl=document.getElementById("gh-sec");if(secEl) secEl.textContent=rem+"s";
  if(rem<=0){ currentSignal=null; lockedSignalId=""; lockedUntil=0; } else updateUI(currentSignal);
},500);
setInterval(()=>{ if(!(lockedSignalId && Date.now()<lockedUntil && currentSignal)) autoDetectMarket(); },1500);
setInterval(()=>fetchSignal(),3000);
setInterval(()=>{ detectResultAdvanced(); checkBalanceChange(); },1000);
startResultObserver();
setTimeout(startResultObserver,2000);
updateLossUI();
fetchSignal();
autoDetectMarket();

}catch(e){
  console.error('GHOST BOT ERROR:', e);
  try{
    let errBox = document.getElementById('ghost-bot');
    if(!errBox){
      errBox = document.createElement('div');
      errBox.id = 'ghost-bot';
      errBox.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:208px;background:#111;color:#fff;padding:10px;border-radius:12px;text-align:center;font-family:sans-serif;font-size:11px;border:1px solid #00f0ff';
      errBox.innerHTML = '<b>GHOST AI</b><br>Error: '+e.message+'<br><small>Bookmarklet abar tap koro</small>';
      document.body.appendChild(errBox);
    }
  }catch(e2){}
}
// FORCE SHOW - 1 sec por o jodi bot na thake, abar banau
setTimeout(function(){
  try{
    let b = document.getElementById('ghost-bot');
    if(!b){
      console.log('GHOST BOT NOT FOUND - FORCE CREATING');
      let nb = document.createElement('div');
      nb.id = 'ghost-bot';
      nb.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:208px;background:#111;color:#fff;padding:10px;border-radius:12px;text-align:center;font-family:sans-serif;font-size:11px;border:1px solid #00f0ff';
      nb.innerHTML = '<b>GHOST AI</b><br>LOADING...<br><small>Render wake up hocche, 10s wait koro</small>';
      document.body.appendChild(nb);
    } else {
      b.style.display = 'block';
      b.style.visibility = 'visible';
      b.style.opacity = '1';
      console.log('👻 GHOST BOT SHOWING ON CHART');
    }
  }catch(e){}
}, 1000);
})();
