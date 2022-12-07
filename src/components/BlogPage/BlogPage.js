import './BlogPage.css'
import { lazy, Suspense } from "react";

const BlogPage = ({ componentName }) => {
    const pageFolder = '../BlogPosts/';
    const jsSource = componentName + '/' + componentName;
    const PageContent = lazy(() => import('../BlogPosts/' + jsSource));
    console.log('pageContent', PageContent);

    return (
        <div className='container-narrow'>
            <Suspense fallback={<div>Loading...</div>}>
                <PageContent page={componentName} />
            </Suspense>
        </div>
    )
};

export default BlogPage;