import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import './i18n/index'
import App from './App'

describe('App routing', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('renderiza la ruta de guías', async () => {
    // Arrange
    window.history.replaceState(null, '', '/#/guias')

    // Act
    render(<App />)

    // Assert
    expect(await screen.findByRole('heading', { name: 'Guías prácticas' })).toBeInTheDocument()
  })
})
