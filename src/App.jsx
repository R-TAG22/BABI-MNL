import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import NewsletterSection from './components/NewsletterSection'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ContactPage from './pages/ContactPage'
import FaqsPage from './pages/FaqsPage'
import CustomOrderPage from './pages/CustomOrderPage'
import PolicyPage from './pages/PolicyPage'

// Store and Admin imports
import { StoreProvider } from './context/StoreContext'
import AdminLayout from './admin/AdminLayout'
import DashboardOverview from './admin/DashboardOverview'
import VisualPageBuilder from './admin/VisualPageBuilder'
import CodeEditorMode from './admin/CodeEditorMode'
import ProductsManager from './admin/ProductsManager'
import OrdersManager from './admin/OrdersManager'
import RiskChargebackManager from './admin/RiskChargebackManager'
import BlogCmsManager from './admin/BlogCmsManager'
import EmailMarketingManager from './admin/EmailMarketingManager'
import AppStoreMarketplace from './admin/AppStoreMarketplace'
import AdminLogin from './admin/AdminLogin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function StorefrontLayout() {
  const [cartItems, setCartItems] = useState([
    {
      id: 'classic-manila-jeepney-keychain',
      name: 'Classic Manila Jeepney Keychain (Blue / Yellow)',
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
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        )
      }
      return [
        ...prev,
        {
          id: product.id || product.slug || product.name,
          name: product.name,
          price: product.price,
          quantity: product.quantity || 1,
          img: product.img || product.image,
        },
      ]
    })

    setToastMessage(`Added "${product.name}" to shopping bag!`)
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

      {/* Global Header */}
      <Header cartCount={totalCartCount} onOpenCart={() => setCartOpen(true)} />

      {/* Floating Add To Cart Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-forest px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
          <span className="h-2 w-2 rounded-full bg-[#5eba8a] animate-pulse" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setCartOpen(true)}
            className="ml-2 rounded-lg bg-white/15 px-2.5 py-1 text-[11px] hover:bg-white/25 cursor-pointer font-bold"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Subtle Floating Admin Portal Access Badge */}
      <Link
        to="/admin"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-[#142B1F] text-white px-4 py-2 text-xs font-bold shadow-2xl hover:bg-black transition-all border border-white/20 group hover:scale-105"
        title="Open Admin Dashboard & Visual Page Builder"
      >
        <span className="h-2 w-2 rounded-full bg-[#5EBA8A] animate-ping" />
        <span>Admin CMS ⚡</span>
      </Link>

      {/* Dynamic Routed Views */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} />} />
          <Route path="/products/:slug" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
          <Route path="/product" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/custom-order" element={<CustomOrderPage />} />
          <Route path="/privacy-policy" element={<PolicyPage type="privacy" />} />
          <Route path="/terms" element={<PolicyPage type="terms" />} />
          <Route path="/shipping-policy" element={<PolicyPage type="shipping" />} />
          <Route path="/returns" element={<PolicyPage type="returns" />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<HomePage onAddToCart={handleAddToCart} />} />
        </Routes>
      </div>

      {/* Global Newsletter Section rendered consistently on EVERY page directly above Footer */}
      <NewsletterSection />

      {/* Global Footer */}
      <Footer />

      {/* Slide-out Shopping Cart Drawer */}
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

function AdminRouteWrapper({ children }) {
  return <AdminLayout>{children}</AdminLayout>
}

function RootApp() {
  const { pathname } = useLocation()
  const isAdminPath = pathname.startsWith('/admin')

  if (isAdminPath) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminRouteWrapper>
              <DashboardOverview />
            </AdminRouteWrapper>
          }
        />
        <Route
          path="/admin/builder"
          element={
            <AdminRouteWrapper>
              <VisualPageBuilder />
            </AdminRouteWrapper>
          }
        />
        <Route
          path="/admin/code-mode"
          element={
            <AdminRouteWrapper>
              <CodeEditorMode />
            </AdminRouteWrapper>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRouteWrapper>
              <ProductsManager />
            </AdminRouteWrapper>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRouteWrapper>
              <OrdersManager />
            </AdminRouteWrapper>
          }
        />
        <Route
          path="/admin/risk"
          element={
            <AdminRouteWrapper>
              <RiskChargebackManager />
            </AdminRouteWrapper>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <AdminRouteWrapper>
              <BlogCmsManager />
            </AdminRouteWrapper>
          }
        />
        <Route
          path="/admin/marketing"
          element={
            <AdminRouteWrapper>
              <EmailMarketingManager />
            </AdminRouteWrapper>
          }
        />
        <Route
          path="/admin/apps"
          element={
            <AdminRouteWrapper>
              <AppStoreMarketplace />
            </AdminRouteWrapper>
          }
        />
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      </Routes>
    )
  }

  return <StorefrontLayout />
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <RootApp />
      </HashRouter>
    </StoreProvider>
  )
}
