(function(){
let css=document.createElement("style");
css.innerHTML=`
#ghost-small{position:fixed;top:85px;right:4px;z-index:2147483647;width:200px;background:linear-gradient(145deg,#070e1c,#0a1325);border:1px solid #00ffc8;border-radius:10px;box-shadow:0 0 18px rgba(0,255,200,.25),0 8px 20px #000a;font-family:Inter,sans-serif;color:#e8f0ff;overflow:hidden;user-select:none}
.gh-head{display:flex;align-items:center;justify-content:space-between;padding:6px 7px;background:linear-gradient(90deg,#0d1f33,#0a1422);border-bottom:1px solid #0f3a3a;cursor:move}
.gh-left{display:flex;align-items:center;gap:5px}
.gh-icon{width:20px;height:20px;background:radial-gradient(circle,#0f2a1a,#071a10);border:1px solid #00ff8866;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;box-shadow:0 0 8px #00ff8855}
.gh-ttl{line-height:1}
.gh-ttl b{font-size:7.5px;color:#fff;letter-spacing:.6px;display:block}
.gh-ttl b span{color:#00ff88}
.gh-ttl small{font-size:5px;color:#6a8a9a;letter-spacing:.5px;display:block;margin-top:1px}
.gh-right{display:flex;align-items:center;gap:4px}
.gh-live{font-size:5px;background:#0a2a1a;border:1px solid #00ff88;color:#00ff88;padding:2px 5px;border-radius:20px;display:flex;align-items:center;gap:2px}
.gh-dot{width:4px;height:4px;background:#00ff88;border-radius:50%;box-shadow:0 0 5px #00ff88;animation:blink 1.2s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.gh-close{width:16px;height:16px;background:#10162a;border:1px solid #2a2f4a;border-radius:4px;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:9px;font-weight:900}
.gh-close:hover{background:#ff1744;border-color:#ff1744}
.gh-market{display:flex;align-items:center;justify-content:space-between;padding:6px 7px;background:#080f1e;border-bottom:1px solid #102a3a}
.gh-mleft{display:flex;align-items:center;gap:4px}
.gh-flag{width:22px;height:16px;background:#1a2a4a;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:10px;border:1px solid #1e3a5a;overflow:hidden}
.gh-pair{font-size:8.5px;font-weight:900;color:#fff;line-height:1}
.gh-real{font-size:4.5px;background:#0a2a1a;border:1px solid #00ff88;color:#00ff88;padding:1px 4px;border-radius:20px;display:inline-flex;align-items:center;gap:1px;margin-top:1px}
.gh-call-box{min-width:62px;height:28px;background:linear-gradient(145deg,#0a2a1e,#0f3a24);border:1px solid #00ff88;border-radius:8px;display:flex;align-items:center;justify-content:center;gap:3px;box-shadow:0 0 10px rgba(0,255,136,.2)}
.gh-call-box.down{background:linear-gradient(145deg,#2a1218,#1a0a12);border-color:#ff2a5a;box-shadow:0 0 10px rgba(255,42,90,.2)}
.gh-call-box.wait{background:#161a2a;border-color:#2a2f4a;box-shadow:none}
.gh-call-box b{font-size:9px;color:#fff;letter-spacing:.5px}
.gh-call-box span{font-size:10px;color:#00ff88}
.gh-call-box.down span{color:#ff2a5a}
.gh-exp{text-align:right;line-height:1}
.gh-exp small{font-size:5px;color:#6a8a9a;display:flex;align-items:center;gap:2px;justify-content:flex-end}
.gh-exp b{font-size:10px;color:#00ffc8;display:block;margin-top:1px}
.gh-stats{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:3px;padding:5px 5px 6px;background:#060d18}
.gh-s{background:#0a1628;border:1px solid #12314a;border-radius:5px;padding:3px 4px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px}
.gh-s i{font-size:7px}
.gh-s small{font-size:4.5px;color:#5a758f}
.gh-s b{font-size:6.5px;color:#00ff88;font-weight:800}
.gh-s b.down{color:#ff4a6a}
.gh-foot{display:flex;align-items:center;justify-content:space-between;padding:3px 6px;background:#050a14;border-top:1px solid #102a3a;font-size:4.5px;color:#4a5f75}
.gh-price{color:#00ff88;font-weight:800;font-size:6px}
`;
document.head.appendChild(css);
let old=document.getElementById("ghost-small");if(old) old.remove();
let box=document.createElement("div");box.id="ghost-small";
box.innerHTML=`
<div class="gh-head" id="gh-head">
  <div class="gh-left"><div class="gh-icon">👻</div><div class="gh-ttl"><b>PREMIER <span>GHOST</span></b><small>GHOST TRADER AI</small></div></div>
  <div class="gh-right"><div class="gh-live"><div class="gh-dot"></div>LIVE</div><div class="gh-close" id="gh-close">✕</div></div>
</div>
<div class="gh-market">
  <div class="gh-mleft"><div class="gh-flag" id="gh-flag">🇪🇺</div><div><div class="gh-pair" id="gh-pair">EUR/USD</div><div class="gh-real">✓ REAL</div></div></div>
  <div class="gh-call-box wait" id="gh-call-box"><span id="gh-arrow">↗</span><b id="gh-call">CALL</b></div>
  <div class="gh-exp"><small>⏱ EXPIRES IN</small><b id="gh-timer">00:42</b></div>
</div>
<div class="gh-stats">
  <div class="gh-s"><i>↗</i><small>TREND</small><b id="gh-trend">UP</b></div>
  <div class="gh-s"><i>🛡</i><small>RISK</small><b>1%</b></div>
  <div class="gh-s"><i>⏰</i><small>SAFE</small><b>1M</b></div>
  <div class="gh-s"><i>💰</i><small>PAYOUT</small><b id="gh-payout">85%</b></div>
</div>
<div class="gh-foot"><span>PRICE <span class="gh-price" id="gh-price">1.08421</span> | 99-100%</span><span id="gh-time-now">--:--:--</span></div>
`;
document.body.appendChild(box);

let closeBtn=document.getElementById("gh-close");
closeBtn.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();document.getElementById("ghost-small")?.remove();});
closeBtn.addEventListener("touchend",e=>{e.preventDefault();e.stopPropagation();document.getElementById("ghost-small")?.remove();});

