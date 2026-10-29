
import os, random, time, json, uuid
from datetime import datetime, timedelta
from typing import List, Dict, Tuple

REAL_MARKET_PAIRS = [
    "EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD",
    "EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD",
    "AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF",
    "CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"
]

# ==================== PRICE ACTION FILTER - PURE OHLC ONLY ====================
# No RSI, MACD, BB - Only Open, High, Low, Close

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

class PriceActionFilter:
    """
    GHOST QUANTUM X - 4 Price Action Logics
    Pure Price Action, no indicators
    """
    
    def __init__(self):
        self.order_blocks = {}  # pair -> list of OB zones
        self.fvgs = {}  # pair -> list of FVG zones
    
    # 1. MARKET STRUCTURE FILTER - BOS & CHOCH
    def detect_market_structure(self, candles: List[Candle]) -> Dict:
        """
        Higher High + Higher Low = Only CALL
        Lower Low + Lower High = Only PUT
        Ranging = Both low conf
        BOS = Break of Structure, CHOCH = Change of Character
        """
        if len(candles) < 10:
            return {"structure": "RANGING", "bias": "BOTH", "bos": False, "choch": False, "reason": "Not enough data"}
        
        # Find swing highs and lows (last 10 candles)
        swing_highs = []
        swing_lows = []
        for i in range(2, len(candles)-2):
            # Swing high: high > prev 2 and next 2
            if candles[i].high > candles[i-1].high and candles[i].high > candles[i-2].high and \
               candles[i].high > candles[i+1].high and candles[i].high > candles[i+2].high:
                swing_highs.append((i, candles[i].high))
            # Swing low
            if candles[i].low < candles[i-1].low and candles[i].low < candles[i-2].low and \
               candles[i].low < candles[i+1].low and candles[i].low < candles[i+2].low:
                swing_lows.append((i, candles[i].low))
        
        if len(swing_highs) < 2 or len(swing_lows) < 2:
            return {"structure": "RANGING", "bias": "BOTH", "bos": False, "choch": False, "reason": "Ranging - no clear structure"}
        
        # Last 2 swing highs/lows
        last_h1, last_h2 = swing_highs[-1][1], swing_highs[-2][1]
        last_l1, last_l2 = swing_lows[-1][1], swing_lows[-2][1]
        
        # Detect HH/HL and LL/LH
        hh = last_h1 > last_h2
        hl = last_l1 > last_l2
        ll = last_l1 < last_l2
        lh = last_h1 < last_h2
        
        # BOS & CHOCH
        bos = False
        choch = False
        if hh and hl:
            bos = True
            structure = "BULLISH"
            bias = "CALL"
            reason = f"BOS Bullish HH+HL {last_h2:.5f}->{last_h1:.5f}"
        elif ll and lh:
            bos = True
            structure = "BEARISH"
            bias = "PUT"
            reason = f"BOS Bearish LL+LH {last_h2:.5f}->{last_h1:.5f}"
        else:
            # Check CHOCH - trend change
            # Previously bullish now bearish = CHOCH
            if len(swing_highs) >= 3:
                if swing_highs[-3][1] < swing_highs[-2][1] and swing_highs[-1][1] < swing_highs[-2][1]:
                    choch = True
                    structure = "CHOCH_BEARISH"
                    bias = "PUT"
                    reason = f"CHOCH Bearish fail to make HH"
                elif swing_lows[-3][1] > swing_lows[-2][1] and swing_lows[-1][1] > swing_lows[-2][1]:
                    choch = True
                    structure = "CHOCH_BULLISH"
                    bias = "CALL"
                    reason = f"CHOCH Bullish fail to make LL"
                else:
                    structure = "RANGING"
                    bias = "BOTH"
                    reason = "Ranging market"
            else:
                structure = "RANGING"
                bias = "BOTH"
                reason = "Ranging"
        
        return {
            "structure": structure,
            "bias": bias,
            "bos": bos,
            "choch": choch,
            "hh": hh, "hl": hl, "ll": ll, "lh": lh,
            "reason": reason,
            "last_high": last_h1,
            "last_low": last_l1
        }
    
    # 2. LIQUIDITY GRAB / TRAP FILTER
    def detect_liquidity_grab(self, candles: List[Candle]) -> Dict:
        """
        Sweep recent High/Low - wick beyond prev high/low and close back inside
        Top grab + rejection = Strong PUT 85%
        Bottom grab + rejection = Strong CALL 85%
        """
        if len(candles) < 6:
            return {"grab": False, "type": "NONE", "signal": "WAIT", "conf": 0, "reason": "No data"}
        
        last = candles[-1]
        prev_high = max(c.high for c in candles[-6:-1])
        prev_low = min(c.low for c in candles[-6:-1])
        
        # Top liquidity grab
        if last.high > prev_high and last.close < prev_high:
            # Rejection wick at top
            wick_ratio = last.upper_wick / (last.body + 0.00001)
            if wick_ratio > 1.5:  # Strong rejection
                return {
                    "grab": True,
                    "type": "TOP_GRAB",
                    "signal": "PUT",
                    "conf": 85,
                    "reason": f"Liquidity Grab Top {prev_high:.5f} swept, rejection wick {wick_ratio:.1f}x",
                    "is_trap": True,
                    "swept_level": prev_high
                }
        
        # Bottom liquidity grab
        if last.low < prev_low and last.close > prev_low:
            wick_ratio = last.lower_wick / (last.body + 0.00001)
            if wick_ratio > 1.5:
                return {
                    "grab": True,
                    "type": "BOTTOM_GRAB",
                    "signal": "CALL",
                    "conf": 85,
                    "reason": f"Liquidity Grab Bottom {prev_low:.5f} swept, rejection wick {wick_ratio:.1f}x",
                    "is_trap": True,
                    "swept_level": prev_low
                }
        
        return {"grab": False, "type": "NONE", "signal": "WAIT", "conf": 0, "reason": "No liquidity grab", "is_trap": False}
    
    # 3. ORDER BLOCK + FVG DETECTION
    def detect_order_block(self, candles: List[Candle], pair="EURUSD") -> Dict:
        """
        Bullish OB: Last bearish candle before strong bullish move
        Bearish OB: Last bullish candle before strong bearish move
        FVG: 3 candle gap
        """
        if len(candles) < 5:
            return {"ob": False, "fvg": False, "signal": "WAIT", "conf": 0, "reason": "No data"}
        
        # --- Order Block ---
        # Bullish OB: bearish candle -> bullish impulse (2+ bullish with big body)
        for i in range(len(candles)-4, 0, -1):
            if candles[i].is_bear:
                # Next 2 candles bullish with strong body
                if i+2 < len(candles):
                    c1, c2 = candles[i+1], candles[i+2]
                    if c1.is_bull and c2.is_bull and (c1.body + c2.body) > candles[i].body * 1.5:
                        # Bullish OB found
                        ob_high = candles[i].high
                        ob_low = candles[i].low
                        curr = candles[-1]
                        # Price returns to OB zone?
                        if ob_low <= curr.close <= ob_high or abs(curr.close - ob_low) < 0.0003:
                            return {
                                "ob": True,
                                "type": "BULLISH_OB",
                                "signal": "CALL",
                                "conf": 80,
                                "reason": f"Bullish OB Retest {ob_low:.5f}-{ob_high:.5f}",
                                "zone": (ob_low, ob_high),
                                "price_action_type": "Order Block Retest"
                            }
        
        # Bearish OB
        for i in range(len(candles)-4, 0, -1):
            if candles[i].is_bull:
                if i+2 < len(candles):
                    c1, c2 = candles[i+1], candles[i+2]
                    if c1.is_bear and c2.is_bear and (c1.body + c2.body) > candles[i].body * 1.5:
                        ob_high = candles[i].high
                        ob_low = candles[i].low
                        curr = candles[-1]
                        if ob_low <= curr.close <= ob_high or abs(curr.close - ob_high) < 0.0003:
                            return {
                                "ob": True,
                                "type": "BEARISH_OB",
                                "signal": "PUT",
                                "conf": 80,
                                "reason": f"Bearish OB Retest {ob_low:.5f}-{ob_high:.5f}",
                                "zone": (ob_low, ob_high),
                                "price_action_type": "Order Block Retest"
                            }
        
        # --- FVG Detection ---
        for i in range(1, len(candles)-1):
            c1, c2, c3 = candles[i-1], candles[i], candles[i+1]
            # Bullish FVG: c3.low > c1.high (gap)
            if c3.low > c1.high:
                fvg_top = c3.low
                fvg_bottom = c1.high
                curr = candles[-1]
                if fvg_bottom <= curr.close <= fvg_top or abs(curr.close - fvg_bottom) < 0.0002:
                    return {
                        "fvg": True,
                        "type": "BULLISH_FVG",
                        "signal": "CALL",
                        "conf": 75,
                        "reason": f"Bullish FVG Fill {fvg_bottom:.5f}-{fvg_top:.5f}",
                        "zone": (fvg_bottom, fvg_top),
                        "price_action_type": "FVG Fill"
                    }
            # Bearish FVG: c3.high < c1.low
            if c3.high < c1.low:
                fvg_top = c1.low
                fvg_bottom = c3.high
                curr = candles[-1]
                if fvg_bottom <= curr.close <= fvg_top or abs(curr.close - fvg_top) < 0.0002:
                    return {
                        "fvg": True,
                        "type": "BEARISH_FVG",
                        "signal": "PUT",
                        "conf": 75,
                        "reason": f"Bearish FVG Fill {fvg_bottom:.5f}-{fvg_top:.5f}",
                        "zone": (fvg_bottom, fvg_top),
                        "price_action_type": "FVG Fill"
                    }
        
        return {"ob": False, "fvg": False, "signal": "WAIT", "conf": 0, "reason": "No OB/FVG"}
    
    # 4. REJECTION WICK CONFIRMATION
    def detect_rejection_wick(self, candles: List[Candle]) -> Dict:
        """
        Wick 2.5x larger than body at Resistance = PUT
        Wick 2.5x larger than body at Support = CALL
        """
        if len(candles) < 10:
            return {"rejection": False, "signal": "WAIT", "conf": 0}
        
        last = candles[-1]
        # Recent high/low as S/R
        recent_high = max(c.high for c in candles[-10:-1])
        recent_low = min(c.low for c in candles[-10:-1])
        
        # Upper wick 2.5x body at resistance
        if last.upper_wick > last.body * 2.5:
            # At resistance?
            if last.high >= recent_high * 0.9995:  # Near resistance
                return {
                    "rejection": True,
                    "type": "UPPER_REJECTION",
                    "signal": "PUT",
                    "conf": 78,
                    "reason": f"Rejection Wick at Resistance {last.upper_wick/last.body:.1f}x body",
                    "wick_ratio": last.upper_wick / (last.body+0.00001),
                    "price_action_type": "Rejection Wick"
                }
        
        # Lower wick 2.5x body at support
        if last.lower_wick > last.body * 2.5:
            if last.low <= recent_low * 1.0005:  # Near support
                return {
                    "rejection": True,
                    "type": "LOWER_REJECTION",
                    "signal": "CALL",
                    "conf": 78,
                    "reason": f"Rejection Wick at Support {last.lower_wick/last.body:.1f}x body",
                    "wick_ratio": last.lower_wick / (last.body+0.00001),
                    "price_action_type": "Rejection Wick"
                }
        
        return {"rejection": False, "signal": "WAIT", "conf": 0, "reason": "No rejection wick"}

