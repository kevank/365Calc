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
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <svg className="w-5 h-5 text-[#1d2d5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900">Organization Profile</h2>
      </div>

      <div className="mb-5">
        <label className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          License Type
        </label>
        <select
          value={selectedLicenseId}
          onChange={(e) => onLicenseChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1d2d5c]/30 focus:border-[#1d2d5c]"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div>
          <label className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Number of Licensed Users
          </label>
          <input
            type="number"
            value={userCount}
            onChange={(e) => setUserCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1d2d5c]/30 focus:border-[#1d2d5c]"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Monthly Cost (per user)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              {...monthlyCostInput}
              className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1d2d5c]/30 focus:border-[#1d2d5c]"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Annual License Spend</label>
          <div className="text-2xl font-bold text-[#1d2d5c]">
            {formatCurrency(annualSpend)}
          </div>
        </div>
      </div>
    </div>
  )
}
