import random, time
from datetime import datetime

class ProSignalEngine:
    def __init__(self):
        self.prices = [100.0]
        self.volumes = [1000]
        self.highs = [100.5]
        self.lows = [99.5]
        self.opens = [100.0]

    def get_live_data(self):
        last = self.prices[-1]
        # Simulate OHLCV
        change = (random.random()-0.48)*0.6
        new_close = last + change
        new_open = last
        new_high = max(new_open, new_close) + random.random()*0.3
        new_low = min(new_open, new_close) - random.random()*0.3
        vol = 800 + random.random()*800

        self.prices.append(new_close)
        self.opens.append(new_open)
        self.highs.append(new_high)
        self.lows.append(new_low)
        self.volumes.append(vol)
        
        for arr in [self.prices, self.opens, self.highs, self.lows, self.volumes]:
            if len(arr)>200: arr.pop(0)
        return self.prices

    # ---- Indicators ----
    def ema(self, arr, per):
        if len(arr)<per: return None
        k=2/(per+1); e=sum(arr[:per])/per
        for x in arr[per:]: e=x*k+e*(1-k)
        return e

    def rsi(self, arr, per=14):
        if len(arr)<per+1: return 50
        g=l=0
        for i in range(len(arr)-per, len(arr)):
            d=arr[i]-arr[i-1]
            if d>=0: g+=d
            else: l-=d
        if l==0: l=0.01
        return 100-100/(1+(g/l))

    def macd(self, arr):
        if len(arr)<26: return (0,0,0)
        e12=self.ema(arr,12); e26=self.ema(arr,26)
        if e12 is None or e26 is None: return (0,0,0)
        macd_line=e12-e26
        # signal line = EMA 9 of macd (approx)
        return (macd_line, macd_line*0.9, macd_line*0.1) # macd, signal, hist

    def bollinger(self, arr, per=20, mult=2):
        if len(arr)<per: return (None,None,None)
        sma=sum(arr[-per:])/per
        std=(sum((x-sma)**2 for x in arr[-per:])/per)**0.5
        return (sma+mult*std, sma, sma-mult*std) # upper, middle, lower

    def support_resistance(self, highs, lows):
        # Simple: recent 20 candle high/low
        if len(highs)<20: return (None,None)
        res=max(highs[-20:]); sup=min(lows[-20:])
        return (res, sup)

    def engulfing_pinbar(self):
        if len(self.prices)<3: return None
        # Last 2 candle
        o1,c1=self.opens[-2], self.prices[-2]
        o2,c2=self.opens[-1], self.prices[-1]
        h2,l2=self.highs[-1], self.lows[-1]
        # Bullish Engulfing
        if c1<o1 and c2>o2 and c2>o1 and o2<c1:
            return "BULL_ENGULFING"
        # Bearish Engulfing
        if c1>o1 and c2<o2 and c2<o1 and o2>c1:
            return "BEAR_ENGULFING"
        # Pin Bar (long wick)
        body=abs(c2-o2); upper=h2-max(o2,c2); lower=min(o2,c2)-l2
        if lower>body*2 and upper<body*0.5:
            return "PIN_BULL"
        if upper>body*2 and lower<body*0.5:
            return "PIN_BEAR"
        return None

    # ---- Pro Filter 4 Step ----
    def pro_filter(self, price):
        # 1. Trend? EMA 50/200
        e50=self.ema(self.prices,50); e200=self.ema(self.prices,200)
        if e50 is None or e200 is None:
            trend="RANGE"
        else:
            trend="UP" if e50>e200 else "DOWN" if e50<e200 else "RANGE"

        # 2. Overbought/Oversold?
        r=self.rsi(self.prices)
        ob_os = "OVERBOUGHT" if r>70 else "OVERSOLD" if r<30 else "NORMAL"

        # 3. News Time OFF? (12:30, 18:30 GMT news time e avoid - demo)
        now = datetime.utcnow()
        news_off = (now.hour==12 and 25<=now.minute<=40) or (now.hour==18 and 25<=now.minute<=40)

        # 4. Money Management - 2% rule, no martingale (just info)
        mm = "2% Risk, No Martingale"

        return {"trend":trend, "rsi_state":ob_os, "news_off":news_off, "mm":mm, "rsi":round(r,1), "e50":round(e50 or 0,2), "e200":round(e200 or 0,2)}

    def calc_signal(self):
        self.get_live_data()
        if len(self.prices)<60:
            return {"signal":"COLLECTING", "count":len(self.prices), "strategies":[]}

        price=self.prices[-1]
        filt=self.pro_filter(price)
        if filt["news_off"]:
            return {"signal":"WAIT", "reason":"NEWS_TIME_OFF", "filter":filt, "strategies":[]}

        strategies=[]

        # 1. RSI + EMA Crossover
        e20=self.ema(self.prices,20); e50=self.ema(self.prices,50); r=self.rsi(self.prices)
        if e20 and e50:
            if price>e20>e50 and 40<r<65:
                strategies.append("RSI_EMA_BUY")
            if price<e20<e50 and 35<r<60:
                strategies.append("RSI_EMA_SELL")

        # 2. Support/Resistance Breakout
        res, sup = self.support_resistance(self.highs, self.lows)
        if res and price>res*1.001:
            strategies.append("RESISTANCE_BREAKOUT_BUY")
        if sup and price<sup*0.999:
            strategies.append("SUPPORT_BREAKOUT_SELL")

        # 3. Candlestick Pattern
        pat=self.engulfing_pinbar()
        if pat in ["BULL_ENGULFING","PIN_BULL"]:
            strategies.append(f"CANDLE_{pat}_BUY")
        if pat in ["BEAR_ENGULFING","PIN_BEAR"]:
            strategies.append(f"CANDLE_{pat}_SELL")

        # 4. MACD + Volume
        macd_line, sig_line, hist = self.macd(self.prices)
        avg_vol=sum(self.volumes[-20:])/20
        if hist>0 and self.volumes[-1]>avg_vol*1.2:
            strategies.append("MACD_VOL_BUY")
        if hist<0 and self.volumes[-1]>avg_vol*1.2:
            strategies.append("MACD_VOL_SELL")

        # 5. Bollinger Reversal
        up, mid, low = self.bollinger(self.prices)
        if up and low:
            if price<low and r<35:
                strategies.append("BB_REVERSAL_BUY")
            if price>up and r>65:
                strategies.append("BB_REVERSAL_SELL")

        # Decide final signal - need at least 2 strategy agree + trend filter
        buy_score=sum(1 for s in strategies if "BUY" in s)
        sell_score=sum(1 for s in strategies if "SELL" in s)

        # Apply trend filter
        if filt["trend"]=="UP": sell_score-=1
        if filt["trend"]=="DOWN": buy_score-=1
        if filt["rsi_state"]=="OVERBOUGHT": buy_score-=1
        if filt["rsi_state"]=="OVERSOLD": sell_score-=1

        if buy_score>=2 and buy_score>sell_score:
            final="BUY"
        elif sell_score>=2 and sell_score>buy_score:
            final="SELL"
        else:
            final="WAIT"

        return {
            "signal": final,
            "price": round(price,3),
            "strategies": strategies,
            "filter": filt,
            "buy_score": buy_score,
            "sell_score": sell_score
        }

signal_engine = ProSignalEngine()
