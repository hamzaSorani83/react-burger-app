import React,{ useState, createContext } from 'react';
import { createSearchParams, useNavigate} from 'react-router-dom';

//=======================================
// to get data from backend
// import { useEffect } from 'react';
// import axios from './axios-orders';
//=======================================

export const BurgerContext = createContext();

const DEFAULT_INGREDIENTS = {
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

const DEFAULT_PRICE = 4;


export default function BurgerBuilderContext(props) {
  const [ ingredients,setIngredients ] = useState( DEFAULT_INGREDIENTS );
  const [ price,setPrice ] = useState( DEFAULT_PRICE );
  let isPurchasable = Object.values( {...ingredients} ).reduce( ( arr,el ) => { return arr + el},0 ) > 0;
  const [ purchasable,setPurchasable ] = useState( false );
  const [ showModal,setShowModal ] = useState( false );
  const [ success, setSuccess ] = useState( false );
  const [ error, setError ] = useState( false );
  const [ errorMessage, setErrorMessage ] = useState( null );
  const [ showSideDrawer,setShowSideDrawer ] = useState( false );
  const [ loading,setLoading ] = useState( false );
  const navigate = useNavigate();
  
  //=========================================
  // get data from backend
  /*
  useEffect( () => {
    // get default ingredients from backend
    axios.get( 'ingredients.json' )
      .then( response => {
          setIngredients( response.data );
      } ).catch( error => {
        console.log( error );
      } );
    // get default price from backend
    axios.get( 'initialPrice.json' )
      .then( response => {
        setPrice( response.data );
      } ).catch( error => {
        console.log( error );
      } );
  },[] );
  */
  //=========================================
  
  isPurchasable = (ingredients) => {
    let sum = Object.values( {...ingredients} ).reduce( ( arr,el ) => { return arr + el},0 );
    setPurchasable( sum > 0 );
    return sum > 0;
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
    navigate( {
      pathname: '/checkout',
      search: '?' + createSearchParams( {
        price: price,
      } )
    } );
  }
  
  const purchaseCancelHandler = () => {
    setShowModal(false)
  }
  
  const purchaseConfirmHandler = () => {
    if ( success ) {
      setIngredients({...DEFAULT_INGREDIENTS})
      setPrice(DEFAULT_PRICE)
      setPurchasable(false)
      setShowModal(false)
      setSuccess( false )
    } else {
      setError( false );
      setShowModal(false)
    }
  }
  
  const handleShowSideDrawer = () => {
    setShowSideDrawer( false );
  }
  
  const handleDrawerToggle = () => {
    setShowSideDrawer( !showSideDrawer );
  }
  
  const resetAll = (  ) => {
    setIngredients({...DEFAULT_INGREDIENTS})
    setPrice(DEFAULT_PRICE)
    setPurchasable(false)
    setShowModal(false)
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
      success,
      error,
      errorMessage,
      disabledIngredients,
      loading,
      resetAll,
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
