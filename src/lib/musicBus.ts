type MusicControlEvent = CustomEvent<{ playing?: boolean }>

const PAUSE_EVENT = 'cinematic:pause-music'
const RESUME_EVENT = 'cinematic:resume-music'

export function pauseSiteMusic() {
  window.dispatchEvent(new CustomEvent(PAUSE_EVENT))
}

export function resumeSiteMusic() {
  window.dispatchEvent(new CustomEvent(RESUME_EVENT))
}

export function onPauseSiteMusic(handler: () => void) {
  const listener = () => handler()
  window.addEventListener(PAUSE_EVENT, listener)
  return () => window.removeEventListener(PAUSE_EVENT, listener)
}

export function onResumeSiteMusic(handler: () => void) {
  const listener = () => handler()
  window.addEventListener(RESUME_EVENT, listener)
  return () => window.removeEventListener(RESUME_EVENT, listener)
}

export type { MusicControlEvent }
