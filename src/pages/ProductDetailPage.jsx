import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ChevronRight,
  Minus,
  Plus,
  ShieldCheck,
  BadgeCheck,
  Leaf,
  Award,
  Check,
  X,
  ShoppingBag,
} from 'lucide-react'
import { Stars, container } from '../components/shared'
import { productsData, getProductBySlug } from '../data/products'
import ReviewMarquee from '../components/ReviewMarquee'

export default function ProductDetailPage({ onAddToCart }) {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('Features')
  const [isAdded, setIsAdded] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  // Reset image and state when product slug changes
  useEffect(() => {
    setActiveImageIndex(0)
    setSelectedVariationIndex(0)
    setQuantity(1)
    setActiveTab('Features')
    window.scrollTo(0, 0)
  }, [slug])

  const gallery = product.gallery || [
    { src: product.image, alt: product.name, pos: 'center' },
  ]

  const variations = product.variations || []

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        id: `${product.id}-${variations[selectedVariationIndex]?.name || 'default'}`,
        name: `${product.name} (${variations[selectedVariationIndex]?.name || 'Standard'})`,
        price: product.price,
        img: product.image,
        quantity: quantity,
      })
    }
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1800)
  }

  // Related products (exclude current)
  const relatedProducts = productsData
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

  const tabsContent = {
    Features: product.features,
    'Sizing & Material': product.sizing,
    'Care Instructions': product.care,
  }

  const comparisonRows = [
    'Plant-Based Eco PLA',
    'Sub-Millimeter 0.12mm Detail',
    'Reinforced Ring & Joints',
    'Hand-Finished & Inspected in Manila',
    'Zero-Waste Filament Recycling',
  ]

  const pdpFaqs = [
    {
      q: 'How durable is this 3D-printed item?',
      a: 'Printed in high-density PLA+ with multi-layer wall perimeters and reinforced internal structural infill. It withstands everyday handling, keys, and desk wear with ease.',
    },
    {
      q: 'Can I request a custom colorway or engraved text?',
      a: 'Yes! Check out our Custom Order page (/custom-order) to request custom dual-tone filaments, personal names, corporate monograms, or custom dimensions.',
    },
    {
      q: 'Do you offer bulk souvenir pricing for weddings or corporate events?',
      a: 'Yes, we provide tiered discounts starting at orders of 20 units or more with custom packaging options.',
    },
  ]

  return (
    <div className="py-6 sm:py-10">
      <div className={container}>
        {/* Breadcrumbs: Home > Products > [Category] > [Product Name] */}
        <nav aria-label="Breadcrumb" className="pb-6 text-xs text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link to="/" className="hover:text-terracotta transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight size={12} className="text-muted/60" />
            <li>
              <Link to="/products" className="hover:text-terracotta transition-colors">
                Products
              </Link>
            </li>
            <ChevronRight size={12} className="text-muted/60" />
            <li className="text-muted">{product.category}</li>
            <ChevronRight size={12} className="text-muted/60" />
            <li aria-current="page" className="font-semibold text-ink truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Hero: Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12 items-start">
          {/* Left Column: Main Image & 4-Thumbnail Gallery */}
          <div>
            <div className="overflow-hidden rounded-3xl bg-[#F5EFE6] border border-black/5 shadow-sm">
              <img
                src={gallery[activeImageIndex]?.src || product.image}
                alt={gallery[activeImageIndex]?.alt || product.name}
                style={{ objectPosition: gallery[activeImageIndex]?.pos || 'center' }}
                className="aspect-[4/3] w-full object-cover transition-all duration-300"
                fetchPriority="high"
              />
            </div>

            {/* 4-Thumbnail Selector */}
            <div className="mt-3.5 grid grid-cols-4 gap-3" role="tablist" aria-label="Product thumbnails">
              {gallery.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={activeImageIndex === idx}
                  aria-label={`View image ${idx + 1}`}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`overflow-hidden rounded-2xl border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-forest ring-2 ring-forest/20 shadow-md scale-[1.02]'
                      : 'border-transparent bg-[#F5EFE6] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumb.src}
                    alt=""
                    style={{ objectPosition: thumb.pos || 'center' }}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Purchasing Controls */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-sm">
            {product.badge && (
              <span className="inline-block rounded-full bg-forest/10 px-3 py-1 text-[11px] font-bold text-forest uppercase tracking-wider mb-2">
                {product.badge}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-ink">
              {product.name}
            </h1>

            {/* Star Reviews Score */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <Stars size={14} />
              <span className="font-bold text-ink">★ {product.rating}</span>
              <span className="text-muted">({product.reviewsCount} Reviews)</span>
            </div>

            {/* Price in Philippine Peso */}
            <div className="mt-4 flex items-baseline gap-3">
              <p className="text-3xl font-extrabold text-ink">₱{product.price}</p>
              <span className="text-xs text-muted">Taxes included • Eco packaging</span>
            </div>

            {/* Color / Variation Swatch Picker */}
            {variations.length > 0 && (
              <fieldset className="mt-6 border-t border-black/5 pt-5">
                <legend className="text-xs font-semibold text-ink flex items-center justify-between w-full">
                  <span>
                    Color / Variation:{' '}
                    <span className="font-bold text-forest">
                      {variations[selectedVariationIndex]?.name}
                    </span>
                  </span>
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {variations.map((v, i) => (
                    <button
                      key={v.name}
                      type="button"
                      aria-label={v.name}
                      aria-pressed={selectedVariationIndex === i}
                      onClick={() => setSelectedVariationIndex(i)}
                      style={{ background: v.bg }}
                      className={`h-9 w-9 cursor-pointer rounded-full border border-black/20 transition-all ${
                        selectedVariationIndex === i
                          ? 'ring-2 ring-terracotta ring-offset-2 scale-110 shadow-sm'
                          : 'hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </fieldset>
            )}

            {/* Quantity Selector + Terracotta Add to Cart Button */}
            <div className="mt-6 border-t border-black/5 pt-5">
              <p className="text-xs font-semibold text-ink">Quantity</p>
              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex items-center rounded-xl border border-black/15 bg-[#FBF8F2]">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="grid h-12 w-10 cursor-pointer place-items-center hover:text-terracotta"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-ink" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(quantity + 1)}
                    className="grid h-12 w-10 cursor-pointer place-items-center hover:text-terracotta"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 h-12 cursor-pointer rounded-full bg-[#D96B43] px-6 text-sm font-bold text-white shadow-md transition-all hover:bg-[#c25b36] hover:shadow-lg active:scale-98 flex items-center justify-center gap-2"
                >
                  {isAdded ? (
                    <>
                      <Check size={18} /> Added {quantity} to Bag ✓
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Add to Cart (₱{product.price * quantity})
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 border-t border-black/5 pt-4">
              <div className="grid grid-cols-2 gap-3 text-xs text-[#333333]">
                <span className="flex items-center gap-2 font-medium">
                  <ShieldCheck size={16} className="text-forest shrink-0" /> Secure Checkout
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <BadgeCheck size={16} className="text-[#2e7d4f] shrink-0" /> Secure Guarantees
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <Leaf size={16} className="text-forest shrink-0" /> Eco-Friendly PLA Sustainable
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <Award size={16} className="text-forest shrink-0" /> Hand-Finished in Manila
                </span>
              </div>
            </div>

            {/* Tab Switcher: Features | Sizing & Material | Care Instructions */}
            <div className="mt-7 border-t border-black/5 pt-5">
              <div role="tablist" className="flex gap-4 border-b border-black/10 text-xs">
                {['Features', 'Sizing & Material', 'Care Instructions'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`-mb-px cursor-pointer border-b-2 pb-2.5 text-xs font-semibold transition-colors ${
                      activeTab === tab
                        ? 'border-terracotta text-terracotta font-bold'
                        : 'border-transparent text-muted hover:text-ink'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div role="tabpanel" className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[#555555]">
                {tabsContent[activeTab]}
              </div>
            </div>
          </div>
        </div>

        {/* Below the Fold 1: Crafted with Manila Pride 4-feature highlight grid */}
        <section className="mt-20 border-t border-black/5 pt-12">
          <div className="mx-auto max-w-xl text-center">
            <span className="font-script text-2xl text-terracotta">Handmade Integrity</span>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl text-ink">
              Crafted with Manila Pride
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-black/5 bg-[#F5EFE6] p-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-forest shadow-xs">
                <Leaf size={22} />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">Eco-Friendly PLA</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                Made from plant-based renewable cornstarch, biodegradable and non-toxic.
              </p>
            </div>

            <div className="rounded-3xl border border-black/5 bg-[#F5EFE6] p-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-forest shadow-xs">
                <Award size={22} />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">Hand-Polished Finish</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                Every edge is inspected, deburred, and ultrasonic-cleaned in Manila.
              </p>
            </div>

            <div className="rounded-3xl border border-black/5 bg-[#F5EFE6] p-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-forest shadow-xs">
                <BadgeCheck size={22} />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">Precision 3D Layering</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                0.12mm micro-layer calibration ensures sharp letters and crisp silhouettes.
              </p>
            </div>

            <div className="rounded-3xl border border-black/5 bg-[#F5EFE6] p-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-forest shadow-xs">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">Heritage Manila Design</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                Original CAD models created locally, celebrating genuine Filipino culture.
              </p>
            </div>
          </div>
        </section>

        {/* Below the Fold 2: Babi MNL vs Generic Plastic comparison matrix */}
        <section className="mt-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl text-ink">
              Babi MNL vs Generic Plastic
            </h2>
            <p className="mt-2 text-center text-xs sm:text-sm text-muted">
              Why our additive artisan prints outlast injection-molded trinkets.
            </p>

            <div className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
              <table className="w-full border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="p-4 text-left font-bold text-ink sm:w-1/2">Key Standard</th>
                    <th className="bg-[#D96B43] p-4 text-center font-bold text-white sm:w-1/4">
                      Babi MNL
                    </th>
                    <th className="p-4 text-center font-bold text-muted sm:w-1/4">
                      Generic Plastic
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row} className="border-t border-black/5 hover:bg-stone-warm/30">
                      <th scope="row" className="p-4 text-left font-semibold text-ink">
                        {row}
                      </th>
                      <td className="bg-terracotta/10 p-4 text-center font-bold text-forest">
                        <Check size={18} className="mx-auto text-forest" />
                      </td>
                      <td className="p-4 text-center text-muted">
                        <X size={18} className="mx-auto text-muted/60" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Below the Fold 3: Related Bestsellers carousel/grid */}
        <section className="mt-20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">You May Also Like</h2>
              <p className="text-xs text-muted">Other studio favorites printed in Manila</p>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-forest hover:text-terracotta transition-colors"
            >
              View Full Catalog →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {relatedProducts.map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between rounded-3xl border border-black/5 bg-[#F5EFE6] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <Link to={`/products/${item.slug}`} className="block overflow-hidden rounded-2xl bg-white aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <h3 className="mt-3 text-sm font-bold text-ink">
                    <Link to={`/products/${item.slug}`} className="hover:text-terracotta transition-colors">
                      {item.name}
                    </Link>
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Stars size={13} />
                    <span className="text-[11px] text-muted">({item.reviewsCount})</span>
                  </div>
                  <p className="mt-1 text-lg font-extrabold text-ink">₱{item.price}</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/products/${item.slug}`}
                    className="flex-1 rounded-full border border-forest/20 text-center py-2 text-xs font-semibold text-forest hover:bg-forest/5"
                  >
                    View Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      if (onAddToCart) {
                        onAddToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          img: item.image,
                          quantity: 1,
                        })
                      }
                    }}
                    className="rounded-full bg-terracotta px-4 py-2 text-xs font-semibold text-white hover:bg-[#c25b36]"
                  >
                    Add
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Below the Fold 4: Customer Reviews Infinite Marquee */}
        <section className="mt-20 overflow-hidden">
          <div className="mx-auto max-w-xl text-center">
            <span className="font-script text-2xl text-terracotta">Verified Collectors</span>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl text-ink">
              Customer Reviews
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted">
              Real feedback from verified collectors and gift buyers across the Philippines and abroad.
            </p>
          </div>

          <div className="mt-10">
            <ReviewMarquee />
          </div>
        </section>

        {/* Below the Fold 5: Embedded FAQ Accordion */}
        <section className="mt-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl text-ink">
              Product Questions
            </h2>
            <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
              {pdpFaqs.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={faq.q}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-sm font-bold text-ink transition-colors hover:text-terracotta"
                    >
                      <span>{faq.q}</span>
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-stone-warm text-forest">
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="pb-4 text-xs sm:text-sm leading-relaxed text-muted">
                        {faq.a}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
