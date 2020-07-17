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
import CardType from './CardType'

import styles from './CreditCard.module.scss'

const ExpiryDateInputName = 'expiry-date'
const CardNumberInputName = 'card-number'
const CvcInputName = 'cvc'

function CreditCard() {
  const [inputWithFocus, setInputWithFocus] = React.useState<string>('')
  const [expiryDateError, setExpiryDateError] = React.useState<string>('')
  const [cardType, setCardType] = React.useState<CardType>(CardType.Generic)

  const gotoNextField = () => {
    // console.log('gotoNextField current:', inputWithFocus)
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

  const cardNumberChanged = (cardNumber: string) => {
    console.log('Card number value', cardNumber)
    setInputWithFocus(CardNumberInputName)
    if (cardNumber.startsWith('5')) {
      setCardType(CardType.Master)
    } else if (cardNumber.startsWith('4')) {
      setCardType(CardType.Visa)
    } else setCardType(CardType.Generic)
  }

  const cardExpiryDateChanged = (value: string) => {
    console.log('Card expiry change', value)
    setInputWithFocus(ExpiryDateInputName)
    if (value.length === 7 && !isCardExpiryDateValid(value)) {
      setExpiryDateError('Card is not valid')
    } else {
      setExpiryDateError('')
    }
  }

  const cardCvcChange = (value: string) => {
    console.log('Card CVC Change', value)
    setInputWithFocus(CvcInputName)
  }

  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <CardImage type={cardType} />
        <CardInput
          name={CardNumberInputName}
          placeholder="Card number"
          onChange={cardNumberChanged}
          isValid={isValidNumberOrEmpty}
          formatValue={formatCreditCardNumber}
          isComplete={isCardNumberComplete}
          gotoNextField={gotoNextField}
          hasFocus={inputWithFocus === CardNumberInputName}
        />
        <CardInput
          name={ExpiryDateInputName}
          placeholder="MM / YY"
          onChange={cardExpiryDateChanged}
          isValid={isValidDateOrEmpty}
          formatValue={formatExpiryDate}
          isComplete={isCardExpiryDateValid}
          gotoNextField={gotoNextField}
          hasFocus={inputWithFocus === ExpiryDateInputName}
          error={expiryDateError}
          isBackspaceSpecial={true}
        />
        <CardInput
          name={CvcInputName}
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
