
import {
    SET_ERRORS,
    POST_TWEET,
    CLEAR_ERRORS,
    LOADING_UI,

} from '../types';
import axios from 'axios';

export const postTweet = (newTweet) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/tweet', newTweet)
        .then((res) => {
            dispatch({
                type: POST_TWEET,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,

            });
        });
};


export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
