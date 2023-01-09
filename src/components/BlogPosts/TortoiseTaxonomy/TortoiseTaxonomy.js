import SVG1 from "./SVGs/svg1";
import SVG2 from "./SVGs/svg2";
// import SVG4 from "./SVGs/svg4";

// import { TNDProvider } from "./SVGs/TNDContext";
import { useEffect, useState } from "react";
import data from './Data/tort_data.csv';


// import { ThemeProvider, createTheme } from '@mui/material/styles';
import DropdownMenu from '../Modules/DropdownMenu';

const TortoiseTaxonomy = () => {
    const img_folder = '/img/blog_posts/tortoise_taxonomy/tortoise_taxonomy';

    return (
        <>
            {/* <div className="scrollspy-div" data-spy="scroll" data-target="#article-scrollspy" data-offset="0"> */}
            <p style={{ whiteSpace: "pre-line" }}></p>
            <h2 id="section1" className="pres-header">Tortoises vs. Turtles</h2>
            <p>
                People often confuse tortoises and turtles, and who can blame them, the nomenclature is inherently confusing. A <b>tortoise</b> refers specifically to a land-dweller (so pretty safe naming there), but when it comes to <b>turtles</b>, turtles either refer to aquatic turtles, <i>or</i> the larger order which includes both turtles of the land and aquatic type.
                So slightly confusing, but moving on.
            </p>

            <h2 id="section2" className="pres-header">Where are Tortoises in the Great Turtle Tree?</h2>
            <p>
                This is where tortoises land:
            </p>
            <ul>
                <li>Kingdom: Animalia</li>
                <li>Phylum:	Chordata</li>
                <li>class:	Reptilia</li>
                <li>Order:	Testudines (tortoises & turtles)</li>
                <li><b>Family:	Testudinidae (Tortoises)</b></li>
            </ul>
            <img className="post-img" src={img_folder + '1.png'}></img>

            <h2 id="section3" className="pres-header">Why Do Tortoises Retract There Necks Anyway?</h2>
            <p>
                As we can see, tortoises are part of the <b>Cryptodira</b> suborder. Also known as the Order of the Hidden-Necks (very cloak-and-dagger). This means they retract their neck back into their shell, like so:
            </p>
            <img className="post-img" src={img_folder + '2.png'}></img>
            <p>
                This type of neck retraction is the one that probably comes to mind first when people imagine tortoises and turtles.
            </p>
            <p>
                Meanwhile, we also have these weird side-necked turtles just letting it all hang out:
            </p>
            <img className="post-img" src={img_folder + '3.png'}></img>
            <p>
                OK not that much, more like this:
            </p>
            <img className="post-img" src={img_folder + '4.png'}></img>
            <p>
                Scientists say the difference in this mechanism is due to different skeletal structures of these two suborders, but I like to believe it's the side-eye being used as am effective defense-mechanism.
            </p>
            <p>
                Anyway, to answer the original question, of why the neck retraction mechanism came about, paleontologists have found that it was likely not used originally for defense, but actually for <i>hunting</i> <a href="https://www.smithsonianmag.com/science-nature/real-reason-turtle-learned-hide-its-head-180962233/" title="Turtle neck retraction" target="_blank">[1]</a>.
                When they found fossil records of turtles with only partial retraction, it supported the idea that turtles, at this time still solely aquatic, would retract and launch it's head foward to surprise and capture its prey, (since partial retraction doesn't really seem like a great safety measure, it must be used for something else, and that something else we hypothesize to be hunting). It was only later on that full retraction would tangentially evolve as a defensive mecahnism.
            </p>
            {/* <h2>Where Are Tortoises in the World?</h2>
                        <p>Tortoises can come from a variety habitats. Deserts, grasslands, and forests, temperate and tropical. Here are the centroids of each species' ranges:</p>
                        <div className="d3-geomap" id="map">
                            <svg id="map-svg">
                            </svg> */}


            <h2 id="section4" className="pres-header">Why are Some Tortoises Huge and Others So Small?</h2>
            <div id="stats-menu">
            </div>
            {/* <svg id="stat-svg">
            </svg> */}
            <SVG1 />
            <p>
                The largest known tortoise is a male Aldabra tortoise named Esmeralda.
                He comes in at 670 pounds and as of 2021 is 177 years old.
                Meanwhile, the Speckled Cape tortoise maxes out at 3 inches as an adult.
            </p>
            <img className="post-img" src={img_folder + '5.png'}></img>
            <img className="post-img" src={img_folder + '6.png'}></img>
            <p>
                The variation in tortoise sizes is not random, however.
                One study has found "strong support for different optimal sizes in turtles and tortoises that occupy different habitats" <a href="https://royalsocietypublishing.org/doi/10.1098/rsbl.2010.1084" title="Turtle body size" target="_blank">[2]</a>.
                Particularly, that island tortoises and marine turtles have much larger sizes than mainland tortoises and freshwater turtles.
            </p>
            <p>
                As usual, there does seem to be an evolutionary reason for physiological differences.
                Since islands are more susceptible to adverse conditions than mainland, the larger size of island tortoises (<a href="https://en.wikipedia.org/wiki/Island_gigantism" title="Island gigantism" target="_blank">Island Gigantism</a>), may be a way to deal with periods of drought (more volume for storing nutrients) and also aid in faster travel.
                Sea tortoises have a similar reason in that many are migratory, and larger size is also more anti-predatory.
            </p>
            <p>
                For mainland tortoises and turtles, the reasons for their smaller size are much more variable.
                Generally smaller-sized organisms require less resources and burn less energy, but there are also many other factors in play,
                such as the size of their predators and prey, as well as what the terrain they inhabit and the tasks they need to accomplish (e.g. burrowing).
            </p>

            <h2 id="section5" className="pres-header">What is the Biggest Threat to Tortoises today?</h2>
            <SVG2 />
            {/* <svg id="cons-status-svg">
            </svg> */}
            <p>
                As we can see, of the tortoise species listed on reptile-database.org, the majority are at a conservation status of Vulnerable or worse.
            </p>
            <p className="last-content">
                Like many other rare pets, a major reason for this is habitat destruction and the pet trade.
                Currently, many tortoises that are available in local Petsmarts/Petcos are caught <a href="https://www.change.org/p/petsmart-and-petco-stop-selling-wild-caught-russian-tortoises-agrionemys-horsfieldii" target="_blank">straight from the wild</a>.
                This not only means the tortoise may be more likely to carry parasites, but more importantly directly threatens the stability of wild populations.
                A much better alternative is to purchase tortoises from a breeder at a reptile convention or adopt from a rescue center.
                While this will certainly be more expensive, these tortoise will be captive-bred, meaning they do not source directly from the already vulnerable wild populations.
                If you would like to contribute to this cause, you can donate <a href="https://www.turtleconservancy.org/donate" title="Donate" target="_blank">here</a> to help protect our endangered tortoises.
            </p>
            {/* </div> */}
        </>
    )
}

export default TortoiseTaxonomy;
