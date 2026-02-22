const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
{
  name: { type: String, required: [true, "please add  the contact name"] },
  email: { type: String, required: [true, "please add  the contact name"]},
  phone: { type: String, required: [true, "please add  the contact name"] },

  // now that  we are enforcing authentication to contacts  so that only authorized can access the particular contact so we'll add user_id  to the conatct 
  //  and for that here's new property i.e 

  user_id :{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
  }

},
{
    timestamps:true,
}
);

module.exports = mongoose.model("Contacts", contactSchema);

/*
a schema defines the structure of documents inside a collection.
It tells Mongoose:

What fields exist
Their data types
Which are required
Validation rules
Default values

MongoDB itself is schema-less.
Mongoose adds structure on top of it.
*/