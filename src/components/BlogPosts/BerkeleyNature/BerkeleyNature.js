// import './BerkeleyNature.css'
import { AutoPlayLoopVid } from '../../Media/AutoPlayLoopVid/AutoPlayLoopVid.js'
import SmallImage from '../../Media/SmallImage.js'
import CaptionText from '../../Media/CaptionText.js';
import DividerSymbol from './DividerSymbol.js';
import TwilightZone from './TwilightZone.js';

import image_data from './Data/image_data_complete.json';

// SETTING SCROLLBAR WIDTH FOR SHENANIGANS
document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");


// const img_folder = './BlogPosts/BerkeleyNature/Images/'
const img_folder = './Images/';
const vid_folder = './Videos/';

const get_spec_images = (cat) => {
    return image_data.filter(i => i.spec_location == cat).map(i => i.img)
}

const marina_images = ['marina (4).jpg', 'marina (3).jpg', 'marina (1).jpg'];
const botanical_garden_images = get_spec_images('Botanical Garden');
const seattle_arboretum_images = get_spec_images('Seattle Arboretum');
const SF_garden_images0 = get_spec_images('F Bus')
const SF_garden_images = get_spec_images('Golden Gate Park')

const berk_campus_images = get_spec_images('Campus')

const berk_apartment_daily_images = get_spec_images('Daily Tree')
const berk_apartment_images0 = get_spec_images('Apartment')
const berk_apartment_images1 = get_spec_images('Apartment Courtyard')
const berk_apartment_images2 = get_spec_images('Apartment Outside')

console.log('img csv', image_data);
console.log('botanical garden', botanical_garden_images);
console.log('seattle', seattle_arboretum_images);

