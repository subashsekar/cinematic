import { Beginning } from './components/Beginning'
import { CursorGlow } from './components/CursorGlow'
import { DateSection } from './components/DateSection'
import { FinalSection } from './components/FinalSection'
import { FloatingNav } from './components/FloatingNav'
import { FlyingHearts } from './components/FlyingHearts'
import { Gift } from './components/Gift'
import { Hero } from './components/Hero'
import { LoveLetter } from './components/LoveLetter'
import { Memories } from './components/Memories'
import { MusicPlayer } from './components/MusicPlayer'
import { SectionBreath } from './components/SectionBreath'
import { ThankYou } from './components/ThankYou'
import { VideoMoments } from './components/VideoMoments'

export default function App() {
  return (
    <div className="relative bg-void text-ivory">
      <div className="film-grain" aria-hidden />
      <FlyingHearts />
      <CursorGlow />
      <FloatingNav />
      <MusicPlayer />

      <main>
        <Hero />
        <Beginning />
        <SectionBreath />
        <ThankYou />
        <SectionBreath />
        <Memories />
        <VideoMoments />
        <SectionBreath />
        <DateSection />
        <LoveLetter />
        <Gift />
        <FinalSection />
      </main>
    </div>
  )
}
