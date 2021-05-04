import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'


const app = express();

//to get the body of request usingbody parser
app.use(express.json())

dotenv.config();
connectDB()

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)


app.use(notFound)

app.use(errorHandler)




app.get('/', (req,res) => {
	res.send('API running....');
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`));