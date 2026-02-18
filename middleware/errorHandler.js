const {constants} = require("../constants")

const errorHandler =(err, req, res, next)=>
{
    const statusCode = res.statusCode ? res.statusCode :500;
    // res.json ({message:err.message, stackTrace: err.stack})
    // we can send different type of errors
    // err.stack is helpful for development purposes 
    switch(statusCode)
    {
        case constants.VALIDATION_ERROR:
        res.json ({title:"validation failed", message:err.message, stackTrace: err.stack}) ;
        break;

        case constants.NOT_FOUND:
        res.json ({title: "Not Found", message:err.message, stackTrace: err.stack}) ;
        
        case constants.UNAUTHORIZE:
        res.json ({title: "unauthorize", message:err.message, stackTrace: err.stack}) ;
       
        case constants.FORBIDDEN:
        res.json ({title: "forbidden", message:err.message, stackTrace: err.stack}) ;
       
        case constants.SERVER_ERROR:
        res.json ({title: "server error", message:err.message, stackTrace: err.stack}) ;
       
        default:
        console.log("No error, All good;")
        break;
    }

};
module.exports =errorHandler


/*
If you’re talking about Node.js with Express, yes — there’s a specific function signature you must follow. 
Middleware works because Express expects a function in a particular format.

you're using Express.js, the syntax is:
function middlewareName(req, res, next) 
{
    // your logic here
    next();
}
or with arrow function:
const middlewareName = (req, res, next) => {
    // logic
    next();
};

If you don’t call next(), the request hangs (unless you send a response).




Error-handling middleware (different syntax)
This is important. Error middleware has 4 parameters, not 3.

function errorMiddleware(err, req, res, next) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
}
If you forget the err parameter, Express won’t treat it as error middleware.



Important Rules (People Commonly Miss These)

Always either:
call next(), OR
send a response (res.send, res.json, etc.)
Never call next() after sending a response.
Middleware runs in order. If you place it below routes, it won’t run before them.
*/