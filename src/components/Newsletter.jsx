import { useState } from 'react'
import { Button, container } from './shared'

export default function Newsletter() {
  const [sent, setSent] = useState(false)
  return (
    <section className="pt-10 pb-0">
      <div className={`${container} relative z-10 -mb-12`}>
        <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-terracotta px-6 py-6 text-white shadow-xl sm:px-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold">Stay in the Loop</h2>
            <p className="mt-1 text-sm text-white/85">Get updates on new designs &amp; custom releases</p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true) }}
            className="flex w-full items-center rounded-full bg-white p-1 md:max-w-md"
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Email address"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-ink outline-none placeholder:text-[#8A8275]"
            />
            <Button variant="forest" type="submit" className="px-5 py-2.5 text-sm">
              {sent ? 'Subscribed ✓' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
