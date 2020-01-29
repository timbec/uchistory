import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import useSiteMetadata from '../hooks/use-sitemetadata'; 



const Footer = () => {
    const { title, description } = useSiteMetadata()
    return (
        <footer>

        <Link to="/">Home</Link>
        <Link to="/about">Aboutbout</Link>

        <h6>{ title }</h6> 
        <p>{ description }</p>

        <p><sup>&copy; {title } 2020</sup></p>
    </footer>
    )
}

export default Footer