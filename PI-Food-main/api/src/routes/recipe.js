const { Router } = require ('express');
const { dbRecipes } = require('../controlers/function');
const { Recipe, Diet } = require('../db');
const router = Router();

router.post('/', async(req, res) => {
    const { name, summary, spoonacularScore, healthScore, instructions, image, createDb, diet} = req.body;
    try {    
        const createRecipe = await Recipe.create ({
            name, summary, spoonacularScore, healthScore, instructions, image, createDb
        })
        diet?.map( async (e) => {
            const dietDb = await Diet.findAll({
            where: { name: e }
        })
        await createRecipe.addDiet(dietDb)
    })
        return res.status(200).send(createRecipe)
    }
    catch(err) {
        res.json(err)
    }
})

module.exports = router;