import { useDecimalInput } from '../hooks/useDecimalInput'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)

const TIER_LABELS = {
  business: 'Microsoft 365 Business',
  enterprise: 'Microsoft 365 / Office 365 Enterprise',
}

export default function OrganizationProfile({
  licenses,
  selectedLicenseId,
  onLicenseChange,
  userCount,
  setUserCount,
  monthlyCost,
  setMonthlyCost,
  annualSpend,
}) {
  const tiers = licenses.reduce((acc, license) => {
    acc[license.tier] = acc[license.tier] || []
    acc[license.tier].push(license)
    return acc
  }, {})
  const tierOrder = ['business', 'enterprise']

  const monthlyCostInput = useDecimalInput(monthlyCost, setMonthlyCost)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <svg className="w-5 h-5 text-[#1d2d5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Organization Profile</h2>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5 block">
            License Type
          </label>
          <select
            value={selectedLicenseId}
            onChange={(e) => onLicenseChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d2d5c]/30 focus:border-[#1d2d5c]"
          >
            {tierOrder.map(tier => tiers[tier] && (
              <optgroup key={tier} label={TIER_LABELS[tier]}>
                {tiers[tier].map(license => (
                  <option key={license.id} value={license.id}>
                    {license.name} (${license.monthlyCost.toFixed(2)}/user/month)
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5 block">
              Users
            </label>
            <input
              type="number"
              value={userCount}
              onChange={(e) => setUserCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d2d5c]/30 focus:border-[#1d2d5c]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5 block">
              $/user/mo
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                {...monthlyCostInput}
                className="w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d2d5c]/30 focus:border-[#1d2d5c]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-baseline justify-between pt-3 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Annual Spend</span>
          <span className="text-xl font-bold text-[#1d2d5c]">{formatCurrency(annualSpend)}</span>
        </div>
      </div>
    </div>
  )
}
