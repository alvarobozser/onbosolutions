import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const INTEREST_KEYS = [
  'contact.form.interest_dev',
  'contact.form.interest_consulting',
  'contact.form.interest_other',
] as const

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

export default function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!ACCESS_KEY) return

    setStatus('loading')
    const formData = new FormData(e.currentTarget)
    formData.append('access_key', ACCESS_KEY)

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json() as { success: boolean }
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors'
  const labelClass = 'block text-xs uppercase tracking-widest text-gray-400 mb-1.5'

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center h-full py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">✓</div>
          <p className="text-white font-semibold">{t('contact.form.success')}</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="name" className={labelClass}>{t('contact.form.name')}</label>
        <input id="name" name="name" type="text" required className={inputClass} placeholder={t('contact.form.name')} />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>{t('contact.form.email')}</label>
        <input id="email" name="email" type="email" required className={inputClass} placeholder="tu@email.com" />
      </div>
      <div>
        <label htmlFor="interest" className={labelClass}>{t('contact.form.interest')}</label>
        <select id="interest" name="interest" required className={`${inputClass} cursor-pointer`}>
          <option value="" className="text-black">—</option>
          {INTEREST_KEYS.map((key) => (
            <option key={key} value={t(key)} className="text-black">{t(key)}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>{t('contact.form.phone')}</label>
        <input id="phone" name="phone" type="tel" className={inputClass} placeholder="+34 600 000 000" />
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>{t('contact.form.message')}</label>
        <textarea id="message" name="message" required rows={5} className={`${inputClass} resize-none`} placeholder="..." />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">{t('contact.form.error')}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !ACCESS_KEY}
        className="w-full bg-white text-black font-semibold py-3 text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? t('contact.form.sending') : t('contact.form.submit')}
      </button>

      {!ACCESS_KEY && (
        <p className="text-yellow-400 text-xs">Formulario no configurado: añade VITE_WEB3FORMS_KEY en .env</p>
      )}
    </form>
  )
}
