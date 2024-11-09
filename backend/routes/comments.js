import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { createComment, deleteComment, getComments, updateComment } from '../controllers/comments.js';

const router = express.Router();

router.post("/create",verifyToken,createComment);
router.put("/:id",verifyToken,updateComment);
router.delete(":/id",verifyToken,deleteComment);

router.get("/post/:postId",getComments);


export default router;