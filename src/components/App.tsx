import React from 'react'
import CreditCard from './CreditCard/CreditCard'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <p>Credit Card input sample</p>
      </header>
      <CreditCard />
    </div>
  )
}

export default App
