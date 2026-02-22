const express = require ("express");
const  router = express.Router();
const {getContacts,getContact,createContact, updateContact, deleteContact} = require('../controller/contactController');
const validateToken = require("../middleware/validateTokenHandler");

// router.route("/").get((req, res)=>{
//     res.status(200).json({message:"get all contacts"});
// })

// WE   ARE DELEGATING OUR LOGIC PART TO  contactController  so that our  routing module has only routes and controller part has all the logic otherwise our code would have look  like  above chunk of code

// router.route("/").get(getContacts)
// router.route("/:id").get(getContact)
// router.route("/").post(createContact)
// router.route("/:id").put(updateContact)
// router.route("/:id").delete(deleteContact)

// you can also writes your routes like below to save some repetitve code  as above 
// router.route("/").get(getContacts).post(createContact);  
// router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

// well now we need to  protecct our contact routesn so that only logged_in user can perform crud operations on contacts which they have created for  themselves  so for that we need to 
// attch user_id to the contacts  let's go to  Contact model and integraate user_id
// and now  we had  enforce validation all our routes 
// it can be done either using in individaul routes  but we know all our routes gonna be private  so there's a shortcut as well
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);  
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;