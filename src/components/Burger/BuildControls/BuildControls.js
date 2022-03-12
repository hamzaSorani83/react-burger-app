import React, { useContext } from 'react'
import { BurgerContext } from '../../../BurgerBuilderContext';
import classes from './BuildControls.module.css'
import IngredientController from './IngredientControls/IngredientControls';

function BuildControls() {
  const {disabledIngredients, handleOrderNow, price, purchasable, handleAddIngredient, handleRemoveIngredient} = useContext(BurgerContext)
  
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
        return handleAddIngredient( ctrl.type );
      } }
      handleRemoveIngredient={ () => {
        return handleRemoveIngredient(ctrl.type)
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
  console.log('test')
  return prevProps.show === nextProps.show;
}

export default React.memo(BuildControls , isEqual)