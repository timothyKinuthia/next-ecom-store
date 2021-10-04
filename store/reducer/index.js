import { actionTypes } from "../actions/index";

const reducers = (state, action) => {
    switch (action.type) {
        case actionTypes.NOTIFY:
            return {
                ...state, notify: action.payload
            };
        case actionTypes.AUTH:
            return {
                ...state, auth: action.payload
            };
        default:
            return state;
    }
};

export default reducers;