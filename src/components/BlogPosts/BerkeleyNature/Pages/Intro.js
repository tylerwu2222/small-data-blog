import { React, useContext } from 'react';
import { BNContext } from '../BerkeleyNature';

export default function Intro() {
    const {
        img_folder,
        ImageModal,
        SmallImage,
        MedImage
    } = useContext(BNContext);

    return (
        <>
            <h1 className="h1-heading-title" style={{ paddingTop: "50px", marginTop: "-30px", fontSize: "50px" }}>Nature in NorCal</h1>
            {/* <img className="img-wide" src={require(img_folder + "berkeley_nature_long.png")} alt="berk-nature-tn" /> */}
            <img className="img-wide" src={img_folder + "berkeley_nature_long.png"} alt="berk-nature-tn" style={{ position: 'sticky', top: '80px' }} />

            {/* <div class="container-narrow-green-bg"> */}
            <p style={{ whiteSpace: "pre-line" }}></p>
            <div className='centered-div' style={{ backgroundColor: '#505050', opacity: 0.8 }}>
                <p className='scrollable-p-graf'>
                    Before I moved to Berkeley, my impression was that it would be teeming with nature.
                    Birds would be flying everywhere and forests would be within walking distance of the campus.
                </p>
                <p className='scrollable-p-graf'>
                    But after a few months here, I've found that it's not quite as expansive as I initially expected.
                    It's still there, but you have to look a bit harder for to find it.</p>
                <p className='scrollable-p-graf'>
                    In this photo essay-slash-journal-entry,
                    I've aggregated all the nature-related pictures, videos, and media I've taken since arriving here.
                </p>
                <p className='scrollable-p-graf'>
                    For images I have more to talk about, I've added a hover effect and white border like so:
                    <ImageModal
                        imgTN={<SmallImage
                            fileName={img_folder + 'sky (4).jpg'}
                            hoverText={'Tennis courts at Berkeley'}
                            classes={' img-modal'} />}
                        img={<MedImage
                            fileName={img_folder + 'sky (4).jpg'} />}
                        desc={'The clay tennis courts near Cafe Estrada on a rainy day.'}
                        title={'Tennis courts at Berkeley'} /><br />
                    clicking on it will show a more in-depth description about the image. So feel free to click away when you see one.
                </p>
                <p className='scrollable-p-graf' style={{ fontSize: 'small' }}>
                    In the future, I also plan to add some fun stats about the pictures (i.e. some object recognition stuff),
                    and maybe more descriptions about the plants animals in each image.
                </p>
                <p style={{ whiteSpace: "pre-line" }}></p>
                <p className='scrollable-p-graf'>
                    For now though, I hope this is a peacful and educational read, and without further ado,
                    let's get started with the first place I vistied.
                    <p style={{ fontSize: 'small' }}>(click the left & right arrows to navigate.)</p>
                </p>
            </div>
        </>
    )
}
