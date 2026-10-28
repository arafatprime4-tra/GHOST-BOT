import os, threading, logging, re, traceback
from flask import Flask, send_from_directory, jsonify, request
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, CallbackQueryHandler, ContextTypes, filters

try:
    from quotex_api import signal_engine
except:
    class Dummy:
        def get_signal(self, pair="EURUSD", mode="FAST"): 
            return {"signal":"UP","pair":pair,"price":1.08512,"confidence":87,"strategies":[f"UP EMA {pair}","Mom UP"],"filter":{"rsi":54.2,"trend":"UP","time_left":20,"mode":"FAST"},"real":False,"ssid_mode":"1 SSID = All Market","data_source":"Dummy"}
        def scan_all(self, mode="FAST"): return []
        def calc_signal(self, override_mode=None, pair="EURUSD"): return self.get_signal(pair, override_mode or "FAST")
    signal_engine = Dummy()

logging.basicConfig(level=logging.INFO)
BOT_TOKEN = os.getenv("BOT_TOKEN","").strip()

# ADMIN_ID fix - strip spaces, handle errors
_admin_raw = os.getenv("ADMIN_ID","0").strip()
try:
    ADMIN_ID = int(_admin_raw) if _admin_raw else 0
except:
    # Try to extract digits
    digits = re.sub(r'[^0-9]', '', _admin_raw)
    ADMIN_ID = int(digits) if digits else 0

logging.info(f"=== GHOST PREMIUM STARTING ===")
logging.info(f"ADMIN_ID raw='{_admin_raw}' parsed={ADMIN_ID}")

AFFILIATE_LINK = os.getenv("AFFILIATE_LINK","https://qxbroker.com/en/sign-up/?lid=123456")
WEBSITE_URL = os.getenv("WEBSITE_URL","https://giogram-backend.onrender.com")
CHANNEL_LINK = os.getenv("CHANNEL_LINK","https://t.me/premierghos")
ACADEMY_LINK = os.getenv("ACADEMY_LINK","https://t.me/premierghos")
APP_LINK = os.getenv("APP_LINK","https://giogram-backend.onrender.com")

PAIRS = ["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"]

flask_app = Flask(__name__, static_folder='.', static_url_path='')
@flask_app.after_request
def after_request(r): 
    r.headers.add('Access-Control-Allow-Origin','*')
    return r

@flask_app.route('/')
def home(): 
    return send_from_directory('.', 'index.html')

@flask_app.route('/<path:path>')
def serve_static(path): 
    return send_from_directory('.', path)

@flask_app.route('/api/signal')
def api_signal():
    try:
        mode=request.args.get('mode','FAST')
        pair=request.args.get('pair','EURUSD').upper()
        return jsonify(signal_engine.get_signal(pair,mode))
    except Exception as e: 
        return jsonify({"signal":"ERROR","error":str(e)})

@flask_app.route('/health')
def health(): 
    return f"GHOST PREMIUM LIVE - ADMIN_ID={ADMIN_ID} - OK"

# === BOLD & STYLISH BANGLA WELCOME ===
WELCOME = """👻 <b>GHOST PREMIUM</b> 👻

<b>ভাই, ট্রেডিংয়ে ৯০% মানুষ একা হেরে যায়...</b>
<b>আমরা চাই আপনি ১০% উইনারের মধ্যে থাকেন।</b> ❤️

<b>বটটা ফ্রি, কিন্তু সঠিক পথে। কোনো সেল না।</b>

✨ <b>কিভাবে শুরু?</b>
1️⃣ <b>লিংক থেকে অ্যাকাউন্ট করে যেকোনো অ্যামাউন্ট ডিপোজিট করুন</b>
2️⃣ <b>প্রোফাইল থেকে Trader ID কপি করুন</b>

⚠️ <b>কোনো বট ১০০% উইন দেয় না - আমরা ১% রিস্কে সেফ থাকতে শেখাই</b>
"""

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    kb=[
        [InlineKeyboardButton("🔗 Quotex Account - FREE PREMIUM", url=AFFILIATE_LINK)],
        [InlineKeyboardButton("❓ Get ID?", callback_data="how_id")],
        [InlineKeyboardButton("💬 Channel", url=CHANNEL_LINK), InlineKeyboardButton("👨‍💼 Admin", url="https://t.me/ghostsupportbd")]
    ]
    await update.message.reply_text(WELCOME, reply_markup=InlineKeyboardMarkup(kb), parse_mode='HTML')

