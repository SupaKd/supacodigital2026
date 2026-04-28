import { useEffect, useRef } from 'react'
import LightBg from './LightBg'

const CITIES = [
  { name: 'Saint-Genis-Pouilly', lon: 6.0368, lat: 46.2556, main: true },
  { name: 'Gex',                 lon: 6.0488, lat: 46.3515 },
  { name: 'Ferney-Voltaire',     lon: 6.1061, lat: 46.2520 },
  { name: 'Divonne-les-Bains',   lon: 6.1114, lat: 46.3754 },
  { name: 'Thoiry',              lon: 5.9685, lat: 46.2448 },
  { name: 'Prévessin-Moëns',     lon: 6.0722, lat: 46.2594 },
  { name: 'Ornex',               lon: 6.0953, lat: 46.2779 },
  { name: 'Cessy',               lon: 6.0820, lat: 46.3157 },
  { name: 'Crozet',              lon: 5.9929, lat: 46.2906 },
  { name: 'Genève',              lon: 6.1490, lat: 46.2044, foreign: true },
  { name: 'Nyon',                lon: 6.2340, lat: 46.3830, foreign: true },
  { name: 'Lyon',                lon: 4.8357, lat: 45.7640, remote: true },
  { name: 'Paris',               lon: 2.3522, lat: 48.8566, remote: true },
]

// Bounding box zoomé sur le Pays de Gex + région lémanique uniquement
const LON_MIN = 5.88, LON_MAX = 6.28
const LAT_MIN = 46.18, LAT_MAX = 46.45

function project(lon, lat, W, H, pad) {
  const x = pad + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (W - pad * 2)
  const y = pad + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (H - pad * 2)
  return { x, y }
}

