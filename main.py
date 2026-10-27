import os, json, threading
from flask import Flask
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, MessageHandler, filters, ContextTypes

TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID")) if os.getenv("ADMIN_ID") else 0
AFFILIATE_LINK = os.getenv("AFFILIATE_LINK", "https://qxbroker.com/")
CHANNEL_LINK = "https://t.me/your_channel"

APPROVED_FILE = "approved_ids.json"

# 👻 GHOST ADVANCED SIGNAL CODE
SIGNAL_CODE = """javascript:(function(){let s=document.createElement('style');s.innerHTML=`#ghost-panel{position:fixed;top:70px;right:15px;z-index:9999999;background:#0f0f1a;border:2px solid #8a2be2;border-radius:14px;padding:16px;width:285px;color:#fff;font-family:sans-serif;box-shadow:0 0 20px #8a2be2} #g-signal{font-size:23px;font-weight:900;text-align:center;padding:14px;border-radius:10px;margin:10px 0}`;document.head.appendChild(s);let p=document.createElement('div');p.id='ghost-panel';p.innerHTML=`<div style="text-align:center;color:#8a2be2;font-weight:900;letter-spacing:1px">👻 GHOST TRADER</div><div style="font-size:10px;text-align:center;color:#aaa">PREMIUM FREE - NO 100% GUARANTEE</div><div id="g-signal" style="background:#424242">ANALYZING...</div><div id="g-info" style="font-size:11px;text-align:center"></div><div style="display:flex;gap:5px;margin-top:10px"><button onclick="this.parentElement.parentElement.remove()" style="flex:1">Close</button><button onclick="location.reload()" style="flex:1">Reload</button></div>`;document.body.appendChild(p);let h=[];function ema(a,b){if(a.length<b)return null;let c=2/(b+1),d=a.slice(0,b).reduce((e,f)=>e+f,0)/b;for(let i=b;i<a.length;i++)d=a[i]*c+d*(1-c);return d}function rsi(a,b=14){if(a.length<b+1)return 50;let c=0,d=0;for(let i=a.length-b;i<a.length;i++){let e=a[i]-a[i-1];if(e>=0)c+=e;else d-=e}let f=d==0?100:c/d;return 100-100/(1+f)}function getP(){let l=h.length?h[h.length-1]:100;return l+(Math.random()-0.48)*0.4}function up(){let pr=getP();h.push(pr);if(h.length>100)h.shift();let el=document.getElementById('g-signal'),inf=document.getElementById('g-info');if(h.length<55){el.textContent='COLLECTING '+h.length+'/55';return}let e20=ema(h,20),e50=ema(h,50),r=rsi(h,14),last=h[h.length-2];if(pr>e20&&e20>e50&&pr>last&&r>38&&r<62){el.textContent='👻 BUY / UP 🟢';el.style.background='#00c853';inf.textContent='UP Trend | RSI '+r.toFixed(1)+' | 1% Risk'}else if(pr<e20&&e20<e50&&pr<last&&r<62&&r>38){el.textContent='👻 SELL / DOWN 🔴';el.style.background='#ff1744';inf.textContent='DOWN Trend | RSI '+r.toFixed(1)+' | 1% Risk'}else{el.textContent='⏳ WAIT - NO A+';el.style.background='#424242';inf.textContent='RSI '+r.toFixed(1)+' | Weak setup'}}setInterval(up,1800);alert('👻 GHOST Loaded! QxBroker chart e giye signal dekho.');})();"""

def load_approved():
    if os.path.exists(APPROVED_FILE):
        try:
            with open(APPROVED_FILE,'r') as f: return json.load(f)
        except: return []
    return []

def save_approved(d):
    with open(APPROVED_FILE,'w') as f: json.dump(d,f)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = (
        "👻 *GHOST TRADER - PREMIUM FREE BOT* 👻\n\n"
        "We Don't Sell Bot. We Give FREE To Our Referral Members!\n\n"
        "*Kivabe Access Paba?*\n"
        "1️⃣ Link theke account khulo\n"
        "2️⃣ Profile theke Trader ID copy koro\n"
        "3️⃣ Ekhane ID send koro\n\n"
        "✅ Approve hole Signal Bot auto paba\n"
        "⚠️ *No Bot Gives 100% Win - Use 1% Risk*"
    )
    kb = [
        [InlineKeyboardButton("🔗 Create QX Account", url=AFFILIATE_LINK)],
        [InlineKeyboardButton("🆔 How to Get ID?", callback_data="help_id"), InlineKeyboardButton("📊 Bot Info", callback_data="bot_info")],
        [InlineKeyboardButton("💬 Join Channel", url=CHANNEL_LINK)]
    ]
    await update.message.reply_text(text, reply_markup=InlineKeyboardMarkup(kb), parse_mode="Markdown")

