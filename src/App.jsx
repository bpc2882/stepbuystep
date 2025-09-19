import logo from "./assets/sbs_logo.png";
import React, { useState } from "react";
import { Lightbulb, Target, Zap, ShieldCheck, Gauge, Users, Mail } from "lucide-react";
import ContactForm from "./ContactForm";



/* ---------- Small components ---------- */
const FlippableBox = ({ icon: Icon, title, text, detail, gradient }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="perspective h-64"
    >
      <div
        className={`relative preserve-3d duration-700 w-full h-full ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div
          className={`${gradient} rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden w-full h-full font-serif backface-hidden`}
        >
          <Icon
            className="absolute inset-0 m-auto w-3/4 h-3/4 text-white opacity-20 [filter:drop-shadow(0_6px_10px_rgba(0,0,0,0.45))]"
            style={{ mixBlendMode: "overlay" }}
          />
          <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-wide relative z-10 leading-snug">
            {title}
          </h3>
          <p className="text-gray-900 font-medium text-xl leading-relaxed relative z-10 mt-2">
            {text}
          </p>
        </div>
        {/* Back */}
        <div
          className={`absolute inset-0 ${gradient} rounded-2xl shadow-2xl p-6 flex items-center justify-center text-center font-serif rotate-y-180 backface-hidden w-full h-full`}
        >
          <p className="text-gray-900 font-medium text-xl leading-relaxed">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ text, gradient }) => (
  <div className="my-16 text-center font-serif max-w-4xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide mb-6">
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
    <div className={`mx-auto h-1 w-full rounded-full bg-gradient-to-r ${gradient}`}></div>
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
      gradient: "bg-gradient-to-br from-emerald-100 to-emerald-400",
    },
    {
      icon: Target,
      title: "Solutions-focus",
      text: "We work to the solution, not the process.",
      detail:
        "We keep eyes on the outcomes, adapting methods flexibly to get results, not red tape.",
      gradient: "bg-gradient-to-br from-green-100 to-green-500",
    },
    {
      icon: Zap,
      title: "Expedience",
      text: "We crack on and deliver at pace.",
      detail:
        "Our delivery mindset means momentum is maintained without compromising quality.",
      gradient: "bg-gradient-to-br from-lime-100 to-lime-400",
    },
  ];

  const whatItems = [
    {
      icon: Gauge,
      title: "Procurement as a Service",
      text: "Flexible, outcome-focused support to meet your buying needs.",
      detail:
        "From one-off projects to ongoing capacity, we provide tailored procurement support that scales with you.",
      gradient: "bg-gradient-to-br from-amber-100 to-orange-400",
    },
    {
      icon: Users,
      title: "Commercial Consultation",
      text: "Practical advice and clear strategies for better business decisions.",
      detail:
        "We advise with pragmatism — commercial strategies grounded in reality, not theory.",
      gradient: "bg-gradient-to-br from-yellow-100 to-amber-400",
    },
    {
      icon: ShieldCheck,
      title: "Commercial Training",
      text:
        "Upskilling teams with relevant, tailored training — including public sector specifics.",
      detail:
        "We design training that empowers people to navigate complexity confidently.",
      gradient: "bg-gradient-to-br from-orange-100 to-orange-500",
    },
  ];

  return (
    <div className="font-serif bg-white text-gray-900 relative overflow-hidden antialiased">
      <style>{`
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      {/* Soft colourful background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(closest-side, #FACC15, transparent)" }}
        />
        <div
          className="absolute top-40 -right-20 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(closest-side, #A3A635, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[26rem] h-[26rem] rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(closest-side, #D97706, transparent)" }}
        />
      </div>

     {/* Header */}
<header className="px-6 md:px-10 pt-10 pb-6 max-w-6xl mx-auto flex items-center justify-between font-serif">
  <div className="flex items-center space-x-4">
    <div className="h-20 md:h-28">
      <img 
        src={logo} 
        alt="StepBuyStep logo" 
        className="h-full w-auto object-contain"
      />
    </div>
  </div>

  <a
    href="#contact"
    className="bg-gradient-to-br from-rose-200 to-rose-500 rounded-2xl shadow-2xl px-8 py-5 flex items-center justify-center text-center relative overflow-hidden transform hover:scale-[1.08] transition font-serif"
  >
    <Mail
      className="absolute inset-0 m-auto w-10 h-10 text-white opacity-20 [filter:drop-shadow(0_6px_10px_rgba(0,0,0,0.45))]"
      style={{ mixBlendMode: "overlay" }}
    />
    <span className="relative z-10 text-2xl font-bold text-gray-900 tracking-tight">
      Contact Us
    </span>
  </a>
</header>




      {/* Hero */}
      <main className="px-6 md:px-10 pb-20 max-w-6xl mx-auto">
        <div className="pt-10 max-w-4xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-gray-900 tracking-tight mb-6">
            Procurement can be difficult — but it doesn’t have to be painful.
          </h1>
          <p className="text-lg md:text-xl text-justify text-gray-800 leading-relaxed font-serif">
            At{" "}
            <span className="font-semibold text-gray-900 inline-flex items-baseline gap-1">
              <span className="relative top-1">Step</span>
              <span className="italic">Buy</span>
              <span className="relative -top-1">Step</span>
            </span>
            , we bring a clear, logical approach to commercial activity. Rooted
            in problem-solving rather than procedure, we help organisations cut
            through complexity, focus on outcomes, and make better buying and
            business decisions with confidence.
          </p>
        </div>

        {/* HOW */}
        <SectionTitle text="How we work" gradient="from-emerald-500 via-green-600 to-emerald-700" />
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3 mb-16">
          {howItems.map((item, idx) => (
            <FlippableBox key={idx} {...item} />
          ))}
        </div>

        {/* WHAT */}
        <SectionTitle text="What we do" gradient="from-amber-500 via-orange-600 to-amber-700" />
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-3 mb-16">
          {whatItems.map((item, idx) => (
            <FlippableBox key={idx} {...item} />
          ))}
        </div>

        {/* About */}
        <SectionTitle text="About StepBuyStep" gradient="from-purple-500 via-purple-600 to-purple-700" />
        <section id="about" className="max-w-4xl mx-auto mb-16 px-6">
          <p className="text-gray-800 leading-relaxed tracking-normal text-justify text-base md:text-lg mb-5">
            <span className="inline-flex items-baseline gap-1 align-baseline">
              <span className="relative top-1">Step</span>
              <span className="italic">Buy</span>
              <span className="relative -top-1">Step</span>
            </span>{" "}
            are a team of experienced procurement and commercial professionals
            who believe buying should be clear, logical and effective. Between
            us we’ve supported organisations through reforms, delivered complex
            projects and helped teams build their commercial capability.
          </p>
          <p className="text-gray-800 leading-relaxed tracking-normal text-justify text-base md:text-lg mb-5">
            Our backgrounds span both public and private sectors, from
            multi-million-pound procurements to tailored training and hands-on
            delivery. We draw on our network of specialists to bring the right
            skills to the table when they’re needed.
          </p>
          <p className="text-gray-800 leading-relaxed tracking-normal text-justify text-base md:text-lg">
            What unites us is a solutions-focused approach: practical advice,
            grounded experience, and a drive to make the complex feel
            manageable. We help organisations move forward with confidence — one
            clear step at a time.
          </p>
        </section>

{/* Contact */}
<SectionTitle text="Contact Us" gradient="from-rose-400 via-rose-600 to-rose-800" />
<section
  id="contact"
  className="bg-white/80 backdrop-blur rounded-xl shadow-md p-8 font-serif max-w-4xl mx-auto"
>
  <ContactForm />
</section>

      </main>
    </div>
  );
}

/* ---------- Default export expected by Vite ---------- */
export default function App() {
  return <StepBuyStepPage />;
}
