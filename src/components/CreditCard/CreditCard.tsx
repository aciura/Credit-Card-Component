import React from 'react'
import {
  isValidNumberOrEmpty,
  formatCreditCardNumber,
  isCardNumberComplete,
  isValidDateOrEmpty,
  isCardExpiryDateValid,
  formatExpiryDate,
  isCvcComplete,
  isValidCvc,
} from './numberUtils'
import CardInput from './CardInput'
import CardImage from './CardImage'

import styles from './CreditCard.module.scss'
import { generateKeyPair } from 'crypto'

const ExpiryDateInputName = 'expiry-date'
const CardNumberInputName = 'card-number'
const CvcInputName = 'cvc'

function CreditCard() {
  const [inputWithFocus, setInputWithFocus] = React.useState<string>('')
  const [expiryDateError, setExpiryDateError] = React.useState<string>('')

  const gotoNextField = () => {
    console.log('gotoNextField current:', inputWithFocus)
    switch (inputWithFocus) {
      case CardNumberInputName:
        setInputWithFocus(ExpiryDateInputName)
        break
      case ExpiryDateInputName:
        setInputWithFocus(CvcInputName)
        break
      default:
        setInputWithFocus('')
    }
  }

  const cardNumberChanged = (value: string) => {
    console.log('Card number', value)
    setInputWithFocus(CardNumberInputName)
  }

  const cardExpiryDateChanged = (value: string) => {
    console.log('cardExpiryDate', value)
    setInputWithFocus(ExpiryDateInputName)
    if (value.length === 7 && !isCardExpiryDateValid(value)) {
      setExpiryDateError('Card is not valid')
    } else {
      setExpiryDateError('')
    }
  }

  const cardCvcChange = (value: string) => {
    console.log('cardcvcChange', value)
    setInputWithFocus(CvcInputName)
  }

  console.log({ inputWithFocus })

  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <CardImage />
        <CardInput
          placeholder="Card number"
          onChange={cardNumberChanged}
          isValid={isValidNumberOrEmpty}
          formatValue={formatCreditCardNumber}
          isComplete={isCardNumberComplete}
          gotoNextField={gotoNextField}
          hasFocus={inputWithFocus === CardNumberInputName}
        />
        <CardInput
          placeholder="MM / YY"
          onChange={cardExpiryDateChanged}
          isValid={isValidDateOrEmpty}
          formatValue={formatExpiryDate}
          isComplete={isCardExpiryDateValid}
          gotoNextField={gotoNextField}
          hasFocus={inputWithFocus === ExpiryDateInputName}
          error={expiryDateError}
        />
        <CardInput
          placeholder="CVC"
          onChange={cardCvcChange}
          isValid={isValidCvc}
          formatValue={(value) => value}
          isComplete={isCvcComplete}
          gotoNextField={gotoNextField}
          hasFocus={inputWithFocus === CvcInputName}
        />
      </div>
    </div>
  )
}

export default CreditCard
