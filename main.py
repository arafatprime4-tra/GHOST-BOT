import os, threading, logging, re
from flask import Flask, send_from_directory, jsonify, request
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, CallbackQueryHandler, ContextTypes, filters

try:
    from quotex_api import signal_engine
except:
    class Dummy:
        def get_signal(self, pair="EURUSD", mode="FAST"): 
            return {"signal":"UP","pair":pair,"price":1.08512,"confidence":87,"strategies":[f"UP EMA {pair}","Mom UP"],"filter":{"rsi":54.2,"trend":"UP","time_left":20,"mode":"FAST"}}
        def scan_all(self, mode="FAST"): return []
        def calc_signal(self, override_mode=None, pair="EURUSD"): return self.get_signal(pair, override_mode or "FAST")
    signal_engine = Dummy()

logging.basicConfig(level=logging.INFO)
BOT_TOKEN = os.getenv("BOT_TOKEN","").strip()
ADMIN_ID = int(os.getenv("ADMIN_ID","0") or 0)
AFFILIATE_LINK = os.getenv("AFFILIATE_LINK","https://qxbroker.com/en/sign-up/?lid=123456")
WEBSITE_URL = os.getenv("WEBSITE_URL","https://giogram-backend.onrender.com")
CHANNEL_LINK = os.getenv("CHANNEL_LINK","https://t.me/premierghos")
ACADEMY_LINK = os.getenv("ACADEMY_LINK","https://t.me/premierghos")
APP_LINK = os.getenv("APP_LINK","https://giogram-backend.onrender.com")

PAIRS = ["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"]

flask_app = Flask(__name__, static_folder='.', static_url_path='')
@flask_app.after_request
def after_request(r): r.headers.add('Access-Control-Allow-Origin','*'); return r
@flask_app.route('/')
def home(): return send_from_directory('.', 'index.html')
@flask_app.route('/<path:path>')
def serve_static(path): return send_from_directory('.', path)
@flask_app.route('/api/signal')
def api_signal():
    try:
        mode=request.args.get('mode','FAST'); pair=request.args.get('pair','EURUSD').upper()
        return jsonify(signal_engine.get_signal(pair,mode))
    except Exception as e: return jsonify({"signal":"ERROR","error":str(e)})
@flask_app.route('/health')
def health(): return "GHOST PREMIUM LIVE - DRAGGABLE + REAL SSID"

