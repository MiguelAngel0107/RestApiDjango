import { 
    SIGNUP_FAIL, 
    SIGNUP_SUCCESS,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING, 
    LOGIN_FAIL,
    LOGIN_SUCCESS, 
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
} from './types'
import axios from 'axios'
import {setAlert} from './alert'


export const signup = (
    first_name,
    last_name,
    email,
    password,
    re_password
) => async dispatch => {
    dispatch({
        type:SET_AUTH_LOADING
    });

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
            });
            dispatch(
                setAlert('Te enviamos un correo, porfavor activa tu cuenta', 'green')
            );
        }else{
            dispatch({
                type: SIGNUP_FAIL,
            });
            dispatch(
                setAlert('Error al crear cuenta', 'red')
            );
        }

        dispatch({
            type:REMOVE_AUTH_LOADING
        });

    }catch(err){
        dispatch({
            type: SIGNUP_FAIL,
        })
        dispatch({
            type:REMOVE_AUTH_LOADING
        });
        dispatch(
            setAlert('Error con el servidor, intenta mas tarde', 'red')
        );
    }
}


export const load_user = (

) => async dispatch => {
    if(localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
            if (res.status === 200) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type:USER_LOADED_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type:USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type:USER_LOADED_FAIL
        });
    }
}


export const login = (
    email,
    password
) => async dispatch => {
    dispatch({
        type:SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        email,
        password
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch({
                type:REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Inicio de sesión con éxito', 'green'));
        } else {
            dispatch({
                type: LOGIN_FAIL
            })
            dispatch({
                type:REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error al iniciar sesion', 'red'))
        }
    }
    catch(err){
        dispatch({
            type: LOGIN_FAIL
        })
        dispatch({
            type:REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Error al iniciar sesion. Intenta mas tarde', 'red'))
    }
}


export const activate = (
    uid,
    token
) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

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
            dispatch(
                setAlert('Cuenta activada correctamente', 'green')
            );
        }else{
            dispatch({
                type:ACTIVATION_FAIL
            });
            dispatch(
                setAlert('Error activando cuenta', 'red')
            );
        }

        dispatch({
            type:REMOVE_AUTH_LOADING
        });
        

    }
    catch(err){
        dispatch({
            type:ACTIVATION_FAIL
        });
        
        dispatch(
            setAlert('Error activando cuenta', 'red')
        );

        dispatch({
            type:REMOVE_AUTH_LOADING
        });
    }

}