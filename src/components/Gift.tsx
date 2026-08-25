import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { siteVideos } from '../content/videos'
import { easing } from '../content/story'
import { pauseSiteMusic } from '../lib/musicBus'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { AmbientLight } from './AmbientLight'
import { GlassOrb, GlassRing } from './Decor3D'

const giftVideo = siteVideos.find((v) => 'isGift' in v && v.isGift)!

export function Gift() {
  const reduced = usePrefersReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [opened, setOpened] = useState(false)
  const [ratio, setRatio] = useState('9 / 16')
  const [magnet, setMagnet] = useState({ x: 0, y: 0 })

  const close = useCallback(() => {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    setOpened(false)
  }, [])

  useEffect(() => {
    if (!opened) return
    pauseSiteMusic()

    const video = videoRef.current
    if (!video) return

    const applyRatio = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        setRatio(`${video.videoWidth} / ${video.videoHeight}`)
      }
    }
    const onPlay = () => pauseSiteMusic()

    video.addEventListener('loadedmetadata', applyRatio)
    video.addEventListener('play', onPlay)
    if (video.readyState >= 1) applyRatio()

    const play = async () => {
      try {
        await video.play()
      } catch {
        /* controls fallback */
      }
    }
    void play()

    return () => {
      video.removeEventListener('loadedmetadata', applyRatio)
      video.removeEventListener('play', onPlay)
    }
  }, [opened])

  useEffect(() => {
    if (!opened) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [opened, close])

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.18
    const y = (e.clientY - rect.top - rect.height / 2) * 0.18
    setMagnet({ x, y })
  }

  return (
    <section
      id="gift"
      className="relative flex min-h-[95svh] flex-col items-center justify-center overflow-hidden px-6 py-28"
    >
      <AmbientLight className="top-1/3 left-1/2 h-[45vw] w-[45vw] -translate-x-1/2" intensity={0.28} />
      <GlassRing className="top-[20%] left-[8%]" size={70} opacity={0.22} />
      <GlassOrb className="bottom-[20%] right-[9%]" size={40} opacity={0.24} />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduced ? 0.35 : 1.3, ease: easing }}
      >
        <p className="font-body text-[10px] tracking-[0.45em] text-ivory/35 uppercase">
          One last thing
        </p>
        <h2 className="mt-5 font-display text-[clamp(2.4rem,8vw,4.2rem)] font-light tracking-[0.12em] text-ivory">
          A gift for you
        </h2>
        <p className="mt-5 max-w-md font-display text-lg italic tracking-[0.04em] text-champagne-soft/80">
          Tap to open.
        </p>

        <motion.button
          type="button"
          onClick={() => setOpened(true)}
          onMouseMove={onMove}
          onMouseLeave={() => setMagnet({ x: 0, y: 0 })}
          style={{ x: magnet.x, y: magnet.y }}
          className="group relative mt-16 flex h-40 w-40 flex-col items-center justify-center rounded-sm border border-champagne/35 bg-gradient-to-b from-charcoal/90 to-void shadow-[0_0_60px_rgba(203,176,137,0.15)] transition-[border-color,box-shadow] duration-500 hover:border-champagne/60 hover:shadow-[0_0_80px_rgba(203,176,137,0.28)] sm:h-44 sm:w-44"
          whileTap={{ scale: 0.97 }}
          aria-label="Open gift video"
        >
          <span aria-hidden className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-champagne/40" />
          <span aria-hidden className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-champagne/40" />
          <span className="relative z-10 font-display text-5xl tracking-[0.2em] text-champagne transition-colors group-hover:text-champagne-soft">
            ✦
          </span>
          <span className="relative z-10 mt-3 font-body text-[10px] tracking-[0.35em] text-ivory/55 uppercase">
            Open
          </span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-void/94 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easing }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Gift video"
          >
            <motion.div
              className="relative flex max-h-[90svh] w-full max-w-[min(100%,440px)] items-center justify-center sm:max-w-[min(100%,540px)]"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: easing }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative max-h-[85svh] w-full overflow-hidden rounded-sm border border-champagne/25 bg-void shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
                style={{ aspectRatio: ratio }}
              >
                <video
                  ref={videoRef}
                  src={giftVideo.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-contain"
                >
                  Your browser does not support this video.
                </video>
              </div>
              <button
                type="button"
                onClick={close}
                className="absolute -top-12 right-0 font-body text-[11px] tracking-[0.3em] text-ivory/60 uppercase transition-colors hover:text-ivory"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
