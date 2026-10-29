(function(){
let css=document.createElement("style");
css.innerHTML=`
#ghost-small{position:fixed;top:85px;right:4px;z-index:2147483647;width:200px;background:linear-gradient(145deg,#0a1120,#070e1c);border:1px solid #00ff88;border-radius:10px;box-shadow:0 0 15px rgba(0,255,136,.2),0 6px 20px #0009;font-family:Inter,sans-serif;color:#e8f0ff;overflow:hidden;user-select:none}
.gh-head{display:flex;align-items:center;justify-content:space-between;padding:5px 6px;background:#0d1a2e;border-bottom:1px solid #123a3a;cursor:move}
.gh-logo{display:flex;align-items:center;gap:4px}
.gh-icon{width:18px;height:18px;background:#0f2a1a;border:1px solid #00ff8844;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px}
.gh-titles{line-height:1}
.gh-titles h1{margin:0;font-size:8px;letter-spacing:.5px;color:#fff;font-weight:900}
.gh-titles span{font-size:5px;color:#7fb0a0;letter-spacing:.4px;display:block}
.gh-close{width:16px;height:16px;background:#ff1744;border:none;border-radius:4px;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:10px;font-weight:900}
.gh-market{display:flex;align-items:center;justify-content:space-between;padding:5px 6px;background:#080f1c;border-bottom:1px solid #122a42}
.gh-pair{font-size:9px;font-weight:800;color:#fff}
.gh-real{font-size:4.5px;background:#0a2a1a;border:1px solid #00ff88;color:#00ff88;padding:1px 3px;border-radius:20px;display:inline-block;margin-top:1px}
.gh-signal-area{display:flex;align-items:center;gap:5px;padding:5px 6px;background:linear-gradient(90deg,#0a1a14,#0d1a24);margin:5px;border-radius:6px;border:1px solid #123a2a}
.gh-sig-box{flex:1;background:linear-gradient(145deg,#0a2418,#0f2a1e);border:1px solid #00ff88;border-radius:5px;padding:5px;display:flex;align-items:center;justify-content:center;gap:3px;min-height:28px}
.gh-sig-box.down{background:linear-gradient(145deg,#2a0f14,#1a0a12);border-color:#ff1744}
.gh-sig-box.wait{background:#1a1a2a;border-color:#2a2a4a}
.gh-sig-box b{font-size:11px;letter-spacing:.3px}
.gh-conf{width:28px;height:28px;display:flex;align-items:center;justify-content:center}
.gh-conf-bg{width:28px;height:28px;border-radius:50%;background:conic-gradient(#00ff88 var(--p), #1a2a3a 0);display:flex;align-items:center;justify-content:center}
.gh-conf-in{width:20px;height:20px;background:#0a1421;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:6px;font-weight:800;color:#00ff88}
.gh-timer b{font-size:9px;color:#00ff88;display:block}
.gh-timer small{font-size:4.5px;color:#7a8a9a;display:block}
.gh-price-row{display:flex;justify-content:space-between;padding:3px 6px;background:#060d17;border-top:1px solid #12314a;font-size:6px;color:#8aa0b8}
.gh-price-row b{color:#00ff88;font-size:7px}
`;
document.head.appendChild(css);
let old=document.getElementById("ghost-small");if(old) old.remove();
let box=document.createElement("div");box.id="ghost-small";
box.innerHTML=`
<div class="gh-head" id="gh-head"><div class="gh-logo"><div class="gh-icon">👻</div><div class="gh-titles"><h1>GHOST BOT</h1><span>GHOST PREMIUM BOT</span></div></div><div style="display:flex;align-items:center;gap:4px"><div style="width:4px;height:4px;background:#00ff88;border-radius:50%;box-shadow:0 0 4px #00ff88"></div><div class="gh-close" id="gh-close">✕</div></div></div>
<div class="gh-market"><div><div class="gh-pair" id="gh-pair">AUD/USD</div><div class="gh-real">REAL</div></div><div style="text-align:right;font-size:6px;color:#8aa0b8"><span id="gh-exp">1M</span></div></div>
<div class="gh-signal-area"><div class="gh-sig-box wait" id="gh-sig-box"><span id="gh-arrow">⏳</span><b id="gh-sig">WAIT</b></div><div class="gh-conf"><div class="gh-conf-bg" id="gh-conf-bg" style="--p:0%"><div class="gh-conf-in" id="gh-conf">0%</div></div></div><div class="gh-timer"><small>TIME</small><b id="gh-timer">00:00</b></div></div>
<div class="gh-price-row"><span><b id="gh-price">0.00000</b></span><span id="gh-time-now">--:--:--</span></div>
`;
document.body.appendChild(box);
document.getElementById("gh-close").addEventListener("click",e=>{e.stopPropagation();box.remove()});
document.getElementById("gh-close").addEventListener("touchend",e=>{e.stopPropagation();box.remove()});
let isDrag=false,sx=0,sy=0,il=0,it=0;let head=document.getElementById("gh-head");
function getPos(){let r=box.getBoundingClientRect();return{left:r.left,top:r.top};}
function ds(e){if(e.target.closest("#gh-close")) return; isDrag=true;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;sx=cx;sy=cy;let p=getPos();il=p.left;it=p.top;box.style.right="auto";box.style.bottom="auto";e.preventDefault();}
function dm(e){if(!isDrag)return;let cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;box.style.left=(il+cx-sx)+"px";box.style.top=(it+cy-sy)+"px";e.preventDefault();}
function de(){isDrag=false;}
head.addEventListener("mousedown",ds);document.addEventListener("mousemove",dm);document.addEventListener("mouseup",de);
head.addEventListener("touchstart",ds,{passive:false});document.addEventListener("touchmove",dm,{passive:false});document.addEventListener("touchend",de);
let TOKEN="";try{let scs=document.getElementsByTagName('script');for(let sc of scs){if(sc.src&&sc.src.includes('ghost.js')){let u=new URL(sc.src);TOKEN=u.searchParams.get('token')||u.searchParams.get('access')||"";if(TOKEN)break;}}if(!TOKEN)TOKEN=localStorage.getItem('ghost_premium_token')||"";}catch(e){}
let currentSignal=null;let stablePair="AUDUSD";let stableDisplay="AUD/USD";let stableLock=0;
function getRealPair(){try{if((document.body.innerText||"").includes("Select trade pair")) return {pair:stablePair,display:stableDisplay};let buyBtn=null;for(let el of document.querySelectorAll('button, div')){let t=(el.innerText||"").trim();if(t==="Buy"&&el.getBoundingClientRect().top>window.innerHeight*0.5){buyBtn=el;break;}}if(buyBtn){let buyRect=buyBtn.getBoundingClientRect();let best=null;let bestDist=9999;for(let el of document.querySelectorAll('div, span')){let txt=(el.innerText||"").trim();if(txt.length>30||txt.length<5) continue;if(!txt.includes('%')) continue;if(/OTC/i.test(txt)) continue;let m=txt.match(/^([A-Z]{3}\/[A-Z]{3})/);if(!m) continue;let r=el.getBoundingClientRect();if(r.top>buyRect.top) continue;if(buyRect.top-r.top>350) continue;let dist=buyRect.top-r.top;if(dist<bestDist){bestDist=dist;best={pair:m[1].replace('/','').toUpperCase(),display:m[1]};}}if(best){let now=Date.now();if(best.pair!==stablePair){if(now>stableLock){stablePair=best.pair;stableDisplay=best.display;stableLock=now+10000;}}else{stableDisplay=best.display;}return {pair:stablePair,display:stableDisplay};}}}catch(e){}return {pair:stablePair,display:stableDisplay};}
function getRealPrice(){try{for(let el of document.querySelectorAll('div, span')){let txt=(el.innerText||"").trim();if(txt.match(/^\d+\.\d{3,5}$/)&&txt.length>=6&&txt.length<=9){let r=el.getBoundingClientRect();if(r.top>50&&r.top<300&&r.left>window.innerWidth*0.5){return txt;}}}}catch(e){}return null;}
function updateUI(sig){let p=document.getElementById("gh-pair");if(p) p.textContent=sig.market||stableDisplay;let b=document.getElementById("gh-sig-box");let t=document.getElementById("gh-sig");let a=document.getElementById("gh-arrow");if(b&&t){let dir=sig.direction||sig.signal;b.className="gh-sig-box "+(dir==="UP"?"up":dir==="DOWN"?"down":"wait");if(dir==="UP"){t.textContent="UP";a.textContent="↗";}else if(dir==="DOWN"){t.textContent="DOWN";a.textContent="↘";}else{t.textContent="WAIT";a.textContent="⏳";}}let c=document.getElementById("gh-conf");let cb=document.getElementById("gh-conf-bg");if(c&&cb){let v=sig.confidence||0;c.textContent=v+"%";cb.style.setProperty("--p",v+"%");}let pr=document.getElementById("gh-price");if(pr){let rp=getRealPrice();pr.textContent=rp||sig.price||"0.00000";}}
function fetchSig(){let info=getRealPair();let asset=info.pair;if((document.body.innerText||"").includes("Select trade pair")) return;let url="https://giogram-backend.onrender.com/api/signal?pair="+asset+"&mode=SAFE";if(TOKEN) url+="&token="+encodeURIComponent(TOKEN);fetch(url).then(r=>r.json()).then(j=>{if(!j||j.signal=="ERROR") return;if(j.status==="ACTIVE"&&(j.signal==="UP"||j.signal==="DOWN")){currentSignal=j;updateUI(j);}else if(j.signal==="WAIT"){if(!currentSignal||Date.now()>currentSignal.expiry_timestamp){currentSignal={...j,market:info.display,pair:asset,direction:"WAIT",signal:"WAIT",expiry_timestamp:Date.now()+60000};updateUI(currentSignal);}}}).catch(e=>{});}
setInterval(()=>{let tn=document.getElementById("gh-time-now");if(tn){let now=new Date();tn.textContent=now.toLocaleTimeString('en-GB',{hour12:false});}let rp=getRealPrice();let pr=document.getElementById("gh-price");if(rp&&pr)pr.textContent=rp;if(!currentSignal){let tm=document.getElementById("gh-timer");if(tm){let sec=60-new Date().getSeconds();if(sec===60) sec=0;tm.textContent="00:"+(sec<10?"0"+sec:sec);}return;}let rem=Math.max(0,Math.ceil((currentSignal.expiry_timestamp-Date.now())/1000));let tm=document.getElementById("gh-timer");if(tm){let m=Math.floor(rem/60);let s=rem%60;tm.textContent=(m<10?"0"+m:m)+":"+(s<10?"0"+s:s);}if(rem<=0) currentSignal=null;},500);
setInterval(fetchSig,4000);fetchSig();
})();
