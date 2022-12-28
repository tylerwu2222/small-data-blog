import React from 'react'

export default function ScrollDown({ hoverText = "scroll", icon = '', opacity = 1, classes = '', bottomHeight }) {
    return (
        <>
            <div title={hoverText}
                className={classes + 'scroll-down-caret'}
                style={{ opacity: opacity, verticalAlign: 'center', bottom: String(bottomHeight) + '%' }}>
                <img
                    className={classes + 'navigation-caret'}
                    src={icon}
                    style={{ opacity: opacity, width: '2vw', height: 'auto' }}
                ></img>
            </div>
            {/* <input type="button" onClick={clickFn} value="Go next"></input> */}
        </>
    )
}
