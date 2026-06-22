import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { profile } from "../data/profile";
import "./styles/Navbar.css";

const links = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = -1;
    const onScroll = () => {
      // Only call setState when the boolean actually flips across the threshold.
      const next = window.scrollY > 24 ? 1 : 0;
      if (next !== last) {
        last = next;
        setScrolled(next === 1);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav__inner">
        <a href="#top" className="nav__brand">
          <span className="nav__dot" />
          {profile.name}
          <span className="nav__brand-tag mono">/dev</span>
        </a>

        <nav className="nav__links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="#contact" className="nav__cta">
            Let's talk
          </a>
          <button
            className="nav__burger"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav__mobile glass"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
