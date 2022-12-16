// SingleGif.tsx
import { useRef, useEffect, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

export const AutoPlayLoopVid = ({ vidSrc, classes='' }) => {
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // useEffect(() => {
    //     if (isVisible) {
    //         //   videoRef.current.play();
    //         console.log(videoRef);
    //         videoRef.play();
    //     }
    //     else if (videoRef.current.play) {
    //         // videoRef.current.pause();
    //         videoRef.pause();
    //     }
    // }, [isVisible]);

    return (
        <VisibilitySensor onChange={(isVisible) => setIsVisible(isVisible)}>
            <video className = {classes} ref={videoRef} width="100%" height="auto" autoPlay={true} loop muted="muted">
                <source src={vidSrc} type='video/mp4' />
            </video>
        </VisibilitySensor>
    );
};