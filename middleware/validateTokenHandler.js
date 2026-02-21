// we need to verify the   access token sent  by client  in request as bearer token 

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async(req, resizeBy, next) =>{
    // It is sent inside the HTTP request headers, not in the body.
    //Specifically inside the Authorization header:

    let token;
    authHeader = req.header.Authorization || eq.header.authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token = authHeader.split(" ")[1]  //  sine after bearer  you will have 
    }

})