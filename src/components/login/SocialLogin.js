import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import googleIcon from '../../images/icons/google.png'
import Form from './Form'
import { STORAGE_NAME } from '../../util/validators'
import './SocialLogin.scss'

import { SocialLogin_API } from "../../util/service_calls"

import jwt_decode from "jwt-decode"

export default class SocialLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userData: {},
            errors: {
                name: '',
                email: '',
                password: '',
                password1: '',
            },
            userLoggedIn: false,
        }

        this.logUserOut = this.logUserOut.bind(this)
        this.responseGoogle = this.responseGoogle.bind(this)
        this.responseFacebook = this.responseFacebook.bind(this)
        this.enablePayment = this.enablePayment.bind(this)
        this.readTokenAndEnablePayment = this.readTokenAndEnablePayment.bind(this)
    }


    enablePayment() {
        this.props.updateLogin(true)
        this.enableUserPayment(true)
    }

    logUserOut() {
        localStorage.removeItem(STORAGE_NAME)
        this.enableUserPayment(false)
    }

    enableUserPayment(resp) {
        this.props.updateLogin(resp)
        this.setState({ userLoggedIn: resp })
    }

    readTokenAndEnablePayment(tokenResponse) {
        try {
            const decoded = jwt_decode(JSON.stringify(tokenResponse));
            // *** Default LOGIN
            this.setState({ userData: { name: decoded.name, avatar: decoded.avatar } })
            this.enablePayment();

        } catch (error) { }

    }

    componentDidMount() {
        const userData = localStorage.getItem(STORAGE_NAME);
        this.readTokenAndEnablePayment(userData)
    }



    async responseFacebook(response) {
        if (response.error) { return }

        let userSchema = {
            name: response.name,
            firstName: response.name,
            lastName: response.name,
            email: response.email,
            avatar: response.picture.data.url,
            socialID: response.userID,
            exp: response.expiresIn,
        }

        this.setState({ userData: userSchema, errors: [] })
    }

    componentClicked(res) { }


    async responseGoogle(response) {

        if (response.error) { return }
        let google = response.profileObj;

        const payload = {
            name: google.name,
            firstName: google.givenName,
            lastName: google.familyName,
            email: google.email,
            avatar: google.imageUrl,
            password: google.googleId,
            googleID: google.googleId,
        }

        let resp = await SocialLogin_API(payload)
        localStorage.setItem(STORAGE_NAME, resp.token)
        this.readTokenAndEnablePayment(resp.token)
    }


    render() {
        return (
            <>
                {this.state.userLoggedIn !== true && (
                    <div>
                        <FacebookLogin
                            appId="209211756650633"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={this.componentClicked}
                            callback={this.responseFacebook}
                            icon="icon-facebook"
                            render={renderProps => (
                                <button className="button--facebook" onClick={renderProps.onClick} >
                                    Login With Facebook
                                </button>
                            )}
                        />

                        <GoogleLogin
                            clientId="431810918658-gedmt7omgjmlk18vgb50g2eqjvr8ln4q.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            render={renderProps => (
                                <button className="button--google" onClick={renderProps.onClick} >
                                    <img className="google__login--image" src={googleIcon} alt="" />
                                    <span className="google__text"> Login with Google</span>
                                </button>
                            )}
                        />

                        <Form updateLogin={(resp) => this.enableUserPayment(resp)} />
                    </div>
                )}

                {this.state.userData && this.state.userLoggedIn && (
                    <>
                        <div className="container--flex comments__header-format">
                            <img className="form-comments__avatar" src={this.state.userData.avatar} alt="" />
                            <div className="comments__user">
                                <p>{this.state.userData.name} </p>
                                <span className="link" onClick={this.logUserOut}>  LOGOUT </span>
                            </div>
                        </div>
                    </>
                )}
            </>
        )
    }
}
