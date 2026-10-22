import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Repeat,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Package,
  Palette,
  ShieldAlert,
  Clock,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function DashboardOverview() {
  const [timeframe, setTimeframe] = useState('weekly')
  const { orders, products, disputes } = useStore()

  // Calculate dynamic metrics
  const totalGrossSales = orders.reduce((sum, o) => sum + o.total, 0) + 128450
  const totalNetSales = Math.round(totalGrossSales * 0.94) // after gateway/shipping fees
  const totalOrdersCount = orders.length + 382
  const averageOrderValue = Math.round(totalGrossSales / totalOrdersCount)
  const conversionRate = '3.8%'
  const returningCustomerRate = '31.4%'

  // Revenue chart data simulations based on timeframe
  const revenueData = {
    daily: [
      { label: '00:00', value: 4200 },
      { label: '04:00', value: 1800 },
      { label: '08:00', value: 8900 },
      { label: '12:00', value: 16500 },
      { label: '16:00', value: 24200 },
      { label: '20:00', value: 19800 },
      { label: '23:59', value: 11400 },
    ],
    weekly: [
      { label: 'Mon', value: 18400 },
      { label: 'Tue', value: 22100 },
      { label: 'Wed', value: 19800 },
      { label: 'Thu', value: 28900 },
      { label: 'Fri', value: 34500 },
      { label: 'Sat', value: 41200 },
      { label: 'Sun', value: 38900 },
    ],
    monthly: [
      { label: 'Week 1', value: 112000 },
      { label: 'Week 2', value: 145000 },
      { label: 'Week 3', value: 168000 },
      { label: 'Week 4', value: 192000 },
    ],
  }[timeframe]

  const maxVal = Math.max(...revenueData.map((d) => d.value))

  const trafficSources = [
    { source: 'Organic Search (Google)', visits: '18,420 (42%)', color: '#1B3B2B' },
    { source: 'Social Media (Instagram & TikTok)', visits: '12,940 (29%)', color: '#D96B43' },
    { source: 'Direct & Bookmarks', visits: '7,890 (18%)', color: '#5EBA8A' },
    { source: 'Paid Ads (Meta & Google Shopping)', visits: '4,820 (11%)', color: '#F4B342' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-[#142B1F] p-6 sm:p-8 text-white shadow-md">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#5EBA8A]">
            <Sparkles size={14} /> AI Studio E-Commerce Engine Active
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome to babi MNL Executive Suite
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-white/75 max-w-2xl">
            Live operations, drag-and-drop page customization, inventory tracking across Manila hubs, and fulfillment processing in one unified cockpit.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/builder"
            className="rounded-full bg-[#D96B43] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#c25b36] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Palette size={14} /> Open Page Builder
          </Link>
          <Link
            to="/admin/orders"
            className="rounded-full bg-white/15 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/25 transition-all flex items-center gap-1.5"
          >
            <ShoppingCart size={14} /> Orders ({orders.length})
          </Link>
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Total Gross Sales */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Sales</span>
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-green-50 text-green-700">
              <DollarSign size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-gray-900">₱{totalGrossSales.toLocaleString()}</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-green-600">
            <ArrowUpRight size={14} />
            <span>+18.4% vs last period</span>
          </div>
        </div>

        {/* Total Net Sales */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold uppercase tracking-wider">Net Sales</span>
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
              <TrendingUp size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-gray-900">₱{totalNetSales.toLocaleString()}</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-green-600">
            <ArrowUpRight size={14} />
            <span>+16.2% margin rate</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-700">
              <ShoppingCart size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-gray-900">{totalOrdersCount}</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-green-600">
            <ArrowUpRight size={14} />
            <span>+12.8% order volume</span>
          </div>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold uppercase tracking-wider">Average Order</span>
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-50 text-amber-700">
              <Repeat size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-gray-900">₱{averageOrderValue}</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-green-600">
            <ArrowUpRight size={14} />
            <span>+5.1% basket size</span>
          </div>
        </div>

        {/* Conversion & Return Rate */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold uppercase tracking-wider">Conversion / Return</span>
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-purple-50 text-purple-700">
              <Users size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-gray-900">{conversionRate}</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-purple-700">
            <span>{returningCustomerRate} repeat buyers</span>
          </div>
        </div>
      </div>

      {/* Main Charts & Leaderboards Row */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Revenue Timeline Chart (8 cols) */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xs lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Revenue Performance Timeline</h3>
                <p className="text-xs text-gray-500">Real-time revenue attribution and order velocity</p>
              </div>

              {/* Timeframe Toggles */}
              <div className="flex items-center rounded-xl bg-gray-100 p-1 text-xs">
                {['daily', 'weekly', 'monthly'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`rounded-lg px-3 py-1 font-bold capitalize transition-all cursor-pointer ${
                      timeframe === t ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom SVG Bar / Area Visualization */}
            <div className="mt-6 h-64 w-full flex items-end gap-3 sm:gap-6 pt-6">
              {revenueData.map((d, i) => {
                const heightPercent = Math.round((d.value / maxVal) * 100)
                return (
                  <div key={d.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-900 transition-colors">
                      ₱{(d.value / 1000).toFixed(1)}k
                    </span>
                    <div className="w-full rounded-t-xl bg-gray-100 relative overflow-hidden flex items-end h-full">
                      <div
                        className="w-full bg-[#1B3B2B] rounded-t-xl transition-all duration-500 group-hover:bg-[#D96B43]"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-600 truncate">{d.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Peak Day: Saturday (₱41,200)</span>
            <span className="font-semibold text-gray-800">Average Daily Run Rate: ₱29,100</span>
          </div>
        </div>

        {/* Traffic Sources & Channel Breakdown (4 cols) */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xs lg:col-span-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">Traffic Source Acquisition</h3>
            <p className="text-xs text-gray-500">Visitor attribution and converting channels</p>

            <div className="mt-6 space-y-4">
              {trafficSources.map((item) => (
                <div key={item.source}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-800">{item.source}</span>
                    <span className="text-gray-500 font-mono text-[11px]">{item.visits}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: item.color,
                        width: item.visits.match(/\((\d+)%\)/)?.[1] + '%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#F5EFE6] p-4 text-xs text-gray-700">
            <p className="font-bold text-forest">💡 Marketing Recommendation</p>
            <p className="mt-1 text-[11px] text-gray-600 leading-relaxed">
              Instagram reels showcasing jeepney 3D print timelapses delivered a 4.2x ROAS this week. Consider boosting custom nameplates next.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row: Top Selling Products Leaderboard & Live Orders Feed */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Top Selling Products (6 cols) */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xs lg:col-span-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Top-Selling Products Leaderboard</h3>
              <p className="text-xs text-gray-500">Highest grossing SKUs this month</p>
            </div>
            <Link to="/admin/products" className="text-xs font-bold text-[#D96B43] hover:underline">
              View Catalog →
            </Link>
          </div>

          <div className="mt-4 divide-y divide-gray-100">
            {products.slice(0, 4).map((p, idx) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-bold text-gray-400 w-4">#{idx + 1}</span>
                  <img
                    src={p.image || '/images/product-bestseller-jeepney.jpg'}
                    alt={p.name}
                    className="h-10 w-10 rounded-xl object-cover border border-gray-200 shrink-0"
                  />
                  <div className="truncate">
                    <p className="text-xs font-bold text-gray-900 truncate">{p.name}</p>
                    <p className="text-[11px] text-gray-500">{p.category} • ₱{p.price}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-gray-900">
                    ₱{((p.price || 299) * (64 - idx * 12)).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-green-600 font-semibold">{64 - idx * 12} units sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Orders Feed & Fulfillment Processing (6 cols) */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xs lg:col-span-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Recent Customer Orders</h3>
              <p className="text-xs text-gray-500">Live order queue requiring dispatch</p>
            </div>
            <Link to="/admin/orders" className="text-xs font-bold text-[#D96B43] hover:underline">
              Fulfillment Desk →
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {orders.slice(0, 3).map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-100 bg-gray-50/60 text-xs hover:border-gray-200 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gray-900">{o.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        o.status === 'Processing'
                          ? 'bg-amber-100 text-amber-800'
                          : o.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : o.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-600 font-medium">{o.customer.name}</p>
                  <p className="text-[10px] text-gray-400">{o.items.length} items • {o.paymentStatus}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-extrabold text-gray-900">₱{o.total.toLocaleString()}</p>
                  <Link
                    to="/admin/orders"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D96B43] hover:underline mt-1"
                  >
                    Process <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
