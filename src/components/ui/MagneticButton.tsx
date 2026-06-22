import { memo, useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  newTab?: boolean;
  strength?: number;
}

/**
 * Button/link that subtly pulls toward the cursor on hover,
 * then springs back on leave. Used for primary CTAs.
 */
const MagneticButton = ({
  children,
  href,
  onClick,
  className = "",
  newTab,
  strength = 0.4,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const center = useRef({ x: 0, y: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  // Cache the element center on enter so move handling does no layout reads.
  const cacheCenter = () => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    center.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  const handleMove = (e: MouseEvent) => {
    x.set((e.clientX - center.current.x) * strength);
    y.set((e.clientY - center.current.y) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const motionProps = {
    ref: ref as never,
    className: `btn ${className}`,
    style: { x: sx, y: sy },
    onMouseEnter: cacheCenter,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    whileTap: { scale: 0.96 },
  };

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} onClick={onClick} type="button">
      {children}
    </motion.button>
  );
};

export default memo(MagneticButton);
