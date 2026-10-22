import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ContactPage from './pages/ContactPage'
import FaqsPage from './pages/FaqsPage'
import CustomOrderPage from './pages/CustomOrderPage'
import PolicyPage from './pages/PolicyPage'
import ProductPage from './components/pdp/ProductPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function HashRedirect() {
  const navigate = useNavigate()
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash.startsWith('#/product')) {
        navigate('/product')
      } else if (hash.startsWith('#/about')) {
        navigate('/about')
      } else if (hash.startsWith('#/products')) {
        navigate('/products')
      } else if (hash.startsWith('#/contact')) {
        navigate('/contact')
      } else if (hash.startsWith('#/faqs')) {
        navigate('/faqs')
      } else if (hash.startsWith('#/custom-order')) {
        navigate('/custom-order')
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [navigate])

  return null
}

function MainLayout() {
  const [cartItems, setCartItems] = useState([
    {
      id: 'jeepney-keychain',
      name: 'Classic Manila Jeepney Keychain',
      price: 299,
      quantity: 1,
      img: '/images/product-bestseller-jeepney.jpg',
    },
  ])
  const [cartOpen, setCartOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [
        ...prev,
        {
          id: product.id || product.name,
          name: product.name,
          price: product.price,
          quantity: 1,
          img: product.img,
        },
      ]
    })

    setToastMessage(`Added "${product.name}" to bag!`)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const handleUpdateQty = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    )
  }

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="min-h-screen bg-[#FBF8F2] text-[#1C1C1C] flex flex-col justify-between selection:bg-terracotta selection:text-white">
      <ScrollToTop />
      <HashRedirect />

      <Header cartCount={totalCartCount} onOpenCart={() => setCartOpen(true)} />

      {/* Floating Add To Cart Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-forest px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
          <span className="h-2 w-2 rounded-full bg-mint animate-pulse" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setCartOpen(true)}
            className="ml-2 rounded-lg bg-white/15 px-2 py-1 text-[11px] hover:bg-white/25"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Global Routed Views */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/custom-order" element={<CustomOrderPage />} />
          <Route path="/product" element={<ProductPage onAddToCart={handleAddToCart} />} />
          <Route path="/privacy-policy" element={<PolicyPage type="privacy" />} />
          <Route path="/terms" element={<PolicyPage type="terms" />} />
          <Route path="/shipping-policy" element={<PolicyPage type="shipping" />} />
          <Route path="/returns" element={<PolicyPage type="returns" />} />
          {/* Fallback to Home */}
          <Route path="*" element={<HomePage onAddToCart={handleAddToCart} />} />
        </Routes>
      </div>

      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  )
}
