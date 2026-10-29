
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

# === PREMIUM TOKEN SYSTEM ===
TOKEN_FILE = "approved_tokens.json"
approved_tokens = {}
try:
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, 'r', encoding='utf-8') as tf:
            approved_tokens = json.load(tf)
        logging.info(f"Loaded {len(approved_tokens)} tokens")
except Exception as e:
    logging.error(f"Token load fail {e}")
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
        pair=request.args.get('pair','EURUSD').upper()
        # Optional token check for signal - if token provided, verify, else allow (can lock later)
        # token = request.args.get('token') or request.args.get('access')
        # if token and token not in approved_tokens:
        #    return jsonify({"signal":"LOCKED","error":"Invalid premium token"})
        return jsonify(signal_engine.get_signal(pair,mode))
    except Exception as e: 
        return jsonify({"signal":"ERROR","error":str(e)})

@flask_app.route('/api/verify')
def api_verify():
    token = request.args.get('token','') or request.args.get('access','') or request.args.get('premium','')
    token = token.strip()
    if not token:
        return jsonify({"valid": False, "reason": "No token"})
    data = approved_tokens.get(token)
    if data:
        return jsonify({"valid": True, "data": data})
    else:
        return jsonify({"valid": False, "reason": "Invalid or expired token"})

@flask_app.route('/health')
def health(): 
    return f"GHOST PREMIUM LIVE - ADMIN_ID={ADMIN_ID} - OK"

