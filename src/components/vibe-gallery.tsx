import { useEffect, useRef, useState, type RefObject, type SVGProps } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Star } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/ui/section-heading'
import { resolveWorks, type ResolvedWork } from '@/data/works'
import { formatStars, languageColour, relativeTime } from '@/lib/github'
import { useTranslation } from '@/i18n/language-context'
import type { Locale } from '@/i18n/translations'
import { cn } from '@/lib/utils'
import { DURATION, EASE } from '@/lib/motion'

// `md+` uses DesktopWorks (wider padding / gap-8); below uses MobileWorks.
const DESKTOP_QUERY = '(min-width: 768px)'

/** Matches Tailwind `gap-6` on the narrow breakpoint row */
const MOBILE_CARD_GAP_PX = 24
/** Matches Tailwind `gap-8` on the desktop row */
const DESKTOP_CARD_GAP_PX = 32

function WorksCarouselArrows({
  scrollRef,
  cardGapPx,
  prevLabel,
  nextLabel,
}: {
  scrollRef: RefObject<HTMLDivElement | null>
  cardGapPx: number
  prevLabel: string
  nextLabel: string
}) {
  const step = (dir: -1 | 1) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('article')
    const w = card?.getBoundingClientRect().width ?? el.clientWidth * 0.85
    el.scrollBy({ left: dir * (w + cardGapPx), behavior: 'smooth' })
  }

  const btnClass =
    'liquid-glass glass-hover inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors'

  return (
    <div className="mt-3 flex items-center justify-end gap-2">
      <button
        type="button"
        aria-label={prevLabel}
        className={btnClass}
        onClick={() => step(-1)}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        className={btnClass}
        onClick={() => step(1)}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
      </button>
    </div>
  )
}

/**
 * Works gallery — desktop & mobile both use native `overflow-x-auto` +
 * snap (stable flow, no JS-driven section height).
 */
export function VibeGallery() {
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia(DESKTOP_QUERY)
    const sync = () => setIsDesktop(mql.matches)
    sync()
    mql.addEventListener('change', sync)
    return () => mql.removeEventListener('change', sync)
  }, [])

  return isDesktop ? <DesktopWorks /> : <MobileWorks />
}

function DesktopWorks() {
  const { t, lang } = useTranslation()
  const works = t.works
  const items = resolveWorks(lang)
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="works"
      className="relative z-30 w-full bg-background pb-12 pt-24 md:pb-16 md:pt-32"
    >
      <div className="mx-auto mb-8 w-full max-w-7xl px-8 md:px-20">
        <SectionHeading
          eyebrow={works.eyebrow}
          title={
            <>
              {works.titlePrefix}{' '}
              <em className="font-display italic text-muted-foreground">
                {works.titleEmphasis}
              </em>
            </>
          }
          description={works.description}
          className="max-w-3xl"
        />
        <WorksCarouselArrows
          scrollRef={scrollRef}
          cardGapPx={DESKTOP_CARD_GAP_PX}
          prevLabel={works.scrollPrev}
          nextLabel={works.scrollNext}
        />
      </div>

      <div
        ref={scrollRef}
        className={cn(
          'flex flex-nowrap snap-x snap-mandatory gap-8 overflow-x-auto overflow-y-hidden px-8 pb-12 md:px-20',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'scroll-px-8 md:scroll-px-20',
        )}
      >
        {items.map((item, idx) => (
          <Polaroid
            key={item.slug}
            item={item}
            index={idx}
            lang={lang}
            viewRepoLabel={works.viewRepo}
            viewLiveLabel={works.viewLive}
            updatedPrefix={works.updatedPrefix}
          />
        ))}
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-7xl items-center justify-between px-8 text-xs uppercase tracking-[0.3em] text-muted-foreground md:px-20">
        <span>{works.scrollHint}</span>
        <span>
          {String(items.length).padStart(2, '0')} {works.worksCountSuffix}
        </span>
      </div>
    </section>
  )
}

