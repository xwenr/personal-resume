import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { MaskedText } from '@/components/ui/masked-text'
import { MediaPlaceholder } from '@/components/ui/media-placeholder'
import { useTranslation } from '@/i18n/language-context'
import {
  DURATION,
  EASE,
  fadeUp,
  revealViewport,
} from '@/lib/motion'

/**
 * Section-local parallax range — bumped above the standard
 * `PARALLAX_SLOW` (0% → 20%) defined in `lib/motion.ts`.
 *
 * Why a custom range instead of just importing PARALLAX_SLOW:
 *   The about-bridge texture is this section's PRIMARY atmospheric
 *   anchor — there's no other moving element in the background, no
 *   competing parallax layer. CtaFooter / Hero use 20% because their
 *   textures are one motion among many. Here, a stronger drift makes
 *   the breathing motion read clearly without any other depth cue
 *   doing the work.
 *
 * Why 25% specifically:
 *   - 20%  → drift was visible but gentle, indistinguishable from
 *            scroll lag for users who scroll quickly. Did not earn
 *            its layer.
 *   - 25%  → ~+25% relative motion vs SLOW. The leaf-shadow pattern
 *            visibly "drifts" past the eye during normal scroll
 *            cadence without ever feeling like the texture is
 *            scrolling at a different speed than the section. The
 *            sweet spot in side-by-side review.
 *   - 28%  → also OK, slightly more dramatic, started to feel
 *            like the texture's drift was racing the scroll on
 *            short viewports. Backed off to 25% per user feedback.
 *   - 35%+ → reads as the texture detaching from the section's
 *            vertical rhythm, like a parallax bug. Don't.
 *
 * Bound to a local const (not promoted to `lib/motion`) because no
 * other section needs this exact range — promoting it to the shared
 * vocabulary would be premature generalisation.
 */
const ABOUT_PARALLAX: [string, string] = ['0%', '25%']

/**
 * `<AboutBridge />` — the editorial "breath" between Experience (02)
 * and Works (03).
 *
 * Why it exists:
 *   Experience and Works are both dense, reading-heavy sections —
 *   five internship write-ups + a horizontal gallery of projects.
 *   Slammed back-to-back they read as one long résumé dump and the
 *   voice of the site flattens. A single-screen transition block
 *   with one line of statement copy and one vibe-anchor image lets
 *   the eye rest, re-calibrates the tempo, and re-introduces the
 *   author as a person before the next dense block starts.
 *
 * Composition:
 *   - 2-column grid (12-col track): 5 image / 7 copy.
 *   - LEFT: a 4:3 `MediaPlaceholder` in a `liquid-glass` frame — will
 *     later hold an extremely restrained still (a corner of a room,
 *     a fragment of an instrument, or a portrait) that functions as
 *     the author's "vibe anchor".
 *   - RIGHT: a small uppercase eyebrow (`02½ — 关于我`) followed by a
 *     single display-size statement rendered through `<MaskedText>`
 *     so the copy rises word-by-word to match the other site
 *     headings. The statement is shorter than the hero's h1 and
 *     shorter than any SectionHeading description — the goal is
 *     ONE idea, not three.
 *
 * Tempo:
 *   `items-center` on the grid means the copy is vertically aligned
 *   to the image's midline, so the eye sweeps horizontally across
 *   a single editorial line rather than scanning top-to-bottom on
 *   both columns (the latter would make it feel like another
 *   Experience row).
 *
 * What is deliberately NOT here:
 *   - No SectionHeading. This block IS the heading; layering another
 *     eyebrow/title/description rig on top would reinstate the
 *     "résumé section" voice we're trying to escape.
 *   - No CTA, no navigation chip, no list. A bridge with affordances
 *     becomes a destination; we want the reader to land, read one
 *     line, and scroll on.
 *   - No `whileHover` on the image. The placeholder invites a click
 *     by framing; hover physics would prime the user to expect a
 *     lightbox, which we aren't building. When a real asset lands
 *     in here, revisit whether hover-lift makes sense.
 *
 * Reveal timing — everything keyed off `revealViewport` so the bridge
 * fires only as the section crosses the fold, matching the rest of
 * the site's scroll choreography.
 */
