import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { View } from 'react-native';
import { VideoRenderer } from 'openland-video/videos/components/renderers';
import { NativeRenderer } from 'openland-mobile/videos/NativeRenderer';
import { AnimationSampleView } from 'openland-video/videos/AnimationSampleView';

class ComponentsComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <SScrollView>
                <View width={300} height={300}>
                    <VideoRenderer.Provider value={NativeRenderer}>
                        <AnimationSampleView />
                    </VideoRenderer.Provider>
                </View>
            </SScrollView>
        );
    }
}

export const Videos = withApp(ComponentsComponent);