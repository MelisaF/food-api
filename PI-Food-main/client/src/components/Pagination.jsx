import { useState } from "react";
import '../style/style.css';

export const Pagination = ({ page, setPage, recipePage}) => {
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
            <button className="btn-page" onClick = { previusPage } disabled= { page === 1 || page < 1 }>
                <i className='fas'>&#xf191;</i>
            </button>
            <button className="btn-page" onClick = { nextPage } disabled= { page === Math.ceil(recipePage) || page > recipePage} >
            <i className='fas'>&#xf152;</i>
            </button>
        </div>
    )
}
