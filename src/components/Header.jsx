import aitLogo from '../assets/ait-logo.png'

export default function Header({ onReset }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={aitLogo} alt="All In Technology" className="h-8 w-auto" />
          <span className="hidden sm:inline text-gray-300">|</span>
          <span className="hidden sm:inline font-semibold text-[#1d2d5c] text-lg">M365 Value Calculator</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-gray-500 hover:text-[#1d2d5c] transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Start Over
        </button>
      </div>
    </header>
  )
}
