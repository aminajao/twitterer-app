import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUser());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
            // console.log(err);
        });
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUser());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                // payload: err.res.data
            })
            // console.log(err);
        });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED })
}


export const getUser = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/user')
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}


export const uploadImage = (FormData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user/image', FormData)
        .then(() => {
            dispatch(getUser());
        })
        .catch(err => console.log(err));
}


const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};