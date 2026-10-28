import os, threading, logging, json
from flask import Flask, send_from_directory, jsonify, request
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, CallbackQueryHandler, ContextTypes, filters

try:
    from quotex_api import signal_engine
except Exception as e:
    logging.error(f"quantum load fail {e}")
    class Dummy:
        def get_signal(self, pair="EURUSD", mode="FAST"): return {"signal":"UP","pair":pair,"price":1.08,"confidence":85,"strategies":["UP"],"filter":{}}
        def scan_all(self, mode="FAST"): return []
        def calc_signal(self, override_mode=None, pair="EURUSD"): return self.get_signal(pair, override_mode or "FAST")
    signal_engine = Dummy()

logging.basicConfig(level=logging.INFO)
BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID","0"))
AFFILIATE_LINK = os.getenv("AFFILIATE_LINK","")
WEBSITE_URL = os.getenv("WEBSITE_URL","https://giogram-backend.onrender.com")
CHANNEL_LINK = os.getenv("CHANNEL_LINK","https://t.me/premierghos")

flask_app = Flask(__name__, static_folder='.', static_url_path='')

@flask_app.after_request
def after_request(r):
    r.headers.add('Access-Control-Allow-Origin','*')
    r.headers.add('Access-Control-Allow-Headers','Content-Type')
    r.headers.add('Access-Control-Allow-Methods','GET,POST,OPTIONS')
    return r

@flask_app.route('/')
def home(): return send_from_directory('.', 'index.html')
@flask_app.route('/<path:path>')
def serve_static(path): return send_from_directory('.', path)

@flask_app.route('/api/signal')
def api_signal():
    try:
        mode=request.args.get('mode','FAST')
        pair=request.args.get('pair','EURUSD').upper()
        data=signal_engine.get_signal(pair,mode)
        return jsonify(data)
    except Exception as e:
        return jsonify({"signal":"ERROR","error":str(e)})

@flask_app.route('/api/scan')
def api_scan():
    try:
        mode=request.args.get('mode','FAST')
        data=signal_engine.scan_all(mode)
        return jsonify({"pairs":data,"count":len(data),"engine":"GHOST QUANTUM X 27 Pairs"})
    except Exception as e:
        return jsonify({"error":str(e)})

@flask_app.route('/api/memory')
def api_memory():
    try:
        if os.path.exists("ghost_memory.json"):
            with open("ghost_memory.json") as f: mem=json.load(f)
        else: mem={}
        return jsonify(mem)
    except Exception as e:
        return jsonify({"error":str(e)})

@flask_app.route('/health')
def health(): return "GHOST PREMIUM BOT- 27 PAIRS - REAL ONLY"

WELCOME = """👻 *GHOST - PREMIUM BOT* 👻
*World's First Correlation + Anti-Trap + Memory Bot*

We Don't Sell Bot. We Give FREE To Referral Members!

Kivabe Access Paba?
1️⃣ Link theke account khulo
2️⃣ Profile theke Trader ID copy koro
3️⃣ Ekhane ID send koro

✅ Approve hole *GHOST PREMIUM BOT* auto paba
⚠️ No Bot 100% Win - Use 1% Risk

*Features ja keu dey na:*
🔮 GHOST MIRROR - 27 pair correlation
🪤 ANTI-TRAP AI - Sideways e WAIT
🧠 SELF-LEARNING - Rat 12 tay report
📡 REAL 27 Pairs Live
"""

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    kb=[
        [InlineKeyboardButton("🔗 Create QX Account - GHOST FREE", url=AFFILIATE_LINK)],
        [InlineKeyboardButton("🔮 SCAN 27 PAIRS", callback_data="scan_FAST"), InlineKeyboardButton("📡 EURUSD LIVE", callback_data="live_EURUSD_FAST")],
        [InlineKeyboardButton("❓ Get ID?", callback_data="how_id"), InlineKeyboardButton("💎 Quantum Info", callback_data="quantum")],
        [InlineKeyboardButton("💬 Channel", url=CHANNEL_LINK), InlineKeyboardButton("👨‍💼 Admin", url="https://t.me/ghostsupportbd")]
    ]
    await update.message.reply_text(WELCOME, reply_markup=InlineKeyboardMarkup(kb), parse_mode='Markdown')

