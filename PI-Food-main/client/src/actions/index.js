import axios from "axios";
import { GET_ALL, GET_TYPES, POST_RECIPE, GET_DETAIL, GET_NAME, FILTER_TYPES, ORDER_BY_NAME, ORDER_BY_SCORE, CREATE_OR_API, REMOVE_DETAIL } from "../actions/types";

export function getAll() {
    return async function(dispatch) {
        try {
            const api= await axios.get('http://localhost:3001/recipes');
            return dispatch({
                type: GET_ALL,
                payload: api.data
            })
        } 
        catch (err) {
            console.log(err)
        }
    }
}

export function getTypes() {
    return async function(dispatch) {
        try {
            const diets = await axios.get('http://localhost:3001/diets');
            return dispatch({
                type: GET_TYPES,
                payload: diets.data
            })
        } 
        catch (err) {
            console.log(err)
        }
    }
}

export function getName(name) {
    return async function (dispatch) {
        try {
            const queryName = await axios.get('http://localhost:3001/recipes?name=' + name)
            return dispatch({
                type: GET_NAME,
                payload: queryName.data
            })
        } 
        catch (err) {
            alert('Recipe not found', err)
        }
    }
}
export function postRecipe(payload) {
    return async function(dispatch) {
        try {
            const postUrl = await axios.post('http://localhost:3001/recipe', payload);
            return dispatch ({
                type: POST_RECIPE,
                payload: postUrl.data
            })
        } 
        catch (err) {
            console.log(err)
        }
    }
}

export function getDetail (id) {
    return async function(dispatch) {
        try {
            const detail = await axios.get('http://localhost:3001/recipes/' + id);
            return dispatch ({
                type: GET_DETAIL,
                payload: detail.data
            })
        } 
        catch (err) {
            console.log(err)   
        }
    }
}

export function filterByTypes(payload) {
    console.log(payload, 'filterbytipe')
    return {
        type: FILTER_TYPES,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByScore (payload) {
    return {
        type: ORDER_BY_SCORE,
        payload
    }
}

export function createOrApi (payload) {
    return {
        type: CREATE_OR_API,
        payload
    }
}

export function removeDetail(payload) {
    return {
        type: REMOVE_DETAIL,
        payload
    }
}