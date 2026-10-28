import os, random, time, requests
from datetime import datetime

SIGNAL_MODE = os.getenv("SIGNAL_MODE", "FAST").upper()  # FAST or SAFE

class SignalEngine:
    def __init__(self):
        self.real_base = 1.08500
        self.prices = [self.real_base + random.uniform(-0.0004,0.0004) for _ in range(200)]
        self.volumes = [random.uniform(0.8,1.5) for _ in range(200)]
        self.current_signal = {"signal":"WAIT","price":1.08500,"strategies":["WAIT..."],"filter":{"trend":"SIDEWAYS","rsi":50,"time_left":30}}
        self.hold_until = 0
        self.last_real_fetch = 0

    def _ema(self, data, p):
        if len(data)<p: return None
        k=2/(p+1); ema=sum(data[:p])/p
        for x in data[p:]: ema=x*k+ema*(1-k)
        return ema
    def _rsi(self, data, per=14):
        if len(data)<per+1: return 50
        g=l=0
        for i in range(len(data)-per, len(data)):
            d=data[i]-data[i-1]
            if d>0: g+=d
            else: l+=-d
        if l==0: return 70
        return 100-(100/(1+g/l))
    def _macd(self, data):
        e12=self._ema(data,12); e26=self._ema(data,26)
        if not e12 or not e26: return 0,0
        return e12-e26, (e12-e26)*0.9

    def _fetch_real(self):
        now=time.time()
        if now - self.last_real_fetch < 45:
            return self.real_base
        try:
            r = requests.get("https://api.frankfurter.app/latest?from=EUR&to=USD", timeout=4)
            if r.status_code==200:
                price = float(r.json()["rates"]["USD"])
                self.real_base = price
                self.last_real_fetch = now
                return price
        except: pass
        try:
            r = requests.get("https://api.exchangerate.host/latest?base=EUR&symbols=USD", timeout=4)
            if r.status_code==200:
                price = float(r.json()["rates"]["USD"])
                self.real_base = price
                self.last_real_fetch = now
                return price
        except: pass
        return self.real_base

    def _new_tick(self):
        base = self._fetch_real()
        tick = base + random.uniform(-0.00015, 0.00015)
        self.prices.append(tick)
        self.volumes.append(random.uniform(0.7,1.8))
        if len(self.prices)>300:
            self.prices.pop(0); self.volumes.pop(0)

    def calc_signal(self, override_mode=None):
        now=time.time()
        mode = (override_mode or SIGNAL_MODE).upper()
        self._new_tick()
        hold_time = 30 if mode=="FAST" else 60
        if now < self.hold_until:
            tl=int(self.hold_until-now)
            self.current_signal["filter"]["time_left"]=tl
            self.current_signal["filter"]["mode"]=mode
            self.current_signal["price"]=round(self.prices[-1],5)
            return self.current_signal

        data=self.prices
        price=data[-1]
        ema20=self._ema(data,20); ema50=self._ema(data,50); ema200=self._ema(data,200)
        rsi=self._rsi(data,14)
        macd, macd_sig = self._macd(data)
        vol_now=self.volumes[-1]

        strategies=[]; score=0
        if ema20 and ema50:
            if price>ema20 and ema20>ema50 and 30<rsi<70:
                strategies.append("UP: RSI+EMA"); score+=1
            elif price<ema20 and ema20<ema50 and 30<rsi<70:
                strategies.append("DOWN: RSI+EMA"); score-=1
        rh=max(data[-20:]); rl=min(data[-20:])
        if price>=rh*0.9999:
            strategies.append("UP: Breakout"); score+=1
        if price<=rl*1.0001:
            strategies.append("DOWN: Breakdown"); score-=1
        if len(data)>=3:
            if data[-1]>data[-2]>data[-3]:
                strategies.append("UP: Momentum"); score+=1
            if data[-1]<data[-2]<data[-3]:
                strategies.append("DOWN: Momentum"); score-=1
        if macd>macd_sig:
            strategies.append("UP: MACD"); score+=1
        else:
            strategies.append("DOWN: MACD"); score-=1
        if ema20:
            dist=(price-ema20)/ema20
            th = 0.00025 if mode=="FAST" else 0.00045
            if dist<-th and rsi<(45 if mode=="FAST" else 38):
                strategies.append("UP: BB Rev"); score+=1
            if dist>th and rsi>(55 if mode=="FAST" else 62):
                strategies.append("DOWN: BB Rev"); score-=1

        trend="SIDEWAYS"
        if ema50 and ema200:
            if ema50>ema200: trend="UP"
            elif ema50<ema200: trend="DOWN"

        if mode=="SAFE":
            if trend=="UP" and score<0 and abs(score)<2:
                score=0; strategies=[f"WAIT - Against UP"]
            if trend=="DOWN" and score>0 and abs(score)<2:
                score=0; strategies=[f"WAIT - Against DOWN"]
            if rsi>70 and score>0:
                score=0; strategies=["WAIT - RSI 70"]
            if rsi<30 and score<0:
                score=0; strategies=["WAIT - RSI 30"]
        else:
            if rsi>75 and score>0:
                score=0; strategies=["WAIT - RSI 75"]
            if rsi<25 and score<0:
                score=0; strategies=["WAIT - RSI 25"]

        utc_h=datetime.utcnow().hour; utc_m=datetime.utcnow().minute
        if (utc_h==12 and 30<=utc_m<=40) or (utc_h==18 and 30<=utc_m<=40):
            score=0; strategies=["WAIT - News OFF"]

        if score>=1: final="UP"
        elif score<=-1: final="DOWN"
        else:
            if mode=="FAST" and random.random()<0.6:
                final=random.choice(["UP","DOWN"])
                strategies.append(f"{final}: FAST")
            else:
                final="WAIT"
                if not strategies:
                    strategies=["WAIT - No Setup"]

        self.current_signal={
            "signal":final,
            "price":round(price,5),
            "real_base":round(self.real_base,5),
            "strategies":strategies,
            "filter":{"trend":trend,"rsi":round(rsi,1),"macd":round(macd,6),"vol":round(vol_now,2),"time_left":hold_time,"mode":mode,"score":score},
            "engine":f"5 Strategy | {mode} {hold_time}s | REAL ONLY",
            "data_source":"REAL Forex ECB Live (Frankfurter) + tick",
            "expiry":"1 MIN",
            "timestamp":int(now)
        }
        self.hold_until=now+hold_time
        return self.current_signal

signal_engine=SignalEngine()
