/*
 * Contact form receiver: validates the POST, forwards it to Telegram.
 *
 * Deployed outside the Astro build (see README.md in this directory).
 * Secrets, never in git:
 *   TELEGRAM_BOT_TOKEN  from @BotFather
 *   TELEGRAM_CHAT_ID    your chat id (message the bot once, then getUpdates)
 */

const PRODUCTION_ORIGIN = "https://alvaro-rrdt.github.io";
const ALLOWED_ORIGINS = new Set([
  PRODUCTION_ORIGIN,
  "http://localhost:4321",
  "http://127.0.0.1:4321",
]);

const LIMITS = { name: 100, email: 200, message: 5000 };

/** Escape user input before it travels into a parse_mode HTML message. */
const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("method not allowed", { status: 405 });
    }

    // Redirect back to the origin the form came from (prod or local dev)
    const origin = request.headers.get("Origin") ?? PRODUCTION_ORIGIN;
    if (!ALLOWED_ORIGINS.has(origin)) {
      return new Response("forbidden", { status: 403 });
    }
    const back = (flag) =>
      Response.redirect(`${origin}/contact?${flag}=1`, 303);

    let fields;
    try {
      fields = new URLSearchParams(await request.text());
    } catch {
      return back("error");
    }

    // Honeypot: bots fill hidden fields; pretend success, send nothing
    if ((fields.get("website") ?? "").trim() !== "") {
      return back("sent");
    }

    const name = (fields.get("name") ?? "").trim();
    const email = (fields.get("email") ?? "").trim();
    const message = (fields.get("message") ?? "").trim();

    if (
      !name ||
      !email ||
      !message ||
      name.length > LIMITS.name ||
      email.length > LIMITS.email ||
      message.length > LIMITS.message ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return back("error");
    }

    const sentAt = new Date().toISOString().replace("T", " ").slice(0, 16);
    const text = [
      `<b>new contact</b>`,
      ``,
      `<b>name</b>: ${escapeHtml(name)}`,
      `<b>email</b>: ${escapeHtml(email)}`,
      ``,
      escapeHtml(message),
      ``,
      `<i>${sentAt} UTC</i>`,
    ].join("\n");

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text,
            parse_mode: "HTML",
          }),
        },
      );
      if (!res.ok) throw new Error(`telegram ${res.status}`);
    } catch (error) {
      console.error("contact forward failed:", error);
      return back("error");
    }

    return back("sent");
  },
};
