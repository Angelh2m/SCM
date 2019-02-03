import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './doctor-consultations.scss'

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <div className="background-charcoal" />
    <div className="marketing__header">
      <p className="logo">
        <Link to="/">
          {' '}
          <strong> Doctor </strong> Care <small>MX</small>
        </Link>
      </p>
    </div>
    <div className="login">
      <div className="login__tabs text-center">
        <h2>Free trial</h2>
        {/* <h2>Existing members</h2> */}
      </div>

      <form>
        <label>Name: </label>
        <input type="text" name="name" />
        <label>Email: </label>
        <input type="email" name="email" />
        <button className="button--send" type="button">
          SEND
        </button>
      </form>
    </div>
  </Layout>
)

export default SecondPage
