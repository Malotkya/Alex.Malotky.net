# Background
This project was the dream child of my wife.  Who thought it would be fun to be able to track rubber ducks as they move around.  For those who don't know people who drive jeeps will leave ducks for eachother on one anothers jeeps.  In the same vein people who go on cruises will leave ducks around the ship for others to find and share.  Both of these things are things that she enjoys doing so and came up with the idea for the app.
        
When working on this project I treat it similarly to working on my capstone project.  I created a document specifiying the goals and expectations of the project and worked on it in sprints getting aproval during each step.

# Requirements
1) Be able to create an account that allows one to follow ducks and to create their own ducks.
2) Be able to scan a qr code that links to the ducks page on the website
3) Ability to upload pictures of the duck when the qr code is scanned or by the ducks creator.

# Technology
Cloudflare pages was selected to host the project because it has free/ cheep tiers for the technology required, this limited the technology we used because price was a concern.
 
Cloudflare pages allows backend funcitons to execute on paths, and that is used to access the database.  The database is cloudflares d1 database which is an SQLite implimitation. Because the backend was written in typescript, I wrote the front end app as a Single page application in typescript as well that is complied using webpack.

# Thoughts
The project was both fun and challenging.  My sister was one of the testers for the project, and getting some of the custom elements to work in Safari was one of the more anoying hurdles.

While I am still working on the project to polish it up. The core functions have been completed.