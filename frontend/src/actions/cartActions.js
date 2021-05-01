import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'


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