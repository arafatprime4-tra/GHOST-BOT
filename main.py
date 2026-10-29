
import os, threading, logging, re, traceback, json, secrets, time
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

_admin_raw = os.getenv("ADMIN_ID","0").strip()
try:
    ADMIN_ID = int(_admin_raw) if _admin_raw else 0
except:
    digits = re.sub(r'[^0-9]', '', _admin_raw)
    ADMIN_ID = int(digits) if digits else 0

AFFILIATE_LINK = os.getenv("AFFILIATE_LINK","https://qxbroker.com/en/sign-up/?lid=123456")
WEBSITE_URL = os.getenv("WEBSITE_URL","https://giogram-backend.onrender.com")
CHANNEL_LINK = os.getenv("CHANNEL_LINK","https://t.me/premierghos")
ACADEMY_LINK = os.getenv("ACADEMY_LINK","https://t.me/premierghos")
APP_LINK = os.getenv("APP_LINK","https://giogram-backend.onrender.com")

PAIRS = ["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"]

pending_custom_msg = {}
user_trader_map = {}
pending_deposit_claims = {}

TOKEN_FILE = "approved_tokens.json"
approved_tokens = {}
try:
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, 'r', encoding='utf-8') as tf:
            approved_tokens = json.load(tf)
except:
    approved_tokens = {}

def save_tokens():
    try:
        with open(TOKEN_FILE, 'w', encoding='utf-8') as tf:
            json.dump(approved_tokens, tf)
    except Exception as e:
        logging.error(f"Token save fail {e}")

