import { useState, useEffect, useRef } from 'react'
import { Icon } from '../icons'
import { API } from '../config'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour ! Je suis Digi 👋 l\'assistant de Supaco Digital. Quel est votre projet ?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [bubble, setBubble] = useState(false)
  const [quickReplies, setQuickReplies] = useState([
    'Créer un site vitrine', 'Boutique e-commerce', 'Application web', 'Refonte de site'
  ])
  const msgsEnd = useRef(null)
  const notifiedRef = useRef(false)

  useEffect(() => {
    msgsEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    const about = document.getElementById('propos')
    if (!about) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !notifiedRef.current) {
          notifiedRef.current = true
          setShowBadge(true)
          setBubble(true)
          setTimeout(() => setBubble(false), 5000)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(about)
    return () => observer.disconnect()
  }, [])

  const send = async (text) => {
    const content = (text || input).trim()
    if (!content || loading) return
    setInput('')
    setShowBadge(false)
    setQuickReplies([])
    const next = [...messages, { role: 'user', content }]
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply || 'Une erreur est survenue.' }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Je ne suis pas disponible pour l\'instant. Contactez-nous directement !' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat avec Digi, assistant Supaco Digital">
          <div className="chat-header">
            <div className="chat-avatar" aria-hidden="true"><Icon.Bot /></div>
            <div className="chat-header-info">
              <div className="chat-name">Digi — Assistant IA</div>
              <div className="chat-status">En ligne</div>
            </div>
            <button
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label="Fermer le chat"
            >
              <Icon.Close />
            </button>
          </div>

          <div
            className="chat-messages"
            aria-live="polite"
            aria-label="Messages du chat"
            role="log"
          >
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role === 'user' ? 'user' : 'bot'}`}>
                <div className="chat-msg-av" aria-hidden="true">{m.role === 'user' ? 'V' : 'D'}</div>
                <div className="chat-bubble">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg bot" aria-label="Digi est en train d'écrire">
                <div className="chat-msg-av" aria-hidden="true">D</div>
                <div className="chat-bubble">
                  <div className="chat-typing" aria-hidden="true">
                    <span/><span/><span/>
                  </div>
                </div>
              </div>
            )}
            <div ref={msgsEnd} />
          </div>

          {quickReplies.length > 0 && (
            <div className="chat-quick" aria-label="Réponses rapides" role="group">
              {quickReplies.map(q => (
                <button key={q} onClick={() => send(q)}>{q}</button>
              ))}
            </div>
          )}

          <div className="chat-input-row">
            <label htmlFor="chat-input-field" className="sr-only">Votre message</label>
            <input
              id="chat-input-field"
              className="chat-input"
              placeholder="Décrivez votre projet..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              disabled={loading}
            />
            <button
              className="chat-send"
              onClick={() => send()}
              disabled={loading || !input.trim()}
              aria-label="Envoyer le message"
            >
              <Icon.Send />
            </button>
          </div>
        </div>
      )}

      {bubble && !open && (
        <div className="chat-bubble-notify" aria-live="polite">
          👋 Bonjour ! Un projet en tête ? Je peux vous aider.
        </div>
      )}

      <button
        className={`chat-trigger${bubble && !open ? ' chat-trigger--notify' : ''}`}
        onClick={() => { setOpen(o => !o); setShowBadge(false); setBubble(false) }}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat avec Digi'}
        aria-expanded={open}
      >
        {open ? <Icon.Close /> : <Icon.Bot />}
        {showBadge && !open && <span className="chat-trigger-badge" aria-hidden="true" />}
      </button>
    </>
  )
}
