import { lazy, Suspense } from "react";

const SmallImage = ({ fileName, classes = '', hoverText= '' }) => {
    return (
        <Suspense fallback={
            <p>loading...</p>
        }>
            <img className={'img-small' + classes}
                src={fileName}
                alt={fileName}
                // title={fileName}
                title={hoverText}
            >
            </img>
        </Suspense>
    )
}

export default SmallImage;