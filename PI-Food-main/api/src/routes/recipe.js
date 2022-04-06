const { Router } = require ('express');
const { Recipe, Diet } = require('../db');
const router = Router();

router.post('/', async(req, res, next) => {
    const { name, summary, spoonacularScore, healthScore, instructions, image, createDb, diets} = req.body;
    try {    
        const createRecipe = await Recipe.create ({
            name, summary, spoonacularScore, healthScore, instructions, image, createDb
        })
        const diet = await Diet.findAll({
            where: { name: diets }
        })
        createRecipe.addDiet(diet)
        return res.status(200).send(createRecipe)
    }
    catch(err) {
        res.status(404).json('Recipe not created')
        next(err)
    }
})

module.exports = router;