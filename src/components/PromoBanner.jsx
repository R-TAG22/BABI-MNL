import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { container } from './shared'

export default function PromoBanner() {
  return (
    <section id="offer" className="py-8">
      <div className={container}>
        <div className="relative grid items-center overflow-hidden rounded-3xl bg-forest md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Special Offer - Get{' '}
              <span className="inline-block -rotate-2 rounded-full bg-terracotta px-3 py-0.5">20%</span>{' '}
              Off Your First Custom Order
            </h2>
            <p className="mt-4 max-w-sm text-sm text-white/75">
              Personalized desk nameplates, wedding tokens, or multi-tone keychains printed in Manila with premium PLA+.
            </p>
            <Link
              to="/custom-order"
              className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#c25b36] hover:shadow-lg active:translate-y-0"
            >
              Start Custom Order <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative h-56 md:h-full md:min-h-[260px]">
            <img
              src="/images/hero-image.jpg"
              alt="Collage of 3D printed miniature products"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[60%_55%] [mask-image:linear-gradient(to_right,transparent,black_30%)]"
            />
            <span className="absolute right-4 top-4 grid h-16 w-16 rotate-12 place-items-center rounded-full bg-terracotta text-center text-[10px] font-bold leading-tight text-white shadow-lg animate-float">
              Special<br />Promo
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
