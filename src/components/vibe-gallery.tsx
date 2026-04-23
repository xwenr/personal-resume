import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

type VibeItem = {
  title: string
  subtitle: string
  tag: string
  accent: string
}

const VIBE_ITEMS: VibeItem[] = [
  {
    title: 'Digital Travel Footprint',
    subtitle: 'A generative memory atlas stitched from geo-tagged moments.',
    tag: 'Vibe Coding',
    accent: 'from-amber-300/40 to-orange-200/20',
  },
  {
    title: 'Latent Reading Room',
    subtitle: 'An AI-curated library UI that learns your reading vibe.',
    tag: 'Prototype',
    accent: 'from-stone-300/50 to-neutral-200/20',
  },
  {
    title: 'Prompt Garden',
    subtitle: 'A card-based playground for iterative prompt design.',
    tag: 'Vibe Coding',
    accent: 'from-lime-300/35 to-amber-200/20',
  },
  {
    title: 'Micro Essays',
    subtitle: 'Tiny literary interfaces for tiny daily observations.',
    tag: 'Side Project',
    accent: 'from-rose-300/40 to-amber-200/20',
  },
  {
    title: 'Soft Metrics',
    subtitle: 'Humane dashboards that emphasise curiosity over alarm.',
    tag: 'Concept',
    accent: 'from-orange-200/45 to-yellow-100/20',
  },
  {
    title: 'Quiet Rituals',
    subtitle: 'A minimalist companion for focus, rest and reflection.',
    tag: 'Vibe Coding',
    accent: 'from-stone-400/35 to-stone-200/20',
  },
]

export function VibeGallery() {
  const trackRef = useRef<HTMLDivElement>(null)

  // Scroll progress of the outer section controls horizontal translation.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  // The track is ~2× viewport wide; we translate -60% across its progress.
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-60%'])

  return (
    <section
      id="vibe"
      ref={trackRef}
      className="relative w-full overflow-x-hidden"
      style={{ height: '220vh' }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center">
        <div className="mx-auto mb-12 w-full max-w-7xl px-6">
          <SectionHeading
            eyebrow="03 — Vibe Coding"
            title={
              <>
                Side-projects built for{' '}
                <em className="font-display italic text-muted-foreground">
                  the feel of it.
                </em>
              </>
            }
            description="Quick prototypes, weekend experiments and unplanned detours — the kind of work that happens when curiosity gets a free afternoon."
            className="max-w-3xl"
          />
        </div>

        <motion.div
          style={{ x }}
          className="flex items-center gap-6 px-6 will-change-transform"
        >
          {VIBE_ITEMS.map((item, idx) => (
            <Polaroid key={item.title} item={item} index={idx} />
          ))}
        </motion.div>

        <div className="mx-auto mt-10 flex w-full max-w-7xl items-center justify-between px-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span>Scroll to reveal →</span>
          <span>
            {String(VIBE_ITEMS.length).padStart(2, '0')} prototypes
          </span>
        </div>
      </div>
    </section>
  )
}

function Polaroid({ item, index }: { item: VibeItem; index: number }) {
  const tilt = index % 2 === 0 ? -1.5 : 1.5
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: tilt * 0.4 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
      className="liquid-glass group relative flex h-[64vh] min-h-[480px] w-[320px] shrink-0 flex-col overflow-hidden p-5 sm:w-[380px] md:w-[440px]"
    >
      <div
        aria-hidden
        className={cn(
          'relative flex-1 overflow-hidden rounded-[0.75rem] bg-gradient-to-br',
          item.accent,
        )}
      >
        <PolaroidMock index={index} />
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline" className="text-[10px]">
              {item.tag}
            </Badge>
          </div>
          <h3 className="truncate font-display text-2xl tracking-tight text-foreground">
            {item.title}
          </h3>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">
            {item.subtitle}
          </p>
        </div>
        <span className="font-display text-2xl tracking-tight text-foreground/60">
          0{index + 1}
        </span>
      </div>
    </motion.article>
  )
}

function PolaroidMock({ index }: { index: number }) {
  const style = index % 3
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 opacity-70">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <radialGradient id={`rg-${index}`} cx="30%" cy="30%" r="80%">
              <stop offset="0%" stopColor="rgba(58,46,42,0.0)" />
              <stop offset="100%" stopColor="rgba(58,46,42,0.12)" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill={`url(#rg-${index})`} />
        </svg>
      </div>

      {style === 0 ? (
        <div className="absolute inset-5 rounded-xl border border-foreground/15 bg-background/70 p-4">
          <div className="mb-3 flex gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-3/4 rounded-full bg-foreground/55" />
            <div className="h-2 w-2/3 rounded-full bg-foreground/30" />
            <div className="h-2 w-1/2 rounded-full bg-foreground/20" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-md border border-foreground/10 bg-gradient-to-br from-foreground/25 to-foreground/5"
              />
            ))}
          </div>
        </div>
      ) : null}

      {style === 1 ? (
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id={`ln-${index}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(58,46,42,0)" />
              <stop offset="50%" stopColor="rgba(58,46,42,0.6)" />
              <stop offset="100%" stopColor="rgba(58,46,42,0)" />
            </linearGradient>
          </defs>
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M0 ${40 + i * 18} Q 50 ${20 + i * 18}, 100 ${45 + i * 15} T 200 ${
                30 + i * 16
              }`}
              stroke={`url(#ln-${index})`}
              strokeWidth="1"
              fill="none"
              opacity={0.25 + (i % 4) * 0.12}
            />
          ))}
        </svg>
      ) : null}

      {style === 2 ? (
        <div className="absolute inset-5 flex flex-col justify-end">
          <div className="mb-4 grid grid-cols-5 items-end gap-1.5">
            {[20, 55, 35, 80, 48, 70, 40, 62, 30, 88].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}px` }}
                className="w-full rounded-t-md bg-gradient-to-t from-foreground/50 to-foreground/10"
              />
            ))}
          </div>
          <div className="h-px w-full bg-foreground/20" />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Weekly
            </span>
            <span className="font-display text-xl tracking-tight text-foreground">
              +128%
            </span>
          </div>
        </div>
      ) : null}
    </div>
  )
}
