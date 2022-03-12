import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/OrderList/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Aux from '../../hoc/Auxiliaire/Auxiliaire';
import { BurgerContext } from '../../BurgerBuilderContext';
import Spinner from '../../components/OrderList/Spinner/Spinner'

export default class BuilderBurger extends Component {
  static contextType = BurgerContext;
  render() {
    const loading = this.context.loading;
    return (
      <Aux>
        <Modal>
          {loading ? <Spinner/> : <OrderSummary/>}
        </Modal> 
        <Burger/>
        <BuildControls/>
      </Aux>
    )
  }
}