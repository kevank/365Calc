import { useState } from 'react'
import { QUESTIONS } from '../data/questionnaire'

export default function Questionnaire({
  isOpen,
  onClose,
  selectedLicense,
  featureLookup,
  onApplyAnswer,
}) {
  const [step, setStep] = useState(0)
  const [appliedTotal, setAppliedTotal] = useState(0)
  const [lastOpen, setLastOpen] = useState(isOpen)

  if (isOpen !== lastOpen) {
    setLastOpen(isOpen)
    if (isOpen) {
      setStep(0)
      setAppliedTotal(0)
    }
  }

  if (!isOpen) return null

  const finished = step >= QUESTIONS.length
  const current = finished ? null : QUESTIONS[step]

  const featuresInLicense = current
    ? current.featureIds.filter(id => {
        const feature = featureLookup[id]
        return feature && feature.includedIn.includes(selectedLicense.id)
      })
    : []

  const handleYes = () => {
    const count = onApplyAnswer(featuresInLicense, 'third-party')
    setAppliedTotal(t => t + count)
    setStep(step + 1)
  }

  const handleNoOrSkip = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="qs-title"
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 pt-5">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {finished ? 'Finished' : `Question ${step + 1} of ${QUESTIONS.length}`}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 pt-3">
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1d2d5c] transition-all"
              style={{
                width: `${((finished ? QUESTIONS.length : step) / QUESTIONS.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {!finished && (
          <div className="px-6 pt-5 pb-6">
            <h2 id="qs-title" className="text-lg font-semibold text-gray-900 mb-2">
              {current.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              <span className="text-gray-400">e.g.,</span> {current.examples}
            </p>

            {featuresInLicense.length > 0 ? (
              <p className="text-xs text-gray-500 mb-5">
                Pre-fills {featuresInLicense.length} feature{featuresInLicense.length === 1 ? '' : 's'} in <span className="font-medium text-gray-700">{selectedLicense.shortName}</span> as Third-party.
              </p>
            ) : (
              <p className="text-xs text-amber-600 mb-5">
                The current license ({selectedLicense.shortName}) doesn't include features for this question. Answering won't change the catalog.
              </p>
            )}

            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={handleYes}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                Yes
              </button>
              <button
                onClick={handleNoOrSkip}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                No
              </button>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="text-xs text-gray-500 hover:text-gray-800 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Back
              </button>
              <button
                onClick={handleNoOrSkip}
                className="text-xs text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                Skip
              </button>
            </div>
          </div>
        )}

        {finished && (
          <div className="px-6 pt-5 pb-6">
            <h2 id="qs-title" className="text-lg font-semibold text-gray-900 mb-2">
              All set
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              {appliedTotal > 0 ? (
                <>
                  Pre-filled <span className="font-semibold text-emerald-600">{appliedTotal}</span> feature{appliedTotal === 1 ? '' : 's'} as Third-party. Review the cost values to match what you're actually paying, then check the rest of the catalog manually.
                </>
              ) : (
                <>
                  No features were pre-filled. Configure each category manually to see your savings.
                </>
              )}
            </p>
            <button
              onClick={onClose}
              className="w-full bg-[#1d2d5c] hover:bg-[#121d40] text-white font-semibold py-2.5 rounded-lg cursor-pointer transition-colors"
            >
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
