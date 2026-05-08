import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/ui/section-heading'
import { useTranslation } from '@/i18n/language-context'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*  Constants & Geometry for the 3D Ring                                      */
/* -------------------------------------------------------------------------- */

// Cards match the 3:4 portrait aspect ratio of the source photos.
const FACE_WIDTH = 240
const FACE_HEIGHT = 320
const TOTAL_FACES = 5
const ANGLE_STEP = 360 / TOTAL_FACES
const RADIUS = 240 

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */

export function ExperienceSphere() {
  const { t } = useTranslation()
  const exp = t.experience
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isInteracting, setIsInteracting] = useState(false)
  
  const rotateY = useMotionValue(0)
  const springY = useSpring(rotateY, { stiffness: 45, damping: 25 })

  useEffect(() => {
    let lastTime = 0
    const animate = (time: number) => {
      if (!isInteracting) {
        const delta = time - lastTime
        if (lastTime !== 0) {
          rotateY.set(rotateY.get() - delta * 0.005) 
        }
      }
      lastTime = time
      requestAnimationFrame(animate)
    }
    const raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [isInteracting, rotateY])

  const handleSwitch = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const activeItem = exp.items[activeIndex]

  return (
    <section id="experience" className="relative min-h-screen overflow-hidden bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={exp.eyebrow}
          title={
            <>
              {exp.titlePrefix}{' '}
              <em className="font-display italic text-muted-foreground">
                {exp.titleEmphasis}
              </em>
              {exp.titleSuffix}
            </>
          }
          description={exp.description}
          className="mb-20 max-w-3xl"
        />

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-24">
          
          {/* LEFT: The 3D Device */}
          <div className="relative flex h-[450px] items-center justify-center lg:col-span-5 lg:sticky lg:top-40 lg:h-[500px]">
            <div className="relative" style={{ perspective: '2000px' }}>
              <motion.div
                onPanStart={() => setIsInteracting(true)}
                onPanEnd={() => setIsInteracting(false)}
                onPan={(_, info) => {
                  rotateY.set(rotateY.get() + info.delta.x * 0.4)
                }}
                style={{
                  rotateY: springY,
                  transformStyle: 'preserve-3d',
                  width: FACE_WIDTH,
                  height: FACE_HEIGHT,
                }}
                className="relative cursor-grab active:cursor-grabbing select-none"
              >
                {exp.items.slice(0, 5).map((item, i) => (
                  <div
                    key={item.id}
                    style={{ 
                      transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${RADIUS}px)`,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      width: FACE_WIDTH,
                      height: FACE_HEIGHT,
                      willChange: 'transform',
                    }}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center rounded-[2rem] border transition-colors duration-500 shadow-2xl overflow-hidden",
                      activeIndex === i ? "border-foreground/20" : "border-foreground/5"
                    )}
                    onClick={() => handleSwitch(i)}
                  >
                    <img 
                      src={`/photo/intern/${i + 1}.png`} 
                      alt={item.company}
                      loading="eager"
                      decoding="async"
                      fetchPriority={i === activeIndex ? 'high' : 'low'}
                      draggable={false}
                      className={cn(
                        "h-full w-full object-cover transition-[filter] duration-700",
                        activeIndex === i ? "" : "grayscale-[0.55]"
                      )}
                    />
                    
                    {/* Overlay number for context */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className={cn(
                        "font-display text-9xl transition-colors duration-500 select-none",
                        activeIndex === i ? "text-white/10" : "text-white/5"
                      )}>
                        0{i + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="absolute bottom-0 h-6 w-48 bg-foreground/[0.02] blur-2xl rounded-[100%] [transform:rotateX(85deg)]" />
          </div>

          {/* RIGHT: Original Narrative Layout + Bottom Numbers */}
          <div className="relative flex flex-col lg:col-span-7">
            
            {/* Detail Stage */}
            <div className="relative min-h-[450px] w-full">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={activeItem.id}
                  custom={direction}
                  initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(12px)' }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1] // Custom silky quintic ease-out
                  }}
                  className="w-full"
                >
                  {/* Text Content */}
                  <div className="max-w-3xl">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.6 }}
                      className="mb-2 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground"
                    >
                      <span className="font-display text-2xl leading-none tracking-tight text-foreground/80">
                        0{activeIndex + 1}
                      </span>
                      <span className="h-px flex-1 bg-foreground/10" />
                      <span>{activeItem.period}</span>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.6 }}
                      className="mb-4 flex flex-wrap items-center gap-3"
                    >
                      <Badge variant="default" className="text-sm">
                        {activeItem.company}
                      </Badge>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {activeItem.location}
                      </span>
                    </motion.div>

                    <motion.h3 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.7 }}
                      className="font-display text-2xl leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl"
                    >
                      {activeItem.role}
                    </motion.h3>

                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.7 }}
                      className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
                    >
                      {activeItem.narrative}
                    </motion.p>

                    <ul className="mt-8 flex flex-col gap-y-4">
                      {activeItem.highlights.map((h, i) => (
                        <motion.li 
                          key={h} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                          className="flex items-start gap-3 group/item"
                        >
                          <span aria-hidden className="mt-[10px] h-[2px] w-4 shrink-0 bg-foreground/30 transition-all group-hover/item:w-6 group-hover/item:bg-foreground" />
                          <span className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover/item:text-foreground">
                            {h}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Number Switcher */}
            <div className="mt-12 flex items-center justify-between border-t border-foreground/5 pt-10">
              <div className="flex items-center gap-4">
                {exp.items.map((item, i) => {
                  const isActive = i === activeIndex
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSwitch(i)}
                      className={cn(
                        "group relative flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-500",
                        isActive 
                          ? "border-foreground/20 bg-foreground/[0.02] shadow-sm" 
                          : "border-foreground/5 bg-transparent hover:border-foreground/10 hover:bg-foreground/[0.01]"
                      )}
                    >
                      <span className={cn(
                        "font-display text-lg transition-colors",
                        isActive ? "text-foreground" : "text-foreground/20"
                      )}>
                        0{i + 1}
                      </span>
                      {isActive && (
                        <motion.div 
                          layoutId="active-dot"
                          className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-foreground"
                        />
                      )}
                    </button>
                  )
                })}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleSwitch((activeIndex - 1 + exp.items.length) % exp.items.length)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 hover:bg-foreground/5 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleSwitch((activeIndex + 1) % exp.items.length)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 hover:bg-foreground/5 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
