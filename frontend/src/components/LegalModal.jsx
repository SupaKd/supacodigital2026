import { useEffect, useRef } from 'react'

export default function LegalModal({ type, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = e => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'Tab') {
        const focusable = closeRef.current?.closest('[role="dialog"]')?.querySelectorAll(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault()
          ;(e.shiftKey ? last : first).focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const isMentions = type === 'mentions'

  return (
    <div className="legal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={isMentions ? 'Mentions légales' : 'Politique de confidentialité'}>
      <div className="legal-modal" onClick={e => e.stopPropagation()}>
        <div className="legal-header">
          <h2 className="legal-title">{isMentions ? 'Mentions légales' : 'Politique de confidentialité'}</h2>
          <button className="legal-close" onClick={onClose} aria-label="Fermer" ref={closeRef}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="legal-body">
          {isMentions ? (
            <>
              <h3>Éditeur du site</h3>
              <p>Supaco Digital<br />
              Propriétaire : Kevin<br />
              Adresse : Saint-Genis-Pouilly, France<br />
              Email : <a href="mailto:contact@supaco-digital.com">contact@supaco-digital.com</a><br />
              SIRET : en cours de mise à jour</p>

              <h3>Hébergeur</h3>
              <p>Hostinger International Ltd<br />
              61 Lordou Vironos Street, 6023 Larnaca, Chypre<br />
              <a href="https://www.hostinger.fr" target="_blank" rel="noreferrer">www.hostinger.fr</a></p>

              <h3>Propriété intellectuelle</h3>
              <p>L'ensemble du contenu de ce site (textes, images, graphismes, code) est la propriété exclusive de Supaco Digital. Toute reproduction sans autorisation est interdite.</p>

              <h3>Responsabilité</h3>
              <p>Supaco Digital s'efforce d'assurer l'exactitude des informations publiées mais ne saurait être tenu responsable des erreurs ou omissions.</p>
            </>
          ) : (
            <>
              <h3>Responsable du traitement</h3>
              <p>Supaco Digital — Kevin<br />
              Saint-Genis-Pouilly, France<br />
              Email : <a href="mailto:contact@supaco-digital.com">contact@supaco-digital.com</a></p>

              <h3>Données collectées</h3>
              <p>Lors de l'utilisation du formulaire de contact, nous collectons : nom, adresse email, téléphone (optionnel), service souhaité et message. Ces données sont utilisées uniquement pour répondre à votre demande.</p>
              <p>Le chatbot IA peut traiter les messages que vous lui envoyez afin de vous apporter une réponse automatisée.</p>

              <h3>Durée de conservation</h3>
              <p>Vos données sont conservées pendant une durée maximale de 3 ans à compter de votre dernier contact, puis supprimées.</p>

              <h3>Vos droits</h3>
              <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition. Pour exercer ces droits, contactez-nous à <a href="mailto:contact@supaco-digital.com">contact@supaco-digital.com</a>.</p>

              <h3>Cookies</h3>
              <p>Ce site n'utilise pas de cookies de traçage ou publicitaires. Seuls des cookies techniques nécessaires au bon fonctionnement du site peuvent être déposés.</p>

              <h3>Sécurité</h3>
              <p>Vos données sont transmises via une connexion sécurisée (HTTPS) et ne sont jamais vendues ni transmises à des tiers à des fins commerciales.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
