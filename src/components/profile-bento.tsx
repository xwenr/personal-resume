import { motion, type HTMLMotionProps } from 'framer-motion'
import { ArrowUpRight, GraduationCap, Sparkles, Trophy } from 'lucide-react'

import { SectionHeading } from '@/components/ui/section-heading'
import { useTranslation } from '@/i18n/language-context'
import { cn } from '@/lib/utils'
import { fadeUp, HOVER_CARD, revealViewport, staggerContainer } from '@/lib/motion'

type BentoCardProps = HTMLMotionProps<'div'>

/**
 * Individual bento card.
 *
 * Reveal is driven by the PARENT grid's `staggerContainer`, NOT by each
 * card's own `whileInView`. This matters because:
 *
 *  1. A single stagger source produces a smooth cascade even if two cards
 *     happen to enter the viewport on the same frame (they'll still fire
 *     at the parent-defined 0.1s interval, not simultaneously).
 *  2. The parent knows the final layout order regardless of responsive
 *     column shuffling, so the cascade always reads top-left → bottom-right.
 *
 * Hover physics live on framer-motion's `whileHover` (transform channel);
 * shadow / background / border highlight live on CSS `.glass-hover` (see
 * index.css). Two engines, two channels, zero contention.
 */
function BentoCard({ className, children, ...props }: BentoCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={HOVER_CARD}
      className={cn(
        'liquid-glass glass-hover group relative flex flex-col overflow-hidden p-7',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function ProfileBento() {
  const { t } = useTranslation()
  const profile = t.profile

  return (
    <section id="profile" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={profile.eyebrow}
          title={
            <>
              {profile.titlePrefix}{' '}
              <em className="font-display italic text-muted-foreground">
                {profile.titleEmphasis}
              </em>
            </>
          }
          description={profile.description}
          className="mb-14"
        />

        {/* Grid is the stagger orchestrator. One `whileInView` on the parent
            drives every child via `variants`, replacing the previous
            pattern of each card self-triggering with a hand-picked delay.
            `delayChildren: 0.15` buys just enough time after viewport entry
            for the user's eye to arrive, THEN the cascade starts. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={staggerContainer(0.1, 0.15)}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[minmax(14rem,auto)] lg:grid-cols-4"
        >
          {/* Card 1 — Education.
              Modern resume layout:
                Row 1  University name (anchor)  ·  985 / 双一流 badges
                sub    department (subtle attachment)
                Row 2  Degree | Date | Location  (single compressed line)
                (opt)  Achievements line — GPA / Top 25% for undergrad
                label  "核心课程"        → flex-wrap list with • separator
                label  "荣誉"           → honours paragraph
              Horizontal divider between Master / Bachelor with py-6 padding. */}
          <BentoCard className="md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.25em]">
                {profile.education.eyebrow}
              </span>
            </div>
            <div className="mt-6 flex flex-col">
              {profile.education.items.map((item, i) => (
                <div
                  key={`${item.school}-${item.period}`}
                  className={cn(
                    'flex min-w-0 flex-col',
                    i > 0 && 'mt-6 border-t border-foreground/10 pt-6',
                  )}
                >
                  {/* Row 1 — primary anchor: school + badges */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 flex-1 text-xl font-semibold tracking-tight text-foreground">
                      {item.school}
                    </h3>
                    <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
                      {item.badges.map((badge) => (
                        <span
                          key={badge}
                          className="rounded-md bg-foreground/5 px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Department — small attachment under the school */}
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.department}
                  </p>

                  {/* Row 2 — degree · date · location, compressed single line */}
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-muted-foreground">
                    <span>{item.degree}</span>
                    <span aria-hidden className="text-foreground/25">
                      |
                    </span>
                    <span>{item.period}</span>
                    <span aria-hidden className="text-foreground/25">
                      |
                    </span>
                    <span>{item.location}</span>
                  </div>

                  {/* Achievement line (undergrad): GPA · Top 25% */}
                  {item.achievements.length > 0 && (
                    <p className="mt-4 text-sm font-medium text-foreground">
                      {item.achievements.join(' · ')}
                    </p>
                  )}

                  {/* Coursework */}
                  <span className="mt-4 mb-1 block text-xs font-bold text-foreground">
                    {profile.education.coursesLabel}
                  </span>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-relaxed text-muted-foreground">
                    {item.courses.map((course, idx) => (
                      <span
                        key={course}
                        className="flex items-center gap-2"
                      >
                        {idx > 0 && (
                          <span
                            aria-hidden
                            className="text-foreground/25"
                          >
                            •
                          </span>
                        )}
                        <span>{course}</span>
                      </span>
                    ))}
                  </div>

                  {/* Honours */}
                  {item.honors && (
                    <>
                      <span className="mt-4 mb-1 block text-xs font-bold text-foreground">
                        {profile.education.honorsLabel}
                      </span>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.honors}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Card 2 — Core Skills: 1:1 cover + eyebrow + inline category + tags */}
          <BentoCard className="md:row-span-2 lg:col-span-2 lg:row-span-2">
            <div className="mx-auto w-[70%] max-w-[17rem] aspect-square rounded-xl overflow-hidden mb-2.5">
              <img
                src={profile.skills.coverSrc}
                alt={profile.skills.coverAlt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex items-center gap-3 text-muted-foreground mt-0.5">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.25em]">
                {profile.skills.eyebrow}
              </span>
            </div>
            <div className="mt-3 flex flex-col">
              {profile.skills.categories.map((cat, i) => (
                <div
                  key={cat.name}
                  className={cn(
                    'flex min-w-0 items-start gap-x-2',
                    i === 0 ? 'mt-0' : 'mt-3',
                  )}
                >
                  <span className="shrink-0 pt-1.5 text-left text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    {cat.name}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-wrap items-start justify-start gap-2">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-foreground/12 bg-foreground/[0.04] px-3 py-1.5 text-xs font-medium text-foreground/85 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-foreground/[0.08] hover:text-foreground hover:shadow-[0_6px_18px_rgba(58,46,42,0.08)] cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {profile.skills.footnote}
            </p>
          </BentoCard>

          {/* Card 3 — Awards (full-width, vertical list) */}
          <BentoCard className="md:col-span-3 md:row-span-2 lg:col-span-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Trophy className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.25em]">
                {profile.awards.eyebrow}
              </span>
            </div>
            <ul className="mt-6 flex flex-1 flex-col divide-y divide-foreground/10">
              {profile.awards.items.map((award) => (
                // `group/award` scopes hover state to a single row so
                // ANY hover on the row (not just on the pill) brightens
                // the "查看详情" affordance — strong visual cue that
                // the whole entry is actionable.
                <li
                  key={`${award.title}-${award.year}`}
                  className="group/award flex flex-1 items-start justify-between gap-6 py-5 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    {/* Header row — competition title sits shoulder-to-
                        shoulder with the rank badge, so the proof-of-
                        capability is read IMMEDIATELY after the event
                        name instead of hiding as muted sub-text.
                        `flex-wrap` lets the badge drop to a new line
                        only on very narrow titles; `gap-y-2` preserves
                        rhythm when that happens. */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="text-base font-medium leading-snug text-foreground md:text-lg">
                        {award.title}
                      </span>
                      {award.rank && (
                        // Editorial chip — square-ish radius + visible
                        // border + semibold foreground text make it
                        // read as a "premium label", not a tag soup
                        // bubble. Uses the project's warm-paper palette
                        // (`foreground/*` tokens) instead of literal
                        // black so it harmonises with the surrounding
                        // beige glass cards.
                        <span className="inline-flex items-center rounded-md border border-foreground/15 bg-foreground/[0.06] px-2.5 py-0.5 text-xs font-semibold tracking-[0.01em] text-foreground">
                          {award.rank}
                        </span>
                      )}
                    </div>
                    {award.description && (
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                        {award.description}
                      </p>
                    )}
                  </div>

                  {/* Right-hand stack: year as a typographic anchor,
                      then an explicit "View details →" pill so first-
                      time visitors can see at a glance that each entry
                      links out to a deeper write-up. */}
                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <span className="font-display text-2xl leading-none tracking-tight text-foreground/80 md:text-3xl">
                      {award.year}
                    </span>
                    {award.link && (
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${award.title} — ${profile.awards.viewDetailLabel}`}
                        className={cn(
                          'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full',
                          'border border-foreground/25 bg-foreground/[0.03]',
                          'px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/85',
                          'transition-all duration-300 ease-out',
                          // Direct hover on the pill — full contrast invert
                          'hover:border-foreground hover:bg-foreground hover:text-background',
                          // Row-level hover — subtle lift so the pill
                          // "wakes up" before the cursor even reaches it
                          'group-hover/award:border-foreground/55 group-hover/award:bg-foreground/10 group-hover/award:text-foreground',
                        )}
                      >
                        {profile.awards.viewDetailLabel}
                        <ArrowUpRight
                          className="h-3 w-3 transition-transform duration-300 ease-out group-hover/award:-translate-y-0.5 group-hover/award:translate-x-0.5"
                          strokeWidth={1.8}
                        />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  )
}
