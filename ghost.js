(function(){
let css=document.createElement("style");
css.innerHTML=`
/* ===== GHOST FUTURISTIC HUD - v2 ===== */
#ghost-bot{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:188px;background:linear-gradient(165deg,rgba(10,15,35,.96),rgba(5,8,20,.98));border:1px solid rgba(0,240,255,.45);border-radius:12px;box-shadow:0 0 0 1px rgba(0,240,255,.12),0 0 28px rgba(0,240,255,.22),0 0 60px rgba(0,120,255,.18),0 18px 40px #000d;backdrop-filter:blur(14px);font-family:'Segoe UI',Inter,sans-serif;color:#e8f0ff;overflow:hidden;user-select:none}
#ghost-bot::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,#00f0ff,#7b2fff,#00ff88,transparent);animation:ghBorderFlow 2.4s linear infinite;background-size:200% 100%}
#ghost-bot::after{content:'';position:absolute;top:0;left:0;right:0;height:34px;background:linear-gradient(180deg,rgba(0,240,255,.08),transparent);pointer-events:none}
@keyframes ghBorderFlow{0%{background-position:0% 0}100%{background-position:200% 0}}
@keyframes ghScan{0%{top:-10%}100%{top:110%}}
@keyframes ghPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.85)}}
@keyframes ghBlink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes ghFloatUp{0%{transform:translateY(4px);opacity:0}20%{opacity:1}100%{transform:translateY(-10px);opacity:0}}
@keyframes ghFloatDown{0%{transform:translateY(-4px);opacity:0}20%{opacity:1}100%{transform:translateY(10px);opacity:0}}
@keyframes ghArrowUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes ghArrowDown{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
@keyframes ghGlowGreen{0%,100%{box-shadow:0 0 12px rgba(0,255,136,.55),0 0 32px rgba(0,255,136,.30)}50%{box-shadow:0 0 22px rgba(0,255,136,.85),0 0 48px rgba(0,255,136,.45)}}
@keyframes ghGlowRed{0%,100%{box-shadow:0 0 12px rgba(255,45,85,.55),0 0 32px rgba(255,45,85,.30)}50%{box-shadow:0 0 22px rgba(255,45,85,.85),0 0 48px rgba(255,45,85,.45)}}
@keyframes ghShine{0%{left:-80%}100%{left:120%}}
@keyframes ghRing{0%{transform:scale(.7);opacity:.9}100%{transform:scale(1.25);opacity:0}}
.gh-h{padding:5px 7px;background:linear-gradient(90deg,rgba(0,240,255,.14),rgba(123,47,255,.12),transparent);border-bottom:1px solid rgba(0,240,255,.18);display:flex;align-items:center;justify-content:space-between;cursor:move;position:relative}
.gh-h-left{display:flex;align-items:center;gap:6px}
.gh-dot{width:6px;height:6px;background:#00ff88;border-radius:50%;box-shadow:0 0 8px #00ff88,0 0 16px rgba(0,255,136,.6);animation:ghPulse 1.2s infinite}
.gh-h b{font-size:7.5px;color:#fff;letter-spacing:1.2px;font-weight:900}
.gh-h b span{background:linear-gradient(90deg,#00f0ff,#7b2fff,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 6px rgba(0,240,255,.6))}
.gh-live{font-size:5px;background:#ff2d55;color:#fff;padding:2px 5px;border-radius:20px;font-weight:900;letter-spacing:.6px;animation:ghBlink 1s infinite}
.gh-toggle{font-size:5px;background:rgba(0,240,255,.12);border:1px solid rgba(0,240,255,.5);color:#00f0ff;padding:2px 5px;border-radius:20px;cursor:pointer;font-weight:800;letter-spacing:.4px}
.gh-toggle.off{background:rgba(255,255,255,.05);border-color:#333;color:#666}
.gh-pair{font-size:10px;font-weight:900;color:#fff;text-align:center;margin:5px 0 4px;letter-spacing:1.4px;text-shadow:0 0 10px rgba(0,240,255,.8),0 0 22px rgba(0,240,255,.4)}
.gh-pair small{display:block;font-size:5px;color:#00f0ff;letter-spacing:2px;margin-top:2px;font-weight:700}
.gh-sig{margin:0 8px;height:54px;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;transition:all .25s}
.gh-sig .gh-arrow{font-size:16px;line-height:1;margin-bottom:1px;filter:drop-shadow(0 0 8px currentColor)}
.gh-sig.up .gh-arrow{animation:ghArrowUp .7s ease-in-out infinite}
.gh-sig.down .gh-arrow{animation:ghArrowDown .7s ease-in-out infinite}
.gh-sig b{font-size:15px;font-weight:900;letter-spacing:1.5px;line-height:1;text-shadow:0 0 14px currentColor}
.gh-sig small{font-size:5px;color:#c8d0dc;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:210px;letter-spacing:.2px}
.gh-sig .gh-scan{position:absolute;left:0;right:0;height:18px;background:linear-gradient(180deg,transparent,rgba(255,255,255,.18),transparent);animation:ghScan 1.6s linear infinite}
.gh-sig .gh-shine{position:absolute;top:0;width:40px;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);animation:ghShine 1.8s ease-in-out infinite}
.gh-sig.up{background:linear-gradient(145deg,#00ff88,#00b35e,#006e3a);color:#fff;animation:ghGlowGreen 1.1s ease-in-out infinite;border:1px solid rgba(0,255,136,.7)}
.gh-sig.down{background:linear-gradient(145deg,#ff2d55,#d6002e,#8a0020);color:#fff;animation:ghGlowRed 1.1s ease-in-out infinite;border:1px solid rgba(255,45,85,.7)}
.gh-sig.wait{background:linear-gradient(145deg,#141a2a,#0a0e1a);color:#5a6f8a;border:1px solid rgba(0,240,255,.18)}
.gh-sig.wait .gh-arrow{opacity:.35}
.gh-bar{height:2.5px;margin:6px 8px 0;border-radius:10px;background:rgba(255,255,255,.08);overflow:hidden}
.gh-bar-fill{height:100%;width:0%;border-radius:10px;background:linear-gradient(90deg,#00f0ff,#00ff88);transition:width .5s linear;box-shadow:0 0 8px #00f0ff}
.gh-meta{font-size:6.5px;color:#8a9ab5;text-align:center;margin:5px 0 6px;letter-spacing:.4px;font-weight:600;line-height:1.4}
.gh-meta b{color:#00f0ff}
.gh-meta .gh-conf{color:#00ff88}
.gh-close{margin:0 8px 7px;height:24px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#8a9ab5;font-size:7px;font-weight:700;cursor:pointer;letter-spacing:.5px}
.gh-close:hover{background:rgba(255,45,85,.15);color:#fff;border-color:rgba(255,45,85,.4)}
.gh-corner{position:absolute;width:9px;height:9px;border:1.5px solid rgba(0,240,255,.6)}
.gh-corner.tl{top:6px;left:6px;border-right:none;border-bottom:none}
.gh-corner.tr{top:6px;right:6px;border-left:none;border-bottom:none}
.gh-corner.bl{bottom:6px;left:6px;border-right:none;border-top:none}
.gh-corner.br{bottom:6px;right:6px;border-left:none;border-top:none}
`;
document.head.appendChild(css);
let old=document.getElementById("ghost-bot");if(old) old.remove();
let box=document.createElement("div");box.id="ghost-bot";
box.innerHTML=`
<div class="gh-corner tl"></div><div class="gh-corner tr"></div><div class="gh-corner bl"></div><div class="gh-corner br"></div>
<div class="gh-h" id="gh-h"><div class="gh-h-left"><div class="gh-dot"></div><b>GHOST <span>PREMIUM</span></b><span class="gh-live">● LIVE</span></div><div class="gh-toggle" id="gh-toggle">PA ON</div></div>
<div class="gh-pair" id="gh-pair">GBP/USD<small>GHOST QUANTUM X • AI SCAN</small></div>
<div class="gh-sig wait" id="gh-sig"><div class="gh-scan"></div><div class="gh-shine"></div><div class="gh-arrow" id="gh-arrow">◉</div><b id="gh-txt">WAIT</b><small id="gh-reason">QUANTUM X Analyzing...</small></div>
<div class="gh-bar"><div class="gh-bar-fill" id="gh-bar"></div></div>
<div class="gh-meta" id="gh-meta">SAFE 1M • <b><span id="gh-sec">--s</span></b> • 1% RISK<br><span id="gh-pa" style="color:#00f0ff;font-size:6px">PA: READY</span> • <span class="gh-conf" id="gh-conf">--%</span></div>
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
  // FORCE CLEAR old deleted token for free testing - remove this line if you want premium only
  // localStorage.removeItem('ghost_premium_token'); // Uncomment to always clear
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
  // Try localStorage ONLY if no token in URL and not free mode bookmarklet
  // If bookmarklet has no token param, don't use localStorage old token (fix for BLOCKED issue)
  let isFreeBookmarklet = true;
  for(let s of document.getElementsByTagName('script')){
    if(s.src&&s.src.includes('ghost.js')){
      if(s.src.includes('token=')) isFreeBookmarklet = false;
    }
  }
  if(!TOKEN && !isFreeBookmarklet){
    TOKEN=localStorage.getItem('ghost_premium_token')||"";
  }
  // Save token if found in URL
  if(TOKEN) localStorage.setItem('ghost_premium_token', TOKEN);
  // If free bookmarklet, clear old token
  if(isFreeBookmarklet){
    localStorage.removeItem('ghost_premium_token');
    TOKEN="";
  }
}catch(e){}

let currentSignal=null;
let currentPair="GBPUSD";
let lastDetectedMarket="GBPUSD";
let priceHistory=[];let candleHistory=[];
let lockedSignalId="";let lockedUntil=0;

// NEW MARKET DETECT - FIXED OTC + NO FLICKER
function getCurrentMarket(){
  try{
    let all = document.querySelectorAll('div, span, button, a');
    // Priority 1: Look for OTC explicitly - EUR/USD OTC or EUR/USD (OTC) or EUR/JPY OTC
    for(let el of all){
      let txt=(el.innerText||'').trim();
      // Check for OTC in text near pair
      if(txt.toUpperCase().includes('OTC') && txt.includes('/')){
        let m = txt.match(/([A-Z]{3})\s*[\/\s]+\s*([A-Z]{3})/i);
        if(m){
          let pair = (m[1]+m[2]).toUpperCase();
          let valid = ["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"];
          if(valid.includes(pair)){
            // Found OTC pair
            return pair + 'OTC';
          }
        }
      }
    }
    // Priority 2: Bottom selector with flag (your screenshot) - EUR/USD 93% etc
    for(let el of all){
      let txt=(el.innerText||'').trim();
      if(txt.match(/^[A-Z]{3}\/[A-Z]{3}(\s+\d+%|\s+OTC|\s+\(OTC\)|)?/i)){
        let rect = el.getBoundingClientRect();
        if(rect.top > window.innerHeight*0.4){
          let m = txt.match(/([A-Z]{3})\/([A-Z]{3})/i);
          if(m){
            let pair = (m[1]+m[2]).toUpperCase();
            let isOTC = txt.toUpperCase().includes('OTC');
            if(isOTC) pair+='OTC';
            let valid = ["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"];
            if(valid.includes(pair.replace('OTC',''))){
              return pair;
            }
          }
        }
      }
    }
    // Priority 3: Any element with pair pattern
    for(let el of all){
      let txt=(el.innerText||'').trim();
      if(txt.includes('/') && txt.length<30){
        let m = txt.match(/([A-Z]{3})[^A-Z0-9]*([A-Z]{3})/i);
        if(m){
          let rect = el.getBoundingClientRect();
          if(rect.top > 300){
            let pair = (m[1]+m[2]).toUpperCase();
            if(pair.length==6){
              // Check if OTC nearby
              let parentTxt = (el.parentElement?.innerText||'').toUpperCase();
              if(parentTxt.includes('OTC') || txt.toUpperCase().includes('OTC')){
                pair+='OTC';
              }
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
  if(pairEl){
    let mTxt = j.market||currentPair.replace(/([A-Z]{3})([A-Z]{3})/, '$1/$2').replace('OTC',' OTC');
    pairEl.innerHTML = mTxt + '<small>GHOST QUANTUM X • AI SCAN</small>';
  }
  let sigEl=document.getElementById("gh-sig");let txtEl=document.getElementById("gh-txt");let reasonEl=document.getElementById("gh-reason");let paEl=document.getElementById("gh-pa");
  let arrowEl=document.getElementById("gh-arrow");let barEl=document.getElementById("gh-bar");let confEl=document.getElementById("gh-conf");
  let dir=j.signal||j.direction;
  if(sigEl&&txtEl){
    let isSameLocked = currentSignal && j.signal_id === currentSignal.signal_id;
    if(dir==="CALL"||dir==="UP"){
      sigEl.className="gh-sig up";
      txtEl.textContent="▲ UP";
      if(arrowEl) arrowEl.textContent="▲";
      if(!isSameLocked || !reasonEl.textContent) reasonEl.textContent=j.reason||j.price_action_type||"";
    }
    else if(dir==="PUT"||dir==="DOWN"){
      sigEl.className="gh-sig down";
      txtEl.textContent="▼ DOWN";
      if(arrowEl) arrowEl.textContent="▼";
      if(!isSameLocked || !reasonEl.textContent) reasonEl.textContent=j.reason||j.price_action_type||"";
    }
    else{
      sigEl.className="gh-sig wait";
      txtEl.textContent="◉ WAIT";
      if(arrowEl) arrowEl.textContent="◉";
      reasonEl.textContent=j.reason||"Analyzing...";
    }
    let lossTxt = loss_count>0 ? `Loss:${loss_count}/2 | ` : '';
    if(paEl) paEl.textContent=`${lossTxt}${j.price_action_type||"Momentum"}`;
    if(confEl) confEl.textContent=`${j.confidence||0}% CONF`;
    if(barEl){
      let rem = j.expiry_timestamp ? Math.max(0, Math.ceil((j.expiry_timestamp-Date.now())/1000)) : 0;
      let pct = rem>0 ? Math.max(4, (rem/60)*100) : 0;
      barEl.style.width = pct + '%';
      barEl.style.background = (dir==="CALL"||dir==="UP") ? 'linear-gradient(90deg,#00f0ff,#00ff88)' : (dir==="PUT"||dir==="DOWN") ? 'linear-gradient(90deg,#ff2d55,#ff8a00)' : 'linear-gradient(90deg,#00f0ff,#7b2fff)';
    }
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
    // === CHECK IF PREMIUM EXPIRED - FIXED: Allow free testing if token deleted ===
    if(j.status==="EXPIRED" || j.status==="DELETED" || j.status==="SUSPENDED" || j.is_expired || j.is_deleted || j.is_suspended){
      console.log("Token expired/deleted, trying free mode fallback");
      // Try free mode without token - don't block forever, retry without token
      if(TOKEN){
        console.log("Retrying without token for free testing");
        TOKEN=""; // Clear token for free mode
        localStorage.removeItem('ghost_premium_token');
        // Retry fetch without token after 1 sec
        setTimeout(()=>fetchSignal(), 1000);
        let reasonEl=document.getElementById("gh-reason");
        if(reasonEl) reasonEl.textContent="Token expired - Switching to FREE mode...";
        return;
      }
      // If already free mode and still expired, show but don't lock forever
      let sigEl=document.getElementById("gh-sig");let txtEl=document.getElementById("gh-txt");let reasonEl=document.getElementById("gh-reason");let paEl=document.getElementById("gh-pa");
      if(sigEl&&txtEl){
        sigEl.className="gh-sig wait";
        txtEl.textContent="WAIT";
        if(reasonEl) reasonEl.textContent="Free mode - Collecting data...";
        if(paEl) paEl.textContent="PA: FREE MODE";
      }
      return;
    }
    // Balanced WAIT + SIGNAL logic - accuracy first - FIXED no flicker
    // If locked signal exists, don't run PA filter (prevent reason flicker)
    if(lockedSignalId && now<lockedUntil && currentSignal){
      updateUI(currentSignal);
      return;
    }
    if(j.signal==="WAIT" || !j.signal || j.signal==="OFFLINE" || j.confidence < 50 || (j.status==="WAITING" && j.confidence < 50)){
      // Try local PA filter for better accuracy - only if no locked signal
      if(candleHistory.length>=6 && paEnabled && (!lockedSignalId || now>=lockedUntil)){
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
