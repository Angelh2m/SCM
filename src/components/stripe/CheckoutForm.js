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
            active: '',
            isLoggedin: false,
        }
        this.selection = this.selection.bind(this)
        this.isUserLoggedIn = this.isUserLoggedIn.bind(this)
    }

    handleSubmit = async (ev) => {
        ev.preventDefault()

        const userToken = localStorage.getItem(STORAGE_NAME);

        const stripeToken = await this.props.stripe.createToken({ type: 'card', name: 'Jenny Rosen' })
            .then(resp => resp)

        const response = await MakePayment(userToken, stripeToken.token.id, "400");

        console.warn(response);
        if (response.ok === true) {
            /* *
            *  HANDLE SUCCESS SCREEN
            */
        }

    }

    selection($event) {
        console.warn($event.target.id)
        this.setState({ active: $event.target.id })
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

                {this.state.isLoggedin && (<h2> This payment will be credited for: </h2>)}

                <div className={this.state.isLoggedin ? 'option' : 'register'}>
                    <SocialLogin updateLogin={flag => this.isUserLoggedIn(flag)} />
                </div>

                {this.state.isLoggedin && (
                    <div>
                        <div className="col-65">
                            <h2>Select your membership:</h2>
                            <div className="option">
                                <div className={optionPackage} id="1" onClick={this.selection} >
                                    $49 Online consultation
                                </div>
                                <div className={optionPackage2} id="2" onClick={this.selection} >
                                    $39 In person consultation
                                </div>
                            </div>
                            <h2>Payment information:</h2>
                            <div className="payment__form">
                                <form onSubmit={this.handleSubmit}>
                                    <label>Nanme</label>
                                    <input type="text" placeholder="Name" />
                                    <label>
                                        <CardSection />
                                    </label>
                                    <button className="button__purple">Submit payment</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <div
                    className={this.state.isLoggedin ? 'col-35 order-summary' : 'hidden'}
                >
                    {!this.state.active && (
                        <div>
                            <h2>Select your memebership</h2>
                        </div>
                    )}

                    {this.state.active && (
                        <div>
                            <h3>Order Summary</h3>
                            <div>
                                {/* <span>CARD</span> */}
                                <div className="order-summary__details">
                                    <span className="order-summary--label">
                                        {this.state.active === '1' ? 'Online consultation' : ''}
                                        {this.state.active === '2' ? 'In person consultation' : ''}
                                    </span>
                                    <strong>
                                        {this.state.active === '1' ? '$39' : ''}
                                        {this.state.active === '2' ? '$49' : ''}
                                    </strong>
                                </div>
                            </div>

                            <div>
                                <hr />
                                <div className="order-summary__details">
                                    <strong>Total</strong>
                                    <strong>
                                        {this.state.active === '1' ? `$${39} ` : ''}
                                        {this.state.active === '2' ? `$${49} ` : ''}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
export default injectStripe(CheckoutForm)
