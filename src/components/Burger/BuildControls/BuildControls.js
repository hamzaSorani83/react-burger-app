import React from 'react'
import classes from './BuildControls.module.css'
import IngredientController from './IngredientControls/IngredientControls';
import { useDispatch,useSelector } from "react-redux";
import { addIngredient, removeIngredients } from '../../../store/reducer'

function BuildControls({handleOrderNow}) {
  const price = useSelector( ( state ) => state.totalPrice );
  const purchasable = useSelector( ( state ) => state.purchasable );
  const disabledIngredients = useSelector( (state) => state.disabledIngredients)
  
  const dispatch = useDispatch();
  
  const controls = [
    { type: 'salad',label: 'Salad' },
    { type: 'meat',label: 'Meat' },
    { type: 'bacon',label: 'Bacon' },
    { type: 'cheese',label: 'Cheese' },
  ];
  
  const IngredientControllers = controls.map( ( ctrl,index ) => {
    return <IngredientController
      key={ ctrl.type + index }
      label={ ctrl.label }
      isDisabled={disabledIngredients[ctrl.type]}
      handleAddIngredient={ () => {
        return dispatch(addIngredient( ctrl.type ));
      } }
      handleRemoveIngredient={ () => {
        return dispatch( removeIngredients( ctrl.type ) );
      }}
    />;
  } );
  return (
    <div className={ classes.BuildControls }>
      <p className={classes.Price}> current price: { price }</p>
      { IngredientControllers }
      <button
        disabled={ !purchasable }
        className={ classes.OrderButton }
        onClick={handleOrderNow}> ORDER NOW
      </button>
    </div>
  );
}

const isEqual = ( prevProps,nextProps ) => {
  return prevProps.show === nextProps.show;
}

export default React.memo(BuildControls , isEqual)