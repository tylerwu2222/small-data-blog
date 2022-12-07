import './Blog.css';
import blogPosts from '../../site_data/blog_posts.json';

import { Link } from "react-router-dom";

const sortPostsDiv = () => {
    return (
        <div className="select-div" style="display: none;">
            <select name="sort-by">
                <option value="date1">date - newest</option>
                <option value="date2">date - oldest</option>
                <option value="views1">views - most</option>
                <option value="views2">views - least</option>
            </select>
        </div>
    )
}

const BlogThumbnail = ({ title, img, author, date, subPage, comingSoon }) => {
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
            <div className={"article-div" + hoverableDiv} title={title}>
                <Link to={"/blog/" + subPage} className={"blog-link" + clickableLink}>
                    {/* <a className={"blog-link" + clickableLink} href={"/blog_posts/" + subPage + '/' + subPage + '.html'}> */}
                    <img className={"blog-tn" + unclickableTN} src={img} alt="thumbnail" />
                    <p className="blog-title">{title}</p>
                    <p className="blog-tn-author">{authorDate}</p>
                    {/* </a> */}
                </Link>
            </div>
        </>
    )
}

const Blog = () => {
    // render
    return (
        <>
            <div className="container blog-container">
                {
                    blogPosts.map(post => {
                        if (post.Hidden == "F") {
                            return <BlogThumbnail title={post.Title} img={'/img/thumbnails/blog_thumbnails/' + post.FileName + '.png'} author={post.Author} date={post.Date} subPage={post.FileName} />
                        }
                        else if (post.Hidden == "W") {
                            return <BlogThumbnail title={post.Title} img={'/img/thumbnails/blog_thumbnails/' + post.FileName + '.png'} author={post.Author} date={post.Date} subPage={post.FileName} comingSoon={true} />
                        }
                    })

                }
            </div>
        </>
    )
};

export default Blog;