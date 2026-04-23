const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value)

export default function SummaryBar({ calculations }) {
  const { annualSavings, unrealizedValue, realizedValue, valueRealization } = calculations

  return (
    <div className="mt-4 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
        <SummaryItem
          label="Annual Savings"
          value={formatCurrency(annualSavings)}
          valueColor="text-emerald-600"
          tooltip="Savings from replacing third-party tools with Business Premium features"
        />
        <SummaryItem
          label="Unrealized Value"
          value={formatCurrency(unrealizedValue)}
          valueColor="text-amber-500"
          tooltip="Value of Business Premium features not yet activated"
        />
        <SummaryItem
          label="Realized Value"
          value={formatCurrency(realizedValue)}
          valueColor="text-emerald-600"
          tooltip="Value of Business Premium features being actively used"
        />
        <SummaryItem
          label="Value Realization"
          value={`${valueRealization}%`}
          valueColor="text-gray-900"
          tooltip="Percentage of total embedded value being utilized"
        />
      </div>
    </div>
  )
}

function SummaryItem({ label, value, valueColor, tooltip }) {
  return (
    <div className="px-6 py-4 text-center group relative">
      <div className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1">
        {label}
        <span className="relative">
          <svg className="w-3.5 h-3.5 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            {tooltip}
          </span>
        </span>
      </div>
      <div className={`text-xl font-bold ${valueColor}`}>{value}</div>
    </div>
  )
}
