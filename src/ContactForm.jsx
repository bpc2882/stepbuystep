import React, { useState } from "react";
import { makeGradient, getTextColor, COLORS, SHADOWS } from "./theme";

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

      const text = await res.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch (_) {}

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block mb-2 font-medium" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-[0.5rem]"
          style={{ boxShadow: SHADOWS.soft }}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-2 font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-[0.5rem]"
          style={{ boxShadow: SHADOWS.soft }}
        />
      </div>

      {/* Message */}
      <div>
        <label className="block mb-2 font-medium" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          autoComplete="off"
          className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-[0.5rem]"
          style={{ boxShadow: SHADOWS.soft }}
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="rounded-[0.5rem] px-8 py-4 shadow-strong hover:scale-[1.08] transition font-medium"
        style={{
          background: makeGradient(
            COLORS.brandCopper.h,
            COLORS.brandCopper.s,
            COLORS.brandCopper.l
          ),
          color: getTextColor(
            COLORS.brandCopper.h,
            COLORS.brandCopper.s,
            COLORS.brandCopper.l
          ),
          boxShadow: SHADOWS.strong,
        }}
      >
        Send Message
      </button>

      {status && <p className="mt-2 text-gray-700">{status}</p>}
    </form>
  );
}
