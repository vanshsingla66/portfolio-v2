import { motion } from "framer-motion";
import { FiLinkedin, FiGithub, FiMail, FiArrowUpRight, FiMapPin } from "react-icons/fi";
import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import ParticleField from "./ui/ParticleField";
import { profile } from "../data/profile";
import "./styles/Contact.css";

const cards = [
  {
    label: "LinkedIn",
    value: "vansh-singla17",
    href: profile.linkedin,
    Icon: FiLinkedin,
    accent: "#0a66c2",
  },
  {
    label: "GitHub",
    value: profile.githubUser,
    href: profile.github,
    Icon: FiGithub,
    accent: "#a06bff",
  },
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: FiMail,
    accent: "#38e8ff",
  },
];

const Contact = () => {
  return (
    <section className="section contact" id="contact">
      <div className="contact__bg">
        <ParticleField density={0.00006} />
        <div className="contact__glow" />
      </div>

      <Reveal>
        <div className="contact__head">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Contact
          </span>
          <h2 className="contact__title">
            Let's build something <span className="gradient-text">amazing</span>
          </h2>
          <p className="contact__lead">
            Have a project, role, or idea in mind? I'm always open to
            collaborating on ambitious products.
          </p>
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="btn-primary contact__cta"
          >
            <FiMail /> Say hello
          </MagneticButton>
        </div>
      </Reveal>

      <div className="contact__cards">
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={0.05 + i * 0.08}>
            <motion.a
              href={c.href}
              target={c.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="contact__card glass"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ "--card-accent": c.accent } as React.CSSProperties}
            >
              <span className="contact__card-icon">
                <c.Icon />
              </span>
              <div className="contact__card-text">
                <span className="contact__card-label mono">{c.label}</span>
                <span className="contact__card-value">{c.value}</span>
              </div>
              <FiArrowUpRight className="contact__card-arrow" />
            </motion.a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="contact__location">
          <FiMapPin /> Based in {profile.location} · Open to remote
        </p>
      </Reveal>
    </section>
  );
};

export default Contact;
