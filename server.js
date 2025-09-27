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

// const port = process.env.PORT;  TODO:: WHY USING  process.env is giving error "server refuse to connect " but server is runnning 
const port = 5000; 

app.use(express.json()); // whenever you need to receive data from client you need to use body parser
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});

