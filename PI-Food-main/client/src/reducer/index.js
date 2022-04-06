import { FILTER_TYPES, GET_ALL, GET_DETAIL, GET_NAME, GET_TYPES } from "../actions/types";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: [],
}

export default function rootReducer(state= initialState, action) {
    switch(action.type) {
        case GET_ALL:
            console.log(action.payload)
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
            
        case GET_TYPES:
            return {
                ...state,
                diets: action.payload
            }
        case GET_NAME:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case FILTER_TYPES:
            const allTypes = state.recipes;
            console.log(allTypes)
            const filterTypes = action.payload === 'all' ?
            allTypes : allTypes.filter(e => e.type.includes(action.payload))
            return {
                ...state,
                allRecipes : filterTypes
            }
        default: 
            return state;

    }
}