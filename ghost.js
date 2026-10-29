(function(){
let css=document.createElement("style");
css.innerHTML=`
#ghost-small{position:fixed;top:110px;right:8px;z-index:9999999;width:310px;background:linear-gradient(145deg,#0a1120,#070e1c);border:1px solid #00ff88;border-radius:14px;box-shadow:0 0 25px rgba(0,255,136,.2),0 10px 30px #0008;font-family:Inter,sans-serif;color:#e8f0ff;overflow:hidden;contain:layout}
.gh-head{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:linear-gradient(90deg,#0d1a2e,#0a1421);border-bottom:1px solid #123a3a;cursor:move}
.gh-logo{display:flex;align-items:center;gap:8px}
.gh-icon{width:28px;height:28px;background:#0f2a1a;border:1px solid #00ff8844;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:14px}
.gh-titles{line-height:1.05}
.gh-titles h1{margin:0;font-size:12px;letter-spacing:1px;color:#fff;font-weight:900}
.gh-titles span{font-size:8px;color:#7fb0a0;letter-spacing:.8px}
.gh-actions{display:flex;align-items:center;gap:6px}
.gh-live{font-size:8px;background:#0a2a1a;border:1px solid #00ff88;color:#00ff88;padding:3px 7px;border-radius:20px;display:flex;align-items:center;gap:3px}
.gh-dot{width:5px;height:5px;background:#00ff88;border-radius:50%;box-shadow:0 0 6px #00ff88}
.gh-close{width:22px;height:22px;background:#1a1a2e;border:1px solid #2a2a4a;border-radius:6px;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:11px}
.gh-market{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid #122a42;background:#080f1c}
.gh-market-left{display:flex;align-items:center;gap:8px}
.gh-flag{width:36px;height:24px;background:#1a2a4a;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:16px;border:1px solid #1e3a5a}
.gh-pair{font-size:13px;font-weight:800;color:#fff}
.gh-real{font-size:7px;background:#0a2a1a;border:1px solid #00ff88;color:#00ff88;padding:2px 5px;border-radius:20px;margin-top:2px;display:inline-block}
.gh-time{font-size:9px;color:#8aa0b8;text-align:right;line-height:1.2}
.gh-time b{display:block;color:#fff;font-size:10px}
.gh-signal-area{display:flex;align-items:center;gap:10px;padding:10px 12px;background:linear-gradient(90deg,#0a1a14,#0d1a24);margin:8px;border-radius:10px;border:1px solid #123a2a}
.gh-sig-box{flex:1;background:linear-gradient(145deg,#0a2418,#0f2a1e);border:1px solid #00ff88;border-radius:9px;padding:10px;display:flex;align-items:center;justify-content:center;gap:8px;min-height:44px}
.gh-sig-box.down{background:linear-gradient(145deg,#2a0f14,#1a0a12);border-color:#ff1744}
.gh-sig-box.wait{background:linear-gradient(145deg,#1a1a2a,#16161e);border-color:#2a2a4a}
.gh-sig-box b{font-size:18px;letter-spacing:1px}
.gh-conf{width:48px;height:48px;position:relative;display:flex;align-items:center;justify-content:center}
.gh-conf-bg{width:44px;height:44px;border-radius:50%;background:conic-gradient(#00ff88 var(--p), #1a2a3a 0);display:flex;align-items:center;justify-content:center}
.gh-conf-in{width:34px;height:34px;background:#0a1421;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#00ff88}
.gh-timer{display:flex;align-items:center;gap:6px;min-width:70px}
.gh-clock{font-size:16px}
.gh-rem{line-height:1}
.gh-rem small{font-size:7px;color:#7a8a9a;display:block}
.gh-rem b{font-size:14px;color:#00ff88;display:block}
.gh-stats{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;padding:0 8px 8px}
.gh-stat{background:#0a1725;border:1px solid #12314a;border-radius:7px;padding:6px 7px;display:flex;align-items:center;gap:5px}
.gh-stat i{font-size:10px}
.gh-stat div{line-height:1}
.gh-stat small{font-size:6px;color:#6a7f95;display:block}
.gh-stat b{font-size:9px;color:#fff;display:block}
.gh-price-row{display:flex;align-items:center;justify-content:space-between;padding:6px 12px;background:#060d17;border-top:1px solid #12314a;font-size:9px;color:#8aa0b8}
.gh-price-row b{color:#00ff88;font-size:10px}
.gh-footer{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#050a14;border-top:1px solid #12314a}
.gh-footer b{font-size:8px;color:#fff} .gh-footer small{font-size:7px;color:#5a6f85}
`;
document.head.appendChild(css);
let old=document.getElementById("ghost-small");if(old)old.remove();
let box=document.createElement("div");box.id="ghost-small";
box.innerHTML=`
<div class="gh-head" id="gh-head"><div class="gh-logo"><div class="gh-icon">👻</div><div class="gh-titles"><h1>GHOST BOT</h1><span>GHOST PREMIUM BOT</span></div></div><div class="gh-actions"><div class="gh-live"><div class="gh-dot"></div>LIVE</div><div class="gh-close" id="gh-close">✕</div></div></div>
<div class="gh-market"><div class="gh-market-left"><div class="gh-flag" id="gh-flag">🇦🇺</div><div><div class="gh-pair" id="gh-pair">AUD/USD</div><div class="gh-real">✓ REAL MARKET</div></div></div><div class="gh-time">TIMEFRAME<br><b>1M</b><span id="gh-exp">08:29:00 UTC+6</span></div></div>
<div class="gh-signal-area"><div class="gh-sig-box wait" id="gh-sig-box"><span id="gh-arrow">↗</span><b id="gh-sig">WAIT</b></div><div class="gh-conf"><div class="gh-conf-bg" id="gh-conf-bg" style="--p:0%"><div class="gh-conf-in" id="gh-conf">0%</div></div></div><div class="gh-timer"><div class="gh-clock">⏱</div><div class="gh-rem"><small>TIME REMAINING</small><b id="gh-timer">00:00</b></div></div></div>
<div class="gh-stats"><div class="gh-stat"><i style="color:#00ff88">↗</i><div><small>TREND</small><b id="gh-trend">WAIT</b></div></div><div class="gh-stat"><i style="color:#00ff88">🛡</i><div><small>RISK</small><b>1%</b></div></div><div class="gh-stat"><i style="color:#079cff">⏰</i><div><small>SAFE</small><b>1M</b></div></div><div class="gh-stat"><i style="color:#b46bff">💰</i><div><small>PAYOUT</small><b id="gh-payout">85%</b></div></div></div>
<div class="gh-price-row"><span>PRICE: <b id="gh-price">0.00000</b> <span style="color:#555">| REAL 99-100%</span></span><span id="gh-time-now">--:--:--</span></div>
<div class="gh-footer"><div><b>GHOST TRADER AI</b><br><small>TRADE SMART | STAY DISCIPLINED</small></div><div style="font-size:7px;background:#0a1a1a;border:1px solid #1a2a2a;color:#5a6f85;padding:3px 7px;border-radius:20px">● Real Market Only</div></div>
`;
document.body.appendChild(box);
let isDrag=false,sx=0,sy=0,il=0,it=0;let head=document.getElementById("gh-head");
function getPos(){let r=box.getBoundingClientRect();return{left:r.left,top:r.top};}
function ds(e){isDrag=true;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;sx=cx;sy=cy;let p=getPos();il=p.left;it=p.top;box.style.right="auto";box.style.bottom="auto";e.preventDefault();}
function dm(e){if(!isDrag)return;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;box.style.left=(il+cx-sx)+"px";box.style.top=(it+cy-sy)+"px";e.preventDefault();}
function de(){isDrag=false;}
head.addEventListener("mousedown",ds);document.addEventListener("mousemove",dm);document.addEventListener("mouseup",de);
head.addEventListener("touchstart",ds,{passive:false});document.addEventListener("touchmove",dm,{passive:false});document.addEventListener("touchend",de);
document.getElementById("gh-close").onclick=()=>box.remove();

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
      if(best){let now=Date.now();if(best.pair!==stablePair){if(now>stableLock){stablePair=best.pair;stableDisplay=best.display;stableLock=now+10000;}}else{stableDisplay=best.display;}return {pair:stablePair,display:stableDisplay};}
    }
  }catch(e){}
  return {pair:stablePair,display:stableDisplay};
}

