import { Leaf, Layers, Sparkles, Award } from 'lucide-react'
import { container } from '../shared'

const left = [
  { icon: Leaf, title: 'Eco-Friendly PLA', text: 'Made from plant-based materials.' },
  { icon: Sparkles, title: 'Hand-Polished Finish', text: 'Crafted with care and sanded smooth.' },
]
const right = [
  { icon: Layers, title: 'Precision 3D Layering', text: 'Crisp, layered durability to last.' },
  { icon: Award, title: 'Heritage Manila Design', text: 'Locally designed, proudly Filipino.' },
]

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={28} strokeWidth={1.4} className="mt-0.5 shrink-0 text-ink" />
      <div>
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="mt-0.5 text-sm text-muted">{text}</p>
      </div>
    </div>
  )
}

export default function CraftedPride() {
  return (
    <section className="py-12">
      <div className={container}>
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Crafted with Manila Pride</h2>
        <div className="mt-10 grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-8">{left.map((f) => <Feature key={f.title} {...f} />)}</div>
          <div className="mx-auto h-44 w-60 -rotate-3 overflow-hidden rounded-3xl border-[6px] border-white bg-white shadow-xl animate-float sm:h-52 sm:w-72">
            <img src="/images/product-bestseller-jeepney.jpg" alt="Classic Manila jeepney keychain" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-8">{right.map((f) => <Feature key={f.title} {...f} />)}</div>
        </div>
      </div>
    </section>
  )
}
