import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Zone from '../components/Zone'

describe('Zone', () => {
  it('affiche le titre de la section', () => {
    render(<Zone />)
    expect(screen.getByText('Zone d\'intervention')).toBeInTheDocument()
  })

  it('affiche Saint-Genis-Pouilly comme ville principale', () => {
    render(<Zone />)
    expect(screen.getByText('Saint-Genis-Pouilly')).toBeInTheDocument()
  })

  it('affiche les villes du Pays de Gex', () => {
    render(<Zone />)
    expect(screen.getByText('Gex')).toBeInTheDocument()
    expect(screen.getByText('Ferney-Voltaire')).toBeInTheDocument()
    expect(screen.getByText('Divonne-les-Bains')).toBeInTheDocument()
    expect(screen.getByText('Thoiry')).toBeInTheDocument()
  })

  it('affiche Genève et les villes hors Pays de Gex', () => {
    render(<Zone />)
    expect(screen.getByText('Genève')).toBeInTheDocument()
    expect(screen.getByText('Lyon')).toBeInTheDocument()
    expect(screen.getByText('Paris')).toBeInTheDocument()
  })
})
