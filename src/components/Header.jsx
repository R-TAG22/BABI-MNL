import { useState } from 'react'
import { Search, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react'
import { Logo, container } from './shared'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#story' },
  { label: 'Products', href: '#products', dropdown: true },
  { label: 'Custom Orders', href: '#offer' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/85 backdrop-blur-md">
      <div className={`${container} flex h-16 items-center justify-between gap-6`}>
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="flex items-center gap-1 text-[13px] font-medium text-ink transition-colors hover:text-terracotta">
              {l.label}
              {l.dropdown && <ChevronDown size={13} />}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <button aria-label="Search" className="cursor-pointer text-ink transition-colors hover:text-terracotta"><Search size={18} /></button>
          <button aria-label="Cart" className="cursor-pointer text-ink transition-colors hover:text-terracotta"><ShoppingBag size={18} /></button>
          <a href="#offer" className="hidden rounded-full bg-forest px-4 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-md sm:inline-block">
            Custom Order CTA
          </a>
          <button aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)} className="cursor-pointer md:hidden">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-black/5 bg-cream px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium">{l.label}</a>
              </li>
            ))}
            <li>
              <a href="#offer" className="inline-block rounded-full bg-forest px-4 py-2 text-xs font-semibold text-white">Custom Order CTA</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
