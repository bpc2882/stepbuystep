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

/* ---------- Layout constants ---------- */
const MODERN_BG = "linear-gradient(180deg, #CBBCA7 0%, #B2A28E 100%)";
const TEXT_COLOR = "#222";
const HEADER_HEIGHT = 30;            // rem (design height before scaling)
const DESIGN_WIDTH = 1200;           // px (desktop design width)
const LOGO_SCALE = 1.0;
const TAGLINE_WIDTH_PX = 0.58 * DESIGN_WIDTH; // 58% of 1200px → 696px
const PAGE_WIDTH = "75rem";
const DEBUG = false;

/* ---------- Debug borders ---------- */
const debugBorders = DEBUG ? "[&_*]:border [&_*]:border-dashed [&_*]:border-green-400" : "";

/* ---------- Shared paragraph style ---------- */
const BodyText = ({ children, className = "" }) => (
  <p
    className={`leading-relaxed text-lg md:text-xl w-full text-justify ${className} mb-5`}
    style={{ color: BASE_TEXT_COLOR }}
  >
    {children}
  </p>
);

/* ---------- Utility: harmonic colour variants ---------- */
function generateShades(baseH, baseS, baseL, count = 3) {
  const deltaH = 20, deltaS = 20, deltaL = 14;
  return Array.from({ length: count }, (_, i) => {
    const pos = i - Math.floor(count / 2);
    return { h: baseH + pos * deltaH, s: baseS - Math.abs(pos) * deltaS, l: baseL + pos * deltaL };
  });
}

/* ---------- Highlight brand ---------- */
const HighlightSBS = () => (
  <span className="inline-flex items-baseline gap-1 align-baseline font-bold">
    <span className="relative top-1">Step</span>
    <span className="italic">Buy</span>
    <span className="relative -top-1">Step</span>
  </span>
);

/* ---------- Decorative line ---------- */
const MakeALine = ({ className = "", fullWidth = false }) => (
  <div
    className={`relative ${fullWidth ? "w-[95vw]" : "w-full"} mx-auto my-12 ${className}`}
    style={{
      background: `
        radial-gradient(circle at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 35%, transparent 70%),
        linear-gradient(to right, #C17E46, #F4B93C)
      `,
      height: "3px",
      borderRadius: "9999px",
    }}
  />
);

/* ---------- Section title ---------- */
const SectionTitle = ({ text }) => {
  const [firstWord, ...rest] = text.split(" ");
  return (
    <div className="mt-8 mb-12 text-center w-full mx-auto relative">
      <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-6 relative z-10" style={{ color: BASE_TEXT_COLOR }}>
        {text.includes("StepBuyStep") ? <HighlightSBS /> : (<><span className="italic">{firstWord}</span> {rest.join(" ")}</>)}
      </h2>
      <MakeALine className="mt-4" />
    </div>
  );
};

/* ---------- Flippable service boxes ---------- */
const FlippableBox = ({ icon: Icon, title, text, detail, bg, textColor, border, height = "h-64" }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)} className={`relative w-full ${height}`} style={{ perspective: "1000px" }}>
      <div className={`relative w-full h-full duration-700 transform ${flipped ? "rotate-y-180" : ""}`} style={{ transformStyle: "preserve-3d" }}>
        {/* FRONT */}
        <div className={`absolute inset-0 ${ROUNDED} p-6 flex flex-col items-center justify-center text-center`}
          style={{ backfaceVisibility: "hidden", background: bg, color: textColor, border: border ? `2px solid ${border}` : "none", boxShadow: SHADOW_STRENGTH }}>
          <Icon className="absolute inset-0 m-auto w-3/4 h-3/4 opacity-20" style={{ color: textColor }} />
          <h3 className="text-2xl font-bold mb-4 tracking-wide relative z-10 leading-snug">{title}</h3>
          <p className="font-medium text-lg leading-relaxed relative z-10 mt-2">{text}</p>
        </div>
        {/* BACK */}
        <div className={`absolute inset-0 ${ROUNDED} p-6 flex items-center justify-center text-center`}
          style={{ backfaceVisibility: "hidden", background: bg, color: textColor, border: border ? `2px solid ${border}` : "none", boxShadow: SHADOW_STRENGTH, transform: "rotateY(180deg)" }}>
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
      className={`relative overflow-hidden antialiased min-h-screen ${debugBorders}`}
      style={{
        background: MODERN_BG,
        color: TEXT_COLOR,
        /* Shared scale variable (unitless): ratio of viewport to 1200px, capped at 1 */
        ["--scale"]: "min(100vw / 1200px, 1)",
      }}
    >

<header className="max-w-[80rem] mx-auto flex justify-left bg-[#CBBCA7] min-h-[30rem] md:min-h-[20rem]
">
  
  <img
    src={Logo}
    alt="Step Buy Step logo"
className="h-[30rem] sm:h-[25rem] md:h-[20rem] w-auto object-contain self-start mr-auto"
  />
    <div className="flex flex-col justify-end w-full">
<p className="text-[2rem] sm:text-[2.3rem] md:text-[2.5rem] ml-[10%] sm:ml-[25%] md:ml-[40%] font-bold leading-tight">
  Cut procurement costs.
</p>
<p className="text-[2rem] sm:text-[2.3rem] md:text-[2.5rem] ml-[5%] sm:ml-[15%] md:ml-[20%] font-bold leading-tight">
  No jargon.
