import { React, useContext } from 'react';
import { BNContext } from '../BerkeleyNature';

export default function Berkeley() {

  const {
    img_folder,
    vid_folder,
    get_spec_images,
    flex_img_map,
    AutoPlayLoopVid,
    SmallImage,
    MedImage
  } = useContext(BNContext);

  const berk_campus_images = get_spec_images('Campus')

  const berk_apartment_daily_images = get_spec_images('Daily Tree')
  const berk_apartment_images0 = get_spec_images('Apartment')
  const berk_apartment_images1 = get_spec_images('Apartment Courtyard')
  // const berk_apartment_images2 = get_spec_images('Apartment Outside')

  return (

    <section className='scrollable-section'>
      <AutoPlayLoopVid classes="sticky-vid" vidSrc={vid_folder + "animal (6).mp4"} />
      <div className='scrollable-title-div blue2-div centered-div sticky-div' style={{ zIndex: 4 }}>
        <h2 id="section4" className="h2-heading">BACK TO BERKELEY</h2>
      </div>
      <div className='scrollable-div blue2-div centered-div'>
        <p className='scrollable-p-graf'>Returning to Berkeley... I noticed I was more
          relaxed in the shoulders, probably a sign it had become more of a home.
        </p>
      </div>
      <div className='scrollable-div blue2-div right-div'>
        <p className='scrollable-p-graf'>
          A lot of the nature I captured in Berkeley was inside my apartment (due to laziness).
        </p>
        {flex_img_map(berk_apartment_images0)}
      </div>
      <div className='scrollable-div blue2-div right-div'>
        <p className='scrollable-p-graf'>
          I tried capturing the passage of time via daily photos of the trees outside my window. Scroll down to see changes.
        </p>
      </div>
      <div className='scrollable-div right-div'>
        {berk_apartment_daily_images.map(i =>
          <>
            <SmallImage fileName={img_folder + i[0]}
              hoverText={i[1]['hover_text']}
              classes={" sticky-img"}
            /><br />
          </>
        )}
      </div>
      <div className='scrollable-div blue2-div centered-div-fixed'>
        <p className='scrollable-p-graf'>
          A few in the apartment courtyard.
        </p>
        {flex_img_map(berk_apartment_images1)}

      </div>
      {/* <div className='scrollable-div blue2-div right-div'>
        <p>And a few around the apartment</p>
        berk_apartment_daily_images
        {berk_apartment_images2.map(i =>
          <SmallImage fileName={img_folder + i[0]}
          hoverText={i[1]['hover_text']} />
          // <SmallImage fileName={require("" + img_folder + i)} />
        )}
      </div> */}
      <div className='scrollable-div blue2-div left-div'>
        <p className='scrollable-p-graf'>and of course on Berkeley campus</p>
        {flex_img_map(berk_campus_images)}
      </div>
      <div className='scrollable-div blue2-div centered-div'>
        <p className='scrollable-p-graf'>
          I didn't like Berkeley much at first, it felt very chaotic.<br />
          But there are things I've begun to appreciate about it.
        </p>
      </div>
      <div className='scrollable-div blue2-div centered-div'>
        <p className='scrollable-p-graf'>
          I've made some good friends here, had some tasty food, and learned many useful things.
          Time had passed and I look forward to the rest of the school year 🤞
        </p>
      </div>
      <div className='scrollable-div blue2-div centered-div' style={{ borderRadius: '20px 20px 0px 0px', paddingBottom: 0}}>
        <p className='scrollable-p-graf' style={{marginLeft: 'auto', marginRight: 'auto'}}>
          I'm also glad I took this J215 class. It was a big eye-opener to all the things you can create in the multi-media world
          and I hope to keep exploring the things I can make with multimedia in the future. 📝
        </p>
        <MedImage fileName={img_folder + 'tree (5).JPG'} />
      </div>
    </section>

  )
}
