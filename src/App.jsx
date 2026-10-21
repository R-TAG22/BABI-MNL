import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import BestSellers from './components/BestSellers'
import PromoBanner from './components/PromoBanner'
import Testimonials from './components/Testimonials'
import PrintedWithLove from './components/PrintedWithLove'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import ProductPage from './components/pdp/ProductPage'

const isProduct = () => window.location.hash.startsWith('#/product')

export default function App() {
  const [product, setProduct] = useState(isProduct())

  useEffect(() => {
    const onHash = () => {
      const next = isProduct()
      setProduct((prev) => {
        if (prev !== next) window.scrollTo(0, 0)
        return next
      })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (product) return <ProductPage />

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header />
      <main>
        <Hero />
        <Categories />
        <BestSellers />
        <PromoBanner />
        <Testimonials />
        <PrintedWithLove />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
