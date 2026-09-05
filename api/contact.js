/* ============================================================
   Contact form → Telegram relay (Vercel serverless function)
   ------------------------------------------------------------
   Set these in Vercel → Project → Settings → Environment Variables:
     TELEGRAM_BOT_TOKEN  — the token BotFather gives you
     TELEGRAM_CHAT_ID    — your personal chat id (message @userinfobot to get it)
   Keeping them server-side means the bot token is never exposed to visitors.
   ============================================================ */
'use strict';

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Messaging is not configured yet.' });
  }

  // Vercel parses JSON bodies automatically; guard for string payloads too.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const name = (body.name || '').toString().trim();
  const email = (body.email || '').toString().trim();
  const subject = (body.subject || '').toString().trim() || 'Portfolio inquiry';
  const message = (body.message || '').toString().trim();

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email and message are required.' });
  }
  if (message.length > 4000) {
    return res.status(400).json({ ok: false, error: 'Message is too long.' });
  }

  const text =
    `<b>📨 New portfolio message</b>\n\n` +
    `<b>From:</b> ${escapeHtml(name)}\n` +
    `<b>Email:</b> ${escapeHtml(email)}\n` +
    `<b>Subject:</b> ${escapeHtml(subject)}\n\n` +
    `${escapeHtml(message)}`;

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!tgRes.ok) {
      const detail = await tgRes.text().catch(() => '');
      console.error('Telegram error:', detail);
      return res.status(502).json({ ok: false, error: 'Failed to deliver message.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact relay error:', err);
    return res.status(500).json({ ok: false, error: 'Something went wrong. Try email instead.' });
  }
};
