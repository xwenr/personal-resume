import { motion } from 'framer-motion'

import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/ui/section-heading'

const EASE = [0.22, 1, 0.36, 1] as const

type Experience = {
  id: string
  role: string
  company: string
  period: string
  narrative: string
  highlights: string[]
  mock: React.ReactNode
}

const EXPERIENCES: Experience[] = [
  {
    id: 'aigc-pm',
    role: 'AIGC Product Manager · Intern',
    company: 'Stealth AI Studio',
    period: '2024 — 2025',
    narrative:
      'Designed end-to-end AIGC workflows for content creators — from ingesting raw intent to orchestrating multi-model pipelines, with careful evaluation loops baked into every step.',
    highlights: [
      'Shipped 3 workflow templates adopted by 1.2k beta creators',
      'Built a prompt evaluation rubric that lifted output quality +38%',
      'Collaborated with ML engineers on guardrail heuristics',
    ],
    mock: <AigcMock />,
  },
  {
    id: 'saas-mini',
    role: 'SaaS Mini-Program · Product Design',
    company: 'Independent contract',
    period: '2023 — 2024',
    narrative:
      'Redesigned the onboarding and checkout of a retail SaaS mini-program. Reworked the micro-copy to localise "16% OFF" into "立减 16%" — an intuition shift that moved weekly conversion by double digits, and removed the friction of re-authorising sessions between visits.',
    highlights: [
      'Micro-copy localisation: +14% conversion on cart page',
      'Seamless authorisation flow: halved drop-off at step 2',
      'Design tokens & components aligned with brand kit',
    ],
    mock: <SaaSMock />,
  },
] as const

export function ExperienceSplit() {
  return (
    <section
      id="experience"
      className="relative px-6 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">
        {/* LEFT — sticky narrative */}
        <div>
          <div className="md:sticky md:top-32">
            <SectionHeading
              eyebrow="02 — Experience"
              title={
                <>
                  Internships,{' '}
                  <em className="font-display italic text-muted-foreground">
                    projects
                  </em>{' '}
                  & shipped work.
                </>
              }
              description="A selection of work that sits between product strategy, data decisions and carefully-crafted interfaces."
              className="mb-12"
            />

            <div className="space-y-10">
              {EXPERIENCES.map((exp, i) => (
                <motion.article
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
                  className="relative border-l border-foreground/10 pl-6"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <Badge variant="muted">{exp.period}</Badge>
                    <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      {exp.company}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
                    {exp.role}
                  </h3>
                  <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                    {exp.narrative}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-[9px] h-[3px] w-4 shrink-0 bg-foreground/30"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — scrolling visuals */}
        <div className="flex flex-col gap-6">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={`mock-${exp.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.05 }}
              className="liquid-glass glass-hover relative aspect-[4/5] w-full overflow-hidden p-6"
            >
              <div className="flex items-start justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span>{exp.company}</span>
                <span>0{i + 1}</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-6">
                {exp.mock}
              </div>
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                <p className="font-display text-2xl leading-tight tracking-tight text-foreground">
                  {exp.role.split(' · ')[0]}
                </p>
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {exp.period}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AigcMock() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-6 right-6 top-1/4 rounded-xl border border-foreground/10 bg-background/60 p-5 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600/80" />
          prompt
        </div>
        <p className="font-display text-lg leading-snug tracking-tight text-foreground">
          "A cinematic editorial cover for a product launch — quiet, confident,
          with a warm monochrome palette."
        </p>
      </div>

      <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2">
        {[0.35, 0.62, 0.88].map((w, idx) => (
          <div
            key={idx}
            className="h-16 overflow-hidden rounded-lg border border-foreground/10 bg-background/50"
          >
            <div
              style={{ width: `${w * 100}%` }}
              className="mt-5 ml-3 h-1.5 rounded-full bg-gradient-to-r from-foreground/60 to-foreground/15"
            />
            <div
              style={{ width: `${w * 70}%` }}
              className="mt-3 ml-3 h-1 rounded-full bg-foreground/20"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function SaaSMock() {
  return (
    <div className="relative mx-auto flex h-full w-[78%] max-w-sm flex-col items-stretch">
      <div className="flex-1 rounded-3xl border border-foreground/10 bg-background/70 p-5 shadow-inner">
        <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>Cart</span>
          <span>Step 2 / 3</span>
        </div>
        <div className="space-y-3">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-3"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-foreground/25 to-foreground/5" />
              <div className="flex-1">
                <div className="mb-1.5 h-2 w-24 rounded bg-foreground/50" />
                <div className="h-2 w-16 rounded bg-foreground/20" />
              </div>
              <div className="text-xs font-medium text-foreground">
                ¥{198 + i * 80}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-700/25 bg-emerald-700/[0.08] p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium text-emerald-800">立减 16%</span>
            <span className="text-foreground/80">已自动抵扣</span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
            <div className="h-full w-[64%] rounded-full bg-emerald-700/70" />
          </div>
        </div>

        <button
          type="button"
          className="mt-5 w-full rounded-full bg-foreground py-2.5 text-xs font-medium text-background"
        >
          一键授权并结算
        </button>
      </div>
    </div>
  )
}
