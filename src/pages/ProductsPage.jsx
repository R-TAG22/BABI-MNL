import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, ShoppingBag, Check } from 'lucide-react'
import { Stars, container } from '../components/shared'
import { productsData } from '../data/products'

const categories = ['All', 'Keychains', 'Nameplates', 'Miniatures', 'Playful Toys']

export default function ProductsPage({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [addedId, setAddedId] = useState(null)

  const filteredProducts = useMemo(() => {
    return productsData
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'All' || item.category === selectedCategory
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        return 0
      })
  }, [selectedCategory, searchQuery, sortBy])

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.image,
        quantity: 1,
      })
    }
    setAddedId(product.id)
    setTimeout(() => {
      setAddedId((curr) => (curr === product.id ? null : curr))
    }, 1500)
  }

  return (
    <div className="py-10">
      <div className={container}>
        {/* Page Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-script text-3xl text-terracotta">Handcrafted catalog</span>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-5xl text-ink">
            Explore Our 3D Prints
          </h1>
          <p className="mt-3 text-sm text-[#666666]">
            Every piece is precisely 3D printed with plant-based PLA and hand-finished in Manila.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="mt-10 flex flex-col gap-5 border-b border-black/5 pb-6">
          {/* Category Filtering Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-forest text-white shadow-sm'
                    : 'bg-[#F5EFE6] text-[#444444] hover:bg-[#eae3d7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-black/10 bg-white py-2 pl-9 pr-4 text-xs sm:text-sm outline-none focus:border-terracotta"
              />
            </div>

            <div className="flex items-center justify-between gap-3 text-xs sm:text-sm text-muted">
              <span>Showing {filteredProducts.length} items</span>
              <div className="flex items-center gap-2">
                <Filter size={14} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-black/10 bg-white px-2.5 py-1.5 text-xs text-ink outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Catalog Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {filteredProducts.map((p) => {
            const isJustAdded = addedId === p.id
            return (
              <article
                key={p.id}
                className="group flex flex-col justify-between rounded-3xl border border-black/5 bg-[#F5EFE6] p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="relative overflow-hidden rounded-2xl bg-white aspect-square">
                    <Link to={`/products/${p.slug}`}>
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    {p.badge && (
                      <span className="absolute top-2.5 left-2.5 rounded-full bg-forest/90 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 px-1 text-sm font-semibold text-ink line-clamp-2">
                    <Link to={`/products/${p.slug}`} className="hover:text-terracotta transition-colors">
                      {p.name}
                    </Link>
                  </h3>

                  <div className="mt-1.5 px-1 flex items-center justify-between">
                    <Stars size={13} />
                    <span className="text-[11px] text-muted font-bold">★ {p.rating}</span>
                  </div>

                  <p className="mt-2 px-1 text-lg font-extrabold text-ink">₱{p.price}</p>
                </div>

                <div className="mt-3 pt-2 flex gap-2">
                  <Link
                    to={`/products/${p.slug}`}
                    className="flex-1 rounded-full border border-forest/20 text-center py-2 text-xs font-semibold text-forest hover:bg-forest/5"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(p)}
                    className={`flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                      isJustAdded
                        ? 'bg-forest text-white'
                        : 'bg-terracotta text-white hover:bg-[#c25b36] shadow-xs'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check size={14} /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} /> Add
                      </>
                    )}
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="my-16 text-center">
            <p className="text-base font-semibold text-ink">No products found in this category.</p>
            <p className="mt-1 text-xs text-muted">Try choosing another filter or resetting your search.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="mt-4 rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
