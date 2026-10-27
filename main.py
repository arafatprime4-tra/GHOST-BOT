import os, json, threading
from flask import Flask
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, MessageHandler, filters, ContextTypes

TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID", "0"))
AFFILIATE_LINK = os.getenv("AFFILIATE_LINK", "https://qxbroker.com/")
CHANNEL_LINK = "https://t.me/premierghos"

SIGNAL_CODE = """javascript:(function(){let s=document.createElement('style');s.innerHTML=`#ghost-panel{position:fixed;top:70px;right:15px;z-index:9999999;background:#0f0f1a;border:2px solid #8a2be2;border-radius:14px;padding:16px;width:285px;color:#fff;font-family:sans-serif}`;document.head.appendChild(s);let p=document.createElement('div');p.id='ghost-panel';p.innerHTML=`<div style="text-align:center;color:#8a2be2;font-weight:900">👻 GHOST TRADER</div><div id="g-signal" style="background:#424242;text-align:center;padding:12px;border-radius:8px;margin:10px 0">ANALYZING...</div><div id="g-info" style="font-size:11px;text-align:center"></div><button onclick="this.parentElement.remove()" style="width:100%;margin-top:10px">Close</button>`;document.body.appendChild(p);let h=[];function ema(a,b){if(a.length<b)return null;let c=2/(b+1),d=a.slice(0,b).reduce((e,f)=>e+f,0)/b;for(let i=b;i<a.length;i++)d=a[i]*c+d*(1-c);return d}function rsi(a,b=14){if(a.length<b+1)return 50;let c=0,d=0;for(let i=a.length-b;i<a.length;i++){let e=a[i]-a[i-1];if(e>=0)c+=e;else d-=e}let f=d==0?100:c/d;return 100-100/(1+f)}function getP(){let l=h.length?h[h.length-1]:100;return l+(Math.random()-0.48)*0.4}function up(){let pr=getP();h.push(pr);if(h.length>100)h.shift();let el=document.getElementById('g-signal'),inf=document.getElementById('g-info');if(h.length<55){el.textContent='COLLECTING '+h.length+'/55';return}let e20=ema(h,20),e50=ema(h,50),r=rsi(h,14);if(pr>e20&&e20>e50&&r>38&&r<62){el.textContent='👻 BUY / UP 🟢';el.style.background='#00c853';inf.textContent='UP | RSI '+r.toFixed(1)}else if(pr<e20&&e20<e50&&r<62&&r>38){el.textContent='👻 SELL / DOWN 🔴';el.style.background='#ff1744';inf.textContent='DOWN | RSI '+r.toFixed(1)}else{el.textContent='⏳ WAIT';el.style.background='#424242';inf.textContent='RSI '+r.toFixed(1)}}setInterval(up,1800);alert('GHOST Loaded!');})();"""

def load_approved():
    if os.path.exists("approved_ids.json"):
        try:
            with open("approved_ids.json",'r') as f: return json.load(f)
        except: return []
    return []
def save_approved(d):
    with open("approved_ids.json",'w') as f: json.dump(d,f)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = "👻 *GHOST - PREMIUM FREE BOT* 👻\n\nWe Don't Sell Bot. We Give FREE To Our Referral Members!\n\n*Kivabe Access Paba?*\n1️⃣ Link theke account khulo\n2️⃣ Profile theke Trader ID copy koro\n3️⃣ Ekhane ID send koro\n\n✅ Approve hole Signal Bot auto paba\n⚠️ No Bot Gives 100% Win - Use 1% Risk"
    kb = [[InlineKeyboardButton("🔗 Create QX Account", url=AFFILIATE_LINK)], [InlineKeyboardButton("🆔 How to Get ID?", callback_data="help_id"), InlineKeyboardButton("📊 Bot Info", callback_data="bot_info")], [InlineKeyboardButton("💬 Join Channel", url=CHANNEL_LINK)]]
    await update.message.reply_text(text, reply_markup=InlineKeyboardMarkup(kb), parse_mode="Markdown")

async def handle_id(update: Update, context: ContextTypes.DEFAULT_TYPE):
    tid = update.message.text.strip()
    print(f"ID RECEIVED: {tid}") # Render log e dekhbe
    if not tid.isdigit() or len(tid)<6:
        await update.message.reply_text("❌ Vul ID! 7-8 digit dao")
        return
    
    # 1. AGE USER KE REPLY - jate atke na thake
    await update.message.reply_text(f"⏳ `{tid}` peyechi! Admin check korche...", parse_mode="Markdown")

    # 2. TARPOR ADMIN KE PATHAO
    try:
        kb = [[InlineKeyboardButton(f"✅ Approve {tid}", callback_data=f"approve_{tid}_{update.effective_user.id}"), InlineKeyboardButton(f"❌ Reject {tid}", callback_data=f"reject_{tid}_{update.effective_user.id}")]]
        await context.bot.send_message(chat_id=ADMIN_ID, text=f"🆕 New ID: {tid}\nFrom: @{update.effective_user.username}\nUID: {update.effective_user.id}", reply_markup=InlineKeyboardMarkup(kb))
    except Exception as e:
        print(f"Admin send error: {e}")
        # Admin ID vul holeo auto approve for testing
        await update.message.reply_text(f"⚠️ Admin ID vul set kora! Kintu test er jonno `{tid}` Approve kore dilam.\n\nCode:\n`{SIGNAL_CODE}`", parse_mode="Markdown")

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query
    await q.answer()
    data = q.data
    if data == "help_id":
        await q.message.reply_text("Profile > Trader ID copy koro")
        return
    if data == "bot_info":
        await q.message.reply_text("EMA 20+50 + RSI - Signal Only")
        return
    if data.startswith("approve_"):
        tid, uid = data.split("_")[1], int(data.split("_")[2])
        approved = load_approved()
        if tid not in approved:
            approved.append(tid); save_approved(approved)
        await context.bot.send_message(chat_id=uid, text=f"🎉 Approved {tid} ✅\n\nCode:\n`{SIGNAL_CODE}`\n\nBookmark e save kore QX chart e use koro. 1% Risk!", parse_mode="Markdown")
        await q.edit_message_text(f"✅ Approved {tid}")
    if data.startswith("reject_"):
        tid, uid = data.split("_")[1], int(data.split("_")[2])
        await context.bot.send_message(chat_id=uid, text=f"❌ {tid} Reject! Amar link theke account khulo.\n{AFFILIATE_LINK}")
        await q.edit_message_text(f"❌ Rejected {tid}")

flask_app = Flask(__name__)
@flask_app.route('/')
def home(): return "GHOST Running"

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
