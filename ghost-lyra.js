
(function(){
if(document.getElementById('ghost-lyra')){ document.getElementById('ghost-lyra').style.display='block'; return; }
// ===== GHOST - Screenshot Moto CHOTO, All Red, Transparent, SVG Only =====
// Bookmark khulle prothome sudhu CHOTO Ghost Orb asbe (60px)
// Orb e click korle baki option asbe (Step 1/2/3 Panel)
// No emoji, all SVG
var ICON = {
  ghost: '<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none"><path d="M32 4C18 4 8 15 8 30v18c0 3 2 4 4 3 2-1 3-3 4-5 1 2 3 4 5 5 2 1 4 0 5-2 1 2 3 3 6 3s5-1 6-3c1 2 3 3 5 2 2-1 4-3 5-5 1 2 2 4 4 5 2 1 4 0 4-3V30C56 15 46 4 32 4Z" fill="#fff" opacity="0.95"/><circle cx="23" cy="30" r="5" fill="#000"/><circle cx="41" cy="30" r="5" fill="#000"/><circle cx="24.5" cy="28.5" r="1.8" fill="#fff"/><circle cx="42.5" cy="28.5" r="1.8" fill="#fff"/><path d="M27 40c3 2 7 2 10 0" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
  voiceOn: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5Z" fill="#fff" stroke="none"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
  voiceOff: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M11 5 6 9H2v6h4l5 4V5Z" fill="#fff" stroke="none"/><line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/></svg>',
  up: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>',
  down: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>',
  wait: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="7" x2="12" y2="12"/><line x1="12" y1="12" x2="16" y2="14"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  edit: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/></svg>',
  stop: '<svg viewBox="0 0 24 24" width="13" height="13" fill="#fff"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" width="14" height="14" fill="#ffd166"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>',
  fire: '<svg viewBox="0 0 24 24" width="14" height="14" fill="#ff6b35"><path d="M12 2c1 4-2 5-2 8a4 4 0 0 0 8 0c0-1-.5-2-1-3 2 1 3 3 3 5a6 6 0 1 1-12 0c0-3 2-6 4-10Z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  trend: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  macro: '<svg viewBox="0 0 24 24" width="14" height="14" fill="#38bdf8"><circle cx="12" cy="12" r="9" fill="none" stroke="#38bdf8" stroke-width="2"/><circle cx="12" cy="12" r="3"/></svg>',
  ext: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  arrowR: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowL: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
  play: '<svg viewBox="0 0 24 24" width="13" height="13" fill="#fff"><path d="M6 4l14 8-14 8V4Z"/></svg>'
};
var css=document.createElement("style");
css.innerHTML=
"#ghost-lyra{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:2147483647;width:280px;font-family:Inter,sans-serif;user-select:none}"+
".gh-orb{width:44px;height:44px;margin:0 auto 4px;border-radius:50%;background:linear-gradient(135deg,rgba(255,255,255,.45),rgba(255,80,80,.65) 30%,rgba(180,0,30,.75) 65%,rgba(90,0,0,.60));backdrop-filter:blur(12px) saturate(180%);-webkit-backdrop-filter:blur(12px) saturate(180%);border:1px solid rgba(255,255,255,.55);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.30),inset 0 2px 4px rgba(255,255,255,.60),inset 0 -2px 4px rgba(0,0,0,.20),0 0 22px rgba(255,30,30,.55);animation:ghPulse 2.2s infinite}"+
".gh-orb svg{width:42px;height:42px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.5))}"+
"@keyframes ghPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}"+
".gh-card{position:relative;background:linear-gradient(135deg,rgba(255,255,255,.35) 0%,rgba(255,255,255,.12) 30%,rgba(255,255,255,.06) 60%,rgba(255,45,85,.18) 100%);backdrop-filter:blur(22px) saturate(180%);-webkit-backdrop-filter:blur(22px) saturate(180%);border:1px solid rgba(255,255,255,.45);border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.65),inset 0 -1px 0 rgba(255,255,255,.15),0 0 28px rgba(255,45,85,.28);overflow:hidden}"+
".gh-h{padding:9px 11px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.12);cursor:move}"+
".gh-h b{font-size:12px;color:#fff;letter-spacing:1px}.gh-h b span{color:#ff2d55}"+
".gh-h .gh-right{display:flex;gap:6px;align-items:center}"+
".gh-voice{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);color:#fff;border-radius:12px;padding:3px 7px;font-size:9px;cursor:pointer;display:flex;align-items:center;gap:4px}"+
".gh-step-badge{font-size:8px;color:#fff;background:rgba(255,45,85,.45);padding:2px 6px;border-radius:10px}"+
".gh-close{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;cursor:pointer}"+
".gh-step{padding:11px}"+
".gh-title{font-size:13px;font-weight:900;color:#fff;margin:0 0 2px}"+
".gh-sub{font-size:9px;color:rgba(255,255,255,.75);margin:0 0 10px}"+
".gh-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px}"+
".gh-btn{background:linear-gradient(145deg,rgba(255,255,255,.10),rgba(255,45,85,.18));border:1px solid rgba(255,255,255,.18);border-radius:11px;padding:9px 7px;display:flex;align-items:center;gap:7px;cursor:pointer;color:#fff}"+
".gh-btn.sel{background:linear-gradient(145deg,#ff2d55,#c4002e);border-color:#fff;box-shadow:0 0 14px rgba(255,45,85,.6)}"+
".gh-btn b{font-size:12px;display:block;line-height:1}.gh-btn small{font-size:7px;color:rgba(255,255,255,.85);letter-spacing:.5px}"+
".gh-btn .gh-ic{width:26px;height:26px;min-width:26px;background:rgba(0,0,0,.25);border-radius:8px;display:flex;align-items:center;justify-content:center}"+
".gh-foot{padding:0 11px 11px;display:flex;gap:7px}"+
".gh-next{flex:1;background:linear-gradient(90deg,#ff2d55,#ff5e3a);border:none;border-radius:10px;color:#fff;font-weight:900;padding:10px;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center;gap:6px}"+
".gh-back{width:62px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:10px;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;font-size:11px}"+
".gh-sig{margin:9px 11px 0;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:7px;font-size:14px;font-weight:900;color:#fff}"+
".gh-sig.up{background:linear-gradient(145deg,rgba(0,200,83,.85),rgba(0,150,36,.85))}"+
".gh-sig.down{background:linear-gradient(145deg,rgba(255,23,68,.9),rgba(213,0,43,.9))}"+
".gh-sig.wait{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);font-size:11px}"+
".gh-sig.off{background:rgba(0,0,0,.55);border:1px solid rgba(255,45,85,.6);font-size:11px}"+
".gh-meta{font-size:9px;color:rgba(255,255,255,.7);text-align:center;padding:6px 0 2px}"+
".gh-hint{font-size:8px;color:rgba(255,255,255,.55);text-align:center;padding:0 0 8px}"+
".gh-close-bar{margin:0 11px 11px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.15);border-radius:10px;color:#fff;padding:8px;text-align:center;font-size:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px}";
document.head.appendChild(css);
var box=document.createElement("div");
box.id="ghost-lyra";
// Prothome CHOTO - sudhu Orb dekhabe, Panel lukano thakbe
box.innerHTML=
'<div class="gh-orb" id="gh-orb">'+ICON.ghost+'</div>'+
'<div class="gh-card" id="gh-card" style="display:none">'+
'<div class="gh-h" id="gh-h"><b>GHOST <span>AI</span></b><div class="gh-right"><button class="gh-voice" id="gh-voice-btn">'+ICON.voiceOn+'<span>Tap for Voice</span></button><span class="gh-step-badge" id="gh-step-label">01 / 03</span><div class="gh-close" id="gh-lyra-close">'+ICON.close+'</div></div></div>'+
'<div id="gh-voice-set" style="display:flex;gap:4px;align-items:center;padding:5px 7px;border-bottom:1px solid rgba(255,255,255,.10);font-size:8px;color:#fff"><span style="opacity:.8">Voice:</span><button data-vlang="bn" style="flex:1;padding:3px;border-radius:6px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.12);color:#fff;font-size:8px;cursor:pointer">Bangla</button><button data-vlang="hi" style="flex:1;padding:3px;border-radius:6px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.12);color:#fff;font-size:8px;cursor:pointer">Hindi</button><button data-vlang="en" style="flex:1;padding:3px;border-radius:6px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.12);color:#fff;font-size:8px;cursor:pointer">English</button><select id="gh-rate" style="background:rgba(0,0,0,.3);color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:6px;font-size:8px;padding:2px"><option value="0.8">Slow</option><option value="0.95">Normal</option><option value="1.2">Fast</option><option value="1.4">Very Fast</option></select><select id="gh-pitch" style="background:rgba(0,0,0,.3);color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:6px;font-size:8px;padding:2px"><option value="0.8">Low Pitch</option><option value="1">Normal</option><option value="1.3">High</option><option value="1.5">Very High</option></select></div><div id="gh-body"></div>'+
'<div id="gh-sig-wrap" style="display:none"><div class="gh-sig wait" id="gh-sig">'+ICON.wait+'<span>WAIT</span></div><div class="gh-meta" id="gh-meta">Pair: -- | Duration: -- | Stake: -- | Left: --</div><div id="gh-analysis" style="display:none;margin:8px 11px 0;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:8px;font-size:10px;line-height:1.5;color:#fff"></div><div style="padding:8px 11px 0"><button id="</div></div>'+
''+
'<div class="gh-close-bar" id="gh-close-bar">'+ICON.close+'<span>Close</span></div>'+
'</div>';
document.body.appendChild(box);
var saved={}; try{ saved=JSON.parse(localStorage.getItem("ghost_lyra")||"{}"); }catch(e){}
var state={duration:60,durationLabel:"1 Min",stake:5,stakeLabel:"$5",count:1,step:1,voice:true};
if(saved.duration) state={...state,...saved};
var session={active:false,left:0};
var lastSpoken=""; var voiceUnlocked=false;
function save(){ try{ localStorage.setItem("ghost_lyra", JSON.stringify(state)); }catch(e){} }
function ghSpeak(text){
  try{
    if(!state.voice) return;
    if(!voiceUnlocked) return;
    // BANGLA VOICE: bn-BD voice diye Bangla bolbe, normal human er moto
    // Age en-US chilo, tai English robot er moto bolto
    if(text===lastSpoken) return;
    // LYRA long analysis - jodi same signal er same voice abar ase, tao 1 bar bolbe, pore Speak Again button e bolbe
    lastSpoken=text;
    if(!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(text);
    // BANGLA VOICE FIX: Phone e Bangla voice na thakle Bengali script bujbe na, tai Roman Bangla te bolbe
    // VOICE FIX: User Hindi select korche, Fast + Pitch diche - age ami jor kore Bangla + 0.95 chapaia ditam, tai tar setting kaj korto na
    // Ekhon: User er setting manbo - localStorage theke lang/rate/pitch nibo
    var userLang = 'bn';
    var userRate = 0.95;
    var userPitch = 1;
    try{
      userLang = localStorage.getItem('ghost_voice_lang') || 'bn';
      userRate = parseFloat(localStorage.getItem('ghost_voice_rate') || '0.95');
      userPitch = parseFloat(localStorage.getItem('ghost_voice_pitch') || '1');
      // Jodi user Hindi select kore thake, tahole Hindi use korbo, Bangla na
      if(!localStorage.getItem('ghost_voice_lang')){
        // First time: Phone er default voice check koro - Hindi default hole Hindi nibo
        var _vs0 = window.speechSynthesis.getVoices()||[];
        var _def = _vs0.find(function(v){ return v.default; });
        if(_def && _def.lang && _def.lang.toLowerCase().indexOf('hi')===0) userLang='hi';
      }
    }catch(e){}
    var vs=[];
    try{ vs=window.speechSynthesis.getVoices(); }catch(e){}
    // User er lang onujayi voice khujo - Hindi hole Hindi, Bangla hole Bangla, English hole English
    var bn=null;
    if(userLang==='hi'){
      bn=vs.find(function(v){ return v.lang && v.lang.toLowerCase().indexOf('hi')===0; });
      if(!bn) bn=vs.find(function(v){ return v.name && v.name.toLowerCase().indexOf('hindi')>=0; });
    } else if(userLang==='en'){
      bn=vs.find(function(v){ return v.lang && v.lang.toLowerCase().indexOf('en')===0; });
    } else {
      bn=vs.find(function(v){ return v.lang && (v.lang.toLowerCase().indexOf('bn')===0 || v.lang.toLowerCase().indexOf('ben')===0); });
      if(!bn) bn=vs.find(function(v){ return v.name && v.name.toLowerCase().indexOf('bengali')>=0; });
      if(!bn) bn=vs.find(function(v){ return v.name && v.name.toLowerCase().indexOf('bangla')>=0; });
    }
    var hasBanglaVoice = !!bn;
    // User er rate/pitch use korbo - age 0.95 fixed chilo, ekhon user er ta
    var speakText = text;
    if(!hasBanglaVoice){
      // Bangla voice nai - Bengali script ke Roman Bangla te convert koro, jate English voice o Bangla er moto bole
      // Example: "ভাই শুনো" -> "Bhai shuno"
      speakText = text
        .replace(/ভাই শুনো/g, "Bhai shuno")
        .replace(/ঘোস্ট রেডি/g, "Ghost ready")
        .replace(/আমি বাংলায় বলবো/g, "Ami Banglay bolbo")
        .replace(/ভাই/g, "Bhai")
        .replace(/শুনো/g, "shuno")
        .replace(/ভালো/g, "valo")
        .replace(/আপ/g, "UP")
        .replace(/ডাউন/g, "DOWN")
        .replace(/এন্ট্রি পাইছি/g, "entry paichi")
        .replace(/এন্ট্রি নাও/g, "entry nao")
        .replace(/এখনই/g, "ekhoni")
        .replace(/দেরি করো না/g, "deri koro na")
        .replace(/কনফিডেন্স/g, "confidence")
        .replace(/পারসেন্ট/g, "percent")
        .replace(/উইক রিজেকশন/g, "wick rejection")
        .replace(/লিকুইডিটি গ্র্যাব/g, "liquidity grab")
        .replace(/অর্ডার ব্লক/g, "order block")
        .replace(/ব্রেক অফ স্ট্রাকচার/g, "break of structure")
        .replace(/তে একটা/g, "te ekta")
        .replace(/তাই/g, "tai")
        .replace(/থেকে/g, "theke")
        .replace(/হইছে/g, "hoiche")
        .replace(/আর/g, "ar")
        .replace(/আছে/g, "ache");
      // Jodi ekhono Bengali script thake (convert hoy nai), tahole English fallback
      if(/[\u0980-\u09FF]/.test(speakText)){
        // Bengali script roye geche - Roman e full fallback
        speakText = "Bhai shuno, " + (window.__gh_lastDirBn || "UP") + " entry paichi. Confidence " + (window.__gh_lastConf || "80") + " percent. Ekhoni entry nao.";
      }
      // Hindi user: Hindi voice na thakle English voice diye Roman Hindi/Bangla bolbe, but user er rate/pitch manbe
      u.lang = (userLang==='hi' ? 'hi-IN' : 'en-US'); u.rate=userRate; u.pitch=userPitch; u.volume=1;
    } else {
      u.lang = (userLang==='hi' ? 'hi-IN' : userLang==='en' ? 'en-US' : 'bn-BD'); u.rate=userRate; u.pitch=userPitch; u.volume=1;
      u.voice=bn;
    }
    var u2 = u;
    u.text = speakText;
    // For debugging: show which voice used
    window.__gh_voiceMode = hasBanglaVoice ? "BANGLA" : "ROMAN-BANGLA";
    window.speechSynthesis.speak(u);
  }catch(e){}
}
function ghUnlockVoice(){
  try{
    voiceUnlocked=true; state.voice=true; save();
    if(!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    var _ul = 'bn', _ur=0.95, _up=1;
    try{ _ul=localStorage.getItem('ghost_voice_lang')||'bn'; _ur=parseFloat(localStorage.getItem('ghost_voice_rate')||'0.95'); _up=parseFloat(localStorage.getItem('ghost_voice_pitch')||'1'); }catch(e){}
    var _txt = _ul==='hi' ? 'Bhai, Ghost ready. Main Hindi me bolunga.' : _ul==='en' ? 'Ghost ready. I will speak in English.' : 'ভাই, ঘোস্ট রেডি। আমি বাংলায় বলবো।';
    var u=new SpeechSynthesisUtterance(_txt);
    u.lang = _ul==='hi' ? 'hi-IN' : _ul==='en' ? 'en-US' : 'bn-BD'; u.rate=_ur; u.pitch=_up; window.speechSynthesis.speak(u);
    var vb=document.getElementById('gh-voice-btn'); if(vb) vb.innerHTML=ICON.voiceOn+'<span>Voice: ON</span>';
  }catch(e){}
}
function render(){
  document.getElementById('gh-step-label').textContent='0'+state.step+' / 03';
  var body=document.getElementById('gh-body');
  if(state.step===1){
    body.innerHTML='<div class="gh-step"><p class="gh-title">Trade Duration</p><p class="gh-sub">Choose candle expiry timeframe</p><div class="gh-grid">'+
    '<div class="gh-btn '+(state.duration===5?'sel':'')+'" data-d="5" data-l="5 Sec"><div class="gh-ic">'+ICON.bolt+'</div><div><b>5 Sec</b><small>ULTRA FAST</small></div></div>'+
    '<div class="gh-btn '+(state.duration===30?'sel':'')+'" data-d="30" data-l="30 Sec"><div class="gh-ic">'+ICON.fire+'</div><div><b>30 Sec</b><small>MOMENTUM</small></div></div>'+
    '<div class="gh-btn '+(state.duration===60?'sel':'')+'" data-d="60" data-l="1 Min"><div class="gh-ic">'+ICON.clock+'</div><div><b>1 Min</b><small>STANDARD</small></div></div>'+
    '<div class="gh-btn '+(state.duration===120?'sel':'')+'" data-d="120" data-l="2 Min"><div class="gh-ic">'+ICON.trend+'</div><div><b>2 Min</b><small>TREND</small></div></div>'+
    '<div class="gh-btn '+(state.duration===300?'sel':'')+'" data-d="300" data-l="5 Min"><div class="gh-ic">'+ICON.macro+'</div><div><b>5 Min</b><small>MACRO</small></div></div>'+
    '<div class="gh-btn '+(state.duration===600?'sel':'')+'" data-d="600" data-l="10 Min"><div class="gh-ic">'+ICON.ext+'</div><div><b>10 Min</b><small>EXTENDED</small></div></div>'+
    '</div></div><div class="gh-foot"><button class="gh-next" id="gh-next">Next '+ICON.arrowR+'</button></div>';
  } else if(state.step===2){
    body.innerHTML='<div class="gh-step"><p class="gh-title">Investment Stake</p><p class="gh-sub">How much per trade?</p><div class="gh-grid">'+
    '<div class="gh-btn '+(state.stake===1?'sel':'')+'" data-s="1" data-sl="$1"><div class="gh-ic">$</div><div><b>$1</b><small>SAFE</small></div></div>'+
    '<div class="gh-btn '+(state.stake===3?'sel':'')+'" data-s="3" data-sl="$3"><div class="gh-ic">$</div><div><b>$3</b><small>LOW</small></div></div>'+
    '<div class="gh-btn '+(state.stake===5?'sel':'')+'" data-s="5" data-sl="$5"><div class="gh-ic">$</div><div><b>$5</b><small>STANDARD</small></div></div>'+
    '<div class="gh-btn '+(state.stake===10?'sel':'')+'" data-s="10" data-sl="$10"><div class="gh-ic">$</div><div><b>$10</b><small>MEDIUM</small></div></div>'+
    '<div class="gh-btn '+(state.stake===50?'sel':'')+'" data-s="50" data-sl="$50"><div class="gh-ic">$</div><div><b>$50</b><small>HIGH</small></div></div>'+
    '<div class="gh-btn '+(state.stake===100?'sel':'')+'" data-s="100" data-sl="$100"><div class="gh-ic">$</div><div><b>$100</b><small>PRO</small></div></div>'+
    '</div></div><div class="gh-foot"><button class="gh-back" id="gh-back">'+ICON.arrowL+' Back</button><button class="gh-next" id="gh-next">Next '+ICON.arrowR+'</button></div>';
  } else if(state.step===3){
    body.innerHTML='<div class="gh-step"><p class="gh-title">Execution Count</p><p class="gh-sub">How many trades?</p><div class="gh-grid">'+
    '<div class="gh-btn '+(state.count===1?'sel':'')+'" data-c="1"><div class="gh-ic">1</div><div><b>1 Trade</b><small>SINGLE</small></div></div>'+
    '<div class="gh-btn '+(state.count===2?'sel':'')+'" data-c="2"><div class="gh-ic">2</div><div><b>2 Trades</b><small>DOUBLE</small></div></div>'+
    '<div class="gh-btn '+(state.count===3?'sel':'')+'" data-c="3"><div class="gh-ic">3</div><div><b>3 Trades</b><small>TRIPLE</small></div></div>'+
    '<div class="gh-btn '+(state.count===5?'sel':'')+'" data-c="5"><div class="gh-ic">5</div><div><b>5 Trades</b><small>SESSION</small></div></div>'+
    '<div class="gh-btn '+(state.count===10?'sel':'')+'" data-c="10"><div class="gh-ic">10</div><div><b>10 Trades</b><small>LONG</small></div></div>'+
    '<div class="gh-btn '+(state.count===20?'sel':'')+'" data-c="20"><div class="gh-ic">20</div><div><b>20 Trades</b><small>EXTENDED</small></div></div>'+
    '</div></div><div class="gh-foot"><button class="gh-back" id="gh-back">'+ICON.arrowL+' Back</button><button class="gh-next" id="gh-start">'+ICON.play+' Start Session</button></div>';
  }
  try{
    if(window.__gh_lastStep !== state.step){
      window.__gh_lastStep = state.step;
      if(state.step===1) ghSpeak("Bhai, Step 1, Trade Duration select koro. Kotokhon er trade niba?");
      else if(state.step===2) ghSpeak("Bhai, Step 2, Investment Stake select koro. Koto dollar diye trade niba?");
      else if(state.step===3) ghSpeak("Bhai, Step 3, Execution Count select koro. Koyta trade niba?");
    }
  }catch(e){}
  body.querySelectorAll('[data-d]').forEach(function(el){ el.addEventListener('click',function(){ state.duration=+el.dataset.d; state.durationLabel=el.dataset.l; save(); ghSpeak("Bhai, " + el.dataset.l + " select korcho, bhalo. Ekhon Next chap dao."); render(); }); });
  body.querySelectorAll('[data-s]').forEach(function(el){ el.addEventListener('click',function(){ state.stake=+el.dataset.s; state.stakeLabel=el.dataset.sl; save(); ghSpeak("Bhai, " + el.dataset.sl + " dollar stake select korcho. Ekhon Next chap dao."); render(); }); });
  body.querySelectorAll('[data-c]').forEach(function(el){ el.addEventListener('click',function(){ state.count=+el.dataset.c; save(); ghSpeak("Bhai, " + el.dataset.c + " ta trade select korcho. Ekhon Start Session chap dao."); render(); }); });
  var nx=document.getElementById('gh-next'); if(nx) nx.addEventListener('click',function(){ state.step=Math.min(3,state.step+1); save(); render(); });
  var bk=document.getElementById('gh-back'); if(bk) bk.addEventListener('click',function(){ state.step=Math.max(1,state.step-1); save(); render(); });
  var st=document.getElementById('gh-start'); if(st) st.addEventListener('click',function(){ startSession(); });
}
function startSession(){
  session.active=true; session.left=state.count; save();
  ghSpeak("Bhai, session start hoiche. Ami " + getPair() + " market analysis kortesi. Signal pailei bolbo, tumi sudhu shuno.");
  document.getElementById('gh-body').innerHTML='<div class="gh-step"><p class="gh-title">'+ICON.check+' Session Started</p><p class="gh-sub">'+state.durationLabel+' | '+state.stakeLabel+' | '+state.count+' Trades</p><div class="gh-foot"><button class="gh-back" id="gh-edit">'+ICON.edit+' Edit</button><button class="gh-next" id="gh-stop">'+ICON.stop+' Stop</button></div></div>';
  document.getElementById('gh-edit').addEventListener('click',function(){ state.step=1; render(); });
  document.getElementById('gh-stop').addEventListener('click',function(){ session.active=false; session.left=0; state.step=1; render(); document.getElementById('gh-sig-wrap').style.display='none'; });
  document.getElementById('gh-sig-wrap').style.display='block';

  fetchSignalLyra();
}
function updateMeta(){
  var m=document.getElementById('gh-meta'); if(m) m.textContent='Pair: '+(window.__gh_currentPair||'--')+(window.__gh_isOTC ? ' OTC' : '')+' | Duration: '+state.durationLabel+' | Stake: '+state.stakeLabel+' | Left: '+(session.active?session.left+'/'+state.count:'--');
}
function getPair(){
  try{
    var t=document.body.innerText||"";
    var pairs = ["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD","BTCUSD","ETHUSD"];
    for(var i=0;i<pairs.length;i++){
      var p=pairs[i];
      var pSlash=p.slice(0,3)+"/"+p.slice(3);
      var re1 = new RegExp(pSlash.replace("/","\\/") + "\\s*(\\(OTC\\)|OTC)?", "i");
      var re2 = new RegExp(p + "\\s*(\\(OTC\\)|OTC)?", "i");
      var m = t.match(re1) || t.match(re2);
      if(m){
        var idx = t.indexOf(m[0]);
        var around = t.slice(Math.max(0,idx-10), idx+40);
        var isOTC = /OTC/i.test(around);
        window.__gh_isOTC = isOTC;
        return isOTC ? p + "OTC" : p;
      }
    }
    if(/OTC/i.test(t) && window.__gh_currentPair){
      if(window.__gh_currentPair.indexOf("OTC")<0) return window.__gh_currentPair + "OTC";
      return window.__gh_currentPair;
    }
  }catch(e){}
  return window.__gh_currentPair||'EURUSD';
}
function fetchSignalLyra(){
  if(!session.active) return;
  var pair=getPair();
  window.__gh_currentPair=pair;
  var token=localStorage.getItem('ghost_premium_token')||'';
  var url="https://giogram-backend.onrender.com/api/signal?pair="+pair+"&mode=SAFE&ver=LYRA-V3";
  if(token) url+="&token="+encodeURIComponent(token);
  fetch(url).then(function(r){ return r.json(); }).then(function(j){
    var sigEl=document.getElementById('gh-sig'); if(!sigEl) return;
    // FRONTEND FLICKER LOCK: Backend purano holeo 1 Min e 1 ta signal lock thakbe
    // Video te UP 80% -> DOWN 88% -> UP 85% 1 sec por por paltaitesilo - karon backend proti call e notun random signal dito
    // Ekhon: Prothom signal ta 50 sec lock thakbe, tar moddhe notun direction asle ignore korbe
    var nowMin = new Date().getMinutes();
    var lockedDir = window.__gh_lockedDir;
    var lockedMin = window.__gh_lockedMin;
    var newDir = j.signal||j.direction;
    if(lockedDir && lockedMin === nowMin && newDir !== "WAIT" && lockedDir !== "WAIT" && newDir !== lockedDir){
      // Same minute, different direction - FLICKER, ignore - purano signal e thako
      // Time left update koro, signal paltaio na
      updateMeta();
      return;
    }
    if(!lockedDir || lockedMin !== nowMin){
      window.__gh_lockedDir = newDir;
      window.__gh_lockedMin = nowMin;
      window.__gh_lockedAt = Date.now();
    }
    // New signal_id asle lastSpoken reset koro - nahole notun signal bolbe na
    if(j.signal_id && j.signal_id !== window.__gh_lastSignalId){
      window.__gh_lastSignalId = j.signal_id;
      lastSpoken = "";
    }
    var dir=j.signal||j.direction;
    if(j.status==="OLD_VERSION" || (j.blocked && j.reason && j.reason.indexOf("OLD")>=0)){
      sigEl.className="gh-sig off"; sigEl.innerHTML=ICON.wait+'<span>OLD - NEW LINK NAO</span>';
      ghSpeak("Old bookmarklet expired. Get new link.");
      return;
    }
    // LYRA-style voice: j.voice_text thakle full analysis bolbe - Wick rejection naki opening, confidence, entry
    // BANGLA FRONTEND FIX: Jodi backend purano hoye English voice_text dey, tahole frontend e Bangla banay dao
    var voiceToSpeak = j.voice_text || "";
    if(!voiceToSpeak || voiceToSpeak.indexOf("Ghost here")===0 || voiceToSpeak.indexOf("I see")>=0){
      // English -> Bangla convert
      var dirBn = (dir==="CALL"||dir==="UP") ? "আপ" : "ডাউন";
      var entryBn = (j.entry_type||"opening");
      if(entryBn.indexOf("wick")>=0) entryBn = "উইক রিজেকশন থেকে এন্ট্রি নিবো, ওপেনিং থেকে না। প্রাইস সাপোর্ট থেকে ঘুরে গেছে";
      else if(entryBn.indexOf("liquidity")>=0) entryBn = "লিকুইডিটি গ্র্যাব হইছে, ট্র্যাপ ছিলো, তাই রিভার্সাল থেকে এন্ট্রি নিবো";
      else if(entryBn.indexOf("order")>=0) entryBn = "অর্ডার ব্লক থেকে এন্ট্রি নিবো";
      else if(entryBn.indexOf("gap")>=0) entryBn = "গ্যাপ ফিল হইতেছে, গ্যাপ থেকে এন্ট্রি নিবো";
      else if(entryBn.indexOf("break")>=0) entryBn = "ব্রেক অফ স্ট্রাকচার হইছে, ব্রেকআউট থেকে এন্ট্রি নিবো";
      else entryBn = "ওপেনিং থেকে এন্ট্রি নিবো";
      voiceToSpeak = "ভাই শুনো, " + (j.pair||"Euro Dollar") + " তে একটা ভালো " + dirBn + " এন্ট্রি পাইছি। " + entryBn + "। কনফিডেন্স " + (j.confidence||0) + " পারসেন্ট। এখনই এন্ট্রি নাও।";
    }
    // Analysis box e dekhao
    var anaBox=document.getElementById('gh-analysis'); if(anaBox){ anaBox.style.display='none'; } // SHUDHU BOLBE, LEKHBE NA
    window.__gh_lastVoice = voiceToSpeak;
    window.__gh_lastDirBn = (dir==="CALL"||dir==="UP") ? "UP" : "DOWN";
    window.__gh_lastConf = (j.confidence||0);
    if(dir==="CALL"||dir==="UP"){ sigEl.className="gh-sig up"; sigEl.innerHTML=ICON.up+'<span>UP - '+(j.confidence||0)+'%</span>'; ghSpeak(voiceToSpeak); }
    else if(dir==="PUT"||dir==="DOWN"){ sigEl.className="gh-sig down"; sigEl.innerHTML=ICON.down+'<span>DOWN - '+(j.confidence||0)+'%</span>'; ghSpeak(voiceToSpeak); }
    else{ sigEl.className="gh-sig wait"; sigEl.innerHTML=ICON.wait+'<span>WAIT - '+(j.reason||"Analyzing...")+'</span>'; }
    updateMeta();
  }).catch(function(){});
  if(session.active) setTimeout(fetchSignalLyra, 8000);
}
// --- Orb Tap = Expand / Collapse - FIX: Mobile e click ase na karon Drag preventDefault click ke block kore ---
// Tai Tap Detection: Move na korle Tap dhore Panel khulbe, Move korle Drag dhore Panel khulbe na
var card=document.getElementById('gh-card');
var orb=document.getElementById('gh-orb');
var lastToggleAt=0;
function toggleCard(){
  var now=Date.now();
  if(now - lastToggleAt < 400) return;
  lastToggleAt=now;
  var isHidden = card.style.display==='none' || card.style.display==='';
  card.style.display = isHidden ? 'block' : 'none';
  if(isHidden){
    render();
    // VOICE FIX: Video te tumi Tap for Voice button e tap koro nai, tai kotha bole nai
    // Ekhon Orb e Tap korlei Voice Auto Unlock hobe, ar bolbe Ghost AI ready
    if(!voiceUnlocked){
      try{ ghUnlockVoice(); }catch(e){}
    }
  }
}
// Desktop click only - Mobile e touchend diye handle hobe, click ignore hobe debounce diye
orb.addEventListener('click',function(e){
  // Jodi eita touch theke asa click hoy (touchend er 400ms er moddhe), debounce e block hobe
  toggleCard();
});
// Drag + Tap
var isDrag=false,sx=0,sy=0,il=0,it=0,moved=false;
function getPos(){ var r=box.getBoundingClientRect(); return {left:r.left,top:r.top}; }
function ds(e){ if(e.target.closest('#gh-lyra-close')||e.target.closest('#gh-close-bar')||e.target.closest('#gh-voice-btn')) return; isDrag=true; moved=false; window.__gh_moved=false; var cx=e.touches?e.touches[0].clientX:e.clientX, cy=e.touches?e.touches[0].clientY:e.clientY; sx=cx; sy=cy; var p=getPos(); il=p.left; it=p.top; box.style.left=p.left+"px"; box.style.right="auto"; box.style.bottom="auto"; box.style.transform="none"; }
function dm(e){ if(!isDrag) return; var cx=e.touches?e.touches[0].clientX:e.clientX, cy=e.touches?e.touches[0].clientY:e.clientY; var dx=cx-sx, dy=cy-sy; if(Math.abs(dx)>8 || Math.abs(dy)>8){ moved=true; window.__gh_moved=true; } box.style.left=(il+dx)+"px"; box.style.top=(it+dy)+"px"; if(moved) e.preventDefault(); }
function de(e){
  var wasMoved=moved;
  isDrag=false; moved=false;
  // Mobile Tap: touchend e jodi move na hoy, tahole Toggle koro - karon click event mobile e block hoy
  if(e && e.type==='touchend' && !wasMoved){
    var t=e.target;
    var isOrb = t && (t.closest && t.closest('#gh-orb'));
    if(isOrb){
      // Touchend e toggle - Click er toggle debounce diye block hobe
      toggleCard();
    }
  }
}
var hd=document.getElementById('gh-h');
hd.addEventListener('mousedown',ds); document.addEventListener('mousemove',dm); document.addEventListener('mouseup',de);
hd.addEventListener('touchstart',ds,{passive:true}); document.addEventListener('touchmove',dm,{passive:false}); document.addEventListener('touchend',de,{passive:true});
orb.addEventListener('mousedown',ds); orb.addEventListener('touchstart',ds,{passive:true});
document.getElementById('gh-lyra-close').addEventListener('click',function(){ box.remove(); });
document.getElementById('gh-close-bar').addEventListener('click',function(){ box.remove(); });
// Voice button
setTimeout(function(){
  var vb=document.getElementById('gh-voice-btn');
  if(vb) vb.addEventListener('click',function(){
    if(!voiceUnlocked){ ghUnlockVoice(); return; }
    state.voice=!state.voice; save();
    vb.innerHTML = state.voice ? ICON.voiceOn+'<span>Voice: ON</span>' : ICON.voiceOff+'<span>Voice: OFF</span>';
    if(state.voice) ghSpeak('Voice on.');
    else if('speechSynthesis' in window) window.speechSynthesis.cancel();
  });
},300);
  try{
    var _sl = localStorage.getItem('ghost_voice_lang') || 'bn';
    var _sr = localStorage.getItem('ghost_voice_rate') || '0.95';
    var _sp = localStorage.getItem('ghost_voice_pitch') || '1';
    var _rs = document.getElementById('gh-rate'); if(_rs) _rs.value=_sr;
    var _ps = document.getElementById('gh-pitch'); if(_ps) _ps.value=_sp;
    document.querySelectorAll('[data-vlang]').forEach(function(b){
      if(b.dataset.vlang===_sl) b.style.background='#ff2d55';
      b.addEventListener('click',function(){
        localStorage.setItem('ghost_voice_lang', b.dataset.vlang);
        document.querySelectorAll('[data-vlang]').forEach(function(x){ x.style.background='rgba(255,255,255,.12)'; });
        b.style.background='#ff2d55';
        var _t = b.dataset.vlang==='hi' ? 'Bhai, Hindi voice select ho gaya. Ab main Hindi me bolunga.' : b.dataset.vlang==='en' ? 'English voice selected.' : 'Bhai, Bangla voice select hoiche.';
        var _u = new SpeechSynthesisUtterance(_t);
        _u.lang = b.dataset.vlang==='hi' ? 'hi-IN' : b.dataset.vlang==='en' ? 'en-US' : 'bn-BD';
        _u.rate = parseFloat(localStorage.getItem('ghost_voice_rate')||'0.95'); _u.pitch = parseFloat(localStorage.getItem('ghost_voice_pitch')||'1');
        try{ var _vs = window.speechSynthesis.getVoices(); var _v = _vs.find(function(v){ return v.lang && v.lang.toLowerCase().indexOf(b.dataset.vlang)===0; }); if(_v) _u.voice=_v; }catch(e){}
        window.speechSynthesis.cancel(); window.speechSynthesis.speak(_u);
      });
    });
    if(_rs) _rs.addEventListener('change',function(){ localStorage.setItem('ghost_voice_rate', _rs.value); });
    if(_ps) _ps.addEventListener('change',function(){ localStorage.setItem('ghost_voice_pitch', _ps.value); });
  }catch(e){}
  render();
})();
