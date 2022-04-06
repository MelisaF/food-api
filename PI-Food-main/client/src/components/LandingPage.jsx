import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAll } from '../actions';
import '../style/style.css';

export const LandingPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll())
    }, [dispatch])

    return (
        <div className='container-landing'>
            <Link to="/home">
                <button className='btn-landing'>View more recipes</button>
            </Link>
        </div>
    )
}
