import { createContext, useContext, useState, useEffect } from 'react'
import { productsData as initialProducts } from '../data/products'

const StoreContext = createContext(null)

const INITIAL_SECTIONS = [
  {
    id: 'hero',
    name: 'Hero Banner Slideshow',
    visible: true,
    settings: {
      headline: 'Freshly Crafted 3D Printed Goodness in Manila',
      subtitle: 'At Babi MNL, we craft highly-detailed 3D-printed souvenirs and custom keychains using premium materials.',
      tag: 'Freshly Crafted in Manila ♡',
      ctaText: 'Order Now →',
      ctaLink: '/products',
      overlayOpacity: 65,
      autoRotateInterval: 3000,
    },
  },
  {
    id: 'categories',
    name: 'Creation Categories',
    visible: true,
    settings: {
      title: 'Explore Our Craft',
      subtitle: 'From jeepneys to custom nameplates...',
      tag: 'Our Creations',
    },
  },
  {
    id: 'bestsellers',
    name: 'Best Sellers Grid',
    visible: true,
    settings: {
      title: 'Best Sellers for Every Moment',
      subtitle: 'From iconic jeepneys to personalized desk keepsakes, handcrafted with durable eco-friendly PLA.',
      tag: 'Customer Favorites',
    },
  },
  {
    id: 'promobanner',
    name: 'Special Promo Banner',
    visible: true,
    settings: {
      title: 'Special Offer - Get 20% Off Your First Custom Order',
      subtitle: 'Personalized desk nameplates, wedding tokens, or multi-tone keychains printed in Manila with premium PLA+.',
      badgeText: '20%',
      ctaText: 'Start Custom Order',
    },
  },
  {
    id: 'reviews',
    name: 'Infinite Customer Reviews Marquee',
    visible: true,
    settings: {
      title: 'What Our Customers Say',
      subtitle: 'Loved by travelers, corporate teams, and Filipino collectors across the globe.',
      tag: 'Real Stories',
    },
  },
  {
    id: 'story',
    name: 'Printed With Love Story',
    visible: true,
    settings: {
      title: 'Printed with Love ♡',
      subtitle: 'Handcrafted in the heart of Manila. We turn Filipino cultural icons, personalized nameplates, and playful miniatures into tactile keepsakes.',
      ctaText: 'Our Story →',
    },
  },
  {
    id: 'faqs',
    name: 'Frequently Asked Questions',
    visible: true,
    settings: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our handcrafted 3D prints',
      tag: 'Got questions?',
    },
  },
]

