import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ContactForm from '../components/ContactForm'

describe('ContactForm', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('affiche tous les champs du formulaire', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/téléphone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/service/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/votre message/i)).toBeInTheDocument()
  })

  it('le bouton envoi est désactivé sans consentement', () => {
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /envoyer/i })).toBeDisabled()
  })

  it('le bouton envoi est activé après consentement', () => {
    render(<ContactForm />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('button', { name: /envoyer/i })).not.toBeDisabled()
  })

  it('affiche un message de succès après envoi', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    })
    render(<ContactForm />)
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }))
    await waitFor(() => {
      expect(screen.getByText('Message envoyé !')).toBeInTheDocument()
    })
  })

  it('affiche une erreur réseau si fetch échoue', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'))
    render(<ContactForm />)
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }))
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('ouvre la modal confidentialité depuis le formulaire', () => {
    render(<ContactForm />)
    fireEvent.click(screen.getByText(/politique de confidentialité/i))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
