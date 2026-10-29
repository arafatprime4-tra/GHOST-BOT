(function(){
let s=document.createElement("style");
s.innerHTML="#ghost-mini{position:fixed;top:70px;right:10px;z-index:9999999;background:rgba(10,10,22,0.97);border:1px solid #00d49a;border-radius:14px;padding:10px;width:200px;color:#fff;font-family:Inter,sans-serif;box-shadow:0 0 25px rgba(0,212,154,.45)} #ghost-head{font-size:11px;font-weight:900;display:flex;align-items:center;gap:6px;cursor:move;user-select:none;padding:5px;margin:-5px -5px 6px -5px;border-radius:10px 10px 0 0;background:rgba(0,212,154,.18)} .g-signal{font-size:22px;font-weight:900;text-align:center;margin:8px 0;padding:12px;border-radius:10px} .g-up{background:#00c853;color:#fff} .g-down{background:#ff1744;color:#fff} .g-wait{background:#3a3a4a;color:#fff} .g-pair{font-size:13px;text-align:center;color:#00d4ff;font-weight:800;margin-bottom:6px} .g-foot{font-size:10px;text-align:center;opacity:.7;margin-top:6px} .g-market-time{font-size:9px;color:#ffcc00;text-align:center;margin-top:4px}";
document.head.appendChild(s);
let old=document.getElementById("ghost-mini");if(old)old.remove();
let d=document.createElement("div");d.id="ghost-mini";
d.innerHTML='<div id="ghost-head"><div style="width:7px;height:7px;background:#00ff88;border-radius:50%"></div>GHOST PREMIUM BOT<div style="margin-left:auto;opacity:.5">⋮⋮</div></div><div id="gpair" class="g-pair">DETECTING...</div><div id="gs" class="g-signal g-wait">WAIT</div><div id="gfoot" class="g-foot">SAFE 1M • SYNCING... • RISK 1%</div><div id="gmarket" class="g-market-time">Market: --s • Synced ✓</div><button onclick="this.parentElement.remove()" style="width:100%;margin-top:8px;padding:6px;border-radius:8px;background:#1a1a2e;color:#fff;border:1px solid #2a2a4a;font-size:10px">Close</button>';
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
    let selectors = [".current-symbol", ".pair-name", ".asset-name", "[data-qa='asset']"];
    for(let sel of selectors){
      let el = document.querySelector(sel);
      if(el){
        let txt = (el.innerText||el.textContent||"").trim();
        let m = txt.match(/([A-Z]{3})\/([A-Z]{3})/);
        if(m){
          let pair = (m[1]+m[2]).toUpperCase();
          let parentTxt = (el.parentElement ? el.parentElement.innerText : "") || "";
          let otc = /\(OTC\)/i.test(txt) || /\(OTC\)/i.test(parentTxt.substring(0,100));
          return {pair: pair, otc: otc, display: m[0] + (otc?" OTC":"")};
        }
      }
    }
  }catch(e){}
  return {pair: "EURUSD", otc: false, display: "EURUSD"};
}

function getQuotexMarketTimeLeft(){
  // NEW: Sync with Quotex real market timer - find "00:44" countdown near chart
  try{
    // Look for timer elements that show seconds left in current candle
    // In Quotex, top right near price shows "00:44" or "End of trade 00:44"
    let candidates = document.querySelectorAll('div, span');
    for(let el of candidates){
      let txt = (el.innerText||"").trim();
      if(!txt || txt.length>20) continue;
      // Pattern: 00:44 or 0:44 - timer, not clock 11:17 (clock is 11:17, timer is 00:xx)
      // Timer usually starts with 00: or 01: or 02:
      let m = txt.match(/^(00|01|02):([0-5][0-9])$/);
      if(m){
        let sec = parseInt(m[2]);
        // Additional check: timer element is small, near price, not the clock (clock is 11:17)
        // Clock is like 11:17, timer is 00:44
        if(txt.startsWith('00:') || txt.startsWith('01:')){
          let rect = el.getBoundingClientRect();
          // Timer usually near top right, price area
          if(rect.top>0 && rect.top<300){
            return sec + (m[1]==='01'?60:0) + (m[1]==='02'?120:0);
          }
        }
      }
      // Also check "End of trade" nearby
      if(txt.includes('End of trade')){
        let mm = txt.match(/([0-5][0-9]):([0-5][0-9])/);
        if(mm){
          return parseInt(mm[2]) + parseInt(mm[1])*60;
        }
      }
    }
    // Fallback: look for any 00:xx in page header area
    let headerText = document.body.innerText.substring(0,5000);
    let m2 = headerText.match(/00:([0-5][0-9])/);
    if(m2){
      return parseInt(m2[1]);
    }
  }catch(e){}
  return null;
}

let lastPair="";let lastSignal="WAIT";let signalStartTime=0;

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
 let marketTimeLeft = getQuotexMarketTimeLeft();
 let url = "https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";
 if(GHOST_TOKEN) url += "&token="+encodeURIComponent(GHOST_TOKEN);
 let start = Date.now();
 fetch(url).then(r=>r.json()).then(j=>{
  let elapsed = ((Date.now()-start)/1000).toFixed(1);
  let el=document.getElementById("gs");if(!el)return;
  if(!j||j.signal=="ERROR"||j.signal=="LOCKED"){el.textContent="WAIT";el.className="g-signal g-wait";return;}
  let sig=j.signal||"WAIT";
  // HOLD LOGIC: Keep signal for full candle, don't flicker
  if(sig!==lastSignal && (sig==="UP"||sig==="DOWN")){
    lastSignal=sig;
    signalStartTime=Date.now();
  }
  // If market time left is small (<5s), don't show new signal, WAIT for new candle
  if(marketTimeLeft!==null && marketTimeLeft<5 && sig!=="WAIT"){
    // Near candle end, hold WAIT to avoid late entry
    el.textContent="WAIT";
    el.className="g-signal g-wait";
  }else{
    el.textContent=sig;
    el.className="g-signal "+(sig=="UP"?"g-up":sig=="DOWN"?"g-down":"g-wait");
  }
  let gp=document.getElementById("gpair");
  if(gp) gp.textContent=displayPair;
  let foot=document.getElementById("gfoot");
  let marketTxt=document.getElementById("gmarket");
  // Use Quotex real timer if available, else use backend time_left
  let timeLeft = marketTimeLeft!==null ? marketTimeLeft : ((j.filter && j.filter.time_left) ? j.filter.time_left : 55);
  if(foot) foot.textContent="SAFE 1M • "+timeLeft+"s left • RISK 1% • "+elapsed+"s";
  if(marketTxt){
    if(marketTimeLeft!==null){
      marketTxt.textContent="Market: "+marketTimeLeft+"s • Synced ✓ • Analysis: PA+EMA+RSI+MTF";
    }else{
      marketTxt.textContent="Market: ~"+timeLeft+"s • Analysis: PA+EMA+RSI+MTF • Hold 55s";
    }
  }
 }).catch(e=>{});
}

// Update market timer every second for perfect sync
setInterval(()=>{
  let marketLeft = getQuotexMarketTimeLeft();
  let foot=document.getElementById("gfoot");
  let marketTxt=document.getElementById("gmarket");
  if(marketLeft!==null && foot){
    // Update foot with real market time
    let current = foot.textContent;
    foot.textContent = current.replace(/\d+s left/, marketLeft+"s left");
    if(marketTxt) marketTxt.textContent="Market: "+marketLeft+"s • Synced ✓ • PA+EMA+RSI+MTF";
  }
},1000);

setInterval(upd,1200);
upd();
})();
