import React from 'react'
import classes from './Error404.module.css'
import {NavLink} from 'react-router-dom'

export default function Error404() {
  return (
    <div className={classes.Error404}>
      <div className={classes.Container}>
        <div className={classes.Content}>
          <h2>404</h2>
          <h4>Opps! Page not found</h4>
          <p>
            The page you were looking for doesn't exist. You may have mistyped
            the the address or the page may have moved.
          </p>
          <NavLink to="/"> Back To Home</NavLink>
        </div>
      </div>
    </div>
  );
}