</p>
<p className="text-[2rem] sm:text-[2.3rem] md:text-[2.5rem] ml-[0%] font-bold leading-tight">
  No fuss.
</p>

    </div>
</header>

      {/* MAIN CONTENT */}
      <main
        className="relative z-20 pb-20 mx-auto"
        style={{ maxWidth: PAGE_WIDTH, padding: "0 2rem" }}
      >
        <MakeALine className="mx-auto mt-6 mb-8" />
        <p className="text-lg md:text-3xl leading-relaxed mt-1 mb-4 text-center" style={{ color: BASE_TEXT_COLOR }}>
          <HighlightSBS /> makes procurement simple — save money, save time, and stay in control.
        </p>

        {/* CTA */}
        <div className="flex justify-center mt-8 mb-10">
          <a
            href="#contact"
            className={`${ROUNDED} inline-block px-20 py-5 text-lg font-semibold shadow-lg hover:scale-105 transition`}
            style={{
              background: `
                radial-gradient(circle at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.25) 35%, transparent 70%),
                linear-gradient(to right, #C17E46, #F4B93C)
              `,
              color: "#000",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            Book a Call
          </a>
        </div>

        {/* Intro */}
        <section className="text-justify mb-12">
          <BodyText>
            Procurement can be difficult — but it doesn’t have to be painful. Whether you’re a buyer
            trying to deliver value and stay compliant, or a supplier aiming to win more work, <HighlightSBS /> brings a clear,
            logical approach to commercial activity. Rooted in problem-solving rather than procedure, we help organisations
            cut through complexity, focus on outcomes, and make better buying and business decisions with confidence.
          </BodyText>
        </section>

        <SectionTitle text="Our services..." />

        {/* Services */}
        <section className="relative grid md:grid-cols-2 gap-10 mt-10">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-[3px] rounded-full" style={{ background: "linear-gradient(to bottom, #C17E46, #F4B93C)" }} />

          {/* Buyers */}
          <div className="space-y-8 p-10">
            <h3 className="text-2xl font-bold text-center text-[#0B1E3F]">...for Buyers</h3>
            {generateShades(210, 70, 40, 3).map((color, idx) => {
              const item = [
                { icon: Briefcase, title: "Procurement Support", text: "Flexible, outcome-focused help for your buying projects.", detail: "Templates, evaluation, moderation — all streamlined for clarity and compliance." },
                { icon: Users, title: "Consultancy", text: "Commercial strategy and category planning that work.", detail: "Spend and risk analysis with practical implementation support." },
                { icon: BookOpen, title: "Training", text: "Upskilling teams with short, targeted learning.", detail: "Workshops covering evaluation, negotiation, and new Procurement Act essentials." },
              ][idx];
              const bg = makeGradient(color.h, color.s, color.l);
              return <FlippableBox key={idx} {...item} bg={bg} textColor="#FFFFFF" height="h-64" />;
            })}
          </div>

          {/* Suppliers */}
          <div className="space-y-8 p-10">
            <h3 className="text-2xl font-bold text-center text-[#0B1E3F]">...for Suppliers</h3>
            {generateShades(40, 80, 60, 3).map((color, idx) => {
              const item = [
                { icon: Target, title: "Bid Writing", text: "Win more tenders with structured, evaluator-friendly answers.", detail: "We help shape responses, clarify evidence, and improve quality scores." },
                { icon: Lightbulb, title: "Consultancy", text: "Build readiness for frameworks and DPS opportunities.", detail: "Gap analysis, compliance checks, and go-to-market strategy." },
                { icon: Zap, title: "Brokerage", text: "Connecting local SMEs with buyers.", detail: "Free brokerage for Lincolnshire SMEs — supplier-pays on success." },
              ][idx];
              const bg = makeGradient(color.h, color.s, color.l);
              return <FlippableBox key={idx} {...item} bg={bg} textColor="#3B2F12" height="h-64" />;
            })}
          </div>
        </section>

        <SectionTitle text="About StepBuyStep" />

        {/* About */}
        <section id="about" className="mb-16 text-justify">
          <BodyText>
            With over 20 years of commercial and procurement experience, <HighlightSBS /> is led by
            Ben Crow. Having worked across public and private sectors, I bring practical insight into delivering outcomes effectively
            while staying compliant with the Procurement Act and wider regulatory framework.
          </BodyText>
          <BodyText>
            My focus has always been problem-solving: helping organisations cut through complexity, overcome obstacles, and achieve
            results with confidence. Whether it’s procurement strategy, commercial advice, or team training, <HighlightSBS /> offers
            support that is pragmatic, adaptable, and always outcome-driven.
          </BodyText>
          <Link
            to="/about"
            className={`inline-block mt-6 ${ROUNDED} px-8 py-5 shadow-md hover:scale-105 transition`}
            style={{ background: makeGradient(aboutHSL.h, aboutHSL.s, aboutHSL.l), color: getTextColor(aboutHSL.h, aboutHSL.s, aboutHSL.l), boxShadow: SHADOW_STRENGTH }}
          >
            Find out more
          </Link>
        </section>

        <SectionTitle text="Contact Us" />

        {/* Contact */}
        <section id="contact" className={`${ROUNDED} backdrop-blur shadow-md p-8`} style={{ backgroundColor: "#F6EFE7", color: BASE_TEXT_COLOR }}>
          <ContactForm />
        </section>
      </main>
    </div>
  );
}

/* ---------- Router ---------- */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StepBuyStepPage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
