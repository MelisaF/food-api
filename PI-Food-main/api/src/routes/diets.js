const { Router } = require('express');
const router = Router();
const { Diet } = require('../db');

const typesDiet = async() => {
    try {
        const td = await Diet.findAll();
        if(td.length) {
            return td
        }
        const types = [
            "gluten free",
            "dairy free",
            "ketogenic",
            "vegetarian",
            "lacto vegetarian",
            "lacto ovo vegetarian",
            "ovo vegetarian",
            "vegan",
            "pescatarian",
            "paleolithic",
            "primal",
            "fodmap friendly",
            "whole 30",
        ];
        types.map(async(e) => {
            await Diet.findOrCreate({
                where: {name:e}
            })
        })
        return await Diet.findAll();
    } 
    catch (err) {
        console.log(err)
    }
}

router.get('/', async(req,res) => {
    try {
        const diets = await typesDiet();
        res.send(diets)
    } 
    catch (err) {
        console.log(err)
    }
})

module.exports = router;
