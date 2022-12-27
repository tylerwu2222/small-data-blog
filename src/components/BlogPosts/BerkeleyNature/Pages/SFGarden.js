import { React, useContext } from 'react';
import { BNContext } from '../BerkeleyNature';

export default function SFGarden() {

    const {
        img_folder,
        vid_folder,
        get_spec_images,
        AutoPlayLoopVid,
        SmallImage,
        CaptionText,
    } = useContext(BNContext);

    const SF_garden_images0 = get_spec_images('F Bus');
    const SF_garden_images = get_spec_images('Golden Gate Park');

    return (

        <section className='scrollable-section'>
            <AutoPlayLoopVid classes="sticky-vid" vidSrc={vid_folder + "call.mp4"} />
            {/* <AutoPlayLoopVid classes="sticky-vid" vidSrc={require(vid_folder + "call.MOV")} /> */}
            <div className='scrollable-title-div gold-div right-div'>
                <h2 id="section2" className="h2-heading">THE GOLDEN GATE GARDEN (in SF)</h2>
            </div>
            <div className='scrollable-div gold-div right-div'>
                <p>
                    "This is a pretty huge park" - me.
                    I visited once when it was sunny and once when it was raining,
                    both times, I wish I had my skateboard (or a bike).
                </p>
            </div>
            <div className='scrollable-div gold-div right-div'>
                <p>
                    Like a few other places in SF, it felt like we really needed a car.
                    Things felt very spread out and condensed at the same time.
                </p>
            </div>
            <div className='scrollable-div gold-div right-div'>
                <p>
                    The first time I went, we visited the Rose Garden and I took a total of one nature-related picture.
                    The second time we wanted to visit the Japanese tea garden.
                    Unfortunatley, we got there 5 minutes after their last entry.
                </p>
            </div>
            <div className='scrollable-div gold-div left-div'>
                {SF_garden_images0.map(i =>
                    <SmallImage fileName={img_folder + i} />
                    // <SmallImage fileName={require('' + img_folder + i)} />
                )}
            </div>
            <div className='scrollable-div gold-div centered-div'>
                {SF_garden_images.map(i =>
                    <SmallImage fileName={img_folder + i} />
                    // <SmallImage fileName={require('' + img_folder + i)} />
                )}
            </div>
        </section>

    )
}
