import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const router = express.Router();

// @desc: this will get all products
// @route: /api/products/
// @acess: public

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    if (products) {
      res.json(products);
    } else {
      //res.status(404).json({ message: 'products not found' });
      throw new Error('Products not found')
    }
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

export default router;
