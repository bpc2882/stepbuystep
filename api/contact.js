// api/contact.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  let body = req.body;
  try {
    body = typeof body === "string" ? JSON.parse(body) : body || {};
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server missing RESEND_API_KEY" });
  }

  // Both from + to are your verified inbox
  const from = "ben@stepbuystep.co.uk";
  const to = "ben@stepbuystep.co.uk";

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email, // visitor’s email
        subject: `New message from ${name} via website`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return res.status(500).json({
        error: data?.error?.message || data?.message || `Resend error ${r.status}`,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Failed to send" });
  }
}