const INITIAL_ORDERS = [
  {
    id: 'ORD-9824',
    customer: {
      name: 'Maria Clara Santos',
      email: 'mariaclara@gmail.com',
      phone: '+63 917 555 1234',
      address: 'Unit 14B Legaspi Towers, Paseo de Roxas, Makati City, Metro Manila 1229',
    },
    items: [
      { id: 'classic-manila-jeepney-keychain', name: 'Classic Manila Jeepney Keychain (Blue/Yellow)', price: 299, quantity: 2 },
      { id: 'manila-palms-keychain', name: 'Miniature Manila Palms Medallion (Forest Green)', price: 150, quantity: 1 },
    ],
    total: 748,
    status: 'Processing',
    paymentStatus: 'Paid via GCash',
    trackingNumber: 'JNT-MNL-882310',
    courier: 'J&T Express',
    date: '2026-10-21 14:32',
    notes: 'Please pack in eco-friendly gift wrap with ribbon.',
  },
  {
    id: 'ORD-9823',
    customer: {
      name: 'Ramon Magsaysay Jr.',
      email: 'ramon.m@corporate.ph',
      phone: '+63 920 888 4421',
      address: '22nd Floor High Street South, 26th St, BGC, Taguig 1634',
    },
    items: [
      { id: 'nameplates', name: 'Custom Dual-Layer Desk Nameplate (Classic Manila)', price: 199, quantity: 15 },
    ],
    total: 2985,
    status: 'Unfulfilled',
    paymentStatus: 'Paid via PayMongo (Card)',
    trackingNumber: '',
    courier: 'Lalamove Express',
    date: '2026-10-21 11:15',
    notes: 'Names for plates emailed to info@aeruva.com with vector proofs.',
  },
  {
    id: 'ORD-9822',
    customer: {
      name: 'Elena Gilbert',
      email: 'elena.g@londonexpats.uk',
      phone: '+44 7 491 582 736',
      address: '42 Baker Street, Marylebone, London, UK W1U 7AJ',
    },
    items: [
      { id: 'carabao-miniature', name: 'Carabao Hand-Finished Miniature (Matte Black)', price: 350, quantity: 1 },
      { id: 'classic-manila-jeepney-keychain', name: 'Classic Manila Jeepney Keychain (Red/White)', price: 299, quantity: 1 },
    ],
    total: 1249,
    status: 'Shipped',
    paymentStatus: 'Paid via Stripe',
    trackingNumber: 'DHL-INT-9921471',
    courier: 'DHL Express International',
    date: '2026-10-20 09:40',
    notes: 'International air priority shipment.',
  },
  {
    id: 'ORD-9821',
    customer: {
      name: 'Carlos Yulo',
      email: 'carlos.y@sportsmanila.ph',
      phone: '+63 918 333 9922',
      address: 'Rizal Memorial Sports Complex, Malate, Manila 1004',
    },
    items: [
      { id: 'carabao-miniature', name: 'Carabao Hand-Finished Miniature (Stone Gray)', price: 350, quantity: 2 },
    ],
    total: 700,
    status: 'Delivered',
    paymentStatus: 'Paid via Maya',
    trackingNumber: 'GRAB-EXP-44129',
    courier: 'Grab Express',
    date: '2026-10-19 16:20',
    notes: 'Delivered on time.',
  },
]

const INITIAL_DISPUTES = [
  {
    id: 'DISP-1042',
    orderId: 'ORD-9755',
    customer: 'David Sterling',
    amount: 1450,
    currency: 'PHP',
    reason: 'Fraudulent - Cardholder claims unapproved transaction',
    status: 'Under Review',
    riskScore: 'High Risk (92/100)',
    riskFlags: ['Billing address does not match card country', 'IP Address origin: VPN / Anonymous Proxy', 'Multiple card attempts within 5 minutes'],
    deadline: '2026-10-28',
    evidenceSubmitted: false,
  },
  {
    id: 'DISP-1041',
    orderId: 'ORD-9610',
    customer: 'Althea Ramos',
    amount: 649,
    currency: 'PHP',
    reason: 'Product not received',
    status: 'Won',
    riskScore: 'Low Risk (15/100)',
    riskFlags: ['Verified delivery signature obtained by J&T courier'],
    deadline: '2026-10-15',
    evidenceSubmitted: true,
  },
]

