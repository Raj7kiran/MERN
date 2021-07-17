import asyncHandler from 'express-async-handler'
import generateToken from '../util/generateToken.js'
import User from '../models/userModel.js'

const authUser = asyncHandler(async(req, res) => {
	const {email, password} = req.body

	const user = await User.findOne({ email })

	if(user && (await user.matchPassword(password))){
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id)
		})
	}else{
		res.status(401)
		throw new Error('Invalid username or password')
	}

	res.send({email, password})
})


//.@desc create a user
//.@route POST /api/users
//.@access Public
const registerUser = asyncHandler(async(req, res) => {
	const {name, email, password} = req.body

	const userExists = await User.findOne({ email })

	if(userExists){
		res.status(400)
		throw new Error('User email already exists');
	}

	//here i guess he is using ES6 syntax
	const user = await User.create({
		name,
		email,
		password
	})

	if(user){
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id)
		})
	} else{
		res.status(400)
		throw new Error('Invalid User Data')
	}

})


//.@desc getuser profile
//.@route GET /api/users/profile
//.@access Private
const getUserProfile = asyncHandler(async (req,res) => {
	const user = await User.findById(req.user._id);

	if(user){
		res.json({ 	
				_id: user._id,
			 	name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			})
	} else{
		res.status(404)
		throw new Error ('User not found')
	}

})

//.@desc update user profile
//.@route PUT /api/users/profile
//.@access Private
const updateUserProfile = asyncHandler(async (req,res) => {
	const user = await User.findById(req.user._id);

	if(user){
		user.name = req.body.name || user.name
		user.email =  req.body.email || user.email

		if(req.body.password){
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id)
		})

	} else{
		res.status(404)
		throw new Error ('User not found')
	}

})


//.@desc all users
//.@route GET api/users
//.@access Private/Admin
const getUsers = asyncHandler(async (req,res) => {
	const users = await User.find({});
	res.json(users);	

})



export {authUser, registerUser, getUserProfile, updateUserProfile, getUsers}