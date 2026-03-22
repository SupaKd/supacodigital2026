import request from 'supertest'
import app from '../app.js'

describe('GET /api/health', () => {
  it('retourne status 200 avec ok et le modèle', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
    expect(res.body.model).toBe('llama-3.3-70b-versatile')
  })

  it('retourne 404 sur une route inconnue', async () => {
    const res = await request(app).get('/api/inexistant')
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Route introuvable.')
  })
})
