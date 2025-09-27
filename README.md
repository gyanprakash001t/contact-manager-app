node.js refresher

#  import
CommonJS (CJS) → default in Node.js (require / module.exports)
ES Modules (ESM) → modern JavaScript style (import / export)

1. we'll not configure all our routes in server.js
 for routes we have <h1>routes</h1> folder
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

<!-- err object -->

