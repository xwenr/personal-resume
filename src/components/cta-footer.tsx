import { Fragment, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'

import { MaskedText } from '@/components/ui/masked-text'
import { useTranslation } from '@/i18n/language-context'
import { EASE, PARALLAX_SLOW } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function CtaFooter() {
  const { t, lang } = useTranslation()
  const contact = t.contact
  const titleWords = contact.titleWords

  // Section-local scroll progress. Offset `['start end', 'end start']`
  // maps 0 → 1 across the ENTIRE window during which this section
  // occupies any part of the viewport (from the instant its top enters
  // the viewport bottom, to the instant its bottom leaves the viewport
  // top). Using the full visibility window instead of a tight
  // `start start → end end` is deliberate: CTA is the last section and
  // naturally sits partially offscreen at many scroll positions, so a
  // tight window would hold parallax clamped at 0 or 1 for long
  // stretches and kill the "liquid" feel.
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  // Background texture drifts slowly DOWN (0% → 20% of its own
  // height) as the user scrolls toward the section. The moving layer
  // is a soft leaf-shadow PNG; its concrete silhouette is what makes
  // the parallax actually readable as depth. See the `PARALLAX_*`
  // docstring in `lib/motion.ts` for the full rationale — short
  // version: without a visible motif anchoring the eye, any drift
  // under ~20% is imperceptible, and above that on flat content it
  // reads as jitter instead of depth.
  //
  // DELIBERATELY SINGLE-LAYER: the first pass also wrapped the
  // contact chips + info row in a foreground (negative-y) parallax
  // layer. That looked fine in isolation but clobbered each child's
  // own `whileInView` reveal — the parent wrapper's live drift
  // happens during the same frames the children are easing in, so
  // their ease-out curves get visibly muddied by the parent's linear
  // transform. Either layer works alone, but stacking fg + child
  // reveals in the same region doesn't, so we keep only the
  // background here.
  const yBg = useTransform(scrollYProgress, [0, 1], PARALLAX_SLOW)

  return (
    <section
      id="contact"
      ref={sectionRef}
      // Natural-height section — NO `min-h-screen` / `h-screen`. The
      // section hugs its content so the document ends immediately after
      // the copyright strip instead of padding the page with a screenful
      // of empty space.
      //
      // Vertical rhythm is controlled entirely by padding:
      //   • pt-32 md:pt-40   generous top padding gives the CTA room to
      //                      breathe after VibeGallery's sticky horizontal
      //                      track releases.
      //   • pb-10 md:pb-12   minimal bottom padding — scroll stops a
      //                      short, intentional beat below the footer.
      //
      // All flow children (eyebrow, headline, description, buttons,
      // info row, copyright strip) stay in normal document flow so the
      // section's height is exactly `padding + content`. The single
      // exception — the parallax background texture layer — is
      // `absolute + pointer-events-none + -z-10`, so it contributes
      // nothing to layout height, hit-testing, or tab order. The
      // section therefore still hugs its content and the document
      // ends cleanly below the copyright strip.
      className="relative z-20 flex w-full flex-col items-center bg-background px-6 pb-10 pt-32 text-center md:pb-12 md:pt-40"
    >
      {/* Background parallax TEXTURE layer.
          A soft leaf-shadow PNG anchored to the top of the section,
          drifting DOWN slowly as the user scrolls in. Anchors the
          section in perceived depth without competing with any
          reveal — this layer has NO `whileInView` / `variants` of
          its own, so `style.y` from the parallax hook owns the
          transform channel outright.

          WHY A TEXTURE, NOT A BLUR BLOB:
          The first pass used a `bg-foreground/[0.05] blur-3xl`
          light blob. Two problems: (1) at 5% opacity over a
          warm-paper background the blob produced zero perceptible
          depth cue — the parallax moved but nothing visibly moved,
          so scrolling still felt "flat"; (2) `blur-3xl` on a
          ~500px absolute layer forced the browser to re-rasterise
          a large blurred surface every frame while the parallax
          drifted, showing up as jank on mid-range hardware. A
          static PNG motif has zero per-frame paint cost (only the
          transform, which the compositor handles) AND gives the
          eye something concrete to anchor the parallax onto.

          WHY `mix-blend-multiply`:
          The PNG's warm-paper base colour is near-identical to
          the section's `bg-background` (hsl(45 38% 94%) ≈
          #F5F2E9) but PNG compression / colour-profile drift can
          shift it by a few LSBs. `multiply` collapses
          identical / near-identical colours onto themselves and
          only darkens where the actual shadow pixels live, so the
          texture fuses seamlessly into the section bg instead of
          showing a visible rectangle edge. `opacity-90` pulls the
          effect back by 10% — just enough to feel like a hint of
          atmosphere rather than a graphic element demanding
          attention.

          WHY THE TOP `mask-image` FADE:
          The PNG is a hard-edged rectangle, and the densest
          shadow pixels sit near its TOP (the leaves "enter" from
          above). Without a mask, the top edge of the image lands
          on the boundary between VibeGallery and CTA as a visible
          horizontal line — the shadow doesn't "arrive", it just
          switches on. A top-down `linear-gradient(transparent →
          black 18%)` mask fades the first 18% of the image
          vertically into full transparency, so the shadow
          organically emerges as the user scrolls into the
          section instead of being hard-clipped at a frame edge.
          18% is the sweet spot: shorter (10–12%) still shows a
          perceptible edge during the fade, longer (25%+) pushes
          the useful shadow content too far down into the
          headline area. `-webkit-mask-image` is kept alongside
          for Safari, which still requires the prefixed property
          in current releases.

          `-top-[6%]` tucks the layer slightly above the section
          so its 20% drift travel stays visually inside the
          section's upper half — the shadow sweeps across the
          headline region as the user scrolls in, never dropping
          into the contact rows below (where it would visually
          interfere with the chips). Combined with the top mask
          fade, the effective visual start of the shadow lands
          ~90–130px below the section top — a comfortable gap
          away from the VibeGallery handoff.

          `-z-10` (negative z-index) is load-bearing: W3C stacking
          order paints `positioned z-0` descendants ABOVE static
          descendants, so a naive `z-0` here would cover every
          headline / eyebrow / button. The section itself is a
          stacking context (`z-20` + `relative`) which contains
          the negative z-index inside — the texture paints above
          the section's own `bg-background` but below any normal-
          flow content. No sibling needs a matching z-index bump. */}
      <motion.div
        aria-hidden
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-x-0 -top-[6%] -z-10 overflow-hidden"
      >
        <img
          src="/textures/contact-shadow.png"
          alt=""
          loading="eager"
          decoding="async"
          className="block w-full mix-blend-multiply opacity-90 [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)]"
        />
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-10 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        {contact.eyebrow}
      </motion.span>

      {/* Headline — mask slide-up, aligned with the rest of the site's
          editorial headings (Hero, ExperienceSplit, ProfileBento).
          Each word lives inside its own `overflow-hidden` clipper so
          the glyph ink rises out of the baseline instead of flying in
          from empty space. An earlier pass on this section used a
          bespoke `y: 80 → 0` + `blur(12px) → 0` fly-in; it read fine
          in isolation but felt visually disconnected from every
          other big heading on the page (those all use the mask
          treatment), so the final beat of the page lost its
          typographic "family resemblance". Swapping to `<MaskedText>`
          restores the consistency — same clipper, same `maskRise`
          y:110% → 0 curve, same `MASK_STAGGER` cadence as Hero.

          The last word keeps its muted-foreground `<em>` treatment.
          `<MaskedText>`'s `buildUnits` leaves React elements intact as
          a single "slat" that rises as one block, so italic / colour
          styling survives untouched — same mechanism Hero uses for
          its `&` separator. */}
      <MaskedText
        as="h2"
        delay={0.1}
        className={cn(
          'max-w-6xl font-display leading-[0.95] tracking-tighter text-foreground',
          lang === 'zh'
            ? 'text-6xl md:text-8xl'
            : 'text-7xl md:text-9xl',
        )}
      >
        {titleWords.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            {i > 0 ? ' ' : null}
            {i === titleWords.length - 1 ? (
              <em className="not-italic text-muted-foreground">{word}</em>
            ) : lang === 'zh' ? (
              <span className="text-5xl md:text-7xl">{word}</span>
            ) : (
              word
            )}
          </Fragment>
        ))}
      </MaskedText>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        className="mt-10 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {contact.description}
      </motion.p>

      {/* Action chips + info row sit directly in the section's
          flex-col, each with its own `whileInView` reveal. An
          earlier pass wrapped them in a foreground parallax layer
          (`style.y` drifting negative with scroll) — it looked
          plausible but muddied the chips' own ease-out reveal curve
          because the parent's live transform was drifting during
          the same frames the children were settling. Rule of thumb
          in this codebase: parallax OR child reveal, not both, in
          the same region. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
        className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
      >
        <a
          href={`mailto:${contact.email}`}
          className="liquid-glass glass-hover inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-foreground"
        >
          <Mail className="h-4 w-4" />
          {contact.sendEmail}
        </a>
        <a
          href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
          className="liquid-glass glass-hover inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-foreground"
        >
          <Phone className="h-4 w-4" />
          {contact.phone}
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
        className="mt-8 flex flex-col items-center gap-1 text-xs uppercase tracking-[0.25em] text-muted-foreground sm:flex-row sm:gap-6"
      >
        <span className="inline-flex items-center gap-2">
          <span className="text-foreground/60">{contact.emailLabel}</span>
          <span className="text-foreground/90">{contact.email}</span>
        </span>
        <span className="hidden h-3 w-px bg-foreground/15 sm:inline-block" />
        <span className="inline-flex items-center gap-2">
          <span className="text-foreground/60">{contact.phoneLabel}</span>
          <span className="text-foreground/90">{contact.phone}</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: EASE, delay: 1 }}
        className="mt-20 flex w-full max-w-7xl flex-col items-center gap-3 border-t border-foreground/10 pt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:flex-row sm:justify-between"
      >
        <span>{contact.copyright}</span>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${contact.email}`}
            className="transition-colors hover:text-foreground"
          >
            {contact.social.email}
          </a>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
            className="transition-colors hover:text-foreground"
          >
            {contact.social.phone}
          </a>
        </div>
        <span>{contact.craftedWith}</span>
      </motion.div>
    </section>
  )
}
