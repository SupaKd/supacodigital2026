import app from './app.js'

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`✅ Backend Supaco Digital — http://localhost:${PORT}`)
  console.log(`   Modèle IA : llama-3.3-70b-versatile (Groq)`)
  console.log(`   CORS autorisé : ${process.env.FRONTEND_URL || 'http://localhost:5173'}`)
})
