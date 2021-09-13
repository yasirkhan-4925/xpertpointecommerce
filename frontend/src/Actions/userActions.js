import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT , CLEAR_REGISTER_USER, USER_REGISTER_ERROR ,USER_REGISTER_SUCCESS , USER_REGISTER_REQUEST } from '../types/userTypes.js'
import axios from 'axios'

export const login = (email, password) => {
    return async (dispatch) => {

        try {
            dispatch({ type: USER_LOGIN_REQUEST })
            
            const config = {
                headers: {
                    'Content-Type':'application/json'
                }
            }

            const {data} = await axios.post('/api/users/login' , {email, password} , config)
            
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
            
            localStorage.setItem('user',JSON.stringify(data))
        }
        catch (error) {
            dispatch({
                type: USER_LOGIN_ERROR,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
             })
        }
        
    }

}

export const logout = () => {
    
     return (dispatch) =>{

         localStorage.removeItem('user')
         dispatch({ type: USER_LOGOUT })
        

         
     }


}




export const register = (name, email, password) => {
    return async (dispatch) => {

        try {
            dispatch({ type: USER_REGISTER_REQUEST })
            
            const config = {
                headers: {
                    'Content-Type':'application/json'
                }
            }

            const {data} = await axios.post('/api/users' , {name ,email, password} , config)
            
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data })

            dispatch({type:USER_LOGIN_SUCCESS , payload:data})
            
            localStorage.setItem('user',JSON.stringify(data))
        }
        catch (error) {
            dispatch({
                type: USER_REGISTER_ERROR,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
             })
        }
        
    }

}