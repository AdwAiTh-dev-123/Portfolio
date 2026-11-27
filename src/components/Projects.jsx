import { useState } from 'react'
import { ArrowUpRight, ExternalLink, Lock, ShoppingBag, Sparkles } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import { GitHubIcon } from './BrandIcons'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'

function StorefrontPreview({ title, liveLabel, liveUrl, previewImage }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="browser-mockup"
      aria-label={`Open ${title} (${liveLabel}) live site`}
    >
      <div className="browser-mockup__chrome">
        <div className="browser-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="browser-url mono">
          <Lock size={11} />
          <span>{liveLabel}</span>
        </div>
        <ArrowUpRight size={14} className="browser-ext-icon" />
      </div>

      {previewImage && !imgFailed ? (
        <div className="browser-mockup__media">
          <img
            src={previewImage}
            alt={`${title} live website screenshot`}
            className="browser-mockup__img"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        </div>
      ) : (
        <div className="browser-mockup__viewport" aria-hidden="true">
          <div className="mock-nav">
            <span className="mock-brand mono">{title.toUpperCase()}</span>
            <div className="mock-nav-pills">
              <span />
              <span />
              <span className="mock-cart-pill">
                <ShoppingBag size={11} />
              </span>
            </div>
          </div>
          <div className="mock-banner">
            <div className="mock-banner__tag mono">MERN E-Commerce</div>
            <div className="mock-banner__title">Modern Commerce Experience</div>
            <div className="mock-banner__line" />
          </div>
        </div>
      )}
    </a>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-index mono">03. Portfolio</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Real-world applications built while mastering full-stack engineering.
            </p>
          </div>
        </Reveal>

        <div className="projects-list">
          {portfolioData.projects.map((project, idx) => (
            <Reveal key={project.id} delay={80 + idx * 80}>
              <SpotlightCard className="project-card">
                <div className="project-card__preview">
                  <StorefrontPreview
                    title={project.title}
                    liveLabel={project.liveLabel}
                    liveUrl={project.liveUrl}
                    previewImage={project.previewImage}
                  />
                </div>

                <div className="project-card__body">
                  <div className="project-card__badge mono">
                    <Sparkles size={13} />
                    <span>{project.badge}</span>
                  </div>

                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>

                  <div className="project-card__stack">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-tag mono">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-card__actions">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary"
                    >
                      <ExternalLink size={16} />
                      <span>Live Site</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--ghost"
                    >
                      <GitHubIcon size={16} />
                      <span>GitHub Repo</span>
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}

          <Reveal delay={180}>
            <div className="project-upcoming">
              <div className="project-upcoming__dot" aria-hidden="true" />
              <div>
                <p className="project-upcoming__title">More MERN projects in progress</p>
                <p className="project-upcoming__desc">
                  Actively building and publishing new full-stack applications on{' '}
                  <a
                    href={portfolioData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-link"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
