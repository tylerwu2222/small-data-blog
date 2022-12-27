import { React, useContext } from 'react';
import { BNContext } from '../BerkeleyNature';

export default function Seattle() {

  const {
    img_folder,
    vid_folder,
    get_spec_images,
    AutoPlayLoopVid,
    SmallImage,
    CaptionText,
  } = useContext(BNContext);


  const seattle_arboretum_images = get_spec_images('Seattle Arboretum');

  return (

    <section className='scrollable-section'>
      <AutoPlayLoopVid classes="sticky-vid" vidSrc={vid_folder + "snow.mp4"} />
      {/* <AutoPlayLoopVid vidSrc={require(vid_folder + "snow.MOV")} /> */}
      <div className='scrollable-title-div purple-div centered-div'>
        <h2 id="section3" className="h2-heading">SEATTLE</h2>
        <p>a Detour.</p>
      </div>
      <div className='scrollable-div purple-div centered-div-fixed'>
        <p>Over thanksgiving break, my sister and I visited <i>two</i> Victors in Seattle
          One, my cousin, finishing his post-doc in physiological ecology
          and the other, a close friend here at Berkeley.
        </p>
      </div>
      <div className='scrollable-div purple-div centered-div'>
        <p>
          I've never been before, but as you might expect, it was raining.
        </p>
      </div>
      <div className='scrollable-div purple-div centered-div'>
        <p>
          Initially, we planned to
          <ul>
            <li>visit the famous glass and flower garden,</li>
            <li>go up the space needle, </li>
            <li>& see some fish at the aquarium</li>
          </ul>
        </p>
      </div>
      <div className='scrollable-div purple-div centered-div-fixed'>
        <p>
          But after seeing the hefty price of entry ($35 for each), we looked into cheaper options.
          The prettiest place we visited, the Arboretum, ended up being completely free.
        </p>
      </div>
      <div className='scrollable-div purple-div centered-div-fixed'>
        {seattle_arboretum_images.map(i =>
          <SmallImage fileName={img_folder + i} />
          // <SmallImage fileName={require("" + img_folder + i)} />
        )
        }
      </div>
      <div className='scrollable-div purple-div centered-div-fixed'>
        <p className='scrollable-p-graf small-text'>I think I develop an extra layer of fat from the few days I was there, because I came back nearly 10 pounds heavier.</p>
      </div>
    </section>

  )
}
