const mongoose = require('mongoose');

/*
Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.
It sits between your Node.js application and MongoDB.
It provides:
Schema definition
Data validation
Middleware (hooks)
Query building
Model-based structure
Without Mongoose → you use raw MongoDB driver.
With Mongoose → you work with structured models.

Mongoose does not store data.
It translates JavaScript objects into MongoDB documents and vice versa.

Why Mongoose Exists
MongoDB is schema-less.
That means:
You can insert any structure into a collection.

This creates chaos in large systems.
Mongoose solves this by enforcing structure.
*/

const connectDb = async()=>
{
    try 
    {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    // mongoose.connect() is the method used to establish a connection between your Node.js application and a MongoDB server.
    console.log("Database connected :", connect.connection.host, connect.connection.name)
    } 
    catch (error) 
    {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDb;