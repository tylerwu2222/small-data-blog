import { useContext, useState, useEffect } from "react";
import TNDContext from "./TNDContext";
import * as d3 from "d3";

import ConversionToReactMessage from "../../Modules/ConversionToReactMessage";

export default function SVG4() {
    return (
        <>
            < ConversionToReactMessage />
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

        </>
    )
}
