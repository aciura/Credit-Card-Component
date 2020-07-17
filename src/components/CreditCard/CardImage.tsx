import React from 'react'
import Generic from '../../assets/generic.png'
import Visa from '../../assets/visa.png'
import Master from '../../assets/master.png'
import CardType from './CardType'

type CardImageProps = {
  type: CardType
}

function CardImage({ type }: CardImageProps) {
  function getCardImage(type: CardType) {
    switch (type) {
      case CardType.Master:
        return Master
      case CardType.Visa:
        return Visa
      default:
        return Generic
    }
  }
  return <img src={getCardImage(type)} alt="Card" />
}

export default CardImage
