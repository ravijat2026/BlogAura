import { User } from "../models/user.js";

import bcryptjs from 'bcryptjs';

import { Post } from "../models/post.js";
import { Comment } from "../models/comment.js";

export const updateUser = async (req,res) => {
    try {
        if(req.body.password){
            const hashedPassword = await bcryptjs.hash(req.body.password,10);

            req.body.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id , {$set : req.body} , {new: true})

        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(400).json({success: false , message: error.message})
    }
}

export const deleteUser = async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId: req.params.id})
        await Comment.deleteMany({userId: req.params.id})

        res.status(200).json("User has been deleted!")
    } catch (error) {
        res.status(400).json({success: false , message: error.message})
    }
}

export const getUser = async (req,res) => {
    try {
        const user = await User.findById(req.params.id)

        const {password,...info} = user._doc
        res.status(200).json(info);
        
    } catch (error) {
        res.status(400).json({success: false , message: error.message})
    }
}

