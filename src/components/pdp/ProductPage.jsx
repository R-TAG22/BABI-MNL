import PdpHeader from './PdpHeader'
import ProductShowcase from './ProductShowcase'
import CraftedPride from './CraftedPride'
import ComparisonTable from './ComparisonTable'
import PdpBestSellers from './PdpBestSellers'
import Reviews from './Reviews'
import Faq from './Faq'
import Newsletter from '../Newsletter'
import Footer from '../Footer'

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <PdpHeader />
      <main>
        <ProductShowcase />
        <CraftedPride />
        <ComparisonTable />
        <PdpBestSellers />
        <Reviews />
        <Faq />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
