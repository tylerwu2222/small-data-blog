import './Blog.css'
import tutorials from '../../site_data/tutorials.json';

import { Link } from "react-router-dom";

const Tutorial = ({ title, img, author, date, subPage, comingSoon = false }) => {
    let clickableLink = '';
    let hoverableDiv = ' hoverable-div';
    let unclickableTN = '';
    let authorDate = author + ' - ' + date;
    if (comingSoon) {
        title = title + ' (Coming Soon!)';
        clickableLink = ' unclickable-link';
        hoverableDiv = ' unhoverable-div';
        unclickableTN = ' unclickable-tn';
        authorDate = author;
    }
    return (
        <>
            <div className={"article-div" + hoverableDiv} >
                <Link to={"/tutorials/" + subPage} className={"blog-link" + clickableLink}>
                    <img className={"blog-tn" + unclickableTN} src={img} alt="thumbnail" />
                    <p className="blog-title">{title}</p>
                    <p className="blog-tn-author">{authorDate}</p>
                </Link>
            </div>
        </>
    )
};

const Tutorials = () => {
    // render
    return (
        <>
            <div className="container blog-container">
                {
                    tutorials.map(tut => {
                        if (tut.Hidden == "F") {
                            return <Tutorial title={tut.Title} img={'/img/thumbnails/tutorial_thumbnails/' + tut.FileName + '.png'} author={tut.Author} date={tut.Date} subPage={tut.FileName} />
                        }
                        else if (tut.Hidden == "W") {
                            return <Tutorial title={tut.Title} img={'/img/thumbnails/tutorial_thumbnails/' + tut.FileName + '.png'} author={tut.Author} date={tut.Date} subPage={tut.FileName} comingSoon={true} />
                        }
                    })

                }
            </div>
        </>
    )
};

export default Tutorials;