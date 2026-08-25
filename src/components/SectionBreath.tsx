import { LightRibbon } from './Decor3D'

/** Thin atmospheric bridge between major chapters — desktop only via DecorShell */
export function SectionBreath() {
  return (
    <div className="relative h-16 overflow-hidden sm:h-24" aria-hidden>
      <LightRibbon className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" opacity={0.2} />
    </div>
  )
}
