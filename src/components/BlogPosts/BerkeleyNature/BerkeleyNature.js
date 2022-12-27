// import './BerkeleyNature.css'

// react
import { useContext, useEffect, useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// pages
import PageViewer from "./Pages/PageViewer.js";
import Intro from "./Pages/Intro.js";
import Marina from "./Pages/Marina.js";
import BotanicalGarden from "./Pages/BotanicalGarden.js";
import SFGarden from "./Pages/SFGarden.js";
import Seattle from "./Pages/Seattle.js";
import Berkeley from "./Pages/Berkeley.js";
import Wrapped from "./Pages/Wrapped.js";


// media
import { AutoPlayLoopVid } from '../../Media/AutoPlayLoopVid/AutoPlayLoopVid.js'
import SmallImage from '../../Media/SmallImage.js'
import CaptionText from '../../Media/CaptionText.js';
import DividerSymbol from './DividerSymbol.js';
import TwilightZone from '../Modules/TwilightZone.js';

// media metadata
import image_data from './Data/image_data_complete.json';

// SETTING SCROLLBAR WIDTH FOR SHENANIGANS
document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");

const get_spec_images = (cat) => {
    return image_data.filter(i => i.spec_location == cat).map(i => i.img)
}


// console.log('img csv', image_data);
// console.log('botanical garden', botanical_garden_images);
// console.log('seattle', seattle_arboretum_images);

// add to context
const img_folder = '/img/blog_posts/BerkeleyNature/Images/';
// const img_folder = './Images/';
const vid_folder = '/img/blog_posts/BerkeleyNature/Videos/';
// const vid_folder = './Videos/';

export const BNContext = createContext({});

const BerkeleyNature = ({ page }) => {
    // console.log('page', page)
    // if (window?.location.pathname === '/life')

    if (page == 'BerkeleyNature') {
        require('./BerkeleyNature.css')
    }

    return (
        <BNContext.Provider
            value={{
                img_folder,
                vid_folder,
                get_spec_images,
                AutoPlayLoopVid,
                SmallImage,
                CaptionText,
                // pageNumber,
                // setPageNumber
            }}
        >
            <>
                <PageViewer />
            </>
        </BNContext.Provider>
    )
}

export default BerkeleyNature;
