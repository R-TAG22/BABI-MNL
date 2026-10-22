import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { Logo, container } from './shared'

const links = [
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQs', href: '/faqs' },
]

export default function Header({ cartCount = 0, onOpenCart }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FBF8F2]/90 backdrop-blur-md">
      <div className={`${container} flex h-16 items-center justify-between gap-6`}>
        <Link to="/" aria-label="babi MNL home">
          <Logo />
        </Link>

        {/* Desktop Nav: ONLY the 4 required links */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const isActive = location.pathname === l.href
            return (
              <Link
                key={l.label}
                to={l.href}
                className={`text-[13px] font-semibold transition-colors hover:text-terracotta ${
                  isActive ? 'text-terracotta' : 'text-ink'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/products"
            aria-label="Search products"
            className="cursor-pointer text-ink transition-colors hover:text-terracotta"
          >
            <Search size={18} />
          </Link>

          <button
            aria-label="Cart"
            onClick={onOpenCart}
            className="relative cursor-pointer text-ink transition-colors hover:text-terracotta"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Action Button: Custom Order linking to /custom-order */}
          <Link
            to="/custom-order"
            className="hidden rounded-full bg-[#1B3B2B] px-5 py-2 text-sm font-medium text-white transition-all hover:bg-opacity-90 active:scale-95 sm:inline-block"
          >
            Custom Order
          </Link>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-ink md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav aria-label="Mobile" className="border-t border-black/5 bg-[#FBF8F2] px-4 py-5 shadow-lg md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={`block text-base font-semibold transition-colors ${
                    location.pathname === l.href ? 'text-terracotta' : 'text-ink'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/custom-order"
                onClick={() => setOpen(false)}
                className="inline-block w-full text-center rounded-full bg-[#1B3B2B] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-opacity-90"
              >
                Custom Order
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
