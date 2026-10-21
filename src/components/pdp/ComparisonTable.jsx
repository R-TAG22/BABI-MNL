import { Check, X } from 'lucide-react'
import { container } from '../shared'

const rows = ['Durable Materials', 'Highly Detailed Craft', 'Local Craftsmanship', 'Safe PLA Plastic', 'Secure Metal Ring']

export default function ComparisonTable() {
  return (
    <section className="py-12">
      <div className={`${container} max-w-4xl`}>
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Babi MNL vs Generic Plastic</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-black/10 bg-white/50">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <caption className="sr-only">Comparison between Babi MNL and generic plastic keychains</caption>
            <thead>
              <tr>
                <th scope="col" className="w-1/2 p-3 text-left"><span className="sr-only">Feature</span></th>
                <th scope="col" className="rounded-t-2xl bg-terracotta p-3 text-center font-bold text-white">Babi MNL</th>
                <th scope="col" className="p-3 text-center font-bold">Generic Plastic</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r} className="border-t border-black/10">
                  <th scope="row" className="p-3 text-left font-semibold">{r}</th>
                  <td className="bg-terracotta/10 p-3 text-center"><Check size={18} className="mx-auto" aria-label="Yes" /></td>
                  <td className="p-3 text-center"><X size={18} className="mx-auto text-muted" aria-label="No" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
