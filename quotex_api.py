
# ==================== SMC - SMART MONEY CONCEPTS - FULL ====================
# Order Block, FVG, Liquidity, BOS/CHOCH, Breaker, Mitigation, Premium/Discount, Equal Highs/Lows

class Candle:
    def __init__(self, o, h, l, c, idx=0):
        self.open = o
        self.high = h
        self.low = l
        self.close = c
        self.idx = idx
        self.body = abs(c - o)
        self.upper_wick = h - max(o, c)
        self.lower_wick = min(o, c) - l
        self.is_bull = c > o
        self.is_bear = c < o
        self.range = h - l

class SMCEngine:
    """
    GHOST PREMIUM BOT - SMC Full
    BOS, CHOCH, Order Block, Breaker Block, FVG, Liquidity Grab, Equal Highs/Lows, Premium/Discount
    """
    
    def detect_bos_choch(self, candles):
        if len(candles) < 12:
            return {"structure": "RANGING", "bias": "BOTH", "bos": False, "choch": False, "reason": "No data"}
        swing_highs = []
        swing_lows = []
        for i in range(3, len(candles)-3):
            if candles[i].high > candles[i-1].high and candles[i].high > candles[i-2].high and candles[i].high > candles[i-3].high and candles[i].high > candles[i+1].high and candles[i].high > candles[i+2].high and candles[i].high > candles[i+3].high:
                swing_highs.append((i, candles[i].high))
            if candles[i].low < candles[i-1].low and candles[i].low < candles[i-2].low and candles[i].low < candles[i-3].low and candles[i].low < candles[i+1].low and candles[i].low < candles[i+2].low and candles[i].low < candles[i+3].low:
                swing_lows.append((i, candles[i].low))
        if len(swing_highs) < 2 or len(swing_lows) < 2:
            return {"structure": "RANGING", "bias": "BOTH", "bos": False, "choch": False, "reason": "Ranging"}
        h1, h2 = swing_highs[-1][1], swing_highs[-2][1]
        l1, l2 = swing_lows[-1][1], swing_lows[-2][1]
        hh = h1 > h2; hl = l1 > l2; ll = l1 < l2; lh = h1 < h2
        if hh and hl:
            return {"structure": "BULLISH_BOS", "bias": "CALL", "bos": True, "choch": False, "reason": f"BOS Bullish HH+HL {h2:.5f}->{h1:.5f}", "hh": hh, "hl": hl}
        elif ll and lh:
            return {"structure": "BEARISH_BOS", "bias": "PUT", "bos": True, "choch": False, "reason": f"BOS Bearish LL+LH {h2:.5f}->{h1:.5f}", "ll": ll, "lh": lh}
        else:
            # CHOCH detection
            if len(swing_highs) >= 3 and swing_highs[-3][1] < swing_highs[-2][1] and swing_highs[-1][1] < swing_highs[-2][1]:
                return {"structure": "CHOCH_BEARISH", "bias": "PUT", "bos": False, "choch": True, "reason": "CHOCH Bearish - Failed HH"}
            elif len(swing_lows) >= 3 and swing_lows[-3][1] > swing_lows[-2][1] and swing_lows[-1][1] > swing_lows[-2][1]:
                return {"structure": "CHOCH_BULLISH", "bias": "CALL", "bos": False, "choch": True, "reason": "CHOCH Bullish - Failed LL"}
            return {"structure": "RANGING", "bias": "BOTH", "bos": False, "choch": False, "reason": "Ranging"}

    def detect_liquidity(self, candles):
        if len(candles) < 8:
            return {"grab": False}
        last = candles[-1]
        prev_high = max(c.high for c in candles[-8:-1])
        prev_low = min(c.low for c in candles[-8:-1])
        # Equal Highs/Lows (double top/bottom liquidity)
        highs = [c.high for c in candles[-6:-1]]
        lows = [c.low for c in candles[-6:-1]]
        # Equal highs within 0.0001
        eq_high = any(abs(h - prev_high) < 0.00015 for h in highs)
        eq_low = any(abs(l - prev_low) < 0.00015 for l in lows)
        # Liquidity grab top
        if last.high > prev_high and last.close < prev_high:
            ratio = last.upper_wick / (last.body + 0.00001)
            if ratio > 1.2:
                return {"grab": True, "type": "BUY_SIDE_LIQUIDITY", "signal": "PUT", "conf": 88, "reason": f"Buy Side Liquidity Grab {prev_high:.5f} swept {'(Equal Highs)' if eq_high else ''}", "is_trap": True, "swept": prev_high, "pa_type": "Liquidity Grab"}
        if last.low < prev_low and last.close > prev_low:
            ratio = last.lower_wick / (last.body + 0.00001)
            if ratio > 1.2:
                return {"grab": True, "type": "SELL_SIDE_LIQUIDITY", "signal": "CALL", "conf": 88, "reason": f"Sell Side Liquidity Grab {prev_low:.5f} swept {'(Equal Lows)' if eq_low else ''}", "is_trap": True, "swept": prev_low, "pa_type": "Liquidity Grab"}
        return {"grab": False}

    def detect_order_block(self, candles):
        if len(candles) < 6:
            return {"ob": False}
        # Bullish OB: last bearish before impulse + FVG
        for i in range(len(candles)-5, 1, -1):
            if candles[i].is_bear:
                # Impulse: next 2-3 bullish with strong body
                if i+3 < len(candles):
                    c1, c2, c3 = candles[i+1], candles[i+2], candles[i+3]
                    if c1.is_bull and c2.is_bull and (c1.body + c2.body) > candles[i].body * 1.8 and c3.close > candles[i].high:
                        ob_low, ob_high = candles[i].low, candles[i].high
                        curr = candles[-1]
                        if ob_low <= curr.close <= ob_high or abs(curr.close - ob_low) < 0.0004:
                            return {"ob": True, "type": "BULLISH_OB", "signal": "CALL", "conf": 82, "reason": f"Bullish Order Block {ob_low:.5f}-{ob_high:.5f} Retest", "zone": (ob_low, ob_high), "pa_type": "Order Block Retest"}
                        # Breaker Block: bearish OB that failed and flipped bullish
                        if curr.close > ob_high and curr.is_bull:
                            return {"ob": True, "type": "BULLISH_BREAKER", "signal": "CALL", "conf": 80, "reason": f"Bullish Breaker Block {ob_high:.5f} Break", "zone": (ob_low, ob_high), "pa_type": "Breaker Block"}
        for i in range(len(candles)-5, 1, -1):
            if candles[i].is_bull:
                if i+3 < len(candles):
                    c1, c2, c3 = candles[i+1], candles[i+2], candles[i+3]
                    if c1.is_bear and c2.is_bear and (c1.body + c2.body) > candles[i].body * 1.8 and c3.close < candles[i].low:
                        ob_low, ob_high = candles[i].low, candles[i].high
                        curr = candles[-1]
                        if ob_low <= curr.close <= ob_high or abs(curr.close - ob_high) < 0.0004:
                            return {"ob": True, "type": "BEARISH_OB", "signal": "PUT", "conf": 82, "reason": f"Bearish Order Block {ob_low:.5f}-{ob_high:.5f} Retest", "zone": (ob_low, ob_high), "pa_type": "Order Block Retest"}
                        if curr.close < ob_low and curr.is_bear:
                            return {"ob": True, "type": "BEARISH_BREAKER", "signal": "PUT", "conf": 80, "reason": f"Bearish Breaker Block {ob_low:.5f} Break", "zone": (ob_low, ob_high), "pa_type": "Breaker Block"}
        return {"ob": False}

    def detect_fvg(self, candles):
        if len(candles) < 4:
            return {"fvg": False}
        for i in range(1, len(candles)-1):
            c1, c2, c3 = candles[i-1], candles[i], candles[i+1]
            # Bullish FVG: c3.low > c1.high
            if c3.low > c1.high and c2.is_bull and c2.body > (c1.body + c3.body)/2:
                fvg_top, fvg_bottom = c3.low, c1.high
                curr = candles[-1]
                if fvg_bottom <= curr.close <= fvg_top or abs(curr.close - fvg_bottom) < 0.0003:
                    # Mitigation: if price returns to 50% of FVG
                    mid = (fvg_top + fvg_bottom)/2
                    conf = 85 if curr.close <= mid else 75
                    return {"fvg": True, "type": "BULLISH_FVG", "signal": "CALL", "conf": conf, "reason": f"Bullish FVG {fvg_bottom:.5f}-{fvg_top:.5f} Mitigation", "zone": (fvg_bottom, fvg_top), "pa_type": "FVG Mitigation"}
            # Bearish FVG
            if c3.high < c1.low and c2.is_bear and c2.body > (c1.body + c3.body)/2:
                fvg_top, fvg_bottom = c1.low, c3.high
                curr = candles[-1]
                if fvg_bottom <= curr.close <= fvg_top or abs(curr.close - fvg_top) < 0.0003:
                    mid = (fvg_top + fvg_bottom)/2
                    conf = 85 if curr.close >= mid else 75
                    return {"fvg": True, "type": "BEARISH_FVG", "signal": "PUT", "conf": conf, "reason": f"Bearish FVG {fvg_bottom:.5f}-{fvg_top:.5f} Mitigation", "zone": (fvg_bottom, fvg_top), "pa_type": "FVG Mitigation"}
        return {"fvg": False}

    def detect_premium_discount(self, candles):
        if len(candles) < 20:
            return {"zone": "EQUILIBRIUM", "bias": "BOTH"}
        recent_high = max(c.high for c in candles[-20:])
        recent_low = min(c.low for c in candles[-20:])
        curr = candles[-1].close
        range_size = recent_high - recent_low
        if range_size == 0:
            return {"zone": "EQUILIBRIUM", "bias": "BOTH"}
        # Premium = top 30% of range, Discount = bottom 30%
        premium_level = recent_low + range_size * 0.7
        discount_level = recent_low + range_size * 0.3
        if curr >= premium_level:
            return {"zone": "PREMIUM", "bias": "PUT", "reason": f"Premium Zone {curr:.5f} >= {premium_level:.5f} - Look for SELL"}
        elif curr <= discount_level:
            return {"zone": "DISCOUNT", "bias": "CALL", "reason": f"Discount Zone {curr:.5f} <= {discount_level:.5f} - Look for BUY"}
        else:
            return {"zone": "EQUILIBRIUM", "bias": "BOTH", "reason": "Equilibrium - Wait"}

    def detect_rejection(self, candles):
        if len(candles) < 12:
            return {"rejection": False}
        last = candles[-1]
        recent_high = max(c.high for c in candles[-12:-1])
        recent_low = min(c.low for c in candles[-12:-1])
        if last.upper_wick > last.body * 2.5 and last.high >= recent_high * 0.9995:
            return {"rejection": True, "type": "BEARISH_REJECTION", "signal": "PUT", "conf": 80, "reason": f"Rejection Wick at Premium {last.upper_wick/last.body:.1f}x", "pa_type": "Rejection Wick"}
        if last.lower_wick > last.body * 2.5 and last.low <= recent_low * 1.0005:
            return {"rejection": True, "type": "BULLISH_REJECTION", "signal": "CALL", "conf": 80, "reason": f"Rejection Wick at Discount {last.lower_wick/last.body:.1f}x", "pa_type": "Rejection Wick"}
        return {"rejection": False}

