import { React, useContext, useState, useEffect } from 'react';
import { BNContext } from '../BerkeleyNature';

import CarouselNext from '../../Modules/CarouselNext';
import ScrollDown from '../../Modules/ScrollDown';

import Intro from './Intro';
import Marina from "./Marina.js";
import BotanicalGarden from "./BotanicalGarden.js";
// import SFGarden from "./SFGarden.js";
import Seattle from "./Seattle.js";
import Berkeley from "./Berkeley.js";
import Wrapped from "./Wrapped.js";

import './PageViewer.css';

const allPages = [
  <Intro />,
  <Marina />,
  <BotanicalGarden />,
  // <SFGarden />,
  <Seattle />,
  <Berkeley />,
  // <Yosemite />,
  // <Fresno />,
  // <Wrapped />,
];

export default function PageViewer() {

  const [pageNumber, setPageNumber] = useState(0);
  const [displayedPage, setDisplayedPage] = useState(allPages[pageNumber]);
  // dont need this state variable, use scrollY instead (distance from top)
  const [distanceFromTop, setDistanceFromTop] = useState(0);
  // const [isNearPageBottom, setIsNearPageBottom] = useState(false);
  const [carouselOpacity, setCarouselOpacity] = useState(1);
  const [carouselOpacityPrev, setCarouselOpacityPrev] = useState(0);
  const [scrollCaretOpacity, setScrollCaretOpacity] = useState(1);
  const [scrollCaretHeight, setScrollCaretHeight] = useState(1);
  const [scrollHeight, setScrollHeight] = useState(Math.max(document.body.scrollHeight));
  // threshold height from bottom... (when button starts appearing)
  const threshold = 2 * window.innerHeight + window.innerHeight;
  const top_threshold = 2 * window.innerHeight > scrollHeight ? window.innerHeight: 2 * window.innerHeight;
  const [bottomThreshold, setBottomThreshold] = useState(threshold > scrollHeight ? 0 : scrollHeight - threshold // if threshold greater than scroll height, use 0
  );
  const [visitedPages, setVisitedPages] = useState([]);
  // const [videoBlur, setVideoBlur] = useState(10);

  // sets viewport to top of page
  const setPageTop = () => {
    window.scrollTo(0, 0);
  }

  // increment/decrement pageCounter on next/prev click and set to page top
  const decrementPage = () => {
    setPageNumber(Math.max(pageNumber - 1, 0));
    setPageTop();
  }
  const incrementPage = () => {
    setPageNumber(Math.min(pageNumber + 1, allPages.length - 1))
    setPageTop();
  }

  // update scrollheight document's scrollheight changes --> IS USING LAST PAGES SCROLL HEIGHT
  useEffect(() => {
    setScrollHeight(() => { return document.body.scrollHeight })
  }, [document.body.scrollHeight]); // use doc attribute, not pageNumber (because scrollheight does not update immediately)

  // update threshold when scroll height changes
  useEffect(() => {
    setBottomThreshold(() => { return threshold > scrollHeight ? 0 : scrollHeight - threshold });
    console.log('new BT', scrollHeight, '-', threshold, '=>', bottomThreshold);
  }, [scrollHeight]);

  // update scrollY on user scroll
  useEffect(() => {
    const handleScroll = () => {
      setDistanceFromTop(window.scrollY);
      // console.log('bt', bottomThreshold, 'distanceFromTop', distanceFromTop, 'iH', window.innerHeight);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [distanceFromTop]);

  // update opacity when near bottom
  useEffect(() => {
    if (distanceFromTop >= bottomThreshold) {
      setCarouselOpacity(Math.round((distanceFromTop - bottomThreshold) / (scrollHeight - bottomThreshold - window.innerHeight) * 100) / 100);
      setCarouselOpacityPrev(Math.round((distanceFromTop - bottomThreshold) / (scrollHeight - bottomThreshold - window.innerHeight) * 100) / 100)
    }
    // else set opacity to 0
    else {
      setCarouselOpacity(0);
      setCarouselOpacityPrev(0);
    }
    // handle visited pages
    if (visitedPages.includes(pageNumber - 1) & pageNumber > 0) {
      setCarouselOpacityPrev(1);
    }
    if (visitedPages.includes(pageNumber + 1) & pageNumber < allPages.length - 1) {
      setCarouselOpacity(1);
    }
    // }

  }, [distanceFromTop]);

  // update scroll opacity for top of page
  useEffect(() => {
    if (distanceFromTop < top_threshold) {
      setScrollCaretOpacity(Math.round((top_threshold - distanceFromTop) / top_threshold));
    }
    else {
      setScrollCaretOpacity(0);
    }
  }, [distanceFromTop]);

  // bounce scroll down div on pageLoad
  const toggleScrollPosition = () => {
    if (scrollCaretHeight == 1){
      setScrollCaretHeight(3);
    }
    else{
      setScrollCaretHeight(1);
    }
  }
  useEffect(()=>{
    let timer1 = setTimeout(() => toggleScrollPosition(), 1000);
    return () => {
      clearTimeout(timer1);
    };
  },[scrollCaretHeight]);

  // reset blur when page number changes
  // useEffect(() => {
  //   let timer2 = setTimeout(() => setVideoBlur(videoBlur - 1), 500);
  //   return () => {
  //     clearTimeout(timer2)
  //   };
  // }, [pageNumber]);

  // change displayed page when page number changes
  useEffect(() => {
    setDisplayedPage(allPages[pageNumber])
  }, [pageNumber]);

  // update visited pages
  useEffect(() => {
    if (!visitedPages.includes(pageNumber)) {
      setVisitedPages(visitedPages.concat([pageNumber]))
    }
  }, [pageNumber]);

  return (
    <>
      <div className='page-viewer-div'>
        {/* <CarouselNext clickFn={decrementPage} icon={require('../Icons/caret-left.png')} nextPrev={'prev'} opacity={1} /> */}
        <CarouselNext clickFn={decrementPage} icon={require('../Icons/caret-left.png')} nextPrev={'prev'} opacity={carouselOpacityPrev} classes={carouselOpacityPrev > 0 & pageNumber > 0 ? '' : 'hidden '} />
        <CarouselNext clickFn={incrementPage} icon={require('../Icons/caret-right.png')} opacity={carouselOpacity} classes={carouselOpacity > 0 & pageNumber < allPages.length - 1 ? '' : 'hidden '} />
        {displayedPage}
        <ScrollDown icon={require('../Icons/caret-down.png')} opacity={scrollCaretOpacity} classes={''} bottomHeight = {scrollCaretHeight}/>
        <p style={{ marginBottom: 0 }}>.</p>
      </div>
    </>
  )
}
