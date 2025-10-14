/* ---------- imports ---------- */
import React, { useState, useEffect } from "react";
import Logo from "./assets/step buy step-1.svg";
import CutProc from "./assets/cutproc.svg";
import {
  Lightbulb,
  Target,
  Zap,
  Briefcase,
  Users,
  BookOpen,
} from "lucide-react";
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

/* ---------- CTA BUTTON ---------- */
const CTAButton = ({ text, href, to }) => {
  const baseStyle = {
    background: "linear-gradient(135deg, #2d5e49 0%, #3f7c5a 50%, #5fa274 100%)",
    color: "#ffffff",
    boxShadow:
      "0 6px 14px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.25)",
    border: "1px solid rgba(12, 54, 46, 0.35)",
    transition: "all 0.3s ease",
  };

  const classes =
    "inline-block px-12 py-8 md:px-16 md:py-10 rounded-2xl text-lg md:text-xl font-semibold " +
    "tracking-wide hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(61,138,119,0.45)] " +
    "focus:outline-none antialiased text-center";

  if (to)
    return (
      <Link to={to} className={classes} style={baseStyle}>
        {text}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={classes} style={baseStyle}>
        {text}
      </a>
    );
  return (
    <button className={classes} style={baseStyle}>
      {text}
    </button>
  );
};

/* ---------- constants ---------- */
const MODERN_BG = "linear-gradient(180deg, #CBBCA7 0%, #B2A28E 100%)";
const TEXT_COLOR = "#222";
const PAGE_WIDTH = "75rem";

/* ---------- helpers ---------- */
function generateShades(baseH, baseS, baseL, count = 3) {
  const deltaH = 20,
    deltaS = 20,
    deltaL = 14;
  return Array.from({ length: count }, (_, i) => {
    const pos = i - Math.floor(count / 2);
    return {
      h: baseH + pos * deltaH,
      s: baseS - Math.abs(pos) * deltaS,
      l: baseL + pos * deltaL,
    };
  });
}

/* ---------- reusable components ---------- */
const BodyText = ({ children, className = "" }) => (
  <p
    className={`leading-relaxed text-lg md:text-xl w-full text-justify max-w-none ${className} mb-5`}
    style={{ color: BASE_TEXT_COLOR }}
  >
    {children}
  </p>
);

const HighlightSBS = () => (
  <span className="inline-flex items-baseline gap-1 align-baseline font-bold">
    <span className="relative top-1">Step</span>
    <span className="italic">Buy</span>
    <span className="relative -top-1">Step</span>
  </span>
);

const MakeALine = ({ className = "", fullWidth = false }) => (
  <div
    className={`relative ${fullWidth ? "w-[95vw]" : "w-full"} mx-auto ${
      className || "my-4"
    }`}
    style={{
      background:
        "radial-gradient(circle at center, rgba(255,255,240,0.9) 0%, rgba(255,255,220,0.45) 35%, transparent 75%), linear-gradient(to right, #C17E46, #F4B93C)",
      height: "3px",
      borderRadius: "9999px",
    }}
  />
);

const SectionTitle = ({ text = "" }) => {
  const words = text.trim().split(/\s+/);
  const firstWord = words[0] || "";
  const restWords = words.slice(1).join(" ");
  const restIsSBS = /^\s*StepBuyStep\s*$/i.test(restWords);
  const wholeIsSBS = /^\s*StepBuyStep\s*$/i.test(text);

  return (
    <div className="mt-8 mb-12 text-center w-full mx-auto relative">
      <h2
        className="text-3xl md:text-4xl font-bold tracking-wide mb-6 relative z-10"
        style={{ color: BASE_TEXT_COLOR }}
      >
        {wholeIsSBS ? (
          <HighlightSBS />
        ) : (
          <>
            <span className="italic">{firstWord}</span>{" "}
            {restIsSBS ? <HighlightSBS /> : restWords}
          </>
        )}
      </h2>
      <MakeALine className="mt-4" />
    </div>
  );
};

