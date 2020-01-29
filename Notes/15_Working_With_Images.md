# Working With Images in Gatsby 

- the simplest way to work with images in Gatsby is to import it directly into the project, as you would with any React app. This is good for things like logos etc that go directly into a component, but not content: 
`const image from '../images/image.jpg';`

then: `<img src={ image } alt="Image" />`

By default, images are ported over into 'static' folder. Therefore, can also link thus: 
`"/image.jpg"` which will locate the images in the static folder. 

can also include in CSS
```
.image {
    background: url('../images/image.jpg'); 
}
```

Can also use the Gatsby `<Image>` component. Can also query for images in graphQL. More standard - once Gatsby is aware of images in our system, can do a lot of processing and automation by default. 



