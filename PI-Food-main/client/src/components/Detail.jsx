import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, removeDetail } from "../actions";
import img from '../image/recipe.png';
import loading from '../image/loading.gif';

export const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { name, summary, image, diet, spoonacularScore, healthScore} = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id]);

    function handleRemove() {
        dispatch(removeDetail())
    }

    return (
        <>
            <div>
                <Link to="/home" onClick={handleRemove}>
                    <img className='img-logo' src={ img } alt='img not found'/>
                </Link>
            </div>
            <div>
                {
                    !name ?
                    (
                        <div className='loading-detail'>
                            <img src= { loading } alt='img not found' /> 
                        </div>
                    )
                    :
                    (
                        <div key={id} className="detail-container">
                            <div>
                                <img src={image} alt="img not found" className="img-detail"/>
                            </div>
                            <div className="detail-info">
                                <h3 className="title-detail">{name}</h3>
                                <p className="summary-detail">{summary && summary.replace(/<[^>]+>/g, "")}</p>
                                <br/>
                                <div className="score-container">
                                    <div className="title-score">
                                        <h3 id="spoonacularScore">SpoonacularScore:</h3>
                                        <h3 id="healthScore">HealthScore:</h3>
                                    </div>
                                    <div className="progress-container">
                                        <div className="pro">
                                            <progress id="spoonacularScore" max="100" value={spoonacularScore} />{spoonacularScore}/100
                                        </div>
                                        <div className="proH">
                                            <progress id="healthScore" max="100" value={healthScore} />{healthScore}/100
                                        </div>  
                                    </div>
                                </div>
                                <div className="diet-detail">
                                    <h3>Diets:</h3>
                                    {diet?.map((e) => (
                                        <h4 key={e} className='h4-diet'>
                                            {e} - 
                                        </h4>
                                    ))}
                                </div>     
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
