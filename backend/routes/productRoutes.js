import express from 'express';
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

export default router;
