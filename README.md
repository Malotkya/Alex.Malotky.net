# Alex.Malotky.net

## Basic Ideals

The main goal for this project was being able to implement:
1) Front End Routing
2) Back End Rendering/Templating
4) Dynamically Loading Html
3) Dynamically Loading Javascript

The new ideals of this project was to create a website that could run as a single page application if Javascript was enabled, and function normally without javascript enabled.

### Routing

For routing, I wanted to replicate the middle ware structure that [Express.js](https://github.com/expressjs/express) uses. After reading through the code, I was able to eventually implement routing using layers. After struggling to figure out how to pass information back up, I took a hint from [Koa.js](https://github.com/koajs) and created a context class that is able to pass information up and down the layer stack.

### Rendering and Templating

In past projects I wanted to use template HTML files for rendering, but found that I did not like that process.  When rending on the front end, I have come to rely on a helper funciton that creates the element, sets attributes, and appends children in one call. I wanted to emulate the funciton on the back end, and came up with a process that I beleive works well to generate html.

## Technology

### Cloudflare
I decided to go with cloudflare pages to host my project because, and most importantly, it is cheep.  Cloudflare also allows me to host files as well as have a middleware function that can intercept those calls, and modify the calls before sending them to the hosted files, or send back a different response.  This allowed be to create a middleware engine that functinos similar to express that can run in the workers environement.

### Typescript
I decided to go with typescript over plane javascript because I wanted to have stricter typing then javascript has natively.  I thought working with typescript would be fun especially because I would already be going through the process of bundling my code with webpack.

### Webpack
I wanted to use webpack to minify all of my files and copy the code into a build folder rather then have my compiled and uncompleted code next to each other.  I also felt that bundling my code into a single file would give my code the best performance results. 

## TO DO
1) Repopulate the blog & mtg decks with entries from old database
2) Add search to the mtg decks
3) Add tags to blog
4) Add pagenation to mtg decks & blog