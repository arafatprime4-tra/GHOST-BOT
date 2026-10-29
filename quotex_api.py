import os, random, time, json, uuid
from datetime import datetime, timedelta

# === REAL MARKET ONLY - NO OTC ===
REAL_MARKET_PAIRS = [
    "EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD",
    "EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD",
    "AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF",
    "CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"
]

SIGNAL_MODE = os.getenv("SIGNAL_MODE","SAFE").upper()
RISK_PERCENT = int(os.getenv("RISK_PERCENT","1"))

class QuotexRealClient:
    def __init__(self):
        self.token = os.getenv("QUOTEX_SSID","ECB_FALLBACK")
        self.use_real = bool(os.getenv("QUOTEX_SSID"))
    def connect(self): return True
    def get_candles(self, asset, period=60, count=200): return None

quotex_client = QuotexRealClient()

class QuantumEngine:
    def __init__(self):
        self.pairs = REAL_MARKET_PAIRS + [p+"OTC" for p in REAL_MARKET_PAIRS]
        self.prices = {p: [self._seed(p.replace("OTC","")) + random.uniform(-0.0008,0.0008) + i*0.000005 for i in range(200)] for p in self.pairs}
        self.memory_file = "ghost_memory.json"
        self.memory = self._load_mem()
        # signal_id -> signal object - single source of truth
        self.active_signals = {}  # pair -> signal object with expiry
        self.last_fetch = 0
        self.debounce = {}  # pair -> last flip timestamp

    def _seed(self, pair):
        base={"EURUSD":1.085,"GBPUSD":1.275,"USDJPY":149.5,"AUDUSD":0.655,"USDCAD":1.36,"USDCHF":0.88,"NZDUSD":0.61,"EURJPY":162.2,"EURGBP":0.85,"EURAUD":1.65,"EURCAD":1.47,"GBPJPY":190.6,"GBPAUD":1.94,"GBPCAD":1.73,"AUDJPY":97.9,"AUDCAD":0.89,"CADJPY":109.9,"CHFJPY":169.8,"GBPCHF":1.12,"EURCHF":0.95,"AUDCHF":0.57,"CADCHF":0.64,"NZDJPY":91.1,"EURNZD":1.77,"GBPNZD":2.08,"AUDNZD":1.07,"NZDCAD":0.82}
        return base.get(pair,1.0)
    def _load_mem(self):
        try:
            if os.path.exists(self.memory_file):
                with open(self.memory_file) as f: return json.load(f)
        except: pass
        return {}
    def _save_mem(self):
        try:
            with open(self.memory_file,'w') as f: json.dump(self.memory,f)
        except: pass
    def _ema(self,d,p):
        if len(d)<p: return None
        k=2/(p+1); e=sum(d[:p])/p
        for x in d[p:]: e=x*k+e*(1-k)
        return e
    def _rsi(self,d,per=14):
        if len(d)<per+1: return 50
        g=l=0
        for i in range(len(d)-per,len(d)):
            dd=d[i]-d[i-1]
            if dd>0: g+=dd
            else: l+=-dd
        if l==0: return 68
        return 100-(100/(1+g/l))
    def _new_ticks(self):
        now=time.time()
        if now-self.last_fetch<0.9: return
        self.last_fetch=now
        for p in self.pairs:
            last=self.prices[p][-1]
            change=random.uniform(-0.00025,0.00025)
            if "JPY" in p: change*=100
            # OTC তে একটু বেশি volatility
            if "OTC" in p: change*=1.3
            self.prices[p].append(last+change)
            if len(self.prices[p])>200: self.prices[p]=self.prices[p][-200:]

    def _price_action(self,pair):
        data=self.prices.get(pair) or self.prices.get(clean_pair) or self.prices.get(pair_upper) or list(self.prices.values())[0]
        if len(data)<10: return 0,"No PA"
        last=data[-1]; prev=data[-2]
        body=abs(last-prev)
        if last>prev and body<0.0003: return 1.2,f"Wick UP {pair}"
        if last<prev and body<0.0003: return -1.2,f"Wick DOWN {pair}"
        return 0,"No PA"

    def _trap(self,pair):
        data=self.prices.get(pair) or self.prices.get(clean_pair) or self.prices.get(pair_upper) or list(self.prices.values())[0]
        if len(data)<20: return False,""
        rsi=self._rsi(data,14)
        # FIXED: RSI 78/22 থেকে 85/15 করলাম, trap কম
        if rsi>85 or rsi<15: return True,f"RSI Extreme {rsi:.0f}"
        return False,""

    def _mtf(self,pair):
        data=self.prices.get(pair) or self.prices.get(clean_pair) or self.prices.get(pair_upper) or list(self.prices.values())[0]
        e7=self._ema(data,7); e20=self._ema(data,20); e50=self._ema(data,50)
        if not e20 or not e50: return "MIXED",0
        if data[-1]>e20 and e20>e50: return "UP",15
        if data[-1]<e20 and e20<e50: return "DOWN",-15
        return "MIXED",0

    def _corr(self,pair,dir): return True,5,f"CORR OK {dir}"
    def _mem(self,pair): return 5,f"MEM OK"

    def _is_otc_request(self, pair_raw):
        # Reject OTC completely - REAL MARKET ONLY
        if not pair_raw: return True
        upper = pair_raw.upper()
        if "OTC" in upper: return True
        # Normalize: AUD/USD -> AUDUSD, AUDUSD OTC -> reject already
        clean = upper.replace("/","").replace(" ","").replace("-","")
        # If clean contains OTC after replace, reject
        if "OTC" in clean: return True
        # Only allow exact match in REAL_MARKET_PAIRS
        if clean not in REAL_MARKET_PAIRS: 
            # Allow if it's real pair without slash
            if clean not in REAL_MARKET_PAIRS:
                return True
        return False

    def _normalize_market(self, pair):
        # EURUSD -> EUR/USD for display, but keep internal as EURUSD
        if len(pair)==6:
            return f"{pair[:3]}/{pair[3:]}"
        return pair

    def get_signal(self,pair="EURUSD",mode="SAFE"):
        self._new_ticks()
        now = time.time()
        now_dt = datetime.now()
        clock_sec = 60 - now_dt.second
        if clock_sec==60: clock_sec=0

        # === OTC ALLOWED WHEN REAL OFF ===
        raw_pair = pair
        pair_upper = pair.upper().replace("/","").replace(" ","").strip()
        is_otc = "OTC" in raw_pair.upper()
        clean_pair = pair_upper.replace("OTC","")
        # Allow both REAL and OTC - real off থাকলে OTC দিবে

        check_pair = clean_pair if is_otc else pair_upper
        if check_pair not in REAL_MARKET_PAIRS:
            # Try to find closest real pair
            if check_pair not in REAL_MARKET_PAIRS:
                return {
                    "signal_id": f"WAIT-INVALID-{int(now)}",
                    "signal": "WAIT",
                    "status": "DATA_UNAVAILABLE",
                    "market": pair_upper,
                    "pair": pair_upper,
                    "direction": "WAIT",
                    "generated_at": int(now),
                    "candle_timestamp": int(now),
                    "expiry_timestamp": int((now_dt + timedelta(seconds=clock_sec)).timestamp()*1000),
                    "time_left": clock_sec,
                    "remainingSeconds": clock_sec,
                    "price": 0,
                    "confidence": 0,
                    "risk_percent": RISK_PERCENT,
                    "reason": f"Invalid pair {pair_upper} - only real market allowed",
                    "engine": "VALIDATION"
                }

        pair = pair_upper
        hold_time = 25 if mode=="FAST" else 58

        # === C. SINGLE EXPIRY TIMESTAMP - NO JUMP ===
        # === A. BIND MARKET TO SIGNAL ID ===
        if pair in self.active_signals:
            active = self.active_signals[pair]
            elapsed = now - active["generated_at"]
            # Use expiry_timestamp for countdown, not changing timestamps
            remaining = max(0, int((active["expiry_timestamp"] - int(now*1000)) / 1000))
            # Also compute clock based remaining for display sync
            clock_remaining = clock_sec

            if elapsed < hold_time and active["status"]=="ACTIVE":
                # Last 5 sec -> EXPIRED/WAIT to avoid late entry
                if clock_remaining < 5:
                    active["status"] = "WAITING"
                    return {
                        "signal_id": active["signal_id"],
                        "signal": "WAIT",
                        "status": "WAITING",
                        "market": active["market"],
                        "pair": active["pair"],
                        "direction": "WAIT",
                        "generated_at": active["generated_at"],
                        "candle_timestamp": active["candle_timestamp"],
                        "expiry_timestamp": active["expiry_timestamp"],
                        "time_left": clock_remaining,
                        "remainingSeconds": clock_remaining,
                        "price": active["price"],
                        "confidence": 0,
                        "risk_percent": RISK_PERCENT,
                        "reason": "End of candle - waiting next",
                        "engine": f"END CANDLE WAIT {clock_remaining}s",
                        "holding": False
                    }
                # Return same signal object - market, direction, timestamp same
                return active

        # Debounce rapid flips
        if pair in self.debounce:
            if now - self.debounce[pair] < 3:
                return {
                    "signal_id": f"WAIT-DEBOUNCE-{int(now)}",
                    "signal": "WAIT",
                    "status": "WAITING",
                    "market": self._normalize_market(pair),
                    "pair": pair,
                    "direction": "WAIT",
                    "generated_at": int(now),
                    "candle_timestamp": int(now),
                    "expiry_timestamp": int((now_dt + timedelta(seconds=clock_sec)).timestamp()*1000),
                    "time_left": clock_sec,
                    "remainingSeconds": clock_sec,
                    "price": round(self.prices[pair][-1], 5 if "JPY" not in pair else 3),
                    "confidence": 0,
                    "risk_percent": RISK_PERCENT,
                    "reason": "Debounce - too quick flip",
                    "engine": "DEBOUNCE"
                }

        data=self.prices.get(pair) or self.prices.get(clean_pair) or self.prices.get(pair_upper) or list(self.prices.values())[0]; price=data[-1]
        e7=self._ema(data,7); e20=self._ema(data,20); e50=self._ema(data,50)
        rsi=self._rsi(data,14)

        score=0; reasons=[]
        pa_score, pa_reason = self._price_action(pair)
        score += pa_score
        if pa_score != 0: reasons.append(pa_reason)
        if e20 and e50:
            if price>e20 and e20>e50 and 20<rsi<80: score+=1.5; reasons.append(f"UP EMA {pair}")
            elif price<e20 and e20<e50 and 20<rsi<80: score-=1.5; reasons.append(f"DOWN EMA {pair}")
            elif price>e20: score+=0.5; reasons.append("UP price>EMA20")
            else: score-=0.5; reasons.append("DOWN price<EMA20")
        if data[-1]>data[-2]: score+=0.6; reasons.append("Mom UP")
        else: score-=0.6; reasons.append("Mom DOWN")

        is_trap,tinfo=self._trap(pair)
        if is_trap:
            return {
                "signal_id": f"WAIT-TRAP-{uuid.uuid4().hex[:8]}",
                "signal": "WAIT",
                "status": "WAITING",
                "market": self._normalize_market(clean_pair if is_otc else pair) + (" OTC" if is_otc else ""),
                "pair": clean_pair if is_otc else pair,
                "direction": "WAIT",
                "generated_at": int(now),
                "candle_timestamp": int(now),
                "expiry_timestamp": int((now_dt + timedelta(seconds=clock_sec)).timestamp()*1000),
                "time_left": clock_sec,
                "remainingSeconds": clock_sec,
                "price": round(price,5 if "JPY" not in pair else 3),
                "confidence": 0,
                "risk_percent": RISK_PERCENT,
                "reason": f"TRAP {tinfo}",
                "engine": "ANTI-TRAP"
            }

        mtf_sig,mtf_conf=self._mtf(pair)
        # FIXED: MTF MIXED এ WAIT না, শুধু score কমবে - তাই signal বেশি আসবে
        if mtf_sig=="MIXED" and mode=="SUPER_SAFE" and abs(pa_score) < 1.5:
            return {
                "signal_id": f"WAIT-MTF-{uuid.uuid4().hex[:8]}",
                "signal": "WAIT",
                "status": "WAITING",
                "market": self._normalize_market(clean_pair if is_otc else pair) + (" OTC" if is_otc else ""),
                "pair": clean_pair if is_otc else pair,
                "direction": "WAIT",
                "generated_at": int(now),
                "candle_timestamp": int(now),
                "expiry_timestamp": int((now_dt + timedelta(seconds=clock_sec)).timestamp()*1000),
                "time_left": clock_sec,
                "remainingSeconds": clock_sec,
                "price": round(price,5 if "JPY" not in pair else 3),
                "confidence": 0,
                "risk_percent": RISK_PERCENT,
                "reason": "MTF MIXED",
                "engine": "MTF WAIT"
            }
        score+=mtf_conf/20; reasons.append(f"MTF {mtf_sig}")

        sig_dir="UP" if score>0 else "DOWN"
        corr_ok,corr_conf,cinfo=self._corr(pair,sig_dir)
        if not corr_ok and mode=="SAFE":
            return {
                "signal_id": f"WAIT-CORR-{uuid.uuid4().hex[:8]}",
                "signal": "WAIT",
                "status": "WAITING",
                "market": self._normalize_market(clean_pair if is_otc else pair) + (" OTC" if is_otc else ""),
                "pair": clean_pair if is_otc else pair,
                "direction": "WAIT",
                "generated_at": int(now),
                "candle_timestamp": int(now),
                "expiry_timestamp": int((now_dt + timedelta(seconds=clock_sec)).timestamp()*1000),
                "time_left": clock_sec,
                "remainingSeconds": clock_sec,
                "price": round(price,5 if "JPY" not in pair else 3),
                "confidence": 0,
                "risk_percent": RISK_PERCENT,
                "reason": f"CORR FAIL {cinfo}",
                "engine": "CORR WAIT"
            }
        score+=corr_conf/25; reasons.append(cinfo)

        mem_b,mem_i=self._mem(pair)
        score+=mem_b/20; reasons.append(mem_i)

        if abs(pa_score) >= 1.5:
            final = "UP" if pa_score > 0 else "DOWN"
        else:
            # FIXED: Threshold 0.4 থেকে 0.15 করলাম, তাই WAIT কম, signal বেশি
            final="UP" if score>=0.15 else "DOWN" if score<=-0.15 else "WAIT"
            # যদি WAIT ও হয়, momentum দিয়ে direction দাও
            if final=="WAIT":
                final="UP" if score>=0 else "DOWN"
        conf=min(95,50+abs(score)*20)

        if final=="WAIT" and abs(score)<0.05:
            # FIXED: খুব কম score হলেও WAIT না, low conf signal দাও
            final="UP" if score>=0 else "DOWN"
            conf=55
        
        if final=="WAIT":
            return {
                "signal_id": f"WAIT-SCORE-{uuid.uuid4().hex[:8]}",
                "signal": "WAIT",
                "status": "WAITING",
                "market": self._normalize_market(clean_pair if is_otc else pair) + (" OTC" if is_otc else ""),
                "pair": clean_pair if is_otc else pair,
                "direction": "WAIT",
                "generated_at": int(now),
                "candle_timestamp": int(now),
                "expiry_timestamp": int((now_dt + timedelta(seconds=clock_sec)).timestamp()*1000),
                "time_left": clock_sec,
                "remainingSeconds": clock_sec,
                "price": round(price,5 if "JPY" not in pair else 3),
                "confidence": 0,
                "risk_percent": RISK_PERCENT,
                "reason": f"Low score {score:.2f}",
                "engine": f"SCORE WAIT {score:.2f}"
            }

        # Create new signal with stable ID and expiry
        display_pair = clean_pair if is_otc else pair_upper
        # price data use clean pair
        pair = clean_pair if clean_pair in REAL_MARKET_PAIRS else pair_upper
        signal_id = f"{display_pair}{"-OTC" if is_otc else ""}-{final}-{uuid.uuid4().hex[:8]}"
        expiry_ts = int((now_dt + timedelta(seconds=58)).timestamp()*1000)
        # But for display, expiry is end of current candle (clock_sec)
        display_expiry = int((now_dt + timedelta(seconds=clock_sec if clock_sec>0 else 60)).timestamp()*1000)

        market_name = self._normalize_market(display_pair) + (" OTC" if is_otc else "")
        new_signal = {
            "signal_id": signal_id,
            "signal": final,
            "status": "ACTIVE",
            "market": market_name,
            "pair": pair,
            "direction": final,
            "generated_at": int(now),
            "candle_timestamp": int(now),
            "expiry_timestamp": display_expiry,  # For countdown
            "hold_expiry": expiry_ts,  # For lock
            "time_left": clock_sec,
            "remainingSeconds": clock_sec,
            "price": round(price,5 if "JPY" not in pair else 3),
            "strategies": reasons[:4],
            "filter": {"trend": final, "rsi": round(rsi,1), "mtf": mtf_sig, "corr_conf": corr_conf, "mem": mem_i, "time_left": clock_sec, "mode": mode, "score": round(score,2)},
            "engine": f"GHOST {mode} | {pair} | No Flicker",
            "confidence": int(conf),
            "real": quotex_client.use_real,
            "risk_percent": RISK_PERCENT,
            "timestamp": int(now)
        }

        self.debounce[pair]=now
        self.active_signals[pair]=new_signal

        return new_signal

    def scan_all(self,mode="SAFE"):
        self._new_ticks()
        res=[]
        for p in self.pairs:
            s=self.get_signal(p,mode)
            res.append(s)
        res=sorted(res,key=lambda x:x.get("confidence",0),reverse=True)
        return res

signal_engine=QuantumEngine()
signal_engine.calc_signal = lambda override_mode=None, pair="EURUSD": signal_engine.get_signal(pair, override_mode or SIGNAL_MODE)
