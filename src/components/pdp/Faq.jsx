import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { container } from '../shared'

const faqs = [
  { q: 'How durable is the 3D-printed plastic?', a: 'Our keychains are printed in PLA with dense infill and hand-finished, so they handle daily pockets and bags well. Avoid leaving them in hot cars.' },
  { q: 'Can I request custom colors?', a: 'Yes! Pick from our swatches or message us for a custom colorway. Custom colors may add 2–3 days to production.' },
  { q: 'Do you print bulk orders?', a: 'Absolutely. We take bulk orders for events, businesses and souvenirs. Contact us for volume pricing.' },
]

export default function Faq() {
  const [open, setOpen] = useState(null)
  return (
    <section className="py-12">
      <div className={`${container} max-w-4xl`}>
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">FAQs</h2>
        <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <h3>
                  <button
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-sm font-semibold transition-colors hover:text-terracotta"
                  >
                    {f.q}
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'}`}
                >
                  <p className="overflow-hidden text-sm leading-relaxed text-muted">{f.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
