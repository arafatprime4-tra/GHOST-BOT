import os, json
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, MessageHandler, filters, ContextTypes

TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID", "0"))
AFFILIATE_LINK = os.getenv("AFFILIATE_LINK")
APPROVED_FILE = "approved_ids.json"

def load_approved():
    if os.path.exists(APPROVED_FILE):
        with open(APPROVED_FILE, 'r') as f:
            return json.load(f)
    return []

def save_approved(data):
    with open(APPROVED_FILE, 'w') as f:
        json.dump(data, f)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(f"👻 GHOST TRADER FREE BOT\n\n1. Ei link theke account khulo:\n{AFFILIATE_LINK}\n\n2. Trader ID pathao\n3. Approve hole free bot paba")

async def handle_id(update: Update, context: ContextTypes.DEFAULT_TYPE):
    tid = update.message.text.strip()
    if not tid.isdigit():
        await update.message.reply_text("Sothik Trader ID dao, jemon 81234567")
        return
    keyboard = [[InlineKeyboardButton(f"✅ Approve {tid}", callback_data=f"approve_{tid}_{update.effective_user.id}")]]
    await context.bot.send_message(chat_id=ADMIN_ID, text=f"New ID: {tid} from @{update.effective_user.username}", reply_markup=InlineKeyboardMarkup(keyboard))
    await update.message.reply_text("Admin ke pathano holo, approve hole bot paba")

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query
    await q.answer()
    if q.data.startswith("approve_"):
        tid = q.data.split("_")[1]
        uid = int(q.data.split("_")[2])
        data = load_approved()
        if tid not in data:
            data.append(tid)
            save_approved(data)
        # Ekhane tomar bookmarklet code pathabe
        await context.bot.send_message(chat_id=uid, text=f"✅ Approved {tid}! Tomar GHOST bot code:\n\njavascript:(function(){{alert('GHOST TRADER Approved! Bookmark e save koro')}})();")
        await q.edit_message_text(f"Approved {tid}")

app = Application.builder().token(TOKEN).build()
app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_id))
app.add_handler(CallbackQueryHandler(button_handler))
print("Bot running...")
app.run_polling()
