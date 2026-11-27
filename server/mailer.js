import nodemailer from 'nodemailer'
import { validateContactForm } from '../src/shared/contactValidation.js'

const DEFAULT_RECIPIENT = 'adwaith87140@gmail.com'

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function sanitizeHeaderValue(value = '') {
  return String(value).replace(/[\r\n]+/g, ' ').trim()
}

function formatMessageHtml(message) {
  return escapeHtml(message).replace(/\r?\n/g, '<br />')
}

export function buildContactEmailHtml({
  name,
  email,
  subject,
  message,
  receivedAt = new Date(),
}) {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeSubject = escapeHtml(subject)
  const safeMessageHtml = formatMessageHtml(message)

  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: ${subject}`
  )}`

  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(receivedAt)

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Portfolio Message</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0b0f17;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#0b0f17;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 20px 45px rgba(0,0,0,0.35);">
            <!-- Top accent bar -->
            <tr>
              <td style="height:4px;background:linear-gradient(90deg,#38bdf8,#2dd4bf);font-size:0;line-height:0;">&nbsp;</td>
            </tr>

            <!-- Header -->
            <tr>
              <td style="background-color:#0f172a;padding:28px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <div style="display:inline-block;padding:6px 10px;border-radius:8px;background-color:#1e293b;border:1px solid #334155;color:#38bdf8;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;font-weight:700;letter-spacing:1.2px;">
                        AP &middot; PORTFOLIO
                      </div>
                      <h1 style="margin:14px 0 6px;font-size:22px;line-height:1.3;font-weight:700;color:#f8fafc;">
                        New Contact Message
                      </h1>
                      <p style="margin:0;font-size:14px;color:#94a3b8;">
                        Someone reached out via your portfolio contact form.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Sender Metadata -->
            <tr>
              <td style="padding:28px 32px 12px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e2e8f0;border-radius:12px;background-color:#f8fafc;">
                  <tr>
                    <td style="padding:14px 18px;border-bottom:1px solid #e2e8f0;width:110px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;color:#64748b;">
                      From
                    </td>
                    <td style="padding:14px 18px;border-bottom:1px solid #e2e8f0;font-size:14px;font-weight:600;color:#0f172a;">
                      ${safeName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 18px;border-bottom:1px solid #e2e8f0;width:110px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;color:#64748b;">
                      Email
                    </td>
                    <td style="padding:14px 18px;border-bottom:1px solid #e2e8f0;font-size:14px;">
                      <a href="mailto:${safeEmail}" style="color:#0284c7;text-decoration:none;font-weight:500;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 18px;border-bottom:1px solid #e2e8f0;width:110px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;color:#64748b;">
                      Subject
                    </td>
                    <td style="padding:14px 18px;border-bottom:1px solid #e2e8f0;font-size:14px;font-weight:600;color:#0f172a;">
                      ${safeSubject}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 18px;width:110px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;color:#64748b;">
                      Received
                    </td>
                    <td style="padding:14px 18px;font-size:13px;color:#475569;">
                      ${escapeHtml(formattedDate)} IST
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Message Body -->
            <tr>
              <td style="padding:16px 32px 24px;">
                <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#64748b;margin-bottom:10px;">
                  Message
                </div>
                <div style="padding:20px 22px;background-color:#f8fafc;border-left:4px solid #0ea5e9;border-radius:0 12px 12px 0;font-size:15px;line-height:1.7;color:#1e293b;">
                  ${safeMessageHtml}
                </div>
              </td>
            </tr>

            <!-- Quick Reply CTA -->
            <tr>
              <td style="padding:0 32px 32px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="border-radius:10px;background-color:#0f172a;">
                      <a href="${replyHref}" style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:600;color:#38bdf8;text-decoration:none;">
                        Reply to ${safeName} &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 32px;background-color:#f1f5f9;border-top:1px solid #e2e8f0;font-size:12px;line-height:1.5;color:#64748b;">
                Sent from Adwaith P&apos;s Portfolio Website. You can click <strong>Reply</strong> in your email client to respond directly to <span style="color:#334155;">${safeEmail}</span>.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function buildContactEmailText({ name, email, subject, message }) {
  return [
    'New Portfolio Contact Message',
    '=============================',
    `From: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '',
    'Message:',
    message,
  ].join('\n')
}

function getTransportConfig(env = process.env) {
  const user = (env.SMTP_USER || '').trim()
  // Strip spaces so 16-char Gmail App Passwords work cleanly whether pasted with or without spaces
  const pass = (env.SMTP_PASS || '').replace(/\s+/g, '').trim()

  if (!user || !pass) {
    return null
  }

  const host = (env.SMTP_HOST || '').trim()
  if (host) {
    const port = Number(env.SMTP_PORT || 587)
    const secure = env.SMTP_SECURE
      ? env.SMTP_SECURE === 'true'
      : port === 465

    return {
      host,
      port,
      secure,
      auth: { user, pass },
    }
  }

  return {
    service: 'gmail',
    auth: { user, pass },
  }
}

export async function sendContactEmail(payload, env = process.env) {
  const transportConfig = getTransportConfig(env)
  if (!transportConfig) {
    const err = new Error(
      'Email server is not configured yet. Set SMTP_USER and SMTP_PASS in your .env file.'
    )
    err.statusCode = 503
    throw err
  }

  const transporter = nodemailer.createTransport(transportConfig)
  const recipient = (env.CONTACT_TO_EMAIL || transportConfig.auth.user || DEFAULT_RECIPIENT).trim()
  const safeSubject = sanitizeHeaderValue(payload.subject)
  const safeName = sanitizeHeaderValue(payload.name)

  await transporter.sendMail({
    from: `"${safeName} (Portfolio)" <${transportConfig.auth.user}>`,
    to: recipient,
    replyTo: `"${safeName}" <${sanitizeHeaderValue(payload.email)}>`,
    subject: `[Portfolio] ${safeSubject}`,
    text: buildContactEmailText(payload),
    html: buildContactEmailHtml(payload),
  })

  return { recipient }
}

export async function processContactSubmission(body, env = process.env) {
  const { normalized, errors, isValid } = validateContactForm(body)

  if (!isValid) {
    return {
      statusCode: 400,
      body: {
        ok: false,
        message: 'Please correct the highlighted fields and try again.',
        errors,
      },
    }
  }

  try {
    const { recipient } = await sendContactEmail(normalized, env)
    return {
      statusCode: 200,
      body: {
        ok: true,
        message: `Message sent directly to ${recipient}. Thank you for reaching out!`,
      },
    }
  } catch (error) {
    const statusCode = error?.statusCode || 500
    const isAuthError = error?.code === 'EAUTH' || error?.responseCode === 535

    return {
      statusCode,
      body: {
        ok: false,
        message: isAuthError
          ? 'SMTP authentication failed. Double-check SMTP_USER and your Gmail App Password in .env.'
          : error?.message || 'Unable to send email right now. Please try again later.',
      },
    }
  }
}
