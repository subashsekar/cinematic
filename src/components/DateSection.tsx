import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { easing, STORY_DATE } from '../content/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { AmbientLight } from './AmbientLight'
import { GlassOrb, InfinityLoop, OrbitSpark } from './Decor3D'

type Step = '04a' | '04b' | '2022' | 'merged' | 'today' | 'infinity'

export function DateSection() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.45 })
  const [step, setStep] = useState<Step | null>(null)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setStep('infinity')
      return
    }

    let cancelled = false
    const schedule = (next: Step, at: number) =>
      window.setTimeout(() => {
        if (!cancelled) setStep(next)
      }, at)

    const timers = [
      schedule('04a', 200),
      schedule('04b', 1300),
      schedule('2022', 2400),
      schedule('merged', 3700),
      schedule('today', 5600),
      schedule('infinity', 7200),
    ]
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [inView, reduced])

  const big =
    'font-display text-[clamp(4.5rem,20vw,12rem)] font-light leading-none tracking-[0.08em] text-ivory'

  return (
    <section
      ref={ref}
      className="relative flex min-h-[120svh] items-center justify-center overflow-hidden px-6 py-28"
    >
      <AmbientLight className="top-1/2 left-1/2 h-[50vw] w-[50vw] -translate-x-1/2 -translate-y-1/2" />
      <OrbitSpark className="top-[28%] right-[14%]" radius={40} opacity={0.38} />
      <GlassOrb className="bottom-[22%] left-[10%]" size={44} opacity={0.22} />
      <InfinityLoop className="bottom-[18%] right-[8%]" size={70} opacity={0.28} delay={0.4} />

      <div className="relative z-10 flex min-h-[55vh] flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {step && step !== 'merged' && step !== 'today' && step !== 'infinity' && (
            <motion.p
              key={step}
              className={big}
              initial={{ opacity: 0, scale: 1.12, filter: 'blur(14px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
              transition={{ duration: 1.05, ease: easing }}
            >
              {step === '04a' || step === '04b' ? '04' : '2022'}
            </motion.p>
          )}

          {step === 'merged' && (
            <motion.div
              key="merged"
              initial={{ opacity: 0, scale: 1.15, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 1.5, ease: easing }}
            >
              <h2 className="font-display text-[clamp(2.2rem,9vw,5.8rem)] tracking-[0.28em] text-ivory">
                {STORY_DATE}
              </h2>
              <p className="mt-8 font-display text-base italic text-ivory/50 sm:text-lg">
                The beginning of something I&apos;ll always be grateful for.
              </p>
            </motion.div>
          )}

          {step === 'today' && (
            <motion.h2
              key="today"
              className="font-display text-[clamp(3rem,12vw,7rem)] tracking-[0.28em] text-champagne"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: easing }}
            >
              TODAY
            </motion.h2>
          )}

          {step === 'infinity' && (
            <motion.div
              key="infinity"
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.6, ease: easing }}
            >
              <span className="font-display text-[clamp(5rem,22vw,13rem)] leading-none text-ivory">
                ∞
              </span>
              <p className="mt-6 font-body text-[11px] tracking-[0.35em] text-champagne/60 uppercase">
                {STORY_DATE} → today → ∞
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
