import { m } from "framer-motion";
import { ExternalLink, Instagram, Play, Sparkles } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { contact } from "../data/contact.js";

const previews = [
  { title: "AI workflow concept", type: "Automation" },
  { title: "SaaS landing page", type: "Website" },
  { title: "Brand reel edit", type: "Video" },
];

export default function SocialProof() {
  return (
    <section id="proof" className="section-shell border-y border-white/10 bg-[#0d0d16]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeader eyebrow="Social proof" title="Trusted by startups, creators, and growing businesses">
            Follow NOXEVA for website concepts, automation ideas, AI systems, and digital growth work.
          </SectionHeader>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a href={contact.instagram} target="_blank" rel="noreferrer" className="btn-primary">
              <Instagram size={18} />
              Open Instagram
            </a>
            <a href="#contact" className="btn-secondary">
              Start a Project
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {previews.map((preview, index) => (
            <m.a
              key={preview.title}
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative min-h-[390px] overflow-hidden border border-white/10 bg-white/[0.045] p-5 shadow-blueGlow"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.56, delay: index * 0.08 }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(123,44,255,0.32),rgba(95,156,255,0.14),rgba(255,255,255,0.04))] opacity-80 transition group-hover:opacity-100" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(10,10,15,0.86))]" />
              <div className="relative z-10 flex h-full min-h-[350px] flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center bg-white text-nox-bg">
                    {index === 2 ? <Play size={20} /> : <Sparkles size={20} />}
                  </span>
                  <span className="border border-white/20 bg-white/[0.08] px-3 py-1 text-xs font-black uppercase text-white/70">
                    {preview.type}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase text-white/50">@noxevatech</p>
                  <h3 className="mt-2 text-2xl font-black text-white">{preview.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">Instagram preview placeholder for live work, case snippets, and creative updates.</p>
                </div>
              </div>
            </m.a>
          ))}
        </div>
      </div>
    </section>
  );
}
