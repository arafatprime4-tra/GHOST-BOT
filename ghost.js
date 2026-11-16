// GHOST CLEAN - FINAL 200 - 1 Barei Thik - No Patch, New Clean File
// Purano jotil file e patch dite dite flicker hoito, tai ekdom notun clean file
// Logic: Backend ACTIVE -> DOWN/UP 55 sec lock, WAIT -> WAIT. Ar kichu na. No PA, No Margin, No Confirm, No Pending.
(function(){
try{
// 1. PURANO BOT MARO - 2 ta bot ek sathe cholle DOWN WAIT DOWN WAIT hoy
try{
  for(let i=1;i<2000;i++){ try{clearInterval(i); clearTimeout(i);}catch(e){} }
  let _old=document.getElementById('ghost-bot'); if(_old) _old.remove();
  // Old bot er interval ID gulo clear - nahole purano bot er WAIT notun DOWN ke overwrite kore
}catch(e){}

// 2. TOKEN
let TOKEN="";
try{
  let up=new URLSearchParams(window.location.search); TOKEN=up.get('token')||up.get('access')||"";
  if(!TOKEN) TOKEN=localStorage.getItem('ghost_premium_token')||"";
  if(TOKEN) localStorage.setItem('ghost_premium_token', TOKEN);
}catch(e){}

let currentSignal=null, lockedUntil=0, lockedId="", currentPair="EURUSD", lossCount=0, consecLoss=0;
try{ lossCount=parseInt(localStorage.getItem('ghost_loss_count')||"0")||0; consecLoss=parseInt(localStorage.getItem('ghost_consecutive_losses')||"0")||0; }catch(e){}

// 3. PANEL - Glass .10
let box=document.getElementById('ghost-bot');
if(!box){
  box=document.createElement('div'); box.id='ghost-bot';
  box.style.cssText='position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:208px;background:rgba(255,255,255,.10);backdrop-filter:blur(28px) saturate(180%);color:#fff;padding:10px;border-radius:16px;text-align:center;font-family:sans-serif;border:1px solid rgba(255,255,255,.50)';
  box.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center"><div><b style="font-size:6.5px;letter-spacing:1.2px">GHOST <span style="background:linear-gradient(90deg,#00f0ff,#7b2fff,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent">PREMIUM CLEAN</span></b></div><span style="font-size:4.5px;background:#ff2d55;padding:2px 5px;border-radius:20px;font-weight:900">LIVE</span></div>'
  +'<div id="gh-pair" style="font-size:8px;font-weight:900;margin:2px 0">EUR/USD<small style="display:block;font-size:4.5px;color:#00f0ff">GHOST AI</small></div>'
  +'<div id="gh-sig" style="margin:0 6px;height:30px;border-radius:9px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(255,255,255,.15)"><div id="gh-arrow" style="font-size:11px">◉</div><div id="gh-txt" style="font-size:10px;font-weight:900">WAIT</div></div>'
  +'<div id="gh-txt2" style="font-size:5px;color:#ccc;margin-top:2px">Waiting...</div>'
  +'<div style="font-size:5px;margin-top:2px"><span id="gh-conf">0% CONF</span> • <span id="gh-sec">60s</span></div>'
  +'<div style="display:flex;gap:4px;margin-top:4px"><button id="gh-win" style="flex:1;background:rgba(0,255,136,.2);border:1px solid #00ff88;color:#fff;border-radius:6px;font-size:6px;padding:4px">WIN</button><button id="gh-loss" style="flex:1;background:rgba(255,45,85,.2);border:1px solid #ff2d55;color:#fff;border-radius:6px;font-size:6px;padding:4px">LOSS</button></div>';
  document.body.appendChild(box);
  document.getElementById('gh-win').onclick=()=>{ try{ consecLoss=0; localStorage.setItem('ghost_consecutive_losses',"0"); }catch(e){} };
  document.getElementById('gh-loss').onclick=()=>{ consecLoss++; lossCount++; try{ localStorage.setItem('ghost_loss_count',String(lossCount)); localStorage.setItem('ghost_consecutive_losses',String(consecLoss)); }catch(e){} if(consecLoss>=2){ showSTOP(); } };
}

function getPair(){
  try{
    let t=document.body.innerText||"";
    let m=t.match(/(EUR|GBP|USD|AUD|CAD|CHF|JPY|NZD)\/(USD|EUR|GBP|JPY|AUD|CAD|CHF|NZD)/);
    if(m) return m[1]+m[2];
    let sel=document.querySelector('[class*="pair"]');
    if(sel && sel.innerText) return sel.innerText.replace(/[^A-Z]/g,"").slice(0,6);
  }catch(e){}
  return currentPair;
}

function showSTOP(){
  let sigEl=document.getElementById('gh-sig'); if(sigEl) sigEl.style.background='rgba(255,0,0,.3)';
  let txt=document.getElementById('gh-txt'); if(txt) txt.textContent='OFF';
  let txt2=document.getElementById('gh-txt2'); if(txt2) txt2.textContent='2 Loss - 30 Min OFF';
  let conf=document.getElementById('gh-conf'); if(conf) conf.textContent='OFF';
}

function updateUI(j){
  try{
    // HOLD: Lock thakle WAIT dibo na - eita e flicker er asol fix
    if(j && j.signal==="WAIT" && Date.now()<lockedUntil && currentSignal) { j=currentSignal; }
    let pairEl=document.getElementById('gh-pair'); if(pairEl) pairEl.innerHTML=(j.market||currentPair).replace(/([A-Z]{3})([A-Z]{3})/,'$1/$2')+'<small style="display:block;font-size:4.5px;color:#00f0ff">GHOST AI</small>';
    let sigEl=document.getElementById('gh-sig'), txtEl=document.getElementById('gh-txt'), arrowEl=document.getElementById('gh-arrow'), reasonEl=document.getElementById('gh-txt2'), confEl=document.getElementById('gh-conf');
    if(!sigEl) return;
    let dir=j.signal;
    if(dir==="CALL"||dir==="UP"){
      sigEl.style.background='rgba(0,255,136,.25)'; sigEl.style.border='1px solid #00ff88';
      if(txtEl) txtEl.textContent='▲ UP'; if(arrowEl) arrowEl.textContent='▲';
    } else if(dir==="PUT"||dir==="DOWN"){
      sigEl.style.background='rgba(255,45,85,.25)'; sigEl.style.border='1px solid #ff2d55';
      if(txtEl) txtEl.textContent='▼ DOWN'; if(arrowEl) arrowEl.textContent='▼';
    } else {
      sigEl.style.background='rgba(255,255,255,.15)'; sigEl.style.border='1px solid rgba(255,255,255,.3)';
      if(txtEl) txtEl.textContent='◉ WAIT'; if(arrowEl) arrowEl.textContent='◉';
    }
    if(reasonEl) reasonEl.textContent=j.reason||"";
    if(confEl) confEl.textContent=(j.confidence||0)+"% CONF";
  }catch(e){}
}

function fetchSignal(){
  let now=Date.now();
  // 2 Loss = OFF
  if(consecLoss>=2){ showSTOP(); return; }
  // LOCK: DOWN/UP 55 sec dhore rakhbe, fetch korbe na, WAIT asbe na
  if(lockedUntil && now<lockedUntil && currentSignal){ updateUI(currentSignal); return; }
  // Lock sesh
  if(lockedUntil && now>=lockedUntil){ lockedUntil=0; lockedId=""; currentSignal=null; }
  let asset=getPair(); currentPair=asset;
  let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+(TOKEN?"&token="+encodeURIComponent(TOKEN):"");
  fetch(url).then(r=>r.json()).then(j=>{
    if(!j) return;
    if(j.signal==="UP") j.signal="CALL";
    if(j.signal==="DOWN") j.signal="PUT";
    // LOCK re-check - fetch suru howar pore DOWN lock hoile, purano fetch er WAIT diye overwrite korbo na (race fix)
    if(lockedUntil && Date.now()<lockedUntil && currentSignal){ updateUI(currentSignal); return; }
    if(j.signal==="WAIT"||!j.signal||j.confidence<30){
      let w={signal:"WAIT",confidence:0,reason:"Waiting for Confirm...",market:asset,expiry_timestamp:Date.now()+5000};
      updateUI(w); return;
    }
    if(j.status==="ACTIVE"&&(j.signal==="CALL"||j.signal==="PUT")){
      let d={signal:j.signal,confidence:j.confidence||75,reason:j.reason||"Backend Confirm",market:asset,expiry_timestamp:Date.now()+58000,signal_id:j.signal_id||(asset+"-"+Date.now())};
      lockedId=d.signal_id; lockedUntil=Date.now()+55000; currentSignal=d;
      updateUI(d); return;
    }
    let w2={signal:"WAIT",confidence:0,reason:"Waiting...",market:asset,expiry_timestamp:Date.now()+5000};
    updateUI(w2);
  }).catch(()=>{});
}

// 1 sec timer - lock thakle sudhu lock dekhau, ar kichu na
setInterval(()=>{
  if(consecLoss>=2){ showSTOP(); return; }
  if(lockedUntil && Date.now()<lockedUntil && currentSignal){
    updateUI(currentSignal);
    let secEl=document.getElementById('gh-sec'); if(secEl) secEl.textContent=Math.ceil((lockedUntil-Date.now())/1000)+"s";
    return;
  }
  if(lockedUntil && Date.now()>=lockedUntil){ lockedUntil=0; lockedId=""; currentSignal=null; }
  let secEl=document.getElementById('gh-sec'); if(secEl){ let s=60-new Date().getSeconds(); if(s===60) s=0; secEl.textContent=s+"s"; }
},1000);
setInterval(fetchSignal,3000);
fetchSignal();
}catch(e){ console.log('GHOST CLEAN ERROR',e); }
})();
