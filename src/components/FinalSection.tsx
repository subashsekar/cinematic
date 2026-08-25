import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { HERO_PHOTO } from '../content/photos'
import { easing, HER_NAME, STORY_DATE } from '../content/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { InfinityLoop } from './Decor3D'
import { LightOrb } from './LightOrb'

type Phase = 'dark' | 'light' | 'name' | 'range' | 'thanks' | 'endQ' | 'maybe' | 'black'

export function FinalSection() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [phase, setPhase] = useState<Phase>('dark')

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setPhase('maybe')
      return
    }

    let cancelled = false
    const schedule = (next: Phase, at: number) =>
      window.setTimeout(() => {
        if (!cancelled) setPhase(next)
      }, at)

    const timers = [
      schedule('light', 500),
      schedule('name', 2000),
      schedule('range', 3600),
      schedule('thanks', 5200),
      schedule('endQ', 7600),
      schedule('maybe', 10000),
      schedule('black', 12500),
    ]
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [inView, reduced])

  const show = (p: Phase) => {
    const order: Phase[] = [
      'dark',
      'light',
      'name',
      'range',
      'thanks',
      'endQ',
      'maybe',
      'black',
    ]
    return order.indexOf(phase) >= order.indexOf(p)
  }

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-void px-6 py-28"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: show('light') && phase !== 'black' ? 0.7 : 0,
        }}
        transition={{ duration: 2.4, ease: easing }}
      >
        <img
          src={HERO_PHOTO.src}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-[center_18%]"
        />
        <div className="absolute inset-0 bg-void/45" />
        <div className="soft-vignette absolute inset-0" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.15 }}
        animate={
          show('light') && phase !== 'black'
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.15 }
        }
        transition={{ duration: 2.2, ease: easing }}
      >
        <LightOrb size={240} intensity={0.55} />
      </motion.div>

      {show('range') && phase !== 'black' && (
        <InfinityLoop
          className="bottom-[22%] right-[10%]"
          size={72}
          opacity={0.32}
          delay={0.2}
        />
      )}

      <div className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {phase !== 'black' && show('name') && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: easing }}
              className="flex flex-col items-center"
            >
              <motion.h2
                className="font-display text-[clamp(3.2rem,14vw,7.5rem)] font-light tracking-[0.32em] text-ivory drop-shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                initial={{ opacity: 0, filter: 'blur(14px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.7, ease: easing }}
              >
                {HER_NAME}
              </motion.h2>

              {show('range') && (
                <motion.p
                  className="mt-8 font-display text-[clamp(1.05rem,3.2vw,1.6rem)] tracking-[0.24em] text-champagne"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.3, ease: easing }}
                >
                  {STORY_DATE} → ∞
                </motion.p>
              )}

              {show('thanks') && (
                <motion.p
                  className="mt-8 max-w-md font-body text-sm tracking-[0.1em] text-ivory/65 sm:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.3, ease: easing }}
                >
                  Thank you for being part of my story.
                </motion.p>
              )}

              <div className="mt-16 min-h-[3.5rem]">
                <AnimatePresence mode="wait">
                  {phase === 'endQ' && (
                    <motion.p
                      key="endQ"
                      className="font-display text-3xl italic tracking-[0.1em] text-ivory/70 sm:text-4xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease: easing }}
                    >
                      The End?
                    </motion.p>
                  )}
                  {(phase === 'maybe' || (reduced && show('maybe'))) && (
                    <motion.h3
                      key="maybe"
                      className="font-display text-[clamp(2.2rem,8vw,4rem)] tracking-[0.12em] text-ivory"
                      initial={{ opacity: 0, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: easing }}
                    >
                      Maybe not.
                    </motion.h3>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
