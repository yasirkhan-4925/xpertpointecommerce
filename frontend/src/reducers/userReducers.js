import {USER_LOGIN_REQUEST , USER_LOGIN_SUCCESS , USER_LOGIN_ERROR , USER_LOGOUT , USER_REGISTER_ERROR , CLEAR_REGISTER_USER , USER_REGISTER_SUCCESS , USER_REGISTER_REQUEST} from '../types/userTypes.js'

export const userLoginReducer = (state = {}, action) => {
    

    switch (action.type) {
        case USER_LOGIN_REQUEST: 
            return {
                loading:true
            }
        
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                user:action.payload
            }

        case USER_LOGIN_ERROR:
            return {
                loading: false,
                error:action.payload
            }
        case USER_LOGOUT:
            return {
                user:null
            }
        default:
            return state
    }  
    
}




export const userRegisterReducer = (state = {}, action) => {
    

    switch (action.type) {
        case USER_REGISTER_REQUEST: 
            return {
                loading:true
            }
        
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                user:action.payload
            }

        case USER_REGISTER_ERROR:
            return {
                loading: false,
                error:action.payload
            }
        
        default:
            return state
    }  
    
}