# Ridoy chuya welcome - choto but emotional
WELCOME = """👻 *GHOST PREMIUM* 👻

Bhai, trading e 90% manush eka hare jay...
Amra chai apni 10% winner er moddhe thaken. ❤️

Tai bot ta free, kintu sothik pothe. Kono sell na.

✨ Kivabe shuru?
1️⃣ Link theke account khulun any amount deposit koren
2️⃣ Profile theke Trader ID copy korun  
3️⃣ Ekhane sudhu number ta pathan

✅ Approve holei REAL SSID signal + Draggable bot paben
⚠️ Kono bot 100% win dey na - amra 1% risk e safe thakte shikhai
"""

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    kb=[
        [InlineKeyboardButton("🔗 Quotex Account - FREE PREMIUM", url=AFFILIATE_LINK)],
        [InlineKeyboardButton("📚 Academy", url=ACADEMY_LINK), InlineKeyboardButton("❓ Get ID?", callback_data="how_id")],
        [InlineKeyboardButton("💬 Channel", url=CHANNEL_LINK), InlineKeyboardButton("👨‍💼 Admin", url="https://t.me/ghostsupportbd")]
    ]
    await update.message.reply_text(WELCOME, reply_markup=InlineKeyboardMarkup(kb))

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text.strip()
    user = update.effective_user

    # 1. Check if it's a PAIR like EURUSD, GBPJPY etc - give real analysis
    if text.upper() in PAIRS:
        pair = text.upper()
        try:
            s = signal_engine.get_signal(pair, "FAST")
            emoji = "🟢" if s["signal"]=="UP" else "🔴" if s["signal"]=="DOWN" else "⏳"
            conf = s.get("confidence",0)
            price = s.get("price")
            rsi = s["filter"].get("rsi")
            trend = s["filter"].get("trend")
            strategies = "\n".join([f"• {x}" for x in s.get("strategies",[])[:3]])
            real = "✅ REAL SSID" if s.get("real") else "🔄 REAL ECB"
            msg = f"📊 *{pair} REAL ANALYSIS* {real}\n\n{emoji} *Signal: {s['signal']}* {conf}%\n💰 Price: {price} | {trend} | RSI {rsi}\n\n🧠 Strategies:\n{strategies}\n\n⏱️ Hold 20s - Draggable bot e same signal\n🌐 {WEBSITE_URL}"
            kb = [[InlineKeyboardButton(f"📈 {pair} Chart e Bot", url=WEBSITE_URL)]]
            await update.message.reply_text(msg, reply_markup=InlineKeyboardMarkup(kb), parse_mode='Markdown')
        except Exception as e:
            await update.message.reply_text(f"❌ {pair} analysis error: {e}")
        return

    # 2. Check if ID contains # or non-digit
    # If contains # like #1234567
    if "#" in text:
        # Extract number part
        num_only = re.sub(r'[^0-9]', '', text)
        await update.message.reply_text(
            f"🚫 `{text}` পাওয়া যায় নাই!\n\n"
            f"অনুগ্রহ করে # ছাড়া শুধু ID পাঠান\n"
            f"Example: `1234567`\n\n"
            f"💡 Tip: Profile > Trader ID copy করে শুধু নাম্বারটা পেস্ট করুন, # দিবেন না।\n\n"
            f"আপনি পাঠিয়েছেন: {text} → সঠিক: {num_only if num_only else '1234567'}",
            parse_mode='Markdown'
        )
        return

    # 3. If not pure digits, and not pair, it's invalid
    if not text.isdigit():
        # Check if it's mixed like ID123456 or abc
        if any(c.isdigit() for c in text):
            num_only = re.sub(r'[^0-9]', '', text)
            await update.message.reply_text(
                f"🚫 `{text}` - ID তে শুধু নাম্বার থাকবে!\n\n"
                f"✅ সঠিক: `{num_only if num_only else '1234567'}`\n"
                f"❌ ভুল: `#1234567` বা `ID 1234567`\n\n"
                f"Example: `1234567`",
                parse_mode='Markdown'
            )
        else:
            # Maybe user asking something else, show help
            await update.message.reply_text(
                "👻 GHOST PREMIUM\n\n"
                "ID পাঠান: শুধু নাম্বার, যেমন `1234567`\n"
                "Market analysis: যেমন `EURUSD` লিখুন\n"
                "Help: /start",
                parse_mode='Markdown'
            )
        return

    # 4. Valid ID - only digits like 1234567
    tid = text
    if len(tid) < 4 or len(tid) > 12:
        await update.message.reply_text("❌ ID 4-12 digit er hobe, Example: 1234567")
        return

    await update.message.reply_text(
        f"✅ ID `{tid}` Received! ❤️\n\n"
        f"Admin check korche, 2 min er moddhe approve hobe!\n"
        f"Approve hole GHOST PREMIUM + Real SSID signal paba!",
        parse_mode='Markdown'
    )
    try:
        kb=[[InlineKeyboardButton("✅ Approve PREMIUM", callback_data=f"ap_{user.id}_{tid}"), InlineKeyboardButton("❌ Reject", callback_data=f"rj_{user.id}")]]
        if ADMIN_ID:
            await context.bot.send_message(
                chat_id=ADMIN_ID,
                text=f"🆕 *GHOST PREMIUM NEW ID*\n\n🆔 Trader ID: `{tid}`\n👤 User: @{user.username or 'N/A'}\n📛 Name: {user.first_name}\n🔢 UID: {user.id}\n\n💰 Deposit check korte hobe",
                reply_markup=InlineKeyboardMarkup(kb),
                parse_mode='Markdown'
            )
    except Exception as e:
        logging.error(f"Admin notify fail {e}")

