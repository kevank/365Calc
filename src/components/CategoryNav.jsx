import { getCategoryColors } from '../data/categoryColors'

export default function CategoryNav({ categories, featureStates, activeId, onSelect }) {
  const stats = (features) => {
    let configured = 0
    features.forEach(f => {
      if (featureStates[f.id]?.status && featureStates[f.id].status !== 'none') configured++
    })
    return { configured, total: features.length }
  }

  return (
    <>
      {/* Desktop: vertical nav */}
      <nav className="hidden lg:block">
        <ul className="space-y-1">
          {categories.map(cat => {
            const active = cat.id === activeId
            const colors = getCategoryColors(cat.id)
            const { configured, total } = stats(cat.features)
            return (
              <li key={cat.id}>
                <button
                  onClick={() => onSelect(cat.id)}
                  className={`group w-full text-left flex items-stretch rounded-lg overflow-hidden border transition-colors cursor-pointer ${
                    active
                      ? `${colors.tint} border-gray-200`
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-1 flex-shrink-0 ${active ? colors.bar : 'bg-transparent'}`} />
                  <span className="flex-1 flex items-center justify-between px-3 py-2.5 gap-2">
                    <span className={`text-sm font-medium ${active ? 'text-gray-900' : 'text-gray-600'}`}>
                      {cat.name}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium tabular-nums ${
                      active
                        ? `${colors.tint} ${colors.tintText}`
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {configured}/{total}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile: horizontal scroll pills */}
      <nav className="lg:hidden -mx-4 px-4 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {categories.map(cat => {
            const active = cat.id === activeId
            const colors = getCategoryColors(cat.id)
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                  active
                    ? `${colors.tint} ${colors.tintText} border-transparent`
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat.name}
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
