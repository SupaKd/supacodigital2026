import { useState } from 'react'
import './FAQ.css'

const FAQS = [
  {
    q: 'Comment fonctionne le paiement ?',
    a: '10% du devis sont réglés à la commande pour lancer le projet. Le solde (90%) est dû à la livraison, une fois que vous avez validé le résultat. Aucun frais caché, aucune surprise.',
  },
  {
    q: 'Comment est établi le devis ?',
    a: 'On commence par un appel découverte gratuit de 30 minutes pour cerner votre projet, vos besoins et vos objectifs. Je vous envoie ensuite un devis détaillé sous 24h, sans engagement.',
  },
  {
    q: 'Combien de temps pour avoir mon site en ligne ?',
    a: 'Site vitrine : environ 7 jours. Site Pro : 1 à 2 semaines. E-Commerce : 2 à 3 semaines. App Restaurant : selon le cahier des charges, défini ensemble lors de l\'appel découverte.',
  },
  {
    q: 'Le nom de domaine et l\'hébergement sont-ils inclus ?',
    a: 'Non, le nom de domaine et l\'hébergement ne sont pas inclus dans le devis. Je vous accompagne pour choisir et configurer la meilleure solution selon votre projet — c\'est simple et rapide.',
  },
  {
    q: 'Est-ce que je suis propriétaire du site une fois livré ?',
    a: 'Oui, totalement. Vous récupérez l\'ensemble des fichiers sources à la livraison. Le site vous appartient, vous pouvez le confier à qui vous voulez.',
  },
  {
    q: 'Travaillez-vous avec des clients à Genève et en Suisse ?',
    a: 'Oui. Basé à Saint-Genis-Pouilly dans le Pays de Gex, je suis idéalement placé pour les entreprises frontalières. Je travaille aussi à distance pour des clients partout en France.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section faq" id="faq">
      <div className="faq-inner">
        <div className="faq-header">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Questions <em>fréquentes</em></h2>
          <p className="faq-desc">Tout ce que vous voulez savoir avant de vous lancer.</p>
        </div>

        <ul className="faq-list" role="list">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={i} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                <div className="faq-answer" aria-hidden={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
