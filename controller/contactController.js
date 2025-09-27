// since we'll be  have communication  with database as well and these functions will  do the network request over database so they need to be
// asynchronous ... wwe'll use async await in that we uses try catch block to  receive reponse or  for catching error
// so we need to add try catch to each function but  we'll use alternate method 
//a middleware called express async handler

const asyncHandler = require("express-async-handler")

//@desc get all contacts
//@route GET /api/contacts
//@ access public

const getContacts =asyncHandler (async(req, res)=>{
    res.status(200).json({message:"get all contacts"});
})
//@desc create a contact
//@route POST /api/contacts
//@ access public

const createContact = asyncHandler(async(req, res)=>{
    console.log("the req body is:", req.body);
    // so far even if we send body empty it will receive without any error
    //now we'll apply some checkpoints
    const {name,email,phone} = req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory") 
        // this will throw an error in html format but if we want to send  error in json format 
        // we need to create custom middleware
    }
    res.status(200).json({message:"create contact"});
}
)
//@desc get all contacts
//@route GET /api/contacts/:id
//@ access public

const getContact = asyncHandler(async(req, res)=>{
    res.status(200).json({message:`get contact for ${req.params.id}`});
})
//@desc update contact
//@route put /api/contact/:id
//@ access public

const updateContact =asyncHandler(async(req, res)=>{
    res.status(200).json({message:`update contact for ${req.params.id}`});
})

//@desc delete  contact
//@route DELETE /api/contact/:id
//@ access public

const deleteContact = asyncHandler(async(req, res)=>{
    res.status(200).json({message:`delete contact for ${req.params.id}`});
})

// we don't need to write try catch  to catch errors
// asyncHandler will automatcally catch if any exception happens and  gonna pass it to the errorHandler

module.exports ={getContacts, createContact, getContact,updateContact, deleteContact};