import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FINAL_PHOTO } from '../content/photos'
import { easing, letterBody } from '../content/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Reveal } from './Reveal'
import { GlassOrb, LightRibbon } from './Decor3D'

export function LoveLetter() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const paragraphs = letterBody.split('\n\n')
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-30, 40])

  return (
    <section id="letter" ref={ref} className="relative overflow-hidden px-6 py-32 sm:py-40">
      <GlassOrb className="top-[18%] right-[7%]" size={38} opacity={0.2} />
      <LightRibbon className="bottom-[14%] left-[5%]" opacity={0.16} />
      <motion.div className="absolute inset-0 opacity-25" style={{ y: bgY }}>
        <img
          src={FINAL_PHOTO.src}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/85 to-void" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <Reveal>
          <h2 className="text-center font-display text-[clamp(2.4rem,8vw,4.2rem)] font-light tracking-[0.14em] text-ivory">
            For Swetha
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-6">
          <p className="text-center font-display text-[clamp(1.4rem,4vw,2.2rem)] italic text-champagne-soft">
            Thank you for loving me.
          </p>
        </Reveal>

        <div className="mt-16 space-y-9">
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              className="whitespace-pre-line font-display text-[clamp(1.05rem,2.5vw,1.25rem)] leading-[2] tracking-[0.02em] text-ivory/75"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: reduced ? 0.3 : 1.1,
                delay: reduced ? 0 : i * 0.05,
                ease: easing,
              }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <Reveal className="mt-16" delay={0.1}>
          <p className="font-display text-[clamp(1.2rem,3.2vw,1.65rem)] italic leading-relaxed text-ivory/80">
            Whatever tomorrow brings, I&apos;ll always be grateful for the story
            we wrote.
          </p>
        </Reveal>

        <Reveal className="mt-14" delay={0.2}>
          <p className="font-display text-[clamp(1.7rem,4.5vw,2.5rem)] tracking-[0.1em] text-champagne">
            With love, always.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
