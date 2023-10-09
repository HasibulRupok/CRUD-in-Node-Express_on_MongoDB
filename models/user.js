const mongoose = require('mongoose');

// model is mainly the table compared to RDBMS, same as Django model (class )

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isMaried: {
        type: Boolean,
        required: false,
        default: false
    }

});

// Create a model based on the schema
const user = mongoose.model('User', userSchema);

// Export the model
module.exports = user;