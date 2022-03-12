import React, {useContext} from 'react'
import Aux from '../../../hoc/Auxiliaire';
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.css'
import { BurgerContext } from '../../../BurgerBuilderContext';

export default function Modal(props) {
  const {show ,purchaseCancelHandler} = useContext( BurgerContext )
  return (
    <Aux>
      <Backdrop show={show} clicked={purchaseCancelHandler} />
      <div className={ ` ${ classes.Modal } ${ show ? classes.Show : '' }` }>
        {props.children}
      </div>
    </Aux>
  )
}
