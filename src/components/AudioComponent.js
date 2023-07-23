import React from 'react';


const AudioComponent = ({ src, ...props }) => {
    return <audio
        src={src}
        controls
        {...props}
        controlsList='nodownload'
    />;
};

export default AudioComponent;
