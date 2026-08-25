import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { siteVideos } from '../content/videos'
import { easing } from '../content/story'
import { pauseSiteMusic } from '../lib/musicBus'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { GlassOrb, GlassRing } from './Decor3D'

const momentVideos = siteVideos.filter((v) => !('isGift' in v && v.isGift))

export function VideoMoments() {
  return (
    <section className="relative">
      {momentVideos.map((clip, i) => (
        <CinematicVideo key={clip.id} src={clip.src} title={clip.title} caption={clip.caption} index={i} />
      ))}
    </section>
  )
}

type Props = {
  src: string
  title: string
  caption: string
  index: number
}

function CinematicVideo({ src, title, caption, index }: Props) {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ratio, setRatio] = useState('9 / 16')
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.12, 1, 1.06])

  useEffect(() => {
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

    return () => {
      video.removeEventListener('loadedmetadata', applyRatio)
      video.removeEventListener('play', onPlay)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-void px-4 py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(203,176,137,0.08),transparent_55%)]" />
      {index % 2 === 0 ? (
        <GlassRing className="top-[16%] right-[6%]" size={58} opacity={0.2} />
      ) : (
        <GlassOrb className="bottom-[24%] left-[7%]" size={36} opacity={0.22} />
      )}

      <motion.div
        className="relative z-10 mx-auto mb-20 w-full max-w-md overflow-hidden rounded-sm border border-champagne/20 shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
        style={{ aspectRatio: ratio, scale }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.3, delay: index * 0.05, ease: easing }}
      >
        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-contain bg-ink"
        >
          Your browser does not support this video.
        </video>
      </motion.div>

      <div className="relative z-10 w-full px-6 text-center">
        <p className="font-body text-[10px] tracking-[0.4em] text-champagne/50 uppercase">
          Footage {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="mt-3 font-display text-3xl font-light tracking-[0.08em] text-ivory sm:text-4xl">
          {title}
        </h3>
        <p className="mt-2 font-display text-base italic text-ivory/55">{caption}</p>
      </div>
    </section>
  )
}