WELCOME = """👻 <b>GHOST PREMIUM</b> 👻

<b>ভাই, ট্রেডিংয়ে ৯০% মানুষ একা হেরে যায়...</b>
<b>আমরা চাই আপনি ১০% উইনারের মধ্যে থাকেন।</b> ❤️

<b>বটটা ফ্রি, কিন্তু সঠিক পথে। কোনো সেল না।</b>

🤔 <b>কিভাবে শুরু?</b>
1️⃣ <b>লিংক থেকে অ্যাকাউন্ট করে যেকোনো অ্যামাউন্ট ডিপোজিট করুন</b>
2️⃣ <b>প্রোফাইল থেকে Trader ID কপি করুন</b>

⚠️ <b>কোনো বট ১০০% উইন দেয় না - আমরা ১% রিস্কে সেফ থাকতে শেখাই</b>
"""

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    kb=[
        [InlineKeyboardButton("🔗 Account Create Link", url=AFFILIATE_LINK)],
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

    if user.id == ADMIN_ID and ADMIN_ID in pending_custom_msg:
        target_uid = pending_custom_msg.pop(ADMIN_ID)
        custom_text = text
        try:
            await context.bot.send_message(chat_id=int(target_uid), text=f"📩 <b>Admin Message for You:</b>\n\n{custom_text}\n\n- GHOST PREMIUM Team 👻", parse_mode='HTML')
            await update.message.reply_text(f"✅ Custom message sent to {target_uid}:\n\n{custom_text}")
        except Exception as e:
            await update.message.reply_text(f"❌ Failed to send to {target_uid}: {e}")
        return

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
            msg = f"📊 <b>{pair} REAL ANALYSIS</b> {real}\n\n{emoji} <b>Signal: {s['signal']}</b> {conf}%\n💰 Price: {price} | {trend} | RSI {rsi}\n\n🧠 Strategies:\n{strategies}\n\n⏱️ Hold 20s\n🌐 {WEBSITE_URL}"
            kb = [[InlineKeyboardButton(f"📈 {pair} Chart e Bot", url=WEBSITE_URL)]]
            await update.message.reply_text(msg, reply_markup=InlineKeyboardMarkup(kb), parse_mode='HTML')
        except Exception as e:
            await update.message.reply_text(f"❌ {pair} analysis error: {e}")
        return

    if "#" in text:
        num_only = re.sub(r'[^0-9]', '', text)
        await update.message.reply_text(f"🚫 <code>{text}</code> পাওয়া যায় নাই!\n\nঅনুগ্রহ করে # ছাড়া শুধু ID পাঠান\nExample: 1234567\n\nআপনি পাঠিয়েছেন: {text} → সঠিক: {num_only if num_only else '1234567'}", parse_mode='HTML')
        return

    if not text.isdigit():
        if any(c.isdigit() for c in text):
            num_only = re.sub(r'[^0-9]', '', text)
            await update.message.reply_text(f"🚫 <code>{text}</code> - ID তে শুধু নাম্বার থাকবে!\n\n✅ সঠিক: <code>{num_only if num_only else '1234567'}</code>\nExample: 1234567", parse_mode='HTML')
        else:
            await update.message.reply_text("👻 <b>GHOST PREMIUM</b>\n\nID পাঠান: শুধু নাম্বার, যেমন <code>1234567</code>\nMarket analysis: যেমন <code>EURUSD</code> লিখুন\nHelp: /start\nID check: /myid", parse_mode='HTML')
        return

    tid = text
    if len(tid) < 4 or len(tid) > 12:
        await update.message.reply_text("❌ ID 4-12 digit er hobe, Example: 1234567")
        return

    user_trader_map[user.id] = tid
    pending_deposit_claims[user.id] = tid

    kb = [
        [InlineKeyboardButton("✅ হ্যাঁ, ডিপোজিট করেছি", callback_data=f"dpy_{user.id}_{tid}"), InlineKeyboardButton("❌ না, করিনি", callback_data=f"dpn_{user.id}_{tid}")],
        [InlineKeyboardButton("📸 Screenshot আছে", callback_data=f"proof_{user.id}_{tid}")]
    ]
    await update.message.reply_text(f"✅ ID <code>{tid}</code> Received! ❤️\n\n💰 <b>আপনি কি ডিপোজিট করেছেন?</b>\n\nআমাদের লিংক থেকে অ্যাকাউন্ট + ডিপোজিট করলে প্রিমিয়াম পাবেন।\nডিপোজিট করে থাকলে Yes বলুন, Admin চেক করবে।", reply_markup=InlineKeyboardMarkup(kb), parse_mode='HTML')
    
    try:
        if ADMIN_ID != 0:
            kb_admin = [
                [InlineKeyboardButton("✅ Direct Approve", callback_data=f"ap_{user.id}_{tid}"), InlineKeyboardButton("✍️ Custom Msg", callback_data=f"cm_{user.id}")],
                [InlineKeyboardButton("❌ Reject", callback_data=f"rj_{user.id}")]
            ]
            await context.bot.send_message(chat_id=ADMIN_ID, text=f"📩 <b>New ID (Waiting Deposit Confirm)</b>\n\n🆔 Trader ID: <code>{tid}</code>\n👤 User ID: <code>{user.id}</code>\n👤 @{user.username or 'N/A'}\n\nUser ke deposit jiggesh kora hoise. Yes bolle janabo.", reply_markup=InlineKeyboardMarkup(kb_admin), parse_mode='HTML')
    except Exception as e:
        logging.error(f"Admin notify fail {e}")

async def handle_media(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    if user.id == ADMIN_ID and ADMIN_ID in pending_custom_msg:
        target_uid = pending_custom_msg.pop(ADMIN_ID)
        try:
            caption = update.message.caption or "📩 Admin sent you a file"
            if update.message.photo:
                await context.bot.send_photo(chat_id=int(target_uid), photo=update.message.photo[-1].file_id, caption=f"📩 <b>Admin:</b>\n\n{caption}", parse_mode='HTML')
            elif update.message.document:
                await context.bot.send_document(chat_id=int(target_uid), document=update.message.document.file_id, caption=f"📩 Admin: {caption}", parse_mode='HTML')
            else:
                await context.bot.send_message(chat_id=int(target_uid), text=f"📩 Admin: {caption}")
            await update.message.reply_text(f"✅ Media sent to {target_uid}")
        except Exception as e:
            await update.message.reply_text(f"❌ Failed {e}")
        return

    tid = user_trader_map.get(user.id, "N/A")
    kb = [[InlineKeyboardButton("✅ হ্যাঁ, ডিপোজিট করেছি", callback_data=f"dpyM_{user.id}_{tid}"), InlineKeyboardButton("❌ না, করিনি", callback_data=f"dpnM_{user.id}_{tid}")]]
    await update.message.reply_text(f"📸 <b>Screenshot/Sticker Received!</b>\n\n🆔 Trader ID: {tid}\n\n💰 <b>আপনি কি ডিপোজিট করেছেন?</b>", reply_markup=InlineKeyboardMarkup(kb), parse_mode='HTML')
    try:
        if ADMIN_ID != 0:
            cap = f"📸 <b>Proof from User</b>\n\n👤 User: {user.id} @{user.username or 'N/A'}\n🆔 Trader ID: {tid}"
            kb_admin = [[InlineKeyboardButton("✅ Approve", callback_data=f"ap_{user.id}_{tid}"), InlineKeyboardButton("✍️ Custom Msg", callback_data=f"cm_{user.id}")], [InlineKeyboardButton("❌ Reject", callback_data=f"rj_{user.id}")]]
            if update.message.photo:
                await context.bot.send_photo(chat_id=ADMIN_ID, photo=update.message.photo[-1].file_id, caption=cap, reply_markup=InlineKeyboardMarkup(kb_admin), parse_mode='HTML')
            elif update.message.sticker:
                await context.bot.send_sticker(chat_id=ADMIN_ID, sticker=update.message.sticker.file_id)
                await context.bot.send_message(chat_id=ADMIN_ID, text=cap, reply_markup=InlineKeyboardMarkup(kb_admin), parse_mode='HTML')
            elif update.message.document:
                await context.bot.send_document(chat_id=ADMIN_ID, document=update.message.document.file_id, caption=cap, reply_markup=InlineKeyboardMarkup(kb_admin), parse_mode='HTML')
    except Exception as e:
        logging.error(f"Forward media fail {e}")

async def callbacks(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query
    await q.answer()
    d = q.data
    user = update.effective_user

    if d == "how_id":
        await q.message.reply_text("📸 Quotex > Profile > Trader ID copy korun, Example: 1234567\n# chara sudhu number pathan!", parse_mode='HTML')
    elif d.startswith("proof_"):
        parts = d.split("_")
        tid = parts[2] if len(parts)>2 else "N/A"
        await q.message.reply_text(f"📸 Screenshot pathan - Trader ID: {tid} er deposit proof din.")
    elif d.startswith("dpy_"):
        parts = d.split("_")
        uid = parts[1]
        trader_id = parts[2] if len(parts)>2 else user_trader_map.get(int(uid), "N/A")
        try:
            kb_admin = [[InlineKeyboardButton("💰 Deposit Select", callback_data=f"ap_{uid}_{trader_id}"), InlineKeyboardButton("✍️ Custom Msg", callback_data=f"cm_{uid}")], [InlineKeyboardButton("❌ Reject", callback_data=f"rj_{uid}")]]
            await context.bot.send_message(chat_id=ADMIN_ID, text=f"✅ <b>User Claims Deposit Done!</b>\n\n👤 User ID: {uid}\n🆔 Trader ID: {trader_id}\n👤 @{q.from_user.username or 'N/A'}\n\n🔍 Admin, check affiliate panel then Approve! Direct access na!", reply_markup=InlineKeyboardMarkup(kb_admin), parse_mode='HTML')
            await q.edit_message_text(f"✅ Thanks! ID {trader_id} deposit claim sent to Admin. 2-5 min wait korun! Deposit na korle access paben na.", parse_mode='HTML')
        except Exception as e:
            await q.edit_message_text(f"Claim noted but fail {e}")
    elif d.startswith("dpn_"):
        parts = d.split("_")
        trader_id = parts[2] if len(parts)>2 else "N/A"
        await q.edit_message_text(f"❌ <b>Deposit koren nai?</b>\n\nID {trader_id} er jonno link theke $10 deposit korun, tarpor Yes bolun!\n\nLink: {AFFILIATE_LINK}\n\nDeposit chara access na!", parse_mode='HTML')
    elif d.startswith("dpyM_"):
        raw = d.replace("dpyM_","")
        sp = raw.split("_")
        uid = sp[0]
        trader_id = sp[1] if len(sp)>1 else user_trader_map.get(int(uid), "N/A")
        try:
            kb_admin = [[InlineKeyboardButton("💰 Approve Amount", callback_data=f"ap_{uid}_{trader_id}"), InlineKeyboardButton("✍️ Custom Msg", callback_data=f"cm_{uid}")], [InlineKeyboardButton("❌ Reject", callback_data=f"rj_{uid}")]]
            await context.bot.send_message(chat_id=ADMIN_ID, text=f"✅ <b>Media + Deposit Claim!</b>\n\n👤 User: {uid}\n🆔 ID: {trader_id}\n\nScreenshot + deposit claim. Check kore approve korun! Deposit chara access na!", reply_markup=InlineKeyboardMarkup(kb_admin), parse_mode='HTML')
            await q.edit_message_text(f"✅ Media + Deposit claim sent! ID {trader_id} - Admin check korbe!")
        except Exception as e:
            await q.edit_message_text(f"Sent but fail {e}")
    elif d.startswith("dpnM_"):
        raw = d.replace("dpnM_","")
        sp = raw.split("_")
        trader_id = sp[1] if len(sp)>1 else "N/A"
        await q.edit_message_text(f"❌ Deposit na korle access na! ID {trader_id} er jonno deposit korun.\nLink: {AFFILIATE_LINK}", parse_mode='HTML')
    elif d.startswith("cm_") and not d.startswith("cmdep_") and not d.startswith("cmnolink_") and not d.startswith("cmscreen_") and not d.startswith("cmwrite_"):
        uid = d.split("_")[1]
        if user.id != ADMIN_ID:
            await q.message.reply_text("❌ Only admin!")
            return
        kb_custom = [
            [InlineKeyboardButton("❌ Deposit nai - msg", callback_data=f"cmdep_{uid}"), InlineKeyboardButton("❌ Link theke na", callback_data=f"cmnolink_{uid}")],
            [InlineKeyboardButton("📸 Screenshot chai", callback_data=f"cmscreen_{uid}"), InlineKeyboardButton("✍️ Nije likhbo", callback_data=f"cmwrite_{uid}")],
            [InlineKeyboardButton("⬅️ Back", callback_data=f"ap_{uid}_N/A")]
        ]
        await q.edit_message_text(f"✍️ <b>Custom Message Select</b>\n\nMember ID: {uid} ke ki pathabo?\n\n1 click e preset pathate paro, na hole Nije likhbo click kore type koro:", reply_markup=InlineKeyboardMarkup(kb_custom), parse_mode='HTML')
    elif d.startswith("cmwrite_"):
        uid = d.split("_")[1]
        if user.id != ADMIN_ID:
            await q.message.reply_text("❌ Only admin!")
            return
        pending_custom_msg[ADMIN_ID] = int(uid)
        await q.edit_message_text(f"✍️ <b>Type Mode ON</b>\n\nMember ID: {uid} ke ki pathabo ekhon likhun:\n\nExample: Bhai apnar account amader link theke hoise kintu deposit koren nai, $10 deposit koren tarpor ID pathan\n\nEkhon niche text likhun, ami member ke pathay dibo (Direct access jabe na):", parse_mode='HTML')
    elif d.startswith("cmdep_"):
        uid = d.split("_")[1]
        msg = """📩 <b>Deposit Not Found</b>

Bhai apnar Trader ID amader link theke thik ache, kintu deposit check korlam - deposit hoy nai ❌

👉 Amader link theke minimum $10 deposit koren
👉 Tarpor screenshot + Trader ID pathan
👉 Ami sathe sathe Premium diye dibo

Deposit chara access deya jabe na - Quotex er rule.

Link: """ + AFFILIATE_LINK + """

- GHOST PREMIUM Team 👻"""
        try:
            await context.bot.send_message(chat_id=int(uid), text=msg, parse_mode='HTML')
            await q.edit_message_text(f"✅ Deposit-nai preset sent to {uid}")
        except Exception as e:
            await q.edit_message_text(f"❌ Send fail {e}")
    elif d.startswith("cmnolink_"):
        uid = d.split("_")[1]
        msg = """❌ <b>Account Link Theke Na</b>

Bhai apnar account ta amader affiliate link theke khola na.

👉 Amader link theke notun account khulun: """ + AFFILIATE_LINK + """
👉 Tarpor $10 deposit koren
👉 Tarpor Profile theke Trader ID (sudhu number, # chara) pathan - Example: 1234567

Purono account diye hobe na.

- GHOST PREMIUM"""
        try:
            await context.bot.send_message(chat_id=int(uid), text=msg, parse_mode='HTML')
            await q.edit_message_text(f"✅ Link-theke-na preset sent to {uid}")
        except Exception as e:
            await q.edit_message_text(f"❌ Fail {e}")
    elif d.startswith("cmscreen_"):
        uid = d.split("_")[1]
        msg = """📸 <b>Screenshot Din</b>

Bhai apnar deposit check korte screenshot lagbe.

👉 Quotex > Deposit History er screenshot din
👉 Sathe Trader ID din

Ami check kore sathe sathe approve kore dibo.

- GHOST PREMIUM"""
        try:
            await context.bot.send_message(chat_id=int(uid), text=msg, parse_mode='HTML')
            await q.edit_message_text(f"✅ Screenshot-chao preset sent to {uid}")
        except Exception as e:
            await q.edit_message_text(f"❌ Fail {e}")
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
        await q.edit_message_text(f"💰 <b>Deposit Select for {trader_id}</b>\n\nUser ID: {uid}\nTrader ID: {trader_id}\n\nKoto deposit korse select korun (Check kore! Deposit chara access na):", reply_markup=InlineKeyboardMarkup(kb), parse_mode='HTML')
    elif d.startswith("dep_"):
        parts=d.split("_")
        uid=parts[1]
        trader_id=parts[2]
        amount=parts[3]
        # Generate special premium link with token
        premium_token = create_premium_token(trader_id, uid, amount)
        premium_link = f"{WEBSITE_URL}/?access={premium_token}"
        # Personalized ghost.js link with token (optional extra security)
        personalized_ghost = f"{WEBSITE_URL}/ghost.js?token={premium_token}"
        kb=[
            [InlineKeyboardButton("🔓 PREMIUM ACCESS - CLICK HERE", url=premium_link)],
            [InlineKeyboardButton("🌐 Website + Bookmarklet", url=premium_link)],
            [InlineKeyboardButton("🔖 Bookmarklet Guide", callback_data="bookmark_guide"), InlineKeyboardButton("📚 Academy", url=ACADEMY_LINK)],
            [InlineKeyboardButton("📱 App Link", url=APP_LINK), InlineKeyboardButton("💬 Channel", url=CHANNEL_LINK)]
        ]
        msg = f"""🎉 <b>CONGRATULATIONS! PREMIUM APPROVED!</b> 🎉

❤️ <b>Bhai, apnake welcome - 10K+ winner family er part!</b>

🆔 <b>Trader ID:</b> <code>{trader_id}</code>
💰 <b>Total Deposit:</b> <b>${amount}</b>
📊 <b>Status:</b> ✅ PREMIUM ACTIVE

🔓 <b>YOUR SPECIAL PREMIUM LINK (Secret):</b>
<code>{premium_link}</code>

⚠️ <b>Ei link ta sudhu apnar jonno - onno keu dile kaj korbe na? Kaj korbe kintu sudhu apnar ID er jonno - share korben na.</b>

👉 Ei link e gele sob Premium jinis dekhte paben:
- Bookmarklet COPY button
- Signal plate, Dashboard
- Academy, App Link

❌ Normal link e gele ( {WEBSITE_URL} ) sudhu Channel + Admin dekhbe, premium dekhbe na.

🔖 <b>Bookmarklet:</b> Premium link er vitore giye COPY button e click korun!

- GHOST PREMIUM Team 👻
"""
        try:
            try:
                with open('approved_sticker.jpg','rb') as sticker:
                    await context.bot.send_photo(chat_id=int(uid), photo=sticker, caption=f"✅ Confirmed!\nID: {trader_id} | ${amount}")
            except Exception as se:
                logging.info(f"Sticker fail {se}")
            await context.bot.send_message(chat_id=int(uid), text=msg, reply_markup=InlineKeyboardMarkup(kb), parse_mode='HTML')
            await q.edit_message_text(f"✅ Approved ID {trader_id} - ${amount} - Sent to {uid} + Sticker")
        except Exception as e:
            await q.edit_message_text(f"Approved but fail {e}")
    elif d.startswith("rj_"):
        uid=d.split("_")[1]
        try:
            try:
                with open('rejected_sticker.jpg','rb') as sticker:
                    await context.bot.send_photo(chat_id=int(uid), photo=sticker, caption="❌ Your Account Was Not Opened From Our Link")
            except:
                pass
            await context.bot.send_message(chat_id=int(uid), text="❌ Rejected - Affiliate link diye new account khulun, tarpor ID pathan (1234567)")
            await q.edit_message_text("❌ Rejected + Sticker sent")
        except Exception as e:
            await q.edit_message_text(f"Reject fail {e}")
    elif d=="bookmark_guide":
        guide = f"""🔖 <b>UNIVERSAL BOOKMARKLET</b> 🔖

1 ta bookmarklet e PC/Mobile sob cholbe!

🌐 Website: {WEBSITE_URL}
COPY button e click koro

📱 Mobile: Chrome > Bookmarks > Add > Name: GHOST > URL: javascript:(function(){{var s=document.createElement('script');s.src='{WEBSITE_URL}/ghost.js?v='+Date.now();document.body.appendChild(s);}})();

✅ Bot asbe: PA WICK PROFIT • SAFE 1M • Draggable!
"""
        await q.message.reply_text(guide, parse_mode='HTML')

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
