import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import CardSection from './CardSection'
import Login from '../login/login'

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

    handleSubmit = ev => {
        // We don't want to let default form submission happen here, which would refresh the page.
        ev.preventDefault()

        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.
        // this.props.stripe.createToken({ name: 'Jenny Rosen' }).then(({ token }) => {
        //     console.log('Received Stripe token:', token);
        // });

        // However, this line of code will do the same thing:
        try {
            this.props.stripe
                .createToken({ type: 'card', name: 'Jenny Rosen' })
                .then(({ token }) => {
                    console.log('Received Stripe token:', token)
                })
        } catch (error) {
            console.log(error)
        }

        // You can also use createSource to create Sources. See our Sources
        // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
        //
        // this.props.stripe.createSource({
        //     type: 'card', owner: {
        //         name: 'Jenny Rosen'
        //     }
        // }).then(({ token }) => {
        //     console.log('Received Stripe token:', token);
        // });
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
        return (
            <div>

                {this.state.isLoggedin && (
                    <h2>This payment will be credited for:</h2>
                )}

                <div className={this.state.isLoggedin ? 'option' : 'register'}>
                    <Login updateLogin={flag => this.isUserLoggedIn(flag)} />
                </div>

                {this.state.isLoggedin && (
                    <div>
                        <div className="col-65">
                            <h2>Select your membership:</h2>
                            <div className="option">
                                <div
                                    className={
                                        this.state.active == '1'
                                            ? 'option-package--active'
                                            : 'option-package'
                                    }
                                    id="1"
                                    onClick={this.selection}
                                >
                                    12 Months Support
                </div>
                                <div
                                    className={
                                        this.state.active == '2'
                                            ? 'option-package--active'
                                            : 'option-package'
                                    }
                                    id="2"
                                    onClick={this.selection}
                                >
                                    6 Months Support
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
                                        {this.state.active == '1' ? '12 Months' : ''}
                                        {this.state.active == '2' ? '6 Months' : ''}
                                    </span>
                                    <strong>
                                        {this.state.active == '1' ? '$39' : ''}
                                        {this.state.active == '2' ? '$49' : ''}
                                    </strong>
                                </div>
                            </div>

                            <div>
                                <hr />
                                <div className="order-summary__details">
                                    <strong>Total</strong>
                                    <strong>
                                        {this.state.active == '1' ? `$${39 * 12} ` : ''}
                                        {this.state.active == '2' ? `$${49 * 6} ` : ''}
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
