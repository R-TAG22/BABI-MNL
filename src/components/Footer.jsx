import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Logo, container } from './shared'

const quick = ['Home', 'About Us', 'Custom Prints', 'Careers', 'Blog']
const cats = ['About Us', 'Product Links', 'Category Links', 'Contact', 'Contact Us']
const socials = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'X / Twitter' },
  { icon: Youtube, label: 'YouTube' },
]

function LinkCol({ title, items }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i}><a href="#home" className="text-xs text-white/70 transition-colors hover:text-white">{i}</a></li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-forest-deep pt-20 pb-6 text-white">
      <div className={container}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-[220px] text-xs leading-relaxed text-white/70">
              3D printed souvenirs and custom designs made with care in Manila, Philippines
            </p>
          </div>
          <LinkCol title="Quick Links" items={quick} />
          <LinkCol title="Category Links" items={cats} />
          <div>
            <h3 className="text-sm font-bold">Contact</h3>
            <div className="mt-4 flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a key={label} href="#home" aria-label={label} className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-terracotta">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-5 text-[11px] text-white/60">
          © 2026 Babi MNL. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
