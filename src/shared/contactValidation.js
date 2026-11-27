export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeContactPayload(values = {}) {
  return {
    name: typeof values.name === 'string' ? values.name.trim() : '',
    email: typeof values.email === 'string' ? values.email.trim() : '',
    subject: typeof values.subject === 'string' ? values.subject.trim() : '',
    message: typeof values.message === 'string' ? values.message.trim() : '',
  }
}

export function validateContactField(field, value) {
  const trimmed = typeof value === 'string' ? value.trim() : ''

  switch (field) {
    case 'name':
      if (!trimmed) return 'Please enter your name.'
      if (trimmed.length < 2) return 'Name must be at least 2 characters.'
      if (trimmed.length > 100) return 'Name must be 100 characters or fewer.'
      return ''
    case 'email':
      if (!trimmed) return 'Please enter your email address.'
      if (!EMAIL_PATTERN.test(trimmed) || trimmed.length > 254) {
        return 'Please enter a valid email address.'
      }
      return ''
    case 'subject':
      if (!trimmed) return 'Please enter a subject.'
      if (trimmed.length < 3) return 'Subject must be at least 3 characters.'
      if (trimmed.length > 160) return 'Subject must be 160 characters or fewer.'
      return ''
    case 'message':
      if (!trimmed) return 'Please write a message.'
      if (trimmed.length < 10) return 'Message should be at least 10 characters.'
      if (trimmed.length > 4000) return 'Message must be 4000 characters or fewer.'
      return ''
    default:
      return ''
  }
}

export function validateContactForm(values = {}) {
  const normalized = normalizeContactPayload(values)
  const errors = {
    name: validateContactField('name', normalized.name),
    email: validateContactField('email', normalized.email),
    subject: validateContactField('subject', normalized.subject),
    message: validateContactField('message', normalized.message),
  }

  return {
    normalized,
    errors,
    isValid: !Object.values(errors).some(Boolean),
  }
}
