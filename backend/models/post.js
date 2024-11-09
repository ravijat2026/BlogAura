import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique:true
    },
    desc:{
        type: String,
        required: true,
        unique:true
    },
    photo:{
        type: String,
        required: false,
    },
    name:{
        type: String,
        required : true,
    },
    userId:{
        type: String,
        required : true,
    },
    categories:{
        type: Array,
    },

}, {timestamps:true})

export const Post = mongoose.model('Post',PostSchema);