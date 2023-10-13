const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
},
{
    versionKey:false
}
);

// To use our schema definition, we need to convert our UserSchema into a Model we can work with.
module.exports = mongoose.model('user',UserSchema);