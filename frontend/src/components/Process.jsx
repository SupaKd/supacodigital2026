import LightBg from './LightBg'

const steps = [
  { num: '01', title: 'Découverte', desc: 'Appel de 30 min pour comprendre vos objectifs, votre cible et votre vision.' },
  { num: '02', title: 'Conception', desc: 'Maquettes et prototype validés avec vous avant de coder une seule ligne.' },
  { num: '03', title: 'Développement', desc: 'Développement agile avec points hebdomadaires et accès en temps réel.' },
  { num: '04', title: 'Livraison', desc: 'Mise en ligne, formation et support inclus. Votre succès est mon objectif.' },
]

export default function Process() {
  return (
    <section className="section process" id="processus">
      <LightBg variant="c" />
      <div className="section-label">Méthode</div>
      <h2 className="section-title">Mon <em>processus</em></h2>
      <div className="process-steps">
        {steps.map(s => (
          <div key={s.num} className="process-step">
            <div className="process-num">{s.num}</div>
            <div className="process-step-title">{s.title}</div>
            <p className="process-step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
