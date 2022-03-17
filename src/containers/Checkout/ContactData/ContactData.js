import React, { useContext, useState } from 'react'

import Spinner from '../../../components/OrderList/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import { BurgerContext } from '../../../BurgerBuilderContext';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

export default function ContactData() {
  const { ingredients,price, resetAll } = useContext( BurgerContext );
  const [ loading,setLoading ] = useState( false );
  const [error, setError] = useState(false)
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
  
  let form = (
    <form>
      <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
      <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
      <input className={classes.Input} type="text" name="street" placeholder="Street" />
      <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
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

