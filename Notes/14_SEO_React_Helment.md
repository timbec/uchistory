# SEO Metadata with React Helmet

- Because it renders with static files, we don't have the same problem with SPA and web crawlers not being able to read data. 

From the docs: 

> **Helmet** is a reusable React component that will manage all changes to the document head. 
> Helmet *takes* plain HTML tags and *outputs* plain HTML tags. 

(so why is this a good thing? )

`<Helmet></Helmet>`

is `seo.js`, included by default in the blog-starter theme, we see the following: 
`import Helmet from "react-helmet" `

Then the 'description', 'lang', 'meta' and 'title' pulled out of a query: 
```
function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )
  ```

  Then inserted inside the `<Helmet></Helmet>` tag: 

  ```
  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}
```

Then default and regular propTypes (passed into the component from the query): 
```
SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}
```

Then, SEO Helmet is passed into the `blog-post.js` template, for the title and excerpt: 
```
<SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
```

To install from scratch, we need to first install the plugin, then register in `gatsby-config.js`
