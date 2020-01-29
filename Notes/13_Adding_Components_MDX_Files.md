# Adding React Components to MDX Files. 

- first - do I need to do this? 

In `gatsby-node.js`, add(at the bottom):
```
exports.onCreateWebpack.Config = ({ actions: { setWebpackConfig }}) => {
    setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, "src"), "node_modules"],
        },
    })
}
```

Add a simple component `shoutout.js` in the components folder: 
```
import React from 'react'; 

const Shoutout = ({ children }) => <div className="shoutout">{ children }</div>

export default Shoutout; 
```

and use our new configuration in `gatsby-node.js` to import the webpack way (instead of using relative paths): 
`import Shoutout from 'shoutout'; `

Then, in theory: 
```
<Shoutout>
### Shoutout
</Shoutout>
```
but in this case, doesn't work. Only with the MDX extension. I don't see the point of it anyway. 