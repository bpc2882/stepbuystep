// api/contact.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  // Parse JSON
  try { req.body = typeof req.body === "string" ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ error: "Invalid JSON" }); }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: "Missing fields" });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) return res.status(500).json({ error: "Missing RESEND_API_KEY or CONTACT_TO" });

  // Safe sender until your domain is verified in Resend
  const from = "onboarding@resend.dev";

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from, to, reply_to: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  const data = await r.json().catch(() => ({}));
  if (!r.ok) return res.status(500).json({ error: data?.error?.message || data?.message || `Resend error ${r.status}` });

  return res.status(200).json({ ok: true, id: data?.id || null });
}
