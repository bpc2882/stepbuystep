import logo from "./assets/sbs_logo.png";
import React, { useState } from "react";
import { Lightbulb, Target, Zap, Briefcase, Users, BookOpen, Mail } from "lucide-react";
import ContactForm from "./ContactForm";
import { Routes, Route, Link } from "react-router-dom";
import About from "./About";

// Utility: make gradient from a base color
function makeGradient(h, s, l, strength = 7) {
  return `linear-gradient(135deg,
    hsl(${h}, ${s}%, ${l}%),
    hsl(${h}, ${s}%, ${l + strength}%)
  )`;
}

// Global controls
const SHADOW_STRENGTH = "8px 8px 20px rgba(0,0,0,0.6)";
const ROUNDED = "rounded-lg";
const BASE_TEXT_COLOR = "#3A2C28";

// Toggle complementary text colours
const USE_COMPLEMENTARY_TEXT = true;

// Pick best text colour
function getTextColor(h, s, l) {
  if (USE_COMPLEMENTARY_TEXT) {
    const compHue = (h + 180) % 360;

    // ✅ Use a narrower cutoff: darker backgrounds need light text,
    // lighter backgrounds need dark text
    const lightThreshold = 60; 

    if (l < lightThreshold) {
      return `hsl(${compHue}, ${s}%, 90%)`; // light text
    } else {
      return `hsl(${compHue}, ${s}%, 20%)`; // dark text
    }
  } else {
    return l > 50 ? "#2A2A2A" : "#FFF8F0";
  }
}

// Predefine button colours
const contactHSL = { h: 28, s: 54, l: 52 }; // copper
const aboutHSL   = { h: 28, s: 54, l: 52 }; // same amber tone

