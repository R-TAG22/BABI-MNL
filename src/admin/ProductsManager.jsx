import { useState } from 'react'
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  X,
  ExternalLink,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function ProductsManager() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Keychains',
    price: 299,
    rating: 5.0,
    reviewsCount: 12,
    badge: 'New',
    image: '/images/product-bestseller-jeepney.jpg',
    features: '',
    sizing: '',
    care: '',
    stockManila: 85,
    stockCebu: 30,
    stockDavao: 15,
    lowStockThreshold: 20,
    sku: 'BABI-MNL-SKU',
  })

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter
    return matchesSearch && matchesCat
  })

  const handleOpenAdd = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      slug: '',
      category: 'Keychains',
      price: 299,
      rating: 5.0,
      reviewsCount: 12,
      badge: 'New Arrival',
      image: '/images/product-bestseller-jeepney.jpg',
      features: 'High precision 3D printed keepsake crafted in Manila.',
      sizing: 'Standard dimensions',
      care: 'Wipe clean with soft microfiber.',
      stockManila: 85,
      stockCebu: 30,
      stockDavao: 15,
      lowStockThreshold: 20,
      sku: `BABI-MNL-${Math.floor(100 + Math.random() * 900)}`,
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (p) => {
    setEditingProduct(p)
    setFormData({
      name: p.name,
      slug: p.slug,
      category: p.category || 'Keychains',
      price: p.price,
      rating: p.rating || 5.0,
      reviewsCount: p.reviewsCount || 10,
      badge: p.badge || '',
      image: p.image || '/images/product-bestseller-jeepney.jpg',
      features: p.features || '',
      sizing: p.sizing || '',
      care: p.care || '',
      stockManila: p.stockManila || 65,
      stockCebu: p.stockCebu || 25,
      stockDavao: p.stockDavao || 15,
      lowStockThreshold: p.lowStockThreshold || 20,
      sku: p.sku || `BABI-${p.slug}`,
    })
    setModalOpen(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        slug,
      })
    } else {
      addProduct({
        ...formData,
        id: slug,
        slug,
      })
    }
    setModalOpen(false)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">Product Catalog &amp; Inventory</h2>
          <p className="text-xs text-gray-500">
            Multi-location stock management across Manila Central, Cebu, and Davao distribution hubs
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-full bg-[#D96B43] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#c25b36] transition-all cursor-pointer"
        >
          <Plus size={16} /> Add New Product
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
        <div className="relative flex-1 sm:max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product title or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-4 text-xs outline-none focus:border-[#D96B43]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-gray-800 outline-none"
          >
            {['All', 'Keychains', 'Nameplates', 'Miniatures', 'Playful Toys'].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="p-4">Product Details</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Warehouse Stock Breakdown</th>
              <th className="p-4">Stock Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((p) => {
              const manilaStock = p.stockManila !== undefined ? p.stockManila : 58
              const cebuStock = p.stockCebu !== undefined ? p.stockCebu : 24
              const davaoStock = p.stockDavao !== undefined ? p.stockDavao : 12
              const totalStock = manilaStock + cebuStock + davaoStock
              const isLowStock = totalStock <= (p.lowStockThreshold || 25)

              return (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image || '/images/product-bestseller-jeepney.jpg'}
                        alt={p.name}
                        className="h-12 w-12 rounded-xl object-cover border border-gray-200 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{p.name}</p>
                        <p className="font-mono text-[10px] text-gray-400">SKU: {p.sku || `MNL-${p.slug}`}</p>
                        {p.badge && (
                          <span className="inline-block mt-0.5 rounded-full bg-forest/10 px-2 py-0.5 text-[9px] font-bold text-forest">
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-semibold text-gray-700">{p.category}</td>

                  <td className="p-4 font-extrabold text-sm text-gray-900">₱{p.price}</td>

                  {/* Multi-Location Inventory Breakdown */}
                  <td className="p-4">
                    <div className="space-y-1 text-[11px]">
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Manila Hub:</span>
                        <span className="font-bold text-gray-900">{manilaStock} units</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Cebu Branch:</span>
                        <span className="font-bold text-gray-900">{cebuStock} units</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Davao Branch:</span>
                        <span className="font-bold text-gray-900">{davaoStock} units</span>
                      </div>
                    </div>
                  </td>

                  {/* Low Stock Alert Status */}
                  <td className="p-4">
                    {isLowStock ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                        <AlertTriangle size={13} /> Low Stock ({totalStock} left)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                        <CheckCircle2 size={13} /> In Stock ({totalStock})
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete product "${p.name}"?`)) {
                            deleteProduct(p.id)
                          }
                        }}
                        className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">
                {editingProduct ? 'Edit Product SKU & Inventory' : 'Create New Catalog Product'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-900 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700">Product Title</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs outline-none focus:border-[#D96B43]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated-from-title"
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs outline-none focus:border-[#D96B43]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700">Price (₱ PHP)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs outline-none focus:border-[#D96B43]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs outline-none focus:border-[#D96B43]"
                  >
                    {['Keychains', 'Nameplates', 'Miniatures', 'Playful Toys'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Best Seller"
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs outline-none focus:border-[#D96B43]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700">Image Asset Path / URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs outline-none focus:border-[#D96B43]"
                />
              </div>

              {/* Warehouse Inventory Stock Breakdown */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 space-y-3">
                <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#D96B43]" /> Multi-Location Warehouse Quantities
                </span>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="block text-[11px] text-gray-600 font-semibold">Manila Central Hub</label>
                    <input
                      type="number"
                      value={formData.stockManila}
                      onChange={(e) => setFormData({ ...formData, stockManila: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-white p-2 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-600 font-semibold">Cebu Distribution</label>
                    <input
                      type="number"
                      value={formData.stockCebu}
                      onChange={(e) => setFormData({ ...formData, stockCebu: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-white p-2 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-600 font-semibold">Davao Warehouse</label>
                    <input
                      type="number"
                      value={formData.stockDavao}
                      onChange={(e) => setFormData({ ...formData, stockDavao: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-white p-2 text-xs outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-full px-5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#142B1F] px-6 py-2 text-xs font-bold text-white hover:bg-black transition-all cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
