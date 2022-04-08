export const Card = ({id, name, diet, image, healthScore}) => {
    return (
        <div key={id} className="card-container">
            <img src={image} alt='img not found' className='img-card'/>
            <h3 className='color-h3'>{name}</h3>
            <div className="card-flex">
                <div>
                    <span className='color-font'>Diet:</span>
                    {diet?.map((e) => (
                    <p className='color-font' key={e.name}>
                        {e.name}
                    </p>
                    ))}
                </div>
                <div>
                    <span className='color-font'>Health score: {healthScore}</span>
                </div>
            </div> 
        </div>
    )
}
