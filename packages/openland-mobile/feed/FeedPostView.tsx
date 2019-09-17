import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { DataSourceFeedPostItem } from 'openland-engines/feed/types';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { Dimensions, View, StyleSheet, ViewStyle, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { FeedItemShadow } from './FeedItemShadow';
import { FeedMeta } from './components/FeedMeta';
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

    let metaStyle: 'default' | 'media' = 'default';

    if (slides.length && slides[currentSlide].coverAlign && (slides[currentSlide].coverAlign === 'Top' || slides[currentSlide].coverAlign === 'Cover')) {
        metaStyle = 'media';
    }

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
                    {slides.length > 0 && (
                        <>
                            <FeedMeta
                                author={author}
                                style={metaStyle}
                                currentSlide={currentSlide + 1}
                                slidesCount={slides.length}
                            />

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
                        </>
                    )}

                    {slides.length <= 0 && (
                        <>
                            <FeedMeta
                                author={author}
                                style={metaStyle}
                            />

                            <FeedUnsupportedContent />
                        </>
                    )}
                </View>
            </View>
        </FeedSwipeView>
    );
});