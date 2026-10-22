import { useState } from 'react'
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  UploadCloud,
  FileCheck2,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Info,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function RiskChargebackManager() {
  const { disputes, submitDisputeEvidence } = useStore()
  const [selectedDispute, setSelectedDispute] = useState(null)
  const [trackingNumber, setTrackingNumber] = useState('')
  const [carrierNotes, setCarrierNotes] = useState('')
  const [customerCorrespondence, setCustomerCorrespondence] = useState('')
  const [signedSlip, setSignedSlip] = useState(true)
  const [rebuttalLetter, setRebuttalLetter] = useState('')
  const [successToast, setSuccessToast] = useState('')

  const handleOpenEvidenceModal = (disp) => {
    setSelectedDispute(disp)
    setTrackingNumber(disp.orderId === 'ORD-9755' ? 'LALA-MNL-882194' : 'JNT-PH-7712948')
    setCarrierNotes('Package delivered to customer address and signed for in person.')
    setCustomerCorrespondence('Customer confirmed delivery in Instagram DM on 2026-10-18.')
    setSignedSlip(true)
    setRebuttalLetter(
      `Dear Payment Processor & Issuing Bank,\n\nWe are formally disputing the chargeback for Order ${disp.orderId} (Dispute ID: ${disp.id}). The customer purchased custom 3D printed goods manufactured to their exact specification. The parcel was dispatched via trackable express courier to the verified billing address and confirmed received with valid POD.\n\nPlease find attached the carrier tracking manifest, signed proof of delivery, and customer communication log.`
    )
  }

  const handleEvidenceSubmit = (e) => {
    e.preventDefault()
    if (!selectedDispute) return

    submitDisputeEvidence(selectedDispute.id, {
      trackingNumber,
      carrierNotes,
      customerCorrespondence,
      signedSlip,
      rebuttalLetter,
      submittedAt: new Date().toISOString().split('T')[0],
    })

    setSuccessToast(`Dispute evidence package successfully submitted for ${selectedDispute.id}!`)
    setSelectedDispute(null)
    setTimeout(() => setSuccessToast(''), 4000)
  }

  const totalDisputedAmount = disputes
    .filter((d) => d.status === 'Under Review')
    .reduce((sum, d) => sum + d.amount, 0)

  return (
    <div className="space-y-6">
      {/* Toast */}
      {successToast && (
        <div className="rounded-xl bg-emerald-500 text-white px-4 py-3 text-sm font-semibold flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast('')} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#142B1F] tracking-tight">Risk & Chargeback Protection</h1>
          <p className="text-sm text-gray-600">
            Automated fraud prevention, risk heuristics, and 1-click chargeback evidence submission for Philippine processors (PayMongo, Maya, Stripe).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold">
            <ShieldCheck size={14} /> AI Shield Active
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#142B1F] text-white px-3 py-1 text-xs font-bold">
            0.14% Dispute Rate (Safe &lt; 0.9%)
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-xs border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Active Disputes</span>
            <span className="rounded-lg bg-amber-100 p-2 text-amber-700">
              <Clock size={16} />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">
              {disputes.filter((d) => d.status === 'Under Review').length}
            </span>
            <span className="text-xs font-semibold text-amber-600">Action Required</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Awaiting evidence rebuttal upload</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-xs border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Funds in Escrow</span>
            <span className="rounded-lg bg-red-100 p-2 text-red-700">
              <ShieldAlert size={16} />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">₱{totalDisputedAmount.toLocaleString()}</span>
            <span className="text-xs font-semibold text-gray-500">PHP</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Frozen until evidence decision</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-xs border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Win Rate</span>
            <span className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
              <FileCheck2 size={16} />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600">88.5%</span>
            <span className="text-xs font-semibold text-emerald-700">Top 5% in PH</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Backed by automated courier PODs</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-xs border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Fraud Score Threshold</span>
            <span className="rounded-lg bg-blue-100 p-2 text-blue-700">
              <ShieldCheck size={16} />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">85+ Block</span>
            <span className="text-xs font-semibold text-blue-600">Strict</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Auto-cancels high-velocity cards</p>
        </div>
      </div>

      {/* Main Disputes Table */}
      <div className="rounded-2xl bg-white shadow-xs border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">Chargeback Case Records</h2>
            <p className="text-xs text-gray-500">All registered buyer claims across PayMongo and Stripe gateway feeds</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-6 py-3.5">Dispute / Order</th>
                <th className="px-6 py-3.5">Customer & Reason</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Risk Score & Flags</th>
                <th className="px-6 py-3.5">Deadline</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {disputes.map((disp) => {
                const isUnderReview = disp.status === 'Under Review'
                const isWon = disp.status === 'Won'
                const isHighRisk = disp.riskScore.includes('High')

                return (
                  <tr key={disp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-bold text-gray-900">{disp.id}</p>
                      <p className="text-gray-500 text-[11px] font-mono">{disp.orderId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{disp.customer}</p>
                      <p className="text-gray-500 text-[11px]">{disp.reason}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-extrabold text-gray-900">
                        ₱{disp.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-black ${
                            isHighRisk
                              ? 'bg-red-100 text-red-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {disp.riskScore}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        {disp.riskFlags.map((flag, idx) => (
                          <p key={idx} className="text-[10px] text-gray-500 truncate flex items-center gap-1">
                            • {flag}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Clock size={13} className="text-gray-400" />
                        <span>{disp.deadline}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          isWon
                            ? 'bg-emerald-100 text-emerald-800'
                            : isUnderReview
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {isWon ? (
                          <>
                            <CheckCircle2 size={12} /> Claim Won
                          </>
                        ) : isUnderReview ? (
                          disp.evidenceSubmitted ? (
                            <>
                              <FileCheck2 size={12} /> Evidence Submitted
                            </>
                          ) : (
                            <>
                              <AlertTriangle size={12} /> Rebuttal Required
                            </>
                          )
                        ) : (
                          <>
                            <XCircle size={12} /> Lost
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {isUnderReview ? (
                        <button
                          onClick={() => handleOpenEvidenceModal(disp)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#D96B43] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#c25933] transition-all cursor-pointer"
                        >
                          {disp.evidenceSubmitted ? 'Update Evidence' : 'Submit Evidence'}
                          <ArrowRight size={13} />
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Case Closed</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evidence Submission Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-lg font-black text-[#142B1F]">
                  Submit Chargeback Rebuttal: {selectedDispute.id}
                </h3>
                <p className="text-xs text-gray-500">
                  Target: {selectedDispute.customer} (₱{selectedDispute.amount.toLocaleString()}) • Order {selectedDispute.orderId}
                </p>
              </div>
              <button
                onClick={() => setSelectedDispute(null)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEvidenceSubmit} className="p-6 space-y-5">
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 flex gap-3">
                <Info size={18} className="shrink-0 text-amber-700 mt-0.5" />
                <div>
                  <p className="font-bold">Claim Reason: {selectedDispute.reason}</p>
                  <p className="mt-0.5 text-amber-800">
                    Bank Response Deadline: <strong>{selectedDispute.deadline}</strong>. Ensure complete tracking records and signed proof of delivery are included.
                  </p>
                </div>
              </div>

              {/* Courier Tracking */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Courier Tracking & Waybill Number
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs font-medium focus:border-[#D96B43] focus:outline-hidden"
                  placeholder="e.g. LALA-MNL-882194 or JNT-PH-7712948"
                  required
                />
              </div>

              {/* Carrier Notes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Carrier Delivery Confirmation Notes
                </label>
                <input
                  type="text"
                  value={carrierNotes}
                  onChange={(e) => setCarrierNotes(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs font-medium focus:border-[#D96B43] focus:outline-hidden"
                  placeholder="Confirmed delivered to recipient with signature on..."
                />
              </div>

              {/* Customer Communications */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Customer Communication & Acknowledgement
                </label>
                <input
                  type="text"
                  value={customerCorrespondence}
                  onChange={(e) => setCustomerCorrespondence(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs font-medium focus:border-[#D96B43] focus:outline-hidden"
                  placeholder="Email or chat confirmation logs..."
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 rounded-2xl bg-gray-50 p-4 border border-gray-200">
                <label className="flex items-center gap-2.5 text-xs text-gray-700 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={signedSlip}
                    onChange={(e) => setSignedSlip(e.target.checked)}
                    className="h-4 w-4 rounded text-[#D96B43] focus:ring-[#D96B43]"
                  />
                  <span>Signed Courier Proof of Delivery (POD) image attached to file manifest</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-gray-700 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded text-[#D96B43] focus:ring-[#D96B43]"
                  />
                  <span>Itemized manufacturing invoice and customized spec sheet attached</span>
                </label>
              </div>

              {/* Formal Rebuttal Letter */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Formal Bank Rebuttal Narrative
                </label>
                <textarea
                  rows={5}
                  value={rebuttalLetter}
                  onChange={(e) => setRebuttalLetter(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3 text-xs font-mono text-gray-800 focus:border-[#D96B43] focus:outline-hidden leading-relaxed"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setSelectedDispute(null)}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#142B1F] px-5 py-2 text-xs font-bold text-white hover:bg-[#1a3828] cursor-pointer shadow-md"
                >
                  <UploadCloud size={14} /> Submit Evidence to Card Network
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
