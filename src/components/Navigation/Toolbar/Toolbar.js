import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

export default function Toolbar( { showSideDrawer,handleDrawerToggle } ) {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle handleDrawerToggle={handleDrawerToggle} />
      <Logo height="80%" />
      <nav className={classes.DesktopOnly}>
        <NavigationItems  />
      </nav>
    </header>
  );
}
