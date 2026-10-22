import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Upload,
  FileCode,
  FileImage,
  Trash2,
  CheckCircle2,
  X,
  Info,
  Clock,
  Send,
  Layers,
  Palette,
  Sparkles,
} from 'lucide-react'
import { container } from '../components/shared'

const materials = [
  { id: 'standard', name: 'Standard PLA', desc: 'Durable, vibrant, ideal for general prints & keychains' },
  { id: 'matte', name: 'Matte PLA', desc: 'Anti-glare velvety surface with concealed layer lines' },
  { id: 'silk', name: 'Silk PLA', desc: 'High-gloss metallic sheen, great for medallions & awards' },
  { id: 'wood', name: 'Wood Fill PLA', desc: 'Real wood fiber composite with tactile grain' },
]

const colorOptions = [
  { id: 'single', label: 'Single Color', desc: 'Uniform solid shade' },
  { id: 'multi', label: 'Multi-Color / Dual-Tone', desc: 'Up to 4 filament colors fused in 3D' },
  { id: 'custom-palette', label: 'Custom Palette Request', desc: 'Specific Pantone / branding match' },
]

export default function CustomOrderPage() {
  // 1. Order Type Toggle
  const [orderType, setOrderType] = useState('file-ready') // 'file-ready' or 'need-design'

  // 2. Drag & Drop Upload Zone & File List
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  // 3. Print Specifications
  const [selectedMaterial, setSelectedMaterial] = useState('standard')
  const [selectedColorMode, setSelectedColorMode] = useState('multi')
  const [colorNotes, setColorNotes] = useState('')
  const [dimensions, setDimensions] = useState('')
  const [quantityTier, setQuantityTier] = useState('prototype') // 'prototype' or 'bulk'
  const [unitsCount, setUnitsCount] = useState(1)

  // 4. Contact & Quote Delivery Preference
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [responseMethod, setResponseMethod] = useState('Email') // 'Email' or 'Viber / WhatsApp / Phone'
  const [projectNotes, setProjectNotes] = useState('')

  // Submission State
  const [showModal, setShowModal] = useState(false)
  const [quoteRef, setQuoteRef] = useState('')

  const handleFiles = (incomingFiles) => {
    const validArray = Array.from(incomingFiles).map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type || file.name.split('.').pop(),
      raw: file,
    }))
    setFiles((prev) => [...prev, ...validArray])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleDeleteFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const generatedRef = 'BABI-QUOTE-' + Math.floor(100000 + Math.random() * 900000)
    setQuoteRef(generatedRef)
    setShowModal(true)
  }

  return (
    <div className="py-10 sm:py-14">
      <div className={container}>
        {/* Hero & Notice Banner */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-script text-3xl sm:text-4xl text-terracotta">
            Bespoke Fabrication in Manila
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl text-ink">
            Bring Your 3D Ideas to Life
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#555555]">
            Upload your existing 3D file or design concept. If you already have the file or sample, we take care of the precision printing. If you don't have a 3D model yet, our Manila studio can design it for you.
          </p>

          {/* Transparent Pricing Notice Card */}
          <div className="mt-8 text-left rounded-2xl border border-[#E0D7C8] bg-[#F5EFE6] p-5 shadow-xs">
            <div className="flex items-start gap-3.5">
              <span className="text-xl shrink-0 mt-0.5">ℹ️</span>
              <div className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                <span className="font-bold text-ink">How Pricing Works:</span> Because every custom print varies in material volume, print time, and design complexity, we do not quote instant fixed prices. Once you submit your file or request below, our team analyzes your model and gets back to you within 24 hours with an exact price quote and production timeline via your preferred contact channel (Email or Phone/WhatsApp).
              </div>
            </div>
          </div>
        </div>

        {/* Custom Order Submission Form */}
        <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-4xl space-y-10">
          {/* 1. Order Type Selector */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-forest text-xs font-bold text-white">
                1
              </span>
              <h2 className="text-base sm:text-lg font-bold text-forest">
                What is your project status?
              </h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setOrderType('file-ready')}
                className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition-all cursor-pointer ${
                  orderType === 'file-ready'
                    ? 'border-forest bg-[#1B3B2B]/5 ring-2 ring-forest shadow-xs'
                    : 'border-black/10 bg-[#FBF8F2] hover:border-black/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base text-ink">
                      I have a 3D File / Sample Ready
                    </span>
                    {orderType === 'file-ready' && (
                      <CheckCircle2 size={18} className="text-forest shrink-0" />
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    Supports STL, OBJ, 3MF, STEP. Ideal for designers, makers, and clients with 3D models.
                  </p>
                </div>
                <span className="mt-4 inline-block text-[11px] font-semibold text-terracotta">
                  Direct Print Slicing • Fast Quote
                </span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('need-design')}
                className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition-all cursor-pointer ${
                  orderType === 'need-design'
                    ? 'border-forest bg-[#1B3B2B]/5 ring-2 ring-forest shadow-xs'
                    : 'border-black/10 bg-[#FBF8F2] hover:border-black/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base text-ink">
                      I need Babi MNL to design it for me
                    </span>
                    {orderType === 'need-design' && (
                      <CheckCircle2 size={18} className="text-forest shrink-0" />
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    Upload reference photos, sketches, logo vectors, or describe your idea. Our 3D artist models it.
                  </p>
                </div>
                <span className="mt-4 inline-block text-[11px] font-semibold text-terracotta">
                  CAD Modeling + Digital 3D Proof
                </span>
              </button>
            </div>
          </div>

          {/* 2. Drag & Drop Upload Zone */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-forest text-xs font-bold text-white">
                2
              </span>
              <h2 className="text-base sm:text-lg font-bold text-forest">
                Upload 3D Files or Visual References
              </h2>
            </div>
            <p className="mt-1 text-xs text-muted">
              Supported file extensions: <span className="font-semibold text-ink">.stl, .obj, .3mf, .step, .png, .jpg, .pdf</span> (Max 50MB per file).
            </p>

            {/* Drag & Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
                isDragging
                  ? 'border-terracotta bg-terracotta/5'
                  : 'border-black/15 bg-[#FBF8F2] hover:border-terracotta hover:bg-[#F5EFE6]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".stl,.obj,.3mf,.step,.png,.jpg,.jpeg,.pdf"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />
              <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-terracotta shadow-xs">
                <Upload size={24} />
              </div>
              <p className="mt-3 text-sm font-bold text-ink">
                Click to browse files or drag and drop here
              </p>
              <p className="mt-1 text-xs text-muted">
                {orderType === 'file-ready'
                  ? 'Upload your 3D CAD files (.stl, .obj, .3mf, .step)'
                  : 'Upload your reference sketches, brand logos, or photos'}
              </p>
            </div>

            {/* File Preview List */}
            {files.length > 0 && (
              <div className="mt-5 space-y-2.5">
                <p className="text-xs font-bold text-ink uppercase tracking-wider">
                  Attached Files ({files.length})
                </p>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-[#F5EFE6] px-4 py-2.5 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {file.name.match(/\.(stl|obj|3mf|step)$/i) ? (
                          <FileCode size={18} className="text-forest shrink-0" />
                        ) : (
                          <FileImage size={18} className="text-terracotta shrink-0" />
                        )}
                        <div className="truncate">
                          <p className="font-semibold text-ink truncate">{file.name}</p>
                          <p className="text-[10px] text-muted">{file.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteFile(file.id)
                        }}
                        className="text-muted hover:text-red-500 p-1 cursor-pointer"
                        aria-label={`Remove ${file.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Print Specifications */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-forest text-xs font-bold text-white">
                3
              </span>
              <h2 className="text-base sm:text-lg font-bold text-forest">
                Print Specifications &amp; Sizing
              </h2>
            </div>

            {/* Material & Finish */}
            <div className="mt-6">
              <label className="block text-xs font-bold text-ink uppercase tracking-wider">
                Material &amp; Finish Preference
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {materials.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMaterial(m.id)}
                    className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                      selectedMaterial === m.id
                        ? 'border-forest bg-[#1B3B2B]/5 ring-1 ring-forest'
                        : 'border-black/10 bg-[#FBF8F2] hover:border-black/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-ink">{m.name}</span>
                      {selectedMaterial === m.id && <CheckCircle2 size={16} className="text-forest" />}
                    </div>
                    <p className="mt-1 text-xs text-muted">{m.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Preference */}
            <div className="mt-6 border-t border-black/5 pt-5">
              <label className="block text-xs font-bold text-ink uppercase tracking-wider">
                Color Preference
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {colorOptions.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedColorMode(c.id)}
                    className={`rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                      selectedColorMode === c.id
                        ? 'border-forest bg-[#1B3B2B]/5 ring-1 ring-forest'
                        : 'border-black/10 bg-[#FBF8F2] hover:border-black/20'
                    }`}
                  >
                    <p className="text-xs font-bold text-ink">{c.label}</p>
                    <p className="mt-0.5 text-[11px] text-muted">{c.desc}</p>
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={colorNotes}
                onChange={(e) => setColorNotes(e.target.value)}
                placeholder="Optional: Specify desired colors (e.g., Terracotta body with Forest Green text)"
                className="mt-3 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-terracotta"
              />
            </div>

            {/* Dimensions & Quantity */}
            <div className="mt-6 border-t border-black/5 pt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="dimensions" className="block text-xs font-bold text-ink uppercase tracking-wider">
                  Estimated Dimensions / Scale
                </label>
                <input
                  id="dimensions"
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g. 10cm x 5cm x 3cm or 100% CAD scale"
                  className="mt-2 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider">
                  Quantity Needed
                </label>
                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setQuantityTier('prototype')
                      if (unitsCount > 10) setUnitsCount(1)
                    }}
                    className={`flex-1 rounded-xl border py-2.5 px-3 text-xs font-semibold cursor-pointer ${
                      quantityTier === 'prototype'
                        ? 'border-forest bg-forest text-white'
                        : 'border-black/10 bg-[#FBF8F2] text-ink'
                    }`}
                  >
                    Single Prototype (1-5)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuantityTier('bulk')
                      if (unitsCount < 20) setUnitsCount(25)
                    }}
                    className={`flex-1 rounded-xl border py-2.5 px-3 text-xs font-semibold cursor-pointer ${
                      quantityTier === 'bulk'
                        ? 'border-forest bg-forest text-white'
                        : 'border-black/10 bg-[#FBF8F2] text-ink'
                    }`}
                  >
                    Bulk / Souvenir Run (20+)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Contact & Quote Delivery Preference */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-forest text-xs font-bold text-white">
                4
              </span>
              <h2 className="text-base sm:text-lg font-bold text-forest">
                Contact &amp; Quote Delivery Preference
              </h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="block text-xs font-bold text-ink">
                  Full Name <span className="text-terracotta">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan Dela Cruz"
                  className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-ink">
                  Email Address <span className="text-terracotta">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juan@example.com"
                  className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-terracotta"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contactNumber" className="block text-xs font-bold text-ink">
                  Contact Number (Mobile / Viber) <span className="text-terracotta">*</span>
                </label>
                <input
                  id="contactNumber"
                  type="tel"
                  required
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="+63 917 123 4567"
                  className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink">
                  Preferred Response Channel
                </label>
                <div className="mt-1.5 flex gap-2">
                  {['Email', 'Viber / WhatsApp / Phone'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setResponseMethod(method)}
                      className={`flex-1 rounded-xl border py-2.5 px-3 text-xs font-semibold cursor-pointer ${
                        responseMethod === method
                          ? 'border-forest bg-forest text-white'
                          : 'border-black/10 bg-[#FBF8F2] text-ink'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="projectNotes" className="block text-xs font-bold text-ink">
                Additional Project Notes / Instructions
              </label>
              <textarea
                id="projectNotes"
                rows={4}
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                placeholder="Describe your design, target deadline, event theme, functional requirements, or any specific questions..."
                className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FBF8F2] px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-terracotta resize-none"
              />
            </div>
          </div>

          {/* 5. Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#D96B43] py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#c25b36] hover:shadow-xl active:scale-98"
            >
              Submit for Free Price Quote →
            </button>
            <p className="mt-3 text-center text-xs text-muted flex items-center justify-center gap-1.5">
              <Clock size={14} className="text-forest" />
              Guaranteed quote reply within 24 hours • No upfront payment needed
            </p>
          </div>
        </form>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 text-muted hover:text-ink cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest text-white">
                <CheckCircle2 size={30} />
              </div>

              <h3 className="mt-4 text-center text-2xl font-extrabold text-forest">
                Custom Order Inquiry Received!
              </h3>
              <p className="mt-2 text-center text-xs sm:text-sm text-muted">
                Quote Reference Code:{' '}
                <span className="font-mono font-bold text-terracotta">{quoteRef}</span>
              </p>

              <div className="mt-6 rounded-2xl bg-[#F5EFE6] p-4 text-xs space-y-2 text-[#444444]">
                <p>
                  <span className="font-semibold text-ink">Client:</span> {fullName} ({email})
                </p>
                <p>
                  <span className="font-semibold text-ink">Contact:</span> {contactNumber} via {responseMethod}
                </p>
                <p>
                  <span className="font-semibold text-ink">Project Mode:</span>{' '}
                  {orderType === 'file-ready'
                    ? '3D File / Sample Ready'
                    : 'Babi MNL Studio 3D Design Assistance'}
                </p>
                <p>
                  <span className="font-semibold text-ink">Material &amp; Color:</span>{' '}
                  {materials.find((m) => m.id === selectedMaterial)?.name} (
                  {colorOptions.find((c) => c.id === selectedColorMode)?.label})
                </p>
                {files.length > 0 && (
                  <p>
                    <span className="font-semibold text-ink">Attached Files:</span>{' '}
                    {files.map((f) => f.name).join(', ')}
                  </p>
                )}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#555555] text-center">
                Our 3D modeling and print specialists in Manila are analyzing your specifications. We will send you an itemized price quote, print duration estimate, and production timeline within 24 hours.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-full bg-forest py-2.5 text-xs font-semibold text-white hover:bg-forest-deep"
                >
                  Done
                </button>
                <Link
                  to="/products"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-full border border-forest/20 text-center py-2.5 text-xs font-semibold text-forest hover:bg-forest/5"
                >
                  Explore Catalog
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
