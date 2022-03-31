import React, { useState } from 'react'
import Aux from '../Auxiliaire/Auxiliaire'
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

export default function Layout( props ) {
  const [ showSideDrawer,setShowSideDrawer ] = useState( false );
  
  const handleDrawerToggle = () => {
    setShowSideDrawer(!showSideDrawer);
  };
  
  const handleShowSideDrawer = () => {
    setShowSideDrawer(false);
  };
  
    return (
      <Aux>
        <div>
          <Toolbar
            handleDrawerToggle={ handleDrawerToggle }
          />
          <SideDrawer
            showSideDrawer={ showSideDrawer }
            handleShowSideDrawer={ handleShowSideDrawer }
          />
        </div>
        <main className={classes.Content}>{props.children}</main>
      </Aux>
    );
}