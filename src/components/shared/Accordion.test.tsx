import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Accordion from './Accordion'

const items = [
  { question: 'Primera pregunta', answer: 'Primera respuesta' },
  { question: 'Segunda pregunta', answer: 'Segunda respuesta' },
]

describe('Accordion', () => {
  it('abre y cierra un panel actualizando sus atributos aria', () => {
    // Arrange
    render(<Accordion items={items} />)
    const firstButton = screen.getByRole('button', { name: /Primera pregunta/ })
    const firstPanel = document.getElementById('accordion-panel-0')

    // Act
    fireEvent.click(firstButton)

    // Assert
    expect(firstButton).toHaveAttribute('aria-expanded', 'false')
    expect(firstButton).toHaveAttribute('aria-controls', 'accordion-panel-0')
    expect(firstPanel).toHaveAttribute('hidden')
    expect(screen.getByRole('button', { name: /Segunda pregunta/ })).toHaveAttribute('aria-expanded', 'false')
  })
})