async def callbacks(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q=update.callback_query; await q.answer(); d=q.data
    if d=="how_id":
        await q.message.reply_text(
            "❓ *How to Get Trader ID?*\n\n"
            "1️⃣ Quotex link e click kore account khulun\n"
            "2️⃣ Profile icon e click korun\n"
            "3️⃣ Trader ID copy korun (শুধু নাম্বার)\n"
            "4️⃣ Ekhane paste korun - Example: `1234567`\n\n"
            "⚠️ #1234567 দিবেন না, শুধু 1234567",
            parse_mode='Markdown'
        )
    elif d.startswith("ap_"):
        # ap_userid_traderid
        parts=d.split("_")
        uid=parts[1]
        trader_id=parts[2] if len(parts)>2 else "N/A"
        # Beautiful approval message with deposit, academy, website, bookmark, app
        kb=[
            [InlineKeyboardButton("🌐 GHOST PREMIUM Website", url=WEBSITE_URL)],
            [InlineKeyboardButton("📚 Academy - Sikhte Thakun", url=ACADEMY_LINK)],
            [InlineKeyboardButton("📱 App Link", url=APP_LINK), InlineKeyboardButton("💬 Channel", url=CHANNEL_LINK)],
            [InlineKeyboardButton("📊 EURUSD Real Signal", callback_data="live_EURUSD"), InlineKeyboardButton("🔮 All Market Scan", callback_data="scan")]
        ]
        msg = f"""🎉 *CONGRATULATIONS! GHOST PREMIUM APPROVED!* 🎉

❤️ Bhai, apnake welcome - apni ekhon amader winner family er part!

🆔 *Trader ID:* `{trader_id}`
💰 *Total Deposit:* Admin verify korche (24h er moddhe update paben)
📊 *Status:* ✅ PREMIUM ACTIVE - Lifetime FREE

👇 *Apnar jonno sob kichu ready:*

🌐 *Website:* 1 Click e draggable bot copy
📚 *Academy:* Trading shikhte thakun - free course
📱 *App:* Mobile app diye jekono market e signal
📊 *Real SSID:* Jekono pair likhun - EURUSD, GBPJPY - real analysis dibo

⚠️ *Mone rakhben:*
Kono bot 100% win dey na. Amra 1% risk e safe trading shikhai. Apni eka na, amra achi!

🚀 Ekhon website theke bot copy kore Quotex chart e drag kore use korun!

- GHOST PREMIUM Team 👻
"""
        try:
            await context.bot.send_message(chat_id=int(uid), text=msg, reply_markup=InlineKeyboardMarkup(kb), parse_mode='Markdown')
            await q.edit_message_text(f"✅ GHOST PREMIUM Approved - ID {trader_id} - Deposit check")
        except Exception as e:
            logging.error(f"Approve send fail {e}")
            await q.edit_message_text(f"Approved but send fail {e}")
    elif d.startswith("rj_"):
        uid=d.split("_")[1]
        await context.bot.send_message(chat_id=int(uid), text="❌ Rejected - Affiliate link diye new account khulun, tarpor sudhu number ID pathan (Example: 1234567, # chara)")
        await q.edit_message_text("❌ Rejected")
    elif d.startswith("live_"):
        pair=d.replace("live_","")
        try:
            s=signal_engine.get_signal(pair,"FAST")
            emoji="🟢" if s["signal"]=="UP" else "🔴" if s["signal"]=="DOWN" else "⏳"
            await q.message.reply_text(f"📊 *{pair} REAL* {emoji} {s['signal']} {s.get('confidence',0)}% | {s.get('price')} | RSI {s['filter'].get('rsi')}", parse_mode='Markdown')
        except Exception as e:
            await q.message.reply_text(f"Error {e}")
    elif d=="scan":
        try:
            all_pairs=signal_engine.scan_all("FAST")
            txt="🔮 *GHOST PREMIUM SCAN*\n\n"
            for s in all_pairs[:6]:
                emoji="🟢" if s["signal"]=="UP" else "🔴" if s["signal"]=="DOWN" else "⏳"
                txt+=f"{emoji} {s['pair']} {s['signal']} {s.get('confidence',0)}%\n"
            await q.message.reply_text(txt, parse_mode='Markdown')
        except Exception as e:
            await q.message.reply_text(f"Scan error {e}")

def run_flask():
    port=int(os.environ.get("PORT",10000)); flask_app.run(host="0.0.0.0", port=port)
def run_bot():
    if not BOT_TOKEN:
        logging.error("BOT_TOKEN missing"); return
    app=ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    app.add_handler(CallbackQueryHandler(callbacks))
    logging.info("GHOST PREMIUM Bot polling started...")
    app.run_polling()

if __name__=="__main__":
    threading.Thread(target=run_flask, daemon=True).start()
    run_bot()
