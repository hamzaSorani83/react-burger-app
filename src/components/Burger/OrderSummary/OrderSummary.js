import React, { useContext } from 'react';
import { BurgerContext } from '../../../BurgerBuilderContext';
import classes from './OrderSummary.module.css'
import SweetAlert from 'react-bootstrap-sweetalert';
import Aux from '../../../hoc/Auxiliaire';
import Spinner from '../../OrderList/Spinner/Spinner';

const OrderSummary = () => {
  const {
    ingredients,
    price,
    showContinueAlert,
    purchaseConfirmHandler,
    purchaseCancelHandler,
    purchaseContinueHandler,
    loading,
  } = useContext( BurgerContext )
  
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
        {
        showContinueAlert && loading ?
          <Spinner /> :
          showContinueAlert ?
          <SweetAlert success title="Success" onConfirm={ purchaseConfirmHandler } >you continue!</SweetAlert>
          : <></>
        }
      </Aux>
  );
};

export default OrderSummary;