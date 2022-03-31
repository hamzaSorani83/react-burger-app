import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import TransformedIntredients from './TransformedIntredients'
import { useSelector } from "react-redux";


function Burger( {ingred, height, isOrderBurger}) {
  const ingredients = useSelector( ( state ) => state.order.ingredients );
  return (
    <div style={ { height: height } } className={ [classes.Burger, isOrderBurger ? classes.OrderBurger : ''].join(' ') }>
      <BurgerIngredient type="bread-top" />
      <TransformedIntredients ingredients={ingred ? ingred : ingredients}/>
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default React.memo(Burger)