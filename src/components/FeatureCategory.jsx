import { useCallback } from 'react'
import { useDecimalInput } from '../hooks/useDecimalInput'
import { getCategoryColors } from '../data/categoryColors'

const iconMap = {
  shield: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  fingerprint: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
    </svg>
  ),
  devices: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  lock: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  chat: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  apps: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  email: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  folder: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  compliance: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  chart: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  phone: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
}

export default function FeatureCategory({ category, featureStates, onFeatureChange, userCount }) {
  const colors = getCategoryColors(category.id)

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex">
      <div className={`w-1 flex-shrink-0 ${colors.bar}`} />
      <div className="flex-1 min-w-0">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.iconBg}`}>
            {iconMap[category.icon]}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900">{category.name}</h3>
            <p className="text-sm text-gray-500 truncate">{category.description}</p>
          </div>
        </div>

        <div>
          {category.features.map((feature, idx) => (
            <FeatureRow
              key={feature.id}
              feature={feature}
              state={featureStates[feature.id]}
              onChange={onFeatureChange}
              userCount={userCount}
              isLast={idx === category.features.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)

const STATUS_OPTIONS = [
  { value: 'third-party', label: 'Third-party', activeClass: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'activated', label: 'Activated', activeClass: 'bg-[#1d2d5c] text-white border-[#1d2d5c]' },
  { value: 'not-activated', label: 'Not active', activeClass: 'bg-[#f59e0b] text-white border-[#f59e0b]' },
]

function FeatureRow({ feature, state, onChange, userCount, isLast }) {
  const setCost = useCallback(
    (next) => onChange(feature.id, 'cost', next),
    [onChange, feature.id]
  )
  const costInput = useDecimalInput(state.cost, setCost)
  const isThirdParty = state.status === 'third-party'

  return (
    <div className={`px-6 py-3 ${!isLast ? 'border-b border-gray-50' : ''} hover:bg-gray-50/50 transition-colors`}>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="min-w-0 flex-1 min-w-[180px]">
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-gray-800 text-sm">{feature.name}</span>
            <div className="group relative">
              <svg className="w-3.5 h-3.5 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-64">
                <p className="mb-1">{feature.description}</p>
                <p className="text-gray-300">vs. {feature.competitors}</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-0.5 truncate">vs. {feature.competitors}</p>
        </div>

        <div
          role="radiogroup"
          aria-label={`Status for ${feature.name}`}
          className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5"
        >
          {STATUS_OPTIONS.map(opt => {
            const active = state.status === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange(feature.id, 'status', active ? 'none' : opt.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                  active
                    ? `${opt.activeClass} shadow-sm`
                    : 'bg-transparent border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400 mb-1 whitespace-nowrap">Tool Cost Per</span>
          <div className="flex items-center gap-3">
            <div className="relative w-24">
              <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 text-sm ${
                isThirdParty ? 'text-gray-400' : 'text-gray-300'
              }`}>$</span>
              <input
                {...costInput}
                disabled={!isThirdParty}
                aria-label={`Tool cost per user per month for ${feature.name}`}
                className={`w-full pl-6 pr-2 py-1.5 border rounded-lg text-sm text-right focus:outline-none focus:ring-1 focus:ring-[#1d2d5c]/30 focus:border-[#1d2d5c] ${
                  isThirdParty
                    ? 'bg-white border-gray-200 text-gray-900'
                    : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              />
            </div>
            {isThirdParty && (
              <span className="text-xs font-semibold text-red-600 whitespace-nowrap">
                Save {formatCurrency(state.cost * userCount * 12)}/yr
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
