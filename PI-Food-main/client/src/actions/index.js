import axios from "axios"
import { GET_ALL, GET_TYPES, POST_RECIPE, GET_DETAIL, GET_NAME, FILTER_TYPES } from "../actions/types";

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
            console.log(diets)
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
            const queryName = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type: GET_NAME,
                payload: queryName
            })
        } 
        catch (err) {
            console.log(err)
        }
    }
}
export function postRecipe() {
    return async function(dispatch) {
        try {
            const postUrl = await axios.post('http://localhost:3001/recipe');
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
    return {
        type: FILTER_TYPES,
        payload
    }
}
