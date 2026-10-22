import { useState } from 'react'
import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Search,
  CheckCircle2,
  Globe,
  Tag,
  Eye,
  Calendar,
  User,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function BlogCmsManager() {
  const { articles, setArticles } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  // Form State
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [author, setAuthor] = useState('Chef Artisan Marco')
  const [status, setStatus] = useState('Published')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [tagsInput, setTagsInput] = useState('3D Printing, Manila, Craftsmanship')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDesc, setMetaDesc] = useState('')

  const handleOpenNew = () => {
    setEditingArticle(null)
    setTitle('')
    setSlug('')
    setAuthor('Chef Artisan Marco')
    setStatus('Published')
    setExcerpt('')
    setContent('')
    setTagsInput('Heritage, Manila, PLA+')
    setMetaTitle('')
    setMetaDesc('')
    setIsModalOpen(true)
  }

  const handleOpenEdit = (art) => {
    setEditingArticle(art)
    setTitle(art.title)
    setSlug(art.slug)
    setAuthor(art.author)
    setStatus(art.status)
    setExcerpt(art.excerpt)
    setContent(art.content)
    setTagsInput(art.tags ? art.tags.join(', ') : '')
    setMetaTitle(art.metaTitle || art.title)
    setMetaDesc(art.metaDesc || art.excerpt)
    setIsModalOpen(true)
  }

  const handleTitleChange = (val) => {
    setTitle(val)
    if (!editingArticle) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      setSlug(generatedSlug)
      setMetaTitle(`${val} | babi MNL Blog`)
    }
  }

  const handleExcerptChange = (val) => {
    setExcerpt(val)
    if (!editingArticle && !metaDesc) {
      setMetaDesc(val)
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    if (editingArticle) {
      setArticles((prev) =>
        prev.map((a) =>
          a.id === editingArticle.id
            ? {
                ...a,
                title,
                slug,
                author,
                status,
                excerpt,
                content,
                tags,
                metaTitle: metaTitle || `${title} | babi MNL Blog`,
                metaDesc: metaDesc || excerpt,
              }
            : a
        )
      )
      setToastMessage(`Updated post "${title}" successfully!`)
    } else {
      const newPost = {
        id: `post-${Date.now()}`,
        title,
        slug: slug || `article-${Date.now()}`,
        author,
        status,
        publishedDate: new Date().toISOString().split('T')[0],
        excerpt,
        content,
        tags,
        metaTitle: metaTitle || `${title} | babi MNL Blog`,
        metaDesc: metaDesc || excerpt,
      }
      setArticles((prev) => [newPost, ...prev])
      setToastMessage(`Created new post "${title}"!`)
    }

    setIsModalOpen(false)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleDelete = (id, artTitle) => {
    if (confirm(`Are you sure you want to delete "${artTitle}"?`)) {
      setArticles((prev) => prev.filter((a) => a.id !== id))
      setToastMessage(`Deleted "${artTitle}"!`)
      setTimeout(() => setToastMessage(''), 3500)
    }
  }

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="rounded-xl bg-emerald-500 text-white px-4 py-3 text-sm font-semibold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#142B1F] tracking-tight">Blog & Content CMS</h1>
          <p className="text-sm text-gray-600">
            Publish SEO-optimized articles, workshop guides, and stories to drive organic search traffic to babi MNL.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#D96B43] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#c25933] transition-all cursor-pointer"
        >
          <Plus size={16} /> Write New Article
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 shadow-xs border border-gray-200">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts by title, tag, or author..."
            className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2 text-xs focus:border-[#D96B43] focus:outline-hidden"
          />
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
          <span>{articles.length} Total Articles</span>
          <span>•</span>
          <span className="text-emerald-700">
            {articles.filter((a) => a.status === 'Published').length} Published
          </span>
          <span>•</span>
          <span className="text-amber-700">
            {articles.filter((a) => a.status === 'Draft').length} Drafts
          </span>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-xs border border-gray-200 hover:border-gray-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    art.status === 'Published'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {art.status}
                </span>
                <span className="text-[11px] text-gray-400 font-mono">
                  {art.publishedDate}
                </span>
              </div>

              <h2 className="text-base font-bold text-gray-900 line-clamp-2 hover:text-[#D96B43] transition-colors">
                {art.title}
              </h2>
              <p className="mt-1.5 text-xs text-gray-600 line-clamp-3 leading-relaxed">
                {art.excerpt}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {art.tags?.map((t, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700"
                  >
                    <Tag size={10} className="text-gray-400" /> {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <User size={12} className="text-gray-400" />
                <span>{art.author}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(art)}
                  className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                  title="Edit post"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(art.id, art.title)}
                  className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 cursor-pointer"
                  title="Delete post"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-black text-[#142B1F]">
                {editingArticle ? `Edit Article: ${editingArticle.title}` : 'Write New Article'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Title & Slug */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Article Headline</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs font-semibold focus:border-[#D96B43] focus:outline-hidden"
                  placeholder="e.g. 5 Reasons Why 3D Printed Pasalubong is Taking Over Manila"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">URL Slug</label>
                  <div className="flex rounded-xl border border-gray-300 overflow-hidden text-xs">
                    <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300 font-mono">
                      /blog/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="flex-1 px-3 py-2 font-mono text-gray-800 focus:outline-hidden"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Publication Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs font-medium focus:border-[#D96B43] focus:outline-hidden"
                  >
                    <option value="Published">Published (Live)</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Author & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs focus:border-[#D96B43] focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs focus:border-[#D96B43] focus:outline-hidden"
                    placeholder="Craftsmanship, 3D Printing, Jeepney"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Short Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => handleExcerptChange(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3 text-xs focus:border-[#D96B43] focus:outline-hidden"
                  placeholder="A concise 1-2 sentence hook for social cards and blog listings..."
                  required
                />
              </div>

              {/* Content Body */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Article Body Content</label>
                <textarea
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3 text-xs font-sans text-gray-800 leading-relaxed focus:border-[#D96B43] focus:outline-hidden"
                  placeholder="Write the full post here..."
                  required
                />
              </div>

              {/* SEO Meta Box */}
              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <Globe size={14} className="text-[#D96B43]" />
                  <span>Search Engine Optimization (SEO) & Google Preview</span>
                </div>

                <div className="rounded-xl bg-white p-3 border border-gray-200">
                  <p className="text-[11px] text-gray-500 font-mono">https://babimnl.ph/blog/{slug || 'article-slug'}</p>
                  <p className="text-sm font-semibold text-blue-700 hover:underline cursor-pointer">
                    {metaTitle || 'Article Title - babi MNL Blog'}
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">
                    {metaDesc || 'Article description will show up in Google search result cards...'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 px-3 py-1.5 text-xs focus:border-[#D96B43] focus:outline-hidden bg-white"
                      placeholder="Custom page title for Google"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Meta Description</label>
                    <input
                      type="text"
                      value={metaDesc}
                      onChange={(e) => setMetaDesc(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 px-3 py-1.5 text-xs focus:border-[#D96B43] focus:outline-hidden bg-white"
                      placeholder="Custom meta description"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#142B1F] px-5 py-2 text-xs font-bold text-white hover:bg-[#1a3828] cursor-pointer shadow-md"
                >
                  {editingArticle ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
