// import './BerkeleyNature.css'
import { AutoPlayLoopVid } from '../../Media/AutoPlayLoopVid/AutoPlayLoopVid.js'
// import images from '../../site_data/BN_image_data.json';



const img_folder = '/img/blog_posts/BerkeleyNature/'
const BerkeleyNature = ({ page }) => {
    console.log('page', page)
    // if (window?.location.pathname === '/life')
    if (page == 'BerkeleyNature') {
        require('./BerkeleyNature.css')
    }
    return (
        <>

            <h1 className="green-bg-text" style={{ paddingLeft: "10vw", marginTop: "0px" }}>{page}</h1>
            <img className="img-wide" src={img_folder + "berkeley_nature_long.png"} alt="berk-nature-tn" />

            {/* <div class="container-narrow-green-bg"> */}
            <p style={{ whiteSpace: "pre-line" }}></p>
            <p>
                Before I moved to Berkeley, my impression was that it would be teeming with nature.
                Birds would be flying everywhere, forests would be within walking distance of the campus.
                After a few months here though, I've found that it's not quite as expansive as I expected.
                It's still here, but we have to look a bit harder for to find it.</p>
            <p>
                In this photo essay/visualization/journal entry,
                I aggregate all the nature-related pictures, videos, and media I've taken since arriving here,
                and I add some fun stats about the pictures and a few deep dives on certain animal & plant species.
                Hopefully, its a calming, immersive, and educational experience.
            </p>
            <p>NOTE: want this to be exploratory (of the bay area), but also informative about the things I discover. Like what is this bird doing, what is this flower...</p>

            <p style={{ whiteSpace: "pre-line" }}></p><br />
            <h2>PLACES</h2>
            <p>Let's first break it down by the various places I've visited.</p>
            <AutoPlayLoopVid vidSrc={img_folder + "water (1).mp4"} />
            <h3 id="section1" className="pres-header">The Marina</h3>
            <p>I've only visited the marina once/twice. Specifically, _ park. It was a bipolar.
                One side of the park was sunny and peacful,
                like a typical suburban outing that parents take their kids to after soccer practice.
                The other side was Stone Cold (Steve Austin), lashing winds mixed with salt water spraying up the banks:
            </p>

            <p>Things I could capture:</p>
            <ul>
                <li>some birds</li>
                <li>some well-fed squirrels</li>
                <li>trees, waves, the WIND</li>
                <li>apparently there's a kite-flying park (Cesar Chavez park)</li>
            </ul>

            <h3 id="section2" className="pres-header">The Botanical Garden</h3>
            <p>So far this year, I've only visited the garden once in the winter.
                It was a rushed visit, right before closing time, and really not much was blooming.
                It was like seeing athletes in the offseason,
                or actors taking off their costumes after the play.
                Not necessarily the peak of their performance, but still highlight-worthy nonetheless.
            </p>
            <p>Things I could capture:</p>
            <ul>
                <li>some fruit</li>
                <li>some flowers (in Spring)</li>
                <li>the houses (tropical, carnivorous) they close at 4pm</li>
            </ul>

            <h3 id="section3" className="pres-header">Seattle: a Detour.</h3>
            <p>Over thanksgiving break, my sister and I visited two Victors at University of Washington.
                One was my cousin and another was my friend. I've never been before and it was raining.
                We visited the famous glass and flower gardne, and also went to an aquarium,
                mainly so I could capture some more content for this project. Fishes are also fascinating.
            </p>
            <p>Things I could capture:</p>
            <ul>
                <li>some flowers (in Spring)</li>
                <li>fish</li>
                <li>the rain</li>
            </ul>

            <h3 id="section2" className="pres-header">SF Garden?</h3>
            <p style={{ marginBottom: "0px" }}>It's pretty huge, but they also have a flower garden, with lots of people.</p>

            <h3 id="section2" className="pres-header">Berkeley</h3>
            <p>Returning back to Berkeley...
                Over the past few months it's become a home.
                I didn't like it much at first, it seemed like a chaotic place without rules.
                Sometimes, the impression of too many people in too small a place.
                I still don't like it that much, but there are things I appreciate.
                The trees have beautiful transitions of red, yellows, greens.
                The passage of time frozen in a snapshot of the foliage.
            </p>

            <h2>CATEGORIES</h2>
            <p>All the photos I captured, I labeled with metadata. 
                Namely, the subject(s) of the photos, the colors,
                and other notes...</p>
            <p>Let's explore them dynamically and visually:</p>

            {/* </div> */}
        </>
    )
}

export default BerkeleyNature;
