import { lazy, Suspense } from "react";

const MedImage = ({ fileName, classes = '', hoverText= '' }) => {
    return (
        <Suspense fallback={
            <p>loading...</p>
        }>
            <img className={'img-med' + classes}
                src={fileName}
                alt={fileName}
                // title={fileName}
                title={hoverText}
            >
            </img>
        </Suspense>
    )
}

export default MedImage;