import { React, useContext } from 'react';
import { BNContext } from '../BerkeleyNature';

export default function Berkeley() {

  const {
    img_folder,
    vid_folder,
    get_spec_images,
    AutoPlayLoopVid,
    SmallImage,
    CaptionText,
  } = useContext(BNContext);

  const berk_campus_images = get_spec_images('Campus')

  const berk_apartment_daily_images = get_spec_images('Daily Tree')
  const berk_apartment_images0 = get_spec_images('Apartment')
  const berk_apartment_images1 = get_spec_images('Apartment Courtyard')
  const berk_apartment_images2 = get_spec_images('Apartment Outside')

  return (

    <section className='scrollable-section'>
      <AutoPlayLoopVid classes="sticky-vid" vidSrc={vid_folder + "animal (6).mp4"} />
      {/* <AutoPlayLoopVid vidSrc={require(vid_folder + "animal (6).mp4")} /> */}
      <div className='scrollable-title-div blue2-div centered-div-fixed'>
        <h2 id="section4" className="h2-heading">BACK TO BERKELEY</h2>
      </div>
      <div className='scrollable-div blue2-div centered-div-fixed'>
        <p>Returning to Berkeley... I noticed I was more
          relaxed in the shoulders, probably a sign it had become more of a home.
        </p>
      </div>
      <div className='scrollable-div blue2-div centered-div-fixed'>
        <p>
          A lot of the nature I captured in Berkeley was inside my apartment (due to laziness).
        </p>
      {berk_apartment_images0.map(i =>
        <SmallImage fileName={img_folder + i} />
        // <SmallImage fileName={require("" + img_folder + i)} />
      )}
      </div>
      <div className='scrollable-div blue2-div centered-div-fixed'>
      <p>
        I tried capturing the passage of time via daily photos of the trees outside my window.
      </p>
      {berk_apartment_daily_images.map(i =>
        <SmallImage fileName={img_folder + i} />
        // <SmallImage fileName={require("" + img_folder + i)} />
      )}
      </div>
      <div className='scrollable-div blue2-div centered-div-fixed'>
        <p>
          A few in the courtyard.
        </p>
      {berk_apartment_images1.map(i =>
        <SmallImage fileName={img_folder + i} />
        // <SmallImage fileName={require("" + img_folder + i)} />
      )}
      </div>
      <div className='scrollable-div blue2-div right-div'>
      <p>And a few around the apartment</p>
      {berk_apartment_images2.map(i =>
        <SmallImage fileName={img_folder + i} />
        // <SmallImage fileName={require("" + img_folder + i)} />
      )}
      </div>
      <div className='scrollable-div blue2-div left-div'>
      <p>and of course on campus</p>
      {berk_campus_images.map(i =>
        <SmallImage fileName={img_folder + i} />
        // <SmallImage fileName={require("" + img_folder + i)} />
      )}
      </div>
      <div className='scrollable-div blue2-div centered-div-fixed'>
      <p>
        I didn't like Berkeley much at first, it felt like a chaotic place.
        There was a feeling of too many people in too small of a place.
        Still have that feeling a bit, but there are things I've begun to appreciate about it.
      </p>
      </div>
      <div className='scrollable-div blue2-div centered-div-fixed'>
      <p>
        And I've made some good friends here, had some tasty food, and learned many useful things.
        Time had passed and I look forward to the rest of the school year 🤞
      </p>
      </div>
      <div className='scrollable-div blue2-div centered-div-fixed'>
      <p>
        Also glad I took this J215 class, as it was a big eye-opener to all the things you can create in the multi-media world.
      </p>
      </div>
    </section>

  )
}
