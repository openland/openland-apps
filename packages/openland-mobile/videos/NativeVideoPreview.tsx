import 'openland-video/all';
import * as React from 'react';
import { View } from 'react-native';
import { VideoRenderer } from 'openland-video/components/VideoRenderer';
import { NativeRenderer } from 'openland-mobile/videos/NativeRenderer';
import { VideoRegistry } from 'openland-video/VideoRegistry';
import { TimingDurationContext, TimingShiftContext } from 'openland-video/components/TimingContext';

export const NativeVideoPreview = React.memo((props: { name: string }) => {
    const video = React.useMemo(() => VideoRegistry.resolve(props.name), []);
    const [iteration, setIteration] = React.useState(0);
    React.useLayoutEffect(() => {
        let r = setInterval(() => {
            setIteration((v) => v + 1);
        }, video.duration);
        return () => clearInterval(r);
    }, []);
    return (
        <View width={360} height={360} key={'iter-' + iteration} overflow="hidden">
            <VideoRenderer.Provider value={NativeRenderer}>
                <TimingDurationContext.Provider value={video.duration}>
                    <TimingShiftContext.Provider value={0}>
                        {video.el}
                    </TimingShiftContext.Provider>
                </TimingDurationContext.Provider>
            </VideoRenderer.Provider>
        </View>
    );
});