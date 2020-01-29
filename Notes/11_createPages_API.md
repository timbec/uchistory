# Using the createPages API

- lets us dynamically create pages in the node configuration file. 
- We're going to grap our posts, using a GraphQl query, then tell each of them to create a template using a a static page. 
- Template is something we tell Gatsby to create pages taht look the same. 
- create 'templates' folder (because may have more than one) then create template files inside: 
Inside `post.js`, on a most basic level: 
```
import React from 'react'; 
import Layout from '../components/layout'; 

const PostTemplate = () => (
    <Layout>
        <h1>Post Title</h1>
        <p>Post content . . . </p>

    </Layout>
)

export default PostTemplate; 
```

Then, in gatsby-node.js we create the configuration. Essentially, we run our query, then we want to create our page with the template structure we just set up. 

- Unfortunately, this not only doesn't work but is kind of confusing. Zac's slipping on this one. See documenation for other examples. 
- Essentially, this is a dynamic template that takes our data and outputs it in the desired format. 

Switched over to gatsby-starter-blog so I can follow along and hopefully see what's going on: 



The docs: https://www.gatsbyjs.org/docs/api-files-gatsby-node/

From the DOCS: 

- code in `gatsby-node.js` is run once in the process of building the site (`gatsby build`). It can be used to dynamically create pages, add nodes in GraphQL, or respond to events during the build lifecycle. 

- uses some built in *Hooks* (I think they're hooks). For example: 

`reporter` is passed as a spread operator (is this accurate??) into the `onPostBuild` function, to log info to the console (*why is this different from console.log*) when build is finished. 

`actions` and `graphql` are passed into `createPages`. The `createPage` object is 'unbundled` (extracted) from 'actions', and `graphql` is used to construct the query. 
```
const path = require(`path`)
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}
// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const result = await graphql(`
    query {
      allSamplePages {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `)
  result.data.allSamplePages.edges.forEach(edge => {
    createPage({
      path: `${edge.node.slug}`,
      component: blogPostTemplate,
      context: {
        title: edge.node.title,
      },
    })
  })
}
```
## Gatsby Node Helpers
From https://www.gatsbyjs.org/docs/node-api-helpers/: 

- The first argument passed to each of the Gatsby Node APIs is an object containing a set of helpers. Helpers shared by Gatsby's Node APIs are documented in the **Shared Helpers** section: 
```
exports.createPages = gatsbyNodeHelpers => {
  const { actions, reporter } = gatsbyNodeHelpers
  // use helpers
}
```
Convention is to destructure (unbundle) helpers in argument list: 
```
exports.createPages = ({ actions, reporter }) => {
  // use helpers
}
```

Helper Examples: 
>`actions { Actions }` - Collection of functions used to programmactically modify Gatsby's internal state. Ref (https://www.gatsbyjs.org/docs/actions/)

> Gatsby uses **Redux** INTERNALLY to manage state. When you implement a Gatsby API, you are passed a collection of actions (equivalent to actions bound with `bindActionCreators` in redux) which you can use to manipulate state on your site. 

> The object `actions` contains the functions and these can be individually extracted by using *destructuring*: 
```
// For function createNodeField
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
}
```

`reporter` - set of utilities to output information to user
- https://www.gatsbyjs.org/docs/node-api-helpers/#reporter

## Continuing with Zac's Course: 

This section confused me. In `posts.forEach(post => {})`: 
```
context: {
        title: edge.node.title,
      },
```

- this uses the React **Context API** (though not clear how just yet)


