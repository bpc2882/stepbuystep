import logo from "./assets/sbs_logo.png";
import React, { useState } from "react";
import { Lightbulb, Target, Zap, ShieldCheck, Gauge, Users, Mail } from "lucide-react";
import ContactForm from "./ContactForm";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import About from "./About";



/* ---------- Small components ---------- */
const FlippableBox = ({ icon: Icon, title, text, detail, bg, textColor, border }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="perspective h-64"
    >
     <div
  className={`relative preserve-3d transform duration-700 w-full h-full ${
    flipped ? "rotate-y-180" : ""
  }`}
>




        {/* Front */}
        <div
          className="rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden w-full h-full font-serif backface-hidden"
          style={{
            backgroundColor: bg,
            color: textColor,
            border: border ? `2px solid ${border}` : "none",
          }}
        >
          <Icon
            className="absolute inset-0 m-auto w-3/4 h-3/4 opacity-20"
            style={{ color: textColor, mixBlendMode: "overlay" }}
          />
          <h3 className="text-3xl font-bold mb-6 tracking-wide relative z-10 leading-snug">
            {title}
          </h3>
          <p className="font-medium text-xl leading-relaxed relative z-10 mt-2">
            {text}
          </p>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl shadow-2xl p-6 flex items-center justify-center text-center font-serif rotate-y-180 backface-hidden w-full h-full"
          style={{
            backgroundColor: bg,
            color: textColor,
            border: border ? `2px solid ${border}` : "none",
          }}
        >
          <p className="font-medium text-xl leading-relaxed">{detail}</p>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ text }) => (
  <div className="my-16 text-center font-serif max-w-4xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-6" style={{ color: "#3A2C28" }}>
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
      detail: "We keep eyes on the outcomes, adapting methods flexibly to get results, not red tape.",
    },
    {
      icon: Zap,
      title: "Expedience",
      text: "We crack on and deliver at pace.",
      detail: "Our delivery mindset means momentum is maintained without compromising quality.",
    },
  ];

  const whatItems = [
    {
      icon: Gauge,
      title: "Procurement as a Service",
      text: "Flexible, outcome-focused support to meet your buying needs.",
      detail:
        "From one-off projects to ongoing capacity, we provide tailored procurement support that scales with you.",
    },
    {
      icon: Users,
      title: "Commercial Consultation",
      text: "Practical advice and clear strategies for better business decisions.",
      detail: "We advise with pragmatism — commercial strategies grounded in reality, not theory.",
    },
    {
      icon: ShieldCheck,
      title: "Commercial Training",
      text: "Upskilling teams with relevant, tailored training — including public sector specifics.",
      detail: "We design training that empowers people to navigate complexity confidently.",
    },
  ];

  return (
    <div className="font-serif relative overflow-hidden antialiased">

      {/* Soft colourful background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(closest-side, #C17E46, transparent)" }}
        />
        <div
          className="absolute top-40 -right-20 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(closest-side, #3E5C3A, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[26rem] h-[26rem] rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(closest-side, #F4B93C, transparent)" }}
        />
      </div>

      {/* Header */}
      <header className="px-6 md:px-10 pt-10 pb-6 max-w-6xl mx-auto flex items-center justify-between font-serif">
        <div className="flex items-center space-x-4">
          <div className="h-20 md:h-28">
            <img src={logo} alt="StepBuyStep logo" className="h-full w-auto object-contain" />
          </div>
        </div>

        <a
          href="#contact"
          className="rounded-2xl shadow-2xl px-8 py-5 flex items-center justify-center text-center relative overflow-hidden transform hover:scale-[1.08] transition font-serif"
          style={{ backgroundColor: "#C17E46", color: "#FFF8F0" }}
        >
          <Mail
            className="absolute inset-0 m-auto w-10 h-10 opacity-20"
            style={{ color: "#FFF8F0", mixBlendMode: "overlay" }}
          />
          <span className="relative z-10 text-2xl font-bold tracking-tight">Contact Us</span>
        </a>
      </header>

      {/* Hero */}
      <main className="px-6 md:px-10 pb-20 max-w-6xl mx-auto">
        <div className="pt-10 max-w-4xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight tracking-tight mb-6" style={{ color: "#3A2C28" }}>
            Procurement can be difficult — but it doesn’t have to be painful.
          </h1>
          <p className="text-lg md:text-xl text-justify leading-relaxed font-serif" style={{ color: "#5C3A2E" }}>
            At{" "}
            <span className="font-semibold inline-flex items-baseline gap-1" style={{ color: "#3A2C28" }}>
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
            const boldColors = [
              { bg: "#3E5C3A", text: "#FFF8F0" }, // oxide green
              { bg: "#C17E46", text: "#FFF8F0" }, // amber
              { bg: "#F4B93C", text: "#3A2C28" }, // golden
            ];
            const { bg, text } = boldColors[idx % boldColors.length];
            return <FlippableBox key={idx} {...item} bg={bg} textColor={text} />;
          })}
        </div>

        {/* WHAT */}
        <SectionTitle text="What we do" />
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3 mb-16">
          {whatItems.map((item, idx) => {
            const paleColors = [
              { bg: "#F6EFE7", border: "#C17E46", text: "#3A2C28" },
              { bg: "#FFF8F0", border: "#3E5C3A", text: "#3A2C28" },
              { bg: "#FDFBF7", border: "#F4B93C", text: "#3A2C28" },
            ];
            const { bg, border, text } = paleColors[idx % paleColors.length];
            return <FlippableBox key={idx} {...item} bg={bg} border={border} textColor={text} />;
          })}
        </div>

        {/* About */}
        <SectionTitle text="About StepBuyStep" />
        <section id="about" className="max-w-4xl mx-auto mb-16 px-6">
          <p className="leading-relaxed tracking-normal text-justify text-base md:text-lg mb-5" style={{ color: "#5C3A2E" }}>
            <span className="inline-flex items-baseline gap-1 align-baseline">
              <span className="relative top-1">Step</span>
              <span className="italic">Buy</span>
              <span className="relative -top-1">Step</span>
            </span>{" "}
            are a team of experienced procurement and commercial professionals who believe buying
            should be clear, logical and effective.
          </p>
          <p className="leading-relaxed tracking-normal text-justify text-base md:text-lg mb-5" style={{ color: "#5C3A2E" }}>
            Our backgrounds span both public and private sectors, from multi-million-pound
            procurements to tailored training and hands-on delivery.
          </p>
          <p className="leading-relaxed tracking-normal text-justify text-base md:text-lg" style={{ color: "#5C3A2E" }}>
            What unites us is a solutions-focused approach: practical advice, grounded experience,
            and a drive to make the complex feel manageable.
          </p>
<Link
  to="/about"
  className="inline-block mt-6 bg-[#C17E46] text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
>
  Find out more
</Link>
        </section>

        {/* Contact */}
        <SectionTitle text="Contact Us" />
        <section
          id="contact"
          className="backdrop-blur rounded-xl shadow-md p-8 font-serif max-w-4xl mx-auto"
          style={{ backgroundColor: "#F6EFE7" }}
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