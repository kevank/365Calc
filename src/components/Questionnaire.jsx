import { useState } from 'react'
import { QUESTIONS } from '../data/questionnaire'
import aitLogo from '../assets/ait-logo.png'

export default function Questionnaire({
  onClose,
  selectedLicense,
  featureLookup,
  onApplyAnswer,
}) {
  const [view, setView] = useState('intro')
  const [step, setStep] = useState(0)
  const [appliedTotal, setAppliedTotal] = useState(0)

  const current = view === 'question' ? QUESTIONS[step] : null

  const featuresInLicense = current
    ? current.featureIds.filter(id => {
        const feature = featureLookup[id]
        return feature && feature.includedIn.includes(selectedLicense.id)
      })
    : []

  const advance = () => {
    if (step + 1 >= QUESTIONS.length) {
      setView('finish')
    } else {
      setStep(step + 1)
    }
  }

  const handleYes = () => {
    const count = onApplyAnswer(featuresInLicense, 'third-party')
    setAppliedTotal(t => t + count)
    advance()
  }

  const handleNoOrSkip = () => {
    advance()
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const headerLabel =
    view === 'intro' ? 'Welcome' :
    view === 'finish' ? 'Finished' :
    `Question ${step + 1} of ${QUESTIONS.length}`

  const progressPct =
    view === 'intro' ? 0 :
    view === 'finish' ? 100 :
    (step / QUESTIONS.length) * 100

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
            {headerLabel}
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

        {view === 'question' && (
          <div className="px-6 pt-3">
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1d2d5c] transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {view === 'intro' && (
          <div className="px-6 pt-4 pb-6">
            <div className="flex justify-center mb-4">
              <img src={aitLogo} alt="All In Technology" className="h-10 w-auto" />
            </div>
            <h2 id="qs-title" className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Welcome!
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Answer 4 quick questions and we'll pre-fill the most common third-party tools for you. Or skip and configure everything manually.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setView('question')}
                className="bg-[#1d2d5c] hover:bg-[#121d40] text-white font-semibold py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                Go
              </button>
              <button
                onClick={onClose}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                Skip
              </button>
            </div>
          </div>
        )}

        {view === 'question' && (
          <div className="px-6 pt-5 pb-6">
            <h2 id="qs-title" className="text-lg font-semibold text-gray-900 mb-2">
              {current.title}
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              <span className="text-gray-400">e.g.,</span> {current.examples}
            </p>

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

        {view === 'finish' && (
          <div className="px-6 pt-5 pb-6">
            <h2 id="qs-title" className="text-lg font-semibold text-gray-900 mb-2">
              All set
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              {appliedTotal > 0
                ? `We pre-filled ${appliedTotal} feature${appliedTotal === 1 ? '' : 's'} for you. Review the cost values and the rest of the catalog to complete your estimate.`
                : 'Nothing was pre-filled. Configure each category manually to see your savings.'}
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
