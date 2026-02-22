
const  asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const  jwt = require("jsonwebtoken");

//@desc register a user 
//@route POST /api/users/register
//@ access public

const registerUser = asyncHandler (async(req, res) =>
{
    // res.json({message :"register the user"});
    // now to we need to write  the actual functionality to register the user for that  we  need to create userModel first;
    // since we need username, password, email  to register the user so we will destructure this from the req.body
    const {username, email, password} = req.body;
    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    // check if  we already have the  existing user in our DB
    const userAvailable = await User.findOne({email});
    if(userAvailable)
    {
        throw new Error("user already registered")
    }
    // now if  user doesn't already exist we need to create  the user
    // but since we are  receiving the raw password and we cannot store the raw password in to the database 
    //so for that we need to  hash the password and for the same we will be using a library called 

    //HASHED PASWWORD
    const hashedPassword =  await bcrypt.hash(password, 10)  // await cause bycrpt  returns the promise 
        /*
        bcrypt internally:
        Uses a CSPRNG (cryptographically secure random number generator)
        Generates a random 128-bit salt (16 bytes)
        Encodes it in bcrypt’s Base64 format
        Embeds it into the final hash string
        Applies the cost factor iterations
        You don’t control the salt unless you explicitly gene 
        */

    // console.log("hashed password:" + hashedPassword);
    // now create the user
    const user = await User.create(
        {
            username,
            email,
            password: hashedPassword,
            
        }
    )
    console.log(`user created ${user}`);
    // now we wiil want to send the  response if  user is  created  but we donnt't want to  send the hashed paaword

    if(user)
    {
        res.status(201).json({_id:user.id, email:email});
    }
    else
    {
        res.status(400);
        throw new Error("user is not created");

    }
});









//@desc login a user 
//@route POST /api/users/login
//@ access public

const loginUser = asyncHandler (async(req, res) =>
{
    // res.json({message :"login user"});

    // let's code  the logic to login the user 
    //  the concept is whenever client is sending an email and password you have to match it and provide an access token
    const {email, password} = req.body;
    if(!email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    // but if we have email and password we need to check to the database 
    // so first we'll check the email

   const user = await User.findOne({email});  //  TODO: what if user entered the wrong email

   // once you have user  you need to match for hashed password/
   //  now compare the password

   if(user &&  await bcrypt.compare(password, user.password))  
   {  
        // TODO: How does this  compare mmethod method know  how many salt
        /*
        What happens during compare()

            When you do:
            bcrypt.compare(inputPassword, storedHash)
            bcrypt internally:
            Extracts the cost factor from storedHash
            Extracts the salt from storedHash
            Hashes inputPassword again using:
            Same salt
            Same cost
            Compares the newly generated hash with the stored one
            If they match → password is correct.
            You don’t pass salt or cost because bcrypt reads them from the stored hash string.
        */  
        // now if the password matches we  need to provide an access token in the response  but before we need  to  create the access token  we'll create with the help of jwt


        const accessToken = jwt.sign(
            {
                // we have to embed the payload (i.e user info)  but we don't want to embed the password
                user:{
                    username : user.username,
                    email:user.email,
                    id:user.id

                }
                // second parameter is access token secret
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"30m"}
            
            // we also need to set third parameter i.e expiration date so that if token is expired user should not be able to use the token in order to call the api 

        )

        res.status(200).json({accessToken}); 
    

   }
  else
   {
    // if email or password is incorrect
    res.status(400);
    throw new Error("Invalid Credentials");

    }

});

// NOW WE CAN USE THE ACCESS TOKEN AND USE THE PRIVATE ROUTES AND NOW  WE'LL GO TO PUBLIC ROUTES  AND ENFORCES VALIDATIONS SO ONLY AUTHETICATED USERS CAN ACCESS THOSE PRIVATE ROUTES


//@desc current user info
//@route POST /api/users/current
//@ access private

const currentUser = asyncHandler (async(req, res) =>
{
    // res.json({message :"current user"});
    res.json(req.user);
});



// well now we need to  protecct our contact routesn so that only logged_in user can perform crud operations on contacts which they have created for  themselves 



module.exports = {registerUser, loginUser,  currentUser};

 