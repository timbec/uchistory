# Images In Markdown 

- For whatever reason, Zac is still using the 'mdx plugin'. But the gatsby-starter-blog theme just uses `gatsby-remark-images` which seems to work fine - and Zac just installed it, for placing images in markdown files. 

- In the starter blog, it's this simple (folder for each post, index.md, then images to be used in folder): 
`![Chinese Salty Egg](./salty_egg.jpg)`

- however, Zac doesn't favor this approach. Instead he creates a component: 
`mdx-image.js` (I presume this needs the deprecated mdx plugin): 

```
const MDXImage = ({ float, width, margin, children }) => {
    const style = {
        float: float || "none", 
        width: width || "50%",
        margin: margin || "10px",
    }
    return <div style={style}>{children.props.children}</div> // children.props.children eliminates the surrounding `<p>` tags. 
}

export default MDXImage; 
```

In the Markdown file:
`import MDXImage from 'components/mdx-image';`

then: 
<MDXImage float="right" margin="0 0 10px 10px" width="200px">
{image && <Img alt={title}fixed={image.childImageSharp.fixed}/> }
</MDXImage>