PriceActionFilter = SMCEngine

# Keep old name for compatibility
class QuantumEngine:
    def __init__(self):
        self.pairs = ["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"]
        self.pairs = self.pairs + [p+"OTC" for p in self.pairs]
        import random
        def _seed(pair):
            base={"EURUSD":1.085,"GBPUSD":1.275,"USDJPY":149.5,"AUDUSD":0.655,"USDCAD":1.36,"USDCHF":0.88,"NZDUSD":0.61,"EURJPY":162.2,"EURGBP":0.85,"EURAUD":1.65,"EURCAD":1.47,"GBPJPY":190.6,"GBPAUD":1.94,"GBPCAD":1.73,"AUDJPY":97.9,"AUDCAD":0.89,"CADJPY":109.9,"CHFJPY":169.8,"GBPCHF":1.12,"EURCHF":0.95,"AUDCHF":0.57,"CADCHF":0.64,"NZDJPY":91.1,"EURNZD":1.77,"GBPNZD":2.08,"AUDNZD":1.07,"NZDCAD":0.82}
            return base.get(pair,1.0)
        self.prices = {p: [_seed(p.replace("OTC","")) + random.uniform(-0.0008,0.0008) + i*0.000005 for i in range(200)] for p in self.pairs}
        self.candles = {p: self._gen_candles(self.prices[p]) for p in self.pairs}
        self.memory_file = "ghost_memory.json"
        self.memory = {}
        self.active_signals = {}
        self.last_fetch = 0
        self.pa_filter = SMCEngine()
        self.pa_enabled = True
    
    def _gen_candles(self, price_list):
        import random
        candles=[]
        for i in range(len(price_list)-1):
            o = price_list[i]
            c = price_list[i+1]
            body = abs(c-o)
            upper_wick = random.uniform(0, body*1.5 + 0.0002)
            lower_wick = random.uniform(0, body*1.5 + 0.0002)
            h = max(o,c) + upper_wick
            l = min(o,c) - lower_wick
            candles.append(Candle(o,h,l,c,i))
        return candles[-100:]
    
    def _new_ticks(self):
        import time, random
        now=time.time()
        if now-self.last_fetch<0.9: return
        self.last_fetch=now
        for p in self.pairs:
            last=self.prices[p][-1]
            change=random.uniform(-0.00025,0.00025)
            if "JPY" in p: change*=100
            if "OTC" in p: change*=1.3
            self.prices[p].append(last+change)
            if len(self.prices[p])>200: self.prices[p]=self.prices[p][-200:]
            self.candles[p]=self._gen_candles(self.prices[p])
    
    def get_signal(self, pair="EURUSD", mode="SAFE"):
        import time, uuid, random
        from datetime import datetime, timedelta
        self._new_ticks()
        now=time.time()
        now_dt=datetime.now()
        clock_sec=60-now_dt.second
        if clock_sec==60: clock_sec=0
        raw_pair=pair
        pair_upper=pair.upper().replace("/","").replace(" ","").strip()
        is_otc="OTC" in raw_pair.upper()
        clean_pair=pair_upper.replace("OTC","")
        check_pair=clean_pair if clean_pair in ["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"] else pair_upper
        candles=self.candles.get(pair_upper) or self.candles.get(check_pair) or self.candles.get(check_pair+"OTC") or []
        if not candles:
            candles=self.candles.get("EURUSD",[])
        # SMC FULL
        if self.pa_enabled and len(candles)>=12:
            struct=self.pa_filter.detect_bos_choch(candles)
            liq=self.pa_filter.detect_liquidity(candles)
            ob=self.pa_filter.detect_order_block(candles)
            fvg=self.pa_filter.detect_fvg(candles)
            rej=self.pa_filter.detect_rejection(candles)
            pd=self.pa_filter.detect_premium_discount(candles)
            # Priority: Liquidity > OB/Breaker > FVG > Rejection > BOS/CHOCH
            pa_result=None
            if liq["grab"]:
                pa_result=liq
            elif ob.get("ob"):
                pa_result=ob
                # Premium/Discount filter
                if pd["zone"]=="PREMIUM" and ob["signal"]=="CALL":
                    pa_result=None # Don't buy in premium
                elif pd["zone"]=="DISCOUNT" and ob["signal"]=="PUT":
                    pa_result=None
            elif fvg.get("fvg"):
                pa_result=fvg
            elif rej["rejection"]:
                pa_result=rej
            elif struct["bos"] or struct["choch"]:
                pa_result={
                    "signal": "CALL" if struct["bias"]=="CALL" else "PUT" if struct["bias"]=="PUT" else "WAIT",
                    "conf": 84 if struct["bos"] else 78,
                    "reason": struct["reason"],
                    "pa_type": struct["structure"],
                    "structure": struct,
                    "is_trap": False
                }
            if pa_result and pa_result.get("signal","WAIT")!="WAIT" and pa_result.get("conf",0)>=70:
                # Premium/Discount check
                if pd["zone"]=="PREMIUM" and pa_result["signal"]=="CALL" and pa_result.get("pa_type")!="Liquidity Grab":
                    pa_result=None
                elif pd["zone"]=="DISCOUNT" and pa_result["signal"]=="PUT" and pa_result.get("pa_type")!="Liquidity Grab":
                    pa_result=None
            if pa_result:
                final=pa_result["signal"]
                conf=pa_result["conf"]
                reason=pa_result["reason"]
                pa_type=pa_result.get("pa_type","SMC")
                is_trap=pa_result.get("is_trap",False)
                if final!="WAIT":
                    price=self.prices.get(pair_upper, [1.0])[-1] if isinstance(self.prices.get(pair_upper), list) else self.prices.get(check_pair, [1.0])[-1]
                    if isinstance(price, list): price=price[-1]
                    expiry=int((now_dt+timedelta(seconds=clock_sec if clock_sec>0 else 60)).timestamp()*1000)
                    return {
                        "signal_id": f"{check_pair}{'-OTC' if is_otc else ''}-{final}-SMC-{uuid.uuid4().hex[:6]}",
                        "pair": check_pair,
                        "market": f"{check_pair[:3]}/{check_pair[3:]}{' OTC' if is_otc else ''}" if len(check_pair)==6 else check_pair,
                        "signal": final,
                        "direction": final,
                        "confidence": conf,
                        "reason": reason,
                        "price_action_type": pa_type,
                        "smc_type": pa_type,
                        "is_trap": is_trap,
                        "premium_discount": pd["zone"],
                        "status": "ACTIVE",
                        "price": round(price,5 if "JPY" not in check_pair else 3),
                        "expiry_timestamp": expiry,
                        "time_left": clock_sec,
                        "remainingSeconds": clock_sec,
                        "generated_at": int(now),
                        "filter": {"trend": final, "pa_type": pa_type, "mode": mode, "pa_enabled": True, "smc": True},
                        "engine": f"GHOST PREMIUM SMC - {pa_type}",
                        "strategies": [reason, pa_type, f"{pd['zone']}", f"Structure: {struct['structure']}"],
                        "timestamp": int(now),
                        "risk_percent": 1
                    }
        # Fallback momentum
        if len(candles)>=2:
            last=candles[-1]
            prev=candles[-2]
            final="CALL" if last.close>prev.close else "PUT"
            price=self.prices.get(pair_upper, [1.0])[-1]
            if isinstance(price, list): price=price[-1]
            expiry=int((now_dt+timedelta(seconds=clock_sec if clock_sec>0 else 60)).timestamp()*1000)
            return {
                "signal_id": f"{check_pair}{'-OTC' if is_otc else ''}-{final}-MOM-{uuid.uuid4().hex[:6]}",
                "pair": check_pair,
                "market": f"{check_pair[:3]}/{check_pair[3:]}{' OTC' if is_otc else ''}" if len(check_pair)==6 else check_pair,
                "signal": final,
                "direction": final,
                "confidence": 65,
                "reason": f"Momentum {prev.close:.5f}->{last.close:.5f}",
                "price_action_type": "Momentum",
                "is_trap": False,
                "status": "ACTIVE",
                "price": round(price,5 if "JPY" not in check_pair else 3),
                "expiry_timestamp": expiry,
                "time_left": clock_sec,
                "remainingSeconds": clock_sec,
                "generated_at": int(now),
                "filter": {"trend": final, "mode": mode},
                "engine": "GHOST PREMIUM SMC - Momentum",
                "strategies": ["Momentum"],
                "timestamp": int(now),
                "risk_percent": 1
            }
        return {
            "signal_id": f"WAIT-{int(now)}",
            "signal": "WAIT",
            "status": "WAITING",
            "market": f"{check_pair[:3]}/{check_pair[3:]}" if len(check_pair)==6 else check_pair,
            "pair": check_pair,
            "direction": "WAIT",
            "confidence": 0,
            "reason": "No SMC signal",
            "price_action_type": "None",
            "is_trap": False,
            "expiry_timestamp": int((now_dt+timedelta(seconds=clock_sec if clock_sec>0 else 60)).timestamp()*1000),
            "time_left": clock_sec,
            "remainingSeconds": clock_sec
        }

    def calc_signal(self, override_mode=None, pair="EURUSD"):
        return self.get_signal(pair, override_mode or "SAFE")

signal_engine=QuantumEngine()
