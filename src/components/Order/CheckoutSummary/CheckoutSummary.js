import React from 'react'
import { useNavigate } from 'react-router-dom';
import Burger from '../../Burger/Burger'
import classes from './CheckoutSummary.module.css'

export default function CheckoutSummary() {
  const navigate = useNavigate();
  
  const checkoutCancelHandler = () => {
    return navigate( -1 );
  }
  
  const checkoutContinueHandler = () => {
    return navigate( {
      pathname: 'contact-data',
    } );
  }
  
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={ { width: '100%', height: '100%', margin: 'auto' } }>
        <Burger/>
      </div>
      <button
        onClick={checkoutCancelHandler}
        className={ `${ classes.Button } ${ classes.Danger }` }>CANCEL
      </button>
      <button
        onClick={checkoutContinueHandler}
        className={ `${ classes.Button } ${ classes.Success }` }>CONTINUE
      </button>
    </div>
  )
}
