import React from 'react'
import Aux from '../../../hoc/Auxiliaire/Auxiliaire';
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.css'

export default function Modal( props ) {
  return (
    <Aux>
      <Backdrop show={props.showModal} clicked={props.purchaseCancelHandler} />
      <div
        className={` ${classes.Modal} ${props.showModal ? classes.Show : ""}`}
      >
        {props.children}
      </div>
    </Aux>
  );
}
