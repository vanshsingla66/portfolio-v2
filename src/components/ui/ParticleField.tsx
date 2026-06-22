import { memo, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Lightweight canvas "AI neural" particle field — drifting nodes
 * connected by fading lines, with a soft cursor attractor.
 *
 * Performance notes:
 *  - Capped to ~30 FPS (slow-drifting nodes look identical, but the glass
 *    panels layered above only have to re-blur half as often).
 *  - Pointer position is read from cached client coords, never via a
 *    per-mousemove getBoundingClientRect (that caused forced reflows).
 *  - Pauses entirely when offscreen (IntersectionObserver) or when the
 *    tab is hidden (visibilitychange).
 *  - DPR capped at 1.5 and particle count trimmed on small screens.
 */
const ParticleField = ({ density = 0.00009 }: { density?: number }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // ~30 FPS is plenty for slow-drifting particles and roughly halves the
    // backdrop-filter re-blur work for any glass sitting above the canvas.
    const interval = 1000 / 30;

    const MAX_LINK = 120;
    const MAX_LINK_SQ = MAX_LINK * MAX_LINK;
    const MAX_PULL = 160;
    const MAX_PULL_SQ = MAX_PULL * MAX_PULL;

    let particles: Particle[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;
    let inView = true;
    let pageVisible = !document.hidden;
    let running = false;
    let last = -Infinity;

    // Cached canvas viewport offset + raw pointer coords (no per-move layout reads)
    let rectLeft = 0;
    let rectTop = 0;
    let pointerX = -9999;
    let pointerY = -9999;

    const updateRect = () => {
      const r = canvas.getBoundingClientRect();
      rectLeft = r.left;
      rectTop = r.top;
    };

    const resize = () => {
      const parent = canvas.parentElement!.getBoundingClientRect();
      w = parent.width;
      h = parent.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateRect();

      const cap = isSmall ? 46 : 90;
      const count = Math.min(cap, Math.max(24, Math.floor(w * h * density)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      const mx = pointerX - rectLeft;
      const my = pointerY - rectTop;

      ctx.fillStyle = "rgba(150,175,255,0.55)";
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // gentle cursor attraction (squared check first — skips sqrt when far)
        const dx = mx - p.x;
        const dy = my - p.y;
        const dd = dx * dx + dy * dy;
        if (dd < MAX_PULL_SQ) {
          const dist = Math.sqrt(dd);
          const f = 0.0006 * (MAX_PULL - dist) * 0.1;
          p.x += dx * f;
          p.y += dy * f;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // connections — squared-distance cull avoids sqrt for the many far pairs
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < MAX_LINK_SQ) {
            const d = Math.sqrt(d2);
            ctx.strokeStyle = `rgba(110,140,255,${0.14 * (1 - d / MAX_LINK)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const frame = (now: number) => {
      if (!inView || !pageVisible || reduce) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
      if (now - last < interval) return;
      last = now;
      render();
    };

    const start = () => {
      if (running || reduce || !inView || !pageVisible) return;
      running = true;
      last = -Infinity;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };
    const onLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
    };
    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    if (reduce) {
      requestAnimationFrame(render); // single static frame
    } else {
      start();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        transform: "translateZ(0)",
      }}
    />
  );
};

export default memo(ParticleField);
