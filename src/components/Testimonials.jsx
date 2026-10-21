import { Stars, container } from './shared'

const reviews = [
  { name: 'Andrei M.', text: 'High durability to custom prints, and out of this world with our quality of detail.' },
  { name: 'Sofia G.', text: 'Detailed prints for our custom badges & super fast communication and prints.' },
  { name: 'Patricia S.', text: 'Detailed prints and quality prints on our order with precision and great for gifts.' },
]

export default function Testimonials() {
  return (
    <section className="py-14">
      <div className={container}>
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">What Our Customers Say</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-2xl border border-black/5 bg-[#FDFBF7] p-5 shadow-sm transition-shadow hover:shadow-md">
              <figcaption className="text-sm font-bold">{r.name}</figcaption>
              <div className="mt-1"><Stars /></div>
              <blockquote className="mt-3 text-sm leading-relaxed text-muted">"{r.text}"</blockquote>
              <div
                className="mt-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-[#EFEAE2] text-[10px] font-semibold text-[#8A8275]"
                aria-label={`${r.name} avatar`}
              >
                {r.name[0]}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
