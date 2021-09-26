import express, { raw } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { protect , isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc: this will get all products
// @route: /api/products/
// @acess: public

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    
     res.json(products)
  })
);

// @desc: this will get single products
// @route: /api/products/:id
// @acess: public

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      //res.status(404).json({ message: 'product not found' });
      res.status(404);
      throw new Error('Products not found');
    }
  })
);

// @desc: delete product
// @route: /api/products/:id
// @acess: private and admin


router.delete('/:id' , protect , isAdmin , asyncHandler( async (req , res)=>{

  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({msg:'product removed'})
  }
  else {
    res.status(404)
    throw new Erro('product not found')
  }

}))




// @desc: update product
// @route: put /api/products/:id
// @acess: private and admin

router.put('/:id', protect, isAdmin, asyncHandler(async (req, res) => {
  
  const { name, price, description, image, brand, category, countInStock } = req.body
  
  const product = await Product.findById(req.params.id)
   

  if (product) {
    
    product.name = name || product.name
    product.price = price || product.price
    product.description = description || product.description
    product.image = image || product.image
    product.brand = brand  || product.brand
    product.category = category || product.category
    product.countInStock = countInStock || product.countInStock


    const updatedProduct = await product.save()
    res.json(updatedProduct)

  } else {
    res.status(404)
    throw new Error('product not found')
  }


}))




// @desc: create product
// @route: put /api/products/:id
// @acess: private and admin
 
  
router.post('/' , protect , isAdmin , asyncHandler( async (req, res)=>{

  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description : 'Sample description'
  })
  
  const createdProduct = await product.save();
  res.status(201).json(createdProduct)
   

}))

export default router;
