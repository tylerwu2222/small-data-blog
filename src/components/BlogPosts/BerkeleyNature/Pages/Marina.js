import { React, useContext } from 'react';
import { BNContext } from '../BerkeleyNature';

export default function Marina() {
    const {
        img_folder,
        vid_folder,
        AutoPlayLoopVid,
        SmallImage,
        CaptionText,
    } = useContext(BNContext);

    // specifiy images    
    const marina_images = ['marina (4).jpg', 'marina (3).jpg', 'marina (1).jpg'];

    return (
        <section className='scrollable-section'>
            <AutoPlayLoopVid classes='sticky-vid' vidSrc={vid_folder + "water (1).mp4"} />
            {/* <AutoPlayLoopVid classes='sticky-vid' vidSrc={require(vid_folder + "water (1).mp4")} /> */}
            {/* <div style={{width:500, margin: "auto"}}> */}
            <div className='scrollable-title-div blue-div'>
                <h2 id="section1" className="h2-heading">THE MARINA</h2>
            </div>
            <div className='scrollable-div-first centered-div blue-div'>
                <p className='scrollable-p-graf'>The first place I visited this semester was the Berkeley Marina.
                    We ended up at a place called Shorebird Park, (mostly because that's where the bus dropped us off).
                </p>
            </div>
            <div className='scrollable-div blue-div left-div'>
                <p className='scrollable-p-graf'>
                    It was a bipolar sort of place.
                    One side of the park was sunny and peacful,
                    something of a typical suburban outing that parents might take their kids to after soccer practice.
                </p>
            </div>
            <div className='scrollable-div blue-div right-div'>
                <p className='scrollable-p-graf'>
                    The other side was stone cold (Steve Austin), heavy with lashing winds and salt water spraying up the banks
                </p>
            </div>
            <div className='scrollable-div-last blue-div wide-div'>
                <div className='table-div'>
                    <p className='scrollable-p-graf'>Things I found there included:</p>
                    <ul>
                        <div className='table-row-div'>
                            <div className='table-cell-div'>
                                <li>lots of well-fed ground squirrels</li>
                                <SmallImage fileName={img_folder + 'animal (1).jpg'} />
                                {/* <SmallImage fileName={require(img_folder + 'animal (1).jpg')} /> */}
                                <CaptionText
                                    text={'(Fig. 1) I only happened to get one picture of the squirrels,\
                                        and this one was actually looking very malnourished. \
                                        But the rest were very plump. You\'ll just have to take my word for it.'}
                                />
                            </div>
                            <li>Trees & Waves</li>
                            {marina_images.map(i =>
                                // <SmallImage fileName={require('' + img_folder + i)} />
                                <SmallImage fileName={img_folder + i} />
                            )}
                        </div>
                    </ul>
                    <p className='scrollable-p-graf small-text'>Apparently there was also a kite-flying park, Cesar Chavez park, but I have yet to visit.</p>
                </div>
            </div>

        </section>
    )
}
