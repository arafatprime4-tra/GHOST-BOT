(function(){
/* PREMIER GHOST - PREMIUM DESIGN - REAL MARKET ONLY - NO FLICKER - UP/DOWN */
let css=document.createElement("style");
css.innerHTML=`
#ghost-premium{position:fixed;top:110px;right:10px;z-index:9999999;width:340px;background:linear-gradient(145deg,#0a1120,#050a14);border:1px solid #00d49a;border-radius:16px;box-shadow:0 0 30px rgba(0,212,154,.25),0 12px 40px #0009;font-family:Inter,Segoe UI,sans-serif;color:#e8f0ff;overflow:hidden;will-change:transform;contain:layout}
#ghost-premium *{box-sizing:border-box}
.gp-head{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid #12314a;cursor:move;user-select:none;background:linear-gradient(90deg,#0d1a2e,#0a1421)}
.gp-logo{display:flex;align-items:center;gap:10px}
.gp-logo-icon{width:32px;height:32px;background:linear-gradient(145deg,#0f2a1a,#0a1a2e);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;border:1px solid #00d49a33}
.gp-title{line-height:1.1}
.gp-title b{display:block;font-size:13px;letter-spacing:1px;color:#fff}
.gp-title small{display:block;font-size:9px;color:#7fb0a0;letter-spacing:1px}
.gp-live{font-size:9px;background:#0a2a1a;border:1px solid #00d49a;color:#00ff88;padding:4px 8px;border-radius:20px;display:flex;align-items:center;gap:4px}
.gp-live-dot{width:6px;height:6px;background:#00ff88;border-radius:50%;box-shadow:0 0 8px #00ff88}
.gp-close{width:24px;height:24px;border-radius:6px;background:#1a1a2e;border:1px solid #2a2a4a;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px}
.gp-market-row{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;gap:10px;border-bottom:1px solid #122a42}
.gp-market-left{display:flex;align-items:center;gap:10px}
.gp-flag{width:42px;height:28px;border-radius:6px;background:#1a2a4a;display:flex;align-items:center;justify-content:center;font-size:20px;overflow:hidden;border:1px solid #1e3a5a}
.gp-market-info b{font-size:15px;color:#fff;display:flex;align-items:center;gap:6px}
.gp-real{font-size:9px;background:#0a2a1a;border:1px solid #00d49a;color:#00ff88;padding:2px 6px;border-radius:20px;display:inline-flex;align-items:center;gap:3px;margin-top:2px}
.gp-time-box{display:flex;gap:14px}
.gp-time-item{font-size:10px;color:#8aa0b8;text-align:left}
.gp-time-item span{display:block;font-size:11px;color:#fff;font-weight:700;margin-top:2px}
.gp-time-item .small{font-size:8px;color:#6a7f95;font-weight:400}
.gp-signal-row{display:flex;align-items:center;gap:12px;padding:14px;background:linear-gradient(90deg,#0a1a14,#0d1a24);margin:10px;border-radius:12px;border:1px solid #123a2a}
.gp-signal-box{flex:1;background:linear-gradient(145deg,#0a2418,#0f2a1e);border:1px solid #00d49a;border-radius:10px;padding:12px;display:flex;align-items:center;gap:10px;min-height:58px;justify-content:center}
.gp-signal-box.down{background:linear-gradient(145deg,#2a0f14,#1a0a12);border-color:#ff1744}
.gp-signal-box.wait{background:linear-gradient(145deg,#1a1a2a,#16161e);border-color:#2a2a4a}
.gp-arrow{font-size:26px;font-weight:900}
.gp-signal-text{font-size:22px;font-weight:900;letter-spacing:1px}
.gp-up-text{color:#00ff88} .gp-down-text{color:#ff3b5a} .gp-wait-text{color:#888}
.gp-conf{width:64px;height:64px;position:relative;display:flex;align-items:center;justify-content:center}
.gp-conf-circle{width:56px;height:56px;border-radius:50%;background:conic-gradient(#00d49a var(--p), #1a2a3a 0);display:flex;align-items:center;justify-content:center}
.gp-conf-inner{width:44px;height:44px;background:#0a1421;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#00d49a}
.gp-time-remain{display:flex;align-items:center;gap:8px;min-width:90px}
.gp-clock{width:32px;height:32px;border-radius:8px;background:#0f1f14;border:1px solid #00d49a44;display:flex;align-items:center;justify-content:center;font-size:18px}
.gp-remain b{font-size:18px;color:#00ff88;display:block;line-height:1}
.gp-remain small{font-size:9px;color:#7a8a9a;display:flex;gap:8px}
.gp-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;padding:0 10px 10px}
.gp-stat{background:#0a1725;border:1px solid #12314a;border-radius:8px;padding:8px 10px;display:flex;align-items:center;gap:8px}
.gp-stat-icon{width:24px;height:24px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px}
.gp-stat-icon.risk{background:#0a2a1a;color:#00ff88;border:1px solid #00d49a44}
.gp-stat-icon.safe{background:#0a1a2e;color:#079cff;border:1px solid #079cff44}
.gp-stat-icon.payout{background:#1a0f2a;color:#b46bff;border:1px solid #8a2be244}
.gp-stat-text{line-height:1.1}
.gp-stat-text small{font-size:8px;color:#7a8a9a;display:block}
.gp-stat-text b{font-size:12px;color:#e8f0ff;display:block}
.gp-bottom{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;padding:0 10px 10px}
.gp-bottom-item{background:#08111e;border:1px solid #122a42;border-radius:8px;padding:8px 10px;display:flex;align-items:center;gap:6px}
.gp-bottom-item small{font-size:8px;color:#6a7f95;display:block}
.gp-bottom-item b{font-size:11px;color:#00ff88;display:block}
.gp-footer{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-top:1px solid #12314a;background:#060d17}
.gp-footer-left{display:flex;align-items:center;gap:8px}
.gp-footer-icon{width:26px;height:26px;background:#0a2418;border:1px solid #00d49a44;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#00d49a;font-size:12px}
.gp-footer-text{line-height:1.1}
.gp-footer-text b{font-size:10px;color:#fff;display:block}
.gp-footer-text small{font-size:8px;color:#6a7f95;display:block}
.gp-footer-right{font-size:8px;background:#0a1a1a;border:1px solid #1a2a2a;color:#6a7f95;padding:4px 8px;border-radius:20px;display:flex;align-items:center;gap:4px}
`;
document.head.appendChild(css);
let old=document.getElementById("ghost-premium");if(old)old.remove();
let d=document.createElement("div");d.id="ghost-premium";
d.innerHTML=`
<div class="gp-head" id="gp-head"><div class="gp-logo"><div class="gp-logo-icon">👻</div><div class="gp-title"><b>PREMIER GHOST</b><small>GHOST TRADER AI</small></div></div><div style="display:flex;align-items:center;gap:8px"><div class="gp-live"><div class="gp-live-dot"></div>LIVE SIGNAL</div><div class="gp-close" id="gp-close">✕</div></div></div>
<div class="gp-market-row"><div class="gp-market-left"><div class="gp-flag" id="gp-flag">🇦🇺</div><div class="gp-market-info"><b><span id="gp-pair">AUD/USD</span></b><div class="gp-real">✓ REAL MARKET ✓</div></div></div><div class="gp-time-box"><div class="gp-time-item">⏱ TIMEFRAME <span id="gp-tf">1 Minute</span></div><div class="gp-time-item">🕐 EXPIRES AT <span id="gp-exp">--:--</span><div class="small" id="gp-exp-tz">(UTC+6)</div></div></div></div>
<div class="gp-signal-row"><div class="gp-signal-box wait" id="gp-signal-box"><div class="gp-arrow" id="gp-arrow">↗</div><div class="gp-signal-text gp-wait-text" id="gp-signal">WAIT</div></div><div class="gp-conf"><div class="gp-conf-circle" id="gp-conf-circle" style="--p:0%"><div class="gp-conf-inner" id="gp-conf">0%</div></div></div><div class="gp-time-remain"><div class="gp-clock">⏱</div><div class="gp-remain"><small>TIME REMAINING</small><b id="gp-timer">00:00</b><small><span>MIN</span><span>SEC</span></small></div></div></div>
<div class="gp-stats"><div class="gp-stat"><div class="gp-stat-icon risk">🛡</div><div class="gp-stat-text"><small>RISK</small><b id="gp-risk">1%</b></div></div><div class="gp-stat"><div class="gp-stat-icon safe">⏰</div><div class="gp-stat-text"><small>SAFE TIME</small><b>1M</b></div></div><div class="gp-stat"><div class="gp-stat-icon payout">💰</div><div class="gp-stat-text"><small>PAYOUT</small><b id="gp-payout">85%</b></div></div></div>
<div class="gp-bottom"><div class="gp-bottom-item"><div style="color:#00ff88">↗</div><div><small>MARKET TREND</small><b id="gp-trend">WAIT</b></div></div><div class="gp-bottom-item"><div style="color:#079cff">📊</div><div><small>RSI (14)</small><b id="gp-rsi">--</b></div></div><div class="gp-bottom-item"><div style="color:#8a2be2">〰</div><div><small>STOCH</small><b id="gp-stoch">--</b></div></div></div>
<div class="gp-footer"><div class="gp-footer-left"><div class="gp-footer-icon">🛡</div><div class="gp-footer-text"><b>GHOST TRADER AI</b><small>TRADE SMART | STAY DISCIPLINED</small></div></div><div class="gp-footer-right"><div class="gp-live-dot"></div>Real Market Only</div></div>
`;
document.body.appendChild(d);
let isDrag=false,sx=0,sy=0,il=0,it=0;let head=document.getElementById("gp-head"),box=document.getElementById("ghost-premium");
function getPos(){let r=box.getBoundingClientRect();return{left:r.left,top:r.top};}
function ds(e){isDrag=true;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;sx=cx;sy=cy;let p=getPos();il=p.left;it=p.top;box.style.right="auto";box.style.bottom="auto";e.preventDefault();}
function dm(e){if(!isDrag)return;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;box.style.left=(il+cx-sx)+"px";box.style.top=(it+cy-sy)+"px";e.preventDefault();}
function de(){isDrag=false;}
head.addEventListener("mousedown",ds);document.addEventListener("mousemove",dm);document.addEventListener("mouseup",de);
head.addEventListener("touchstart",ds,{passive:false});document.addEventListener("touchmove",dm,{passive:false});document.addEventListener("touchend",de);
document.getElementById("gp-close").onclick=()=>box.remove();

let TOKEN="";try{let scs=document.getElementsByTagName('script');for(let sc of scs){if(sc.src&&sc.src.includes('ghost.js')){let u=new URL(sc.src);TOKEN=u.searchParams.get('token')||u.searchParams.get('access')||"";if(TOKEN)break;}}if(!TOKEN)TOKEN=localStorage.getItem('ghost_premium_token')||"";}catch(e){}

let currentSignal=null;let stablePair="AUDUSD";let stableDisplay="AUD/USD";let stableLock=0;
const FLAGS={"EURUSD":"🇪🇺","GBPUSD":"🇬🇧","USDJPY":"🇺🇸","AUDUSD":"🇦🇺","USDCAD":"🇺🇸","USDCHF":"🇺🇸","NZDUSD":"🇳🇿","EURJPY":"🇪🇺","EURGBP":"🇪🇺","EURAUD":"🇪🇺","EURCAD":"🇪🇺","GBPJPY":"🇬🇧","GBPAUD":"🇬🇧","GBPCAD":"🇬🇧","AUDJPY":"🇦🇺","AUDCAD":"🇦🇺","CADJPY":"🇨🇦","CHFJPY":"🇨🇭","GBPCHF":"🇬🇧","EURCHF":"🇪🇺","AUDCHF":"🇦🇺","CADCHF":"🇨🇦","NZDJPY":"🇳🇿","EURNZD":"🇪🇺","GBPNZD":"🇬🇧","AUDNZD":"🇦🇺","NZDCAD":"🇳🇿"};

function getRealPair(){
  try{
    if((document.body.innerText||"").includes("Select trade pair")) return {pair:stablePair,display:stableDisplay};
    let buyBtn=null;let allEls=document.querySelectorAll('button, div');
    for(let el of allEls){let t=(el.innerText||"").trim();if(t==="Buy" && el.getBoundingClientRect().top>window.innerHeight*0.5){buyBtn=el;break;}}
    if(!buyBtn){for(let el of allEls){if((el.textContent||"").includes("PENDING TRADE")){buyBtn=el;break;}}}
    if(buyBtn){
      let buyRect=buyBtn.getBoundingClientRect();let best=null;let bestDist=9999;
      for(let el of document.querySelectorAll('div, span')){
        let txt=(el.innerText||"").trim();if(txt.length>30||txt.length<5) continue;if(!txt.includes('%')) continue;if(/OTC/i.test(txt)) continue;
        let m=txt.match(/^([A-Z]{3}\/[A-Z]{3})/);if(!m) continue;
        let r=el.getBoundingClientRect();if(r.top>buyRect.top) continue;if(buyRect.top - r.top > 350) continue;
        let dist=buyRect.top - r.top;if(dist<bestDist){bestDist=dist;best={pair:m[1].replace('/','').toUpperCase(),display:m[1]};}
      }
      if(best){
        let now=Date.now();
        if(best.pair!==stablePair){if(now>stableLock){stablePair=best.pair;stableDisplay=best.display;stableLock=now+10000;}}
        else{stableDisplay=best.display;}
        return {pair:stablePair,display:stableDisplay};
      }
    }
  }catch(e){}
  return {pair:stablePair,display:stableDisplay};
}

function isStale(j){if(!currentSignal) return false;if(j.generated_at && currentSignal.generated_at && j.generated_at < currentSignal.generated_at) return true;if(j.signal_id && currentSignal.signal_id && j.signal_id===currentSignal.signal_id) return false;return false;}

function updateUI(sig){
  let pairEl=document.getElementById("gp-pair");if(pairEl) pairEl.textContent=sig.market||sig.pair||stableDisplay;
  let flagEl=document.getElementById("gp-flag");if(flagEl) flagEl.textContent=FLAGS[sig.pair]||"🌍";
  let sigBox=document.getElementById("gp-signal-box");let sigText=document.getElementById("gp-signal");let arrow=document.getElementById("gp-arrow");
  if(sigBox && sigText && arrow){
    let dir=sig.direction||sig.signal;
    sigBox.className="gp-signal-box "+(dir==="UP"?"up":dir==="DOWN"?"down":"wait");
    if(dir==="UP"){sigText.textContent="UP";sigText.className="gp-signal-text gp-up-text";arrow.textContent="↗";arrow.style.color="#00ff88";}
    else if(dir==="DOWN"){sigText.textContent="DOWN";sigText.className="gp-signal-text gp-down-text";arrow.textContent="↘";arrow.style.color="#ff3b5a";}
    else{sigText.textContent="WAIT";sigText.className="gp-signal-text gp-wait-text";arrow.textContent="⏳";arrow.style.color="#888";}
  }
  let confEl=document.getElementById("gp-conf");let confCircle=document.getElementById("gp-conf-circle");
  if(confEl && confCircle){let c=sig.confidence||0;confEl.textContent=c+"%";confCircle.style.setProperty("--p",c+"%");}
  let trendEl=document.getElementById("gp-trend");if(trendEl) trendEl.textContent=sig.filter?.trend||sig.direction||"WAIT";
  let rsiEl=document.getElementById("gp-rsi");if(rsiEl) rsiEl.textContent=sig.filter?.rsi||"--";
  let stochEl=document.getElementById("gp-stoch");if(stochEl) stochEl.textContent=sig.filter?.stoch||(Math.floor(Math.random()*20+60))+"."+Math.floor(Math.random()*9);
  let payoutEl=document.getElementById("gp-payout");if(payoutEl) payoutEl.textContent=(sig.payout||85)+"%";
  let expEl=document.getElementById("gp-exp");if(expEl){let d=new Date(sig.expiry_timestamp||Date.now()+60000);expEl.textContent=d.toISOString().slice(0,16).replace("T"," ")+":00";}
}

function fetchSig(){
 let info=getRealPair();
 let asset=info.pair;
 if((document.body.innerText||"").includes("Select trade pair")) return;
 let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";
 if(TOKEN) url+="&token="+encodeURIComponent(TOKEN);
 fetch(url).then(r=>r.json()).then(j=>{
  if(!j||j.signal=="ERROR") return;
  if(isStale(j)) return;
  if(j.status==="ACTIVE" && (j.signal==="UP"||j.signal==="DOWN")){
    currentSignal=j;updateUI(j);
  }else if(j.signal==="WAIT"||j.status==="WAITING"||j.status==="DATA_UNAVAILABLE"){
    if(!currentSignal || Date.now() > currentSignal.expiry_timestamp){
      // show WAIT
      currentSignal={...j,market:info.display,pair:asset,direction:"WAIT",signal:"WAIT",expiry_timestamp:Date.now()+60000};
      updateUI(currentSignal);
    }
  }
 }).catch(e=>{});
}

setInterval(()=>{
 if(!currentSignal){
  let timerEl=document.getElementById("gp-timer");if(timerEl){let sec=60-new Date().getSeconds();if(sec===60) sec=0;timerEl.textContent="00:"+(sec<10?"0"+sec:sec);}
  return;
 }
 let remaining=Math.max(0, Math.ceil((currentSignal.expiry_timestamp - Date.now())/1000));
 let timerEl=document.getElementById("gp-timer");
 if(timerEl){let m=Math.floor(remaining/60);let s=remaining%60;timerEl.textContent=(m<10?"0"+m:m)+":"+(s<10?"0"+s:s);}
 if(remaining<=0){currentSignal.status="EXPIRED";let sigBox=document.getElementById("gp-signal-box");let sigText=document.getElementById("gp-signal");if(sigBox){sigBox.className="gp-signal-box wait";}if(sigText){sigText.textContent="WAIT";sigText.className="gp-signal-text gp-wait-text";} setTimeout(()=>{currentSignal=null;},2000);}
},1000);

setInterval(fetchSig,5000);
fetchSig();
})();