/* ---------- Small components ---------- */
const FlippableBox = ({ icon: Icon, title, text, detail, bg, textColor, border, height = "h-64" }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className={`perspective ${height}`}
    >
      <div
        className={`relative preserve-3d transform duration-700 w-full h-full ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 ${ROUNDED} p-6 flex flex-col items-center justify-center text-center backface-hidden`}
          style={{
            background: bg,
            color: textColor,
            border: border ? `2px solid ${border}` : "none",
            boxShadow: SHADOW_STRENGTH,
            transform: "rotateY(0deg) translateZ(0)",
          }}
        >
          <Icon
            className="absolute inset-0 m-auto w-3/4 h-3/4 opacity-20"
            style={{ color: textColor, mixBlendMode: "overlay" }}
          />
          <h3 className="text-2xl font-bold mb-4 tracking-wide relative z-10 leading-snug">{title}</h3>
          <p className="font-medium text-lg leading-relaxed relative z-10 mt-2">{text}</p>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 ${ROUNDED} p-6 flex items-center justify-center text-center backface-hidden w-full h-full`}
          style={{
            background: bg,
            color: textColor,
            border: border ? `2px solid ${border}` : "none",
            boxShadow: SHADOW_STRENGTH,
            transform: "rotateY(180deg) translateZ(0)",
          }}
        >
          <p className="font-medium text-lg leading-relaxed">{detail}</p>
        </div>
      </div>
    </div>
  );
};

/* Section title */
const SectionTitle = ({ text }) => (
  <div className="my-16 text-center max-w-4xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-6" style={{ color: BASE_TEXT_COLOR }}>
      {text.includes("StepBuyStep") ? (
        <span className="inline-flex items-baseline gap-1 align-baseline">
          <span className="relative top-1">Step</span>
          <span className="italic">Buy</span>
          <span className="relative -top-1">Step</span>
        </span>
      ) : (
        <>
          <span className="italic">{text.split(" ")[0]}</span>{" "}
          {text.split(" ").slice(1).join(" ")}
        </>
      )}
    </h2>
    <div
      className="mx-auto h-1 w-full rounded-full"
      style={{
        background: "linear-gradient(to right, #C17E46, #F4B93C)",
      }}
    ></div>
  </div>
);

/* ---------- Page ---------- */
function StepBuyStepPage() {
  const howItems = [
    { icon: Lightbulb, title: "Logic", text: "We keep it logical — clear thinking, clear steps.", detail: "Our logical approach means we strip away noise and focus on what matters, ensuring clarity throughout every stage." },
    { icon: Target, title: "Solutions-focus", text: "We work to the solution, not the process.", detail: "We keep eyes on the outcomes, adapting methods flexibly to get results, not red tape." },
    { icon: Zap, title: "Expedience", text: "We crack on and deliver at pace.", detail: "Our delivery mindset means momentum is maintained without compromising quality." },
  ];

  const whatItems = [
    { icon: Briefcase, title: "Procurement as a Service", text: "Flexible, outcome-focused support to meet your buying needs.", detail: "From one-off projects to ongoing capacity, we provide tailored procurement support that scales with you." },
    { icon: Users, title: "Commercial Consultation", text: "Practical advice and clear strategies for better business decisions.", detail: "We advise with pragmatism — commercial strategies grounded in reality, not theory." },
    { icon: BookOpen, title: "Commercial Training", text: "Upskilling teams with relevant, tailored training — including public sector specifics.", detail: "We design training that empowers people to navigate complexity confidently." },
  ];

  return (
    <div className="relative overflow-hidden antialiased">
<header className="px-6 md:px-16 pt-10 pb-6 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
  <div className="flex justify-center md:justify-start mb-4 md:mb-0">
    <div className="h-20 md:h-32">
      <img src={logo} alt="StepBuyStep logo" className="h-full w-auto object-contain" />
    </div>
  </div>

  {/* Contact Us button */}
  <a
    href="#contact"
    className={`${ROUNDED} px-8 py-4 flex items-center justify-center text-center relative overflow-hidden transform hover:scale-[1.08] transition`}
    style={{
      background: makeGradient(contactHSL.h, contactHSL.s, contactHSL.l),
      color: getTextColor(contactHSL.h, contactHSL.s, contactHSL.l),
      boxShadow: SHADOW_STRENGTH,
    }}
  >
    Contact Us
  </a>
</header>

      {/* Hero */}
      <main className="px-6 md:px-10 pb-20 max-w-6xl mx-auto">
        <div className="pt-10 max-w-4xl mx-auto mb-16">
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6"
            style={{ color: BASE_TEXT_COLOR }}
          >
            Procurement can be difficult — but it doesn’t have to be painful.
          </h1>
          <p
            className="text-lg md:text-xl text-justify leading-relaxed"
            style={{ color: BASE_TEXT_COLOR }}
          >
            At{" "}
            <span
              className="font-semibold inline-flex items-baseline gap-1"
              style={{ color: BASE_TEXT_COLOR }}
            >
              <span className="relative top-1">Step</span>
              <span className="italic">Buy</span>
              <span className="relative -top-1">Step</span>
            </span>
            , we bring a clear, logical approach to commercial activity. Rooted in problem-solving
            rather than procedure, we help organisations cut through complexity, focus on outcomes,
            and make better buying and business decisions with confidence.
          </p>
        </div>

        {/* HOW */}
        <SectionTitle text="How we work" />
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3 mb-16">
          {howItems.map((item, idx) => {
            const colors = [
              { h: 120, s: 25, l: 30 },
              { h: 30, s: 50, l: 50 },
              { h: 45, s: 80, l: 55 },
            ];
            const { h, s, l } = colors[idx % colors.length];
            const bg = makeGradient(h, s, l);
            const text = getTextColor(h, s, l);
            return <FlippableBox key={idx} {...item} bg={bg} textColor={text} height="h-64" />;
          })}
        </div>

        {/* WHAT */}
        <SectionTitle text="What we do" />
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3 mb-16">
          {whatItems.map((item, idx) => {
            const colors = [
              { h: 35, s: 60, l: 75 },
              { h: 100, s: 25, l: 65 },
              { h: 190, s: 15, l: 65 },
            ];
            const { h, s, l } = colors[idx % colors.length];
            const bg = makeGradient(h, s, l);
            const text = getTextColor(h, s, l);
            return <FlippableBox key={idx} {...item} bg={bg} textColor={text} height="h-72" />;
          })}
        </div>

        {/* About */}
        <SectionTitle text="About StepBuyStep" />
        <section id="about" className="max-w-4xl mx-auto mb-16 px-6 text-justify">
          <p className="leading-relaxed text-lg md:text-xl mb-5" style={{ color: BASE_TEXT_COLOR }}>
            With over two decades in the commercial world,{" "}
            <span className="inline-flex items-baseline gap-1 align-baseline text-2xl font-bold" style={{ color: BASE_TEXT_COLOR }}>
              <span className="relative top-1">Step</span>
              <span className="italic">Buy</span>
              <span className="relative -top-1">Step</span>
            </span>{" "}
            brings deep expertise from both public and private sectors. Our focus is always
            problem-solving — helping organisations cut through complexity, overcome obstacles,
            and move forward with confidence.
          </p>

          {/* Find out more button */}
          <Link
            to="/about"
            className={`inline-block mt-6 ${ROUNDED} px-8 py-5 shadow-md hover:scale-105 transition`}
            style={{
              background: makeGradient(aboutHSL.h, aboutHSL.s, aboutHSL.l),
              color: getTextColor(aboutHSL.h, aboutHSL.s, aboutHSL.l),
              boxShadow: SHADOW_STRENGTH,
            }}
          >
            Find out more
          </Link>
        </section>

        {/* Contact */}
        <SectionTitle text="Contact Us" />
        <section
          id="contact"
          className={`${ROUNDED} backdrop-blur shadow-md p-8 max-w-4xl mx-auto`}
          style={{ backgroundColor: "#F6EFE7", color: BASE_TEXT_COLOR }}
        >
          <ContactForm />
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StepBuyStepPage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
