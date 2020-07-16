import React, { ChangeEvent } from 'react'
import {
  isValidNumber,
  formatCreditCardNumber,
  isCardNumberComplete,
  isValidDate,
  isCardExpiryDateComplete,
  isCompleteDate,
  formatExpiryDate,
} from './numberUtils'

import styles from './CreditCard.module.scss'

function CreditCard() {
  const [cardNumber, setCardNumber] = React.useState<string>('')
  const [cardExpiryDate, setCardExpiryDate] = React.useState<string>('')

  const cardExpiryDateRef = React.useRef<HTMLInputElement>(null)

  const gotoCardExpiryDate = () => {
    cardExpiryDateRef?.current?.focus()
  }

  const gotoCVC = () => {}

  const cardNumberChanged = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('cardNumberChanged', e.target.value)
    const rawValue = e.target.value
    if (isValidNumber(rawValue)) {
      const formattedNumber = formatCreditCardNumber(rawValue)
      setCardNumber(formattedNumber)
      if (isCardNumberComplete(formattedNumber)) {
        gotoCardExpiryDate()
      }
    }
  }

  const cardExpiryDateChanged = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('cardExpiryDateChanged', e.target.value)
    const rawValue = e.target.value
    if (isValidDate(rawValue)) {
      const formateted = formatExpiryDate(rawValue)
      setCardExpiryDate(formateted)
      if (isCardExpiryDateComplete(formateted)) {
        console.log('gotoCVC()')
      }
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <div>IMG</div>
        <input
          placeholder="Card number"
          value={cardNumber}
          onChange={cardNumberChanged}
        />
        <input
          placeholder="MM / YY"
          ref={cardExpiryDateRef}
          value={cardExpiryDate}
          onChange={cardExpiryDateChanged}
        />
        <input placeholder="CVC" />
      </div>
    </div>
  )
}

export default CreditCard
