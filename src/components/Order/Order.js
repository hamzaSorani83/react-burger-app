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
  } );
  let values = Object.values(ingredients).reduce( (arr, el) => arr + el)
  console.log(values > 4)
  return (
    <div className={classes.Order}>
      <p>Ingredients: { ingredientOutput }</p>
      <div className={ classes.BurgerParent }>
        {values > 4 ? <Burger height='80px' ingred={ ingredients }/> : <Burger height='90px' ingred={ ingredients }/>}
      </div>
      <p>Price: <strong>USD {( price )}</strong></p>
    </div>
  )
}