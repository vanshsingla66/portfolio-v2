import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiCpu, FiLayers, FiTrendingUp, FiGitBranch } from "react-icons/fi";
import Reveal from "./ui/Reveal";
import { profile, stats, exploring } from "../data/profile";
import "./styles/About.css";

const exploreIcons = [FiLayers, FiCpu, FiGitBranch, FiTrendingUp];

/** Counts a numeric stat up when scrolled into view (e.g. "10+"). */
const StatValue = ({ value }: { value: string }) => {
  const num = parseInt(value, 10);
  const isNumeric = !Number.isNaN(num);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!isNumeric || !inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * num));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, isNumeric, num]);

  return (
    <span ref={ref} className="about__stat-value gradient-text">
      {isNumeric ? `${n}${value.replace(String(num), "")}` : value}
    </span>
  );
};

const About = () => {
  return (
    <section className="section about" id="about">
      <Reveal>
        <span className="eyebrow">About</span>
        <h2 className="section-title">
          Engineering at the intersection of
          <br />
          <span className="gradient-text">code & intelligence</span>
        </h2>
      </Reveal>

      <div className="about__grid">
        <Reveal delay={0.05} className="about__bio glass">
          <p>
            I'm a Computer Science student specializing in{" "}
            <strong>AI &amp; Analytics</strong>, passionate about building
            production-ready applications.
          </p>
          <p>
            I enjoy combining full-stack development with artificial
            intelligence to solve practical, real-world problems.
          </p>
          <div className="about__edu">
            <span className="mono about__edu-label">EDUCATION</span>
            <strong>{profile.education.degree}</strong>
            <span>{profile.education.school}</span>
            <span className="about__edu-period mono">
              {profile.education.period}
            </span>
          </div>
        </Reveal>

        <div className="about__stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.08}>
              <motion.div
                className="about__stat glass"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <StatValue value={s.value} />
                <span className="about__stat-label">{s.label}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <div className="about__exploring">
          <span className="mono about__exploring-title">CURRENTLY EXPLORING</span>
          <div className="about__explore-grid">
            {exploring.map((e, i) => {
              const Icon = exploreIcons[i % exploreIcons.length];
              return (
                <motion.div
                  key={e}
                  className="about__explore-card glass"
                  whileHover={{ y: -5, borderColor: "rgba(77,124,255,0.4)" }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="about__explore-icon">
                    <Icon />
                  </span>
                  {e}
                </motion.div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default About;
