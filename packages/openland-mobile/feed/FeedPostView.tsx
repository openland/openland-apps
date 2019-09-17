import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { DataSourceFeedPostItem } from 'openland-engines/feed/types';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { Dimensions, View, StyleSheet, ViewStyle, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { FeedItemShadow } from './FeedItemShadow';
import { FeedAuthorView } from './components/FeedAuthorView';
import { FeedSlideIndicator } from './components/FeedSlideIndicator';
import { FeedSlide } from './content/FeedSlide';
import { FeedUnsupportedContent } from './content/FeedUnsupportedContent';
import { FeedSwipeView } from './FeedSwipeView';

const styles = StyleSheet.create({
    box: {
        paddingTop: 16,
        paddingBottom: 32,
        marginBottom: -16,
        alignItems: 'center'
    } as ViewStyle,
    container: {
        borderRadius: RadiusStyles.Large,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    } as ViewStyle,
    meta: {
        zIndex: 2,
        position: 'absolute',
        top: 0, left: 0, right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    } as ViewStyle,
    wrapper: {
        flexGrow: 1,
        alignSelf: 'stretch'
    } as ViewStyle,
    paginator: {
        position: 'absolute',
        top: 0, bottom: 0,
        width: '33%',
        zIndex: 2,
    } as ViewStyle
});

interface FeedPostViewProps {
    item: DataSourceFeedPostItem;
    scrollRef: React.RefObject<ScrollView>;
}

export const FeedPostView = React.memo((props: FeedPostViewProps) => {
    const theme = React.useContext(ThemeContext);
    const { item, scrollRef } = props;
    const { id, author, slides } = item;

    const [currentSlide, setCurreentSlide] = React.useState(0);
    const onLeftSwiped = React.useCallback(() => {
        console.warn('boom onLeftSwiped');
    }, []);

    const onRightSwiped = React.useCallback(() => {
        console.warn('boom onRightSwiped');
    }, []);

    const onPrevPress = React.useCallback(() => {
        setCurreentSlide(prev => prev - 1);
    }, []);

    const onNextPress = React.useCallback(() => {
        setCurreentSlide(prev => prev + 1);
    }, []);

    const width = Dimensions.get('screen').width;
    const containerWidth = width - 32;
    const containerHeight = containerWidth * (4 / 3);

    const metaStyle: 'default' | 'media' = 'default';

    return (
        <FeedSwipeView
            id={id}
            theme={theme}
            onLeftSwiped={onLeftSwiped}
            onRightSwiped={onRightSwiped}
            scrollRef={scrollRef}
        >
            <View style={styles.box}>
                <FeedItemShadow width={width} height={containerHeight + 16 + 32} />

                <View style={[styles.container, { width: containerWidth, height: containerHeight, backgroundColor: theme.backgroundSecondary }]}>
                    <View style={styles.meta}>
                        <FeedAuthorView author={author} style={metaStyle} />

                        {slides.length > 0 && (
                            <FeedSlideIndicator
                                current={currentSlide + 1}
                                items={slides.length}
                                style={metaStyle}
                            />
                        )}
                    </View>

                    {slides.length > 0 && (
                        <View style={styles.wrapper}>
                            <FeedSlide slide={slides[currentSlide]} />

                            {currentSlide > 0 && (
                                <TouchableWithoutFeedback onPress={onPrevPress}>
                                    <View style={[styles.paginator, { left: 0 }]} />
                                </TouchableWithoutFeedback>
                            )}

                            {currentSlide < slides.length - 1 && (
                                <TouchableWithoutFeedback onPress={onNextPress}>
                                    <View style={[styles.paginator, { right: 0 }]} />
                                </TouchableWithoutFeedback>
                            )}
                        </View>
                    )}

                    {slides.length <= 0 && <FeedUnsupportedContent />}
                </View>
            </View>
        </FeedSwipeView>
    );
});