export function AboutBridge() {
  const { t } = useTranslation()
  const about = t.about

  // Section-local scroll progress: `['start end', 'end start']` maps
  // 0 → 1 across the full window during which this section is even
  // partially visible, so the texture drifts the entire time the
  // user scrolls past — a concrete shadow silhouette anchors
  // perceived depth, instead of the section reading as a flat beige
  // plate. See `lib/motion.ts` `PARALLAX_*` docstring and
  // `cta-footer.tsx` for the full rationale on why parallax without
  // an anchored motif produces no usable Z-axis cue. Drift range is
  // `ABOUT_PARALLAX` (0% → 25%, see local const above) — stronger
  // than the standard `PARALLAX_SLOW` because this texture is the
  // section's only atmospheric layer.
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const yBg = useTransform(scrollYProgress, [0, 1], ABOUT_PARALLAX)

  return (
    <section
      id="about"
      ref={sectionRef}
      // `z-10` (any non-auto z value) is load-bearing: it creates a
      // stacking context on the section so the `-z-10` texture layer
      // below paints ABOVE the section's own bg but BELOW every flow
      // descendant. Without the z value here, the negative-z layer
      // would punch through to the document bg and cover any content
      // painted before this section. Same trick CtaFooter uses with
      // `z-20`; mid-page sections only need `z-10`.
      className="relative z-10 px-6 py-24 md:py-32"
    >
      {/* Background parallax TEXTURE — `aboutme-shadow.png`.

          Visual goal mirrors CtaFooter: a soft warm shadow PNG
          drifts slowly down on scroll, `mix-blend-multiply` fuses
          its base colour into the surrounding paper-beige so only
          the shadow pixels actually darken (no visible rectangle),
          `loading="eager"` + `decoding="async"` keep the asset
          paintable the moment the section enters the viewport.

          STRUCTURAL DIFFERENCE vs CtaFooter — and why it matters:
          CtaFooter applies `style.y` to the WRAPPER and lets it
          overshoot the section bottom freely, because CtaFooter is
          the document's tail — there's nothing downstream. We can't
          do that here. about-bridge has VibeGallery directly below,
          and the section's default `overflow: visible` plus a
          ~22%-of-section-height wrapper drift (110% box × 20%
          PARALLAX_SLOW) will paint the wrapper's bottom edge —
          complete with its leaf-shadow content — onto VibeGallery's
          headline area as a visible "ghost" of the texture.

          So the parallax transform lives on the IMAGE, not on the
          wrapper:

          • Wrapper = static, anchored `-top-[28%] bottom-0`,
            `overflow-hidden`. This is a fixed clipping window that
            NEVER moves and NEVER bleeds out of the section's bottom
            edge. `-top-[28%]` lets the window bleed up generously
            (≈ 1/4 of section height) into ExperienceSplit so the
            texture reads as drifting in from above rather than
            starting at this section's top edge. `bottom-0` extends
            the window all the way to the section seam — the texture
            visibly reaches the bottom of the section, and the fade
            overlay below handles the colour blend into VibeGallery.
            (Earlier versions used `bottom-[5%]` to leave a buffer,
            but that left an obvious horizontal band of pure beige
            between the texture and the seam — read as "the texture
            stops short" rather than "the texture extends and
            dissolves". `bottom-0` plus the fade overlay gives the
            extension the user wanted.)

            Why we don't use a NEGATIVE bottom (e.g. `-bottom-[8%]`)
            to bleed past the seam: the wrapper would then paint
            into VibeGallery's territory, and inside that overshoot
            the PNG is still mid-mask (opaque) — it would re-create
            the "ghost" artefact we just fixed. `bottom-0` is the
            furthest we can push the lower edge while keeping the
            no-ghost guarantee absolute.

          • <motion.img> inside = the actual moving element.
            `style={{ y: yBg }}` (ABOUT_PARALLAX, 0% → 25%) translates
            the PNG from 0 to 25% of ITS OWN height inside the static
            window. Anything that travels past the wrapper's clipped
            edges is scissored by `overflow-hidden` and cannot reach
            VibeGallery — geometry guarantees no ghost.

          The mask gradient stays symmetric (`transparent 0%, black
          22%, black 76%, transparent 100%`) so both the top edge
          (against Experience) and the bottom edge (against the
          fade overlay below) feather out instead of cutting hard.
          The 22% / 24% fade segments are slightly wider than the
          earlier 18% / 20% — visibly softer feathering, no impact
          on the opaque mid-band's coverage.
          The bottom seam against VibeGallery itself is handled by
          the dedicated colour fade overlay further down — the mask
          alone can't be relied on there because the PNG often
          renders taller than the wrapper and its 80%-100% mask
          stops physically live below the wrapper's clipped edge.

          Knobs, in order of likelihood you'll want to touch them:
            1. PARALLAX intensity → swap `PARALLAX_SLOW` import.
            2. Bleed depths → `top` / `bottom` % on the wrapper.
            3. Fade softness → mask stops on the img.
          Do NOT crop or re-author the PNG; tuning the geometry is
          always cheaper than re-exporting an asset. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-[28%] bottom-0 -z-10 overflow-hidden"
      >
        <motion.img
          src="/textures/aboutme-shadow.png"
          alt=""
          loading="eager"
          decoding="async"
          style={{ y: yBg }}
          className="block w-full mix-blend-multiply opacity-90 [mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_76%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_76%,transparent_100%)]"
        />
      </div>

      {/* Bottom seam FADE — independent colour-fill overlay sitting in
          a dedicated layer below the grid content (`-z-[5]`) but above
          the texture wrapper (`-z-10`). It paints a vertical gradient
          from `transparent` down to `to-background` (the page's
          `#F5F2E9` warm-paper beige).

          Why this is needed on top of the PNG's own `mask-image` fade:
          the wrapper above is `overflow-hidden`, and `aboutme-shadow.png`
          rendered at `block w-full` is naturally taller than the wrapper
          box (which is height-constrained by `-top-[15%] bottom-[5%]`).
          That means the bottom 20% of the mask gradient
          (`black 80% → transparent 100%`) physically lives BELOW the
          wrapper's clipped edge — i.e. mask is doing nothing visible at
          the bottom, and the PNG terminates as a sharp horizontal cut.
          The eye reads that cut as a hard line where the textured
          beige meets the untextured beige of VibeGallery.

          This overlay sidesteps the geometry problem entirely: it's
          decoupled from the PNG's natural aspect, and its colour
          target is the EXACT same hex (`bg-background`) that
          VibeGallery sits on, so by the time the gradient reaches
          the section's bottom seam, the painted colour is identical
          to the colour just below the seam — the boundary becomes
          visually unobservable.

          Sizing: `h-56 md:h-80` (224 / 320 px). The original 160 /
          224 was just enough to mask the seam itself but didn't
          extend the fade meaningfully INTO the texture — the image
          terminated in fully-opaque shadow and only the last few
          pixels softened. Bumped to 224 / 320 so the gradient's
          top edge reaches WELL INSIDE the wrapper's clipped region
          (the wrapper now extends to `bottom-0`, i.e. all the way
          to the section seam; this overlay therefore overlays the
          last 224-320px of the texture itself, dissolving it from
          fully-painted shadow down to pure background as it
          approaches the seam). Effect: the texture visibly fades
          OUT inside the wrapper instead of getting cut at the
          edge — reads as the texture extending and dissolving,
          which was the user-reported missing piece. Anything above
          ~360px starts to eat into the figure / copy block above
          on shorter viewports; if you ever push it harder, watch
          the figure's bottom edge.

          `pointer-events-none` because this is purely decorative;
          we don't want it intercepting clicks on links / focus
          states inside the figure or copy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-56 bg-gradient-to-b from-transparent to-background md:h-80"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
        <motion.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="liquid-glass relative overflow-hidden md:col-span-5"
        >
          <MediaPlaceholder
            aspectRatio="4/3"
            label={about.placeholderLabel}
          />
        </motion.figure>

        <div className="md:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: DURATION.default, ease: EASE }}
            className="block text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            {about.eyebrow}
          </motion.span>

          {/*
            Subtitle sizing is DELIBERATELY one full step below a
            section heading — `text-lg md:text-xl lg:text-2xl`
            (18 / 20 / 24 px). The first iteration landed at
            3xl/4xl/5xl (up to 48px) and read as another H2, which
            collapsed this bridge back into looking like a section
            header and defeated the whole "breath" purpose.

            At 24 px the copy reads as an editorial subtitle — still
            text-foreground high-contrast so it lands as a
            statement, not body copy — but no longer competes with
            the real section headings that bracket it.

            `leading-snug` (1.375) replaces the earlier
            `leading-[1.15]`: a 1.15 line-height is tuned for
            display-size headlines where tight baselines amplify the
            slab; at subtitle size it just squeezes the ascenders.
            1.375 restores editorial breathing room without going
            all the way to paragraph (1.5) territory.
          */}
          <MaskedText
            as="h2"
            delay={0.1}
            className="mt-8 block text-pretty font-display text-lg leading-snug tracking-tight text-foreground md:text-xl lg:text-2xl"
          >
            {about.subtitle}
          </MaskedText>
        </div>
      </div>
    </section>
  )
}
