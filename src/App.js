import React,{ Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import BurgerContextProvider from './BurgerBuilderContext';

export default class App extends Component {
  render() {
    return (
      <div>
        <BurgerContextProvider>
          <Layout>
            <BurgerBuilder />
          </Layout>
        </BurgerContextProvider>
      </div>
    )
  }
}
