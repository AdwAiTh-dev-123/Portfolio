import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { processContactSubmission } from './mailer.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.resolve(__dirname, '../dist')

export function createApp() {
  const app = express()

  app.use(express.json({ limit: '32kb' }))

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true })
  })

  app.post('/api/contact', async (req, res) => {
    const result = await processContactSubmission(req.body)
    res.status(result.statusCode).json(result.body)
  })

  // Serve built frontend assets in production when dist/ exists
  if (fs.existsSync(distDir)) {
    app.use(express.static(distDir))
    app.get('/{*splat}', (req, res, next) => {
      if (req.path.startsWith('/api/')) {
        return next()
      }
      return res.sendFile(path.join(distDir, 'index.html'))
    })
  }

  return app
}

const isMainModule =
  process.argv[1] && path.resolve(process.argv[1]) === __filename

if (isMainModule) {
  const port = Number(process.env.PORT || 5000)
  const app = createApp()
  app.listen(port, () => {
    console.log(`Portfolio API server listening on http://localhost:${port}`)
  })
}
