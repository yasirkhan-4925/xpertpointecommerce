const express = require('express');
const products = require('./data/products')

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
   



app.listen(5000, console.log('server is running at port 5000'));