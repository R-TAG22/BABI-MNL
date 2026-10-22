import { Link } from 'react-router-dom'
import { Shield, FileText, Truck, RotateCcw, ArrowLeft } from 'lucide-react'
import { container } from '../components/shared'

const policies = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How Example Commerce LLC T/A Aeruva & babi MNL protects and manages your personal information',
    icon: Shield,
    lastUpdated: 'October 2026',
    sections: [
      {
        heading: '1. Information We Collect',
        content:
          'When you place an order, request a custom 3D print quote, or contact our support team, we collect personal details including your name, email address, physical delivery address, telephone number, and any reference files or logos you upload. We also gather automated analytical telemetry such as browser type, operating system, and IP address to optimize your browsing experience.',
      },
      {
        heading: '2. How We Use Your Data',
        content:
          'We utilize your information solely to fabricate and fulfill your 3D printed orders, communicate production milestones and tracking updates, process payments securely through certified payment gateways, and respond promptly to support inquiries. We never sell, monetize, or rent your personal information to third parties.',
      },
      {
        heading: '3. Data Security & Storage',
        content:
          'All communication between your device and our web servers is encrypted using industry-standard Transport Layer Security (TLS 1.3). Digital CAD files and reference photos provided for custom orders are retained on secure cloud storage and deleted 90 days after delivery completion upon request.',
      },
      {
        heading: '4. Contacting Our Data Protection Officer',
        content:
          'For inquiries regarding data access, deletion, or privacy rights, please contact info@aeruva.com or write to Example Commerce LLC T/A Aeruva, Example Street 123, BL1 DF2, London, UK.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'Rules, guidelines, and agreements governing your use of babi MNL services and custom orders',
    icon: FileText,
    lastUpdated: 'October 2026',
    sections: [
      {
        heading: '1. Agreement to Terms',
        content:
          'By accessing our website or submitting orders, you agree to be bound by these Terms of Service. These terms apply to all visitors, registered clients, and patrons of babi MNL operated under Example Commerce LLC T/A Aeruva.',
      },
      {
        heading: '2. Custom 3D Printing & Intellectual Property',
        content:
          'When submitting graphics, brand logos, or 3D CAD files for custom fabrication, you warrant that you possess the necessary copyrights, trademark permissions, or licenses. babi MNL reserves the right to decline fabrication of materials that infringe upon intellectual property or contain offensive content.',
      },
      {
        heading: '3. Additive Manufacturing Tolerances',
        content:
          'Our items are produced using Fused Deposition Modeling (FDM) additive manufacturing with premium PLA+ filaments. Due to the layer-by-layer fabrication technique, subtle micro-layer lines (0.12mm to 0.20mm) and minimal surface variations are intrinsic characteristics of the handmade artisan craft and not defects.',
      },
      {
        heading: '4. Limitation of Liability',
        content:
          'In no event shall Example Commerce LLC T/A Aeruva or its artisans be liable for any indirect, incidental, or consequential damages resulting from product misuse, extreme thermal exposure, or courier shipping delays beyond our control.',
      },
    ],
  },
  shipping: {
    title: 'Shipping Policy',
    subtitle: 'Production lead times, local couriers, nationwide distribution, and international transit',
    icon: Truck,
    lastUpdated: 'October 2026',
    sections: [
      {
        heading: '1. Production & Fulfillment Timelines',
        content:
          'Standard catalog products (Jeepney keychains, Carabao miniatures, and medallions) are dispatched within 1–2 business days. Custom nameplates, embossed orders, and personalized figurines require 2–4 business days of CAD modeling, precision slicing, and post-processing prior to handoff to couriers.',
      },
      {
        heading: '2. Domestic Shipping (Philippines)',
        content:
          'Metro Manila: 2–4 business days via local express couriers (₱80 flat rate, free for orders above ₱999).\nProvincial Luzon, Visayas, and Mindanao: 4–7 business days via J&T Express or LBC Express (₱150 flat rate).\nExpedited same-day delivery via Grab/Lalamove is available upon special request for Metro Manila orders.',
      },
      {
        heading: '3. International Shipping',
        content:
          'We ship overseas via DHL Express and PhilPost Registered Airmail. Typical delivery times range from 7 to 14 business days. Applicable customs tariffs, import taxes, and VAT assessed by destination countries are the responsibility of the recipient.',
      },
      {
        heading: '4. Tracking & Missing Parcels',
        content:
          'Upon courier pickup, a tracking code and live dispatch link are automatically emailed to you. If your package experiences unexpected delay exceeding 7 business days past standard transit, contact info@aeruva.com for an immediate courier trace investigation.',
      },
    ],
  },
  returns: {
    title: 'Returns & Refunds Policy',
    subtitle: 'Our 100% satisfaction guarantee, replacement process, and return conditions',
    icon: RotateCcw,
    lastUpdated: 'October 2026',
    sections: [
      {
        heading: '1. 7-Day Craftsmanship Guarantee',
        content:
          'We stand behind every piece that leaves our Manila studio. If your product arrives structurally damaged, broken during courier transport, or suffers from a manufacturing defect, notify us within 7 days of delivery with photographic evidence, and we will dispatch a free replacement immediately.',
      },
      {
        heading: '2. Custom & Personalized Items',
        content:
          'Because customized nameplates, custom text prints, and bespoke corporate orders are permanently fabricated to your personalized specifications, they cannot be returned or refunded for change of mind once production has begun. However, our 100% replacement guarantee applies if there is a spelling error on our part or transit damage.',
      },
      {
        heading: '3. Standard Catalog Returns',
        content:
          'Unopened, unused standard catalog items in their original protective packaging may be returned within 14 days of receipt. The customer is responsible for return shipping costs to our Manila studio address.',
      },
      {
        heading: '4. Refund Processing',
        content:
          'Approved refunds are credited back to the original method of payment (GCash, Maya, credit card, or bank transfer) within 3–5 business days after inspection.',
      },
    ],
  },
}

export default function PolicyPage({ type = 'privacy' }) {
  const policy = policies[type] || policies.privacy
  const Icon = policy.icon

  return (
    <div className="py-12">
      <div className={container}>
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-terracotta transition-colors"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>

        {/* Policy Header */}
        <div className="rounded-3xl bg-[#1B3B2B] p-8 sm:p-12 text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-amber-soft">
            <Icon size={14} /> Legal Documentation
          </div>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{policy.title}</h1>
          <p className="mt-2 text-sm text-white/80 max-w-2xl">{policy.subtitle}</p>
          <p className="mt-4 text-[11px] text-white/60">Effective Date: {policy.lastUpdated}</p>
        </div>

        {/* Policy Content */}
        <div className="mt-10 max-w-4xl space-y-8 rounded-3xl border border-black/5 bg-white p-6 sm:p-10 shadow-sm">
          {policy.sections.map((section) => (
            <div key={section.heading} className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-forest">{section.heading}</h2>
              <p className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-[#555555]">
                {section.content}
              </p>
            </div>
          ))}

          {/* Business Sign-off Box */}
          <div className="mt-8 border-t border-black/10 pt-6 text-xs text-muted">
            <p className="font-semibold text-ink">Example Commerce LLC T/A Aeruva</p>
            <p>Registration No. 12345678 • Example Street 123, BL1 DF2, London, UK</p>
            <p>Email: info@aeruva.com • Phone: +44 7 491 582 736</p>
          </div>
        </div>
      </div>
    </div>
  )
}
