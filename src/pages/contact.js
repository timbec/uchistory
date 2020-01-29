import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Contact Page" />
    <h1>Contact Me</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
