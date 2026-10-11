import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/Preloader.css";

interface PreloaderProps {
  /** Called once the intro is finished (or skipped) so the app can boot. */
  onDone: () => void;
}

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Cinematic intro overlay (landonorris.com-style): name reveal + 0→100
 * counter, then the panel wipes upward to reveal the hero.
 * Shows once per session; skipped entirely for prefers-reduced-motion.
 */
const Preloader = ({ onDone }: PreloaderProps) => {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Lock scroll while the intro is on screen.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Count 0 → 100 over ~1.2s, then wipe out.
    const start = performance.now();
    const DUR = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / DUR, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true); // triggers exit animation
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: leaving ? 0.15 : 0 }}
      onAnimationComplete={() => {
        if (leaving) {
          document.body.style.overflow = "";
          onDone();
        }
      }}
    >
      <div className="preloader__inner">
        <div className="preloader__name-mask">
          <motion.span
            className="preloader__name gradient-text"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            VANSH
          </motion.span>
        </div>
        <motion.span
          className="preloader__role mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          FULL STACK · AI DEVELOPER
        </motion.span>
      </div>
      <span className="preloader__count mono">{String(count).padStart(3, "0")}</span>
      <span className="preloader__bar" style={{ transform: `scaleX(${count / 100})` }} />
    </motion.div>
  );
};

export default Preloader;
