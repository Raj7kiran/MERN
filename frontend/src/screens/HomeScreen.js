import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row,Col } from 'react-bootstrap';
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'



const HomeScreen = () => {
	const dispatch = useDispatch();

	//selecting theproductsfrom state
	const productList = useSelector(state => state.productList);
	//destructuring the productList
	const { loading, error, products } = productList

	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch] )//we give this here as we get a warning in console 


	return (
			<>
				<h1>Latest Products</h1>
				{ 	loading ? (<Loader />)
					: error ? (<Message variant='danger'>{error}</Message>)
					: (<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3} >
								{/*here we are creating Product component and send theproducts from map as a prop*/}
								<Product product={product} />
							</Col>
						))}
					</Row>)
				 }
				
			</>
		)
}


export default HomeScreen;