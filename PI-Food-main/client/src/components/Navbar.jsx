import React from 'react'
import img from '../image/recipe.png';
import '../style/style.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeDetail } from '../actions';
import { Search } from './Search';

export const Navbar = ({setPage}) => {
    const dispatch = useDispatch();
    
    function handleRemove(){
        dispatch(removeDetail())
    }

    return (
        <div className='container-nav'>
            <Link to="/home" onClick={handleRemove}>
                <img className='img-logo' src={ img } alt='img not found'/>
            </Link>
            <nav className='nav-navbar'>
                <div className='div-nav'> 
                    <Link to="/home" className='link' onClick={handleRemove}>Home</Link>
                    <div className="vl"></div>
                </div>
                <div className='div-nav'>
                    <Link to="/recipe" className='link'>New recipe</Link>
                    <div className="vl"></div>
                </div> 
                <div className='div-nav-about'>
                    <Link to="/aboutMe" className='link'>About me</Link>
                </div>
            </nav>
            <Search setPage= {setPage} />
        </div>
    )
}
