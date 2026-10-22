import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Upload, Check, Palette, Sparkles, Plus, Minus, CheckCircle2, X, Info } from 'lucide-react'
import { container } from '../components/shared'

const colorSwatches = [
  { name: 'Terracotta', hex: '#D96B43', label: 'Terracotta Warmth' },
  { name: 'Deep Forest', hex: '#1B3B2B', label: 'Manila Forest Green' },
  { name: 'Warm Cream', hex: '#FBF8F2', label: 'Natural Sand' },
  { name: 'Pastel Mint', hex: '#5EBA8A', label: 'Tropical Mint' },
  { name: 'Solar Amber', hex: '#F4B342', label: 'Sunburst Amber' },
  { name: 'Midnight Ink', hex: '#1C1C1C', label: 'Charcoal Black' },
  { name: 'Marble Pearl', hex: '#E2DFD8', label: 'Stone Marble' },
]

const itemTypes = [
  { id: 'nameplate', label: 'Custom Desk Nameplate', basePrice: 399, desc: 'Dual-layer raised 3D typography with stand' },
  { id: 'keychain', label: 'Embossed Souvenir Keychain', basePrice: 249, desc: 'Pocket-sized medallion with reinforced brass ring' },
  { id: 'figurine', label: 'Artisan Miniature / Figurine', basePrice: 350, desc: 'Cultural or custom low-poly / high-detail sculpt' },
  { id: 'logo-sign', label: '3D Company Logo / Monogram', basePrice: 499, desc: 'Multi-layer brand emblem for offices or events' },
]

