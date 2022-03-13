import React from 'react'
import classes from './NavigationItems.module.css'
import { NavLink } from 'react-router-dom'

export default function NavigationItems() {
  return (
    <ul className={ classes.NavigationItems }>
      
      <li> <NavLink to="/burger" >Burger Builder</NavLink></li>
      <li> <NavLink to="/checkout" >Checkout</NavLink></li>
    </ul>
  )
}
