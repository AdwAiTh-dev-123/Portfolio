import { Code2, Database, Layers, Server, Wrench } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'

const CATEGORY_ICONS = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  'Tools & Architecture': Wrench,
}

const MERN_FLOW = [
  { letter: 'M', name: 'MongoDB', role: 'Document Database' },
  { letter: 'E', name: 'Express.js', role: 'REST API Layer' },
  { letter: 'R', name: 'React.js', role: 'Client Interface' },
  { letter: 'N', name: 'Node.js', role: 'Server Runtime' },
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-index mono">02. Skills &amp; Stack</span>
            <h2 className="section-title">Technologies I Work With</h2>
            <p className="section-subtitle">
              Focused on full-stack JavaScript development across the MERN ecosystem.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mern-strip" aria-label="MERN Stack overview">
            <div className="mern-strip__label mono">
              <Layers size={15} />
              <span>MERN Architecture</span>
            </div>
            <div className="mern-strip__items">
              {MERN_FLOW.map((item) => (
                <div key={item.letter} className="mern-node">
                  <span className="mern-node__letter mono">{item.letter}</span>
                  <div>
                    <div className="mern-node__name">{item.name}</div>
                    <div className="mern-node__role mono">{item.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="skills-grid">
          {portfolioData.skillGroups.map((group, idx) => {
            const IconComponent = CATEGORY_ICONS[group.category] || Code2
            return (
              <Reveal key={group.category} delay={120 + idx * 70}>
                <SpotlightCard className={`skill-card skill-card--${group.accent}`}>
                  <div className="skill-card__header">
                    <span className="icon-badge">
                      <IconComponent size={18} />
                    </span>
                    <h3 className="card-heading">{group.category}</h3>
                  </div>

                  <ul className="skill-pills">
                    {group.items.map((skill) => (
                      <li key={skill.name} className="skill-pill">
                        <span className="skill-pill__name">{skill.name}</span>
                        <span className="skill-pill__tag mono">{skill.level}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
