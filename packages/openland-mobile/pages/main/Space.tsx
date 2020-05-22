import * as React from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { AndroidTwoDScrollView, AndroidTwoDScrollViewInstance } from 'openland-mobile/components/AndroidTwoDScrollView';

export const Space = React.memo((props: { mediaSession: MediaSessionManager, peers: Conference_conference_peers[] }) => {
    const scrollRef = React.useRef<ScrollView>(null);
    const androidScrollRef = React.useRef<AndroidTwoDScrollViewInstance>(null);
    React.useEffect(() => {
        console.warn('trying to scroll', (scrollRef || androidScrollRef).current);
        (scrollRef || androidScrollRef).current?.scrollTo(1500, 1500);
    }, []);
    let content = (
        <View flexDirection="column" backgroundColor="red" width={3000} height={3000}>
            <View flexDirection="row">
                <View width={1500} height={1500} backgroundColor="gray" />
                <View width={1500} height={1500} backgroundColor="green" />
            </View>
            <View flexDirection="row">
                <View width={1500} height={1500} backgroundColor="green" />
                <View width={1500} height={1500} backgroundColor="gray" />
            </View>
        </View>
    );
    return (
        <>
            {Platform.OS !== 'android' &&
                <ScrollView
                    ref={scrollRef}
                    bounces={true}
                    bouncesZoom={true}
                    maximumZoomScale={2.0}
                    minimumZoomScale={0.5}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ width: 3000, height: 3000 }}
                    flexGrow={1}
                >
                    {content}
                </ScrollView>}
            {Platform.OS === 'android' &&
                <AndroidTwoDScrollView
                    style={{ backgroundColor: 'cyan', width: '100%', height: '100%' }}
                    ref={androidScrollRef}
                    containerWidth={3000}
                    containerHeight={3000}
                >
                    {content}
                </AndroidTwoDScrollView>
            }
        </>
    );
});