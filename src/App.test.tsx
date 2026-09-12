import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import './i18n/index'
import App from './App'

describe('App routing', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('renderiza el home como página principal', async () => {
    // Arrange
    window.history.replaceState(null, '', '/#/')

    // Act
    render(<App />)

    // Assert
    expect(await screen.findByRole('heading', { name: /Software e IA construidos/ })).toBeInTheDocument()
  })
})
