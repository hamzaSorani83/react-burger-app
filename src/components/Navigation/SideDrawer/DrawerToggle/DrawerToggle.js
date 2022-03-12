import React, { useContext } from 'react'
import { BurgerContext } from '../../../../BurgerBuilderContext';
import classes from './DrawerToggle.module.css'

export default function DrawerToggle() {
  const { handleDrawerToggle } = useContext( BurgerContext );
  
  return (
    <div onClick={ handleDrawerToggle } className={ classes.DrawerToggle }>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
