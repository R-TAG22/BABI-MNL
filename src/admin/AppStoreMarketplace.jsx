import { useState } from 'react'
import {
  Grid,
  CheckCircle2,
  Settings2,
  Power,
  Key,
  Webhook,
  Plus,
  Trash2,
  Copy,
  ExternalLink,
  Shield,
  Send,
  Sparkles,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

const APP_CATEGORIES = ['All', 'Payments', 'Shipping & Logistics', 'Marketing & Analytics', 'Customer Support']

const ALL_APPS_CATALOG = [
  {
    id: 'paymongo',
    category: 'Payments',
    name: 'PayMongo (GCash, Maya, Cards)',
    desc: 'Accept Philippine e-wallets and credit cards seamlessly.',
    icon: '💳',
  },
  {
    id: 'stripe',
    category: 'Payments',
    name: 'Stripe Payments',
    desc: 'International credit card processing and Apple Pay.',
    icon: '🌐',
  },
  {
    id: 'lalamove',
    category: 'Shipping & Logistics',
    name: 'Lalamove On-Demand Delivery',
    desc: 'Same-day Metro Manila motorcycle and MPV courier dispatch via API.',
    icon: '🛵',
  },
  {
    id: 'jnt',
    category: 'Shipping & Logistics',
    name: 'J&T Express Nationwide',
    desc: 'Nationwide tracking, automated shipping labels, and parcel pickup integration.',
    icon: '📦',
  },
  {
    id: 'ga4',
    category: 'Marketing & Analytics',
    name: 'Google Analytics 4 (GA4)',
    desc: 'Track conversions, page traffic, and e-commerce purchase events.',
    icon: '📊',
  },
  {
    id: 'meta-pixel',
    category: 'Marketing & Analytics',
    name: 'Meta Pixel & Conversions API (CAPI)',
    desc: 'Server-side tracking for Facebook and Instagram ad attribution.',
    icon: '🎯',
  },
  {
    id: 'judgeme',
    category: 'Customer Support',
    name: 'Judge.me Reviews & Photo UGC',
    desc: 'Collect automated verified buyer reviews with photo & star ratings.',
    icon: '⭐',
  },
  {
    id: 'tidio',
    category: 'Customer Support',
    name: 'Tidio Live Chat & Messenger Bot',
    desc: 'Instant real-time support widget for answering visitor custom inquiries.',
    icon: '💬',
  },
]

export default function AppStoreMarketplace() {
  const {
    integrations,
    toggleIntegration,
    updateIntegrationSettings,
    webhooks,
    setWebhooks,
  } = useStore()

  const [activeTab, setActiveTab] = useState('apps') // 'apps' | 'webhooks' | 'apikeys'
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [configuringApp, setConfiguringApp] = useState(null)
  const [appApiKey, setAppApiKey] = useState('')
  const [appLiveMode, setAppLiveMode] = useState(true)

  // Webhooks
  const [isAddWebhookOpen, setIsAddWebhookOpen] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState('')
  const [webhookEvent, setWebhookEvent] = useState('order.created')
  const [toastMessage, setToastMessage] = useState('')

  const handleOpenConfig = (appId) => {
    const existing = integrations.find((i) => i.id === appId)
    const catalogItem = ALL_APPS_CATALOG.find((a) => a.id === appId)
    setConfiguringApp({
      ...catalogItem,
      ...(existing || { installed: false, liveMode: true, apiKey: '' }),
    })
    setAppApiKey(existing?.apiKey || '')
    setAppLiveMode(existing?.liveMode ?? true)
  }

  const handleSaveConfig = (e) => {
    e.preventDefault()
    if (!configuringApp) return

    updateIntegrationSettings(configuringApp.id, {
      installed: true,
      apiKey: appApiKey,
      liveMode: appLiveMode,
    })

    setToastMessage(`Configuration saved for ${configuringApp.name}!`)
    setConfiguringApp(null)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleAddWebhook = (e) => {
    e.preventDefault()
    const newHook = {
      id: `wh-${Date.now()}`,
      url: webhookUrl,
      event: webhookEvent,
      status: 'Active',
      created: new Date().toISOString().split('T')[0],
    }
    setWebhooks((prev) => [...prev, newHook])
    setToastMessage(`Webhook registered for ${webhookEvent}!`)
    setIsAddWebhookOpen(false)
    setWebhookUrl('')
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleDeleteWebhook = (id) => {
    setWebhooks((prev) => prev.filter((w) => w.id !== id))
    setToastMessage('Webhook endpoint deleted.')
    setTimeout(() => setToastMessage(''), 3000)
  }

  const handleTestWebhook = (url) => {
    setToastMessage(`Test ping payload delivered to ${url} (HTTP 200 OK)`)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const filteredApps = ALL_APPS_CATALOG.filter(
    (app) => selectedCategory === 'All' || app.category === selectedCategory
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
          <h1 className="text-2xl font-black text-[#142B1F] tracking-tight">App Store & Ecosystem</h1>
          <p className="text-sm text-gray-600">
            Extend babi MNL with 1-click connectors for Philippine logistics, payment gateways, marketing, and webhooks.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-6 text-xs font-bold text-gray-500">
        <button
          onClick={() => setActiveTab('apps')}
          className={`pb-3 cursor-pointer transition-colors ${
            activeTab === 'apps'
              ? 'text-[#142B1F] border-b-2 border-[#142B1F]'
              : 'hover:text-gray-900'
          }`}
        >
          Integrations Directory ({ALL_APPS_CATALOG.length})
        </button>
        <button
          onClick={() => setActiveTab('webhooks')}
          className={`pb-3 cursor-pointer transition-colors ${
            activeTab === 'webhooks'
              ? 'text-[#142B1F] border-b-2 border-[#142B1F]'
              : 'hover:text-gray-900'
          }`}
        >
          Event Webhooks ({webhooks.length})
        </button>
        <button
          onClick={() => setActiveTab('apikeys')}
          className={`pb-3 cursor-pointer transition-colors ${
            activeTab === 'apikeys'
              ? 'text-[#142B1F] border-b-2 border-[#142B1F]'
              : 'hover:text-gray-900'
          }`}
        >
          API Keys & Credentials
        </button>
      </div>

      {/* Tab: Apps */}
      {activeTab === 'apps' && (
        <div className="space-y-5">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {APP_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#142B1F] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredApps.map((app) => {
              const installedState = integrations.find((i) => i.id === app.id)
              const isInstalled = !!installedState?.installed

              return (
                <div
                  key={app.id}
                  className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-xs border border-gray-200 hover:border-gray-300 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl p-2 rounded-xl bg-gray-50 border border-gray-100">
                        {app.icon}
                      </span>
                      {isInstalled ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                          <CheckCircle2 size={11} /> Installed
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-semibold text-gray-600">
                          Available
                        </span>
                      )}
                    </div>

                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      {app.category}
                    </p>
                    <h3 className="font-bold text-sm text-gray-900">{app.name}</h3>
                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">{app.desc}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenConfig(app.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      <Settings2 size={13} /> {isInstalled ? 'Configure' : 'Setup'}
                    </button>

                    <button
                      onClick={() => toggleIntegration(app.id)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                        isInstalled
                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                          : 'bg-[#142B1F] text-white hover:bg-[#1a3828]'
                      }`}
                    >
                      <Power size={13} /> {isInstalled ? 'Disable' : 'Install'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Tab: Webhooks */}
      {activeTab === 'webhooks' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200">
            <div>
              <h3 className="font-bold text-sm text-gray-900">Configured Endpoints</h3>
              <p className="text-xs text-gray-500">Real-time HTTP POST alerts sent whenever store events occur</p>
            </div>
            <button
              onClick={() => setIsAddWebhookOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#D96B43] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#c25933] cursor-pointer"
            >
              <Plus size={14} /> Add Webhook Endpoint
            </button>
          </div>

          <div className="rounded-2xl bg-white shadow-xs border border-gray-200 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3.5">Target Endpoint URL</th>
                  <th className="px-6 py-3.5">Subscribed Event</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Created</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {webhooks.map((hook) => (
                  <tr key={hook.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-800">{hook.url}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="rounded-md bg-blue-50 text-blue-700 px-2.5 py-1 text-[11px] font-mono font-bold">
                        {hook.event}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                        {hook.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{hook.created}</td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleTestWebhook(hook.url)}
                        className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-700 hover:bg-gray-200 cursor-pointer"
                      >
                        Ping Test
                      </button>
                      <button
                        onClick={() => handleDeleteWebhook(hook.id)}
                        className="rounded-lg p-1 text-red-500 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: API Keys */}
      {activeTab === 'apikeys' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-6 shadow-xs border border-gray-200 space-y-4">
            <div>
              <h3 className="font-bold text-sm text-gray-900">Storefront Public API Key</h3>
              <p className="text-xs text-gray-500">Used for client-side queries (safe to expose in JS)</p>
              <div className="mt-2 flex items-center gap-2 max-w-xl">
                <input
                  type="text"
                  readOnly
                  value="pk_live_mnl_882940192840128"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 font-mono text-xs text-gray-700"
                />
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText('pk_live_mnl_882940192840128')
                    setToastMessage('Copied public key!')
                    setTimeout(() => setToastMessage(''), 2500)
                  }}
                  className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="font-bold text-sm text-gray-900">Admin Secret API Key</h3>
              <p className="text-xs text-gray-500">Grants full read/write access to order management & inventory</p>
              <div className="mt-2 flex items-center gap-2 max-w-xl">
                <input
                  type="password"
                  readOnly
                  value="sk_live_9921babi_ultra_secret_access_token_19283"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 font-mono text-xs text-gray-700"
                />
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText('sk_live_9921babi_ultra_secret_access_token_19283')
                    setToastMessage('Copied secret key!')
                    setTimeout(() => setToastMessage(''), 2500)
                  }}
                  className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configure Modal */}
      {configuringApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-gray-100 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{configuringApp.icon}</span>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{configuringApp.name}</h3>
                  <p className="text-[11px] text-gray-500">{configuringApp.category}</p>
                </div>
              </div>
              <button
                onClick={() => setConfiguringApp(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">API / Secret Token</label>
                <input
                  type="text"
                  value={appApiKey}
                  onChange={(e) => setAppApiKey(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 font-mono text-xs focus:border-[#D96B43] focus:outline-hidden"
                  placeholder="Enter token or production key..."
                />
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 border border-gray-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-gray-900">Production Live Mode</p>
                  <p className="text-[11px] text-gray-500">Switch off for sandbox/testing environment</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={appLiveMode}
                    onChange={(e) => setAppLiveMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#142B1F]"></div>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setConfiguringApp(null)}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#142B1F] px-5 py-2 text-xs font-bold text-white hover:bg-[#1a3828] cursor-pointer"
                >
                  Save Integration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Webhook Modal */}
      {isAddWebhookOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-gray-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="font-bold text-sm text-gray-900">Add Webhook Endpoint</h3>
              <button
                onClick={() => setIsAddWebhookOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddWebhook} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Destination URL</label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs font-mono focus:border-[#D96B43] focus:outline-hidden"
                  placeholder="https://api.yourlogistics.com/webhooks/orders"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Trigger Event</label>
                <select
                  value={webhookEvent}
                  onChange={(e) => setWebhookEvent(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:border-[#D96B43] focus:outline-hidden"
                >
                  <option value="order.created">order.created (New order placed)</option>
                  <option value="order.fulfilled">order.fulfilled (Tracking number assigned)</option>
                  <option value="dispute.opened">dispute.opened (Chargeback notification)</option>
                  <option value="inventory.low_stock">inventory.low_stock (Under threshold)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddWebhookOpen(false)}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#142B1F] px-5 py-2 text-xs font-bold text-white hover:bg-[#1a3828] cursor-pointer"
                >
                  Register Webhook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
