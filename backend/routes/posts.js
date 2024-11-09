import express from 'express'

import { verifyToken } from '../middleware/verifyToken.js'
import { createPost, deletePost, getPost, getSearchPosts, getUserPosts, updatePost  } from '../controllers/posts.js';


const router = express.Router();



router.post('/create',verifyToken,createPost);
router.put('/:id',verifyToken,updatePost);
router.delete('/:id',verifyToken,deletePost);
router.get('/:id',verifyToken,getPost);

//search functionality
router.get('/',getSearchPosts);

//get User posts
router.get('/user/:userId' ,getUserPosts)


export default router;