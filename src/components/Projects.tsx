import { motion } from "framer-motion";
import { FiGithub, FiArrowUpRight, FiCheck } from "react-icons/fi";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import { projects } from "../data/profile";
import "./styles/Projects.css";

const Projects = () => {
  return (
    <section className="section work" id="work">
      <Reveal>
        <span className="eyebrow">Selected Work</span>
        <h2 className="section-title">
          Products I've <span className="gradient-text">designed & built</span>
        </h2>
        <p className="section-lead">
          From realtime communication platforms to AI-driven learning systems —
          here's what I've been shipping.
        </p>
      </Reveal>

      <div className="work__list">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <TiltCard className="work__card glass">
              <div className="work__card-inner">
                <div className="work__left">
                  <span className="work__index mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="work__tag mono">{p.tag}</span>
                  <h3 className="work__name">{p.name}</h3>
                  {p.subtitle && <p className="work__subtitle">{p.subtitle}</p>}
                  <p className="work__desc">{p.description}</p>

                  <div className="work__tech">
                    {p.tech.map((t) => (
                      <span key={t} className="work__pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="work__actions">
                    {p.github && (
                      <motion.a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work__btn work__btn--ghost"
                        whileHover={{ y: -2 }}
                      >
                        <FiGithub /> Code
                      </motion.a>
                    )}
                    <motion.a
                      href={p.demo || "#"}
                      target={p.demo ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`work__btn work__btn--primary ${
                        p.demo ? "" : "work__btn--disabled"
                      }`}
                      whileHover={p.demo ? { y: -2 } : undefined}
                      onClick={(e) => !p.demo && e.preventDefault()}
                      aria-disabled={!p.demo}
                    >
                      {p.demo ? "Live Demo" : "Demo Soon"} <FiArrowUpRight />
                    </motion.a>
                  </div>
                </div>

                <div className="work__right">
                  <span className="work__features-label mono">KEY FEATURES</span>
                  <ul className="work__features">
                    {p.features.map((f) => (
                      <li key={f}>
                        <span className="work__feature-check">
                          <FiCheck />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