def create_premium_token(trader_id, user_id, amount):
    token = secrets.token_urlsafe(32)
    approved_tokens[token] = {
        "trader_id": str(trader_id),
        "user_id": str(user_id),
        "amount": str(amount),
        "created": int(time.time()),
        "created_human": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    save_tokens()
    return token

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
        mode=request.args.get('mode','SAFE')
        raw_pair=request.args.get('pair','EURUSD')
        # OTC ALLOWED - real off থাকলে OTC দিবে
        is_otc = "OTC" in raw_pair.upper()
        clean_raw = raw_pair.upper().replace(" OTC","").replace("(OTC)","").replace("OTC","").strip()
        pair=clean_raw.replace("/","").strip()
        # Allow real + OTC pairs
        REAL = ["EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD","USDCHF","NZDUSD","EURJPY","EURGBP","EURAUD","EURCAD","GBPJPY","GBPAUD","GBPCAD","AUDJPY","AUDCAD","CADJPY","CHFJPY","GBPCHF","EURCHF","AUDCHF","CADCHF","NZDJPY","EURNZD","GBPNZD","AUDNZD","NZDCAD"]
        if pair not in REAL:
            return jsonify({
                "signal_id": f"REJECT-INVALID-{int(time.time())}",
                "signal": "WAIT",
                "status": "DATA_UNAVAILABLE",
                "market": raw_pair,
                "pair": pair,
                "direction": "WAIT",
                "reason": f"Invalid pair {pair}",
                "risk_percent": 1,
                "expiry_timestamp": int((time.time()+60)*1000),
                "remainingSeconds": 60,
                "time_left": 60
            })
        # Pass OTC info to engine by adding OTC suffix if needed
        engine_pair = pair + ("OTC" if is_otc else "")
        result = signal_engine.get_signal(engine_pair,mode)
        # Ensure consistent structure
        if "signal_id" not in result:
            import uuid
            result["signal_id"] = f"{pair}-{result.get('signal','WAIT')}-{uuid.uuid4().hex[:8]}"
        if "market" not in result:
            result["market"] = f"{pair[:3]}/{pair[3:]}" if len(pair)==6 else pair
        if "remainingSeconds" not in result:
            result["remainingSeconds"] = result.get("time_left", 60)
        return jsonify(result)
    except Exception as e: 
        return jsonify({"signal_id": f"ERROR-{int(time.time())}","signal":"WAIT","status":"DATA_UNAVAILABLE","reason":str(e),"remainingSeconds":60,"time_left":60})

@flask_app.route('/api/verify')
def api_verify():
    token = request.args.get('token','') or request.args.get('access','') or request.args.get('premium','')
    token = token.strip()
    if not token:
        return jsonify({"valid": False})
    data = approved_tokens.get(token)
    if data:
        return jsonify({"valid": True, "data": data})
    else:
        return jsonify({"valid": False})

@flask_app.route('/health')
def health(): 
    return f"GHOST LIVE ADMIN={ADMIN_ID} TOKENS={len(approved_tokens)} OK"

WELCOME = """👻 <b>GHOST PREMIUM</b> 👻

<b>বটটা ফ্রি, কিন্তু সঠিক পথে। কোনো সেল না।</b>

✨ <b>কিভাবে শুরু?</b>
1️⃣ <b>Account Create Link থেকে অ্যাকাউন্ট করে যেকোনো অ্যামাউন্ট ডিপোজিট করুন</b>
2️⃣ <b>প্রোফাইল থেকে Trader ID কপি করুন (শুধু নাম্বার, # ছাড়া)</b>

⚠️ <b>কোনো বট ১০০% উইন দেয় না - আমরা ১% রিস্কে সেফ থাকতে শেখাই</b>
"""

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    kb=[
        [InlineKeyboardButton("Account Create Link", url=AFFILIATE_LINK)],
        [InlineKeyboardButton("🌐 Website", url=WEBSITE_URL), InlineKeyboardButton("❓ Get ID?", callback_data="how_id")],
        [InlineKeyboardButton("💬 Channel", url=CHANNEL_LINK), InlineKeyboardButton("👨‍💼 Admin", url="https://t.me/ghostsupportbd")]
    ]
    await update.message.reply_text(WELCOME, reply_markup=InlineKeyboardMarkup(kb), parse_mode='HTML')

async def myid(update: Update, context: ContextTypes.DEFAULT_TYPE):
    u = update.effective_user
    await update.message.reply_text(f"🆔 Your ID: <code>{u.id}</code> @{u.username or 'N/A'} Admin:{ADMIN_ID}", parse_mode='HTML')

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text.strip()
    user = update.effective_user
    if user.id == ADMIN_ID and ADMIN_ID in pending_custom_msg:
        target_uid = pending_custom_msg.pop(ADMIN_ID)
        try:
            await context.bot.send_message(chat_id=int(target_uid), text=f"📩 <b>Admin:</b>\n\n{text}\n\n- GHOST Team 👻", parse_mode='HTML')
            await update.message.reply_text(f"✅ Sent to {target_uid}")
        except Exception as e:
            await update.message.reply_text(f"❌ {e}")
        return
    if text.upper() in PAIRS:
        try:
            s = signal_engine.get_signal(text.upper(), "FAST")
            emoji = "🟢" if s["signal"]=="UP" else "🔴" if s["signal"]=="DOWN" else "⏳"
            msg = f"📊 <b>{text.upper()}</b> {emoji} {s['signal']} {s.get('confidence',0)}% Price {s.get('price')} RSI {s['filter'].get('rsi')}"
            await update.message.reply_text(msg, parse_mode='HTML')
        except Exception as e:
            await update.message.reply_text(f"❌ {e}")
        return
    if "#" in text:
        num_only = re.sub(r'[^0-9]', '', text)
        await update.message.reply_text(f"🚫 # ছাড়া ID দিন: {num_only}", parse_mode='HTML')
        return
    if not text.isdigit():
        if any(c.isdigit() for c in text):
            num_only = re.sub(r'[^0-9]', '', text)
            await update.message.reply_text(f"🚫 শুধু নাম্বার: {num_only}", parse_mode='HTML')
        else:
            await update.message.reply_text("👻 ID পাঠান: 1234567\nEURUSD লিখে signal\n/start", parse_mode='HTML')
        return
    tid = text
    if len(tid) < 4 or len(tid) > 12:
        await update.message.reply_text("❌ ID 4-12 digit")
        return
    user_trader_map[user.id] = tid
    kb = [
        [InlineKeyboardButton("✅ হ্যাঁ, ডিপোজিট করেছি", callback_data=f"dpy_{user.id}_{tid}"), InlineKeyboardButton("❌ না, করিনি", callback_data=f"dpn_{user.id}_{tid}")],
        [InlineKeyboardButton("📸 Screenshot আছে", callback_data=f"proof_{user.id}_{tid}")]
    ]
    await update.message.reply_text(f"✅ ID <code>{tid}</code> Received!\n💰 <b>ডিপোজিট করেছেন?</b>", reply_markup=InlineKeyboardMarkup(kb), parse_mode='HTML')
    try:
        if ADMIN_ID != 0:
            kb_admin = [
                [InlineKeyboardButton("✅ Direct Approve", callback_data=f"ap_{user.id}_{tid}"), InlineKeyboardButton("✍️ Custom Msg", callback_data=f"cm_{user.id}")],
                [InlineKeyboardButton("❌ Reject", callback_data=f"rj_{user.id}")]
            ]
            await context.bot.send_message(chat_id=ADMIN_ID, text=f"📩 <b>New ID</b>\nTrader ID: <code>{tid}</code>\nUser: <code>{user.id}</code> @{user.username or 'N/A'}", reply_markup=InlineKeyboardMarkup(kb_admin), parse_mode='HTML')
    except Exception as e:
        logging.error(f"Admin notify {e}")

async def handle_media(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    if user.id == ADMIN_ID and ADMIN_ID in pending_custom_msg:
        target_uid = pending_custom_msg.pop(ADMIN_ID)
        try:
            cap = update.message.caption or "Admin file"
            if update.message.photo:
                await context.bot.send_photo(chat_id=int(target_uid), photo=update.message.photo[-1].file_id, caption=f"📩 {cap}", parse_mode='HTML')
            else:
                await context.bot.send_message(chat_id=int(target_uid), text=f"📩 {cap}")
            await update.message.reply_text(f"✅ Media sent to {target_uid}")
        except Exception as e:
            await update.message.reply_text(f"❌ {e}")
        return
    tid = user_trader_map.get(user.id, "N/A")
    kb = [[InlineKeyboardButton("✅ হ্যাঁ, ডিপোজিট করেছি", callback_data=f"dpyM_{user.id}_{tid}"), InlineKeyboardButton("❌ না", callback_data=f"dpnM_{user.id}_{tid}")]]
    await update.message.reply_text(f"📸 Received ID {tid}\n💰 ডিপোজিট করেছেন?", reply_markup=InlineKeyboardMarkup(kb), parse_mode='HTML')
    try:
        if ADMIN_ID != 0:
            cap = f"📸 Proof User {user.id} @{user.username or 'N/A'} Trader {tid}"
            kb_admin = [[InlineKeyboardButton("✅ Approve", callback_data=f"ap_{user.id}_{tid}"), InlineKeyboardButton("✍️ Custom Msg", callback_data=f"cm_{user.id}")], [InlineKeyboardButton("❌ Reject", callback_data=f"rj_{user.id}")]]
            if update.message.photo:
                await context.bot.send_photo(chat_id=ADMIN_ID, photo=update.message.photo[-1].file_id, caption=cap, reply_markup=InlineKeyboardMarkup(kb_admin), parse_mode='HTML')
            elif update.message.sticker:
                await context.bot.send_sticker(chat_id=ADMIN_ID, sticker=update.message.sticker.file_id)
                await context.bot.send_message(chat_id=ADMIN_ID, text=cap, reply_markup=InlineKeyboardMarkup(kb_admin), parse_mode='HTML')
            elif update.message.document:
                await context.bot.send_document(chat_id=ADMIN_ID, document=update.message.document.file_id, caption=cap, reply_markup=InlineKeyboardMarkup(kb_admin), parse_mode='HTML')
    except Exception as e:
        logging.error(f"Forward fail {e}")

async def callbacks(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query
    await q.answer()
    d = q.data
    user = update.effective_user
    logging.info(f"CB {d} from {user.id}")
    if d == "how_id":
        await q.message.reply_text("📸 Profile > Trader ID copy, # ছাড়া")
    elif d.startswith("proof_"):
        tid = d.split("_")[2] if len(d.split("_"))>2 else "N/A"
        await q.message.reply_text(f"📸 Screenshot দিন ID {tid}")
    elif d.startswith("dpy_"):
        parts = d.split("_")
        uid = parts[1]
        trader_id = parts[2] if len(parts)>2 else "N/A"
        try:
            kb_admin = [[InlineKeyboardButton("💰 Deposit Select", callback_data=f"ap_{uid}_{trader_id}"), InlineKeyboardButton("✍️ Custom Msg", callback_data=f"cm_{uid}")], [InlineKeyboardButton("❌ Reject", callback_data=f"rj_{uid}")]]
            await context.bot.send_message(chat_id=ADMIN_ID, text=f"✅ User Claims Deposit\nUser {uid} Trader {trader_id}", reply_markup=InlineKeyboardMarkup(kb_admin), parse_mode='HTML')
            await q.edit_message_text(f"✅ Claim sent Admin ID {trader_id}")
        except Exception as e:
            await q.edit_message_text(f"Fail {e}")
    elif d.startswith("dpn_"):
        trader_id = d.split("_")[2] if len(d.split("_"))>2 else "N/A"
        await q.edit_message_text(f"❌ Deposit করেন নাই ID {trader_id} Link: {AFFILIATE_LINK}")
    elif d.startswith("dpyM_"):
        raw = d.replace("dpyM_","")
        sp = raw.split("_")
        uid = sp[0]
        trader_id = sp[1] if len(sp)>1 else "N/A"
        try:
            kb_admin = [[InlineKeyboardButton("💰 Approve Amount", callback_data=f"ap_{uid}_{trader_id}"), InlineKeyboardButton("✍️ Custom Msg", callback_data=f"cm_{uid}")], [InlineKeyboardButton("❌ Reject", callback_data=f"rj_{uid}")]]
            await context.bot.send_message(chat_id=ADMIN_ID, text=f"✅ Media + Deposit Claim User {uid} ID {trader_id}", reply_markup=InlineKeyboardMarkup(kb_admin), parse_mode='HTML')
            await q.edit_message_text(f"✅ Media claim sent ID {trader_id}")
        except Exception as e:
            await q.edit_message_text(f"Fail {e}")
    elif d.startswith("dpnM_"):
        trader_id = d.replace("dpnM_","").split("_")[1] if "_" in d.replace("dpnM_","") else "N/A"
        await q.edit_message_text(f"❌ Deposit না ID {trader_id}")
    elif d.startswith("cm_") and not d.startswith("cmdep_") and not d.startswith("cmnolink_") and not d.startswith("cmscreen_") and not d.startswith("cmwrite_"):
        uid = d.split("_")[1]
        if user.id != ADMIN_ID:
            return
        kb_custom = [
            [InlineKeyboardButton("❌ Deposit nai", callback_data=f"cmdep_{uid}"), InlineKeyboardButton("❌ Link theke na", callback_data=f"cmnolink_{uid}")],
            [InlineKeyboardButton("📸 Screenshot chai", callback_data=f"cmscreen_{uid}"), InlineKeyboardButton("✍️ Nije likhbo", callback_data=f"cmwrite_{uid}")],
            [InlineKeyboardButton("⬅️ Back", callback_data=f"ap_{uid}_N/A")]
        ]
        await q.edit_message_text(f"✍️ Custom Select Member {uid}", reply_markup=InlineKeyboardMarkup(kb_custom), parse_mode='HTML')
    elif d.startswith("cmwrite_"):
        uid = d.split("_")[1]
        pending_custom_msg[ADMIN_ID] = int(uid)
        await q.edit_message_text(f"✍️ Type Mode ON Member {uid} ke ki pathabo likhun:")
    elif d.startswith("cmdep_"):
        uid = d.split("_")[1]
        msg = f"📩 Deposit Not Found\nLink theke $10 deposit koren\nLink: {AFFILIATE_LINK}"
        try:
            await context.bot.send_message(chat_id=int(uid), text=msg, parse_mode='HTML')
            await q.edit_message_text(f"✅ Sent to {uid}")
        except Exception as e:
            await q.edit_message_text(f"❌ {e}")
    elif d.startswith("cmnolink_"):
        uid = d.split("_")[1]
        msg = f"❌ Link theke na\nNew account khulun: {AFFILIATE_LINK}"
        try:
            await context.bot.send_message(chat_id=int(uid), text=msg, parse_mode='HTML')
            await q.edit_message_text(f"✅ Sent to {uid}")
        except Exception as e:
            await q.edit_message_text(f"❌ {e}")
    elif d.startswith("cmscreen_"):
        uid = d.split("_")[1]
        msg = "📸 Screenshot din Deposit History"
        try:
            await context.bot.send_message(chat_id=int(uid), text=msg, parse_mode='HTML')
            await q.edit_message_text(f"✅ Sent to {uid}")
        except Exception as e:
            await q.edit_message_text(f"❌ {e}")
    elif d.startswith("ap_"):
        parts=d.split("_")
        uid=parts[1]
        trader_id=parts[2] if len(parts)>2 else "N/A"
        kb=[
            [InlineKeyboardButton("💵 $10", callback_data=f"dep_{uid}_{trader_id}_10"), InlineKeyboardButton("💵 $20", callback_data=f"dep_{uid}_{trader_id}_20"), InlineKeyboardButton("💵 $30", callback_data=f"dep_{uid}_{trader_id}_30"), InlineKeyboardButton("💵 $40", callback_data=f"dep_{uid}_{trader_id}_40")],
            [InlineKeyboardButton("💵 $50", callback_data=f"dep_{uid}_{trader_id}_50"), InlineKeyboardButton("💵 $60", callback_data=f"dep_{uid}_{trader_id}_60"), InlineKeyboardButton("💵 $70", callback_data=f"dep_{uid}_{trader_id}_70"), InlineKeyboardButton("💵 $80", callback_data=f"dep_{uid}_{trader_id}_80")],
            [InlineKeyboardButton("💵 $90", callback_data=f"dep_{uid}_{trader_id}_90"), InlineKeyboardButton("💵 $100", callback_data=f"dep_{uid}_{trader_id}_100"), InlineKeyboardButton("💵 $150", callback_data=f"dep_{uid}_{trader_id}_150"), InlineKeyboardButton("💵 $200", callback_data=f"dep_{uid}_{trader_id}_200")],
            [InlineKeyboardButton("💵 $250", callback_data=f"dep_{uid}_{trader_id}_250"), InlineKeyboardButton("💵 $300", callback_data=f"dep_{uid}_{trader_id}_300"), InlineKeyboardButton("💵 $500", callback_data=f"dep_{uid}_{trader_id}_500"), InlineKeyboardButton("💵 $1000", callback_data=f"dep_{uid}_{trader_id}_1000")],
            [InlineKeyboardButton("💵 $5", callback_data=f"dep_{uid}_{trader_id}_5"), InlineKeyboardButton("💵 $15", callback_data=f"dep_{uid}_{trader_id}_15"), InlineKeyboardButton("💵 $25", callback_data=f"dep_{uid}_{trader_id}_25"), InlineKeyboardButton("✍️ Custom Msg", callback_data=f"cm_{uid}"), InlineKeyboardButton("❌ Reject", callback_data=f"rj_{uid}")]
        ]
        await q.edit_message_text(f"💰 Deposit Select {trader_id} User {uid}", reply_markup=InlineKeyboardMarkup(kb), parse_mode='HTML')
    elif d.startswith("dep_"):
        try:
            parts=d.split("_")
            uid=parts[1]
            trader_id=parts[2]
            amount=parts[3]
            premium_token = ""
            try:
                premium_token = create_premium_token(trader_id, uid, amount)
            except Exception as e:
                premium_token = f"{trader_id}_{uid}_{amount}_{secrets.token_urlsafe(8)}"
                approved_tokens[premium_token] = {"trader_id": str(trader_id), "user_id": str(uid), "amount": str(amount), "created": int(time.time())}
                save_tokens()
            premium_link = f"{WEBSITE_URL}/?access={premium_token}"
            kb=[
                [InlineKeyboardButton("🔓 PREMIUM ACCESS", url=premium_link)],
                [InlineKeyboardButton("🌐 Website", url=premium_link)],
                [InlineKeyboardButton("🔖 Guide", callback_data="bookmark_guide"), InlineKeyboardButton("💬 Channel", url=CHANNEL_LINK)]
            ]
            msg = f"""🎉 CONGRATULATIONS PREMIUM APPROVED 🎉

Trader ID: <code>{trader_id}</code>
Deposit: ${amount}
Status: ✅ ACTIVE

🔓 YOUR SPECIAL LINK:
<code>{premium_link}</code>

Normal link e sudhu Channel+Admin, ei link e sob Premium.

- GHOST Team 👻
"""
            try:
                with open('approved_sticker.jpg','rb') as sticker:
                    await context.bot.send_photo(chat_id=int(uid), photo=sticker, caption=f"✅ ID {trader_id} ${amount}")
            except:
                pass
            await context.bot.send_message(chat_id=int(uid), text=msg, reply_markup=InlineKeyboardMarkup(kb), parse_mode='HTML')
            await q.edit_message_text(f"✅ Approved {trader_id} ${amount} -> {uid}\n{premium_link}")
        except Exception as e:
            logging.error(f"dep fail {traceback.format_exc()}")
            await q.edit_message_text(f"❌ Error {e}")
    elif d.startswith("rj_"):
        uid=d.split("_")[1]
        try:
            await context.bot.send_message(chat_id=int(uid), text="❌ Rejected - new account from link")
            await q.edit_message_text("❌ Rejected")
        except Exception as e:
            await q.edit_message_text(f"Fail {e}")
    elif d=="bookmark_guide":
        guide = f"Bookmarklet: javascript:(function(){{var s=document.createElement('script');s.src='{WEBSITE_URL}/ghost.js?v='+Date.now();document.body.appendChild(s);}})();"
        await q.message.reply_text(guide)

def run_flask():
    port=int(os.environ.get("PORT",10000))
    flask_app.run(host="0.0.0.0", port=port)

def run_bot():
    if not BOT_TOKEN:
        logging.error("BOT_TOKEN missing")
        return
    app=ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("myid", myid))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    app.add_handler(MessageHandler(filters.PHOTO, handle_media))
    app.add_handler(MessageHandler(filters.Sticker.ALL, handle_media))
    app.add_handler(MessageHandler(filters.Document.ALL, handle_media))
    app.add_handler(CallbackQueryHandler(callbacks))
    logging.info(f"Bot polling ADMIN_ID={ADMIN_ID}")
    app.run_polling()

if __name__=="__main__":
    threading.Thread(target=run_flask, daemon=True).start()
    run_bot()
