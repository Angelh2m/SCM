import React, { Component } from 'react'
import check from './check-mark.svg'
import map from './map.svg'
import DATA from '../../content/marketingPage.json'
import './MarkBody.scss'
import { Link } from 'gatsby'

export default class MarkBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      name: '',
      email: '',
      question: '',
      isSent: false,
    }

    this.formValidate = this.formValidate.bind(this)
    this.submitQuestion = this.submitQuestion.bind(this)
    this.search = this.search.bind(this)
  }

  formValidate(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })

    const validator = (name, error) => {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [name]: error,
        },
      }))
    }

    if (e.target.name === 'name' && this.state.name.length < 3) {
      validator('name', 'Please type your first name and last name')
    }
    if (e.target.name === 'name' && this.state.name.length > 3) {
      validator('name', '')
    }

    if (e.target.name === 'email' && this.state.email.length < 3) {
      validator('email', 'Please enter a valid e-mail')
    }
    if (e.target.name === 'email' && this.state.email.length > 3) {
      validator('email', '')
    }
  }

  submitQuestion() {
    // console.warn(this.state);
    try {
      this.setState({ isSent: true })
      if (
        this.state.errors.name.length === '' &&
        this.state.errors.email.length === ''
      ) {
        return fetch(
          'https://xcp50czy8i.execute-api.us-east-1.amazonaws.com/dev/api',
          {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify({ location: 'HY' }), // body data type must match "Content-Type" header
          }
        )
          .then(response => response.json())
          .then(resp => {
            console.warn(resp)
            this.setState({ isSent: true })
          })
      }
    } catch (error) {}
  }

  search(e) {
    const surgeries = [
      'Hand Surgery Orthopaedic Surgery',
      'Hand Surgeons',
      'Shoulder Surgeons',
      'Knee Surgeons',
      'Hip Surgeons',
      'Spine Surgeons',
      'Sports Medicine',
      'Orthopedic Oncology',
      'Hand Surgery Plastic Surgery',
    ]

    const searchTerm = e.target.value
    let results = []
    if (surgeries) {
    }
    surgeries.forEach(el => {
      if (el.toUpperCase().includes(searchTerm.toUpperCase())) {
        results.push(el)
      }
    })
    this.setState({ results })

    if (searchTerm.length < 1) {
      this.setState({ results: [] })
    }
    console.warn(this.state)
  }

  render() {
    const cardStyle =
      this.state.results.length > 0 ? 'available-doctors--card' : ' '

    return (
      <div>
        <article className="row layout__map">
          <div className="col-6 ">
            <h2 className="text--title">
              {' '}
              <strong>Why our </strong> service{' '}
            </h2>
            <ul>
              <li>
                <img className="icon--check" src={check} alt="" />
                No insurance is needed
              </li>
              <li>
                <img className="icon--check" src={check} alt="" />
                Our service is available 24/7
              </li>

              <li>
                <img className="icon--check" src={check} alt="" />
                Forget about copays and unexpected charges
              </li>
              <li>
                <img className="icon--check" src={check} alt="" />
                We work only the highly experienced doctors from Mexico
              </li>
            </ul>
          </div>

          <div className="col-6 spacer">
            <img src={map} alt="" />
          </div>
        </article>

        <article>
          <h2 className="text--title">
            {' '}
            <strong>Our main</strong> goal
          </h2>
          <div className="row spacer ">
            <div className="background--gray" />
            <div className="text--quote">
              <p>
                {' '}
                We are a group of surgeons with decades of experience with one
                goal in common -- provide the most affordable and high quality
                healthcare for everyone{' '}
              </p>
            </div>
          </div>
        </article>

        <article>
          <h2 className="text--title">
            {' '}
            <strong>When to </strong> use it ?
          </h2>
          <div className="row">
            <div className="">
              <h2 className="title--green">Online Consultations</h2>
              <p> {DATA.ONLINE_CONSULTATIONS} </p>
            </div>
            {/* <div className="col-6">
                        IMAGE HRE
                    </div> */}
          </div>
          <div className="row">
            {/* <div className="col-6">
                        <span>IMAGE HERE</span>
                    </div> */}
            <div className="">
              <h2 className="title--green">Major surgery prodedures</h2>
              <p> {DATA.SURGERY_TRAVEL}</p>
              <ul>
                <li>{DATA.SURGERY_T_ONE} </li>
                <li>{DATA.SURGERY_T_TWO} </li>
                <li>{DATA.SURGERY_T_THREE} </li>
              </ul>
            </div>
          </div>
        </article>

        <article>
          <h2 className="text--title">
            {' '}
            <strong>Available </strong>Doctors
          </h2>
          <div className="row ">
            <div className="available-doctors">
              <div className="background--overlay" />
              <div className="background--whitesmoke" />
              <h3>Are you looking for a sppecific specialist?</h3>
              <input
                type="text"
                placeholder="Search for a specialist..."
                onFocus={this.search}
                onChange={this.search}
                className="form--search"
              />
              <div className={cardStyle}>
                {this.state.results.map((res, i) => (
                  <div key={i} className="available-doctors--card--single">
                    <h2>
                      {res}
                      <span>Available</span>
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article>
          <h2 className="text--title">
            {' '}
            <strong>Affordable </strong>Pricing
          </h2>
          <div className="row">
            <div className="col-6">
              <div className="subscription subscription__card--one ">
                <div className="subscription__container">
                  <h3>1 Year suppport</h3>
                  <span className="subscription__price">
                    $39 <small>per month</small>{' '}
                  </span>
                  <Link className="subscription__button" to="/payments">
                    Sing Up
                  </Link>
                </div>
                <p className="subscription__footer">
                  Subscription does not cover medical expenes or medications
                </p>
                <div className=" subscription__card--one-b " />
              </div>
            </div>
            {/*  */}

            <div className="col-6">
              <div className="subscription subscription__card--two ">
                <div className="subscription__container">
                  <h3>6 Months suppport</h3>
                  <span className="subscription__price">
                    $49 <small>per month</small>{' '}
                  </span>
                  <Link className="subscription__button--blue " to="/payments">
                    Sing Up
                  </Link>
                </div>
                <p className="subscription__footer">
                  Subscription does not cover medical expenes or medications
                </p>
                <div className=" subscription__card--two-b " />
              </div>
            </div>
          </div>
        </article>

        <article className="full-witdh">
          <div className="container">
            <h2 className="text--title">
              {' '}
              <strong>Any</strong> questions?
            </h2>
          </div>
          <div className="background--blue" />
          <div className="row-abs">
            {!this.state.isSent && (
              <form className="form">
                <div className="">
                  <label>Name</label>
                  {this.state.errors &&
                    this.state.errors.name &&
                    this.state.errors.name && (
                      <span>{this.state.errors.name}</span>
                    )}
                  <input
                    onChange={this.formValidate}
                    onFocus={this.formValidate}
                    name="name"
                    type="text"
                  />
                </div>

                <div className="">
                  <label>Email</label>
                  {this.state.errors &&
                    this.state.errors.email &&
                    this.state.errors.email && (
                      <span>{this.state.errors.email}</span>
                    )}
                  <input
                    onChange={this.formValidate}
                    onFocus={this.formValidate}
                    name="email"
                    type="email"
                  />
                </div>
                <div className="">
                  <label>Comment</label>
                  <textarea
                    onChange={this.formValidate}
                    onFocus={this.formValidate}
                    name="question"
                  />
                </div>
                <div className=" text--center">
                  <button
                    onClick={this.submitQuestion}
                    className="button--green"
                    type="button"
                  >
                    Ask Question
                  </button>
                </div>
              </form>
            )}

            {this.state.isSent && (
              <form className="form">
                <div className="confirmation">
                  <h2>THANK YOU!</h2>
                  <p>Your question has been succesfully submitted</p>
                </div>
              </form>
            )}
          </div>
        </article>
      </div>
    )
  }
}
