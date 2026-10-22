import { Link } from 'react-router-dom'
import { Logo, container } from './shared'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Returns & Refunds Policy', href: '/returns' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#142B1F] pt-20 pb-10 text-white">
      <div className={container}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.5fr]">
          {/* Column 1: Brand */}
          <div>
            <Logo light href="/" />
            <p className="mt-4 max-w-[260px] text-xs leading-relaxed text-white/75">
              Highly-detailed 3D-printed souvenirs, custom keychains, nameplates, and figurines crafted in Manila with premium eco-friendly PLA.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/90">
              <span className="text-sm">🇵🇭</span>
              <span>Proudly Crafted in Manila, Philippines</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white/90">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-xs text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white/90">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-xs text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details (Exact structured business info) */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white/90">Contact</h3>
            <div className="mt-4 space-y-1.5 text-xs text-white/80 leading-relaxed font-sans">
              <p><span className="font-semibold text-white">Business Name:</span> Example Commerce LLC T/A Aeruva</p>
              <p><span className="font-semibold text-white">Business Registration No.:</span> 12345678</p>
              <p><span className="font-semibold text-white">Address:</span> Example Street 123, BL1 DF2, London, UK</p>
              <p>
                <span className="font-semibold text-white">Email:</span>{' '}
                <a href="mailto:info@aeruva.com" className="hover:text-terracotta underline transition-colors">
                  info@aeruva.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">Phone:</span>{' '}
                <a href="tel:+447491582736" className="hover:text-terracotta underline transition-colors">
                  +44 7 491 582 736
                </a>
              </p>
              <p><span className="font-semibold text-white">Opening hours:</span> Monday to Friday, 09:00-17:00 (GMT)</p>
              <p><span className="font-semibold text-white">Response time:</span> Within 24-48 hours</p>
            </div>
          </div>
        </div>

        {/* Bottom Center Social Bar & Copyright */}
        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col items-center justify-center text-center">
          {/* Circular social media icon chips: Facebook, Instagram, X/Twitter, TikTok, Pinterest */}
          <div className="flex items-center justify-center gap-3">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-[#D96B43] hover:text-white"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-[#D96B43] hover:text-white"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (formerly Twitter)"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-[#D96B43] hover:text-white"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-[#D96B43] hover:text-white"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.69c-.01 2.22-.77 4.41-2.18 6.1-1.78 2.14-4.5 3.33-7.29 3.24-2.88-.09-5.59-1.57-7.14-4.01-1.68-2.64-1.75-6.07-.18-8.77 1.56-2.69 4.49-4.37 7.61-4.32.4 0 .79.03 1.18.1v4.11c-.48-.12-.98-.18-1.48-.16-1.75.03-3.34.98-4.14 2.53-.87 1.68-.64 3.79.57 5.23 1.15 1.36 3.03 1.99 4.79 1.59 1.73-.39 3.01-1.9 3.14-3.66.04-.64.03-1.28.03-1.92V.02h-.42z"/>
              </svg>
            </a>

            {/* Pinterest */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-[#D96B43] hover:text-white"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.96-.13-2.44.03-3.49.14-.95.94-3.99.94-3.99s-.24-.48-.24-1.19c0-1.12.65-1.95 1.46-1.95.69 0 1.02.52 1.02 1.14 0 .69-.44 1.73-.67 2.69-.19.81.4 1.46 1.2 1.46 1.44 0 2.55-1.52 2.55-3.71 0-1.94-1.39-3.3-3.39-3.3-2.31 0-3.67 1.73-3.67 3.52 0 .7.27 1.44.61 1.85.07.08.08.15.06.23-.06.26-.2.82-.23.94-.04.15-.13.18-.3.11-1.12-.52-1.82-2.15-1.82-3.46 0-2.82 2.05-5.4 5.9-5.4 3.1 0 5.51 2.21 5.51 5.16 0 3.08-1.94 5.56-4.64 5.56-.91 0-1.76-.47-2.05-1.02l-.56 2.13c-.2 1.01-.74 2.28-1.1 3.08A12 12 0 1 0 12 0z"/>
              </svg>
            </a>
          </div>

          {/* Centered Copyright Line */}
          <p className="mt-4 text-xs text-white/60">
            © 2026 Babi MNL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
