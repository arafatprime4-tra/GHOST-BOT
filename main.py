import os
import json
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, MessageHandler, filters, ContextTypes

TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = os.getenv("ADMIN_ID")
AFFILIATE_LINK = os.getenv("AFFILIATE_LINK")

# ID check
if not TOKEN:
    print("ERROR: BOT_TOKEN missing!")
if ADMIN_ID:
    ADMIN_ID = int(ADMIN_ID)

APPROVED_FILE = "approved_ids.json"

def load_approved():
    if os.path.exists(APPROVED_FILE):
        try:
            with open(APPROVED_FILE, 'r') as f:
                return json.load(f)
        except:
            return []
    return []

def save_approved(data):
    with open(APPROVED_FILE, 'w') as f:
        json.dump(data, f)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    msg = f"👻 GHOST TRADER - FREE BOT\n\nAmra bot bikri kori na.\n\n1. Ei link theke account khulo:\n{AFFILIATE_LINK}\n\n2. Quotex Profile e giye Trader ID copy koro\n\n3. Ekhane ID ta pathao\n\nAdmin check kore free te approve kore dibe."
    await update.message.reply_text(msg)

async def handle_id(update: Update, context: ContextTypes.DEFAULT_TYPE):
    trader_id = update.message.text.strip()
    if not trader_id.isdigit() or len(trader_id) < 6:
        await update.message.reply_text("❌ Sothik Trader ID dao, jemon: 12345678")
        return

    approved = load_approved()
    if trader_id in approved:
        await update.message.reply_text(f"✅ {trader_id} agei approved! Tomar bot access ready. Signal bot er kaj sesh holei peye jaba.")
        return

    # Admin er kache pathao
    keyboard = [[InlineKeyboardButton(f"✅ Approve {trader_id}", callback_data=f"approve_{trader_id}_{update.effective_user.id}")]]
    try:
        await context.bot.send_message(
            chat_id=ADMIN_ID,
            text=f"🆕 New Request\nUser: @{update.effective_user.username}\nID: {update.effective_user.id}\nTrader ID: {trader_id}\n\nAffiliate panel e check kore Approve chapho.",
            reply_markup=InlineKeyboardMarkup(keyboard)
        )
        await update.message.reply_text(f"⏳ ID {trader_id} admin er kache geche. 2-3 min e approve hobe.")
    except Exception as e:
        await update.message.reply_text(f"Admin ID vul ache. Error: {e}")

async def approve_btn(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    data = query.data
    if data.startswith("approve_"):
        parts = data.split("_")
        tid = parts[1]
        uid = int(parts[2])
        approved = load_approved()
        if tid not in approved:
            approved.append(tid)
            save_approved(approved)
        await context.bot.send_message(chat_id=uid, text=f"🎉 Congrats! Trader ID {tid} Approved! ✅\n\nEkhon tomar GHOST TRADER free access active. Signal bot ready holei ekhane code peye jaba.")
        await query.edit_message_text(f"✅ Approved {tid} for {uid}")

async def main():
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_id))
    app.add_handler(CallbackQueryHandler(approve_btn))
    print("GHOST TRADER Bot Running...")
    await app.run_polling()

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
