import React from 'react'

export default function CarouselNext({ clickFn, icon = '', nextPrev = 'next', opacity = 1, classes = '' }) {
    // console.log('click fn', clickFn);
    return (
        <>
            <div onClick={clickFn}
                className={classes + (nextPrev == 'next' ? 'carousel-next-arrow' : 'carousel-prev-arrow')}
                style={{ opacity: opacity, verticalAlign: 'center' }}>
                <img
                    className={classes}
                    src={icon}
                    style={{ opacity: opacity, width: '2vw', height: 'auto' }}
                ></img>
            </div>
            {/* <input type="button" onClick={clickFn} value="Go next"></input> */}
        </>
    )
}
