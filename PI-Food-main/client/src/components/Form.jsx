import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../style/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, getTypes, postRecipe } from '../actions';

export const Form = () => {
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets)
    
    const [err, setErr] = useState({});
    const history = useHistory();
    
    useEffect(() => {
        dispatch(getAll());
        dispatch(getTypes());
    }, [dispatch]);
    
    // name, summary, spoonacularScore, healthScore, steps, diets, image
    function validate(input) {
        const validateName = /^[a-zA-Z\s]+$/ ;
        const validateUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/ ;
        let err= {};
        if(!input.name.length) {
            err.name = 'This field cannot be empty';
        }
        if(!validateName.test(input.name)) {
            err.name = 'Special characters or numbers are not allowed';
        }
        if(!input.summary.length) {
            err.summary = 'This field cannot be empty'
        }
        if(input.summary.length < 50) {
            err.summary = 'This field must be at least 50 characters';
        }
        if(input.spoonacularScore < 1 || input.spoonacularScore > 100 ) {
            err.spoonacularScore = 'Number required. Must be a number between 1-100';
        }
        if(input.healthScore < 1 || input.healthScore > 100) {
            err.healthScore = 'Number required. Must be a number between 1-100';
        }
        if(!input.instructions.length) {
            err.instructions = 'This field cannot be empty';
        }
        if(input.diet?.length < 1) {
            err.diet = 'This field cannot be empty';
        }
        if(input.image && !validateUrl.test(input.image)) {
            err.image = 'This is not a valid URL'
        }
        return err;
    }

    const disable = useMemo(() => {
        if(err.name || err.summary || err.spoonacularScore || err.healthScore || err.instructions || err.diet || err.image) {
            return true;
        }
        return false;
    }, [err])

    const [input, setInput] = useState({
        name: '',
        summary:'',
        spoonacularScore: 0,
        healthScore: 0,
        instructions: '',
        diet: [],
        image: ''
    })

    useEffect(() =>  {
        setErr(validate(input))
    }, [input])

    function handleChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErr(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCheck (d) {
        console.log(input.diet)
        if(!input.diet.includes(d.target.name)) {
            setInput({
                ...input,
                diet: [...input.diet, d.target.name],
            })
        }
        else {
            setInput({
                ...input,
                diet: input.diet.filter(e => e !== d.target.name)
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(Object.keys(err).length === 0 && input.diet.length > 0) {
            dispatch(postRecipe(input))
            alert('Recipe created successfully!')
            setInput({
                name: '',
                summary:'',
                spoonacularScore: 0,
                healthScore: 0,
                instructions: '',
                diet: [],
                image: ''
            })
            history.push('/home');
        }
        else {
            alert('All fields must be completed!')
        }
    }

    return (
        <>
            <h1 className='title-form'>CREATE YOUR RECIPE</h1>
            <form onSubmit={handleSubmit}>
                <label>Name*:</label>
                <input 
                    type='text'
                    name='name'
                    value={input.name}
                    onChange={handleChange} 
                    className='input'
                />
                {err.name && <p className='err-color'>{err.name}</p>}
                <label>Summary*:</label>
                <textarea 
                    type='text'
                    name='summary'
                    value={input.summary} 
                    onChange={handleChange}
                    className='input' 
                />
                {err.summary && <p className='err-color'>{err.summary}</p>}
                <label>Spoonacular score*:</label>
                <input 
                    type="range"
                    min= '1' 
                    max= '100'
                    name='spoonacularScore'
                    value={input.spoonacularScore}
                    onChange={handleChange} 
                    className='input'
                />
                {err.spoonacularScore && <p className='err-color'>{err.spoonacularScore}</p>}
                <label>Health score*:</label>
                <input 
                    type="range"
                    min= '1' 
                    max= '100'
                    name='healthScore'
                    value={input.healthScore}
                    onChange={handleChange} 
                    className='input'
                />
                {err.healthScore && <p className='err-color'>{err.healthScore}</p>}
                <label>Instructions*:</label>
                <textarea 
                    type="text" 
                    name='instructions'
                    value={input.instructions}
                    onChange={handleChange} 
                    className='input'
                />
                {err.instructions && <p className='err-color'>{err.instructions}</p>}
                <label>Diets*:</label>
                <br/>
                {diets?.map(e=> (
                    <label key={e.name} className='input'>
                        <input
                            type='checkbox'
                            name={e.name}
                            value={e.name}
                            onChange={d => {handleCheck(d)}} 
                            
                        />
                        {e.name}
                    </label>
                ))}
                <label>Image*:</label>
                <input 
                    type='url'
                    name='image'
                    value={input.image}
                    onChange={handleChange} 
                    className='input'
                />
                {err.image && <p className='err-color'>{err.image}</p>}
                <button onChange={handleChange} type='submit' className='btn-create' disabled={disable}> Create </button>
            </form>
        </>
    )
}
