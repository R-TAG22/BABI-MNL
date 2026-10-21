import { ArrowRight } from 'lucide-react'
import { Button, container } from './shared'

export default function PromoBanner() {
  return (
    <section id="offer" className="py-8">
      <div className={container}>
        <div className="relative grid items-center overflow-hidden rounded-3xl bg-forest md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Special Offer - Get{' '}
              <span className="inline-block -rotate-2 rounded-full bg-terracotta px-3 py-0.5">20%</span>{' '}
              Off Your First Order
            </h2>
            <p className="mt-4 max-w-sm text-sm text-white/75">
              Custom prints photography in custom modern form life.
            </p>
            <Button className="mt-6 px-6 py-3 text-sm">
              Order Now <ArrowRight size={16} />
            </Button>
          </div>
          <div className="relative h-56 md:h-full md:min-h-[260px]">
            <img
              src="/images/hero-image.jpg"
              alt="Collage of 3D printed miniature products"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[60%_55%] [mask-image:linear-gradient(to_right,transparent,black_30%)]"
            />
            <span className="absolute right-4 top-4 grid h-16 w-16 rotate-12 place-items-center rounded-full bg-terracotta text-center text-[10px] font-bold leading-tight text-white shadow-lg animate-float">
              Custom<br />Badge
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
