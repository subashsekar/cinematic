import { motion } from 'framer-motion'
import { easing } from '../content/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { AmbientLight } from './AmbientLight'

const names = [
  { label: 'Ammu❤️', tone: 'from-rose-mute/30 to-burgundy/25 border-rose-mute/35' },
  { label: 'Bujju💙', tone: 'from-champagne/20 to-burgundy-soft/20 border-champagne/30' },
] as const

export function PetNames() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="relative overflow-hidden px-6 py-20 sm:py-28">
      <AmbientLight className="top-1/2 left-1/2 h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2" intensity={0.18} />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.p
          className="font-body text-[10px] tracking-[0.4em] text-ivory/40 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easing }}
        >
          Soft names
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {names.map((n, i) => (
            <motion.span
              key={n.label}
              className={`rounded-full border bg-gradient-to-br px-6 py-3 font-display text-[clamp(1.35rem,4vw,1.9rem)] tracking-[0.06em] text-ivory shadow-[0_0_30px_rgba(203,176,137,0.12)] ${n.tone}`}
              initial={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16, scale: 0.96 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: easing }}
              whileHover={reduced ? undefined : { scale: 1.04 }}
            >
              {n.label}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="mt-10 max-w-md font-display text-base italic text-ivory/55 sm:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2, ease: easing }}
        >
          Little names that somehow hold the whole story.
        </motion.p>
      </div>
    </section>
  )
}
