import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { API } from '../config'

const PLANS = [
  {
    id: 'starter', name: 'Starter', price: 99, setup: 199, color: '#00e5ff',
    includes: [
      "Jusqu'à 5 pages sur mesure",
      'Design responsive (mobile & desktop)',
      'Formulaire de contact',
      'Nom de domaine + hébergement offerts 1 an',
      'Livraison en ~7 jours',
      'Sauvegardes automatiques',
      'Mises à jour & sécurité',
      '1 modification/mois',
      'Support email — réponse sous 72h',
    ],
  },
  {
    id: 'pro', name: 'Pro', price: 149, setup: 299, color: '#1a6bff',
    includes: [
      "Jusqu'à 10 pages sur mesure",
      'Design responsive (mobile & desktop)',
      'Formulaire de contact',
      'Nom de domaine + hébergement offerts 1 an',
      'Livraison en ~7 jours',
      'SEO on-page optimisé (balises, vitesse, structure)',
      'Blog & galerie de réalisations',
      'Sauvegardes automatiques',
      'Mises à jour & sécurité',
      'Accès Google Analytics',
      'Formation à la prise en main incluse',
      '3 modifications/mois',
      'Support email — réponse sous 48h',
    ],
  },
  {
    id: 'ecommerce', name: 'E-Commerce', price: 249, setup: 499, color: '#a855f7',
    includes: [
      'Produits illimités — 0% de commission',
      'Design responsive (mobile & desktop)',
      'Formulaire de contact',
      'Nom de domaine + hébergement offerts 1 an',
      'Livraison en ~2-3 semaines',
      'SEO on-page optimisé + Blog',
      'Paiement en ligne',
      'Dashboard admin',
      "Gestion des stocks incluse",
      'Configuration modes de livraison',
      "Intégration de vos produits (jusqu'à 30 réf.)",
      'Sauvegardes automatiques',
      'Mises à jour & sécurité',
      'Accès Google Analytics',
      'Formation à la prise en main incluse',
      '5 modifications/mois',
      'Support email — réponse sous 24h',
    ],
  },
  {
    id: 'webapp', name: 'App Restaurant', price: 249, setup: 990, color: '#22c55e',
    includes: [
      'Menu en ligne consultable',
      'Commande à emporter & livraison',
      'Paiement en ligne intégré',
      'Dashboard gérant (plats, commandes)',
      'Design responsive (mobile & desktop)',
      'Nom de domaine + hébergement offerts 1 an',
      'SEO optimisé',
      'Sauvegardes automatiques',
      'Mises à jour & sécurité',
      'Accès Google Analytics',
      'Formation à la prise en main incluse',
      '3 mises à jour de contenu/mois',
      'Support email — réponse sous 24h',
    ],
  },
]

const ADDONS = [
  { id: 'seo',        label: 'SEO avancé',          desc: 'Audit + suivi mensuel',            price: 49,  recurrent: true,  plans: ['starter'] },
  { id: 'maintenance',label: 'Maintenance renforcée',desc: 'Support prioritaire 7j/7',         price: 39,  recurrent: true,  plans: ['starter', 'pro', 'ecommerce', 'webapp'] },
  { id: 'formation',  label: 'Formation CMS',        desc: '2h de prise en main',              price: 149, recurrent: false, plans: ['starter'] },
  { id: 'logo',       label: 'Création logo',          desc: 'Logo professionnel livré sous 7j',        price: 299, recurrent: false, plans: ['starter', 'pro', 'ecommerce', 'webapp'] },
  { id: 'redaction',  label: 'Rédaction contenu',      desc: "Jusqu'à 5 pages rédigées",                price: 199, recurrent: false, plans: ['starter', 'pro', 'ecommerce', 'webapp'] },
  { id: 'charte',     label: 'Charte graphique',        desc: 'Logo + couleurs + typographie complète',  price: 399, recurrent: false, plans: ['starter', 'pro', 'ecommerce', 'webapp'] },
  { id: 'gmb',        label: 'Création Google My Business', desc: 'Fiche GMB optimisée pour le référencement local', price: 99, recurrent: false, plans: ['starter', 'pro', 'ecommerce', 'webapp'] },
]

const STEPS = ['Offre', 'Options', 'Coordonnées', 'Récapitulatif']

function StepIndicator({ current }) {
  return (
    <div className="devis-steps">
      {STEPS.map((s, i) => (
        <div key={s} className={`devis-step${i === current ? ' devis-step--active' : i < current ? ' devis-step--done' : ''}`}>
          <div className="devis-step-dot">{i < current ? '✓' : i + 1}</div>
          <span className="devis-step-label">{s}</span>
          {i < STEPS.length - 1 && <div className="devis-step-line" />}
        </div>
      ))}
    </div>
  )
}

