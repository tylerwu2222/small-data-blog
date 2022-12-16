import { render } from "@testing-library/react";
import * as d3 from "d3";

import { useContext, useEffect } from "react";
import TNDContext from "./TNDContext";


const SVG1 = () => {
    const {
        config,
        dropdownMenu,
        album_data,
        album_data1
    } = useContext(TNDContext);
    console.log('config', config);

    const stats1 = ['All years'].concat([...Array(10).keys()].map(yr => yr + 2012));
    let stat1 = stats1[0];

    const onStat1Clicked = selection => {
        stat1 = selection;
        render_s1(stat1)
    };

    // initial render
    // useEffect(() => {
    //     render_s1(stat1);
    // }, []);

    d3.select('#stats-menu1')
        .call(dropdownMenu, {
            options: stats1,
            onOptionClicked: onStat1Clicked,
            selectedOption: stat1,
            label: 'Sort by: '
        });

    // annual review scores
    const render_s1 = (stat) => {
        const t = d3.transition().duration(config.anim_speed).ease(d3.easeCubic);
        let svg1 = d3.select("#stat-svg1");
        svg1
            // .attr("viewBox", [0, 0, config.vh, config.vw]);
            .style("width", config.vw + 'px')
            .style("height", config.vh + 'px');

        // filter data by year
        if (stat[0] == "2") {
            album_data1 = album_data.filter(function (a) {
                return a.Year == +stat;
            });
        }
        else {
            album_data1 = album_data;
        }

        // render hist
        let scores = album_data1.map(a => a.Score);
        let min = Math.min(...scores);
        let max = Math.max(...scores);
        let domain = [min, max];
        let xScale = d3.scaleLinear()
            .domain(domain)
            .range([(config.vw - config.inner_vw * 0.95), config.inner_vw]);
        let score_labels = new Set(scores);
        // let n_bin = score_labels.size;

        let bin1 = d3.bin();
        let bins = bin1(scores);

        //x axis
        const xAxis = d3.axisBottom().scale(xScale);
        svg1.append("g").attr('class', 'xaxis');
        svg1.select('g.xaxis')
            .attr("transform", "translate(0," + config.inner_vh + ")")
            .transition(t)
            .call(xAxis);
        const xLabel = svg1.append("text")
            .attr("class", "xlabel");
        svg1.select('.xlabel')
            .attr("text-anchor", "left")
            .attr("x", config.vw / 2)
            .attr("y", config.vh - 10)
            .text('Score');
        // y axis
        let yScale = d3.scaleLinear()
            .range([config.inner_vh, config.vh - config.inner_vh])
            .domain([0, d3.max(bins, d => d.length)]);
        const yAxis = d3.axisLeft().scale(yScale);
        svg1.append("g").attr('class', 'yaxis');
        svg1.select('g.yaxis')
            .attr("transform", "translate(" + (config.vw - config.inner_vw) + ",0)")
            .transition(t)
            .call(yAxis);
        // const yLabel = svg1.append("text")
        //     .attr("class", "ylabel");
        // svg1.select('.ylabel')
        //     .attr("text-anchor", "middle")
        //     .attr("x", (-config.vh / 2))
        //     .attr("y", 20)
        //     .attr("transform", "rotate(-90)")
        //     .text('Number of Reviews');

        // add bars
        svg1.selectAll("rect")
            .data(bins, d => d.x0)
            .join(
                enter => enter.append("rect")
                    .attr("x", d => xScale(d.x0 - 0.5))
                    .attr("y", config.inner_vh)
                    .call(enter => enter.transition(t)
                        .attr("fill", config.color1)
                        .attr("stroke", config.stroke1)
                        .attr("x", d => xScale(d.x0 - 0.5))
                        .attr("y", d => yScale(d.length))
                        .attr("width", function (d) {
                            return xScale(d.x1) - xScale(d.x0) - 2;
                        })
                        .attr("height", function (d) {
                            return yScale(0) - yScale(d.length);
                        })
                    ),
                update => update
                    .call(update => update.transition(t)
                        .attr("x", d => xScale(d.x0 - 0.5))
                        .attr("y", d => yScale(d.length))
                        .attr("width", function (d) {
                            return xScale(d.x1) - xScale(d.x0) - 2;
                        })
                        .attr("height", function (d) {
                            return yScale(0) - yScale(d.length);
                        })
                    ),
                exit => exit
                    .call(exit => exit.transition()
                        .attr('height', 0)
                        .attr('y', config.inner_vh)
                        .remove())
            );
    };

    return (
        <>
            <svg id="stat-svg1">
            </svg>
        </>
    )
}

export default SVG1;