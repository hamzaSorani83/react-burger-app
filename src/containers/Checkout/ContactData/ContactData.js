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
    messages: {
      required: null,
    },
    valid: false,
    focus: false,
    touched: false
  },
  street: {
    elementType: 'input',
    elementConfig: {
      name: 'street',
      type: 'text',
      placeholder: 'Street',
    },
    value: '',
    validation: {
      required: true
    },
    messages: {
      required: null,
    },
    valid: false,
    focus: false,
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
    messages: {
      required: null,
      minLength: null,
      maxLength: null,
      isNumeric: null,
    },
    valid: false,
    focus: false,
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
    messages: {
      required: null,
    },
    valid: false,
    focus: false,
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
    messages: {
      required: null,
      isEmail: null,
    },
    valid: false,
    focus: false,
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
    messages: {},
    valid: true,
    focus: false,
  }
}

export default function ContactData() {
  const { ingredients,price,resetAll } = useContext( BurgerContext );
  const [ loading,setLoading ] = useState( false );
  const [ error,setError ] = useState( false );
  const [ orderForm,setOrderForm ] = useState( initialOrderForm );
  const navigate = useNavigate();
  
  const orderHandler = ( e ) => {
    e.preventDefault();
    let formIsValid = true;
    let updatedOrderForm = { ...orderForm };
    for ( const key in updatedOrderForm ) {
      updatedOrderForm[ key ].focus = false;
      updatedOrderForm[ key ].valid = checkValidity( updatedOrderForm[ key ], updatedOrderForm[key].validation );
      formIsValid = updatedOrderForm[ key ].valid && formIsValid;
      if ( !formIsValid ) {
        document.querySelector( `input[name="${ orderForm[ key ].elementConfig.name }"]` ).focus()
        updatedOrderForm[ key ].focus = true;
        setOrderForm(updatedOrderForm)
        break;
      }
    }
    
    if ( formIsValid ) {
      let contactData = {};
      for (const key in orderForm) {
        contactData[ key ] = orderForm[ key ].value;
      }
      setLoading( true );
      const order = {
        ingredients: { ...ingredients },
        price: price,
        contactData: contactData,
      };
      axios.post( 'orders.json',order )
        .then( response => {
          setLoading( false );
          navigate( '/burger' );
          resetAll();
        } )
        .catch( error => {
          setError( error.message );
          setLoading( false );
        } );
    }
  };
  
  const orderConfirmHandler = () => {
    navigate( '/burger' );
  };
  
  function checkValidity( formElement,rules ) {
    let isValid = true;
    let value = formElement.value;
    
    if ( !rules ) {
      return true;
    }
    
    if ( rules.required ) {
      if ( value.trim() === '' ) {
        isValid = false;
        formElement.messages.required = 'This Field is required';
      } else {
        isValid = isValid && true;
        formElement.messages.required = null;
      }
    } 
    
    if ( rules.minLength ) {
      if ( value.length < rules.minLength ) {
        isValid = false;
        formElement.messages.minLength = `Length must be greater than  ${rules.minLength - 1}`;
      } else {
        isValid = isValid && true;
        formElement.messages.minLength = null;
      }
    }
    
    if ( rules.maxLength ) {
      if ( value.length > rules.maxLength ) {
        isValid = false;
        formElement.messages.maxLength = `Length must be less than  ${rules.maxLength + 1}`;
      } else {
        isValid = isValid && true;
        formElement.messages.maxLength = null;
      }
    } 
    
    if ( rules.isEmail ) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if ( !pattern.test( value ) ) {
        isValid = false;
        formElement.messages.isEmail = "The email address must contain a single @";
      } else {
        isValid = isValid && true;
        formElement.messages.isEmail = null;
      }
    }
    
    if ( rules.isNumeric ) {
      const pattern = /^\d+$/;
      if ( !pattern.test( value ) ) {
        isValid = false;
        formElement.messages.isNumeric = "This field must not contain any character";
      } else {
        isValid = isValid && true;
        formElement.messages.isNumeric = null;
      }
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
    
    updatedOrderForm[ inputName ] = updatedFormElement;
    
    setOrderForm(updatedOrderForm)
    
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
            messages={ formElement.messages }
            focus={formElement.focus}
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

