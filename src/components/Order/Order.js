import React from 'react'
import classes from './Order.module.css'
import Burger from '../Burger/Burger'

export default function Order( { ingredients,price } ) {
  const transformedIngredients = [];

  for ( let ingredientName in ingredients ) {
    transformedIngredients.push(
      {
        name: ingredientName,
        amount: ingredients[ingredientName]
      }
    );
  }
  
  const ingredientOutput = transformedIngredients.map(ig => {
    return <span 
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
          }}
        key={ig.name}>{ig.name} ({ig.amount})</span>;
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: { ingredientOutput }</p>
      <div className={classes.BurgerParent}>
        <Burger ingred={ ingredients }/>
      </div>
      <p>Price: <strong>USD {( price )}</strong></p>
    </div>
  )
}
