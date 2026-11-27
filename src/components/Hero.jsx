import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Mail, Terminal } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'
import Reveal from './Reveal'

export default function Hero() {
  const [imgError, setImgError] = useState(false)
  const { personal, contact } = portfolioData

  return (
    <section id="home" className="hero-section">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow--primary" />
        <div className="hero-glow hero-glow--secondary" />
      </div>

      <div className="container hero-layout">
        <div className="hero-content">
          <Reveal delay={40}>
            <div className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              <span>{personal.availabilityBadge}</span>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <p className="hero-greeting mono">Hello, I&apos;m</p>
            <h1 className="hero-name">{personal.name}</h1>
          </Reveal>

          <Reveal delay={180}>
            <h2 className="hero-headline">{personal.heroHeadline}</h2>
          </Reveal>

          <Reveal delay={250}>
            <p className="hero-tagline">{personal.heroTagline}</p>
          </Reveal>

          <Reveal delay={320}>
            <div className="hero-cta-row">
              <a href="#projects" className="btn btn--primary">
                <span>View Projects</span>
                <ArrowUpRight size={17} />
              </a>
              <a href="#contact" className="btn btn--ghost">
                <span>Get in Touch</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={390}>
            <div className="hero-socials">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                aria-label="GitHub profile"
              >
                <GitHubIcon size={17} />
                <span>GitHub</span>
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon size={17} />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="social-pill"
                aria-label="Send email"
              >
                <Mail size={17} />
                <span>Email</span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={180} className="hero-visual-wrap">
          <div className="profile-frame">
            <div className="profile-frame__ring" aria-hidden="true" />
            <div className="profile-frame__card">
              <div className="profile-image-box">
                {!imgError ? (
                  <img
                    src={personal.profileImage}
                    alt={personal.profileImageAlt}
                    className="profile-image"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="profile-fallback" aria-label={personal.name}>
                    <span className="mono">{personal.initials}</span>
                  </div>
                )}
              </div>

              <div className="profile-meta">
                <div className="profile-meta__row">
                  <Terminal size={14} className="accent-icon" />
                  <span className="mono">stack: MongoDB · Express · React · Node</span>
                </div>
                <div className="profile-meta__divider" />
                <div className="profile-meta__bottom">
                  <span className="profile-meta__name">{personal.name}</span>
                  <span className="profile-meta__badge">Learning &amp; Building</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About section">
        <span className="mono">Scroll</span>
        <ArrowDown size={15} />
      </a>
    </section>
  )
}
