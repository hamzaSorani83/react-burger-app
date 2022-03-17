import React, { useContext, useState } from 'react'

import Spinner from '../../../components/OrderList/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import { BurgerContext } from '../../../BurgerBuilderContext';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import Input from '../../../components/OrderList/Input/Input'

const initialOrderForm = {
  name: {
    elementType: 'input',
    elementConfig: {
      name: 'name',
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
      name: 'street',
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
      name: 'zipCode',
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
      name: 'country',
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
      name: 'email',
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
      name: 'deliveryMethod',
      options: [
        {value: 'fastest', displayValue: 'Fastest'},
        {value: 'cheapest', displayValue: 'Cheapest'}
      ]
    },
    value: '',
    validation: {},
    valid: true,
  }
}

export default function ContactData() {
  const { ingredients,price,resetAll } = useContext( BurgerContext );
  const [ loading,setLoading ] = useState( false );
  const [ error,setError ] = useState( false );
  const [ orderForm,setOrderForm ] = useState( initialOrderForm );
  const [ formValid,setFormValid ] = useState( false );
  const navigate = useNavigate();
  
  const orderHandler = ( e ) => {
    e.preventDefault();
    if ( !formValid ) {
      console.log( 'not valid' )
      for (let key in orderForm) {
        if ( !orderForm[ key ].valid ) {
          document.querySelector( `input[name="${ orderForm[ key ].elementConfig.name }"]` ).focus();
          return false;
        }
      }
      return false
    }
    
    setLoading( true );
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
        setLoading( false );
      } );
  };
  
  const orderConfirmHandler = () => {
    navigate( '/burger' );
  };
  
  function checkValidity( value,rules ) {
    let isValid = true;
    
    if ( !rules ) {
      return true;
    }
    
    if ( rules.required ) {
      isValid = value.trim() !== '' && isValid;
    }
    
    if ( rules.minLength ) {
      isValid = value.length >= rules.minLength && isValid;
    }
    
    if ( rules.maxLength ) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    
    if ( rules.isEmail ) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test( value ) && isValid;
    }
    
    if ( rules.isNumeric ) {
      const pattern = /^\d+$/;
      isValid = pattern.test( value ) && isValid;
    }
    
    return isValid;
  }


  const inputChangedHandler = ( event,inputName ) => {
    const updatedOrderForm = {
      ...orderForm
    };
    const updatedFormElement = { 
      ...updatedOrderForm[inputName]
    };
    
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(event.target.value, orderForm[inputName].validation)
    updatedFormElement.touched = true;
    
    updatedOrderForm[ inputName ] = updatedFormElement;
    
    setOrderForm(updatedOrderForm)
    
    let formIsValid = true;
    for (let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }
    setFormValid( formIsValid )
  }
  
  let formElementsArray = [];
  for (const key in orderForm) {
    formElementsArray.push( orderForm[ key ] );
  }
  
  let form = (
    <form>
      {
        formElementsArray.map( ( formElement,index ) => {
          return <Input
            key={ index }
            elementType={ formElement.elementType }
            elementConfig={ formElement.elementConfig }
            value={ formElement.value }
            label={ formElement.elementConfig.placeholder }
            invalid={ !formElement.valid }
            shouldValidate={ formElement.validation }
            touched={ formElement.touched }
            changed={ ( event ) => inputChangedHandler( event,formElement.elementConfig.name)} 
          />
        })
      }
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

