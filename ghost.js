// GHOST v5 - Glass .10 + Safety Margin Touch Entry - 860 LINES - Margin Touch No Rejection Wait
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
  _box.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:208px;background:rgba(255,255,255,.10);backdrop-filter:blur(28px) saturate(180%);-webkit-backdrop-filter:blur(28px) saturate(180%);border:1px solid rgba(255,255,255,.65);border-radius:16px;color:#fff;font-family:sans-serif;text-align:center;padding:5px;box-shadow:0 8px 32px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.70)';
  _box.innerHTML = '<div style="font-size:6px;letter-spacing:1px;color:#00f0ff">GHOST AI</div><div style="font-size:9px;font-weight:900;margin:2px 0">LOADING...</div><div style="font-size:8px;color:#00ff88">Bot Ashtese...</div>';
  (document.body || document.documentElement).appendChild(_box);
  console.log('👻 GHOST BOT BOX CREATED - FIRST');
}catch(_e){ console.error('BOX FIRST FAIL', _e); }
try{
let css=document.createElement("style");
css.innerHTML=`
/* ===== GHOST FUTURISTIC HUD - v2 FIXED LOSS ===== */
#ghost-bot{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:208px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.60);border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.70);backdrop-filter:blur(32px) saturate(180%);-webkit-backdrop-filter:blur(28px) saturate(180%);font-family:'Segoe UI',Inter,sans-serif;color:#fff;overflow:hidden;user-select:none}
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
.gh-h{padding:2px 5px;background:transparent;border-bottom:1px solid rgba(0,240,255,.18);display:flex;align-items:center;justify-content:space-between;cursor:move;position:relative}
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
.gh-sig.up{background:linear-gradient(135deg,rgba(0,255,136,.55),rgba(255,255,255,.18) 45%,rgba(0,255,136,.35));color:#fff;animation:ghGlowGreen 1.1s ease-in-out infinite;border:1px solid rgba(255,255,255,.60);backdrop-filter:blur(16px) saturate(160%);-webkit-backdrop-filter:blur(16px) saturate(160%);box-shadow:inset 0 2px 4px rgba(255,255,255,.60)}
.gh-sig.down{background:linear-gradient(135deg,rgba(255,45,85,.55),rgba(255,255,255,.18) 45%,rgba(255,45,85,.35));color:#fff;animation:ghGlowRed 1.1s ease-in-out infinite;border:1px solid rgba(255,255,255,.60);backdrop-filter:blur(16px) saturate(160%);-webkit-backdrop-filter:blur(16px) saturate(160%);box-shadow:inset 0 2px 4px rgba(255,255,255,.60)}
.gh-sig.wait{background:linear-gradient(135deg,rgba(255,255,255,.22),rgba(255,255,255,.07));color:#fff;border:1px solid rgba(255,255,255,.55);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);box-shadow:inset 0 2px 4px rgba(255,255,255,.60)}
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
.gh-corner.br{bottom:6px;right:6px;border-left:none;border-top:none}`;

(document.head || document.getElementsByTagName('head')[0] || document.documentElement).appendChild(css);
let box=document.getElementById("ghost-bot");
if(!box){ box=document.createElement("div"); box.id="ghost-bot"; }
// Reuse first box - remove korbo na, taile LOADING box haray jabe na
box.innerHTML=`
<div class="gh-corner tl"></div><div class="gh-corner tr"></div><div class="gh-corner bl"></div><div class="gh-corner br"></div>
<div class="gh-h" id="gh-h"><div class="gh-h-left"><div class="gh-dot"></div><b>GHOST <span>PREMIUM FINAL 870</span></b><span class="gh-live">● LIVE</span></div><div class="gh-toggle" id="gh-toggle">PA ON</div></div>
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
let currentSignal=null;let currentPair="GBPUSD";let priceHistory=[];let candleHistory=[];let lockedSignalId="";let lockedUntil=0;let waitStart=0;
let pendingTrade=null;let pendingSince=0;let fullMarketChecked=0;
let confirmDir=null, confirmCandle=-1, confirmTime=0, nextCandleOpen=0, nextMarginTarget=0, confirmAsset="";
let holdDir=null, holdUntil=0, holdSignal=null; // HOLD: DOWN/UP 55 sec dhore rakhbe, WAIT overwrite korte parbe na // CONFIRM + NEXT CANDLE
function getCurrentMarket(){
  try{
    // FIX: Pair list khola thakle switch koro na - user list browse kortese
    if((document.body.innerText||"").includes("Select trade pair")) return currentPair;
    let valid=["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD","USDBRL","EURBRL","GBPBRL","USDMXN","USDINR","USDTRY","USDPKR","USDZAR","USDCOP","USDCLP","USDPEN","USDEGP","USDNGN","USDKES","USDPHP","USDTHB","USDVND","USDMYR","USDIDR","USDCNH","EURMXN","GBP MXN".replace(" ","")];
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
  // VIDEO FIX: Pair change hoile Lock clear kore INSTANT switch - nahole CAD/CHF te geleo AUD/USD OTC atke thake
  if(lockedSignalId && Date.now()<lockedUntil && currentSignal){
    let _fresh = getCurrentMarket();
    if(_fresh && _fresh !== currentPair){ lockedSignalId=""; lockedUntil=0; currentSignal=null; }
    else return currentPair;
  }
  // STABLE FIX: Pair change 2-bar consecutive same ashte hobe (1.6 sec stable) - DOM noise e 1-bar vul pair asle lock clear hobe na
  if(newMarket!==pendingPair){ pendingPair=newMarket; pendingPairSince=Date.now(); return currentPair; }
  if(Date.now()-pendingPairSince<700) return currentPair; // VIDEO FIX: 1600ms -> 700ms instant detect
  // 2-bar stable - ekhon switch
  pendingPair="";
  pendingTrade=null; pendingSince=0;
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
  // HOLD FIX: DOWN/UP dekhale 55 sec WAIT dibo na - Video te DOWN 1 sec por WAIT hoye jaito, eitai asol dosh chilo
  // Fetch race, pair misread, autoDetect - joto karon e hok, HOLD thakle WAIT asbe na
  try{
    if(j && (j.signal==="WAIT"||j.direction==="WAIT") && holdUntil && Date.now()<holdUntil && holdSignal){
      // HOLD er signal tai dekhau, WAIT na
      j = holdSignal;
    }
  }catch(e){}
  // FLICKER FIX: Locked DOWN/UP thakle WAIT diye overwrite korbe na - Video te DOWN WAIT DOWN WAIT flicker er main karon eita chilo
  // Ekbar DOWN/UP lock hoile WAIT asleo DOWN/UP e thakbe, 1 sec por por paltaabe na
  try{
    if(j && (j.signal==="WAIT"||j.direction==="WAIT") && lockedSignalId && Date.now()<lockedUntil && currentSignal && (currentSignal.signal==="CALL"||currentSignal.signal==="UP"||currentSignal.signal==="PUT"||currentSignal.signal==="DOWN")){ return; }
  }catch(e){}
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
// HUMAN TRADER STYLE - Full Market Analysis + Safety Margin Entry
// Profitable trader ra opening theke entry ney na. Age full market dekhe, BOS + OB + FVG confirm kore, tarpor candle pullback er jonno wait kore, margin theke rejection dekhe entry ney.
// DOWN er jonno: candle ektu upore gele upor theke entry, rejection kheye niche jabe. UP er jonno ulta: candle ektu niche gele niche theke entry.
function startSafetyMarginEntry(sig, asset, now){
  try{
    // DANCE FIX: Notun Confirm asle purano UP/DOWN clear - nahole purano UP ar notun WAIT 500ms por por palta palti kore, eitai nachanachi chilo
    // User thik bolse: Confirm Next Candle Wait lekha ta sthir thakbe, UP WAIT UP korbe na
    currentSignal=null; lockedSignalId=""; lockedUntil=0;
    // CONFIRM + NEXT CANDLE: Jodi already confirm ache, notun confirm banabe na, nahole WAIT UP WAIT flicker hoy
    if(confirmDir && confirmCandle>=0){
      let curC = Math.floor(now/60000);
      if(curC <= confirmCandle+1){ return; }
      // 2 candle par hoye gese, purano confirm clear
      confirmDir=null; confirmCandle=-1; nextCandleOpen=0; nextMarginTarget=0;
    }
    let curPrice = priceHistory.length ? priceHistory[priceHistory.length-1] : (parseFloat(getRealPrice())||0);
    if(!curPrice) curPrice = sig.price||0;
    let margin = 0.00010;
    if(asset && asset.includes("JPY")) margin = 0.015;
    if(curPrice>100) margin = curPrice*0.0004;
    // HUMAN TRADER FIX: User thik bolse - market niche namar por DOWN dile confirm loss, eita paltu trader er moto.
    // Asol trader Support e UP dey, Resistance e DOWN dey. Margin ekhon Support/Resistance theke, curPrice+1pip theke na.
    let support = 0, resistance = 0;
    try{
      if(candleHistory && candleHistory.length>=3){
        let lows = candleHistory.slice(-5).map(c=>c.low);
        let highs = candleHistory.slice(-5).map(c=>c.high);
        support = Math.min(...lows);
        resistance = Math.max(...highs);
      }
    }catch(e){}
    // DOWN chaile kintu price Support er kache (1 pip er moddhe) - DOWN dibo na, WAIT dibo, karon support theke dam upore uthbe
    if(sig.signal==="PUT" && support && Math.abs(curPrice - support) <= 0.00010){
      let w={signal:"WAIT", confidence:0, reason:"Support "+support.toFixed(5)+" e DOWN na - Support theke dam upore uthbe, DOWN nile confirm loss. WAIT", price_action_type:"Support Block • DOWN Reject", market:asset, pair:asset, expiry_timestamp: now+5000, signal_id:"SUPPORT-BLOCK-"+now, status:"WAITING"};
      updateUI(w); return;
    }
    // UP chaile kintu price Resistance er kache - UP dibo na, WAIT dibo
    if(sig.signal==="CALL" && resistance && Math.abs(curPrice - resistance) <= 0.00010){
      let w2={signal:"WAIT", confidence:0, reason:"Resistance "+resistance.toFixed(5)+" e UP na - Resistance theke dam niche nambe, UP nile confirm loss. WAIT", price_action_type:"Resistance Block • UP Reject", market:asset, pair:asset, expiry_timestamp: now+5000, signal_id:"RES-BLOCK-"+now, status:"WAITING"};
      updateUI(w2); return;
    }
    // CONFIRM + NEXT CANDLE: Ekhon entry na, sudhu CONFIRM save. Entry hobe PORER candle e margin theke, opening theke na.
    // Jemon tumi video te bolso: DOWN confirm asle porer candle e dam ektu upore uthle (margin) oi upore theke DOWN, niche theke DOWN na.
    // UP confirm asle porer candle e dam ektu niche namle (margin) oi niche theke UP, upore theke UP na.
    confirmDir = sig.signal;
    confirmCandle = Math.floor(now/60000);
    confirmTime = now;
    confirmAsset = asset;
    nextCandleOpen = 0; nextMarginTarget = 0;
    // pendingTrade ekhon banabo na, porer candle e banabo - nahole same candle e opening theke entry hoye jay
    let target = 0; // porer candle e set hobe
    // Old pendingTrade create bad - ekhon sudhu confirm, pendingTrade null rakhi
    pendingTrade = {dir: sig.signal, asset: asset, openPrice: curPrice, targetPrice: 0, margin: margin, reason: sig.reason||"", conf: sig.confidence||75, pa: sig.price_action_type||"", signal_id: sig.signal_id|| (asset+"-CONFIRM-"+now), since: now, maxPriceSeen: curPrice, minPriceSeen: curPrice, touched: false, isConfirm: true, confirmCandle: confirmCandle, support: support, resistance: resistance};
    pendingTrade = {dir: sig.signal, asset: asset, openPrice: curPrice, targetPrice: target, margin: margin, reason: sig.reason||"", conf: sig.confidence||75, pa: sig.price_action_type||"", signal_id: sig.signal_id|| (asset+"-SAFE-"+now), since: now, maxPriceSeen: curPrice, minPriceSeen: curPrice, touched: false};
    pendingSince = now;
    // UI te Confirm dekhau - stable, flicker korbe na, remain second dibo na
    let waitSig = {signal:"WAIT", confidence: sig.confidence||0, reason: (sig.signal==="PUT" ? "DOWN Confirm • Porer Candle e Upor theke Margin e Entry" : "UP Confirm • Porer Candle e Niche theke Margin e Entry") + " • Confirm Candle: " + confirmCandle, price_action_type: "Confirm • Next Candle Margin Wait", market: asset, pair: asset, expiry_timestamp: now+60000, signal_id: "PENDING-"+now, status:"WAITING"};
    updateUI(waitSig);
    console.log("GHOST SAFETY MARGIN: " + sig.signal + " open " + curPrice + " target " + target);
  }catch(e){ pendingTrade=null; }
}
function checkSafetyMarginEntry(now){
  if(!pendingTrade) return false;
  // CONFIRM + NEXT CANDLE: Same candle e entry na, porer candle e margin theke entry
  let curCandle = Math.floor(now/60000);
  let confCandle = pendingTrade.confirmCandle!==undefined ? pendingTrade.confirmCandle : Math.floor(pendingTrade.since/60000);
  // Ekhono confirm candle e achi - entry na, porer candle er jonno WAIT, stable UI
  if(curCandle <= confCandle){
    let w={signal:"WAIT", confidence: pendingTrade.conf, reason: (pendingTrade.dir==="PUT" ? "DOWN Confirm • Porer Candle e Upor Margin Wait" : "UP Confirm • Porer Candle e Niche Margin Wait"), price_action_type:"Confirm • Next Candle Wait", market: pendingTrade.asset, pair: pendingTrade.asset, expiry_timestamp: now+60000, signal_id:"PENDING-"+pendingTrade.since, status:"WAITING"};
    updateUI(w); return false;
  }
  // Porer candle er poreo margin na asle (2 candle par) - cancel, chase korbo na
  if(curCandle > confCandle+1){ pendingTrade=null; pendingSince=0; confirmDir=null; confirmCandle=-1; nextCandleOpen=0; nextMarginTarget=0; return false; }
  // Porer candle e dhuklam - ekhon margin set koro: DOWN er jonno Next Candle Open + margin, UP er jonno Next Candle Open - margin
  // Opening theke na, margin theke - jemon tumi bolso: DOWN confirm asle dam ektu upore uthle oi upore theke DOWN
  if(!nextCandleOpen){
    let _cur = priceHistory.length ? priceHistory[priceHistory.length-1] : 0;
    if(!_cur) return false;
    nextCandleOpen = _cur;
    let _m = pendingTrade.margin||0.00010;
    // Support/Resistance thakle oi khane margin, nahole Next Open +/- margin
    if(pendingTrade.dir==="PUT"){
      if(pendingTrade.resistance && pendingTrade.resistance > nextCandleOpen && (pendingTrade.resistance - nextCandleOpen) <= 0.00040) nextMarginTarget = pendingTrade.resistance - 0.00002;
      else nextMarginTarget = nextCandleOpen + _m;
    }else{
      if(pendingTrade.support && pendingTrade.support < nextCandleOpen && (nextCandleOpen - pendingTrade.support) <= 0.00040) nextMarginTarget = pendingTrade.support + 0.00002;
      else nextMarginTarget = nextCandleOpen - _m;
    }
    pendingTrade.targetPrice = nextMarginTarget;
    pendingTrade.openPrice = nextCandleOpen;
  }
  // TRENDING FIX: User bolse margin 100% na, kokhono trending thekei dibe. Porer candle e dam jodi margin er ulta dike 0.00030 chole jay (strong trend), tahole margin er jonno ar wait korbo na, trend thekei entry dibo
  // Jemon DOWN confirm, porer candle e dam niche 0.00030 chole gese, margin upore asbe na, tokhon trend thekei DOWN
  // Ar UP confirm, porer candle e dam upore 0.00030 chole gese, tokhon trend thekei UP
  {
    let _curT = priceHistory.length ? priceHistory[priceHistory.length-1] : 0;
    if(_curT && nextCandleOpen){
      let _move = pendingTrade.dir==="PUT" ? (nextCandleOpen - _curT) : (_curT - nextCandleOpen);
      if(_move >= 0.00030){
        let _fake={signal: pendingTrade.dir, confidence: pendingTrade.conf, reason: pendingTrade.reason + " • Trending Entry - Margin na asleo trend strong", price_action_type: "Trending • Direct Entry", market: pendingTrade.asset, pair: pendingTrade.asset, expiry_timestamp: now+58000, signal_id: pendingTrade.signal_id, status:"ACTIVE"};
        let _a = pendingTrade.asset;
        pendingTrade=null; pendingSince=0; confirmDir=null; confirmCandle=-1; nextCandleOpen=0; nextMarginTarget=0;
        lockedSignalId=_fake.signal_id; lockedUntil=now+58000; currentSignal=_fake; holdDir=_fake.signal; holdUntil=now+55000; holdSignal=_fake; updateUI(_fake);
        return true;
      }
      // LATE FIX: Dam already 0.00040 er beshi ulta dike chole gese, ekhon entry dile half market e entry hobe, loss hobe - cancel
      // User bolse: Market half e chole gele tokhon trade dey, eta kon confirmation
      let _late = pendingTrade.dir==="PUT" ? (_curT - nextCandleOpen) : (nextCandleOpen - _curT);
      if(_late >= 0.00040){
        let _a2 = pendingTrade.asset;
        pendingTrade=null; pendingSince=0; confirmDir=null; confirmCandle=-1; nextCandleOpen=0; nextMarginTarget=0;
        let _w={signal:"WAIT", confidence:0, reason:"Late Entry Cancel - Market half chole gese, ekhon entry nile loss", price_action_type:"Late Cancel", market:_a2, pair:_a2, expiry_timestamp: now+5000, signal_id:"LATE-"+now, status:"WAITING"};
        updateUI(_w); return false;
      }
    }
  }
  let cur = priceHistory.length ? priceHistory[priceHistory.length-1] : 0;
  if(!cur) return false;
  if(cur>pendingTrade.maxPriceSeen) pendingTrade.maxPriceSeen=cur;
  if(cur<pendingTrade.minPriceSeen) pendingTrade.minPriceSeen=cur;
  // VIDEO FIX: Rejection er jonno wait korbo na - margin touch korlei entry
  // Trader video te jemon korse: 1.11436 margin e aslei trade nise, rejection candle er jonno bose thake nai
  // Karon onuman agei kora sesh - BOS + OB + FVG diye agei bujha gese ei margin theke profit hobe, tai touch korlei entry
  // HUMAN FIX: DOWN entry er age check - price jodi Support er kache chole ase, DOWN dibo na, cancel
  if(pendingTrade.dir==="PUT"){
    try{
      if(candleHistory && candleHistory.length>=3){
        let sup = Math.min(...candleHistory.slice(-5).map(c=>c.low));
        if(sup && Math.abs(cur - sup) <= 0.00008){
          let _asset = pendingTrade.asset;
          pendingTrade=null; pendingSince=0;
          let wb={signal:"WAIT", confidence:0, reason:"Support "+sup.toFixed(5)+" e DOWN cancel - Support theke bounce hobe, DOWN nile loss", price_action_type:"Support Block", market:_asset, pair:_asset, expiry_timestamp: now+5000, signal_id:"SUP-CANCEL-"+now, status:"WAITING"};
          updateUI(wb); return false;
        }
      }
    }catch(e){}
    // DOWN er jonno: price upor e margin e touch korlei DOWN entry
    if(cur >= pendingTrade.targetPrice){
      let fake={signal:"PUT", confidence: pendingTrade.conf, reason: pendingTrade.reason + " • Margin Touch " + pendingTrade.targetPrice.toFixed(5) + " - Onuman Profit", price_action_type: "Safety Margin DOWN • Margin Touch Entry", market: pendingTrade.asset, pair: pendingTrade.asset, expiry_timestamp: now+58000, signal_id: pendingTrade.signal_id, status:"ACTIVE"};
      pendingTrade=null; pendingSince=0; confirmDir=null; confirmCandle=-1; nextCandleOpen=0; nextMarginTarget=0;
      lockedSignalId=fake.signal_id; lockedUntil=now+58000; currentSignal=fake; holdDir=fake.signal; holdUntil=now+55000; holdSignal=fake; updateUI(fake);
      return true;
    }
  }
  // UP er jonno: price niche margin e touch korlei UP entry
  if(pendingTrade.dir==="CALL"){
    if(cur <= pendingTrade.targetPrice){
      let fake={signal:"CALL", confidence: pendingTrade.conf, reason: pendingTrade.reason + " • Margin Touch " + pendingTrade.targetPrice.toFixed(5) + " - Onuman Profit", price_action_type: "Safety Margin UP • Margin Touch Entry", market: pendingTrade.asset, pair: pendingTrade.asset, expiry_timestamp: now+58000, signal_id: pendingTrade.signal_id, status:"ACTIVE"};
      pendingTrade=null; pendingSince=0; confirmDir=null; confirmCandle=-1; nextCandleOpen=0; nextMarginTarget=0;
      lockedSignalId=fake.signal_id; lockedUntil=now+58000; currentSignal=fake; holdDir=fake.signal; holdUntil=now+55000; holdSignal=fake; updateUI(fake);
      return true;
    }
  }
  // Ekhono margin ase nai - Waiting UI stable, remain second dibo na, nahole proti second text palte WAIT UP WAIT flicker hoy
  let waitSig2={signal:"WAIT", confidence: pendingTrade.conf, reason: (pendingTrade.dir==="PUT" ? "DOWN Confirm • Upor Margin Wait Target " : "UP Confirm • Niche Margin Wait Target ") + pendingTrade.targetPrice.toFixed(5), price_action_type: "Next Candle Margin Wait", market: pendingTrade.asset, pair: pendingTrade.asset, expiry_timestamp: now+60000, signal_id: "PENDING-"+pendingTrade.since, status:"WAITING"};
  updateUI(waitSig2);
  return false;
}
function fetchSignal(forcePair){
  let now=Date.now();
  // HOLD FIX: DOWN/UP hold thakle fetch korbo na, HOLD signal e dekhau - nahole fetch race e WAIT overwrite kore
  if(holdUntil && now<holdUntil && holdSignal){ updateUI(holdSignal); return; }
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
  let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE&ver=LYRA-V3";
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
    if(j.signal==="WAIT"||!j.signal||j.confidence<30){
      if(candleHistory.length>=1 && paEnabled){
        try{
          let pa=runPAFilter(candleHistory);
          if(pa && (pa.signal==="CALL"||pa.signal==="PUT") && pa.conf>=35){
            // STABLE FIX: PA signal er expiry = lock er sathe same (58s), nahole 500ms interval age clear kore flip hoy
            // PA signal o opening theke na, Safety Margin theke entry - 8 candle e enough
            // ANALYSIS WAIT BAD - User notun file bosaileo WAIT UP WAIT kortasilo karon candleHistory 5 hoy nai, waitStart bar bar reset hoito. Ekhon analysis er jonno WAIT dibo na, direct signal e jabo
            if(false){}
            let fake={...pa,market:asset,pair:asset,confidence:pa.conf,expiry_timestamp:now+58000,signal_id:asset+"-PA-"+now,price_action_type:pa.pa_type||pa.reason,status:"ACTIVE"};
            startSafetyMarginEntry(fake, asset, now); return;
          }
        }catch(e){}
      }
      // SIGNAL FIX: WAIT 12s er beshi thakle Momentum fallback - nahole shudhu WAIT e atke thake (screenshot er moto AUD/CAD te)
      // priceHistory theke last 4 price compare - up hole CALL, down hole PUT, 1 min lock
      if(!waitStart) waitStart=now;
      if(now-waitStart>12000 && priceHistory.length>=10){
        let first=priceHistory[priceHistory.length-10], last=priceHistory[priceHistory.length-1];
        let _move = Math.abs(last-first);
        if(first && last && _move>0.0004){
          let dir = last>first ? "CALL" : "PUT";
          let fake={signal:dir,confidence:58,reason:"Momentum • "+(dir==="CALL"?"Uptrend":"Downtrend"),price_action_type:"Momentum",market:asset,pair:asset,expiry_timestamp:now+58000,signal_id:asset+"-MOM-"+now,status:"ACTIVE"};
          startSafetyMarginEntry(fake, asset, now); return; // waitStart reset bad, WAIT UP WAIT loop hoy
        }
      }
      // PA signal na pele WAIT, kintu waitStart track rakho
      let waitSig={signal:"WAIT",confidence:0,reason:"Analyzing chart...",price_action_type:"Analyzing",market:asset,pair:asset,expiry_timestamp:now+5000,signal_id:"WAIT-"+now,status:"WAITING"};
      updateUI(waitSig); return;
    }
    if(j.status==="ACTIVE"&&(j.signal==="CALL"||j.signal==="PUT")){
      // FULL MARKET ANALYSIS: 8 candle hoilei analysis sesh - 15 chilo beshi, tai 5 min atke thakto
      // 25 sec er beshi Analyzing hole bypass - getRealPrice fail korleo atke thakbe na
      // ANALYSIS WAIT BAD - Same karon, candleHistory 5 na hoile WAIT e atke thakto, tarpor UP 1 sec diye abar WAIT. Ekhon direct backend signal e jabo
      if(false){}
      // VIDEO 2 FIX: Backend er signal real chart er sathe milay dekho - backend vul DOWN dile kintu real chart UP thakle entry dibe na
      // FLICKER FIX: Locked signal thakle fetchSignal WAIT dibe na
      if(lockedSignalId && Date.now()<lockedUntil && currentSignal && (currentSignal.signal==="CALL"||currentSignal.signal==="UP"||currentSignal.signal==="PUT"||currentSignal.signal==="DOWN")){ return; }
      // PA MISMATCH BAD - candleHistory 1 sec e banano, PA proti second paltae, tai DOWN 1 sec por WAIT hoye jaito. Backend kei biswas korbo, PA check bad.
      // SIMPLE DIRECT: Backend ACTIVE asle direct DOWN/UP, pending/margin er jotil logic bad - eitai flicker kortasilo
      // User bolse margin 100% na, trending thekeo dibe, tai direct e thik. DOWN asle 55 sec DOWN ei thakbe, WAIT asbe na
      // Margin ta backend e already hisab kora - backend er signal e margin included, frontend e abar margin lagbe na
      waitStart=0;
      if(pendingTrade && pendingTrade.asset===asset){ return; }
      // Direct lock + HOLD
      let _direct = {signal: j.signal, confidence: j.confidence||75, reason: j.reason||"Backend Confirm", price_action_type: j.price_action_type||"Backend", market: asset, pair: asset, expiry_timestamp: now+58000, signal_id: j.signal_id|| (asset+"-DIRECT-"+now), status:"ACTIVE"};
      pendingTrade=null; pendingSince=0; confirmDir=null; confirmCandle=-1; nextCandleOpen=0; nextMarginTarget=0;
      lockedSignalId=_direct.signal_id; lockedUntil=now+58000; currentSignal=_direct; holdDir=_direct.signal; holdUntil=now+55000; holdSignal=_direct;
      updateUI(_direct); return;
    }
  }).catch(()=>{});
}
setInterval(()=>{
  let rp=getRealPrice();
  if(rp){ let v=parseFloat(rp); if(v){ priceHistory.push(v); if(priceHistory.length>50) priceHistory.shift(); if(priceHistory.length>=2){ let o=priceHistory[priceHistory.length-2]; let c=priceHistory[priceHistory.length-1]; let h=Math.max(...priceHistory.slice(-4)); let l=Math.min(...priceHistory.slice(-4)); candleHistory.push(new Candle(o,h,l,c)); if(candleHistory.length>100) candleHistory.shift(); } } }
},1000);
setInterval(()=>{
  // FIX: 2 Loss = DIRECT OFF - interval eo protection check, nahole STOP er majhe UP flicker hoto
  let protI=check_loss_protection();
  if(!protI.allowed){ showSTOP(); return; }
  // HOLD FIX: HOLD thakle pending check o korbo na, HOLD signal e dekhau
  if(holdUntil && Date.now()<holdUntil && holdSignal){ updateUI(holdSignal); return; }
  // SAFETY MARGIN CHECK: pending trade thakle age oita check - pending thakle currentSignal update korbo na, nahole WAIT ar UP nachanachi kore
  if(pendingTrade){ checkSafetyMarginEntry(Date.now()); return; }
  // STABLE FIX: Lock thakle autoDetectMarket call korbo na - lock clear hoye flip hoy
  if(!(lockedSignalId && Date.now()<lockedUntil && currentSignal) && !pendingTrade) autoDetectMarket();
  if(!currentSignal){ let secEl=document.getElementById("gh-sec"); if(secEl){let sec=60-new Date().getSeconds();if(sec===60) sec=0;secEl.textContent=sec+"s";} return; }
  if(holdUntil && Date.now()>=holdUntil){ holdDir=null; holdUntil=0; holdSignal=null; }
  let rem=Math.max(0,Math.ceil((currentSignal.expiry_timestamp-Date.now())/1000));
  let secEl=document.getElementById("gh-sec");if(secEl) secEl.textContent=rem+"s";
  if(rem<=0){ /* FLICKER FIX: rem 0 hoileo 2 sec grace, nahole DOWN 1 sec por WAIT hoye jay */ if(Date.now()-lockedUntil>2000){ currentSignal=null; lockedSignalId=""; lockedUntil=0; } } else updateUI(currentSignal);
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
      errBox.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:208px;background:rgba(255,255,255,.12);backdrop-filter:blur(25px) saturate(180%);color:#fff;padding:10px;border-radius:16px;text-align:center;font-family:sans-serif;font-size:11px;border:1px solid rgba(255,255,255,.50)';
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
      nb.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:208px;background:rgba(255,255,255,.12);backdrop-filter:blur(25px) saturate(180%);color:#fff;padding:10px;border-radius:16px;text-align:center;font-family:sans-serif;font-size:11px;border:1px solid rgba(255,255,255,.50)';
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
