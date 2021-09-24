import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'




//.@desc Fetch all products
//.@route GET /api/products
//.@access Public 
// router.get('/', asyncHandler( async (req,res) => {
// 	const products = await Product.find({})
// 	res.json(products);
// })) 
//after adding the controller
router.route('/').get(getProducts).post(protect, admin, createProduct)


router.route('/:id/reviews').post(protect, createProductReview)


//.@desc Fetch single product
//.@route GET /api/products/:id
//.@access Public 
// router.get('/:id', asyncHandler( async (req,res) => {
// 	const product = await Product.findById(req.params.id)

// 	if(product){
// 		console.log(product);
// 		res.json(product);
// 	}else{
// 		res.status(404)
// 		throw new Error('Product not found')
// 	}	
// }))
//after adding the controller
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).
put(protect,admin, updateProduct)


export default router