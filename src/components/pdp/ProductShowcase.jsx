import { useState } from 'react'
import { ChevronRight, Minus, Plus, ShieldCheck, BadgeCheck, Leaf, Award, Star } from 'lucide-react'
import { Stars, container } from '../shared'

export const gallery = [
  { src: '/images/product-bestseller-jeepney.jpg', pos: 'center', alt: 'Jeepney keychain on a stone slab' },
  { src: '/images/hero-image.jpg', pos: '35% 70%', alt: 'Jeepneys stacked with carabao figurines' },
  { src: '/images/product-bestseller-jeepney.jpg', pos: '85% 60%', alt: 'Jeepney front detail' },
  { src: '/images/hero-image.jpg', pos: '30% 90%', alt: 'Jeepney keychain with ring' },
]

const colors = [
  { name: 'Blue / Yellow', bg: 'linear-gradient(135deg,#2f5fc4 50%,#f4c430 50%)' },
  { name: 'Red / White', bg: 'linear-gradient(135deg,#d6342c 50%,#ffffff 50%)' },
  { name: 'Green / White', bg: 'linear-gradient(135deg,#2e7d4f 50%,#ffffff 50%)' },
  { name: 'Yellow / Green', bg: 'linear-gradient(135deg,#f4c430 50%,#2e7d4f 50%)' },
]

const tabs = {
  Features: 'Highly detailed 3D-printed Manila jeepney keychain with a secure metal ring. Hand-finished in Manila for a smooth, vibrant look that stands up to daily use.',
  'Sizing & Material': 'Approx. 6.5cm × 2.8cm × 3cm. Printed in plant-based PLA with a stainless steel split ring and chain. Weighs about 18g.',
  'Care instructions': 'Wipe clean with a damp cloth. Keep away from prolonged heat above 50°C and direct sunlight to keep colors vivid.',
}

export default function ProductShowcase() {
  const [active, setActive] = useState(0)
  const [color, setColor] = useState(0)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('Features')
  const [added, setAdded] = useState(false)

  const add = () => { setAdded(true); setTimeout(() => setAdded(false), 1800) }

  return (
    <section className="pb-12">
      <div className={container}>
        <nav aria-label="Breadcrumb" className="py-5 text-[11px] text-muted">
          <ol className="flex flex-wrap items-center gap-1">
            {['Home', 'Products', 'Keychains'].map((c) => (
              <li key={c} className="flex items-center gap-1">
                <a href="#/" className="hover:text-ink">{c}</a><ChevronRight size={11} />
              </li>
            ))}
            <li aria-current="page" className="font-semibold text-ink">Classic Manila Jeepney Keychain</li>
          </ol>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <div className="overflow-hidden rounded-3xl bg-stone-warm shadow-sm">
              <img
                src={gallery[active].src}
                alt={gallery[active].alt}
                style={{ objectPosition: gallery[active].pos }}
                className="aspect-[4/3] w-full object-cover transition-all duration-300"
                fetchPriority="high"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3" role="tablist" aria-label="Product images">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`View image ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`cursor-pointer overflow-hidden rounded-2xl border-2 transition-all ${active === i ? 'border-ink ring-2 ring-ink/10' : 'border-transparent opacity-80 hover:opacity-100'}`}
                >
                  <img src={g.src} alt="" style={{ objectPosition: g.pos }} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-7">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-[34px]">Classic Manila Jeepney Keychain</h1>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <Stars size={13} /><span className="font-bold">4.9</span><span className="text-muted">(124 Reviews)</span>
            </div>
            <p className="mt-4 text-[28px] font-extrabold">₱299</p>

            <fieldset className="mt-5">
              <legend className="text-xs font-semibold">Color / Variation: <span className="font-normal text-muted">{colors[color].name}</span></legend>
              <div className="mt-2 flex gap-3">
                {colors.map((c, i) => (
                  <button
                    key={c.name}
                    aria-label={c.name}
                    aria-pressed={color === i}
                    onClick={() => setColor(i)}
                    style={{ background: c.bg }}
                    className={`h-8 w-8 cursor-pointer rounded-full border border-black/20 transition-all ${color === i ? 'ring-2 ring-terracotta ring-offset-2' : 'hover:scale-110'}`}
                  />
                ))}
              </div>
            </fieldset>

            <div className="mt-5">
              <p className="text-xs font-semibold">Quantity</p>
              <div className="mt-2 flex gap-3">
                <div className="flex items-center rounded-xl border border-black/15">
                  <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-11 w-10 cursor-pointer place-items-center hover:text-terracotta"><Minus size={14} /></button>
                  <span className="w-8 text-center text-sm font-semibold" aria-live="polite">{qty}</span>
                  <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="grid h-11 w-10 cursor-pointer place-items-center hover:text-terracotta"><Plus size={14} /></button>
                </div>
                <button onClick={add} className="h-11 flex-1 cursor-pointer rounded-xl bg-terracotta text-sm font-semibold text-white transition-all hover:bg-[#c25b36] hover:shadow-lg active:scale-[0.98]">
                  {added ? `Added ${qty} ✓` : 'Add to Cart'}
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink">
              <span className="flex items-center gap-1.5"><ShieldCheck size={15} />Secure checkout</span>
              <span className="flex items-center gap-1.5"><BadgeCheck size={15} className="text-[#2e7d4f]" />Secure Guarantees</span>
            </div>

            <div className="mt-5 border-t border-black/5 pt-4">
              <p className="text-xs font-bold">Trust Badges</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <span className="flex items-center gap-2"><Leaf size={18} strokeWidth={1.5} />Eco-Friendly PLA sustainable</span>
                <span className="flex items-center gap-2"><Award size={18} strokeWidth={1.5} />Hand-Finished in Manila</span>
              </div>
            </div>

            <div className="mt-5">
              <div role="tablist" className="flex gap-4 border-b border-black/10 text-xs">
                {Object.keys(tabs).map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`-mb-px cursor-pointer border-b-2 pb-2 transition-colors ${tab === t ? 'border-ink font-bold' : 'border-transparent text-muted hover:text-ink'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p role="tabpanel" className="mt-3 text-xs leading-relaxed text-muted">{tabs[tab]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
