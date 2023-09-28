# Alex.Malotky.net

The main goal for this project was being able to implement:
1) Front End Routing
2) Front End Rendering/Templating
4) Dynamically Loading Html
3) Dynamically Loading Javascript

None of the things I ended up going with did anything innovative. Did I re-invent the wheel for this project? Yes. But it was fun learning ways to make it work.

## Basic Ideals

The main goal of this project was to not interact with the window element or dom outside of the [Core Application class](https://github.com/Malotkya/Alex.Malotky.net/blob/main/src/scripts/App/Core/index.ts) or code that had been loaded dynamically. And while dynamically loaded code hasn't yet been re-implemented yet, I am happy with how the base of the project has turned out. I just need to get a little bit better at styling my project.  I also didn't want to rely on any frameworks already out their and instead using as much of my own code as possible.

### Routing

For routing, I wanted to replicate the middle ware structure that [Express.js](https://github.com/expressjs/express) uses. After reading through the code, I was able to eventually implement routing using layers. After struggling to figure out how to pass information back up, I took a hint from [Koa.js](https://github.com/koajs) and created a context class that is able to pass information up and down the layer stack.

### Rendering and Templating

While trying to figure out the best way to create template files for HTML, I realized that I wanted to be able to load in other template files from within a template file, and that I liked the way templates looked in django. So I used the bracket approach to to insert information into the template:

`` {{ varialbe }} `` is used to print the variable to the html file.
`` {% javscript code %} `` is used to execute the javascript code between the brackets.

## Technology

### Firebase
I decided to go with firebase to host my project because it is easy to set up and deploy too.  On top of that I am also able to access firestore, which is a document database, so that I can update information on my website without having to redeploy the application.

### Typescript
I decided to go with typescript over plane javascript because I wanted to have stricter typing then javascript has natively.  I thought working with typescript would be fun especially because I would already be going through the process of bundling my code with webpack.

### Webpack
I wanted to use webpack to minify all of my files and copy the code into a build folder rather then have my compiled and uncompleted code next to each other.  I also felt that bundling my code into a single file would give my code the best performance results. 

## Problems
The have been some issues along the way.  First was figuring out routing, having used express in the past I have used middleware layout before and wanted to do something similar but front end, and ended up studying how express uses layers to iterate over the middleware. 

Another issue that I ran into is accessing firestore adds a lot of overhead to my code that I wanted to remove as much as possible.  So I ended up loading the firebase code dynamically if i need to access firestore and caching the results to prevent further calls to the firestore database.  This also required me to add magic comments to my code that I am personally not a fan of. 

Lastly, I have struggled with dynamically loading code specifically for a page as it gets loaded, and is something that I am currently working on figuring out.
