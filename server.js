// const express = require ("express");
// // Here, you are importing the Express library into your project.
// //So now, the variable express holds the Express framework.
// const dotenv = require("dotenv").config();
// // dotenv is a Node.js package that lets you load environment variables from a file named .env into your application (process.env)
// const app = express();

// const port = process.env.PORT || 5000;

// app.listen(port, ()=>{
//     console.log(`server listening on port ${port}`);
// });

// app.get('/api/contacts',(req, res)=>{
//    res.send('get all contacts');
// });

// app.get('/', (req,res)=>res.send("Hello world"))


const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection")
connectDb();
const app = express();
//  TODO:   pehle ye route neche tha and not working after checking all possible  faulting points we didn't get any error then changed it's position and it worked but why ???
app.use("/api/contacts", require("./routes/contactRoutes"));

// for testing purpose

// app.use((req, res, next) => {
//     console.log("Incoming request:", req.method, req.url);
//     next();
// });

// const port = process.env.PORT;  TODO:: WHY USING  process.env is giving error "server refuse to connect " but server is runnning 
const port = 5000; 

app.use(express.json()); // whenever you need to receive data from client you need to use body parser so that you can parse the stream of data

/*
express.json() returns a middleware function.
It is a built-in body parser provided by Express.
Its job:
Reads incoming request body
Checks if Content-Type: application/json
Parses the JSON string
Converts it into a JavaScript object
Attaches it to:
req.body


app.use() registers middleware in Express’s middleware stack
Express runs middleware in order
Each middleware can:
Modify req
Modify res
End the response

Or pass control using next() */

// app.use("/api/contacts", require("./routes/contactRoutes"));

/*
app.use(): This method mounts middleware or routers to the application's request-processing stack. Unlike app.get() or app.post(), 
it matches any HTTP method (GET, POST, etc.) as long as the path starts with the specified prefix.
"/api/contacts": This is the base path (mount point). Every route defined inside the required file will now be relative to this prefix.
Example: If the file has a route for /, it becomes accessible at GET /api/contacts.
Example: If it has a route for /:id, it becomes GET /api/contacts/123
 */


// for authentication
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);
// errorHandler is custom middleware which 
/*
When you call:

app.use(errorHandler);

in Express.js:
Express registers this function in its middleware stack.
Because it has 4 parameters (err, req, res, next), Express marks it as error middleware.
When next(error) is called anywhere in the app, Express:
Skips all normal middleware

Jumps directly to this function

That’s the mechanism.


3️⃣ The Flow of an Error

Example:

app.get("/user", (req, res, next) => {
    res.status(404);
    next(new Error("User not found"));
});


Flow:

Route sets res.statusCode = 404

Calls next(error)
Express jumps to your errorHandler
statusCode becomes 404
Switch case sends proper JSON response
*/

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});

