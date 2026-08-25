import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easing } from '../content/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  once?: boolean
  amount?: number
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 1.1,
  y = 24,
  once = true,
  amount = 0.45,
}: Props) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      className={className}
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, y, filter: 'blur(8px)' }
      }
      whileInView={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: 'blur(0px)' }
      }
      viewport={{ once, amount }}
      transition={{ duration: reduced ? 0.35 : duration, delay, ease: easing }}
    >
      {children}
    </motion.div>
  )
}
