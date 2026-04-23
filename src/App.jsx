import { useState, useMemo, useCallback } from 'react'
import { featureCategories, licenses, DEFAULT_LICENSE_ID } from './data/features'
import Header from './components/Header'
import OrganizationProfile from './components/OrganizationProfile'
import SummaryBar from './components/SummaryBar'
import FeatureCategory from './components/FeatureCategory'
import ExecutiveSummary from './components/ExecutiveSummary'

const buildInitialFeatureStates = () => {
  const initial = {}
  featureCategories.forEach(cat => {
    cat.features.forEach(feature => {
      initial[feature.id] = { status: 'none', cost: feature.defaultCost }
    })
  })
  return initial
}

const getLicense = (id) => licenses.find(l => l.id === id) || licenses.find(l => l.id === DEFAULT_LICENSE_ID)

function App() {
  const [selectedLicenseId, setSelectedLicenseId] = useState(DEFAULT_LICENSE_ID)
  const [userCount, setUserCount] = useState(50)
  const [monthlyCost, setMonthlyCost] = useState(getLicense(DEFAULT_LICENSE_ID).monthlyCost)
  const [showSummary, setShowSummary] = useState(false)
  const [featureStates, setFeatureStates] = useState(buildInitialFeatureStates)

  const selectedLicense = getLicense(selectedLicenseId)

  const handleLicenseChange = useCallback((licenseId) => {
    const license = getLicense(licenseId)
    setSelectedLicenseId(license.id)
    setMonthlyCost(license.monthlyCost)
  }, [])

  const handleFeatureChange = useCallback((featureId, field, value) => {
    setFeatureStates(prev => ({
      ...prev,
      [featureId]: { ...prev[featureId], [field]: value }
    }))
  }, [])

  const filteredCategories = useMemo(() => {
    return featureCategories
      .map(cat => ({
        ...cat,
        features: cat.features.filter(f => f.includedIn.includes(selectedLicenseId)),
      }))
      .filter(cat => cat.features.length > 0)
  }, [selectedLicenseId])

  const calculations = useMemo(() => {
    const annualSpend = userCount * monthlyCost * 12

    let annualSavings = 0
    let totalEmbeddedValue = 0
    let realizedValue = 0

    filteredCategories.forEach(cat => {
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
  }, [userCount, monthlyCost, featureStates, filteredCategories])

  const handleReset = useCallback(() => {
    setSelectedLicenseId(DEFAULT_LICENSE_ID)
    setUserCount(50)
    setMonthlyCost(getLicense(DEFAULT_LICENSE_ID).monthlyCost)
    setFeatureStates(buildInitialFeatureStates())
    setShowSummary(false)
  }, [])

  if (showSummary) {
    return (
      <ExecutiveSummary
        calculations={calculations}
        featureStates={featureStates}
        featureCategories={filteredCategories}
        userCount={userCount}
        monthlyCost={monthlyCost}
        selectedLicense={selectedLicense}
        onBack={() => setShowSummary(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f5f8]">
      <Header onReset={handleReset} />

      <div className="bg-[#1d2d5c] border-b-4 border-[#f59e0b]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-1">
            Microsoft 365 Value Calculator
          </h1>
          <p className="text-slate-300">
            Select a license and configure your current tool usage to calculate potential savings
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 pb-12 pt-8">
        <div className="lg:grid lg:grid-cols-[360px_1fr] lg:gap-8 lg:items-start">
          <aside className="lg:sticky lg:top-20 lg:self-start space-y-4 mb-6 lg:mb-0">
            <OrganizationProfile
              licenses={licenses}
              selectedLicenseId={selectedLicenseId}
              onLicenseChange={handleLicenseChange}
              userCount={userCount}
              setUserCount={setUserCount}
              monthlyCost={monthlyCost}
              setMonthlyCost={setMonthlyCost}
              annualSpend={calculations.annualSpend}
            />

            <SummaryBar calculations={calculations} />

            <button
              onClick={() => setShowSummary(true)}
              className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              View Executive Summary
            </button>
          </aside>

          <section>
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-[#1d2d5c]">
                {selectedLicense.shortName} Feature Categories
              </h2>
              <p className="text-gray-500 mt-1 text-sm">
                For each feature, indicate whether you're currently using a third-party tool, have activated the {selectedLicense.shortName} capability, or haven't activated it yet.
              </p>
            </div>

            {filteredCategories.map(category => (
              <FeatureCategory
                key={category.id}
                category={category}
                featureStates={featureStates}
                onFeatureChange={handleFeatureChange}
                userCount={userCount}
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
