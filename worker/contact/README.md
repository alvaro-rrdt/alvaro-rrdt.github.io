# Contact worker

Receives the /contact form POST and forwards it to Telegram via the Bot
API. Free tier, zero dependencies, plain JS on purpose (kept out of the
Astro build and type checks).

## One-time setup

1. Telegram bot:
   - Message @BotFather -> /newbot -> copy the token.
   - Message your new bot once (any text), then open
     `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id`
     (or ask @userinfobot).
2. Deploy:
   ```bash
   npx wrangler login
   npx wrangler secret put TELEGRAM_BOT_TOKEN
   npx wrangler secret put TELEGRAM_CHAT_ID
   npx wrangler deploy
   ```
3. Copy the printed workers.dev URL into `CONTACT_ENDPOINT` in
   src/config.ts, commit, land. The form appears on /contact.

## Local test

```bash
npx wrangler dev            # serves http://localhost:8788
```

Temporarily set CONTACT_ENDPOINT to "http://localhost:8788", run the
site dev server, submit the form from http://localhost:4321/contact.
The worker allows localhost origins for exactly this.

## If the token ever leaks

@BotFather -> /revoke, then re-put both secrets and redeploy.

## Future upgrades (documented, not built)

- Cloudflare Turnstile verification on the form.
- KV per-IP rate limiting.
