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
<div class="gh-pair" id="gh-pair">GBP/USD</div>
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

// ===== LOSS PROTECTION - 2 Loss = 30 Min Stop - ADVANCED FIX =====
let loss_count = parseInt(localStorage.getItem('ghost_loss_count')||'0');
let last_loss_time = localStorage.getItem('ghost_last_loss_time') ? new Date(localStorage.getItem('ghost_last_loss_time')) : null;
let consecutive_losses = parseInt(localStorage.getItem('ghost_consecutive_losses')||'0');

function check_loss_protection(){
  if(consecutive_losses >= 2 && last_loss_time){
    let now = new Date();
    let diffMin = (now - last_loss_time) / 1000 / 60;
    if(diffMin < 30){
      return {allowed:false, remaining: Math.ceil(30-diffMin), minutes_left: (30 - diffMin).toFixed(1)};
    }else{
      // 30 min over - reset
      consecutive_losses = 0;
      loss_count = 0;
      localStorage.setItem('ghost_loss_count','0');
      localStorage.setItem('ghost_consecutive_losses','0');
      last_loss_time = null;
      localStorage.removeItem('ghost_last_loss_time');
      return {allowed:true, remaining:0};
    }
  }
  return {allowed:true, remaining:0};
}

function register_loss(){
  consecutive_losses++;
  loss_count++;
  last_loss_time = new Date();
  localStorage.setItem('ghost_loss_count', loss_count.toString());
  localStorage.setItem('ghost_consecutive_losses', consecutive_losses.toString());
  localStorage.setItem('ghost_last_loss_time', last_loss_time.toISOString());
  console.log(`❌ LOSS registered: ${consecutive_losses}/2 consecutive, total ${loss_count}`);
  // Vibrate if mobile
  try{ if(navigator.vibrate) navigator.vibrate([100,50,100]); }catch(e){}
  // Show toast
  showProtectionToast(`❌ LOSS ${consecutive_losses}/2`, consecutive_losses >=2 ? '30 min STOP!' : 'Continue');
}

function register_win(){
  console.log(`✅ WIN registered - resetting consecutive losses`);
  if(consecutive_losses>0){
    consecutive_losses = 0;
    localStorage.setItem('ghost_consecutive_losses','0');
  }
  showProtectionToast(`✅ WIN - Losses reset`, '0/2');
}

