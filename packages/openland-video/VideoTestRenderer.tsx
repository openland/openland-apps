import './all';
import * as React from 'react';
import { VideoTimingContext } from '@openland/react-video-renderer/lib/timing';
import { XView } from 'react-mental';
import { VideoRegistry } from './VideoRegistry';
import { VideoRender } from './VideoRender';

export const VideoTestRenderer = React.memo((props: { name: string }) => {
    const video = React.useMemo(() => VideoRegistry.resolve(props.name), []);
    const mountTime = React.useMemo(() => new Date().getTime(), []);
    const [, setFrame] = React.useState(0);
    React.useEffect(() => {
        let res = setInterval(() => {
            setFrame((v) => v + 1);
        }, 10);
        return () => clearInterval(res);
    }, []);
    return (
        <XView
            width={360}
            height={360}
            overflow="hidden"
        >
            <VideoTimingContext.Provider value={((new Date().getTime() - mountTime)) % video.duration}>
                <VideoRender name={props.name} />
            </VideoTimingContext.Provider>
        </XView>
    );
});