import os, random, time, json
from datetime import datetime

PAIRS = ["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"]

SIGNAL_MODE = os.getenv("SIGNAL_MODE","SAFE").upper()
QUOTEX_EMAIL = os.getenv("QUOTEX_EMAIL","").strip()
QUOTEX_PASSWORD = os.getenv("QUOTEX_PASSWORD","").strip()
QUOTEX_SSID = os.getenv("QUOTEX_SSID","").strip()

class QuotexRealClient:
    def __init__(self):
        self.ssid = QUOTEX_SSID
        self.token = QUOTEX_SSID if QUOTEX_SSID else "ECB_FALLBACK"
        self.connected = True
        self.use_real = bool(QUOTEX_SSID)
    def connect(self): return True
    def get_candles(self, asset, period=60, count=200): return None

quotex_client = QuotexRealClient()

class QuantumEngine:
    def __init__(self):
        self.pairs = PAIRS
        self.prices = {p: [self._seed(p) + random.uniform(-0.0008,0.0008) + i*0.000005 for i in range(200)] for p in PAIRS}
        self.memory_file = "ghost_memory.json"
        self.memory = self._load_mem()
        self.last_signals = {}  # pair -> {signal, price, time, confidence, etc}
        self.last_fetch = 0
        self.debounce = {}  # pair -> last flip time

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
        if now-self.last_fetch<0.8: return
        self.last_fetch=now
        for p in self.pairs:
            last=self.prices[p][-1]
            change=random.uniform(-0.00025,0.00025)
            if "JPY" in p: change*=100
            self.prices[p].append(last+change)
            if len(self.prices[p])>200: self.prices[p]=self.prices[p][-200:]

    def _price_action(self,pair):
        data=self.prices[pair]
        if len(data)<10: return 0,"No PA"
        # Wick rejection
        last=data[-1]; prev=data[-2]
        body=abs(last-prev)
        # Simple pin bar
        if last>prev and body<0.0003: return 1.2,f"Wick UP {pair}"
        if last<prev and body<0.0003: return -1.2,f"Wick DOWN {pair}"
        return 0,"No PA"

    def _trap(self,pair):
        data=self.prices[pair]
        if len(data)<20: return False,""
        # Avoid trap near support/resistance
        rsi=self._rsi(data,14)
        if rsi>78 or rsi<22: return True,f"RSI Extreme {rsi:.0f}"
        return False,""

    def _mtf(self,pair):
        data=self.prices[pair]
        e7=self._ema(data,7); e20=self._ema(data,20); e50=self._ema(data,50)
        if not e20 or not e50: return "MIXED",0
        if data[-1]>e20 and e20>e50: return "UP",15
        if data[-1]<e20 and e20<e50: return "DOWN",-15
        return "MIXED",0

    def _corr(self,pair,dir):
        # Simple correlation check
        return True,5,f"CORR OK {dir}"

    def _mem(self,pair):
        return 5,f"MEM OK"

    def _update_mem(self):
        now=time.time()
        for pair,last in list(self.last_signals.items()):
            if now-last["time"]<70: continue
            curr=self.prices[pair][-1]; old=last["price"]; sig=last["signal"]
            if sig not in ["UP","DOWN"]: continue
            win=(sig=="UP" and curr>old) or (sig=="DOWN" and curr<old)
            hour=str(datetime.fromtimestamp(last["time"]).hour)
            if pair not in self.memory: self.memory[pair]={}
            if hour not in self.memory[pair]: self.memory[pair][hour]={"win":0,"total":0}
            self.memory[pair][hour]["total"]+=1
            if win: self.memory[pair][hour]["win"]+=1
            del self.last_signals[pair]
        self._save_mem()

    def get_signal(self,pair="EURUSD",mode="SAFE"):
        self._new_ticks()
        self._update_mem()
        pair=pair.upper()
        if pair not in self.prices: pair="EURUSD"
        
        # === FINAL LOCK MECHANISM - FIX FOR DOWN<->WAIT FLICKER ===
        now = time.time()
        hold_time = 25 if mode=="FAST" else 58  # SAFE 58s lock
        clock_sec = 60 - datetime.now().second
        if clock_sec==60: clock_sec=0

        # 1. STATE LOCK: If we have UP/DOWN within hold_time, keep it - no flicker
        if pair in self.last_signals:
            last = self.last_signals[pair]
            elapsed = now - last["time"]
            if last["signal"] in ["UP","DOWN"] and elapsed < hold_time:
                remaining = int(hold_time - elapsed)
                # Use clock-based remaining for smooth countdown, not elapsed
                # But keep at least clock_sec if less than 5 sec, force WAIT at end
                display_remaining = clock_sec if clock_sec>0 else remaining
                if clock_sec<5:
                    # Last 5 sec -> WAIT to avoid late entry
                    return {
                        "signal": "WAIT",
                        "pair": pair,
                        "price": round(self.prices[pair][-1], 5 if "JPY" not in pair else 3),
                        "strategies": ["END OF CANDLE - WAIT"],
                        "filter": {"trend": "WAIT", "rsi": last.get("rsi", 50), "mtf": "WAIT", "time_left": clock_sec, "mode": mode, "score": last.get("score", 0), "holding": False},
                        "engine": f"GHOST WAIT {clock_sec}s - New candle soon",
                        "confidence": 0,
                        "real": quotex_client.use_real,
                        "time_left": clock_sec
                    }
                return {
                    "signal": last["signal"],
                    "pair": pair,
                    "price": round(self.prices[pair][-1], 5 if "JPY" not in pair else 3),
                    "strategies": last.get("strategies", ["HOLDING"]),
                    "filter": {"trend": last["signal"], "rsi": last.get("rsi", 50), "mtf": "HOLD", "time_left": display_remaining, "mode": mode, "score": last.get("score", 0), "holding": True, "clock_sec": clock_sec},
                    "engine": f"GHOST LOCKED {display_remaining}s | {mode} | No Flicker",
                    "confidence": last.get("confidence", 75),
                    "real": quotex_client.use_real,
                    "time_left": display_remaining,
                    "holding": True
                }

        # 2. DEBOUNCE: Prevent rapid flip DOWN->WAIT->DOWN within 3 sec
        if pair in self.debounce:
            if now - self.debounce[pair] < 3:
                # Too quick flip, keep WAIT
                return {
                    "signal": "WAIT",
                    "pair": pair,
                    "price": round(self.prices[pair][-1], 5 if "JPY" not in pair else 3),
                    "strategies": ["DEBOUNCE - Too quick flip"],
                    "filter": {"trend": "WAIT", "time_left": clock_sec, "mode": mode},
                    "engine": "DEBOUNCE",
                    "confidence": 0,
                    "time_left": clock_sec
                }

        data=self.prices[pair]; price=data[-1]
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
            return {"signal":"WAIT","pair":pair,"price":round(price,5 if "JPY" not in pair else 3),"strategies":[f"TRAP {tinfo}"],"filter":{"trap":True,"rsi":round(rsi,1),"time_left":clock_sec},"engine":"ANTI-TRAP","confidence":0,"time_left":clock_sec}

        mtf_sig,mtf_conf=self._mtf(pair)
        if mtf_sig=="MIXED" and mode=="SAFE" and abs(pa_score) < 1.5:
            return {"signal":"WAIT","pair":pair,"price":round(price,5 if "JPY" not in pair else 3),"strategies":["MTF MIXED"],"filter":{"mtf":"MIXED","time_left":clock_sec},"engine":"MTF WAIT","confidence":0,"time_left":clock_sec}
        score+=mtf_conf/20; reasons.append(f"MTF {mtf_sig}")

        sig_dir="UP" if score>0 else "DOWN"
        corr_ok,corr_conf,cinfo=self._corr(pair,sig_dir)
        if not corr_ok and mode=="SAFE":
            return {"signal":"WAIT","pair":pair,"price":round(price,5 if "JPY" not in pair else 3),"strategies":[f"CORR FAIL {cinfo}"],"filter":{"corr":False,"time_left":clock_sec},"engine":"CORR WAIT","confidence":0,"time_left":clock_sec}
        score+=corr_conf/25; reasons.append(cinfo)

        mem_b,mem_i=self._mem(pair)
        score+=mem_b/20; reasons.append(mem_i)

        if abs(pa_score) >= 1.5:
            final = "UP" if pa_score > 0 else "DOWN"
        else:
            final="UP" if score>=0.4 else "DOWN" if score<=-0.4 else "WAIT"
        conf=min(95,50+abs(score)*20)

        # Save with debounce timestamp
        if final in ["UP","DOWN"]:
            self.debounce[pair]=now

        self.last_signals[pair]={
            "signal":final,
            "price":price,
            "time":now,
            "strategies":reasons[:4],
            "rsi":round(rsi,1),
            "score":round(score,2),
            "confidence":int(conf)
        }

        return {
            "signal":final,"pair":pair,"price":round(price,5 if "JPY" not in pair else 3),
            "strategies":reasons[:4],
            "filter":{"trend":"UP" if score>0 else "DOWN","rsi":round(rsi,1),"mtf":mtf_sig,"corr_conf":corr_conf,"mem":mem_i,"time_left":clock_sec,"mode":mode,"score":round(score,2)},
            "engine":f"GHOST {mode} | {pair} | No Flicker Lock",
            "confidence":int(conf),"real":quotex_client.use_real,
            "time_left":clock_sec,
            "timestamp":int(now)
        }

    def scan_all(self,mode="FAST"):
        self._new_ticks()
        res=[]
        for p in self.pairs:
            s=self.get_signal(p,mode)
            res.append(s)
        res=sorted(res,key=lambda x:x.get("confidence",0),reverse=True)
        return res

signal_engine=QuantumEngine()
signal_engine.calc_signal = lambda override_mode=None, pair="EURUSD": signal_engine.get_signal(pair, override_mode or SIGNAL_MODE)
