import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { deleteUser, getUser, updateUser } from '../controllers/users.js';

const router = express.Router();


router.put('/:id',verifyToken,updateUser)
router.delete('/:id',verifyToken,deleteUser)
router.get('/:id',verifyToken,getUser)

export default router;

