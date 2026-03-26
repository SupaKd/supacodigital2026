import { useEffect, useState, useRef, useCallback } from 'react'
import './Loader.css'

export default function Loader({ onDone, navLogoRef }) {
  const [phase, setPhase] = useState('enter') // enter → text → fly
  const logoRef = useRef(null)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 400)
    const t2 = setTimeout(() => setPhase('fly'),  1600)
    return () => [t1, t2].forEach(clearTimeout)
  }, [])

  const flyLogo = useCallback(() => {
    const logoEl   = logoRef.current
    const targetEl = navLogoRef?.current
    if (!logoEl) { onDone(); return }

    const from = logoEl.getBoundingClientRect()
    const to   = targetEl
      ? targetEl.getBoundingClientRect()
      : { left: 40, top: 28, width: 30, height: 30 }

    const dx    = to.left + to.width  / 2 - (from.left + from.width  / 2)
    const dy    = to.top  + to.height / 2 - (from.top  + from.height / 2)
    const scale = to.height / from.height

    logoEl.style.setProperty('--fly-dx',    `${dx}px`)
    logoEl.style.setProperty('--fly-dy',    `${dy}px`)
    logoEl.style.setProperty('--fly-scale', scale)
    logoEl.classList.add('loader-logo--fly')

    setTimeout(onDone, 650)
  }, [navLogoRef, onDone])

  useEffect(() => {
    if (phase === 'fly') flyLogo()
  }, [phase, flyLogo])

  const isExit = phase === 'fly'

  return (
    <div className={`loader${isExit ? ' loader--exit' : ''}`} aria-hidden="true">
      <div className="loader-bg" />

      <div className="loader-inner">
        {/* Logo */}
        <div className="loader-logo-wrap">
          <div className={`loader-logo-glow${isExit ? ' loader-logo-glow--hide' : ''}`} />
          <img
            ref={logoRef}
            src="/logo2026.webp"
            alt=""
            className="loader-logo"
            draggable={false}
          />
        </div>

        {/* Texte */}
        <div className={`loader-text${isExit ? ' loader-text--hide' : ''}`}>
          <span className={`loader-word loader-word--1${phase !== 'enter' ? ' loader-word--in' : ''}`}>
            SUPACO
          </span>
          <span className={`loader-word loader-word--2${phase !== 'enter' ? ' loader-word--in' : ''}`}>
            DIGITAL
          </span>
        </div>

        {/* Ligne */}
        <div className={`loader-line${phase !== 'enter' ? ' loader-line--in' : ''}${isExit ? ' loader-line--hide' : ''}`} />
      </div>
    </div>
  )
}
