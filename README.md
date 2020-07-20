Weekend project that uses: 
* React Js with Hooks
* Typescript
* Css modules
* SaSS (SCSS)

The main App component is inside [src/components/App.tsx](https://github.com/aciura/Credit-Card-Component/blob/master/src/components/App.tsx)

The [CreditCard](https://github.com/aciura/Credit-Card-Component/blob/master/src/components/CreditCard/CreditCard.tsx) is a separate re-usable component that displays 3 input boxes for filling up credit card number, expiry date and cvc number. 
This component provides: 
* Formatting of card number
* User is moved to next field
* TAB and TAB+SHIFT is supported (by inputs out-of-the-box)
* Card type logo is displayed (VISA vs Mastercard only)
* Card Expiry date is validated (it's checked that the date provided is in the future, i.e. card is still valid)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Preview

![Credit Card input sample](https://github.com/aciura/Credit-Card-Component/blob/master/credit-card-input.gif?raw=true)
