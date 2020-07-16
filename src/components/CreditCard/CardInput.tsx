import React, { ChangeEvent } from 'react'

type CardInputProps = {
  placeholder: string
  onChange: (value: string) => void
  gotoNextField: () => void
  isValid: (value: string) => boolean
  formatValue: (value: string) => string
  isComplete: (value: string) => boolean
  hasFocus: boolean
  error?: string
}

function CardInput({
  placeholder,
  onChange,
  gotoNextField,
  isValid,
  formatValue,
  isComplete,
  hasFocus,
  error = '',
}: CardInputProps) {
  const [value, setValue] = React.useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log({ placeholder, value: e.target.value })
    const rawValue = e.target.value
    if (isValid(rawValue)) {
      const formatted = formatValue(rawValue)
      setValue(formatted)
      onChange(formatted)
      if (isComplete(formatted)) {
        gotoNextField()
      }
    }
  }
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (hasFocus) inputRef?.current?.focus()
  }, [hasFocus])

  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      ref={inputRef}
      style={{ color: error ? 'red' : 'black' }}
      required={true}
    />
  )
}

export default CardInput
