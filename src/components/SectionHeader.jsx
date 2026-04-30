import { m } from "framer-motion";

export default function SectionHeader({ eyebrow, title, children, align = "left" }) {
  return (
    <m.div
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {children && <p className="section-copy">{children}</p>}
    </m.div>
  );
}
