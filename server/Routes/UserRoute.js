import express from "express";
const router =express.Router()
import { getUser,updateUser ,deletUser,followUser,unfollowUser} from "../Controllers/UserController.js";

router.get('/:id',getUser)
router.put('/:id',updateUser)
router.delete('/:id',deletUser)
router.put('/:id/follow',followUser)
router.put('/:id/unfollow',unfollowUser)
export default router;