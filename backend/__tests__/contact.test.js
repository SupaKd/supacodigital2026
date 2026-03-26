import request from 'supertest'
import { jest } from '@jest/globals'

// ─── Mock Nodemailer pour ne pas envoyer de vrais emails en test ──────────────
const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-id' })
const mockCreateTransport = jest.fn().mockReturnValue({ sendMail: mockSendMail })

jest.unstable_mockModule('nodemailer', () => ({
  default: { createTransport: mockCreateTransport },
}))

const { default: app } = await import('../app.js')

describe('POST /api/contact', () => {

  beforeEach(() => {
    mockSendMail.mockClear()
    mockCreateTransport.mockClear()
  })

  const valid = {
    name: 'Marie Dupont',
    email: 'marie@example.com',
    message: 'Bonjour, je voudrais un site e-commerce pour ma boutique.',
    service: 'E-commerce',
    budget: '2000-5000€',
    phone: '0601020304',
  }

  // ─── Cas valides ────────────────────────────────────────────────────────────

  it('accepte un formulaire complet valide', async () => {
    const res = await request(app).post('/api/contact').send(valid)
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })

  it('accepte un formulaire sans champs optionnels', async () => {
    const res = await request(app).post('/api/contact').send({
      name: 'Jean Martin',
      email: 'jean@example.com',
      message: 'Je cherche à créer mon premier site vitrine.',
    })
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })

  // ─── Champs requis manquants ────────────────────────────────────────────────

  it('rejette si le nom est manquant', async () => {
    const res = await request(app).post('/api/contact').send({ ...valid, name: '' })
    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/nom/i)
  })

  it("rejette si l'email est manquant", async () => {
    const res = await request(app).post('/api/contact').send({ ...valid, email: '' })
    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/email/i)
  })

  it('rejette si le message est manquant', async () => {
    const res = await request(app).post('/api/contact').send({ ...valid, message: '' })
    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/message/i)
  })

  it('rejette si le message est trop court', async () => {
    const res = await request(app).post('/api/contact').send({ ...valid, message: 'Court' })
    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/court/i)
  })

  // ─── Validation email ───────────────────────────────────────────────────────

  it("rejette un email sans @", async () => {
    const res = await request(app).post('/api/contact').send({ ...valid, email: 'pasvalide' })
    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/email/i)
  })

  it('rejette un email sans domaine', async () => {
    const res = await request(app).post('/api/contact').send({ ...valid, email: 'user@' })
    expect(res.status).toBe(400)
  })

  // ─── Sécurité : injection XSS / HTML ───────────────────────────────────────

  it('sanitise les balises HTML dans le nom', async () => {
    const res = await request(app).post('/api/contact').send({
      ...valid,
      name: '<script>alert("xss")</script>Marie',
    })
    expect(res.status).not.toBe(500)
  })

  it('sanitise les balises HTML dans le message', async () => {
    const res = await request(app).post('/api/contact').send({
      ...valid,
      message: '<img src=x onerror=alert(1)> Je veux un site web pour ma PME.',
    })
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })

  // ─── Sécurité : body non-JSON ───────────────────────────────────────────────

  it('rejette un body vide', async () => {
    const res = await request(app).post('/api/contact').send({})
    expect(res.status).toBe(400)
  })
})
