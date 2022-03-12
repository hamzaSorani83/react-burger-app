import React from 'react'
import Aux from '../Auxiliaire/Auxiliaire'
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

export default function Layout(props) {
    return ( 
    <Aux >
      <div >
        <Toolbar />
        <SideDrawer />
        , Backdrop
      </div>
      <main className={ classes.Content } >
        { props.children } 
      </main>
      </Aux>
    )
}