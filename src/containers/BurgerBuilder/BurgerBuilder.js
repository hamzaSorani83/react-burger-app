import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/OrderList/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Aux from '../../hoc/Auxiliaire';

export default class BuilderBurger extends Component {
  render() {
    return (
      <Aux>
        <Modal>
          <OrderSummary/>
        </Modal> 
        <Burger/>
        <BuildControls/>
      </Aux>
    )
  }
}