import { LazyMotion, domAnimation, m } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import AutomationHighlight from "./components/AutomationHighlight.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import SocialProof from "./components/SocialProof.jsx";
import Internship from "./components/Internship.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

const pageVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div initial="hidden" animate="show" variants={pageVariants} className="min-h-screen overflow-hidden bg-nox-bg text-white">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <AutomationHighlight />
          <WhyChooseUs />
          <SocialProof />
          <Internship />
          <Contact />
        </main>
        <Footer />
      </m.div>
    </LazyMotion>
  );
}
