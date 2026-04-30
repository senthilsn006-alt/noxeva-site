import { m } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export default function AnimatedSection({ id, className = "", children }) {
  return (
    <m.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </m.section>
  );
}
