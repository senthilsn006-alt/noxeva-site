import { m } from "framer-motion";
import { ArrowRight, Database, MailCheck, MessageSquareText, Sparkles, Workflow, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection.jsx";

const flow = [
  { icon: MessageSquareText, label: "Lead captured", value: "WhatsApp + form" },
  { icon: Database, label: "Data organized", value: "Sheets + CRM" },
  { icon: MailCheck, label: "Follow-up sent", value: "Instant routing" },
  { icon: Zap, label: "Action triggered", value: "No manual delay" },
];

export default function AutomationHighlight() {
  return (
    <AnimatedSection id="automation" className="section-shell border-y border-white/10 bg-[#0d0d16]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div>
          <p className="eyebrow">Automation systems</p>
          <h2 className="section-title">We automate workflows, reduce manual work, and improve efficiency.</h2>
          <p className="section-copy">
            NOXEVA builds smart systems that capture leads, route tasks, trigger follow-ups, organize data, and keep the business moving while your team focuses on work that matters.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Lead qualification", "Instant notifications", "CRM updates", "AI-powered replies"].map((item) => (
              <div key={item} className="flex items-center gap-3 border border-white/10 bg-white/[0.045] p-4">
                <Sparkles size={18} className="text-nox-secondary" />
                <span className="text-sm font-bold text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <m.div
          className="relative overflow-hidden border border-white/10 bg-white/[0.045] p-3 shadow-blueGlow backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.72, ease: "easeOut" }}
        >
          <div className="border border-white/10 bg-nox-panel/80">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div>
                <p className="text-xs font-black uppercase text-nox-secondary">NOXEVA command center</p>
                <p className="mt-1 text-sm text-white/50">Automation dashboard mockup</p>
              </div>
              <span className="flex items-center gap-2 bg-nox-gradient px-3 py-2 text-xs font-black text-white">
                Live flow
                <Workflow size={15} />
              </span>
            </div>

            <div className="grid gap-3 p-4">
              {flow.map((item, index) => {
                const Icon = item.icon;
                return (
                  <m.div
                    key={item.label}
                    className="grid gap-4 border border-white/10 bg-white/[0.035] p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                    initial={{ opacity: 0, x: 22 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.48, delay: index * 0.08 }}
                  >
                    <span className="grid h-11 w-11 place-items-center bg-white/[0.06] text-nox-secondary">
                      <Icon size={20} />
                    </span>
                    <div>
                      <p className="font-black text-white">{item.label}</p>
                      <p className="text-sm text-white/50">{item.value}</p>
                    </div>
                    <ArrowRight className="hidden text-white/40 sm:block" size={19} />
                  </m.div>
                );
              })}
            </div>

            <div className="grid border-t border-white/10 sm:grid-cols-3">
              {["Response", "Routing", "Reporting"].map((item, index) => (
                <div key={item} className="border-b border-white/10 p-4 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <p className="text-xs font-bold uppercase text-white/40">{item}</p>
                  <div className="mt-3 h-2 bg-white/[0.06]">
                    <m.div
                      className="h-full bg-nox-gradient"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${82 + index * 5}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.85, delay: 0.18 + index * 0.08 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </AnimatedSection>
  );
}
