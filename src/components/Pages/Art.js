import './Art.css';
import './Blog.css';
import Arts from '../../site_data/arts.json';
import ArtPage from '../ArtPage/ArtPage';

import { Link } from "react-router-dom";


const ArtCategory = ({ title, img, date, subPage }) => {
    return (
        <>
            <div class="article-div hoverable-div">
                <Link to={"/art/" + subPage} className="blog-link">
                    <img className="blog-tn" src={img} alt="thumbnail" />
                    <p className="blog-title">{title}</p>
                    <p className="blog-tn-author">{date}</p>
                </Link>
            </div>
        </>
    )
};

const Art = () => {
    return (<>
        <div class="container blog-container">
                {
                    Arts.map(category => {
                        return <ArtCategory title={category.Title} img={'img/thumbnails/art_thumbnails/' + category.FileName + '.png'} date={category.LastUpdated} subPage={category.FileName} />
                    }
                    )

                }
        </div>
    </>
    )
};

export default Art;