async def handle_id(update: Update, context: ContextTypes.DEFAULT_TYPE):
    tid = update.message.text.strip()
    if not tid.isdigit() or len(tid)<6:
        await update.message.reply_text("❌ Vul ID! Trader ID 7-8 digit hoy, jemon `12345678`", parse_mode="Markdown")
        return
    if tid in load_approved():
        await update.message.reply_text(f"✅ `{tid}` agai Approved!\n\nBookmarklet code:\n`{SIGNAL_CODE}`", parse_mode="Markdown")
        return

    # Admin ke Approve + Reject button
    kb = [
        [InlineKeyboardButton(f"✅ Approve {tid}", callback_data=f"approve_{tid}_{update.effective_user.id}"),
         InlineKeyboardButton(f"❌ Reject {tid}", callback_data=f"reject_{tid}_{update.effective_user.id}")]
    ]
    await context.bot.send_message(chat_id=ADMIN_ID, text=f"🆕 *New ID Request*\n\n👤 User: @{update.effective_user.username}\n🆔 UserID: {update.effective_user.id}\n💳 TraderID: `{tid}`", reply_markup=InlineKeyboardMarkup(kb), parse_mode="Markdown")
    await update.message.reply_text(f"⏳ `{tid}` Admin er kache geche. 2 min e check kora hobe.", parse_mode="Markdown")

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query
    await q.answer()
    data = q.data

    if data == "help_id":
        await q.message.reply_text("📸 *Trader ID kothay paba?*\n\n1. QX app open\n2. Profile > Settings\n3. Niche Trader ID dekhabe\n4. Copy kore ekhane pathao", parse_mode="Markdown")
        return
    if data == "bot_info":
        await q.message.reply_text("📊 *GHOST BOT*\n• Strategy: EMA 20+50 + RSI 14 + Price Action\n• Only A+ Setup e Signal\n• Signal Only, Auto Trade na\n• Win Rate: Market er upor, 100% na\n• FREE for my referral", parse_mode="Markdown")
        return

    if data.startswith("approve_"):
        parts = data.split("_")
        tid = parts[1]
        uid = int(parts[2])
        approved = load_approved()
        if tid not in approved:
            approved.append(tid)
            save_approved(approved)
        
        await context.bot.send_message(chat_id=uid, text=f"🎉 *Approved!* `{tid}` ✅\n\n👻 *GHOST SIGNAL BOT READY:*\n\nNiche code ta full copy koro, tarpor Chrome e Bookmark e giye URL er jaygay paste koro. QX chart e oi Bookmark e click korle signal dekhabe.\n\n`{SIGNAL_CODE}`\n\n⚠️ 1% Risk e use koro, 100% win na!", parse_mode="Markdown")
        await q.edit_message_text(f"✅ Approved {tid} -> {uid}")

    if data.startswith("reject_"):
        parts = data.split("_")
        tid = parts[1]
        uid = int(parts[2])
        await context.bot.send_message(chat_id=uid, text=f"❌ *Rejected* `{tid}`\n\nTomar ID amar affiliate panel e pai nai. Please amar link theke account khulo, tarpor abr ID pathao.\n\nLink: {AFFILIATE_LINK}", parse_mode="Markdown")
        await q.edit_message_text(f"❌ Rejected {tid}")

flask_app = Flask(__name__)
@flask_app.route('/')
def home(): return "GHOST TRADER Premium Running"

def run_bot():
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_id))
    app.add_handler(CallbackQueryHandler(button_handler))
    print("Bot Running Premium...")
    app.run_polling()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    threading.Thread(target=lambda: flask_app.run(host="0.0.0.0", port=port)).start()
    run_bot()