function showProtectionToast(title, subtitle){
  try{
    let toast = document.getElementById('ghost-toast');
    if(!toast){
      toast = document.createElement('div');
      toast.id = 'ghost-toast';
      toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:2147483648;background:#1a1a0a;border:1px solid #d4af37;color:#fff;padding:8px 14px;border-radius:8px;font-size:10px;font-weight:700;box-shadow:0 4px 12px rgba(0,0,0,.5);transition:all .3s;';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `${title}<br><small style="color:#d4af37">${subtitle}</small>`;
    toast.style.display = 'block';
    toast.style.opacity = '1';
    setTimeout(()=>{ toast.style.opacity='0'; setTimeout(()=>{toast.style.display='none'},300); },2500);
  }catch(e){}
}

// ADVANCED RESULT DETECTION - MutationObserver + Multiple Patterns
function detectResultAdvanced(){
  try{
    // Pattern 1: Look for Quotex profit/loss popup - common selectors
    let selectors = [
      '[class*="profit"]', '[class*="result"]', '[class*="deal"]', 
      '[class*="payout"]', '[class*="trade-result"]', '[class*="position-profit"]'
    ];
    
    for(let sel of selectors){
      try{
        let els = document.querySelectorAll(sel);
        for(let el of els){
          let txt = (el.innerText||'').toLowerCase();
          let fullText = el.innerText||'';
          // Check if visible and contains $ or profit
          let rect = el.getBoundingClientRect();
          if(rect.width==0 || rect.height==0) continue;
          if(fullText.includes('$') || txt.includes('profit') || txt.includes('loss') || txt.includes('result')){
            // Check if it's a trade result (not just UI)
            if(fullText.match(/[+-]\s*\$?\d+\.?\d*/)){
              let lastResult = localStorage.getItem('ghost_last_result_full');
              if(lastResult !== fullText+Date.now().toString().slice(-3)){ // debounce
                // Determine win/loss by color or text
                let isLoss = false;
                // Check by color (red = loss, green = win)
                let style = window.getComputedStyle(el);
                let color = style.color || '';
                let bg = style.backgroundColor || '';
                // Check text patterns
                if(fullText.includes('-$') || fullText.match(/-\s*\d+\.\d+\s*\$/) || fullText.toLowerCase().includes('loss')){
                  isLoss = true;
                } else if(fullText.includes('+$') || fullText.match(/\+\s*\$?\d+/) || fullText.toLowerCase().includes('profit')){
                  // Check if profit is positive
                  let m = fullText.match(/([+-]?\$?\d+\.?\d*)/);
                  if(m){
                    let num = parseFloat(m[1].replace('$','').replace('+',''));
                    if(num < 0) isLoss = true;
                    else if(num > 0) isLoss = false;
                    else continue; // zero
                  }
                }
                
                // Also check for Quotex specific: RESULT (P/L) -1$
                if(fullText.includes('RESULT') && fullText.includes('P/L')){
                  if(fullText.includes('-') && !fullText.match(/\+\s*\d/)){
                    isLoss = true;
                  } else if(fullText.includes('+')){
                    isLoss = false;
                  }
                }
                
                if(isLoss !== null){
                  localStorage.setItem('ghost_last_result_full', fullText);
                  setTimeout(()=>localStorage.removeItem('ghost_last_result_full'), 5000); // clear after 5s
                  if(isLoss){
                    register_loss();
                    return {type:'LOSS', text:fullText};
                  } else {
                    register_win();
                    return {type:'WIN', text:fullText};
                  }
                }
              }
            }
          }
        }
      }catch(e){}
    }
    
    // Pattern 2: Scan all visible divs for profit/loss text (fallback)
    let allDivs = document.querySelectorAll('div');
    for(let el of allDivs){
      try{
        let txt = (el.innerText||'').trim();
        if(txt.length > 5 && txt.length < 80){
          // Must be small popup, not whole page
          if((txt.includes('RESULT') || txt.toLowerCase().includes('profit') || txt.includes('P/L')) && txt.includes('$')){
            let rect = el.getBoundingClientRect();
            if(rect.width > 50 && rect.width < 300 && rect.height > 20 && rect.height < 150){
              let lastResult = localStorage.getItem('ghost_last_result_simple');
              if(lastResult !== txt){
                localStorage.setItem('ghost_last_result_simple', txt);
                if(txt.includes('-') && txt.match(/-\s*\$?\d/)){
                  // Make sure it's not date like 18:30
                  if(!txt.match(/\d{1,2}:\d{2}/) || txt.includes('$')){
                    register_loss();
                    return {type:'LOSS', text:txt};
                  }
                } else if(txt.match(/\+\s*\$?\d+/) || (txt.includes('$') && !txt.includes('-'))){
                  if(txt.toLowerCase().includes('profit') || txt.includes('+') || txt.match(/\$\s*\d/)){
                    register_win();
                    return {type:'WIN', text:txt};
                  }
                }
              }
            }
          }
        }
      }catch(e){}
    }
  }catch(e){console.log('detect error',e);}
  return null;
}

// MutationObserver for instant detection
let resultObserver = null;
function startResultObserver(){
  try{
    if(resultObserver) resultObserver.disconnect();
    resultObserver = new MutationObserver((mutations)=>{
      for(let mut of mutations){
        for(let node of mut.addedNodes){
          if(node.nodeType === 1){ // Element
            let txt = (node.innerText||'').toLowerCase();
            if(txt.includes('result') || txt.includes('profit') || (txt.includes('$') && (txt.includes('+') || txt.includes('-')))){
              setTimeout(()=>detectResultAdvanced(), 300);
            }
          }
        }
      }
    });
    resultObserver.observe(document.body, {childList:true, subtree:true});
    console.log('✅ Result observer started');
  }catch(e){console.log('observer fail',e);}
}

function detectResult(){
  return detectResultAdvanced();
}

// Manual test functions for admin - call from console: testLoss(), testWin(), resetLossProtection()
window.testLoss = ()=>{ register_loss(); console.log('Test loss added:', consecutive_losses); };
window.testWin = ()=>{ register_win(); console.log('Test win'); };
window.resetLossProtection = ()=>{ 
  consecutive_losses=0; loss_count=0; 
  localStorage.setItem('ghost_loss_count','0');
  localStorage.setItem('ghost_consecutive_losses','0');
  localStorage.removeItem('ghost_last_loss_time');
  localStorage.removeItem('ghost_last_result_full');
  localStorage.removeItem('ghost_last_result_simple');
  console.log('✅ Protection reset');
  showProtectionToast('🔄 Reset', '0/2 losses');
};
window.getLossStatus = ()=>{ return {consecutive: consecutive_losses, total: loss_count, last: last_loss_time, protection: check_loss_protection()}; };


// ===== SMC FULL =====
class Candle{constructor(o,h,l,c){this.open=o;this.high=h;this.low=l;this.close=c;this.body=Math.abs(c-o);this.upper=h-Math.max(o,c);this.lower=Math.min(o,c)-l;this.bull=c>o;this.bear=c<o;}}
function detectMarketStructure(candles){
  if(candles.length<10) return {structure:"RANGING",bias:"BOTH",reason:"Analyzing"};
  let highs=[],lows=[];
  for(let i=3;i<candles.length-3;i++){
    if(candles[i].high>candles[i-1].high&&candles[i].high>candles[i-2].high&&candles[i].high>candles[i-3].high&&candles[i].high>candles[i+1].high&&candles[i].high>candles[i+2].high&&candles[i].high>candles[i+3].high) highs.push([i,candles[i].high]);
    if(candles[i].low<candles[i-1].low&&candles[i].low<candles[i-2].low&&candles[i].low<candles[i-3].low&&candles[i].low<candles[i+1].low&&candles[i].low<candles[i+2].low&&candles[i].low<candles[i+3].low) lows.push([i,candles[i].low]);
  }
  if(highs.length<2||lows.length<2) return {structure:"RANGING",bias:"BOTH",reason:"Ranging"};
  let h1=highs[highs.length-1][1],h2=highs[highs.length-2][1];
  let l1=lows[lows.length-1][1],l2=lows[lows.length-2][1];
  let hh=h1>h2,hl=l1>l2,ll=l1<l2,lh=h1<h2;
  if(hh&&hl) return {structure:"BULLISH_BOS",bias:"CALL",bos:true,reason:`BOS HH+HL ${h2.toFixed(5)}→${h1.toFixed(5)}`};
  if(ll&&lh) return {structure:"BEARISH_BOS",bias:"PUT",bos:true,reason:`BOS LL+LH ${h2.toFixed(5)}→${h1.toFixed(5)}`};
  return {structure:"RANGING",bias:"BOTH",bos:false,reason:"Ranging"};
}
function detectLiquidity(candles){
  if(candles.length<6) return {grab:false};
  let last=candles[candles.length-1];
  let prevHigh=Math.max(...candles.slice(-8,-1).map(c=>c.high));
  let prevLow=Math.min(...candles.slice(-8,-1).map(c=>c.low));
  if(last.high>prevHigh&&last.close<prevHigh){
    let ratio=last.upper/(last.body+0.00001);
    if(ratio>1.2) return {grab:true,signal:"PUT",conf:88,reason:`Buy Liquidity ${prevHigh.toFixed(5)} sweep`,is_trap:true,pa_type:"Liquidity Grab"};
  }
  if(last.low<prevLow&&last.close>prevLow){
    let ratio=last.lower/(last.body+0.00001);
    if(ratio>1.2) return {grab:true,signal:"CALL",conf:88,reason:`Sell Liquidity ${prevLow.toFixed(5)} sweep`,is_trap:true,pa_type:"Liquidity Grab"};
  }
  return {grab:false};
}
function detectOrderBlock(candles){
  if(candles.length<6) return {ob:false};
  for(let i=candles.length-5;i>1;i--){
    if(candles[i].bear && i+3<candles.length){
      let c1=candles[i+1],c2=candles[i+2],c3=candles[i+3];
      if(c1.bull&&c2.bull&&(c1.body+c2.body)>candles[i].body*1.8&&c3.close>candles[i].high){
        let curr=candles[candles.length-1];
        if(candles[i].low<=curr.close&&curr.close<=candles[i].high) return {ob:true,signal:"CALL",conf:82,reason:`Bullish OB ${candles[i].low.toFixed(5)} Retest`,pa_type:"Order Block"};
      }
    }
    if(candles[i].bull && i+3<candles.length){
      let c1=candles[i+1],c2=candles[i+2],c3=candles[i+3];
      if(c1.bear&&c2.bear&&(c1.body+c2.body)>candles[i].body*1.8&&c3.close<candles[i].low){
        let curr=candles[candles.length-1];
        if(candles[i].low<=curr.close&&curr.close<=candles[i].high) return {ob:true,signal:"PUT",conf:82,reason:`Bearish OB ${candles[i].high.toFixed(5)} Retest`,pa_type:"Order Block"};
      }
    }
  }
  return {ob:false};
}
function detectFVG(candles){
  if(candles.length<4) return {fvg:false};
  for(let i=1;i<candles.length-1;i++){
    let c1=candles[i-1],c3=candles[i+1];
    if(c3.low>c1.high){
      let curr=candles[candles.length-1];
      if(c1.high<=curr.close&&curr.close<=c3.low) return {fvg:true,signal:"CALL",conf:78,reason:`Bullish FVG Fill`,pa_type:"FVG"};
    }
    if(c3.high<c1.low){
      let curr=candles[candles.length-1];
      if(c3.high<=curr.close&&curr.close<=c1.low) return {fvg:true,signal:"PUT",conf:78,reason:`Bearish FVG Fill`,pa_type:"FVG"};
    }
  }
  return {fvg:false};
}
function runPAFilter(candles){
  if(!paEnabled) return null;
  let struct=detectMarketStructure(candles);
  let liq=detectLiquidity(candles);
  let ob=detectOrderBlock(candles);
  let fvg=detectFVG(candles);
  if(liq.grab) return {...liq,structure:struct};
  if(ob.ob) return {...ob,structure:struct};
  if(fvg.fvg) return {...fvg,structure:struct};
  if(struct.bos) return {signal:struct.bias,conf:80,reason:struct.reason,pa_type:struct.structure,structure:struct,is_trap:false};
  // NEVER WAIT - always give CALL/PUT
  return {signal:candles[candles.length-1].bull?"CALL":"PUT",conf:60,reason:struct.reason,pa_type:"Ranging",structure:struct,is_trap:false};
}

// ===== BOT LOGIC - FIXED MARKET DETECT + NO WAIT =====
let TOKEN="";try{
  // Try to get token from script URL (bookmarklet with token)
  let ss=document.getElementsByTagName('script');
  for(let s of ss){
    if(s.src&&s.src.includes('ghost.js')){
      try{
        let u=new URL(s.src);
        TOKEN=u.searchParams.get('token')||u.searchParams.get('access')||u.searchParams.get('premium')||"";
        if(TOKEN) break;
      }catch(e){}
    }
  }
  // Try URL params
  if(!TOKEN){
    let urlParams = new URLSearchParams(window.location.search);
    TOKEN = urlParams.get('token')||urlParams.get('access')||urlParams.get('premium')||"";
  }
  // Try localStorage (premium link saved token)
  if(!TOKEN) TOKEN=localStorage.getItem('ghost_premium_token')||"";
  // Save token if found in URL
  if(TOKEN) localStorage.setItem('ghost_premium_token', TOKEN);
}catch(e){}

let currentSignal=null;
let currentPair="GBPUSD";
let lastDetectedMarket="GBPUSD";
let priceHistory=[];let candleHistory=[];
let lockedSignalId="";let lockedUntil=0;

// NEW MARKET DETECT - FIX FOR YOUR SCREENSHOT (GBP/USD 80% at bottom)
function getCurrentMarket(){
  try{
    // Your screenshot shows GBP/USD 80% at bottom with flag - find that
    let all = document.querySelectorAll('div, span, button');
    // Priority 1: Bottom selector with flag (your screenshot)
    for(let el of all){
      let txt=(el.innerText||'').trim();
      // Match "GBP/USD 80%" or "EUR/USD" exactly
      if(txt.match(/^[A-Z]{3}\/[A-Z]{3}\s+\d+%/i) || txt.match(/^[A-Z]{3}\/[A-Z]{3}$/i)){
        let rect = el.getBoundingClientRect();
        // Bottom area where pair selector lives
        if(rect.top > window.innerHeight*0.5 && rect.left < window.innerWidth*0.6){
          let m = txt.match(/([A-Z]{3})\/([A-Z]{3})/i);
          if(m){
            let pair = (m[1]+m[2]).toUpperCase();
            let isOTC = txt.toUpperCase().includes('OTC');
            if(isOTC) pair+='OTC';
            // Validate
            let valid = ["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"];
            if(valid.includes(pair.replace('OTC',''))){
              return pair;
            }
          }
        }
      }
    }
    // Priority 2: Any element with GBP/USD pattern near bottom
    for(let el of all){
      let txt=(el.innerText||'').trim();
      if(txt.includes('/') && txt.length<20){
        let m = txt.match(/([A-Z]{3})[^A-Z0-9]*([A-Z]{3})/i);
        if(m){
          let rect = el.getBoundingClientRect();
          if(rect.top > 400){ // bottom half
            let pair = (m[1]+m[2]).toUpperCase();
            if(pair.length==6){
              return pair;
            }
          }
        }
      }
    }
  }catch(e){console.log('detect err',e);}
  return currentPair;
}

function autoDetectMarket(){
  let newMarket = getCurrentMarket();
  if(newMarket && newMarket !== currentPair){
    console.log('Market changed:', currentPair, '->', newMarket);
    currentPair = newMarket;
    lastDetectedMarket = newMarket;
    // Update UI
    let mpEl = document.getElementById('gh-pair');
    if(mpEl) mpEl.innerText = newMarket.replace('OTC',' OTC').replace(/([A-Z]{3})([A-Z]{3})/, '$1/$2');
    // Clear lock to force new signal
    lockedSignalId=""; lockedUntil=0; currentSignal=null;
    fetchSignal(newMarket);
  }
  return newMarket;
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
  let pairEl=document.getElementById("gh-pair");
  if(pairEl) pairEl.textContent=j.market||currentPair.replace(/([A-Z]{3})([A-Z]{3})/, '$1/$2').replace('OTC',' OTC');
  let sigEl=document.getElementById("gh-sig");let txtEl=document.getElementById("gh-txt");let reasonEl=document.getElementById("gh-reason");let paEl=document.getElementById("gh-pa");
  let dir=j.signal||j.direction;
  if(sigEl&&txtEl){
    if(dir==="CALL"||dir==="UP"){sigEl.className="gh-sig up";txtEl.textContent="UP";reasonEl.textContent=j.reason||j.price_action_type||"";}
    else if(dir==="PUT"||dir==="DOWN"){sigEl.className="gh-sig down";txtEl.textContent="DOWN";reasonEl.textContent=j.reason||j.price_action_type||"";}
    else{sigEl.className="gh-sig wait";txtEl.textContent="WAIT";reasonEl.textContent=j.reason||"Analyzing...";}
    let lossTxt = loss_count>0 ? `Loss:${loss_count}/2 | ` : '';
    if(paEl) paEl.textContent=`${lossTxt}${j.price_action_type||j.reason||"Momentum"} | ${j.confidence||0}% ${j.is_trap?"| TRAP":""}`;
  }
}

function fetchSignal(forcePair){
  let now=Date.now();
  // Loss protection check
  let prot = check_loss_protection();
  if(!prot.allowed){
    let sigEl=document.getElementById("gh-sig");let txtEl=document.getElementById("gh-txt");let reasonEl=document.getElementById("gh-reason");let paEl=document.getElementById("gh-pa");
    if(sigEl&&txtEl){
      sigEl.className="gh-sig wait"; 
      txtEl.textContent="STOP"; 
      if(reasonEl) reasonEl.textContent=`2 Loss - ${prot.remaining} min break - NO TRADE`; 
      if(paEl) paEl.textContent=`🛑 PROTECTION: ${prot.remaining}min left | Loss: ${consecutive_losses}/2 | Total:${loss_count}`;
      sigEl.style.background="#330000";
      sigEl.style.border="1px solid #ff0000";
    }
    let secEl=document.getElementById("gh-sec");if(secEl) secEl.textContent=`${prot.remaining}m STOP`;
    return;
  }
  // 58s LOCK - prevent flip
  if(lockedSignalId && now<lockedUntil && currentSignal){
    updateUI(currentSignal);
    return;
  }
  let asset = forcePair || getCurrentMarket();
  if(!asset) asset = currentPair;
  if((document.body.innerText||"").includes("Select trade pair")) return;
  let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";
  if(TOKEN) url+="&token="+encodeURIComponent(TOKEN);
  fetch(url).then(r=>r.json()).then(j=>{
    if(!j) return;
    if(j.signal==="UP") j.signal="CALL";
    if(j.signal==="DOWN") j.signal="PUT";
    // === CHECK IF PREMIUM EXPIRED / DELETED / SUSPENDED - BLOCK BOOKMARKLET ===
    if(j.status==="EXPIRED" || j.status==="DELETED" || j.status==="SUSPENDED" || j.is_expired || j.is_deleted || j.is_suspended){
      let sigEl=document.getElementById("gh-sig");let txtEl=document.getElementById("gh-txt");let reasonEl=document.getElementById("gh-reason");let paEl=document.getElementById("gh-pa");
      if(sigEl&&txtEl){
        sigEl.className="gh-sig wait";
        sigEl.style.background="#330000";
        sigEl.style.border="2px solid #ff0000";
        txtEl.textContent="BLOCKED";
        if(reasonEl) reasonEl.textContent=j.reason||"Premium revoked - Contact Admin";
        if(paEl) paEl.textContent="❌ DELETED - Bot disabled";
      }
      let secEl=document.getElementById("gh-sec");if(secEl) secEl.textContent="EXPIRED";
      currentSignal=null;
      lockedSignalId="BLOCKED";
      lockedUntil=Date.now()+999999999; // Block forever until reload with valid token
      return;
    }
    // Balanced WAIT + SIGNAL logic - accuracy first
    // If server returns WAIT or low confidence, try local PA for better signal
    if(j.signal==="WAIT" || !j.signal || j.signal==="OFFLINE" || j.confidence < 50 || (j.status==="WAITING" && j.confidence < 50)){
      // Try local PA filter for better accuracy
      if(candleHistory.length>=6 && paEnabled){
        try{
          let pa=runPAFilter(candleHistory);
          if(pa && pa.signal!=="WAIT" && (pa.signal==="CALL"||pa.signal==="PUT") && pa.conf >= 60){
            let clockSec=60-new Date().getSeconds();
            let fake={...pa,market:asset.replace(/([A-Z]{3})([A-Z]{3})/, '$1/$2').replace('OTC',' OTC'),pair:asset,confidence:pa.conf,expiry_timestamp:now+clockSec*1000,signal_id:asset+"-PA-"+now,price_action_type:pa.pa_type||pa.reason, status:"ACTIVE"};
            if(!lockedSignalId || now>=lockedUntil){
              lockedSignalId=fake.signal_id;
              lockedUntil=now+58000;
              currentSignal=fake;
              updateUI(fake);
            }
            return;
          }
        }catch(e){}
      }
      // If server confidence is 50-59, show SIGNAL not WAIT (fix WAIT jamela)
      if(j.confidence >= 50 && j.confidence < 60 && (j.signal==="CALL" || j.signal==="PUT")){
        // Show low confidence signal instead of WAIT to avoid flicker
        if(!lockedSignalId || now>=lockedUntil){
          lockedSignalId=j.signal_id|| (asset+"-"+j.signal+"-"+now);
          lockedUntil=now+58000;
          currentSignal=j;
          updateUI(j);
        }
        return;
      }
      if(j.confidence >= 50 && j.confidence < 60){
        // Low conf but no CALL/PUT - keep previous signal locked if exists, don't show WAIT
        if(currentSignal && lockedSignalId && now<lockedUntil){
          updateUI(currentSignal);
          return;
        }
        // Otherwise try PA, but don't flicker to WAIT
      }
      // If truly no signal and no candles, show WAIT only if no locked signal
      if(candleHistory.length===0 && priceHistory.length<4){
        if(currentSignal && lockedSignalId && now<lockedUntil){
          updateUI(currentSignal);
          return;
        }
        let waitSig = {
          signal: "WAIT",
          confidence: j.confidence || 0,
          reason: "Collecting data...",
          price_action_type: "Loading",
          market: asset,
          pair: asset,
          expiry_timestamp: now + 5000,
          signal_id: "WAIT-INIT-"+now,
          status: "WAITING"
        };
        updateUI(waitSig);
        return;
      }
      // Otherwise, if we have candles, give forced signal with 58% (better than pure WAIT)
      if(candleHistory.length>0){
        let lastC = candleHistory[candleHistory.length-1];
        let dir = lastC.bull ? "CALL" : "PUT";
        let fake = {signal:dir, confidence:58, reason:"Momentum - Weak but tradable", price_action_type:"Momentum", market:asset.replace(/([A-Z]{3})([A-Z]{3})/, '$1/$2'), pair:asset, expiry_timestamp:now+60000, signal_id:asset+"-MOM-"+now, status:"ACTIVE"};
        if(!lockedSignalId || now>=lockedUntil){
          lockedSignalId=fake.signal_id;
          lockedUntil=now+58000;
          currentSignal=fake;
          updateUI(fake);
        }
        return;
      }
    }
    if(j.status==="ACTIVE"&&(j.signal==="CALL"||j.signal==="PUT")){
      if(!lockedSignalId || now>=lockedUntil){
        lockedSignalId=j.signal_id|| (asset+"-"+j.signal+"-"+now);
        lockedUntil=now+58000;
        currentSignal=j;
        updateUI(j);
      }
    }
  }).catch(()=>{});
}

// Track candles
setInterval(()=>{
  let rp=getRealPrice();
  if(rp){
    let v=parseFloat(rp);
    if(v){
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
  autoDetectMarket();
  if(!currentSignal){
    let secEl=document.getElementById("gh-sec");
    if(secEl){let sec=60-new Date().getSeconds();if(sec===60) sec=0;secEl.textContent=sec+"s";}
    return;
  }
  let rem=Math.max(0,Math.ceil((currentSignal.expiry_timestamp-Date.now())/1000));
  let secEl=document.getElementById("gh-sec");if(secEl) secEl.textContent=rem+"s";
  if(rem<=0){
    currentSignal=null;lockedSignalId="";lockedUntil=0;
  }else{
    updateUI(currentSignal);
  }
},500);

setInterval(()=>autoDetectMarket(),800);
setInterval(()=>fetchSignal(),3000);
setInterval(()=>{let r=detectResult(); if(r) console.log('Result',r);},1000);
startResultObserver();
setTimeout(startResultObserver, 2000); // restart after 2s to catch late DOM


fetchSignal();
autoDetectMarket();
setTimeout(()=>{if(!currentSignal || document.getElementById('gh-txt').textContent==='WAIT'){fetchSignal();}}, 1500);
})();
