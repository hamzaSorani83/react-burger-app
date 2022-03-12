import React,{ useState, createContext } from 'react';

export const BurgerContext = createContext();

const defaultIngredients = {
  salad: 0,
  meat: 0,
  bacon: 0,
  cheese : 0,
}


const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.2,
  bacon: 0.6,
  cheese : 0.8,
}

let defaultPrice = 4;

Object.keys( defaultIngredients )
  .map( ingKey => {
    if ( defaultIngredients[ ingKey ] > 0 ) {
      defaultPrice += INGREDIENT_PRICES[ ingKey ] * defaultIngredients[ ingKey ];
    }
    return defaultPrice;
  } );


export default function BurgerBuilderContext(props) {
  const [ ingredients,setIngredients ] = useState( defaultIngredients );
  const [ price,setPrice ] = useState( defaultPrice );
  let isPurchasable = Object.values( {...ingredients} ).reduce( ( arr,el ) => { return arr + el},0 ) > 0;
  const [ purchasable,setPurchasable ] = useState( isPurchasable );
  const [ showModal,setShowModal ] = useState( false );
  const [ showContinueAlert,setShowContinueAlert ] = useState( false );
  const [ showSideDrawer,setShowSideDrawer ] = useState( false );
  
  isPurchasable = (ingredients) => {
    let sum = Object.values( {...ingredients} ).reduce( ( arr,el ) => { return arr + el},0 );
    setPurchasable( sum > 0 );
  }
  
  const handleAddIngredient = ( type ) => {
    // add one
    const newIngredient = {...ingredients, [type] : ingredients[type] + 1}
    setIngredients(newIngredient)
    // update price
    const newPrice = +( ( price + INGREDIENT_PRICES[ type ] ).toFixed( 3 ) );
    setPrice( newPrice )
    // purchasable true
    setPurchasable( true )
  }
  
  const handleRemoveIngredient = ( type ) => {
    // remove one
    const newIngredient = {...ingredients, [type] : ingredients[type] - 1}
    setIngredients(newIngredient)
    // update price
    const newPrice = +( ( price - INGREDIENT_PRICES[ type ] ).toFixed( 3 ) );
    setPrice( newPrice )
    // update purchasability
    isPurchasable(newIngredient);
  }
  
  const handleOrderNow = () => {
    setShowModal(true)
  }

  const purchaseContinueHandler = () => {
    setShowContinueAlert(true)
  }
  
  const purchaseCancelHandler = () => {
    setShowModal(false)
  }
  
  const purchaseConfirmHandler = () => {
    setIngredients({...defaultIngredients})
    setPrice(defaultPrice)
    setPurchasable(false)
    setShowModal(false)
    setShowContinueAlert(false)
  }
  
  const handleShowSideDrawer = () => {
    setShowSideDrawer( false );
  }
  
  const handleDrawerToggle = () => {
    setShowSideDrawer( !showSideDrawer );
  }
  
  
  let disabledIngredients = { ...ingredients };
  
  for (const key in disabledIngredients) {
    if (Object.hasOwnProperty.call(disabledIngredients, key)) {
      disabledIngredients[ key ] = disabledIngredients[ key ] <= 0;
    }
  }
  
  return (
    <BurgerContext.Provider value={ { 
      ingredients,
      show: showModal,
      showModal,
      price,
      purchasable,
      showContinueAlert,
      disabledIngredients,
      handleAddIngredient,
      handleRemoveIngredient,
      purchaseContinueHandler,
      purchaseCancelHandler,
      purchaseConfirmHandler,
      handleOrderNow,
      showSideDrawer,
      handleShowSideDrawer,
      handleDrawerToggle,
    } }>
      {props.children}
    </BurgerContext.Provider>
  )
}
