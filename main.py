import os, json, threading
from flask import Flask
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, MessageHandler, filters, ContextTypes

TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID")) if os.getenv("ADMIN_ID") else 0
AFFILIATE_LINK = os.getenv("AFFILIATE_LINK", "")
CHANNEL_LINK = "https://t.me/premierghos"  # tomar channel link bosao

APPROVED_FILE = "approved_ids.json"

def load_approved():
    if os.path.exists(APPROVED_FILE):
        try:
            with open(APPROVED_FILE, 'r') as f: return json.load(f)
        except: return []
    return []

def save_approved(data):
    with open(APPROVED_FILE, 'w') as f: json.dump(data, f)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = (
        "👻 *GHOST TRADER - PREMIUM FREE* 👻\n\n"
        "We Don't Sell, We Share Free For Members!\n\n"
        "*Access kivabe paba?*\n"
        "1️⃣ Niche link theke account khulo\n"
        "2️⃣ Profile theke Trader ID copy koro\n"
        "3️⃣ Ekhane ID ta pathao\n\n"
        "✅ Admin check kore 2 min e approve kore dibe.\n\n"
        "⚠️ *Risk Warning:* Kono bot 100% win dey na. Eita educational tool."
    )
    keyboard = [
        [InlineKeyboardButton("🔗 Create Quotex Account", url=AFFILIATE_LINK)],
        [
            InlineKeyboardButton("🆔 How to get ID?", callback_data="help_id"),
            InlineKeyboardButton("📊 Bot Info", callback_data="bot_info")
        ],
        [InlineKeyboardButton("💬 Join GHOST Channel", url=CHANNEL_LINK)]
    ]
    await update.message.reply_text(text, reply_markup=InlineKeyboardMarkup(keyboard), parse_mode="Markdown")

async def handle_id(update: Update, context: ContextTypes.DEFAULT_TYPE):
    tid = update.message.text.strip()
    if not tid.isdigit() or len(tid) < 6:
        await update.message.reply_text("❌ Sothik Trader ID dao, jemon: 12345678")
        return
    approved = load_approved()
    if tid in approved:
        await update.message.reply_text(f"✅ {tid} agei approved! Signal bot ready hole auto paba.")
        return
    kb = [[InlineKeyboardButton(f"✅ Approve {tid}", callback_data=f"approve_{tid}_{update.effective_user.id}")]]
    await context.bot.send_message(chat_id=ADMIN_ID, text=f"🆕 New Request\nUser: @{update.effective_user.username}\nID: {update.effective_user.id}\nTrader ID: {tid}", reply_markup=InlineKeyboardMarkup(kb))
    await update.message.reply_text(f"⏳ *{tid}* admin er kache geche. Approve hole bot paba.", parse_mode="Markdown")

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query
    await q.answer()
    data = q.data

    if data == "help_id":
        await q.message.reply_text("📸 *How to get Trader ID?*\n\n1. Quotex app open koro\n2. Profile e jao\n3. Niche Trader ID likha thakbe (7-8 digit)\n4. Oita copy kore ekhane paste koro\n\nExample: `12345678`", parse_mode="Markdown")

    elif data == "bot_info":
        await q.message.reply_text("📊 *GHOST BOT Info*\n\n• Strategy: EMA 20+50 + RSI 14 + 3 Candle\n• Type: Signal Only (No Auto Trade)\n• Win Rate: Market er upor depend, 100% na\n• Price: FREE for my referral users\n• Risk: 1% per trade use korba", parse_mode="Markdown")

    elif data.startswith("approve_"):
        tid = data.split("_")[1]
        uid = int(data.split("_")[2])
        approved = load_approved()
        if tid not in approved:
            approved.append(tid)
            save_approved(approved)
        await context.bot.send_message(chat_id=uid, text=f"🎉 *Approved!* Trader ID `{tid}` ✅\n\nTomar GHOST TRADER access active. Signal bot er code khub taratari peye jaba.", parse_mode="Markdown")
        await q.edit_message_text(f"✅ Approved {tid} for {uid}")

# Flask for Render Free
flask_app = Flask(__name__)
@flask_app.route('/')
def home(): return "GHOST TRADER Bot Running - Premium"

def run_bot():
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_id))
    app.add_handler(CallbackQueryHandler(button_handler))
    print("Bot Running - Premium...")
    app.run_polling()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    threading.Thread(target=lambda: flask_app.run(host="0.0.0.0", port=port)).start()
    run_bot()