const INITIAL_ARTICLES = [
  {
    id: 'post-1',
    title: 'The Art of FDM 3D Printing: How We Capture Manila Iconography in Plant-Based PLA',
    slug: 'the-art-of-fdm-3d-printing-manila',
    excerpt: 'Behind the scenes at our Manila fabrication studio: slicing profiles, 0.12mm layer micro-tuning, and zero-waste filament recycling.',
    author: 'Chef Artisan Marco',
    status: 'Published',
    publishedDate: '2026-10-18',
    tags: ['Craftsmanship', '3D Printing', 'Heritage'],
    metaTitle: 'The Art of FDM 3D Printing in Manila | babi MNL Blog',
    metaDesc: 'Explore how babi MNL manufactures highly-detailed souvenir keychains and miniatures using sustainable PLA in the heart of Manila.',
    content: `When we set out to build babi MNL, we wanted to bridge the tactile soul of Philippine cultural heritage with modern additive manufacturing.\n\nEvery passenger jeepney and carabao miniature starts with high-resolution parametric CAD modeling. In tropical climates like Manila, filament moisture control is paramount. We dry all PLA filaments in desiccated vacuum chambers to eliminate micro-bubbles...\n\nThe result? Crisp 0.12mm layer lines, rock-solid perimeter shells, and vivid dual-tone contrast that withstands years of everyday pocket wear.`,
  },
  {
    id: 'post-2',
    title: 'Sustainable Pasalubong: Why Biodegradable PLA is the Future of Souvenirs',
    slug: 'sustainable-pasalubong-plant-based-pla',
    excerpt: 'Traditional tourist trinkets are often cheap injection-molded plastics. Here is how plant-based cornstarch polymer changes the game.',
    author: 'Elena Reyes',
    status: 'Published',
    publishedDate: '2026-10-12',
    tags: ['Eco-Friendly', 'Sustainability', 'Pasalubong'],
    metaTitle: 'Sustainable Pasalubong from Manila | babi MNL',
    metaDesc: 'Learn why our eco-friendly PLA souvenirs offer an ethical, durable alternative for gifts and corporate tokens.',
    content: `Filipinos love the tradition of Pasalubong—bringing home tokens of affection from travels. But most souvenir markets are flooded with single-use toxic plastic.\n\nAt babi MNL, we exclusively print using Polylactic Acid (PLA) derived from fermented plant starch such as corn and sugarcane. Non-toxic, odorless, and commercially compostable, our souvenirs let you celebrate local culture without burdening the planet.`,
  },
]

const INITIAL_CAMPAIGNS = [
  {
    id: 'camp-1',
    name: 'Weekend Flash Sale: 20% Off Custom Nameplates',
    subject: '✨ Level up your desk setup with personalized 3D tags!',
    recipients: 'All Subscribers (1,482 contacts)',
    status: 'Sent',
    sentDate: '2026-10-18',
    openRate: '38.4%',
    clickRate: '12.1%',
  },
  {
    id: 'camp-2',
    name: 'Holiday Early Bird: Manila Jeepney Collectibles',
    subject: '🇵🇭 Unique Filipino pasalubong gifts ready to ship worldwide',
    recipients: 'VIP Collectors (320 contacts)',
    status: 'Draft',
    sentDate: 'Scheduled for 2026-10-25',
    openRate: '-',
    clickRate: '-',
  },
]

const INITIAL_AUTOMATIONS = [
  {
    id: 'auto-welcome',
    name: 'New Subscriber Welcome Series',
    trigger: 'Immediately after newsletter sign up',
    active: true,
    stats: { sent: 1240, openRate: '68.2%' },
  },
  {
    id: 'auto-abandoned',
    name: 'Abandoned Cart Recovery with 10% Voucher',
    trigger: '1 hour after cart abandonment',
    active: true,
    stats: { sent: 412, openRate: '45.1%', recovered: '₱24,800' },
  },
  {
    id: 'auto-review',
    name: 'Post-Purchase Review Request & Loyalty Points',
    trigger: '3 days after order is marked Delivered',
    active: true,
    stats: { sent: 890, openRate: '52.7%', reviewsGained: 146 },
  },
]

