import { useState } from "react";
import { m } from "framer-motion";
import { Instagram, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { contact, whatsappConsultationUrl } from "../data/contact.js";
import { interests } from "../data/services.js";
import { submitLead } from "../lib/forms.js";

const initialForm = {
  name: "",
  email: "",
  service: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!form.name || !form.email || !form.service || !form.message) {
      setStatus({ type: "error", message: "Please complete every field." });
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitLead({ type: "contact", ...form });
      setForm(initialForm);
      setStatus({
        type: "success",
        message: result.simulated
          ? "Inquiry captured in demo mode. Add VITE_GOOGLE_SCRIPT_URL to connect Google Sheets."
          : "Inquiry sent. The NOXEVA team will reach out soon.",
      });
    } catch {
      setStatus({ type: "error", message: "Could not submit. Please WhatsApp or email us directly." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-shell border-t border-white/10 bg-[#0d0d16]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionHeader eyebrow="Contact" title="Let us build your next digital growth system.">
            Tell us what you want to launch, automate, or improve. We will help you choose the clearest next step.
          </SectionHeader>

          <div className="mt-8 grid gap-3">
            <a href={whatsappConsultationUrl} target="_blank" rel="noreferrer" className="contact-link">
              <MessageCircle size={20} />
              WhatsApp: +91 86374 99171
            </a>
            <a href={`mailto:${contact.email}`} className="contact-link">
              <Mail size={20} />
              {contact.email}
            </a>
            <a href={contact.instagram} target="_blank" rel="noreferrer" className="contact-link">
              <Instagram size={20} />
              @noxevatech
            </a>
            <p className="contact-link">
              <MapPin size={20} />
              {contact.location}
            </p>
          </div>
        </div>

        <m.form
          onSubmit={handleSubmit}
          className="glass-card p-5 sm:p-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.62 }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-field">
              <span>Name</span>
              <input name="name" value={form.name} onChange={updateField} placeholder="Your name" autoComplete="name" />
            </label>
            <label className="form-field">
              <span>Email</span>
              <input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" autoComplete="email" />
            </label>
          </div>
          <label className="form-field mt-4">
            <span>Service</span>
            <select name="service" value={form.service} onChange={updateField}>
              <option value="">Select service</option>
              {interests.map((interest) => (
                <option key={interest}>{interest}</option>
              ))}
            </select>
          </label>
          <label className="form-field mt-4">
            <span>Project brief</span>
            <textarea name="message" value={form.message} onChange={updateField} rows="5" placeholder="What do you want to build or automate?" />
          </label>

          <button disabled={submitting} type="submit" className="btn-primary mt-5 w-full">
            {submitting ? "Sending..." : "Send Inquiry"}
            <Send size={18} />
          </button>
          <p className={`form-status ${status.type === "error" ? "text-red-300" : "text-nox-secondary"}`} role="status" aria-live="polite">
            {status.message}
          </p>
        </m.form>
      </div>
    </section>
  );
}
