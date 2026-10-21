import { useState } from 'react'
import { Stars, container } from '../shared'

const items = [
  { name: 'Classic Jeepney Keychain', price: 299, img: '/images/product-bestseller-jeepney.jpg' },
  { name: 'Carabao Miniature', price: 350, img: '/images/carabao.jpg' },
  { name: 'Manila Palms Keychain', price: 199, img: '/images/Palm_tree_medallion_keychain_laid_2K_20261019221426.jpg' },
]

function Card({ p }) {
  const [added, setAdded] = useState(false)
  return (
    <article className="rounded-3xl border border-black/5 bg-stone-warm p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img src={p.img} alt={p.name} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
      <h3 className="mt-3 px-1 text-sm font-bold">{p.name}</h3>
      <div className="mt-1 px-1"><Stars size={13} /></div>
      <p className="mt-1 px-1 text-lg font-extrabold">₱{p.price}</p>
      <button
        onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500) }}
        className="mt-3 w-full cursor-pointer rounded-full bg-[#2B2B2B] py-2.5 text-xs font-semibold text-white transition-all hover:bg-black hover:shadow-lg"
      >
        {added ? 'Added ✓' : 'Add to Bag'}
      </button>
    </article>
  )
}

export default function PdpBestSellers() {
  return (
    <section className="py-12">
      <div className={container}>
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Best Sellers</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((p) => <Card key={p.name} p={p} />)}
        </div>
      </div>
    </section>
  )
}
