import { Icon } from '../icons'

const services = [
  {
    icon: <Icon.Globe />, num: '01', title: 'Sites Vitrine & Landing Pages',
    desc: 'Des sites web percutants qui convertissent vos visiteurs en clients. Design unique, rapide et optimisé pour le référencement.',
    list: ['Design sur-mesure', 'Mobile-first', 'SEO optimisé', 'Performance 90+/100'],
  },
  {
    icon: <Icon.Smartphone />, num: '02', title: 'E-commerce & Boutiques',
    desc: 'Vendez en ligne avec une boutique professionnelle. Gestion des paiements, stocks, et expérience d\'achat fluide.',
    list: ['Boutique sur-mesure', 'Paiement sécurisé', 'Gestion des stocks', 'Analytics intégré'],
  },
  {
    icon: <Icon.Code />, num: '03', title: 'Applications Web',
    desc: 'Des applications métier sur mesure pour automatiser vos processus et offrir une expérience utilisateur exceptionnelle.',
    list: ['React / Vite / Node.js', 'API REST', 'MySQL', 'Déploiement cloud'],
  },
  {
    icon: <Icon.Search />, num: '04', title: 'SEO & Performance',
    desc: 'Améliorez votre visibilité sur Google et accélérez votre site. Plus de trafic organique, plus de clients.',
    list: ['Audit technique', 'Core Web Vitals', 'Stratégie contenu', 'Suivi mensuel'],
  },
  {
    icon: <Icon.Zap />, num: '05', title: 'Refonte & Modernisation',
    desc: 'Votre site actuel ne convertit plus ? Je le transforme en outil de vente performant qui reflète votre image.',
    list: ['Audit UX complet', 'Nouveau design', 'Migration sécurisée', 'Formation & passation'],
  },
  {
    icon: <Icon.Shield />, num: '06', title: 'Maintenance & Support',
    desc: 'Votre site en bonnes mains. Mises à jour, sauvegardes, sécurité et interventions rapides incluses.',
    list: ['Mises à jour régulières', 'Sauvegardes quotidiennes', 'Support réactif', 'Rapport mensuel'],
  },
]

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="section-label">Services</div>
      <h2 className="section-title">Ce que je <em>fais</em></h2>
      <div className="svc-grid">
        {services.map(s => (
          <div key={s.num} className="svc-card">
            <div className="svc-card-top">
              <span className="svc-num">{s.num}</span>
              <div className="svc-icon">{s.icon}</div>
            </div>
            <div className="svc-title">{s.title}</div>
            <div className="svc-hover">
              <p className="svc-desc">{s.desc}</p>
              <ul className="svc-list">
                {s.list.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div className="svc-glow" />
          </div>
        ))}
      </div>
    </section>
  )
}
