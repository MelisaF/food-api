require("dotenv").config();
const { API_KEY } = process.env;
const { default: axios } = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diet } = require ('../db.js');

const apiRecipes= async() => {
    try {
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const recipe = apiUrl.data.results?.map((e) => {
            return {
                id: e.id,
                image: e.image,
                name: e.title,
                diets: e.diets?.map(e => {
                    return {name: e}
                }),
                spoonacularScore: e.spoonacularScore,
                healthScore: e.healthScore,
                summary: e.summary,
            }
        })
        
        return recipe;
    } 
    catch (err) {
        console.log(err)
    }
} 

const dbRecipes = async() => {
    try {
        return await Recipe.findAll({
            // where: { name: { [Op.iLike]: '%' + name + '%'} },
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
    } 
    catch (err) {
        console.log(err)
    }
}

const allRecipes = async (name) => {
    try {
        const api = await apiRecipes();
        const db = await dbRecipes(name);
        const all = [...api, ...db];
        return all;
    } 
    catch (error) {
        console.log(error);
    }
}


const idApi = async(id) => {
    try {
        const url = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        const detail = url.data;
            return {
            id: id,
            image: detail.image,
            name: detail.title,
            diet: detail.diets,
            summary: detail.summary,
            spoonacularScore: detail.spoonacularScore,
            healthScore: detail.healthScore,
            instructions: detail.instructions,
        }
    } 
    catch (err) {
        console.log(err)
    }
}

const idDb = async (id) => {
    try {
        const dbId = await Recipe.findByPk(id, {
            include: {
                model: Diet,
                attributes: ['name'],
                through: { attributes:[] }
            }
        })
        return {
            id: id,
            image: dbId.image,
            name: dbId.name,
            score: dbId.score,
            summary: dbId.summary,
            spoonacularScore: dbId.spoonacularScore,
            healthScore: dbId.healthScore,
            instructions: dbId.instructions,
            createdByUser: dbId.createdByUser,
            diet: dbId.diets.map((e) => e.name),
        }
    } catch (err) {
        console.log(err)
    }
}

const allId = async(id) => {
    try {
        if(id.includes('-')) {
            const db = await idDb(id);
            return db;
        }
        const api = await idApi(id);
        return api
    } 
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    apiRecipes,
    dbRecipes, 
    allRecipes,
    idApi,
    idDb,
    allId
}