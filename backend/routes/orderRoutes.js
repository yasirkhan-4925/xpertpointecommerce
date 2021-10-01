import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import Product from '../models/productModel.js';

const router = express.Router();

// @desc create new order
// @route POST /api/orders
// @access private

router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
      return;
    } else {
      const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      const products = await Product.find({});

    //   for (let i = 0; i < createdOrder.orderItems.length; i++) {
    //     for (let j = 0; j < products.length; j++) {
    //       if (
    //         createdOrder.orderItems[i].id.toString() ===
    //         products[j]._id.toString()
    //       ) {
    //         products[j].countInStock =
    //           products[j].countInStock - createdOrder.orderItems[i].quantity;
    //       }
    //     }
    //   }

        for (let i = 0; i < createdOrder.orderItems.length; i++){
            const product = await Product.findById(createdOrder.orderItems[i].id)
            if (product) {
              product.countInStock = product.countInStock - createdOrder.orderItems[i].quantity
              if (product.countInStock < 0) {
                product.countInStock = 0
              }
                await product.save()
            }
        }

      res.status(201).json(createdOrder);
    }
  })
);

// @desc get order by id
// @route get/api/orders/:id
// @access private

router.get(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email phoneNo'
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('No order found');
    }
  })
);

// @desc update Order to paid
// @route put /api/orders/:id/pay
// @access private

router.put(
  '/:id/pay',
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      (order.isPaid = true), (order.paidAt = Date.now());

      // this comes from paypal
      order.paymentResult = {
        id: req.body.payerId,
        status: req.body.paid,

        email_address: req.body.email,
      };

      const updatedOrder = await order.save();
      console.log(updatedOrder);
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  })
);

// @desc get orders for admin
// @route get/api/orders
// @access private

router.get(
  '/',
  protect,
  isAdmin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name email phoneNo');
    res.json(orders);
  })
);

// @desc update order to delivered
// @route get/api/orders/:id/delivered
// @access private

router.put(
  '/:id/delivered',
  protect,
  isAdmin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      throw new Error('order not found');
    }
  })
);

export default router;
