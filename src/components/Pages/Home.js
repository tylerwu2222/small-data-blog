import './Home.css'

const home_image_path = '/img/HomeMosaic/';
const home_images = [
    'fantano1',
    'fantano2',
    'nba1',
    'tort1',
    'berk_nature1',
    'berk_nature2',
    'NASHBoard1',
    'art1',
    'art2'
];

const Home = () => {
    return (
        <>
            <div className="container">
                <p id="slogan" className="center center-text">
                    This is a blog where I create and post data-driven stories, art, tools, and tutorials focused on some random, small-ish topics. <br />
                    Here are a few screenshots of the things I've made to get a taste:
                </p>
                {home_images.map(i => {
                    return (<img src={home_image_path + i + '.png'} className='home-img'></img>);
                })}
                {/* <p id="slogan" className="center center-text">
                    A collection of data-driven stories and tutorials focused on the more <i>minuté</i> topics. <b>Click</b> the nodes below to view a blog post or tutorial.
                </p> */}
            </div>
            {/* <div className="force-graph-container" id="articles-force-graph"></div>
            <div className="container" id="articles-force-graph-legend"></div> */}
        </>
    )
};

export default Home;