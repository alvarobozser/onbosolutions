import { useState } from 'react'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpenIndex?: number
}

export default function Accordion({ items, defaultOpenIndex = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex)

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <div className="divide-y divide-black/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-start justify-between py-5 text-left gap-4"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-black">{item.question}</span>
              <span className="text-lg leading-none text-gray-400 shrink-0 mt-0.5">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              style={{
                maxHeight: isOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}
            >
              <p className="pb-5 text-sm text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
