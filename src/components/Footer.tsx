import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { profile } from "../data/profile";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="glow-divider" />
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__name">{profile.name}</span>
          <span className="footer__role mono">
            Full Stack Developer · AI/ML
          </span>
        </div>

        <div className="footer__social">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <FiMail />
          </a>
        </div>

        <a href="#top" className="footer__top">
          Back to top <FiArrowUp />
        </a>
      </div>
      <p className="footer__copy mono">
        © {profile.name} — Designed & built from scratch.
      </p>
    </footer>
  );
};

export default Footer;
