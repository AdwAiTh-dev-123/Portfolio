import { Briefcase, GraduationCap, MapPin } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'

export default function About() {
  const { personal, education, experience } = portfolioData

  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-index mono">01. About</span>
            <h2 className="section-title">Engineering Foundation, Software Direction</h2>
            <p className="section-subtitle">
              Combining practical industrial systems experience with modern full-stack web
              development.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <SpotlightCard className="bio-card">
            <div className="bio-card__label mono">// personal_bio</div>
            <p className="bio-card__text">{personal.bio}</p>
          </SpotlightCard>
        </Reveal>

        <div className="about-grid">
          <Reveal variant="left" delay={140}>
            <SpotlightCard className="timeline-card">
              <div className="timeline-card__header">
                <span className="icon-badge">
                  <Briefcase size={18} />
                </span>
                <div>
                  <h3 className="card-heading">Work Experience</h3>
                  <p className="card-kicker mono">Industry Background</p>
                </div>
              </div>

              <div className="timeline-list">
                {experience.map((item) => (
                  <article key={`${item.company}-${item.role}`} className="timeline-item">
                    <div className="timeline-item__top">
                      <h4 className="timeline-item__title">{item.role}</h4>
                      {item.period && (
                        <span className="meta-pill mono">{item.period}</span>
                      )}
                    </div>
                    <div className="timeline-item__org">{item.company}</div>
                    {item.location && (
                      <div className="timeline-item__location">
                        <MapPin size={13} />
                        <span>{item.location}</span>
                      </div>
                    )}
                    <p className="timeline-item__summary">{item.summary}</p>
                  </article>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal variant="right" delay={200}>
            <SpotlightCard className="timeline-card">
              <div className="timeline-card__header">
                <span className="icon-badge icon-badge--teal">
                  <GraduationCap size={18} />
                </span>
                <div>
                  <h3 className="card-heading">Education &amp; Learning</h3>
                  <p className="card-kicker mono">Academic &amp; Technical Path</p>
                </div>
              </div>

              <div className="timeline-list">
                {education.map((edu) => (
                  <article key={edu.title} className="timeline-item">
                    <div className="timeline-item__top">
                      <h4 className="timeline-item__title">{edu.title}</h4>
                      {edu.period ? (
                        <span className="meta-pill meta-pill--accent mono">
                          {edu.period}
                        </span>
                      ) : (
                        <span className="meta-pill mono">{edu.status}</span>
                      )}
                    </div>
                    {edu.institution && (
                      <div className="timeline-item__org">{edu.institution}</div>
                    )}
                    <p className="timeline-item__summary">{edu.summary}</p>
                  </article>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
