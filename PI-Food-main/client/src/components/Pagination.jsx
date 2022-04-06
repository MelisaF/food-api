import { useState } from "react";
import '../style/style.css';

export const Pagination = ({ page, setPage, maxRecipes}) => {
    const [input, setInput] = useState(1);
    
    const nextPage = () => {
        setInput(input + 1);
        setPage(page + 1);
    }
    const previusPage = () => {
        setInput(input - 1);
        setPage(page - 1);
    }
    return (
        <div className="pagination-container">
            <button className="btn-page" onClick={previusPage}>
                <i className='fas'>&#xf191;</i>
            </button>
            <span className="span-page">{input}</span>
            <span> de </span>
            <span className="span-page">{maxRecipes}</span>
            <button className="btn-page" onClick={nextPage}>
            <i className='fas'>&#xf152;</i>
            </button>
        </div>
    )
}
