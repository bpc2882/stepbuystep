import Logo from "./assets/step buy step-1.svg";
import React, { useState } from "react";
import { Lightbulb, Target, Zap, Briefcase, Users, BookOpen } from "lucide-react";
import ContactForm from "./ContactForm";
import { Routes, Route, Link } from "react-router-dom";
import About from "./About";

import {
  makeGradient,
  getTextColor,
  SHADOW_STRENGTH,
  ROUNDED,
  BASE_TEXT_COLOR,
  contactHSL,
  aboutHSL,
} from "./theme";

const MODERN_BG = "linear-gradient(180deg, #CBBCA7 0%, #B2A28E 100%)";
const TEXT_COLOR = "#222";

/* ---------- Shared paragraph style ---------- */
const BodyText = ({ children, className = "" }) => (
  <p
    className={`leading-relaxed text-lg md:text-xl max-w-4xl mx-auto text-justify ${className} mb-5`}
    style={{ color: BASE_TEXT_COLOR }}
  >
    {children}
  </p>
);

/* ---------- Utility: harmonic colour variants ---------- */
function generateShades(baseH, baseS, baseL, count = 3) {
  const deltaH = 20;
  const deltaS = 20;
  const deltaL = 14;
  return Array.from({ length: count }, (_, i) => {
    const pos = i - Math.floor(count / 2);
    return {
      h: baseH + pos * deltaH,
      s: baseS - Math.abs(pos) * deltaS,
      l: baseL + pos * deltaL,
    };
  });
}

/* ---------- Shared components ---------- */
const HighlightSBS = () => (
  <span className="inline-flex items-baseline gap-1 align-baseline font-bold">
    <span className="relative top-1">Step</span>
    <span className="italic">Buy</span>
    <span className="relative -top-1">Step</span>
  </span>
);

/* ---------- MakeALine (glow local + safe) ---------- */
const MakeALine = ({ className = "", fullWidth = false }) => (
  <div
    className={`relative ${fullWidth ? "w-[90vw]" : "max-w-6xl"} mx-auto ${className}`}
    style={{
      background: `
        radial-gradient(circle at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 35%, transparent 70%),
        linear-gradient(to right, #C17E46, #F4B93C)
      `,
      height: "1px",
      borderRadius: "9999px",
    }}
  />
);




/* ---------- Section Title ---------- */
const SectionTitle = ({ text }) => {
  const words = text.split(" ");
  const firstWord = words[0];
  const rest = words.slice(1).join(" ");
  return (
    <div className="mt-8 mb-12 text-center max-w-4xl mx-auto relative">
      <h2
        className="text-3xl md:text-4xl font-bold tracking-wide mb-6 relative z-10"
        style={{ color: BASE_TEXT_COLOR }}
      >
        {text.includes("StepBuyStep") ? (
          <HighlightSBS />
        ) : (
          <>
            <span className="italic">{firstWord}</span> {rest}
          </>
        )}
      </h2>
      <MakeALine className="mt-4" />
    </div>
  );
};

/* ---------- FlippableBox ---------- */
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
        <div
          className={`absolute inset-0 ${ROUNDED} p-6 flex flex-col items-center justify-center text-center backface-hidden`}
          style={{
            background: bg,
            color: textColor,
            border: border ? `2px solid ${border}` : "none",
            boxShadow: SHADOW_STRENGTH,
          }}
        >
          <Icon
            className="absolute inset-0 m-auto w-3/4 h-3/4 opacity-20"
            style={{ color: textColor, mixBlendMode: "overlay" }}
          />
          <h3 className="text-2xl font-bold mb-4 tracking-wide relative z-10 leading-snug">
            {title}
          </h3>
          <p className="font-medium text-lg leading-relaxed relative z-10 mt-2">{text}</p>
        </div>
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

