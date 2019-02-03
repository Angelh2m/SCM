import React, { Component } from 'react'
import { STORAGE_NAME } from '../../util/validators'


export default class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: "register",
            userData: {},
            errors: {
                name: '',
                email: '',
                password: '',
                password1: '',
            },
        }
        this.register = this.register.bind(this)
        this.formType = this.formType.bind(this)
    }

    componentDidMount() {
        const userData = localStorage.getItem(STORAGE_NAME)
        if (userData) {
            this.props.updateLogin()
        }
    }

    register($event) {
        // Handle the success LOGIN
        this.props.updateLogin()

        this.setState({
            [$event.target.name]: $event.target.value,
        })

        const validator = (name, error) => {
            this.setState(prevState => ({
                errors: { ...prevState.errors, [name]: error },
            }))
        }

        if (
            (this.state.name == '' && this.state.name.length < 3) ||
            $event.target.name == this.state.name
        ) {
            validator('name', 'The name should have at least 3 characters')
        } else {
            validator($event.target.name, '')
        }

        if (this.state.email == '' && this.state.email.includes('@') !== true) {
            validator('email', 'This email seems not to be valid')
        } else {
            validator($event.target.email, '')
        }

        if (this.state.password == '' && this.state.password.length < 6) {
            validator('password', 'Your password should be at least 6 characters')
        } else {
            validator($event.target.password, '')
        }

        if (
            this.state.password1 == '' ||
            this.state.password1 !== this.state.password
        ) {
            validator('password1', 'Your password does not match')
        } else {
            validator($event.target.password1, '')
        }

        /* *
         *  HANDLE API CALL
         */
    }

    formType(type) {

        this.setState({
            type: type
        })

    }

    render() {
        return (
            <>

                <div>
                    <ul className="tabs">
                        <li className={this.state.type == "register" ? "active" : null} onClick={() => this.formType("register")}>REGISTER</li>
                        <li className={this.state.type == "login" ? "active" : null} onClick={() => this.formType("login")} >LOGIN</li>
                    </ul>
                </div>

                {this.state.type === "register" && (
                    <div className="login--form">
                        <label>Email</label>
                        <input
                            type="text"
                            name="name"
                            onKeyUp={this.register}
                            onChange={this.register}
                            onBlur={this.register}
                        />
                        {this.state.errors && this.state.errors.name ? (
                            <small>{this.state.errors.name}</small>
                        ) : null}

                        <label>Password</label>
                        <input
                            type="text"
                            name="email"
                            onKeyUp={this.register}
                            onChange={this.register}
                            onBlur={this.register}
                        />
                    </div>
                )}



                {this.state.type !== "register" && (
                    <div className="login--form">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            onKeyUp={this.register}
                            onChange={this.register}
                            onBlur={this.register}
                        />
                        {this.state.errors && this.state.errors.name ? (
                            <small>{this.state.errors.name}</small>
                        ) : null}

                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            onKeyUp={this.register}
                            onChange={this.register}
                            onBlur={this.register}
                        />
                        {this.state.errors && this.state.errors.email ? (
                            <small>{this.state.errors.email}</small>
                        ) : null}

                        <label>Password</label>
                        <input
                            type="Password"
                            name="password"
                            onChange={this.register}
                            onChange={this.register}
                            onBlur={this.register}
                        />
                        {this.state.errors && this.state.errors.password ? (
                            <small>{this.state.errors.password}</small>
                        ) : null}

                        <label>Confirm password</label>
                        <input
                            type="Password"
                            name="password1"
                            onChange={this.register}
                            onChange={this.register}
                            onBlur={this.register}
                        />
                        {this.state.errors && this.state.errors.password1 ? (
                            <small>{this.state.errors.password1}</small>
                        ) : null}

                        <button className="button__purple">Register</button>
                    </div>
                )}


            </>
        )
    }
}
