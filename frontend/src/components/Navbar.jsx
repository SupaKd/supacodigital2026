import { useState, useEffect } from 'react'
import { Icon } from '../icons'

export default function Navbar({ navLogoRef, onOpenCalendly, onOpenDevis }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className={`nav-wrap${scrolled ? ' scrolled' : ''}`}>
    <nav className="nav" aria-label="Navigation principale">
      <a href="#accueil" className="nav-logo">
        <img ref={navLogoRef} src="/logo2026.webp" alt="Supaco Digital — retour accueil" />
        <span className="nav-logo-text">Supaco<span>.</span>Digital</span>
      </a>

      <ul className="nav-links" role="list">
        {['À propos', 'Services', 'Projets', 'Contact'].map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase().replace('à ', '').replace(' ', '-')}`}>{l}</a>
          </li>
        ))}
      </ul>

      <button onClick={() => onOpenDevis(null)} className="nav-cta">
        Créer un devis
      </button>

      <button
        className="nav-burger"
        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(o => !o)}
      >
        <Icon.Burger />
      </button>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="nav-mobile" role="dialog" aria-label="Menu de navigation">
          <ul role="list">
            {['À propos', 'Services', 'Projets', 'Contact'].map(l => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase().replace('à ', '').replace(' ', '-')}`}
                  onClick={closeMenu}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <button className="nav-cta" onClick={() => { closeMenu(); onOpenDevis(null) }}>
            Créer un devis
          </button>
        </div>
      )}
    </nav>
    </div>
  )
}
