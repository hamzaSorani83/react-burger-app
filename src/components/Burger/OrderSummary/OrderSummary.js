import React, { useContext } from 'react';
import { BurgerContext } from '../../../BurgerBuilderContext';
import classes from './OrderSummary.module.css'
import Aux from '../../../hoc/Auxiliaire/Auxiliaire';

const OrderSummary = () => {
  const {
    ingredients,
    price,
    purchaseCancelHandler,
    purchaseContinueHandler,
  } = useContext( BurgerContext );
  
  let summaryIngredients = Object.keys( ingredients )
    .map( ingKey => {
      return <li key={ingKey}>
        <span style={ { textTransform: 'capitalize' } }>{ ingKey }</span>:
        {ingredients[ingKey]}
      </li>
    } )
  
  
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {summaryIngredients}
      </ul>
      <p><strong>Total Price: {price}</strong></p>
      <p>Continue to Checkout?</p>
      <button
        onClick={purchaseCancelHandler}
        className={ `${ classes.Button } ${ classes.Danger }` }>CANCEL
      </button>
      <button
        onClick={purchaseContinueHandler}
        className={ `${ classes.Button } ${ classes.Success }` }>CONTINUE
      </button>
    </Aux>
  );
};

export default OrderSummary;