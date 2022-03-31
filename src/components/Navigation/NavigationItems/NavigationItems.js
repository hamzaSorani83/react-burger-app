import React from 'react'
import classes from './NavigationItems.module.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function NavigationItems() {
  const isAuthenticated = useSelector( state => state.auth.token ) !== null;
  
  return (
    <ul className={ classes.NavigationItems }>
      <li> <NavLink to="/"  className={({isActive}) => (isActive ? classes.active : 'none')}>Burger Builder</NavLink></li>
      <li> <NavLink to="/orders" className={({isActive}) => (isActive ? classes.active : 'none')}>Orders</NavLink></li>
      <li>
        { !isAuthenticated
          ? <NavLink to="/auth" className={ ( { isActive } ) => ( isActive ? classes.active : 'none' ) }>Authenticate</NavLink>
          : <NavLink to='/logout'>Logout</NavLink>
        }
      </li>
    </ul>
  )
}
