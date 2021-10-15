import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row,Col } from 'react-bootstrap';
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'


const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword
	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch();

	//selecting theproductsfrom state
	const productList = useSelector(state => state.productList);
	//destructuring the productList
	const { loading, error, products, pages, page } = productList

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber))
	}, [dispatch, keyword, pageNumber] )//we give this here as we get a warning in console 


	return (
			<>
				<Meta />
				{!keyword ? (<ProductCarousel />) : <Link to='/' className='btn btn-dark'>Go Back</Link> }
				<h1>Latest Products</h1>
				{ 	loading ? (<Loader />)
					: error ? (<Message variant='danger'>{error}</Message>)
					: (<>
						<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3} >
								{/*here we are creating Product component and send theproducts from map as a prop*/}
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
					</>)
				 }
				
			</>
		)
}


export default HomeScreen;