import { memo, useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

const GLARE = 440;

/**
 * 3D hover-tilt card with a cursor-tracking glare highlight.
 *
 * Perf: the rect is cached on pointer-enter (no getBoundingClientRect per
 * move), and the glare is a fixed-size gradient element moved with a
 * translate3d transform — GPU-composited instead of repainting a
 * background-position every frame.
 */
const TiltCard = ({ children, className = "", max = 8 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef({ left: 0, top: 0, width: 1, height: 1 });

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
  });

  // Translate the glare circle so its center tracks the cursor (transform only)
  const glareX = useTransform(px, (v) => v * rect.current.width - GLARE / 2);
  const glareY = useTransform(py, (v) => v * rect.current.height - GLARE / 2);

  const cacheRect = () => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rect.current = { left: r.left, top: r.top, width: r.width, height: r.height };
  };

  const handleMove = (e: MouseEvent) => {
    const r = rect.current;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={cacheRect}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {children}
      <motion.span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: GLARE,
          height: GLARE,
          borderRadius: "50%",
          pointerEvents: "none",
          x: glareX,
          y: glareY,
          willChange: "transform",
          background:
            "radial-gradient(circle, rgba(120,150,255,0.14), transparent 60%)",
        }}
      />
    </motion.div>
  );
};

export default memo(TiltCard);
