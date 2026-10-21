import { ArrowRight, Leaf, MapPin, BadgeCheck } from 'lucide-react'
import { Button, container } from './shared'

const badges = [
  { icon: Leaf, label: 'Eco-Friendly PLA' },
  { icon: MapPin, label: 'Local Craftsmanship' },
  { icon: BadgeCheck, label: 'Premium Quality' },
]

export default function Hero() {
  return (
    <section id="home" className="overflow-hidden pt-8 pb-12 lg:pt-12">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]`}>
        <div>
          <p className="font-script text-4xl leading-none text-terracotta sm:text-[40px]">Freshly Crafted</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[56px]">
            3D Printed <br className="hidden sm:block" />Goodness <br className="hidden sm:block" />in Manila
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
            At Babi MNL, we craft highly-detailed 3D-printed souvenirs, custom keychains, and figurines using premium materials and a whole lot of love.
          </p>
          <Button className="mt-7 px-6 py-3 text-sm">
            Order Now <ArrowRight size={16} />
          </Button>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {badges.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-xs font-medium text-ink">
                <Icon size={20} strokeWidth={1.5} />
                <span className="max-w-[80px] leading-tight">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[32px] bg-stone-warm">
            <img
              src="/images/hero-image.jpg"
              alt="Stacked 3D printed jeepney keychains, carabao figurines and palm tree medallions on a stone block"
              className="aspect-[4/3] w-full object-cover"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
