import { m } from "framer-motion";
import { Bot, Clapperboard, Code2, MonitorSmartphone, Palette, Workflow } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { services } from "../data/services.js";

const iconMap = {
  code: Code2,
  design: Palette,
  automation: Workflow,
  agent: Bot,
  video: Clapperboard,
  portfolio: MonitorSmartphone,
};

export default function Services() {
  return (
    <section id="services" className="section-shell bg-nox-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Services"
          title="High-value digital systems built to convert, automate, and scale."
        >
          Every service is designed around business outcomes: more trust, fewer manual steps, clearer messaging, and cleaner lead capture.
        </SectionHeader>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <m.article
                key={service.title}
                className="group relative min-h-[330px] overflow-hidden border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-nox-primary/70 hover:bg-white/[0.07] hover:shadow-glow"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#7B2CFF,#5F9CFF,transparent)] opacity-0 transition group-hover:opacity-100" />
                <div className="mb-12 flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center border border-white/10 bg-nox-gradient text-white shadow-glow">
                    <Icon size={22} />
                  </span>
                  <span className="text-xs font-black text-white/30">0{index + 1}</span>
                </div>
                <h3 className="text-2xl font-black text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{service.description}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
