import { useState } from 'react'
import {
  ShoppingCart,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  Mail,
  Phone,
  X,
  ExternalLink,
  ChevronRight,
  Printer,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

const orderStatuses = ['All', 'Unfulfilled', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export default function OrdersManager() {
  const { orders, updateOrderStatus } = useStore()
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [search, setSearch] = useState('')
  const [activeOrder, setActiveOrder] = useState(null)
  const [trackingInput, setTrackingInput] = useState('')

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = selectedStatus === 'All' || o.status === selectedStatus
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleSelectOrder = (order) => {
    setActiveOrder(order)
    setTrackingInput(order.trackingNumber || '')
  }

  const handleUpdateStatus = (newStatus) => {
    if (!activeOrder) return
    updateOrderStatus(activeOrder.id, newStatus, trackingInput)
    setActiveOrder({ ...activeOrder, status: newStatus, trackingNumber: trackingInput })
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">Order Processing &amp; Fulfillment</h2>
          <p className="text-xs text-gray-500">
            Live orders dashboard with tracking number generator, courier dispatch, and shipping management
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#142B1F] px-4 py-1.5 text-xs font-bold text-white">
            {orders.length} Active Invoices
          </span>
        </div>
      </div>

      {/* Filter Tabs and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {orderStatuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                selectedStatus === st
                  ? 'bg-[#142B1F] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative sm:w-64">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders, name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-1.5 pl-9 pr-4 text-xs outline-none focus:border-[#D96B43]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="p-4">Order ID &amp; Date</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total &amp; Payment</th>
              <th className="p-4">Items</th>
              <th className="p-4">Fulfillment Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map((o) => (
              <tr
                key={o.id}
                onClick={() => handleSelectOrder(o)}
                className="hover:bg-gray-50/60 transition-colors cursor-pointer"
              >
                <td className="p-4">
                  <span className="font-mono font-bold text-sm text-gray-900">{o.id}</span>
                  <p className="text-[11px] text-gray-400">{o.date}</p>
                </td>

                <td className="p-4">
                  <p className="font-bold text-gray-900">{o.customer.name}</p>
                  <p className="text-[11px] text-gray-500">{o.customer.email}</p>
                </td>

                <td className="p-4">
                  <span className="font-extrabold text-sm text-gray-900">₱{o.total.toLocaleString()}</span>
                  <p className="text-[10px] text-green-700 font-semibold">{o.paymentStatus}</p>
                </td>

                <td className="p-4">
                  <div className="space-y-0.5">
                    {o.items.map((it, idx) => (
                      <p key={idx} className="text-[11px] text-gray-700 truncate max-w-xs">
                        {it.quantity}x {it.name}
                      </p>
                    ))}
                  </div>
                </td>

                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      o.status === 'Processing'
                        ? 'bg-amber-100 text-amber-800'
                        : o.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : o.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : o.status === 'Unfulfilled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {o.status === 'Processing' && <Clock size={12} />}
                    {o.status === 'Shipped' && <Truck size={12} />}
                    {o.status === 'Delivered' && <CheckCircle2 size={12} />}
                    {o.status}
                  </span>
                  {o.trackingNumber && (
                    <p className="font-mono text-[10px] text-gray-400 mt-1 truncate max-w-[140px]">
                      {o.trackingNumber}
                    </p>
                  )}
                </td>

                <td className="p-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectOrder(o)
                    }}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-800 hover:bg-[#142B1F] hover:text-white transition-all cursor-pointer"
                  >
                    Details →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Drawer */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative flex h-full w-full max-w-lg flex-col bg-white shadow-2xl p-6 sm:p-8 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#D96B43]">{activeOrder.id}</span>
                <h3 className="text-xl font-black text-gray-900 mt-0.5">Order Fulfillment Desk</h3>
              </div>
              <button
                onClick={() => setActiveOrder(null)}
                className="rounded-full p-1 text-gray-400 hover:text-gray-900 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="mt-6 rounded-2xl bg-gray-50 p-4 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">Fulfillment Status:</span>
                <span className="font-bold text-sm text-[#142B1F]">{activeOrder.status}</span>
              </div>

              {/* Status Change Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {['Processing', 'Shipped', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(st)}
                    className={`rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
                      activeOrder.status === st
                        ? 'bg-[#142B1F] text-white shadow-xs'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Mark {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Tracking Number Input */}
            <div className="mt-5 space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                Courier Tracking Code ({activeOrder.courier || 'J&T Express'})
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="e.g. JNT-MNL-882310"
                  className="flex-1 rounded-xl border border-gray-200 p-2 text-xs outline-none focus:border-[#D96B43]"
                />
                <button
                  onClick={() => handleUpdateStatus(activeOrder.status)}
                  className="rounded-xl bg-[#D96B43] px-4 py-2 text-xs font-bold text-white hover:bg-[#c25b36] cursor-pointer"
                >
                  Save Code
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Customer Details</h4>
              <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 space-y-2 text-xs text-gray-700">
                <p className="font-bold text-gray-900">{activeOrder.customer.name}</p>
                <p className="flex items-center gap-1.5 text-gray-600">
                  <Mail size={13} /> {activeOrder.customer.email}
                </p>
                <p className="flex items-center gap-1.5 text-gray-600">
                  <Phone size={13} /> {activeOrder.customer.phone}
                </p>
                <p className="flex items-start gap-1.5 text-gray-600 pt-1 border-t border-gray-200">
                  <MapPin size={13} className="shrink-0 mt-0.5" /> {activeOrder.customer.address}
                </p>
              </div>
            </div>

            {/* Line Items */}
            <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Order Items</h4>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl p-2 bg-white">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 text-xs">
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-gray-500">{item.quantity} unit(s) @ ₱{item.price}</p>
                    </div>
                    <span className="font-extrabold text-gray-900">₱{item.quantity * item.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm font-black text-gray-900 pt-2 px-2">
                <span>Total Amount</span>
                <span className="text-[#D96B43]">₱{activeOrder.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Notes */}
            {activeOrder.notes && (
              <div className="mt-6 rounded-2xl bg-amber-50/60 p-4 border border-amber-200/60 text-xs text-amber-900">
                <span className="font-bold">Customer Notes:</span> {activeOrder.notes}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
