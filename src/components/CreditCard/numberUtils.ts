export const isEmpty = (value: string) => {
  if (!value || !value.length) return true
  return false
}

export const isValidNumberOrEmpty = (value: string) => {
  if (isEmpty(value)) return true

  var matchDigitsOrWhiteSpace = /^[\d\s]+$/
  const isValid = matchDigitsOrWhiteSpace.test(value)
  return isValid && value.length < 20
}

export const formatCreditCardNumber = (value: string) => {
  const isWhitespace = (char: string) => /\s/.test(char)
  const isIt5thChar = (i: number) => i % 4 === 0 && i > 0

  return value
    .trim()
    .split('')
    .filter((char) => !isWhitespace(char))
    .reduce((acc, char, i) => acc + (isIt5thChar(i) ? ' ' + char : char), '')
}

export const isCardNumberComplete = (cardNumber: string) => {
  return cardNumber.length === 19
}

export const isValidDateOrEmpty = (value: string) => {
  if (isEmpty(value)) return true

  var match_mm_space_slash_space_yy = /^\d{0,2}\s?\/?\s?\d{0,2}$/
  return match_mm_space_slash_space_yy.test(value)
}

export const formatExpiryDate = (value: string) => {
  const isIt2ndChar = (i: number) => i % 2 === 0 && i < 4
  return value
    .trim()
    .split('')
    .filter((char) => /\d/.test(char))
    .reduce(
      (acc, char, i) => acc + (isIt2ndChar(i + 1) ? char + ' / ' : char),
      '',
    )
}

const isValidExpiry = (value: string) => {
  var match_mm_space_slash_space_yy = /^\d\d\s\/\s\d\d$/
  if (!match_mm_space_slash_space_yy.test(value)) return false

  const [mm, yy] = value.split('/')
  const [month, year] = [Number(mm), Number(yy)]
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = Number(now.getFullYear().toString().substring(2))
  // console.log({ value, month, year, currentMonth, currentYear })

  if (month <= 0 || month > 12) return false
  if (year < 0 || year > 99) return false
  if (currentYear > year) return false
  if (currentYear === year && currentMonth > month) return false

  return true
}

export const isCardExpiryDateValid = (cardExpiry: string) => {
  return cardExpiry.length === 7 && isValidExpiry(cardExpiry)
}

export const isValidCvc = (value: string) => {
  var matchMax3Digits = /^\d{0,3}$/
  return matchMax3Digits.test(value)
}

export const isCvcComplete = (cvc: string) => {
  return cvc.length === 3
}
