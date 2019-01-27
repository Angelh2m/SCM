import React from 'react'
import MarketingLayout from '../components/marketing/MarketingLayout'
import SEO from '../components/seo'

import './index.scss';

const IndexPage = () => (
  <MarketingLayout >
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
  </MarketingLayout>
)

export default IndexPage
