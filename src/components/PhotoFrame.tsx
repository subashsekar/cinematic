import { motion } from 'framer-motion'
import { easing } from '../content/story'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  src: string
  alt: string
  caption?: string
  className?: string
  imgClassName?: string
  priority?: boolean
}

export function PhotoFrame({
  src,
  alt,
  caption,
  className = '',
  imgClassName = '',
  priority = false,
}: Props) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.figure
      className={`group relative overflow-hidden ${className}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduced ? 0.35 : 1.15, ease: easing }}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover object-center transition-[transform,filter] duration-[1.4s] ease-out group-hover:scale-[1.02] ${imgClassName}`}
        style={{ imageRendering: 'auto' }}
      />
      {caption ? (
        <figcaption className="mt-4 text-center font-display text-sm tracking-[0.14em] text-champagne/75 italic sm:text-base">
          {caption}
        </figcaption>
      ) : null}
    </motion.figure>
  )
}
