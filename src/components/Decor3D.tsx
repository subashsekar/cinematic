import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useMouseParallax } from '../hooks/useMouseParallax'

type DecorProps = {
  className?: string
  opacity?: number
  size?: number
  radius?: number
  delay?: number
  parallax?: number
  scrollFactor?: number
  children?: ReactNode
}

function DecorShell({
  className = '',
  opacity = 0.35,
  delay = 0,
  parallax = 8,
  scrollFactor = 0.2,
  children,
}: DecorProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { x, y: mouseY } = useMouseParallax(reduced ? 0 : parallax)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scrollOffset = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [36 * scrollFactor, -36 * scrollFactor],
  )
  const y = useTransform([mouseY, scrollOffset], ([m, s]) => Number(m) + Number(s))

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute z-[3] hidden select-none md:block ${className}`}
      style={{ x, y }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: reduced ? opacity * 0.55 : opacity }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Soft translucent glass sphere */
export function GlassOrb({
  className = '',
  size = 56,
  opacity = 0.32,
  ...rest
}: DecorProps) {
  return (
    <DecorShell className={className} opacity={opacity} {...rest}>
      <motion.div
        className="relative rounded-full"
        style={{
          width: size,
          height: size,
          background:
            'radial-gradient(circle at 32% 28%, rgba(242,235,225,0.45), rgba(203,176,137,0.18) 42%, rgba(74,31,40,0.12) 70%, transparent 78%)',
          boxShadow:
            'inset 0 0 18px rgba(242,235,225,0.18), 0 8px 28px rgba(0,0,0,0.25)',
          border: '1px solid rgba(203,176,137,0.22)',
          backdropFilter: 'blur(2px)',
        }}
        animate={{ y: [0, -8, 0], rotateZ: [0, 6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="absolute top-[18%] left-[22%] h-[22%] w-[28%] rounded-full bg-ivory/35 blur-[1px]"
          style={{ opacity: 0.55 }}
        />
      </motion.div>
    </DecorShell>
  )
}

/** Thin elegant ring */
export function GlassRing({
  className = '',
  size = 72,
  opacity = 0.28,
  ...rest
}: DecorProps) {
  return (
    <DecorShell className={className} opacity={opacity} {...rest}>
      <motion.div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: '1.5px solid rgba(203,176,137,0.4)',
          boxShadow:
            'inset 0 0 12px rgba(203,176,137,0.12), 0 0 20px rgba(203,176,137,0.08)',
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateX: [62, 68, 62], rotateY: [0, 360] }}
        transition={{
          rotateY: { duration: 48, repeat: Infinity, ease: 'linear' },
          rotateX: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    </DecorShell>
  )
}

/** Tiny glass heart — use at most once per view */
export function GlassHeart({
  className = '',
  size = 28,
  opacity = 0.26,
  ...rest
}: DecorProps) {
  return (
    <DecorShell className={className} opacity={opacity} parallax={6} {...rest}>
      <motion.div
        style={{ width: size, height: size, perspective: 200 }}
        animate={{ rotateY: [-12, 12, -12], y: [0, -6, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 32 30" className="h-full w-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]">
          <defs>
            <linearGradient id="gh" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(242,235,225,0.55)" />
              <stop offset="55%" stopColor="rgba(203,176,137,0.35)" />
              <stop offset="100%" stopColor="rgba(74,31,40,0.28)" />
            </linearGradient>
          </defs>
          <path
            d="M16 27 C16 27 3 18 3 10.5 C3 6.4 6.2 3.5 10 3.5 C12.6 3.5 14.7 5 16 7 C17.3 5 19.4 3.5 22 3.5 C25.8 3.5 29 6.4 29 10.5 C29 18 16 27 16 27 Z"
            fill="url(#gh)"
            stroke="rgba(203,176,137,0.45)"
            strokeWidth="0.6"
          />
          <ellipse cx="11.5" cy="9" rx="3.2" ry="1.6" fill="rgba(255,255,255,0.28)" />
        </svg>
      </motion.div>
    </DecorShell>
  )
}

/** Soft abstract ribbon curve */
export function LightRibbon({
  className = '',
  opacity = 0.22,
  ...rest
}: DecorProps) {
  return (
    <DecorShell className={className} opacity={opacity} parallax={5} {...rest}>
      <motion.svg
        width="140"
        height="70"
        viewBox="0 0 140 70"
        fill="none"
        animate={{ x: [0, 6, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M4 48 C28 8, 52 62, 78 28 C98 6, 118 40, 136 22"
          stroke="rgba(203,176,137,0.55)"
          strokeWidth="1.2"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 6px rgba(203,176,137,0.25))' }}
        />
      </motion.svg>
    </DecorShell>
  )
}

/** Small elegant infinity loop */
export function InfinityLoop({
  className = '',
  size = 64,
  opacity = 0.3,
  ...rest
}: DecorProps) {
  return (
    <DecorShell className={className} opacity={opacity} parallax={7} {...rest}>
      <motion.svg
        width={size}
        height={size * 0.55}
        viewBox="0 0 100 55"
        fill="none"
        animate={{ rotateZ: [-4, 4, -4], y: [0, -5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.path
          d="M12 27.5 C12 12, 28 12, 34 27.5 C40 43, 56 43, 56 27.5 C56 12, 72 12, 78 27.5 C84 43, 100 43, 88 27.5"
          stroke="rgba(203,176,137,0.65)"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={{ pathLength: 0.35 }}
          animate={{ pathLength: [0.35, 1, 0.35] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 8px rgba(203,176,137,0.3))' }}
        />
      </motion.svg>
    </DecorShell>
  )
}

/** Tiny orbiting spark around a point */
export function OrbitSpark({
  className = '',
  radius = 36,
  opacity = 0.4,
  ...rest
}: DecorProps) {
  return (
    <DecorShell className={className} opacity={opacity} parallax={4} {...rest}>
      <motion.div
        className="relative"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
      >
        <span
          className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-champagne/80"
          style={{ boxShadow: '0 0 10px rgba(203,176,137,0.55)' }}
        />
      </motion.div>
    </DecorShell>
  )
}