const INITIAL_INTEGRATIONS = [
  {
    id: 'paymongo',
    category: 'Payments',
    name: 'PayMongo (GCash, Maya, Cards)',
    desc: 'Accept Philippine e-wallets and credit cards seamlessly.',
    installed: true,
    liveMode: true,
    apiKey: 'pk_live_babi_mnl_8992144',
  },
  {
    id: 'stripe',
    category: 'Payments',
    name: 'Stripe Payments',
    desc: 'International credit card processing and Apple Pay.',
    installed: true,
    liveMode: false,
    apiKey: 'pk_test_51Mz9921448109',
  },
  {
    id: 'lalamove',
    category: 'Shipping & Logistics',
    name: 'Lalamove On-Demand Delivery',
    desc: 'Same-day Metro Manila courier dispatch via API.',
    installed: true,
    liveMode: true,
    apiKey: 'llm_api_sec_991823',
  },
  {
    id: 'jnt',
    category: 'Shipping & Logistics',
    name: 'J&T Express Nationwide',
    desc: 'Nationwide tracking and parcel pickup integration.',
    installed: true,
    liveMode: true,
    apiKey: 'jnt_ph_token_88231',
  },
  {
    id: 'ga4',
    category: 'Marketing & Analytics',
    name: 'Google Analytics 4',
    desc: 'Track conversions, page traffic, and e-commerce events.',
    installed: true,
    liveMode: true,
    apiKey: 'G-MNL882310X',
  },
  {
    id: 'meta-pixel',
    category: 'Marketing & Analytics',
    name: 'Meta Pixel & Conversions API (CAPI)',
    desc: 'Track Facebook and Instagram ad attribution.',
    installed: true,
    liveMode: true,
    apiKey: '19823144882199',
  },
  {
    id: 'judgeme',
    category: 'Customer Support & Reviews',
    name: 'Judge.me / Loox Photo Reviews',
    desc: 'Automated verified customer photo reviews widget.',
    installed: true,
    liveMode: true,
    apiKey: 'jm_widget_token_991',
  },
  {
    id: 'tidio',
    category: 'Customer Support & Reviews',
    name: 'Tidio Live Chat & AI Bot',
    desc: 'Real-time customer messaging widget on storefront.',
    installed: false,
    liveMode: false,
    apiKey: '',
  },
]

