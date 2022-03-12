import React from 'react';
import classes from './Backdrop.module.css'


function Backdrop( { show,clicked } ) {
  return (
    show ? <div className={ classes.Backdrop } onClick={ clicked }></div> : null
  )
}

const isEqual = ( prevProps,nextProps ) => {
  return prevProps.show === nextProps.show;
}

export default  React.memo(Backdrop , isEqual)