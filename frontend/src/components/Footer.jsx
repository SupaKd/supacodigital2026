import { useState } from 'react'
import LegalModal from './LegalModal'

export default function Footer() {
  const [legal, setLegal] = useState(null)

  return (
    <>
      <footer className="footer">
        <ul className="footer-links">
          <li><a href="#accueil">Accueil</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#projets">Projets</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="footer-bottom">
          <div className="footer-copy">
            © 2026 <span>Supaco Digital</span> — Tous droits réservés
          </div>
          <ul className="footer-legal">
            <li><button onClick={() => setLegal('mentions')}>Mentions légales</button></li>
            <li><button onClick={() => setLegal('privacy')}>Politique de confidentialité</button></li>
          </ul>
        </div>
      </footer>
      {legal && <LegalModal type={legal} onClose={() => setLegal(null)} />}
    </>
  )
}
