import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Palette,
  Package,
  ShoppingCart,
  ShieldAlert,
  FileText,
  Mail,
  Grid,
  Code2,
  ExternalLink,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Store,
  Layers,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

const navigationItems = [
  { id: 'overview', label: 'Overview & Insights', path: '/admin', icon: LayoutDashboard },
  { id: 'builder', label: 'Visual Page Builder', path: '/admin/builder', icon: Palette, badge: 'Live CMS' },
  { id: 'code-mode', label: 'Code Mode IDE', path: '/admin/code-mode', icon: Code2 },
  { id: 'products', label: 'Product Catalog & Inventory', path: '/admin/products', icon: Package },
  { id: 'orders', label: 'Order Processing', path: '/admin/orders', icon: ShoppingCart },
  { id: 'risk', label: 'Risk & Chargebacks', path: '/admin/risk', icon: ShieldAlert },
  { id: 'cms', label: 'Blog & Content CMS', path: '/admin/blog', icon: FileText },
  { id: 'marketing', label: 'Email & Marketing Hub', path: '/admin/marketing', icon: Mail },
  { id: 'apps', label: 'App Store & Webhooks', path: '/admin/apps', icon: Grid },
]

export default function AdminLayout({ children }) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const { orders, disputes, resetToFactoryDefaults } = useStore()

  const pendingOrdersCount = orders.filter((o) => o.status === 'Unfulfilled' || o.status === 'Processing').length
  const openDisputesCount = disputes.filter((d) => d.status === 'Under Review').length

  const getActiveTab = () => {
    const current = navigationItems.find((item) => item.path === location.pathname)
    return current ? current.label : 'Admin Studio'
  }

  return (
    <div className="flex h-screen bg-[#F3F4F6] text-[#111827] font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Dark Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#142B1F] text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Store Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#D96B43] text-white shadow-md">
              <Store size={20} />
            </div>
            <div>
              <span className="block text-sm font-extrabold tracking-tight">babi MNL</span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#5EBA8A]">
                Enterprise CMS
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white lg:hidden cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Store Switcher Pill */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between rounded-xl bg-white/5 p-2.5 text-xs text-white/90 border border-white/10">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#5EBA8A] animate-pulse" />
              <div>
                <p className="font-bold">Manila Flagship Hub</p>
                <p className="text-[10px] text-white/60">Live Production v2.4</p>
              </div>
            </div>
            <ChevronDown size={14} className="text-white/60" />
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-white/40 mb-2">
            Store Management
          </p>

          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#D96B43] text-white shadow-sm font-bold'
                    : 'text-white/75 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-white/70'} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
                {item.id === 'orders' && pendingOrdersCount > 0 && (
                  <span className="rounded-full bg-[#5EBA8A] px-2 py-0.5 text-[10px] font-bold text-[#142B1F]">
                    {pendingOrdersCount}
                  </span>
                )}
                {item.id === 'risk' && openDisputesCount > 0 && (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {openDisputesCount}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions & Live Storefront Link */}
        <div className="border-t border-white/10 p-4 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/20"
          >
            <ExternalLink size={14} /> View Live Storefront
          </Link>

          <button
            onClick={() => {
              if (window.confirm('Reset all demo orders, CMS sections, and inventory to factory state?')) {
                resetToFactoryDefaults()
                window.location.reload()
              }
            }}
            className="flex w-full items-center justify-center gap-1.5 text-[11px] text-white/50 hover:text-white/80 py-1 transition-colors cursor-pointer"
          >
            <RotateCcw size={12} /> Reset Demo Database
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/10 bg-white px-4 sm:px-8 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight">
                {getActiveTab()}
              </h1>
              <p className="text-[11px] text-gray-500 hidden sm:block">
                babi MNL Multistore Admin Console
              </p>
            </div>
          </div>

          {/* Quick Actions & Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/admin/builder"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#142B1F] px-4 py-1.5 text-xs font-semibold text-white hover:bg-black transition-all shadow-xs"
            >
              <Palette size={14} /> Open Page Builder
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              >
                <Bell size={18} />
                {(pendingOrdersCount > 0 || openDisputesCount > 0) && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#D96B43]" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl z-50 text-xs">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="font-bold text-gray-900">Notifications</span>
                    <span className="text-[10px] text-gray-500">Live Webhook Feed</span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {pendingOrdersCount > 0 && (
                      <div className="rounded-xl bg-green-50 p-2.5 text-green-800">
                        <p className="font-bold">🛒 {pendingOrdersCount} New Orders Pending</p>
                        <p className="text-[11px] text-green-700">Ready for packaging and J&T dispatch.</p>
                      </div>
                    )}
                    {openDisputesCount > 0 && (
                      <div className="rounded-xl bg-red-50 p-2.5 text-red-800">
                        <p className="font-bold">⚠️ Chargeback Dispute Flagged</p>
                        <p className="text-[11px] text-red-700">David Sterling: ₱1,450 requires proof of delivery.</p>
                      </div>
                    )}
                    <div className="rounded-xl bg-gray-50 p-2.5 text-gray-700">
                      <p className="font-bold">📦 Inventory Sync Active</p>
                      <p className="text-[11px] text-gray-500">Manila Central Warehouse synced with online stock.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Storefront Quick Exit */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-xs"
            >
              <ArrowLeft size={14} /> Storefront
            </Link>

            {/* User Profile */}
            <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[#142B1F] text-xs font-bold text-white shadow-xs">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-gray-900 leading-tight">Admin Master</p>
                <p className="text-[10px] text-gray-500">Owner Access</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F9FAFB]">
          {children}
        </main>
      </div>
    </div>
  )
}
