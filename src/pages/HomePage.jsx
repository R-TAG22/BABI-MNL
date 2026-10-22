import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BestSellers from '../components/BestSellers'
import PromoBanner from '../components/PromoBanner'
import Testimonials from '../components/Testimonials'
import PrintedWithLove from '../components/PrintedWithLove'
import HomeFaq from '../components/HomeFaq'
import Newsletter from '../components/Newsletter'

export default function HomePage({ onAddToCart }) {
  return (
    <main>
      <Hero />
      <Categories />
      <BestSellers onAddToCart={onAddToCart} />
      <PromoBanner />
      <Testimonials />
      <PrintedWithLove />
      {/* Home Page FAQs compact 4-item accordion placed directly above Newsletter */}
      <HomeFaq />
      <Newsletter />
    </main>
  )
}