export function StoreProvider({ children }) {
  // Load or fallback to initial states
  const [sections, setSections] = useState(() => {
    try {
      const saved = localStorage.getItem('babi_mnl_cms_sections')
      return saved ? JSON.parse(saved) : INITIAL_SECTIONS
    } catch {
      return INITIAL_SECTIONS
    }
  })

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('babi_mnl_cms_products')
      return saved ? JSON.parse(saved) : initialProducts
    } catch {
      return initialProducts
    }
  })

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('babi_mnl_cms_orders')
      return saved ? JSON.parse(saved) : INITIAL_ORDERS
    } catch {
      return INITIAL_ORDERS
    }
  })

  const [disputes, setDisputes] = useState(() => {
    try {
      const saved = localStorage.getItem('babi_mnl_cms_disputes')
      return saved ? JSON.parse(saved) : INITIAL_DISPUTES
    } catch {
      return INITIAL_DISPUTES
    }
  })

  const [articles, setArticles] = useState(() => {
    try {
      const saved = localStorage.getItem('babi_mnl_cms_articles')
      return saved ? JSON.parse(saved) : INITIAL_ARTICLES
    } catch {
      return INITIAL_ARTICLES
    }
  })

  const [campaigns, setCampaigns] = useState(() => {
    try {
      const saved = localStorage.getItem('babi_mnl_cms_campaigns')
      return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS
    } catch {
      return INITIAL_CAMPAIGNS
    }
  })

  const [automations, setAutomations] = useState(() => {
    try {
      const saved = localStorage.getItem('babi_mnl_cms_automations')
      return saved ? JSON.parse(saved) : INITIAL_AUTOMATIONS
    } catch {
      return INITIAL_AUTOMATIONS
    }
  })

  const [integrations, setIntegrations] = useState(() => {
    try {
      const saved = localStorage.getItem('babi_mnl_cms_integrations')
      return saved ? JSON.parse(saved) : INITIAL_INTEGRATIONS
    } catch {
      return INITIAL_INTEGRATIONS
    }
  })

  const [customCss, setCustomCss] = useState(() => {
    return localStorage.getItem('babi_mnl_cms_custom_css') || `/* babi MNL Custom Merchant Stylesheet */\n/* Injected directly into the live storefront */\n:root {\n  --brand-primary: #1B3B2B;\n  --brand-accent: #D96B43;\n}\n\n.custom-hero-banner {\n  letter-spacing: -0.02em;\n}\n`
  })

  const [webhooks, setWebhooks] = useState([
    { id: 'wh-1', topic: 'orders/create', endpoint: 'https://api.babimnl.ph/hooks/orders', status: 'Active' },
    { id: 'wh-2', topic: 'inventory/low_stock', endpoint: 'https://warehouse.babimnl.ph/alerts', status: 'Active' },
  ])

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('babi_mnl_cms_sections', JSON.stringify(sections))
  }, [sections])

  useEffect(() => {
    localStorage.setItem('babi_mnl_cms_products', JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem('babi_mnl_cms_orders', JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    localStorage.setItem('babi_mnl_cms_custom_css', customCss)
    // Inject into head
    let styleTag = document.getElementById('babi-mnl-merchant-custom-css')
    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = 'babi-mnl-merchant-custom-css'
      document.head.appendChild(styleTag)
    }
    styleTag.innerHTML = customCss
  }, [customCss])

  // Page Builder Actions
  const toggleSectionVisibility = (id) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    )
  }

  const updateSectionSettings = (id, newSettings) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, settings: { ...s.settings, ...newSettings } } : s
      )
    )
  }

  const reorderSections = (startIndex, endIndex) => {
    setSections((prev) => {
      const result = Array.from(prev)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result
    })
  }

  const moveSectionUp = (index) => {
    if (index <= 0) return
    reorderSections(index, index - 1)
  }

  const moveSectionDown = (index) => {
    if (index >= sections.length - 1) return
    reorderSections(index, index + 1)
  }

  const addSection = (newSec) => {
    setSections((prev) => [...prev, newSec])
  }

  const deleteSection = (id) => {
    setSections((prev) => prev.filter((s) => s.id !== id))
  }

  // Product Actions
  const addProduct = (product) => {
    setProducts((prev) => [product, ...prev])
  }

  const updateProduct = (id, updated) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    )
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  // Order Actions
  const updateOrderStatus = (orderId, newStatus, trackingNum = '') => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: newStatus,
              trackingNumber: trackingNum || o.trackingNumber,
            }
          : o
      )
    )
  }

  // Dispute Actions
  const submitDisputeEvidence = (disputeId, evidenceNotes) => {
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === disputeId
          ? { ...d, status: 'Evidence Submitted', evidenceSubmitted: true, evidenceNotes }
          : d
      )
    )
  }

  // Integration Toggle
  const toggleIntegration = (id) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, installed: !i.installed } : i))
    )
  }

  const updateIntegrationSettings = (id, data) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...data } : i))
    )
  }

  // Reset to factory defaults
  const resetToFactoryDefaults = () => {
    setSections(INITIAL_SECTIONS)
    setProducts(initialProducts)
    setOrders(INITIAL_ORDERS)
    setDisputes(INITIAL_DISPUTES)
    setArticles(INITIAL_ARTICLES)
    setCampaigns(INITIAL_CAMPAIGNS)
    setAutomations(INITIAL_AUTOMATIONS)
    setIntegrations(INITIAL_INTEGRATIONS)
    localStorage.clear()
  }

  return (
    <StoreContext.Provider
      value={{
        sections,
        toggleSectionVisibility,
        updateSectionSettings,
        reorderSections,
        moveSectionUp,
        moveSectionDown,
        addSection,
        deleteSection,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        updateOrderStatus,
        disputes,
        submitDisputeEvidence,
        articles,
        setArticles,
        campaigns,
        setCampaigns,
        automations,
        setAutomations,
        integrations,
        toggleIntegration,
        updateIntegrationSettings,
        customCss,
        setCustomCss,
        webhooks,
        setWebhooks,
        resetToFactoryDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
