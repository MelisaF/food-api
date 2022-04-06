require("dotenv").config();
const { API_KEY } = process.env;
const { axios } = require('axios');
const { Router } = require ('express');
const { Op } = require('sequelize/types');
const { Recipe, Diet } = require('../db');
const router = Router();

const api= async() => {
    try {
        const apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const recipe = apiData.data.results?.map(e => {
            return {
                id: e.id,
                image: e.image,
                name: e.title,
                diet: e.diets,
                spoonacularScore: e.spoonacularScore,
                summary: e.summary,
            }
        })
        return recipe;
    } 
    catch (err) {
        console.log(err)
    }
} 

const db = async() => {
    try {
        const db = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        const recipeFind = db.map(e => ({
            id: e.id,
            image: e.image,
            name: e.name,
            diet: e.diets.map((d) => d.name),
            score: e.score,
            summary: e.summary,
            createdByUser: e.createdByUser,
        }))
        return recipeFind;
    } 
    catch (err) {
        console.log(err)
    }
}

const allRecipe = async() => {
    try {
        const apiR = await api();
        const dbR = await db();
        const allR = apiR.concat(dbR);
        return allR;
    } 
    catch (err) {
        console.log(err)
    }
}

const apiName= async(name) => {
    try{
        const urlApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const names = urlApi.data.results((e) => {
            return {
                id: e.id,
                image: e.image,
                name: e.title,
                diet: e.diets,
                spoonacularScore: e.spoonacularScore,
                summary: e.summary,
            }
        })
        return names.filter((e) => {
            e.name.toLowerCase().includes(name.toLowerCase())
        })
    }
    catch(err) {
        console.log(err)
    }
}

const dbName = async(name) => {
    try {
        const names = await Recipe.findAll({
            where: { name: { [Op.iLike]: '%' + name + '%'}},
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
        const nameDb = names.map(e => ({
            id: e.id,
            image: e.image,
            name: e.name,
            diet: e.diets.map((d) => d.name),
            score: e.score,
            summary: e.summary,
            createdByUser: e.createdByUser,
        }))
        return nameDb;
    } catch (err) {
        console.log(err)
    }
}

const allNames = async (name) => {
    try {
        const api = await apiName(name);
        const db = await dbName(name);
        const all = api.concat(db);
        return all;
    } catch (err) {
        console.log(err)
    }
}
router.get('/', async(req, res) => {
    const { name } = req.query;
    try {
        const allRecipes = await allRecipe();
        if(!name) {
            return res.status(200).send(allRecipes);
        }
        else if(name) {
            const allName = await allNames(name);
            return res.status(200).send(allName)
        }
        else {
            return res.status(400).json({msg: 'Recipe not found'})
        }
    }
    catch (error) {
        console.log(error)
    }
})

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
                through: {
                    attributes:[]
                }
            }
        })
        return {
            id: id,
            image: dbId.image,
            name: dbId.name,
            score: dbId.score,
            summary: dbId.summary,
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
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const idRecipe = await allId(id);
    try {
        if(idRecipe) {
            return res.status(200).send(idRecipe)
        }
        else {
            return res.status(400).json({msg:'Recipe not found'})
        } 
    }
    catch(err) {
        console.log(err)
    }
    
})

module.exports = router;