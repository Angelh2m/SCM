import React, { Component } from 'react'

import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import './login.scss'
import googleIcon from '../../images/icons/google.png'
import Form from './Form'
// import { ENDPOINTS } from '../../services/apiCalls'
// import './Sociallogin.scss'
import { STORAGE_NAME } from '../../util/validators'

export default class Login extends Component {
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
    }

    componentDidMount() {
        const userData = localStorage.getItem(STORAGE_NAME)
        try {
            if (userData) {
                this.setState({ userLoggedIn: true })
                this.setState({
                    userData: JSON.parse(localStorage.getItem(STORAGE_NAME)),
                })
            }
        } catch (error) { }
    }

    logUserOut() {
        localStorage.removeItem(STORAGE_NAME)
        this.handleUserLogin(false)
    }

    async responseFacebook(response) {
        if (response.error) {
            return
        }
        let userSchema = {
            name: response.name,
            firstName: response.name,
            lastName: response.name,
            email: response.email,
            avatar: response.picture.data.url,
            socialID: response.userID,
            exp: response.expiresIn,
        }

        localStorage.setItem(STORAGE_NAME, JSON.stringify(userSchema))
        this.setState({ userData: userSchema, errors: [] })
    }

    componentClicked(res) { }

    async responseGoogle(response) {
        let userSchema
        if (response.error) {
            return
        }

        if (response && !response.error) {
            userSchema = {
                name: response.profileObj.name,
                firstName: response.profileObj.givenName,
                lastName: response.profileObj.familyName,
                email: response.profileObj.email,
                avatar: response.profileObj.imageUrl,
                socialID: response.googleId,
                exp: response.expires_at,
            }
        }
        console.warn(userSchema)

        // _Save users information to DB
        localStorage.setItem(STORAGE_NAME, JSON.stringify(userSchema))

        this.handleUserLogin(true)
        this.setState({ userData: userSchema })
    }

    handleUserLogin(flag) {
        this.props.updateLogin(flag)
        this.setState({ userLoggedIn: flag })
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
                                <button
                                    className="button--facebook"
                                    onClick={renderProps.onClick}
                                >
                                    {' '}
                                    Login With Facebook{' '}
                                </button>
                            )}
                        />

                        <GoogleLogin
                            clientId="431810918658-gedmt7omgjmlk18vgb50g2eqjvr8ln4q.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            render={renderProps => (
                                <button
                                    className="button--google"
                                    onClick={renderProps.onClick}
                                >
                                    <img
                                        className="google__login--image"
                                        src={googleIcon}
                                        alt=""
                                    />
                                    <span className="google__text"> Login with Google</span>
                                </button>
                            )}
                        />

                        <Form updateLogin={() => this.handleUserLogin(true)} />
                    </div>
                )}

                {this.state.userData && this.state.userLoggedIn && (
                    <>
                        <div className="container--flex comments__header-format">
                            <img
                                className="form-comments__avatar"
                                src={this.state.userData.avatar}
                                alt=""
                            />
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
