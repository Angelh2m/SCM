// import React from 'react'
import React, { Component } from 'react'
import Layout from '../components/layout'

import { StripeProvider } from 'react-stripe-elements'
import MyStoreCheckout from '../components/stripe/MyStoreCheckout'


import Header from '../components/Header/header';
import SEO from '../components/seo'

export default class payments extends Component {
  constructor(props) {
    super(props)
    this.state = { stripe: null }
  }
  componentDidMount() {
    if (window.Stripe) {
      // apiKey=""
      this.setState({
        stripe: window.Stripe('pk_test_eHnpnhQF8Y6aaTQu9M6VMAPp'),
      })
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({ stripe: window.Stripe('pk_test_12345') })
      })
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Layout theme="payment--container">
          <SEO title="Make a payment" />
          <div className="container">
            <StripeProvider stripe={this.state.stripe}>
              <MyStoreCheckout />
            </StripeProvider>
          </div>
        </Layout>
      </div>
    )
  }
}
