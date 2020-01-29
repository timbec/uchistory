consistent problem when adding plugins - npm seems to fuck up. Get error 'react not found/installed'. Totally annoying. 

Found some kind of solution here: https://github.com/gatsbyjs/gatsby/issues/18048

ended up running `yarn` (or `yarn install`) and got it running again. One of the reasons I'm a little leary of Gatsby.js

To enable the reading of the markdown (content/blog) files, we installed the following plugin: 

```
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `post`, 
        path: `${__dirname}/src/content/blog`,
      }
    },
    ```
We also just install a markdown plugin: gatsby-mdx:

 `npm install --save gatsby-mdx @mdx-js/mdx @mdx-js/react`

 However, this does not work. No 'allMdx' shows up in `GraphiQL` as per the video. So a poster @https://javascriptforwp.com/forums/topic/gatsby-basics-gatsby-mdx-is-depreciated-use-gatsby-plugin-mdx-instead/#post-117589 recommends: 

 `npm install –-save gatsby-plugin-mdx @mdx-js/mdx @mdx-js/react`

 Now, after running `yarn` again (should I just use yarn for everything, instead of npm?), `allMdx` shows up in GraphiQL, and the following query produces our data: 

 ```
 query MyQuery {
  allSite {
    edges {
      node {
        id
      }
    }
  }
  allMdx {
    edges {
      node {
        excerpt
        frontmatter {
          title
        }
        rawBody
      }
    }
  }
}
```

However, I downloaded the blog starter theme and this makes no mention of MDX (or any other markdown plugin) so wonder if this is even necessary, since the mdx plugin has apparently been deprecated. I don't think Zac is updating these properly. And we get our error again. Ran `yarn install` to resolve it. Do I have to do this every time I install a new plugin?
In the docs they make no mention of this plugin, and only mention `gatsby-transformer-remark` which is in the starter theme by default: 
https://www.gatsbyjs.org/docs/recipes/transforming-data

Also, blog-starter has the content in root, where Zac has it in source (and didn't seem to realize why his original /content/blog) path didn't work. So I think the standard is 
'content/blog'

As an aside, a link for adding tags, if not categories, to blog posts: https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/