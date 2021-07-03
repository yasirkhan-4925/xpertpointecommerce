
import express from 'express';
import dotenv from 'dotenv'

import products from './data/products.js'
dotenv.config();
const app = express();

app.get('/', (req, res) => {
 res.send('api is running....')
})

app.get('/api/products', (req, res) => {
    res.json(products);
})
app.get('/api/products/:id', (req, res) => {
    const product = products.find(product => (product._id === req.params.id))
    if (product) {
        res.json(product)
    }
    else {
        res.json({error:'no product found'})
    }
})
   

const port = process.env.PORT || 5000

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode at port ${port}`));