const ZONES = [
  {
    label: 'Base principale',
    city: 'Saint-Genis-Pouilly',
    desc: 'Mon bureau, votre voisin.',
    color: 'cyan',
    main: true,
  },
  {
    label: 'Pays de Gex',
    cities: ['Gex', 'Thoiry', 'Prévessin-Moëns', 'Ornex', 'Cessy', 'Crozet', 'Ferney-Voltaire', 'Divonne-les-Bains'],
    desc: 'Intervention sur site sous 30 min.',
    color: 'blue',
  },
  {
    label: 'Région lémanique',
    cities: ['Genève', 'Nyon'],
    desc: 'Déplacements transfrontaliers.',
    color: 'purple',
  },
  {
    label: 'France entière',
    cities: ['Lyon', 'Paris', 'Partout ailleurs'],
    desc: 'Remote 100% — disponible où que vous soyez.',
    color: 'dim',
  },
]

const COLOR_MAP = {
  cyan:   { dot: '#00e5ff', border: 'rgba(0,229,255,0.3)',   bg: 'rgba(0,229,255,0.06)',   text: '#00e5ff',          glow: 'rgba(0,229,255,0.2)' },
  blue:   { dot: '#1a6bff', border: 'rgba(26,107,255,0.3)',  bg: 'rgba(26,107,255,0.06)',  text: '#6fa3ff',          glow: 'rgba(26,107,255,0.15)' },
  purple: { dot: '#a855f7', border: 'rgba(168,85,247,0.3)',  bg: 'rgba(168,85,247,0.06)',  text: 'rgba(168,85,247,0.9)', glow: 'rgba(168,85,247,0.12)' },
  dim:    { dot: 'rgba(232,238,245,0.25)', border: 'rgba(232,238,245,0.08)', bg: 'transparent', text: 'rgba(232,238,245,0.35)', glow: 'none' },
}

const STAT = { value: '20 km', label: 'autour de chez vous' }

function Dot({ color }) {
  const c = COLOR_MAP[color]
  return (
    <span className="zone-card-dot" style={{ background: c.dot, boxShadow: `0 0 8px ${c.dot}` }} />
  )
}

export default function Zone() {
  return (
    <section className="section zone" id="zone">
      <div className="zone-bg-map" aria-hidden="true" />

      <div className="zone-inner">
        <div className="zone-header">
          <div className="section-label">Zone d'intervention</div>
          <h2 className="section-title">Pays de Gex <em>&amp; au-delà</em></h2>
          <p className="zone-desc">
            Basé à Saint-Genis-Pouilly, j'interviens dans tout le Pays de Gex,
            la région lémanique et partout en France à distance.
          </p>
        </div>

        <div className="zone-stat-badge">
          <span className="zone-stat-value">{STAT.value}</span>
          <span className="zone-stat-label">{STAT.label}</span>
        </div>

        <div className="zone-cards">
          {ZONES.map((z) => {
            const c = COLOR_MAP[z.color]
            return (
              <div
                key={z.label}
                className={`zone-card${z.main ? ' zone-card--main' : ''}`}
                style={{
                  '--card-border': c.border,
                  '--card-bg':     c.bg,
                  '--card-glow':   c.glow,
                  '--card-text':   c.text,
                }}
              >
                <div className="zone-card-header">
                  <Dot color={z.color} />
                  <span className="zone-card-label">{z.label}</span>
                </div>

                <p className="zone-card-city">
                  {z.main ? z.city : z.cities.join(' · ')}
                </p>

                <p className="zone-card-desc">{z.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
