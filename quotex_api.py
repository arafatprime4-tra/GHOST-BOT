import random, time, math
from datetime import datetime

class SignalEngine:
    def __init__(self):
        self.prices = [1.11200 + random.uniform(-0.0004,0.0004) for _ in range(200)]
        self.volumes = [random.uniform(0.8,1.5) for _ in range(200)]
        self.current_signal = {"signal":"WAIT","price":1.11200,"strategies":["WAIT - Scanning 5 strategies..."],"filter":{"trend":"SIDEWAYS","rsi":50,"time_left":60}}
        self.hold_until = 0

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
        macd=e12-e26
        # signal line simplified
        return macd, macd*0.9

    def _new_tick(self):
        last=self.prices[-1]
        self.prices.append(last+random.uniform(-0.00009,0.00009)+random.choice([-0.00002,0,0,0.00002]))
        self.volumes.append(random.uniform(0.7,1.8))
        if len(self.prices)>300:
            self.prices.pop(0); self.volumes.pop(0)

    def calc_signal(self):
        now=time.time()
        self._new_tick()

        # 1MIN HOLD - keep same signal 60 sec
        if now < self.hold_until:
            tl=int(self.hold_until-now)
            self.current_signal["filter"]["time_left"]=tl
            self.current_signal["price"]=round(self.prices[-1],5)
            return self.current_signal

        data=self.prices
        price=data[-1]
        ema7=self._ema(data,7); ema20=self._ema(data,20); ema50=self._ema(data,50); ema200=self._ema(data,200)
        rsi=self._rsi(data,14)
        macd, macd_sig = self._macd(data)
        vol_avg=sum(self.volumes[-20:])/20 if self.volumes else 1
        vol_now=self.volumes[-1] if self.volumes else 1

        strategies=[]; score=0; reasons=[]

        # ===== 5 STRATEGY ENGINE =====
        # 1. RSI + EMA Crossover
        if ema20 and ema50:
            if price>ema20 and ema20>ema50 and 35<rsi<66:
                strategies.append("BUY: RSI+EMA"); score+=1; reasons.append("EMA20>50")
            elif price<ema20 and ema20<ema50 and 34<rsi<65:
                strategies.append("SELL: RSI+EMA"); score-=1; reasons.append("EMA20<50")

        # 2. Support/Resistance Breakout (20 candle)
        rh=max(data[-20:]); rl=min(data[-20:])
        if price>=rh*0.99995:
            strategies.append("BUY: S/R Breakout"); score+=1
        if price<=rl*1.00005:
            strategies.append("SELL: S/R Breakdown"); score-=1

        # 3. Engulfing + Pin Bar (Candle Pattern)
        if len(data)>=3:
            # engulfing simplified: big momentum candle
            body1=abs(data[-1]-data[-2]); body2=abs(data[-2]-data[-3])
            if data[-1]>data[-2] and body1>body2*1.5 and data[-2]<data[-3]:
                strategies.append("BUY: Engulfing"); score+=1
            if data[-1]<data[-2] and body1>body2*1.5 and data[-2]>data[-3]:
                strategies.append("SELL: Engulfing"); score-=1
            # pin bar: wick rejection
            if data[-1]>data[-2] and data[-2]==rl:
                strategies.append("BUY: Pin Bar"); score+=1
            if data[-1]<data[-2] and data[-2]==rh:
                strategies.append("SELL: Pin Bar"); score-=1

        # 4. MACD + Volume
        if macd>macd_sig and macd>0 and vol_now>vol_avg*1.2:
            strategies.append("BUY: MACD+Vol"); score+=1
        if macd<macd_sig and macd<0 and vol_now>vol_avg*1.2:
            strategies.append("SELL: MACD+Vol"); score-=1

        # 5. Bollinger Reversal (price far from EMA20 + RSI extreme)
        if ema20:
            dist=(price-ema20)/ema20
            if dist<-0.00045 and rsi<38:
                strategies.append("BUY: BB Reversal"); score+=1
            if dist>0.00045 and rsi>62:
                strategies.append("SELL: BB Reversal"); score-=1

        # ===== 4 STEP FILTER =====
        trend="SIDEWAYS"
        if ema50 and ema200:
            if ema50>ema200: trend="UP"
            elif ema50<ema200: trend="DOWN"

        # Filter 1: Trend EMA50/200 - don't go against strong trend
        if trend=="UP" and score<0 and abs(score)<2:
            score=0; strategies=["WAIT - Filter: Against UP trend"]
        if trend=="DOWN" and score>0 and abs(score)<2:
            score=0; strategies=["WAIT - Filter: Against DOWN trend"]

        # Filter 2: Overbought/Oversold RSI 70/30
        if rsi>70 and score>0:
            score=0; strategies=["WAIT - Filter: RSI 70 Overbought"]
        if rsi<30 and score<0:
            score=0; strategies=["WAIT - Filter: RSI 30 Oversold"]

        # Filter 3: News Time OFF (12:30-12:40 & 18:30-18:40 UTC avoid)
        utc_h=datetime.utcnow().hour; utc_m=datetime.utcnow().minute
        if (utc_h==12 and 30<=utc_m<=40) or (utc_h==18 and 30<=utc_m<=40):
            score=0; strategies=["WAIT - Filter: News Time OFF"]; trend="NEWS OFF"

        # Filter 4: Money Management 2% - signal only, no martingale (info only)
        mm="2% Risk | No Martingale | Signal Only"

        # Final Decision
        if score>=1:
            final="BUY"
        elif score<=-1:
            final="SELL"
        else:
            final="WAIT"
            if not strategies:
                strategies=["WAIT - No A+ Setup (5 Strat Scanning)"]

        self.current_signal={
            "signal":final,
            "price":round(price,5),
            "strategies":strategies,
            "filter":{"trend":trend,"rsi":round(rsi,1),"macd":round(macd,6),"vol":round(vol_now,2),"time_left":60,"mm":mm,"score":score},
            "engine":"5 Strategy + 4 Filter | 1MIN HOLD",
            "expiry":"1 MIN",
            "timestamp":int(now)
        }
        self.hold_until=now+60
        return self.current_signal

signal_engine=SignalEngine()
