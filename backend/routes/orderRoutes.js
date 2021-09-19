import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { protect  } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc create new order
// @route POST /api/orders
// @access private


router.post('/', protect , asyncHandler(async (req,res) => {
    const {orderItems , shippingAddress, paymentMethod , itemsPrice , shippingPrice , totalPrice } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    }
    else {
       
        const order = new Order({
            user:req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        })
    
        const createdOrder = await order.save()
    

       res.status(201).json(createdOrder)
        
   
        
    }
      
   

}))



// @desc get order by id
// @route get/api/orders/:id
// @access private

router.get('/:id', protect, asyncHandler(async (req ,res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    } else {
        res.status(404)
        throw new Error('No order found')
    }
}))



// @desc update Order to paid
// @route put /api/orders/:id/pay
// @access private


router.put('/:id/pay', protect, asyncHandler(async (req , res) => {
     
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now();

        // this comes from paypal
        order.paymentResult = {

            id: req.body.payerId,
            status: req.body.paid,
           
            email_address: req.body.email

        }

        const updatedOrder = await order.save();
        console.log(updatedOrder)
        res.json(updatedOrder)

    } else {
        res.status(404)
        throw new Error('Order not found')
    }
}))






export default router

