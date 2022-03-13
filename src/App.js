import React,{ Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import BurgerContextProvider from './BurgerBuilderContext';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders'

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <BurgerContextProvider>
            <Layout>
              <Routes>
                <Route path='/' element={<BurgerBuilder />} />
                <Route path='/burger' element={<BurgerBuilder />} />
                <Route path='/Orders' element={<Orders />} />
              </Routes>
            </Layout>
          </BurgerContextProvider>
        </BrowserRouter>
      </div>
    )
  }
}
