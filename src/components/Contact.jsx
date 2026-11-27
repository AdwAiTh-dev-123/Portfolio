import { useState } from 'react'
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  Send,
} from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import {
  validateContactField,
  validateContactForm,
} from '../shared/contactValidation'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'

const INITIAL_VALUES = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export default function Contact() {
  const { contact } = portfolioData
  const [copied, setCopied] = useState(false)
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitState, setSubmitState] = useState({
    status: 'idle', // 'idle' | 'submitting' | 'success' | 'error'
    feedback: '',
  })

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${contact.email}`
    }
  }

  const handleChange = (field) => (event) => {
    const nextValue = event.target.value
    setValues((prev) => ({ ...prev, [field]: nextValue }))

    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateContactField(field, nextValue),
      }))
    }

    if (submitState.status !== 'idle') {
      setSubmitState({ status: 'idle', feedback: '' })
    }
  }

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({
      ...prev,
      [field]: validateContactField(field, values[field]),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { normalized, errors: validationErrors, isValid } =
      validateContactForm(values)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    if (!isValid) {
      return
    }

    setSubmitState({ status: 'submitting', feedback: '' })

    try {
      const response = await fetch(contact.contactEndpoint || '/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(normalized),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.ok) {
        if (response.status === 400 && data.errors) {
          setErrors(data.errors)
        }
        throw new Error(
          data.message ||
            `Unable to send right now. Please email ${contact.email} directly.`
        )
      }

      setValues(INITIAL_VALUES)
      setErrors({})
      setTouched({})
      setSubmitState({
        status: 'success',
        feedback:
          data.message ||
          `Message sent directly to ${contact.email}. Thank you for reaching out!`,
      })
    } catch (error) {
      setSubmitState({
        status: 'error',
        feedback:
          error?.message ||
          `Unable to reach the mail server right now. Please email ${contact.email} directly.`,
      })
    }
  }

  const isSubmitting = submitState.status === 'submitting'

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-index mono">05. Contact</span>
            <h2 className="section-title">Let&apos;s Connect</h2>
            <p className="section-subtitle">
              Feel free to reach out for opportunities, collaborations, or a quick conversation
              about web development.
            </p>
          </div>
        </Reveal>

        <div className="contact-grid">
          <Reveal variant="left" delay={90}>
            <div className="contact-channels">
              <SpotlightCard className="contact-card">
                <div className="contact-card__row">
                  <div className="contact-card__info">
                    <span className="icon-badge">
                      <Mail size={18} />
                    </span>
                    <div>
                      <div className="contact-card__label mono">Email</div>
                      <a href={`mailto:${contact.email}`} className="contact-card__value">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="copy-btn mono"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check size={14} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </SpotlightCard>

              <SpotlightCard className="contact-card">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card__link"
                >
                  <div className="contact-card__info">
                    <span className="icon-badge">
                      <GitHubIcon size={18} />
                    </span>
                    <div>
                      <div className="contact-card__label mono">GitHub</div>
                      <div className="contact-card__value">github.com/AdwAiTh-dev-123</div>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="contact-card__arrow" />
                </a>
              </SpotlightCard>

              <SpotlightCard className="contact-card">
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card__link"
                >
                  <div className="contact-card__info">
                    <span className="icon-badge icon-badge--teal">
                      <LinkedInIcon size={18} />
                    </span>
                    <div>
                      <div className="contact-card__label mono">LinkedIn</div>
                      <div className="contact-card__value">Adwaith P — Profile</div>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="contact-card__arrow" />
                </a>
              </SpotlightCard>
            </div>
          </Reveal>

          <Reveal variant="right" delay={150}>
            <SpotlightCard className="composer-card">
              <div className="composer-card__header">
                <h3 className="card-heading">Send a Quick Message</h3>
                <p className="composer-card__sub">
                  Send a message directly to <span className="mono">{contact.email}</span>{' '}
                  right from here.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="composer-form" noValidate>
                <div className="form-row-2col">
                  <div className="form-field">
                    <label htmlFor="contact-name" className="form-label mono">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange('name')}
                      onBlur={handleBlur('name')}
                      placeholder="Alex Mercer"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="form-error" role="alert">
                        <AlertCircle size={13} />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-email" className="form-label mono">
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="form-error" role="alert">
                        <AlertCircle size={13} />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="contact-subject" className="form-label mono">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={handleChange('subject')}
                    onBlur={handleBlur('subject')}
                    placeholder="Connecting regarding web development"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    className={`form-input ${errors.subject ? 'form-input--error' : ''}`}
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" className="form-error" role="alert">
                      <AlertCircle size={13} />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="contact-message" className="form-label mono">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={handleChange('message')}
                    onBlur={handleBlur('message')}
                    placeholder="Write your message here..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`form-input form-textarea ${
                      errors.message ? 'form-input--error' : ''
                    }`}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="form-error" role="alert">
                      <AlertCircle size={13} />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {submitState.status === 'success' && (
                  <div className="form-status form-status--success" role="status">
                    <CheckCircle2 size={16} />
                    <span>{submitState.feedback}</span>
                  </div>
                )}

                {submitState.status === 'error' && (
                  <div className="form-status form-status--error" role="alert">
                    <AlertCircle size={16} />
                    <span>{submitState.feedback}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn--primary btn--full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
