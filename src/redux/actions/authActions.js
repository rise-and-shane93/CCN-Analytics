import {WELCOME_MSG} from './types';

export const authActions = () => dispatch => {
    dispatch({
        type: WELCOME_MSG,
        payload: "hello world"
    });
};