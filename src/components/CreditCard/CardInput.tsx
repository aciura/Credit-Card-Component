import React, { ChangeEvent, KeyboardEvent } from 'react'

type CardInputProps = {
  name: string
  placeholder: string
  onChange: (value: string) => void
  gotoNextField: () => void
  isValid: (value: string) => boolean
  formatValue: (value: string) => string
  isComplete: (value: string) => boolean
  hasFocus: boolean
  error?: string
  isBackspaceSpecial?: boolean
}

type InputSelection = {
  start: number
  end: number
}

function CardInput({
  name,
  placeholder,
  onChange,
  gotoNextField,
  isValid,
  formatValue,
  isComplete,
  hasFocus,
  error = '',
  isBackspaceSpecial = false,
}: CardInputProps) {
  const [value, setValue] = React.useState<string>('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [selection, setSelection] = React.useState<InputSelection>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log({ placeholder, value: e.target.value })
    const rawValue = e.target.value

    if (isValid(rawValue)) {
      const formatted = formatValue(rawValue)
      saveInputSelection(formatted, rawValue)
      setValue(formatted)
      onChange(formatted)
      if (isComplete(formatted)) {
        gotoNextField()
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && isBackspaceSpecial) {
      e.preventDefault()
      const withoutLastDigit = value
        .split('')
        .filter((ch) => /\d/.test(ch))
        .slice(0, -1)
        .join('')
      setValue(formatValue(withoutLastDigit))
    }
  }

  const saveInputSelection = (formatted: string, rawValue: string) => {
    const diff = formatted.length - rawValue.length
    setSelection({
      start: (inputRef.current?.selectionStart ?? 0) + diff,
      end: (inputRef.current?.selectionEnd ?? 0) + diff,
    })
  }

  React.useEffect(() => {
    if (hasFocus) inputRef?.current?.focus()
  }, [hasFocus])

  React.useEffect(() => {
    if (selection) {
      inputRef.current?.setSelectionRange(selection.start, selection.end)
    }
  })

  return (
    <input
      className={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      ref={inputRef}
      style={{ color: error ? 'red' : 'black' }}
      required={true}
    />
  )
}

export default CardInput
