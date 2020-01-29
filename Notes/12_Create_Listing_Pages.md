# Creating Listing Pages in Gatsby 

- I've done this before, but essentially we form the query right in the component: 

```
const BlogListing = () => {
    const data = useStaticQuery(graphql`
        //query from GraphiQL
    `)
}
```

Then drill down into the data variable: 
```
const posts = data.edges.nodes; //(or whatever)

posts.map(post => {
    console.log(post); 
}); 
```
Can also destructure the post object: 
```
posts.map({ id, frontmatter: { title, excerpt, slug } } => {
    <h2>{ title }</h2>
    {excerpt}
}); 
```