async def myid(update: Update, context: ContextTypes.DEFAULT_TYPE):
    u = update.effective_user
    await update.message.reply_text(f"🆔 Your ID: <code>{u.id}</code>\n👤 Username: @{u.username or 'N/A'}\n\nAdmin ID in env: {ADMIN_ID}", parse_mode='HTML')

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text.strip()
    user = update.effective_user

    # 1. PAIR analysis
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
            msg = f"📊 <b>{pair} REAL ANALYSIS</b> {real}\n\n{emoji} <b>Signal: {s['signal']}</b> {conf}%\n💰 Price: {price} | {trend} | RSI {rsi}\n\n🧠 Strategies:\n{strategies}\n\n⏱️ Hold 20s - Draggable bot e same signal\n🌐 {WEBSITE_URL}"
            kb = [[InlineKeyboardButton(f"📈 {pair} Chart e Bot", url=WEBSITE_URL)]]
            await update.message.reply_text(msg, reply_markup=InlineKeyboardMarkup(kb), parse_mode='HTML')
        except Exception as e:
            await update.message.reply_text(f"❌ {pair} analysis error: {e}")
        return

    # 2. # check
    if "#" in text:
        num_only = re.sub(r'[^0-9]', '', text)
        await update.message.reply_text(
            f"🚫 <code>{text}</code> পাওয়া যায় নাই!\n\n"
            f"অনুগ্রহ করে # ছাড়া শুধু ID পাঠান\n"
            f"Example: 1234567\n\n"
            f"💡 Tip: Profile > Trader ID copy করে শুধু নাম্বারটা পেস্ট করুন, # দিবেন না।\n\n"
            f"আপনি পাঠিয়েছেন: {text} → সঠিক: {num_only if num_only else '1234567'}",
            parse_mode='HTML'
        )
        return

    if not text.isdigit():
        if any(c.isdigit() for c in text):
            num_only = re.sub(r'[^0-9]', '', text)
            await update.message.reply_text(
                f"🚫 <code>{text}</code> - ID তে শুধু নাম্বার থাকবে!\n\n"
                f"✅ সঠিক: <code>{num_only if num_only else '1234567'}</code>\n"
                f"❌ ভুল: <code>#1234567</code> বা <code>ID 1234567</code>\n\n"
                f"Example: 1234567",
                parse_mode='HTML'
            )
        else:
            await update.message.reply_text(
                "👻 <b>GHOST PREMIUM</b>\n\n"
                "ID পাঠান: শুধু নাম্বার, যেমন <code>1234567</code>\n"
                "Market analysis: যেমন <code>REAL MARKET</code> লিখুন\n"
                "Help: /start\n"
                "ID check: /myid",
                parse_mode='HTML'
            )
        return

    # Valid ID
    tid = text
    if len(tid) < 4 or len(tid) > 12:
        await update.message.reply_text("❌ ID 7-8 digit er hobe, Example: 1234567")
        return

    await update.message.reply_text(
        f"✅ ID <code>{tid}</code> Received! ❤️\n\n"
        f"Admin check korche, 2 min er moddhe approve hobe!\n"
        f"Approve hole GHOST PREMIUM BOT Free Access!",
        parse_mode='HTML'
    )
    
    # === ADMIN NOTIFY - FIXED ===
    try:
        if ADMIN_ID == 0:
            logging.warning(f"ADMIN_ID is 0! Cannot notify admin for TID {tid}. Set ADMIN_ID env var!")
            # Still tell user
            await update.message.reply_text("⚠️ ADMIN_ID set kora nai Render e! @userinfobot theke ID niye Render > Environment e ADMIN_ID add korun")
            return

        kb=[[InlineKeyboardButton("✅ Approve PREMIUM", callback_data=f"ap_{user.id}_{tid}"), InlineKeyboardButton("❌ Reject", callback_data=f"rj_{user.id}")]]
        sent = await context.bot.send_message(
            chat_id=ADMIN_ID,
            text=f"🆕 <b>GHOST PREMIUM NEW ID</b>\n\n🆔 Trader ID: <code>{tid}</code>\n👤 User: @{user.username or 'N/A'}\n📛 Name: {user.first_name}\n🔢 UID: {user.id}\n\n💰 Deposit check korte hobe\nADMIN_ID={ADMIN_ID}",
            reply_markup=InlineKeyboardMarkup(kb),
            parse_mode='HTML'
        )
        logging.info(f"✅ Admin notified for TID {tid} to {ADMIN_ID}, msg_id={sent.message_id}")
    except Exception as e:
        logging.error(f"❌ Admin notify fail for TID {tid} to ADMIN_ID {ADMIN_ID}: {e}")
        logging.error(traceback.format_exc())
        # Try to inform admin that notify failed
        try:
            await update.message.reply_text(f"⚠️ Admin notify failed: {e}. ADMIN_ID={ADMIN_ID} check korun")
        except: pass

