import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '../../analytics/analytics'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'
type FieldName = 'name' | 'email' | 'interest' | 'phone' | 'message'
type FieldErrors = Partial<Record<FieldName, string>>

const MAX_LENGTHS = { name: 80, email: 160, interest: 100, phone: 30, message: 2000 } as const

const INTEREST_KEYS = [
  'contact.form.interest_dev',
  'contact.form.interest_consulting',
  'contact.form.interest_other',
] as const

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined)?.trim()

export default function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})

  function validate(formData: FormData): FieldErrors {
    const values = Object.fromEntries(
      (Object.keys(MAX_LENGTHS) as FieldName[]).map((field) => [field, String(formData.get(field) ?? '').trim()]),
    ) as Record<FieldName, string>
    const nextErrors: FieldErrors = {}
    if (!values.name) nextErrors.name = t('contact.form.validation.required')
    else if (values.name.length > MAX_LENGTHS.name) nextErrors.name = t('contact.form.validation.too_long')
    if (!values.email || !/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = t('contact.form.validation.email')
    else if (values.email.length > MAX_LENGTHS.email) nextErrors.email = t('contact.form.validation.too_long')
    if (!values.interest) nextErrors.interest = t('contact.form.validation.required')
    else if (values.interest.length > MAX_LENGTHS.interest) nextErrors.interest = t('contact.form.validation.too_long')
    if (values.phone && (!/^[+\d][\d\s().-]{5,29}$/.test(values.phone) || values.phone.length > MAX_LENGTHS.phone)) {
      nextErrors.phone = t('contact.form.validation.phone')
    }
    if (!values.message) nextErrors.message = t('contact.form.validation.required')
    else if (values.message.length > MAX_LENGTHS.message) nextErrors.message = t('contact.form.validation.too_long')
    return nextErrors
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (String(formData.get('website') ?? '').trim()) return
    const nextErrors = validate(formData)
    setErrors(nextErrors)
    if (!ACCESS_KEY || Object.keys(nextErrors).length > 0) return

    setStatus('loading')
    formData.append('access_key', ACCESS_KEY)

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json() as { success: boolean }
      if (data.success) trackEvent('contact_form_success')
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus:border-white transition-colors'
  const labelClass = 'block text-xs uppercase tracking-widest text-gray-400 mb-1.5'

  function fieldProps(field: FieldName) {
    const errorId = `${field}-error`
    return {
      'aria-invalid': Boolean(errors[field]),
      'aria-describedby': errors[field] ? errorId : undefined,
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center h-full py-12" role="status" aria-live="polite">
        <div className="text-center">
          <div className="text-4xl mb-4">✓</div>
          <p className="text-white font-semibold">{t('contact.form.success')}</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="name" className={labelClass}>{t('contact.form.name')}</label>
        <input id="name" name="name" type="text" maxLength={MAX_LENGTHS.name} required className={inputClass} placeholder={t('contact.form.name')} {...fieldProps('name')} />
        {errors.name && <p id="name-error" className="mt-1 text-sm text-red-300" role="alert">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>{t('contact.form.email')}</label>
        <input id="email" name="email" type="email" maxLength={MAX_LENGTHS.email} required className={inputClass} placeholder="tu@email.com" {...fieldProps('email')} />
        {errors.email && <p id="email-error" className="mt-1 text-sm text-red-300" role="alert">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="interest" className={labelClass}>{t('contact.form.interest')}</label>
        <select id="interest" name="interest" required className={`${inputClass} cursor-pointer`} {...fieldProps('interest')}>
          <option value="" className="text-black">—</option>
          {INTEREST_KEYS.map((key) => (
            <option key={key} value={t(key)} className="text-black">{t(key)}</option>
          ))}
        </select>
        {errors.interest && <p id="interest-error" className="mt-1 text-sm text-red-300" role="alert">{errors.interest}</p>}
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>{t('contact.form.phone')}</label>
        <input id="phone" name="phone" type="tel" maxLength={MAX_LENGTHS.phone} className={inputClass} placeholder="+34 600 000 000" {...fieldProps('phone')} />
        {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-300" role="alert">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>{t('contact.form.message')}</label>
        <textarea id="message" name="message" maxLength={MAX_LENGTHS.message} required rows={5} className={`${inputClass} resize-none`} placeholder="..." {...fieldProps('message')} />
        {errors.message && <p id="message-error" className="mt-1 text-sm text-red-300" role="alert">{errors.message}</p>}
      </div>

      <div aria-live="polite" role="status">
        {status === 'error' && (
          <p className="text-red-400 text-sm">{t('contact.form.error')}</p>
        )}
      </div>

      {!ACCESS_KEY && (
        <p className="text-yellow-400 text-xs" role="alert">{t('contact.form.not_configured')}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !ACCESS_KEY}
        className="w-full bg-white text-black font-semibold py-3 text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? t('contact.form.sending') : t('contact.form.submit')}
      </button>
    </form>
  )
}
