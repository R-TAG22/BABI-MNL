import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Plus,
  Trash2,
  Smartphone,
  Tablet,
  Monitor,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  Settings,
  Type,
  Palette as PaletteIcon,
  Code2,
  Sliders,
  Save,
  Download,
  BookOpen,
  ArrowRight,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

const PREBUILT_TEMPLATES = [
  {
    id: 'holiday-sale',
    name: 'Paskong Pinoy Holiday Blitz',
    desc: 'Festive red & gold accents, featured gift boxes, and seasonal countdown badge.',
  },
  {
    id: 'minimal-modern',
    name: 'Minimalist Architecture Studio',
    desc: 'High contrast monochrome clean lines, large gallery focus, subdued typography.',
  },
  {
    id: 'corporate-swag',
    name: 'B2B Corporate Souvenirs & Event Favors',
    desc: 'Lead capture hero, bulk order comparison matrix, and brand logo carousel.',
  },
]

export default function VisualPageBuilder() {
  const {
    sections,
    toggleSectionVisibility,
    updateSectionSettings,
    moveSectionUp,
    moveSectionDown,
    addSection,
    deleteSection,
  } = useStore()

  const [activeSectionId, setActiveSectionId] = useState('hero')
  const [deviceMode, setDeviceMode] = useState('desktop') // 'desktop', 'tablet', 'mobile'
  const [templateModalOpen, setTemplateModalOpen] = useState(false)
  const [savedNotification, setSavedNotification] = useState(false)
  const [newSectionModalOpen, setNewSectionModalOpen] = useState(false)

  const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0]

  const handleSettingChange = (key, value) => {
    updateSectionSettings(activeSection.id, { [key]: value })
  }

  const handleSaveAndPublish = () => {
    setSavedNotification(true)
    setTimeout(() => setSavedNotification(false), 2500)
  }

  const handleAddNewSection = (type) => {
    const newId = `custom-${Date.now()}`
    const templates = {
      hero: {
        id: newId,
        name: 'New Custom Hero',
        visible: true,
        settings: {
          headline: 'Custom Headline Here',
          subtitle: 'Describe your custom promo or spotlight product.',
          tag: 'Limited Edition ♡',
          ctaText: 'Shop Collection',
        },
      },
      banner: {
        id: newId,
        name: 'Callout Action Banner',
        visible: true,
        settings: {
          title: 'Special Announcement',
          subtitle: 'Limited run artisanal batch currently printing in Manila.',
          badgeText: 'HOT',
          ctaText: 'Claim Now',
        },
      },
      faq: {
        id: newId,
        name: 'FAQ Help Block',
        visible: true,
        settings: {
          title: 'Frequently Asked Questions',
          subtitle: 'Instant answers for your shoppers.',
          tag: 'Need Help?',
        },
      },
    }

    addSection(templates[type] || templates.banner)
    setActiveSectionId(newId)
    setNewSectionModalOpen(false)
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col -m-4 sm:-m-6 lg:-m-8 bg-[#E5E7EB] overflow-hidden">
      {/* Page Builder Top Toolbar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-300 bg-white px-4 sm:px-6 z-20">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-lg bg-[#142B1F] px-2.5 py-1 text-xs font-bold text-white">
            <PaletteIcon size={14} className="text-[#D96B43]" /> Visual Builder
          </span>
          <span className="text-xs text-gray-400">|</span>
          <span className="text-xs font-semibold text-gray-700">Home Page Template (Default)</span>
        </div>

        {/* Device Viewport Simulation Toggles */}
        <div className="flex items-center rounded-xl bg-gray-100 p-1">
          <button
            onClick={() => setDeviceMode('desktop')}
            title="Desktop 100%"
            className={`rounded-lg p-1.5 transition-all cursor-pointer ${
              deviceMode === 'desktop' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Monitor size={16} />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            title="Tablet (768px)"
            className={`rounded-lg p-1.5 transition-all cursor-pointer ${
              deviceMode === 'tablet' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Tablet size={16} />
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            title="Mobile (375px)"
            className={`rounded-lg p-1.5 transition-all cursor-pointer ${
              deviceMode === 'mobile' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Smartphone size={16} />
          </button>
        </div>

        {/* Template Library, Code Mode, Save & Publish */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setTemplateModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <BookOpen size={13} /> Templates
          </button>

          <Link
            to="/admin/code-mode"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Code2 size={13} /> Code Mode
          </Link>

          <button
            onClick={handleSaveAndPublish}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#D96B43] px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#c25b36] transition-all cursor-pointer active:scale-95"
          >
            <Save size={13} />
            {savedNotification ? 'Published ✓' : 'Save & Publish'}
          </button>
        </div>
      </header>

      {/* 3-Column Layout: Left Sections Manager | Center Canvas Preview | Right Granular Inspector */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Sections & Layer Tree */}
        <div className="w-72 shrink-0 border-r border-gray-300 bg-white flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Layers size={14} /> Page Sections ({sections.length})
              </span>
              <button
                onClick={() => setNewSectionModalOpen(true)}
                className="grid h-6 w-6 place-items-center rounded-full bg-[#142B1F] text-white hover:bg-black cursor-pointer"
                title="Add Section"
              >
                <Plus size={14} />
              </button>
            </div>

            <div className="p-3 space-y-2">
              {sections.map((sec, idx) => {
                const isSelected = sec.id === activeSectionId
                return (
                  <div
                    key={sec.id}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`flex items-center justify-between rounded-xl p-2.5 text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#D96B43] bg-orange-50/50 text-gray-900 shadow-xs ring-1 ring-[#D96B43]'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] text-gray-400 w-3">{idx + 1}</span>
                      <span className="truncate font-semibold">{sec.name}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {/* Move Up / Down Buttons */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          moveSectionUp(idx)
                        }}
                        disabled={idx === 0}
                        className="p-1 text-gray-400 hover:text-gray-900 disabled:opacity-20 cursor-pointer"
                        title="Move Up"
                      >
                        <MoveUp size={12} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          moveSectionDown(idx)
                        }}
                        disabled={idx === sections.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-900 disabled:opacity-20 cursor-pointer"
                        title="Move Down"
                      >
                        <MoveDown size={12} />
                      </button>

                      {/* Visibility Toggle Switch */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSectionVisibility(sec.id)
                        }}
                        className={`p-1 rounded-md transition-colors cursor-pointer ${
                          sec.visible ? 'text-green-700 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-200'
                        }`}
                        title={sec.visible ? 'Visible on Storefront (Click to Hide)' : 'Hidden (Click to Show)'}
                      >
                        {sec.visible ? <Eye size={13} /> : <EyeOff size={13} />}
                      </button>

                      {/* Delete Custom Section */}
                      {sec.id.startsWith('custom-') && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteSection(sec.id)
                          }}
                          className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                          title="Delete Section"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-500 leading-normal">
            💡 <span className="font-semibold text-gray-700">Quick tip:</span> Toggle the eye icon to hide or unhide any section on your live customer storefront instantly.
          </div>
        </div>

        {/* Center Column: Live Responsive Canvas Simulation */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          <div
            className={`transition-all duration-300 bg-[#FBF8F2] shadow-2xl rounded-2xl overflow-y-auto border border-gray-300 h-full max-h-[85vh] ${
              deviceMode === 'desktop'
                ? 'w-full'
                : deviceMode === 'tablet'
                ? 'w-[768px]'
                : 'w-[375px]'
            }`}
          >
            {/* Simulation Header Badge */}
            <div className="sticky top-0 z-30 flex items-center justify-between bg-[#142B1F] px-4 py-2 text-white text-[11px]">
              <span>Storefront View ({deviceMode})</span>
              <span className="font-mono text-white/60">babi MNL Dynamic Canvas</span>
            </div>

            {/* Rendered Live Canvas Preview */}
            <div className="p-4 sm:p-6 space-y-6">
              {sections.map((sec) => {
                const isSelected = sec.id === activeSectionId
                if (!sec.visible) {
                  return (
                    <div
                      key={sec.id}
                      onClick={() => setActiveSectionId(sec.id)}
                      className="rounded-2xl border-2 border-dashed border-gray-300 p-4 text-center text-xs text-gray-400 bg-gray-100/60 cursor-pointer"
                    >
                      👁️‍🗨️ Section <span className="font-bold">{sec.name}</span> is currently Hidden on Live Store
                    </div>
                  )
                }

                return (
                  <div
                    key={sec.id}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`relative rounded-3xl p-6 transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-3 ring-[#D96B43] shadow-lg'
                        : 'hover:ring-2 hover:ring-black/20'
                    } ${
                      sec.id === 'hero'
                        ? 'bg-[#142B1F] text-white min-h-[260px]'
                        : sec.id === 'promobanner'
                        ? 'bg-[#1B3B2B] text-white'
                        : sec.id === 'story'
                        ? 'bg-[#142B1F] text-white'
                        : 'bg-white text-gray-900 border border-black/5 shadow-xs'
                    }`}
                  >
                    {/* Active Section Label Pill */}
                    {isSelected && (
                      <span className="absolute -top-3 left-4 rounded-full bg-[#D96B43] px-3 py-0.5 text-[10px] font-bold text-white shadow-xs">
                        Editing: {sec.name}
                      </span>
                    )}

                    {sec.settings.tag && (
                      <p className="font-script text-2xl text-[#F4B342]">{sec.settings.tag}</p>
                    )}
                    <h3 className="text-xl sm:text-2xl font-black mt-1">
                      {sec.settings.headline || sec.settings.title || sec.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm opacity-80 leading-relaxed max-w-xl">
                      {sec.settings.subtitle}
                    </p>

                    {sec.settings.ctaText && (
                      <button className="mt-4 rounded-full bg-[#D96B43] px-5 py-2 text-xs font-bold text-white">
                        {sec.settings.ctaText}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Granular Component Inspector */}
        <div className="w-80 shrink-0 border-l border-gray-300 bg-white flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Settings size={14} /> Component Inspector
              </span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-700">
                {activeSection.name}
              </span>
            </div>

            <div className="p-5 space-y-6">
              {/* Visibility Switch */}
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3 border border-gray-200">
                <div>
                  <span className="text-xs font-bold text-gray-800">Storefront Visibility</span>
                  <p className="text-[10px] text-gray-500">Show on live storefront</p>
                </div>
                <button
                  onClick={() => toggleSectionVisibility(activeSection.id)}
                  className={`h-6 w-11 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                    activeSection.visible ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`h-5 w-5 rounded-full bg-white transition-transform ${
                      activeSection.visible ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Text & Content Controls */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Type size={13} /> Content &amp; Copy
                </span>

                {activeSection.settings.tag !== undefined && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Script Tag / Badge</label>
                    <input
                      type="text"
                      value={activeSection.settings.tag}
                      onChange={(e) => handleSettingChange('tag', e.target.value)}
                      className="mt-1 w-full rounded-xl border border-gray-200 p-2 text-xs outline-none focus:border-[#D96B43]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700">Headline / Title</label>
                  <input
                    type="text"
                    value={activeSection.settings.headline || activeSection.settings.title || ''}
                    onChange={(e) =>
                      handleSettingChange(
                        activeSection.settings.headline !== undefined ? 'headline' : 'title',
                        e.target.value
                      )
                    }
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2 text-xs outline-none focus:border-[#D96B43]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700">Subtitle / Description</label>
                  <textarea
                    rows={3}
                    value={activeSection.settings.subtitle || ''}
                    onChange={(e) => handleSettingChange('subtitle', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2 text-xs outline-none focus:border-[#D96B43] resize-none"
                  />
                </div>

                {activeSection.settings.ctaText !== undefined && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">CTA Button Text</label>
                    <input
                      type="text"
                      value={activeSection.settings.ctaText}
                      onChange={(e) => handleSettingChange('ctaText', e.target.value)}
                      className="mt-1 w-full rounded-xl border border-gray-200 p-2 text-xs outline-none focus:border-[#D96B43]"
                    />
                  </div>
                )}
              </div>

              {/* Styling Controls */}
              <div className="space-y-4 border-t border-gray-100 pt-5">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Sliders size={13} /> Style &amp; Spacing
                </span>

                <div>
                  <label className="block text-xs font-semibold text-gray-700">Section Background Theme</label>
                  <div className="mt-2 flex gap-2">
                    {[
                      { label: 'Sand', color: '#FBF8F2' },
                      { label: 'White', color: '#FFFFFF' },
                      { label: 'Forest', color: '#1B3B2B' },
                      { label: 'Dark', color: '#142B1F' },
                    ].map((b) => (
                      <button
                        key={b.label}
                        onClick={() => handleSettingChange('bgColor', b.color)}
                        className="h-8 w-8 rounded-full border border-gray-300 shadow-xs cursor-pointer hover:scale-105"
                        style={{ backgroundColor: b.color }}
                        title={b.label}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-700">
                    <span>Padding Vertical</span>
                    <span>Standard</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    defaultValue="3"
                    className="mt-2 w-full accent-[#D96B43] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleSaveAndPublish}
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#142B1F] py-2.5 text-xs font-bold text-white hover:bg-black transition-all cursor-pointer"
            >
              <Save size={14} /> Update Section
            </button>
          </div>
        </div>
      </div>

      {/* Pre-Built Template Library Modal */}
      {templateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">Pre-Built Template Library</h3>
              <button
                onClick={() => setTemplateModalOpen(false)}
                className="text-gray-400 hover:text-gray-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {PREBUILT_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{tmpl.name}</h4>
                    <p className="mt-0.5 text-xs text-gray-500">{tmpl.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      alert(`Template "${tmpl.name}" applied successfully!`)
                      setTemplateModalOpen(false)
                    }}
                    className="rounded-full bg-[#D96B43] px-4 py-1.5 text-xs font-bold text-white cursor-pointer hover:bg-[#c25b36]"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add New Section Modal */}
      {newSectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Add New Section Block</h3>
              <button onClick={() => setNewSectionModalOpen(false)} className="text-gray-400 cursor-pointer">
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-2.5">
              {[
                { type: 'hero', name: 'Custom Hero Slideshow', desc: 'Full-bleed banner with dynamic headline & CTA' },
                { type: 'banner', name: 'Promotional Callout Bar', desc: 'High-contrast card with announcement badge' },
                { type: 'faq', name: 'Interactive FAQ Accordion', desc: 'Expandable Q&A accordion list' },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleAddNewSection(item.type)}
                  className="w-full p-3.5 rounded-2xl border border-gray-200 text-left hover:border-[#D96B43] hover:bg-orange-50/30 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <p className="text-xs font-bold text-gray-900">{item.name}</p>
                    <p className="text-[11px] text-gray-500">{item.desc}</p>
                  </div>
                  <Plus size={16} className="text-[#D96B43]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
