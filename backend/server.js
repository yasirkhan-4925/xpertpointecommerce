import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'

import colors from 'colors';
import connect from './config/mongoConnect.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { customErrorHandler, notFind } from './middleware/errorMiddleware.js'
import path from 'path'
import  mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'

import xss   from 'xss-clean'


import hpp from 'hpp'
import cors from 'cors'


import products from './data/products.js';
dotenv.config();
const app = express();
connect(); // function that is connection mongodb


// mongo sanitze to prevent sql injection 

app.use(mongoSanitize())

//set security headers

app.use(helmet());

//prevent xss attacks 

app.use(xss())



// prevent http params pollution 

app.use(hpp());

// enable cors

app.use(cors())


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('api is running....');
});



// routes


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload',uploadRoutes)
 
 const __dirname  = path.resolve()
app.use('/uploads' , express.static(path.join(__dirname,'/uploads')))
app.use(notFind);
app.use(customErrorHandler);





const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(`server running in ${process.env.NODE_ENV} mode at port ${port}`.yellow.bold.underline)
);
