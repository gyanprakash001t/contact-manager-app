

|| PROJECT-DOCUMENTTAION AND CONCEPTS USED WITH EXPLANATION ||
1.initializing node project

# npm init

 enrty point : server.js
 npm install express : to install express in the project
 npm install -D nodemon : automatically  restarts server in case of changes and since we do not need this in production environment so it is installed as  dev dependency (i.e. useful while development but not needed for production environment)


# setting scripts in package.json

This keeps your workflow consistent across the team - everyone uses the same commands regardless of their environment, and you don't need to remember complex command syntax.
"dev": " nodemon server.js",
"start": "node server.js"
now you can run command  like 
npm run dev 
npm run start

npm has built-in shortcuts for certain commonly-used script names. These are:

npm start → npm run start
npm test (or npm t) → npm run test
npm stop → npm run stop
npm restart → npm run restart

For these scripts, you can skip the run keyword.
Why This Exists
Historical reasons: start and test are so commonly used that npm decided to give them special treatment to save developers some typing. 
Convention over configuration: npm assumes that almost every project will have a way to start and test it, so they made these the most convenient to run.
Everything Else Needs "npm run"



# import and export 
CommonJS (CJS) → default in Node.js (require("express") / module.exports = myFunction; )
ES Modules (ESM) → modern JavaScript style (import express from "express"/ export default myFunction;)

# dotenv file
npm install dotenv
a .env file stores environment variables - sensitive configuration data that shouldn't be hardcoded in your source code.
why to use dotenv file??

JS files can execute code when imported
If compromised, they can run malicious scripts
.env files are just plain text - no code execution possible

Environment-Specific Issues
Hosting platforms (Heroku, Vercel, AWS) have built-in support for environment variables
They don't run JS files to get config - they expect environment variables
You'd need different deployment strategies

2. Routes
as app grows number of routes will grow so configuring all of them in  server.js isn't good idea 
so we'll have routes folder to handle the routes
 
routes:
in this folder  we'll configure all our routes

2.controllers 
this  folder will contain  all the logic for req, res and it is going to connect with our database

3.middleware
app.use(express.json())

app.use() tells Express to apply middleware to every request.

When you pass express.json() into app.use(), you’re saying:
“For every request, if the body is JSON, parse it and put the result into req.body.”
It’s a built-in middleware in Express.

It parses incoming JSON request bodies and makes the data available on req.body.

Types of Middleware

Built-in middleware (comes with Express):

express.json() → parses JSON body
express.urlencoded() → parses form data (application/x-www-form-urlencoded)
express.static() → serves static files


Third-party middleware (installed via npm):

morgan → logging HTTP requests
cors → handle Cross-Origin Resource Sharing
helmet → secure your app with HTTP headers
cookie-parser → parse cookies

Custom middleware (functions you write):

Authentication check
Logging
Rate limiting
Error handling

<!-- res object  -->

Some important things inside res:

Properties:

res.statusCode → current HTTP status code.
res.headersSent → boolean, true if headers have been sent already.
res.locals → object for passing data between middleware and views.
res.app → reference to the Express application.


Methods (important methods to  craft your response):

res.send(body) → send a response (string, object, buffer, etc.).
res.json(obj) → send JSON response.
res.status(code) → set status code.
res.redirect(url) → redirect client.
res.set(field, value) / res.get(field) → set/get headers.
res.cookie(name, value, options) → set cookies.
res.clearCookie(name) → clear cookies.
res.end() → end the response.

👉 Basically, res is your toolbox to craft the reply you want to send back.


Authentication module
we will provide some enepoints  which will help user to register themselves and login theen with the help of access token they can manage their contact

<!-- err object -->


Architecture 

middleaware FOLDER
it contains all the  custom middleware

controller FOLDER
 it contain all the  bussiness logic like  contactController it contains all the logic for routes mentioned in contactRoutes 

routes FOLDER
it containns all the files for routes 

constants file will contain all my constants 

model FOLDER

it will contain all the schemas 
