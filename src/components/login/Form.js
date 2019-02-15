import React, { Component } from 'react'
import { STORAGE_NAME } from '../../util/validators'
import { RegisterUser } from '../../util/service_calls'
import { Login, newPassword, recoverPassword } from '../../util/service_calls'

export default class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: "login",
            token: "",
            userData: {},
            isUserRegistered: false,
            errors: {
                name: '',
                email: '',
                password: '',
                password1: '',
            },
        }
        this.validate = this.validate.bind(this)
        this.formType = this.formType.bind(this)
        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
        this.setNewPass = this.setNewPass.bind(this)
        this.recover = this.recover.bind(this)
    }

    componentDidMount() {
        const userData = localStorage.getItem(STORAGE_NAME)
        if (userData) {
            this.props.updateLogin()
        }
        console.log();
        if (window.location.search.includes("recover")) {
            this.setState({ type: "recover" })
            this.setState({ token: window.location.search.split("=")[1] })
        }



    }

    validate($event) {
        // Handle the success LOGIN


        this.setState({ [$event.target.name]: $event.target.value })

        const validator = (name, error) => {
            this.setState(prevState => ({
                errors: { ...prevState.errors, [name]: error },
            }))
        }

        if (
            (this.state.name === '' && this.state.name.length < 3) ||
            $event.target.name === this.state.name
        ) {
            validator('name', 'The name should have at least 3 characters')
        } else {
            validator($event.target.name, '')
        }

        if (this.state.email === '' && this.state.email.includes('@') !== true) {
            validator('email', 'This email seems not to be valid')
        } else {
            validator($event.target.email, '')
        }

        if (this.state.password === '' && this.state.password.length < 6) {
            validator('password', 'Your password should be at least 6 characters')
        } else {
            validator($event.target.password, '')
        }

        if (this.state.password1 === '' || this.state.password1 !== this.state.password
        ) {
            validator('password1', 'Your password does not match')
        } else {
            validator($event.target.password1, '')
        }
    }

    async register() {
        const payload = { name: this.state.name, email: this.state.email, password: this.state.password }
        const response = await RegisterUser(payload).then(resp => resp);
        console.warn(response);

        if (response && response._id) {
            /* ***  SUCCESS LOGGED IN */
            this.setState({ isUserRegistered: true })
        }
    }

    async login() {
        const payload = { email: this.state.email, password: this.state.password }
        const response = await Login(payload)
        console.warn(response);
        if (response.token) {
            localStorage.setItem(STORAGE_NAME, JSON.stringify(response.token));
            this.props.updateLogin(true)
        }
    }

    async recover() {
        const payload = { email: this.state.email }
        const response = await recoverPassword(payload);
        console.warn(response);
    }

    async setNewPass(event) {
        console.log(this.state);
        const payload = { password: this.state.password }
        const response = await newPassword(payload, this.state.token);
        console.warn(response);
    }

    formType(type) {
        console.warn(type);
        this.setState({ type: type, errors: {}, isUserRegistered: false })
    }



    render() {
        return (
            <>
                <div>

                </div>
                <div>
                    <ul className="tabs">
                        <li className={this.state.type === "login" ? "active" : null} onClick={() => this.formType("login")}>LOGIN</li>
                        <li className={this.state.type === "register" ? "active" : null} onClick={() => this.formType("register")} >REGISTER</li>
                    </ul>
                </div>


                {this.state.type == "recoverPassword" && (
                    <div className="login--form">
                        <h2>Recover your password</h2>
                        <label>Registered email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={this.validate}
                            onChange={this.validate}
                            onBlur={this.validate}
                        />
                        {this.state.errors && this.state.errors.password ? (
                            <small>{this.state.errors.password}</small>
                        ) : null}

                        <button className="button__purple" onClick={this.recover}>Recover password</button>

                    </div>
                )}


                {this.state.type === "recover" && (
                    <div className="login--form">
                        <h2>Set your new password</h2>
                        <label>Password</label>
                        <input
                            type="Password"
                            name="password"
                            onChange={this.validate}
                            onChange={this.validate}
                            onBlur={this.validate}
                        />
                        {this.state.errors && this.state.errors.password ? (
                            <small>{this.state.errors.password}</small>
                        ) : null}

                        <label>Confirm password</label>
                        <input
                            type="Password"
                            name="password1"
                            onChange={this.validate}
                            onChange={this.validate}
                            onBlur={this.validate}
                        />
                        {this.state.errors && this.state.errors.password1 ? (
                            <small>{this.state.errors.password1}</small>
                        ) : null}



                        <button className="button__purple" onClick={this.setNewPass}>Set new password</button>

                    </div>
                )}

                {this.state.type === "login" && (
                    <div className="login--form">
                        <label>Password</label>
                        <input
                            type="email"
                            name="email"
                            onChange={this.validate}
                            onChange={this.validate}
                            onBlur={this.validate}
                        />


                        <label>Confirm password</label>
                        <input
                            type="Password"
                            name="password"
                            onChange={this.validate}
                            onChange={this.validate}
                            onBlur={this.validate}
                        />

                        <a className={this.state.type === "recoverPassword" ? "active" : null} onClick={() => this.formType("recoverPassword")} >Forgot password</a>

                        <button className="button__purple" onClick={this.login}>Login</button>

                    </div>
                )}


                {this.state.isUserRegistered && (
                    <div className="login--form">
                        <div className="success--confirmation">
                            <h2>Success</h2>
                            <p>You have been successfully registed</p>
                        </div>
                    </div>
                )}

                {
                    this.state.type === "register" && !this.state.isUserRegistered && (
                        <div className="login--form">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                onKeyUp={this.validate}
                                onChange={this.validate}
                                onBlur={this.validate}
                            />
                            {this.state.errors && this.state.errors.name ? (
                                <small>{this.state.errors.name}</small>
                            ) : null}

                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                onKeyUp={this.validate}
                                onChange={this.validate}
                                onBlur={this.validate}
                            />
                            {this.state.errors && this.state.errors.email ? (
                                <small>{this.state.errors.email}</small>
                            ) : null}

                            <label>Password</label>
                            <input
                                type="Password"
                                name="password"
                                onChange={this.validate}
                                onChange={this.validate}
                                onBlur={this.validate}
                            />
                            {this.state.errors && this.state.errors.password ? (
                                <small>{this.state.errors.password}</small>
                            ) : null}

                            <label>Confirm password</label>
                            <input
                                type="Password"
                                name="password1"
                                onChange={this.validate}
                                onChange={this.validate}
                                onBlur={this.validate}
                            />
                            {this.state.errors && this.state.errors.password1 ? (
                                <small>{this.state.errors.password1}</small>
                            ) : null}

                            <button className="button__purple" onClick={this.register}>Register</button>
                        </div>
                    )
                }


            </>
        )
    }
}
