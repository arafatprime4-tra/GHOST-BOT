(function(){
let css=document.createElement("style");
css.innerHTML="#ghost-mini{position:fixed;top:85px;right:12px;z-index:9999999;background:#0a1421;border:1px solid #00d49a;border-radius:14px;padding:12px;width:200px;color:#fff;font-family:Inter,sans-serif}#ghost-head{font-size:11px;font-weight:900;display:flex;align-items:center;gap:6px;cursor:move;user-select:none;padding:6px;margin:-6px -6px 8px -6px;border-radius:10px 10px 0 0;background:rgba(0,212,154,.18)} .g-signal{font-size:23px;font-weight:900;text-align:center;margin:10px 0;padding:14px;border-radius:10px} .g-up{background:#00c853;color:#fff} .g-down{background:#ff1744;color:#fff} .g-wait{background:#2a2a3a;color:#aaa} .g-pair{font-size:13px;text-align:center;color:#00d4ff;font-weight:800;margin-bottom:6px} .g-foot{font-size:11px;text-align:center;color:#a5b6cb;margin-top:6px;font-weight:700}";
document.head.appendChild(css);
let old=document.getElementById("ghost-mini");if(old)old.remove();
let d=document.createElement("div");d.id="ghost-mini";
d.innerHTML='<div id="ghost-head"><div style="width:8px;height:8px;background:#00ff88;border-radius:50%"></div>GHOST BOT<div style="margin-left:auto;opacity:.6">⋮⋮</div></div><div id="gpair" class="g-pair">DETECTING...</div><div id="gs" class="g-signal g-wait">WAIT</div><div id="gfoot" class="g-foot">SAFE 1M • 60s • RISK 1%</div><button onclick="this.parentElement.remove()" style="width:100%;margin-top:10px;padding:7px;border-radius:8px;background:#1a1a2e;color:#fff;border:1px solid #2a2a4a;font-size:10px">Close</button>';
document.body.appendChild(d);
let isDrag=false,sx=0,sy=0,il=0,it=0;
let head=document.getElementById("ghost-head"),box=document.getElementById("ghost-mini");
function getPos(){let r=box.getBoundingClientRect();return{left:r.left,top:r.top};}
function ds(e){isDrag=true;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;sx=cx;sy=cy;let p=getPos();il=p.left;it=p.top;box.style.right="auto";box.style.bottom="auto";e.preventDefault();}
function dm(e){if(!isDrag)return;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;box.style.left=(il+cx-sx)+"px";box.style.top=(it+cy-sy)+"px";e.preventDefault();}
function de(){isDrag=false;}
head.addEventListener("mousedown",ds);document.addEventListener("mousemove",dm);document.addEventListener("mouseup",de);
head.addEventListener("touchstart",ds,{passive:false});document.addEventListener("touchmove",dm,{passive:false});document.addEventListener("touchend",de);
let TOKEN="";
try{let scs=document.getElementsByTagName('script');for(let sc of scs){if(sc.src&&sc.src.includes('ghost.js')){let u=new URL(sc.src);TOKEN=u.searchParams.get('token')||u.searchParams.get('access')||"";if(TOKEN)break;}}if(!TOKEN)TOKEN=localStorage.getItem('ghost_premium_token')||"";}catch(e){}

let stablePair="EURUSD";let stableOTC=false;let stableDisplay="EURUSD";
let lastFetchPair="";

function getCurrentPairStable(){
  try{
    // If Select trade pair modal is open, DON'T update pair - keep stable
    let bodyText=document.body.innerText||"";
    if(bodyText.includes("Select trade pair")||bodyText.includes("Sort by: Name")){
      return {pair:stablePair,otc:stableOTC,display:stableDisplay};
    }
    // Only look at bottom bar - where current pair is shown with % and Buy/Sell
    // Bottom bar has AUD/JPY 70% etc, not the list
    let bottomCandidates=document.querySelectorAll('div');
    for(let el of bottomCandidates){
      let txt=(el.innerText||"").trim();
      if(!txt||txt.length>35) continue;
      // Must be like "AUD/JPY 70%" and near bottom (investment area)
      if(txt.match(/^[A-Z]{3}\/[A-Z]{3}/)&&txt.includes('%')&&txt.length<20){
        let rect=el.getBoundingClientRect();
        // Bottom area is lower part of screen (investment $1 area)
        if(rect.top>window.innerHeight*0.6){
          let m=txt.match(/^([A-Z]{3})\/([A-Z]{3})(\s*\(OTC\))?/);
          if(m){
            let pair=(m[1]+m[2]).toUpperCase();
            let otc=/OTC/i.test(txt);
            stablePair=pair;stableOTC=otc;stableDisplay=m[0];
            return {pair:pair,otc:otc,display:m[0]};
          }
        }
      }
    }
    // Fallback: keep last stable
    return {pair:stablePair,otc:stableOTC,display:stableDisplay};
  }catch(e){}
  return {pair:stablePair,otc:stableOTC,display:stableDisplay};
}

let lockedSig="WAIT";let lockUntil=0;let sec=60;let lastCandleSec=60;

function getCandleSecStable(){
  try{
    let els=document.querySelectorAll('div, span');
    let found=[];
    for(let el of els){
      let txt=(el.innerText||"").trim();
      if(!txt||txt.length>6) continue;
      let m=txt.match(/^00:([0-5][0-9])$/);
      if(m){
        let r=el.getBoundingClientRect();
        if(r.width<90&&r.top>0&&r.top<700) found.push(parseInt(m[1]));
      }
    }
    if(found.length>0){
      // Take most common or first
      let sec=found[0];
      // Validate: must decrease by 1 each sec, not jump 1->76
      // If jump >10, ignore and keep last
      if(lastCandleSec!==null){
        let diff=lastCandleSec-sec;
        // Normal countdown: diff 0,1,2 or -59 (when new candle 0->59)
        if(diff>=0&&diff<=3) {lastCandleSec=sec;return sec;}
        if(diff<=-57) {lastCandleSec=sec;return sec;} // new candle 0->59
        // If big jump like 1->76, ignore
        return lastCandleSec;
      }else{
        lastCandleSec=sec;
        return sec;
      }
    }
  }catch(e){}
  return null;
}

function fetchSig(){
 let info=getCurrentPairStable();
 // Don't fetch if pair modal open and pair unchanged
 if(info.pair===lastFetchPair && (document.body.innerText||"").includes("Select trade pair")){
   return;
 }
 lastFetchPair=info.pair;
 let asset=info.pair;let display=asset+(info.otc?" OTC":"");
 let gp=document.getElementById("gpair");if(gp)gp.textContent=display;
 let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";
 if(TOKEN) url+="&token="+encodeURIComponent(TOKEN);
 fetch(url).then(r=>r.json()).then(j=>{
  let el=document.getElementById("gs");if(!el)return;
  if(!j||j.signal=="ERROR"){el.textContent="WAIT";el.className="g-signal g-wait";return;}
  let sig=j.signal||"WAIT";let now=Date.now();
  if((sig==="UP"||sig==="DOWN")&&now>lockUntil){lockedSig=sig;lockUntil=now+58000;sec=60;}
  else if(sig==="WAIT"&&now>lockUntil){lockedSig="WAIT";}
  let finalSig=lockedSig;
  let cSec=getCandleSecStable();
  if(cSec!==null&&cSec<5&&now<lockUntil) finalSig="WAIT";
  el.textContent=finalSig;el.className="g-signal "+(finalSig=="UP"?"g-up":finalSig=="DOWN"?"g-down":"g-wait");
 }).catch(e=>{});
}

setInterval(()=>{
 let cSec=getCandleSecStable();
 let foot=document.getElementById("gfoot");
 if(cSec!==null){
  sec=cSec;
  if(foot) foot.textContent="SAFE 1M • "+sec+"s • RISK 1%";
 }else{
  sec=sec<=0?60:sec-1;
  if(foot) foot.textContent="SAFE 1M • "+sec+"s • RISK 1%";
 }
},1000);

setInterval(fetchSig,5000);
fetchSig();
})();
