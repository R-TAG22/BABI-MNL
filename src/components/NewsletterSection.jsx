import { useState } from 'react'
import { Check } from 'lucide-react'
import { container } from './shared'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
      setSubscribed(false)
    }, 4000)
  }

  return (
    <section className="pt-10 pb-0">
      <div className={`${container} relative z-10 -mb-12`}>
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#D96B43] px-6 py-7 text-white shadow-xl sm:px-10 md:flex-row md:items-center">
          <div className="max-w-md">
            <h2 className="text-2xl font-extrabold sm:text-3xl text-white">Stay in the Loop</h2>
            <p className="mt-1 text-sm text-white/90">
              Get updates on new designs &amp; custom releases
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center rounded-full bg-white p-1 shadow-sm md:max-w-md"
          >
            <label htmlFor="newsletter-email-input" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-[#1C1C1C] outline-none placeholder:text-[#8A8275]"
            />
            <button
              type="submit"
              disabled={subscribed}
              className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#1B3B2B] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-forest-deep active:scale-95 disabled:opacity-90"
            >
              {subscribed ? (
                <>
                  <Check size={14} /> Subscribed
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
