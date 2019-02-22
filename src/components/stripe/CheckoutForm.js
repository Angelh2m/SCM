import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import CardSection from './CardSection'
import SocialLogin from '../login/SocialLogin'
import { STORAGE_NAME } from '../../util/validators';

import { MakePayment } from "../../util/service_calls";

class CheckoutForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isProcessing: false,
            active: '',
            isLoggedin: false,
            paymentSuccessful: false,
            active: '',
            name: '',
            error: ''
        }
        this.selection = this.selection.bind(this)
        this.setName = this.setName.bind(this)
        this.isUserLoggedIn = this.isUserLoggedIn.bind(this)
    }

    handleSubmit = async (ev) => {
        ev.preventDefault()
        let price = 0;

        const userToken = localStorage.getItem(STORAGE_NAME);

        /* *
        *  VALIDATION
        */

        if (!this.state.active || !this.state.name) {
            this.setState({ error: `Please make sure that name and memebership selection is enabled` })
            return console.warn("WARNING", this.state.active, " | ", this.state.name, " | ", this.isLoggedin)
        } else {
            this.setState({ error: null })
        }

        this.setState({ isProcessing: true })

        const stripeToken = await this.props.stripe.createToken({ type: 'card', name: 'AngEl' })
            .then(resp => resp)

        try {
            if (this.state.active == 1) { price = 39 } else { price = 49 }

            const response = await MakePayment(userToken, stripeToken.token.id, price);

            if (response) {
                console.warn(response);
                /* *
                *  HANDLE SUCCESS SCREEN
                */
                this.setState({ isProcessing: false })
                this.setState({ paymentSuccessful: true });
            }
        } catch (error) { }


    }

    selection($event) {
        console.warn($event.target.id)
        this.setState({ active: $event.target.id })
    }

    setName($event) {
        console.warn($event.target.id)
        this.setState({ name: $event.target.value })
    }

    isUserLoggedIn(isLoggedIn) {
        console.warn('isLoggedIn', isLoggedIn)
        this.setState({ isLoggedin: isLoggedIn })
    }

    render() {

        let optionPackage = this.state.active === '1' ? 'option-package--active' : 'option-package';
        let optionPackage2 = this.state.active === '2' ? 'option-package--active' : 'option-package';

        return (
            <div>
                {this.state.paymentSuccessful && (
                    <div className="col-65">
                        <div className="success--alert">
                            <div>Success</div>
                            <div>Your pament has been succesfully made</div>
                            <span>Please visit Link: to open your first cosuntation </span>
                        </div>
                    </div>
                )}
                {!this.state.paymentSuccessful && (

                    <div>
                        <div className="col-65">
                            {this.state.isLoggedin && (<h2> This payment will be credited for: </h2>)}
                        </div>

                        <div className={this.state.isLoggedin ? 'option col-65' : 'register '}>
                            <SocialLogin updateLogin={flag => this.isUserLoggedIn(flag)} />
                        </div>

                        {this.state.isLoggedin && (
                            <div>
                                <div className="col-65">
                                    <h2>Select consultation type:</h2>
                                    <div className="option">
                                        <div className={optionPackage} id="1" onClick={this.selection} >$49 Online consultation</div>
                                        <div className={optionPackage2} id="2" onClick={this.selection} >$39 In person consultation</div>
                                    </div>
                                    <h2>Payment information:</h2>
                                    <div className="payment__form">
                                        <form onSubmit={this.handleSubmit}>
                                            <label>Name</label>
                                            <input type="text" placeholder="Name" onChange={this.setName} />
                                            <label>
                                                <CardSection />
                                            </label>

                                            <div className="order-summary__details">
                                                <strong>Total</strong>
                                                <strong>
                                                    {this.state.active === '1' ? `$${49} ` : ''}
                                                    {this.state.active === '2' ? `$${39} ` : ''}
                                                </strong>
                                            </div>

                                            <button className={' button__purple'}>
                                                Submit payment</button>
                                        </form>



                                        {
                                            this.state.error && (
                                                <div className="alert">{this.state.error}</div>
                                            )
                                        }


                                        {
                                            this.state.isProcessing && (
                                                <div className="processing">We are processing your payment ...</div>
                                            )
                                        }
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>
                )}

            </div>
        )
    }
}
export default injectStripe(CheckoutForm)
