import { useState } from "react";
import { m } from "framer-motion";
import { Send, Upload } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { interests } from "../data/services.js";
import { submitLead } from "../lib/forms.js";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  interest: "",
};

export default function Internship() {
  const [form, setForm] = useState(initialForm);
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setResume(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setStatus({ type: "error", message: "Please upload your resume as a PDF." });
      event.target.value = "";
      setResume(null);
      return;
    }

    setResume(file);
    setStatus({ type: "idle", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!form.name || !form.email || !form.phone || !form.interest || !resume) {
      setStatus({ type: "error", message: "Please complete all fields and upload your PDF resume." });
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitLead({
        type: "internship",
        ...form,
        resumeName: resume.name,
        resumeSize: resume.size,
      });
      setForm(initialForm);
      setResume(null);
      event.currentTarget.reset();
      setStatus({
        type: "success",
        message: result.simulated
          ? "Application captured in demo mode. Add VITE_GOOGLE_SCRIPT_URL to connect Google Sheets."
          : "Application submitted. We will review it soon.",
      });
    } catch {
      setStatus({ type: "error", message: "Submission failed. Please email noxevatech@gmail.com." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="internship" className="section-shell bg-nox-bg">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <SectionHeader eyebrow="Internship" title="Join NOXEVA">
          Work on real websites, AI automations, content systems, and digital projects while learning how a premium digital agency operates.
        </SectionHeader>

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
              <input name="name" value={form.name} onChange={updateField} placeholder="Your full name" autoComplete="name" />
            </label>
            <label className="form-field">
              <span>Email</span>
              <input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" autoComplete="email" />
            </label>
            <label className="form-field">
              <span>Phone</span>
              <input name="phone" value={form.phone} onChange={updateField} placeholder="Your phone number" autoComplete="tel" />
            </label>
            <label className="form-field">
              <span>Field of Interest</span>
              <select name="interest" value={form.interest} onChange={updateField}>
                <option value="">Select field</option>
                {interests.map((interest) => (
                  <option key={interest}>{interest}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-4 block border border-dashed border-white/20 bg-white/[0.035] p-5 transition hover:border-nox-secondary/70">
            <span className="flex items-center gap-3 text-sm font-black text-white">
              <Upload size={18} className="text-nox-secondary" />
              Resume upload (PDF)
            </span>
            <input className="sr-only" type="file" accept="application/pdf" onChange={handleFile} />
            <span className="mt-3 block text-sm text-white/50">{resume ? resume.name : "Click to upload your resume"}</span>
          </label>

          <button disabled={submitting} type="submit" className="btn-primary mt-5 w-full">
            {submitting ? "Submitting..." : "Submit Application"}
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
