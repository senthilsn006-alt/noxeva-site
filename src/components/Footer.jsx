import { Instagram, Mail, MessageCircle } from "lucide-react";
import { contact, whatsappConsultationUrl } from "../data/contact.js";

const links = [
  { href: "#services", label: "Services" },
  { href: "#automation", label: "Automation" },
  { href: "#internship", label: "Internship" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-nox-bg px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <a href="#hero" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center bg-nox-gradient font-black text-white">N</span>
            <span>
              <span className="block font-black text-white">NOXEVA Digital Solutions</span>
              <span className="block text-sm text-white/50">Premium websites, AI automation systems, and digital growth solutions.</span>
            </span>
          </a>
        </div>

        <nav className="grid gap-2" aria-label="Footer navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold text-white/60 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-start gap-3 lg:justify-end">
          <a href={whatsappConsultationUrl} target="_blank" rel="noreferrer" className="social-button" aria-label="WhatsApp">
            <MessageCircle size={18} />
          </a>
          <a href={`mailto:${contact.email}`} className="social-button" aria-label="Email">
            <Mail size={18} />
          </a>
          <a href={contact.instagram} target="_blank" rel="noreferrer" className="social-button" aria-label="Instagram">
            <Instagram size={18} />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>NOXEVA Digital Solutions</p>
        <p>Chennai, Tamil Nadu, India</p>
      </div>
    </footer>
  );
}
