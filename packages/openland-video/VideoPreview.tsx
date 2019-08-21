import './all';
import * as React from 'react';
import { VideoTimingContext } from '@openland/react-video-renderer/lib/timing';
import { XView } from 'react-mental';
import { VideoRegistry } from './VideoRegistry';

export const VideoPreview = React.memo((props: {
    name: string
}) => {
    const video = React.useMemo(() => VideoRegistry.resolve(props.name), []);
    const mountTime = React.useMemo(() => new Date().getTime(), []);
    const [frame, setFrame] = React.useState(0);
    React.useEffect(() => {
        let res = setInterval(() => {
            setFrame((v) => v + 1);
        }, 10);
        return () => clearInterval(res);
    }, []);
    return (
        <XView
            width={375}
            height={375}
            overflow="hidden"
        >
            <VideoTimingContext.Provider value={((new Date().getTime() - mountTime) / 1000) % video.duration}>
                {video.el}
            </VideoTimingContext.Provider>
        </XView>
    );
});