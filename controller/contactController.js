// since we'll be  have communication  with database as well and these functions will  do the network request over database so they need to be
// asynchronous ... wwe'll use async await in that we uses try catch block to  receive reponse or  for catching error

// since the network request , api calls or file i/o  these operations will gonn'a  return you promise  and to handle promise we need try catch block 
// so we need to add try catch to each function but  we'll use alternate method 
//a middleware called express-async-handler, that helps you handle errors in async route handlers without writing repetitive try–catch blocks.
// It wraps your async function and automatically forwards errors to next().

const asyncHandler = require("express-async-handler")
const Contact = require('../models/contactModel')

// now  since this should be private route so  now we have enforced token validation to  all our routes  we  update our queries  according to user_id  so   particular tokenn can 
//  do CRUD on their  contacts only


//@desc get all contacts
//@route GET /api/contacts
//@ access public
// now private


const getContacts = asyncHandler (async(req, res)=>{
    // now we can finally  enforce schema to our data
    const contacts = await Contact.find({user_id:req.user.id});
    console.log({contacts})
    
    // res.status(200).json({message:"get all contacts"});  
    // this was what we  were returning when we don't connectd to the db 
    res.status(200).json(contacts); 
    

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
    //now if phone, email, name are not empty then now we will create the conatct earlier we just used to send the mesage "create contact"
    //  now we will create the conatct in our DB since we are conneected with DB
    // with Contact model
     const contact = await Contact.create(
        {
            name,
            email,
            phone,
           

            // cause we already have destructured these and also key and value are same  we can use above syntax 
            // if we  didn't had  destrucured then we can get details through  req.body.name and similaraly other details as well 
            // now we are adding user_id to assciate  uer with their contacts
            user_id : req.user.id
        }
     );

    // res.status(200).json({message:"create contact"});

    // now will  send the contact we just created 
    res.status(200).json(contact);
}
)





//@desc get all contacts
//@route GET /api/contacts/:id
//@ access public

const getContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("contact doesn't exist");
    }
    // now we that we are connected with DB  we will not send just a message  but actual contact if it exists
    // res.status(200).json({message:`get contact for ${req.params.id}`});
    res.status(200).json(contact);
})





//@desc update contact
//@route put /api/contact/:id
//@ access public
const updateContact =asyncHandler(async(req, res)=>{
    const contact = await  Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("contact doesn't exist");
    }

    // res.status(200).json({message:`update contact for ${req.params.id}`});

    // now we'll send  the updated contact

    const updatedContact =await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}

    )
    res.status(200).json(updatedContact);

})



//@desc delete  contact
//@route DELETE /api/contact/:id
//@ access public
const deleteContact = asyncHandler(async(req, res)=>{
    const contact = await  Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("contact doesn't exist");
    }
    await Contact.deleteOne();

    // res.status(200).json({message:`delete contact for ${req.params.id}`});
    res.status(200).json(contact);
})



// we don't need to write try catch  to catch errors
// asyncHandler will automatcally catch if any exception happens and  gonna pass it to the errorHandler

module.exports ={getContacts, createContact, getContact,updateContact, deleteContact};