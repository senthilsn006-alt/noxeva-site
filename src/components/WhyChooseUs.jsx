import { m } from "framer-motion";
import { Clock3, Handshake, Rocket, ShieldCheck } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";

const reasons = [
  {
    icon: Clock3,
    title: "Fast Delivery",
    description: "Structured sprints, clear checkpoints, and focused execution so projects move quickly without feeling rushed.",
  },
  {
    icon: Rocket,
    title: "Modern Design",
    description: "Premium interfaces with SaaS-level polish, strong hierarchy, mobile responsiveness, and conversion clarity.",
  },
  {
    icon: ShieldCheck,
    title: "Business-Focused Solutions",
    description: "Every page, automation, and agent is designed around a real commercial goal, not just decoration.",
  },
  {
    icon: Handshake,
    title: "Beginner Friendly Support",
    description: "Simple communication, patient guidance, and clean handoff so non-technical teams can use what we build.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-shell bg-nox-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Why choose us" title="Premium execution without confusing agency noise." align="center">
          We combine sharp design taste with practical AI and automation engineering, then make the whole process easy to understand.
        </SectionHeader>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <m.article
                key={reason.title}
                className="glass-card min-h-[270px] p-6 transition duration-300 hover:-translate-y-1 hover:border-nox-secondary/70 hover:shadow-blueGlow"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.52, delay: index * 0.06 }}
              >
                <span className="mb-10 grid h-12 w-12 place-items-center bg-white text-nox-bg">
                  <Icon size={21} />
                </span>
                <h3 className="text-xl font-black text-white">{reason.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{reason.description}</p>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
