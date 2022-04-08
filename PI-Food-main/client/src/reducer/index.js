import { FILTER_TYPES, GET_ALL, GET_DETAIL, GET_NAME, GET_TYPES, ORDER_BY_NAME, ORDER_BY_SCORE } from "../actions/types";

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
            const allTypes = state.allRecipes;
            console.log(allTypes, 'copia del estado')
            const filterTypes = action.payload === 'all' ?
            allTypes : allTypes.filter(e => e.diet?.includes(action.payload))
            console.log(filterTypes, 'filter type')
            return {
                ...state,
                recipes : filterTypes
            }
        case ORDER_BY_NAME:
            const orderName = action.payload === 'all' ?
            state.allRecipes : action.payload === 'asc' ?
            state.allRecipes.sort((a,b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            }) :
            state.allRecipes.sort((a,b) => {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
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
            state.allRecipes : action.payload === 'high' ?
            state.allRecipes.sort((a,b) => {
                if(a.healthScore > b.healthScore) return -1;
                if(b.healthScore > a.healthScore) return 1;
                return 0;
            })
            : state.allRecipes.sort((a, b) => {
                if(a.healthScore > b.healthScore) return 1;
                if(b.healthScore > a.healthScore) return -1;
                return 0;
            });
            return {
                ...state,
                recipes: orderScore
            }
        default: 
            return state;

    }
}