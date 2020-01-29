# Using Gatsby Image 

- Doc Link: https://www.gatsbyjs.org/packages/gatsby-image/

- Demo: https://using-gatsby-image.gatsbyjs.org/

> Speedy, optimized images without the work.

> gatsby-image is a React component specially designed to work seamlessly with Gatsby’s GraphQL queries. It combines Gatsby’s native image processing capabilities with advanced image loading techniques to easily and completely optimize image loading for your sites. gatsby-image uses gatsby-plugin-sharp to power its image transformations.

> Note: gatsby-image is not a drop-in replacement for <img />. It’s optimized for fixed width/height images and images that stretch the full-width of a container. Some ways you can use <img /> won’t work with gatsby-image.

- After defining in `gatsby-config.js`, need to define the path to find our images: 
```
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
```
- Oddly enough, this is defined twice, once for content, the other for assets. Not sure how it tells where to look for content and for assets. 

To find in graphQL: 
```
query MyQuery {
  allImageSharp {
    nodes {
      sizes {
        src
      }
    }
  }
}
```

Now we take the above data into an actual `<Img>` tag: 
```
<Img 
  fixed={data.image.childImageSharp.src}
>
```

However, we need to look at all the options listed in `gatsby-transformer-sharp` and play with them: 
```
query Images {
  image: file(relativePath: { eq: "some-image.jpg" }) {
    id 
    childImageSharp {
      fixed (
        width: 400) {
        /// many other effects can be added here - see docs. 
        loading: true, 
        duotone: { hightlight: "#fff", shadow: "#222" }
      } {
        ...GatsbyImageSharpFixed
      }
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
```

Then inside the `return` statement: 
```
<Img 
  fixed: {data.image.childImageSharp.fixed}
  alt="some alt tag"
  />
<Img 
  fluid: {data.image.childImageSharp.fluid}
  alt="some alt tag"
  />
  ```

  ### To get a group of images: 
  query Images {
  image: allFile(filter: {relativePath: { eq: "gallery" }}) {
    id 
    childImageSharp {
      fixed(width: 200) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}
```
Then (this may not be terrible accurate - Zac's sort of all over the place): 
```{data.images.nodes.map(image => {
  <Img key={image.id} fixed={child.imageSharp.fixed}>
})}
```




## FOR LATER (COMMENTS in WordPress): 

https://spectrum.chat/gatsby-js/meta/whats-the-best-way-to-make-commenting-system~0c7e3f0f-8737-4948-9c52-0d20dfe37a05