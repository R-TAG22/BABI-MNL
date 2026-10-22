import { Star } from 'lucide-react'

export const container = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'

export function Logo({ light = false, className = '', href = '/' }) {
  const color = light ? 'text-white' : 'text-forest'
  return (
    <a href={href} className={`inline-flex flex-col leading-none ${color} ${className}`} aria-label="babi MNL home">
      <span className="flex items-center gap-1 text-2xl font-extrabold lowercase tracking-tight">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 9 4 3l5 3M19 9l1-6-5 3" />
          <rect x="4" y="6" width="16" height="14" rx="5" />
          <circle cx="9" cy="13" r="0.8" fill="currentColor" />
          <circle cx="15" cy="13" r="0.8" fill="currentColor" />
        </svg>
        babi
      </span>
      <span className="mt-0.5 pl-6 text-[9px] font-semibold uppercase tracking-[0.35em]">MNL</span>
    </a>
  )
}

export function Stars({ count = 5, size = 14 }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} className="fill-star text-star" />
      ))}
    </div>
  )
}

export function Placeholder({ label, className = '' }) {
  return (
    <div className={`bg-[#EFEAE2] flex items-center justify-center text-xs text-[#8A8275] border border-black/5 text-center px-2 ${className}`}>
      {label}
    </div>
  )
}

export function Button({ children, variant = 'terracotta', className = '', ...props }) {
  const styles = {
    terracotta: 'bg-terracotta text-white hover:bg-[#c25b36]',
    forest: 'bg-forest text-white hover:bg-forest-deep',
  }[variant]
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
