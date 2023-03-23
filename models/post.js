const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    title:{
        type:String
    },
    body:{
        type:String
    },
    image:{
        type:String
    },
    user:{
        type:String
    }
})
module.exports =mongoose.model('Post',postSchema)