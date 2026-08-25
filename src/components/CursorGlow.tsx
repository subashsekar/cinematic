import { useEffect, useState, type CSSProperties } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function CursorGlow() {
  const reduced = usePrefersReducedMotion()
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (reduced) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  if (reduced) return null

  const style: CSSProperties = {
    transform: `translate3d(${pos.x - 120}px, ${pos.y - 120}px, 0)`,
    opacity: visible ? 0.35 : 0,
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 hidden h-[240px] w-[240px] rounded-full md:block"
      style={{
        ...style,
        background:
          'radial-gradient(circle, rgba(201,168,130,0.22) 0%, transparent 70%)',
        transition: 'opacity 0.4s ease',
        willChange: 'transform',
      }}
    />
  )
}
