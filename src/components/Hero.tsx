import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HERO_PHOTO } from '../content/photos'
import { easing, HER_NAME, STORY_DATE } from '../content/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { AmbientLight } from './AmbientLight'
import { GlassHeart, GlassOrb } from './Decor3D'
import { LightOrb } from './LightOrb'

type Phase =
  | 'void'
  | 'light'
  | 'particles'
  | 'photo'
  | 'name'
  | 'date'
  | 'line'
  | 'done'

const sequence: { phase: Phase; at: number }[] = [
  { phase: 'light', at: 400 },
  { phase: 'particles', at: 1200 },
  { phase: 'photo', at: 2200 },
  { phase: 'name', at: 4200 },
  { phase: 'date', at: 6200 },
  { phase: 'line', at: 7800 },
  { phase: 'done', at: 9400 },
]

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduced ? 'done' : 'void')

  useEffect(() => {
    if (reduced) return
    let cancelled = false
    const timers = sequence.map(({ phase: next, at }) =>
      window.setTimeout(() => {
        if (!cancelled) setPhase(next)
      }, at),
    )
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [reduced])

  const show = (p: Phase) => {
    const order: Phase[] = [
      'void',
      'light',
      'particles',
      'photo',
      'name',
      'date',
      'line',
      'done',
    ]
    return order.indexOf(phase) >= order.indexOf(p)
  }

  return (
    <section
      id="opening"
      className="relative isolate z-20 flex min-h-[100svh] items-center justify-center overflow-hidden bg-void"
    >
      <AmbientLight className="top-[20%] left-[15%] h-[40vw] w-[40vw]" intensity={0.25} />
      <AmbientLight className="right-[10%] bottom-[15%] h-[30vw] w-[30vw]" intensity={0.18} />

      <GlassOrb className="top-[22%] right-[8%]" size={48} opacity={0.28} delay={1.2} />
      <GlassHeart className="bottom-[18%] left-[7%]" size={26} opacity={0.22} delay={1.8} />

      <motion.div
        className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.02, opacity: 0 }}
        animate={
          show('light')
            ? { scale: 1, opacity: show('photo') ? 0.22 : 1 }
            : { scale: 0.02, opacity: 0 }
        }
        transition={{ duration: reduced ? 0.3 : 2.8, ease: easing }}
      >
        <LightOrb size={460} intensity={0.75} />
      </motion.div>

      {show('particles') &&
        !reduced &&
        [...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute z-[2] h-[2px] w-[2px] rounded-full bg-champagne/50"
            style={{
              left: `${10 + ((i * 59) % 80)}%`,
              top: `${12 + ((i * 37) % 76)}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.5, 0.12], y: [0, -12, 0] }}
            transition={{
              duration: 5 + (i % 5),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.18,
            }}
          />
        ))}

      {/* Single photo layer — no nested scale/blur stacking */}
      <motion.div
        className="absolute inset-0 z-[1] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: show('photo') ? 1 : 0 }}
        transition={{ duration: reduced ? 0.4 : 2.4, ease: easing }}
      >
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.08 }}
          animate={
            show('photo')
              ? reduced
                ? { scale: 1 }
                : { scale: [1.06, 1.12] }
              : { scale: 1.08 }
          }
          transition={
            show('photo') && !reduced
              ? { duration: 24, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
              : { duration: 2.4, ease: easing }
          }
        >
          <img
            src={HERO_PHOTO.src}
            alt={HERO_PHOTO.alt}
            className="h-full w-full object-cover object-[center_18%]"
            fetchPriority="high"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-void/55 via-void/30 to-void/85" />
        <div className="soft-vignette absolute inset-0" />
      </motion.div>

      <div className="relative z-10 flex max-w-5xl flex-col items-center px-6 text-center">
        <AnimatePresence>
          {show('name') && (
            <motion.h1
              className="flex flex-wrap justify-center font-display text-[clamp(4rem,16vw,10rem)] font-light leading-none tracking-[0.32em] text-ivory drop-shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {HER_NAME.split('').map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  className="inline-block"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: i * 0.06,
                    ease: easing,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {show('date') && (
            <motion.p
              className="mt-12 whitespace-nowrap font-display text-[clamp(1.1rem,3.8vw,2.2rem)] tracking-[0.28em] text-champagne sm:tracking-[0.36em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: easing }}
            >
              {STORY_DATE}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {show('line') && (
            <motion.p
              className="mt-8 font-display text-[clamp(1.05rem,2.8vw,1.55rem)] italic tracking-[0.08em] text-ivory/75"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: easing }}
            >
              The beginning of our story.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {show('done') && (
        <motion.div
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          <span className="font-body text-[9px] tracking-[0.4em] text-ivory/55 uppercase">
            Enter the story
          </span>
          <motion.div
            className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-champagne/70 to-transparent"
            animate={reduced ? {} : { opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </section>
  )
}