let isDrag=false,sx=0,sy=0,il=0,it=0;
let head=document.getElementById("gh-head");
function getPos(){let r=box.getBoundingClientRect();return{left:r.left,top:r.top};}
function ds(e){if(e.target.closest("#gh-close")) return; isDrag=true;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;sx=cx;sy=cy;let p=getPos();il=p.left;it=p.top;box.style.right="auto";box.style.bottom="auto";e.preventDefault();}
function dm(e){if(!isDrag)return;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;box.style.left=(il+cx-sx)+"px";box.style.top=(it+cy-sy)+"px";e.preventDefault();}
function de(){isDrag=false;}
head.addEventListener("mousedown",ds);document.addEventListener("mousemove",dm);document.addEventListener("mouseup",de);
head.addEventListener("touchstart",ds,{passive:false});document.addEventListener("touchmove",dm,{passive:false});document.addEventListener("touchend",de);

let TOKEN="";try{let scs=document.getElementsByTagName('script');for(let sc of scs){if(sc.src&&sc.src.includes('ghost.js')){let u=new URL(sc.src);TOKEN=u.searchParams.get('token')||u.searchParams.get('access')||"";if(TOKEN)break;}}if(!TOKEN)TOKEN=localStorage.getItem('ghost_premium_token')||"";}catch(e){}
let currentSignal=null;let stablePair="EURUSD";let stableDisplay="EUR/USD";let stableLock=0;
const FLAGS={"EURUSD":"🇪🇺","GBPUSD":"🇬🇧","USDJPY":"🇯🇵","AUDUSD":"🇦🇺","USDCAD":"🇺🇸","USDCHF":"🇨🇭","NZDUSD":"🇳🇿","EURJPY":"🇪🇺","EURGBP":"🇪🇺","EURAUD":"🇪🇺","EURCAD":"🇪🇺","GBPJPY":"🇬🇧","GBPAUD":"🇬🇧","GBPCAD":"🇬🇧","AUDJPY":"🇦🇺","AUDCAD":"🇦🇺","CADJPY":"🇨🇦","CHFJPY":"🇨🇭","GBPCHF":"🇬🇧","EURCHF":"🇪🇺","AUDCHF":"🇦🇺","CADCHF":"🇨🇦","NZDJPY":"🇳🇿","EURNZD":"🇪🇺","GBPNZD":"🇬🇧","AUDNZD":"🇦🇺","NZDCAD":"🇳🇿"};