async def callbacks(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q=update.callback_query
    await q.answer()
    d=q.data
    if d=="how_id":
        await q.message.reply_text(
            "❓ <b>How to Get Trader ID?</b>\n\n"
            "1️⃣ Quotex link e click kore account khulun\n"
            "2️⃣ Profile icon e click korun\n"
            "3️⃣ Trader ID copy korun (শুধু নাম্বার)\n"
            "4️⃣ Ekhane paste korun - Example: <code>1234567</code>\n\n"
            "⚠️ #1234567 দিবেন না, শুধু 1234567",
            parse_mode='HTML'
        )
    elif d.startswith("ap_"):
        parts=d.split("_")
        uid=parts[1]
        trader_id=parts[2] if len(parts)>2 else "N/A"
        kb=[
            [InlineKeyboardButton("🌐 GHOST PREMIUM Website", url=WEBSITE_URL)],
            [InlineKeyboardButton("📚 Academy - Sikhte Thakun", url=ACADEMY_LINK)],
            [InlineKeyboardButton("📱 App Link", url=APP_LINK), InlineKeyboardButton("💬 Channel", url=CHANNEL_LINK)],
            [InlineKeyboardButton("📊 EURUSD Real Signal", callback_data="live_EURUSD"), InlineKeyboardButton("🔮 All Market Scan", callback_data="scan")]
        ]
        msg = f"""🎉 <b>CONGRATULATIONS! GHOST PREMIUM APPROVED!</b> 🎉

❤️ Bhai, apnake welcome - apni ekhon amader 10K+ winner family er part!

🆔 <b>Trader ID:</b> <code>{trader_id}</code>
💰 <b>Total Deposit:</b> Admin verify korche (24h er moddhe update paben)
📊 <b>Status:</b> ✅ PREMIUM ACTIVE - Lifetime FREE

👇 <b>Apnar jonno sob kichu ready:</b>

🌐 <b>Website:</b> 1 Click e draggable bot copy
📚 <b>Academy:</b> Trading shikhte thakun - free course
📱 <b>App:</b> Mobile app diye jekono market e signal
📊 <b>Real SSID:</b> Jekono pair likhun - EURUSD, GBPJPY - real analysis dibo

⚠️ <b>Mone rakhben:</b>
Kono bot 100% win dey na. Amra 1% risk e safe trading shikhai. Apni eka na, amra achi!

🚀 Ekhon website theke bot copy kore Quotex chart e drag kore use korun!

- GHOST PREMIUM Team 👻
"""
        try:
            await context.bot.send_message(chat_id=int(uid), text=msg, reply_markup=InlineKeyboardMarkup(kb), parse_mode='HTML')
            await q.edit_message_text(f"✅ GHOST PREMIUM Approved - ID {trader_id} - Deposit check")
            logging.info(f"Approved {trader_id} for {uid}")
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
            await q.message.reply_text(f"📊 <b>{pair} REAL</b> {emoji} {s['signal']} {s.get('confidence',0)}% | {s.get('price')} | RSI {s['filter'].get('rsi')}", parse_mode='HTML')
        except Exception as e:
            await q.message.reply_text(f"Error {e}")
    elif d=="scan":
        try:
            all_pairs=signal_engine.scan_all("FAST")
            txt="🔮 <b>GHOST PREMIUM SCAN 27 PAIRS</b>\n\n"
            for s in all_pairs[:6]:
                emoji="🟢" if s["signal"]=="UP" else "🔴" if s["signal"]=="DOWN" else "⏳"
                txt+=f"{emoji} {s['pair']} {s['signal']} {s.get('confidence',0)}%\n"
            await q.message.reply_text(txt, parse_mode='HTML')
        except Exception as e:
            await q.message.reply_text(f"Scan error {e}")

def run_flask():
    port=int(os.environ.get("PORT",10000))
    logging.info(f"Flask starting on 0.0.0.0:{port}")
    flask_app.run(host="0.0.0.0", port=port)

def run_bot():
    if not BOT_TOKEN:
        logging.error("BOT_TOKEN missing")
        return
    app=ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("myid", myid))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    app.add_handler(CallbackQueryHandler(callbacks))
    logging.info(f"GHOST PREMIUM Bot polling started... ADMIN_ID={ADMIN_ID}")
    app.run_polling()

if __name__=="__main__":
    threading.Thread(target=run_flask, daemon=True).start()
    run_bot()
