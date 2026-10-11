import { useCallback, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import GitHubSection from "./components/GitHubSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/ui/Preloader";
import Marquee from "./components/ui/Marquee";
import useSmoothScroll from "./hooks/useSmoothScroll";
import ChatWidget from "./components/ChatWidget";

const skillMarquee = [
  "Full Stack Development",
  "AI / Machine Learning",
  "React",
  "Node.js",
  "Python",
  "MongoDB",
  "Scalable APIs",
  "Product Engineering",
];

const closingMarquee = [
  "Let's Build Something",
  "Available For Work",
  "Open To Collaboration",
  "MERN + AI",
  "Turning Ideas Into Products",
];

// Skip the intro if reduced-motion is on or it already played this session.
const shouldSkipIntro = () => {
  if (typeof window === "undefined") return true;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const seen = sessionStorage.getItem("vansh_intro") === "1";
  return reduce || seen;
};

const App = () => {
  const [booted, setBooted] = useState(shouldSkipIntro);

  const handleIntroDone = useCallback(() => {
    try {
      sessionStorage.setItem("vansh_intro", "1");
    } catch {
      /* storage may be unavailable — ignore */
    }
    setBooted(true);
  }, []);

  // Momentum smooth-scroll starts only after the intro (and never for reduced-motion).
  useSmoothScroll(booted);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <>
      {!booted && <Preloader onDone={handleIntroDone} />}

      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Navbar />
      <main>
        <Hero />
        <Marquee items={skillMarquee} duration={30} />
        <About />
        <TechStack />
        <Projects />
        <Journey />
        <GitHubSection />
        <Marquee items={closingMarquee} duration={34} reverse />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <Analytics />
    </>
  );
};

export default App;
