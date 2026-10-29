(function(){
let css=document.createElement("style");
css.innerHTML=`
#ghost-bot{position:fixed;top:100px;right:10px;z-index:2147483647;width:240px;background:#0a0f1e;border:1px solid #00ff88;border-radius:10px;box-shadow:0 4px 20px #0008;font-family:Inter,sans-serif;color:#e8f0ff;overflow:hidden;user-select:none}
.gh-h{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#0f1c2f;border-bottom:1px solid #1a324a;cursor:move}
.gh-h b{font-size:10px;color:#fff;letter-spacing:.8px}
.gh-h span{font-size:7px;color:#6a8a9a;display:block}
.gh-x{width:18px;height:18px;background:#1a2035;border:1px solid #2a3455;border-radius:4px;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:10px}
.gh-x:hover{background:#ff1744;border-color:#ff1744}
.gh-body{padding:8px 10px}
.gh-pair-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.gh-pair{font-size:11px;font-weight:800;color:#fff}
.gh-badge{font-size:6px;background:#0a2a1a;border:1px solid #00ff88;color:#00ff88;padding:2px 5px;border-radius:10px}
.gh-sig{height:42px;background:#111a2a;border:1px solid #1e344e;border-radius:8px;display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:6px}
.gh-sig.up{background:linear-gradient(145deg,#0a2a1a,#0f3a22);border-color:#00ff88;color:#00ff88}
.gh-sig.down{background:linear-gradient(145deg,#2a1515,#1e0f15);border-color:#ff3a5a;color:#ff3a5a}
.gh-sig b{font-size:16px;letter-spacing:1px}
.gh-info{display:flex;justify-content:space-between;font-size:7px;color:#6a8a9a;margin-bottom:4px}
.gh-info b{font-size:8px;color:#fff}
.gh-timer{font-size:12px;color:#00ff88;font-weight:800;text-align:center;margin:4px 0}
.gh-price{font-size:7px;color:#6a8a9a;text-align:center;border-top:1px solid #1a2f4a;padding-top:5px;margin-top:5px}
.gh-price b{color:#00ff88}
`;
document.head.appendChild(css);
let old=document.getElementById("ghost-bot");if(old) old.remove();
let box=document.createElement("div");box.id="ghost-bot";
box.innerHTML=`
<div class="gh-h" id="gh-h"><div><b>GHOST BOT</b><span>SAFE 1M • REAL ONLY</span></div><div class="gh-x" id="gh-x">✕</div></div>
<div class="gh-body">
  <div class="gh-pair-row"><div class="gh-pair" id="gh-pair">EUR/USD</div><div class="gh-badge">REAL MARKET ✓</div></div>
  <div class="gh-sig" id="gh-sig"><span id="gh-arrow">⏳</span><b id="gh-txt">WAIT</b></div>
  <div class="gh-info"><span>CONFIDENCE <b id="gh-conf">0%</b></span><span>TREND <b id="gh-trend">WAIT</b></span><span>RISK <b>1%</b></span></div>
  <div class="gh-timer" id="gh-timer">00:00</div>
  <div class="gh-price">PRICE <b id="gh-price">0.00000</b> • <span id="gh-time">--:--:--</span> • 99-100%</div>
</div>
`;
document.body.appendChild(box);

let x=document.getElementById("gh-x");
x.addEventListener("click",e=>{e.stopPropagation();document.getElementById("ghost-bot")?.remove();});
x.addEventListener("touchend",e=>{e.stopPropagation();document.getElementById("ghost-bot")?.remove();});

let isDrag=false,sx=0,sy=0,il=0,it=0;let h=document.getElementById("gh-h");
function pos(){let r=box.getBoundingClientRect();return{left:r.left,top:r.top};}
function ds(e){if(e.target.closest("#gh-x")) return; isDrag=true;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;sx=cx;sy=cy;let p=pos();il=p.left;it=p.top;box.style.right="auto";e.preventDefault();}
function dm(e){if(!isDrag)return;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;box.style.left=(il+cx-sx)+"px";box.style.top=(it+cy-sy)+"px";e.preventDefault();}
function de(){isDrag=false;}
h.addEventListener("mousedown",ds);document.addEventListener("mousemove",dm);document.addEventListener("mouseup",de);
h.addEventListener("touchstart",ds,{passive:false});document.addEventListener("touchmove",dm,{passive:false});document.addEventListener("touchend",de);

let TOKEN="";try{let ss=document.getElementsByTagName('script');for(let s of ss){if(s.src&&s.src.includes('ghost.js')){let u=new URL(s.src);TOKEN=u.searchParams.get('token')||u.searchParams.get('access')||"";if(TOKEN)break;}}if(!TOKEN)TOKEN=localStorage.getItem('ghost_premium_token')||"";}catch(e){}
let currentSignal=null;let stablePair="EURUSD";let stableDisplay="EUR/USD";let stableLock=0;

function getRealPair(){
  try{
    if((document.body.innerText||"").includes("Select trade pair")) return {pair:stablePair,display:stableDisplay};
    let buyBtn=null;for(let el of document.querySelectorAll('button, div')){let t=(el.innerText||"").trim();if(t==="Buy"&&el.getBoundingClientRect().top>window.innerHeight*0.5){buyBtn=el;break;}}
    if(buyBtn){
      let br=buyBtn.getBoundingClientRect();let best=null;let bd=9999;
      for(let el of document.querySelectorAll('div, span')){
        let txt=(el.innerText||"").trim();if(txt.length>30||txt.length<5) continue;if(!txt.includes('%')) continue;if(/OTC/i.test(txt)) continue;
        let m=txt.match(/^([A-Z]{3}\/[A-Z]{3})/);if(!m) continue;
        let r=el.getBoundingClientRect();if(r.top>br.top) continue;if(br.top-r.top>350) continue;
        let d=br.top-r.top;if(d<bd){bd=d;best={pair:m[1].replace('/','').toUpperCase(),display:m[1]};}
      }
      if(best){let now=Date.now();if(best.pair!==stablePair){if(now>stableLock){stablePair=best.pair;stableDisplay=best.display;stableLock=now+10000;}}else{stableDisplay=best.display;}return {pair:stablePair,display:stableDisplay};}
    }
  }catch(e){}
  return {pair:stablePair,display:stableDisplay};
}
function getRealPrice(){
  try{for(let el of document.querySelectorAll('div, span')){let txt=(el.innerText||"").trim();if(txt.match(/^\d+\.\d{3,5}$/)&&txt.length>=6&&txt.length<=9){let r=el.getBoundingClientRect();if(r.top>50&&r.top<300&&r.left>window.innerWidth*0.4){return txt;}}}}catch(e){}return null;
}
function updateUI(j){
  let pe=document.getElementById("gh-pair");if(pe) pe.textContent=j.market||stableDisplay;
  let sig=document.getElementById("gh-sig");let txt=document.getElementById("gh-txt");let arr=document.getElementById("gh-arrow");
  let dir=j.direction||j.signal;
  if(sig&&txt){sig.className="gh-sig "+(dir==="UP"?"up":dir==="DOWN"?"down":"");if(dir==="UP"){txt.textContent="UP";arr.textContent="↗";}else if(dir==="DOWN"){txt.textContent="DOWN";arr.textContent="↘";}else{txt.textContent="WAIT";arr.textContent="⏳";}}
  let cf=document.getElementById("gh-conf");if(cf) cf.textContent=(j.confidence||0)+"%";
  let tr=document.getElementById("gh-trend");if(tr) tr.textContent=j.filter?.trend||dir||"WAIT";
  let pr=document.getElementById("gh-price");if(pr){let rp=getRealPrice();pr.textContent=rp||j.price||"0.00000";}
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
  let tn=document.getElementById("gh-time");if(tn) tn.textContent=new Date().toLocaleTimeString('en-GB',{hour12:false});
  let rp=getRealPrice();let pr=document.getElementById("gh-price");if(rp&&pr) pr.textContent=rp;
  if(!currentSignal){let tm=document.getElementById("gh-timer");if(tm){let s=60-new Date().getSeconds();if(s===60)s=0;tm.textContent="00:"+(s<10?"0"+s:s);}return;}
  let rem=Math.max(0,Math.ceil((currentSignal.expiry_timestamp-Date.now())/1000));
  let tm=document.getElementById("gh-timer");if(tm){let m=Math.floor(rem/60);let s=rem%60;tm.textContent=(m<10?"0"+m:m)+":"+(s<10?"0"+s:s);}
  if(rem<=0) currentSignal=null;
},500);
setInterval(fetchSig,4000);fetchSig();
})();
