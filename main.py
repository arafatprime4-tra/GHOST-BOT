import os, threading, logging
from flask import Flask, send_from_directory, jsonify
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, CallbackQueryHandler, ContextTypes, filters

try:
    from quotex_api import signal_engine
except:
    class Dummy:
        def calc_signal(self):
            return {"signal":"WAIT","price":0,"strategies":["WAIT - Loading..."],"filter":{"trend":"SIDEWAYS","rsi":50,"time_left":60}}
    signal_engine = Dummy()

logging.basicConfig(level=logging.INFO)
BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID","0"))
AFFILIATE_LINK = os.getenv("AFFILIATE_LINK","https://broker-qx.pro/sign-up/?lid=2384783")
WEBSITE_URL = os.getenv("WEBSITE_URL","https://giogram-backend.onrender.com/")
CHANNEL_LINK = os.getenv("CHANNEL_LINK","https://t.me/premierghos")

flask_app = Flask(__name__, static_folder='.', static_url_path='')
@flask_app.route('/')
def home(): return send_from_directory('.', 'index.html')
@flask_app.route('/<path:path>')
def serve_static(path): return send_from_directory('.', path)
@flask_app.route('/api/signal')
def api_signal():
    try: return jsonify(signal_engine.calc_signal())
    except Exception as e: return jsonify({"signal":"ERROR","error":str(e)})
@flask_app.route('/health')
def health(): return "GHOST Running 24/7"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    name = update.effective_user.first_name or "Trader"
    kb = [
        [InlineKeyboardButton("🔗 Create QX Account - FREE BOT", url=AFFILIATE_LINK)],
        [InlineKeyboardButton("🌐 Website - 1 Click Copy", url=WEBSITE_URL if WEBSITE_URL else AFFILIATE_LINK)],
        [InlineKeyboardButton("📡 LIVE SIGNAL", callback_data="live"), InlineKeyboardButton("❓ Get ID?", callback_data="how_id")],
        [InlineKeyboardButton("📊 Strategies", callback_data="strat"), InlineKeyboardButton("🛡️ Filters", callback_data="filt")],
        [InlineKeyboardButton("⏱️ 1MIN Mode", callback_data="mode"), InlineKeyboardButton("💎 Premium Info", callback_data="prem")],
        [InlineKeyboardButton("💬 Join Channel", url=CHANNEL_LINK), InlineKeyboardButton("👨‍💼 Admin", url="https://t.me/ghostsupportbd")]
    ]
    welcome = (
        f"┏━━━━━━━━━━━━━━━┓\n"
        f"┃  👻 *GHOST*  ┃\n"
        f"┃   *PREMIUM BOT*   ┃\n"
        f"┗━━━━━━━━━━━━━━━┛\n\n"
        f"Assalamu Alaikum, *UOR MEMBERS* 👋\n\n"
        f"⚙️ *5 STRATEGY + 4 FILTER ENGINE*\n"
        f"⏱️ *100% FREE*\n"
        f"━━━━━━━━━━━━━━━━\n\n"
    
        f"Niche button e click koro,\n"
        f"ar Trader ID pathao approve er jonno!\n\n"
        f"🎁 *Approve hole paba:*\n"
        f"• Bookmarklet Bot\n"
        f"• Live API + Website\n"
        f"• Lifetime Free Access"
    )
    await update.message.reply_text(welcome, reply_markup=InlineKeyboardMarkup(kb), parse_mode='Markdown')

async def handle_id(update: Update, context: ContextTypes.DEFAULT_TYPE):
    trader_id = update.message.text.strip()
    if len(trader_id)<4:
        await update.message.reply_text("❌ *Valid Trader ID dao*", parse_mode='Markdown'); return
    await update.message.reply_text(f"✅ *ID Received:* `{trader_id}`\n⏳ Admin check korche, 2 min wait koro...", parse_mode='Markdown')
    try:
        kb = [[InlineKeyboardButton("✅ Approve", callback_data=f"ap_{update.effective_user.id}"), InlineKeyboardButton("❌ Reject", callback_data=f"rj_{update.effective_user.id}")]]
        await context.bot.send_message(chat_id=ADMIN_ID, text=f"🆕 *New ID*\nID: {trader_id}\nUser: @{update.effective_user.username}\nName: {update.effective_user.first_name}\nUID: {update.effective_user.id}", reply_markup=InlineKeyboardMarkup(kb), parse_mode='Markdown')
    except: pass

