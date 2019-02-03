import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import './header.scss'

const Header = ({ siteTitle }) => (
  <header>
    <nav>
      <p className="header--w">
        <Link to="/">
          {' '}
          <strong> Doctor </strong> Care <small>MX</small>
        </Link>
      </p>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
