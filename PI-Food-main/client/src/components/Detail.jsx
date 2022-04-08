import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../actions";

export const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { name, summary, image, diet, dishTypes, spoonacularScore, healthScore} = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id]);

    return (
        <div key={id} className="detail-container">
            <div>
                <img src={image} alt="img not found" className="img-detail"/>
            </div>
            <div className="detail-info">
                <h3 className="title-detail">{name}</h3>
                <p>{summary && summary.replace(/<[^>]+>/g, "")}</p>
                <p>{dishTypes}</p>
                <br/>
                <div className="detail-dietScore">
                    <div>
                        <h3>Diets:</h3>
                        {diet?.map((e) => (
                        <h4 key={e} className='h4-diet'>
                            {e}
                        </h4>
                        ))}
                    </div>
                    <div>
                        <span>
                            SpoonacularScore:
                            <progress id="score" max="100" value={spoonacularScore} />{" "}
                            {spoonacularScore}/100
                        </span>
                        <br/>
                        <span id="healthScore">
                            HealthScore:
                            <progress id="healthScore" max="100" value={healthScore} />
                            {" "} {healthScore}/100
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
