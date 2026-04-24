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
            <div className="mt-6 flex flex-1 flex-col">
              {profile.education.items.map((item, i) => (
                <div
                  key={`${item.school}-${item.period}`}
                  className={cn(
                    'flex min-w-0 flex-1 flex-col',
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

          {/* Card 2 — Core Skills, categorised list */}
          <BentoCard className="md:row-span-2 lg:col-span-2 lg:row-span-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.25em]">
                {profile.skills.eyebrow}
              </span>
            </div>
            <h3 className="mt-5 font-display text-2xl leading-tight tracking-tight text-foreground md:text-3xl">
              {profile.skills.title}
            </h3>
            <div className="mt-6 flex flex-1 flex-col divide-y divide-foreground/10">
              {profile.skills.categories.map((cat, i) => (
                <div
                  key={cat.name}
                  className={cn(
                    'flex flex-col',
                    i === 0 ? 'pb-4' : i === profile.skills.categories.length - 1 ? 'pt-4' : 'py-4',
                  )}
                >
                  <h4 className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {cat.name}
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {cat.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-sm leading-relaxed text-foreground/90"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
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
                <li
                  key={`${award.title}-${award.year}`}
                  className="flex flex-1 items-start justify-between gap-6 py-5 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 flex-col">
                    <span className="text-base font-medium text-foreground md:text-lg">
                      {award.title}
                    </span>
                    {award.rank && (
                      <span className="mt-0.5 text-sm text-muted-foreground">
                        {award.rank}
                      </span>
                    )}
                    {award.description && (
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                        {award.description}
                      </p>
                    )}
                  </div>
                  {award.link ? (
                    <a
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex shrink-0 items-center gap-1.5 font-display text-2xl tracking-tight text-foreground/80 transition-colors hover:text-foreground md:text-3xl"
                    >
                      {award.year}
                      <ArrowUpRight className="h-4 w-4 opacity-60 transition-opacity group-hover/link:opacity-100" />
                    </a>
                  ) : (
                    <span className="shrink-0 font-display text-2xl tracking-tight text-foreground/80 md:text-3xl">
                      {award.year}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  )
}
