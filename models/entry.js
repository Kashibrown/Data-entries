const mongoose = require('mongoose');
const Schema = mongoose.Schema


const dataSchema = new Schema({
    name : {
        type : String,
        required : true
    },

    age : {
        type : Number,
        required : true
    }
}, {timestamps: true})

//now this is the model for our schema
const Entry = mongoose.model('Entry', dataSchema);
module.exports = Entry;



