import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { whatsappConsultationUrl } from "../data/contact.js";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#automation", label: "Automation" },
  { href: "#proof", label: "Proof" },
  { href: "#internship", label: "Internship" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${scrolled ? "border-white/10 bg-nox-bg/80 shadow-glow backdrop-blur-xl" : "border-white/0 bg-nox-bg/40 backdrop-blur-md"}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="group flex items-center gap-3" aria-label="NOXEVA Digital Solutions home">
          <span className="grid h-10 w-10 place-items-center border border-white/20 bg-nox-gradient font-black text-white shadow-glow">N</span>
          <span className="leading-tight">
            <span className="block text-sm font-black uppercase text-white">NOXEVA</span>
            <span className="block text-xs font-semibold text-white/60">Digital Solutions</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 border border-white/10 bg-white/[0.04] p-1 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/[0.07] hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <a href={whatsappConsultationUrl} target="_blank" rel="noreferrer" className="hidden items-center gap-2 bg-white px-4 py-3 text-sm font-black text-nox-bg transition hover:bg-nox-secondary lg:inline-flex">
          Free Consultation
          <ArrowRight size={17} />
        </a>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center border border-white/20 bg-white/[0.05] text-white lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mb-4 grid gap-1 border border-white/10 bg-nox-panel/95 p-2 shadow-glow backdrop-blur-xl lg:hidden"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="px-4 py-3 font-semibold text-white/75 transition hover:bg-white/[0.07] hover:text-white">
                {link.label}
              </a>
            ))}
            <a href={whatsappConsultationUrl} target="_blank" rel="noreferrer" className="mt-1 flex items-center justify-center gap-2 bg-nox-gradient px-4 py-3 font-black text-white" onClick={() => setOpen(false)}>
              Free Consultation
              <ArrowRight size={18} />
            </a>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
