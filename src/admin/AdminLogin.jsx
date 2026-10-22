import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Store, ShieldCheck, ArrowRight, Lock, Mail, Sparkles, CheckCircle2 } from 'lucide-react'

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@babimnl.ph')
  const [password, setPassword] = useState('admin123')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e?.preventDefault()
    setIsLoading(true)
    setError('')

    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('babi_admin_authenticated', 'true')
        if (onLoginSuccess) onLoginSuccess()
        navigate('/admin')
      } else {
        setError('Please enter valid administrator credentials.')
        setIsLoading(false)
      }
    }, 400)
  }

  const handleInstantDemo = () => {
    setEmail('admin@babimnl.ph')
    setPassword('admin123')
    localStorage.setItem('babi_admin_authenticated', 'true')
    if (onLoginSuccess) onLoginSuccess()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-[#FBF8F2] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Icon */}
        <div className="flex justify-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#142B1F] text-white shadow-xl ring-4 ring-[#D96B43]/20">
            <Store size={28} />
          </div>
        </div>

        <h2 className="mt-4 text-center text-2xl font-black text-[#142B1F] tracking-tight">
          babi MNL Merchant Studio
        </h2>
        <p className="mt-1 text-center text-xs text-gray-600">
          Visual Page Builder, CMS, Inventory & Order Management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="rounded-3xl bg-white p-8 shadow-xl border border-gray-200/80 space-y-6">
          {/* Quick Access Demo Banner */}
          <div className="rounded-2xl bg-[#142B1F]/5 border border-[#142B1F]/15 p-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#142B1F] mb-1">
              <Sparkles size={14} className="text-[#D96B43]" />
              <span>Instant Demo Access</span>
            </div>
            <p className="text-gray-600 mb-3">
              One-click access with pre-configured staff administrator credentials:
            </p>
            <div className="bg-white rounded-xl p-2.5 border border-gray-200 font-mono text-[11px] text-gray-700 flex justify-between items-center mb-3">
              <span>admin@babimnl.ph</span>
              <span className="text-gray-400">••••••••</span>
            </div>
            <button
              onClick={handleInstantDemo}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#D96B43] py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#c25933] transition-all cursor-pointer"
            >
              <CheckCircle2 size={14} /> 1-Click Instant Login
            </button>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-2.5 text-xs font-medium focus:border-[#D96B43] focus:outline-hidden"
                  placeholder="admin@babimnl.ph"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-2.5 text-xs font-medium focus:border-[#D96B43] focus:outline-hidden"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded text-[#142B1F] focus:ring-[#142B1F]"
                />
                <span>Remember this terminal</span>
              </label>
              <span className="text-[#D96B43] font-semibold cursor-pointer">Help</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#142B1F] py-2.5 text-xs font-bold text-white shadow-lg hover:bg-[#1a3828] transition-all cursor-pointer"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Security details */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-600" /> TLS 1.3 256-Bit SSL
            </span>
            <Link to="/" className="text-[#D96B43] hover:underline font-semibold">
              ← Back to Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
