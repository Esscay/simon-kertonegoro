/**
 * ─── STATS STRIP ──────────────────────────────────────────────────────────────
 * Shown between the hero and the timeline, counting up on scroll.
 * Edit freely - array order = display order.
 * ──────────────────────────────────────────────────────────────────────────────
 */

export type Stat = {
  /** the number to count up to */
  value: number;
  /** decimal places shown while counting (default 0) */
  decimals?: number;
  /** appended after the number, e.g. "+", "%" or " million" */
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 1.7, decimals: 1, suffix: " million", label: "Lines of Code" },
  { value: 7405, label: "Git Commits" },
  { value: 919, label: "API Endpoints" },
  { value: 813, label: "MCP Tools" },
];
