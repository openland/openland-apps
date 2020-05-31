import { AppMediaStreamTrack } from "openland-y-runtime-api/AppMediaStream";
import * as React from 'react';

export const useTrackUnmuted = (track: AppMediaStreamTrack | null) => {
    let [muted, setMuted] = React.useState(track ? track.muted : true);
    React.useEffect(() => {
        if (track) {
            setMuted(track.muted);
            track.onmute = () => setMuted(true);
            track.onunmute = () => setMuted(false);
        }
    }, [track]);

    return !muted && track;
};