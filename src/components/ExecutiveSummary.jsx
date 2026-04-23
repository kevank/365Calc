import aitLogo from '../assets/ait-logo.png'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value)

export default function ExecutiveSummary({ calculations, featureStates, featureCategories, userCount, monthlyCost, selectedLicense, onBack }) {
  const licenseName = selectedLicense?.name || 'Microsoft 365'
  const licenseShort = selectedLicense?.shortName || 'Microsoft 365'
  const { annualSpend, annualSavings, unrealizedValue, realizedValue, valueRealization, totalEmbeddedValue } = calculations

  const thirdPartyFeatures = []
  const activatedFeatures = []
  const notActivatedFeatures = []

  featureCategories.forEach(cat => {
    cat.features.forEach(feature => {
      const state = featureStates[feature.id]
      const entry = { ...feature, categoryName: cat.name, annualValue: state.cost * userCount * 12 }
      if (state.status === 'third-party') thirdPartyFeatures.push(entry)
      else if (state.status === 'activated') activatedFeatures.push(entry)
      else if (state.status === 'not-activated') notActivatedFeatures.push(entry)
    })
  })

  return (
    <div className="min-h-screen bg-[#f4f5f8]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={aitLogo} alt="All In Technology" className="h-8 w-auto" />
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="hidden sm:inline font-semibold text-[#1d2d5c] text-lg">Executive Summary</span>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-[#1d2d5c] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Calculator
          </button>
        </div>
      </header>

      <div className="bg-[#1d2d5c] border-b-4 border-[#f59e0b]">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {licenseName} Value Assessment
          </h1>
          <p className="text-slate-300">
            Summary for {userCount} users at ${monthlyCost}/user/month
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 pb-8 pt-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Annual License Spend" value={formatCurrency(annualSpend)} color="text-gray-900" bg="bg-white" />
          <MetricCard label="Total Embedded Value" value={formatCurrency(totalEmbeddedValue)} color="text-[#1d2d5c]" bg="bg-blue-50" />
          <MetricCard label="Annual Savings" value={formatCurrency(annualSavings)} color="text-emerald-600" bg="bg-emerald-50" />
          <MetricCard label="Value Realization" value={`${valueRealization}%`} color="text-gray-900" bg="bg-white" />
        </div>

        {/* Value Realization Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
          <h2 className="font-semibold text-[#1d2d5c] mb-4">Value Realization Breakdown</h2>
          <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden flex">
            {realizedValue > 0 && (
              <div
                className="bg-emerald-500 h-full transition-all duration-500 flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${(realizedValue / totalEmbeddedValue) * 100}%` }}
              >
                {Math.round((realizedValue / totalEmbeddedValue) * 100)}%
              </div>
            )}
            {unrealizedValue > 0 && (
              <div
                className="bg-amber-400 h-full transition-all duration-500 flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${(unrealizedValue / totalEmbeddedValue) * 100}%` }}
              >
                {Math.round((unrealizedValue / totalEmbeddedValue) * 100)}%
              </div>
            )}
          </div>
          <div className="flex gap-6 mt-3 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              Realized ({formatCurrency(realizedValue)})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              Unrealized ({formatCurrency(unrealizedValue)})
            </span>
          </div>
        </div>

        {/* Feature Breakdowns */}
        {thirdPartyFeatures.length > 0 && (
          <FeatureSection
            title="Third-Party Tool Consolidation Opportunities"
            subtitle={`These features are being paid for separately but are included in ${licenseShort}`}
            features={thirdPartyFeatures}
            badgeColor="bg-emerald-100 text-emerald-700"
            badgeLabel="Savings"
          />
        )}

        {activatedFeatures.length > 0 && (
          <FeatureSection
            title={`Activated ${licenseShort} Features`}
            subtitle={`These features are being utilized from your ${licenseShort} license`}
            features={activatedFeatures}
            badgeColor="bg-blue-100 text-blue-700"
            badgeLabel="Active"
          />
        )}

        {notActivatedFeatures.length > 0 && (
          <FeatureSection
            title="Unrealized Value - Features Not Yet Activated"
            subtitle={`These ${licenseShort} features are available but not yet deployed`}
            features={notActivatedFeatures}
            badgeColor="bg-amber-100 text-amber-700"
            badgeLabel="Opportunity"
          />
        )}

        {/* Recommendations */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8 shadow-sm">
          <h2 className="font-semibold text-[#1d2d5c] mb-3">Recommendations</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {thirdPartyFeatures.length > 0 && (
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  <strong>Consolidate {thirdPartyFeatures.length} third-party tool(s)</strong> to save {formatCurrency(annualSavings)} annually by migrating to the equivalent {licenseShort} features.
                </span>
              </li>
            )}
            {notActivatedFeatures.length > 0 && (
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>
                  <strong>Activate {notActivatedFeatures.length} unused feature(s)</strong> representing {formatCurrency(unrealizedValue)} in unrealized annual value.
                </span>
              </li>
            )}
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-[#1d2d5c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>
                Your {licenseShort} license contains <strong>{formatCurrency(totalEmbeddedValue)}</strong> in total embedded annual value across all feature categories.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="bg-[#1d2d5c] hover:bg-[#121d40] text-white font-semibold py-3 px-8 rounded-lg transition-colors cursor-pointer"
          >
            Back to Calculator
          </button>
        </div>
      </main>
    </div>
  )
}

function MetricCard({ label, value, color, bg }) {
  return (
    <div className={`${bg} rounded-xl border border-gray-200 p-5 text-center shadow-sm`}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
    </div>
  )
}

function FeatureSection({ title, subtitle, features, badgeColor, badgeLabel }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 shadow-sm">
      <h2 className="font-semibold text-[#1d2d5c] mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
      <div className="divide-y divide-gray-100">
        {features.map(feature => (
          <div key={feature.id} className="py-3 flex items-center justify-between">
            <div>
              <span className="font-medium text-sm text-gray-800">{feature.name}</span>
              <span className="text-xs text-gray-400 ml-2">{feature.categoryName}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-0.5 rounded-full ${badgeColor}`}>{badgeLabel}</span>
              <span className="font-semibold text-sm text-gray-900">{formatCurrency(feature.annualValue)}/yr</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
