import './Blog.css'
import tools from '../../site_data/tools.json';
import { Link } from 'react-router-dom';

const Tool = ({ title, img, author, date, subPage, comingSoon = false }) => {
    let clickableLink = '';
    let hoverableDiv = ' hoverable-div';
    let unclickableTN = '';
    let authorDate = author + ' - Last updated: ' + date;
    if (comingSoon){
        title = title + ' (Coming Soon!)';
        clickableLink = ' unclickable-link';
        hoverableDiv = ' unhoverable-div';
        unclickableTN = ' unclickable-tn';
        authorDate = author;
    }
    return (
        <>
            <div className={"article-div" + hoverableDiv} >
                {/* <a className={"blog-link" + clickableLink} href="/tools"> */}
                <Link to={"/tools/" + subPage} className={"blog-link" + clickableLink}>
                    <img className={"blog-tn" + unclickableTN} src={img} alt="thumbnail" />
                    <p className="blog-title">{title}</p>
                    <p className="blog-tn-author">{authorDate}</p>
                </Link>
                {/* </a> */}
            </div>
        </>
    )
};


const Tools = () =>{
// render
return (
    <>
        <div className="container blog-container">
            {
                tools.map(tool => {
                    if (tool.Hidden == "F") {
                        return <Tool title={tool.Title} img={'/img/thumbnails/tool_thumbnails/' + tool.FileName + '.png'} author={tool.Author} subPage={tool.FileName} date={tool.Date} />
                    }
                    else if (tool.Hidden == "W"){
                        return <Tool title={tool.Title} img={'/img/thumbnails/tool_thumbnails/' + tool.FileName + '.png'} author={tool.Author} subPage={tool.FileName} date={tool.Date} comingSoon={true}/>
                    }
                    })

            }
        </div>
    </>
)
};

export default Tools;