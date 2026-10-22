import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Placeholder, container } from './shared'

const cats = [
  { name: 'Keychains', color: '#5EBA8A', label: 'Jeepney keychain' },
  { name: 'Nameplates', color: '#F4B342', label: 'NAMEBANILA nameplate' },
  { name: 'Miniatures', color: '#74BFE5', label: 'Carabao miniature' },
  { name: 'Playful Toys', color: '#F88484', label: 'Playful toys' },
]

export default function Categories() {
  return (
    <section id="categories" className="py-14">
      <div className={container}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-terracotta">Our Creations</p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-5xl text-ink">Explore Our Craft</h2>
          </div>
          <p className="text-sm text-muted">
            From jeepneys to custom nameplates...{' '}
            <Link to="/products" className="inline-flex items-center gap-1 font-bold text-ink hover:text-terracotta transition-colors">
              View All Products <ArrowRight size={14} />
            </Link>
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {cats.map((c) => (
            <Link
              key={c.name}
              to="/products"
              style={{ backgroundColor: c.color }}
              className="group flex flex-col rounded-3xl p-3 pb-4 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <Placeholder label={c.label} className="aspect-[4/4.2] rounded-2xl bg-white/70" />
              <div className="mt-3 flex items-center justify-between px-1">
                <span className="text-base font-extrabold text-ink">{c.name}</span>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-terracotta text-white transition-transform group-hover:translate-x-0.5">
                  <ChevronRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
