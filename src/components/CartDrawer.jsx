import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react'

export default function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemoveItem, onClearCart }) {
  const [checkedOut, setCheckedOut] = useState(false)

  if (!isOpen) return null

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const freeShippingThreshold = 999
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  const handleCheckout = () => {
    setCheckedOut(true)
    setTimeout(() => {
      onClearCart()
      setCheckedOut(false)
      onClose()
    }, 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex h-full w-full max-w-md flex-col bg-[#FBF8F2] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 bg-white px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-forest" />
            <h2 className="text-base font-bold text-ink">Your Shopping Bag ({items.length})</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-full p-1 text-muted hover:bg-black/5 hover:text-ink cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="border-b border-black/5 bg-[#F5EFE6] px-6 py-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-forest">
              {remainingForFreeShipping === 0
                ? '🎉 You unlocked Free Nationwide Shipping!'
                : `Add ₱${remainingForFreeShipping} more for Free Shipping!`}
            </span>
            <span className="text-muted">{progressToFreeShipping}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-[#5eba8a] transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="my-16 flex flex-col items-center justify-center text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-stone-warm text-muted">
                <ShoppingBag size={28} />
              </div>
              <p className="mt-4 text-base font-bold text-ink">Your bag is empty</p>
              <p className="mt-1 text-xs text-muted max-w-[200px]">
                Explore our handcrafted 3D keychains and miniatures.
              </p>
              <Link
                to="/products"
                onClick={onClose}
                className="mt-5 rounded-full bg-forest px-6 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-3 shadow-xs"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-warm">
                  {item.img ? (
                    <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-[10px] text-muted">
                      babi MNL
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-ink truncate">{item.name}</h3>
                  <p className="text-xs font-extrabold text-terracotta">₱{item.price}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center rounded-lg border border-black/10 bg-[#FBF8F2] px-2 py-0.5 text-xs">
                      <button
                        onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                        className="text-muted hover:text-ink cursor-pointer"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center font-bold text-ink">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="text-muted hover:text-ink cursor-pointer"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-muted hover:text-red-500 cursor-pointer ml-auto"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-black/5 bg-white p-6 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-semibold text-ink">₱{subtotal}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span className="font-semibold text-[#5eba8a]">
                  {subtotal >= freeShippingThreshold ? 'FREE' : '₱80'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-ink pt-2 border-t border-black/5">
                <span>Total</span>
                <span className="text-base text-terracotta">
                  ₱{subtotal + (subtotal >= freeShippingThreshold ? 0 : 80)}
                </span>
              </div>
            </div>

            {checkedOut ? (
              <div className="flex items-center justify-center gap-2 rounded-full bg-[#5eba8a] py-3 text-xs font-bold text-white">
                <CheckCircle2 size={16} /> Order Placed Successfully!
              </div>
            ) : (
              <button
                onClick={handleCheckout}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1B3B2B] py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-forest-deep active:scale-95"
              >
                <Sparkles size={16} /> Proceed to Checkout
              </button>
            )}

            <p className="text-center text-[10px] text-muted">
              Secure payments powered by GCash, Maya, and Visa/Mastercard.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
