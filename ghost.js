(function(){
let s=document.createElement("style");
s.innerHTML="#ghost-mini{position:fixed;top:85px;right:12px;z-index:9999999;background:linear-gradient(145deg,#0a1421,#060d17);border:1px solid #00d49a;border-radius:14px;padding:12px;width:205px;color:#fff;font-family:Inter,sans-serif;box-shadow:0 8px 32px rgba(0,212,154,.35)} #ghost-head{font-size:11px;font-weight:900;display:flex;align-items:center;gap:6px;cursor:move;user-select:none;padding:6px;margin:-6px -6px 8px -6px;border-radius:10px 10px 0 0;background:rgba(0,212,154,.18)} .g-signal{font-size:23px;font-weight:900;text-align:center;margin:10px 0;padding:14px;border-radius:10px;transition:.3s} .g-up{background:#00c853;color:#fff;box-shadow:0 0 15px rgba(0,200,83,.5)} .g-down{background:#ff1744;color:#fff;box-shadow:0 0 15px rgba(255,23,68,.5)} .g-wait{background:#2a2a3a;color:#aaa} .g-pair{font-size:13px;text-align:center;color:#00d4ff;font-weight:800;margin-bottom:6px} .g-foot{font-size:11px;text-align:center;color:#a5b6cb;margin-top:6px;font-weight:700} .g-market{font-size:9px;color:#00ff88;text-align:center;margin-top:3px}";
document.head.appendChild(s);
let old=document.getElementById("ghost-mini");if(old)old.remove();
let d=document.createElement("div");d.id="ghost-mini";
d.innerHTML='<div id="ghost-head"><div style="width:8px;height:8px;background:#00ff88;border-radius:50%;box-shadow:0 0 8px #00ff88"></div>GHOST PREMIUM BOT<div style="margin-left:auto;opacity:.6">⋮⋮</div></div><div id="gpair" class="g-pair">DETECTING...</div><div id="gs" class="g-signal g-wait">WAIT</div><div id="gfoot" class="g-foot">SAFE 1M • 60s • RISK 1%</div><div id="gmarket" class="g-market">No Flicker • 55s Hold</div><button onclick="this.parentElement.remove()" style="width:100%;margin-top:10px;padding:7px;border-radius:8px;background:#1a1a2e;color:#fff;border:1px solid #2a2a4a;font-size:10px">Close</button>';
document.body.appendChild(d);
let isDrag=false,startX=0,startY=0,initLeft=0,initTop=0;
let head=document.getElementById("ghost-head");let box=document.getElementById("ghost-mini");
function getPos(){let r=box.getBoundingClientRect();return{left:r.left,top:r.top};}
function dragStart(e){isDrag=true;let cx=e.touches?e.touches[0].clientX:e.clientX;let cy=e.touches?e.touches[0].clientY:e.clientY;startX=cx;startY=cy;let pos=getPos();initLeft=pos.left;initTop=pos.top;box.style.right="auto";box.style.bottom="auto";e.preventDefault();}
function dragMove(e){if(!isDrag)return;let cx=e.touches?e.touches[0].clientX:e.clientX;let cy=e.touches?e.touches[0].clientY:e.clientY;box.style.left=(initLeft+cx-startX)+"px";box.style.top=(initTop+cy-startY)+"px";e.preventDefault();}
function dragEnd(){isDrag=false;}
head.addEventListener("mousedown",dragStart);document.addEventListener("mousemove",dragMove);document.addEventListener("mouseup",dragEnd);
head.addEventListener("touchstart",dragStart,{passive:false});document.addEventListener("touchmove",dragMove,{passive:false});document.addEventListener("touchend",dragEnd);
let GHOST_TOKEN="";
try{
  let scripts=document.getElementsByTagName('script');
  for(let sc of scripts){ if(sc.src && sc.src.includes('ghost.js')){ let u=new URL(sc.src); GHOST_TOKEN=u.searchParams.get('token')||u.searchParams.get('access')||""; if(GHOST_TOKEN) break; } }
  if(!GHOST_TOKEN) GHOST_TOKEN=localStorage.getItem('ghost_premium_token')||"";
}catch(e){}

function detectPairInfo(){
  try{
    let btns=document.querySelectorAll('button, div, span');
    for(let el of btns){
      let txt=(el.innerText||"").trim();
      if(!txt || txt.length>30) continue;
      let m=txt.match(/^([A-Z]{3})\/([A-Z]{3})(\s*\(OTC\))?/);
      if(m && txt.includes('%')){
        let pair=(m[1]+m[2]).toUpperCase();
        let otc=/OTC/i.test(txt);
        let r=el.getBoundingClientRect();
        if(r.top>0 && r.top<window.innerHeight) return {pair:pair, otc:otc, display:m[0]};
      }
    }
  }catch(e){}
  return {pair:"EURUSD", otc:false, display:"EURUSD"};
}

function getCandleSec(){
  try{
    let els=document.querySelectorAll('div, span');
    for(let el of els){
      let txt=(el.innerText||"").trim();
      if(!txt || txt.length>6) continue;
      let m=txt.match(/^00:([0-5][0-9])$/);
      if(m){
        let r=el.getBoundingClientRect();
        if(r.width<90 && r.top>0 && r.top<600) return parseInt(m[1]);
      }
    }
    let all=document.body.innerText.match(/00:[0-5][0-9]/g);
    if(all && all.length>0) return parseInt(all[all.length-1].split(':')[1]);
  }catch(e){}
  return null;
}

let lastPair="";let lockedSignal="WAIT";let lockUntil=0;let displayedSec=60;

function upd(){
 let info=detectPairInfo();
 let asset=info.pair;let otc=info.otc;let displayPair=asset+(otc?" OTC":"");
 if(displayPair!==lastPair){lastPair=displayPair;let gp=document.getElementById("gpair");if(gp)gp.textContent=displayPair;}
 let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";
 if(GHOST_TOKEN) url+="&token="+encodeURIComponent(GHOST_TOKEN);
 fetch(url).then(r=>r.json()).then(j=>{
  let el=document.getElementById("gs");if(!el)return;
  if(!j||j.signal=="ERROR"){el.textContent="WAIT";el.className="g-signal g-wait";return;}
  let sig=j.signal||"WAIT";
  let now=Date.now();
  // FINAL HOLD LOGIC: No flicker UP->WAIT->UP
  if((sig==="UP"||sig==="DOWN") && now>lockUntil){
    lockedSignal=sig;
    lockUntil=now+55000;
  }else if(sig==="WAIT" && now>lockUntil){
    lockedSignal="WAIT";
  }
  // If candle <5s, force WAIT
  let cSec=getCandleSec();
  let finalSig=lockedSignal;
  if(cSec!==null && cSec<5 && now<lockUntil){
    // Keep locked signal until 5s, then WAIT
    if(cSec<5) finalSig="WAIT";
  }
  el.textContent=finalSig;
  el.className="g-signal "+(finalSig=="UP"?"g-up":finalSig=="DOWN"?"g-down":"g-wait");
  let gp=document.getElementById("gpair");if(gp)gp.textContent=displayPair;
 }).catch(e=>{});
}

setInterval(()=>{
  let cSec=getCandleSec();
  let foot=document.getElementById("gfoot");
  let mTxt=document.getElementById("gmarket");
  if(cSec!==null){
    displayedSec=cSec;
    if(foot) foot.textContent="SAFE 1M • "+cSec+"s • RISK 1%";
    if(mTxt) mTxt.textContent=(lockedSignal==="WAIT"?"Waiting next candle":"Locked "+lockedSignal+" • No Flicker");
  }else{
    displayedSec=displayedSec<=0?60:displayedSec-1;
    if(foot) foot.textContent="SAFE 1M • "+displayedSec+"s • RISK 1%";
  }
},1000);

setInterval(upd,2500);
upd();
})();
