import { CREATE_OR_API, FILTER_TYPES, GET_ALL, GET_DETAIL, GET_NAME, GET_TYPES, ORDER_BY_NAME, ORDER_BY_SCORE, REMOVE_DETAIL } from "../actions/types";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: [],
}

export default function rootReducer(state= initialState, action) {
    switch(action.type) {
        case GET_ALL:
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
            const allTypes = state.allRecipes;
            const filterTypes = action.payload === 'all' ?
            allTypes : allTypes.filter((e) => e.diet?.includes(action.payload) || e.diets?.find(e => e.name === action.payload))
            return {
                ...state,
                recipes : filterTypes
            }
        case CREATE_OR_API:
            state.recipes = state.allRecipes;
            const copy = state.recipes;
            const filterRecipe = ()=> {
                if(action.payload === 'all') {
                    return copy
                }
                else if(action.payload === 'create') {
                    return copy?.filter((e) => e.createDb === true)
                }
                else if(action.payload === 'api') {
                    return copy?.filter((e) => !e.createDb)
                }
                else {
                    return copy
                }
            }
            return {
                ...state,
                recipes: filterRecipe()
            }
        case ORDER_BY_NAME:
            const orderName = action.payload === 'all' ?
            state.recipes : action.payload === 'asc' ?
            state.recipes.sort((a,b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            }) :
            state.recipes.sort((a,b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                recipes: orderName
            }
            
        case ORDER_BY_SCORE:
            const orderScore = action.payload === 'all' ?
            state.recipes : action.payload === 'high' ?
            state.recipes.sort((a,b) => {
                if(a.healthScore > b.healthScore) return -1;
                if(b.healthScore > a.healthScore) return 1;
                return 0;
            })
            : state.recipes.sort((a, b) => {
                if(a.healthScore > b.healthScore) return 1;
                if(b.healthScore > a.healthScore) return -1;
                return 0;
            });
            return {
                ...state,
                recipes: orderScore
            }
        case REMOVE_DETAIL:
            return {
                ...state,
                detail: [],
                recipes: []
            }
        default: 
            return state;

    }
}