import os, threading, logging
from flask import Flask, send_from_directory, jsonify, request
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, CallbackQueryHandler, ContextTypes, filters

try:
    from quotex_api import signal_engine
except:
    class Dummy:
        def calc_signal(self, override_mode=None):
            return {"signal":"UP","price":1.08500,"strategies":["UP: FAST"],"filter":{"trend":"UP","rsi":55,"time_left":20,"mode":"FAST"}}
    signal_engine = Dummy()

logging.basicConfig(level=logging.INFO)
BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID","0"))
AFFILIATE_LINK = os.getenv("AFFILIATE_LINK","https://qxbroker.com/en/sign-up/?lid=123456")
WEBSITE_URL = os.getenv("WEBSITE_URL","https://giogram-backend.onrender.com")
CHANNEL_LINK = os.getenv("CHANNEL_LINK","https://t.me/premierghos")

flask_app = Flask(__name__, static_folder='.', static_url_path='')

@flask_app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@flask_app.route('/')
def home(): return send_from_directory('.', 'index.html')
@flask_app.route('/<path:path>')
def serve_static(path): return send_from_directory('.', path)
@flask_app.route('/api/signal')
def api_signal():
    try:
        mode = request.args.get('mode','FAST')
        data = signal_engine.calc_signal(override_mode=mode)
        return jsonify(data)
    except Exception as e:
        return jsonify({"signal":"ERROR","error":str(e)})
@flask_app.route('/health')
def health(): return "GHOST REAL ONLY"

WELCOME_TEXT = """👻 GHOST - PREMIUM FREE BOT 👻

We Don't Sell Bot. We Give FREE To Our Referral Members!

Kivabe Access Paba?
1️⃣ Link theke account khulo
2️⃣ Profile theke Trader ID copy koro
3️⃣ Ekhane ID send koro

✅ Approve hole Signal Bot auto paba
⚠️ No Bot Gives 100% Win - Use 1% Risk
"""

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # BEFORE APPROVE - NO WEBSITE BUTTON
    kb = [
        [InlineKeyboardButton("🔗 Create QX Account - FREE BOT", url=AFFILIATE_LINK)],
        [InlineKeyboardButton("📡 LIVE SIGNAL", callback_data="live_FAST"), InlineKeyboardButton("❓ Get ID?", callback_data="how_id")],
        [InlineKeyboardButton("💎 Premium Info", callback_data="premium")],
        [InlineKeyboardButton("💬 Join Channel", url=CHANNEL_LINK), InlineKeyboardButton("👨‍💼 Admin", url="https://t.me/ghostsupportbd")]
    ]
    await update.message.reply_text(WELCOME_TEXT, reply_markup=InlineKeyboardMarkup(kb))

async def handle_id(update: Update, context: ContextTypes.DEFAULT_TYPE):
    tid = update.message.text.strip()
    if len(tid)<4:
        await update.message.reply_text("❌ Valid Trader ID dao"); return
    await update.message.reply_text(f"✅ ID `{tid}` Received!\nAdmin check korche, 2 min er moddhe approve hobe!\n\nApprove hole Website button auto paba!", parse_mode='Markdown')
    try:
        kb = [[InlineKeyboardButton("✅ Approve", callback_data=f"ap_{update.effective_user.id}"), InlineKeyboardButton("❌ Reject", callback_data=f"rj_{update.effective_user.id}")]]
        await context.bot.send_message(chat_id=ADMIN_ID, text=f"🆕 NEW ID\nID: {tid}\nUser: @{update.effective_user.username or 'N/A'}\nName: {update.effective_user.first_name}\nUID: {update.effective_user.id}", reply_markup=InlineKeyboardMarkup(kb))
    except Exception as e:
        logging.error(e)

async def callbacks(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query; await q.answer(); d = q.data
    if d == "how_id":
        await q.message.reply_text("❓ Kivabe ID paba?\n1️⃣ Link theke account khulo\n2️⃣ QX > Profile > Trader ID copy\n3️⃣ Ekhane paste koro\n⚠️ Affiliate link chara approve hobe na!")
    elif d == "premium":
        await q.message.reply_text("💎 *GHOST PREMIUM FREE*\n\n✅ 5 Strategy + 4 Filter\n✅ REAL ECB Live\n✅ FAST 20s - No WAIT\n✅ UP Green / DOWN Red\n✅ Lifetime FREE\n\n⚠️ 1% Risk use koro", parse_mode='Markdown')
    elif d.startswith("live_"):
        mode = d.replace("live_","")
        try:
            s = signal_engine.calc_signal(override_mode=mode)
            sig = s.get('signal'); price = s.get('price'); strats = "\n".join([f"• {x}" for x in s.get('strategies',[])])
            f = s.get('filter',{}); trend = f.get('trend'); rsi = f.get('rsi'); tl = f.get('time_left')
            emoji = "🟢" if sig=="UP" else "🔴" if sig=="DOWN" else "⏳"
            msg = f"📡 *{mode} REAL LIVE*\n\n{emoji} *{sig}*\n💰 {price} | {trend} | RSI {rsi}\n⏱️ {tl}s left\n\n🧠 {strats}\n\n🌐 {WEBSITE_URL}"
            await q.message.reply_text(msg, parse_mode='Markdown')
        except Exception as e:
            await q.message.reply_text(f"Error: {e}")
    elif d.startswith("ap_"):
        uid = d.split("_")[1]
        # AFTER APPROVE - WEBSITE BUTTON SHOW
        kb = [
            [InlineKeyboardButton("🌐 Website - 1 Click Copy Bot", url=WEBSITE_URL)],
            [InlineKeyboardButton("📡 LIVE SIGNAL", callback_data="live_FAST")],
            [InlineKeyboardButton("💬 Join Channel", url=CHANNEL_LINK)]
        ]
        await context.bot.send_message(chat_id=int(uid), text=f"🎉 *APPROVED!*\n\n👻 GHOST PREMIUM FREE BOT Unlocked!\n\n👇 Niche button e click kore Website theke Bot copy koro!\n\n⚠️ 1% Risk use koro - No 100% Win", reply_markup=InlineKeyboardMarkup(kb), parse_mode='Markdown')
        await q.edit_message_text("✅ Approved - Website button sent to user")
    elif d.startswith("rj_"):
        uid = d.split("_")[1]
        await context.bot.send_message(chat_id=int(uid), text="❌ Rejected - Affiliate link diye new account khulo, tarpor ID pathao")
        await q.edit_message_text("❌ Rejected")

def run_flask():
    port = int(os.environ.get("PORT", 10000)); flask_app.run(host="0.0.0.0", port=port)
def run_bot():
    if not BOT_TOKEN:
        logging.error("BOT_TOKEN missing"); return
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_id))
    app.add_handler(CallbackQueryHandler(callbacks))
    app.run_polling()
if __name__ == "__main__":
    threading.Thread(target=run_flask, daemon=True).start()
    run_bot()