/* ---------- flippable box ---------- */
const FlippableBox = ({
  icon: Icon,
  title,
  text,
  detail,
  bg,
  textColor,
  border,
  height = "h-64",
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className={`relative w-full ${height} perspective`}
    >
      <div
        className={`relative w-full h-full duration-700 preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT */}
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
            style={{ color: textColor }}
          />
          <h3 className="text-2xl font-bold mb-4 tracking-wide relative z-10 leading-snug">
            {title}
          </h3>
          <p className="font-medium text-lg leading-relaxed relative z-10 mt-2">
            {text}
          </p>
        </div>

        {/* BACK */}
        <div
          className={`absolute inset-0 ${ROUNDED} p-6 flex items-center justify-center text-center backface-hidden rotate-y-180`}
          style={{
            background: bg,
            color: textColor,
            border: border ? `2px solid ${border}` : "none",
            boxShadow: SHADOW_STRENGTH,
          }}
        >
          <p className="font-medium text-lg leading-relaxed">{detail}</p>
        </div>
      </div>
    </div>
  );
};

/* ---------- main page ---------- */
function StepBuyStepPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative overflow-hidden antialiased min-h-screen"
      style={{ backgroundColor: "#F4E5C8", color: TEXT_COLOR }}
    >
      {/* ---------- HEADER ---------- */}
      <header
        className="relative w-full flex items-center justify-between py-1 sm:py-2 px-6 overflow-visible"
        style={{
          backgroundColor: "#1B2733",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full opacity-25"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <polygon points="0,120 140,0 560,0 420,120" fill="#1B2733" />
          <polygon points="420,120 560,0 820,0 680,120" fill="#223A4A" />
          <polygon points="680,120 820,0 1000,0 860,120" fill="#2D5066" />
          <polygon points="860,120 1000,0 1140,0 1000,120" fill="#3B6A8A" />
          <polygon points="1000,120 1140,0 1260,0 1120,120" fill="#4E8DBA" />
          <polygon points="1120,120 1260,0 1200,0 1200,120" fill="#4E8DBA" />
        </svg>

        <div
          className="flex items-center justify-between w-full transform 
               scale-[0.85] sm:scale-[0.9] md:scale-[1.0]
               transition-transform duration-300 ease-out"
        >
          <img
            src={Logo}
            alt="Step Buy Step logo"
            className="object-contain h-auto flex-shrink-0 
                 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px]"
          />

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md transition hover:scale-105 mr-12 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #C17E46 0%, #F4B93C 100%)",
              color: "#2a1e12",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav
            className="mobile-menu absolute left-0 top-full w-full z-[99999]
               bg-[#223A4A] border-t border-[#2F3C47]
               shadow-xl isolate transition-all duration-300 ease-in-out"
          >
            <ul
              className="flex flex-col items-center py-4 space-y-3
                 text-[#C57A44] text-lg font-semibold
                 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
            >
              <li>
                <a href="#services" className="hover:text-[#E39B57] transition">
                  Our services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#E39B57] transition">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E39B57] transition">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* ---------- MAIN CONTENT ---------- */}
      <main
        className="relative z-20 pb-20 mx-auto box-border origin-top scale-[0.89]"
        style={{
          maxWidth: PAGE_WIDTH,
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <p
          className="text-lg md:text-3xl leading-relaxed mt-2 mb-4 text-center"
          style={{ color: BASE_TEXT_COLOR }}
        >
          <HighlightSBS /> makes procurement simple — save money, save time, and
          stay in control.
        </p>

        <div className="flex justify-center mt-8 mb-8 w-full">
          <CTAButton href="#contact" text="Book a Call" />
        </div>

        <section className="mb-12 px-0 mx-auto max-w-[75rem]">
          <BodyText>
            Procurement can be difficult — but it doesn’t have to be painful.
            Whether you’re a buyer trying to deliver value and stay compliant,
            or a supplier aiming to win more work, <HighlightSBS /> brings a
            clear, logical approach to commercial activity.
          </BodyText>
        </section>

        <SectionTitle text="Our services..." />
        <section id="services" className="relative grid md:grid-cols-2 gap-10 mt-10">
          {/* Buyers */}
          <div className="space-y-8 p-10">
            <h3 className="text-2xl font-bold text-center text-[#0B1E3F]">
              ...for Buyers
            </h3>
            {generateShades(210, 70, 40, 3).map((color, idx) => {
              const items = [
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
                  detail:
                    "Spend and risk analysis with practical implementation support.",
                },
                {
                  icon: BookOpen,
                  title: "Training",
                  text: "Upskilling teams with short, targeted learning.",
                  detail:
                    "Workshops covering evaluation, negotiation, and new Procurement Act essentials.",
                },
              ][idx];
              return (
                <FlippableBox
                  key={idx}
                  {...items}
                  bg={makeGradient(color.h, color.s, color.l)}
                  textColor="#FFFFFF"
                  height="h-64"
                />
              );
            })}
          </div>

          {/* Suppliers */}
          <div className="space-y-8 p-10">
            <h3 className="text-2xl font-bold text-center text-[#0B1E3F]">
              ...for Suppliers
            </h3>
            {generateShades(40, 80, 60, 3).map((color, idx) => {
              const items = [
                {
                  icon: Target,
                  title: "Bid Writing",
                  text: "Win more tenders with structured, evaluator-friendly answers.",
                  detail:
                    "We help shape responses, clarify evidence, and improve quality scores.",
                },
                {
                  icon: Lightbulb,
                  title: "Consultancy",
                  text: "Build readiness for frameworks and DPS opportunities.",
                  detail:
                    "Gap analysis, compliance checks, and go-to-market strategy.",
                },
                {
                  icon: Zap,
                  title: "Brokerage",
                  text: "Connecting local SMEs with buyers.",
                  detail:
                    "Free brokerage for Lincolnshire SMEs — supplier-pays on success.",
                },
              ][idx];
              return (
                <FlippableBox
                  key={idx}
                  {...items}
                  bg={makeGradient(color.h, color.s, color.l)}
                  textColor="#3B2F12"
                  height="h-64"
                />
              );
            })}
          </div>
        </section>

        <div className="flex justify-center mt-12 w-full">
          <CTAButton to="/about" text="Find out more about our services" />
        </div>

        <SectionTitle text="About StepBuyStep" />
        <section id="about" className="mb-16 text-justify">
          <BodyText>
            With over 20 years of commercial and procurement experience,{" "}
            <HighlightSBS /> is led by Ben Crow.
          </BodyText>
          <BodyText>
            My focus has always been problem-solving: helping organisations cut
            through complexity and achieve results with confidence.
          </BodyText>
        </section>

        <div className="flex justify-center mt-8 w-full">
          <CTAButton to="/about" text="Find out more" />
        </div>

        <SectionTitle text="Contact Us" />
        <section
          id="contact"
          className={`${ROUNDED} backdrop-blur shadow-md p-8`}
          style={{ backgroundColor: "#F6EFE7", color: BASE_TEXT_COLOR }}
        >
          <ContactForm />
        </section>

        <footer
          className="w-full mt-16 py-6 text-center text-sm tracking-wide"
          style={{
            backgroundColor: "#1B2733",
            color: "#e6e0d5",
          }}
        >
          <p>
            <strong>StepBuyStep Ltd.</strong> is a company registered in England
            &amp; Wales. Company number: <strong>15482719</strong>.
          </p>
          <p className="mt-1 opacity-80">
            © {new Date().getFullYear()} StepBuyStep Ltd. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}

/* ---------- router ---------- */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StepBuyStepPage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