function HoloMap() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let raf
    let t = 0

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width  = rect.width  * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      raf = requestAnimationFrame(draw)
      t += 0.012

      const W = canvas.getBoundingClientRect().width
      const H = canvas.getBoundingClientRect().height
      const pad = 32

      ctx.clearRect(0, 0, W, H)

      // ── Fond ──────────────────────────────────────────
      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7)
      bg.addColorStop(0, '#0d1535')
      bg.addColorStop(1, '#05060f')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // ── Grille scanline ───────────────────────────────
      ctx.strokeStyle = 'rgba(26,107,255,0.07)'
      ctx.lineWidth = 0.5
      const gridStep = 28
      for (let x = 0; x < W; x += gridStep) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += gridStep) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // ── Ligne de scan animée ──────────────────────────
      const scanY = (H * 0.1) + ((Math.sin(t * 0.4) * 0.5 + 0.5)) * H * 0.8
      const scanGrad = ctx.createLinearGradient(0, scanY - 6, 0, scanY + 6)
      scanGrad.addColorStop(0,   'rgba(0,229,255,0)')
      scanGrad.addColorStop(0.5, 'rgba(0,229,255,0.06)')
      scanGrad.addColorStop(1,   'rgba(0,229,255,0)')
      ctx.fillStyle = scanGrad
      ctx.fillRect(0, scanY - 6, W, 12)

      // ── Projeter les villes (sauf remote) ────────────
      const pts = CITIES
        .filter(c => !c.remote)
        .map(c => ({ ...c, ...project(c.lon, c.lat, W, H, pad) }))
      const main = pts.find(p => p.main)

      // Positions fixes pour les villes remote (coins)
      const remoteFixed = [
        { name: 'Lyon',  x: W * 0.12, y: H * 0.82, remote: true },
        { name: 'Paris', x: W * 0.08, y: H * 0.14, remote: true },
      ]

      // ── Halo zone d'intervention ──────────────────────
      const haloR = 70 + Math.sin(t) * 5
      const halo = ctx.createRadialGradient(main.x, main.y, 0, main.x, main.y, haloR)
      halo.addColorStop(0,   'rgba(26,107,255,0.18)')
      halo.addColorStop(0.6, 'rgba(26,107,255,0.06)')
      halo.addColorStop(1,   'rgba(26,107,255,0)')
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(main.x, main.y, haloR, 0, Math.PI * 2)
      ctx.fill()

      // ── Arcs animés vers villes remote (coins) ────────
      remoteFixed.forEach(p => {
        const progress = (Math.sin(t * 0.7 + p.x * 0.01) * 0.5 + 0.5)
        const mx = (main.x + p.x) / 2
        const my = (main.y + p.y) / 2 - 30

        ctx.beginPath()
        ctx.strokeStyle = 'rgba(26,107,255,0.18)'
        ctx.lineWidth = 0.8
        ctx.setLineDash([4, 6])
        ctx.moveTo(main.x, main.y)
        ctx.quadraticCurveTo(mx, my, p.x, p.y)
        ctx.stroke()
        ctx.setLineDash([])

        const bx = (1-progress)**2 * main.x + 2*(1-progress)*progress * mx + progress**2 * p.x
        const by = (1-progress)**2 * main.y + 2*(1-progress)*progress * my + progress**2 * p.y
        ctx.beginPath()
        ctx.arc(bx, by, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,229,255,0.8)'
        ctx.shadowColor = '#00e5ff'
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // ── Connexions locales ─────────────────────────────
      pts.filter(p => !p.main && !p.remote && !p.foreign).forEach(p => {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(26,107,255,0.2)'
        ctx.lineWidth = 0.6
        ctx.moveTo(main.x, main.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      })

      // ── Pins villes ───────────────────────────────────
      ;[...pts, ...remoteFixed].forEach(p => {
        const pulse = Math.sin(t * 2 + p.lon) * 0.5 + 0.5

        const color  = p.main    ? '#00e5ff'
                     : p.foreign ? '#a855f7'
                     : p.remote  ? 'rgba(26,107,255,0.5)'
                     : '#1a6bff'

        // Anneau pulsant (sauf remote)
        if (!p.remote) {
          const ringR = (p.main ? 10 : 6) + pulse * (p.main ? 6 : 3)
          ctx.beginPath()
          ctx.arc(p.x, p.y, ringR, 0, Math.PI * 2)
          ctx.strokeStyle = p.main
            ? `rgba(0,229,255,${0.15 + pulse * 0.15})`
            : p.foreign
            ? `rgba(168,85,247,${0.2 + pulse * 0.1})`
            : `rgba(26,107,255,${0.15 + pulse * 0.1})`
          ctx.lineWidth = p.main ? 1.5 : 1
          ctx.stroke()
        }

        // Point central
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.main ? 5 : p.remote ? 2.5 : 3.5, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.shadowColor = color
        ctx.shadowBlur = p.main ? 14 : 6
        ctx.fill()
        ctx.shadowBlur = 0

        // Centre blanc
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.main ? 2 : 1.2, 0, Math.PI * 2)
        ctx.fillStyle = '#fff'
        ctx.fill()

        // Label
        const fontSize = p.main ? 11 : p.foreign ? 9.5 : p.remote ? 8.5 : 9
        ctx.font = `${p.main ? 700 : 600} ${fontSize}px 'Barlow Condensed', sans-serif`
        ctx.fillStyle = p.main    ? '#00e5ff'
                      : p.foreign ? 'rgba(168,85,247,0.95)'
                      : p.remote  ? 'rgba(100,130,200,0.6)'
                      : 'rgba(180,200,240,0.8)'
        ctx.letterSpacing = '0.5px'

        const lx = p.x + (p.x > W * 0.55 ? -(fontSize * 0.6 * p.name.length * 0.55 + 10) : 10)
        const ly = p.y - (p.main ? 10 : 7)
        ctx.fillText(p.name, lx, ly)
      })

      // ── Légende ───────────────────────────────────────
      const legend = [
        { color: '#00e5ff',           label: 'Base' },
        { color: '#1a6bff',           label: 'Pays de Gex' },
        { color: 'rgba(168,85,247,1)', label: 'Région lémanique' },
      ]
      legend.forEach((l, i) => {
        const lx = 16, ly = H - 28 + i * 16
        ctx.beginPath()
        ctx.arc(lx, ly, 4, 0, Math.PI * 2)
        ctx.fillStyle = l.color
        ctx.shadowColor = l.color
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.font = '600 9px "Barlow Condensed", sans-serif'
        ctx.fillStyle = 'rgba(180,200,240,0.5)'
        ctx.fillText(l.label, lx + 10, ly + 3.5)
      })

      // ── Bordure holo ──────────────────────────────────
      const borderGlow = ctx.createLinearGradient(0, 0, W, H)
      borderGlow.addColorStop(0,   'rgba(0,229,255,0.3)')
      borderGlow.addColorStop(0.5, 'rgba(26,107,255,0.15)')
      borderGlow.addColorStop(1,   'rgba(0,229,255,0.3)')
      ctx.strokeStyle = borderGlow
      ctx.lineWidth = 1
      ctx.strokeRect(0.5, 0.5, W - 1, H - 1)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="zone-holo-canvas" />
}

const PILLS = [
  { name: 'Saint-Genis-Pouilly', main: true },
  { name: 'Gex' },
  { name: 'Ferney-Voltaire' },
  { name: 'Divonne-les-Bains' },
  { name: 'Thoiry' },
  { name: 'Prévessin-Moëns' },
  { name: 'Ornex' },
  { name: 'Cessy' },
  { name: 'Crozet' },
  { name: 'Genève', foreign: true },
  { name: 'Nyon',   foreign: true },
  { name: 'Lyon',   remote: true },
  { name: 'Paris',  remote: true },
]

export default function Zone() {
  return (
    <section className="section zone" id="zone">
      <LightBg variant="d" />
      <div className="zone-inner">
        <div className="zone-header">
          <div className="section-label">Zone d'intervention</div>
          <h2 className="section-title">Pays de Gex <em>&amp; au-delà</em></h2>
          <p className="zone-desc">
            Basé à Saint-Genis-Pouilly, j'interviens dans tout le Pays de Gex, la région lémanique et partout en France à distance.
          </p>
        </div>

        <HoloMap />

        <ul className="zone-list" aria-label="Villes desservies">
          {PILLS.map(c => (
            <li key={c.name} className={`zone-pill${c.main ? ' zone-pill--main' : c.foreign ? ' zone-pill--foreign' : c.remote ? ' zone-pill--remote' : ''}`}>
              {c.main && <span className="zone-pin" aria-hidden="true">📍</span>}
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
