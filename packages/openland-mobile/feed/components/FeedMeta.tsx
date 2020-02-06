import * as React from 'react';
import { View, StyleSheet, ViewStyle, LayoutChangeEvent } from 'react-native';
import { FeedPostAuthorFragment, FeedPostSourceFragment } from 'openland-api/spacex.types';
import { FeedAuthorView } from './FeedAuthorView';
import { FeedSlideIndicator } from './FeedSlideIndicator';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
    meta: {
        zIndex: 2,
        position: 'absolute',
        top: 0, left: 0, right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    } as ViewStyle,
});

interface FeedMetaProps {
    author: FeedPostAuthorFragment;
    source?: FeedPostSourceFragment;
    style: 'default' | 'media';
    currentSlide?: number;
    slidesCount?: number;
    width: number;
}

export const FeedMeta = React.memo((props: FeedMetaProps) => {
    const { author, source, style, currentSlide, slidesCount, width } = props;
    const [indicatorWidth, setIndicatorWidth] = React.useState(0);

    const handleIndicatorLayour = React.useCallback((event: LayoutChangeEvent) => {
        setIndicatorWidth(event.nativeEvent.layout.width);
    }, []);

    const content = (
        <>
            <FeedAuthorView
                author={author}
                source={source}
                style={style}
                maxWidth={width - indicatorWidth}
            />

            {!!currentSlide && !!slidesCount && slidesCount > 1 && (
                <FeedSlideIndicator
                    current={currentSlide}
                    items={slidesCount}
                    style={style}
                    onLayout={handleIndicatorLayour}
                />
            )}
        </>
    );

    if (style === 'media') {
        return (
            <LinearGradient colors={['rgba(0, 0, 0, 0.24)', 'rgba(0, 0, 0, 0)']} style={styles.meta}>
                {content}
            </LinearGradient>
        );
    }

    return (
        <View style={styles.meta}>
            {content}
        </View>
    );
});