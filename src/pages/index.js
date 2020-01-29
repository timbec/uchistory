import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <p>Welcome to the new and improved Uranium City History site.</p>
  
      <Image />
    <Link to="about">About This Site</Link>
  </Layout>
)

export default IndexPage
