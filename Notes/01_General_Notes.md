1) To set up this project, followed the recommended steps (https://www.gatsbyjs.org/docs/quick-start/): 

The repo for Zac's course: https://github.com/zgordon/gatsby-basics

```
npm install -g gatsby-cli
gatsby new uraniumcity-history
cd uraniumcity-history
gatsby develop
```
which will start a hot-reloading dev environment at `localhost:8000`

if you don't specify the theme you want to use, gatsby will use the default starter. 

2) Out of the box, the latest iteration of gatsby comes with folders for components. Actually, the list of what gatsby contains is kind of amazing. Pre-compile node_modules, `.prettierrc` for consisten code formatting, `.gitignore` - you can get up and running pretty quickly. This is the basic page structure: 
```
    ├── node_modules
    ├── src
        |-- components
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md
```

To this, I added a `static` folder inside the `components` directory for files like `header.js` and `footer.js`. 

3) To start I edited the `index.js`. By default, gatsby imports the following files: 
```
import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
```
This shows that by default gatsby includes a layout.js file, which will ensure uniform layout across all pages where `import Layout from "../components/layout"` is included. 

In the `layout.js` file itself, the following are imported by default: 

```
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./static/header"
import Footer from "./static/footer"
import "./styles/global.css"
```

I was suprised to see react imported both here and on the individual pages. The following are (features? Modules?)

- Links
- Pages
- Routing


### 6) GraphQL for Gatsby ###

- In Gatsby, GraphQL is **always** used when querying data. Gatsby can call GraphQL APIs directly. 
- Most data is not going to be in a GraphQL form but Gatsby plugins allow you to get that data in, then transform it into a format that GraphQL can read. 

- What does a GraphQL query look like? 

```
query MyQuery { #main query
    content {   # what to query
        edges { # Connected items
            node {  # A single item
                id # Page ID property
                path # Page slug
            }
        }
    }
}
```

GraphQL is very good at setting up connections between things, which we set up with `edges`. We can be very specific about the content we want and ONLY get that content. 

GraphQL queries return JSON: 

```
{
    "data": {
        "allSitePage": {
            "edges": {
                {
                    "node": {
                        "id": "SitePage/dev-404-page/", 
                        "path": "/dev-404-page"
                    }
                }, 
                {
                    "node": {
                        "id": "SitePage/about/"
                        "path": "/about/"
                    }
                }, 
                {
                    "node": {
                        "id": "SitePage/"
                        "path": "/"
                    }
                }
            }
        }
    }
}
```

GraphQL can also filter and sort: 

```
query NewestPage {
    allSitePage (sort: {order: DESC, fields: id}, limit: 1) {
        edges {
            node {
                id
                path
            }
        }
    }
}
```

Gatsby ships with **GraphiQL** and can be found @ `http://localhost:8000/___qraphql`. There's also another tool that I can't remember now - perhaps it was in a Traversy course? 

GraphiQL comes with four panels (and can be configured to show more or less panels as needed): 
- Explorer, which has a series of nested checked boxes to build queries. 
- The main code window where the actual GraphQL appears (and can be manually edited)
- the JSON window, where the JSON output of the query appears
- Then a Query window, where you can see all the nodes (selections?) available for each query. 

## Where do we put GraphQL queries in Gatsby? ## 

1) `gatsby-node.js` - where we commonly put dynamically created pages - so if we're pulling from a bunch of posts or pages, we'll create a static page here. 
2) `page templates` - can take a slug based on a url then use a query within that template. Run before the build time, or during the build time, so we'll still get a static site. 
3) Also possible to break the queries out into their own templates if our site gets too big. 
4) Can also use queries in any components that need them, though we have a slightly different way we query. 

- can also use GraphQL on the front end of your sites. Up until now, we have talked about how to use GraphQL before the build process, but we can also use it on the front end, as we would run a query with Javascript (say, like, Axios). 

- siteMetaData is set up in gatsby-config.js, where we can set things like title, description, for the whole site. 
- This can be accessed with something called `<StaticQuery>` to query the data, with a data structure that is exactly the same as how we'd use in graphiQL. 


## Things I don't quite understand ## 

- `createPage` - what it is and how to use it. It is setup in `gatsby-node.js` and, as far as I understand it, determines the layout for each individual page. But how is it configured 
- 'useStaticQuery` - how we query data on each individual page, but why use this


## StaticQuery for Site Metadata 

- ?? What is StaticQuery? Used in gatsby-config.js. Used any time we are in a general component any time we want to make a query. The simplest StaticQuery. 

- go into gatsby-config.js. `module.exports`

```
siteMetadata: {
    title: 'uranium city history', 
    description: 'Keeping Uranium City Alive on the web'
}
```
Should have `siteMetadata` in the GrpahiQL with all our data. Then: 
add `import { Link, StaticQuery, graphql } from "gatsby"` to header.js (or wherever you need it)

Then inside Header object (or is it function?)

```
<StaticQuery query={graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `}>

  </StaticQuery>
  ```

  `StaticQuery` is a component. I'm not sure when its appropriate to use it - smaller sites - since the default I'm working off just makes custom queries right inside the `<Header>` component, but it's there as a default. 

  ## Extracting GraphQL Queries into Hooks

  - create a new folder called 'hooks', then a file called, in this case: 'use-sitemetadata.js'. Since we'll be using hooks, we have to import the necessary (packages? modules? ) at the top: 
  `import { useStaticQuery, graphql } from 'gatsby';`

  Then we construct a component like we would with, say `<Header>` or `<Footer>`: 

  ```
  const useSiteMetadata = () => {
    const data = useStaticQuery(graphql`
    {
        site {
            siteMetadata {
                title
                description
            }
        }
    }
    `)
    return data.site.siteMetadata
}

export default useSiteMetadata; 
```

Now, whenever we want to use this, we can import the above, deconstruct (unbundle) it from the object, and use the variables wherever we need to. In this case, footer.js: 

`import useSiteMetadata from '../hooks/use-sitemetadata';`

`const { title, description } = useSiteMetadata(); `

and use `title` and `description` as we wish. This would be useful wherever you have repeating data. 