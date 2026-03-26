import LightBg from './LightBg'

const cities = [
  { name: 'Saint-Genis-Pouilly', main: true },
  { name: 'Gex' },
  { name: 'Ferney-Voltaire' },
  { name: 'Divonne-les-Bains' },
  { name: 'Thoiry' },
  { name: 'Cessy' },
  { name: 'Prévessin-Moëns' },
  { name: 'Ornex' },
  { name: 'Échenevex' },
  { name: 'Sergy' },
  { name: 'Versonnex' },
  { name: 'Crozet' },
  { name: 'Genève' },
  { name: 'Nyon' },
  { name: 'Lyon' },
  { name: 'Paris' },
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
        <ul className="zone-list" aria-label="Villes desservies">
          {cities.map(c => (
            <li key={c.name} className={`zone-pill${c.main ? ' zone-pill--main' : ''}`}>
              {c.main && <span className="zone-pin" aria-hidden="true">📍</span>}
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
