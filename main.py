import os, json, threading
from flask import Flask
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, MessageHandler, filters, ContextTypes

TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID")) if os.getenv("ADMIN_ID") else 0
AFFILIATE_LINK = os.getenv("AFFILIATE_LINK")

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
    await update.message.reply_text(f"👻 GHOST FREE\nLink: {AFFILIATE_LINK}\n\nTrader ID pathao")

async def handle_id(update: Update, context: ContextTypes.DEFAULT_TYPE):
    tid = update.message.text.strip()
    if not tid.isdigit(): return
    kb = [[InlineKeyboardButton(f"✅ Approve {tid}", callback_data=f"approve_{tid}_{update.effective_user.id}")]]
    await context.bot.send_message(chat_id=ADMIN_ID, text=f"New ID {tid} from @{update.effective_user.username}", reply_markup=InlineKeyboardMarkup(kb))
    await update.message.reply_text("Admin ke pathano holo.")

async def approve_btn(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query
    await q.answer()
    tid = q.data.split("_")[1]
    uid = int(q.data.split("_")[2])
    data = load_approved()
    if tid not in data:
        data.append(tid)
        save_approved(data)
    await context.bot.send_message(chat_id=uid, text=f"✅ {tid} Approved! Signal bot ready hole paba.")
    await q.edit_message_text(f"Approved {tid}")

# Flask web server (Render free te alive thakar jonno)
flask_app = Flask(__name__)
@flask_app.route('/')
def home():
    return "GHOST TRADER Bot Running - Free"

def run_bot():
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_id))
    app.add_handler(CallbackQueryHandler(approve_btn))
    print("Bot Running...")
    app.run_polling()

if __name__ == "__main__":
    threading.Thread(target=run_bot).start()
    port = int(os.environ.get("PORT", 10000))
    flask_app.run(host="0.0.0.0", port=port)
