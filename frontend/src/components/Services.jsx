import { useRef } from 'react'
import { Icon } from '../icons'

const services = [
  {
    icon: <Icon.Globe />, num: '01', title: 'Sites Vitrine & Landing Pages',
    desc: 'Des sites web percutants qui convertissent vos visiteurs en clients. Design unique, rapide et optimisé pour le référencement.',
    list: ['Design sur-mesure', 'Mobile-first', 'SEO optimisé', 'Performance 90+/100'],
    color: 'var(--cyan)',
    glow: 'rgba(0,229,255,.18)',
  },
  {
    icon: <Icon.Smartphone />, num: '02', title: 'E-commerce & Boutiques',
    desc: "Vendez en ligne avec une boutique professionnelle. Gestion des paiements, stocks, et expérience d'achat fluide.",
    list: ['Boutique sur-mesure', 'Paiement sécurisé', 'Gestion des stocks', 'Analytics intégré'],
    color: '#1a6bff',
    glow: 'rgba(26,107,255,.18)',
  },
  {
    icon: <Icon.Code />, num: '03', title: 'Applications Web',
    desc: 'Des applications métier sur mesure pour automatiser vos processus et offrir une expérience utilisateur exceptionnelle.',
    list: ['React / Vite / Node.js', 'API REST', 'MySQL', 'Déploiement cloud'],
    color: '#a855f7',
    glow: 'rgba(168,85,247,.18)',
  },
  {
    icon: <Icon.Search />, num: '04', title: 'SEO & Performance',
    desc: 'Améliorez votre visibilité sur Google et accélérez votre site. Plus de trafic organique, plus de clients.',
    list: ['Audit technique', 'Core Web Vitals', 'Stratégie contenu', 'Suivi mensuel'],
    color: '#22c55e',
    glow: 'rgba(34,197,94,.18)',
  },
  {
    icon: <Icon.Zap />, num: '05', title: 'Refonte & Modernisation',
    desc: "Votre site actuel ne convertit plus ? Je le transforme en outil de vente performant qui reflète votre image.",
    list: ['Audit UX complet', 'Nouveau design', 'Migration sécurisée', 'Formation & passation'],
    color: '#f59e0b',
    glow: 'rgba(245,158,11,.18)',
  },
  {
    icon: <Icon.Shield />, num: '06', title: 'Maintenance & Support',
    desc: 'Votre site en bonnes mains. Mises à jour, sauvegardes, sécurité et interventions rapides incluses.',
    list: ['Mises à jour régulières', 'Sauvegardes quotidiennes', 'Support réactif', 'Rapport mensuel'],
    color: '#ea4335',
    glow: 'rgba(234,67,53,.18)',
  },
]

function SvcCard({ icon, num, title, desc, list, color, glow }) {
  const cardRef = useRef(null)
  const spotRef = useRef(null)

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    spotRef.current.style.transform = `translate(${x - 150}px, ${y - 150}px)`
  }

  return (
    <div
      className="svc-card"
      ref={cardRef}
      onMouseMove={onMove}
      style={{ '--svc-color': color, '--svc-glow': glow }}
    >
      {/* Watermark numéro */}
      <span className="svc-watermark">{num}</span>

      {/* Cursor spot */}
      <div className="svc-spot" ref={spotRef} />

      {/* Bordures animées */}
      <div className="svc-border-top" />
      <div className="svc-border-right" />
      <div className="svc-border-bottom" />
      <div className="svc-border-left" />

      {/* Contenu */}
      <div className="svc-card-top">
        <span className="svc-num">{num}</span>
        <div className="svc-icon-wrap">
          <div className="svc-icon-halo" />
          <div className="svc-icon">{icon}</div>
        </div>
      </div>

      <div className="svc-title">{title}</div>

      <p className="svc-desc">{desc}</p>

      <ul className="svc-list">
        {list.map(i => <li key={i}>{i}</li>)}
      </ul>

      {/* Barre de progression bas */}
      <div className="svc-progress" />
    </div>
  )
}

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="section-label">Services</div>
      <h2 className="section-title">Ce que je <em>fais</em></h2>
      <div className="svc-grid">
        {services.map(s => <SvcCard key={s.num} {...s} />)}
      </div>
    </section>
  )
}
