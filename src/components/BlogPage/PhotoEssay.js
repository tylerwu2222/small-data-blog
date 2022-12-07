import { lazy, Suspense } from "react";

const PhotoEssay = ({ componentName }) => {
    // const pageFolder = '../BlogPosts/';
    const jsSource = componentName + '/' + componentName;
    const PageContent = lazy(() => import('../BlogPosts/' + jsSource));
    console.log('pageContent', PageContent);

    return (
        <div id="berkeley-nature-div">
                <Suspense fallback={<div>Loading...</div>}>
                    <PageContent page={componentName}/>
                </Suspense>
        </div>
    )
};

export default PhotoEssay;