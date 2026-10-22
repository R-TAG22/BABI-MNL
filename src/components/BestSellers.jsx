import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ShoppingBag } from 'lucide-react'
import { Placeholder, Stars, container } from './shared'

const products = [
  { id: 'bestseller-jeepney', name: 'Jeepney Keychain', price: 299, img: '/images/product-bestseller-jeepney.jpg', isPdp: true },
  { id: 'bestseller-nameplate', name: 'Custom Nameplates', price: 199 },
  { id: 'bestseller-carabao', name: 'Carabao Miniature', price: 350, img: '/images/carabao.jpg' },
  { id: 'bestseller-palm', name: 'Miniature Palm', price: 150, img: '/images/Palm_tree_medallion_keychain_laid_2K_20261019221426.jpg' },
]

export default function BestSellers({ onAddToCart }) {
  const [addedItem, setAddedItem] = useState(null)

  const handleAdd = (p) => {
    if (onAddToCart) onAddToCart(p)
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
                className="flex flex-col justify-between rounded-3xl border border-black/5 bg-stone-warm p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  {p.img ? (
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="aspect-square w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <Placeholder label={p.name} className="aspect-square rounded-2xl" />
                  )}
                  <h3 className="mt-3 px-1 text-sm font-semibold text-ink">
                    {p.isPdp ? (
                      <Link to="/product" className="hover:text-terracotta transition-colors">
                        {p.name}
                      </Link>
                    ) : (
                      <Link to="/products" className="hover:text-terracotta transition-colors">
                        {p.name}
                      </Link>
                    )}
                  </h3>
                  <div className="mt-1 px-1">
                    <Stars />
                  </div>
                  <p className="mt-1 px-1 text-lg font-extrabold text-ink">₱{p.price}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd(p)}
                  className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-full py-2 text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                    isAdded
                      ? 'bg-forest text-white'
                      : 'bg-terracotta text-white hover:bg-[#c25b36]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={14} /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} /> Add to Cart
                    </>
                  )}
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
