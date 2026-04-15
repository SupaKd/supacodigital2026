import { Icon } from '../icons'
import { CALENDLY_URL } from '../config'

export default function CalendlyModal({ onClose }) {
  return (
    <div
      className="calendly-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Réserver un appel découverte"
    >
      <div className="calendly-modal" onClick={e => e.stopPropagation()}>
        <button className="calendly-close" onClick={onClose} aria-label="Fermer">
          <Icon.Close />
        </button>
        <iframe
          src={`${CALENDLY_URL}&embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1`}
          title="Réserver un appel découverte — Supaco Digital"
          loading="lazy"
          allow="payment"
        />
      </div>
    </div>
  )
}
