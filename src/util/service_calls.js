

const RegisterUser = (payload) => {

    return fetch(`http://localhost:4000/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(resp => resp).catch(err => console.log(err))
}

const Login = (payload) => {
    return fetch(`http://localhost:4000/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(response => response)
        .then(resp => resp).catch(err => console.log(err))
}

const SocialLogin_API = (payload) => {
    return fetch(`http://localhost:4000/api/social-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(response => response)
        .then(resp => resp).catch(err => err)
}

const MakePayment = (Usertoken, StripeToken, amount) => {
    // console.warn(Usertoken, StripeToken, amount);

    return fetch(`http://localhost:4000/api/user/payment`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Usertoken,
        },
        body: JSON.stringify({
            type: "NEW_PAYMENT",
            token: StripeToken,
            amount: amount
        }),
    })
        .then(response => response.json())
        .then(response => response)
        .then(resp => resp).catch(err => console.log(err))
}


const newPassword = (payload, token) => {

    return fetch(`http://localhost:4000/api/recover/${token}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: payload.password
        }),
    })
        .then(response => response.json())
        .then(response => response)
        .then(resp => resp).catch(err => console.log(err))
}
const recoverPassword = (payload) => {

    return fetch(`http://localhost:4000/api/recover/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: payload.email
        }),
    })
        .then(response => response.json())
        .then(response => response)
        .then(resp => resp).catch(err => console.log(err))
}

module.exports = {
    RegisterUser,
    Login,
    SocialLogin_API,
    MakePayment,
    newPassword,
    recoverPassword
}
