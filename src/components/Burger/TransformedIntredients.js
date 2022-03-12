import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


function TransformedIntredients( { ingredients } ) {
  let transformedIngredient = Object.keys( ingredients )
    .map( ingredKey => [ ...Array( ingredients[ ingredKey ] ) ]
      .map((_, index) => <BurgerIngredient type={ingredKey} key={ingredKey + index}/>)
    ).reduce((arr, el)=> arr.concat(el));
  if ( transformedIngredient.length === 0 ) {
    transformedIngredient = <p>Please Start Adding Ingredients!</p>
  }
  return (
    <>
      {transformedIngredient}
    </>
  )
}

export default React.memo(TransformedIntredients)