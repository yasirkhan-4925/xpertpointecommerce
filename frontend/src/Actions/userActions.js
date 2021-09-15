import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT , CLEAR_REGISTER_USER, USER_REGISTER_ERROR ,USER_REGISTER_SUCCESS , USER_REGISTER_REQUEST ,USER_DETAILS_ERROR , USER_DETAILS_REQUEST , USER_DETAILS_SUCCESS ,USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from '../types/userTypes.js'
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
    
     return (dispatch,getState) =>{

         localStorage.removeItem('user')
         getState().userDetails.user = {}
         getState().updateUserProfile={}
         
         
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


export const getUserDetails = () => {
    
    return async (dispatch , getState) => {
        
        try {
            
            dispatch({ type: USER_DETAILS_REQUEST })

        const config = {
            headers: {
                
                Authorization:`Bearer ${getState().userLogin.user.token}`
                
            }
        }

        const { data } = await axios.get('/api/users/profile', config  )
          
        dispatch({ type:USER_DETAILS_SUCCESS , payload:data})
        }
        catch (error) {
            dispatch({
                type: USER_DETAILS_ERROR,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
        

        

          
     }



}


export const updateProfile = (user) => {
    
    return async (dispatch,getState) => {
        try {
             dispatch({type:USER_UPDATE_PROFILE_REQUEST})

             const config = {
                headers: {
                    'Content-Type':'application/json', 
                    Authorization:`Bearer ${getState().userLogin.user.token}`
                    
                }
            }
            
            const { data } = await axios.put('/api/users/profile', user ,config  )
        
            dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
            
            localStorage.setItem('user',JSON.stringify(data))
            

           //localStorage.setItem('user',JSlON.stringify(data))
              
            dispatch(getUserDetails());
        }
        

         
        catch (error) {
            dispatch({
                type: USER_DETAILS_ERROR,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
          }
     }


}