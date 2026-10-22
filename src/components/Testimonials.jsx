import { container } from './shared'
import ReviewMarquee from './ReviewMarquee'

export default function Testimonials() {
  return (
    <section className="py-14 overflow-hidden">
      <div className={container}>
        <div className="mx-auto max-w-xl text-center">
          <span className="font-script text-2xl text-terracotta">Real Stories</span>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl text-ink">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted">
            Loved by travelers, corporate teams, and Filipino collectors across the globe.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Review Marquee */}
      <div className="mt-10">
        <ReviewMarquee />
      </div>
    </section>
  )
}
