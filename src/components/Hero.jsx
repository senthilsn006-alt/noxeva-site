import { lazy, Suspense } from "react";
import { m } from "framer-motion";
import { ArrowRight, Bot, Gauge, Instagram, MessageCircle, Sparkles, Workflow } from "lucide-react";
import { contact, whatsappConsultationUrl } from "../data/contact.js";

const LumenSphere = lazy(() => import("./LumenSphere.jsx"));

const cards = [
  { icon: Bot, title: "AI agent ready", meta: "Support + sales" },
  { icon: Workflow, title: "Automation queue", meta: "Manual work reduced" },
  { icon: Gauge, title: "Conversion layer", meta: "Built for leads" },
];

const floatingVariants = {
  animate: (index) => ({
    y: [0, index % 2 ? 14 : -14, 0],
    x: [0, index === 1 ? -10 : 8, 0],
    transition: {
      duration: 5 + index,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[88svh] overflow-hidden border-b border-white/10 bg-nox-bg pt-24 lg:pt-28">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(10,10,15,0.96)_0%,rgba(10,10,15,0.62)_45%,rgba(10,10,15,0.94)_100%)]" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 top-20 opacity-95 lg:left-[38%]">
        <Suspense fallback={<div className="h-full w-full bg-[linear-gradient(135deg,rgba(123,44,255,0.2),rgba(95,156,255,0.08))]" />}>
          <LumenSphere />
        </Suspense>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(88svh-7rem)] max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="max-w-3xl">
          <m.p
            className="eyebrow"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Premium SaaS & AI startup partner
          </m.p>
          <m.h1
            className="max-w-3xl text-4xl font-black leading-[1.03] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: 0.18 }}
          >
            We Build Automation Systems & High-Converting Websites for Businesses
          </m.h1>
          <m.p
            className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.28 }}
          >
            Premium websites, AI automation systems, and digital solutions for modern businesses.
          </m.p>

          <m.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.38 }}
          >
            <a href="#contact" className="btn-primary">
              Get Free Consultation
              <ArrowRight size={18} />
            </a>
            <a href={whatsappConsultationUrl} target="_blank" rel="noreferrer" className="btn-secondary">
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
            <a href={contact.instagram} target="_blank" rel="noreferrer" className="btn-ghost">
              <Instagram size={18} />
              View Our Work
            </a>
          </m.div>

          <m.div
            className="mt-7 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.48 }}
          >
            {["Strategy first", "Fast execution", "Lead-focused UX"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-white/70">
                <Sparkles size={14} className="text-nox-secondary" />
                {item}
              </span>
            ))}
          </m.div>
        </div>

        <div className="relative hidden min-h-[560px] lg:block">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const positions = ["left-2 top-12", "right-0 top-[44%]", "left-12 bottom-12"];
            return (
              <m.div
                key={card.title}
                className={`absolute ${positions[index]} glass-card w-64 p-4 shadow-blueGlow`}
                custom={index}
                variants={floatingVariants}
                animate="animate"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center bg-nox-gradient text-white">
                    <Icon size={19} />
                  </span>
                  <span className="h-2 w-20 bg-[linear-gradient(90deg,#7B2CFF,#5F9CFF)]" />
                </div>
                <p className="text-sm font-black text-white">{card.title}</p>
                <p className="mt-1 text-xs font-semibold text-white/60">{card.meta}</p>
              </m.div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-white/[0.035]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/10 px-4 sm:grid-cols-4 sm:divide-y-0 lg:grid-cols-6 lg:px-8">
          {["Web Development", "Web Design", "AI Automation", "AI Agents", "Video Editing", "Portfolios"].map((item) => (
            <span key={item} className="grid min-h-16 place-items-center px-3 text-center text-xs font-black uppercase text-white/60 sm:text-sm">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
