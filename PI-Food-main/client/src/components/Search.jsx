import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getName, removeDetail } from '../actions';
import img from '../image/recipe.png';
import searchIcon from '../image/lupa.png';
import '../style/style.css';

export const Search = ({setPage}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getName(name))
        setPage(1)
        setName('')
        if(!name) {
            alert('Recipe not found')
        }
    }    
    function handleRemove(){
        dispatch(removeDetail())
    }

    return (
        <div className='search-container'>
            <div>
                <Link to="/home" onClick={handleRemove}>
                    <img className='img-logo' src={ img } alt='img not found'/>
                </Link>
            </div>
            <div className='flex-search' >
                <input type="text"  value={name} placeholder="Search recipe" className="input-search" onChange={e => {handleChange(e)}} />
                <button  className='btn-search' type='submit' onClick={e => {handleSubmit(e)}}><img src={searchIcon} alt='img not found'/></button> 
            </div>
        </div>
    )
}
