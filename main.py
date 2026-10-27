# pip install python-telegram-bot==20.7
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
    text = f"👻 GHOST - FREE BOT\n\n1. Ei link theke account khulo:\n{AFFILIATE_LINK}\n\n2. Profile theke Trader ID copy koro\n3. Ekhane ID ta pathao, ami verify kore free bot diye dibo.\n\nNote: 100% win na, educational tool."
    await update.message.reply_text(text)

async def handle_id(update: Update, context: ContextTypes.DEFAULT_TYPE):
    trader_id = update.message.text.strip()
    if not trader_id.isdigit():
        await update.message.reply_text("Trader ID sudhu number hobe, jemon 82345678")
        return
    
    # Admin ke pathao approve er jonno
    keyboard = [[
        InlineKeyboardButton(f"✅ Approve {trader_id}", callback_data=f"approve_{trader_id}_{update.effective_user.id}"),
        InlineKeyboardButton("❌ Reject", callback_data=f"reject_{update.effective_user.id}")
    ]]
    await context.bot.send_message(
        chat_id=ADMIN_ID,
        text=f"New ID: {trader_id} from @{update.effective_user.username}",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )
    await update.message.reply_text(f"ID {trader_id} admin ke pathano holo, 5 min e approve hobe.")

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    if query.data.startswith("approve_"):
        tid = query.data.split("_")[1]
        uid = int(query.data.split("_")[2])
        data = load_approved()
        if tid not in data:
            data.append(tid)
            save_approved(data)
        await context.bot.send_message(chat_id=uid, text=f"✅ Approved {tid}! Ekhon tomar bot code niche dilam.")
        # Bookmarklet code ta ekhane pathabe
        with open("advanced_bookmarklet.txt", "r", encoding="utf-8") as f:
            code = f.read()
        await context.bot.send_message(chat_id=uid, text=code[:4000])
        await query.edit_message_text(f"Approved {tid}")

def main():
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_id))
    app.add_handler(CallbackQueryHandler(button_handler))
    app.run_polling()

if __name__ == "__main__":
    main()
