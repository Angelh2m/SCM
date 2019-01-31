import React, { Component } from 'react'
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';


export default class MyStoreCheckout extends Component {

  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    );
  }
}

