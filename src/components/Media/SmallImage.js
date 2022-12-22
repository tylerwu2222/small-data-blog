import { lazy, Suspense } from "react";

const SmallImage = ({ fileName }) => {
    return (
        <Suspense fallback={
            <p>loading...</p>
        }>
            <img className="img-small" src={fileName} alt={fileName}>
            </img>
        </Suspense>
    )
}

export default SmallImage;