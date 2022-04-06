export const Card = ({id, name, diets, image}) => {
    return (
        <div key={id} className="card-container">
            <img src={image} alt='img not found' className='img-card'/>
            <h3 className='color-h3'>{name}</h3>
            <p className='color-font'>{diets}</p>
        </div>
    )
}
