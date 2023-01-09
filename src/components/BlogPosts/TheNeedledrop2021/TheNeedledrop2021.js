import SVG1 from "./SVGs/svg1";
import SVG3 from "./SVGs/svg3";
import SVG4 from "./SVGs/svg4";

import { TNDProvider } from "./SVGs/TNDContext";
import { useEffect, useState } from "react";
import data from './Data/fantano_7_15_21_albums.csv';

// import { ThemeProvider, createTheme } from '@mui/material/styles';
import DropdownMenu from '../Modules/DropdownMenu';
import checkboxGroup from '../Modules/checkboxGroup.js';

import * as d3 from 'd3';

// styling

// Things I need to modularize
const parseTime = d3.timeParse("%d-%b-%y");



const group_by = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});

const w_width = window.innerWidth, w_height = window.innerHeight;
const article_width = (w_width <= 450) ? 0.95 : 0.6; // ternary operator
const article_height = 0.75;
const padding_v = 60, padding_h = 60;
const config = {
    "vw": article_width * w_width,
    "vh": article_height * w_height,
    "small_vh": article_height * w_height * 0.8,
    "inner_vw": article_width * w_width - padding_h,
    "inner_vh": article_height * w_height - padding_v,
    "small_inner_vh": article_height * w_height * 0.8 - padding_v,
    "anim_speed": 3000,
    "color1": "#FCF281",
    "stroke1": "#262626"
}


