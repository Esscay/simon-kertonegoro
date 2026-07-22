/**
 * ─── STATS STRIP ──────────────────────────────────────────────────────────────
 * Shown between the hero and the timeline, counting up on scroll.
 * Edit freely - array order = display order.
 * ──────────────────────────────────────────────────────────────────────────────
 */

export type Stat = {
  /** the number to count up to */
  value: number;
  /** appended after the number, e.g. "+" or "%" */
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 1, label: "Developer" },
  { value: 107, label: "AI tools shipped" },
  { value: 2, label: "Companies founded" },
  { value: 100, suffix: "%", label: "Built in-house" },
];
