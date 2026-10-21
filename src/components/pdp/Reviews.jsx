import { BadgeCheck } from 'lucide-react'
import { Placeholder, Stars, container } from '../shared'

const quotes = [
  { name: 'Andrei M.', text: 'Amazing quality!' },
  { name: 'Sofia G.', text: 'Very detailed! The detailed craftsmanship and amazing quality!' },
  { name: 'Patricia S.', text: 'This came very quickly with great authenticity.' },
]

function Avatar({ name }) {
  return <span className="grid h-6 w-6 place-items-center rounded-full bg-[#EFEAE2] text-[10px] font-semibold text-[#8A8275]">{name[0]}</span>
}

export default function Reviews() {
  return (
    <section className="py-12">
      <div className={container}>
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Customer Reviews &amp; Photo Gallery</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <Placeholder label="Customer photo: keychain with car keys" className="col-span-2 aspect-[16/9] rounded-2xl" />
            <Placeholder label="Customer photo: keychain on bag" className="aspect-square rounded-2xl" />
            <Placeholder label="Customer photo: keychain on desk" className="aspect-square rounded-2xl" />
          </div>
          <div className="flex flex-col gap-4">
            <figure className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Stars size={14} />
                <span className="flex items-center gap-1 text-xs font-semibold text-[#2e7d4f]"><BadgeCheck size={14} />Verified Buyer</span>
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed">
                "This one is very neatly done! Detailed, a real custom keychain, and the colors are so vibrant. Great collaboration and logistics."
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2 text-xs font-semibold"><Avatar name="Andrei M." />Andrei M.</figcaption>
            </figure>
            <div className="grid items-start gap-3 sm:grid-cols-3">
              {quotes.map((q) => (
                <figure key={q.name} className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
                  <Stars size={11} />
                  <blockquote className="mt-2 text-xs leading-snug text-muted">"{q.text}"</blockquote>
                  <figcaption className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold"><Avatar name={q.name} />{q.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
