import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ContactForm from './ContactForm'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

describe('ContactForm', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('no envía datos inválidos', () => {
    // Arrange
    const fetchMock = vi.spyOn(globalThis, 'fetch')
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText('contact.form.name'), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByLabelText('contact.form.email'), { target: { value: 'correo-invalido' } })
    fireEvent.change(screen.getByLabelText('contact.form.interest'), { target: { value: 'contact.form.interest_other' } })
    fireEvent.change(screen.getByLabelText('contact.form.message'), { target: { value: 'Consulta' } })

    // Act
    fireEvent.submit(screen.getByLabelText('Website').closest('form')!)

    // Assert
    expect(fetchMock).not.toHaveBeenCalled()
    expect(screen.getByText('contact.form.validation.email')).toBeInTheDocument()
  })

  it('ignora el envío cuando el honeypot está rellenado', () => {
    // Arrange
    const fetchMock = vi.spyOn(globalThis, 'fetch')
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText('Website'), { target: { value: 'bot-value' } })

    // Act
    fireEvent.submit(screen.getByLabelText('Website').closest('form')!)

    // Assert
    expect(fetchMock).not.toHaveBeenCalled()
    expect(screen.queryByText('contact.form.validation.required')).not.toBeInTheDocument()
  })
})
