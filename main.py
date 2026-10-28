import os, threading, logging
from flask import Flask, send_from_directory, jsonify, request
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, CallbackQueryHandler, ContextTypes, filters

try:
    from quotex_api import signal_engine
except:
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
        return jsonify(signal_engine.get_signal(pair,mode))
    except Exception as e:
        return jsonify({"signal":"ERROR","error":str(e)})
@flask_app.route('/api/scan')
def api_scan():
    try:
        mode=request.args.get('mode','FAST')
        return jsonify({"pairs":signal_engine.scan_all(mode),"engine":"GHOST QUANTUM X"})
    except Exception as e:
        return jsonify({"error":str(e)})
@flask_app.route('/health')
def health(): return "GHOST CLEAN SIMPLE"

# CLEAN SIMPLE WELCOME - No features
WELCOME = """👻 GHOST - PREMIUM FREE BOT 👻

We Don't Sell Bot. We Give FREE To Our Referral Members!

Kivabe Access Paba?
1️⃣ Link theke account khulo
2️⃣ Profile theke Trader ID copy koro
3️⃣ Ekhane ID send koro

✅ Approve hole GHOST PREMIUM BOT auto paba
⚠️ No Bot Gives 100% Win - Use 1% Risk
"""

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # CLEAN - Red circled gula bad
    kb=[
        [InlineKeyboardButton("🔗 Create QX Account - FREE BOT", url=AFFILIATE_LINK)],
        [InlineKeyboardButton("❓ How to Get ID?", callback_data="")],
        [InlineKeyboardButton("💬 Join Channel", url=CHANNEL_LINK), InlineKeyboardButton("👨‍💼 Admin", url="https://t.me/ghostsupportbd")]
    ]
    await update.message.reply_text(WELCOME, reply_markup=InlineKeyboardMarkup(kb))

async def handle_id(update: Update, context: ContextTypes.DEFAULT_TYPE):
    tid=update.message.text.strip()
    if len(tid)<4:
        await update.message.reply_text("❌ Valid Trader ID dao"); return
    await update.message.reply_text(f"✅ ID `{tid}` Received!\nAdmin check korche, approve hole Website button paba!", parse_mode='Markdown')
    try:
        kb=[[InlineKeyboardButton("✅ Approve", callback_data=f"ap_{update.effective_user.id}"), InlineKeyboardButton("❌ Reject", callback_data=f"rj_{update.effective_user.id}")]]
        await context.bot.send_message(chat_id=ADMIN_ID, text=f"🆕 ID\nID: {tid}\nUser: @{update.effective_user.username or 'N/A'}", reply_markup=InlineKeyboardMarkup(kb))
    except: pass

async def callbacks(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q=update.callback_query; await q.answer(); d=q.data
    if d=="how_id":
        await q.message.reply_text("❓ Kivabe ID paba?\n1️⃣ Link theke account khulo\n2️⃣ Profile theke Trader ID copy koro\n3️⃣ Ekhane paste koro")
    elif d.startswith("ap_"):
        uid=d.split("_")[1]
        # After approve - website button only now
        kb=[
            [InlineKeyboardButton("🌐 Website - 1 Click Copy Bot", url=WEBSITE_URL)],
            [InlineKeyboardButton("💬 Join Channel", url=CHANNEL_LINK)]
        ]
        await context.bot.send_message(chat_id=int(uid), text=f"🎉 *APPROVED!*\n\n👻 GHOST PREMIUM BOT Unlocked!\n\n👇 Website theke bot copy koro\n⚠️ Use 1% Risk", reply_markup=InlineKeyboardMarkup(kb), parse_mode='Markdown')
        await q.edit_message_text("✅ Approved")
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
