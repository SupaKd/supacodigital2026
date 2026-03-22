import { useEffect, useRef } from 'react'

export default function MeshBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf
    let w, h

    const PARTICLE_COUNT = 55
    const particles = []

    function mkParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.5 + 0.15,
      }
    }

    function initParticles() {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(mkParticle())
    }

    const blobs = [
      { x: 0.72, y: 0.18, r: 0.52, cx: '#1a6bff', speed: 0.00018, phase: 0 },
      { x: 0.18, y: 0.72, r: 0.44, cx: '#00e5ff', speed: 0.00013, phase: 2.1 },
      { x: 0.88, y: 0.75, r: 0.36, cx: '#0047cc', speed: 0.00022, phase: 4.4 },
      { x: 0.42, y: 0.35, r: 0.30, cx: '#00e5ff', speed: 0.00016, phase: 1.3 },
    ]

    function resize() {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      initParticles()
    }

    function drawBlobs(t) {
      blobs.forEach(b => {
        const ox = Math.sin(t * b.speed + b.phase) * 0.08
        const oy = Math.cos(t * b.speed * 0.7 + b.phase) * 0.08
        const cx = (b.x + ox) * w
        const cy = (b.y + oy) * h
        const radius = b.r * Math.min(w, h)
        const pulse = 1 + Math.sin(t * b.speed * 2 + b.phase) * 0.06
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * pulse)
        grad.addColorStop(0, b.cx + '28')
        grad.addColorStop(0.45, b.cx + '12')
        grad.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(cx, cy, radius * pulse, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })
    }

    function drawParticles() {
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,229,255,${p.alpha})`
        ctx.fill()
      })
    }

    function drawConnections() {
      const DIST = 120
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < DIST) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,229,255,${0.06 * (1 - d / DIST)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h)
      drawBlobs(t)
      drawConnections()
      drawParticles()
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduced) raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
