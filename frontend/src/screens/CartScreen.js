import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Button, ListGroup, Form, Card } from 'react-bootstrap'
import { Message } from '../components/Message'
import { addToCart } from '../actions/cartActions'


const CartScreen= ({ match, history, location }) => {
	const productId = match.params.id
	
	const qty = location.search ? Number(location.search.split('=')[1]) : 1

	const dispatch = useDispatch()

	//getting thecart details from the state
	const cart = useSelector((state) => state.cart)

	const { cartItems } = cart
	console.log(cartItems);

	useEffect (() => {
		if(productId){
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])


	return (
		<div>
			CartScreen
		</div>
		)
}

export default CartScreen