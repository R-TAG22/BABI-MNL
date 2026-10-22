import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ShoppingBag } from 'lucide-react'
import { Stars, container } from './shared'
import { productsData } from '../data/products'

export default function BestSellers({ onAddToCart }) {
  const [addedItem, setAddedItem] = useState(null)

  // Use top 4 best sellers
  const products = productsData.slice(0, 4)

  const handleAdd = (p) => {
    if (onAddToCart) {
      onAddToCart({
        id: p.id,
        name: p.name,
        price: p.price,
        img: p.image,
        quantity: 1,
      })
    }
    setAddedItem(p.id)
    setTimeout(() => {
      setAddedItem((curr) => (curr === p.id ? null : curr))
    }, 1500)
  }

  return (
    <section id="best-sellers" className="py-14">
      <div className={container}>
        <div className="mx-auto max-w-xl text-center">
          <span className="font-script text-2xl text-terracotta">Customer Favorites</span>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl text-ink">
            Best Sellers for Every Moment
          </h2>
          <p className="mt-3 text-sm text-muted">
            From iconic jeepneys to personalized desk keepsakes, handcrafted with durable eco-friendly PLA.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {products.map((p) => {
            const isAdded = addedItem === p.id
            return (
              <article
                key={p.id}
                className="flex flex-col justify-between rounded-3xl border border-black/5 bg-[#F5EFE6] p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <Link
                    to={`/products/${p.slug}`}
                    className="block overflow-hidden rounded-2xl bg-white aspect-square group"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="aspect-square w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  <h3 className="mt-3 px-1 text-sm font-semibold text-ink line-clamp-2">
                    <Link to={`/products/${p.slug}`} className="hover:text-terracotta transition-colors">
                      {p.name}
                    </Link>
                  </h3>
                  <div className="mt-1 px-1 flex items-center justify-between">
                    <Stars size={13} />
                    <span className="text-[11px] text-muted font-bold">★ {p.rating}</span>
                  </div>
                  <p className="mt-1 px-1 text-lg font-extrabold text-ink">₱{p.price}</p>
                </div>

                <div className="mt-3 pt-1 flex gap-2">
                  <Link
                    to={`/products/${p.slug}`}
                    className="flex-1 rounded-full border border-forest/20 text-center py-2 text-[11px] font-semibold text-forest hover:bg-forest/5"
                  >
                    Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleAdd(p)}
                    className={`flex items-center justify-center gap-1 rounded-full px-3 py-2 text-[11px] font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                      isAdded
                        ? 'bg-forest text-white'
                        : 'bg-terracotta text-white hover:bg-[#c25b36]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={12} /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={12} /> Add
                      </>
                    )}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
