import { useState } from 'react'

// Lets a number input always render trailing zeros (e.g. "12.50" instead
// of "12.5") while still letting the user type freely. Tracks focus so
// external prop changes (license auto-fill) reformat without clobbering
// in-progress typing.
export function useDecimalInput(value, onChange, { decimals = 2, min = 0 } = {}) {
  const [text, setText] = useState(() => Number(value).toFixed(decimals))
  const [lastValue, setLastValue] = useState(value)
  const [focused, setFocused] = useState(false)

  if (value !== lastValue) {
    setLastValue(value)
    if (!focused) {
      setText(Number(value).toFixed(decimals))
    }
  }

  return {
    type: 'text',
    inputMode: 'decimal',
    value: text,
    onChange: (e) => {
      const raw = e.target.value
      setText(raw)
      const parsed = parseFloat(raw)
      if (!Number.isNaN(parsed)) {
        onChange(Math.max(min, parsed))
      } else if (raw === '') {
        onChange(min)
      }
    },
    onFocus: () => setFocused(true),
    onBlur: () => {
      setFocused(false)
      const parsed = parseFloat(text)
      const normalized = Number.isNaN(parsed) ? min : Math.max(min, parsed)
      onChange(normalized)
      setText(normalized.toFixed(decimals))
    },
  }
}