async def callbacks(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query; await q.answer(); data = q.data
    if data == "how_id":
        await q.message.reply_text("❓ *HOW TO GET ID?*\n\n1️⃣ Create Account button e click\n2️⃣ QX e sign up\n3️⃣ Profile > Trader ID copy\n4️⃣ Ekhane paste koro\n\n⚠️ Affiliate link chara approve hobe na!", parse_mode='Markdown')
    elif data == "strat":
        await q.message.reply_text("📊 *5 STRATEGY ENGINE*\n\n1️⃣ *RSI + EMA Crossover* - EMA20>50 + RSI 35-66\n2️⃣ *S/R Breakout* - 20 candle high/low break\n3️⃣ *Engulfing + Pin Bar* - Candle pattern\n4️⃣ *MACD + Volume* - MACD cross + 1.2x volume\n5️⃣ *Bollinger Reversal* - Price far from EMA20\n\nSob 5 ta miliye score kore signal dey!", parse_mode='Markdown')
    elif data == "filt":
        await q.message.reply_text("🛡️ *4 STEP PRO FILTER*\n\n1️⃣ *Trend Filter* - EMA50/200 diye trend check, against trend e weak signal block\n2️⃣ *RSI Filter* - 70 overbought / 30 oversold e no trade\n3️⃣ *News Filter* - 12:30-12:40 & 18:30-18:40 UTC news time e WAIT\n4️⃣ *MM Filter* - 2% risk, No Martingale, Signal only\n\nFilter tomar loss 80% komabe!", parse_mode='Markdown')
    elif data == "mode":
        await q.message.reply_text("⏱️ *1 MIN HOLD MODE*\n\n• Ekbar signal dile 60 sec hold korbe\n• Tomar 1min trade sesh na howa porjonto change hobe na\n• Time Left timer dekhabe (58s, 45s...)\n• 60 sec por auto new signal\n\n1min trader der jonno perfect stable!", parse_mode='Markdown')
    elif data == "prem":
        await q.message.reply_text("💎 *PREMIUM FREE INFO*\n\n✅ 100% FREE - No sell\n✅ 5 Strategy + 4 Filter\n✅ 1MIN Hold stable\n✅ Live API + Bookmarklet\n✅ Website 1-click copy\n✅ Lifetime access\n\nAffiliate link diye account khullei free!", parse_mode='Markdown')
    elif data == "live":
        try:
            s = signal_engine.calc_signal(); sig = s.get('signal','WAIT'); price = s.get('price','-'); strats = "\n".join([f"• {x}" for x in s.get('strategies',[])])
            f = s.get('filter',{}); trend = f.get('trend','-'); rsi = f.get('rsi','-'); tl = f.get('time_left',60); score = f.get('score',0)
            emoji = "🟢" if sig=="BUY" else "🔴" if sig=="SELL" else "⏳"
            await q.message.reply_text(f"📡 *LIVE PRO MAX*\n\n{emoji} *{sig}*\n💰 {price} | 📊 {trend} | RSI {rsi}\n⏱️ {tl}s left | Score {score}\n\n🧠\n{strats}\n\n🔗 {WEBSITE_URL}/api/signal", parse_mode='Markdown')
        except Exception as e:
            await q.message.reply_text(f"Error: {e}")
    elif data.startswith("ap_"):
        uid = data.split("_")[1]
        try:
            await context.bot.send_message(chat_id=int(uid), text=f"🎉 *APPROVED!*\n\n🌐 {WEBSITE_URL}\n📡 {WEBSITE_URL}/api/signal", parse_mode='Markdown')
            await q.edit_message_text("✅ Approved")
        except: await q.edit_message_text("Approved")
    elif data.startswith("rj_"):
        uid = data.split("_")[1]
        try:
            await context.bot.send_message(chat_id=int(uid), text="❌ Rejected - Affiliate link diye new account khulo")
            await q.edit_message_text("❌ Rejected")
        except: await q.edit_message_text("Rejected")

def run_flask():
    port = int(os.environ.get("PORT", 10000)); flask_app.run(host="0.0.0.0", port=port)
def run_bot():
    if not BOT_TOKEN: return
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_id))
    app.add_handler(CallbackQueryHandler(callbacks))
    app.run_polling()
if __name__ == "__main__":
    threading.Thread(target=run_flask, daemon=True).start()
    run_bot()
