# Divine Solar Energy – Professional Website

Clean, professional website for Divine Solar Energy (based on your flyer, without Janmashtami theme).

## Files
- `index.html` – Home page (hero, benefits, rates, services, products, brands)
- `contact.html` – Contact / Support form page
- `styles.css` – All styling
- `script.js` – Mobile menu + Telegram form submission

## How to use

1. Open the folder on any computer or upload to hosting (Hostinger, GoDaddy, Netlify, Vercel, GitHub Pages, etc.)
2. Just open `index.html` in browser to preview.

## Telegram Bot Setup (for form submissions)

The contact form sends Name, WhatsApp, Email, Address & Message directly to your Telegram.

### Steps:

1. Open Telegram → search **@BotFather**
2. Send `/newbot` → follow instructions → copy the **Bot Token**
3. Start a chat with your new bot (or create a group and add the bot)
4. Send any message to the bot
5. Open this URL in browser (replace TOKEN):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
6. Find `"chat":{"id": 123456789}` → that number is your **Chat ID**
7. Open `script.js` and replace:
   ```js
   const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
   const TELEGRAM_CHAT_ID   = 'YOUR_CHAT_ID_HERE';
   ```
   with your real values.

### Security note
Putting the bot token in frontend JavaScript is fine for small local businesses, but anyone can see it in page source.  
For better security later, move the Telegram call to a small backend (Cloudflare Worker / Vercel Serverless / simple PHP).

## Contact details used
- Phone / WhatsApp: **7000979577**
- Email: **support.divinesolarenergy@gmail.com**
- Office: 408/2, C Y Chintamani Road, Georgetown, Prayagraj – 211002
- Branch: Arai 90, Purwa Nankari, IIT Kalyanpur, Kanpur – 208016

## Customization
- Change colors in `styles.css` (`:root` variables)
- Update rates in the table inside `index.html`
- Add your own logo image if you want (replace the solar-panel icon)

That’s it. The site is fully responsive (mobile + desktop) and looks professional.
