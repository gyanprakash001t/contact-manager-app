// we need to verify the   access token sent  by client  in request as bearer token 

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async(req, res, next) =>
    {
    // It is sent inside the HTTP request headers, not in the body.
    //Specifically inside the Authorization header:

    
    const  authHeader = req.headers.authorization;
    console.log("authHeader :", authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) 
    {
        res.status(401);
        throw new Error("Not authorized, token missing");
    }

    const token = authHeader.split(" ")[1];  //  sine after "Bearer"  you will have a space before token starts so you can access the token this wway
    console.log("token:", token)
    // now we verify the user
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, 
    (err, decoded)=> {
            if(err)
            {
                res.status(401);
                throw new Error("user is not aothorized");
            }

            // but if user uses correct token then
            // console.log(decoded);
            req.user = decoded.user;
            console.log(req.user);
            next();
    });

   });
 
// now we'll use this validateToken on private orutes 
module.exports = validateToken;


    