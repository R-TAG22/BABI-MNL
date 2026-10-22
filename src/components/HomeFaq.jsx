import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Minus, ArrowRight } from 'lucide-react'
import { container } from './shared'

const homeFaqs = [
  {
    question: 'How durable are your 3D printed keychains?',
    answer:
      'Our keychains are printed with high-density, multi-layer PLA+ with reinforced attachment rings and dense infill. They easily withstand daily pocket friction, drops, and keychain wear while keeping their vibrant dual-tone colors.',
  },
  {
    question: 'Can I customize the colors of the Jeepney or Nameplates?',
    answer:
      'Yes, absolutely! Through our Custom Order page, you can choose from signature shades like Terracotta, Deep Forest, Warm Cream, Pastel Mint, and Midnight Ink, or request personalized embossed text on custom nameplates.',
  },
  {
    question: 'How long does shipping take within Metro Manila and nationwide?',
    answer:
      'Standard Metro Manila orders arrive within 2–4 business days via local express couriers. Provincial Luzon, Visayas, and Mindanao deliveries usually take 4–7 business days with real-time tracking.',
  },
  {
    question: 'Do you accept bulk orders for corporate events or weddings?',
    answer:
      'We do! We regularly produce custom corporate swag, wedding tokens, and batch souvenir orders. Bulk orders of 20+ units qualify for special discounted tiered pricing and custom packaging options.',
  },
]

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx)
  }

  return (
    <section className="py-14">
      <div className={container}>
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-script text-2xl text-terracotta">Got questions?</span>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl text-ink">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-muted">
            Everything you need to know about our handcrafted 3D prints
          </p>
        </div>

        {/* 4-Item Accordion List */}
        <div className="mx-auto mt-10 max-w-3xl space-y-3.5">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-black/5 bg-[#F5EFE6] transition-all duration-200 hover:border-black/10"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-ink transition-colors hover:text-terracotta sm:text-base cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-forest shadow-xs">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-black/5 bg-white/60 px-5 pt-3 pb-5 text-xs sm:text-sm leading-relaxed text-[#555555]">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Link to /faqs */}
        <div className="mt-8 text-center">
          <Link
            to="/faqs"
            className="inline-flex items-center gap-2 text-sm font-bold text-forest transition-colors hover:text-terracotta"
          >
            Have more questions? View all FAQs <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
