import { processContactSubmission } from '../server/mailer.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, message: 'Method not allowed.' })
  }

  const result = await processContactSubmission(req.body)
  return res.status(result.statusCode).json(result.body)
}
