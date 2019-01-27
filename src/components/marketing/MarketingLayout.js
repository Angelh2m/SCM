import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import './MarketingLayout.scss'
import MarkHeader from './MarkHeader';
import MarkBody from './MarkBody';

const MarketingLayout = ({ children }) => (
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
          <MarkHeader />
        </header>

        <div className="container">
          <MarkBody />
          {children}
        </div>
        <footer>
          © {new Date().getFullYear()}, Doctor
            {` `}
          <span>Care</span>
        </footer>
      </>
    )}
  />
)

MarketingLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MarketingLayout
