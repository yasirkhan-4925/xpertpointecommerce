import {  SINGLE_USER_DETAIL_ERROR , SINGLE_USER_DETAIL_SUCCESS , SINGLE_USER_DETAIL_REQUEST ,USER_DELETE_ERROR ,USER_DELETE_REQUEST,USER_DELETE_SUCCESS, USER_LIST_ERROR ,USER_LIST_REQUEST , USER_LIST_SUCCESS , USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT , CLEAR_REGISTER_USER, USER_REGISTER_ERROR ,USER_REGISTER_SUCCESS , USER_REGISTER_REQUEST ,USER_DETAILS_ERROR , USER_DETAILS_REQUEST , USER_DETAILS_SUCCESS ,USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, SINGLE_USER_EDIT_REQUEST, SINGLE_USER_EDIT_SUCCESS, SINGLE_USER_EDIT_ERROR, SINGLE_USER_EDIT_RESET } from '../types/userTypes.js'
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
         getState().updateUserProfile = {}
         getState().orderCreate = {}
         
         
         dispatch({ type: USER_LOGOUT })
        

         
     }


}




export const register = (name, email, password , phoneNo) => {
    return async (dispatch) => {

        try {
            dispatch({ type: USER_REGISTER_REQUEST })
            
            const config = {
                headers: {
                    'Content-Type':'application/json'
                }
            }

            const {data} = await axios.post('/api/users' , {name ,email, password,phoneNo} , config)
            
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







export const usersList = () => {
    
    return async (dispatch , getState) => {
        
        try {
            
            dispatch({ type: USER_LIST_REQUEST })

        const config = {
            headers: {
                
                Authorization:`Bearer ${getState().userLogin.user.token}`
                
            }
        }

        const { data } = await axios.get('/api/users', config  )
          
        dispatch({ type:USER_LIST_SUCCESS , payload:data})
        }
        catch (error) {
            dispatch({
                type: USER_LIST_ERROR,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
        

        

          
     }



}





export const deleteUser = (id) => {
    
    return async (dispatch , getState) => {
        
        try {
            
            dispatch({ type: USER_DELETE_REQUEST })

        const config = {
            headers: {
                
                Authorization:`Bearer ${getState().userLogin.user.token}`
                
            }
        }

         await axios.delete(`/api/users/${id}`, config  )
          
            dispatch({ type: USER_DELETE_SUCCESS })
            dispatch(usersList())

            setTimeout(function () { dispatch({type:'USER_DELETE_RESET'}) }, 3000);
           
        }
        catch (error) {
            dispatch({
                type: USER_DELETE_ERROR,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
        

        

          
     }



}

export const singleUserDetails = (id) => {
    
    return async (dispatch , getState) => {
        
        try {
            
            dispatch({ type:SINGLE_USER_DETAIL_REQUEST })

        const config = {
            headers: {
                
                Authorization:`Bearer ${getState().userLogin.user.token}`
                
            }
        }

        const { data } = await axios.get(`/api/users/${id}`, config  )
          
        dispatch({ type:SINGLE_USER_DETAIL_SUCCESS , payload:data})
        }
        catch (error) {
            dispatch({
                type: SINGLE_USER_DETAIL_ERROR,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
        

        

          
     }



}



export const singleUserUpdate = ( id ,  user) => {
    
    return async (dispatch,getState) => {
        try {
             dispatch({type:SINGLE_USER_EDIT_REQUEST})

             const config = {
                headers: {
                    'Content-Type':'application/json', 
                    Authorization:`Bearer ${getState().userLogin.user.token}`
                    
                }
            }
            
            const { data } = await axios.put(`/api/users/${id}`, user ,config  )
        
            dispatch({ type: SINGLE_USER_EDIT_SUCCESS, payload: data })
            dispatch(singleUserDetails(id));
            dispatch({ type: SINGLE_USER_EDIT_RESET })
           
            
            
            

           
              
          
        }
        

         
        catch (error) {
            dispatch({
                type: SINGLE_USER_EDIT_ERROR,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
          }
     }


}