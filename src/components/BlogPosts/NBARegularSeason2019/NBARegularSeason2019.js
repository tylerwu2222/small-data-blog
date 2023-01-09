import SVG1 from "./SVGs/svg1";
import SVG2 from "./SVGs/svg2";

const NBARegularSeason2019 = () => {
    return (
        <>
            <img src={'/img/thumbnails/blog_thumbnails/NBA_regular_season_2019b.png'} className='post-main-img' alt='blog-post-thumbnail'></img>
            <p>A Visual Recap of the 2019-20 regular season:
            </p>
            <h2 id="section1" class="pres-header">Regular Season W-L Bar Chart Race</h2>
            <p>
                Yes, I know bar chart races are one of those infamous
                "looks-cool-but-doesn't-actually-give-you-anything-insightful" chart types,
                but I wanted to learn how to make one, so this is the result.
            </p>
            <p>
                Plus, I wanted commemorate the Lakers championship season. (RIP Celtics, RIP Clips).
            </p>
            <div class="row display-row">
                <div class="col-4">
                    <span id="splits-menu">
                    </span>
                    <span id="speed-btns">
                    </span>
                </div>
                <div class="col-8">
                    <span id="notes-display"></span>
                    <svg id="svg-skip"></svg>
                </div>
            </div>
            <div id="chart1">
                <SVG1 />
                {/* <svg id="svg-reg">
                    <g id="main-g"></g>
                </svg> */}
            </div>
            <h2 id="section1" class="pres-header">Static Regular Season W-L</h2>

            <div id="chart2">
                <SVG2/>
                {/* <svg id="svg-reg2">
                    <g id="main-g2"></g>
                </svg> */}
            </div>
        </>
    )
}

export default NBARegularSeason2019;
