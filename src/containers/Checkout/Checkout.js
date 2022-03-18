import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Routes, Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
  render() {
    return (
      <div>
        <CheckoutSummary />
        <Routes> 
          <Route path='contact-data' element={<ContactData/>}/>
        </Routes>
      </div>
    )
  }
}
