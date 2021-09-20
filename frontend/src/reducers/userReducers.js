import { USER_DELETE_ERROR ,USER_DELETE_REQUEST,USER_DELETE_SUCCESS, USER_LIST_ERROR ,USER_LIST_REQUEST , USER_LIST_SUCCESS , USER_LOGIN_REQUEST , USER_LOGIN_SUCCESS , USER_LOGIN_ERROR , USER_LOGOUT , USER_REGISTER_ERROR , CLEAR_REGISTER_USER , USER_REGISTER_SUCCESS , USER_REGISTER_REQUEST , USER_DETAILS_ERROR , USER_DETAILS_REQUEST , USER_DETAILS_SUCCESS, USER_UPDATE_PROFILE_ERROR , USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS} from '../types/userTypes.js'

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



export const userDetailsReducer = (state = { user: {},  },action) => 
{
    
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user:action.payload
            }
        case USER_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
                
            }
        default:
            return state
    }
    
      
}

export const updateUserProfileReducer = (state={} , action) => {
    
    switch (action.type) {

        case USER_UPDATE_PROFILE_REQUEST:
            return {
                loading:true
            }
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
                user:action.payload
            }
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: true,
                error:action.payload
            }
        default:
            return state
        
    }

}






export const userListReducer = (state={users:[]} , action) => {
    
    switch (action.type) {

        case USER_LIST_REQUEST:
            return {
                loading:true
            }
        case USER_LIST_SUCCESS:
            return {
                loading: false,
               
                users:action.payload
            }
        case USER_LIST_ERROR:
            return {
                loading: true,
                error:action.payload
            }
        default:
            return state
        
    }


}



export const userDeleteReducer = (state={} , action) => {
    
    switch (action.type) {

        case USER_DELETE_REQUEST:
            return {
                loading:true
            }
        case USER_DELETE_SUCCESS:
            return {
                loading: false,
               
                 success:true
            }
        case USER_DELETE_ERROR:
            return {
                loading: true,
                error:action.payload
            }
        case 'USER_DELETE_RESET':
            return {}
        default:
            return state
        
    }

}