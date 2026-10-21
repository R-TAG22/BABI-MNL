import { ArrowRight } from 'lucide-react'
import { Button, container } from './shared'

export default function PrintedWithLove() {
  return (
    <section id="story" className="py-8">
      <div className={container}>
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-forest p-8 sm:p-10 md:grid-cols-2 lg:p-14">
          <div>
            <h2 className="font-script text-5xl leading-none text-white sm:text-6xl">Printed with Love ♡</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
              Our handcrafted 3D process to template of our custom, and comfert and emotion relesent using premium custommole lot of love.
            </p>
            <Button className="mt-6 px-6 py-3 text-sm">
              Our Story <ArrowRight size={16} />
            </Button>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="h-64 w-64 overflow-hidden rounded-full border-4 border-white/10 shadow-2xl sm:h-80 sm:w-80">
                <img
                  src="/images/product-bestseller-jeepney.jpg"
                  alt="Jeepney keychain on a stone slab"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -right-4 -top-4 h-28 w-28 overflow-hidden rounded-full border-4 border-forest shadow-xl sm:h-32 sm:w-32 animate-float">
                <img
                  src="/images/Palm_tree_medallion_keychain_laid_2K_20261019221426.jpg"
                  alt="Palm tree medallion keychain"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
