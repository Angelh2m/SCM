import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import './layout.scss'
// import '../../scss/index.scss'

const Layout = ({ children, theme }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQueryName {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <header> </header>

        <div className={theme ? theme : 'container'}>{children}</div>

        <footer>
          © {new Date().getFullYear()}, Doctor
          {` `}
          <span>Care</span>
        </footer>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
