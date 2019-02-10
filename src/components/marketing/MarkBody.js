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
    } catch (error) { }
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
              <strong>Why choose</strong> us?{' '}
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
                Forget about co-pays and unexpected charges
              </li>
              <li>
                <img className="icon--check" src={check} alt="" />
                We work with only the most highly experienced doctors from Mexico
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
              <p> {DATA.MISSION} </p>
            </div>
          </div>
        </article>

        <article>
          <h2 className="text--title">
            {' '}
            <strong>When should you use </strong> our service?
          </h2>
          <div className="row">
            <div className="">
              <h2 className="title--green">Online Consultations</h2>
              <p> {DATA.ONLINE_CONSULTATIONS} </p>
            </div>
          </div>
          <div className="row">
            <div className="">
              <h2 className="title--green">Major surgeries</h2>
              {/* <p> {DATA.SURGERY_TRAVEL}</p> */}
              <p> Most of our patients come to us after finding out how much a surgery will cost them in the United States. If you know what surgery you already need, why not come to us and pay a fraction of the price?</p>
              <ul>
                <li>1. <strong>Decision making: </strong> {DATA.SURGERY_T_ONE} </li>
                <li>2. <strong>Traveling to Mexico: </strong> {DATA.SURGERY_T_TWO} </li>
                <li>2. <strong>Return and recovering: </strong>{DATA.SURGERY_T_THREE} </li>
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
              <h3>Search for available and specific specialists</h3>
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
          <p>
            Sign up for a consultation with a doctor. If you are planning on scheduling a surgery OR you just have health-related questions for the doctor, then you will do this/ask your questions during the consultation.

            Choose the in-person consultation only if you are already in Mexico and are able to visit the doctor in-person.
                  </p>
          <div className="row">
            <div className="col-6">
              <div className="subscription subscription__card--one ">
                <div className="subscription__container">
                  <h3>Online consultation</h3>
                  <span className="subscription__price">
                    $49 <small>per consultation</small>{' '}
                  </span>
                  <Link className="subscription__button" to="/payments">
                    Purchase
                  </Link>
                </div>
                <p className="subscription__footer">
                  Consultation fee does not cover medical expenes or medications
                </p>
                <div className=" subscription__card--one-b " />
              </div>
            </div>
            {/*  */}

            <div className="col-6">
              <div className="subscription subscription__card--two ">
                <div className="subscription__container">
                  <h3>In person consultation</h3>
                  <span className="subscription__price">
                    $30 <small>per consultation</small>{' '}
                  </span>
                  <Link className="subscription__button--blue " to="/payments">
                    Purchase
                  </Link>
                </div>
                <p className="subscription__footer">
                  Subscription does not cover medical expenses or medications
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
              <strong>Any questions?</strong> Contact us.
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
