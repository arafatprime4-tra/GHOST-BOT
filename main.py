import os, threading, logging
from flask import Flask, send_from_directory, jsonify
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, CallbackQueryHandler, ContextTypes, filters

try:
    from quotex_api import signal_engine
except Exception as e:
    print(f"quotex_api import failed: {e}, using dummy")
    class Dummy:
        def calc_signal(self):
            return {"signal":"WAIT","price":0,"strategies":["Demo Mode"],"filter":{"trend":"WAIT","rsi":50}}
    signal_engine = Dummy()

logging.basicConfig(level=logging.INFO)
BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID","0") or "0")
AFFILIATE_LINK = os.getenv("AFFILIATE_LINK","")
WEBSITE_URL = os.getenv("WEBSITE_URL","")
CHANNEL_LINK = os.getenv("CHANNEL_LINK","https://t.me/premierghos")

flask_app = Flask(__name__, static_folder='.', static_url_path='')

@flask_app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@flask_app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@flask_app.route('/api/signal')
def api_signal():
    try:
        data = signal_engine.calc_signal()
        return jsonify(data)
    except Exception as e:
        return jsonify({"signal":"ERROR","error":str(e)})

@flask_app.route('/health')
def health():
    return "GHOST Running 24/7"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    kb = [
        [InlineKeyboardButton("🔗 Create QX Account", url=AFFILIATE_LINK)],
        [InlineKeyboardButton("🌐 Open Website", url=WEBSITE_URL if WEBSITE_URL else AFFILIATE_LINK)],
        [InlineKeyboardButton("📡 Live Signal Check", callback_data="live")],
        [InlineKeyboardButton("❓ How to get ID?", callback_data="how_id")],
        [InlineKeyboardButton("💬 Join Channel", url=CHANNEL_LINK)]
    ]
    text = (
        "👻 *GHOST - PREMIUM BOT*\n\n"
        "✅ 5 Strategy Engine + 4 Step Filter\n"
        "📊 EMA + RSI + MACD + BB + Candle Pattern\n\n"
        "👇 Trader ID pathao, approve hole free bot paba!"
    )
    await update.message.reply_text(text, reply_markup=InlineKeyboardMarkup(kb), parse_mode='Markdown')

async def handle_id(update: Update, context: ContextTypes.DEFAULT_TYPE):
    trader_id = update.message.text.strip()
    if len(trader_id)<4:
        await update.message.reply_text("❌ Valid Trader ID dao")
        return
    await update.message.reply_text(f"✅ ID Received: `{trader_id}`\nAdmin check korche, wait koro...", parse_mode='Markdown')
    try:
        kb = [
            [InlineKeyboardButton("✅ Approve", callback_data=f"ap_{update.effective_user.id}"),
             InlineKeyboardButton("❌ Reject", callback_data=f"rj_{update.effective_user.id}")]
        ]
        await context.bot.send_message(
            chat_id=ADMIN_ID,
            text=f"🆕 New ID Request\n\nID: {trader_id}\nUser: @{update.effective_user.username}\nName: {update.effective_user.first_name}\nUID: {update.effective_user.id}",
            reply_markup=InlineKeyboardMarkup(kb)
        )
    except Exception as e:
        logging.error(f"Admin send error: {e}")

async def callbacks(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query
    await q.answer()
    data = q.data
    if data == "how_id":
        await q.message.reply_text(
            "📖 *ID kivabe paba?*\n\n"
            "1. Affiliate link diye QX account khulo\n"
            "2. Quotex > Profile > Trader ID copy koro\n"
            "3. Ekhane paste koro",
            parse_mode='Markdown'
        )
    elif data == "live":
        s = signal_engine.calc_signal()
        msg = f"📡 *LIVE PRO SIGNAL*\n\nSignal: *{s.get('signal')}*\nPrice: {s.get('price')}\nStrategies: {', '.join(s.get('strategies',[]))}\nTrend: {s.get('filter',{}).get('trend')} RSI:{s.get('filter',{}).get('rsi')}"
        await q.message.reply_text(msg, parse_mode='Markdown')
    elif data.startswith("ap_"):
        uid = data.split("_")[1]
        try:
            await context.bot.send_message(
                chat_id=int(uid),
                text=f"🎉 *Approved!*\n\nWebsite: {WEBSITE_URL}\nLive API: {WEBSITE_URL}/api/signal\n\nBookmarklet website theke 1-click copy koro!",
                parse_mode='Markdown'
            )
            await q.edit_message_text("✅ Approved & User Notified")
        except Exception as e:
            await q.edit_message_text(f"Approved but send failed: {e}")
    elif data.startswith("rj_"):
        uid = data.split("_")[1]
        try:
            await context.bot.send_message(chat_id=int(uid), text="❌ Reject. Affiliate link diye new account khulo, tarpor ID pathao.")
            await q.edit_message_text("❌ Rejected")
        except:
            await q.edit_message_text("Rejected")

def run_flask():
    port = int(os.environ.get("PORT", 10000))
    flask_app.run(host="0.0.0.0", port=port)

def run_bot():
    if not BOT_TOKEN:
        logging.error("BOT_TOKEN missing!")
        return
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_id))
    app.add_handler(CallbackQueryHandler(callbacks))
    logging.info("Bot polling started...")
    app.run_polling()

if __name__ == "__main__":
    threading.Thread(target=run_flask, daemon=True).start()
    run_bot()
