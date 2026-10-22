import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, MapPin, BadgeCheck, Sparkles } from 'lucide-react'
import { container } from './shared'

const slides = [
  {
    id: 1,
    image: '/assets/aistudio/Edit_image_background_colors_2K_20261022125932_a539af2e.jpg',
    fallbackImage: '/images/hero-image.jpg',
    tag: 'Freshly Crafted in Manila ♡',
    headline: 'Freshly Crafted 3D Printed Goodness in Manila',
    subtitle:
      'At Babi MNL, we craft highly-detailed 3D-printed souvenirs and custom keychains using premium materials.',
  },
  {
    id: 2,
    image: '/images/product-bestseller-jeepney.jpg',
    fallbackImage: '/images/product-bestseller-jeepney.jpg',
    tag: 'Personalized Fabrication ♡',
    headline: 'Custom Manila Nameplates & Desk Accessories',
    subtitle:
      'Personalized tags and artisan collectibles built with precision 3D layering.',
  },
  {
    id: 3,
    image: '/images/Palm_tree_medallion_keychain_laid_2K_20261019221426.jpg',
    fallbackImage: '/images/Palm_tree_medallion_keychain_laid_2K_20261019221426.jpg',
    tag: 'Sustainable Craftsmanship ♡',
    headline: 'Eco-Friendly Souvenirs & Playful Toys',
    subtitle:
      'Sustainable plant-based PLA materials crafted with care and passion in the Philippines.',
  },
]

const trustBadges = [
  { icon: Leaf, label: 'Eco-Friendly PLA' },
  { icon: MapPin, label: 'Local Craftsmanship' },
  { icon: BadgeCheck, label: 'Premium Quality' },
]

export default function Hero({ settings }) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const activeSlides = [
    {
      ...slides[0],
      headline: settings?.headline || slides[0].headline,
      subtitle: settings?.subtitle || slides[0].subtitle,
      tag: settings?.tag || slides[0].tag,
    },
    slides[1],
    slides[2],
  ]

  const intervalTime = settings?.autoRotateInterval || 3000

  // Auto-rotation timer based on CMS settings
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeSlides.length)
    }, intervalTime)

    return () => clearInterval(timer)
  }, [isPaused, intervalTime, activeSlides.length])

  const activeSlide = activeSlides[current]

  return (
    <section
      id="home"
      className="relative flex min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] w-full items-center overflow-hidden bg-[#142B1F]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Full-Width Hero Slideshow"
    >
      {/* Background Slides with Smooth Crossfade Transition */}
      {slides.map((slide, idx) => {
        const isActive = idx === current
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
            }`}
            aria-hidden={!isActive}
          >
            <img
              src={slide.image}
              alt={slide.headline}
              onError={(e) => {
                if (slide.fallbackImage && e.currentTarget.src !== slide.fallbackImage) {
                  e.currentTarget.src = slide.fallbackImage
                }
              }}
              className="h-full w-full object-cover object-center"
              fetchPriority={idx === 0 ? 'high' : 'auto'}
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        )
      })}

      {/* Dark Overlay Gradient Ensuring Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/45 z-10" />

      {/* Hero Foreground Content */}
      <div className={`${container} relative z-20 py-16 sm:py-24 text-white w-full`}>
        <div className="max-w-3xl">
          {/* Script Accent Tag */}
          <p className="font-script text-3xl sm:text-4xl text-[#F4B342] drop-shadow-sm transition-all duration-500">
            {activeSlide.tag}
          </p>

          {/* Dynamic Headline */}
          <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-md min-h-[72px] sm:min-h-[120px] lg:min-h-[140px] flex items-center">
            {activeSlide.headline}
          </h1>

          {/* Dynamic Subtitle */}
          <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed drop-shadow-xs min-h-[48px] sm:min-h-[56px]">
            {activeSlide.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Hero CTA Button: Order Now */}
            <Link
              to="/products"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#D96B43] px-8 py-3.5 text-sm sm:text-base font-medium text-white shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#c25b36] hover:shadow-2xl active:scale-95"
            >
              Order Now <ArrowRight size={18} />
            </Link>

            <Link
              to="/custom-order"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs px-6 py-3.5 text-sm sm:text-base font-medium text-white shadow-md transition-all duration-200 hover:bg-white/20 active:scale-95"
            >
              <Sparkles size={16} /> Custom Order
            </Link>
          </div>

          {/* Trust Badges Row */}
          <ul className="mt-10 flex flex-wrap items-center gap-4 sm:gap-8 pt-4 border-t border-white/15">
            {trustBadges.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white/90">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-[#5EBA8A]">
                  <Icon size={16} strokeWidth={2} />
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  )
}
