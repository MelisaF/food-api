import '../style/style.css';
import { Link } from 'react-router-dom';


export const Navbar = () => {
    return (
        <div className='container-nav'>
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
            </nav>
        </div>
    )
}
