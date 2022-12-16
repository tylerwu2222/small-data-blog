const SmallImage = ({fileName}) => {
    return (
        <img className="img-small" src={fileName} alt={fileName}>
        </img>
    )
}

export default SmallImage;