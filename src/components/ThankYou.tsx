import { motion } from 'framer-motion'
import { easing, thankYouLines } from '../content/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { AmbientLight } from './AmbientLight'
import { GlassHeart, GlassOrb, LightRibbon } from './Decor3D'

export function ThankYou() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="relative overflow-hidden px-6 py-32 sm:py-40">
      <AmbientLight className="-top-10 left-1/4 h-[45vw] w-[45vw]" intensity={0.22} />
      <AmbientLight className="right-0 bottom-0 h-[35vw] w-[35vw]" intensity={0.16} />
      <GlassHeart className="top-[20%] right-[6%]" size={30} opacity={0.2} />
      <GlassOrb className="bottom-[18%] left-[6%]" size={42} opacity={0.24} />
      <LightRibbon className="top-[55%] right-[4%]" opacity={0.18} />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <motion.p
          className="font-body text-[10px] tracking-[0.42em] text-ivory/40 uppercase"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easing }}
        >
          I have something to say.
        </motion.p>

        <motion.h2
          className="mt-10 font-display text-[clamp(2.6rem,10vw,5.5rem)] font-light leading-[1.05] tracking-[0.08em] text-ivory"
          initial={
            reduced
              ? { opacity: 0 }
              : { opacity: 0, y: 20, filter: 'blur(8px)' }
          }
          whileInView={
            reduced
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: 'blur(0px)' }
          }
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: easing }}
        >
          <span className="block">THANK YOU,</span>
          <span className="mt-1 block tracking-[0.16em]">SWETHA.</span>
        </motion.h2>

        <ul className="mt-16 flex w-full flex-col items-center gap-8 sm:mt-20 sm:gap-10">
          {thankYouLines.map((line, i) => (
            <motion.li
              key={line}
              className="max-w-xl text-center font-display text-[clamp(1.15rem,3.2vw,1.75rem)] font-light italic leading-snug tracking-[0.03em] text-champagne-soft/90"
              initial={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: 18, filter: 'blur(6px)' }
              }
              whileInView={
                reduced
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              viewport={{ once: true, amount: 0.7 }}
              transition={{
                duration: 1,
                delay: reduced ? 0 : i * 0.05,
                ease: easing,
              }}
            >
              {line}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
