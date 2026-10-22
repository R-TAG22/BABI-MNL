import ProductShowcase from './ProductShowcase'
import CraftedPride from './CraftedPride'
import ComparisonTable from './ComparisonTable'
import PdpBestSellers from './PdpBestSellers'
import Reviews from './Reviews'
import Faq from './Faq'
import Newsletter from '../Newsletter'

export default function ProductPage({ onAddToCart }) {
  return (
    <main>
      <ProductShowcase onAddToCart={onAddToCart} />
      <CraftedPride />
      <ComparisonTable />
      <PdpBestSellers onAddToCart={onAddToCart} />
      <Reviews />
      <Faq />
      <Newsletter />
    </main>
  )
}
