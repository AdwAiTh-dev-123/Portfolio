import { Compass } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'

export default function CurrentFocus() {
  const { currentFocus } = portfolioData

  return (
    <section id="focus" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-index mono">04. Current Focus</span>
            <h2 className="section-title">Learning &amp; Building Stage</h2>
            <p className="section-subtitle">
              Where my time and energy are focused as I grow as a full-stack developer.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="focus-notice">
            <Compass size={18} className="accent-icon" />
            <p>{currentFocus.note}</p>
          </div>
        </Reveal>

        <div className="focus-grid">
          {currentFocus.pillars.map((pillar, idx) => (
            <Reveal key={pillar.index} delay={130 + idx * 80}>
              <SpotlightCard className="focus-card">
                <span className="focus-card__index mono">{pillar.index}</span>
                <h3 className="focus-card__title">{pillar.title}</h3>
                <p className="focus-card__desc">{pillar.description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
