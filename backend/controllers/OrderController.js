import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create New Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async(req,res) => {
	const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice,
			shippingPrice, totalPrice } = req.body

	if(orderItems && orderItems.length ===0){
		res.status(400)
		throw new Error('No order Items')
		return
	} else{
		const order = new Order({
					orderItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, 
					taxPrice, shippingPrice, totalPrice
				})

		//save order
		const createdOrder = await order.save()

		res.status(201).json(createdOrder)
	}

})


// @desc get order by id
// @route GET api/orders/:id 
// @access private
const getOrderById = asyncHandler(async(req,res) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email')

	if(order){
		res.json(order)
	} else{
		res.status(400)
		throw new Error("Order not Found") 
	}
})


// @desc Update order to paid
// @route GET api/orders/:id/pay
// @access private
const updateOrderToPaid = asyncHandler(async(req,res) => {
	const order = await Order.findById(req.params.id)

	if(order){
		order.isPaid = true
		order.isPaidAt = Date.now()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.email_address			
		}
		const updatedOrder = await order.save()
		res.json(updatedOrder)

	} else{
		res.status(400)
		throw new Error("Order not Found") 
	}
})




export { addOrderItems, getOrderById, updateOrderToPaid }
