// ===== Mobile Menu =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });

    // Close menu on link click
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            menuToggle.classList.remove('active');
        });
    });
}

// ===== Smooth active link on scroll (home page) =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// ===== Contact Form → Telegram Bot =====
/*
  SETUP INSTRUCTIONS (important):
  1. Create a Telegram bot via @BotFather → get BOT_TOKEN
  2. Start a chat with your bot or add it to a group
  3. Get your CHAT_ID:
     - Message the bot
     - Open: https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
     - Look for "chat":{"id": 123456789}
  4. Replace the two values below
  5. For production: do NOT expose token in frontend.
     Use a small backend (Cloudflare Worker / Vercel Function / PHP) as proxy.
*/

const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';   // ← Replace this
const TELEGRAM_CHAT_ID   = 'YOUR_CHAT_ID_HERE';     // ← Replace this

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');
const errorText   = document.getElementById('errorText');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name     = document.getElementById('name').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const email    = document.getElementById('email').value.trim();
        const address  = document.getElementById('address').value.trim();
        const message  = document.getElementById('message').value.trim() || '—';

        // Basic validation
        if (!name || !whatsapp || !email || !address) {
            showError('Please fill all required fields.');
            return;
        }
        if (!/^[0-9]{10}$/.test(whatsapp)) {
            showError('WhatsApp number must be 10 digits.');
            return;
        }

        // Check if token is configured
        if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
            showError('Telegram bot is not configured yet. Please call us at 7000979577 or message on WhatsApp.');
            return;
        }

        // Disable button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Build message for Telegram
        const text = `
🌞 *New Solar Enquiry – Divine Solar Energy*

👤 *Name:* ${name}
📱 *WhatsApp:* ${whatsapp}
📧 *Email:* ${email}
📍 *Address:* ${address}
💬 *Message:* ${message}

⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        `.trim();

        try {
            const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: text,
                    parse_mode: 'Markdown'
                })
            });

            const data = await res.json();

            if (data.ok) {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                formError.style.display = 'none';
            } else {
                throw new Error(data.description || 'Telegram API error');
            }
        } catch (err) {
            console.error(err);
            showError('Could not send request. Please call us at 7000979577 or try WhatsApp.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Request';
        }
    });
}

function showError(msg) {
    if (errorText) errorText.textContent = msg;
    if (formError) formError.style.display = 'block';
    if (formSuccess) formSuccess.style.display = 'none';
}

function resetForm() {
    if (formError) formError.style.display = 'none';
    if (contactForm) {
        contactForm.style.display = 'block';
        contactForm.reset();
    }
}
