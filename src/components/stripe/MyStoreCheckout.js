import React, { Component } from 'react'
import { Elements } from 'react-stripe-elements'
import InjectedCheckoutForm from './CheckoutForm'
import './MyStoreCheckout.scss'

export default class MyStoreCheckout extends Component {
  render() {
    return (
      <div>
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </div>
    )
  }
}