function MobileWorks() {
  const { t, lang } = useTranslation()
  const works = t.works
  const items = resolveWorks(lang)
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section id="works" className="relative w-full py-20">
      <div className="mx-auto mb-8 w-full max-w-7xl px-8">
        <SectionHeading
          eyebrow={works.eyebrow}
          title={
            <>
              {works.titlePrefix}{' '}
              <em className="font-display italic text-muted-foreground">
                {works.titleEmphasis}
              </em>
            </>
          }
          description={works.description}
          className="max-w-3xl"
        />
        <WorksCarouselArrows
          scrollRef={scrollRef}
          cardGapPx={MOBILE_CARD_GAP_PX}
          prevLabel={works.scrollPrev}
          nextLabel={works.scrollNext}
        />
      </div>

      <div
        ref={scrollRef}
        className={cn(
          'flex flex-nowrap snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden px-8 pb-12',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'scroll-px-8',
        )}
      >
        {items.map((item, idx) => (
          <Polaroid
            key={item.slug}
            item={item}
            index={idx}
            lang={lang}
            viewRepoLabel={works.viewRepo}
            viewLiveLabel={works.viewLive}
            updatedPrefix={works.updatedPrefix}
          />
        ))}
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-7xl items-center justify-between px-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <span>{works.scrollHint}</span>
        <span>
          {String(items.length).padStart(2, '0')}{' '}
          {works.worksCountSuffix}
        </span>
      </div>
    </section>
  )
}

function Polaroid({
  item,
  index,
  lang,
  viewRepoLabel,
  viewLiveLabel,
  updatedPrefix,
}: {
  item: ResolvedWork
  index: number
  lang: Locale
  viewRepoLabel: string
  viewLiveLabel: string
  updatedPrefix: string
}) {
  const tilt = index % 2 === 0 ? -1.5 : 1.5
  const { github, ctaUrl } = item
  const liveUrl = item.liveUrl
  const hasFootRow = Boolean(github) || Boolean(ctaUrl) || Boolean(liveUrl)

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: tilt * 0.4 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: DURATION.default, ease: EASE }}
      whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
      className="liquid-glass group relative flex w-[85vw] shrink-0 snap-start flex-col overflow-hidden p-5 sm:w-[400px] md:w-[480px] lg:w-[500px]"
    >
      {/* Hero area is locked to a 3:4 portrait so poster screenshots and
          the abstract PolaroidMock share the same aspect — cards line up
          cleanly regardless of whether a cover image is supplied. */}
      <div
        className={cn(
          'relative aspect-[3/4] overflow-hidden rounded-[0.75rem] bg-gradient-to-br',
          item.accent,
        )}
      >
        {item.cover ? (
          <img
            src={item.cover}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <PolaroidMock index={index} variant={item.mockVariant} />
        )}

        {github ? (
          <a
            href={github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.title} on GitHub`}
            title={github.fullName}
            className="liquid-glass glass-hover absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground"
          >
            <GithubMark className="h-3 w-3" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        ) : null}
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline" className="text-[10px]">
              {item.tag}
            </Badge>
            {item.meta ? (
              <span className="truncate text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {item.meta}
              </span>
            ) : null}
          </div>
          <h3 className="truncate font-display text-2xl tracking-tight text-foreground">
            {item.title}
          </h3>
          {item.subtitle ? (
            <p className="mt-1 line-clamp-3 text-sm leading-snug text-muted-foreground">
              {item.subtitle}
            </p>
          ) : null}
        </div>
        <span className="font-display text-2xl tracking-tight text-foreground/60">
          0{index + 1}
        </span>
      </div>

      {hasFootRow ? (
        <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-3 text-sm text-muted-foreground">
          <div className="flex min-w-0 items-center gap-3">
            {github?.language ? (
              <span className="flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: languageColour(github.language) }}
                />
                <span className="truncate">{github.language}</span>
              </span>
            ) : null}
            {github && github.stars > 0 ? (
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4" strokeWidth={1.6} />
                <span>{formatStars(github.stars)}</span>
              </span>
            ) : null}
            {github?.updatedAt ? (
              <span className="truncate">
                {updatedPrefix} {relativeTime(github.updatedAt, lang)}
              </span>
            ) : null}
          </div>

          <div className="ml-3 flex shrink-0 items-center gap-3">
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-foreground/85 transition-colors hover:text-foreground"
              >
                {viewLiveLabel}
                <ExternalLink
                  className="h-4 w-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                  strokeWidth={1.6}
                />
              </a>
            ) : null}
            {ctaUrl ? (
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-foreground/85 transition-colors hover:text-foreground"
              >
                {viewRepoLabel}
                <ExternalLink
                  className="h-4 w-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                  strokeWidth={1.6}
                />
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </motion.article>
  )
}

function GithubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
           0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
           -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
           2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
           0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82
           .64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82
           .44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95
           .29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01
           0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  )
}

function PolaroidMock({
  index,
  variant,
}: {
  index: number
  variant?: 0 | 1 | 2
}) {
  // `variant` takes precedence when set; otherwise fall back to the
  // position-based rotation. Using `??` (not `||`) so `variant === 0`
  // isn't mistakenly treated as "unset".
  const style = variant ?? index % 3
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
