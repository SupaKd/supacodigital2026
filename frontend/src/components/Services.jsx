import { useState } from 'react'
import { Icon } from '../icons'

const plans = [
  {
    id: 'starter',
    name: 'STARTER',
    contactValue: 'Starter — 99€/mois',
    price: 99,
    setup: 199,
    commitment: 'Engagement 12 mois',
    color: 'var(--cyan)',
    glow: 'rgba(0,229,255,.15)',
    popular: false,
    surMesure: true,
    cta: 'Choisir Starter',
    sections: [
      {
        label: 'VOTRE SITE',
        features: [
          { text: "Jusqu'à 5 pages", included: true },
          { text: 'Design responsive (mobile & desktop)', included: true },
          { text: 'Formulaire de contact', included: true },
          { text: 'Nom de domaine + hébergement offerts 1 an', included: true },
          { text: 'Livraison en ~7 jours', included: true },
          { text: 'SEO optimisé', included: false },
          { text: 'Blog / actualités', included: false },
          { text: 'Paiement en ligne', included: false },
        ],
      },
      {
        label: 'SUIVI INCLUS',
        features: [
          { text: '1 modification/mois', included: true },
          { text: 'Corrections de bugs', included: true },
          { text: 'Mises à jour & sécurité', included: true },
          { text: 'Sauvegardes automatiques', included: true },
          { text: 'Support email — réponse sous 72h', included: true },
          { text: 'Accès Google Analytics', included: false },
          { text: 'Formation à la prise en main', included: false },
        ],
      },
    ],
  },
  {
    id: 'pro',
    name: 'PRO',
    contactValue: 'Pro — 149€/mois',
    price: 149,
    setup: 299,
    commitment: 'Engagement 12 mois',
    color: '#1a6bff',
    glow: 'rgba(26,107,255,.2)',
    popular: true,
    surMesure: true,
    cta: 'Choisir Pro',
    sections: [
      {
        label: 'VOTRE SITE',
        features: [
          { text: "Jusqu'à 10 pages", included: true },
          { text: 'Design responsive (mobile & desktop)', included: true },
          { text: 'Formulaire de contact', included: true },
          { text: 'Nom de domaine + hébergement offerts 1 an', included: true },
          { text: 'Livraison en ~7 jours', included: true },
          { text: 'SEO on-page optimisé (balises, vitesse, structure)', included: true },
          { text: 'Blog & galerie de réalisations', included: true },
          { text: 'Paiement en ligne', included: false },
        ],
      },
      {
        label: 'SUIVI INCLUS',
        features: [
          { text: '3 modifications/mois', included: true },
          { text: 'Corrections de bugs', included: true },
          { text: 'Mises à jour & sécurité', included: true },
          { text: 'Sauvegardes automatiques', included: true },
          { text: 'Accès Google Analytics', included: true },
          { text: 'Support email — réponse sous 48h', included: true },
          { text: 'Formation à la prise en main', included: true },
        ],
      },
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-COMMERCE',
    contactValue: 'E-Commerce — 249€/mois',
    price: 249,
    setup: 499,
    commitment: 'Engagement 12 mois',
    color: '#a855f7',
    glow: 'rgba(168,85,247,.15)',
    popular: false,
    noCommission: true,
    cta: 'Choisir E-commerce',
    sections: [
      {
        label: 'VOTRE SITE',
        features: [
          { text: 'Produits illimités', included: true },
          { text: 'Design responsive (mobile & desktop)', included: true },
          { text: 'Formulaire de contact', included: true },
          { text: 'Nom de domaine + hébergement offerts 1 an', included: true },
          { text: 'Livraison en ~2-3 semaines', included: true },
          { text: 'SEO on-page optimisé + Blog', included: true },
          { text: 'Paiement en ligne', included: true },
          { text: 'Dashboard admin', included: true },
          { text: 'Gestion des stocks incluse', included: true },
          { text: 'Configuration modes de livraison', included: true },
          { text: 'Intégration de vos produits (jusqu\'à 30 réf.)', included: true },
        ],
      },
      {
        label: 'SUIVI INCLUS',
        features: [
          { text: '5 modifications/mois', included: true },
          { text: 'Corrections de bugs', included: true },
          { text: 'Mises à jour & sécurité', included: true },
          { text: 'Sauvegardes automatiques', included: true },
          { text: 'Accès Google Analytics', included: true },
          { text: 'Support email — réponse sous 24h', included: true },
          { text: 'Formation à la prise en main', included: true },
        ],
      },
    ],
  },
  {
    id: 'webapp',
    name: 'APP RESTAURANT',
    contactValue: 'App Restaurant — 249€/mois',
    price: 249,
    setup: 990,
    commitment: 'Engagement 12 mois',
    color: '#22c55e',
    glow: 'rgba(34,197,94,.15)',
    popular: false,
    noCommissionResto: true,
    cta: 'Choisir App Restaurant',
    sections: [
      {
        label: 'VOTRE APP',
        features: [
          { text: 'Menu en ligne consultable', included: true },
          { text: 'Commande à emporter & livraison', included: true },
          { text: 'Paiement en ligne intégré', included: true },
          { text: 'Dashboard gérant (plats, commandes)', included: true },
          { text: 'Design responsive (mobile & desktop)', included: true },
          { text: 'Nom de domaine + hébergement offerts 1 an', included: true },
          { text: 'SEO optimisé', included: true },
        ],
      },
      {
        label: 'SUIVI INCLUS',
        features: [
          { text: '3 mises à jour de contenu/mois', included: true },
          { text: 'Corrections de bugs', included: true },
          { text: 'Mises à jour & sécurité', included: true },
          { text: 'Sauvegardes automatiques', included: true },
          { text: 'Accès Google Analytics', included: true },
          { text: 'Formation à la prise en main', included: true },
          { text: 'Support email — réponse sous 24h', included: true },
          { text: 'Nouvelles fonctionnalités', included: false },
        ],
      },
    ],
  },
]

function PricingCard({ plan, annual, showArrow, onOpenDevis }) {
  const monthlyPrice = annual && plan.price
    ? Math.round(plan.price * 0.85)
    : plan.price

  const savings = plan.price ? Math.round(plan.price * 0.15 * 24) : null

  return (
    <div
      className={`pricing-card${plan.popular ? ' pricing-card--popular' : ''}`}
      style={{ '--plan-color': plan.color, '--plan-glow': plan.glow }}
    >
      {plan.popular && (
        <div className="pricing-badge">Le plus populaire</div>
      )}
      {showArrow && (
        <span className="pricing-swipe-arrow-fixed">→</span>
      )}

      <div className="pricing-header">
        <div className="pricing-name">{plan.name}</div>

        <div className="pricing-price">
          {plan.price ? (
            <>
              <span className="pricing-amount">{monthlyPrice}</span>
              <span className="pricing-unit"> €/mois</span>
            </>
          ) : (
            <span className="pricing-amount pricing-amount--devis">Sur devis</span>
          )}
        </div>

        <div className="pricing-setup">
          {plan.setup
            ? `Mise en place : ${plan.setup} €`
            : 'Mise en place : Sur devis'}
        </div>

        <div className="pricing-commitment">
          {plan.commitment === 'Selon projet' ? 'Selon projet' : `Engagement ${annual ? '24' : '12'} mois`}
        </div>

        {annual && savings && (
          <div className="pricing-savings">
            <span className="pricing-savings-icon">🎉</span>
            Vous économisez <strong>{savings} €</strong> sur 24 mois
          </div>
        )}
      </div>

      {plan.surMesure && (
        <div className="pricing-sur-mesure">
          <span className="pricing-sur-mesure-icon">✦</span>
          <span>100% sur mesure — zéro template</span>
          <span className="pricing-sur-mesure-sub">Identité unique, rien que pour vous</span>
        </div>
      )}
      {plan.noCommissionResto && (
        <div className="pricing-no-commission-resto">
          <span className="pricing-no-commission-icon">🍽️</span>
          <span>0% de commission sur vos commandes</span>
          <span className="pricing-no-commission-vs">vs Uber Eats jusqu'à 30%</span>
        </div>
      )}
      {plan.noCommission && (
        <div className="pricing-no-commission">
          <span className="pricing-no-commission-icon">🚫</span>
          <span>0% de commission sur vos ventes</span>
          <span className="pricing-no-commission-vs">vs Shopify jusqu'à 2%</span>
        </div>
      )}

      <div className="pricing-divider" />

      {plan.sections.map(section => (
        <div key={section.label} className="pricing-section">
          <div className="pricing-section-label">{section.label}</div>
          <ul className="pricing-features">
            {section.features.map(f => (
              <li key={f.text} className={`pricing-feature${f.included ? '' : ' pricing-feature--off'}`}>
                {f.included
                  ? <Icon.Check />
                  : <Icon.XMark />}
                {f.text}
              </li>
            ))}
          </ul>
          <div className="pricing-divider" />
        </div>
      ))}

      <button
        className="pricing-cta"
        onClick={() => onOpenDevis(plan.id)}
      >
        {plan.cta}
        <span className="pricing-cta-arrow">↗</span>
      </button>
    </div>
  )
}

const faqs = [
  {
    q: "Est-ce que je garde mon site si j'arrête l'abonnement ?",
    a: "Non. Le site est hébergé et maintenu dans le cadre de l'abonnement. Si vous résiliez, vous récupérez l'ensemble des fichiers sources pour les confier à un autre prestataire.",
  },
  {
    q: "Que se passe-t-il à la fin de l'engagement 12 ou 24 mois ?",
    a: "L'abonnement se renouvelle tacitement mois par mois. Vous pouvez résilier à tout moment avec un préavis de 30 jours.",
  },
  {
    q: "La mise en place est-elle payée en une seule fois ?",
    a: "Oui, la mise en place est un frais unique réglé au démarrage. Elle couvre la conception, le développement et la mise en ligne de votre site.",
  },
  {
    q: "Puis-je changer d'offre en cours d'engagement ?",
    a: "Oui, vous pouvez monter en gamme à tout moment. La différence de prix est proratisée sur le mois en cours.",
  },
  {
    q: "Combien de temps pour avoir mon site en ligne ?",
    a: "Starter et Pro : environ 1 semaine. E-Commerce : 2 à 3 semaines. Application Web : selon le cahier des charges, nous définissons ensemble le planning.",
  },
  {
    q: "Que comprend exactement 'Mises à jour & sécurité incluses' ?",
    a: "Mises à jour du CMS, des plugins et des dépendances, surveillance de sécurité, sauvegardes régulières. Vous n'avez rien à gérer techniquement.",
  },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <div className="faq-wrap">
      <div className="faq-title">Questions fréquentes</div>
      <div className="faq-list">
        {faqs.map((item, i) => (
          <div key={i} className={`faq-item${open === i ? ' faq-item--open' : ''}`}>
            <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
              {item.q}
              <span className="faq-chevron">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <div className="faq-a">{item.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Services({ onOpenDevis }) {
  const [plan24, setPlan24] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  function handleScroll(e) {
    const el = e.currentTarget
    const index = Math.round(el.scrollLeft / el.offsetWidth)
    setActiveIndex(index)
  }

  return (
    <section className="section" id="services">
      <div className="section-label">Tarifs</div>
      <h2 className="section-title">Choisissez votre <em>offre</em></h2>

      <div className="pricing-toggle-wrap">
        <span className={`pricing-toggle-label${!plan24 ? ' pricing-toggle-label--active' : ''}`}>
          12 mois
        </span>
        <button
          className={`pricing-toggle${plan24 ? ' pricing-toggle--on' : ''}`}
          onClick={() => setPlan24(v => !v)}
          aria-label="Basculer vers 24 mois"
        >
          <span className="pricing-toggle-thumb" />
        </button>
        <span className={`pricing-toggle-label${plan24 ? ' pricing-toggle-label--active' : ''}`}>
          24 mois
        </span>
        <span className="pricing-save-badge">-15%</span>
      </div>

      <div className="pricing-grid" onScroll={handleScroll}>
        {plans.map((plan, i) => (
          <PricingCard key={plan.id} plan={plan} annual={plan24} showArrow={i < plans.length - 1} onOpenDevis={onOpenDevis} />
        ))}
      </div>

      <div className="pricing-swipe-hint">
        <span>Glisser</span>
        <span className="pricing-swipe-arrow">→</span>
      </div>

      <div className="pricing-slider-dots">
        {plans.map((_, i) => (
          <div
            key={i}
            className={`pricing-slider-dot${activeIndex === i ? ' pricing-slider-dot--active' : ''}`}
          />
        ))}
      </div>

      <FAQ />
    </section>
  )
}
