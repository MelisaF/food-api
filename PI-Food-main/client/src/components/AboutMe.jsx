import { Link } from 'react-router-dom';
import img from '../image/recipe.png';
import html from '../image/html.png';
import css from '../image/css.png';
import js from '../image/js.png';
import react from '../image/react.png';
import sql from '../image/sql.png';
import '../style/style.css';


export const AboutMe = () => {
    return (
        <div>
            <Link to="/home">
                <img className='img-logo' src={ img } alt='img not found'/>
            </Link>
            <h1 className='title-me'>ABOUT ME</h1>
            <br/>
            <p className='title-me'>
                My name is Melisa Ferreyra. I'am  Full Stack, web developer. <br/>
                I started to study programming at the begining of 2018.<br/>
                In 2022 I was accepted in SoyHenry's Bootcamp to become a full-stack developer. <br/>
                This is my individual project.<br/>
                My skills are HTML, CSS, Javascrip, React, Redux, Express, SQL, Sequelize.<br/>
            </p>
            <div className='icon-redes'>
                <img src={html} alt='img not found'/>
                <img src={css} alt='img not found'/>
                <img src={js} alt='img not found'/>
                <img src={react} alt='img not found'/>
                <img src={sql} alt='img not found'/>
            </div>
        </div>
    )
}
