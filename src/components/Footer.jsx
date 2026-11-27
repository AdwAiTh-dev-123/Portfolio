import { ArrowUp, Mail } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'

export default function Footer() {
  const { personal, contact } = portfolioData
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <span className="brand-mark brand-mark--sm">{personal.initials}</span>
          <div>
            <div className="footer__name">{personal.name}</div>
            <div className="footer__copy mono">
              &copy; {year} {personal.name}. Built with React.js.
            </div>
          </div>
        </div>

        <div className="footer__right">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link"
            aria-label="GitHub"
          >
            <GitHubIcon size={17} />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={17} />
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="footer-icon-link"
            aria-label="Email"
          >
            <Mail size={17} />
          </a>
          <a href="#home" className="back-to-top mono" aria-label="Back to top">
            <span>Top</span>
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
