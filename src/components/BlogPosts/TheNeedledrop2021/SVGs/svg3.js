import { useContext, useState, useEffect } from "react";
import TNDContext from "./TNDContext";
import * as d3 from "d3";

import ConversionToReactMessage from "../../Modules/ConversionToReactMessage";

const cb_genres = [
    'hip hop', 'pop', 'r&b', 'soul', 'jazz', 'electronic', 'dance', 'house', 'techno',
    'funk', 'ambient', 'rock', 'punk', 'metal', 'psychedelic', 'experimental',
    'singer-songwriter', 'folk', 'country'
]
const graph_types = ['boxplots', 'individual points'];

const SVG3 = ({ data, gbgQuantiles }) => {
    console.log('svg3data', data);
    const {
        config
    } = useContext(TNDContext);

    let annual_average = [], albums_by_genre = [], albums_by_artist = [], albums_by_genre_f = [], gbg_quantiles_f = [],
        artist_average = [], artist_n = [], albums_by_artist_f = [], artists_f, gba_quantiles_f = [];
    let gbg_quantiles, gba_quantiles, grouped_by_artist;

    let checked_genres = cb_genres; // temp
    let checked_graphs = ['boxplots'];

    const stats3 = ['--Select--', 'Number of reviews', 'Median', 'Mean', "Variance"];

    useEffect(() => {
        render_s3(stats3[1]);
    }, []);

    const update_genres = checked_genres => {
        let albums_by_genre_f = [];
        albums_by_genre.forEach(a => {
            if (checked_genres.includes(a.Genre)) {
                albums_by_genre_f.push(a);
            }
        });
        let gbg_quantiles_f = [];
        gbgQuantiles.forEach(g => {
            // console.log(g.genre);
            if (checked_genres.includes(g.genre)) {
                gbg_quantiles_f.push(g);
            }
        });
    };

    const render_s3 = (stat3) => {
        // update genres
        update_genres(checked_genres);
        // sort remaining genres by criteria
        let sortable = [];
        if (stat3 == "Number of reviews") {
            gbg_quantiles_f.forEach(g =>
                sortable.push([g.genre, g.n])
            );
        }
        else if (stat3 == 'Median') {
            gbg_quantiles_f.forEach(g =>
                sortable.push([g.genre, g.median])
            );
        }
        else if (stat3 == 'Mean') {
            gbg_quantiles_f.forEach(g =>
                sortable.push([g.genre, g.mean])
            );
        }
        else if (stat3 == 'Variance') {
            gbg_quantiles_f.forEach(g =>
                sortable.push([g.genre, g.var])
            );
        }

        sortable.sort(function (a, b) {
            return b[1] - a[1]; // descending
        });

        console.log(sortable);
        if (stat3 != '--Select--') {
            checked_genres = sortable.map(s => s[0]);
            console.log(checked_genres);
        }
        // console.log(checked_graphs)
        const t = d3.transition().duration(config.anim_speed).ease(d3.easeCubic);
        var svg3 = d3.select('#stat-svg3');
        svg3
            .style("width", config.vw + 'px')
            .style("height", (config.small_vh + 10) + 'px');

        // axes + scales
        var xScale = d3.scaleBand()
            .range([(config.vw - config.inner_vw * 0.95), config.inner_vw])
            .domain(checked_genres)
            .paddingInner(1)
            .paddingOuter(.5)
        const xAxis = d3.axisBottom().scale(xScale);
        svg3.append("g").attr('class', 'xaxis');
        svg3.select('g.xaxis')
            .attr("transform", "translate(0," + config.small_inner_vh + ")")
            .transition(t)
            .call(xAxis).selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(30)")
            .style("text-anchor", "start");
        const xLabel = svg3.append("text")
            .attr("class", "xlabel");
        svg3.select('.xlabel')
            .attr("text-anchor", "left")
            .attr("x", config.vw / 2)
            .attr("y", config.small_vh - 10)
            .text('Genre');

        var yScale = d3.scaleLinear()
            .domain([-1, 10])
            .range([config.small_inner_vh, (config.small_vh - config.small_inner_vh * 0.95)])
        svg3.append("g")
            .attr("transform", "translate(" + (config.vw - config.inner_vw) + ",0)")
            .transition(t)
            .call(d3.axisLeft(yScale))
        const yLabel = svg3.append("text")
            .attr("class", "ylabel");
        svg3.select('.ylabel')
            .attr("text-anchor", "middle")
            .attr("x", -config.small_vh / 2)
            .attr("y", 20)
            .attr("transform", "rotate(-90)")
            .text('Score');
        // label size
        d3.selectAll(".xaxis>.tick>text")
            .each(function (d, i) {
                d3.select(this).style("font-size", "13px");
            });

        // add boxplots
        // vertical line
        svg3
            .selectAll(".boxplot-vert")
            .data(gbg_quantiles_f, d => d.genre)
            .join(
                enter => enter.append("line")
                    .attr("class", "boxplot-vert")
                    .style('opacity', 0)
                    .attr("y1", d => yScale(d.min))
                    .attr("y2", d => yScale(d.min))
                    .attr("x1", d => xScale(d.genre))
                    .attr("x2", d => xScale(d.genre))
                    .call(enter => enter.transition(t)
                        .style("opacity", 1)
                        .attr("y1", d => yScale(d.min))
                        .attr("y2", d => yScale(d.max))
                        .attr("stroke", "black")
                        .style("width", 40)
                    )
                ,
                update => update
                    .call(update => update.transition(t)
                        .style("opacity", 1)
                        .attr("x1", d => xScale(d.genre))
                        .attr("x2", d => xScale(d.genre))
                        .attr("y1", d => yScale(d.min))
                        .attr("y2", d => yScale(d.max))
                    )
                ,
                exit => exit
                    .call(exit => exit.transition(t)
                        .attr("y1", d => yScale(d.min))
                        .attr('y2', d => yScale(d.min))
                        .style('opacity', 0)
                        .remove())
            )

        // rect + quantiles
        var boxWidth = 20;
        svg3
            .selectAll("rect")
            .data(gbg_quantiles_f, d => d.genre)
            .join(
                enter => enter.append("rect")
                    .style('opacity', 0)
                    .attr("class", "boxplot-box")
                    .attr("stroke", "black")
                    .style("fill", config.color1)
                    .attr("x", d => { return (xScale(d.genre) - boxWidth / 2) })
                    .attr("y", d => { return (yScale(d.Q1)) })
                    .attr("width", boxWidth)
                    .call(enter => enter.transition(t)
                        .style("opacity", 1)
                        .attr("y", d => { return (yScale(d.Q3)) })
                        .attr("height", d => { return (yScale(d.Q1) - yScale(d.Q3)) })
                    )
                ,
                update => update
                    .call(update => update.transition(t)
                        .attr("stroke", "black")
                        .style("fill", config.color1)
                        .style("opacity", 1)
                        .attr("height", d => { return (yScale(d.Q1) - yScale(d.Q3)) })
                        .attr("x", d => { return (xScale(d.genre) - boxWidth / 2) })
                        .attr("y", d => { return (yScale(d.Q3)) })
                    )
                ,
                exit => exit
                    .call(exit => exit.transition(t)
                        .attr("y", d => { return (yScale(d.Q1)) })
                        .attr("height", 0)
                        .style('opacity', 0)
                        .remove())
            );

        // median
        svg3
            .selectAll(".boxplot-median")
            .data(gbg_quantiles_f, d => d.genre)
            .join(
                enter => enter.append("line")
                    .style('opacity', 0)
                    .attr("class", "boxplot-median")
                    .attr("x1", d => { return (xScale(d.genre) - boxWidth / 2) })
                    .attr("x2", d => { return (xScale(d.genre) - boxWidth / 2) })
                    .attr("y1", d => { return (yScale(d.median)) })
                    .attr("y2", d => { return (yScale(d.median)) })
                    .attr("stroke", "black")
                    .style("width", 80)
                    .call(enter => enter.transition(t)
                        .style("opacity", 1)
                        .attr("x2", d => { return (xScale(d.genre) + boxWidth / 2) })
                    )
                ,
                update => update
                    .call(update => update.transition(t)
                        .attr("stroke", "black")
                        .style("width", 80)
                        .style("opacity", 1)
                        .attr("x1", d => { return (xScale(d.genre) - boxWidth / 2) })
                        .attr("x2", d => { return (xScale(d.genre) + boxWidth / 2) })
                        .attr("y1", d => { return (yScale(d.median)) })
                        .attr("y2", d => { return (yScale(d.median)) })
                    )
                ,
                exit => exit
                    .call(exit => exit.transition(t)
                        .attr("y1", d => { return (yScale(d.min)) })
                        .attr("y2", d => { return (yScale(d.min)) })
                        .style("opacity", 0)
                        .remove())
            );

        // console.log(checked_graphs);
        if (!checked_graphs.includes('boxplots')) {
            // hide boxplots
            svg3.selectAll(".boxplot-vert")
                .style("visibility", "hidden");
            svg3.selectAll(".boxplot-box")
                .style("visibility", "hidden");
            svg3.selectAll(".boxplot-median")
                .style("visibility", "hidden");
        }
        else {
            svg3.selectAll(".boxplot-vert")
                .style("visibility", "visible");
            svg3.selectAll(".boxplot-box")
                .style("visibility", "visible");
            svg3.selectAll(".boxplot-median")
                .style("visibility", "visible");
        }

        // indiv points
        var jitterWidth = 10
        svg3
            .selectAll("circle")
            .data(albums_by_genre_f, d => {
                return (d.Artists[0] + d.Album + d.Genre)
            })
            .join(
                enter => enter.append("circle")
                    .style('opacity', 0)
                    .attr("class", "boxplot-points-genre")
                    .attr("id", d => d.Artists[0] + d.Album)
                    .attr("cx", d => { return (xScale(d.Genre) - jitterWidth / 2 + Math.random() * jitterWidth) })
                    .attr("cy", d => { return (yScale(d.Score) - jitterWidth / 2 + Math.random() * jitterWidth) })
                    .call(enter => enter.transition(t)
                        .attr("r", 4)
                        .style("fill", config.color1)
                        .style("opacity", 0.2)
                        .attr("stroke", "black")
                    )
                ,
                update => update
                    .call(update => update.transition(t)
                        .attr("r", 4)
                        .style("fill", config.color1)
                        .style("opacity", 0.2)
                        .attr("stroke", "black")
                        .attr("cx", d => { return (xScale(d.Genre) - jitterWidth / 2 + Math.random() * jitterWidth) })
                        .attr("cy", d => { return (yScale(d.Score) - jitterWidth / 2 + Math.random() * jitterWidth) })
                    )
                ,
                exit => exit
                    .call(exit => exit.transition(t)
                        .attr('r', 0)
                        .style('opacity', 0)
                        .remove()
                    )
            )
        if (!checked_graphs.includes('individual points')) {
            svg3.selectAll(".boxplot-points-genre")
                .style("visibility", "hidden");
        }
        else {
            svg3.selectAll(".boxplot-points-genre")
                .style("visibility", "visible");
        }
    };

    return (
        <>
            <ConversionToReactMessage />
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
        </>
    )
};

export default SVG3;