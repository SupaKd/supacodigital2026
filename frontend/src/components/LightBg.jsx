import { useEffect, useRef } from 'react'
import './LightBg.css'

/**
 * Orbes qui respirent + cursor glow pour les sections light mode.
 * variant : 'a' | 'b' | 'c' | 'd' — positions différentes par section
 */
export default function LightBg({ variant = 'a' }) {
  const glowRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    const section = glow?.closest('section')
    if (!glow || !section) return

    sectionRef.current = section

    const onMove = (e) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      glow.style.opacity = '1'
    }

    const onLeave = () => {
      glow.style.opacity = '0'
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className={`lbg lbg--${variant}`} aria-hidden="true">
      <div className="lbg-blob lbg-blob--1" />
      <div className="lbg-blob lbg-blob--2" />
      <div className="lbg-blob lbg-blob--3" />
      <div className="lbg-cursor" ref={glowRef} />
    </div>
  )
}
