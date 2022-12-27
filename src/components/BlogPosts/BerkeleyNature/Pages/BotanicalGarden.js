import { React, useContext } from 'react';
import { BNContext } from '../BerkeleyNature';

export default function BotanicalGarden() {

    const {
        img_folder,
        vid_folder,
        get_spec_images,
        AutoPlayLoopVid,
        SmallImage,
        CaptionText,
    } = useContext(BNContext);


    const botanical_garden_images = get_spec_images('Botanical Garden');

    return (
        <section className='scrollable-section'>
            <AutoPlayLoopVid classes="sticky-vid" vidSrc={vid_folder + "plant (2).mp4"} />
            {/* <AutoPlayLoopVid classes="sticky-vid" vidSrc={require(vid_folder + "plant (2).mp4")} /> */}
            <div className='scrollable-title-div red-div centered-div'>
                <h2 id="section2" className="h2-heading">THE BOTANICAL GARDEN</h2>
            </div>
            <div className='scrollable-div red-div left-div'>
                <p className='scrollable-p-graf'>I've only visited the garden once this year in the winter.
                    It was a brief visit, right before closing time,
                    and there wasn't much that was blooming🌷🌼🌻.
                </p>
            </div>
            <div className='scrollable-div red-div right-div'>
                <p className='scrollable-p-graf'>
                    Even in the winter, the relatively "regular" garden, still had it's own allure.
                </p>
                <p className='scrollable-p-graf'>
                    It was like seeing professional athletes in the offseason,
                    or actors backstage after the play.
                    It was an enjoyable visit nonetheless.
                </p>
            </div>
            <div className='scrollable-div red-div right-div'>
                <p className='scrollable-p-graf'>Walking there was also bit of a hike, but I'd say it was worth it. (Ignore the fact that this video is of me walking back).</p>
                <AutoPlayLoopVid classes="vid-med centered-vid" vidSrc={vid_folder + "sky (2).MOV"} />
                {/* <AutoPlayLoopVid classes="vid-med centered-vid" vidSrc={require(vid_folder + "sky (2).MOV")} /> */}
            </div>
            <div className='scrollable-div wide-div'>
                <div className='scrollable-div black-div'>
                    <p style={{ padding: '1px', margin: '1px' }}>
                        Unfortunately, the collection houses (arid, carnivorous) all closed at 4pm.
                        So I was unable to get pictures of some of the most interesting plants.
                    </p>
                    <p style={{ padding: '1px', margin: '1px' }}>
                        I still got some decent pictures though from the 30 minutes I was there.
                    </p>
                </div>
                {botanical_garden_images.map(i =>
                    <SmallImage fileName={img_folder + i} />
                    // <SmallImage fileName={require('' + img_folder + i)} />
                )}
            </div>
        </section>

    )
}