function getRealPrice(){
  try{
    // Try to get real price from Quotex DOM for 99-100% match
    let priceEls=document.querySelectorAll('div, span');
    for(let el of priceEls){
      let txt=(el.innerText||"").trim();
      // Quotex price like 0.70417 or 0.70417 with small font near chart
      if(txt.match(/^\d+\.\d{3,5}$/) && txt.length>=6 && txt.length<=9){
        let r=el.getBoundingClientRect();
        // Price near chart top right
        if(r.top>50 && r.top<300 && r.left>window.innerWidth*0.5){
          return txt;
        }
      }
    }
  }catch(e){}
  return null;
}

function updateUI(sig){
  let pairEl=document.getElementById("gh-pair");if(pairEl) pairEl.textContent=sig.market||stableDisplay;
  let flagEl=document.getElementById("gh-flag");if(flagEl) flagEl.textContent=FLAGS[sig.pair]||"🌍";
  let sigBox=document.getElementById("gh-sig-box");let sigText=document.getElementById("gh-sig");let arrow=document.getElementById("gh-arrow");
  if(sigBox && sigText){
    let dir=sig.direction||sig.signal;
    sigBox.className="gh-sig-box "+(dir==="UP"?"up":dir==="DOWN"?"down":"wait");
    if(dir==="UP"){sigText.textContent="UP";arrow.textContent="↗";}
    else if(dir==="DOWN"){sigText.textContent="DOWN";arrow.textContent="↘";}
    else{sigText.textContent="WAIT";arrow.textContent="⏳";}
  }
  let confEl=document.getElementById("gh-conf");let confBg=document.getElementById("gh-conf-bg");
  if(confEl && confBg){let c=sig.confidence||0;confEl.textContent=c+"%";confBg.style.setProperty("--p",c+"%");}
  let trendEl=document.getElementById("gh-trend");if(trendEl) trendEl.textContent=sig.filter?.trend||sig.direction||"WAIT";
  let priceEl=document.getElementById("gh-price");
  if(priceEl){
    let realPrice=getRealPrice();
    if(realPrice) priceEl.textContent=realPrice;
    else priceEl.textContent=sig.price||"0.00000";
  }
  let payoutEl=document.getElementById("gh-payout");if(payoutEl) payoutEl.textContent=(sig.payout||85)+"%";
}

