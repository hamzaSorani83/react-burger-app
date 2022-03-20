import React,{ Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders'
import Error404 from './components/Error404/Error404';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={<BurgerBuilder />} />
              <Route path='/Orders' element={<Orders />} />
              <Route path='checkout/*' element={ <Checkout /> } />
              <Route path='*' element={<Error404/>} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    )
  }
}
