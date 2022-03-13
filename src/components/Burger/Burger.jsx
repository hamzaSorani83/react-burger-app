import React, { useContext } from 'react'
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { BurgerContext } from '../../BurgerBuilderContext';
import TransformedIntredients from './TransformedIntredients'

export default function Burger( {ingred}) {
  const { ingredients } = useContext( BurgerContext );
  return (
    <div className={ classes.Burger }>
      <BurgerIngredient type="bread-top" />
      <TransformedIntredients ingredients={ingred ? ingred : ingredients}/>
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}
