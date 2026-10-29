(function(){
let s=document.createElement("style");
s.innerHTML="#ghost-mini{position:fixed;top:70px;right:10px;z-index:9999999;background:rgba(10,10,22,0.97);border:1px solid #00d49a;border-radius:14px;padding:10px;width:200px;color:#fff;font-family:Inter,sans-serif;box-shadow:0 0 25px rgba(0,212,154,.45)} #ghost-head{font-size:11px;font-weight:900;display:flex;align-items:center;gap:6px;cursor:move;user-select:none;padding:5px;margin:-5px -5px 6px -5px;border-radius:10px 10px 0 0;background:rgba(0,212,154,.18)} .g-signal{font-size:22px;font-weight:900;text-align:center;margin:8px 0;padding:12px;border-radius:10px} .g-up{background:#00c853;color:#fff} .g-down{background:#ff1744;color:#fff} .g-wait{background:#3a3a4a;color:#fff} .g-pair{font-size:13px;text-align:center;color:#00d4ff;font-weight:800;margin-bottom:6px} .g-foot{font-size:10px;text-align:center;opacity:.7;margin-top:6px} .g-market-time{font-size:9px;color:#00ff88;text-align:center;margin-top:4px}";
document.head.appendChild(s);
let old=document.getElementById("ghost-mini");if(old)old.remove();
let d=document.createElement("div");d.id="ghost-mini";
d.innerHTML='<div id="ghost-head"><div style="width:7px;height:7px;background:#00ff88;border-radius:50%"></div>GHOST PREMIUM BOT<div style="margin-left:auto;opacity:.5">⋮⋮</div></div><div id="gpair" class="g-pair">DETECTING...</div><div id="gs" class="g-signal g-wait">WAIT</div><div id="gfoot" class="g-foot">SAFE 1M • 60s • RISK 1%</div><div id="gmarket" class="g-market-time">Candle • PA+EMA+RSI • No Flicker</div><button onclick="this.parentElement.remove()" style="width:100%;margin-top:8px;padding:6px;border-radius:8px;background:#1a1a2e;color:#fff;border:1px solid #2a2a4a;font-size:10px">Close</button>';
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
    let allBtns = document.querySelectorAll('button, div, span, a');
    for(let el of allBtns){
      let txt = (el.innerText||"").trim();
      if(!txt) continue;
      if(txt.length>30) continue;
      let pairMatch = txt.match(/^([A-Z]{3})\/([A-Z]{3})(\s*\(OTC\))?/);
      if(pairMatch && txt.includes('%')){
        let pair = (pairMatch[1]+pairMatch[2]).toUpperCase();
        let otc = /OTC/i.test(txt);
        let rect = el.getBoundingClientRect();
        if(rect.top>0 && rect.top < window.innerHeight){
          return {pair: pair, otc: otc, display: pairMatch[0]};
        }
      }
    }
  }catch(e){}
  return {pair: "EURUSD", otc: false, display: "EURUSD"};
}

function getCandleTimeLeft(){
  // ONLY candle timer 00:xx near price, NOT trade expiry 01:xx
  try{
    let candidates = document.querySelectorAll('div, span');
    for(let el of candidates){
      let txt = (el.innerText||"").trim();
      if(!txt || txt.length>6) continue;
      let m = txt.match(/^00:([0-5][0-9])$/);
      if(m){
        let sec = parseInt(m[1]);
        let rect = el.getBoundingClientRect();
        // Must be small timer near chart right side
        if(rect.width<80 && rect.height<40 && rect.top>0 && rect.top<600){
          return sec;
        }
      }
    }
    // Fallback: find last 00:xx in visible text (usually candle timer)
    let bodyText = document.body.innerText;
    let matches = bodyText.match(/00:[0-5][0-9]/g);
    if(matches && matches.length>0){
      let last = matches[matches.length-1];
      return parseInt(last.split(':')[1]);
    }
  }catch(e){}
  return null;
}

let lastPair="";let currentSignal="WAIT";let signalLockedUntil=0;

function upd(){
 let info=detectPairInfo();
 let asset=info.pair;
 let otc=info.otc;
 let displayPair=asset + (otc?" OTC":"");
 if(displayPair!==lastPair){
   lastPair=displayPair;
   let gp=document.getElementById("gpair");
   if(gp) gp.textContent=displayPair;
 }
 let url = "https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";
 if(GHOST_TOKEN) url += "&token="+encodeURIComponent(GHOST_TOKEN);
 fetch(url).then(r=>r.json()).then(j=>{
  let el=document.getElementById("gs");if(!el)return;
  if(!j||j.signal=="ERROR"||j.signal=="LOCKED"){el.textContent="WAIT";el.className="g-signal g-wait";return;}
  let sig=j.signal||"WAIT";
  let now = Date.now();
  // LOCK signal for full candle to avoid flicker 55->6->11 jump
  // If we have a UP/DOWN, lock it until candle ends (when candle timer goes 0->60)
  if(sig==="UP" || sig==="DOWN"){
    if(now > signalLockedUntil){
      currentSignal = sig;
      // Lock for 55 seconds (full candle)
      signalLockedUntil = now + 55000;
    }
  }else if(sig==="WAIT"){
    // Only allow WAIT if not locked or near candle end
    if(now > signalLockedUntil){
      currentSignal = "WAIT";
    }
  }
  let finalSig = currentSignal;
  // If candle <5s left, force WAIT to avoid late entry
  let candleLeft = getCandleTimeLeft();
  if(candleLeft!==null && candleLeft<5){
    finalSig = "WAIT";
  }
  el.textContent=finalSig;
  el.className="g-signal "+(finalSig=="UP"?"g-up":finalSig=="DOWN"?"g-down":"g-wait");
  let gp=document.getElementById("gpair");
  if(gp) gp.textContent=displayPair;
 }).catch(e=>{});
}

// SINGLE timer - only candle timer, no mixing
setInterval(()=>{
  let candleLeft = getCandleTimeLeft();
  let foot=document.getElementById("gfoot");
  let marketTxt=document.getElementById("gmarket");
  if(candleLeft!==null){
    if(foot) foot.textContent="SAFE 1M • "+candleLeft+"s left • RISK 1%";
    if(marketTxt) marketTxt.textContent="Candle: "+candleLeft+"s • "+(currentSignal==="WAIT"?"Waiting":"Locked "+currentSignal)+" • No Flicker";
  }else{
    // Fallback if candle timer not found, use smooth countdown 60->0
    if(foot){
      let m = foot.textContent.match(/(\d+)s left/);
      if(m){
        let sec = parseInt(m[1]);
        sec = sec<=0 ? 60 : sec-1;
        foot.textContent="SAFE 1M • "+sec+"s left • RISK 1%";
      }
    }
  }
},1000);

setInterval(upd,2000);
upd();
})();
