const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId
    },
    comments:[{  text:{ type:String, required:true},userId:{ type:mongoose.SchemaTypes.ObjectId, required:true }  }]
})

module.exports = mongoose.model('Post',postSchema);