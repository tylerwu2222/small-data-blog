import './Home.css'

const Home = () => {
    return (
        <>
            <div className="container">
                <p id="slogan" className="center center-text">
                    A collection of data-driven stories and tutorials focused on the more <i>minuté</i> topics. <b>Click</b> the nodes below to view a blog post or tutorial.
                </p>
            </div>
            <div className="force-graph-container" id="articles-force-graph"></div>
            <div className="container" id="articles-force-graph-legend"></div>
        </>
    )
};

export default Home;