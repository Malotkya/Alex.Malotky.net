# Basic Ideals

The main goal for this project was being able to implement:
1) Front End Routing
2) Front End Rendering/Templating
4) Dynamically Loading Html
3) Dynamically Loading Javascript

None of the things I ended up going with did anything innovative. Did I re-invent the wheel for this project? Yes. But it was fun learning ways to make it work.

For this project I  did not want to interact with the window element or dom outside of the [Core Application class](https://github.com/Malotkya/Alex.Malotky.net/blob/main/src/backend/App/Core/index.ts) or code that had been loaded dynamically. I also didn't want to rely on any frameworks already out their and instead using as much of my own code as possible.  I am happy with how the base of the project has turned out,  I just need to get a little bit better at styling my project.

## Routing
For routing, I wanted to replicate the middle ware structure that [Express.js](https://github.com/expressjs/express) uses. After reading through the code, I was able to eventually implement routing using layers. After struggling to figure out how to pass information back up, I took a hint from [Koa.js](https://github.com/koajs) and created a context class that is able to pass information up and down the layer stack.

## Rendering and Templating
Originaly for this project I wanted to use template Html files to render the pages.  As my pages got more complex, and I wanted to show off some of the code that I used in my capstone project I decided to use pure javascript and Web Componenets.  This lead me to create modules that are compiled by webpack that will export either an HTML string, and HTML Element or a function that returns on of the previously mentioned types.  When landing on that page, the app will dynamically load the module and then render and display the page.

# Technology

## Firebase
I decided to go with firebase to host my project because it is easy to set up and deploy to.  On top of that I am also able to access firestore, which is a document database, so that I can update information on my website without having to redeploy the application.

## Typescript
I decided to go with typescript over plane javascript because I wanted to have stricter typing then javascript has natively.  I thought working with typescript would be fun especially because I would already be going through the process of bundling my code with webpack.

## Webpack
I wanted to use webpack to minify all of my files and copy the code into a build folder rather then have my compiled and uncompleted code next to each other.  I also felt that bundling my code into a single file would give my code the best performance results. 

# Problems
The have been some issues along the way.  First was figuring out routing, having used express in the past I have used middleware layout before and wanted to do something similar but front end, and ended up studying how express uses layers to iterate over the middleware. 

Another issue that I ran into is accessing firestore adds a lot of overhead to my code that I wanted to remove as much as possible.  So I ended up loading the firebase code dynamically if i need to access firestore and caching the results to prevent further calls to the firestore database.  This also required me to add magic comments to my code that I am personally not a fan of. 

One problem that I ran into was when I was originaly using templated html files, loading times were not great as the pages got increasingly more complex, and using javascript with the rendered html files was as easy as I thought it would be.  To combat this, I switched to using Web Components and using a single function make elements created with javascript easier to read, it looks like react at home.