import { SET_ERRORS, POST_TWEET, CLEAR_ERRORS, LOADING_UI, } from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case POST_TWEET:
            return {
                ...state,
                screams: [action.payload, ...state.tweets]
            };
        default:
            return state;
    }
}
