const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
{
  name: { type: String, required: [true, "please add  the contact name"] },
  email: { type: String, required: [true, "please add  the contact name"]},
  phone: { type: String, required: [true, "please add  the contact name"] }

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