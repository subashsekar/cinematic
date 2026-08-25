import { motion } from 'framer-motion'
import { easing } from '../content/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { AmbientLight } from './AmbientLight'
import { GlassRing, InfinityLoop, OrbitSpark } from './Decor3D'
import { Reveal } from './Reveal'

export function Beginning() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="beginning"
      className="relative z-10 overflow-hidden bg-void px-6 py-28 sm:py-36"
    >
      <AmbientLight
        className="top-1/4 left-1/2 h-[40vw] w-[40vw] -translate-x-1/2"
        intensity={0.2}
      />
      <GlassRing className="top-[18%] right-[10%]" size={64} opacity={0.24} />
      <InfinityLoop className="bottom-[16%] left-[8%]" size={58} opacity={0.26} />
      <OrbitSpark className="top-[42%] right-[18%]" radius={28} opacity={0.35} />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <Reveal>
          <p className="font-body text-[10px] tracking-[0.42em] text-champagne/60 uppercase">
            The day everything started
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 w-full">
          <h2 className="mx-auto whitespace-nowrap font-display text-[clamp(1.35rem,6.5vw,3.75rem)] font-light tracking-[0.12em] text-ivory sm:tracking-[0.18em]">
            04.04.2022&nbsp;—&nbsp;∞
          </h2>
        </Reveal>

        <motion.div
          className="mt-12 h-px w-24 origin-center bg-gradient-to-r from-transparent via-champagne/55 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0.3 : 1.2, ease: easing }}
        />

        <Reveal delay={0.25} className="mt-12 max-w-xl">
          <p className="font-display text-[clamp(1.15rem,3vw,1.55rem)] italic leading-relaxed text-ivory/65">
            It started with a date. Then that date became memories, laughter,
            lessons, and a story I&apos;ll always carry.
          </p>
        </Reveal>

        <Reveal delay={0.35} className="mt-10">
          <p className="font-display text-xl tracking-[0.1em] text-champagne-soft/90">
            And the story began.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
