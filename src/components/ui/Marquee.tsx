import { memo } from "react";
import "../styles/Marquee.css";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  /** seconds for one full loop — larger = slower */
  duration?: number;
}

/**
 * Kinetic infinite marquee banner (landonorris.com-style).
 * Two identical tracks translate -100% for a seamless GPU loop.
 * Pauses on hover and freezes for prefers-reduced-motion (CSS).
 */
const Track = ({ items }: { items: string[] }) => (
  <div className="marquee__track" aria-hidden="true">
    {items.map((t, i) => (
      <span className="marquee__item" key={i}>
        {t}
        <span className="marquee__sep">✦</span>
      </span>
    ))}
  </div>
);

const Marquee = ({ items, reverse = false, duration = 28 }: MarqueeProps) => {
  return (
    <div
      className={`marquee ${reverse ? "marquee--reverse" : ""}`}
      style={{ ["--marquee-dur" as string]: `${duration}s` }}
      role="presentation"
    >
      <Track items={items} />
      <Track items={items} />
    </div>
  );
};

export default memo(Marquee);