function getRealPair(){
  try{
    if((document.body.innerText||"").includes("Select trade pair")) return {pair:stablePair,display:stableDisplay};
    let buyBtn=null;for(let el of document.querySelectorAll('button, div')){let t=(el.innerText||"").trim();if(t==="Buy"&&el.getBoundingClientRect().top>window.innerHeight*0.5){buyBtn=el;break;}}
    if(buyBtn){
      let buyRect=buyBtn.getBoundingClientRect();let best=null;let bestDist=9999;
      for(let el of document.querySelectorAll('div, span')){
        let txt=(el.innerText||"").trim();if(txt.length>30||txt.length<5) continue;if(!txt.includes('%')) continue;if(/OTC/i.test(txt)) continue;
        let m=txt.match(/^([A-Z]{3}\/[A-Z]{3})/);if(!m) continue;
        let r=el.getBoundingClientRect();if(r.top>buyRect.top) continue;if(buyRect.top-r.top>350) continue;
        let dist=buyRect.top-r.top;if(dist<bestDist){bestDist=dist;best={pair:m[1].replace('/','').toUpperCase(),display:m[1]};}
      }
      if(best){let now=Date.now();if(best.pair!==stablePair){if(now>stableLock){stablePair=best.pair;stableDisplay=best.display;stableLock=now+10000;}}else{stableDisplay=best.display;}return {pair:stablePair,display:stableDisplay};}
    }
  }catch(e){}
  return {pair:stablePair,display:stableDisplay};
}

function getRealPrice(){
  try{
    for(let el of document.querySelectorAll('div, span')){
      let txt=(el.innerText||"").trim();
      if(txt.match(/^\d+\.\d{3,5}$/)&&txt.length>=6&&txt.length<=9){
        let r=el.getBoundingClientRect();
        if(r.top>50&&r.top<300&&r.left>window.innerWidth*0.4){return txt;}
      }
    }
  }catch(e){}
  return null;
}

function updateUI(sig){
  let pairEl=document.getElementById("gh-pair");if(pairEl) pairEl.textContent=sig.market||stableDisplay;
  let flagEl=document.getElementById("gh-flag");if(flagEl) flagEl.textContent=FLAGS[sig.pair]||"🌍";
  let callBox=document.getElementById("gh-call-box");let callTxt=document.getElementById("gh-call");let arrow=document.getElementById("gh-arrow");
  if(callBox&&callTxt){
    let dir=sig.direction||sig.signal;
    if(dir==="UP"){callBox.className="gh-call-box";callTxt.textContent="CALL";arrow.textContent="↗";}
    else if(dir==="DOWN"){callBox.className="gh-call-box down";callTxt.textContent="PUT";arrow.textContent="↘";}
    else{callBox.className="gh-call-box wait";callTxt.textContent="WAIT";arrow.textContent="⏳";}
  }
  let trendEl=document.getElementById("gh-trend");if(trendEl){trendEl.textContent=sig.filter?.trend||sig.direction||"WAIT";trendEl.className=sig.direction==="DOWN"?"down":"";}
  let payoutEl=document.getElementById("gh-payout");if(payoutEl) payoutEl.textContent=(sig.payout||85)+"%";
  let priceEl=document.getElementById("gh-price");if(priceEl){let rp=getRealPrice();priceEl.textContent=rp||sig.price||"0.00000";}
}

function fetchSig(){
  let info=getRealPair();let asset=info.pair;
  if((document.body.innerText||"").includes("Select trade pair")) return;
  let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";
  if(TOKEN) url+="&token="+encodeURIComponent(TOKEN);
  fetch(url).then(r=>r.json()).then(j=>{
    if(!j||j.signal=="ERROR") return;
    if(j.status==="ACTIVE"&&(j.signal==="UP"||j.signal==="DOWN")){currentSignal=j;updateUI(j);}
    else if(j.signal==="WAIT"){if(!currentSignal||Date.now()>currentSignal.expiry_timestamp){currentSignal={...j,market:info.display,pair:asset,direction:"WAIT",signal:"WAIT",expiry_timestamp:Date.now()+60000};updateUI(currentSignal);}}
  }).catch(()=>{});
}

setInterval(()=>{
  let timeNowEl=document.getElementById("gh-time-now");if(timeNowEl){let now=new Date();timeNowEl.textContent=now.toLocaleTimeString('en-GB',{hour12:false});}
  let rp=getRealPrice();let pr=document.getElementById("gh-price");if(rp&&pr) pr.textContent=rp;
  if(!currentSignal){let tm=document.getElementById("gh-timer");if(tm){let sec=60-new Date().getSeconds();if(sec===60) sec=0;tm.textContent="00:"+(sec<10?"0"+sec:sec);}return;}
  let rem=Math.max(0,Math.ceil((currentSignal.expiry_timestamp-Date.now())/1000));
  let tm=document.getElementById("gh-timer");if(tm){let s=rem%60;let m=Math.floor(rem/60);tm.textContent=(m<10?"0"+m:m)+":"+(s<10?"0"+s:s);}
  if(rem<=0) currentSignal=null;
},500);

setInterval(fetchSig,4000);fetchSig();
})();
