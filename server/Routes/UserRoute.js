import express from "express";

const router =express.Router()
import { getUser,updateUser ,deletUser,followUser,unfollowUser, getAllUsers} from "../Controllers/UserController.js";
import authMiddleWare from "../MiddleWare/AuthMiddleware.js";
router.get('/',getAllUsers)
router.get('/:id',getUser)
router.put('/:id',authMiddleWare,updateUser)
router.delete('/:id',authMiddleWare,deletUser)
router.put('/:id/follow',authMiddleWare,followUser)
router.put('/:id/unfollow',authMiddleWare,unfollowUser)
export default router;