(function(){
let css=document.createElement("style");
css.innerHTML=`
#ghost-bot{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:220px;background:linear-gradient(180deg,#0f0f0f,#080808);border:1px solid #d4af37;border-radius:10px;box-shadow:0 0 15px rgba(212,175,55,.25),0 8px 20px #000c;font-family:Inter,sans-serif;color:#e8f0ff;overflow:hidden;user-select:none}
.gh-h{padding:6px 8px;background:linear-gradient(90deg,#1a1a0a,#0f0f0f);border-bottom:1px solid #2a2210;display:flex;align-items:center;justify-content:space-between;cursor:move}
.gh-h-left{display:flex;align-items:center;gap:5px}
.gh-dot{width:6px;height:6px;background:#00ff88;border-radius:50%;box-shadow:0 0 5px #00ff88;animation:pulse 1.5s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.gh-h b{font-size:8.5px;color:#fff;letter-spacing:.5px;font-weight:900}
.gh-h b span{background:linear-gradient(90deg,#d4af37,#f9e27b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gh-toggle{font-size:5.5px;background:#1a1505;border:1px solid #d4af37;color:#d4af37;padding:2px 5px;border-radius:8px;cursor:pointer;font-weight:700}
.gh-toggle.off{background:#1a1a1a;border-color:#444;color:#666}
.gh-pair{font-size:10px;font-weight:900;color:#d4af37;text-align:center;margin:6px 0 5px;letter-spacing:.7px;text-shadow:0 0 6px rgba(212,175,55,.4)}
.gh-sig{margin:0 8px;height:36px;border-radius:7px;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:all .18s}
.gh-sig b{font-size:16px;font-weight:900;letter-spacing:.8px}
.gh-sig small{font-size:5.5px;color:#c8d0dc;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:190px}
.gh-sig.up{background:linear-gradient(145deg,#00c853,#009624);color:#fff;box-shadow:0 2px 10px rgba(0,200,83,.35)}
.gh-sig.down{background:linear-gradient(145deg,#ff1744,#d5002b);color:#fff;box-shadow:0 2px 10px rgba(255,23,68,.35)}
.gh-sig.wait{background:#141a2a;color:#5a6f8a;border:1px solid #1e2d4a}
.gh-meta{font-size:7px;color:#5a6f8a;text-align:center;margin:6px 0 7px;letter-spacing:.3px;font-weight:600;line-height:1.25}
.gh-close{margin:0 8px 8px;height:28px;background:#13151e;border:1px solid #1e2d4a;border-radius:5px;display:flex;align-items:center;justify-content:center;color:#8a9ab5;font-size:8px;font-weight:600;cursor:pointer}
.gh-close:hover{background:#1a2340;color:#fff}
`;
document.head.appendChild(css);
let old=document.getElementById("ghost-bot");if(old) old.remove();
let box=document.createElement("div");box.id="ghost-bot";
box.innerHTML=`
<div class="gh-h" id="gh-h"><div class="gh-h-left"><div class="gh-dot"></div><b>GHOST <span>PREMIUM BOT</span></b></div><div class="gh-toggle" id="gh-toggle">PA ON</div></div>
<div class="gh-pair" id="gh-pair">EURUSD</div>
<div class="gh-sig wait" id="gh-sig"><b id="gh-txt">WAIT</b><small id="gh-reason">QUANTUM X Analyzing...</small></div>
<div class="gh-meta" id="gh-meta">SAFE 1M • <span id="gh-sec">--s</span> • 1%<br><span id="gh-pa" style="color:#d4af37;font-size:5.5px">PA: READY</span></div>
<div class="gh-close" id="gh-close">✕ Close</div>
`;
document.body.appendChild(box);

let paEnabled=true;
let toggleEl=document.getElementById("gh-toggle");
toggleEl.addEventListener("click",e=>{e.stopPropagation();paEnabled=!paEnabled;toggleEl.textContent=paEnabled?"PA ON":"PA OFF";toggleEl.className=paEnabled?"gh-toggle":"gh-toggle off";localStorage.setItem("ghost_pa_enabled", paEnabled?"1":"0");});
let savedPA=localStorage.getItem("ghost_pa_enabled");if(savedPA==="0"){paEnabled=false;toggleEl.textContent="PA OFF";toggleEl.className="gh-toggle off";}

document.getElementById("gh-close").addEventListener("click",e=>{e.stopPropagation();box.remove();});
document.getElementById("gh-close").addEventListener("touchend",e=>{e.stopPropagation();box.remove();});

let isDrag=false,sx=0,sy=0,il=0,it=0;let hd=document.getElementById("gh-h");
function getPos(){let r=box.getBoundingClientRect();return{left:r.left,top:r.top};}
function ds(e){if(e.target.closest("#gh-close")||e.target.closest("#gh-toggle")) return; isDrag=true;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;sx=cx;sy=cy;let p=getPos();il=p.left;it=p.top;box.style.left=p.left+"px";box.style.right="auto";box.style.bottom="auto";box.style.transform="none";e.preventDefault();}
function dm(e){if(!isDrag)return;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;box.style.left=(il+cx-sx)+"px";box.style.top=(it+cy-sy)+"px";e.preventDefault();}
function de(){isDrag=false;}
hd.addEventListener("mousedown",ds);document.addEventListener("mousemove",dm);document.addEventListener("mouseup",de);
hd.addEventListener("touchstart",ds,{passive:false});document.addEventListener("touchmove",dm,{passive:false});document.addEventListener("touchend",de);


// ===== SMC FULL - SMART MONEY CONCEPTS - QUANTUM X =====
class Candle{constructor(o,h,l,c){this.open=o;this.high=h;this.low=l;this.close=c;this.body=Math.abs(c-o);this.upper=h-Math.max(o,c);this.lower=Math.min(o,c)-l;this.bull=c>o;this.bear=c<o;}}

function detectMarketStructure(candles){
  if(candles.length<12) return {structure:"RANGING",bias:"BOTH",reason:"Analyzing structure..."};
  let highs=[],lows=[];
  for(let i=3;i<candles.length-3;i++){
    if(candles[i].high>candles[i-1].high&&candles[i].high>candles[i-2].high&&candles[i].high>candles[i-3].high&&candles[i].high>candles[i+1].high&&candles[i].high>candles[i+2].high&&candles[i].high>candles[i+3].high) highs.push([i,candles[i].high]);
    if(candles[i].low<candles[i-1].low&&candles[i].low<candles[i-2].low&&candles[i].low<candles[i-3].low&&candles[i].low<candles[i+1].low&&candles[i].low<candles[i+2].low&&candles[i].low<candles[i+3].low) lows.push([i,candles[i].low]);
  }
  if(highs.length<2||lows.length<2) return {structure:"RANGING",bias:"BOTH",reason:"Ranging"};
  let h1=highs[highs.length-1][1],h2=highs[highs.length-2][1];
  let l1=lows[lows.length-1][1],l2=lows[lows.length-2][1];
  let hh=h1>h2,hl=l1>l2,ll=l1<l2,lh=h1<h2;
  if(hh&&hl) return {structure:"BULLISH_BOS",bias:"CALL",bos:true,choch:false,reason:`BOS HH+HL ${h2.toFixed(5)}→${h1.toFixed(5)}`};
  if(ll&&lh) return {structure:"BEARISH_BOS",bias:"PUT",bos:true,choch:false,reason:`BOS LL+LH ${h2.toFixed(5)}→${h1.toFixed(5)}`};
  if(highs.length>=3 && highs[highs.length-3][1] < highs[highs.length-2][1] && highs[highs.length-1][1] < highs[highs.length-2][1]) return {structure:"CHOCH_BEARISH",bias:"PUT",bos:false,choch:true,reason:"CHOCH Bearish - Failed HH"};
  if(lows.length>=3 && lows[lows.length-3][1] > lows[lows.length-2][1] && lows[lows.length-1][1] > lows[lows.length-2][1]) return {structure:"CHOCH_BULLISH",bias:"CALL",bos:false,choch:true,reason:"CHOCH Bullish - Failed LL"};
  return {structure:"RANGING",bias:"BOTH",bos:false,choch:false,reason:"Ranging market"};
}
function detectLiquidity(candles){
  if(candles.length<8) return {grab:false};
  let last=candles[candles.length-1];
  let prevHigh=Math.max(...candles.slice(-8,-1).map(c=>c.high));
  let prevLow=Math.min(...candles.slice(-8,-1).map(c=>c.low));
  let highs=candles.slice(-6,-1).map(c=>c.high);
  let lows=candles.slice(-6,-1).map(c=>c.low);
  let eqHigh=highs.some(h=>Math.abs(h-prevHigh)<0.00015);
  let eqLow=lows.some(l=>Math.abs(l-prevLow)<0.00015);
  if(last.high>prevHigh&&last.close<prevHigh){
    let ratio=last.upper/(last.body+0.00001);
    if(ratio>1.2) return {grab:true,type:"BUY_SIDE_LIQUIDITY",signal:"PUT",conf:88,reason:`Buy Side Liquidity ${prevHigh.toFixed(5)} swept ${eqHigh?'(Equal Highs)':''}`,is_trap:true,pa_type:"Liquidity Grab"};
  }
  if(last.low<prevLow&&last.close>prevLow){
    let ratio=last.lower/(last.body+0.00001);
    if(ratio>1.2) return {grab:true,type:"SELL_SIDE_LIQUIDITY",signal:"CALL",conf:88,reason:`Sell Side Liquidity ${prevLow.toFixed(5)} swept ${eqLow?'(Equal Lows)':''}`,is_trap:true,pa_type:"Liquidity Grab"};
  }
  return {grab:false};
}
function detectOrderBlock(candles){
  if(candles.length<6) return {ob:false};
  for(let i=candles.length-5;i>1;i--){
    if(candles[i].bear){
      if(i+3<candles.length){
        let c1=candles[i+1],c2=candles[i+2],c3=candles[i+3];
        if(c1.bull&&c2.bull&&(c1.body+c2.body)>candles[i].body*1.8&&c3.close>candles[i].high){
          let curr=candles[candles.length-1];
          if(candles[i].low<=curr.close&&curr.close<=candles[i].high) return {ob:true,type:"BULLISH_OB",signal:"CALL",conf:82,reason:`Bullish OB ${candles[i].low.toFixed(5)}-${candles[i].high.toFixed(5)} Retest`,pa_type:"Order Block Retest"};
          if(curr.close>candles[i].high&&curr.bull) return {ob:true,type:"BULLISH_BREAKER",signal:"CALL",conf:80,reason:`Bullish Breaker ${candles[i].high.toFixed(5)} Break`,pa_type:"Breaker Block"};
        }
      }
    }
    if(candles[i].bull){
      if(i+3<candles.length){
        let c1=candles[i+1],c2=candles[i+2],c3=candles[i+3];
        if(c1.bear&&c2.bear&&(c1.body+c2.body)>candles[i].body*1.8&&c3.close<candles[i].low){
          let curr=candles[candles.length-1];
          if(candles[i].low<=curr.close&&curr.close<=candles[i].high) return {ob:true,type:"BEARISH_OB",signal:"PUT",conf:82,reason:`Bearish OB ${candles[i].low.toFixed(5)}-${candles[i].high.toFixed(5)} Retest`,pa_type:"Order Block Retest"};
          if(curr.close<candles[i].low&&curr.bear) return {ob:true,type:"BEARISH_BREAKER",signal:"PUT",conf:80,reason:`Bearish Breaker ${candles[i].low.toFixed(5)} Break`,pa_type:"Breaker Block"};
        }
      }
    }
  }
  return {ob:false};
}
function detectFVG(candles){
  if(candles.length<4) return {fvg:false};
  for(let i=1;i<candles.length-1;i++){
    let c1=candles[i-1],c2=candles[i],c3=candles[i+1];
    if(c3.low>c1.high&&c2.bull&&c2.body>(c1.body+c3.body)/2){
      let curr=candles[candles.length-1];
      if(c1.high<=curr.close&&curr.close<=c3.low){
        let mid=(c1.high+c3.low)/2;
        let conf=curr.close<=mid?85:75;
        return {fvg:true,type:"BULLISH_FVG",signal:"CALL",conf:conf,reason:`Bullish FVG ${c1.high.toFixed(5)}-${c3.low.toFixed(5)} Mitigation`,pa_type:"FVG Mitigation"};
      }
    }
    if(c3.high<c1.low&&c2.bear&&c2.body>(c1.body+c3.body)/2){
      let curr=candles[candles.length-1];
      if(c3.high<=curr.close&&curr.close<=c1.low){
        let mid=(c3.high+c1.low)/2;
        let conf=curr.close>=mid?85:75;
        return {fvg:true,type:"BEARISH_FVG",signal:"PUT",conf:conf,reason:`Bearish FVG ${c3.high.toFixed(5)}-${c1.low.toFixed(5)} Mitigation`,pa_type:"FVG Mitigation"};
      }
    }
  }
  return {fvg:false};
}
function detectPremiumDiscount(candles){
  if(candles.length<20) return {zone:"EQUILIBRIUM",bias:"BOTH"};
  let recentHigh=Math.max(...candles.slice(-20).map(c=>c.high));
  let recentLow=Math.min(...candles.slice(-20).map(c=>c.low));
  let curr=candles[candles.length-1].close;
  let range=recentHigh-recentLow;
  if(range==0) return {zone:"EQUILIBRIUM",bias:"BOTH"};
  let premium=recentLow+range*0.7;
  let discount=recentLow+range*0.3;
  if(curr>=premium) return {zone:"PREMIUM",bias:"PUT",reason:`Premium Zone ${curr.toFixed(5)} >= ${premium.toFixed(5)}`};
  if(curr<=discount) return {zone:"DISCOUNT",bias:"CALL",reason:`Discount Zone ${curr.toFixed(5)} <= ${discount.toFixed(5)}`};
  return {zone:"EQUILIBRIUM",bias:"BOTH",reason:"Equilibrium"};
}
function detectRejectionWick(candles){
  if(candles.length<12) return {rejection:false};
  let last=candles[candles.length-1];
  let recentHigh=Math.max(...candles.slice(-12,-1).map(c=>c.high));
  let recentLow=Math.min(...candles.slice(-12,-1).map(c=>c.low));
  if(last.upper>last.body*2.5&&last.high>=recentHigh*0.9995){
    return {rejection:true,type:"BEARISH_REJECTION",signal:"PUT",conf:80,reason:`Rejection Wick at Premium ${(last.upper/(last.body+0.00001)).toFixed(1)}x`,pa_type:"Rejection Wick"};
  }
  if(last.lower>last.body*2.5&&last.low<=recentLow*1.0005){
    return {rejection:true,type:"BULLISH_REJECTION",signal:"CALL",conf:80,reason:`Rejection Wick at Discount ${(last.lower/(last.body+0.00001)).toFixed(1)}x`,pa_type:"Rejection Wick"};
  }
  return {rejection:false};
}
function runPAFilter(candles){
  if(!paEnabled) return null;
  let struct=detectMarketStructure(candles);
  let liq=detectLiquidity(candles);
  let ob=detectOrderBlock(candles);
  let fvg=detectFVG(candles);
  let rej=detectRejectionWick(candles);
  let pd=detectPremiumDiscount(candles);
  // Priority: Liquidity > OB/Breaker > FVG > Rejection > BOS/CHOCH
  if(liq.grab) return {...liq,structure:struct,premium_discount:pd};
  if(ob.ob){
    // Premium/Discount filter
    if(pd.zone==="PREMIUM"&&ob.signal==="CALL") {/* Don't buy in premium */}
    else if(pd.zone==="DISCOUNT"&&ob.signal==="PUT") {/* Don't sell in discount */}
    else return {...ob,structure:struct,premium_discount:pd};
  }
  if(fvg.fvg) return {...fvg,structure:struct,premium_discount:pd};
  if(rej.rejection) return {...rej,structure:struct,premium_discount:pd};
  if(struct.bos||struct.choch) return {signal:struct.bias==="CALL"?"CALL":struct.bias==="PUT"?"PUT":"WAIT",conf:struct.bos?84:78,reason:struct.reason,pa_type:struct.structure,structure:struct,premium_discount:pd,is_trap:false};
  return {signal:candles[candles.length-1].bull?"CALL":"PUT",conf:60,reason:struct.reason,pa_type:"Ranging - "+pd.zone,structure:struct,premium_discount:pd,is_trap:false};
}


// BOT LOGIC - FIXED FLICKER + MARKET AUTO
let TOKEN="";try{let ss=document.getElementsByTagName('script');for(let s of ss){if(s.src&&s.src.includes('ghost.js')){let u=new URL(s.src);TOKEN=u.searchParams.get('token')||u.searchParams.get('access')||"";if(TOKEN)break;}}if(!TOKEN)TOKEN=localStorage.getItem('ghost_premium_token')||"";}catch(e){}
let currentSignal=null;let stablePair="EURUSD";let stableDisplay="EURUSD";let stableLock=0;let priceHistory=[];let candleHistory=[];
let lockedSignalId="";let lockedUntil=0;let lockedPair="";

function getRealPair(){
  try{
    // Method 1: Bottom bar (CAD/JPY 83%, AUD/USD 85% etc) - most reliable for manual change
    for(let el of document.querySelectorAll('div, span, button')){
      let txt=(el.innerText||"").trim();
      // Match "CAD/JPY 83%" or "AUD/USD 85%" at bottom
      let m=txt.match(/^([A-Z]{3}\/[A-Z]{3})\s+(\d+)%\s*$/i);
      if(m){
        let r=el.getBoundingClientRect();
        // Bottom area
        if(r.top>window.innerHeight*0.75 && r.top<window.innerHeight*0.98){
          let pair=m[1].replace('/','').toUpperCase();
          let display=m[1].replace('/','');
          let now=Date.now();
          if(pair!==stablePair){
            // Immediate change if user manually selects
            if(now>stableLock){
              stablePair=pair;stableDisplay=display;stableLock=now+2000;
              // Clear lock when pair changes
              lockedSignalId="";lockedUntil=0;currentSignal=null;
              console.log('Pair changed to',pair);
              return {pair:stablePair,display:stableDisplay,changed:true};
            }
          }
          stableDisplay=display;
          return {pair:stablePair,display:stableDisplay,changed:false};
        }
      }
    }
    // Method 2: Near Buy button (top right)
    for(let el of document.querySelectorAll('div, span')){
      let txt=(el.innerText||"").trim();
      let m=txt.match(/^([A-Z]{3}\/[A-Z]{3})(\s*OTC)?\s+\d+%\s*$/i);
      if(m){
        let r=el.getBoundingClientRect();
        if(r.top>window.innerHeight*0.55&&r.top<window.innerHeight*0.96){
          let isOTC=/OTC/i.test(txt);
          let pair=m[1].replace('/','').toUpperCase()+(isOTC?"OTC":"");
          let display=m[1].replace('/','')+(isOTC?" OTC":"");
          let now=Date.now();
          if(pair!==stablePair&&now>stableLock){
            stablePair=pair;stableDisplay=display;stableLock=now+1500;
            lockedSignalId="";lockedUntil=0;currentSignal=null;
            return {pair:stablePair,display:stableDisplay,changed:true};
          }
          stableDisplay=display;
          return {pair:stablePair,display:stableDisplay,changed:false};
        }
      }
    }
  }catch(e){}
  return {pair:stablePair,display:stableDisplay,changed:false};
}
function getRealPrice(){
  try{
    for(let el of document.querySelectorAll('div, span')){
      let txt=(el.innerText||"").trim();
      if(!/^\d+\.\d{3,5}$/.test(txt)) continue;
      let v=parseFloat(txt);if(v<0.3||v>250) continue;
      let r=el.getBoundingClientRect();
      if(r.width<20||r.width>80) continue;
      if(r.height<12||r.height>30) continue;
      if(r.left<window.innerWidth*0.7) continue;
      if(r.top<80||r.top>600) continue;
      return txt;
    }
  }catch(e){}return null;
}
function updateUI(j){
  let pairEl=document.getElementById("gh-pair");if(pairEl) pairEl.textContent=j.market||stableDisplay;
  let sigEl=document.getElementById("gh-sig");let txtEl=document.getElementById("gh-txt");let reasonEl=document.getElementById("gh-reason");let paEl=document.getElementById("gh-pa");
    // Show loss count on start
    if(paEl && loss_count>0) paEl.textContent=`Loss: ${loss_count}/2 | ${paEl.textContent}`;

  let dir=j.signal||j.direction;
  if(sigEl&&txtEl){
    if(dir==="CALL"||dir==="UP"){sigEl.className="gh-sig up";txtEl.textContent="UP";reasonEl.textContent=j.reason||j.price_action_type||"";}
    else if(dir==="PUT"||dir==="DOWN"){sigEl.className="gh-sig down";txtEl.textContent="DOWN";reasonEl.textContent=j.reason||j.price_action_type||"";}
    else{sigEl.className="gh-sig wait";txtEl.textContent="WAIT";reasonEl.textContent=j.reason||"Analyzing...";}
    if(paEl) paEl.textContent=`${j.price_action_type||j.reason||"Momentum"} | ${j.confidence||0}% ${j.is_trap?"| TRAP":""}`;
  }
}
function fetchSig(forcePair){
  // Check loss protection first
  let prot = check_loss_protection();
  if(!prot.allowed){
    let sigEl=document.getElementById("gh-sig");let txtEl=document.getElementById("gh-txt");let reasonEl=document.getElementById("gh-reason");let paEl=document.getElementById("gh-pa");
    // Show loss count on start
    if(paEl && loss_count>0) paEl.textContent=`Loss: ${loss_count}/2 | ${paEl.textContent}`;

    if(sigEl&&txtEl){
      sigEl.className="gh-sig wait";
      txtEl.textContent="STOP";
      if(reasonEl) reasonEl.textContent=`2 Loss - ${prot.remaining} min break`;
      if(paEl) paEl.textContent=`Protection: ${prot.remaining}min left | Loss: ${loss_count}/2`;
    }
    let secEl=document.getElementById("gh-sec");if(secEl) secEl.textContent=`${prot.remaining}m`;
    return;
  }

  let now=Date.now();
  // 58s LOCK - no flip during active signal
  if(lockedSignalId && now<lockedUntil && currentSignal){
    // Keep locked signal, don't fetch new
    return;
  }
  let info=forcePair?{pair:forcePair,display:forcePair,changed:true}:getRealPair();
  let asset=info.pair;
  if((document.body.innerText||"").includes("Select trade pair")) return;
  // If pair changed, clear lock
  if(info.changed){
    lockedSignalId="";lockedUntil=0;currentSignal=null;
  }
  let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";
  if(TOKEN) url+="&token="+encodeURIComponent(TOKEN);
  fetch(url).then(r=>r.json()).then(j=>{
    if(!j||j.signal=="ERROR") return;
    if(j.signal==="UP") j.signal="CALL";
    if(j.signal==="DOWN") j.signal="PUT";
    // PAIR CHECK - ensure response pair matches current pair
    let responsePair=(j.pair||"").replace("OTC","").toUpperCase();
    let currentClean=stablePair.replace("OTC","").toUpperCase();
    if(responsePair && responsePair!==currentClean && !info.changed){
      // Stale response, ignore
      return;
    }
    if(j.status==="ACTIVE"&&(j.signal==="CALL"||j.signal==="PUT")){
      // LOCK SIGNAL for 58 seconds
      if(!lockedSignalId || now>=lockedUntil){
        lockedSignalId=j.signal_id|| (stablePair+"-"+j.signal+"-"+now);
        lockedUntil=now+58000; // 58s lock
        lockedPair=stablePair;
        currentSignal=j;
        updateUI(j);
      }
    }else if(j.signal==="WAIT"){
      // If locked and still valid, keep showing locked
      if(lockedSignalId && now<lockedUntil && currentSignal){
        updateUI(currentSignal);
        return;
      }
      // PA fallback local
      if(candleHistory.length>=10&&paEnabled){
        let pa=runPAFilter(candleHistory);
        if(pa&&pa.signal!=="WAIT"){
          let clockSec=60-new Date().getSeconds();
          let fake={...pa,market:stableDisplay,pair:stablePair,confidence:pa.conf,expiry_timestamp:now+clockSec*1000,signal_id:stablePair+"-PA-"+now};
          if(!lockedSignalId || now>=lockedUntil){
            lockedSignalId=fake.signal_id;
            lockedUntil=now+58000;
            currentSignal=fake;
            updateUI(fake);
          }
          return;
        }
      }
      if(!currentSignal) updateUI(j);
    }
  }).catch(()=>{});
}
setInterval(()=>{
  let rp=getRealPrice();
  if(rp){
    let v=parseFloat(rp);if(v){
      priceHistory.push(v);if(priceHistory.length>50) priceHistory.shift();
      if(priceHistory.length>=4){
        let o=priceHistory[priceHistory.length-4];let c=priceHistory[priceHistory.length-1];
        let h=Math.max(...priceHistory.slice(-4));let l=Math.min(...priceHistory.slice(-4));
        candleHistory.push(new Candle(o,h,l,c));if(candleHistory.length>100) candleHistory.shift();
      }
    }
  }
},1000);
setInterval(()=>{
  let info=getRealPair();
  if(info.changed) fetchSig(info.pair);
  if(!currentSignal){
    let secEl=document.getElementById("gh-sec");
    if(secEl){let sec=60-new Date().getSeconds();if(sec===60) sec=0;secEl.textContent=sec+"s";}
    return;
  }
  let rem=Math.max(0,Math.ceil((currentSignal.expiry_timestamp-Date.now())/1000));
  let secEl=document.getElementById("gh-sec");if(secEl) secEl.textContent=rem+"s";
  if(rem<=0){
    // Expiry reached, clear lock
    currentSignal=null;
    lockedSignalId="";
    lockedUntil=0;
  }else{
    // Keep showing locked signal
    updateUI(currentSignal);
  }
},500);
setInterval(()=>{let info=getRealPair();if(info.changed) fetchSig(info.pair);},1000);
setInterval(()=>fetchSig(),4000);
// Detect win/loss every 2 sec
setInterval(()=>{
  let res = detectResult();
  if(res){
    console.log('Result detected:',res);
    // Update UI with loss count
    let paEl=document.getElementById("gh-pa");
    if(paEl && loss_count>0){
      paEl.textContent=`Loss: ${loss_count}/2 | ${paEl.textContent}`;
    }
  }
},2000);

fetchSig();
})();
