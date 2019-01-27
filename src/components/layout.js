import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.scss'
import M_header from './marketing/M_header';
import M_body from './marketing/M_body';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <header className="marketing">
          {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
          <M_header />
        </header>

        <div className="container">
          <M_body />
          {children}
        </div>
        <footer>
          © {new Date().getFullYear()}, Doctor
            {` `}
          <a href="#">Care</a>
        </footer>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
