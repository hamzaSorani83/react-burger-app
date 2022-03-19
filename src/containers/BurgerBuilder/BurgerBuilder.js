import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/OrderList/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Aux from '../../hoc/Auxiliaire/Auxiliaire';
import withNavigate from '../../hoc/withNavigate';

class BurgerBuilder extends Component {
  state = {
    showModal: false,
  };

  purchaseCancelHandler = () => {
    console.log('test')
    this.setState({ showModal: false });
  };

  purchaseContinueHandler = () => {
    console.log('test')
    this.props.navigate("/checkout");
  };

  handleOrderNow = () => {
    this.setState({showModal: true})
  };

  render() {
    return (
      <Aux>
        <Modal
          purchaseCancelHandler={this.purchaseCancelHandler}
          showModal={this.state.showModal}
        >
          <OrderSummary
            purchaseCancelHandler={ this.purchaseCancelHandler }
            purchaseContinueHandler={ this.purchaseContinueHandler }
          />
        </Modal>
        <Burger />
        <BuildControls handleOrderNow={this.handleOrderNow} />
      </Aux>
    );
  }
}

export default withNavigate(BurgerBuilder)