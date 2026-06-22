import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiTypescript,
  SiTensorflow,
} from "react-icons/si";
import MagneticButton from "./ui/MagneticButton";
import ParticleField from "./ui/ParticleField";
import { profile, heroRotating } from "../data/profile";
import "./styles/Hero.css";

const floatIcons = [
  { Icon: SiReact, x: "8%", y: "26%", d: 0, c: "#61dafb" },
  { Icon: SiNodedotjs, x: "88%", y: "22%", d: 0.6, c: "#83cd29" },
  { Icon: SiPython, x: "14%", y: "70%", d: 1.1, c: "#ffd43b" },
  { Icon: SiMongodb, x: "84%", y: "68%", d: 0.3, c: "#47a248" },
  { Icon: SiTypescript, x: "92%", y: "46%", d: 0.9, c: "#3178c6" },
  { Icon: SiTensorflow, x: "5%", y: "48%", d: 1.4, c: "#ff8f00" },
];

const Hero = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % heroRotating.length),
      2400
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="top">
      <ParticleField />

      <div className="hero__glow hero__glow--a" />
      <div className="hero__glow hero__glow--b" />

      {floatIcons.map(({ Icon, x, y, d, c }, i) => (
        <motion.span
          key={i}
          className="hero__float"
          style={{ left: x, top: y, color: c }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 0.85,
            scale: 1,
            y: [0, -14, 0],
          }}
          transition={{
            opacity: { delay: 0.8 + d * 0.2, duration: 0.6 },
            scale: { delay: 0.8 + d * 0.2, duration: 0.6 },
            y: { duration: 4 + d, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Icon />
        </motion.span>
      ))}

      <div className="hero__inner">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="hero__pulse" />
          Available for projects · {profile.location}
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Hi, I'm <span className="gradient-text">{profile.name}</span>{" "}
          <motion.span
            className="hero__wave"
            animate={{ rotate: [0, 18, -8, 18, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.2 }}
          >
            👋
          </motion.span>
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          Full Stack Developer building{" "}
          <span className="gradient-text">AI-powered digital experiences.</span>
        </motion.p>

        <motion.div
          className="hero__rotator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="hero__rotator-label mono">I build</span>
          <span className="hero__rotator-track">
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                className="hero__rotator-word gradient-text"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {heroRotating[idx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <MagneticButton href="#work" className="btn-primary">
            View Projects <FiArrowDown />
          </MagneticButton>
          <MagneticButton href={profile.linkedin} newTab className="btn-ghost">
            Connect With Me <FiArrowUpRight />
          </MagneticButton>
        </motion.div>

        <motion.div
          className="hero__terminal glass mono"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          <div className="hero__term-bar">
            <span className="hero__term-dots">
              <i style={{ background: "#ff5f57" }} />
              <i style={{ background: "#febc2e" }} />
              <i style={{ background: "#28c840" }} />
            </span>
            <span className="hero__term-title">vansh — ~/dev</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__term-handle"
            >
              @{profile.githubUser}
            </a>
          </div>
          <pre className="hero__term-body">
            <code>
              <span className="t-prompt">$</span>{" "}
              <span className="t-cmd">whoami</span>
              {"\n\n"}
              <span className="t-kw">const</span>{" "}
              <span className="t-var">vansh</span>{" "}
              <span className="t-op">=</span> {"{"}
              {"\n  "}
              <span className="t-key">role</span>:{" "}
              <span className="t-str">"Full Stack Developer"</span>,
              {"\n  "}
              <span className="t-key">focus</span>: [
              <span className="t-str">"AI / ML"</span>,{" "}
              <span className="t-str">"Scalable Systems"</span>],
              {"\n  "}
              <span className="t-key">stack</span>: [
              <span className="t-str">"React"</span>,{" "}
              <span className="t-str">"Node"</span>,{" "}
              <span className="t-str">"Python"</span>,{" "}
              <span className="t-str">"MongoDB"</span>],
              {"\n  "}
              <span className="t-key">status</span>:{" "}
              <span className="t-str">"building the future 🚀"</span>,
              {"\n"}
              {"};"}
              <span className="hero__caret" />
            </code>
          </pre>
        </motion.div>
      </div>

      <div className="hero__scroll-hint mono">
        <span>scroll</span>
        <FiArrowDown />
      </div>
    </section>
  );
};

export default Hero;
