import './ToolPage.css'
import { lazy, Suspense } from "react";

const ToolPage = ({componentName}) => {
    const jsSource = componentName + '/' + componentName;
    console.log('toolPage jsSource',jsSource);
    const PageContent = lazy(() => import('../Tools/' + jsSource));
    console.log('tool pageContent', PageContent);

    return (
        <div className='container-narrow'>
            <Suspense fallback={<div>Loading...</div>}>
                <PageContent page={componentName} />
            </Suspense>
        </div>
    )
};

export default ToolPage;