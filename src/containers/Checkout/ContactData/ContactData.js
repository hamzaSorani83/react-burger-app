import React, { useContext, useState } from 'react'

import Spinner from '../../../components/OrderList/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import { BurgerContext } from '../../../BurgerBuilderContext';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

  
  const initialOrderForm = {
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          {value: 'fastest', displayValue: 'Fastest'},
          {value: 'cheapest', displayValue: 'Cheapest'}
        ]
      },
      value: '',
      validation: {},
      valid: true
    }
  }

export default function ContactData() {
  const { ingredients,price, resetAll } = useContext( BurgerContext );
  const [ loading,setLoading ] = useState( false );
  const [ error,setError ] = useState( false )
  const [ orderForm,setOrderForm ] = useState( initialOrderForm )
  const navigate = useNavigate();
  
  const orderHandler = ( e ) => {
    e.preventDefault();
    setLoading(true)
    const order = {
      ingredients: { ...ingredients },
      price: price,
    };
    axios.post( 'orders.json',order )
      .then( response => {
        console.log( response );
        setLoading( false );
        navigate( '/burger' );
        resetAll();
      } )
      .catch( error => {
        setError( error.message );
        setLoading( false )
    } );
  }
  
  const orderConfirmHandler = () => {
    navigate( -2 );
  }
  
  const inputChangedHandler = () => {
    
  }
  
  for (const key in orderForm) {
    console.log(orderForm[key])
  }
  
  let form = (
    <form>
      <input onClick={inputChangedHandler} className={classes.Input} type="text" name="name" placeholder="Your Name" />
      <input onClick={inputChangedHandler} className={classes.Input} type="text" name="street" placeholder="Street" />
      <input onClick={inputChangedHandler} className={classes.Input} type="text" name="zip" placeholder="ZIP Code" />
      <input onClick={inputChangedHandler} className={classes.Input} type="text" name="counter" placeholder="Counter" />
      <input onClick={inputChangedHandler} className={ classes.Input } type="email" name="email" placeholder="Your Mail" />
      <select name="deliveryMethod" id="">
        <option value="fastest">Fastest</option>
        <option value="cheapest">Cheapest</option>
      </select>
      <button className={`${ classes.Button } ${ classes.Success }`} onClick={orderHandler}>ORDER</button>
    </form>
  );
  
  if ( loading ) {
    form = <Spinner />;
  } 
  
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      { form }
        {
          error
            ? <SweetAlert error title="Error!" onConfirm={ orderConfirmHandler } >{error}</SweetAlert> 
            : <></>
        }
    </div>
  )
}

