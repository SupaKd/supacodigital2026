const reviews = [
  {
    name: 'Sophie M.',
    role: 'Gérante — Sabai Thoiry',
    text: 'Notre application de commandes a complètement transformé notre service. Les clients adorent la simplicité et nous avons réduit les erreurs de commande de 80%.',
    stars: 5,
    date: 'il y a 2 mois',
    color: '#1a73e8',
  },
  {
    name: 'Marc B.',
    role: 'Conseiller — MB Patrimoine Finance',
    text: "Site professionnel livré en un temps record. Kevin a parfaitement compris l'image que je voulais projeter à mes clients. Résultat impeccable.",
    stars: 5,
    date: 'il y a 3 mois',
    color: '#34a853',
  },
  {
    name: 'Laure D.',
    role: 'Fondatrice — Studio Créatif',
    text: 'Un vrai partenaire, pas juste un prestataire. Il anticipe les besoins, communique parfaitement et le rendu final dépasse mes attentes.',
    stars: 5,
    date: 'il y a 1 mois',
    color: '#ea4335',
  },
  {
    name: 'Thomas R.',
    role: 'Dirigeant — PME locale',
    text: "Depuis la refonte de notre site, nous recevons 3× plus de demandes de devis. L'investissement a été rentabilisé en moins de deux mois.",
    stars: 5,
    date: 'il y a 4 mois',
    color: '#fbbc04',
  },
  {
    name: 'Camille V.',
    role: 'E-commerçante',
    text: "Réactif, créatif et de bon conseil. Supaco Digital m'a aidée à lancer ma boutique dans les délais et avec un budget maîtrisé.",
    stars: 5,
    date: 'il y a 2 mois',
    color: '#9c27b0',
  },
]

function GoogleLogo() {
  return (
    <svg className="testi-google-logo" viewBox="0 0 24 24" aria-label="Google" role="img">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function Stars({ count }) {
  return (
    <div className="testi-stars" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill={i < count ? '#fbbc04' : '#e0e0e0'} aria-hidden="true" width="18" height="18">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function Card({ name, role, text, stars, date, color }) {
  return (
    <div className="testi-card" aria-label={`Avis de ${name}`}>
      <div className="testi-card-top">
        <div className="testi-author">
          <div className="testi-avatar" style={{ background: color }}>
            {name.charAt(0)}
          </div>
          <div className="testi-author-info">
            <div className="testi-name">{name}</div>
            <div className="testi-role">{role}</div>
          </div>
        </div>
        <GoogleLogo />
      </div>
      <div className="testi-rating-row">
        <Stars count={stars} />
        <span className="testi-date">{date}</span>
      </div>
      <p className="testi-text">{text}</p>
    </div>
  )
}

export default function Testimonials() {
  const doubled = [...reviews, ...reviews]

  return (
    <section className="section testimonials" id="avis" aria-label="Témoignages clients">
      <div className="section-label">Témoignages</div>
      <h2 className="section-title">Ce que disent<br /><em>mes clients</em></h2>

      <div className="testi-track-wrap" aria-hidden="true">
        <div className="testi-track">
          {doubled.map((r, i) => (
            <Card key={i} {...r} />
          ))}
        </div>
      </div>
    </section>
  )
}
