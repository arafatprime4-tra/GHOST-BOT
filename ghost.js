(function(){
let css=document.createElement("style");
css.innerHTML="#ghost-mini{position:fixed;top:85px;right:12px;z-index:9999999;background:#0a1421;border:1px solid #00d49a;border-radius:14px;padding:12px;width:200px;color:#fff;font-family:Inter,sans-serif;box-shadow:0 8px 32px rgba(0,212,154,.35)} #ghost-head{font-size:11px;font-weight:900;display:flex;align-items:center;gap:6px;cursor:move;user-select:none;padding:6px;margin:-6px -6px 8px -6px;border-radius:10px 10px 0 0;background:rgba(0,212,154,.18)} .g-signal{font-size:24px;font-weight:900;text-align:center;margin:10px 0;padding:14px;border-radius:10px;transition:none} .g-up{background:#00c853;color:#fff} .g-down{background:#ff1744;color:#fff} .g-wait{background:#2a2a3a;color:#aaa} .g-pair{font-size:13px;text-align:center;color:#00d4ff;font-weight:800;margin-bottom:6px;min-height:16px} .g-foot{font-size:11px;text-align:center;color:#a5b6cb;margin-top:6px;font-weight:700}";
document.head.appendChild(css);
let old=document.getElementById("ghost-mini");if(old)old.remove();
let d=document.createElement("div");d.id="ghost-mini";
d.innerHTML='<div id="ghost-head"><div style="width:8px;height:8px;background:#00ff88;border-radius:50%"></div>GHOST BOT<div style="margin-left:auto;opacity:.6">⋮⋮</div></div><div id="gpair" class="g-pair">DETECTING...</div><div id="gs" class="g-signal g-wait">WAIT</div><div id="gfoot" class="g-foot">SAFE 1M • 60s • RISK 1%</div><button onclick="this.parentElement.remove()" style="width:100%;margin-top:10px;padding:7px;border-radius:8px;background:#1a1a2e;color:#fff;border:1px solid #2a2a4a;font-size:10px">Close</button>';
document.body.appendChild(d);
let isDrag=false,sx=0,sy=0,il=0,it=0;let head=document.getElementById("ghost-head"),box=document.getElementById("ghost-mini");
function getPos(){let r=box.getBoundingClientRect();return{left:r.left,top:r.top};}
function ds(e){isDrag=true;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;sx=cx;sy=cy;let p=getPos();il=p.left;it=p.top;box.style.right="auto";box.style.bottom="auto";e.preventDefault();}
function dm(e){if(!isDrag)return;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;box.style.left=(il+cx-sx)+"px";box.style.top=(it+cy-sy)+"px";e.preventDefault();}
function de(){isDrag=false;}
head.addEventListener("mousedown",ds);document.addEventListener("mousemove",dm);document.addEventListener("mouseup",de);
head.addEventListener("touchstart",ds,{passive:false});document.addEventListener("touchmove",dm,{passive:false});document.addEventListener("touchend",de);
let TOKEN="";try{let scs=document.getElementsByTagName('script');for(let sc of scs){if(sc.src&&sc.src.includes('ghost.js')){let u=new URL(sc.src);TOKEN=u.searchParams.get('token')||u.searchParams.get('access')||"";if(TOKEN)break;}}if(!TOKEN)TOKEN=localStorage.getItem('ghost_premium_token')||"";}catch(e){}

let stablePair="EURUSD";let stableOTC=false;let stableDisplay="EURUSD";let stableLockUntil=0;
function getPairClock(){
  try{
    let bodyText=document.body.innerText||"";
    if(bodyText.includes("Select trade pair")){
      return {pair:stablePair,otc:stableOTC,display:stableDisplay};
    }
    // Find investment area - most stable
    let allDivs=document.querySelectorAll('div');
    let best=null;let bestTop=0;
    for(let el of allDivs){
      let txt=(el.innerText||"").trim();
      if(txt.length>30||txt.length<5) continue;
      if(!txt.includes('%')) continue;
      let m=txt.match(/^([A-Z]{3}\/[A-Z]{3})(\s*\(OTC\))?/);
      if(!m) continue;
      let r=el.getBoundingClientRect();
      // Must be in bottom half and not too wide (pair badge)
      if(r.top<window.innerHeight*0.55) continue;
      if(r.width>180) continue;
      // The one closest to bottom (investment row) is most stable
      if(r.top>bestTop){bestTop=r.top;best={pair:(m[1].replace('/','')).toUpperCase(),otc:/OTC/i.test(txt),display:m[1]+(m[2]||""),el:el};}
    }
    if(best){
      let now=Date.now();
      if(best.pair!==stablePair){
        // Debounce: only change if stable for 2 detections, or lock expired
        if(now>stableLockUntil){stablePair=best.pair;stableOTC=best.otc;stableDisplay=best.display;stableLockUntil=now+8000;}
      }else{
        stableDisplay=best.display;stableOTC=best.otc;
      }
      return {pair:stablePair,otc:stableOTC,display:stableDisplay};
    }
  }catch(e){}
  return {pair:stablePair,otc:stableOTC,display:stableDisplay};
}

let lockedSig="WAIT";let lockUntil=0;
function fetchSig(){
 let info=getPairClock();
 let asset=info.pair;
 let display=asset+(info.otc?" OTC":"");
 let gp=document.getElementById("gpair");if(gp)gp.textContent=display;
 if(document.body.innerText.includes("Select trade pair")) return;
 let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";
 if(TOKEN) url+="&token="+encodeURIComponent(TOKEN);
 fetch(url).then(r=>r.json()).then(j=>{
  let el=document.getElementById("gs");if(!el)return;
  if(!j||j.signal=="ERROR"){return;}
  let sig=j.signal||"WAIT";let now=Date.now();
  if((sig==="UP"||sig==="DOWN")&&now>lockUntil){lockedSig=sig;lockUntil=now+58000;}
  else if(sig==="WAIT"&&now>lockUntil){lockedSig="WAIT";}
  let finalSig=lockedSig;
  let secNow=60-new Date().getSeconds();
  if(secNow<5&&now<lockUntil) finalSig="WAIT";
  el.textContent=finalSig;el.className="g-signal "+(finalSig=="UP"?"g-up":finalSig=="DOWN"?"g-down":"g-wait");
 }).catch(e=>{});
}

// CLOCK-BASED TIMER - never zigzag, always 60->0 smooth based on real clock
setInterval(()=>{
 let sec=60-new Date().getSeconds();
 if(sec===60) sec=0;
 let foot=document.getElementById("gfoot");
 if(foot) foot.textContent="SAFE 1M • "+sec+"s • RISK 1%";
},500);

setInterval(fetchSig,6000);
fetchSig();
})();
