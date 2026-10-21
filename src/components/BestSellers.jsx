import { Button, Placeholder, Stars, container } from './shared'

const products = [
  { name: 'Jeepney Keychain', price: 299, img: '/images/product-bestseller-jeepney.jpg' },
  { name: 'Nameplates', price: 199 },
  { name: 'Carabao Miniature', price: 350 },
  { name: 'Miniature Palm', price: 150, img: '/images/Palm_tree_medallion_keychain_laid_2K_20261019221426.jpg' },
]

export default function BestSellers() {
  return (
    <section id="best-sellers" className="py-14">
      <div className={container}>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Best Sellers for Every Moment</h2>
          <p className="mt-3 text-sm text-muted">
            From souvenirs to photographs to indulgent desks, every dish is tumotalte to tentaille buds.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {products.map((p) => (
            <article key={p.name} className="flex flex-col rounded-3xl border border-black/5 bg-stone-warm p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              {p.img ? (
                <img src={p.img} alt={p.name} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
              ) : (
                <Placeholder label={p.name} className="aspect-square rounded-2xl" />
              )}
              <h3 className="mt-3 px-1 text-sm font-semibold">
                {p.name === 'Jeepney Keychain' ? <a href="#/product" className="hover:text-terracotta">{p.name}</a> : p.name}
              </h3>
              <div className="mt-1 px-1"><Stars /></div>
              <p className="mt-1 px-1 text-lg font-extrabold">₱{p.price}</p>
              <Button className="mt-3 w-full py-2 text-xs">Add to Cart</Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