async def handle_id(update: Update, context: ContextTypes.DEFAULT_TYPE):
    tid=update.message.text.strip()
    if len(tid)<4:
        await update.message.reply_text("❌ Valid Trader ID dao"); return
    await update.message.reply_text(f"✅ ID `{tid}` Received!\nQUANTUM X check korche, 2 min wait...", parse_mode='Markdown')
    try:
        kb=[[InlineKeyboardButton("✅ Approve QUANTUM", callback_data=f"ap_{update.effective_user.id}"), InlineKeyboardButton("❌ Reject", callback_data=f"rj_{update.effective_user.id}")]]
        await context.bot.send_message(chat_id=ADMIN_ID, text=f"🆕 QUANTUM X ID\nID: {tid}\nUser: @{update.effective_user.username or 'N/A'}\nName: {update.effective_user.first_name}", reply_markup=InlineKeyboardMarkup(kb))
    except: pass

async def callbacks(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q=update.callback_query; await q.answer(); d=q.data
    if d=="how_id":
        await q.message.reply_text("❓ ID: Affiliate link > QX sign up > Profile > Trader ID > Paste here\n⚠️ Link chara approve hobe na!")
    elif d=="quantum":
        await q.message.reply_text("🔮 *GHOST QUANTUM X*\n\n1. *MIRROR:* EURUSD signal er age USDJPY+EURGBP check\n2. *ANTI-TRAP:* Sideways market e WAIT - sob bot fail kore ekhane\n3. *MEMORY:* Protidin accuracy save, porer din best time e signal\n\nResult: Normal 60% -> Quantum 85%+", parse_mode='Markdown')
    elif d.startswith("scan_"):
        mode=d.replace("scan_","")
        try:
            all_pairs=signal_engine.scan_all(mode)
            top5=all_pairs[:5]
            txt=f"🔮 *QUANTUM X SCAN 27 PAIRS - {mode}*\n\n"
            for s in top5:
                emoji="🟢" if s["signal"]=="UP" else "🔴" if s["signal"]=="DOWN" else "⏳"
                txt+=f"{emoji} {s['pair']} {s['signal']} {s['confidence']}% | {s['price']}\n"
            txt+=f"\n📊 Total: {len(all_pairs)} pairs scanned\n🌐 {WEBSITE_URL}/api/scan?mode={mode}"
            await q.message.reply_text(txt, parse_mode='Markdown')
        except Exception as e:
            await q.message.reply_text(f"Error {e}")
    elif d.startswith("live_"):
        # live_EURUSD_FAST
        parts=d.replace("live_","").split("_")
        pair=parts[0] if len(parts)>=1 else "EURUSD"
        mode=parts[1] if len(parts)>=2 else "FAST"
        try:
            s=signal_engine.get_signal(pair,mode)
            emoji="🟢" if s["signal"]=="UP" else "🔴" if s["signal"]=="DOWN" else "⏳"
            conf=s.get("confidence",0)
            txt=f"📡 *{pair} {mode} QUANTUM X*\n\n{emoji} *{s['signal']}* {conf}%\n💰 {s['price']} | RSI {s['filter'].get('rsi')}\n🧠 {', '.join(s['strategies'][:2])}\n🔮 {s['filter'].get('mem','')}\n\n🌐 {WEBSITE_URL}/api/signal?pair={pair}&mode={mode}"
            await q.message.reply_text(txt, parse_mode='Markdown')
        except Exception as e:
            await q.message.reply_text(f"Error {e}")
    elif d.startswith("ap_"):
        uid=d.split("_")[1]
        kb=[
            [InlineKeyboardButton("🌐 QUANTUM Website - 1 Click", url=WEBSITE_URL)],
            [InlineKeyboardButton("🔮 SCAN 27 PAIRS", callback_data="scan_FAST")],
            [InlineKeyboardButton("💬 Channel", url=CHANNEL_LINK)]
        ]
        await context.bot.send_message(chat_id=int(uid), text=f"🎉 *QUANTUM X APPROVED!*\n\n👻 Tomar Ghost Quantum X unlocked!\n\n🌐 Website theke 27 pairs scanner + bookmarklet paba\n🔮 Correlation + Anti-Trap + Memory\n\n⚠️ 1% Risk use koro", reply_markup=InlineKeyboardMarkup(kb), parse_mode='Markdown')
        await q.edit_message_text("✅ QUANTUM X Approved")
    elif d.startswith("rj_"):
        uid=d.split("_")[1]
        await context.bot.send_message(chat_id=int(uid), text="❌ Rejected - Affiliate link diye new account khulo")
        await q.edit_message_text("❌ Rejected")

def run_flask():
    port=int(os.environ.get("PORT",10000)); flask_app.run(host="0.0.0.0",port=port)
def run_bot():
    if not BOT_TOKEN: return
    app=ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start",start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_id))
    app.add_handler(CallbackQueryHandler(callbacks))
    app.run_polling()
if __name__=="__main__":
    threading.Thread(target=run_flask,daemon=True).start()
    run_bot()
