import { Icon } from '../icons'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 20, suffix: '+', label: 'Projets livrés' },
  { value: 7,  suffix: 'j', label: 'Délai moyen' },
  { value: 100, suffix: '%', label: 'Sur mesure' },
]

export default function About() {
  const statsRef = useRef(null)
  const [vals, setVals] = useState(STATS.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const duration = 1600
        let start = null
        const step = ts => {
          if (!start) start = ts
          const p = Math.min((ts - start) / duration, 1)
          const ease = p * p
          setVals(STATS.map(s => Math.round(ease * s.value)))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section about" id="propos">
      <div className="about-inner">

        {/* ── Photo ── */}
        <div className="about-photo-wrap">
          {/* Gradient mesh */}
          <div className="about-mesh">
            <div className="about-mesh-blob about-mesh-blob--1" />
            <div className="about-mesh-blob about-mesh-blob--2" />
            <div className="about-mesh-blob about-mesh-blob--3" />
          </div>
          <div className="about-photo-frame">
            <img src="/kevin.png" alt="Kevin — Supaco Digital" className="about-photo" />
          </div>
          <div className="about-photo-tag">
            <span className="about-photo-tag-dot" />
            Disponible
          </div>
        </div>

        {/* ── Identité + bio ── */}
        <div className="about-main">
          <div className="section-label">À propos</div>
          <h2 className="about-title">
            Bonjour,<br />je suis <em>Kevin</em>
          </h2>
          <p className="about-role">Fondateur & Développeur · Supaco Digital</p>
          <p className="about-bio">
            Supaco Digital, c'est une agence web indépendante basée à Saint-Genis-Pouilly dans le Pays de Gex, créée pour aider les <mark className="about-mark">PME locales, indépendants et e-commerces</mark> à <mark className="about-mark">gagner plus de clients</mark> grâce à des sites performants.
            <br /><br />
            Pas de template générique. Chaque projet est conçu <mark className="about-mark">sur mesure</mark>, avec du code propre et une obsession pour les <mark className="about-mark">résultats concrets</mark> — plus de visibilité, plus de contacts, plus de ventes.
          </p>

          <div className="about-stats" ref={statsRef}>
            {STATS.map((s, i) => (
              <div key={s.label} className="about-stat">
                <div className="about-stat-value">
                  {vals[i]}<span className="about-stat-suffix">{s.suffix}</span>
                </div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Socials ── */}
        <div className="about-aside">
          <div className="about-socials">
            <div className="about-aside-label">Contact</div>
            <a href="https://www.instagram.com/supacodigital/" target="_blank" rel="noreferrer" className="about-social-link">
              <Icon.Instagram /><span>@supacodigital</span>
            </a>
            <a href="mailto:contact@supaco-digital.com" className="about-social-link">
              <Icon.Mail /><span>contact@supaco-digital.com</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
