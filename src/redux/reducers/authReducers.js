import {WELCOME_MSG} from '../actions/types';

const initialState = {
    message: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
        case WELCOME_MSG:
            return {
                message: action.payload
            };
        default:
            return state;
    }
}