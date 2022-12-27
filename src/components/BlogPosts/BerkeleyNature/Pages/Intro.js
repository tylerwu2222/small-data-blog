import { React, useContext } from 'react';
import { BNContext } from '../BerkeleyNature';

export default function Intro() {
    const {
        img_folder,
        vid_folder
    } = useContext(BNContext);

    return (
        <>
            <h1 className="h1-heading-title" style={{ paddingTop: "50px", marginTop: "-30px" }}>Nature in NorCal</h1>
            {/* <img className="img-wide" src={require(img_folder + "berkeley_nature_long.png")} alt="berk-nature-tn" /> */}
            <img className="img-wide" src={img_folder + "berkeley_nature_long.png"} alt="berk-nature-tn" />

            {/* <div class="container-narrow-green-bg"> */}
            <p style={{ whiteSpace: "pre-line" }}></p>
            <div className='centered-div'>
                <p className='scrollable-p-graf'>
                    Before I moved to Berkeley, my impression was that it would be teeming with nature.
                    Birds would be flying everywhere and forests would be within walking distance of the campus.
                </p>
                <p className='scrollable-p-graf'>
                    After my first couple weeks though, I've found that it's not quite as expansive as I expected.
                    It's still here, but you just have to look a bit harder for to find it.</p>
                <p className='scrollable-p-graf'>
                    In this photo essay-slash-journal-entry,
                    I've aggregated all the nature-related pictures, videos, and media I've taken since arriving here.
                </p>
                <p className='scrollable-p-graf' style={{ fontSize: 'small' }}>
                    In the future, I also plan to add some fun stats about the pictures (object recognition stuff),
                    and a few deep dives on certain animal & plant species.
                </p>
                <p className='scrollable-p-graf'>
                    But for now, I hope it's a peacful, immersive, and enjoyable experience.
                </p>
                <p style={{ whiteSpace: "pre-line" }}></p><br />
                <p className='scrollable-p-graf'>Let's first break it down by the various places I've visited.</p>
            </div>
        </>
    )
}
