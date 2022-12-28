// import './BerkeleyNature.css'

// react
import { useEffect, createContext } from "react";
import ImageModal from "../../Media/ImageModal.js";


// pages
import PageViewer from "./Pages/PageViewer.js";

// media
import { AutoPlayLoopVid } from '../../Media/AutoPlayLoopVid/AutoPlayLoopVid.js'
import SmallImage from '../../Media/SmallImage.js'
import MedImage from "../../Media/MedImage.js";
import CaptionText from '../../Media/CaptionText.js';

// media metadata
import image_data from './Data/image_metadata.json';

const get_spec_images = (cat) => {
    return Object.entries(image_data).filter(([k, v]) => v.spec_location == cat)
    // return  Object.fromEntries(Object.entries(image_data).filter(([k,v]) => v.spec_location == cat))
}

const flex_img_map = (images) => {
    let flex_images = images.map(i => {
        if (i[1]['modal_text']) {
            return (
                <>
                    <ImageModal
                        imgTN={<SmallImage
                            fileName={img_folder + i[0]}
                            hoverText={i[1]['hover_text']}
                            classes={' img-modal'} />}

                        img={<MedImage
                            fileName={img_folder + i[0]} />
                        }
                        desc={i[1]['modal_text']}
                        title={i[1]['hover_text']} />

                </>
            )
        }
        else {
            return (
                <SmallImage
                    fileName={img_folder + i[0]}
                    hoverText={i[1]['hover_text']} />
            )
        }
    });
    return flex_images;
}

// add to context
const img_folder = '/img/blog_posts/BerkeleyNature/Images/';
// const img_folder = './Images/';
const vid_folder = '/img/blog_posts/BerkeleyNature/Videos/';
// const vid_folder = './Videos/';

export const BNContext = createContext({});

const BerkeleyNature = ({ page }) => {
    if (page == 'BerkeleyNature') {
        require('./BerkeleyNature.css')
    }

    useEffect(() => {
        // SETTING SCROLLBAR WIDTH FOR SHENANIGANS
        document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
    }, []);

    return (
        <BNContext.Provider
            value={{
                img_folder,
                vid_folder,
                get_spec_images,
                flex_img_map,
                AutoPlayLoopVid,
                SmallImage,
                MedImage,
                CaptionText,
                ImageModal
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
