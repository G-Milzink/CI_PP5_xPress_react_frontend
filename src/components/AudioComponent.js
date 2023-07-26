import React from 'react';

/*
    Component used to display audio-player when displaying
    a post containing audio.
*/
const AudioComponent = ({ src, ...props }) => {
    return <audio
        src={src}
        controls
        {...props}
        controlsList='nodownload'
    />;
};

export default AudioComponent;
