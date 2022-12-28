import React from 'react'

export default function CarouselNext({ clickFn, icon = '', nextPrev = 'next', opacity = 1, classes = '' }) {
    // console.log('click fn', clickFn);
    return (
        <>
            <div onClick={clickFn}
                className={classes + (nextPrev == 'next' ? 'carousel-next-arrow' : 'carousel-prev-arrow')}
                style={{ opacity: opacity, verticalAlign: 'center' }}>
                <img
                    className={classes + 'navigation-caret'}
                    src={icon}
                    style={{ opacity: opacity}}
                ></img>
            </div>
            {/* <input type="button" onClick={clickFn} value="Go next"></input> */}
        </>
    )
}