# ==================== QUANTUM ENGINE WITH PA FILTER ====================

class QuantumEngine:
    def __init__(self):
        self.pairs = REAL_MARKET_PAIRS + [p+"OTC" for p in REAL_MARKET_PAIRS]
        self.prices = {p: [self._seed(p.replace("OTC","")) + random.uniform(-0.0008,0.0008) + i*0.000005 for i in range(200)] for p in self.pairs}
        # Generate OHLC from prices
        self.candles = {p: self._gen_candles(self.prices[p]) for p in self.pairs}
        self.memory_file = "ghost_memory.json"
        self.memory = {}
        self.active_signals = {}
        self.last_fetch = 0
        self.pa_filter = PriceActionFilter()
        self.pa_enabled = True  # Toggle
    
    def _seed(self, pair):
        base={"EURUSD":1.085,"GBPUSD":1.275,"USDJPY":149.5,"AUDUSD":0.655,"USDCAD":1.36,"USDCHF":0.88,"NZDUSD":0.61,"EURJPY":162.2,"EURGBP":0.85,"EURAUD":1.65,"EURCAD":1.47,"GBPJPY":190.6,"GBPAUD":1.94,"GBPCAD":1.73,"AUDJPY":97.9,"AUDCAD":0.89,"CADJPY":109.9,"CHFJPY":169.8,"GBPCHF":1.12,"EURCHF":0.95,"AUDCHF":0.57,"CADCHF":0.64,"NZDJPY":91.1,"EURNZD":1.77,"GBPNZD":2.08,"AUDNZD":1.07,"NZDCAD":0.82}
        return base.get(pair,1.0)
    
    def _gen_candles(self, price_list):
        candles=[]
        for i in range(len(price_list)-1):
            o = price_list[i]
            c = price_list[i+1]
            # Generate realistic wicks
            body = abs(c-o)
            upper_wick = random.uniform(0, body*1.5 + 0.0002)
            lower_wick = random.uniform(0, body*1.5 + 0.0002)
            h = max(o,c) + upper_wick
            l = min(o,c) - lower_wick
            candles.append(Candle(o,h,l,c,i))
        return candles[-100:]  # last 100 candles
    
    def _new_ticks(self):
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
        self._new_ticks()
        now=time.time()
        now_dt=datetime.now()
        clock_sec=60-now_dt.second
        if clock_sec==60: clock_sec=0
        
        raw_pair=pair
        pair_upper=pair.upper().replace("/","").replace(" ","").strip()
        is_otc="OTC" in raw_pair.upper()
        clean_pair=pair_upper.replace("OTC","")
        check_pair=clean_pair if clean_pair in REAL_MARKET_PAIRS else pair_upper
        
        # Get candles for PA
        candles=self.candles.get(pair_upper) or self.candles.get(check_pair) or self.candles.get(check_pair+"OTC") or []
        if not candles:
            candles=self.candles.get("EURUSD",[])
        
        # ===== PRICE ACTION FILTER (NEW LAYER) =====
        pa_result=None
        if self.pa_enabled and len(candles)>=10:
            struct=self.pa_filter.detect_market_structure(candles)
            liq=self.pa_filter.detect_liquidity_grab(candles)
            ob_fvg=self.pa_filter.detect_order_block(candles, check_pair)
            rej=self.pa_filter.detect_rejection_wick(candles)
            
            # Priority: Liquidity Grab > OB/FVG > Rejection > Structure
            if liq["grab"]:
                pa_result=liq
                pa_result["price_action_type"]="Liquidity Grab"
            elif ob_fvg.get("ob") or ob_fvg.get("fvg"):
                pa_result=ob_fvg
            elif rej["rejection"]:
                pa_result=rej
            elif struct["bos"] or struct["choch"]:
                pa_result={
                    "signal": "CALL" if struct["bias"]=="CALL" else "PUT" if struct["bias"]=="PUT" else "WAIT",
                    "conf": 82 if struct["bos"] else 75,
                    "reason": struct["reason"],
                    "price_action_type": f"{struct['structure']} - {struct['reason']}",
                    "structure": struct,
                    "is_trap": False
                }
            else:
                # Ranging - low conf but still signal
                pa_result={
                    "signal": "CALL" if candles[-1].is_bull else "PUT",
                    "conf": 60,
                    "reason": struct["reason"],
                    "price_action_type": "Ranging",
                    "structure": struct,
                    "is_trap": False
                }
        
        # If PA gives strong signal (>=75%), use it
        if pa_result and pa_result.get("conf",0)>=70:
            final=pa_result["signal"]
            conf=pa_result["conf"]
            reason=pa_result["reason"]
            pa_type=pa_result.get("price_action_type","Price Action")
            is_trap=pa_result.get("is_trap",False)
            
            # Structure filter: only allow CALL in bullish structure, PUT in bearish
            if pa_result.get("structure"):
                bias=pa_result["structure"]["bias"]
                if bias=="CALL" and final=="PUT":
                    final="WAIT"
                    conf=0
                elif bias=="PUT" and final=="CALL":
                    final="WAIT"
                    conf=0
            
            if final!="WAIT":
                price=self.prices.get(pair_upper, [1.0])[-1] if isinstance(self.prices.get(pair_upper), list) else self.prices.get(check_pair, [1.0])[-1]
                if isinstance(price, list): price=price[-1]
                expiry=int((now_dt+timedelta(seconds=clock_sec if clock_sec>0 else 60)).timestamp()*1000)
                return {
                    "signal_id": f"{check_pair}{'-OTC' if is_otc else ''}-{final}-PA-{uuid.uuid4().hex[:6]}",
                    "pair": check_pair,
                    "market": f"{check_pair[:3]}/{check_pair[3:]}{' OTC' if is_otc else ''}" if len(check_pair)==6 else check_pair,
                    "signal": final,
                    "direction": final,
                    "confidence": conf,
                    "reason": reason,
                    "price_action_type": pa_type,
                    "is_trap": is_trap,
                    "status": "ACTIVE",
                    "price": round(price,5 if "JPY" not in check_pair else 3),
                    "expiry_timestamp": expiry,
                    "time_left": clock_sec,
                    "remainingSeconds": clock_sec,
                    "generated_at": int(now),
                    "filter": {"trend": final, "pa_type": pa_type, "mode": mode, "pa_enabled": True},
                    "engine": f"GHOST QUANTUM X - {pa_type}",
                    "strategies": [reason, pa_type, f"Structure: {pa_result.get('structure',{}).get('structure','N/A')}"],
                    "timestamp": int(now),
                    "risk_percent": 1
                }
        
        # ===== FALLBACK TO OLD LOGIC IF PA NOT STRONG =====
        # Simple momentum fallback - never WAIT forever
        if len(candles)>=2:
            last=candles[-1]
            prev=candles[-2]
            if last.close>prev.close:
                final="CALL"
            else:
                final="PUT"
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
                "engine": "GHOST QUANTUM X - Momentum Fallback",
                "strategies": ["Momentum"],
                "timestamp": int(now),
                "risk_percent": 1
            }
        
        # Ultimate fallback
        return {
            "signal_id": f"WAIT-{int(now)}",
            "signal": "WAIT",
            "status": "WAITING",
            "market": f"{check_pair[:3]}/{check_pair[3:]}" if len(check_pair)==6 else check_pair,
            "pair": check_pair,
            "direction": "WAIT",
            "confidence": 0,
            "reason": "No PA signal",
            "price_action_type": "None",
            "is_trap": False,
            "expiry_timestamp": int((now_dt+timedelta(seconds=clock_sec if clock_sec>0 else 60)).timestamp()*1000),
            "time_left": clock_sec,
            "remainingSeconds": clock_sec
        }

signal_engine=QuantumEngine()
signal_engine.calc_signal = lambda override_mode=None, pair="EURUSD": signal_engine.get_signal(pair, override_mode or "SAFE")
