const { Router } = require ('express');
const router = Router();
const { allRecipes, allId } = require('../controlers/function')

router.get('/', async(req, res) => {
    const { name } = req.query;
    try {
        const recipes = await allRecipes();
        if(name) {
            var recipeName = recipes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(404).send('Recipe not found');
        }
        else {
            return res.status(200).json(recipes? recipes : {msg: 'Recipe not found'} )
        }
    }
    catch (error) {
        console.log(error)
    }
})

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

module.exports = router