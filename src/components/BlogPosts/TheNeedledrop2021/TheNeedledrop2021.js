

const BlogContent = () => {
    return (
        <>
            <h2 id="section1" className="pres-header">Who is Anthony Fantano?</h2>
            <p>For those of you who recognize this man above, but not from music reviews, it might be from this infamous audio clip:
                <iframe className="post-vid" src="https://www.youtube.com/embed/HMKUlsJpov8">
                </iframe>
                But when he's not being a meme, he's actually a reputable music critic, posting most of his reviews on his youtube channel <a href="https://www.youtube.com/user/theneedledrop" target="_blank">theneedledrop</a>.
            </p>
            <p>
                A hallmark element of Anthony's videos are the numerical scores he gives at the ends of his videos. The scores range from 0-10, with a special category, "NOT GOOD", which he addresses in <a href="https://www.youtube.com/watch?v=EVvldiRCnec" target="_blank">this</a>
                video, (essentially, it means Anthony thought it was not worth the effort of reviewing or had a low expectation to begin with).

            </p>
            <p>
                Anthony started reviewing albums in 2008, and as of July 2021, has reviewed over <a href="#footnote1">at least [1]</a> 1400 albums, .
                Still,that's quite a bit of data, and in this article, we'll use data scraped from his website to take a look at his reviewing patterns over the years.

            </p>
            <p>
                While each review clearly holds more nuance than one singular number, for the sake of our analysis, we will have to overlook this oversimplification.
                Something else to note about Anthony's rating scale: he has stated that his ratings are not entirely comparable across different artists,
                but instead the rating is somewhat relative to past releases and expectations of an artist.
            </p>
            <p>
                So at the end of the day, the numbers are just numbers chosen by Anthony,
                and this is more-so just a for-fun look at trends in how one man chooses his numbers across genre, space, and time.
            </p>
            <p className="footnote" id="footnote1">[1] Not all his reviews are still posted, so my dataset only goes as far back as October 2012.</p>

            <h2 id="section2" className="pres-header">Annual Review Statistics</h2>
            <p>One of the most immediate questions we might have is, what is his average rating?
                And has it changed over the years?</p>
            <div id="stats-menu1">
            </div>
            <svg id="stat-svg1">
            </svg>
            <svg id="stat-svg2">
            </svg>
            <p>
                Anthony seems pretty consistent in sticking with an average score of ~6 year to year.
                In fact, the slight downward trend might just be due to an increased number of "Not Good" reviews (which I arbitrarily deemed as -1).
            </p>
            <h2 id="section3" className="pres-header">Scores by Genre</h2>
            <p>
                Let's see if this consistency holds across genres:
            </p>
            <h4 className="sub-header">Selected Genres:</h4>
            <div id="stats-menu3">
            </div>
            <div id="stats-menu3-btns">
                <input id="select-all-btn" className="btn-type1" type="button" value="Select All" />
                <input id="deselect-all-btn" className="btn-type1" type="button" value="Deselect All" />
            </div>
            <h4 className="sub-header">Graph Components:</h4>
            <div id="stats-menu3a" style={{ display: 'inline' }}>
            </div>
            <div id="stats-menu3b" style={{ display: 'inline', float: 'right' }}>
            </div>
            <svg id="stat-svg3">
            </svg>
            <p>Not as much here, Anthony seems to have some preference for certain genres (nothing wrong with that).
                Regardless, when sorted by <input type="button" className="btn-link" id="interactive-link-1" value="number of reviews" />,
                we can see experimental, jazz, singer-songwriter, and folk album reviews are Anthony's <b>7th, 11th, 10th, and 8th</b> most reviewed genres respectively.
                However, when sorted by <input type="button" className="btn-link" id="interactive-link-2" value="mean score" />,
                they take <b>1st through 4th</b>, with a mean score of <b>6.89</b> compared to the other genres with a mean score of <b>6.17</b>.</p>

            <h2 id="section4" className="pres-header">Anthony's Favorite Artists?</h2>
            <p>Can we paint a caricature of Fantano's favorite and least favorite artists based on his ratings? Who he deems most inconsistent?</p>
            <p>Let's look at these stats (with min. n reviews):</p>
            <div id="stats-menu4a" style={{ display: 'inline', float: 'left' }}>
                <label for="num-reviews-input" style={{ display: 'inline-block', textAlign: 'right' }}>
                    num. of reviews (n) = <span id="nValue-value"></span>
                </label>
                <input type="number" min="1" max="12" step="1" value="2" id="num-reviews-input" />
            </div>
            <div id="stats-menu4b" style={{ display: 'inline-block', paddingLeft: '10em' }}>
                <label for="num-artists-input"
                    style={{ display: 'inline-block', textAlign: 'right' }}>
                    num. of artists = <span id="nValue-value"></span>
                </label>
                <input type="number" min="5" max="25" step="5" value="10" id="num-artists-input" />
            </div>
            <div id="stats-menu4c" style={{ display: 'inline', float: 'right' }}>
            </div>
            <svg id="stat-svg4">
            </svg>
            <h2 id="section6" className="pres-header">Closing the Case on this Cantalope</h2>
            <p>OK, closing thoughts:
                Suprisingly, Anthony has been able to maintain his sanity reviewing music for years and continues to give out consistent ratings on the whole.
                He certainly has his own favorite genres and artists, but which reviewer doesn't. At the end of the day, critiquing is a subjective practice,
                and that's what makes it interesting. I think he's had a solid career, establishing a unique lane within the review industry
                and I'm excited to hear what comes next.
            </p>
            <p className="last-content">
                Overall, I'm thinking a strong 7 to a light 8.
            </p>
        </>
    )
}

export default BlogContent;
