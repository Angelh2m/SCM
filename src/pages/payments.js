// import React from 'react'
import React, { Component } from 'react'
import Layout from '../components/layout'
import './doctor-consultations.scss';

import { StripeProvider } from 'react-stripe-elements';
import MyStoreCheckout from '../components/stripe/MyStoreCheckout';

import '../pages/index.scss'

export default class payments extends Component {
    render() {
        return (
            <div className="payments">
                <Layout>
                    <StripeProvider apiKey="pk_test_eHnpnhQF8Y6aaTQu9M6VMAPp">
                        <MyStoreCheckout />
                    </StripeProvider>
                </Layout>
            </div>
        )
    }
}




