import React,{ Component } from 'react';
import classes from './IngredientControls.module.css'

export default class IngredientController extends Component {
  render() {
    return (
      <div className={ classes.BuildControl }>
        <div className={classes.Label}>{ this.props.label }: </div>
        <button className={classes.Less}
          disabled={this.props.isDisabled}
          onClick={ this.props.handleRemoveIngredient }>
          Less</button>
        <button  className={classes.More}
          onClick={ this.props.handleAddIngredient }>More</button>
      </div>
    )
  }
}