export default function CustomOrderPage() {
  const [itemType, setItemType] = useState('nameplate')
  const [customText, setCustomText] = useState('')
  const [fontChoice, setFontChoice] = useState('modern')
  const [primaryColor, setPrimaryColor] = useState(colorSwatches[0])
  const [accentColor, setAccentColor] = useState(colorSwatches[1])
  const [quantity, setQuantity] = useState(1)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [orderRef, setOrderRef] = useState('')

  const fileInputRef = useRef(null)

  const selectedItem = itemTypes.find((t) => t.id === itemType) || itemTypes[0]
  const unitPrice = selectedItem.basePrice
  const discountMultiplier = quantity >= 20 ? 0.8 : quantity >= 10 ? 0.9 : 1
  const totalPrice = Math.round(unitPrice * quantity * discountMultiplier)

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const generatedRef = 'BABI-MNL-' + Math.floor(100000 + Math.random() * 900000)
    setOrderRef(generatedRef)
    setShowModal(true)
  }

  return (
    <div className="py-12">
      <div className={container}>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-script text-3xl text-terracotta">Handmade &amp; Bespoke</span>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-5xl text-ink">
            Custom 3D Print Request
          </h1>
          <p className="mt-3 text-sm text-muted">
            Design your one-of-a-kind nameplate, souvenir keychain, or batch corporate favor. Configure your colors, upload references, and preview your creation live.
          </p>
        </div>

        {/* Custom Order Builder Grid */}
        <form onSubmit={handleSubmit} className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Configuration Controls (7 cols) */}
          <div className="space-y-8 lg:col-span-7">
            {/* 1. Item Type Selector */}
            <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-forest text-xs font-bold text-white">
                  1
                </span>
                <h2 className="text-base font-bold text-forest sm:text-lg">Select Product Type</h2>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {itemTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setItemType(type.id)}
                    className={`flex flex-col justify-between rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                      itemType === type.id
                        ? 'border-forest bg-[#1B3B2B]/5 ring-1 ring-forest'
                        : 'border-black/10 bg-[#FBF8F2] hover:border-black/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-ink">{type.label}</span>
                        {itemType === type.id && <Check size={16} className="text-forest" />}
                      </div>
                      <p className="mt-1 text-xs text-muted leading-tight">{type.desc}</p>
                    </div>
                    <p className="mt-3 text-xs font-bold text-terracotta">From ₱{type.basePrice}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Custom Text & Typography */}
            <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-forest text-xs font-bold text-white">
                  2
                </span>
                <h2 className="text-base font-bold text-forest sm:text-lg">Custom Text / Engraving</h2>
              </div>

              <div className="mt-4">
                <label htmlFor="customText" className="block text-xs font-semibold text-ink">
                  Name, Initials, Monogram, or Slogan
                </label>
                <input
                  id="customText"
                  type="text"
                  maxLength={32}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. ATTY. RAMIREZ or MANILA 2026"
                  className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta"
                />
                <p className="mt-1 text-[11px] text-muted">
                  Max 32 characters. Text will be raised in 3D embossing with high-contrast accent filament.
                </p>
              </div>

              {/* Font Style Selection */}
              <div className="mt-5">
                <span className="block text-xs font-semibold text-ink">Embossing Font Style</span>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[
                    { id: 'modern', label: 'Modern Sans' },
                    { id: 'script', label: 'Script Cursive' },
                    { id: 'bold', label: 'Bold Serif' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFontChoice(f.id)}
                      className={`rounded-xl border py-2 text-xs font-semibold cursor-pointer transition-all ${
                        fontChoice === f.id
                          ? 'border-forest bg-forest text-white'
                          : 'border-black/10 bg-[#FBF8F2] text-ink hover:bg-black/5'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Color Palette Swatches */}
            <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-forest text-xs font-bold text-white">
                  3
                </span>
                <h2 className="text-base font-bold text-forest sm:text-lg">Color Palette Selector</h2>
              </div>

              {/* Base/Primary Color */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-semibold text-ink">
                  <span>Base Shell Color:</span>
                  <span className="font-bold text-terracotta">{primaryColor.label}</span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {colorSwatches.map((color) => (
                    <button
                      key={'primary-' + color.name}
                      type="button"
                      onClick={() => setPrimaryColor(color)}
                      aria-label={color.label}
                      className={`relative h-10 w-10 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 ${
                        primaryColor.name === color.name
                          ? 'border-ink ring-2 ring-forest scale-105'
                          : 'border-black/15'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {primaryColor.name === color.name && (
                        <Check
                          size={16}
                          className={`absolute inset-0 m-auto ${
                            color.name === 'Warm Cream' || color.name === 'Marble Pearl' || color.name === 'Solar Amber'
                              ? 'text-ink'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Raised Accent Color */}
              <div className="mt-6 border-t border-black/5 pt-5">
                <div className="flex items-center justify-between text-xs font-semibold text-ink">
                  <span>Raised Lettering / Accent Color:</span>
                  <span className="font-bold text-forest">{accentColor.label}</span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {colorSwatches.map((color) => (
                    <button
                      key={'accent-' + color.name}
                      type="button"
                      onClick={() => setAccentColor(color)}
                      aria-label={color.label}
                      className={`relative h-10 w-10 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 ${
                        accentColor.name === color.name
                          ? 'border-ink ring-2 ring-forest scale-105'
                          : 'border-black/15'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {accentColor.name === color.name && (
                        <Check
                          size={16}
                          className={`absolute inset-0 m-auto ${
                            color.name === 'Warm Cream' || color.name === 'Marble Pearl' || color.name === 'Solar Amber'
                              ? 'text-ink'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Upload Reference Photo/Logo */}
            <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-forest text-xs font-bold text-white">
                  4
                </span>
                <h2 className="text-base font-bold text-forest sm:text-lg">Reference Photo / Vector Logo</h2>
              </div>
              <p className="mt-1 text-xs text-muted">
                Optional: Upload a sketch, logo file (PNG, JPG, SVG), or reference photo for our 3D modeler.
              </p>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/15 bg-[#FBF8F2] p-6 text-center transition-colors hover:border-terracotta"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.svg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Uploaded reference"
                      className="max-h-36 rounded-xl object-contain shadow-xs"
                    />
                    <p className="mt-2 text-xs font-semibold text-forest">
                      {uploadedFile?.name} (Click to change)
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-stone-warm text-terracotta">
                      <Upload size={20} />
                    </div>
                    <p className="mt-3 text-xs font-bold text-ink">
                      Click to upload image or drag &amp; drop
                    </p>
                    <p className="text-[11px] text-muted">PNG, JPG, SVG up to 10MB</p>
                  </>
                )}
              </div>
            </div>

            {/* 5. Contact & Notes */}
            <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-forest text-xs font-bold text-white">
                  5
                </span>
                <h2 className="text-base font-bold text-forest sm:text-lg">Your Details &amp; Notes</h2>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="customerName" className="block text-xs font-semibold text-ink">
                    Full Name <span className="text-terracotta">*</span>
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Juan Dela Cruz"
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label htmlFor="customerEmail" className="block text-xs font-semibold text-ink">
                    Email Address <span className="text-terracotta">*</span>
                  </label>
                  <input
                    id="customerEmail"
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="juan@example.com"
                    className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="customerPhone" className="block text-xs font-semibold text-ink">
                  Phone / Mobile Number (for delivery updates)
                </label>
                <input
                  id="customerPhone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+63 917 123 4567"
                  className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-terracotta"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="notes" className="block text-xs font-semibold text-ink">
                  Special Instructions / Dimension Notes
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Please add a bevel on the stand, or need this ready for an anniversary on Nov 15..."
                  className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2 text-xs sm:text-sm text-ink outline-none focus:border-terracotta resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Preview & Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              {/* Live Preview Card */}
              <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-md">
                <div className="border-b border-black/5 bg-[#F5EFE6] px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-forest">
                    <Sparkles size={14} className="text-terracotta" />
                    <span>Live 3D Print Simulation</span>
                  </div>
                  <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-[10px] font-semibold text-forest">
                    {selectedItem.label}
                  </span>
                </div>

                {/* Simulated 3D rendered plaque */}
                <div className="p-6 sm:p-8 flex items-center justify-center min-h-[220px] bg-stone-warm/40">
                  <div
                    className="relative w-full max-w-xs rounded-2xl p-6 text-center shadow-xl transition-all duration-300"
                    style={{
                      backgroundColor: primaryColor.hex,
                      border: `3px solid ${accentColor.hex}`,
                    }}
                  >
                    <div className="text-[10px] font-semibold tracking-widest uppercase opacity-75" style={{ color: accentColor.hex }}>
                      babi MNL Studio Edition
                    </div>

                    <div
                      className={`mt-3 break-words text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow-sm ${
                        fontChoice === 'script' ? 'font-script text-3xl' : fontChoice === 'bold' ? 'font-serif uppercase' : 'font-sans'
                      }`}
                      style={{ color: accentColor.hex }}
                    >
                      {customText.trim() ? customText : 'YOUR CUSTOM TEXT'}
                    </div>

                    <div
                      className="mt-3 mx-auto h-1 w-12 rounded-full opacity-80"
                      style={{ backgroundColor: accentColor.hex }}
                    />

                    <div className="mt-2 text-[9px] font-medium opacity-65" style={{ color: accentColor.hex }}>
                      100% Plant-Based Eco PLA • Manila
                    </div>
                  </div>
                </div>

                {/* Swatch & Spec Summary */}
                <div className="border-t border-black/5 p-5 bg-white space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Selected Item:</span>
                    <span className="font-semibold text-ink">{selectedItem.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Base Color:</span>
                    <div className="flex items-center gap-1.5 font-semibold text-ink">
                      <span className="h-3 w-3 rounded-full border border-black/20" style={{ backgroundColor: primaryColor.hex }} />
                      <span>{primaryColor.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Accent Color:</span>
                    <div className="flex items-center gap-1.5 font-semibold text-ink">
                      <span className="h-3 w-3 rounded-full border border-black/20" style={{ backgroundColor: accentColor.hex }} />
                      <span>{accentColor.name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Calculation & Quantity */}
              <div className="rounded-3xl border border-black/5 bg-[#F5EFE6] p-6 shadow-sm">
                <h3 className="text-sm font-bold text-forest">Pricing &amp; Quantity</h3>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-ink font-medium">Quantity (Units):</span>
                  <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white px-3 py-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-muted hover:text-ink cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-ink">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-muted hover:text-ink cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {quantity >= 10 && (
                  <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-mint/20 px-3 py-1.5 text-[11px] font-semibold text-forest">
                    <Sparkles size={12} className="text-forest" />
                    <span>Bulk discount applied ({quantity >= 20 ? '20% off' : '10% off'})!</span>
                  </div>
                )}

                <div className="mt-5 border-t border-black/10 pt-4 space-y-1.5 text-xs text-muted">
                  <div className="flex justify-between">
                    <span>Base unit price:</span>
                    <span className="text-ink font-medium">₱{unitPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Units:</span>
                    <span className="text-ink font-medium">{quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-forest pt-2 border-t border-black/5">
                    <span>Estimated Total:</span>
                    <span className="text-lg text-terracotta">₱{totalPrice}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1B3B2B] py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-forest-deep active:scale-95"
                >
                  <Sparkles size={16} /> Submit Custom Order
                </button>

                <p className="mt-3 text-center text-[11px] text-muted">
                  No immediate payment required. Our artisan will review specs and email payment link upon CAD confirmation.
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 text-muted hover:text-ink cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest text-white">
                <CheckCircle2 size={30} />
              </div>

              <h3 className="mt-4 text-center text-2xl font-extrabold text-forest">
                Custom Order Received!
              </h3>
              <p className="mt-2 text-center text-xs sm:text-sm text-muted">
                Order Reference: <span className="font-mono font-bold text-terracotta">{orderRef}</span>
              </p>

              <div className="mt-6 rounded-2xl bg-[#F5EFE6] p-4 text-xs space-y-2 text-[#444444]">
                <p><span className="font-semibold text-ink">Client:</span> {customerName} ({customerEmail})</p>
                <p><span className="font-semibold text-ink">Item:</span> {selectedItem.label} x {quantity} unit(s)</p>
                <p><span className="font-semibold text-ink">Custom Text:</span> "{customText || 'N/A'}"</p>
                <p><span className="font-semibold text-ink">Colors:</span> {primaryColor.name} base + {accentColor.name} text</p>
                <p><span className="font-semibold text-ink">Estimated Quote:</span> ₱{totalPrice}</p>
                {uploadedFile && (
                  <p><span className="font-semibold text-ink">File Attached:</span> {uploadedFile.name}</p>
                )}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#555555] text-center">
                Our team in Manila will review your file and generate a high-res 3D digital render for your approval within 24-48 hours.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-full bg-forest py-2.5 text-xs font-semibold text-white hover:bg-forest-deep"
                >
                  Done &amp; Close
                </button>
                <Link
                  to="/products"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-full border border-forest/20 text-center py-2.5 text-xs font-semibold text-forest hover:bg-forest/5"
                >
                  Browse Catalog
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
