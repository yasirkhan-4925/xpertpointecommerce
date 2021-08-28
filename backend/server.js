import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connect from './config/mongoConnect.js';
import productRoutes from './routes/productRoutes.js'


import products from './data/products.js';
dotenv.config();

connect(); // function that is connection mongodb

const app = express();

app.get('/', (req, res) => {
  res.send('api is running....');
});



// routes


app.use('/api/products', productRoutes);




const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(`server running in ${process.env.NODE_ENV} mode at port ${port}`.yellow.bold.underline)
);
