import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'

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
  const [open, setOpen] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (isTouch) {
      setHidden(false)
      return
    }
    const goingDown = y > lastY && y > 120
    setHidden(goingDown)
    setLastY(y)
  })

  const go = (href: string) => {
    setOpen(false)
    window.location.hash = href
  }

  return (
    <>
      {/* Desktop nav */}
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

      {/* Mobile nav */}
      <div className="fixed top-0 right-0 left-0 z-50 flex items-start justify-between px-4 pt-4 md:hidden">
        <a
          href="#opening"
          className="rounded-full border border-champagne/20 bg-ink/60 px-3 py-1.5 font-display text-sm tracking-[0.18em] text-ivory/80 backdrop-blur-md"
        >
          SWETHA
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-champagne/20 bg-ink/60 px-3 py-1.5 font-body text-[10px] tracking-[0.28em] text-ivory/70 uppercase backdrop-blur-md"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] bg-void/92 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-6 px-6">
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  type="button"
                  onClick={() => go(link.href)}
                  className="font-display text-2xl tracking-[0.2em] text-ivory/85 uppercase"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
