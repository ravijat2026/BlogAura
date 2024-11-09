import { Comment } from "../models/comment.js";

export const createComment = async (req,res)=>{
    try{
        const newComment=new Comment(req.body)
        const savedComment=await newComment.save()
        res.status(200).json(savedComment)
    }
    catch (error) {
        res.status(400).json({success: false , message: error.message})
    }
}

export const updateComment = async (req,res)=>{
    try{
       
        const updatedComment=await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedComment)

    }catch (error) {
        res.status(400).json({success: false , message: error.message})
    }
}

export const deleteComment = async (req,res)=>{
    try{
        await Comment.findByIdAndDelete(req.params.id)
        
        res.status(200).json("Comment has been deleted!")

    }catch (error) {
        res.status(400).json({success: false , message: error.message})
    }
}

export const getComments = async (req,res)=>{
    try{
        const comments=await Comment.find({postId:req.params.postId})
        res.status(200).json(comments)
    }catch (error) {
        res.status(400).json({success: false , message: error.message})
    }
}