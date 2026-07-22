/**
 * Site-wide living background: slowly drifting aurora blobs in the brand
 * colors, fixed behind all content. Pure CSS animation (transforms only),
 * GPU-cheap. Keyframes live in globals.css.
 */
export default function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-deep"
    >
      <div className="aurora-blob aurora-1 bg-marble/40" />
      <div className="aurora-blob aurora-2 bg-neon-pink/[0.07]" />
      <div className="aurora-blob aurora-3 bg-neon-cyan/[0.07]" />
      <div className="aurora-blob aurora-4 bg-royal/50" />
    </div>
  );
}
