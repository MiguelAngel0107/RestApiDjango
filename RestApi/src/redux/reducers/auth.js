import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    REFRESH_FAIL,
    REFRESH_SUCCESS,
} from '../actions/types'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    loading: false
}

export default function Auth(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading:true
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading:false
            }
        case USER_LOADED_FAIL: 
            return {
                ...state,
                user:null
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
            user: payload
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated:true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated:true,
                access: localStorage.getItem('access'),
                refresh: localStorage.getItem('refresh')
            }
        case LOGIN_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                access:null,
                refresh:null,
                isAuthenticated:false,
                user:null,
            }
        case ACTIVATION_SUCCESS:

        case ACTIVATION_FAIL:
            return {
                ...state
            }
        case SIGNUP_SUCCESS:
            //This has payload
        case SIGNUP_FAIL:

        default:
            return state
    }
}