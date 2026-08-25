import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/** Tiny desktop parallax (~5–15px). Disabled on touch / reduced motion. */
export function useMouseParallax(strength = 10) {
  const reduced = usePrefersReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 40, damping: 22, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 40, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      rawX.set(nx * strength)
      rawY.set(ny * strength)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, rawX, rawY, strength])

  return { x, y }
}

export function useInverseParallax(strength = 6) {
  const { x, y } = useMouseParallax(strength)
  const ix = useTransform(x, (v) => -v)
  const iy = useTransform(y, (v) => -v)
  return { x: ix, y: iy }
}
