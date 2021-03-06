import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'


//id and qty comesfrom the URL
//asyncfunction in all actions is from thonk
//getState gets the details from reducers in store.js
export const addToCart = (id,qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`)

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		}
	})
	//is used to store datain local storage and it takes data in string not JSON
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id
	})

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

//the data hereis from the form
export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data
	})

	localStorage.setItem('shippingAddress', JSON.stringify(data))
}