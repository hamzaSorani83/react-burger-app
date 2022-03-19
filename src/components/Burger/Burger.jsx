import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import TransformedIntredients from './TransformedIntredients'
import { useSelector } from "react-redux";

export default function Burger( {ingred, height}) {
  const ingredients = useSelector( ( state ) => state.ingredients );
  return (
    <div style={{ height: height }} className={ classes.Burger }>
      <BurgerIngredient type="bread-top" />
      <TransformedIntredients ingredients={ingred ? ingred : ingredients}/>
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}