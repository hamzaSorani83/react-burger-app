import React from 'react'
import classes from './NavigationItems.module.css'
import { NavLink } from 'react-router-dom'

export default function NavigationItems() {
  return (
    <ul className={ classes.NavigationItems }>
      <li> <NavLink to="/burger"  className={({isActive}) => (isActive ? classes.active : 'none')}>Burger Builder</NavLink></li>
      <li> <NavLink to="/orders" className={({isActive}) => (isActive ? classes.active : 'none')}>Orders</NavLink></li>
    </ul>
  )
}
