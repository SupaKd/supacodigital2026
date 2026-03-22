import { Icon } from '../icons'

export default function About() {
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
            Supaco Digital, c'est une agence web indépendante basée à Saint-Genis-Pouilly, créée pour aider les <mark className="about-mark">PME locales, indépendants et e-commerces</mark> à <mark className="about-mark">gagner plus de clients</mark> grâce à des sites performants.
            <br /><br />
            Pas de template générique. Chaque projet est conçu <mark className="about-mark">sur mesure</mark>, avec du code propre et une obsession pour les <mark className="about-mark">résultats concrets</mark> — plus de visibilité, plus de contacts, plus de ventes.
          </p>
        </div>

        {/* ── Stack + socials ── */}
        <div className="about-aside">
          <div className="about-stack">
            <div className="about-aside-label">Stack</div>
            <div className="about-pills">
              {['React', 'Vite', 'Node.js', 'MySQL', 'SEO', 'UI/UX Design'].map(t => (
                <span key={t} className="about-pill">{t}</span>
              ))}
            </div>
          </div>

          <div className="about-sep" />

          <div className="about-socials">
            <div className="about-aside-label">Contact</div>
            <a href="https://www.instagram.com/supa_c0/" target="_blank" rel="noreferrer" className="about-social-link">
              <Icon.Instagram /><span>@supa_c0</span>
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
