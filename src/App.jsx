import { useState, useMemo, useCallback } from 'react'
import { featureCategories, BUSINESS_PREMIUM_MONTHLY_COST } from './data/features'
import Header from './components/Header'
import OrganizationProfile from './components/OrganizationProfile'
import SummaryBar from './components/SummaryBar'
import FeatureCategory from './components/FeatureCategory'
import ExecutiveSummary from './components/ExecutiveSummary'
import './index.css'

function App() {
  const [userCount, setUserCount] = useState(50)
  const [monthlyCost, setMonthlyCost] = useState(BUSINESS_PREMIUM_MONTHLY_COST)
  const [showSummary, setShowSummary] = useState(false)

  // Feature states: { featureId: { status: 'none'|'third-party'|'activated'|'not-activated', cost: number } }
  const [featureStates, setFeatureStates] = useState(() => {
    const initial = {}
    featureCategories.forEach(cat => {
      cat.features.forEach(feature => {
        initial[feature.id] = { status: 'none', cost: feature.defaultCost }
      })
    })
    return initial
  })

  const handleFeatureChange = useCallback((featureId, field, value) => {
    setFeatureStates(prev => ({
      ...prev,
      [featureId]: { ...prev[featureId], [field]: value }
    }))
  }, [])

  const calculations = useMemo(() => {
    const annualSpend = userCount * monthlyCost * 12

    let annualSavings = 0
    let totalEmbeddedValue = 0
    let realizedValue = 0

    featureCategories.forEach(cat => {
      cat.features.forEach(feature => {
        const state = featureStates[feature.id]
        const featureAnnualValue = state.cost * userCount * 12

        totalEmbeddedValue += featureAnnualValue

        if (state.status === 'third-party') {
          annualSavings += featureAnnualValue
          realizedValue += featureAnnualValue
        } else if (state.status === 'activated') {
          realizedValue += featureAnnualValue
        }
        // 'not-activated' and 'none' contribute to unrealized
      })
    })

    const unrealizedValue = totalEmbeddedValue - realizedValue
    const valueRealization = totalEmbeddedValue > 0
      ? Math.round((realizedValue / totalEmbeddedValue) * 100)
      : 0

    return {
      annualSpend,
      annualSavings,
      unrealizedValue,
      realizedValue,
      valueRealization,
      totalEmbeddedValue,
    }
  }, [userCount, monthlyCost, featureStates])

  const handleReset = useCallback(() => {
    setUserCount(50)
    setMonthlyCost(BUSINESS_PREMIUM_MONTHLY_COST)
    setFeatureStates(() => {
      const initial = {}
      featureCategories.forEach(cat => {
        cat.features.forEach(feature => {
          initial[feature.id] = { status: 'none', cost: feature.defaultCost }
        })
      })
      return initial
    })
    setShowSummary(false)
  }, [])

  if (showSummary) {
    return (
      <ExecutiveSummary
        calculations={calculations}
        featureStates={featureStates}
        featureCategories={featureCategories}
        userCount={userCount}
        monthlyCost={monthlyCost}
        onBack={() => setShowSummary(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <Header onReset={handleReset} />

      <main className="max-w-5xl mx-auto px-4 pb-12">
        <div className="pt-8 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Business Premium Value Calculator
          </h1>
          <p className="text-gray-500">
            Configure your current tool usage to calculate potential savings
          </p>
        </div>

        <OrganizationProfile
          userCount={userCount}
          setUserCount={setUserCount}
          monthlyCost={monthlyCost}
          setMonthlyCost={setMonthlyCost}
          annualSpend={calculations.annualSpend}
        />

        <SummaryBar calculations={calculations} />

        <div className="mt-8 mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Business Premium Feature Categories
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            For each feature, indicate whether you're currently using a third-party tool, have activated the Business Premium capability, or haven't activated it yet.
          </p>
        </div>

        {featureCategories.map(category => (
          <FeatureCategory
            key={category.id}
            category={category}
            featureStates={featureStates}
            onFeatureChange={handleFeatureChange}
          />
        ))}

        <div className="mt-8 text-center">
          <button
            onClick={() => setShowSummary(true)}
            className="bg-[#1a56db] hover:bg-[#1240a8] text-white font-semibold py-3 px-8 rounded-lg transition-colors cursor-pointer"
          >
            View Executive Summary
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
