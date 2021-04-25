import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin',
		email: 'ad@abc.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'Jon',
		email: 'jon@abc.com',
		password: bcrypt.hashSync('123456', 10)
	},
	{
		name: 'Jane',
		email: 'jane@abc.com',
		password: bcrypt.hashSync('123456', 10)
	}
]

export default users