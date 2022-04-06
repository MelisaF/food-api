import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../actions';
import '../style/style.css'

export const Search = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInput(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getName(name))
    }

    return (
        <div className='flex-search' onClick={handleSubmit}>
            <input type="search"  placeholder="Search recipe" className="input-search" onChange={handleInput}/> 
        </div>
    )
}
