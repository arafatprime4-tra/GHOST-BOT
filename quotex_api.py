import random

# Real login er jonno: from quotexapi.stable_api import Quotex
# api = Quotex(email, password); api.connect()

class QuotexSignal:
    def __init__(self):
        self.prices = [100.0]

    def get_live_candles(self):
        last = self.prices[-1]
        new = last + (random.random()-0.48)*0.4
        self.prices.append(new)
        if len(self.prices)>100:
            self.prices.pop(0)
        return self.prices

    def calc_signal(self):
        p = self.get_live_candles()
        if len(p)<55:
            return {"signal":"COLLECTING", "count": len(p), "price": round(p[-1],3)}

        def ema(arr, per):
            k=2/(per+1)
            e=sum(arr[:per])/per
            for x in arr[per:]:
                e=x*k+e*(1-k)
            return e

        def rsi(arr, per=14):
            g=l=0
            for i in range(len(arr)-per, len(arr)):
                d=arr[i]-arr[i-1]
                if d>=0: g+=d
                else: l-=d
            if l==0: l=0.01
            rs=g/l
            return 100-100/(1+rs)

        e20=ema(p,20)
        e50=ema(p,50)
        r=rsi(p)
        price=p[-1]

        if price>e20>e50 and 38<r<62:
            sig="BUY"
        elif price<e20<e50 and 38<r<62:
            sig="SELL"
        else:
            sig="WAIT"

        return {
            "signal": sig,
            "price": round(price,3),
            "ema20": round(e20,3),
            "ema50": round(e50,3),
            "rsi": round(r,1)
        }

signal_engine = QuotexSignal()
