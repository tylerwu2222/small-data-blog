import { React, useContext } from 'react';
import { BNContext } from '../BerkeleyNature';
import BackgroundImage from '../../../Media/BackgroundImage';

export default function Seattle() {

  const {
    img_folder,
    vid_folder,
    get_spec_images,
    flex_img_map,
    AutoPlayLoopVid,
  } = useContext(BNContext);


  const seattle_arboretum_images = get_spec_images('Seattle Arboretum');

  return (

    <section className='scrollable-section'>
      <BackgroundImage fileName={img_folder + 'animal (17).JPG'} style={{position:"sticky",top:"50px"}}/>
      <div className='scrollable-title-div purple-div centered-div' >
        <h2 id="section3" className="h2-heading">SEATTLE</h2>
        <p>a Detour.</p>
      </div>
      <div className='scrollable-div purple-div centered-div'>
        <p className='scrollable-p-graf'>
          Over thanksgiving break, my sister and I visited <i>two</i> Victors in Seattle</p>
        <AutoPlayLoopVid classes="vid-med centered-vid" vidSrc={vid_folder + "snow.mp4"} />
        <p className='scrollable-p-graf'>
          One, my cousin, finishing his post-doc in physiological ecology
          and the other, a close friend here at Berkeley.
        </p>
      </div>
      <div className='scrollable-div purple-div centered-div'>
        <p className='scrollable-p-graf'>
          I've never been before, but as you might expect, it was raining (it even snowed on the last day).
        </p>
        <AutoPlayLoopVid classes="vid-med centered-vid" vidSrc={vid_folder + "snow (2).mp4"} />
      </div>
      <div className='scrollable-div purple-div centered-div'>
        <p className='scrollable-p-graf'>
          Initially, we planned to
          <ul>
            <li>visit the famous glass 🥛 and flower 🌻 garden,</li>
            <li>go up the space needle 🚀, </li>
            <li>and see some fish 🐠 at the aquarium</li>
          </ul>
        </p>
      </div>
      <div className='scrollable-div purple-div centered-div'>
        <p className='scrollable-p-graf'>
          But after seeing that it was $35 for each, we decided to look for cheaper options.
          We ended up going to the Arboretum, which was completely free.
        </p>
      </div>
      <div className='scrollable-div purple-div centered-div'>
        <p className='scrollable-p-graf'>
          There were many colored trees and quite a few water birds.
        </p>
      </div>
      <div className='scrollable-div purple-div centered-div-fixed'>
        {flex_img_map(seattle_arboretum_images)}
      </div>
      <div className='scrollable-div purple-div centered-div'>
        <p className='scrollable-p-graf small-text'>I think I develoed an extra layer of fat from the few days I was there, because I came back nearly 10 pounds heavier.</p>
      </div>
    </section>

  )
}
