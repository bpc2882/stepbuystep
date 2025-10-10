/* ---------- imports ---------- */
import React, { useState, useEffect } from "react";
import Logo from "./assets/step buy step-1.svg";
import CutProc from "./assets/cutproc.svg";
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

function getBreakpointLabel(width) {
  if (width < 640) return "base (<640px)";
  if (width < 768) return "sm (≥640)";
  if (width < 1024) return "md (≥768)";
  if (width < 1280) return "lg (≥1024)";
  return "xl (≥1280)";
}

/* ---------- reusable components ---------- */
const BodyText = ({ children, className = "" }) => (
  <p
    className={`leading-relaxed text-lg md:text-xl w-full text-justify ${className} mb-5`}
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
  className={`relative ${fullWidth ? "w-[95vw]" : "w-full"} mx-auto ${className || "my-4"}`}

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

const SectionTitle = ({ text }) => {
  const [firstWord, ...rest] = text.split(" ");
  return (
    <div className="mt-8 mb-12 text-center w-full mx-auto relative">
      <h2
        className="text-3xl md:text-4xl font-bold tracking-wide mb-6 relative z-10"
        style={{ color: BASE_TEXT_COLOR }}
      >
        {text.includes("StepBuyStep") ? (
          <HighlightSBS />
        ) : (
          <>
            <span className="italic">{firstWord}</span> {rest.join(" ")}
          </>
        )}
      </h2>
      <MakeALine className="mt-4" />
    </div>
  );
};

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
      className={`relative w-full ${height}`}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`relative w-full h-full duration-700 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className={`absolute inset-0 ${ROUNDED} p-6 flex flex-col items-center justify-center text-center`}
          style={{
            backfaceVisibility: "hidden",
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
        <div
          className={`absolute inset-0 ${ROUNDED} p-6 flex items-center justify-center text-center`}
          style={{
            backfaceVisibility: "hidden",
            background: bg,
            color: textColor,
            border: border ? `2px solid ${border}` : "none",
            boxShadow: SHADOW_STRENGTH,
            transform: "rotateY(180deg)",
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
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative overflow-hidden antialiased min-h-screen"
      style={{ background: MODERN_BG, color: TEXT_COLOR }}
    >
      {/* diagnostic overlay */}
      <div className="fixed bottom-2 right-3 z-[9999] bg-black/80 text-white text-xs px-3 py-1 rounded shadow-lg font-mono">
        {width}px — {getBreakpointLabel(width)}
      </div>

<header className="w-full bg-[#CBBCA7] py-2">
  <div className="max-w-[75rem] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center md:gap-x-8">
    <div className="flex justify-center md:justify-start items-center">
      <img
        src={Logo}
        alt="Step Buy Step logo"
        className="w-[60%] md:w-[80%] max-w-[400px] h-auto align-middle"
      />
    </div>

<div className="flex justify-center md:justify-end items-center -mt-6 md:mt-15 md:translate-x-[-6rem]">

      <img
        src={CutProc}
        alt="Cut procurement costs"
        className="w-[80%] md:w-[90%] max-w-[600px] h-auto align-middle"
      />
    </div>
  </div>
</header>



      {/* ---------- MAIN CONTENT ---------- */}
      <main
        className="relative z-20 pb-20 mx-auto"
        style={{ maxWidth: PAGE_WIDTH, padding: "0 2rem" }}
      >

        <MakeALine className="mx-auto mt-1 mb-6" />
        <p
          className="text-lg md:text-3xl leading-relaxed mt-0 mb-4 text-center"
          style={{ color: BASE_TEXT_COLOR }}
        >
          <HighlightSBS /> makes procurement simple — save money, save time, and
          stay in control.
        </p>

        {/* CTA */}
        <div className="flex justify-center mt-6 mb-10">
          <a
            href="#contact"
            className="inline-block px-10 py-4 text-lg font-medium tracking-wide rounded-xl shadow-md transition-all duration-300 hover:scale-[1.04] hover:shadow-lg antialiased"
            style={{
              background: "linear-gradient(135deg, #C17E46 0%, #F4B93C 100%)",
              color: "#2a1e12",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            Book a Call
          </a>
        </div>

        {/* Intro */}
        <section className="text-justify mb-12">
          <BodyText>
            Procurement can be difficult — but it doesn’t have to be painful.
            Whether you’re a buyer trying to deliver value and stay compliant,
            or a supplier aiming to win more work, <HighlightSBS /> brings a
            clear, logical approach to commercial activity. Rooted in
            problem-solving rather than procedure, we help organisations cut
            through complexity, focus on outcomes, and make better buying and
            business decisions with confidence.
          </BodyText>
        </section>

        <SectionTitle text="Our services..." />

        {/* Services */}
        <section className="relative grid md:grid-cols-2 gap-10 mt-10">
          <div
            className="hidden md:block absolute left-1/2 top-0 h-full w-[3px] rounded-full"
            style={{
              background: "linear-gradient(to bottom, #C17E46, #F4B93C)",
            }}
          />

          {/* Buyers */}
          <div className="space-y-8 p-10">
            <h3 className="text-2xl font-bold text-center text-[#0B1E3F]">
              ...for Buyers
            </h3>
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
              const bg = makeGradient(color.h, color.s, color.l);
              return (
                <FlippableBox
                  key={idx}
                  {...item}
                  bg={bg}
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
              const item = [
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
              const bg = makeGradient(color.h, color.s, color.l);
              return (
                <FlippableBox
                  key={idx}
                  {...item}
                  bg={bg}
                  textColor="#3B2F12"
                  height="h-64"
                />
              );
            })}
          </div>
        </section>

        <SectionTitle text="About StepBuyStep" />

        {/* About */}
        <section id="about" className="mb-16 text-justify">
          <BodyText>
            With over 20 years of commercial and procurement experience,{" "}
            <HighlightSBS /> is led by Ben Crow. Having worked across public and
            private sectors, I bring practical insight into delivering outcomes
            effectively while staying compliant with the Procurement Act and
            wider regulatory framework.
          </BodyText>
          <BodyText>
            My focus has always been problem-solving: helping organisations cut
            through complexity, overcome obstacles, and achieve results with
            confidence. Whether it’s procurement strategy, commercial advice, or
            team training, <HighlightSBS /> offers support that is pragmatic,
            adaptable, and always outcome-driven.
          </BodyText>
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

        {/* Contact */}
        <section
          id="contact"
          className={`${ROUNDED} backdrop-blur shadow-md p-8`}
          style={{ backgroundColor: "#F6EFE7", color: BASE_TEXT_COLOR }}
        >
          <ContactForm />
        </section>
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
