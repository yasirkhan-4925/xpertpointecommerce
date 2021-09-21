import express from 'express'
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import { protect , isAdmin } from '../middleware/authMiddleware.js';
import Order from '../models/orderModel.js';


const router = express.Router();


// @desc: authenticating user
// @route: /api/users/login
// @acess: public

router.post('/login', asyncHandler( async (req, res) => {
    
    const { email, password } = req.body;
    
    const user = await User.findOne({ email })
         
    if (email.trim() === '') {
        throw new Error('please enter email')
    }
    

    if (password.trim() === '') {
        throw new Error('Please Enter Password')
    }
    if (user && (await user.matchPassword(password))) {
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn:'30d'
        })

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:token
         })
    } else {
        res.status(401)
        throw new Error('Invaid email or password');
     }
    

    

}))


// @desc: get single user
// @route: /api/users/profile
// @acess: private


router.get('/profile', protect, asyncHandler(async (req , res) => {
      
    const user = await User.findById(req.user._id);


    if (user) {

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn:'30d'
        })
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:token
        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }


}))


// @desc: Register user
// @route: /api/users
// @acess: public


router.post('/', asyncHandler(async (req, res) => {
    
    const { name, email, password } = req.body
    
    const userExist = await User.findOne({ email })
    
    if (userExist) {
        res.status(400)
        throw new Error('User alread exist with that email')
    }

    const user = await User.create({
        name,
        email,
        password
    })


    if (user) {

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn:'30d'
        })
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:token
        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
    
}))



// @desc: Update User 
// @route: /api/users/profile
// @acess: private


router.put('/profile', protect, asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id)

    
      
   
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save();
        const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
            expiresIn:'30d'
        })
    
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token:token
        })
    } else {
        res.status(404);
        throw new Error('User not found')
    }

   
  

}))


// @desc get my orders
// @route put /api/users/myorders
// @access private




router.get('/myorders', protect ,asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
}))


// @desc get users list
// @route get /api/users/
// @access private  and admin


router.get('/', protect , isAdmin, asyncHandler(async (req, res ) => {
    
    const users = await User.find({})
    res.json(users)

}))




// @desc delete user
// @route delete /api/users/:id
// @access private and admin


router.delete('/:id', protect, isAdmin, asyncHandler(async (req, res) => {
       
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({message:'user removed'})
    }
    else {
        res.status(404)
        throw new Error('user not found')
    }


}))



// @desc get user by id
// @route get /api/users/:id
// @access private and admin


router.get('/:id' , protect , isAdmin , asyncHandler(async(req , res)=>{
  
     const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        throw new Error('user not found')
    }

   

}) )


// @desc update user
// @route put /api/users/:id
// @access private and admin


router.put('/:id',  protect, isAdmin ,  asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id)

   
   
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save();
       
    
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        
        })
    } else {
        res.status(404);
        throw new Error('User not found')
    }

   
  

}))



export default router;