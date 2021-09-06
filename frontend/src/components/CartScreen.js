import {React, useEffect } from 'react'
import { addToCart } from '../Actions/cartAction';
import {useDispatch , useSelector} from 'react-redux'


const CartScreen = ({ match, location, history }) => {
    

    const productId = match.params.id
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)
    const {cartItem} = cart

   
    useEffect(() => {
        if (productId) {
           dispatch(addToCart(productId,quantity))
       }   
    },[dispatch, productId , quantity])
    
    return (
        <h1>Shopping Cart</h1>
    )


}

export default CartScreen;