const BerkeleyNature = ({ page }) => {
    // console.log('page', page)
    // if (window?.location.pathname === '/life')
    if (page == 'BerkeleyNature') {
        require('./BerkeleyNature.css')
    }

    return (
        <>

            <h1 className="h1-heading-title" style={{ paddingTop: "50px", marginTop: "-30px" }}>Nature in NorCal</h1>
            <img className="img-wide" src={require(img_folder + "berkeley_nature_long.png")} alt="berk-nature-tn" />

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
                <p className='scrollable-p-graf' style={{fontSize: 'small'}}>
                    In the future, I also plan to add some fun stats about the pictures (object recognition stuff),
                    and a few deep dives on certain animal & plant species.
                </p>
                <p className='scrollable-p-graf'>
                    But for now, I hope it's a peacful, immersive, and enjoyable experience.
                </p>
                <p style={{ whiteSpace: "pre-line" }}></p><br />
                <p className='scrollable-p-graf'>Let's first break it down by the various places I've visited.</p>
            </div>
            <h1 className='h1-heading'>PLACES</h1>
            <section className='scrollable-section'>
                <AutoPlayLoopVid classes='sticky-vid' vidSrc={require(vid_folder + "water (1).mp4")} />
                <div className='scrollable-div-first blue-div centered-div'>
                    <h2 id="section1" className="h2-heading">The Marina</h2>
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
                                    <SmallImage fileName={require(img_folder + 'animal (1).jpg')} />
                                    <CaptionText
                                        text={'(Fig. 1) I only happened to get one picture of the squirrels,\
                                        and this one was actually looking very malnourished. \
                                        But the rest were very plump. You\'ll just have to take my word for it.'}
                                    />
                                </div>
                                <li>Trees & Waves</li>
                                {marina_images.map(i =>
                                    <SmallImage fileName={require('' + img_folder + i)} />
                                )}
                            </div>
                        </ul>
                        <p className='scrollable-p-graf small-text'>Apparently there was also a kite-flying park, Cesar Chavez park, but I have yet to visit.</p>
                    </div>
                </div>

            </section>

            <DividerSymbol />

            <section className='scrollable-section'>
                <div className='centered-div'>
                    <p className='scrollable-p-graf block-p-graf'>
                        The next place I ended up visiting was Berkeley's Botanical Garden.
                    </p>
                </div>
                <AutoPlayLoopVid classes="sticky-vid" vidSrc={require(vid_folder + "plant (2).mp4")} />
                <div className='scrollable-div red-div left-div'>
                    <h2 id="section2" className="h2-heading">The Botanical Garden</h2>
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
                        It was still an enjoyable visit nonetheless.
                    </p>
                </div>
                <div className='scrollable-div red-div right-div'>
                    <p className='scrollable-p-graf'>Walking there was also bit of a hike, but I'd say it was worth it.</p>
                    <AutoPlayLoopVid classes="vid-med centered-vid" vidSrc={require(vid_folder + "sky (2).MOV")} />
                </div>
                <div className='scrollable-div wide-div'>
                    <div className='scrollable-div black-div'>
                        <p style={{ padding: '1px', margin: '1px' }}>Unfortunately, the houses (tropical, carnivorous) all closed at 4pm. So I was unable to get pictures of the best plants.</p>
                        <p style={{ padding: '1px', margin: '1px' }}>I did get quite a bit though, from the 30 minutes I was there.</p>
                    </div>
                    {botanical_garden_images.map(i =>
                        <SmallImage fileName={require('' + img_folder + i)} />
                    )}
                </div>
            </section>

            <DividerSymbol />

            <TwilightZone />

            <section className='scrollable-section'>
                <AutoPlayLoopVid vidSrc={require(vid_folder + "sky (2).mp4")} />
                <h2 id="section2" className="h2-heading">The Golden Gate Garden (SF)</h2>
                <p>
                    "This is a pretty huge park" - me.
                    I visited once when it was sunny and once when it was raining,
                    both times, there were quite a few flowers.
                </p>
                <p>
                    Like many places in SF, it felt like we really needed a car,
                    or at the very least bikes to get around.
                    Things felt very spread out and condensed at the same time.
                </p>
                <p>
                    The first time I went, we visited the Rose Garden.
                    The second time we wanted to visit the Japanese tea garden.
                    Unfortunatley, we got there 5 minutes after their last entry.
                </p>
                {SF_garden_images0.map(i =>
                    <SmallImage fileName={require('' + img_folder + i)} />
                )}
                {SF_garden_images.map(i =>
                    <SmallImage fileName={require('' + img_folder + i)} />
                )}
            </section>

            <DividerSymbol />

            <section className='scrollable-section'>
                <AutoPlayLoopVid vidSrc={require(vid_folder + "snow.MOV")} />
                <h2 id="section3" className="h2-heading">Seattle: a Detour.</h2>
                <p>Over thanksgiving break, my sister and I visited ~two Victors~ in Seattle
                    One, my cousin, finisheing his post-doc in physiological ecology
                    and the other, a close friend here at Berkeley.
                </p>
                <p>
                    I've never been before, but as you might expect, it was raining.
                </p>
                <p>
                    Initially, we planned to visit the famous glass and flower garden,
                    go up the space needle, and see some fish at the aquarium,
                </p>
                <p>
                    But after seeing the hefty price of entry ($35 for each), we decided to look into cheaper options.
                    The prettiest place we visited, the Arboretum, was completely free.
                </p>
                {seattle_arboretum_images.map(i =>
                    <SmallImage fileName={require("" + img_folder + i)} />
                )
                }
                <p>Things I could capture:</p>
                <ul>
                    <li>some flowers (in Spring)</li>
                    <li>fish</li>
                    <li>the rain</li>
                </ul>
            </section>

            <DividerSymbol />

            <section className='scrollable-section'>
                <AutoPlayLoopVid vidSrc={require(vid_folder + "animal (6).mp4")} />
                <h2 id="section4" className="h2-heading">Back to Berkeley</h2>
                <p>Returning to Berkeley... something I noticed was that
                    I relaxed a bit, untensing the shoulders, letting out a big sigh,
                    it felt like coming home.
                </p>
                <p>
                    Sometimes nature can be found inside as well.
                </p>
                {berk_apartment_images0.map(i =>
                    <SmallImage fileName={require("" + img_folder + i)} />
                )}
                <p>
                    I tried capturing time through daily images through my window.
                </p>

                {berk_apartment_daily_images.map(i =>
                    <SmallImage fileName={require("" + img_folder + i)} />
                )}

                {berk_apartment_images1.map(i =>
                    <SmallImage fileName={require("" + img_folder + i)} />
                )}
                <p>Also near the apartment</p>
                {berk_apartment_images2.map(i =>
                    <SmallImage fileName={require("" + img_folder + i)} />
                )}
                <p>And of course on campus</p>
                {berk_campus_images.map(i =>
                    <SmallImage fileName={require("" + img_folder + i)} />
                )}
                <p>
                    I didn't like it much at first, it felt like a chaotic place.
                    There was a feeling of too many people in too small of a city.
                    I still have that feeling a bit, but there are things I appreciate.
                </p>
                <p>
                    Made some good friends here, had some tasty food, and learned many useful things.
                    Time had passed.
                </p>
            </section>

            <DividerSymbol />

            <h1 className='h1-heading'>THINGS</h1>
            <p>Having captured so many photos this semester,
                some of the images sort of became more like data than standalone stories.
            </p>
            <p>
                I used an online tool's API (Imagerecognize.com) to label all my data with tags
                of what was in each image.
            </p>
            <p>
                By aggregating all the data, I was able to find some information on what I captured the most.
            </p>
            <p>plot here</p>
            <p>Click any of the tags to filter the photos:</p>
            <p>TO BE CONTINUED...</p>
            <p>(I'm still working on this project, but I'm planning on finishing it sometime this school year 🔮 So keep an eye out!)</p>
            <p style={{ marginBottom: 0 }}>.</p>
        </>
    )
}

export default BerkeleyNature;
