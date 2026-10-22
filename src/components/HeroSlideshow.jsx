import { useState, useEffect } from 'react'

const slides = [
  {
    id: 1,
    src: '/assets/aistudio/Edit_image_background_colors_2K_20261022125932_a539af2e.jpg',
    fallbackSrc: '/images/hero-image.jpg',
    alt: 'Jeepney & Carabao stack with Life is better with 3D prints banner',
    caption: 'Manila Heritage Stack',
  },
  {
    id: 2,
    src: '/images/product-bestseller-jeepney.jpg',
    fallbackSrc: '/images/product-bestseller-jeepney.jpg',
    alt: 'Close-up of the Classic Manila Jeepney Keychain on stone podium',
    caption: 'Classic Jeepney Keychain',
  },
  {
    id: 3,
    src: '/images/Palm_tree_medallion_keychain_laid_2K_20261019221426.jpg',
    fallbackSrc: '/images/Palm_tree_medallion_keychain_laid_2K_20261019221426.jpg',
    alt: 'Palms medallion keychain laid flat on warm surface',
    caption: 'Miniature Palm Medallion',
  },
]

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [isPaused])

  const goToSlide = (index) => {
    setCurrent(index)
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-[32px] bg-stone-warm shadow-xl border border-black/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="3D Prints Hero Slideshow"
    >
      {/* Strict 16:9 Aspect Ratio Container */}
      <div className="relative aspect-video w-full overflow-hidden">
        {slides.map((slide, idx) => {
          const isActive = idx === current
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                onError={(e) => {
                  if (slide.fallbackSrc && e.currentTarget.src !== slide.fallbackSrc) {
                    e.currentTarget.src = slide.fallbackSrc
                  }
                }}
                className="h-full w-full object-cover"
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          )
        })}

        {/* Subtle Gradient Overlay on bottom for dot readability */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent z-20" />

        {/* Manual Pagination Dots at Bottom-Right */}
        <div
          className="absolute bottom-4 right-5 z-30 flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-md px-3 py-1.5 border border-white/10"
          role="tablist"
          aria-label="Slideshow pagination"
        >
          {slides.map((slide, idx) => {
            const isActive = idx === current
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${idx + 1}: ${slide.caption}`}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 cursor-pointer rounded-full ${
                  isActive
                    ? 'h-2.5 w-6 bg-terracotta shadow-xs'
                    : 'h-2.5 w-2.5 bg-white/70 hover:bg-white'
                }`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
