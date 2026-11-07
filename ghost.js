(function(){
  // Cleanup old
  let oldHost = document.getElementById('ghost-host');
  if(oldHost) oldHost.remove();
  ['ghost-fab','ghost-bot'].forEach(id=>{ let o=document.getElementById(id); if(o) o.remove(); });

  // Host - Shadow DOM isolation
  let host = document.createElement('div');
  host.id = 'ghost-host';
  host.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483647;';
  document.body.appendChild(host);
  let shadow = host.attachShadow({mode:'open'});

  let style = document.createElement('style');
  style.textContent = `
    *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
    /* ============ ROUND FLOATING BUTTON - Deep Black Premium ============ */
    .fab{position:fixed;top:32%;right:10px;width:52px;height:52px;border-radius:50%;background:linear-gradient(145deg,#0c0c12,#111114 45%,#08080c);background-color:#0a0a0f;border:1px solid rgba(168,85,247,.45);box-shadow:0 0 0 1px rgba(0,240,255,.12),0 0 14px rgba(168,85,247,.28),0 0 28px rgba(0,240,255,.12),0 8px 20px rgba(0,0,0,.65);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;cursor:grab;pointer-events:auto;touch-action:none;z-index:9999;will-change:transform;transition:transform .18s ease}
    .fab:active{cursor:grabbing;transform:scale(.96)}
    .fab::before{content:'';position:absolute;inset:-1px;border-radius:50%;padding:1px;background:linear-gradient(135deg,rgba(168,85,247,.6),rgba(0,240,255,.45),rgba(168,85,247,.15));-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
    .fab::after{content:'';position:absolute;inset:-7px;border-radius:50%;border:1px solid rgba(168,85,247,.22);animation:fabRing 2.4s ease-out infinite;pointer-events:none}
    @keyframes fabRing{0%{transform:scale(.82);opacity:.8}100%{transform:scale(1.2);opacity:0}}
    @keyframes fabGlow{0%{box-shadow:0 0 0 1px rgba(168,85,247,.30),0 0 14px rgba(168,85,247,.35),0 0 28px rgba(59,130,246,.18),0 8px 20px rgba(0,0,0,.65)}25%{box-shadow:0 0 0 1px rgba(59,130,246,.30),0 0 14px rgba(59,130,246,.32),0 0 28px rgba(0,240,255,.18),0 8px 20px rgba(0,0,0,.65)}50%{box-shadow:0 0 0 1px rgba(0,240,255,.32),0 0 16px rgba(0,240,255,.35),0 0 30px rgba(34,197,94,.16),0 8px 20px rgba(0,0,0,.65)}75%{box-shadow:0 0 0 1px rgba(34,197,94,.30),0 0 14px rgba(34,197,94,.30),0 0 28px rgba(168,85,247,.18),0 8px 20px rgba(0,0,0,.65)}100%{box-shadow:0 0 0 1px rgba(168,85,247,.30),0 0 14px rgba(168,85,247,.35),0 0 28px rgba(59,130,246,.18),0 8px 20px rgba(0,0,0,.65)}} @keyframes fabIn{from{opacity:0;transform:scale(.6) rotate(-10deg)}to{opacity:1;transform:scale(1) rotate(0)}} .fab.show{animation:fabGlow 4s ease-in-out infinite,fabIn .35s cubic-bezier(.16,1,.3,1)}
    .fab{animation:fabGlow 2.8s ease-in-out infinite}
    .fab-dot{position:absolute;top:5px;right:5px;width:7px;height:7px;background:#22c55e;border-radius:50%;border:2px solid #0a0a0f;box-shadow:0 0 7px #22c55e;animation:pulse 1.6s infinite;z-index:2}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
    /* 3 Candles - Pure CSS */
    .candles{display:flex;align-items:flex-end;gap:4px;height:30px}
    .candle{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:28px;width:7px;position:relative}
    .candle .wick{width:1.2px;background:currentColor;border-radius:2px;opacity:.95}
    .candle .body{width:7px;border-radius:1.5px;box-shadow:0 0 7px currentColor}
    .candle.green{color:#22c55e}
    .candle.red{color:#f43f5e}
    .candle.green .body{background:linear-gradient(180deg,#4ade80,#16a34a);height:14px;animation:candleG 1.9s ease-in-out infinite}
    .candle.red .body{background:linear-gradient(180deg,#fb7185,#be123c);height:11px;animation:candleR 1.9s ease-in-out infinite .35s}
    .candle .wick.top{height:5px}
    .candle .wick.bottom{height:4px}
    @keyframes candleG{0%,100%{transform:scaleY(1);filter:brightness(1)}50%{transform:scaleY(1.14);filter:brightness(1.3)}}
    @keyframes candleR{0%,100%{transform:scaleY(1);filter:brightness(1)}50%{transform:scaleY(1.12);filter:brightness(1.25)}}
    @keyframes candleMove{0%,100%{transform:translateY(0)}50%{transform:translateY(-1px)}}
    .candles .candle{animation:candleMove 2.4s ease-in-out infinite}
    .candles .candle:nth-child(2){animation-delay:.3s}
    .candles .candle:nth-child(3){animation-delay:.6s}
    /* ============ PREMIUM EXPANDED PANEL - Deep Black Glass ============ */
    .panel{position:fixed;top:26%;right:5px;width:208px;max-width:calc(100vw - 10px);background:linear-gradient(170deg,rgba(8,8,14,.99),rgba(4,4,9,.99));background-color:#05050a;border:1px solid transparent;border-radius:16px;background-clip:padding-box;position:relative;box-shadow:0 0 0 1px rgba(0,240,255,.10),0 0 26px rgba(168,85,247,.22),0 0 52px rgba(0,240,255,.08),0 20px 44px rgba(0,0,0,.62);backdrop-filter:blur(18px);color:#eef2ff;font-family:Inter,'Segoe UI',system-ui,sans-serif;overflow:hidden;pointer-events:auto;display:none;transform-origin:bottom right}
    .panel.open{display:block;animation:panelIn .38s cubic-bezier(.16,1,.3,1),panelGlow 4s ease-in-out infinite}
    @keyframes panelIn{from{opacity:0;transform:translateY(12px) scale(.82) rotateX(4deg)}to{opacity:1;transform:translateY(0) scale(1) rotateX(0)}} @keyframes panelOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.82) translateY(10px)}} .panel.closing{animation:panelOut .28s ease forwards !important}
    @keyframes panelGlow{0%{box-shadow:0 0 0 1px rgba(168,85,247,.35),0 0 18px rgba(168,85,247,.30),0 0 32px rgba(0,140,255,.14),0 16px 32px rgba(0,0,0,.65)}25%{box-shadow:0 0 0 1px rgba(0,140,255,.35),0 0 18px rgba(0,140,255,.28),0 0 32px rgba(0,240,255,.16),0 16px 32px rgba(0,0,0,.65)}50%{box-shadow:0 0 0 1px rgba(0,240,255,.35),0 0 20px rgba(0,240,255,.30),0 0 36px rgba(34,197,94,.14),0 16px 32px rgba(0,0,0,.65)}75%{box-shadow:0 0 0 1px rgba(34,197,94,.35),0 0 18px rgba(34,197,94,.26),0 0 32px rgba(168,85,247,.16),0 16px 32px rgba(0,0,0,.65)}100%{box-shadow:0 0 0 1px rgba(168,85,247,.35),0 0 18px rgba(168,85,247,.30),0 0 32px rgba(0,140,255,.14),0 16px 32px rgba(0,0,0,.65)}}
    @keyframes rgbBorder{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @keyframes rgbFlow{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}
    .panel::before{content:'';position:absolute;inset:-1px;border-radius:17px;padding:1px;background:linear-gradient(120deg,#a855f7,#3b82f6,#22d3ee,#22c55e,#a855f7);background-size:300% 300%;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:rgbBorder 3.5s ease infinite;pointer-events:none;z-index:2}
    @keyframes borderFlow{0%{background-position:0% 0}100%{background-position:200% 0}}
    .panel::after{content:'';position:absolute;top:0;left:0;right:0;height:42px;background:linear-gradient(180deg,rgba(0,240,255,.05),transparent);pointer-events:none}
    .head{padding:7px 8px 6px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.06);cursor:move;touch-action:none;position:relative;z-index:1}
    .head-left{display:flex;align-items:center;gap:8px;min-width:0}
    .logo{width:26px;height:26px;border-radius:9px;background:linear-gradient(135deg,#13131c,#0a0a10);border:1px solid rgba(168,85,247,.35);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 0 10px rgba(168,85,247,.18)}
    .logo .candles{height:17px;gap:2.5px}
    .logo .candle{height:15px;width:4px}
    .logo .candle .body{width:4px}
    .logo .candle.green .body{height:8px}
    .logo .candle.red .body{height:6px}
    .logo .candle .wick.top{height:3px}
    .logo .candle .wick.bottom{height:2px}
    .title b{font-size:9px;letter-spacing:.9px;display:block;color:#fff;line-height:1}
    .title b span{color:#a78bfa}
    .title small{font-size:5.5px;letter-spacing:1.1px;color:#94a3b8;font-weight:700;display:block;margin-top:2px}
    .live{font-size:6px;font-weight:800;letter-spacing:.6px;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.30);color:#4ade80;padding:3px 6px;border-radius:20px;display:flex;align-items:center;gap:4px;flex-shrink:0}
    .live i{width:5px;height:5px;background:#22c55e;border-radius:50%;display:block;box-shadow:0 0 6px #22c55e;animation:pulse 1.4s infinite}
    .actions{display:flex;gap:5px;flex-shrink:0}
    .ibtn{width:22px;height:22px;border-radius:8px;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.04);color:#cbd5e1;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative}
    .ibtn:hover{background:rgba(255,255,255,.09);color:#fff}
    .ibtn .lh{width:10px;height:1.6px;background:currentColor;border-radius:2px;position:absolute}
    .ibtn .x1,.ibtn .x2{width:10px;height:1.6px;background:currentColor;position:absolute;border-radius:2px}
    .ibtn .x1{transform:rotate(45deg)} .ibtn .x2{transform:rotate(-45deg)}
    .ibtn .ref{width:12px;height:12px;border:1.8px solid currentColor;border-radius:50%;border-top-color:transparent;position:relative}
    .ibtn .ref::after{content:'';position:absolute;top:-2px;right:-1px;border-left:4px solid transparent;border-right:1px solid transparent;border-bottom:5px solid currentColor;transform:rotate(40deg)}
    .pairwrap{padding:6px 8px 0;display:flex;align-items:center;justify-content:space-between;position:relative;z-index:1}
    .pair{font-size:10px;font-weight:900;letter-spacing:.5px;color:#fff;line-height:1.2;flex:1;min-width:0}
    .pair small{display:block;font-size:5.5px;letter-spacing:.8px;color:#67e8f9;font-weight:700;margin-top:2px}
    .time{font-size:6.5px;color:#94a3b8;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);padding:4px 7px;border-radius:20px;white-space:nowrap;margin-left:8px}
    /* Candle Viz + Laser + Circular Loading */
    .vizwrap{margin:6px 8px 0;padding:6px 8px 6px;border-radius:12px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.05);position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:10px}
    .viz{position:relative;overflow:hidden;display:flex;align-items:flex-end;justify-content:center;gap:7px;height:38px;flex:1}
    .viz .candle{height:34px;width:9px}
    .viz .candle .body{width:9px;border-radius:2px}
    .viz .candle.green .body{height:16px}
    .viz .candle.red .body{height:13px}
    .viz .candle .wick.top{height:7px}
    .viz .candle .wick.bottom{height:5px}
    .viz .laser{position:absolute;top:0;bottom:0;width:2px;background:linear-gradient(180deg,transparent,#22d3ee,#a855f7,transparent);box-shadow:0 0 10px #22d3ee,0 0 18px rgba(168,85,247,.6);animation:laser 1.15s ease-in-out infinite;z-index:2}
    @keyframes laser{0%{left:0;opacity:0}12%{opacity:1}88%{opacity:1}100%{left:100%;opacity:0}}
    .viz .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:13px 13px;pointer-events:none}
    .viz .scanbeam{position:absolute;top:0;bottom:0;width:36px;background:linear-gradient(90deg,transparent,rgba(34,211,238,.14),transparent);animation:scanbeam 1.15s ease-in-out infinite;pointer-events:none}
    @keyframes scanbeam{0%{left:-18%}100%{left:110%}}
    /* Circular Loading */
    .loader{width:30px;height:30px;position:relative;flex-shrink:0;display:none}
    .loader.on{display:block}
    .loader .ring{position:absolute;inset:0;border-radius:50%;border:2px solid rgba(255,255,255,.08);border-top-color:#a855f7;border-right-color:#22d3ee;animation:spin 0.9s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}}
    .loader .center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:800;color:#e2e8f0}
    .analysis{margin:6px 8px 0;display:none}
    .analysis.on{display:block}
    .analysis-t{font-size:6.5px;letter-spacing:1.1px;color:#a78bfa;font-weight:800;display:flex;justify-content:space-between;margin-bottom:6px}
    .prog{height:3px;background:rgba(255,255,255,.06);border-radius:10px;overflow:hidden}
    .prog-fill{height:100%;width:0%;background:linear-gradient(90deg,#a855f7,#22d3ee);box-shadow:0 0 8px rgba(168,85,247,.5);transition:width .3s ease}
    .status{font-size:7px;color:#94a3b8;text-align:center;margin-top:6px;letter-spacing:.2px}
    .result{margin:6px 8px 0;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.07);background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.008))}
    .result-h{padding:5px 8px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,.05)}
    .result-h span{font-size:6.5px;letter-spacing:1.1px;color:#94a3b8;font-weight:800}
    .result-h b{font-size:6px;padding:3px 6px;border-radius:20px;background:rgba(34,197,94,.12);color:#4ade80;border:1px solid rgba(34,197,94,.22)}
    .sig{padding:7px 8px 6px;display:flex;align-items:center;gap:10px;transition:background .3s}
    .sig.call{background:linear-gradient(135deg,rgba(34,197,94,.10),rgba(34,197,94,.015))}
    .sig.put{background:linear-gradient(135deg,rgba(244,63,94,.11),rgba(244,63,94,.015))}
    .sig.wait{background:rgba(255,255,255,.015)}
    .arrow{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative}
    .arrow .tri{width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent}
    .arrow.up .tri{border-bottom:10px solid #fff;animation:up .8s ease-in-out infinite}
    .arrow.down .tri{border-top:10px solid #fff;animation:down .8s ease-in-out infinite}
    .arrow.wait .dot{width:9px;height:9px;border-radius:50%;background:#94a3b8}
    @keyframes up{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
    @keyframes down{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}
    .sig.call .arrow{background:linear-gradient(135deg,#22c55e,#15803d);box-shadow:0 0 14px rgba(34,197,94,.55),0 0 26px rgba(34,197,94,.28);animation:sigPulseGreen 1.4s ease-in-out infinite}
    
    .sig.wait .arrow{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.10)}
    .sig.call .arrow{background:linear-gradient(135deg,#22c55e,#15803d);box-shadow:0 0 14px rgba(34,197,94,.55),0 0 26px rgba(34,197,94,.28);animation:sigPulseGreen 1.4s ease-in-out infinite}
    .sig.put .arrow{background:linear-gradient(135deg,#f43f5e,#be123c);box-shadow:0 0 14px rgba(244,63,94,.55),0 0 26px rgba(244,63,94,.28);animation:sigPulseRed 1.4s ease-in-out infinite}
    @keyframes sigPulseGreen{0%,100%{box-shadow:0 0 10px rgba(34,197,94,.45),0 0 20px rgba(34,197,94,.22);transform:scale(1)}50%{box-shadow:0 0 18px rgba(34,197,94,.70),0 0 34px rgba(34,197,94,.38);transform:scale(1.06)}}
    @keyframes sigPulseRed{0%,100%{box-shadow:0 0 10px rgba(244,63,94,.45),0 0 20px rgba(244,63,94,.22);transform:scale(1)}50%{box-shadow:0 0 18px rgba(244,63,94,.70),0 0 34px rgba(244,63,94,.38);transform:scale(1.06)}}
    @keyframes up{0%,100%{transform:translateY(0);filter:drop-shadow(0 0 3px rgba(255,255,255,.8))}50%{transform:translateY(-3px);filter:drop-shadow(0 0 6px rgba(255,255,255,1))}}
    @keyframes down{0%,100%{transform:translateY(0);filter:drop-shadow(0 0 3px rgba(255,255,255,.8))}50%{transform:translateY(3px);filter:drop-shadow(0 0 6px rgba(255,255,255,1))}}
    .sig.call .sigtxt b{color:#4ade80;text-shadow:0 0 10px rgba(34,197,94,.55),0 0 18px rgba(34,197,94,.28);animation:textGlowGreen 1.6s ease-in-out infinite}
    .sig.put .sigtxt b{color:#fb7185;text-shadow:0 0 10px rgba(244,63,94,.55),0 0 18px rgba(244,63,94,.28);animation:textGlowRed 1.6s ease-in-out infinite}
    @keyframes textGlowGreen{0%,100%{text-shadow:0 0 8px rgba(34,197,94,.45)}50%{text-shadow:0 0 14px rgba(34,197,94,.75),0 0 22px rgba(34,197,94,.35)}}
    @keyframes textGlowRed{0%,100%{text-shadow:0 0 8px rgba(244,63,94,.45)}50%{text-shadow:0 0 14px rgba(244,63,94,.75),0 0 22px rgba(244,63,94,.35)}}
    .sigtxt small{font-size:6.5px;letter-spacing:1.3px;color:#94a3b8;font-weight:700;display:block}
    .sigtxt b{font-size:15px;font-weight:900;letter-spacing:.5px;line-height:1.1;display:block;margin-top:1px}
    .sig.call .sigtxt b{color:#4ade80}
    .sig.put .sigtxt b{color:#fb7185}
    .sigtxt p{font-size:6px;max-width:118px;color:#94a3b8;margin:3px 0 0;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px}
    .stats{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.05);border-top:1px solid rgba(255,255,255,.05)}
    .stat{background:rgba(9,10,18,.92);padding:5px 8px}
    .stat label{font-size:6px;letter-spacing:.9px;color:#94a3b8;font-weight:700;display:block}
    .stat b{font-size:9px;color:#fff;display:block;margin-top:2px}
    .stat b.green{color:#4ade80} .stat b.red{color:#fb7185} .stat b.cyan{color:#67e8f9}
    .key{margin:6px 8px 0;padding:6px 8px;border-radius:12px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.05)}
    .key-t{font-size:6.5px;letter-spacing:1.1px;color:#a78bfa;font-weight:800;margin-bottom:6px;display:flex;align-items:center;gap:6px}
    .key-t .kd{width:6px;height:6px;background:#a855f7;border-radius:50%;box-shadow:0 0 6px #a855f7;flex-shrink:0}
    .key-item{display:flex;gap:6px;align-items:flex-start;padding:2.5px 0;font-size:6.8px;line-height:1.35;color:#cbd5e1}
    .key-item .tick{width:12px;height:12px;border-radius:50%;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.28);display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .key-item .tick::after{content:'';width:6px;height:3px;border-left:1.6px solid #4ade80;border-bottom:1.6px solid #4ade80;transform:rotate(-45deg) translateY(-1px);display:block}
    .controls{padding:7px 8px 8px;display:flex;flex-direction:column;gap:7px}
    .row{display:flex;gap:7px}
    .btn{flex:1;height:26px;font-size:7px;border-radius:10px;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.04);color:#e2e8f0;font-size:7.5px;font-weight:700;letter-spacing:.2px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:background .15s}
    .btn:hover{background:rgba(255,255,255,.08)}
    .btn.primary{background:linear-gradient(135deg,#7c3aed,#06b6d4);border-color:transparent;color:#fff;box-shadow:0 5px 14px rgba(124,58,237,.26)}
    .btn.copy{background:rgba(168,85,247,.11);border-color:rgba(168,85,247,.28);color:#ddd6fe}
    .meta{padding:0 8px 7px;text-align:center;font-size:6px;color:#64748b;letter-spacing:.3px}
    .meta b{color:#a78bfa}
    @media(max-width:360px){.panel{width:calc(100vw - 10px);right:5px;top:22%;max-height:calc(100vh - 40px);overflow-y:auto}.fab{top:30%;right:8px}} @media(max-height:600px){.panel{top:12%}}
  `;
  shadow.appendChild(style);

  // FAB - Deep Black
  let fab = document.createElement('div');
  fab.className = 'fab show';
  fab.innerHTML = `<div class="fab-dot"></div><div class="candles"><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle red"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div></div>`;
  shadow.appendChild(fab);

  // Panel
  let panel = document.createElement('div');
  panel.className = 'panel';
  panel.innerHTML = `
    <div class="head">
      <div class="head-left">
        <div class="logo"><div class="candles"><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle red"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div></div></div>
        <div class="title"><b>GHOST <span>AI</span></b><small>SIGNAL ANALYZER PRO</small></div>
        <div class="live"><i></i> LIVE</div>
      </div>
      <div class="actions">
        <button class="ibtn" data-act="refresh"><span class="ref"></span></button>
        <button class="ibtn" data-act="min"><span class="lh"></span></button>
        <button class="ibtn" data-act="close"><span class="x1"></span><span class="x2"></span></button>
      </div>
    </div>
    <div class="pairwrap"><div class="pair" id="p-pair">GBP/USD<small>GHOST QUANTUM X • AI SCAN</small></div><div class="time">1M • <span id="p-sec">--s</span></div></div>
    <div class="vizwrap">
      <div class="viz"><div class="grid"></div><div class="scanbeam"></div><div class="laser"></div><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle red"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div><div class="candle green"><div class="wick top"></div><div class="body"></div><div class="wick bottom"></div></div></div>
      <div class="loader" id="p-loader"><div class="ring"></div><div class="center" id="p-loader-txt">0%</div></div>
    </div>
    <div class="analysis" id="p-analysis"><div class="analysis-t"><span>ANALYZING CHART</span><span id="p-pct">0%</span></div><div class="prog"><div class="prog-fill" id="p-prog"></div></div><div class="status" id="p-status">Scanning chart...</div></div>
    <div class="result">
      <div class="result-h"><span>ANALYSIS RESULT</span><b id="p-status2">READY</b></div>
      <div class="sig wait" id="p-sig"><div class="arrow wait" id="p-arrow"><span class="dot"></span></div><div class="sigtxt"><small>SIGNAL</small><b id="p-txt">WAIT</b><p id="p-reason">Quantum X Analyzing...</p></div></div>
      <div class="stats">
        <div class="stat"><label>CONFIDENCE</label><b class="green" id="p-conf">--%</b></div>
        <div class="stat"><label>TIMEFRAME</label><b>1M</b></div>
        <div class="stat"><label>SUGGESTED EXPIRY</label><b class="cyan">1-2 MIN</b></div>
        <div class="stat"><label>TREND</label><b id="p-trend">--</b></div>
        <div class="stat"><label>MARKET CONDITION</label><b id="p-cond">--</b></div>
        <div class="stat"><label>SIGNAL STRENGTH</label><b id="p-strength">--</b></div>
      </div>
    </div>
    <div class="key"><div class="key-t"><span class="kd"></span> KEY ANALYSIS</div><div id="p-key"></div></div>
    <div class="controls">
      <div class="row"><button class="btn primary" data-act="again">Analyze Again</button><button class="btn copy" data-act="copy">Copy Signal</button></div>
      <div class="row"><button class="btn" data-act="min">Minimize</button><button class="btn" data-act="close">Close</button></div>
    </div>
    <div class="meta"><b>GHOST AI</b> • Real Backend • 1% Risk</div>
  `;
  shadow.appendChild(panel);

  let currentPair = 'GBP/USD';
  let currentSignal = null;
  let currentResult = null;
  let isAnalyzing = false;
  const API = 'https://giogram-backend.onrender.com/api/signal';

  function expand(){ fab.style.display='none'; panel.classList.remove('closing'); panel.classList.add('open'); }
  function minimize(){ panel.classList.add('closing'); setTimeout(()=>{ panel.classList.remove('open','closing'); fab.style.display='flex'; fab.classList.remove('show'); void fab.offsetWidth; fab.classList.add('show'); }, 260); }
  function closeAll(){ host.remove(); }

  // FAB Drag - Pointer Events, tap vs drag
  let fabDragging=false, fabStartX=0, fabStartY=0, fabOrigLeft=0, fabOrigTop=0, fabMoved=false;
  fab.style.touchAction='none';
  fab.addEventListener('pointerdown', (e)=>{
    fabDragging=true; fabMoved=false;
    fabStartX=e.clientX; fabStartY=e.clientY;
    let r = fab.getBoundingClientRect();
    fabOrigLeft=r.left; fabOrigTop=r.top;
    fab.style.right='auto'; fab.style.bottom='auto';
    fab.style.left=fabOrigLeft+'px'; fab.style.top=fabOrigTop+'px';
    try{ fab.setPointerCapture(e.pointerId); }catch(err){}
  });
  fab.addEventListener('pointermove', (e)=>{
    if(!fabDragging) return;
    let dx=e.clientX-fabStartX, dy=e.clientY-fabStartY;
    if(Math.abs(dx)>5 || Math.abs(dy)>5) fabMoved=true;
    if(!fabMoved) return;
    let nx=fabOrigLeft+dx, ny=fabOrigTop+dy;
    nx=Math.max(6, Math.min(window.innerWidth-60, nx));
    ny=Math.max(6, Math.min(window.innerHeight-60, ny));
    fab.style.left=nx+'px'; fab.style.top=ny+'px';
  });
  fab.addEventListener('pointerup', (e)=>{
    if(!fabDragging) return;
    fabDragging=false;
    try{ fab.releasePointerCapture(e.pointerId); }catch(err){}
    if(!fabMoved){ expand(); }
    else { try{ localStorage.setItem('ghost_fab_pos', JSON.stringify({left:fab.style.left, top:fab.style.top})); }catch(err){} }
  });
  fab.addEventListener('pointercancel', ()=>{ fabDragging=false; });
  try{
    let saved = localStorage.getItem('ghost_fab_pos');
    if(saved){
      let p = JSON.parse(saved);
      if(p.left && p.top){
        let l=parseInt(p.left), t=parseInt(p.top);
        if(l>=0 && l<window.innerWidth-50 && t>=0 && t<window.innerHeight-50){
          fab.style.left=p.left; fab.style.top=p.top; fab.style.right='auto'; fab.style.bottom='auto';
        }
      }
    }
  }catch(err){}

  // Panel drag via header
  let panelDragging=false, panelSX=0, panelSY=0, panelIL=0, panelIT=0;
  let headEl = panel.querySelector('.head');
  if(headEl){
    headEl.style.touchAction='none';
    headEl.addEventListener('pointerdown', (e)=>{
      if(e.target.closest('[data-act]')) return;
      panelDragging=true;
      panelSX=e.clientX; panelSY=e.clientY;
      let r = panel.getBoundingClientRect();
      panelIL=r.left; panelIT=r.top;
      panel.style.left=panelIL+'px'; panel.style.right='auto'; panel.style.bottom='auto'; panel.style.top=panelIT+'px';
      try{ headEl.setPointerCapture(e.pointerId); }catch(err){}
    });
    headEl.addEventListener('pointermove', (e)=>{
      if(!panelDragging) return;
      let nx=panelIL+e.clientX-panelSX, ny=panelIT+e.clientY-panelSY;
      nx=Math.max(4, Math.min(window.innerWidth-180, nx));
      ny=Math.max(4, Math.min(window.innerHeight-120, ny));
      panel.style.left=nx+'px'; panel.style.top=ny+'px';
    });
    headEl.addEventListener('pointerup', (e)=>{ panelDragging=false; try{ headEl.releasePointerCapture(e.pointerId); }catch(err){} });
    headEl.addEventListener('pointercancel', ()=>{ panelDragging=false; });
  }

  panel.addEventListener('click', e=>{
    let btn = e.target.closest('[data-act]');
    if(!btn) return;
    let act = btn.getAttribute('data-act');
    if(act==='min') minimize();
    if(act==='close') closeAll();
    if(act==='refresh' || act==='again'){ startAnalysis(true); }
    if(act==='copy'){
      try{
        let txt = currentResult ? `GHOST AI Signal: ${currentResult.signal} ${currentResult.pair} | Conf: ${currentResult.confidence}% | TF: 1M | Expiry: 1-2 MIN` : `GHOST AI: ${currentPair} - Analyzing...`;
        navigator.clipboard.writeText(txt).then(()=>{ btn.textContent='Copied!'; setTimeout(()=>btn.textContent='Copy Signal',1200); });
      }catch(err){}
    }
  });

  const STEPS = ["Scanning chart","Detecting candlestick structure","Checking trend","Checking support / resistance","Checking momentum","Calculating confidence","Preparing result"];
  function startAnalysis(fetchAfter){
    if(isAnalyzing) return;
    isAnalyzing=true;
    let an = shadow.getElementById('p-analysis');
    let prog = shadow.getElementById('p-prog');
    let pct = shadow.getElementById('p-pct');
    let st = shadow.getElementById('p-status');
    let loader = shadow.getElementById('p-loader');
    let loaderTxt = shadow.getElementById('p-loader-txt');
    an.classList.add('on');
    if(loader) loader.classList.add('on');
    let idx=0;
    let timer=setInterval(()=>{
      if(idx < STEPS.length){
        if(st) st.textContent = STEPS[idx]+'...';
        let p=Math.round(((idx+1)/STEPS.length)*100);
        if(prog) prog.style.width=p+'%';
        if(pct) pct.textContent=p+'%';
        if(loaderTxt) loaderTxt.textContent=p+'%';
        idx++;
      } else {
        clearInterval(timer);
        if(st) st.textContent='Analysis complete';
        if(loaderTxt) loaderTxt.textContent='100%';
        setTimeout(()=>{ an.classList.remove('on'); if(loader) loader.classList.remove('on'); isAnalyzing=false; }, 400);
        if(fetchAfter) fetchSignal();
      }
    }, 150);
  }

  function getMarket(){
    try{
      let els = document.querySelectorAll('[class*="asset"], [class*="pair"], [class*="symbol"]');
      for(let el of els){
        let t=(el.innerText||'').trim();
        if(/^[A-Z]{3}\/[A-Z]{3}/.test(t)){
          let m=t.match(/([A-Z]{3}\/[A-Z]{3})/);
          if(m) return m[1].replace('/','');
        }
      }
    }catch(e){}
    return currentPair.replace('/','');
  }

  function updateUI(j){
    let pairEl = shadow.getElementById('p-pair');
    if(pairEl){
      let mTxt = (j.market||currentPair).replace(/([A-Z]{3})([A-Z]{3})/,'$1/$2');
      pairEl.innerHTML = mTxt + '<small>GHOST QUANTUM X • AI SCAN</small>';
    }
    let sigEl = shadow.getElementById('p-sig');
    let txtEl = shadow.getElementById('p-txt');
    let reasonEl = shadow.getElementById('p-reason');
    let arrowEl = shadow.getElementById('p-arrow');
    let confEl = shadow.getElementById('p-conf');
    let trendEl = shadow.getElementById('p-trend');
    let condEl = shadow.getElementById('p-cond');
    let strengthEl = shadow.getElementById('p-strength');
    let statusEl = shadow.getElementById('p-status2');
    let keyList = shadow.getElementById('p-key');
    let dir = j.signal || j.direction;
    // Never fabricate - use only real backend data
    currentResult = { signal: dir, pair: j.pair||currentPair, confidence: j.confidence||0, trend: j.price_action_type||'--', reason: j.reason||'' };
    if(sigEl && txtEl){
      let conf = j.confidence||0;
      let trendTxt='--', condTxt='--', strengthTxt='--';
      if(j.filter && j.filter.trend && j.filter.trend!=='NA' && j.filter.trend!=='N/A') trendTxt=j.filter.trend;
      else if(j.price_action_type && j.price_action_type!=='NA' && j.price_action_type!=='N/A') trendTxt = j.price_action_type.includes('Bull') ? 'BULLISH' : j.price_action_type.includes('Bear') ? 'BEARISH' : j.price_action_type;
      else if(dir==='CALL') trendTxt='BULLISH'; else if(dir==='PUT') trendTxt='BEARISH';
      if(j.is_trap) condTxt='TRAP / REVERSAL';
      else if(j.price_action_type && j.price_action_type!=='NA' && j.price_action_type!=='N/A') condTxt=j.price_action_type;
      else condTxt='RANGING';
      if(conf>=85) strengthTxt='VERY HIGH'; else if(conf>=75) strengthTxt='HIGH'; else if(conf>=65) strengthTxt='MEDIUM'; else if(conf>=50) strengthTxt='LOW'; else strengthTxt='WAITING';
      if(dir==="CALL"||dir==="UP"){
        sigEl.className="sig call"; txtEl.textContent="CALL \u2191";
        if(arrowEl){ arrowEl.className="arrow up"; arrowEl.innerHTML='<span class="tri"></span>'; }
        if(statusEl) statusEl.textContent='CALL • ACTIVE';
        if(reasonEl) reasonEl.textContent=j.reason||j.price_action_type||"";
        if(trendEl){ trendEl.textContent='BULLISH'; trendEl.className='green'; }
      } else if(dir==="PUT"||dir==="DOWN"){
        sigEl.className="sig put"; txtEl.textContent="PUT \u2193";
        if(arrowEl){ arrowEl.className="arrow down"; arrowEl.innerHTML='<span class="tri"></span>'; }
        if(statusEl) statusEl.textContent='PUT • ACTIVE';
        if(reasonEl) reasonEl.textContent=j.reason||j.price_action_type||"";
        if(trendEl){ trendEl.textContent='BEARISH'; trendEl.className='red'; }
      } else {
        sigEl.className="sig wait"; txtEl.textContent="WAIT";
        if(arrowEl){ arrowEl.className="arrow wait"; arrowEl.innerHTML='<span class="dot"></span>'; }
        if(reasonEl) reasonEl.textContent=j.reason||"Analyzing...";
        if(statusEl) statusEl.textContent='WAITING';
        if(trendEl) trendEl.textContent='--';
      }
      if(confEl) confEl.textContent=conf+'%';
      if(condEl) condEl.textContent=condTxt;
      if(strengthEl) strengthEl.textContent=strengthTxt;
      if(keyList){
        let items=[];
        let combined = ((j.reason||'') + ' ' + (j.strategies||[]).join(' ')).toLowerCase();
        if(combined.includes('momentum') || dir==='CALL') items.push('Bullish momentum detected');
        if(combined.includes('bear') || dir==='PUT') items.push('Bearish momentum detected');
        if(combined.includes('bos') || combined.includes('structure') || combined.includes('break')) items.push('Price structure confirmation');
        if(combined.includes('support') || combined.includes('resistance') || combined.includes('order block') || combined.includes('fvg') || combined.includes('liquidity')) items.push('Support / Resistance condition');
        if(combined.includes('candle') || combined.includes('wick') || combined.includes('rejection') || combined.includes('engulf')) items.push('Candle confirmation');
        if(items.length===0){ if(conf>=65) items.push('Structure + momentum aligned ('+conf+'%)'); else items.push('Collecting more candle data...'); }
        let seen={}; items=items.filter(t=>{ if(seen[t]) return false; seen[t]=true; return true; });
        keyList.innerHTML = items.map(t=>`<div class="key-item"><div class="tick"></div><div>${t}</div></div>`).join('');
      }
    }
  }

  async function fetchSignal(){
    try{
      currentPair = getMarket();
      let url = API + '?pair=' + encodeURIComponent(currentPair) + '&t=' + Date.now();
      let res = await fetch(url);
      let j = await res.json();
      if(j && j.signal){
        currentSignal = j;
        updateUI(j);
        let secEl = shadow.getElementById('p-sec');
        if(secEl && j.expiry_timestamp){
          let rem = Math.max(0, Math.ceil((j.expiry_timestamp - Date.now())/1000));
          secEl.textContent = rem + 's';
        }
      }
    }catch(e){ console.log('GHOST fetch error', e); }
  }

  setInterval(()=>{
    let secEl = shadow.getElementById('p-sec');
    if(secEl){
      if(currentSignal && currentSignal.expiry_timestamp){
        let rem = Math.max(0, Math.ceil((currentSignal.expiry_timestamp - Date.now())/1000));
        secEl.textContent = rem + 's';
        if(rem<=0) currentSignal=null;
      } else {
        let sec=60-new Date().getSeconds(); if(sec===60) sec=0; secEl.textContent=sec+'s';
      }
    }
  }, 500);

  setInterval(fetchSignal, 3000);
  fetchSignal();
  console.log('GHOST AI PREMIUM 2026 - Shadow DOM loaded - FAB visible');
})();
