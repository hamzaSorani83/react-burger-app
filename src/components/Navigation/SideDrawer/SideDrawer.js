import React, { useContext } from 'react'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../OrderList/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliaire'
import { BurgerContext } from '../../../BurgerBuilderContext';

export default function SideDrawer() {
  const { showSideDrawer,handleShowSideDrawer } = useContext( BurgerContext );
  let SideDrawerClasses = [ classes.SideDrawer, classes.Close ];
  if ( showSideDrawer ) {
    SideDrawerClasses = [ classes.SideDrawer,classes.Open ];
  } else {
    SideDrawerClasses = [ classes.SideDrawer, classes.Close ];
  }
  return (
    <Aux>
      <Backdrop show={showSideDrawer} clicked={handleShowSideDrawer}/>
      <div className={ SideDrawerClasses.join(' ') }>
        <Logo height="11%" marginBottom="36px"/>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  )
}