export default function DevisGenerator({ initialPlan = null, onClose }) {
  const [step, setStep] = useState(initialPlan ? 1 : 0)
  const [plan, setPlan] = useState(initialPlan)
  const [duration, setDuration] = useState(12)
  const [addons, setAddons] = useState([])
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '' })
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function handleClose() {
    document.body.style.overflow = ''
    onClose()
  }

  const selectedPlan = PLANS.find(p => p.id === plan)
  const isWebapp = false
  const discount = duration === 24 ? 0.85 : 1
  const availableAddons = plan ? ADDONS.filter(a => a.plans.includes(plan)) : ADDONS

  const monthlyBase = selectedPlan?.price ? Math.round(selectedPlan.price * discount) : null
  const monthlyAddons = addons
    .filter(id => ADDONS.find(a => a.id === id)?.recurrent)
    .reduce((sum, id) => sum + (ADDONS.find(a => a.id === id)?.price ?? 0), 0)
  const monthlyTotal = monthlyBase !== null ? monthlyBase + monthlyAddons : null

  const oneTimeSetup = selectedPlan?.setup ?? null
  const oneTimeAddons = addons
    .filter(id => !ADDONS.find(a => a.id === id)?.recurrent)
    .reduce((sum, id) => sum + (ADDONS.find(a => a.id === id)?.price ?? 0), 0)
  const oneTimeTotal = oneTimeSetup !== null ? oneTimeSetup + oneTimeAddons : null

  const totalEngagement = monthlyTotal && oneTimeTotal
    ? oneTimeTotal + monthlyTotal * duration
    : null

  function toggleAddon(id) {
    setAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function next() { setStep(s => s + 1) }
  function back() { setStep(s => s - 1) }

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  async function generateAndSend() {
    if (!form.name.trim()) { setErrMsg('Veuillez renseigner votre nom.'); return }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrMsg('Veuillez renseigner un email valide.'); return
    }
    setErrMsg('')
    setStatus('loading')

    const selectedAddons = addons.map(id => ADDONS.find(a => a.id === id))
    const devisNumber = `SD-${Date.now().toString().slice(-6)}`
    const dateStr = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })

    // ── Génération PDF ──────────────────────────────────────────────
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const W = 210, margin = 20

    // Header band — bleu marine
    doc.setFillColor(15, 28, 63)
    doc.rect(0, 0, W, 42, 'F')

    // Accent bar — bleu foncé
    doc.setFillColor(26, 107, 255)
    doc.rect(0, 42, W, 2, 'F')

    // Logo text
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(255, 255, 255)
    doc.text('SUPACO DIGITAL', margin, 22)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(160, 185, 230)
    doc.text('Saint-Genis-Pouilly · supaco.digital@gmail.com · +33 7 83 05 24 12', margin, 32)

    // Devis title block
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(24)
    doc.setTextColor(15, 28, 63)
    doc.text('DEVIS', margin, 62)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 130)
    doc.text(`N° ${devisNumber}`, margin, 70)
    doc.text(`Émis le ${dateStr}`, margin, 76)
    doc.text(`Valable 30 jours`, margin, 82)

    // Client block
    doc.setFillColor(236, 241, 252)
    doc.roundedRect(W / 2, 52, W / 2 - margin, 36, 3, 3, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(26, 107, 255)
    doc.text('CLIENT', W / 2 + 8, 61)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(15, 28, 63)
    doc.setFontSize(10)
    doc.text(form.name, W / 2 + 8, 69)
    if (form.company) doc.text(form.company, W / 2 + 8, 75)
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 130)
    doc.text(form.email, W / 2 + 8, form.company ? 81 : 75)
    if (form.phone) doc.text(form.phone, W / 2 + 8, form.company ? 87 : 81)

    // Separator
    doc.setDrawColor(200, 210, 235)
    doc.line(margin, 96, W - margin, 96)

    // Plan section
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(26, 107, 255)
    doc.text('OFFRE SÉLECTIONNÉE', margin, 106)

    const planRows = []
    if (!isWebapp && monthlyBase !== null) {
      planRows.push([
        `${selectedPlan.name} — Abonnement mensuel`,
        `Engagement ${duration} mois${duration === 24 ? ' (−15%)' : ''}`,
        `${monthlyBase} €/mois`
      ])
    }
    if (!isWebapp && oneTimeSetup !== null) {
      planRows.push([
        `${selectedPlan.name} — Mise en place`,
        'Frais unique (domaine + hébergement offerts 1 an)',
        `${oneTimeSetup} €`
      ])
    }
    if (isWebapp) {
      planRows.push(['Application Web — Développement sur mesure', 'Sur devis', 'À définir'])
    }

    autoTable(doc, {
      startY: 110,
      head: [['Prestation', 'Détail', 'Prix']],
      body: planRows,
      margin: { left: margin, right: margin },
      styles: { font: 'helvetica', fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [15, 28, 63], textColor: [26, 107, 255], fontStyle: 'bold', fontSize: 9 },
      alternateRowStyles: { fillColor: [236, 241, 252] },
      columnStyles: { 2: { halign: 'right', fontStyle: 'bold' } },
    })

    // Inclusions section
    if (!isWebapp && selectedPlan.includes?.length > 0) {
      const inclY = doc.lastAutoTable.finalY + 10
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(26, 107, 255)
      doc.text('CE QUI EST INCLUS', margin, inclY)

      const half = Math.ceil(selectedPlan.includes.length / 2)
      const col1 = selectedPlan.includes.slice(0, half)
      const col2 = selectedPlan.includes.slice(half)
      const inclRows = col1.map((item, i) => [`✓ ${item}`, col2[i] ? `✓ ${col2[i]}` : ''])

      autoTable(doc, {
        startY: inclY + 4,
        body: inclRows,
        margin: { left: margin, right: margin },
        styles: { font: 'helvetica', fontSize: 9, cellPadding: 4, textColor: [40, 60, 100] },
        alternateRowStyles: { fillColor: [236, 241, 252] },
        columnStyles: { 0: { cellWidth: 85 }, 1: { cellWidth: 85 } },
      })
    }

    // Options section
    if (selectedAddons.length > 0) {
      const addonY = doc.lastAutoTable.finalY + 10
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(26, 107, 255)
      doc.text('OPTIONS ADDITIONNELLES', margin, addonY)

      const addonRows = selectedAddons.map(a => [
        a.label,
        a.desc,
        a.recurrent ? `+${a.price} €/mois` : `+${a.price} €`
      ])

      autoTable(doc, {
        startY: addonY + 4,
        head: [['Option', 'Description', 'Prix']],
        body: addonRows,
        margin: { left: margin, right: margin },
        styles: { font: 'helvetica', fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [15, 28, 63], textColor: [26, 107, 255], fontStyle: 'bold', fontSize: 9 },
        alternateRowStyles: { fillColor: [236, 241, 252] },
        columnStyles: { 2: { halign: 'right', fontStyle: 'bold' } },
      })
    }

    // Total block
    if (!isWebapp && totalEngagement !== null) {
      const totalY = doc.lastAutoTable.finalY + 12
      doc.setFillColor(15, 28, 63)
      doc.roundedRect(margin, totalY, W - margin * 2, 36, 3, 3, 'F')

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(160, 185, 230)
      doc.text(`Mensuel (abonnement + options) :`, margin + 8, totalY + 10)
      doc.text(`Mise en place (one-time) :`, margin + 8, totalY + 18)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(255, 255, 255)
      doc.text(`${monthlyTotal} €/mois`, W - margin - 8, totalY + 10, { align: 'right' })
      doc.text(`${oneTimeTotal} €`, W - margin - 8, totalY + 18, { align: 'right' })

      doc.setDrawColor(26, 107, 255)
      doc.setLineWidth(0.4)
      doc.line(margin + 8, totalY + 22, W - margin - 8, totalY + 22)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(26, 107, 255)
      doc.text(`Total engagement ${duration} mois :`, margin + 8, totalY + 30)
      doc.text(`${totalEngagement.toLocaleString('fr-FR')} €`, W - margin - 8, totalY + 30, { align: 'right' })
    }

    // Footer
    const footerY = 275
    doc.setFillColor(15, 28, 63)
    doc.rect(0, footerY, W, 22, 'F')
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(160, 185, 230)
    doc.text('Supaco Digital · Saint-Genis-Pouilly, France · supaco.digital@gmail.com', W / 2, footerY + 8, { align: 'center' })
    doc.text('Ce devis est valable 30 jours à compter de sa date d\'émission.', W / 2, footerY + 14, { align: 'center' })

    doc.save(`Devis-SupacoDigital-${devisNumber}.pdf`)

    // ── Notification email ──────────────────────────────────────────
    const addonsList = selectedAddons.map(a => `${a.label} (+${a.price}${a.recurrent ? '€/mois' : '€'} one-time)`).join(', ') || 'Aucune'
    const summary = isWebapp
      ? `Offre : Application Web (sur devis)\nOptions : ${addonsList}`
      : `Offre : ${selectedPlan.name} — ${monthlyTotal}€/mois (engagement ${duration} mois)\nMise en place : ${oneTimeTotal}€\nOptions : ${addonsList}\nTotal engagement : ${totalEngagement?.toLocaleString('fr-FR')}€`

    try {
      await fetch(`${API}/api/devis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          devisNumber,
          summary,
        }),
      })
    } catch {
      // Notification non bloquante
    }

    setStatus('success')
  }

  const modalContent = status === 'success' ? (
    <motion.div
      className="devis-success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="devis-success-icon">
        <svg viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="25" stroke="url(#dg)" strokeWidth="2"/>
          <path d="M14 26l8 8 16-16" stroke="url(#dg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="dg" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00e5ff"/><stop offset="1" stopColor="#1a6bff"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h3 className="devis-success-title">Votre devis a été téléchargé !</h3>
      <p className="devis-success-sub">Kevin a été notifié et vous contactera sous <strong>24h</strong>.</p>
      <div className="devis-success-actions">
        <button className="btn-ghost" onClick={() => { setStatus('idle'); setStep(initialPlan ? 1 : 0); setPlan(initialPlan); setAddons([]); setForm({ name:'', company:'', email:'', phone:'' }) }}>
          Nouveau devis
        </button>
        <button className="btn-primary" onClick={handleClose}>
          <span>Fermer</span>
        </button>
      </div>
    </motion.div>
  ) : (
    <>
      <div className="devis-modal-header">
        <div>
          <div className="section-label" style={{ marginBottom: 4 }}>Devis instantané</div>
          <h2 className="devis-modal-title">Générez votre <em>devis</em></h2>
        </div>
        <button className="devis-modal-close" onClick={handleClose} aria-label="Fermer">✕</button>
      </div>

      <StepIndicator current={step} />

      <div className="devis-card">
        <AnimatePresence mode="wait">

          {/* ── Étape 0 : Choix de l'offre ── */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="devis-step-content">
              <h3 className="devis-step-title">Choisissez votre offre</h3>

              <div className="devis-duration-row">
                <span className={`devis-dur-label${duration === 12 ? ' devis-dur-label--active' : ''}`}>12 mois</span>
                <button
                  className={`pricing-toggle${duration === 24 ? ' pricing-toggle--on' : ''}`}
                  onClick={() => setDuration(d => d === 12 ? 24 : 12)}
                  aria-label="Basculer engagement"
                >
                  <span className="pricing-toggle-thumb" />
                </button>
                <span className={`devis-dur-label${duration === 24 ? ' devis-dur-label--active' : ''}`}>24 mois</span>
                <span className="pricing-save-badge">-15%</span>
              </div>

              <div className="devis-plans-grid">
                {PLANS.map(p => {
                  const monthly = p.price ? Math.round(p.price * discount) : null
                  return (
                    <button
                      key={p.id}
                      className={`devis-plan-card${plan === p.id ? ' devis-plan-card--selected' : ''}`}
                      style={{ '--plan-color': p.color }}
                      onClick={() => setPlan(p.id)}
                    >
                      {plan === p.id && <span className="devis-plan-check">✓</span>}
                      <div className="devis-plan-name">{p.name}</div>
                      <div className="devis-plan-price">
                        {monthly ? <><span className="devis-plan-amount">{monthly}</span><span className="devis-plan-unit"> €/mois</span></> : <span className="devis-plan-amount devis-plan-amount--custom">Sur devis</span>}
                      </div>
                      {p.setup && <div className="devis-plan-setup">+ {p.setup} € mise en place</div>}
                    </button>
                  )
                })}
              </div>

              <div className="devis-nav">
                <div />
                <button className="btn-primary" onClick={next} disabled={!plan}>
                  Continuer <span>→</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Étape 1 : Options additionnelles ── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="devis-step-content">
              <h3 className="devis-step-title">Options additionnelles</h3>
              <p className="devis-step-sub">Sélectionnez les options à inclure dans votre devis.</p>

              <div className="devis-addons">
                {availableAddons.length === 0 && (
                  <p className="devis-step-sub">Aucune option disponible pour cette offre.</p>
                )}
                {availableAddons.map(a => (
                  <button
                    key={a.id}
                    className={`devis-addon${addons.includes(a.id) ? ' devis-addon--selected' : ''}`}
                    onClick={() => toggleAddon(a.id)}
                  >
                    <div className="devis-addon-check">{addons.includes(a.id) ? '✓' : ''}</div>
                    <div className="devis-addon-info">
                      <div className="devis-addon-label">{a.label}</div>
                      <div className="devis-addon-desc">{a.desc}</div>
                    </div>
                    <div className="devis-addon-price">
                      +{a.price}€{a.recurrent ? '/mois' : ' one-time'}
                    </div>
                  </button>
                ))}
              </div>

              <div className="devis-nav">
                <button className="btn-ghost" onClick={back}>← Retour</button>
                <button className="btn-primary" onClick={next}>Continuer <span>→</span></button>
              </div>
            </motion.div>
          )}

          {/* ── Étape 2 : Coordonnées ── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="devis-step-content">
              <h3 className="devis-step-title">Vos coordonnées</h3>
              <p className="devis-step-sub">Ces informations apparaîtront sur le devis PDF.</p>

              <div className="devis-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="dv-name">Nom *</label>
                    <input id="dv-name" placeholder="Marie Dupont" value={form.name} onChange={set('name')} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="dv-company">Société</label>
                    <input id="dv-company" placeholder="Mon Entreprise SAS" value={form.company} onChange={set('company')} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="dv-email">Email *</label>
                    <input id="dv-email" type="email" placeholder="marie@exemple.fr" value={form.email} onChange={set('email')} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="dv-phone">Téléphone</label>
                    <input id="dv-phone" placeholder="06 00 00 00 00" value={form.phone} onChange={set('phone')} />
                  </div>
                </div>
              </div>

              {errMsg && <p className="devis-error">{errMsg}</p>}

              <div className="devis-nav">
                <button className="btn-ghost" onClick={back}>← Retour</button>
                <button className="btn-primary" onClick={() => { if (!form.name.trim()) { setErrMsg('Veuillez renseigner votre nom.'); return } if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setErrMsg('Email invalide.'); return } setErrMsg(''); next() }}>
                  Continuer <span>→</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Étape 3 : Récapitulatif ── */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="devis-step-content">
              <h3 className="devis-step-title">Récapitulatif</h3>

              <div className="devis-recap">
                <div className="devis-recap-block">
                  <div className="devis-recap-label">Offre</div>
                  <div className="devis-recap-value">
                    {selectedPlan?.name}
                    {!isWebapp && <span className="devis-recap-sub"> — engagement {duration} mois{duration === 24 ? ' (−15%)' : ''}</span>}
                  </div>
                </div>

                {!isWebapp && (
                  <>
                    <div className="devis-recap-block">
                      <div className="devis-recap-label">Abonnement mensuel</div>
                      <div className="devis-recap-value devis-recap-value--accent">{monthlyTotal} €/mois</div>
                    </div>
                    <div className="devis-recap-block">
                      <div className="devis-recap-label">Mise en place (one-time)</div>
                      <div className="devis-recap-value">{oneTimeTotal} €</div>
                    </div>
                    <div className="devis-recap-block devis-recap-block--total">
                      <div className="devis-recap-label">Total engagement {duration} mois</div>
                      <div className="devis-recap-value devis-recap-value--total">{totalEngagement?.toLocaleString('fr-FR')} €</div>
                    </div>
                  </>
                )}

                {isWebapp && (
                  <div className="devis-recap-block">
                    <div className="devis-recap-label">Tarif</div>
                    <div className="devis-recap-value devis-recap-value--accent">Sur devis — Kevin vous contactera</div>
                  </div>
                )}

                {addons.length > 0 && (
                  <div className="devis-recap-block">
                    <div className="devis-recap-label">Options</div>
                    <div className="devis-recap-addons">
                      {addons.map(id => {
                        const a = ADDONS.find(x => x.id === id)
                        return <span key={id} className="devis-recap-addon-tag">{a.label}</span>
                      })}
                    </div>
                  </div>
                )}

                <div className="devis-recap-block">
                  <div className="devis-recap-label">Client</div>
                  <div className="devis-recap-value">{form.name}{form.company ? ` — ${form.company}` : ''}</div>
                  <div className="devis-recap-sub">{form.email}{form.phone ? ` · ${form.phone}` : ''}</div>
                </div>
              </div>

              {errMsg && <p className="devis-error">{errMsg}</p>}

              <div className="devis-nav">
                <button className="btn-ghost" onClick={back}>← Retour</button>
                <button
                  className="btn-primary"
                  onClick={generateAndSend}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Génération…' : <><span>Télécharger le PDF</span><span>↓</span></>}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </>
  )

  return (
    <AnimatePresence>
      <motion.div
        className="devis-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={e => { if (e.target === e.currentTarget) handleClose() }}
      >
        <motion.div
          className="devis-modal"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        >
          {modalContent}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
