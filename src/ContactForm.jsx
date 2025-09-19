import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Read body as text, try to parse JSON if possible
      const text = await res.text();
      let data = {};
      try { data = JSON.parse(text); } catch (_) {}

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const msg = data?.error || data?.message || text || "Server error";
        console.error("API error:", { status: res.status, msg, raw: text });
        setStatus(msg);
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus(err?.message || "Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
        <textarea
          id="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-br from-rose-200 to-rose-500 rounded-2xl shadow-2xl px-8 py-5 flex items-center justify-center text-center relative overflow-hidden transform hover:scale-[1.08] transition font-serif"
      >
        Send Message
      </button>
      {status && <p className="mt-2 text-gray-700">{status}</p>}
    </form>
  );
}
