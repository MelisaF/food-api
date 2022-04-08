import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { filterByTypes, getAll, getTypes, orderByName, orderByScore } from '../actions';
import { Card } from './Card'
import { Pagination } from './Pagination';
import { Link } from 'react-router-dom';

export const Home = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const diets = useSelector(state => state.diets)
    const [order, setOrder] = useState('');
    //Pagination
    const [page, setPage] = useState(1);
    const perpage = 9;
    const last = page * perpage;
    const first = last - perpage;
    const pageCurrent = recipes?.slice( first, last);
    const recipePage = Math.ceil(recipes.length / perpage)

    useEffect(() => {
        dispatch(getAll());
        dispatch(getTypes());
    }, [dispatch])


    function filterTypes(e) {
        dispatch(filterByTypes(e.target.value))
        setPage(1);
    }
    function orderAZ(e) {
        dispatch(orderByName(e.target.value));
        setOrder(`Order by name: ${e.target.value}`);
        setPage(1);
    }

    function orderScore (e) {
        dispatch(orderByScore(e.target.value));
        setOrder(`Order by score: ${e.target.value}`)
        setPage(1);
    }
    function handleReset(e) {
        e.preventDefault();
        dispatch(getAll());
    }

    return (
        <>
            <div>
                <select onChange= {filterTypes}>
                    <option value='all'>Filter by diets</option>
                    {diets?.map((e) => (
                        <option key={e.name} value={e.name}>
                            {e.name}
                        </option>
                    ))}
                </select>
                <select onChange= {orderAZ}>
                        <option value='all'>Order by name</option>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A</option>
                </select>
                <select onChange= {orderScore}>
                        <option value='all'>Order by score</option>
                        <option value='high'>Highest Score</option>
                        <option value='low'>Lowest Score</option>
                </select>
            </div>
            <div>
                <button onClick={handleReset}>View more recipes</button>
            </div>
            <div className='home-card'>
                {
                    pageCurrent?.length <= 0 ? 
                    (<iframe src="https://giphy.com/embed/3oEjI6SIIHBdRxXI40" width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen title='loading'/>) 
                    : typeof pageCurrent[0] === 'object' ? 
                    (
                        <div>
                            {pageCurrent?.map((e) => (
                                <Link to={`/recipes/${e.id}`} key={e.id} className="link-card">
                                    <Card
                                        key={e.id}
                                        image={e.image}
                                        name={e.name}
                                        diet={e.diets}
                                        healthScore={e.healthScore}
                                    /> 
                                </Link>
                            ))} 
                        </div>
                    ) : 
                    (
                        <div>
                            <p>404-Recipe not found</p>
                        </div>
                    )
                }
            </div>
            <div className='page'>
                <Pagination 
                    page= {page}
                    setPage={setPage}
                    recipePage={recipePage}
                /> 
            </div>
        </>
    )
}
