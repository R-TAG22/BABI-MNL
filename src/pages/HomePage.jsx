import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BestSellers from '../components/BestSellers'
import PromoBanner from '../components/PromoBanner'
import Testimonials from '../components/Testimonials'
import PrintedWithLove from '../components/PrintedWithLove'
import HomeFaq from '../components/HomeFaq'
import { useStore } from '../context/StoreContext'

export default function HomePage({ onAddToCart }) {
  const { sections } = useStore()

  return (
    <main>
      {sections.map((sec) => {
        if (!sec.visible) return null

        switch (sec.id) {
          case 'hero':
            return <Hero key={sec.id} settings={sec.settings} />
          case 'categories':
            return <Categories key={sec.id} />
          case 'bestsellers':
            return <BestSellers key={sec.id} onAddToCart={onAddToCart} />
          case 'promobanner':
            return <PromoBanner key={sec.id} />
          case 'reviews':
            return <Testimonials key={sec.id} />
          case 'quality':
            return <PrintedWithLove key={sec.id} />
          case 'faq':
            return <HomeFaq key={sec.id} />
          default:
            return null
        }
      })}
    </main>
  )
}
