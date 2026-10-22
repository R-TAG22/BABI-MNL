import { useState } from 'react'
import { Mail, Phone, Clock, MapPin, Building, Send, CheckCircle2 } from 'lucide-react'
import { container } from '../components/shared'

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="py-12">
      <div className={container}>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-script text-3xl text-terracotta">We'd love to hear from you</span>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-5xl text-ink">
            Get in Touch
          </h1>
          <p className="mt-3 text-sm text-muted">
            Have questions about a custom design, corporate order, or delivery status? Send us a message below.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Contact Inquiry Form (7 cols) */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-10 shadow-sm lg:col-span-7">
            <h2 className="text-xl font-bold text-forest">Send Us an Inquiry</h2>
            <p className="mt-1 text-xs text-muted">Fill out the form below and we will get back to you shortly.</p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-[#5eba8a]/30 bg-[#5eba8a]/10 p-6 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#5eba8a] text-white">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="mt-4 text-base font-bold text-forest">Message Dispatched!</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#444444]">
                  Thank you, <span className="font-semibold text-ink">{formState.name || 'there'}</span>. Your inquiry has been received. Our team will review it and reply to <span className="font-semibold text-ink">{formState.email}</span> within 24-48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setFormState({ name: '', email: '', subject: '', message: '' })
                  }}
                  className="mt-6 rounded-full bg-forest px-6 py-2 text-xs font-semibold text-white hover:bg-forest-deep"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-ink">
                      Your Name <span className="text-terracotta">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Maria Santos"
                      className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-ink">
                      Email Address <span className="text-terracotta">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="maria@example.com"
                      className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-ink">
                    Subject <span className="text-terracotta">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Custom Wedding Favors / Product Inquiry"
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-ink">
                    Message <span className="text-terracotta">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us what you have in mind, required quantities, target timeline, or special requirements..."
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D96B43] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#c25b36] hover:shadow-md cursor-pointer active:scale-95"
                >
                  <Send size={15} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Business Info Card (5 cols) */}
          <div className="rounded-3xl border border-black/5 bg-[#F5EFE6] p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">
                <Building size={14} /> Official Business Information
              </div>

              <h2 className="mt-4 text-xl font-bold text-forest">Operating Details</h2>
              <p className="mt-1 text-xs text-muted">
                Our support desk is ready to assist you during regular operating hours.
              </p>

              <div className="mt-6 space-y-4 text-xs sm:text-sm text-[#444444]">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-forest shadow-xs">
                    <Building size={14} />
                  </div>
                  <div>
                    <span className="font-bold text-ink">Business Name</span>
                    <p className="text-xs text-[#555555]">Example Commerce LLC T/A Aeruva</p>
                    <p className="text-[11px] text-muted">Reg No.: 12345678</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-forest shadow-xs">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <span className="font-bold text-ink">Registered Address</span>
                    <p className="text-xs text-[#555555]">Example Street 123, BL1 DF2, London, UK</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-forest shadow-xs">
                    <Mail size={14} />
                  </div>
                  <div>
                    <span className="font-bold text-ink">Email Inquiries</span>
                    <p className="text-xs">
                      <a href="mailto:info@aeruva.com" className="text-terracotta hover:underline font-medium">
                        info@aeruva.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-forest shadow-xs">
                    <Phone size={14} />
                  </div>
                  <div>
                    <span className="font-bold text-ink">Telephone</span>
                    <p className="text-xs">
                      <a href="tel:+447491582736" className="text-terracotta hover:underline font-medium">
                        +44 7 491 582 736
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-forest shadow-xs">
                    <Clock size={14} />
                  </div>
                  <div>
                    <span className="font-bold text-ink">Opening Hours</span>
                    <p className="text-xs text-[#555555]">Monday to Friday, 09:00 - 17:00 (GMT)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expected Response Time Callout */}
            <div className="mt-8 rounded-2xl bg-[#1B3B2B] p-4 text-white">
              <p className="text-xs font-semibold text-amber-soft uppercase tracking-wider">Fast Turnaround</p>
              <p className="mt-1 text-sm font-bold">Response time: Within 24-48 hours</p>
              <p className="mt-1 text-xs text-white/70">
                All inquiries submitted during business hours are queued immediately for review by our fabrication team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