// blog content
const BlogContent = () => {
    // const [loading, setLoading] = useState(true);
    // const [albumData, setAlbumData] = useState([]);
    const [albumData1, setAlbumData1] = useState(null);
    const [albumData3, setAlbumData3] = useState(null);
    const [albumData3Quantiles, setAlbumData3Quantiles] = useState([]);
    // let albums_by_year, grouped_by_genre;
    let gbg_quantiles, gba_quantiles, grouped_by_artist;
    let num_reviews = 2, num_artists = 10;
    let annual_avg_data, artist_avg_data, tooltip_content;

    // load data
    useEffect(() => {
        d3.csv(data)
            .then(dta => {
                // console.log('data', dta);

                dta.forEach(d => {
                    d.Year = +d.Year; // year to numeric
                    d.Score = +d.Score; // year to numeric
                    d.Date = parseTime(d.Date); // format to date
                    d.Artists = d.Artists.split('<,>')
                    d.Genres = d.Genres.split(',')
                });
                console.log('raw data', dta);
                // init album datas
                setAlbumData1(dta);

                // group albums by year
                // const group_by_year = group_by('Year');
                // albums_by_year = group_by_year(album_data)
                // for (const year in albums_by_year) {
                //     let scores = albums_by_year[year].map(r => r.Score)
                //     let total = 0;
                //     for (var i = 0; i < scores.length; i++) {
                //         total += scores[i];
                //     }
                //     annual_average.push((total / scores.length).toFixed(2));
                // }
                // annual_avg_data = annual_average.map((score, index) => {
                //     return {
                //         Score: score,
                //         Year: parseTime('1-Jan-' + (index + 12).toString())
                //     }
                // });
                // annual_avg_data.shift();
                // // console.log(annual_avg_data);

                // group albums by genre (1 row per genre)
                let albums_by_genre = [];
                dta.forEach((album, i) => {
                    album.Genres.forEach((genre) => {
                        let row = { ...dta[i] }; // deep copy
                        row.Genre = genre;
                        albums_by_genre.push(row);
                    });
                });
                let grouped_by_genre = d3.group(albums_by_genre, d => d.Genre);
                setAlbumData3(grouped_by_genre);

                let gbg_quantiles = d3.rollup(albums_by_genre, v => {
                    let Q1 = d3.quantile(v.map(g => { return g.Score; }).sort(d3.ascending), .25);
                    let median = d3.quantile(v.map(function (g) { return g.Score; }).sort(d3.ascending), .5);
                    let Q3 = d3.quantile(v.map(function (g) { return g.Score; }).sort(d3.ascending), .75);
                    let IQR = Q3 - Q1;
                    let min0 = d3.min(v.map(g => g.Score));
                    let max0 = d3.max(v.map(g => g.Score));
                    let min = Math.max(Q1 - 1.5 * IQR, d3.min(v.map(g => g.Score)));
                    let max = Math.min(Q3 + 1.5 * IQR, d3.max(v.map(g => g.Score)));
                    let mean = d3.mean(v.map(g => g.Score));
                    let variance = d3.variance(v.map(g => g.Score))
                    let n = v.length;
                    let genre = v.map(g => g.Genre)[0];
                    return ({ Q1: Q1, median: median, Q3: Q3, IQR: IQR, mean: mean, var: variance, min0: min0, max0: max0, min: min, max: max, n: n, genre: genre })
                }, d => d.Genre);
                gbg_quantiles.delete('');
                setAlbumData3Quantiles(gbg_quantiles);

                // console.log('genres', albums_by_genre);
                // console.log('genres_grouped', grouped_by_genre);
                // console.log('quantiles', gbg_quantiles);

                // // group albums by artist (1 row per artists)
                // album_data.forEach((album, i) => {
                //     album.Artists.forEach((artist) => {
                //         let row = { ...album_data[i] }; // deep copy
                //         row.Artist = artist;
                //         albums_by_artist.push(row);
                //     });
                // });
                // let max_reviews = 0;
                // grouped_by_artist = d3.group(albums_by_artist, d => d.Artist);
                // gba_quantiles = d3.rollup(albums_by_artist, v => {
                //     let scores = v.map(g => g.Score);
                //     let Q1 = d3.quantile(v.map(g => { return g.Score; }).sort(d3.ascending), .25);
                //     let median = d3.quantile(v.map(function (g) { return g.Score; }).sort(d3.ascending), .5);
                //     let Q3 = d3.quantile(v.map(function (g) { return g.Score; }).sort(d3.ascending), .75);
                //     let IQR = Q3 - Q1;
                //     let min0 = d3.min(v.map(g => g.Score));
                //     let max0 = d3.max(v.map(g => g.Score));
                //     let min = Math.max(Q1 - 1.5 * IQR, d3.min(v.map(g => g.Score)));
                //     let max = Math.min(Q3 + 1.5 * IQR, d3.max(v.map(g => g.Score)));
                //     let mean = d3.mean(v.map(g => g.Score));
                //     let variance = d3.variance(v.map(g => g.Score))
                //     let n = v.length;
                //     if (n > max_reviews) {
                //         max_reviews = n;
                //     }
                //     let artist = v.map(g => g.Artist)[0];
                //     return ({ scores: scores, Q1: Q1, median: median, Q3: Q3, IQR: IQR, mean: mean, var: variance, min0: min0, max0: max0, min: min, max: max, n: n, artist: artist })
                // }, d => d.Artist)
                // console.log('max reviews', max_reviews);
                // console.log('artist', albums_by_artist)
                // console.log('artists_grouped', grouped_by_artist)
                // console.log('quantiles', gba_quantiles)

                // label size
                // d3.selectAll(".xaxis>.tick>text")
                //     .each(function (d, i) {
                //         d3.select(this).style("font-size", "13px");
                //     });
            }
            );
        return undefined;
    }, []);

    return (
        <>
            <TNDProvider value={{
                config,
                DropdownMenu,
                // albumData,
                // setAlbumData,
                // albumData1,
                // setAlbumData1
            }}>
                {/* <ThemeProvider theme={theme}> */}
                <h2 id="section1" className="pres-header">Who is Anthony Fantano?</h2>
                <p>For those of you who recognize this man above, but not from music reviews, it might be from this infamous audio clip:
                    <iframe className="post-vid" src="https://www.youtube.com/embed/HMKUlsJpov8">
                    </iframe>
                    But when he's not being a meme, he's actually a reputable music critic, posting most of his reviews on his youtube channel <a href="https://www.youtube.com/user/theneedledrop" target="_blank">theneedledrop</a>.
                </p>
                <p>
                    A hallmark element of Anthony's videos are the numerical scores he gives at the ends of his videos. The scores range from 0-10, with a special category, "NOT GOOD", which he addresses in <a href="https://www.youtube.com/watch?v=EVvldiRCnec" target="_blank">this </a>
                    video, (essentially, it means Anthony thought it was not worth the effort of reviewing or he had a low expectation to begin with).

                </p>
                <p>
                    Anthony started reviewing albums in 2008, and as of July 2021, has reviewed over <a href="#footnote1">at least [1]</a> 1400 albums.
                    That's quite a bit of data, and in this article, we'll use data scraped from his website to take a look at his reviewing patterns over the years.

                </p>
                <p>
                    Each review clearly holds more nuance than one singular number
                    and Anthony has stated that his ratings are not entirely comparable across different artists,
                    but for the sake of our analysis we will have to make this oversimplification.
                </p>
                <p>
                    At the end of the day, the numbers are just numbers chosen by Anthony,
                    and this is mostly just a for-fun look at trends in how one man chooses his numbers to rate some sounds.
                </p>
                <p className="footnote" id="footnote1">[1] Not all his reviews are still posted, so my dataset only goes as far back as October 2012.</p>

                <h2 id="section2" className="pres-header">Annual Review Statistics</h2>
                <p>One of the most immediate questions we might have is, what is his average rating?
                    And has it changed over the years?</p>

                <div id="stats-menu1">
                </div>
                {albumData1 && <SVG1 data={albumData1} />}
                
                <svg id="stat-svg2">
                </svg>
                <p>
                    Anthony seems pretty consistent in sticking with an average score of about 6 year-to-year.
                    In fact, the slight downward trend might just be due to an increased number of "Not Good" reviews (which I arbitrarily deemed as -1).
                </p>
                <h2 id="section3" className="pres-header">Scores by Genre</h2>
                <p>
                    Let's see if this consistency holds across genres:
                </p>
                {albumData3 && <SVG3 data={albumData3} gbgQuantiles = {albumData3Quantiles}/>}
                <p>Not as much here, Anthony seems to have some preference for certain genres (nothing wrong with that).
                    Regardless, when sorted by <input type="button" className="btn-link" id="interactive-link-1" value="number of reviews" />,
                    we can see experimental, jazz, singer-songwriter, and folk album reviews are Anthony's <b>7th, 11th, 10th, and 8th</b> most reviewed genres respectively.
                    However, when sorted by <input type="button" className="btn-link" id="interactive-link-2" value="mean score" />,
                    they take <b>1st through 4th</b>, with a mean score of <b>6.89</b> compared to the other genres with a mean score of <b>6.17</b>.</p>

                <h2 id="section4" className="pres-header">Anthony's Favorite Artists?</h2>
                <p>Can we paint a caricature of Fantano's favorite and least favorite artists based on his ratings? Who he deems most inconsistent?</p>
                <p>Let's look at these stats (with min. n reviews):</p>
                <SVG4 />
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
                {/* </ThemeProvider> */}
            </TNDProvider>
        </>
    )
}

export default BlogContent;
