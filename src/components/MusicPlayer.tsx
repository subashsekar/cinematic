import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { easing } from '../content/story'
import { asset } from '../lib/asset'
import { onPauseSiteMusic } from '../lib/musicBus'

const AUDIO_SRC = asset('audio/soundtrack.mp3')

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [available, setAvailable] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const playingRef = useRef(false)

  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'
    audio.loop = true
    audio.volume = 0
    audio.src = AUDIO_SRC
    audioRef.current = audio

    const onCanPlay = () => {
      setAvailable(true)
      setReady(true)
    }
    const onError = () => {
      setAvailable(false)
      setReady(true)
    }

    audio.addEventListener('canplaythrough', onCanPlay)
    audio.addEventListener('error', onError)
    audio.load()

    return () => {
      audio.pause()
      audio.removeEventListener('canplaythrough', onCanPlay)
      audio.removeEventListener('error', onError)
      audioRef.current = null
    }
  }, [])

  const fadeVolume = (target: number, ms = 1400) => {
    const audio = audioRef.current
    if (!audio) return
    const start = audio.volume
    const diff = target - start
    const started = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / ms)
      audio.volume = Math.max(0, Math.min(1, start + diff * t))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  const pauseMusic = (fadeMs = 500) => {
    const audio = audioRef.current
    if (!audio || !playingRef.current) return
    fadeVolume(0, fadeMs)
    window.setTimeout(() => audio.pause(), fadeMs + 50)
    setPlaying(false)
  }

  useEffect(() => {
    return onPauseSiteMusic(() => pauseMusic(400))
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio || !available) return

    if (playing) {
      pauseMusic(900)
      return
    }

    try {
      await audio.play()
      fadeVolume(0.32, 1600)
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  if (!ready) return null

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {available ? (
          <motion.button
            type="button"
            onClick={toggle}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: easing }}
            className="group flex items-center gap-3 rounded-full border border-champagne/20 bg-ink/70 px-4 py-2.5 backdrop-blur-md transition-[border-color,background-color] duration-500 hover:border-champagne/40 hover:bg-charcoal/80"
            aria-label={playing ? 'Pause music' : 'Play music'}
          >
            <span className="flex h-3 items-end gap-[3px]" aria-hidden>
              {[0.55, 1, 0.7, 0.9].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-[2px] rounded-full bg-champagne/80"
                  animate={
                    playing
                      ? { height: [`${h * 6}px`, `${h * 12}px`, `${h * 6}px`] }
                      : { height: 4 }
                  }
                  transition={
                    playing
                      ? {
                          duration: 0.7 + i * 0.12,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                      : { duration: 0.3 }
                  }
                  style={{ height: 4 }}
                />
              ))}
            </span>
            <span className="font-body text-[10px] tracking-[0.28em] text-ivory/70 uppercase transition-colors group-hover:text-ivory">
              {playing ? 'Sound' : 'Music'}
            </span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            className="rounded-full border border-champagne/10 bg-ink/50 px-4 py-2.5 backdrop-blur-md"
            title="Music unavailable"
          >
            <span className="font-body text-[10px] tracking-[0.28em] text-ivory/40 uppercase">
              Music
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
