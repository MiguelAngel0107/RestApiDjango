import { 
    SIGNUP_FAIL, 
    SIGNUP_SUCCESS,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS, 
} from './types'
import axios from 'axios'


export const signup = (
    first_name,
    last_name,
    email,
    password,
    re_password
) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            re_password
    })

    try{

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)   
        
        if (res.status === 201){
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: SIGNUP_FAIL,
            })
        }
    }catch(err){
        dispatch({
            type: SIGNUP_FAIL,
        })
    }
}

export const activate = (
    uid,
    token
) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)

        if(res.status === 204){
            dispatch({
                type: ACTIVATION_SUCCESS
            });
        }else{
            dispatch({
                type:ACTIVATION_FAIL
            })
        }

    }
    catch(err){
        dispatch({
            type:ACTIVATION_FAIL
        })
    }

}