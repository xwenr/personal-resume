import { motion, type HTMLMotionProps } from 'framer-motion'
import { GraduationCap, Sparkles, Trophy } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

const SKILLS = [
  'Product Management',
  'AIGC Workflow',
  'Data Analysis · R / LASSO',
  'Prompt Engineering',
  'User Research',
  'Figma & Design Systems',
  'A/B Experimentation',
  'SQL · Python',
]

const AWARDS = [
  {
    year: '2024',
    title: 'National Statistical Modelling Contest',
    rank: 'First Prize',
  },
  {
    year: '2023',
    title: 'MathorCup Big Data Competition',
    rank: 'Second Prize',
  },
  {
    year: '2023',
    title: 'Interdisciplinary Contest in Modelling',
    rank: 'Honorable Mention',
  },
  {
    year: '2022',
    title: 'University Entrepreneurship Challenge',
    rank: 'Bronze Award',
  },
] as const

function AbstractChart() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 120"
      className="absolute inset-x-0 bottom-0 h-28 w-full opacity-70"
    >
      <defs>
        <linearGradient id="gradLine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(58,46,42,0.0)" />
          <stop offset="50%" stopColor="rgba(58,46,42,0.55)" />
          <stop offset="100%" stopColor="rgba(58,46,42,0.0)" />
        </linearGradient>
        <linearGradient id="gradFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(58,46,42,0.12)" />
          <stop offset="100%" stopColor="rgba(58,46,42,0)" />
        </linearGradient>
      </defs>
      <path
        d="M0 90 C 40 80, 60 50, 90 55 S 150 95, 180 60 S 240 20, 280 35 L 320 30 L 320 120 L 0 120 Z"
        fill="url(#gradFill)"
      />
      <path
        d="M0 90 C 40 80, 60 50, 90 55 S 150 95, 180 60 S 240 20, 280 35 L 320 30"
        stroke="url(#gradLine)"
        strokeWidth="1.2"
        fill="none"
      />
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={i}
          cx={20 + i * 25}
          cy={40 + ((i * 13) % 50)}
          r={1.4}
          fill="rgba(58,46,42,0.3)"
        />
      ))}
    </svg>
  )
}

type BentoCardProps = HTMLMotionProps<'div'> & {
  delay?: number
}

function BentoCard({ className, children, delay = 0, ...props }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
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
  return (
    <section id="profile" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="01 — Profile"
          title={
            <>
              A data-minded <em className="font-display italic text-muted-foreground">product thinker.</em>
            </>
          }
          description="Building at the intersection of statistics, AIGC and thoughtful user experience — curious about the details, rigorous about the decisions."
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[14rem] lg:grid-cols-4">
          {/* Card 1 — Education, spans 2 cols */}
          <BentoCard className="md:col-span-2 md:row-span-1" delay={0.05}>
            <div className="flex items-center gap-3 text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.25em]">Education</span>
            </div>
            <h3 className="mt-6 font-display text-3xl leading-tight tracking-tighter text-foreground md:text-4xl">
              Master in Applied Statistics
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              B.S. Financial Mathematics · Honors Thesis on LASSO regression
            </p>
            <AbstractChart />
          </BentoCard>

          {/* Card 2 — Core Skills, spans 2 rows */}
          <BentoCard
            className="md:row-span-2 lg:col-span-2 lg:row-span-2"
            delay={0.1}
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.25em]">Core Skills</span>
            </div>
            <h3 className="mt-6 font-display text-3xl leading-tight tracking-tighter text-foreground md:text-4xl">
              A polyglot toolkit for modern product work.
            </h3>
            <div className="mt-8 flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <Badge key={skill} variant="default" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="mt-auto pt-10 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              · Applied daily in shipping product
            </p>
          </BentoCard>

          {/* Card 3 — Awards */}
          <BentoCard className="md:col-span-1 lg:col-span-2" delay={0.15}>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Trophy className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.25em]">
                Competitions & Awards
              </span>
            </div>
            <ul className="mt-6 divide-y divide-foreground/10">
              {AWARDS.map((award) => (
                <li
                  key={award.title}
                  className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-foreground">{award.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {award.rank}
                    </span>
                  </div>
                  <span className="font-display text-xl tracking-tight text-foreground/80">
                    {award.year}
                  </span>
                </li>
              ))}
            </ul>
          </BentoCard>

          {/* Card 4 — Now */}
          <BentoCard className="md:col-span-3 lg:col-span-4" delay={0.2}>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600/80 animate-pulse" />
                  <span className="text-xs uppercase tracking-[0.25em]">Currently</span>
                </div>
                <p className="mt-4 max-w-3xl font-display text-2xl leading-snug tracking-tight text-foreground md:text-3xl">
                  Exploring the{' '}
                  <em className="not-italic text-muted-foreground">co-creative</em> space
                  between human intent and generative models — designing
                  prompt-first interfaces that feel quietly intelligent.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-8 text-left md:text-right">
                <Stat label="Projects" value="24" />
                <Stat label="Launches" value="11" />
                <Stat label="Citations" value="340+" />
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-4xl tracking-tight text-foreground">
        {value}
      </span>
      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
    </div>
  )
}
