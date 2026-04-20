import { useState, useEffect, useRef } from 'react'
import { Icon } from '../icons'


function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth <= 640)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const handler = e => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return mobile
}

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
          { text: 'Livraison en ~7 jours', included: true },
          { text: 'Nom de domaine + hébergement offerts 1 an', included: true },
          { text: 'SEO optimisé', included: false },
          { text: 'Blog / actualités', included: false },
          { text: 'Paiement en ligne', included: false },
        ],
      },
      {
        label: 'SUIVI INCLUS',
        features: [
          { text: '1 modification/mois', included: true },
          { text: 'Support email — réponse sous 72h', included: true },
          { text: 'Google Analytics', included: false },
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
          { text: 'Livraison en ~7 jours', included: true },
          { text: 'Nom de domaine + hébergement offerts 1 an', included: true },
          { text: 'SEO on-page optimisé', included: true },
          { text: 'Blog & galerie de réalisations', included: true },
          { text: 'Paiement en ligne', included: false },
        ],
      },
      {
        label: 'SUIVI INCLUS',
        features: [
          { text: '3 modifications/mois', included: true },
          { text: 'Support email — réponse sous 48h', included: true },
          { text: 'Google Analytics', included: true },
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
          { text: 'Paiement en ligne', included: true },
          { text: 'Dashboard admin & gestion stocks', included: true },
          { text: 'SEO on-page + Blog', included: true },
          { text: "Intégration produits (jusqu'à 30 réf.)", included: true },
          { text: 'Livraison en ~2-3 semaines', included: true },
        ],
      },
      {
        label: 'SUIVI INCLUS',
        features: [
          { text: '5 modifications/mois', included: true },
          { text: 'Support email — réponse sous 24h', included: true },
          { text: 'Google Analytics', included: true },
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
          { text: 'Commande à emporter & livraison', included: true },
          { text: 'Paiement en ligne intégré', included: true },
          { text: 'Dashboard gérant (plats, commandes)', included: true },
          { text: 'SEO optimisé', included: true },
          { text: 'Nouvelles fonctionnalités', included: false },
        ],
      },
      {
        label: 'SUIVI INCLUS',
        features: [
          { text: '3 mises à jour de contenu/mois', included: true },
          { text: 'Support email — réponse sous 24h', included: true },
          { text: 'Google Analytics', included: true },
          { text: 'Formation à la prise en main', included: true },
        ],
      },
    ],
  },
]

function PricingCard({ plan, annual, showArrow, onOpenDevis, active }) {
  const monthlyPrice = annual && plan.price
    ? Math.round(plan.price * 0.85)
    : plan.price

  const savings = plan.price ? Math.round(plan.price * 0.15 * 24) : null

  return (
    <div
      className={`pricing-card${plan.popular ? ' pricing-card--popular' : ''}${active ? ' pricing-card--active' : ''}`}
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
          <span>100% sur mesure — zéro template</span>
          <span className="pricing-sur-mesure-sub">Identité unique, rien que pour vous</span>
        </div>
      )}
      {plan.noCommissionResto && (
        <div className="pricing-no-commission-resto">
          <span>0% de commission sur vos commandes</span>
          <span className="pricing-no-commission-vs">vs Uber Eats jusqu'à 30%</span>
        </div>
      )}
      {plan.noCommission && (
        <div className="pricing-no-commission">
          <span>0% de commission sur vos ventes</span>
          <span className="pricing-no-commission-vs">vs Shopify jusqu'à 2%</span>
        </div>
      )}

      <div className="pricing-divider" />

      {plan.sections.map(section => {
        const visible = section.features
        return (
          <div key={section.label} className="pricing-section">
            <div className="pricing-section-label">{section.label}</div>
            <ul className="pricing-features">
              {visible.map(f => (
                <li key={f.text} className={`pricing-feature${f.included ? '' : ' pricing-feature--off'}`}>
                  {f.included ? <Icon.Check /> : <Icon.XMark />}
                  {f.text}
                </li>
              ))}
            </ul>
            <div className="pricing-divider" />
          </div>
        )
      })}

      <button
        className="pricing-cta"
        onClick={() => onOpenDevis(plan.id)}
      >
        {plan.cta}
        <span className="pricing-cta-arrow"><Icon.Arrow /></span>
      </button>
    </div>
  )
}


export default function Services({ onOpenDevis }) {
  const [plan24, setPlan24] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useIsMobile()
  const touchStartX = useRef(null)

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 40) return
    if (dx < 0) setActiveIndex(i => Math.min(i + 1, plans.length - 1))
    else        setActiveIndex(i => Math.max(i - 1, 0))
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

      <div
        className="pricing-grid"
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        {plans.map((plan, i) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            annual={plan24}
            showArrow={false}
            onOpenDevis={onOpenDevis}
            active={!isMobile || activeIndex === i}
          />
        ))}
      </div>

{isMobile && (
        <div className="pricing-slider-dots">
          {plans.map((_, i) => (
            <button
              key={i}
              className={`pricing-slider-dot${activeIndex === i ? ' pricing-slider-dot--active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Voir l'offre ${plans[i].name}`}
            />
          ))}
        </div>
      )}

      <div className="custom-card">
        <div className="custom-card-glow" />
        <p className="custom-card-desc">
          Vous avez un projet hors catalogue ? Marketplace, SaaS, outil métier… On développe votre application sur mesure.
        </p>
        <button className="custom-card-cta" onClick={() => onOpenDevis('custom')}>
          Discutons de votre projet
          <span className="custom-card-cta-arrow"><Icon.Arrow /></span>
        </button>
      </div>

    </section>
  )
}
