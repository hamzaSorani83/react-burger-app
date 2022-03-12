import React from 'react'
import classes from './NavigationItems.module.css'

export default function NavigationItems() {
  return (
    <ul className={ classes.NavigationItems }>
      <li> <a href="/" className={classes.active}>Burger Builder</a></li>
      <li> <a href="/">Checkout</a></li>
    </ul>
  )
}
