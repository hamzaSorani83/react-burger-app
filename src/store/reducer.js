import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
  purchasable: false,
  disabledIngredients: { salad: true, meat: true, bacon: true, cheese: true },
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.2,
  bacon: 0.6,
  cheese: 0.8,
};

const isPurchasable = ( ingredients ) => {
  let sum = Object.values({ ...ingredients }).reduce((arr, el) => {
    return arr + el;
  }, 0);
  return sum - 1 > 0;
};


const reducer = createSlice({
  name: "burger",
  initialState: initialState,
  reducers: {
    addIngredient(state, actions) {
      return {
        ...state,
        
        ingredients: {
          ...state.ingredients,
          [actions.payload]: state.ingredients[actions.payload] + 1,
        },
        
        totalPrice: +(
          state.totalPrice + INGREDIENT_PRICES[ actions.payload ]
        ).toFixed( 2 ),
        
        purchasable: true,
        
        disabledIngredients: { ...state.disabledIngredients,[ actions.payload ]: false }
      };
    },
    
    removeIngredients( state,actions ) {
      return {
        ...state,
        
        ingredients: {
          ...state.ingredients,
          [actions.payload]: state.ingredients[actions.payload] - 1,
        },
        
        totalPrice: +(
          state.totalPrice - INGREDIENT_PRICES[actions.payload]
        ).toFixed( 2 ),
        
        purchasable: isPurchasable( state.ingredients ),
        
        disabledIngredients: {
          ...state.disabledIngredients,
          [actions.payload]: state.ingredients[actions.payload] - 1 <= 0,
        },
      };
    },
    
    resetAll( state ) {
      return {
        ...initialState
      }
    }
  },
} );

export const { addIngredient, removeIngredients, resetAll } = reducer.actions;
export default reducer.reducer;