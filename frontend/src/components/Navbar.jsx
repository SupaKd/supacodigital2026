import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '../icons'

export default function Navbar({ navLogoRef, onOpenCalendly, onOpenDevis }) {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (y < 80) {
        setVisible(true)
      } else {
        setVisible(y < lastY.current)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloque le scroll du body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const mobileMenu = menuOpen && createPortal(
    <div className="nav-mobile" role="dialog" aria-label="Menu de navigation">
      <div className="nav-mobile-header">
        <a href="#accueil" className="nav-logo" onClick={closeMenu}>
          <img src="/logo2026.webp" alt="Supaco Digital" />
          <span className="nav-logo-text">Supaco<span>.</span>Digital</span>
        </a>
        <button
          className="nav-mobile-close"
          aria-label="Fermer le menu"
          onClick={closeMenu}
        >
          <Icon.XMark />
        </button>
      </div>
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
    </div>,
    document.body
  )

  return (
    <>
      <div className={`nav-wrap${scrolled ? ' scrolled' : ''}${!visible ? ' nav-wrap--hidden' : ''}`}>
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
            {menuOpen ? <Icon.XMark /> : <Icon.Burger />}
          </button>
        </nav>
      </div>

      {mobileMenu}
    </>
  )
}
