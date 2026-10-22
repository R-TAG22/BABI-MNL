import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Minus, Search, Truck, Layers, Palette, ShieldCheck, ArrowRight } from 'lucide-react'
import { container } from '../components/shared'

const categories = [
  { id: 'all', label: 'All FAQs', icon: Layers },
  { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
  { id: 'materials', label: 'Materials & Durability', icon: ShieldCheck },
  { id: 'custom', label: 'Custom Orders & Personalization', icon: Palette },
  { id: 'care', label: 'Care & Returns', icon: ShieldCheck },
]

const faqsData = [
  // Shipping & Delivery
  {
    category: 'shipping',
    categoryLabel: 'Shipping & Delivery',
    q: 'How long does shipping take within Metro Manila?',
    a: 'Metro Manila deliveries typically take 2 to 4 business days once your item finishes production and quality inspection. We utilize reliable express couriers (Lalamove, J&T, or Grab Express for rush orders).',
  },
  {
    category: 'shipping',
    categoryLabel: 'Shipping & Delivery',
    q: 'Do you ship to provincial areas across Luzon, Visayas, and Mindanao?',
    a: 'Yes, we ship nationwide across the Philippines. Provincial deliveries usually take 4 to 7 business days depending on your municipality. Tracking details are automatically emailed upon dispatch.',
  },
  {
    category: 'shipping',
    categoryLabel: 'Shipping & Delivery',
    q: 'Do you ship internationally (e.g. US, Canada, Australia, UK)?',
    a: 'Yes! We ship international souvenir and custom orders via DHL Express and PhilPost Registered Airmail. International delivery typically takes 7 to 14 business days depending on customs clearance.',
  },
  {
    category: 'shipping',
    categoryLabel: 'Shipping & Delivery',
    q: 'How are the products packaged to prevent damage during transit?',
    a: 'Each piece is individually wrapped in biodegradable honeycomb paper or protective recycled bubble cushions, then encased in rigid recyclable kraft mailer boxes.',
  },

  // Materials & Durability
  {
    category: 'materials',
    categoryLabel: 'Materials & Durability',
    q: 'What material do you use to 3D print your products?',
    a: 'We use high-grade, modified Polylactic Acid (PLA+). PLA is derived from renewable natural sources such as cornstarch and tapioca roots, making it non-toxic, odorless, and eco-friendly while offering superb impact resistance.',
  },
  {
    category: 'materials',
    categoryLabel: 'Materials & Durability',
    q: 'How durable are your keychains against daily wear and drops?',
    a: 'Our keychains are specifically designed for high tensile strength. We print with a 100% solid perimeter shell and a minimum 35% cross-grid infill, ensuring the keyring eyelet won’t snap under normal pocket and bag tension.',
  },
  {
    category: 'materials',
    categoryLabel: 'Materials & Durability',
    q: 'Will the colors fade over time or peel off?',
    a: 'No! The colors you see are not surface paint—they are solid colored polymer filaments fused during the printing process. As a result, the colors cannot chip, flake, or scratch off.',
  },
  {
    category: 'materials',
    categoryLabel: 'Materials & Durability',
    q: 'Are the prints heat resistant? Can I leave them in a parked car under the sun?',
    a: 'Standard PLA has a heat deflection threshold of roughly 55°C–60°C (130°F–140°F). We advise against leaving keychains or miniatures on a closed car dashboard under direct tropical summer sun for hours, as prolonged extreme heat can cause minor warping.',
  },

  // Custom Orders & Personalization
  {
    category: 'custom',
    categoryLabel: 'Custom Orders & Personalization',
    q: 'How does the custom order process work?',
    a: 'Visit our Custom Order page (/custom-order), choose your product style (e.g., custom nameplate, embossed keychain, mascot), input your custom text, select your preferred dual-color palette, and upload an optional reference photo. Our 3D artist will generate a digital preview before printing.',
  },
  {
    category: 'custom',
    categoryLabel: 'Custom Orders & Personalization',
    q: 'Can you print logos or corporate branding for events and souvenirs?',
    a: 'Yes! We convert vector SVGs, 2D company logos, and wedding monograms into multi-layered 3D relief emblems. We also offer discounted tier pricing starting at orders of 20 or more units.',
  },
  {
    category: 'custom',
    categoryLabel: 'Custom Orders & Personalization',
    q: 'How long does custom design & fabrication take?',
    a: 'Custom 1-of-1 nameplates and keychains take 2 to 3 days for 3D modeling and print fabrication before shipping. Larger batch orders (50+ pieces) take approximately 5 to 7 business days.',
  },

  // Care Instructions & Returns
  {
    category: 'care',
    categoryLabel: 'Care & Returns',
    q: 'How should I clean my 3D printed keepsake?',
    a: 'Gently wipe with a soft microfiber cloth dampened with lukewarm water and mild soap. Avoid harsh chemical solvents, acetone, or high-temperature dishwashers.',
  },
  {
    category: 'care',
    categoryLabel: 'Care & Returns',
    q: 'What is your return or replacement policy if an item arrives damaged?',
    a: 'We take immense pride in our craftsmanship. If your parcel arrives damaged in transit or displays any structural manufacturing flaw, please notify us within 7 days of delivery with photos, and we will dispatch a brand-new replacement free of charge.',
  },
  {
    category: 'care',
    categoryLabel: 'Care & Returns',
    q: 'Can I cancel or modify my custom order?',
    a: 'Because custom nameplates and personalized prints are fabricated to your exact specifications, cancellations must be requested within 12 hours of order submission before print slicing and filament loading commence.',
  },
]

export default function FaqsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [openItems, setOpenItems] = useState({ 0: true })

  const filteredFaqs = useMemo(() => {
    return faqsData.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory
      const matchesSearch =
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [activeCategory, search])

  const toggle = (idx) => {
    setOpenItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }))
  }

  return (
    <div className="py-12">
      <div className={container}>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-script text-3xl text-terracotta">Help & Knowledge Base</span>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-5xl text-ink">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sm text-muted">
            Find immediate answers regarding delivery timelines, PLA materials, custom 3D modeling, and care.
          </p>

          {/* Search Box */}
          <div className="relative mx-auto mt-6 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search answers (e.g. shipping, durability, custom)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-black/10 bg-white py-3 pl-11 pr-4 text-xs sm:text-sm outline-none focus:border-terracotta shadow-xs"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-forest text-white shadow-sm'
                    : 'bg-[#F5EFE6] text-[#444444] hover:bg-[#eae3d7]'
                }`}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Accordion FAQ Items */}
        <div className="mx-auto mt-10 max-w-3xl space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = !!openItems[idx]
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-black/5 bg-[#F5EFE6] transition-all duration-200 hover:border-black/10"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-ink transition-colors hover:text-terracotta sm:text-base cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1">
                    <span className="mr-2 inline-block rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-forest uppercase tracking-wide">
                      {faq.categoryLabel}
                    </span>
                    {faq.q}
                  </span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-forest shadow-xs">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-black/5 bg-white/70 px-5 pt-3 pb-5 text-xs sm:text-sm leading-relaxed text-[#444444]">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}

          {filteredFaqs.length === 0 && (
            <div className="my-12 text-center">
              <p className="text-sm font-semibold text-ink">No matching questions found.</p>
              <p className="mt-1 text-xs text-muted">Try clearing your search query or selecting a different category.</p>
            </div>
          )}
        </div>

        {/* Still Have Questions Banner */}
        <div className="mx-auto mt-14 max-w-3xl rounded-3xl bg-[#1B3B2B] p-8 text-center text-white sm:p-10">
          <h2 className="font-script text-3xl text-amber-soft sm:text-4xl">Still have a question?</h2>
          <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-white/80">
            Our fabrication team and customer care specialists are happy to help you with custom ideas, mockups, or bulk quotes.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-terracotta px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-[#c25b36]"
            >
              Contact Support <ArrowRight size={14} />
            </Link>
            <Link
              to="/custom-order"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-white/20"
            >
              Start Custom Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
