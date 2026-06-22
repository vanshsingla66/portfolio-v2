import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import TechIcon from "./ui/TechIcon";
import { techStack } from "../data/profile";
import "./styles/TechStack.css";

const TechStack = () => {
  return (
    <section className="section stack" id="stack">
      <Reveal>
        <span className="eyebrow">Tech Stack</span>
        <h2 className="section-title">
          Tools I use to <span className="gradient-text">ship products</span>
        </h2>
        <p className="section-lead">
          A pragmatic, full-stack toolkit — from MERN web apps to Python-powered
          machine learning.
        </p>
      </Reveal>

      <div className="stack__groups">
        {techStack.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 0.05} className="stack__group">
            <div className="stack__group-head">
              <span
                className="stack__group-dot"
                style={{ background: group.accent, boxShadow: `0 0 12px ${group.accent}` }}
              />
              <h3>{group.category}</h3>
              <span className="stack__count mono">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>
            <div className="stack__items">
              {group.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  className="stack__chip"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  whileHover={{ y: -5 }}
                  style={
                    {
                      "--chip-accent": group.accent,
                    } as React.CSSProperties
                  }
                >
                  <span className="stack__chip-icon">
                    <TechIcon icon={item.icon} />
                  </span>
                  <span className="stack__chip-name">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