function fetchSig(){
 let info=getRealPair();
 let asset=info.pair;
 if((document.body.innerText||"").includes("Select trade pair")) return;
 let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";
 if(TOKEN) url+="&token="+encodeURIComponent(TOKEN);
 fetch(url).then(r=>r.json()).then(j=>{
  if(!j||j.signal=="ERROR") return;
  if(j.status==="ACTIVE" && (j.signal==="UP"||j.signal==="DOWN")){
    currentSignal=j;updateUI(j);
  }else if(j.signal==="WAIT"){
    if(!currentSignal || Date.now() > currentSignal.expiry_timestamp){
      currentSignal={...j,market:info.display,pair:asset,direction:"WAIT",signal:"WAIT",expiry_timestamp:Date.now()+60000};
      updateUI(currentSignal);
    }
  }
 }).catch(e=>{});
}

setInterval(()=>{
 let timeNowEl=document.getElementById("gh-time-now");
 if(timeNowEl){let now=new Date();timeNowEl.textContent=now.toLocaleTimeString('en-GB',{hour12:false})+" (UTC+6)";}
 let realPrice=getRealPrice();
 let priceEl=document.getElementById("gh-price");
 if(realPrice && priceEl){priceEl.textContent=realPrice;}
 if(!currentSignal){
  let timerEl=document.getElementById("gh-timer");if(timerEl){let sec=60-new Date().getSeconds();if(sec===60) sec=0;timerEl.textContent="00:"+(sec<10?"0"+sec:sec);}
  return;
 }
 let remaining=Math.max(0, Math.ceil((currentSignal.expiry_timestamp - Date.now())/1000));
 let timerEl=document.getElementById("gh-timer");
 if(timerEl){let m=Math.floor(remaining/60);let s=remaining%60;timerEl.textContent=(m<10?"0"+m:m)+":"+(s<10?"0"+s:s);}
 if(remaining<=0){currentSignal=null;}
},500);

setInterval(fetchSig,4000);
fetchSig();
})();
