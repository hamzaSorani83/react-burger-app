import React from 'react'
import classes from './DrawerToggle.module.css'

export default function DrawerToggle( { handleDrawerToggle } ) {
  return (
    <div onClick={ handleDrawerToggle } className={ classes.DrawerToggle }>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
