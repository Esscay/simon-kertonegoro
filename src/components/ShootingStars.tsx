"use client";

import { useEffect, useRef } from "react";

/**
 * Shooting-star rain: thin luminous streaks with a bright head and fading
 * tail, all falling along the same gentle diagonal at different depths
 * (speed/length/brightness scale together). No dots, lines only.
 * One canvas + one rAF loop, paused off-screen; static frame under
 * prefers-reduced-motion.
 */
export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Shared direction: 16 degrees off vertical, shooting UP
    const ANGLE = (16 * Math.PI) / 180;
    const DIR_X = Math.sin(ANGLE);
    const DIR_Y = -Math.cos(ANGLE);

    // Colors come from the central theme (globals.css :root)
    const readRGB = (
      name: string,
      fallback: [number, number, number]
    ): [number, number, number] => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      const m = /^#([0-9a-f]{6})$/i.exec(v);
      if (!m) return fallback;
      const n = parseInt(m[1], 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };
    const cream = readRGB("--cream", [255, 241, 214]);
    const accent1 = readRGB("--accent-1", [248, 188, 88]);
    const accent2 = readRGB("--accent-2", [224, 129, 63]);
    // mostly warm starlight, occasional accent tint
    const COLORS: [number, number, number][] = [
      cream,
      cream,
      cream,
      accent1,
      accent2,
    ];

    type Streak = {
      x: number;
      y: number;
      speed: number;
      len: number;
      width: number;
      alpha: number;
      c: [number, number, number];
    };

    let streaks: Streak[] = [];
    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    let target = 14;

    const spawn = (anywhere = false): Streak => {
      const depth = Math.random(); // 0 far ... 1 near
      const speed = 2.5 + depth * 6.5;
      return {
        // extended bottom edge so the diagonal keeps the frame filled
        x: Math.random() * (w * 1.25) - w * 0.25,
        y: anywhere ? Math.random() * h : h + 20 + Math.random() * h * 0.3,
        speed,
        len: 50 + depth * 130,
        width: 0.8 + depth * 1.1,
        alpha: 0.25 + depth * 0.6,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      target = Math.max(8, Math.min(22, Math.round(w / 90)));
      streaks = Array.from({ length: target }, () => spawn(true));
    };

    const drawStreak = (s: Streak) => {
      const hx = s.x;
      const hy = s.y;
      const tx = hx - DIR_X * s.len;
      const ty = hy - DIR_Y * s.len;
      const [r, g, b] = s.c;

      // tail: transparent -> bright toward the head
      const grad = ctx.createLinearGradient(tx, ty, hx, hy);
      grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
      grad.addColorStop(0.75, `rgba(${r},${g},${b},${s.alpha * 0.35})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},${s.alpha})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.width;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.stroke();

      // hot head: short white-hot cap
      ctx.strokeStyle = `rgba(255,255,255,${Math.min(1, s.alpha + 0.25)})`;
      ctx.lineWidth = s.width + 0.4;
      ctx.beginPath();
      ctx.moveTo(hx - DIR_X * (s.width * 4), hy - DIR_Y * (s.width * 4));
      ctx.lineTo(hx, hy);
      ctx.stroke();
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      for (const s of streaks) {
        if (!reduced) {
          s.x += DIR_X * s.speed;
          s.y += DIR_Y * s.speed;
        }
        drawStreak(s);
      }

      if (!reduced) {
        // recycle streaks whose tail has fully left the frame
        streaks = streaks.map((s) =>
          s.y - DIR_Y * s.len < -10 || s.x - DIR_X * s.len > w + 10
            ? spawn()
            : s
        );
        while (streaks.length < target) streaks.push(spawn());
      }

      if (running && !reduced) raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running) return;
      running = true;
      if (reduced) {
        step(); // single static frame
      } else {
        raf = requestAnimationFrame(step);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
