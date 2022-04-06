import React from 'react'
import img from '../image/recipe.png';
import '../style/style.css';
import { Link } from 'react-router-dom';
import { Search } from './Search';

export const Navbar = () => {
    return (
        <div className='container-nav'>
            <img className='img-logo' src={ img } alt='img not found'/>
            <nav className='nav-navbar'>
                <div className='div-nav'> 
                    <Link to="/home" className='link'>Home</Link>
                    <div className="vl"></div>
                </div>
                <div className='div-nav'>
                    <Link to="/recipe" className='link'>New recipe</Link>
                    <div className="vl"></div>
                </div> 
                <div className='div-nav-about'>
                    <Link to="/aboutMe" className='link'>About me</Link>
                </div>
                <Search/>
            </nav>
            
        </div>
    )
}
