import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  className?: string
  intensity?: number
}

export function AmbientLight({ className = '', intensity = 0.35 }: Props) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{
        background:
          'radial-gradient(circle, rgba(203,176,137,0.35) 0%, rgba(74,31,40,0.18) 40%, transparent 70%)',
        opacity: intensity,
      }}
      animate={
        reduced
          ? { opacity: intensity }
          : {
              opacity: [intensity * 0.7, intensity, intensity * 0.75],
              x: [0, 24, -12, 0],
              y: [0, -18, 10, 0],
              scale: [1, 1.08, 0.96, 1],
            }
      }
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 18, repeat: Infinity, ease: 'easeInOut' }
      }
    />
  )
}
