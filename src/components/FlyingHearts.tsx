import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type HeartSpec = {
  id: number
  left: string
  size: number
  duration: number
  delay: number
  drift: number
  opacity: number
  rotate: number
}

function buildHearts(count: number): HeartSpec[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = (i * 97 + 13) % 100
    return {
      id: i,
      left: `${4 + ((i * 17) % 92)}%`,
      size: 14 + (seed % 22),
      duration: 16 + (seed % 18),
      delay: (i * 1.35) % 14,
      drift: ((seed % 40) - 20) * 1.2,
      opacity: 0.18 + (seed % 25) / 100,
      rotate: (seed % 50) - 25,
    }
  })
}

function HeartSvg({ size, id }: { size: number; id: number }) {
  const gradId = `flyHeart-${id}`
  return (
    <svg
      width={size}
      height={size * 0.92}
      viewBox="0 0 32 30"
      fill="none"
      className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(242,235,225,0.7)" />
          <stop offset="45%" stopColor="rgba(203,176,137,0.55)" />
          <stop offset="100%" stopColor="rgba(122,58,72,0.4)" />
        </linearGradient>
      </defs>
      <path
        d="M16 27 C16 27 3 18 3 10.5 C3 6.4 6.2 3.5 10 3.5 C12.6 3.5 14.7 5 16 7 C17.3 5 19.4 3.5 22 3.5 C25.8 3.5 29 6.4 29 10.5 C29 18 16 27 16 27 Z"
        fill={`url(#${gradId})`}
        stroke="rgba(203,176,137,0.45)"
        strokeWidth="0.55"
      />
      <ellipse
        cx="11.5"
        cy="9"
        rx="3"
        ry="1.5"
        fill="rgba(255,255,255,0.32)"
      />
    </svg>
  )
}

/**
 * Site-wide floating 3D-style hearts.
 * Decorative only — never intercepts clicks.
 */
export function FlyingHearts() {
  const reduced = usePrefersReducedMotion()
  const hearts = useMemo(() => buildHearts(reduced ? 0 : 16), [reduced])

  if (reduced || hearts.length === 0) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[35] overflow-hidden"
    >
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute will-change-transform"
          style={{
            left: h.left,
            bottom: '-8%',
            opacity: h.opacity,
          }}
          animate={{
            y: ['0vh', '-115vh'],
            x: [0, h.drift, h.drift * -0.6, h.drift * 0.4],
            rotateY: [0, 180, 360],
            rotateZ: [h.rotate, h.rotate + 18, h.rotate - 10],
            scale: [0.85, 1.05, 0.9],
            opacity: [0, h.opacity, h.opacity * 0.85, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.12, 0.85, 1],
          }}
        >
          <div
            style={{
              transform: 'perspective(420px) rotateX(18deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <HeartSvg size={h.size} id={h.id} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
