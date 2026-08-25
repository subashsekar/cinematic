import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { storyPhotos } from '../content/photos'
import { easing } from '../content/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Reveal } from './Reveal'
import { GlassRing, LightRibbon } from './Decor3D'

export function Memories() {
  return (
    <section id="memories" className="relative overflow-hidden">
      <LightRibbon className="top-[8%] right-[6%]" opacity={0.16} />
      <GlassRing className="top-[12%] left-[5%]" size={54} opacity={0.18} />
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 pt-28 pb-20 text-center sm:pt-36">
        <Reveal className="w-full">
          <p className="font-body text-[10px] tracking-[0.42em] text-ivory/35 uppercase">
            Cinematic memories
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,8vw,4.8rem)] font-light tracking-[0.08em] text-ivory">
            Moments we keep
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-28 sm:gap-32 sm:px-10">
        {storyPhotos.map((photo, i) => (
          <MemoryPlate key={photo.src} photo={photo} index={i} />
        ))}
      </div>
    </section>
  )
}

type PlateProps = {
  photo: (typeof storyPhotos)[number]
  index: number
}

function MemoryPlate({ photo, index }: PlateProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [36, -36])
  const imgScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduced ? [1, 1, 1] : [1.06, 1, 1.03],
  )

  const reverse = index % 2 === 1

  return (
    <article
      ref={ref}
      className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 ${
        reverse ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      <motion.div
        className="relative overflow-hidden rounded-sm border border-champagne/10"
        style={{ y: imgY }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.1, ease: easing }}
      >
        <motion.div className="aspect-[3/4] w-full overflow-hidden" style={{ scale: imgScale }}>
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className={`flex flex-col justify-center ${
          reverse ? 'md:items-end md:text-right' : 'md:items-start md:text-left'
        } items-center text-center`}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1, delay: 0.1, ease: easing }}
      >
        <p className="font-body text-[10px] tracking-[0.35em] text-champagne/60 uppercase">
          Memory {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="mt-4 max-w-sm font-display text-[clamp(1.6rem,4vw,2.5rem)] font-light italic leading-snug tracking-[0.03em] text-ivory">
          {photo.caption}
        </h3>
        <p className="mt-5 max-w-xs font-body text-sm leading-relaxed tracking-[0.04em] text-ivory/45">
          {photo.alt}
        </p>
        <div
          className={`mt-8 h-px w-16 bg-gradient-to-r from-transparent via-champagne/50 to-transparent ${
            reverse ? 'md:ml-auto' : 'md:mr-auto'
          }`}
        />
      </motion.div>
    </article>
  )
}
