import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../components/Footer'

describe('Footer', () => {
  it('affiche les liens de navigation', () => {
    render(<Footer />)
    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Projets')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('affiche le copyright Supaco Digital', () => {
    render(<Footer />)
    expect(screen.getByText('Supaco Digital')).toBeInTheDocument()
  })

  it('ouvre la modal mentions légales au clic', () => {
    render(<Footer />)
    fireEvent.click(screen.getByText('Mentions légales'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('ouvre la modal politique de confidentialité au clic', () => {
    render(<Footer />)
    fireEvent.click(screen.getByText('Politique de confidentialité'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
