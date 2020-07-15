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

export const isCardNumberComplete = (cardNumber: string) => {
  return cardNumber.length === 19
}
