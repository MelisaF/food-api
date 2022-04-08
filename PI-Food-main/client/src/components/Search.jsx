import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../actions';
import '../style/style.css';
import searchIcon from '../image/lupa.png';

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

    return (
        <div className='flex-search' >
            <input type="text"  value={name} placeholder="Search recipe" className="input-search" onChange={e => {handleChange(e)}} />
            <button  className='btn-search' type='submit' onClick={e => {handleSubmit(e)}}><img src={searchIcon} alt='img not found'/></button> 
        </div>
    )
}
