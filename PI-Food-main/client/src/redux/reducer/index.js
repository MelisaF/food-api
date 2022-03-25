import { GET_RECIPE } from "../type";

const initialState = {
    recipe: []
}

export default function rootReducer(state= initialState, action) {
    switch(action.type) {
        case GET_RECIPE:
            return {
                ...state,
                recipe: action.payload
            }
        default: 
            
        return state;

    }
}