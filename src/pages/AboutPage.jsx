import { Link } from 'react-router-dom'
import { Leaf, Sparkles, HeartHandshake, Printer, CheckCircle2, ArrowRight } from 'lucide-react'
import { container } from '../components/shared'

const values = [
  {
    icon: Leaf,
    title: 'Eco-Friendly Plant-Based PLA',
    desc: 'We print exclusively with premium polylactic acid (PLA) derived from renewable fermented plant starch (cornstarch & sugarcane). It is non-toxic, odorless, and recyclable.',
  },
  {
    icon: Sparkles,
    title: 'Artisan Hand-Finishing',
    desc: 'Each print undergoes rigorous multi-stage post-processing: manual support de-burring, high-grit wet sanding, ultrasonic clean, and optional protective matte sealing.',
  },
  {
    icon: HeartHandshake,
    title: 'Community & Culture',
    desc: 'We celebrate Philippine heritage and local identity. From the iconic Sarao-style jeepneys to Mayon and the carabao, our designs turn everyday nostalgia into durable art.',
  },
]

const workshopHighlights = [
  { label: 'Layer Height Precision', value: '0.12 mm' },
  { label: 'Print Temperature Tuning', value: '215°C' },
  { label: 'Multi-Color AMS Extrusion', value: 'Up to 4 Colors' },
  { label: 'Hand-Finished Quality Inspection', value: '100% Inspected' },
]

export default function AboutPage() {
  return (
    <div className="py-10">
      {/* Editorial Hero Banner */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className={container}>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block font-script text-3xl sm:text-4xl text-terracotta">
              Crafted with heart in the Philippines
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-ink">
              Our Story &amp; Craftsmanship in Manila
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#555555]">
              babi MNL was founded out of a shared obsession with Filipino folklore, transit iconography, and the endless tactile possibilities of additive manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Heritage Section */}
      <section className="py-8">
        <div className={container}>
          <div className="grid items-center gap-10 rounded-3xl bg-white p-8 sm:p-12 lg:grid-cols-2 lg:gap-14 shadow-sm border border-black/5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta">Origins & Heritage</span>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl text-forest">
                Transforming Filipino Nostalgia into Tangible Keepsakes
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#555555]">
                <p>
                  Growing up navigating the vibrant streets of Metro Manila, the colorful roar of the passenger jeepney, the hardworking carabao in provincial fields, and warm coastal palms formed the backdrop of our lives.
                </p>
                <p>
                  In 2024, what began as a tabletop hobby of tweaking delta 3D printers quickly blossomed into babi MNL. We wanted souvenirs that departed from generic mass-produced trinkets: souvenirs that had weight, precision micro-geometry, and unmistakable local soul.
                </p>
                <p>
                  Today, every single medallion keychain, personalized desk nameplate, and miniature sculpture is carefully modeled in CAD, sliced with custom layer profiles, and inspected by hand before leaving our studio in Manila.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-forest-deep"
                >
                  Explore Catalog <ArrowRight size={15} />
                </Link>
                <Link
                  to="/custom-order"
                  className="inline-flex items-center gap-2 rounded-full border border-forest/30 bg-transparent px-6 py-2.5 text-sm font-semibold text-forest transition-all hover:bg-forest/5"
                >
                  Request Custom Order
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl border-4 border-stone-warm shadow-xl">
                <img
                  src="/images/product-bestseller-jeepney.jpg"
                  alt="3D printed jeepney keychain craftsmanship"
                  className="h-80 w-full object-cover sm:h-96"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 rounded-2xl bg-[#1B3B2B] p-5 text-white shadow-xl max-w-xs border border-white/10 hidden sm:block">
                <p className="font-script text-xl text-amber-soft">Zero-Waste Mindset</p>
                <p className="mt-1 text-xs text-white/80 leading-normal">
                  Our filament purge towers and failed prints are collected and sorted for closed-loop local material re-extrusion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-14">
        <div className={container}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta">Our Principles</span>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl text-ink">
              Mindfully Crafted, Built to Last
            </h2>
            <p className="mt-3 text-sm text-muted">
              We never compromise on safety, sustainability, or structural strength.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="flex flex-col justify-between rounded-3xl border border-black/5 bg-[#F5EFE6] p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-terracotta shadow-xs">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-forest">{v.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#555555]">
                      {v.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-terracotta">
                    <CheckCircle2 size={14} />
                    <span>Verified Studio Standard</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Workshop / Behind-The-Scenes Card */}
      <section className="py-8 pb-16">
        <div className={container}>
          <div className="overflow-hidden rounded-3xl bg-[#1B3B2B] text-white p-8 sm:p-12 lg:p-16 relative">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium text-amber-soft">
                <Printer size={14} /> Inside Our Manila Studio
              </div>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                The Science Behind Every 3D Print
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                Operating a print farm in tropical Manila requires precision temperature and humidity control. Our filaments are stored in vacuum-sealed desiccated chambers to prevent moisture bubbling, ensuring immaculate layer lines, zero stringing, and ultra-crisp lettering.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {workshopHighlights.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xl font-extrabold text-amber-soft">{stat.value}</p>
                    <p className="mt-1 text-[11px] text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
