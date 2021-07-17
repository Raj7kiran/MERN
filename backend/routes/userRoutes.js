import express from 'express'
const router = express.Router()
import { authUser , registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'



router.route('/').post(registerUser).get(protect,getUsers)
router.post('/login', authUser)
//protect used here 
router.route('/profile').get(protect, getUserProfile).put(protect, admin, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser)


export default router