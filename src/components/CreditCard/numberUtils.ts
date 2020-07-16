export const isValidNumber = (value: string) => {
  var matchDigitsOrWhiteSpace = new RegExp('^[\\d\\s]+$')
  return matchDigitsOrWhiteSpace.test(value)
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

export const formatExpiryDate = (value: string) => {
  return value
    .trim()
    .split('')
    .filter((char) => /\d/.test(char))
    .reduce((acc, char, i) => acc + (i % 2 === 0 ? '/' + char : char))
}

export const isCardNumberComplete = (cardNumber: string) => {
  return cardNumber.length === 19
}

export const isValidDate = (value: string) => {
  var match2DigitNumber = new RegExp('^\\d{1,2}\\/?\\d{0,2}$')
  return match2DigitNumber.test(value)
}

export const isCompleteDate = (value: string) => {
  var matchDigitsOrWhiteSpace = new RegExp('^\\d\\d/\\d\\d$')
  if (!matchDigitsOrWhiteSpace.test(value)) return false

  const [mm, yy] = value.split('/')
  const [month, year] = [Number(mm), Number(yy)]

  if (month <= 0 || month > 12) return false
  if (year < 0 || year > 99) return false

  //TODO: Test MM / YY > now()
  // const now = Date.now()
}

export const isCardExpiryDateComplete = (cardExpiry: string) => {
  return cardExpiry.length === 5 && isCompleteDate(cardExpiry)
}
