import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { filterByTypes, getAll, getTypes } from '../actions';
import { Card } from './Card'
import { Pagination } from './Pagination';
import { Link } from 'react-router-dom';

export const Home = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const diets = useSelector(state => state.diets)

    //Pagination
    const [page, setPage] = useState(1);
    const perpage = 9;
    const last = page * perpage;
    const first = last - perpage;
    const pageSlice = recipes?.slice( first, last);
    const recipePage = Math.ceil(recipes.length / perpage)

    useEffect(() => {
        dispatch(getAll());
        dispatch(getTypes());
    }, [dispatch])


    function filterTypes(e) {
        e.preventDefault();
        dispatch(filterByTypes(e.target.value))
        setPage(1);
    }

    function notRecipe() {
        return (
            <div>
                <p>Recipe not found</p>
            </div>
        )
    }
    return (
        <>
            <div>
                <select onChange={filterTypes}>
                <option defaultValue='all'>Filter by diets</option>
                {
                    diets?.map(e => {
                        return (
                            <option key={e.name} value={e.name}>
                                {''}
                                {e.name[0].toUpperCase() + e.name.slice(1)}
                            </option>
                        )
                        
                        })
                }
                </select>
            </div>
            <div className='home-card'>
                {
                    pageSlice?.length <= 0 ? <iframe src="https://giphy.com/embed/3oEjI6SIIHBdRxXI40" width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen title='loading'/> :  
                    !pageSlice?.length?  notRecipe():  
                    pageSlice?.map(e => {
                        return (
                            <Link to={`/recipes/${e.id}`} className="link-card">
                                <Card
                                    key={e.id}
                                    image={e.image}
                                    name={e.name}
                                    diet={e.diet}
                                /> 
                            </Link>
                        )
                    })  
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
