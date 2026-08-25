import { useEffect, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

const links = [
  { href: '#opening', label: 'Opening' },
  { href: '#beginning', label: 'Beginning' },
  { href: '#memories', label: 'Memories' },
  { href: '#letter', label: 'Letter' },
  { href: '#gift', label: 'Gift' },
] as const

export function FloatingNav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (isTouch) return
    const goingDown = y > lastY && y > 120
    setHidden(goingDown)
    setLastY(y)
  })

  return (
    <motion.nav
      className="pointer-events-none fixed top-0 right-0 left-0 z-50 hidden justify-center pt-6 md:flex"
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Story navigation"
    >
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-champagne/15 bg-ink/55 px-2 py-2 backdrop-blur-xl">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full px-3 py-1.5 font-body text-[10px] tracking-[0.22em] text-ivory/45 uppercase transition-colors duration-300 hover:bg-champagne/10 hover:text-ivory"
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.nav>
  )
}