/* ---------- Page ---------- */
function StepBuyStepPage() {
  return (
    <div
      className="relative overflow-hidden antialiased min-h-screen"
      style={{ background: MODERN_BG, color: TEXT_COLOR }}
    >
      {/* HEADER + HERO (glow clipped inside hero only) */}
      <section className="relative isolate flex flex-col md:flex-row max-w-6xl mx-auto pt-0 pb-48 bg-transparent overflow-visible">
        {/* logo */}
        <div className="relative flex justify-start items-start md:w-[40%] h-[360px] p-0 bg-transparent">
  {/* subtle glow behind logo */}
  <div
    className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"
    style={{
      width: "420px",
      height: "420px",
      background:
        "radial-gradient(circle at center, rgba(255,255,245,0.9) 0%, rgba(255,250,210,0.4) 45%, transparent 80%)",
      filter: "blur(100px)",
      opacity: 0.9,
    }}
  />
  
  {/* actual logo */}
  <img src={Logo} alt="StepBuyStep logo" className="h-[300px] self-start relative z-10" />
</div>


        {/* hero text */}
        <div className="relative flex flex-col md:w-[60%] md:pl-10 -mt-4 py-20 sm:py-16 bg-transparent">
          <h1
            className="absolute bottom-0 text-2xl sm:text-3xl md:text-[2.6rem] font-bold leading-tight mb-4 pl-6 sm:pl-10 bg-transparent"
            style={{ color: BASE_TEXT_COLOR }}
          >
            <div className="ml-24">Cut procurement costs.</div>
            <div className="ml-12 mt-1">No jargon.</div>
            <div className="ml-0 mt-1">No fuss.</div>
          </h1>
        </div>

        {/* tagline + button */}
        <div className="absolute bottom-1 left-0 w-full flex flex-col items-center z-10">
          <MakeALine className="w-[56rem] mx-auto mt-6 mb-8" />
          <p
            className="text-lg md:text-2xl leading-relaxed mt-1 mb-4 w-full px-10 text-center"
            style={{ color: BASE_TEXT_COLOR }}
          >
            <HighlightSBS /> makes procurement simple — save money, save time, and stay in control.
          </p>
          <a
            href="#contact"
            className={`${ROUNDED} inline-block px-20 py-5 text-lg font-semibold shadow-lg hover:scale-105 transition`}
            style={{
              background: "linear-gradient(135deg, #E7622F, #C7461D)",
              color: "#fff",
              boxShadow: SHADOW_STRENGTH,
            }}
          >
            Book a Call
          </a>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="h-[20px]" />
      <main className="relative z-20 px-6 md:px-10 pb-20 max-w-6xl mx-auto">
        <section className="max-w-5xl mx-auto mb-6 px-6 text-justify">
          <BodyText className="mb-0">
            Procurement can be difficult — but it doesn’t have to be painful. Whether you’re a buyer
            trying to deliver value and stay compliant, or a supplier aiming to win more work,{" "}
            <HighlightSBS /> brings a clear, logical approach to commercial activity. Rooted in
            problem-solving rather than procedure, we help organisations cut through complexity,
            focus on outcomes, and make better buying and business decisions with confidence.
          </BodyText>
        </section>

        <SectionTitle text="Our services..." />

        <section className="relative grid md:grid-cols-2 mt-10 max-w-6xl mx-auto">
          <div
            className="hidden md:block absolute left-1/2 top-0 h-full w-[3px] rounded-full"
            style={{ background: "linear-gradient(to bottom, #C17E46, #F4B93C)" }}
          ></div>

          {/* Buyers */}
          <div className="space-y-8 p-10 -mt-10">
            <h3 className="text-2xl font-bold text-center text-[#0B1E3F]">...for Buyers</h3>
            <div className="flex flex-col items-center gap-8">
              {generateShades(210, 70, 40, 3).map((color, idx) => {
                const item = [
                  {
                    icon: Briefcase,
                    title: "Procurement Support",
                    text: "Flexible, outcome-focused help for your buying projects.",
                    detail:
                      "Templates, evaluation, moderation — all streamlined for clarity and compliance.",
                  },
                  {
                    icon: Users,
                    title: "Consultancy",
                    text: "Commercial strategy and category planning that work.",
                    detail: "Spend and risk analysis with practical implementation support.",
                  },
                  {
                    icon: BookOpen,
                    title: "Training",
                    text: "Upskilling teams with short, targeted learning.",
                    detail:
                      "Workshops covering evaluation, negotiation, and new Procurement Act essentials.",
                  },
                ][idx];
                const bg = makeGradient(color.h, color.s, color.l);
                return (
                  <div key={idx} className="w-full max-w-md mx-auto" style={{ marginTop: idx === 0 ? 0 : 35 }}>
                    <FlippableBox {...item} bg={bg} textColor="#FFFFFF" height="h-64" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Suppliers */}
          <div className="space-y-8 p-10 -mt-10">
            <h3 className="text-2xl font-bold text-center text-[#0B1E3F]">...for Suppliers</h3>
            <div className="flex flex-col items-center gap-8">
              {generateShades(40, 80, 60, 3).map((color, idx) => {
                const item = [
                  {
                    icon: Target,
                    title: "Bid Writing",
                    text: "Win more tenders with structured, evaluator-friendly answers.",
                    detail: "We help shape responses, clarify evidence, and improve quality scores.",
                  },
                  {
                    icon: Lightbulb,
                    title: "Consultancy",
                    text: "Build readiness for frameworks and DPS opportunities.",
                    detail: "Gap analysis, compliance checks, and go-to-market strategy.",
                  },
                  {
                    icon: Zap,
                    title: "Brokerage",
                    text: "Connecting local SMEs with buyers.",
                    detail: "Free brokerage for Lincolnshire SMEs — supplier-pays on success.",
                  },
                ][idx];
                const bg = makeGradient(color.h, color.s, color.l);
                return (
                  <div key={idx} className="w-full max-w-md mx-auto" style={{ marginTop: idx === 0 ? 0 : 35 }}>
                    <FlippableBox {...item} bg={bg} textColor="#3B2F12" height="h-64" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <SectionTitle text="About StepBuyStep" />
        <section id="about" className="max-w-4xl mx-auto mb-16 px-6 text-justify">
          <p className="leading-relaxed text-lg md:text-xl mb-5" style={{ color: BASE_TEXT_COLOR }}>
            With over 20 years of commercial and procurement experience, <HighlightSBS /> is led by
            Ben Crow. Having worked extensively across both public and private sectors, I bring
            practical insight into how organisations can deliver outcomes effectively while staying
            compliant with the Procurement Act and wider regulatory framework.
          </p>
          <p className="leading-relaxed text-lg md:text-xl mb-5" style={{ color: BASE_TEXT_COLOR }}>
            My focus has always been problem-solving: helping organisations cut through complexity,
            overcome obstacles, and achieve results with confidence. Whether it’s procurement
            strategy, commercial advice, or team training, <HighlightSBS /> offers support that is
            pragmatic, adaptable, and always outcome-driven.
          </p>
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
