import React, { useContext } from 'react';
import { BurgerContext } from '../../../BurgerBuilderContext';
import classes from './OrderSummary.module.css'
import SweetAlert from 'react-bootstrap-sweetalert';
<<<<<<< HEAD
import Aux from '../../../hoc/Auxiliaire/Auxiliaire';
=======
import Aux from '../../../hoc/Auxiliaire';
import Spinner from '../../OrderList/Spinner/Spinner';
>>>>>>> 9aeb57d (work on axios...)

const OrderSummary = () => {
  const {
    ingredients,
    price,
<<<<<<< HEAD
    success,
    error,
    errorMessage,
    purchaseConfirmHandler,
    purchaseCancelHandler,
    purchaseContinueHandler,
  } = useContext( BurgerContext );
=======
    showContinueAlert,
    purchaseConfirmHandler,
    purchaseCancelHandler,
    purchaseContinueHandler,
    loading,
  } = useContext( BurgerContext )
>>>>>>> 9aeb57d (work on axios...)
  
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
<<<<<<< HEAD
        success 
          ? <SweetAlert success title="Success" onConfirm={ purchaseConfirmHandler } >you continue!</SweetAlert> 
          : error
            ? <SweetAlert error title="Error!" onConfirm={ purchaseConfirmHandler } >{errorMessage}</SweetAlert> 
            : <></>
=======
        showContinueAlert && loading ?
          <Spinner /> :
          showContinueAlert ?
          <SweetAlert success title="Success" onConfirm={ purchaseConfirmHandler } >you continue!</SweetAlert>
          : <></>
>>>>>>> 9aeb57d (work on axios...)
        }
      </Aux>
  );
};

export default OrderSummary;