(function(){
let css=document.createElement("style");
css.innerHTML=`
#ghost-bot{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:285px;background:linear-gradient(180deg,#0d1428,#080d1c);border:1.5px solid #00ff88;border-radius:14px;box-shadow:0 0 20px rgba(0,255,136,.2),0 10px 30px #000c;font-family:Inter,sans-serif;color:#e8f0ff;overflow:hidden;user-select:none}
.gh-h{padding:10px 14px;background:#0a1528;border-bottom:1px solid #122a3a;display:flex;align-items:center;justify-content:space-between;cursor:move}
.gh-h-left{display:flex;align-items:center;gap:8px}
.gh-dot{width:9px;height:9px;background:#00ff88;border-radius:50%;box-shadow:0 0 8px #00ff88}
.gh-h b{font-size:11px;color:#fff;letter-spacing:.8px;font-weight:900}
.gh-pair{font-size:13px;font-weight:900;color:#1e90ff;text-align:center;margin:10px 0 8px;letter-spacing:1px}
.gh-sig{margin:0 14px;height:52px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;letter-spacing:1.5px;transition:all .2s}
.gh-sig.up{background:linear-gradient(145deg,#00c853,#009624);color:#fff;box-shadow:0 4px 15px rgba(0,200,83,.3)}
.gh-sig.down{background:linear-gradient(145deg,#ff1744,#d5002b);color:#fff;box-shadow:0 4px 15px rgba(255,23,68,.3)}
.gh-sig.wait{background:#1a233a;color:#5a6f8a;border:1px solid #22314a}
.gh-meta{font-size:10px;color:#5a6f8a;text-align:center;margin:10px 0 12px;letter-spacing:.5px;font-weight:600}
.gh-close{margin:0 14px 14px;height:38px;background:#131a2e;border:1px solid #1e2d4a;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#8a9ab5;font-size:11px;font-weight:600;cursor:pointer}
.gh-close:hover{background:#1a2340;color:#fff}
`;
document.head.appendChild(css);
let old=document.getElementById("ghost-bot");if(old) old.remove();
let box=document.createElement("div");box.id="ghost-bot";
box.innerHTML=`
<div class="gh-h" id="gh-h"><div class="gh-h-left"><div class="gh-dot"></div><b>GHOST BOT</b></div><div style="font-size:8px;color:#00ff88" id="gh-pair-small">EUR/USD</div></div>
<div class="gh-pair" id="gh-pair">EURUSD</div>
<div class="gh-sig wait" id="gh-sig"><span id="gh-txt">WAIT</span></div>
<div class="gh-meta" id="gh-meta">SAFE 1M • <span id="gh-sec">--s</span> • RISK 1% • <span id="gh-status">AUTO</span></div>
<div class="gh-close" id="gh-close">Close</div>
`;
document.body.appendChild(box);

document.getElementById("gh-close").addEventListener("click",e=>{e.stopPropagation();box.remove();});
document.getElementById("gh-close").addEventListener("touchend",e=>{e.stopPropagation();box.remove();});

let isDrag=false,sx=0,sy=0,il=0,it=0;let hd=document.getElementById("gh-h");
function getPos(){let r=box.getBoundingClientRect();return{left:r.left,top:r.top};}
function ds(e){if(e.target.closest("#gh-close")) return; isDrag=true;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;sx=cx;sy=cy;let p=getPos();il=p.left;it=p.top;box.style.left=p.left+"px";box.style.right="auto";box.style.bottom="auto";box.style.transform="none";e.preventDefault();}
function dm(e){if(!isDrag)return;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;box.style.left=(il+cx-sx)+"px";box.style.top=(it+cy-sy)+"px";e.preventDefault();}
function de(){isDrag=false;}
hd.addEventListener("mousedown",ds);document.addEventListener("mousemove",dm);document.addEventListener("mouseup",de);
hd.addEventListener("touchstart",ds,{passive:false});document.addEventListener("touchmove",dm,{passive:false});document.addEventListener("touchend",de);

let TOKEN="";try{let ss=document.getElementsByTagName('script');for(let s of ss){if(s.src&&s.src.includes('ghost.js')){let u=new URL(s.src);TOKEN=u.searchParams.get('token')||u.searchParams.get('access')||"";if(TOKEN)break;}}if(!TOKEN)TOKEN=localStorage.getItem('ghost_premium_token')||"";}catch(e){}

let currentSignal=null;let stablePair="EURUSD";let stableDisplay="EURUSD";let stableLock=0;let lastGoodSignal=null;let waitCount=0;let lastPrice=0;let priceHistory=[];

function getRealPair(){
  try{
    // Method 1: Bottom pair display "EUR/USD 75%" - most reliable for market change
    let bottomPair=null;
    for(let el of document.querySelectorAll('div, span')){
      let txt=(el.innerText||"").trim();
      // Match EUR/USD 75% format - exactly what you see when you change market
      let m=txt.match(/^([A-Z]{3}\/[A-Z]{3})\s+\d+%\s*$/);
      if(m){
        let r=el.getBoundingClientRect();
        // Bottom area where pair selector is
        if(r.top > window.innerHeight*0.6 && r.top < window.innerHeight*0.95){
          bottomPair={pair:m[1].replace('/','').toUpperCase(),display:m[1].replace('/','')};
          break;
        }
      }
    }
    if(bottomPair){
      let now=Date.now();
      if(bottomPair.pair!==stablePair){
        if(now>stableLock){
          console.log("[GHOST] Market changed:", stablePair, "->", bottomPair.pair);
          stablePair=bottomPair.pair;stableDisplay=bottomPair.display;stableLock=now+2000;
          // Market change হলে সাথে সাথে পুরানো signal clear
          currentSignal=null;lastGoodSignal=null;waitCount=0;
          let statusEl=document.getElementById("gh-status");if(statusEl) statusEl.textContent="CHANGED";
          setTimeout(()=>{let s=document.getElementById("gh-status");if(s) s.textContent="AUTO";},2000);
          return {pair:stablePair,display:stableDisplay,changed:true};
        }
      }else{
        stableDisplay=bottomPair.display;
      }
      return {pair:stablePair,display:stableDisplay,changed:false};
    }

    // Method 2: Near Buy button (fallback)
    if((document.body.innerText||"").includes("Select trade pair")) return {pair:stablePair,display:stableDisplay,changed:false};
    let buyBtn=null;for(let el of document.querySelectorAll('button, div')){let t=(el.innerText||"").trim();if(t==="Buy"&&el.getBoundingClientRect().top>window.innerHeight*0.5){buyBtn=el;break;}}
    if(buyBtn){
      let br=buyBtn.getBoundingClientRect();let best=null;let bd=9999;
      for(let el of document.querySelectorAll('div, span')){
        let txt=(el.innerText||"").trim();if(txt.length>30||txt.length<5) continue;if(!txt.includes('%')) continue;if(/OTC/i.test(txt)) continue;
        let m=txt.match(/^([A-Z]{3}\/[A-Z]{3})/);if(!m) continue;
        let r=el.getBoundingClientRect();if(r.top>br.top) continue;if(br.top-r.top>350) continue;
        let d=br.top-r.top;if(d<bd){bd=d;best={pair:m[1].replace('/','').toUpperCase(),display:m[1].replace('/','')};}
      }
      if(best){
        let now=Date.now();
        if(best.pair!==stablePair){
          if(now>stableLock){
            console.log("[GHOST] Market changed (method2):", stablePair, "->", best.pair);
            stablePair=best.pair;stableDisplay=best.display;stableLock=now+2000;
            currentSignal=null;lastGoodSignal=null;waitCount=0;
            return {pair:stablePair,display:stableDisplay,changed:true};
          }
        }else{stableDisplay=best.display;}
        return {pair:stablePair,display:stableDisplay,changed:false};
      }
    }
  }catch(e){console.log("getRealPair error",e);}
  return {pair:stablePair,display:stableDisplay,changed:false};
}

function getRealPrice(){
  try{
    for(let el of document.querySelectorAll('div, span')){
      let txt=(el.innerText||"").trim();
      if(!/^\d+\.\d{3,5}$/.test(txt)) continue;
      let val=parseFloat(txt);if(val<0.3||val>250) continue;
      let r=el.getBoundingClientRect();
      if(r.width<20||r.width>80) continue;
      if(r.height<12||r.height>30) continue;
      if(r.left < window.innerWidth*0.7) continue; // right side price scale
      if(r.top<80||r.top>600) continue;
      if(txt.includes("$")) continue;
      return txt;
    }
  }catch(e){}
  return null;
}

function updateUI(j){
  let pairEl=document.getElementById("gh-pair");let pairSmall=document.getElementById("gh-pair-small");
  if(pairEl) pairEl.textContent=j.market||stableDisplay;
  if(pairSmall) pairSmall.textContent=j.market||stableDisplay;
  let sigEl=document.getElementById("gh-sig");let txtEl=document.getElementById("gh-txt");
  let dir=j.direction||j.signal;
  if(sigEl&&txtEl){
    if(dir==="UP"){sigEl.className="gh-sig up";txtEl.textContent="UP";lastGoodSignal=j;waitCount=0;}
    else if(dir==="DOWN"){sigEl.className="gh-sig down";txtEl.textContent="DOWN";lastGoodSignal=j;waitCount=0;}
    else{
      waitCount++;
      // 3 বার WAIT আসলে local price trend দিয়ে signal বানাও - যাতে খালি WAIT আটকে না থাকে
      if(waitCount>3 && priceHistory.length>=2){
        let last=priceHistory[priceHistory.length-1];
        let prev=priceHistory[priceHistory.length-2];
        let localDir=last>prev?"UP":"DOWN";
        sigEl.className=localDir==="UP"?"gh-sig up":"gh-sig down";
        txtEl.textContent=localDir+"*";
        console.log("[GHOST] Local fallback:", localDir);
      }else{
        if(lastGoodSignal && Date.now() < lastGoodSignal.expiry_timestamp){
          // আগের signal ধরে রাখো
          let ld=lastGoodSignal.direction||lastGoodSignal.signal;
          sigEl.className=ld==="UP"?"gh-sig up":"gh-sig down";
          txtEl.textContent=ld;
          return;
        }
        sigEl.className="gh-sig wait";txtEl.textContent="WAIT";
      }
    }
  }
}

function fetchSig(forcePair){
  let info=forcePair?{pair:forcePair,display:forcePair,changed:true}:getRealPair();
  let asset=info.pair;
  if(info.changed){
    console.log("[GHOST] Fetching new market:", asset);
  }
  if((document.body.innerText||"").includes("Select trade pair")) return;
  let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";
  if(TOKEN) url+="&token="+encodeURIComponent(TOKEN);
  fetch(url).then(r=>r.json()).then(j=>{
    if(!j) return;
    if(j.signal=="ERROR") return;
    if(j.status==="ACTIVE"&&(j.signal==="UP"||j.signal==="DOWN")){
      currentSignal=j;updateUI(j);
    }else if(j.signal==="WAIT"){
      if(!currentSignal || Date.now() > currentSignal.expiry_timestamp){
        if(lastGoodSignal && Date.now() < lastGoodSignal.expiry_timestamp){
          updateUI(lastGoodSignal);
        }else{
          updateUI(j);
        }
      }
    }
  }).catch(e=>{console.log("fetch error",e);});
}

// Price history track for local fallback
setInterval(()=>{
  let rp=getRealPrice();
  if(rp){
    let v=parseFloat(rp);
    if(v && v!==lastPrice){
      priceHistory.push(v);
      if(priceHistory.length>10) priceHistory.shift();
      lastPrice=v;
    }
  }
},1000);

setInterval(()=>{
  let info=getRealPair();
  if(info.changed){
    fetchSig(info.pair);
  }
  if(!currentSignal){
    let secEl=document.getElementById("gh-sec");
    if(secEl){let sec=60-new Date().getSeconds();if(sec===60) sec=0;secEl.textContent=sec+"s";}
    return;
  }
  let rem=Math.max(0,Math.ceil((currentSignal.expiry_timestamp-Date.now())/1000));
  let secEl=document.getElementById("gh-sec");
  if(secEl) secEl.textContent=rem+"s";
  if(rem<=0){currentSignal=null;}
},500);

// Market change detect - প্রতি 1.5 sec এ check, change হলে সাথে সাথে fetch
setInterval(()=>{
  let info=getRealPair();
  if(info.changed){
    fetchSig(info.pair);
  }
},1500);

setInterval(()=>fetchSig(),4000);
fetchSig();
})();
