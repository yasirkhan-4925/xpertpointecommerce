import {USER_LOGIN_REQUEST , USER_LOGIN_SUCCESS , USER_LOGIN_ERROR , USER_LOGOUT} from '../types/userTypes.js'

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