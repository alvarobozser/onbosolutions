import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ContactForm from '../components/contacto/ContactForm'
import Accordion from '../components/shared/Accordion'
import { CONTACT_EMAIL, CONTACT_LOCATION, CONTACT_PHONE } from '../config/constants'

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5'] as const

interface InfoItem {
  Icon: React.ComponentType<{ size: number; className: string }>
  labelKey: string
  value: string
  href?: string
}

const INFO_ITEMS: InfoItem[] = [
  { Icon: MapPin, labelKey: 'contact.location_label', value: CONTACT_LOCATION },
  { Icon: Mail, labelKey: 'contact.email_label', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { Icon: Phone, labelKey: 'contact.phone_label', value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/\s/g, '')}` },
]

export default function Contacto() {
  const { t } = useTranslation()

  const faqItems = FAQ_KEYS.map((key) => ({
    question: t(`faq.${key}`),
    answer: t(`faq.a${key.slice(1)}`),
  }))

  return (
    <main className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Info left */}
          <div className="lg:w-96 shrink-0">
            <h1 className="text-4xl font-black text-black">{t('contact.section_title')}</h1>
            <p className="mt-4 text-gray-600 leading-relaxed">{t('contact.intro')}</p>

            <div className="mt-10 space-y-6">
              {INFO_ITEMS.map(({ Icon, labelKey, value, href }) => (
                <div key={labelKey} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">{t(labelKey)}</p>
                    {href ? (
                      <a href={href} className="text-sm text-black hover:underline mt-0.5 block">{value}</a>
                    ) : (
                      <p className="text-sm text-black mt-0.5">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a href="/privacy" className="text-xs text-gray-400 hover:text-black transition-colors underline">
                {t('contact.privacy')}
              </a>
            </div>
          </div>

          {/* Form right */}
          <div className="flex-1 bg-black p-8 lg:p-12">
            <ContactForm />
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24 flex flex-col lg:flex-row gap-12">
          <div className="lg:w-64 shrink-0">
            <h2 className="text-2xl font-black text-black sticky top-24">{t('faq.section_title')}</h2>
          </div>
          <div className="flex-1 border-t border-black/10">
            <Accordion items={faqItems} defaultOpenIndex={0} />
          </div>
        </div>
      </div>
    </main>
  )
}
