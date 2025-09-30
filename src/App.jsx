import Logo from './assets/sbssvglogo.svg';
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

/* ---------- Shared components ---------- */

/* Highlighted brand name */
const HighlightSBS = () => (
  <span className="inline-flex items-baseline gap-1 align-baseline font-bold">
    <span className="relative top-1">Step</span>
    <span className="italic">Buy</span>
    <span className="relative -top-1">Step</span>
  </span>
);

/* Section title */
const SectionTitle = ({ text }) => {
  const words = text.split(" ");
  const firstWord = words[0];
  const rest = words.slice(1).join(" ");

  return (
    <div className="my-16 text-center max-w-4xl mx-auto relative">
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

      {/* glowing bar */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[90vw] h-[260px] bg-[#F4B93C] rounded-full 
                   blur-[180px] opacity-15"
      ></div>

      <div
        className="mx-auto h-1 w-full rounded-full relative z-10"
        style={{ background: "linear-gradient(to right, #C17E46, #F4B93C)" }}
      />
    </div>
  );
};

/* Flippable box */
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

/* ---------- Page ---------- */
function StepBuyStepPage() {
  const howItems = [
    {
      icon: Lightbulb,
      title: "Logic",
      text: "We keep it logical — clear thinking, clear steps.",
      detail:
        "Our logical approach means we strip away noise and focus on what matters, ensuring clarity throughout every stage.",
    },
    {
      icon: Target,
      title: "Solutions-focus",
      text: "We work to the solution, not the process.",
      detail:
        "We keep eyes on the outcomes, adapting methods flexibly to get results, not red tape.",
    },
    {
      icon: Zap,
      title: "Expedience",
      text: "We crack on and deliver at pace.",
      detail:
        "Our delivery mindset means momentum is maintained without compromising quality.",
    },
  ];

  const whatItems = [
    {
      icon: Briefcase,
      title: "Procurement as a Service",
      text: "Flexible, outcome-focused support to meet your buying needs.",
      detail:
        "From one-off projects to ongoing capacity, we provide tailored procurement support that scales with you.",
    },
    {
      icon: Users,
      title: "Commercial Consultation",
      text: "Practical advice and clear strategies for better business decisions.",
      detail:
        "We advise with pragmatism — commercial strategies grounded in reality, not theory.",
    },
    {
      icon: BookOpen,
      title: "Commercial Training",
      text: "Upskilling teams with relevant, tailored training — including public sector specifics.",
      detail:
        "We design training that empowers people to navigate complexity confidently.",
    },
  ];

  return (
    <div className="relative overflow-hidden antialiased">
      {/* HEADER */}
      <header className="relative px-6 md:px-16 pt-10 pb-6 max-w-6xl mx-auto">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[95vw] h-[200px] bg-[#F4B93C] rounded-full 
                     blur-[160px] opacity-15 -z-10"
        ></div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start mb-4 md:mb-0">
            <img src={Logo} alt="StepBuyStep logo" style={{ height: "180px" }} />
          </div>


        </div>

        <div className="w-full mt-4">
          <div
            className="h-1 w-full rounded-full max-w-6xl mx-auto"
            style={{ background: "linear-gradient(to right, #C17E46, #F4B93C)" }}
          />
        </div>
      </header>

      {/* HERO */}
      <section className="pt-10 max-w-4xl mx-auto mb-12 text-center">
        <h1
          className="text-3xl md:text-[2.6rem] font-bold leading-tight mb-6"
          style={{ color: BASE_TEXT_COLOR, letterSpacing: "0.03em" }}
        >
          Cut procurement costs. No jargon. No fuss.
        </h1>
        <p
          className="text-lg md:text-3xl leading-relaxed mb-4"
          style={{ color: BASE_TEXT_COLOR }}
        >
          <HighlightSBS /> makes procurement simple — save money, save time, and stay in control.
        </p>

        <a
          href="#contact"
          className={`${ROUNDED} inline-block px-20 py-5 mt-6 text-lg font-semibold shadow-lg hover:scale-105 transition`}
style={{
  background: "linear-gradient(135deg, #E7622F, #C7461D)", // logo orange
  color: "#fff",
  boxShadow: SHADOW_STRENGTH,
}}
        >
          Book a Call
        </a>
      </section>

      {/* MAIN CONTENT */}
      <main className="px-6 md:px-10 pb-20 max-w-6xl mx-auto">
        {/* INTRO */}
        <section className="max-w-4xl mx-auto mb-12 px-6 text-justify">
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: BASE_TEXT_COLOR }}>
            Procurement can be difficult — but it doesn’t have to be painful. At <HighlightSBS />,
            we bring a clear, logical approach to commercial activity. Rooted in problem-solving
            rather than procedure, we help organisations cut through complexity, focus on outcomes,
            and make better buying and business decisions with confidence.
          </p>
        </section>

        {/* HOW */}
        <SectionTitle text="How we work" />
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3 mb-16">
          {howItems.map((item, idx) => {
            const howColors = [
              { h: 145, s: 45, l: 25 },
              { h: 42, s: 80, l: 45 },
              { h: 210, s: 55, l: 30 },
            ];
            const { h, s, l } = howColors[idx % howColors.length];
            const bg = makeGradient(h, s, l);
            const text = getTextColor(h, s, l);
            return <FlippableBox key={idx} {...item} bg={bg} textColor={text} height="h-64" />;
          })}
        </div>

        {/* WHAT */}
        <SectionTitle text="What we do" />
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3 mb-16">
          {whatItems.map((item, idx) => {
            const whatColors = [
              { h: 10, s: 75, l: 38 },
              { h: 30, s: 35, l: 30 },
              { h: 55, s: 50, l: 75 },
            ];
            const { h, s, l } = whatColors[idx % whatColors.length];
            const bg = makeGradient(h, s, l);
            const text = getTextColor(h, s, l);
            return <FlippableBox key={idx} {...item} bg={bg} textColor={text} height="h-72" />;
          })}
        </div>

        {/* ABOUT */}
        <SectionTitle text="About StepBuyStep" />
        <section id="about" className="max-w-4xl mx-auto mb-16 px-6 text-justify">
          <p className="leading-relaxed text-lg md:text-xl mb-5" style={{ color: BASE_TEXT_COLOR }}>
            With over 20 years of commercial and procurement experience, <HighlightSBS /> is led by Ben Crow.
            Having worked extensively across both public and private sectors, I bring practical insight into
            how organisations can deliver outcomes effectively while staying compliant with the Procurement Act
            and wider regulatory framework.
          </p>
          <p className="leading-relaxed text-lg md:text-xl mb-5" style={{ color: BASE_TEXT_COLOR }}>
            My focus has always been problem-solving: helping organisations cut through complexity,
            overcome obstacles, and achieve results with confidence. Whether it’s procurement strategy,
            commercial advice, or team training, <HighlightSBS /> offers support that is pragmatic,
            adaptable, and always outcome-driven.
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

        {/* CONTACT */}
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
