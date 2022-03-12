import React from 'react'
import classes from './Logo.module.css'
import  burgerLogo  from '../../assets/images/burger-logo.png'

export default function Logo(props) {
  return (
    <div className={classes.Logo} style={{ height: props.height, marginBottom: props.marginBottom }}>
      <img src={ burgerLogo } alt="burger-logo" />
    </div>
  )
}
