import { BadgeCheck } from 'lucide-react'
import { Stars } from './shared'

export const customerReviews = [
  {
    id: 1,
    name: 'Andrei M.',
    location: 'Makati City',
    tag: 'Classic Jeepney Keychain',
    rating: 5,
    text: 'High durability to custom prints, and out of this world with our quality of detail. The layer lines are practically invisible and the dual colors pop beautifully!',
  },
  {
    id: 2,
    name: 'Sofia G.',
    location: 'Quezon City',
    tag: 'Custom Nameplates',
    rating: 5,
    text: 'Detailed prints for our custom badges & super fast communication. The packaging was eco-friendly and arrived in perfect shape.',
  },
  {
    id: 3,
    name: 'Patricia S.',
    location: 'San Juan',
    tag: 'Carabao Miniature',
    rating: 5,
    text: 'Detailed prints and quality craftsmanship on our order with precision and great for gifts. Gave these out as pasalubong to relatives abroad and they loved them.',
  },
  {
    id: 4,
    name: 'Miguel T.',
    location: 'BGC, Taguig',
    tag: 'Manila Palms Keychain',
    rating: 5,
    text: 'Ordered 50 custom desk nameplates for our design studio. Turnaround was under 4 days and every single piece was flawless.',
  },
  {
    id: 5,
    name: 'Bianca L.',
    location: 'Pasig City',
    tag: 'Baybayin Nameplate',
    rating: 5,
    text: 'The personalized Baybayin script nameplate looks stunning on my workstation! The embossed detail and warm stone finish exceeded expectations.',
  },
]

export default function ReviewMarquee({ className = '' }) {
  // Duplicate reviews array to create an infinite, seamless continuous scrolling loop
  const marqueeItems = [...customerReviews, ...customerReviews]

  return (
    <div className={`relative w-full overflow-hidden py-4 ${className}`}>
      {/* Left & Right Soft Fade Gradients for Seamless Infinity Look */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-gradient-to-r from-[#FBF8F2] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-gradient-to-l from-[#FBF8F2] to-transparent" />

      {/* Marquee Track with CSS continuous animation moving right to left */}
      <div className="flex w-max animate-marquee gap-5">
        {marqueeItems.map((review, index) => (
          <div
            key={`${review.id}-${index}`}
            className="flex min-w-[320px] max-w-[380px] shrink-0 flex-col justify-between rounded-2xl border border-[#EFEAE2] bg-[#FFFFFF] p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-black/10 select-none"
          >
            <div>
              {/* Stars & Verified Customer Badge */}
              <div className="flex items-center justify-between">
                <Stars count={review.rating} size={14} />
                <span className="flex items-center gap-1 text-xs font-semibold text-[#2e7d4f]">
                  <BadgeCheck size={14} /> Verified Buyer
                </span>
              </div>

              {/* Quote Text */}
              <blockquote className="mt-4 text-sm leading-relaxed text-[#444444]">
                "{review.text}"
              </blockquote>
            </div>

            {/* Customer Details & Avatar Circle */}
            <div className="mt-5 flex items-center gap-3 border-t border-black/5 pt-4">
              <div
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1B3B2B] text-xs font-bold text-white shadow-xs"
                aria-label={`${review.name} avatar`}
              >
                {review.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-ink truncate">{review.name}</p>
                <p className="text-[11px] text-muted truncate">
                  {review.location} • <span className="text-terracotta">{review.tag}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
