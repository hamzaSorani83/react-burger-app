import React, { Component } from 'react';

import Spinner from '../../../components/OrderList/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import { BurgerContext } from '../../../BurgerBuilderContext';

class ContactData extends Component {
    static contextType = BurgerContext;
    
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    // orderHandler = ( event ) => {
    //     event.preventDefault();
    //     this.setState( { loading: true } );
    //     const order = {
    //         ingredients: this.props.ingredients,
    //         price: this.props.price,
    //         customer: {
    //             name: 'Max Schwarzmüller',
    //             address: {
    //                 street: 'Teststreet 1',
    //                 zipCode: '41351',
    //                 country: 'Germany'
    //             },
    //             email: 'test@test.com'
    //         },
    //         deliveryMethod: 'fastest'
    //     }
    //     axios.post( '/orders.json', order )
    //         .then( response => {
    //             this.setState( { loading: false } );
    //             this.props.history.push('/');
    //         } )
    //         .catch( error => {
    //             this.setState( { loading: false } );
    //         } );
    // }
    orderHandler = ( e ) => {
        e.preventDefault();
        console.log( this.context.ingredients );
        const order = {
            ingredients: {...this.context.ingredients},
        }
        axios.post('orders.json', order)
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <button className={`${ classes.Button } ${ classes.Success }`} onClick={this.orderHandler}>ORDER</button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;