import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  size?: number
  intensity?: number
  className?: string
  breathe?: boolean
}

export function LightOrb({
  size = 280,
  intensity = 0.55,
  className = '',
  breathe = true,
}: Props) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full light-bloom ${className}`}
      style={{
        width: size,
        height: size,
        opacity: intensity,
        filter: 'blur(2px)',
      }}
      animate={
        reduced || !breathe
          ? { opacity: intensity }
          : {
              opacity: [intensity * 0.85, intensity, intensity * 0.85],
              scale: [0.97, 1.03, 0.97],
            }
      }
      transition={
        reduced || !breathe
          ? { duration: 0 }
          : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
      }
    />
  )
}
