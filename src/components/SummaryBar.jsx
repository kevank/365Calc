const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)

export default function SummaryBar({ calculations }) {
  const { annualSavings, unrealizedValue, realizedValue, valueRealization, totalEmbeddedValue } = calculations
  const realizedPct = totalEmbeddedValue > 0 ? (realizedValue / totalEmbeddedValue) * 100 : 0
  const unrealizedPct = totalEmbeddedValue > 0 ? (unrealizedValue / totalEmbeddedValue) * 100 : 0

  return (
    <div className="bg-[#1d2d5c] rounded-xl shadow-sm overflow-hidden text-white">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide">Value Realization</h2>
        <span className="text-2xl font-bold text-[#f59e0b]">{valueRealization}%</span>
      </div>

      <div className="px-5 pt-4">
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden flex">
          {realizedValue > 0 && (
            <div className="bg-emerald-400 h-full" style={{ width: `${realizedPct}%` }} />
          )}
          {unrealizedValue > 0 && (
            <div className="bg-[#f59e0b] h-full" style={{ width: `${unrealizedPct}%` }} />
          )}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <Metric
          label="Annual Savings"
          value={formatCurrency(annualSavings)}
          valueColor="text-emerald-400"
          tooltip="Savings from replacing third-party tools with included license features"
        />
        <Metric
          label="Realized Value"
          value={formatCurrency(realizedValue)}
          valueColor="text-emerald-400"
          tooltip="Value of included features being actively used"
        />
        <Metric
          label="Unrealized Value"
          value={formatCurrency(unrealizedValue)}
          valueColor="text-[#f59e0b]"
          tooltip="Value of included features not yet activated"
        />
      </div>
    </div>
  )
}

function Metric({ label, value, valueColor, tooltip }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-300" title={tooltip}>{label}</span>
      <span className={`text-base font-bold ${valueColor}`}>{value}</span>
    </div>
  )
}
