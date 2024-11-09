import { Post } from "../models/post.js";
import { Comment } from "../models/comment.js";

export const createPost = async (req,res) => {
    try {
        const newPost = new Post(req.body)
        const savedPost = await newPost.save();

        res.status(200).json(savedPost);
    } catch (error) {
        res.status(400).json({success: false , message: error.message})
    }
}

export const updatePost = async (req,res) => {
    try {
        const updatepost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

        res.status(200).json(updatepost);
    } catch (error) {
        res.status(400).json({success: false , message: error.message})
    }
}

export const deletePost = async (req,res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post has been deleted!")
    } catch (error) {
        res.status(400).json({success: false , message: error.message})
    }
}

export const getPost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({success: false , message: error.message})
    }
}

export const getSearchPosts = async(req,res) => {
    const query = req.query
    try {
        const searchFilter = {
            title: {$regex: query.search , $options : "i"}
        }
        const posts = await Post.find(query.search ? searchFilter:null)

        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({success: false , message: error.message})
    }
}

export const getUserPosts = async (req,res) => {
    try {
        const posts = await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({success: false , message: error.message})
    }
}