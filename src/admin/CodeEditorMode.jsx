import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Code2,
  Save,
  Check,
  RotateCcw,
  Sparkles,
  FileCode,
  Terminal,
  Layers,
  ExternalLink,
  Copy,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

const SAMPLE_TEMPLATES = [
  {
    name: 'Theme Accents (Custom Colors)',
    code: `/* Custom Merchant Theme Overrides */\n:root {\n  --color-terracotta: #D96B43;\n  --color-forest: #142B1F;\n  --color-cream: #FBF8F2;\n}\n\n.hero-badge {\n  box-shadow: 0 10px 25px -5px rgba(217, 107, 67, 0.4);\n}`,
  },
  {
    name: 'Floating Promotion Banner Snippet',
    code: `/* Injected Floating Discount Badge */\n.floating-promo-pill {\n  position: fixed;\n  bottom: 24px;\n  left: 24px;\n  z-index: 40;\n  background: #142B1F;\n  color: #FFFFFF;\n  padding: 8px 16px;\n  border-radius: 9999px;\n  font-weight: 700;\n  font-size: 12px;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.2);\n}`,
  },
  {
    name: 'Custom Product Card Hover Animation',
    code: `/* Enhanced Card Elevation */\narticle:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\n}`,
  },
]

export default function CodeEditorMode() {
  const { customCss, setCustomCss } = useStore()
  const [editorContent, setEditorContent] = useState(customCss)
  const [saved, setSaved] = useState(false)
  const [activeFile, setActiveFile] = useState('custom-styles.css')

  const lineCount = editorContent.split('\n').length

  const handleSave = () => {
    setCustomCss(editorContent)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleApplyTemplate = (snippet) => {
    setEditorContent((prev) => prev + '\n\n' + snippet)
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col -m-4 sm:-m-6 lg:-m-8 bg-[#1E1E1E] text-white overflow-hidden font-mono">
      {/* Code Editor Header */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#333333] bg-[#252526] px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#CCCCCC]">
            <Terminal size={14} className="text-[#5EBA8A]" />
            <span className="font-bold">Monaco Theme Code Editor</span>
            <span className="text-[#666666]">/</span>
            <span className="text-[#D96B43]">templates/live-theme.liquid</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-1.5 rounded-md bg-[#333333] px-3 py-1 text-xs text-[#CCCCCC] hover:text-white"
          >
            <ExternalLink size={12} /> Test Live
          </Link>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-md bg-[#D96B43] px-3.5 py-1 text-xs font-bold text-white hover:bg-[#c25b36] transition-all cursor-pointer"
          >
            <Save size={12} /> {saved ? 'Injected ✓' : 'Save & Inject'}
          </button>
        </div>
      </div>

      {/* Main IDE Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left File Explorer Tree */}
        <div className="w-60 shrink-0 border-r border-[#333333] bg-[#252526] flex flex-col justify-between text-xs p-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#888888] px-2 mb-2">
              Theme Assets &amp; Snippets
            </p>
            <div className="space-y-1">
              {[
                { name: 'custom-styles.css', type: 'css' },
                { name: 'theme.liquid', type: 'liquid' },
                { name: 'cart-drawer.liquid', type: 'liquid' },
                { name: 'checkout-config.json', type: 'json' },
              ].map((file) => (
                <button
                  key={file.name}
                  onClick={() => setActiveFile(file.name)}
                  className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-xs transition-colors cursor-pointer ${
                    activeFile === file.name ? 'bg-[#37373D] text-white font-bold' : 'text-[#AAAAAA] hover:bg-[#2A2D2E]'
                  }`}
                >
                  <FileCode size={14} className="text-[#D96B43]" />
                  <span>{file.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 border-t border-[#333333] pt-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#888888] px-2 mb-2">
                Quick Snippets
              </p>
              <div className="space-y-1.5">
                {SAMPLE_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.name}
                    onClick={() => handleApplyTemplate(tmpl.code)}
                    className="flex w-full items-center justify-between rounded-md p-2 text-[11px] text-[#BBBBBB] hover:bg-[#2A2D2E] hover:text-white text-left transition-colors cursor-pointer"
                  >
                    <span className="truncate">{tmpl.name}</span>
                    <Copy size={12} className="shrink-0 text-[#888888]" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-[#1E1E1E] p-2.5 text-[10px] text-[#888888] leading-relaxed">
            ⚡ Custom CSS written here is dynamically injected into your customer-facing storefront in real time.
          </div>
        </div>

        {/* Center: Line Numbers + Textarea Code Editor */}
        <div className="flex flex-1 overflow-hidden bg-[#1E1E1E]">
          {/* Gutter / Line Numbers */}
          <div className="w-12 select-none border-r border-[#333333] bg-[#1E1E1E] py-4 text-right pr-3 text-xs text-[#555555]">
            {Array.from({ length: Math.max(lineCount, 25) }).map((_, i) => (
              <div key={i} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Text Editor Area */}
          <div className="flex-1 overflow-auto p-4">
            <textarea
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              spellCheck="false"
              className="h-full w-full resize-none bg-transparent font-mono text-xs sm:text-sm text-[#D4D4D4] outline-none leading-6 selection:bg-[#264F78]"
              placeholder="/* Enter raw CSS or JavaScript overrides here... */"
            />
          </div>
        </div>
      </div>

      {/* Editor Status Bar */}
      <div className="flex h-6 items-center justify-between border-t border-[#333333] bg-[#007ACC] px-4 text-[11px] text-white">
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>CSS / Liquid</span>
          <span>{lineCount} Lines</span>
        </div>
        <div>
          <span>Storefront Target: babi-mnl-flagship</span>
        </div>
      </div>
    </div>
  )
}
