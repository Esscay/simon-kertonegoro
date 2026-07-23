# simonkertonegoro.com

Personal portfolio. Next.js (App Router) + Tailwind v4 + framer-motion, deployed on Vercel.

## The hero

Two perfectly-aligned 2752x1536 layers in `public/`:

- `simon-bg-fade.webp` (bottom, static): Simon with the room feathering into transparency, so the page background shows through.
- `hero-group.webp` (top): the original party photo, fading out over the first ~600px of scroll.

Because Simon occupies the same pixels in both frames, the party dissolves around him while he stays put. `src/components/Hero.tsx` owns the fade ranges.

Other assets: `hero-original.jpg` (untouched source photo), `hero-stylized.webp` (neon portrait, currently the Open Graph share image).

## Editing the timeline

All timeline content lives in **`src/data/projects.ts`**. It is the only file you need to touch:

- **Add a project:** copy any entry in the `projects` array, edit the fields.
- **Reorder:** move entries up or down. Array order = page order.
- **Expandable details:** give an entry `highlights: [...]` and the card gets a `+` that expands on click.
- **Per-entry accent color:** set `accent: "#4fd8ff"` (defaults to neon pink).

## Theming

Every color on the site comes from the `:root` theme block at the top of
`src/app/globals.css` - backgrounds, accents, text, glows, CSS effects, and
even the canvas shooting stars (which read the variables at runtime). Edit
that one block to retheme everything. Alpha variants are derived there via
`color-mix`, so no component carries hardcoded rgba values.

Current palette: deep navy world, warm luminous highlights (gold `--accent-1`,
copper `--accent-2`, cream `--cream`).

## Develop

```bash
npm run dev    # http://localhost:3000
npm run build  # production build (what Vercel runs)
```
